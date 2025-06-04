import { useState } from 'react';
import { motion } from 'framer-motion';

import { ArrowRight, Loader2 } from 'lucide-react';

interface PaymentButtonProps {
  amount: number;
  onSuccess: (data: any) => void;
  onError: (error: any) => void;
  className?: string;
  paymentMethod?: 'paybill' | 'till';
};

export const PaymentButton: React.FC<PaymentButtonProps> = ({
  amount,
  onSuccess,
  onError,
  className = '',
  paymentMethod = 'paybill'
}) => {
  const [isProcessing, setIsProcessing] = useState(false);

  const handlePayment = async () => {
    setIsProcessing(true);
    try {
      // Create a unique reference for this payment
      const reference = `DON-${Date.now()}`;
      
      // Payment logic removed. Add your new payment integration here if needed.
      const response = null;

      if (response) {
        onSuccess({
          donationId: reference
        });
      } else {
        onError({
          message: 'Failed to initiate payment',
          errorCode: 'PAYMENT_INIT_FAILED'
        });
      }
    } catch (error) {
      onError(error);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className={`
        w-full
        py-4
        px-6
        bg-blue-600
        text-white
        rounded-lg
        font-semibold
        text-lg
        transition-all
        duration-200
        flex
        items-center
        justify-center
        gap-3
        ${className}
      `}
      disabled={isProcessing}
      onClick={handlePayment}
    >
      {isProcessing ? (
        <>
          <Loader2 className="animate-spin h-5 w-5" />
          Processing...
        </>
      ) : (
        <>
          <ArrowRight className="h-5 w-5" />
          Pay with M-Pesa
        </>
      )}
    </motion.button>
  );
};
