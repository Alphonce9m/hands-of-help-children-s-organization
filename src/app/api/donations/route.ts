import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { verifyMpesaSignature } from '@/lib/mpesa';
import type { DonationStatus } from '@/lib/types';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const signature = request.headers.get('X-Mpesa-Signature');

    // Verify M-Pesa signature
    if (!signature || !verifyMpesaSignature(body, signature)) {
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
      MpesaReceiptNumber,
      TransactionDate,
      PhoneNumber,
      CallbackMetadata,
    } = body.Body.stkCallback;

    // Update donation status
    const donation = await prisma.donation.update({
      where: { reference: CheckoutRequestID },
      data: {
        status: ResultCode === '0' ? 'COMPLETED' : 'FAILED',
        mpesaReceiptNumber: MpesaReceiptNumber,
        mpesaResultCode: ResultCode,
        mpesaResultDesc: ResultDesc,
        mpesaCallbackMetadata: CallbackMetadata,
        mpesaTransactionDate: new Date(TransactionDate),
        mpesaAccountBalance: CallbackMetadata?.Item?.find(
          (item: any) => item.Name === 'AccountBalance'
        )?.Value,
        mpesaTransactionType: CallbackMetadata?.Item?.find(
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
