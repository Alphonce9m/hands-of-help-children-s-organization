import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { prisma } from '@/lib/imports';
import { Donation, Donor, DonationStatus } from '@prisma/client';

type DonationWithDonor = Donation & {
  donor: Pick<Donor, 'name' | 'email'> | null;
};

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

    const formattedDonations = donations.map((donation) => ({
      id: donation.id,
      reference: donation.reference,
      amount: donation.amount,
      phoneNumber: donation.phoneNumber,
      status: donation.status,
      createdAt: donation.createdAt,
      donor: donation.donor,
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