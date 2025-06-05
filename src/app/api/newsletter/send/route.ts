import { NextRequest, NextResponse } from 'next/server';
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

export async function POST(req: NextRequest) {
  try {
    // Admin secret check
    const { secret } = await req.json();
    if (secret !== process.env.NEWSLETTER_ADMIN_SECRET) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Get latest newsletter
    const { data: newsletters, error: newsletterError } = await supabase
      .from('newsletters')
      .select('*')
      .order('updated_at', { ascending: false })
      .limit(1);
      
    if (newsletterError) throw newsletterError;
    if (!newsletters || newsletters.length === 0) {
      return NextResponse.json({ error: 'No newsletter found' }, { status: 404 });
    }
    
    const newsletter = newsletters[0];

    // Get all verified subscribers who haven't unsubscribed
    const { data: subscribers, error: subscribersError } = await supabase
      .from('subscribers')
      .select('email, name')
      .eq('is_verified', true)
      .eq('unsubscribed', false);
      
    if (subscribersError) throw subscribersError;
    if (!subscribers || subscribers.length === 0) {
      return NextResponse.json({ error: 'No active subscribers found' }, { status: 404 });
    }

    // Prepare email content
    const subject = newsletter.title || 'Newsletter Update';
    const html = newsletter.body || '';
    const unsubscribeBaseUrl = `${process.env.NEXT_PUBLIC_APP_URL}/newsletter/unsubscribe`;

    // Send emails in batches to avoid rate limiting
    const BATCH_SIZE = 20;
    const results = [];
    let successCount = 0;
    let failCount = 0;

    for (let i = 0; i < subscribers.length; i += BATCH_SIZE) {
      const batch = subscribers.slice(i, i + BATCH_SIZE);
      const batchResults = await Promise.allSettled(
        batch.map(subscriber => {
          const unsubscribeUrl = `${unsubscribeBaseUrl}?email=${encodeURIComponent(subscriber.email)}`;
          
          return resend.emails.send({
            from: 'Hands of Hope <newsletter@handsofhope.org>',
            to: subscriber.email,
            subject,
            html: `
              <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
                ${html}
                <hr style="border: none; border-top: 1px solid #e5e7eb; margin: 30px 0;" />
                <p style="font-size: 12px; color: #6b7280;">
                  You're receiving this email because you subscribed to our newsletter. 
                  <a href="${unsubscribeUrl}" style="color: #4f46e5;">Unsubscribe</a>.
                </p>
                <p style="font-size: 12px; color: #6b7280; margin-top: 8px;">
                  © ${new Date().getFullYear()} Hands of Hope. All rights reserved.
                </p>
              </div>
            `,
          });
        })
      );

      // Process batch results
      const batchSuccess = batchResults.filter(r => r.status === 'fulfilled').length;
      const batchFail = batchResults.filter(r => r.status === 'rejected').length;
      
      successCount += batchSuccess;
      failCount += batchFail;
      
      // Add detailed results
      results.push(...batchResults);
      
      // Add a small delay between batches to avoid rate limiting
      if (i + BATCH_SIZE < subscribers.length) {
        await new Promise(resolve => setTimeout(resolve, 1000));
      }
    }

    // Log the send operation
    await supabase
      .from('newsletter_sends')
      .insert([{
        newsletter_id: newsletter.id,
        sent_at: new Date().toISOString(),
        total_recipients: successCount + failCount,
        success_count: successCount,
        fail_count: failCount,
      }]);

    return NextResponse.json({
      success: true,
      sent: successCount,
      failed: failCount,
      total: successCount + failCount,
    });
  } catch (error) {
    console.error('Error sending newsletter:', error);
    return NextResponse.json(
      { error: 'Failed to send newsletter', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}
