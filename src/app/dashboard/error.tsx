'use client';

import { useEffect } from 'react';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error('Dashboard error:', error);
  }, [error]);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="bg-red-50 border border-red-200 rounded-lg p-6">
        <h2 className="text-2xl font-semibold text-red-800 mb-4">
          Something went wrong!
        </h2>
        <p className="text-red-600 mb-4">
          {error.message || 'Failed to load payment analytics'}
        </p>
        <button
          onClick={reset}
          className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 transition-colors"
        >
          Try again
        </button>
      </div>
    </div>
  );
} 