import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const {
      Body: {
        stkCallback: {
          MerchantRequestID,
          CheckoutRequestID,
          ResultCode,
          ResultDesc,
          CallbackMetadata,
        },
      },
    } = body;

    // Find the donation by M-Pesa request IDs
    const donation = await prisma.donation.findFirst({
      where: {
        mpesaMerchantRequestId: MerchantRequestID,
        mpesaCheckoutRequestId: CheckoutRequestID,
      },
    });

    if (!donation) {
      console.error('Donation not found:', { MerchantRequestID, CheckoutRequestID });
      return NextResponse.json({ message: 'Donation not found' }, { status: 404 });
    }

    // Extract transaction details from callback metadata
    const metadata = CallbackMetadata?.Item || [];
    const transactionData = metadata.reduce((acc: any, item: any) => {
      acc[item.Name] = item.Value;
      return acc;
    }, {});

    // Update donation status based on result code
    const status = ResultCode === 0 ? 'COMPLETED' : 'FAILED';
    
    await prisma.donation.update({
      where: { id: donation.id },
      data: {
        status,
        mpesaReceiptNumber: transactionData.MpesaReceiptNumber || null,
        mpesaTransactionDate: transactionData.TransactionDate ? new Date(transactionData.TransactionDate) : null,
        mpesaResultCode: ResultCode.toString(),
        mpesaResultDesc: ResultDesc,
        mpesaCallbackMetadata: body,
        mpesaAccountBalance: transactionData.Balance || null,
      },
    });

    // If payment failed, log the error
    if (ResultCode !== 0) {
      console.error('M-Pesa payment failed:', {
        donationId: donation.id,
        resultCode: ResultCode,
        resultDesc: ResultDesc,
      });
    }

    return NextResponse.json({ message: 'Callback processed successfully' });
  } catch (error: any) {
    console.error('M-Pesa callback processing error:', error);
    return NextResponse.json(
      { message: error.message || 'Failed to process callback' },
      { status: 500 }
    );
  }
} 