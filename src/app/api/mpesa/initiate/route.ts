import { NextResponse } from 'next/server';
import axios from 'axios';
import { generateReference } from '@/utils/reference';
import { prisma } from '@/lib/prisma';
import { formatPhoneNumber } from '@/lib/utils';
import { generateAccessToken, initiateSTKPush } from '@/lib/mpesa';

// Debug logging
console.log('M-Pesa API Configuration:');
console.log('Environment:', process.env.MPESA_ENV);
console.log('Shortcode:', process.env.MPESA_SHORTCODE);
console.log('Base URL:', process.env.NEXT_PUBLIC_BASE_URL);

// M-Pesa API configuration
const MPESA_CONSUMER_KEY = process.env.MPESA_CONSUMER_KEY;
const MPESA_CONSUMER_SECRET = process.env.MPESA_CONSUMER_SECRET;
const MPESA_PASSKEY = process.env.MPESA_PASSKEY;
const MPESA_SHORTCODE = process.env.MPESA_SHORTCODE;
const MPESA_ENV = process.env.MPESA_ENV || 'sandbox';

// Validate required environment variables only at runtime
function validateMpesaConfig() {
  if (!MPESA_CONSUMER_KEY || !MPESA_CONSUMER_SECRET || !MPESA_PASSKEY || !MPESA_SHORTCODE) {
    console.error('Missing M-Pesa environment variables:', {
      CONSUMER_KEY: MPESA_CONSUMER_KEY ? 'Set' : 'Missing',
      CONSUMER_SECRET: MPESA_CONSUMER_SECRET ? 'Set' : 'Missing',
      PASSKEY: MPESA_PASSKEY ? 'Set' : 'Missing',
      SHORTCODE: MPESA_SHORTCODE ? 'Set' : 'Missing'
    });
    throw new Error('M-Pesa configuration is incomplete');
  }
}

// Type assertion after validation
const CONSUMER_KEY: string = MPESA_CONSUMER_KEY || '';
const CONSUMER_SECRET: string = MPESA_CONSUMER_SECRET || '';
const PASSKEY: string = MPESA_PASSKEY || '';
const SHORTCODE: string = MPESA_SHORTCODE || '';

// M-Pesa API endpoints
const MPESA_AUTH_URL = MPESA_ENV === 'sandbox'
  ? 'https://sandbox.safaricom.co.ke/oauth/v1/generate?grant_type=client_credentials'
  : 'https://api.safaricom.co.ke/oauth/v1/generate?grant_type=client_credentials';

const MPESA_STK_PUSH_URL = MPESA_ENV === 'sandbox'
  ? 'https://sandbox.safaricom.co.ke/mpesa/stkpush/v1/processrequest'
  : 'https://api.safaricom.co.ke/mpesa/stkpush/v1/processrequest';

// Generate timestamp in the format required by M-Pesa
const generateTimestamp = () => {
  const date = new Date();
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  const hour = String(date.getHours()).padStart(2, '0');
  const minute = String(date.getMinutes()).padStart(2, '0');
  const second = String(date.getSeconds()).padStart(2, '0');
  return `${year}${month}${day}${hour}${minute}${second}`;
};

// Generate password for M-Pesa API
const generatePassword = (timestamp: string) => {
  const str = `${SHORTCODE}${PASSKEY}${timestamp}`;
  return Buffer.from(str).toString('base64');
};

// Get M-Pesa access token
async function getAccessToken() {
  try {
    validateMpesaConfig(); // Validate at runtime
    const auth = Buffer.from(`${CONSUMER_KEY}:${CONSUMER_SECRET}`).toString('base64');
    const response = await axios.get(MPESA_AUTH_URL, {
      headers: {
        Authorization: `Basic ${auth}`,
      },
    });
    return response.data.access_token;
  } catch (error) {
    console.error('Error getting M-Pesa access token:', error);
    throw new Error('Failed to get M-Pesa access token');
  }
}

// Simple test endpoint
export async function GET() {
  try {
    return NextResponse.json({ message: 'API is working' });
  } catch (error) {
    console.error('GET request error:', error);
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    validateMpesaConfig(); // Validate at runtime
    
    console.log('Received POST request to /api/mpesa/initiate');
    
    const body = await request.json();
    console.log('Request body:', body);
    
    const { phoneNumber, amount, name, email } = body;

    // Validate required fields
    if (!phoneNumber || !amount) {
      console.error('Missing required fields:', { phoneNumber, amount });
      return NextResponse.json(
        { message: 'Phone number and amount are required' },
        { status: 400 }
      );
    }

    // Format phone number
    const formattedPhone = formatPhoneNumber(phoneNumber);
    console.log('Formatted phone number:', formattedPhone);

    // Create donation record
    const donation = await prisma.donation.create({
      data: {
        reference: `DON-${Date.now()}`,
        amount: Number(amount),
        status: 'PENDING',
        phoneNumber: formattedPhone,
        name: name || null,
        email: email || null,
        frequency: 'ONE_TIME',
      },
    });
    console.log('Created donation record:', donation);

    // Generate M-Pesa access token
    const accessToken = await generateAccessToken();
    console.log('Generated access token');

    // Get callback URL
    const callbackUrl = `${process.env.NEXT_PUBLIC_APP_URL}/api/mpesa/callback`;
    console.log('Callback URL:', callbackUrl);

    // Initiate STK Push
    const stkResponse = await initiateSTKPush({
      accessToken,
      phoneNumber: formattedPhone,
      amount: Number(amount),
      callbackUrl,
    });
    console.log('STK Push response:', stkResponse);

    if (!stkResponse.success) {
      // Update donation status to failed
      await prisma.donation.update({
        where: { id: donation.id },
        data: {
          status: 'FAILED',
          mpesaResultDesc: stkResponse.message,
          mpesaResultCode: stkResponse.errorCode,
        },
      });

      return NextResponse.json(
        { message: stkResponse.message },
        { status: 400 }
      );
    }

    // Update donation with M-Pesa request IDs
    await prisma.donation.update({
      where: { id: donation.id },
      data: {
        mpesaCheckoutRequestId: stkResponse.CheckoutRequestID,
        mpesaMerchantRequestId: `MER-${Date.now()}`,
      },
    });

    return NextResponse.json({
      success: true,
      message: 'Payment initiated successfully',
      data: {
        checkoutRequestId: stkResponse.CheckoutRequestID,
        merchantRequestId: `MER-${Date.now()}`,
        donationId: donation.id,
      },
    });
  } catch (error: any) {
    console.error('M-Pesa payment initiation error:', error);
    return NextResponse.json(
      { message: error.message || 'Failed to initiate payment' },
      { status: 500 }
    );
  }
} 