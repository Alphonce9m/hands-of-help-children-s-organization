import { NextResponse } from 'next/server';
import { Resend } from 'resend';
import { createClient } from '@supabase/supabase-js';
import { prisma } from '@/lib/imports';

const resendApiKey = process.env.RESEND_API_KEY;
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!resendApiKey || !supabaseUrl || !supabaseKey) {
  console.error('Missing required environment variables');
  throw new Error('Missing required environment variables');
}

const resend = new Resend(resendApiKey);
const supabase = createClient(supabaseUrl, supabaseKey);

export async function POST(request: Request) {
  try {
    const { email, token, name } = await request.json();
    
    if (!email || !token) {
      return NextResponse.json(
        { error: 'Email and token are required' },
        { status: 400 }
      );
    }

    // Verify the token exists in the database
    const { data: subscriber, error: dbError } = await supabase
      .from('subscribers')
      .select('id, verification_token')
      .eq('email', email)
      .single();

    if (dbError || !subscriber || subscriber.verification_token !== token) {
      return NextResponse.json(
        { error: 'Invalid verification token' },
        { status: 400 }
      );
    }

    // Send verification email
    const verificationUrl = `${process.env.NEXT_PUBLIC_APP_URL}/api/newsletter/verify?token=${token}&email=${encodeURIComponent(email)}`;
    
    const { error: emailError } = await resend.emails.send({
      from: 'Hands of Hope <newsletter@handsofhope.org>',
      to: email,
      subject: 'Verify your email address',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2>Welcome to Hands of Hope, ${name || 'Friend'}!</h2>
          <p>Thank you for subscribing to our newsletter. Please verify your email address by clicking the button below:</p>
          <p style="margin: 30px 0;">
            <a href="${verificationUrl}" 
               style="display: inline-block; padding: 12px 24px; background-color: #4f46e5; color: white; text-decoration: none; border-radius: 4px;">
              Verify Email Address
            </a>
          </p>
          <p>Or copy and paste this link into your browser:</p>
          <p><a href="${verificationUrl}" style="color: #4f46e5; word-break: break-all;">${verificationUrl}</a></p>
          <p>If you didn't request this, please ignore this email.</p>
          <hr style="border: none; border-top: 1px solid #e5e7eb; margin: 30px 0;" />
          <p style="font-size: 12px; color: #6b7280;">
            © ${new Date().getFullYear()} Hands of Hope. All rights reserved.
          </p>
        </div>
      `,
    });

    if (emailError) {
      console.error('Error sending verification email:', emailError);
      return NextResponse.json(
        { error: 'Failed to send verification email' },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error in send-verification:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
