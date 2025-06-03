export type PaymentStatus = 'PENDING' | 'COMPLETED' | 'FAILED' | 'REFUNDED' | 'CANCELLED' | 'EXPIRED';
export type PaymentFrequency = 'ONE_TIME' | 'MONTHLY' | 'QUARTERLY' | 'YEARLY';
export type SubscriptionStatus = 'ACTIVE' | 'PAUSED' | 'CANCELLED' | 'COMPLETED' | 'FAILED' | 'EXPIRED';

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
