import React, { useState } from 'react';

interface DonationFormProps {
  onDonate: (data: { amount: number; phone: string; }) => Promise<void>;
}

export const DonationForm: React.FC<DonationFormProps> = ({ onDonate }) => {
  const [amount, setAmount] = useState<number | ''>('');
  const [phone, setPhone] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const presetAmounts = [100, 250, 500, 1000];

  const validate = () => {
    if (!amount || typeof amount !== 'number' || amount < 10) {
      setError('Please enter a valid amount (minimum KES 10)');
      return false;
    }
    if (!/^07\d{8}$/.test(phone)) {
      setError('Please enter a valid Safaricom number (e.g. 07XXXXXXXX)');
      return false;
    }
    setError(null);
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setLoading(true);
    setError(null);
    setSuccess(false);
    try {
      await onDonate({ amount: amount as number, phone });
      setSuccess(true);
      setAmount('');
      setPhone('');
    } catch (err: any) {
      setError(err.message || 'Payment failed. Try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className="donation-form" onSubmit={handleSubmit} aria-label="Donation form">
      <h2>Donate to Hands of Help</h2>
      <div className="preset-amounts">
        {presetAmounts.map((amt) => (
          <button
            type="button"
            key={amt}
            className={`btn preset-btn${amount === amt ? ' selected' : ''}`}
            onClick={() => setAmount(amt)}
            aria-pressed={amount === amt}
          >
            KES {amt}
          </button>
        ))}
        <div className="custom-amount">
          <label htmlFor="custom-amount">Custom Amount</label>
          <input
            id="custom-amount"
            type="number"
            min={10}
            placeholder="Enter amount"
            value={amount}
            onChange={e => setAmount(Number(e.target.value))}
            aria-label="Custom donation amount"
          />
        </div>
      </div>
      <div className="form-group">
        <label htmlFor="phone">Safaricom Number</label>
        <input
          id="phone"
          type="tel"
          pattern="07[0-9]{8}"
          placeholder="07XXXXXXXX"
          value={phone}
          onChange={e => setPhone(e.target.value)}
          required
          aria-label="Phone number"
        />
      </div>
      <button type="submit" className="btn btn-primary" disabled={loading} aria-busy={loading}>
        {loading ? 'Processing...' : 'Donate'}
      </button>
      {error && <div className="form-error" role="alert">{error}</div>}
      {success && <div className="form-success" role="status">Thank you for your donation!</div>}
    </form>
  );
};
