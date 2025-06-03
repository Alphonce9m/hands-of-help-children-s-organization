import axios from 'axios';
import crypto from 'crypto';
import { env } from './env';
import { z } from 'zod';

// Payment validation schemas
const phoneSchema = z.string()
  .min(10, 'Phone number must be at least 10 digits')
  .max(13, 'Phone number must be at most 13 digits')
  .regex(/^\+?\d+$/, 'Phone number must contain only digits')
  .refine(phone => {
    const cleaned = phone.replace(/^\+/, '');
    return env.MPESA_ALLOWED_PHONE_PREFIXES.some(prefix => 
      cleaned.startsWith(prefix)
    );
  }, `Phone number must start with one of: ${env.MPESA_ALLOWED_PHONE_PREFIXES.join(', ')}`);

const amountSchema = z.number()
  .min(env.MPESA_MIN_AMOUNT, `Amount must be at least KES ${env.MPESA_MIN_AMOUNT}`)
  .max(env.MPESA_MAX_AMOUNT, `Amount must not exceed KES ${env.MPESA_MAX_AMOUNT}`);

export type PaymentRequest = {
  amount: number;
  phoneNumber: string;
  reference: string;
  callbackUrl: string;
  description: string;
  paymentMethod: 'paybill' | 'till';
  retryCount?: number;
  timeout?: number;
};

export type PaymentResponse = {
  success: boolean;
  transactionId?: string;
  merchantRequestId?: string;
  checkoutRequestId?: string;
  message?: string;
  errorCode?: string;
  retryCount?: number;
};

const MPESA_CONFIG = {
  consumerKey: env.MPESA_API_KEY,
  consumerSecret: env.MPESA_API_SECRET,
  paybillNumber: env.MPESA_PAYBILL_NUMBER,
  tillNumber: env.MPESA_TILL_NUMBER,
  accountNumber: env.MPESA_ACCOUNT_NUMBER,
  businessName: env.MPESA_BUSINESS_NAME,
  bankAccount: env.MPESA_BANK_ACCOUNT,
  passkey: env.MPESA_PASSKEY,
  environment: env.MPESA_ENVIRONMENT,
  apiEndpoint: env.MPESA_ENVIRONMENT === 'sandbox'
    ? 'https://sandbox.safaricom.co.ke'
    : 'https://api.safaricom.co.ke',
  merchantId: env.MPESA_MERCHANT_ID,
  accountReference: env.MPESA_ACCOUNT_REFERENCE,
  transactionDesc: env.MPESA_TRANSACTION_DESC
};

// Exported functions
export async function generateAccessToken(): Promise<string> {
  try {
    const auth = Buffer.from(
      `${MPESA_CONFIG.consumerKey}:${MPESA_CONFIG.consumerSecret}`
    ).toString('base64');

    const response = await axios.get(`${MPESA_CONFIG.apiEndpoint}/oauth/v1/generate?grant_type=client_credentials`, {
      headers: {
        Authorization: `Basic ${auth}`,
      },
    });

    if (!response.data.access_token) {
      throw new Error('No access token received from M-Pesa');
    }

    return response.data.access_token;
  } catch (error: any) {
    console.error('Error generating access token:', error.response?.data || error.message);
    throw getMpesaError(error);
  }
}

function getMpesaError(error: unknown): Error {
  const apiError = error as any;
  const apiResponse = apiError.response?.data;
  return new Error(
    apiResponse?.errorMessage || 
    apiResponse?.error_description || 
    'Failed to generate access token'
  );
}

export function verifyMpesaSignature(body: any, signature: string): boolean {
  const sortedKeys = Object.keys(body)
    .sort()
    .map(key => `${key}=${encodeURIComponent(body[key])}`)
    .join('&');

  const hash = crypto
    .createHmac('sha256', env.MPESA_PASSWORD!)
    .update(sortedKeys)
    .digest('hex');

  return hash === signature;
}

export function generatePassword(
  shortcode: string,
  passkey: string,
  timestamp: string
): string {
  return Buffer.from(
    `${shortcode}${passkey}${timestamp}`
  ).toString('base64');
}

