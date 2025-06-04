import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

import type { DonationStatus } from '@/lib/types';

export async function POST(request: Request) {
  try {
    const body = await request.json();

    // Expecting donation reference and status update in body
    const { reference, status } = body;
    if (!reference || !status) {
      return NextResponse.json({ error: 'Missing reference or status' }, { status: 400 });
    }

    const donation = await prisma.donation.update({
      where: { reference },
      data: { status },
    });

    return NextResponse.json({ success: true, donation });
  } catch (error) {
    console.error('Donation update error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
