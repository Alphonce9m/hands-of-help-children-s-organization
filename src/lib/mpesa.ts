import axios from 'axios';
import crypto from 'crypto';

const BASE_URL = process.env.NODE_ENV === 'production'
  ? 'https://api.safaricom.co.ke'
  : 'https://sandbox.safaricom.co.ke';

interface STKPushParams {
  accessToken: string;
  phoneNumber: string;
  amount: number;
  callbackUrl: string;
}

interface STKPushResponse {
  success: boolean;
  CheckoutRequestID?: string;
  message?: string;
  errorCode?: string;
}

export async function generateAccessToken(): Promise<string> {
  try {
    const auth = Buffer.from(
      `${process.env.MPESA_CONSUMER_KEY}:${process.env.MPESA_CONSUMER_SECRET}`
    ).toString('base64');

    const response = await axios.get(`${BASE_URL}/oauth/v1/generate?grant_type=client_credentials`, {
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
    throw new Error(
      error.response?.data?.errorMessage || 
      error.response?.data?.error_description || 
      'Failed to generate access token'
    );
  }
}

export async function initiateSTKPush({
  accessToken,
  phoneNumber,
  amount,
  callbackUrl,
}: STKPushParams): Promise<STKPushResponse> {
  try {
    // Validate inputs
    if (!phoneNumber || !amount || !callbackUrl) {
      throw new Error('Missing required parameters');
    }

    if (amount < 1 || amount > 150000) {
      throw new Error('Amount must be between KES 1 and KES 150,000');
    }

    const timestamp = new Date().toISOString().replace(/[^0-9]/g, '').slice(0, -3);
    const password = generatePassword(
      process.env.MPESA_SHORTCODE!,
      process.env.MPESA_PASSKEY!,
      timestamp
    );

    const stkPushRequest = {
      BusinessShortCode: process.env.MPESA_SHORTCODE,
      Password: password,
      Timestamp: timestamp,
      TransactionType: 'CustomerPayBillOnline',
      Amount: Math.round(amount),
      PartyA: phoneNumber,
      PartyB: process.env.MPESA_SHORTCODE,
      PhoneNumber: phoneNumber,
      CallBackURL: callbackUrl,
      AccountReference: process.env.MPESA_ACCOUNT_REFERENCE || 'Hands of Help',
      TransactionDesc: process.env.MPESA_TRANSACTION_DESC || 'Donation to Hands of Help',
    };

    console.log('Initiating STK Push with request:', {
      ...stkPushRequest,
      Password: '[REDACTED]',
    });

    const response = await axios.post(
      `${BASE_URL}/mpesa/stkpush/v1/processrequest`,
      stkPushRequest,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
      }
    );

    console.log('STK Push response:', response.data);

    if (response.data.ResponseCode === '0') {
      return {
        success: true,
        CheckoutRequestID: response.data.CheckoutRequestID,
        message: 'STK Push sent successfully',
      };
    } else {
      return {
        success: false,
        message: response.data.ResponseDescription || 'Failed to initiate payment',
        errorCode: response.data.ResponseCode,
      };
    }
  } catch (error: any) {
    console.error('Error initiating STK Push:', error.response?.data || error.message);
    return {
      success: false,
      message: error.response?.data?.ResponseDescription || 
               error.response?.data?.errorMessage || 
               'Failed to initiate payment',
      errorCode: error.response?.data?.ResponseCode,
    };
  }
}

function generatePassword(
  shortcode: string,
  passkey: string,
  timestamp: string
): string {
  const str = shortcode + passkey + timestamp;
  return crypto.createHash('sha256').update(str).digest('hex');
} 