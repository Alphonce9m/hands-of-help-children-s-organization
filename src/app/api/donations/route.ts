import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

import type { DonationStatus } from '@/lib/types';

export async function POST(request: Request) {
  try {
    const body = await request.json();


    // Verify M-Pesa signature

      return NextResponse.json(
        { error: 'Invalid signature' },
        { status: 401 }
      );
    }

    const {
      CheckoutRequestID,
      MerchantRequestID,
      ResultCode,
      ResultDesc,
      Amount,

      TransactionDate,
      PhoneNumber,
      CallbackMetadata,
    } = body.Body.stkCallback;

    // Update donation status
    const donation = await prisma.donation.update({
      where: { reference: CheckoutRequestID },
      data: {
        status: ResultCode === '0' ? 'COMPLETED' : 'FAILED',






          (item: any) => item.Name === 'AccountBalance'
        )?.Value,

          (item: any) => item.Name === 'TransactionType'
        )?.Value,
      },
    });

    return NextResponse.json({ success: true, donation });
  } catch (error) {
    console.error('M-Pesa callback error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
