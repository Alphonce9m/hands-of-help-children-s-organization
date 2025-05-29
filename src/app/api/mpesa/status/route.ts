import { NextResponse } from 'next/server';
import axios from 'axios';

const MPESA_CONSUMER_KEY = process.env.MPESA_CONSUMER_KEY!;
const MPESA_CONSUMER_SECRET = process.env.MPESA_CONSUMER_SECRET!;
const MPESA_PASSKEY = process.env.MPESA_PASSKEY!;
const MPESA_SHORTCODE = process.env.MPESA_SHORTCODE!;
const MPESA_ENV = process.env.MPESA_ENV || 'sandbox';

const getAccessToken = async () => {
  const auth = Buffer.from(`${MPESA_CONSUMER_KEY}:${MPESA_CONSUMER_SECRET}`).toString('base64');
  const response = await axios.get(
    `${MPESA_ENV === 'sandbox' ? 'https://sandbox.safaricom.co.ke' : 'https://api.safaricom.co.ke'}/oauth/v1/generate?grant_type=client_credentials`,
    {
      headers: {
        Authorization: `Basic ${auth}`,
      },
    }
  );
  return response.data.access_token;
};

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const checkoutRequestId = searchParams.get('checkoutRequestId');

    if (!checkoutRequestId) {
      return NextResponse.json(
        { error: 'Checkout request ID is required' },
        { status: 400 }
      );
    }

    // Get access token
    const accessToken = await getAccessToken();

    // Generate timestamp
    const timestamp = new Date().toISOString().replace(/[^0-9]/g, '').slice(0, -3);
    const password = Buffer.from(
      `${MPESA_SHORTCODE}${MPESA_PASSKEY}${timestamp}`
    ).toString('base64');

    // Check STK Push status
    const response = await axios.post(
      `${MPESA_ENV === 'sandbox' ? 'https://sandbox.safaricom.co.ke' : 'https://api.safaricom.co.ke'}/mpesa/stkpushquery/v1/query`,
      {
        BusinessShortCode: MPESA_SHORTCODE,
        Password: password,
        Timestamp: timestamp,
        CheckoutRequestID: checkoutRequestId,
      },
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    // Map M-Pesa status to our status
    const mpesaStatus = response.data.ResultDesc;
    let status = 'PENDING';

    if (mpesaStatus.includes('success') || mpesaStatus.includes('Success')) {
      status = 'SUCCESS';
    } else if (mpesaStatus.includes('fail') || mpesaStatus.includes('Fail')) {
      status = 'FAILED';
    }

    return NextResponse.json({ status });
  } catch (error) {
    console.error('Error checking M-Pesa payment status:', error);
    return NextResponse.json(
      { error: 'Failed to check payment status' },
      { status: 500 }
    );
  }
} 