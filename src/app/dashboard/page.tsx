import { Suspense } from 'react';
import dynamic from 'next/dynamic';

const Dashboard = dynamic(() => import('@/components/Dashboard'), {
  ssr: false,
  loading: () => <div>Loading dashboard...</div>
});

async function getStats() {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';
    console.log('Fetching stats from:', `${baseUrl}/api/analytics`);
    
    const res = await fetch(`${baseUrl}/api/analytics`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      cache: 'no-store',
    });

    if (!res.ok) {
      const errorText = await res.text();
      console.error('API Error:', {
        status: res.status,
        statusText: res.statusText,
        body: errorText
      });
      throw new Error(`Failed to fetch stats: ${res.status} ${res.statusText}`);
    }

    const data = await res.json();
    console.log('Received stats:', data);
    return data;
  } catch (error) {
    console.error('Error in getStats:', error);
    // Return mock data if the API fails
    return {
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
  }
}

export default async function DashboardPage() {
  const stats = await getStats();

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Payment Analytics</h1>
      <Suspense fallback={<div>Loading...</div>}>
        <Dashboard stats={stats} />
      </Suspense>
    </div>
  );
} 