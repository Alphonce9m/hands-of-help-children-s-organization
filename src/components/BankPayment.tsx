import { FC, useState } from 'react';

interface BankPaymentProps {
  amount: number;
  bank: 'kcb' | 'equity' | 'cooperative';
  onSuccess: () => void;
  onError: (error: string) => void;
}

const bankDetails = {
  kcb: {
    name: 'KCB Bank',
    accountName: 'Hands of Help Children Organization',
    accountNumber: '1234567890',
    branch: 'Nairobi Branch',
    swiftCode: 'KCBLKEXX'
  },
  equity: {
    name: 'Equity Bank',
    accountName: 'Hands of Help Children Organization',
    accountNumber: '9876543210',
    branch: 'Nairobi Branch',
    swiftCode: 'EQBLKEXX'
  },
  cooperative: {
    name: 'Cooperative Bank',
    accountName: 'Hands of Help Children Organization',
    accountNumber: '5678901234',
    branch: 'Nairobi Branch',
    swiftCode: 'COOPKEXX'
  }
};

const BankPayment: FC<BankPaymentProps> = ({ amount, bank, onSuccess, onError }) => {
  const [reference, setReference] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await fetch('/api/bank/verify', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          bank,
          amount,
          reference,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to verify payment');
      }

      onSuccess();
    } catch (error) {
      onError(error instanceof Error ? error.message : 'An error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  const bankInfo = bankDetails[bank];

  return (
    <div className="space-y-6">
      <div className="bg-gray-50 p-6 rounded-lg border-2 border-gray-200">
        <h4 className="font-semibold text-gray-900 mb-4">Bank Account Details</h4>
        <div className="space-y-3">
          <div>
            <span className="text-sm text-gray-500">Bank Name</span>
            <p className="font-medium">{bankInfo.name}</p>
          </div>
          <div>
            <span className="text-sm text-gray-500">Account Name</span>
            <p className="font-medium">{bankInfo.accountName}</p>
          </div>
          <div>
            <span className="text-sm text-gray-500">Account Number</span>
            <p className="font-medium">{bankInfo.accountNumber}</p>
          </div>
          <div>
            <span className="text-sm text-gray-500">Branch</span>
            <p className="font-medium">{bankInfo.branch}</p>
          </div>
          <div>
            <span className="text-sm text-gray-500">SWIFT Code</span>
            <p className="font-medium">{bankInfo.swiftCode}</p>
          </div>
        </div>
      </div>

      <div className="bg-blue-50 p-4 rounded-lg">
        <h4 className="font-semibold text-blue-800 mb-2">Payment Instructions</h4>
        <ol className="list-decimal list-inside text-blue-700 space-y-2">
          <li>Make a bank transfer of KES {amount} to the account details above</li>
          <li>Use your name as the reference</li>
          <li>After making the payment, enter the reference number below</li>
          <li>Click verify to confirm your payment</li>
        </ol>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="reference" className="block text-sm font-medium text-gray-700">
            Payment Reference Number
          </label>
          <input
            type="text"
            id="reference"
            value={reference}
            onChange={(e) => setReference(e.target.value)}
            className="mt-1 w-full p-3 border-2 border-gray-200 rounded-lg focus:border-primary focus:ring-2 focus:ring-primary/20"
            required
            placeholder="Enter the reference number from your bank transfer"
          />
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="w-full py-4 px-6 bg-primary text-white rounded-lg font-semibold hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoading ? 'Verifying...' : 'Verify Payment'}
        </button>
      </form>
    </div>
  );
};

export default BankPayment; 