export type DonationStatus = 
  | 'pending'
  | 'completed'
  | 'failed'
  | 'cancelled';

export interface Donation {
  id: string;
  amount: number;
  currency: string;
  reference: string;
  status: DonationStatus;
  name?: string;
  email?: string;
  message?: string;
  createdAt: Date;
  updatedAt: Date;
}
