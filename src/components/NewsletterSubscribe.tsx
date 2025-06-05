"use client";
import React, { useState } from 'react';
import { supabase } from '@/lib/supabaseClient';
import { generateVerificationToken, getErrorMessage } from '@/lib/utils';

export default function NewsletterSubscribe() {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess(false);
    setMessage('');

    try {
      // Check if email already exists
      const { data: existing } = await supabase
        .from('subscribers')
        .select('id, is_verified, unsubscribed')
        .eq('email', email)
        .single();

      const verificationToken = generateVerificationToken();
      
      if (existing) {
        if (existing.unsubscribed) {
          // Resubscribe existing user
          const { error: updateError } = await supabase
            .from('subscribers')
            .update({ 
              unsubscribed: false,
              verification_token: verificationToken,
              is_verified: false
            })
            .eq('id', existing.id);
          
          if (updateError) throw updateError;
        } else if (existing.is_verified) {
          setMessage('You are already subscribed to our newsletter!');
          setLoading(false);
          return;
        } else {
          // Resend verification
          const { error: updateError } = await supabase
            .from('subscribers')
            .update({ verification_token: verificationToken })
            .eq('id', existing.id);
          
          if (updateError) throw updateError;
        }
      } else {
        // New subscription
        const { error: insertError } = await supabase
          .from('subscribers')
          .insert([{ 
            email, 
            name: name || null,
            verification_token: verificationToken 
          }]);
        
        if (insertError) throw insertError;
      }

      // Send verification email (we'll implement this next)
      const { error: emailError } = await fetch('/api/newsletter/send-verification', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, token: verificationToken, name: name || 'there' })
      }).then(res => res.json());

      if (emailError) throw new Error(emailError);

      setSuccess(true);
      setMessage('Please check your email to verify your subscription!');
      setEmail('');
      setName('');
    } catch (err) {
      console.error('Subscription error:', err);
      setError(getErrorMessage(err) || 'Failed to subscribe. Please try again.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="w-full max-w-md mx-auto">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
            Name (optional)
          </label>
          <input
            type="text"
            id="name"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary focus:border-primary"
            placeholder="Your name"
            value={name}
            onChange={e => setName(e.target.value)}
          />
        </div>
        
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
            Email address *
          </label>
          <input
            type="email"
            id="email"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary focus:border-primary"
            placeholder="your.email@example.com"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
          />
        </div>
        
        <button
          type="submit"
          disabled={loading}
          className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition-colors disabled:opacity-70 disabled:cursor-not-allowed"
        >
          {loading ? 'Subscribing...' : 'Subscribe to Newsletter'}
        </button>
      </form>
      
      {(success || error || message) && (
        <div className={`mt-4 p-4 rounded-md text-sm ${
          success ? 'bg-green-50 text-green-700' : 
          error ? 'bg-red-50 text-red-700' : 
          'bg-blue-50 text-blue-700'
        }`}>
          {success && (
            <div className="flex items-center">
              <svg className="h-5 w-5 mr-2 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              {message}
            </div>
          )}
          {error && (
            <div className="flex items-center">
              <svg className="h-5 w-5 mr-2 text-red-500" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
              {error}
            </div>
          )}
          {!success && !error && message && (
            <div className="flex items-center">
              <svg className="h-5 w-5 mr-2 text-blue-500" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h2a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
              </svg>
              {message}
            </div>
          )}
        </div>
      )}
      
      <p className="mt-3 text-xs text-gray-500">
        We respect your privacy. Unsubscribe at any time.
      </p>
    </div>
  );
}
