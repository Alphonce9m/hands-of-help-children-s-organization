'use client';

import { FC, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Section from '@/components/Section';
import Container from '@/components/Container';
import Card from '@/components/Card';
import Button from '@/components/Button';

const ThankYouContent: FC = () => {
  const searchParams = useSearchParams();
  const reference = searchParams?.get('reference');
  const amount = searchParams?.get('amount');
  const status = searchParams?.get('status');

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
              <div className="space-y-4">
                {amount && (
                  <div className="flex justify-between py-2 border-b">
                    <span className="text-gray-600">Amount</span>
                    <span className="font-semibold">KSH {parseInt(amount).toLocaleString()}</span>
                  </div>
                )}
                {reference && (
                  <div className="flex justify-between py-2 border-b">
                    <span className="text-gray-600">Reference Number</span>
                    <span className="font-semibold">{reference}</span>
                  </div>
                )}
                <div className="flex justify-between py-2 border-b">
                  <span className="text-gray-600">Date</span>
                  <span className="font-semibold">{new Date().toLocaleDateString()}</span>
                </div>
                {status && (
                  <div className="flex justify-between py-2 border-b">
                    <span className="text-gray-600">Status</span>
                    <span className="font-semibold capitalize">{status}</span>
                  </div>
                )}
              </div>

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

const ThankYouPage: FC = () => {
  return (
    <Suspense fallback={
      <Section className="py-16">
        <Container>
          <div className="text-center">
            <p>Loading...</p>
          </div>
        </Container>
      </Section>
    }>
      <ThankYouContent />
    </Suspense>
  );
};

export default ThankYouPage; 