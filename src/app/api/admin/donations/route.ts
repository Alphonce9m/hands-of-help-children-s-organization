import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { prisma } from '@/lib/prisma';

interface DonationWithDonor {
  id: string;
  reference: string;
  amount: number;
  phoneNumber: string;
  type: string;
  status: string;
  mpesaReceiptNumber: string | null;
  transactionDate: Date | null;
  createdAt: Date;
  updatedAt: Date;
  donor: {
    name: string;
    email: string;
  } | null;
}

export async function GET() {
  try {
    const session = await getServerSession();
    if (!session?.user?.email) {
      return NextResponse.json(
        { message: 'Unauthorized' },
        { status: 401 }
      );
    }

    const donations = await prisma.donation.findMany({
      include: {
        donor: {
          select: {
            name: true,
            email: true,
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    const formattedDonations = donations.map((result: DonationWithDonor) => ({
      id: result.id,
      reference: result.reference,
      amount: result.amount,
      phoneNumber: result.phoneNumber,
      type: result.type,
      status: result.status,
      mpesaReceiptNumber: result.mpesaReceiptNumber,
      transactionDate: result.transactionDate,
      createdAt: result.createdAt,
      donor: result.donor,
    }));

    return NextResponse.json({ donations: formattedDonations });
  } catch (error) {
    console.error('Error fetching donations:', error);
    return NextResponse.json(
      { message: 'Failed to fetch donations' },
      { status: 500 }
    );
  }
} 