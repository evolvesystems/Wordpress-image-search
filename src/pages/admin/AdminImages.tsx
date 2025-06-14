import React, { useState, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';
import { toast } from '@/hooks/use-toast';
import ImageUploadSection from '@/components/admin/ImageUploadSection';
import ImageGrid from '@/components/admin/ImageGrid';

interface ImageData {
  id: string;
  filename: string;
  title: string;
  description: string;
  tags: string[];
  storage_path: string;
  uploaded_at: string;
  file_size: number;
}

const AdminImages = () => {
  const { user } = useAuth();
  const [images, setImages] = useState<ImageData[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    loadImages();
  }, [user]);

  const loadImages = async () => {
    if (!user) return;
    
    try {
      const { data, error } = await supabase
        .from('uploaded_images')
        .select('*')
        .eq('user_id', user.id)
        .order('uploaded_at', { ascending: false });

      if (error) throw error;
      setImages(data || []);
    } catch (error) {
      console.error('Error loading images:', error);
      toast({
        title: "Error loading images",
        description: "Failed to load images from database",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const deleteImage = async (imageId: string, storagePath: string) => {
    try {
      // Delete from storage
      const { error: storageError } = await supabase.storage
        .from('agri-images')
        .remove([storagePath]);

      if (storageError) throw storageError;

      // Delete from database
      const { error: dbError } = await supabase
        .from('uploaded_images')
        .delete()
        .eq('id', imageId);

      if (dbError) throw dbError;

      setImages(prev => prev.filter(img => img.id !== imageId));
      toast({
        title: "Image deleted",
        description: "Image has been successfully deleted",
      });
    } catch (error) {
      console.error('Error deleting image:', error);
      toast({
        title: "Delete failed",
        description: "Failed to delete image",
        variant: "destructive",
      });
    }
  };

  const filteredImages = images.filter(image => {
    const searchLower = searchQuery.toLowerCase();
    return (
      image.title.toLowerCase().includes(searchLower) ||
      image.description.toLowerCase().includes(searchLower) ||
      (image.alt_text && image.alt_text.toLowerCase().includes(searchLower)) ||
      (image.caption && image.caption.toLowerCase().includes(searchLower)) ||
      image.tags.some(tag => tag.toLowerCase().includes(searchLower)) ||
      image.filename.toLowerCase().includes(searchLower) ||
      (image.mime_type && image.mime_type.toLowerCase().includes(searchLower))
    );
  });

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  if (loading) {
    return (
      <div className="space-y-6">
        <h1 className="text-3xl font-bold">Image Management</h1>
        <div className="text-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-600 mx-auto"></div>
          <p className="mt-2 text-gray-600">Loading images...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Image Management</h1>
        <div className="flex gap-2">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input
              placeholder="Search images..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>
      </div>

      <ImageUploadSection onUploadComplete={loadImages} />

      <ImageGrid
        images={images}
        filteredImages={filteredImages}
        onDeleteImage={deleteImage}
        formatFileSize={formatFileSize}
      />
    </div>
  );
};

export default AdminImages;
