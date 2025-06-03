export type DonationStatus = 'PENDING' | 'COMPLETED' | 'FAILED' | 'REFUNDED' | 'CANCELLED' | 'EXPIRED';
export type DonationFrequency = 'ONE_TIME' | 'MONTHLY' | 'QUARTERLY' | 'YEARLY';
export type SubscriptionStatus = 'ACTIVE' | 'PAUSED' | 'CANCELLED' | 'COMPLETED' | 'FAILED' | 'EXPIRED';

export interface Donation {
  id: string;
  amount: number;
  status: DonationStatus;
  frequency: DonationFrequency;
  donorId: string;
  paymentMethod: string;
  reference: string;
  transactionId?: string;
  receiptNumber?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Payment {
  id: string;
  reference: string;
  amount: number;
  status: DonationStatus;
  phoneNumber: string;
  name?: string;
  email?: string;
  frequency: DonationFrequency;
  transactionId?: string;
  receiptNumber?: string;
  merchantRequestId?: string;
  transactionDate?: Date;
  resultCode?: string;
  resultDescription?: string;
  callbackMetadata?: Record<string, any>;
  accountBalance?: string;
  transactionType?: string;
  createdAt: Date;
  updatedAt: Date;
  donorId?: string;
}

export interface Payment {
  id: string;
  reference: string;
  amount: number;
  status: PaymentStatus;
  phoneNumber: string;
  name?: string;
  email?: string;
  frequency: PaymentFrequency;
  transactionId?: string;
  receiptNumber?: string;
  merchantRequestId?: string;
  transactionDate?: Date;
  resultCode?: string;
  resultDescription?: string;
  callbackMetadata?: Record<string, any>;
  accountBalance?: string;
  transactionType?: string;
  createdAt: Date;
  updatedAt: Date;
  donorId?: string;
}
