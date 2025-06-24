'use client';

import * as React from 'react';

interface ErrorBoundaryProps {
  children: React.ReactNode;
  fallback?: React.ReactNode;
}

export default function ErrorBoundary({ children, fallback }: ErrorBoundaryProps) {
  const [hasError, setHasError] = React.useState(false);
  const [error, setError] = React.useState<Error | null>(null);

  const handleCatch = (error: Error, errorInfo: React.ErrorInfo) => {
    console.error('Uncaught error:', error, errorInfo);
    setHasError(true);
    setError(error);
  };

  if (hasError) {
    return fallback || (
      <div className="min-h-[400px] flex items-center justify-center">
        <div className="text-center p-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Something went wrong</h2>
          <p className="text-gray-600 mb-4">
            {error?.message || 'We apologize for the inconvenience. Please try refreshing the page.'}
          </p>
          <button
            onClick={() => window.location.reload()}
            className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors"
          >
            Refresh Page
          </button>
        </div>
      </div>
    );
  }

  try {
    return <>{children}</>;
  } catch (e) {
    handleCatch(e as Error, { componentStack: '' });
    return null;
  }
}

// Add display name for better debugging
ErrorBoundary.displayName = 'ErrorBoundary';