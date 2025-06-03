import { prisma } from '@/lib/prisma';
import { env } from '@/lib/env';
import axios from 'axios';
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

  // Initiate M-Pesa payment
  try {
    const mpesaResponse = await initiateMpesaPayment({
      amount: data.amount,
      phoneNumber: data.phoneNumber,
      reference,
    });

    await prisma.donation.update({
      where: { reference },
      data: {
        mpesaCheckoutRequestId: mpesaResponse.CheckoutRequestID,
        mpesaMerchantRequestId: mpesaResponse.MerchantRequestID,
      },
    });

    return donation;
  } catch (error) {
    console.error('M-Pesa payment initiation error:', error);
    await prisma.donation.update({
      where: { id: donation.id },
      data: { status: 'FAILED' },
    });
    throw error;
  }
}

export async function getDonationByReference(reference: string) {
  return prisma.donation.findUnique({
    where: { reference },
    include: { donor: true },
  });
}

async function initiateMpesaPayment({
  amount,
  phoneNumber,
  reference,
}: {
  amount: number;
  phoneNumber: string;
  reference: string;
}) {
  const mpesaConfig = {
    BusinessShortCode: env.MPESA_SHORTCODE,
    Password: env.MPESA_PASSWORD,
    Timestamp: env.MPESA_TIMESTAMP,
    TransactionType: 'CustomerPayBillOnline',
    Amount: amount,
    PartyA: phoneNumber.startsWith('+254') ? phoneNumber.slice(3) : phoneNumber,
    PartyB: env.MPESA_SHORTCODE,
    PhoneNumber: phoneNumber.startsWith('+254') ? phoneNumber.slice(3) : phoneNumber,
    CallBackURL: `${env.NEXT_PUBLIC_BASE_URL}/api/donations`,
    AccountReference: reference,
    TransactionDesc: 'Donation to Hands of Help',
  };

  const response = await axios.post(
    'https://api.safaricom.co.ke/mpesa/stkpush/v1/processrequest',
    mpesaConfig,
    {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${env.MPESA_ACCESS_TOKEN}`,
      },
    }
  );

  return response.data;
}
