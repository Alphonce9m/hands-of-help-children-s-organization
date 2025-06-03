import { z } from 'zod';

const envSchema = z.object({
  NODE_ENV: z.enum(['development', 'production']),
  NEXT_PUBLIC_BASE_URL: z.string(),
  DATABASE_URL: z.string(),
  // M-Pesa Configuration
  MPESA_MERCHANT_ID: z.string(),
  MPESA_API_KEY: z.string().default('TgKc9ikVJZwiuf1GiNSldFCz9VyM2FLdHxJQSIyEewjrqABS'),
  MPESA_API_SECRET: z.string().default('PYr4oOZ9H7uIfz4gB5UIDdu3ujqSIPlMkOtxAKsjwWtIxe3GGGCOYMq9gZD1HSfR'),
  MPESA_ENVIRONMENT: z.enum(['sandbox', 'production']).default('sandbox'),
  MPESA_PAYBILL_NUMBER: z.string().default('400200'),
  MPESA_TILL_NUMBER: z.string().default('9955363'),
  MPESA_ACCOUNT_NUMBER: z.string().default('40049632'),
  MPESA_BUSINESS_NAME: z.string().default('HANDS OF HELP CHILDRENS'),
  MPESA_BANK_ACCOUNT: z.string().default('01134246750900'),
  MPESA_PASSKEY: z.string().default('bfb279f9aa9bdbcf158e97dd71a467cd2e0c893059b10f78e6b72ada1ed2c919'),
  MPESA_PASSWORD: z.string().default('bfb279f9aa9bdbcf158e97dd71a467cd2e0c893059b10f78e6b72ada1ed2c919'),
  MPESA_ACCOUNT_REFERENCE: z.string().default('Hands of Hope'),
  MPESA_TRANSACTION_DESC: z.string().default('Donation to Hands of Hope'),
  MPESA_ACCESS_TOKEN: z.string(),
  MPESA_RECIPIENT_NUMBER: z.string().default('0720551576'),
  // Payment Validation
  MPESA_MIN_AMOUNT: z.number().default(1),
  MPESA_MAX_AMOUNT: z.number().default(150000),
  MPESA_ALLOWED_PHONE_PREFIXES: z.array(z.string()).default(['254']),
  MPESA_PAYMENT_TIMEOUT: z.number().default(300), // 5 minutes in seconds
  MPESA_MAX_RETRIES: z.number().default(3),
  // Callback Configuration
  MPESA_CALLBACK_PATH: z.string().default('/api/mpesa/callback'),
  MPESA_VERIFY_SIGNATURE: z.boolean().default(true),
  // Logging
  MPESA_LOG_LEVEL: z.enum(['debug', 'info', 'warn', 'error']).default('info'),
  // Supabase Configuration
  SUPABASE_ANON_KEY: z.string(),
  // Mpanga Configuration
  MPANGA_MERCHANT_ID: z.string(),
  MPANGA_API_KEY: z.string(),
  MPANGA_API_SECRET: z.string(),
  MPANGA_ENVIRONMENT: z.enum(['sandbox', 'production']).default('sandbox'),
  MPANGA_SHORTCODE: z.string(),
  MPANGA_TIMESTAMP: z.string(),
  MPANGA_PASSKEY: z.string(),
  MPANGA_PASSWORD: z.string(),
  MPANGA_CALLBACK_PATH: z.string().default('/api/mpanga/callback'),
  MPANGA_VERIFY_SIGNATURE: z.boolean().default(true),
  MPANGA_LOG_LEVEL: z.enum(['debug', 'info', 'warn', 'error']).default('info')
});

export const env = envSchema.parse(process.env);
