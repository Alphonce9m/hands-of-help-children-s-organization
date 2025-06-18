import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const seed = async () => {
  // Create a sample donor
  const donor = await prisma.donor.create({
    data: {
      email: 'donor@example.com',
      name: 'John Doe',
      phoneNumber: '+255712345678',
      mpesaAccountType: 'Personal',
    },
  });

  // Create a sample donation
  await prisma.donation.create({
    data: {
      reference: 'DONATION-123456',
      amount: 10000,
      status: 'COMPLETED',
      phoneNumber: donor.phoneNumber,
      name: donor.name,
      email: donor.email,
      frequency: 'ONE_TIME',
      transactionId: 'TXN-123456',
      receiptNumber: 'RCPT-123456',
      transactionDate: new Date(),
      donor: {
        connect: { id: donor.id },
      },
    },
  });

  console.log('Seed completed!');
};

seed()
  .catch((e) => {
    console.error('Seed failed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
