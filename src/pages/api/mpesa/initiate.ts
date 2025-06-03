import { NextApiRequest, NextApiResponse } from 'next';
import { MpesaService } from '../../../utils/mpesa';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const mpesaService = new MpesaService({
  consumerKey: process.env.MPESA_CONSUMER_KEY!,
  consumerSecret: process.env.MPESA_CONSUMER_SECRET!,
  passkey: process.env.MPESA_PASSKEY!,
  shortcode: process.env.MPESA_SHORTCODE!,
  env: process.env.NODE_ENV === 'production' ? 'production' : 'sandbox',
});

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const { amount, phoneNumber, name, email, frequency } = req.body;

    // Create donation record
    const donation = await prisma.donation.create({
      data: {
        amount: parseFloat(amount),
        phoneNumber,
        name,
        email,
        frequency,
        status: 'PENDING',
        reference: `DON-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      },
    });

    // Initiate STK Push
    const stkResponse = await mpesaService.initiateSTKPush({
      amount: parseFloat(amount),
      phoneNumber,
      accountReference: donation.reference,
      transactionDesc: `Donation to Hands of Help`,
    });

    // Create M-Pesa transaction record
    await prisma.mpesaTransaction.create({
      data: {
        merchantRequestId: stkResponse.MerchantRequestID,
        checkoutRequestId: stkResponse.CheckoutRequestID,
        resultCode: stkResponse.ResponseCode,
        resultDesc: stkResponse.ResponseDescription,
        amount: parseFloat(amount),
        phoneNumber,
        transactionDate: new Date(),
        status: 'PENDING',
        donationId: donation.id,
      },
    });

    return res.status(200).json({
      success: true,
      data: {
        checkoutRequestId: stkResponse.CheckoutRequestID,
        merchantRequestId: stkResponse.MerchantRequestID,
        donationId: donation.id,
      },
    });
  } catch (error) {
    console.error('Error initiating M-Pesa payment:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to initiate payment',
    });
  }
} 