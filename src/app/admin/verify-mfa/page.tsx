'use client';

import { FC, useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Section from '@/components/Section';
import Container from '@/components/Container';
import Card from '@/components/Card';

const VerifyMFAPage: FC = () => {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [code, setCode] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [timeLeft, setTimeLeft] = useState(0);

  useEffect(() => {
    if (timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [timeLeft]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    try {
      const response = await fetch('/api/admin/verify-mfa', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ code }),
      });

      const result = await response.json();

      if (result.success) {
        router.push('/admin');
      } else {
        setError(result.message || 'Failed to verify code');
      }
    } catch (err) {
      console.error('Error verifying code:', err);
      setError('Failed to verify code');
    } finally {
      setIsLoading(false);
    }
  };

  const handleResendCode = async () => {
    setError(null);
    setIsLoading(true);

    try {
      const response = await fetch('/api/admin/resend-mfa', {
        method: 'POST',
      });

      const result = await response.json();

      if (result.success) {
        setTimeLeft(60);
      } else {
        setError(result.message || 'Failed to resend code');
      }
    } catch (err) {
      console.error('Error resending code:', err);
      setError('Failed to resend code');
    } finally {
      setIsLoading(false);
    }
  };

  if (status === 'loading') {
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

  return (
    <Section className="py-16">
      <Container>
        <Card className="max-w-md mx-auto">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-2xl font-bold">Verify Two-Factor Authentication</h2>
          </div>
          <form onSubmit={handleSubmit} className="p-6 space-y-4">
            {error && (
              <div className="p-4 bg-red-50 text-red-600 rounded-md">
                {error}
              </div>
            )}
            <div>
              <label
                htmlFor="code"
                className="block text-sm font-medium text-gray-700"
              >
                Verification Code
              </label>
              <input
                type="text"
                id="code"
                value={code}
                onChange={(e) => setCode(e.target.value)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
                required
                maxLength={6}
                pattern="[0-9]*"
                inputMode="numeric"
              />
            </div>
            <div>
              <button
                type="submit"
                disabled={isLoading}
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
              >
                {isLoading ? 'Verifying...' : 'Verify Code'}
              </button>
            </div>
            <div className="text-center">
              <button
                type="button"
                onClick={handleResendCode}
                disabled={isLoading || timeLeft > 0}
                className="text-sm text-primary hover:text-primary-dark focus:outline-none focus:underline"
              >
                {timeLeft > 0
                  ? `Resend code in ${timeLeft}s`
                  : 'Resend verification code'}
              </button>
            </div>
          </form>
        </Card>
      </Container>
    </Section>
  );
};

export default VerifyMFAPage; 