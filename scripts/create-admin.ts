import { PrismaClient } from '@prisma/client';
import { hash } from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  const email = process.env.ADMIN_EMAIL;
  const password = process.env.ADMIN_PASSWORD;
  const name = process.env.ADMIN_NAME || 'Admin';

  if (!email || !password) {
    console.error('Please provide ADMIN_EMAIL and ADMIN_PASSWORD environment variables');
    process.exit(1);
  }

  try {
    const hashedPassword = await hash(password, 12);

    const admin = await prisma.admin.upsert({
      where: { email },
      update: {
        password: hashedPassword,
        name,
      },
      create: {
        email,
        password: hashedPassword,
        name,
      },
    });

    console.log('Admin user created/updated successfully:', admin.email);
  } catch (error) {
    console.error('Error creating admin user:', error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

main(); 