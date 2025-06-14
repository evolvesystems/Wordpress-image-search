
-- Fix existing NULL user_id values and apply security policies safely

-- First, delete orphaned records with NULL user_id
DELETE FROM public.uploaded_images WHERE user_id IS NULL;

-- Apply NOT NULL constraint
ALTER TABLE public.uploaded_images ALTER COLUMN user_id SET NOT NULL;

-- Enable RLS (safe if already enabled)
ALTER TABLE public.uploaded_images ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_settings ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if they exist, then recreate them
DO $$ 
BEGIN
    -- Drop existing policies for uploaded_images
    DROP POLICY IF EXISTS "Users can view their own images" ON public.uploaded_images;
    DROP POLICY IF EXISTS "Users can insert their own images" ON public.uploaded_images;
    DROP POLICY IF EXISTS "Users can update their own images" ON public.uploaded_images;
    DROP POLICY IF EXISTS "Users can delete their own images" ON public.uploaded_images;
    
    -- Drop existing policies for user_settings
    DROP POLICY IF EXISTS "Users can view their own settings" ON public.user_settings;
    DROP POLICY IF EXISTS "Users can insert their own settings" ON public.user_settings;
    DROP POLICY IF EXISTS "Users can update their own settings" ON public.user_settings;
    DROP POLICY IF EXISTS "Users can delete their own settings" ON public.user_settings;
    
    -- Drop existing storage policies
    DROP POLICY IF EXISTS "Users can view their own files" ON storage.objects;
    DROP POLICY IF EXISTS "Users can upload their own files" ON storage.objects;
    DROP POLICY IF EXISTS "Users can update their own files" ON storage.objects;
    DROP POLICY IF EXISTS "Users can delete their own files" ON storage.objects;
END $$;

-- Create RLS policies for uploaded_images
CREATE POLICY "Users can view their own images" 
ON public.uploaded_images 
FOR SELECT 
USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own images" 
ON public.uploaded_images 
FOR INSERT 
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own images" 
ON public.uploaded_images 
FOR UPDATE 
USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own images" 
ON public.uploaded_images 
FOR DELETE 
USING (auth.uid() = user_id);

-- Create RLS policies for user_settings
CREATE POLICY "Users can view their own settings" 
ON public.user_settings 
FOR SELECT 
USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own settings" 
ON public.user_settings 
FOR INSERT 
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own settings" 
ON public.user_settings 
FOR UPDATE 
USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own settings" 
ON public.user_settings 
FOR DELETE 
USING (auth.uid() = user_id);

-- Add URL validation function
CREATE OR REPLACE FUNCTION validate_wordpress_url(url TEXT)
RETURNS BOOLEAN AS $$
BEGIN
  RETURN url ~ '^https?://[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}(/.*)?$';
END;
$$ LANGUAGE plpgsql;

-- Add URL validation constraint (only if it doesn't exist)
DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.table_constraints 
        WHERE constraint_name = 'valid_wordpress_url' 
        AND table_name = 'wordpress_user_settings'
    ) THEN
        ALTER TABLE public.wordpress_user_settings 
        ADD CONSTRAINT valid_wordpress_url 
        CHECK (validate_wordpress_url(wordpress_url));
    END IF;
END $$;

-- Create storage bucket if not exists
INSERT INTO storage.buckets (id, name, public) 
VALUES ('agri-images', 'agri-images', true)
ON CONFLICT (id) DO NOTHING;

-- Create storage policies for user-owned files
CREATE POLICY "Users can view their own files"
ON storage.objects FOR SELECT
USING (bucket_id = 'agri-images' AND auth.uid()::text = (storage.foldername(name))[1]);

CREATE POLICY "Users can upload their own files"
ON storage.objects FOR INSERT
WITH CHECK (bucket_id = 'agri-images' AND auth.uid()::text = (storage.foldername(name))[1]);

CREATE POLICY "Users can update their own files"
ON storage.objects FOR UPDATE
USING (bucket_id = 'agri-images' AND auth.uid()::text = (storage.foldername(name))[1]);

CREATE POLICY "Users can delete their own files"
ON storage.objects FOR DELETE
USING (bucket_id = 'agri-images' AND auth.uid()::text = (storage.foldername(name))[1]);
