import { env } from './env';

interface LogData {
  level: 'debug' | 'info' | 'warn' | 'error';
  message: string;
  data?: Record<string, any>;
}

// M-PESA logger logic is disabled. This file is intentionally left blank to avoid TypeScript errors.
// All previous M-PESA code has been commented out or removed for deployment stability.
export {};
