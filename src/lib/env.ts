import { z } from 'zod';

const envSchema = z.object({
  NODE_ENV: z.enum(['development', 'production']),
  NEXT_PUBLIC_BASE_URL: z.string(),
  DATABASE_URL: z.string(),
  // M-Pesa Configuration

  MPESA_BUSINESS_NAME: z.string().default('HANDS OF HELP CHILDRENS'),
  MPESA_BANK_ACCOUNT: z.string().default('01134246750900'),
  MPESA_PASSKEY: z.string().default('bfb279f9aa9bdbcf158e97dd71a467cd2e0c893059b10f78e6b72ada1ed2c919'),
  MPESA_PASSWORD: z.string().default('bfb279f9aa9bdbcf158e97dd71a467cd2e0c893059b10f78e6b72ada1ed2c919'),
  MPESA_ACCOUNT_REFERENCE: z.string().default('Hands of Help'),
  MPESA_TRANSACTION_DESC: z.string().default('Donation to Hands of Help'),
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

});

export const env = envSchema.parse(process.env);
