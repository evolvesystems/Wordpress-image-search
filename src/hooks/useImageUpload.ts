
import { useState } from 'react';
import { toast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';

interface ImageMetadata {
  title: string;
  description: string;
  altText: string;
  caption: string;
  tags: string;
}

interface ExtractedMetadata {
  width: number;
  height: number;
}

export const useImageUpload = () => {
  const { user } = useAuth();
  const [uploading, setUploading] = useState(false);

  const uploadImages = async (
    files: File[], 
    metadata: {[key: string]: ImageMetadata},
    extractImageMetadata: (file: File) => Promise<ExtractedMetadata>,
    onComplete: () => void
  ) => {
    if (!user) {
      toast({
        title: "Authentication required",
        description: "Please sign in to upload images",
        variant: "destructive",
      });
      return;
    }

    if (files.length === 0) {
      toast({
        title: "No files selected",
        description: "Please select images to upload",
        variant: "destructive",
      });
      return;
    }

    setUploading(true);

    try {
      for (const file of files) {
        const fileMetadata = metadata[file.name];
        const extractedMetadata = await extractImageMetadata(file);
        
        // Always use user-specific folder (user.id/...), enforced by storage policy.
        const timestamp = Date.now();
        const sanitizedFileName = file.name.replace(/[^a-zA-Z0-9.-]/g, '_');
        // Storage path MUST start with user id, required by storage RLS!
        const fileName = `${user.id}/${timestamp}-${sanitizedFileName}`;
        
        // Upload to storage with user-specific path
        const { data: uploadData, error: uploadError } = await supabase.storage
          .from('agri-images')
          .upload(fileName, file);

        if (uploadError) throw uploadError;

        // Save metadata to database with proper user_id and storage path
        const { error: dbError } = await supabase
          .from('uploaded_images')
          .insert({
            filename: file.name,
            title: fileMetadata.title,
            description: fileMetadata.description,
            alt_text: fileMetadata.altText,
            caption: fileMetadata.caption,
            tags: fileMetadata.tags.split(',').map(tag => tag.trim()).filter(tag => tag),
            storage_path: fileName,
            mime_type: file.type,
            file_size: file.size,
            width: extractedMetadata.width,
            height: extractedMetadata.height,
            user_id: user.id // Explicitly set user_id for RLS and security
          });

        if (dbError) throw dbError;
      }

      toast({
        title: "Upload successful",
        description: `Successfully uploaded ${files.length} image(s)`,
      });

      onComplete();
    } catch (error) {
      console.error('Upload error:', error);
      toast({
        title: "Upload failed",
        description: "Failed to upload images. Please try again.",
        variant: "destructive",
      });
    } finally {
      setUploading(false);
    }
  };

  return { uploadImages, uploading };
};
