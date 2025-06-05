import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { prisma } from '@/lib/prisma';
import { authOptions } from '@/lib/auth-config';

// Type for the request body
type UpdateMfaRequest = {
  enabled: boolean;
};

export async function PUT(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    // Verify authentication
    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return NextResponse.json(
        { message: 'You must be signed in to perform this action' },
        { status: 401 }
      );
    }

    // Check if user has admin role
    if (session.user.role !== 'admin') {
      return NextResponse.json(
        { message: 'Unauthorized: Admin access required' },
        { status: 403 }
      );
    }

    // Validate user ID parameter
    if (!params.id || typeof params.id !== 'string') {
      return NextResponse.json(
        { message: 'Invalid user ID' },
        { status: 400 }
      );
    }

    // Parse and validate request body
    let body: UpdateMfaRequest;
    try {
      body = await req.json();
      if (typeof body.enabled !== 'boolean') {
        throw new Error('Invalid request body');
      }
    } catch (error) {
      return NextResponse.json(
        { message: 'Invalid request body' },
        { status: 400 }
      );
    }

    // Check if the target user exists
    const targetUser = await prisma.admin.findUnique({
      where: { id: params.id },
    });

    if (!targetUser) {
      return NextResponse.json(
        { message: 'User not found' },
        { status: 404 }
      );
    }

    // Prevent users from modifying their own MFA status through this endpoint
    if (targetUser.id === session.user.id) {
      return NextResponse.json(
        { message: 'Use the profile settings to modify your own MFA status' },
        { status: 400 }
      );
    }

    // Update MFA status
    const updatedUser = await prisma.admin.update({
      where: { id: params.id },
      data: { mfaEnabled: body.enabled },
      select: {
        id: true,
        name: true,
        email: true,
        mfaEnabled: true,
        updatedAt: true,
      },
    });

    // Log the action to console since we don't have audit logging set up
    console.log(`Admin ${session.user.id} ${body.enabled ? 'enabled' : 'disabled'} MFA for user ${updatedUser.id}`);

    return NextResponse.json({
      message: `MFA ${body.enabled ? 'enabled' : 'disabled'} successfully`,
      user: updatedUser,
    });
  } catch (error) {
    console.error('Error updating MFA status:', error);
    
    // Handle Prisma errors
    if (error instanceof Error) {
      if (error.name.includes('Prisma')) {
        return NextResponse.json(
          { message: 'Database error occurred' },
          { status: 500 }
        );
      }
    }
    
    return NextResponse.json(
      { message: 'An unexpected error occurred' },
      { status: 500 }
    );
  }
} 