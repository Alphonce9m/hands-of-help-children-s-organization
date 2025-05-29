'use client';

import { FC, useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Section from '@/components/Section';
import Container from '@/components/Container';
import Card from '@/components/Card';

const CODE_TIMEOUT = 10 * 60; // 10 minutes in seconds

const VerifyMFAPage: FC = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [code, setCode] = useState('');
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isInitializing, setIsInitializing] = useState(true);
  const [timeLeft, setTimeLeft] = useState(CODE_TIMEOUT);
  const [canResend, setCanResend] = useState(false);
  const [rememberDevice, setRememberDevice] = useState(false);
  const [showBackupCode, setShowBackupCode] = useState(false);

  // Initialize page and start timer
  useEffect(() => {
    const initializePage = async () => {
      try {
        const response = await fetch('/api/admin/verify-mfa', {
          method: 'GET',
        });

        if (!response.ok) {
          throw new Error('Failed to initialize verification');
        }

        setMessage('Verification code sent to your email');
      } catch (err) {
        setError('Failed to initialize verification. Please try again.');
      } finally {
        setIsInitializing(false);
      }
    };

    initializePage();
  }, []);

  // Handle countdown timer
  useEffect(() => {
    if (timeLeft <= 0) {
      setCanResend(true);
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft]);

  const handleResendCode = async () => {
    setIsLoading(true);
    setError('');
    setMessage('');
    setCanResend(false);
    setTimeLeft(CODE_TIMEOUT);

    try {
      const response = await fetch('/api/admin/verify-mfa', {
        method: 'GET',
      });

      if (!response.ok) {
        throw new Error('Failed to resend code');
      }

      setMessage('New verification code sent to your email');
    } catch (err) {
      setError('Failed to resend code. Please try again.');
      setCanResend(true);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setMessage('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/admin/verify-mfa', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          code,
          callbackUrl: searchParams?.get('callbackUrl') || '/admin/dashboard',
          rememberDevice,
          isBackupCode: showBackupCode,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        router.push(data.callbackUrl);
      } else {
        setError(data.message || 'Invalid verification code');
      }
    } catch (err) {
      setError('An error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  if (isInitializing) {
    return (
      <Section className="py-16">
        <Container>
          <div className="max-w-md mx-auto">
            <Card className="p-8">
              <div className="flex items-center justify-center">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
                <span className="ml-3">Initializing...</span>
              </div>
            </Card>
          </div>
        </Container>
      </Section>
    );
  }

  return (
    <Section className="py-16">
      <Container>
        <div className="max-w-md mx-auto">
          <Card className="p-8">
            <h1 className="text-2xl font-bold text-center mb-8">Two-Factor Authentication</h1>
            
            {message && (
              <div className="mb-4 p-4 bg-green-50 text-green-600 rounded-md">
                {message}
              </div>
            )}

            {error && (
              <div className="mb-4 p-4 bg-red-50 text-red-600 rounded-md">
                {error}
              </div>
            )}

            <p className="text-center text-gray-600 mb-6">
              {showBackupCode
                ? 'Enter one of your backup codes'
                : 'Please enter the verification code sent to your email.'}
            </p>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="code" className="block text-sm font-medium text-gray-700 mb-1">
                  {showBackupCode ? 'Backup Code' : 'Verification Code'}
                </label>
                <input
                  type="text"
                  id="code"
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary focus:border-primary"
                  required
                  pattern={showBackupCode ? "[A-Z0-9]{8}" : "[0-9]{6}"}
                  maxLength={showBackupCode ? 8 : 6}
                  placeholder={showBackupCode ? "Enter 8-character backup code" : "Enter 6-digit code"}
                />
              </div>

              {!showBackupCode && (
                <div className="text-center text-sm text-gray-600">
                  {timeLeft > 0 ? (
                    <p>Code expires in {Math.floor(timeLeft / 60)}:{(timeLeft % 60).toString().padStart(2, '0')}</p>
                  ) : (
                    <p>Code has expired</p>
                  )}
                </div>
              )}

              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="rememberDevice"
                  checked={rememberDevice}
                  onChange={(e) => setRememberDevice(e.target.checked)}
                  className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
                />
                <label htmlFor="rememberDevice" className="ml-2 block text-sm text-gray-700">
                  Remember this device for 30 days
                </label>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-3 px-4 bg-primary text-white rounded-md hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? 'Verifying...' : 'Verify Code'}
              </button>

              <div className="flex flex-col items-center space-y-4">
                {!showBackupCode && (
                  <button
                    type="button"
                    onClick={handleResendCode}
                    disabled={!canResend || isLoading}
                    className="text-sm text-primary hover:text-primary/90 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Resend Code
                  </button>
                )}

                <button
                  type="button"
                  onClick={() => setShowBackupCode(!showBackupCode)}
                  className="text-sm text-primary hover:text-primary/90"
                >
                  {showBackupCode ? 'Use Email Code' : 'Use Backup Code'}
                </button>

                <button
                  type="button"
                  onClick={() => router.push('/admin/login')}
                  className="text-sm text-gray-600 hover:text-gray-900"
                >
                  Back to Login
                </button>
              </div>
            </form>
          </Card>
        </div>
      </Container>
    </Section>
  );
};

export default VerifyMFAPage; 