'use client';

import { FC, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Section from '@/components/Section';
import Container from '@/components/Container';
import Card from '@/components/Card';

const SuccessContent: FC = () => {
  const searchParams = useSearchParams();
  const reference = searchParams?.get('reference');

  return (
    <Section className="py-16">
      <Container>
        <Card className="max-w-md mx-auto">
          <div className="p-6 text-center">
            <h2 className="text-2xl font-bold mb-4">Payment Successful!</h2>
            <p className="text-gray-600 mb-4">
              Thank you for your donation. Your payment has been processed successfully.
            </p>
            {reference && (
              <p className="text-sm text-gray-500">
                Reference: {reference}
              </p>
            )}
          </div>
        </Card>
      </Container>
    </Section>
  );
};

const SuccessPage: FC = () => {
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
      <SuccessContent />
    </Suspense>
  );
};

export default SuccessPage; 