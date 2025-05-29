import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import { ApiError, errorHandler } from '@/middleware/error-handler';

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT),
  secure: true,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASSWORD,
  },
});

const validateContactData = (data: any) => {
  if (!data.name || typeof data.name !== 'string' || data.name.length < 2) {
    throw new ApiError(400, 'Name is required and must be at least 2 characters long');
  }
  if (!data.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
    throw new ApiError(400, 'Valid email is required');
  }
  if (!data.subject || typeof data.subject !== 'string' || data.subject.length < 3) {
    throw new ApiError(400, 'Subject is required and must be at least 3 characters long');
  }
  if (!data.message || typeof data.message !== 'string' || data.message.length < 10) {
    throw new ApiError(400, 'Message is required and must be at least 10 characters long');
  }
};

export async function POST(req: Request) {
  try {
    const data = await req.json();
    validateContactData(data);

    // Send email
    await transporter.sendMail({
      from: process.env.SMTP_FROM,
      to: process.env.CONTACT_EMAIL,
      subject: `New Contact Form Submission: ${data.subject}`,
      html: `
        <h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${data.name}</p>
        <p><strong>Email:</strong> ${data.email}</p>
        <p><strong>Subject:</strong> ${data.subject}</p>
        <p><strong>Message:</strong></p>
        <p>${data.message}</p>
      `,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    return errorHandler(error);
  }
} 