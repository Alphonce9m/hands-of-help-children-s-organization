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

const validateVolunteerData = (data: any) => {
  if (!data.name || typeof data.name !== 'string' || data.name.length < 2) {
    throw new ApiError(400, 'Name is required and must be at least 2 characters long');
  }
  if (!data.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
    throw new ApiError(400, 'Valid email is required');
  }
  if (!data.phone || !/^\+?[\d\s-]{10,}$/.test(data.phone)) {
    throw new ApiError(400, 'Valid phone number is required');
  }
  if (!data.role || typeof data.role !== 'string') {
    throw new ApiError(400, 'Role is required');
  }
  if (!data.availability || typeof data.availability !== 'string') {
    throw new ApiError(400, 'Availability is required');
  }
  if (!data.experience || typeof data.experience !== 'string' || data.experience.length < 20) {
    throw new ApiError(400, 'Experience is required and must be at least 20 characters long');
  }
};

export async function POST(req: Request) {
  try {
    const data = await req.json();
    validateVolunteerData(data);

    // Send email to admin
    await transporter.sendMail({
      from: process.env.SMTP_FROM,
      to: process.env.VOLUNTEER_EMAIL,
      subject: `New Volunteer Application: ${data.role}`,
      html: `
        <h2>New Volunteer Application</h2>
        <p><strong>Name:</strong> ${data.name}</p>
        <p><strong>Email:</strong> ${data.email}</p>
        <p><strong>Phone:</strong> ${data.phone}</p>
        <p><strong>Role:</strong> ${data.role}</p>
        <p><strong>Availability:</strong> ${data.availability}</p>
        <p><strong>Experience:</strong></p>
        <p>${data.experience}</p>
      `,
    });

    // Send confirmation email to volunteer
    await transporter.sendMail({
      from: process.env.SMTP_FROM,
      to: data.email,
      subject: 'Thank you for your volunteer application',
      html: `
        <h2>Thank you for your interest in volunteering!</h2>
        <p>Dear ${data.name},</p>
        <p>We have received your application to volunteer as a ${data.role}. Our team will review your application and get back to you within 5-7 business days.</p>
        <p>If you have any questions in the meantime, please don't hesitate to contact us.</p>
        <p>Best regards,<br>Hands of Help Team</p>
      `,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    return errorHandler(error);
  }
} 