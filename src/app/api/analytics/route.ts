import { NextResponse } from 'next/server';
import { prisma } from '@/lib/imports';

export async function GET() {
  // Mock data for the dashboard
  const stats = {
    totalAmount: 1250000,
    totalDonations: 156,
    averageDonation: 8012.82,
    byPaymentMethod: {
      'M-Pesa': { count: 98, amount: 750000 },
      'Stripe': { count: 58, amount: 500000 }
    },
    byFrequency: {
      'One-time': { count: 120, amount: 900000 },
      'Monthly': { count: 25, amount: 250000 },
      'Quarterly': { count: 8, amount: 75000 },
      'Annual': { count: 3, amount: 25000 }
    },
    recentDonations: [
      {
        id: '1',
        amount: 5000,
        createdAt: new Date().toISOString(),
        donor: { name: 'John Doe' }
      },
      {
        id: '2',
        amount: 10000,
        createdAt: new Date(Date.now() - 86400000).toISOString(),
        donor: { name: 'Jane Smith' }
      },
      {
        id: '3',
        amount: 2500,
        createdAt: new Date(Date.now() - 172800000).toISOString(),
        donor: { name: 'Anonymous' }
      }
    ],
    topDonors: [
      {
        name: 'John Doe',
        totalAmount: 150000,
        donationCount: 12
      },
      {
        name: 'Jane Smith',
        totalAmount: 120000,
        donationCount: 8
      },
      {
        name: 'Anonymous',
        totalAmount: 100000,
        donationCount: 15
      }
    ]
  };

  return NextResponse.json(stats);
} 