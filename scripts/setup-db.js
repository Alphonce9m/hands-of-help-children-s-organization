const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient();

async function main() {
  try {
    // Create initial admin user
    const hashedPassword = await bcrypt.hash('admin123', 10);
    const admin = await prisma.admin.create({
      data: {
        email: 'admin@handsofhope.org',
        password: hashedPassword,
        name: 'System Admin',
        mfaEnabled: false
      }
    });
    console.log('Created admin user:', admin.email);

    // Create test donor
    const donor = await prisma.donor.create({
      data: {
        email: 'test@example.com',
        name: 'Test Donor',
        phoneNumber: '254700000000'
      }
    });
    console.log('Created test donor:', donor.email);

    // Create test donation
    const donation = await prisma.donation.create({
      data: {
        reference: 'TEST-001',
        amount: 1000,
        status: 'COMPLETED',
        phoneNumber: '254700000000',
        name: 'Test Donor',
        email: 'test@example.com',
        frequency: 'ONE_TIME',
        donorId: donor.id
      }
    });
    console.log('Created test donation:', donation.reference);

    // Create test subscription
    const subscription = await prisma.subscription.create({
      data: {
        status: 'ACTIVE',
        frequency: 'MONTHLY',
        amount: 500,
        phoneNumber: '254700000000',
        startDate: new Date(),
        nextPaymentAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days from now
        donorId: donor.id
      }
    });
    console.log('Created test subscription:', subscription.id);

    // Create test contact message
    const contactMessage = await prisma.contactMessage.create({
      data: {
        name: 'Test User',
        email: 'contact@example.com',
        subject: 'Test Message',
        message: 'This is a test message',
        status: 'NEW'
      }
    });
    console.log('Created test contact message:', contactMessage.id);

    console.log('Database setup completed successfully!');
  } catch (error) {
    console.error('Error setting up database:', error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

main(); 