export async function initiatePayment({
  amount,
  phoneNumber,
  reference,
  callbackUrl,
  description,
  paymentMethod = 'paybill',
  retryCount = 0,
  timeout = env.MPESA_PAYMENT_TIMEOUT
}: PaymentRequest): Promise<PaymentResponse> {
  try {
    // Validate inputs
    const validatedPhone = phoneSchema.parse(phoneNumber);
    amountSchema.parse(amount);

    if (retryCount >= env.MPESA_MAX_RETRIES) {
      throw new Error(`Maximum number of retries (${env.MPESA_MAX_RETRIES}) exceeded`);
    }

    if (!callbackUrl.startsWith(env.NEXT_PUBLIC_BASE_URL)) {
      throw new Error('Callback URL must be on the same domain');
    }

    if (reference.length > 12) {
      throw new Error('Reference must not exceed 12 characters');
    }

    // Log payment attempt
    console.log('Initiating M-Pesa payment');

    // Generate timestamp and password
    const timestamp = new Date().toISOString().replace(/[^0-9]/g, '').slice(0, -3);
    const password = generatePassword(
      paymentMethod === 'paybill' ? MPESA_CONFIG.paybillNumber : MPESA_CONFIG.tillNumber,
      MPESA_CONFIG.passkey,
      timestamp
    );

    // Get business short code based on payment method
    const businessShortCode = paymentMethod === 'paybill' 
      ? MPESA_CONFIG.paybillNumber 
      : MPESA_CONFIG.tillNumber;

    // Get transaction type based on payment method
    const transactionType = paymentMethod === 'paybill' 
      ? 'CustomerPayBillOnline' 
      : 'CustomerBuyGoodsOnline';

    // Prepare payment request
    const paymentRequest = {
      BusinessShortCode: businessShortCode,
      Password: password,
      Timestamp: timestamp,
      TransactionType: transactionType,
      Amount: Math.round(amount),
      PartyA: validatedPhone.replace(/^254/, '0'), // Convert to local format
      PartyB: businessShortCode,
      PhoneNumber: validatedPhone.replace(/^254/, '0'), // Convert to local format,
      CallBackURL: callbackUrl,
      AccountReference: reference || MPESA_CONFIG.accountReference,
      TransactionDesc: description || MPESA_CONFIG.transactionDesc,
      BillRefNumber: MPESA_CONFIG.accountNumber,
      QueueTimeOutURL: callbackUrl,
      ResultURL: callbackUrl,
      MerchantRequestID: MPESA_CONFIG.merchantId
    };

    // Log payment request
    console.log('M-Pesa payment request', paymentRequest);

    // Generate access token
    const accessToken = await generateAccessToken();
    
    // Make payment request with timeout
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), timeout * 1000);

    try {
      const response = await axios.post(
        `${MPESA_CONFIG.apiEndpoint}/mpesa/stkpush/v1/processrequest`,
        paymentRequest,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            'Content-Type': 'application/json',
          },
          signal: controller.signal
        }
      );

      // Log successful response
      console.log('M-Pesa payment initiated successfully', response.data);

      return {
        success: true,
        transactionId: response.data.CheckoutRequestID,
        merchantRequestId: response.data.MerchantRequestID
      };
    } catch (error: unknown) {
      if (error instanceof Error && error.name === 'AbortError') {
        throw new Error('Payment request timed out');
      }
      throw error;
    } finally {
      clearTimeout(timeoutId);
    }
  } catch (error: unknown) {
    // Log error
    console.error('M-Pesa payment error', error instanceof Error ? error.message : String(error));

    // Handle specific error cases
    const errorMessage = error instanceof Error ? error.message : String(error);
    if (errorMessage.includes('timeout') && retryCount < env.MPESA_MAX_RETRIES) {
      console.log('Retrying payment due to timeout');
      return initiatePayment({
        amount,
        phoneNumber,
        reference,
        callbackUrl,
        description,
        paymentMethod,
        retryCount: retryCount + 1,
        timeout
      });
    }

    // Handle API errors with response data
    const apiError = error as any;
    const apiResponse = apiError.response?.data;

    return {
      success: false,
      message: apiResponse?.errorMessage || 
               apiResponse?.error_description || 
               errorMessage,
      errorCode: apiResponse?.errorCode || 'PAYMENT_FAILED',
      retryCount
    };
  }
}
