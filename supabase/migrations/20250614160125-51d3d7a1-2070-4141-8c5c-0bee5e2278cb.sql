
-- Remove the conflicting public read access policy that allows unrestricted access
DROP POLICY IF EXISTS "Public read access for agri-images" ON storage.objects;

-- Verify our user-specific policies are correctly implemented
-- (These should already exist from the migration, but let's ensure they're correct)

-- Drop existing user policies to recreate them properly
DROP POLICY IF EXISTS "Users can view their own files" ON storage.objects;
DROP POLICY IF EXISTS "Users can upload their own files" ON storage.objects;
DROP POLICY IF EXISTS "Users can update their own files" ON storage.objects;
DROP POLICY IF EXISTS "Users can delete their own files" ON storage.objects;

-- Recreate user-specific policies with proper path checking
CREATE POLICY "Users can view their own files"
ON storage.objects FOR SELECT
USING (
  bucket_id = 'agri-images' 
  AND auth.uid()::text = (storage.foldername(name))[1]
);

CREATE POLICY "Users can upload their own files"
ON storage.objects FOR INSERT
WITH CHECK (
  bucket_id = 'agri-images' 
  AND auth.uid()::text = (storage.foldername(name))[1]
);

CREATE POLICY "Users can update their own files"
ON storage.objects FOR UPDATE
USING (
  bucket_id = 'agri-images' 
  AND auth.uid()::text = (storage.foldername(name))[1]
);

CREATE POLICY "Users can delete their own files"
ON storage.objects FOR DELETE
USING (
  bucket_id = 'agri-images' 
  AND auth.uid()::text = (storage.foldername(name))[1]
);

-- Add missing columns to uploaded_images table for better security tracking
ALTER TABLE public.uploaded_images 
ADD COLUMN IF NOT EXISTS alt_text TEXT,
ADD COLUMN IF NOT EXISTS caption TEXT,
ADD COLUMN IF NOT EXISTS width INTEGER,
ADD COLUMN IF NOT EXISTS height INTEGER;

-- Ensure bucket is properly configured (should already exist but let's be safe)
INSERT INTO storage.buckets (id, name, public) 
VALUES ('agri-images', 'agri-images', false)  -- Set to false for security
ON CONFLICT (id) DO UPDATE SET public = false;  -- Ensure it's not public

-- Add function to validate user-specific storage paths
CREATE OR REPLACE FUNCTION public.validate_user_storage_path(
  user_id UUID,
  storage_path TEXT
) RETURNS BOOLEAN AS $$
BEGIN
  -- Check if the storage path starts with the user's ID
  RETURN storage_path LIKE user_id::text || '/%';
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
