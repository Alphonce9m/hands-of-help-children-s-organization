import { env } from './env';

interface LogData {
  level: 'debug' | 'info' | 'warn' | 'error';
  message: string;
  data?: Record<string, any>;
}

export const logger = {
  log(level: string, data: LogData) {
    if (env.MPESA_LOG_LEVEL === 'debug' || level === 'error') {
      console.log(`[${new Date().toISOString()}] [M-Pesa] ${level.toUpperCase()}:`, {
        ...data,
        environment: env.MPESA_ENVIRONMENT
      });
    }
  }
};
