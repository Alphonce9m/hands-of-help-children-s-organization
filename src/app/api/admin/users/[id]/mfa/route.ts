import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { prisma } from '@/lib/prisma';

export async function PUT(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession();
    if (!session?.user?.email) {
      return NextResponse.json(
        { message: 'Unauthorized' },
        { status: 401 }
      );
    }

    const { enabled } = await req.json();

    const user = await prisma.admin.update({
      where: { id: params.id },
      data: { mfaEnabled: enabled },
    });

    return NextResponse.json({
      message: `MFA ${enabled ? 'enabled' : 'disabled'} successfully`,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        mfaEnabled: user.mfaEnabled,
      },
    });
  } catch (error) {
    console.error('Error updating MFA status:', error);
    return NextResponse.json(
      { message: 'Failed to update MFA status' },
      { status: 500 }
    );
  }
} 