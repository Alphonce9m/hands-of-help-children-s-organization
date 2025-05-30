import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json({
    success: true,
    data: {
      DATABASE_URL: process.env.DATABASE_URL ? 'Set' : 'Not Set',
      NEXT_PUBLIC_APP_URL: process.env.NEXT_PUBLIC_APP_URL || 'Not Set',
      NEXT_PUBLIC_BASE_URL: process.env.NEXT_PUBLIC_BASE_URL || 'Not Set',
      RESEND_API_KEY: process.env.RESEND_API_KEY ? 'Set' : 'Not Set',
      NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET ? 'Set' : 'Not Set',
      NEXTAUTH_URL: process.env.NEXTAUTH_URL || 'Not Set'
    }
  });
} 