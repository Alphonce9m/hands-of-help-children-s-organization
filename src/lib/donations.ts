import { prisma } from '@/lib/prisma';
import { env } from '@/lib/env';
import type { DonationStatus, DonationFrequency, Donation } from '@/lib/types';

// Use Prisma enums directly
export type { DonationStatus, DonationFrequency };

export async function createDonation(data: {
  amount: number;
  phoneNumber: string;
  name?: string;
  email?: string;
  frequency?: DonationFrequency;
}) {
  const reference = `DON-${Date.now()}`;

  // Create donation record
  const donation = await prisma.donation.create({
    data: {
      reference,
      amount: data.amount,
      status: 'PENDING',
      phoneNumber: data.phoneNumber,
      name: data.name,
      email: data.email,
      frequency: data.frequency || 'ONE_TIME',
    },
  });

  return donation;
}

export async function getDonationByReference(reference: string) {
  return prisma.donation.findUnique({
    where: { reference },
    include: { donor: true },
  });
}
