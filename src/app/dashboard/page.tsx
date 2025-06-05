'use client';

import { Suspense, useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import dynamic from 'next/dynamic';

// Extend the default session type to include the access token
declare module 'next-auth' {
  interface Session {
    accessToken?: string;
  }
}

// Define the stats type to match the Dashboard component's props
interface DashboardStats {
  totalAmount: number;
  totalDonations: number;
  averageDonation: number;
  byPaymentMethod: Record<string, { count: number; amount: number }>;
  byFrequency: Record<string, { count: number; amount: number }>;
  recentDonations: Array<{
    id: string;
    amount: number;
    createdAt: string;
    donor?: { name: string };
  }>;
  topDonors: Array<{
    name: string;
    totalAmount: number;
    donationCount: number;
  }>;
}

// Import the Dashboard component with SSR disabled
const Dashboard = dynamic(() => import('@/components/Dashboard'), {
  ssr: false,
  loading: () => (
    <div className="flex justify-center items-center h-64">
      <div className="animate-pulse">
        <div className="h-8 w-48 bg-gray-200 rounded"></div>
      </div>
    </div>
  )
});

// Client-side wrapper component to handle session and data fetching
function DashboardWrapper() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    // Redirect to login if not authenticated
    if (status === 'unauthenticated') {
      router.push('/admin/login');
      return;
    }

    // Only fetch data if authenticated
    if (status === 'authenticated') {
      const fetchStats = async () => {
        try {
          setIsLoading(true);
          const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';
          const res = await fetch(`${baseUrl}/api/analytics`, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${session?.accessToken}`
            },
            cache: 'no-store',
          });

          if (!res.ok) {
            throw new Error(`Failed to fetch stats: ${res.status} ${res.statusText}`);
          }


          const data = await res.json();
          setStats(data);
        } catch (err) {
          console.error('Error in getStats:', err);
          setError('Failed to load dashboard data. Please try again later.');
        } finally {
          setIsLoading(false);
        }
      };

      fetchStats();
    }
  }, [status, router, session]);

  // Show loading state while checking session or fetching data
  if (status === 'loading' || isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-pulse">
          <div className="h-8 w-48 bg-gray-200 rounded"></div>
        </div>
      </div>
    );
  }

  // Show error message if there was an error
  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="bg-red-50 border-l-4 border-red-400 p-4">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-red-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.28 7.22a.75.75 0 00-1.06 1.06L8.94 10l-1.72 1.72a.75.75 0 101.06 1.06L10 11.06l1.72 1.72a.75.75 0 101.06-1.06L11.06 10l1.72-1.72a.75.75 0 00-1.06-1.06L10 8.94 8.28 7.22z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="ml-3">
              <p className="text-sm text-red-700">{error}</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Show the dashboard with data or a loading state if stats are not available
  if (!stats) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-pulse">
          <div className="h-8 w-48 bg-gray-200 rounded"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Payment Analytics</h1>
      <Suspense fallback={
        <div className="flex justify-center items-center h-64">
          <div className="animate-pulse">
            <div className="h-8 w-48 bg-gray-200 rounded"></div>
          </div>
        </div>
      }>
        <Dashboard stats={stats} />
      </Suspense>
    </div>
  );
}

export default function DashboardPage() {
  return <DashboardWrapper />;
}