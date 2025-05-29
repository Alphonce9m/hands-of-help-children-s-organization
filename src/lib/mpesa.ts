import axios from 'axios';
import crypto from 'crypto';

const BASE_URL = 'https://sandbox.safaricom.co.ke';

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

    return response.data.access_token;
  } catch (error) {
    console.error('Error generating access token:', error);
    throw new Error('Failed to generate access token');
  }
}

export async function initiateSTKPush({
  accessToken,
  phoneNumber,
  amount,
  callbackUrl,
}: STKPushParams): Promise<STKPushResponse> {
  try {
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
      AccountReference: 'Hands of Help',
      TransactionDesc: 'Donation to Hands of Help',
    };

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
      };
    }
  } catch (error) {
    console.error('Error initiating STK Push:', error);
    return {
      success: false,
      message: 'Failed to initiate payment',
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