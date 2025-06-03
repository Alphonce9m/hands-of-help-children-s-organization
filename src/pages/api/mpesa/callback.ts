import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
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
    } = req.body;

    // Find the M-Pesa transaction
    const transaction = await prisma.mpesaTransaction.findUnique({
      where: {
        merchantRequestId: MerchantRequestID,
      },
      include: {
        donation: true,
      },
    });

    if (!transaction) {
      return res.status(404).json({ message: 'Transaction not found' });
    }

    // Update transaction status
    const status = ResultCode === 0 ? 'SUCCESS' : 'FAILED';
    await prisma.mpesaTransaction.update({
      where: {
        id: transaction.id,
      },
      data: {
        status,
        resultCode: ResultCode,
        resultDesc: ResultDesc,
        ...(CallbackMetadata && {
          mpesaReceiptNumber: CallbackMetadata.Item.find(
            (item: any) => item.Name === 'MpesaReceiptNumber'
          )?.Value,
        }),
      },
    });

    // Update donation status
    if (transaction.donation) {
      await prisma.donation.update({
        where: {
          id: transaction.donation.id,
        },
        data: {
          status: status === 'SUCCESS' ? 'COMPLETED' : 'FAILED',
        },
      });
    }

    return res.status(200).json({ message: 'Callback processed successfully' });
  } catch (error) {
    console.error('Error processing M-Pesa callback:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to process callback',
    });
  }
} 