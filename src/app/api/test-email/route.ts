import { NextResponse } from 'next/server';
import { sendContactFormEmail } from '@/lib/email';

export async function GET() {
  try {
    await sendContactFormEmail({
      to: 'handsofhelpchildrenorg@gmail.com',
      from: 'handsofhelpchildrenorg@gmail.com',
      subject: 'Test Email from Hands of Help Website',
      name: 'Test User',
      email: 'test@example.com',
      message: 'This is a test email to verify the email configuration is working correctly.',
    });

    return NextResponse.json({
      success: true,
      message: 'Test email sent successfully',
    });
  } catch (error: any) {
    console.error('Test email error:', error);
    return NextResponse.json(
      { 
        success: false,
        message: 'Failed to send test email',
        error: error.message 
      },
      { status: 500 }
    );
  }
} 