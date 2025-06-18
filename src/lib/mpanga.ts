import { env } from './env';
import axios from 'axios';

const MPANGA_API_URL = 'https://api.mpanga.com';

export interface MPangaPaymentRequest {
  amount: number;
  phoneNumber: string;
  reference: string;
  callbackUrl: string;
}

export interface MPangaPaymentResponse {
  status: string;
  message: string;
  transactionId: string;
}

export const initiateMPangaPayment = async (paymentData: MPangaPaymentRequest): Promise<MPangaPaymentResponse> => {
  const { amount, phoneNumber, reference, callbackUrl } = paymentData;

  const payload = {
    amount: amount.toString(),
    phoneNumber,
    reference,
    callbackUrl,
  };

  try {
    const response = await axios.post(
      `${MPANGA_API_URL}/v1/payments/initiate`,
      payload,
      {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${env.MPANGA_API_KEY}`,
        },
      }
    );

    return {
      status: response.data.status,
      message: response.data.message,
      transactionId: response.data.transactionId,
    };
  } catch (error) {
    console.error('M-Panga payment error:', error);
    throw new Error('Failed to initiate M-Panga payment');
  }
};

export const verifyMPangaCallback = async (callbackData: any): Promise<boolean> => {
  // Verify the callback signature and data
  // This implementation should match M-Panga's verification requirements
  try {
    // Add your verification logic here based on M-Panga's requirements
    // This might involve checking signatures, timestamps, etc.
    return true; // Replace with actual verification logic
  } catch (error) {
    console.error('M-Panga callback verification error:', error);
    return false;
  }
};
