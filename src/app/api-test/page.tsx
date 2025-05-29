'use client';

import { FC, useState, useEffect } from 'react';
import { testApiEndpoints } from '@/utils/api-test';
import { testEnvironmentVariables } from '@/utils/env-test';

const ApiTestPage: FC = () => {
  const [results, setResults] = useState<{
    env: boolean;
    contact: boolean;
    volunteer: boolean;
    payment: boolean;
  } | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const runTests = async () => {
    setLoading(true);
    setError(null);
    try {
      // Test environment variables first
      const envTest = testEnvironmentVariables();
      
      // Then test API endpoints
      const apiResults = await testApiEndpoints();
      
      setResults({
        env: envTest,
        ...apiResults
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen py-12">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold mb-8">Backend System Tests</h1>
        
        <button
          onClick={runTests}
          disabled={loading}
          className="px-6 py-3 bg-primary text-white rounded-lg font-medium hover:bg-primary/90 transition-colors disabled:opacity-50"
        >
          {loading ? 'Running Tests...' : 'Run Tests'}
        </button>

        {error && (
          <div className="mt-4 p-4 bg-red-50 text-red-600 rounded-lg">
            {error}
          </div>
        )}

        {results && (
          <div className="mt-8 space-y-4">
            <h2 className="text-xl font-semibold">Test Results:</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className={`p-4 rounded-lg ${
                results.env ? 'bg-green-50 text-green-600' : 'bg-red-50 text-red-600'
              }`}>
                <h3 className="font-medium">Environment Variables</h3>
                <p>{results.env ? '✅ All Set' : '❌ Missing Variables'}</p>
              </div>
              <div className={`p-4 rounded-lg ${
                results.contact ? 'bg-green-50 text-green-600' : 'bg-red-50 text-red-600'
              }`}>
                <h3 className="font-medium">Contact API</h3>
                <p>{results.contact ? '✅ Working' : '❌ Failed'}</p>
              </div>
              <div className={`p-4 rounded-lg ${
                results.volunteer ? 'bg-green-50 text-green-600' : 'bg-red-50 text-red-600'
              }`}>
                <h3 className="font-medium">Volunteer API</h3>
                <p>{results.volunteer ? '✅ Working' : '❌ Failed'}</p>
              </div>
              <div className={`p-4 rounded-lg ${
                results.payment ? 'bg-green-50 text-green-600' : 'bg-red-50 text-red-600'
              }`}>
                <h3 className="font-medium">Payment API</h3>
                <p>{results.payment ? '✅ Working' : '❌ Failed'}</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </main>
  );
};

export default ApiTestPage; 