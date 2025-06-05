-- Drop triggers and functions first to avoid dependency issues
DROP TRIGGER IF EXISTS handle_newsletter_sends_updated_at ON public.newsletter_sends;
DROP FUNCTION IF EXISTS public.handle_newsletter_sends_updated_at();

-- Drop the newsletter_sends table
DROP TABLE IF EXISTS public.newsletter_sends;

-- Drop the subscribers table
DROP TABLE IF EXISTS public.subscribers;

-- Drop the newsletters table if it exists
DROP TABLE IF EXISTS public.newsletters;
