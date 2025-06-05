'use client';

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import Button from '@/components/Button';

interface DonationDetails {
  amount: number;
  reference: string;
  date: string;
  type: 'one-time' | 'monthly';
  status: 'pending' | 'completed' | 'failed';

  impactAreas?: string[];
}

export default function ThankYouPage() {
  const searchParams = useSearchParams();
  const [donationDetails, setDonationDetails] = useState<DonationDetails | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isShareDialogOpen, setIsShareDialogOpen] = useState(false);

  useEffect(() => {
    const reference = searchParams?.get('reference');
    if (reference) {
      // Fetch donation details from API
      fetch(`/api/donations/${reference}`)
        .then((res) => res.json())
        .then((data) => {
          if (data.success) {
            setDonationDetails(data.data);
          } else {
            setError(data.message || 'Failed to fetch donation details');
          }
          setIsLoading(false);
        })
        .catch((err) => {
          console.error('Error fetching donation details:', err);
          setError('Failed to fetch donation details');
          setIsLoading(false);
        });
    } else {
      setError('No reference number provided');
      setIsLoading(false);
    }
  }, [searchParams]);

  if (isLoading) {
    return (
      <div className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-center h-[400px]">
            <div className="rounded-full h-16 w-16 border-b-2 border-primary"></div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900">Error</h1>
            <p className="mt-4 text-gray-600">{error}</p>
            <button
              onClick={() => window.location.reload()}
              className="mt-6 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-primary hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
            >
              Retry
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (!donationDetails) {
    return null;
  }

  const { amount, reference, date, type, status, impactAreas } = donationDetails;

  return (
    <div className="py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <div className="bg-white rounded-xl shadow-lg px-8 py-12 max-w-xl mx-auto text-center">
            <h1 className="text-3xl font-bold text-primary mb-4">Thank You for Your Donation</h1>
            <p className="mt-4 text-lg text-gray-600">
              Your donation of KES {amount} has been successfully processed.
            </p>
            <ul className="mb-6 text-lg text-primary-700">
              <li>
                <span className="font-medium">Reference:</span> {reference}
              </li>
              <li>
                <span className="font-medium">Status:</span> {status}
              </li>
            </ul>
            <Button
              variant="primary"
              size="lg"
              onClick={() => window.location.href = '/donate'}
              className="mt-6"
            >
              Donate Again
            </Button>
          </div> {/* close card div */}
        </div> {/* close text-center div */}
      </div> {/* close container div */}
    </div>
  );
}