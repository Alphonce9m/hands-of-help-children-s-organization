import { createClient } from '@supabase/supabase-js';
import { env } from './env';

const supabase = createClient(env.DATABASE_URL, env.SUPABASE_ANON_KEY);

export interface Donation {
  id: string;
  user_id: string;
  amount: number;
  description: string;
  status: 'pending' | 'completed' | 'failed' | 'cancelled';
  created_at: string;
  updated_at: string;
}

export interface PaymentTransaction {
  id: string;
  donation_id: string;
  transaction_id: string;
  phone_number: string;
  amount: number;
  status: 'pending' | 'completed' | 'failed' | 'cancelled';
  result_code: number | null;
  result_description: string | null;
  created_at: string;
  updated_at: string;
}

export class DonationService {
  static async createDonation(userId: string, amount: number, description: string): Promise<Donation> {
    const { data, error } = await supabase
      .from('donations')
      .insert({
        user_id: userId,
        amount,
        description,
        status: 'pending'
      })
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  static async updateDonationStatus(donationId: string, status: Donation['status']): Promise<void> {
    const { error } = await supabase
      .from('donations')
      .update({ status })
      .eq('id', donationId);

    if (error) throw error;
  }

  static async createPaymentTransaction(
    donationId: string,
    transactionId: string,
    phoneNumber: string,
    amount: number
  ): Promise<PaymentTransaction> {
    const { data, error } = await supabase
      .from('payment_transactions')
      .insert({
        donation_id: donationId,
        transaction_id: transactionId,
        phone_number: phoneNumber,
        amount,
        status: 'pending'
      })
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  static async updatePaymentTransactionStatus(
    transactionId: string,
    status: PaymentTransaction['status'],
    result_code: number | null,
    result_description: string | null
  ): Promise<void> {
    const { error } = await supabase
      .from('payment_transactions')
      .update({
        status,
        result_code,
        result_description
      })
      .eq('transaction_id', transactionId);

    if (error) throw error;
  }

  static async getUserDonationHistory(userId: string): Promise<Donation[]> {
    const { data, error } = await supabase
      .from('donations')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data || [];
  }

  static async getDonationById(donationId: string): Promise<Donation | null> {
    const { data, error } = await supabase
      .from('donations')
      .select('*')
      .eq('id', donationId)
      .single();

    if (error) throw error;
    return data;
  }

  static async getImpactStatistics(): Promise<any> {
    const { data, error } = await supabase
      .from('impact_statistics')
      .select('*')
      .single();

    if (error) throw error;
    return data;
  }
}

export default new DonationService();
