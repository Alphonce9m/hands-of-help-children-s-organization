import axios from 'axios';
import crypto from 'crypto';
import { env } from './env';

const MPANGA_CONFIG = {
  merchantId: env.MPANGA_MERCHANT_ID,
  apiKey: env.MPANGA_API_KEY,
  apiSecret: env.MPANGA_API_SECRET,
  environment: env.MPANGA_ENVIRONMENT,
  apiEndpoint: env.MPANGA_ENVIRONMENT === 'sandbox'
    ? 'https://sandbox.mpanga.com'
    : 'https://api.mpanga.com',
};

interface PaymentRequest {
  amount: number;
  phoneNumber: string;
  reference: string;
  callbackUrl: string;
  description: string;
}

interface PaymentResponse {
  success: boolean;
  transactionId?: string;
  message?: string;
  errorCode?: string;
}

export async function initiatePayment({
  amount,
  phoneNumber,
  reference,
  callbackUrl,
  description,
}: PaymentRequest): Promise<PaymentResponse> {
  try {
    // Generate authorization token
    const auth = Buffer.from(
      `${MPANGA_CONFIG.apiKey}:${MPANGA_CONFIG.apiSecret}`
    ).toString('base64');

    const paymentRequest = {
      merchantId: MPANGA_CONFIG.merchantId,
      amount: Math.round(amount),
      phoneNumber,
      reference,
      callbackUrl,
      description,
      timestamp: new Date().toISOString(),
    };

    const response = await axios.post(
      `${MPANGA_CONFIG.apiEndpoint}/payment/initiate`,
      paymentRequest,
      {
        headers: {
          Authorization: `Basic ${auth}`,
          'Content-Type': 'application/json',
        },
      }
    );

    if (response.data.success) {
      return {
        success: true,
        transactionId: response.data.transactionId,
        message: 'Payment initiated successfully',
      };
    } else {
      return {
        success: false,
        message: response.data.message || 'Failed to initiate payment',
        errorCode: response.data.errorCode,
      };
    }
  } catch (error: any) {
    console.error('Error initiating MPanga payment:', error.response?.data || error.message);
    return {
      success: false,
      message: error.response?.data?.message || 'Failed to initiate payment',
      errorCode: error.response?.data?.errorCode,
    };
  }
}

export function verifyPaymentSignature(body: any, signature: string): boolean {
  const sortedKeys = Object.keys(body)
    .sort()
    .map(key => `${key}=${encodeURIComponent(body[key])}`)
    .join('&');

  const hash = crypto
    .createHmac('sha256', MPANGA_CONFIG.apiSecret)
    .update(sortedKeys)
    .digest('hex');

  return hash === signature;
}

export async function checkPaymentStatus(transactionId: string): Promise<PaymentResponse> {
  try {
    const auth = Buffer.from(
      `${MPANGA_CONFIG.apiKey}:${MPANGA_CONFIG.apiSecret}`
    ).toString('base64');

    const response = await axios.get(
      `${MPANGA_CONFIG.apiEndpoint}/payment/status/${transactionId}`,
      {
        headers: {
          Authorization: `Basic ${auth}`,
          'Content-Type': 'application/json',
        },
      }
    );

    if (response.data.success) {
      return {
        success: true,
        transactionId,
        message: 'Payment status retrieved successfully',
      };
    } else {
      return {
        success: false,
        message: response.data.message || 'Failed to get payment status',
        errorCode: response.data.errorCode,
      };
    }
  } catch (error: any) {
    console.error('Error checking payment status:', error.response?.data || error.message);
    return {
      success: false,
      message: error.response?.data?.message || 'Failed to get payment status',
      errorCode: error.response?.data?.errorCode,
    };
  }
}
