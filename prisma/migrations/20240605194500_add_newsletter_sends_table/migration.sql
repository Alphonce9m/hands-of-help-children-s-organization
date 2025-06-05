-- Create newsletter_sends table to track newsletter sends
CREATE TABLE IF NOT EXISTS public.newsletter_sends (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  newsletter_id UUID NOT NULL REFERENCES public.newsletters(id) ON DELETE CASCADE,
  sent_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
  total_recipients INTEGER NOT NULL,
  success_count INTEGER NOT NULL,
  fail_count INTEGER NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create index on newsletter_id for faster lookups
CREATE INDEX IF NOT EXISTS idx_newsletter_sends_newsletter_id ON public.newsletter_sends(newsletter_id);

-- Create index on sent_at for sorting and filtering
CREATE INDEX IF NOT EXISTS idx_newsletter_sends_sent_at ON public.newsletter_sends(sent_at);

-- Create a function to update the updated_at column
CREATE OR REPLACE FUNCTION public.handle_newsletter_sends_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create a trigger to update the updated_at column
CREATE TRIGGER handle_newsletter_sends_updated_at
BEFORE UPDATE ON public.newsletter_sends
FOR EACH ROW
EXECUTE FUNCTION public.handle_newsletter_sends_updated_at();

-- Enable Row Level Security
ALTER TABLE public.newsletter_sends ENABLE ROW LEVEL SECURITY;

-- Create policies for newsletter_sends
CREATE POLICY "Enable read access for authenticated users" ON public.newsletter_sends
  FOR SELECT USING (auth.role() = 'authenticated');

CREATE POLICY "Enable insert for authenticated users" ON public.newsletter_sends
  FOR INSERT WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Enable update for authenticated users" ON public.newsletter_sends
  FOR UPDATE USING (auth.role() = 'authenticated');
