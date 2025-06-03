'use client';

import { useState } from 'react';
import { toast } from 'react-hot-toast';

interface MpesaPaymentFormProps {
  amount: number;
  onSuccess?: () => void;
  onError?: (error: any) => void;
}

export default function MpesaPaymentForm({ amount, onSuccess, onError }: MpesaPaymentFormProps) {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Format phone number to M-Pesa format (e.g., 254XXXXXXXXX)
  const formatPhoneNumber = (number: string) => {
    // Remove any non-digit characters
    const digits = number.replace(/\D/g, '');
    
    // If number starts with 0, replace with 254
    if (digits.startsWith('0')) {
      return '254' + digits.slice(1);
    }
    
    // If number starts with +, remove it
    if (digits.startsWith('+')) {
      return digits.slice(1);
    }
    
    // If number is less than 12 digits, assume it's a local number and add 254
    if (digits.length < 12) {
      return '254' + digits;
    }
    
    return digits;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      console.log('Starting payment process...');
      console.log('Amount:', amount);
      console.log('Original phone number:', phoneNumber);

      const formattedNumber = formatPhoneNumber(phoneNumber);
      console.log('Formatted phone number:', formattedNumber);

      console.log('Sending payment request...', {
        amount,
        phoneNumber: formattedNumber
      });

      const response = await fetch('/api/mpesa/initiate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          amount,
          phoneNumber: formattedNumber,
        }),
      });

      console.log('Response status:', response.status);
      console.log('Response headers:', Object.fromEntries(response.headers.entries()));

      // Check if response is JSON
      const contentType = response.headers.get('content-type');
      if (!contentType || !contentType.includes('application/json')) {
        console.error('Non-JSON response:', await response.text());
        throw new Error('Server returned non-JSON response');
      }

      const data = await response.json();
      console.log('Response data:', data);

      if (!response.ok) {
        throw new Error(data.error || 'Payment initiation failed');
      }

      toast.success('Payment initiated! Please check your phone for the M-Pesa prompt.');
      onSuccess?.();
    } catch (error) {
      console.error('Payment error:', error);
      toast.error(error instanceof Error ? error.message : 'Failed to initiate payment');
      onError?.(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
          M-Pesa Phone Number
        </label>
        <input
          type="tel"
          id="phone"
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
          placeholder="e.g., 07XXXXXXXX"
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          required
        />
        <p className="mt-1 text-sm text-gray-500">
          Enter the phone number registered with M-Pesa
        </p>
      </div>

      <button
        type="submit"
        disabled={isLoading}
        className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
      >
        {isLoading ? 'Processing...' : 'Pay with M-Pesa'}
      </button>
    </form>
  );
} 