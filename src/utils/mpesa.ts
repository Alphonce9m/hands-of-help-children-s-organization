import axios from 'axios';
import CryptoJS from 'crypto-js';

interface MpesaConfig {
  consumerKey: string;
  consumerSecret: string;
  passkey: string;
  shortcode: string;
  env: 'sandbox' | 'production';
}

interface InitiateSTKPushParams {
  amount: number;
  phoneNumber: string;
  accountReference: string;
  transactionDesc: string;
}

export class MpesaService {
  private config: MpesaConfig;
  private baseUrl: string;
  private accessToken: string | null = null;
  private tokenExpiry: Date | null = null;

  constructor(config: MpesaConfig) {
    this.config = config;
    this.baseUrl = config.env === 'sandbox'
      ? 'https://sandbox.safaricom.co.ke'
      : 'https://api.safaricom.co.ke';
  }

  private async getAccessToken(): Promise<string> {
    if (this.accessToken && this.tokenExpiry && this.tokenExpiry > new Date()) {
      return this.accessToken;
    }

    const auth = Buffer.from(`${this.config.consumerKey}:${this.config.consumerSecret}`).toString('base64');
    
    try {
      const response = await axios.get(`${this.baseUrl}/oauth/v1/generate?grant_type=client_credentials`, {
        headers: {
          Authorization: `Basic ${auth}`,
        },
      });

      this.accessToken = response.data.access_token;
      this.tokenExpiry = new Date(Date.now() + (response.data.expires_in * 1000));
      
      return this.accessToken;
    } catch (error) {
      console.error('Error getting access token:', error);
      throw new Error('Failed to get M-Pesa access token');
    }
  }

  private generateTimestamp(): string {
    const date = new Date();
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const hour = String(date.getHours()).padStart(2, '0');
    const minute = String(date.getMinutes()).padStart(2, '0');
    const second = String(date.getSeconds()).padStart(2, '0');
    
    return `${year}${month}${day}${hour}${minute}${second}`;
  }

  private generatePassword(): string {
    const timestamp = this.generateTimestamp();
    const str = this.config.shortcode + this.config.passkey + timestamp;
    return CryptoJS.enc.Base64.stringify(CryptoJS.SHA256(str));
  }

  async initiateSTKPush(params: InitiateSTKPushParams) {
    const accessToken = await this.getAccessToken();
    const timestamp = this.generateTimestamp();
    const password = this.generatePassword();

    const requestBody = {
      BusinessShortCode: this.config.shortcode,
      Password: password,
      Timestamp: timestamp,
      TransactionType: 'CustomerPayBillOnline',
      Amount: params.amount,
      PartyA: params.phoneNumber,
      PartyB: this.config.shortcode,
      PhoneNumber: params.phoneNumber,
      CallBackURL: `${process.env.NEXT_PUBLIC_BASE_URL}/api/mpesa/callback`,
      AccountReference: params.accountReference,
      TransactionDesc: params.transactionDesc,
    };

    try {
      const response = await axios.post(
        `${this.baseUrl}/mpesa/stkpush/v1/processrequest`,
        requestBody,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            'Content-Type': 'application/json',
          },
        }
      );

      return response.data;
    } catch (error) {
      console.error('Error initiating STK push:', error);
      throw new Error('Failed to initiate M-Pesa payment');
    }
  }

  async queryTransactionStatus(checkoutRequestId: string) {
    const accessToken = await this.getAccessToken();
    const timestamp = this.generateTimestamp();
    const password = this.generatePassword();

    const requestBody = {
      BusinessShortCode: this.config.shortcode,
      Password: password,
      Timestamp: timestamp,
      CheckoutRequestID: checkoutRequestId,
    };

    try {
      const response = await axios.post(
        `${this.baseUrl}/mpesa/stkpushquery/v1/query`,
        requestBody,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            'Content-Type': 'application/json',
          },
        }
      );

      return response.data;
    } catch (error) {
      console.error('Error querying transaction status:', error);
      throw new Error('Failed to query M-Pesa transaction status');
    }
  }
} 