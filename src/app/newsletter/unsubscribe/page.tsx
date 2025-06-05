'use client';

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { supabase } from '@/lib/supabaseClient';
import { getErrorMessage } from '@/lib/utils';

export default function UnsubscribePage() {
  const searchParams = useSearchParams();
  const email = searchParams?.get('email') || '';
  const [unsubscribed, setUnsubscribed] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  
  // If no email is provided, show an error
  useEffect(() => {
    if (!email) {
      setError('No email address provided. Please use the unsubscribe link from your email.');
    }
  }, [email]);

  const handleUnsubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    
    setLoading(true);
    setError('');
    
    try {
      const { error: updateError } = await supabase
        .from('subscribers')
        .update({ 
          unsubscribed: true,
          updated_at: new Date().toISOString()
        })
        .eq('email', email);
      
      if (updateError) throw updateError;
      
      setUnsubscribed(true);
    } catch (err) {
      console.error('Error unsubscribing:', err);
      setError(getErrorMessage(err) || 'Failed to unsubscribe. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (unsubscribed) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8 text-center">
          <div className="bg-white p-8 rounded-lg shadow-md">
            <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-gray-100">
              <svg
                className="h-6 w-6 text-gray-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M20 12H4"
                />
              </svg>
            </div>
            <h2 className="mt-6 text-2xl font-bold text-gray-900">
              Unsubscribed Successfully
            </h2>
            <p className="mt-2 text-gray-600">
              You have been unsubscribed from our newsletter. We're sorry to see you go!
            </p>
            <p className="mt-4 text-sm text-gray-500">
              You can resubscribe anytime by visiting our website.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
            Unsubscribe from Newsletter
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            {email 
              ? `Are you sure you want to unsubscribe ${email}?`
              : 'Please confirm you want to unsubscribe from our newsletter.'}
          </p>
        </div>
        
        {error && (
          <div className="bg-red-50 border-l-4 border-red-400 p-4">
            <div className="flex">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-3">
                <p className="text-sm text-red-700">{error}</p>
              </div>
            </div>
          </div>
        )}
        
        <form className="mt-8 space-y-6" onSubmit={handleUnsubscribe}>
          <div>
            <button
              type="submit"
              disabled={loading || !email}
              className={`w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white ${
                loading || !email 
                  ? 'bg-gray-400 cursor-not-allowed' 
                  : 'bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500'
              }`}
            >
              {loading ? 'Processing...' : 'Unsubscribe'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
