'use client';

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { motion } from 'framer-motion';
import { Share2, Mail, Heart } from 'lucide-react';
import ShareDialog from '@/components/ShareDialog';
import { formatCurrency, formatDate } from '@/lib/utils';
import Button from '@/components/Button';
import Card from '@/components/Card';
import Container from '@/components/Container';
import Section from '@/components/Section';
import TeamSection from '@/components/sections/TeamSection';

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
            <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-primary"></div>
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
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="py-16"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <div className="inline-flex items-center justify-center rounded-full bg-primary/10 p-3">
            <Share2 className="h-8 w-8 text-primary" />
          </div>
          <h1 className="mt-4 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Thank You for Your Donation
          </h1>
          <p className="mt-4 text-lg text-gray-600">
            Your generous contribution of {formatCurrency(amount)} will make a significant impact in the lives of those in need.
          </p>
        </div>

        <div className="mt-12">
          <Card>
            <Container>
              <div className="space-y-6">
                <div>
                  <h2 className="text-xl font-semibold text-gray-900">Donation Details</h2>
                  <p className="mt-2 text-gray-600">Reference: {reference}</p>
                  <p className="mt-2 text-gray-600">Date: {formatDate(new Date(date))}</p>
                  <p className="mt-2 text-gray-600">Type: {type === 'monthly' ? 'Monthly Donation' : 'One-time Donation'}</p>
                  <p className="mt-2 text-gray-600">Status: {status}</p>
                </div>

                {impactAreas && impactAreas.length > 0 && (
                  <div>
                    <h2 className="text-xl font-semibold text-gray-900">Impact Areas</h2>
                    <ul className="mt-4 space-y-2">
                      {impactAreas.map((area, index) => (
                        <li key={index} className="text-gray-600">
                          <span className="inline-flex items-center">
                            <Heart className="h-4 w-4 mr-2 text-red-500" />
                            {area}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </Container>
          </Card>

          <div className="mt-12 flex justify-center gap-4">
            <Button
              variant="primary"
              size="lg"
              onClick={() => setIsShareDialogOpen(true)}
            >
              Share Your Impact
            </Button>
            <Button
              variant="outline"
              size="lg"
              onClick={() => window.location.href = '/donate'}
            >
              Donate Again
            </Button>
          </div>

          <ShareDialog
            isOpen={isShareDialogOpen}
            onClose={() => setIsShareDialogOpen(false)}
            message={`I just made a donation to Hands of Hope! 🌟 Help us make a difference in the lives of those in need.`}
            hashtags={"#HandsOfHope #Charity #Impact"}
          />
          <TeamSection className="mt-16" />
        </div>
      </div>
    </motion.div>
  );
}