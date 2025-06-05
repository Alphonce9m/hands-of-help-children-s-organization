import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { prisma } from '@/lib/imports';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error('Missing Supabase environment variables');
  throw new Error('Missing required environment variables');
}

const supabase = createClient(supabaseUrl, supabaseKey);

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const token = searchParams.get('token');
    const email = searchParams.get('email');

    if (!token || !email) {
      return new NextResponse('Missing token or email', { status: 400 });
    }

    // Verify the token and email match in the database
    const { data: subscriber, error: dbError } = await supabase
      .from('subscribers')
      .select('id, verification_token, is_verified')
      .eq('email', email)
      .eq('verification_token', token)
      .single();

    if (dbError || !subscriber) {
      return new NextResponse('Invalid or expired verification link', { status: 400 });
    }

    if (subscriber.is_verified) {
      return new NextResponse('Email already verified', { status: 400 });
    }

    // Update the subscriber as verified
    const { error: updateError } = await supabase
      .from('subscribers')
      .update({ 
        is_verified: true,
        verification_token: null,
        updated_at: new Date().toISOString()
      })
      .eq('id', subscriber.id);

    if (updateError) {
      console.error('Error updating subscriber:', updateError);
      throw new Error('Failed to verify email');
    }

    // Redirect to success page
    return new NextResponse(null, {
      status: 302,
      headers: {
        Location: '/newsletter/verified',
      },
    });
  } catch (error) {
    console.error('Error in verify endpoint:', error);
    return new NextResponse('Internal server error', { status: 500 });
  }
}
