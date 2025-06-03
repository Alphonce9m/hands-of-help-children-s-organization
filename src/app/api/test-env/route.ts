import { NextResponse } from 'next/server';

export async function GET() {
  // Check if environment variables are set
  const envVars = {
    MPESA_CONSUMER_KEY: process.env.MPESA_CONSUMER_KEY ? 'Set' : 'Not Set',
    MPESA_CONSUMER_SECRET: process.env.MPESA_CONSUMER_SECRET ? 'Set' : 'Not Set',
    MPESA_PASSKEY: process.env.MPESA_PASSKEY ? 'Set' : 'Not Set',
    MPESA_SHORTCODE: process.env.MPESA_SHORTCODE ? 'Set' : 'Not Set',
    MPESA_ENV: process.env.MPESA_ENV || 'sandbox',
    NEXT_PUBLIC_BASE_URL: process.env.NEXT_PUBLIC_BASE_URL || 'Not Set',
  };

  return NextResponse.json(envVars);
} 