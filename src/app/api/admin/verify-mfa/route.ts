import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { prisma } from '@/lib/imports';
import { Resend } from 'resend';
import { randomBytes } from 'crypto';
import { cookies } from 'next/headers';
import { headers } from 'next/headers';

// Initialize Resend with fallback for missing API key
const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null;
const REMEMBER_DEVICE_DAYS = 30;

const getDeviceInfo = () => {
  const headersList = headers();
  const userAgent = headersList.get('user-agent') || 'Unknown Device';
  const ip = headersList.get('x-forwarded-for') || 'Unknown IP';
  const timestamp = new Date().toLocaleString();

  return {
    userAgent,
    ip,
    timestamp,
  };
};

const sendNewDeviceEmail = async (admin: any, deviceInfo: any) => {
  if (!resend) {
    console.warn('Resend API key not configured. Skipping email notification.');
    return;
  }
  
  await resend.emails.send({
    from: 'Hands of Help <noreply@handsofhelp.org>',
    to: admin.email,
    subject: 'New Device Login Detected',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #333;">New Device Login</h2>
        <p>Hello ${admin.name},</p>
        <p>A new device has logged into your account:</p>
        <div style="background-color: #f3f4f6; padding: 20px; border-radius: 4px; margin: 20px 0;">
          <p><strong>Time:</strong> ${deviceInfo.timestamp}</p>
          <p><strong>Device:</strong> ${deviceInfo.userAgent}</p>
          <p><strong>IP Address:</strong> ${deviceInfo.ip}</p>
        </div>
        <p>If this was you, you can ignore this email. If you didn't log in from this device, please secure your account immediately.</p>
        <p>Best regards,<br>Hands of Help Team</p>
      </div>
    `,
  });
};

export async function POST(req: Request) {
  try {
    const session = await getServerSession();
    if (!session?.user?.email) {
      return NextResponse.json(
        { message: 'Unauthorized' },
        { status: 401 }
      );
    }

    const { code, callbackUrl, rememberDevice, isBackupCode } = await req.json();

    const admin = await prisma.admin.findUnique({
      where: { email: session.user.email },
    });

    if (!admin) {
      return NextResponse.json(
        { message: 'Admin not found' },
        { status: 404 }
      );
    }

    let isValid = false;

    if (isBackupCode) {
      // Verify backup code
      const backupCodes = admin.mfaBackupCodes || [];
      const codeIndex = backupCodes.indexOf(code);
      
      if (codeIndex !== -1) {
        // Remove used backup code
        backupCodes.splice(codeIndex, 1);
        await prisma.admin.update({
          where: { id: admin.id },
          data: { mfaBackupCodes: backupCodes },
        });
        isValid = true;
      }
    } else {
      // Verify email code
      isValid = code === admin.mfaSecret;
    }

    if (isValid) {
      // Clear the MFA secret after successful verification
      await prisma.admin.update({
        where: { id: admin.id },
        data: { mfaSecret: null },
      });

      const deviceInfo = getDeviceInfo();
      let isNewDevice = true;

      // Set remember device cookie if requested
      if (rememberDevice) {
        const cookieStore = cookies();
        const deviceToken = randomBytes(32).toString('hex');
        const expiryDate = new Date();
        expiryDate.setDate(expiryDate.getDate() + REMEMBER_DEVICE_DAYS);

        cookieStore.set('mfa_remember', deviceToken, {
          expires: expiryDate,
          httpOnly: true,
          secure: process.env.NODE_ENV === 'production',
          sameSite: 'lax',
          path: '/',
        });

        // Store device token in database
        await prisma.admin.update({
          where: { id: admin.id },
          data: {
            mfaRememberToken: deviceToken,
            mfaRememberExpiry: expiryDate,
          },
        });

        // Check if this is a new device
        isNewDevice = !admin.mfaRememberToken;
      }

      // Send new device notification if this is a new device
      if (isNewDevice) {
        await sendNewDeviceEmail(admin, deviceInfo);
      }

      return NextResponse.json({ callbackUrl });
    }

    return NextResponse.json(
      { message: isBackupCode ? 'Invalid backup code' : 'Invalid verification code' },
      { status: 400 }
    );
  } catch (error) {
    console.error('Error verifying MFA:', error);
    return NextResponse.json(
      { message: 'Failed to verify code' },
      { status: 500 }
    );
  }
}

export async function GET(req: Request) {
  try {
    const session = await getServerSession();
    if (!session?.user?.email) {
      return NextResponse.json(
        { message: 'Unauthorized' },
        { status: 401 }
      );
    }

    const admin = await prisma.admin.findUnique({
      where: { email: session.user.email },
    });

    if (!admin) {
      return NextResponse.json(
        { message: 'Admin not found' },
        { status: 404 }
      );
    }

    // Generate a new verification code
    const verificationCode = Math.floor(100000 + Math.random() * 900000).toString();
    const codeExpiry = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes

    // Update admin with new verification code
    await prisma.admin.update({
      where: { id: admin.id },
      data: {
        mfaSecret: verificationCode,
      },
    });

    // Send verification email if Resend is configured
    if (resend) {
      await resend.emails.send({
        from: 'Hands of Help <noreply@handsofhelp.org>',
        to: admin.email,
        subject: 'Your Verification Code',
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h2 style="color: #333;">Your Verification Code</h2>
            <p>Hello ${admin.name},</p>
            <p>Your verification code is:</p>
            <div style="text-align: center; margin: 30px 0;">
              <div style="background-color: #f3f4f6; padding: 20px; border-radius: 4px; font-size: 24px; letter-spacing: 4px;">
                ${verificationCode}
              </div>
            </div>
            <p>This code will expire in 10 minutes.</p>
            <p>If you didn't request this code, please ignore this email.</p>
            <p>Best regards,<br>Hands of Help Team</p>
          </div>
        `,
      });
    } else {
      console.warn('Resend API key not configured. Skipping verification email.');
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error generating verification code:', error);
    return NextResponse.json(
      { message: 'Failed to generate verification code' },
      { status: 500 }
    );
  }
} 