import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { prisma } from '@/lib/prisma';
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
      orderBy: { createdAt: 'desc' },
      select: {
        id: true,
        reference: true,
        amount: true,
        status: true,
        name: true,
        email: true,
        phoneNumber: true,
        createdAt: true
      }
    });

    const formattedDonations = donations.map((donation) => ({
      id: donation.id,
      reference: donation.reference,
      amount: donation.amount,
      phoneNumber: donation.phoneNumber,
      status: donation.status,
      createdAt: donation.createdAt,
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