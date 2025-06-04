import { FC } from 'react';

export type PaymentMethod = 'kcb' | 'equity' | 'cooperative';

interface PaymentMethodSelectorProps {
  selectedMethod: PaymentMethod;
  onSelect: (method: PaymentMethod) => void;
}

const PaymentMethodSelector: FC<PaymentMethodSelectorProps> = ({
  selectedMethod,
  onSelect,
}) => {
  const paymentMethods = [
    {
      id: 'mobile',
      name: 'Mobile Money',
      description: 'Pay using M-PESA, Airtel Money, or other mobile money services'
    },
    {
      id: 'bank',
      name: 'Bank Transfer',
      description: 'Direct bank transfer to our account'
    },
    {
      id: 'card',
      name: 'Credit/Debit Card',
      description: 'Pay securely with your credit or debit card'
    },
    {
      id: 'paypal',
      name: 'PayPal',
      description: 'Pay using your PayPal account'
    }
  ];

  return (
    <div className="space-y-4">
      <h3 className="text-xl font-semibold text-gray-700">Select Payment Method</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {paymentMethods.map((method) => (
          <button
            key={method.id}
            type="button"
            onClick={() => onSelect(method.id as PaymentMethod)}
            className={`p-4 rounded-lg border-2 transition-all ${
              selectedMethod === method.id
                ? 'border-primary bg-primary/10 text-primary'
                : 'border-gray-200 hover:border-primary/50'
            }`}
          >
            <div className="flex items-center space-x-4">
              <div className="p-4">
                <h3 className="text-lg font-semibold mb-2">{method.name}</h3>
                <p className="text-gray-600">{method.description}</p>
              </div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default PaymentMethodSelector; 