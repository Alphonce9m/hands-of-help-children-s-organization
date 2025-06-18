import { z } from 'zod';

// Server-side environment variables
const serverSchema = z.object({
  NODE_ENV: z.enum(['development', 'production']),
  DATABASE_URL: z.string().url(),
  
  // Supabase Configuration
  SUPABASE_URL: z.string().url(),
  SUPABASE_SERVICE_ROLE_KEY: z.string(),
  SUPABASE_ANON_KEY: z.string(),

  // M-Panga Configuration
  MPANGA_API_KEY: z.string(),
  MPANGA_ENVIRONMENT: z.enum(['sandbox', 'production']),

  // Email Configuration
  SMTP_HOST: z.string(),
  SMTP_PORT: z.string().regex(/^\d+$/).transform(Number),
  SMTP_USER: z.string(),
  SMTP_PASS: z.string(),
  SMTP_FROM: z.string().email(),
});

// Client-side environment variables
const clientSchema = z.object({
  NEXT_PUBLIC_SUPABASE_URL: z.string().url(),
  NEXT_PUBLIC_SUPABASE_ANON_KEY: z.string(),
  NEXT_PUBLIC_BASE_URL: z.string().url(),
});

// Validate both schemas at startup
const _server: z.infer<typeof serverSchema> = serverSchema.parse(process.env);
const _client: z.infer<typeof clientSchema> = clientSchema.parse(process.env);

// Export the validated values
export const env = {
  ..._server,
  ..._client,
} as const;

// Export type for type-safe access
export type Env = typeof env;
