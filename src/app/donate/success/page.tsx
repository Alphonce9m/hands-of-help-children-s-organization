'use client';

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';

export default function DonationSuccessPage() {
  const searchParams = useSearchParams();
  const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading');

  useEffect(() => {
    if (!searchParams) return;

    const payment_intent = searchParams.get('payment_intent');
    const payment_intent_client_secret = searchParams.get('payment_intent_client_secret');
    const redirect_status = searchParams.get('redirect_status');

    if (redirect_status === 'succeeded') {
      setStatus('success');
    } else {
      setStatus('error');
    }
  }, [searchParams]);

  return (
    <main className="min-h-screen pt-20 pb-12">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto text-center">
          {status === 'loading' && (
            <div className="space-y-6">
              <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-primary mx-auto"></div>
              <h1 className="text-2xl font-semibold">Processing your donation...</h1>
            </div>
          )}

          {status === 'success' && (
            <div className="space-y-6">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto">
                <svg
                  className="w-8 h-8 text-green-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>
              <h1 className="text-3xl font-bold">Thank You for Your Donation!</h1>
              <p className="text-gray-600">
                Your contribution will make a real difference in the lives of children in our community.
                We'll send you a receipt via email shortly.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href="/"
                  className="px-6 py-3 bg-primary text-white rounded-lg font-medium hover:bg-primary/90 transition-colors"
                >
                  Return Home
                </Link>
                <Link
                  href="/contact"
                  className="px-6 py-3 border-2 border-primary text-primary rounded-lg font-medium hover:bg-primary/10 transition-colors"
                >
                  Contact Us
                </Link>
              </div>
            </div>
          )}

          {status === 'error' && (
            <div className="space-y-6">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto">
                <svg
                  className="w-8 h-8 text-red-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </div>
              <h1 className="text-3xl font-bold">Something Went Wrong</h1>
              <p className="text-gray-600">
                We encountered an issue processing your donation. Please try again or contact us for assistance.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href="/donate"
                  className="px-6 py-3 bg-primary text-white rounded-lg font-medium hover:bg-primary/90 transition-colors"
                >
                  Try Again
                </Link>
                <Link
                  href="/contact"
                  className="px-6 py-3 border-2 border-primary text-primary rounded-lg font-medium hover:bg-primary/10 transition-colors"
                >
                  Contact Support
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </main>
  );
} 