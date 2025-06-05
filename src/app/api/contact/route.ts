import { NextResponse } from 'next/server';
import { prisma, sendContactFormEmail } from '@/lib/imports';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, subject, message } = body;

    // Validate required fields
    if (!name || !email || !subject || !message) {
      return NextResponse.json(
        { message: 'All fields are required' },
        { status: 400 }
      );
    }

    // Create contact message record
    const contactMessage = await prisma.contactMessage.create({
      data: {
        name,
        email,
        subject,
        message,
        status: 'NEW',
  },
});

    // Send email notification
    try {
      await sendContactFormEmail({
        to: 'handsofhelpchildrenorg@gmail.com',
        from: process.env.SMTP_FROM_EMAIL || 'noreply@handsofhelp.org',
        subject: `New Contact Form Submission: ${subject}`,
        name,
        email,
        message,
      });

      // Send confirmation email to the sender
      await sendContactFormEmail({
        to: email,
        from: process.env.SMTP_FROM_EMAIL || 'noreply@handsofhelp.org',
        subject: 'Thank you for contacting Hands of Help',
        name,
        email,
        message: `Thank you for contacting Hands of Help. We have received your message and will get back to you soon.\n\nYour message:\n${message}`,
      });
    } catch (emailError) {
      console.error('Failed to send contact form email:', emailError);
      // Don't fail the request if email fails
    }

    return NextResponse.json({
      success: true,
      message: 'Message sent successfully',
      data: {
        id: contactMessage.id,
      },
    });
  } catch (error: any) {
    console.error('Contact form submission error:', error);
    return NextResponse.json(
      { message: error.message || 'Failed to send message' },
      { status: 500 }
    );
  }
} 