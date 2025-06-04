import { NextResponse } from 'next/server';

export async function GET() {
  // Check if environment variables are set
  const envVars = {

    NEXT_PUBLIC_BASE_URL: process.env.NEXT_PUBLIC_BASE_URL || 'Not Set',
  };

  return NextResponse.json(envVars);
} 