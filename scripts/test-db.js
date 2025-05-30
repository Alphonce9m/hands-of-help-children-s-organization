const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function testDatabaseConnection() {
  try {
    console.log('Testing database connection...');

    // Test 1: Basic connection
    await prisma.$connect();
    console.log('✅ Successfully connected to the database');

    // Test 2: Create a test admin
    const testAdmin = await prisma.admin.create({
      data: {
        email: 'test@example.com',
        password: 'test123',
        name: 'Test Admin',
      },
    });
    console.log('✅ Successfully created test admin:', testAdmin);

    // Test 3: Create a test donor
    const testDonor = await prisma.donor.create({
      data: {
        email: 'donor@example.com',
        name: 'Test Donor',
        phoneNumber: '254700000000',
      },
    });
    console.log('✅ Successfully created test donor:', testDonor);

    // Test 4: Create a test donation
    const testDonation = await prisma.donation.create({
      data: {
        reference: 'TEST-' + Date.now(),
        amount: 100,
        status: 'COMPLETED',
        phoneNumber: '254700000000',
        name: 'Test Donor',
        email: 'donor@example.com',
        frequency: 'ONE_TIME',
        donor: {
          connect: {
            id: testDonor.id,
          },
        },
      },
    });
    console.log('✅ Successfully created test donation:', testDonation);

    // Test 5: Clean up test data
    await prisma.donation.delete({
      where: { id: testDonation.id },
    });
    console.log('✅ Successfully deleted test donation');

    await prisma.donor.delete({
      where: { id: testDonor.id },
    });
    console.log('✅ Successfully deleted test donor');

    await prisma.admin.delete({
      where: { id: testAdmin.id },
    });
    console.log('✅ Successfully deleted test admin');

    console.log('\n🎉 All database tests passed successfully!');
  } catch (error) {
    console.error('❌ Database test failed:', error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

testDatabaseConnection(); 