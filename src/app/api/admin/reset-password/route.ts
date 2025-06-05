import { NextResponse } from 'next/server';
import { prisma } from '@/lib/imports';
import { Resend } from 'resend';
import { randomBytes } from 'crypto';

// Initialize Resend with fallback for missing API key
const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null;

export async function POST(req: Request) {
  try {
    const { email } = await req.json();

    const admin = await prisma.admin.findUnique({
      where: { email },
    });

    if (!admin) {
      return NextResponse.json(
        { message: 'If an account exists with this email, you will receive password reset instructions.' },
        { status: 200 }
      );
    }

    // Generate reset token
    const resetToken = randomBytes(32).toString('hex');
    const resetTokenExpiry = new Date(Date.now() + 3600000); // 1 hour from now

    // Update admin with reset token
    await prisma.admin.update({
      where: { email },
      data: {
        resetToken,
        resetTokenExpiry,
      },
    });

    // Send reset email if Resend is configured
    if (resend) {
      const resetUrl = `${process.env.NEXTAUTH_URL}/admin/reset-password/${resetToken}`;
      
      await resend.emails.send({
        from: 'Hands of Help <noreply@handsofhelp.org>',
        to: email,
        subject: 'Reset Your Password',
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h2 style="color: #333;">Reset Your Password</h2>
            <p>Hello ${admin.name},</p>
            <p>You requested to reset your password. Click the button below to set a new password:</p>
            <div style="text-align: center; margin: 30px 0;">
              <a href="${resetUrl}" style="background-color: #3B82F6; color: white; padding: 12px 24px; text-decoration: none; border-radius: 4px; display: inline-block;">
                Reset Password
              </a>
            </div>
            <p>This link will expire in 1 hour.</p>
            <p>If you didn't request this, you can safely ignore this email.</p>
            <p>Best regards,<br>Hands of Help Team</p>
          </div>
        `,
      });
    } else {
      console.warn('Resend API key not configured. Skipping reset email.');
    }

    return NextResponse.json(
      { message: 'If an account exists with this email, you will receive password reset instructions.' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error sending reset email:', error);
    return NextResponse.json(
      { message: 'Failed to send reset instructions' },
      { status: 500 }
    );
  }
} 