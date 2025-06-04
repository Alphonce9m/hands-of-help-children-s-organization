import { z } from 'zod';

const envSchema = z.object({
  NODE_ENV: z.enum(['development', 'production']),
  NEXT_PUBLIC_BASE_URL: z.string(),
  DATABASE_URL: z.string(),
  // Supabase Configuration
  SUPABASE_ANON_KEY: z.string(),
});

export const env = envSchema.parse(process.env);
