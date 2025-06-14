
-- Create a table to store uploaded image metadata
CREATE TABLE public.uploaded_images (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  filename TEXT NOT NULL,
  storage_path TEXT NOT NULL,
  title TEXT,
  description TEXT,
  tags TEXT[],
  uploaded_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  file_size INTEGER,
  mime_type TEXT
);

-- Create storage bucket for images
INSERT INTO storage.buckets (id, name, public) 
VALUES ('agri-images', 'agri-images', true);

-- Create storage policies to allow public read access
CREATE POLICY "Public read access for agri-images"
ON storage.objects FOR SELECT
USING (bucket_id = 'agri-images');

-- Allow authenticated users to upload images
CREATE POLICY "Allow uploads for agri-images"
ON storage.objects FOR INSERT
WITH CHECK (bucket_id = 'agri-images');

-- Allow users to delete their uploads
CREATE POLICY "Allow deletes for agri-images"
ON storage.objects FOR DELETE
USING (bucket_id = 'agri-images');
