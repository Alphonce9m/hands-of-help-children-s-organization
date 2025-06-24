import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { env } from '@/lib/env';
import { z } from 'zod';

const createDonationSchema = z.object({
  amount: z.number().min(1),
  phoneNumber: z.string().min(10),
  name: z.string().optional(),
  email: z.string().email().optional(),
  frequency: z.enum(['ONE_TIME', 'MONTHLY', 'QUARTERLY', 'YEARLY']),
});

type CreateDonationInput = z.infer<typeof createDonationSchema>;

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const validatedData = createDonationSchema.parse(body);

    // Generate a unique reference
    const reference = `DON-${Math.random().toString(36).substring(2)}`;

    // Create the donation
    const donation = await prisma.donation.create({
      data: {
        reference,
        amount: validatedData.amount,
        status: 'PENDING',
        phoneNumber: validatedData.phoneNumber,
        name: validatedData.name,
        email: validatedData.email,
        frequency: validatedData.frequency,
      },
    });

    // Return success response with donation details
    return NextResponse.json({ success: true, donation });
  } catch (error) {
    console.error('Create donation error:', error);
    return NextResponse.json(
      { error: 'Invalid input data' },
      { status: 400 }
    );
  }
}
