import { FC, useState } from 'react';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { formatPhoneNumber } from '@/lib/utils';

const phoneRegex = /^(?:254|\+254|0)?([71](?:(?:0[0-8])|(?:[12][0-9])|(?:9[0-9])|(?:4[0-3])|(?:4[5-9])|(?:5[7-9])|(?:6[0-8])|(?:9[0-9]))[0-9]{6})$/;

const mpesaSchema = z.object({
  phoneNumber: z.string()
    .min(10, 'Phone number is required')
    .regex(phoneRegex, 'Please enter a valid Kenyan phone number')
    .transform((val: string) => formatPhoneNumber(val)),
  amount: z.number()
    .min(1, 'Amount must be at least KES 1')
    .max(150000, 'Amount cannot exceed KES 150,000'),
  email: z.string().email('Please enter a valid email address').optional().or(z.literal('')),
  name: z.string().min(2, 'Name must be at least 2 characters').optional().or(z.literal('')),
});

type MpesaFormData = z.infer<typeof mpesaSchema>;

interface MpesaPaymentProps {
  onSuccess?: (data: any) => void;
  onError?: (error: any) => void;
  defaultAmount?: number;
}

const MpesaPayment: FC<MpesaPaymentProps> = ({
  onSuccess,
  onError,
  defaultAmount = 100
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue
  } = useForm<MpesaFormData>({
    resolver: zodResolver(mpesaSchema),
    defaultValues: {
      amount: defaultAmount,
      phoneNumber: '',
      email: '',
      name: ''
    }
  });

  const amount = watch('amount');

  const onSubmit = async (data: MpesaFormData) => {
    try {
      setIsLoading(true);
      setError(null);

      console.log('Submitting payment data:', data);

      const response = await fetch('/api/mpesa/initiate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      console.log('Response status:', response.status);
      const responseText = await response.text();
      console.log('Response text:', responseText);

      let result;
      try {
        result = JSON.parse(responseText);
      } catch (e) {
        console.error('Failed to parse response as JSON:', e);
        throw new Error('Invalid response from server');
      }

      if (!response.ok) {
        throw new Error(result.message || 'Failed to initiate payment');
      }

      setSuccess(true);
      onSuccess?.(result);
    } catch (err: any) {
      console.error('Payment error:', err);
      setError(err.message || 'An error occurred while processing your payment');
      onError?.(err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleAmountChange = (value: number) => {
    setValue('amount', value);
  };

  const presetAmounts = [100, 500, 1000, 2000, 5000];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-lg shadow-lg p-6 max-w-md mx-auto"
    >
      <div className="text-center mb-6">
        <h3 className="text-2xl font-bold text-gray-900 mb-2">M-Pesa Payment</h3>
        <p className="text-gray-600">Make a secure donation using M-Pesa</p>
      </div>

      {success ? (
        <div className="text-center">
          <div className="text-green-500 text-5xl mb-4">✓</div>
          <h4 className="text-xl font-semibold text-gray-900 mb-2">Payment Initiated!</h4>
          <p className="text-gray-600 mb-4">
            Please check your phone for the M-Pesa prompt to complete the payment.
          </p>
          <button
            onClick={() => setSuccess(false)}
            className="text-primary hover:text-primary-dark transition-colors"
          >
            Make another payment
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Phone Number (M-Pesa)
            </label>
            <input
              type="tel"
              {...register('phoneNumber')}
              placeholder="e.g., 0712345678"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
            />
            {errors.phoneNumber && (
              <p className="mt-1 text-sm text-red-600">{errors.phoneNumber.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Amount (KES)
            </label>
            <div className="flex flex-wrap gap-2 mb-2">
              {presetAmounts.map((preset) => (
                <button
                  key={preset}
                  type="button"
                  onClick={() => handleAmountChange(preset)}
                  className={`px-4 py-2 rounded-lg border transition-colors ${
                    amount === preset
                      ? 'bg-primary text-white border-primary'
                      : 'border-gray-300 hover:border-primary'
                  }`}
                >
                  KES {preset}
                </button>
              ))}
            </div>
            <input
              type="number"
              {...register('amount', { valueAsNumber: true })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
              min="1"
              max="150000"
            />
            {errors.amount && (
              <p className="mt-1 text-sm text-red-600">{errors.amount.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Name (Optional)
            </label>
            <input
              type="text"
              {...register('name')}
              placeholder="Your name"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
            />
            {errors.name && (
              <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email (Optional)
            </label>
            <input
              type="email"
              {...register('email')}
              placeholder="your@email.com"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
            />
            {errors.email && (
              <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
            )}
          </div>

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={isLoading}
            className={`w-full py-3 px-4 rounded-lg text-white font-medium transition-colors ${
              isLoading
                ? 'bg-gray-400 cursor-not-allowed'
                : 'bg-primary hover:bg-primary-dark'
            }`}
          >
            {isLoading ? 'Processing...' : 'Pay with M-Pesa'}
          </button>

          <p className="text-sm text-gray-500 text-center">
            You will receive an M-Pesa prompt on your phone to complete the payment
          </p>
        </form>
      )}
    </motion.div>
  );
};

export default MpesaPayment; 