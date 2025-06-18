import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { env } from '@/lib/env';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const reference = searchParams.get('reference');

    if (!reference) {
      return NextResponse.json(
        { error: 'Reference is required' },
        { status: 400 }
      );
    }

    const donation = await prisma.donation.findUnique({
      where: { reference },
      select: {
        reference: true,
        amount: true,
        status: true,
        createdAt: true,
        transactionId: true,
        receiptNumber: true,
        transactionDate: true,
        donor: {
          select: {
            name: true,
            email: true,
          },
        },
      },
    });

    if (!donation) {
      return NextResponse.json(
        { error: 'Donation not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, donation });
  } catch (error) {
    console.error('Get donation status error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
