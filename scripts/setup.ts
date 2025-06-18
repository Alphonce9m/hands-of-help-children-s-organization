import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';
import { Resend } from 'resend';
import dotenv from 'dotenv';

dotenv.config();

const prisma = new PrismaClient();
const resend = new Resend(process.env.RESEND_API_KEY);

async function setup() {
  try {
    // Test database connection
    console.log('Testing database connection...');
    await prisma.$connect();
    console.log('✅ Database connection successful');

    // Test email service
    console.log('Testing email service...');
    await resend.emails.send({
      from: process.env.SMTP_FROM!,
      to: process.env.ADMIN_EMAIL!,
      subject: 'Test Email',
      html: '<p>This is a test email to verify the email service is working.</p>'
    });
    console.log('✅ Email service test successful');

    // Create admin user
    console.log('Creating admin user...');
    const hashedPassword = await bcrypt.hash(process.env.ADMIN_PASSWORD!, 10);
    void await prisma.admin.create({
      data: {
        email: process.env.ADMIN_EMAIL!,
        password: hashedPassword,
        name: process.env.ADMIN_NAME || 'Admin',
      },
    });
    console.log('✅ Admin user created successfully');

    console.log('\nSetup completed successfully! 🎉');
    console.log('\nYou can now:');
    console.log('1. Start the development server with: npm run dev');
    console.log('2. Log in to the admin dashboard with:');
    console.log(`   Email: ${process.env.ADMIN_EMAIL}`);
    console.log(`   Password: ${process.env.ADMIN_PASSWORD}`);

  } catch (error) {
    console.error('Setup failed:', error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

setup(); 