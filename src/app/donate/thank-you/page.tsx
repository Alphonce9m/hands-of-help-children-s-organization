'use client';

import { FC, useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import Section from '@/components/Section';
import Container from '@/components/Container';
import Card from '@/components/Card';
import Button from '@/components/Button';

interface DonationDetails {
  amount: number;
  reference: string;
  date: string;
  type: 'one-time' | 'monthly';
  status: 'pending' | 'completed' | 'failed';
  mpesaReceiptNumber?: string;
}

const ThankYouPage: FC = () => {
  const searchParams = useSearchParams();
  const [donationDetails, setDonationDetails] = useState<DonationDetails | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

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
      <Section className="py-16">
        <Container>
          <div className="text-center">
            <p>Loading...</p>
          </div>
        </Container>
      </Section>
    );
  }

  if (error) {
    return (
      <Section className="py-16">
        <Container>
          <div className="text-center">
            <p className="text-red-600">{error}</p>
            <Button href="/donate" className="mt-4">
              Try Again
            </Button>
          </div>
        </Container>
      </Section>
    );
  }

  return (
    <>
      {/* Thank You Section */}
      <Section className="pt-16 pb-12 bg-white">
        <Container>
          <div className="max-w-2xl mx-auto text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg className="w-8 h-8 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h1 className="text-4xl md:text-5xl font-extrabold text-primary mb-4">
              Thank You for Your Donation!
            </h1>
            <p className="text-lg md:text-xl text-gray-700">
              Your generosity helps us continue our mission of empowering children and young adults in Kasabuni.
            </p>
          </div>
        </Container>
      </Section>

      {/* Donation Details */}
      <Section className="py-16 bg-gray-50">
        <Container>
          <div className="max-w-2xl mx-auto">
            <Card className="p-8">
              <h2 className="text-2xl font-bold mb-6">Donation Details</h2>
              {donationDetails && (
                <div className="space-y-4">
                  <div className="flex justify-between py-2 border-b">
                    <span className="text-gray-600">Amount</span>
                    <span className="font-semibold">KSH {donationDetails.amount.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between py-2 border-b">
                    <span className="text-gray-600">Reference Number</span>
                    <span className="font-semibold">{donationDetails.reference}</span>
                  </div>
                  <div className="flex justify-between py-2 border-b">
                    <span className="text-gray-600">Date</span>
                    <span className="font-semibold">{donationDetails.date}</span>
                  </div>
                  <div className="flex justify-between py-2 border-b">
                    <span className="text-gray-600">Type</span>
                    <span className="font-semibold capitalize">{donationDetails.type}</span>
                  </div>
                  <div className="flex justify-between py-2 border-b">
                    <span className="text-gray-600">Status</span>
                    <span className={`font-semibold capitalize ${
                      donationDetails.status === 'completed' ? 'text-green-600' :
                      donationDetails.status === 'failed' ? 'text-red-600' :
                      'text-yellow-600'
                    }`}>
                      {donationDetails.status}
                    </span>
                  </div>
                  {donationDetails.mpesaReceiptNumber && (
                    <div className="flex justify-between py-2">
                      <span className="text-gray-600">M-Pesa Receipt</span>
                      <span className="font-semibold">{donationDetails.mpesaReceiptNumber}</span>
                    </div>
                  )}
                </div>
              )}

              <div className="mt-8 space-y-4">
                <Button href="/" className="w-full">
                  Return to Home
                </Button>
                <Button href="/donate" variant="outline" className="w-full">
                  Make Another Donation
                </Button>
              </div>
            </Card>
          </div>
        </Container>
      </Section>

      {/* Impact Section */}
      <Section className="py-16 bg-white">
        <Container>
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="text-3xl font-bold mb-6">Your Impact</h2>
            <p className="text-gray-600">
              Here's how your donation will be used to make a difference
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: 'Education',
                description: 'Supporting our library and e-learning center',
                icon: '📚'
              },
              {
                title: 'Health & Well-being',
                description: 'Funding our Sister MHM Project',
                icon: '🏥'
              },
              {
                title: 'Skills Development',
                description: 'Providing vocational training and workshops',
                icon: '🎯'
              }
            ].map((item, index) => (
              <Card
                key={index}
                variant="outlined"
                className="text-center p-6"
              >
                <div className="text-4xl mb-4">{item.icon}</div>
                <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                <p className="text-gray-600">{item.description}</p>
              </Card>
            ))}
          </div>
        </Container>
      </Section>
    </>
  );
};

export default ThankYouPage; 