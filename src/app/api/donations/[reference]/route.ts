import { NextResponse } from 'next/server';
import { prisma } from '@/lib/imports';
import { DonationStatus, DonationFrequency } from '@prisma/client';

export async function GET(
  request: Request,
  { params }: { params: { reference: string } }
) {
  try {
    const { reference } = params;

    if (!reference) {
      return NextResponse.json(
        { success: false, message: 'Reference number is required' },
        { status: 400 }
      );
    }

    const donation = await prisma.donation.findUnique({
      where: { reference },
    });

    if (!donation) {
      return NextResponse.json(
        { success: false, message: 'Donation not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: {
        amount: donation.amount,
        reference: donation.reference,
        date: donation.createdAt.toLocaleDateString(),
        frequency: donation.frequency,
        status: donation.status,

      },
    });
  } catch (error) {
    console.error('Error fetching donation:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to fetch donation details' },
      { status: 500 }
    );
  }
} 