
import React, { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search, Image, Download, Trash2 } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';
import { toast } from '@/hooks/use-toast';
import ImageUpload from '@/components/ImageUpload';

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

  const filteredImages = images.filter(image => 
    image.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    image.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
    image.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
  );

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

      <ImageUpload onUploadComplete={loadImages} />

      <Card className="p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold">All Images ({filteredImages.length})</h3>
          <div className="text-sm text-gray-600">
            Total: {formatFileSize(images.reduce((sum, img) => sum + img.file_size, 0))}
          </div>
        </div>

        {filteredImages.length === 0 ? (
          <div className="text-center py-8">
            <Image className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-600">No images found</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredImages.map((image) => {
              const { data } = supabase.storage
                .from('agri-images')
                .getPublicUrl(image.storage_path);

              return (
                <Card key={image.id} className="overflow-hidden">
                  <img 
                    src={data.publicUrl} 
                    alt={image.title}
                    className="w-full h-32 object-cover"
                  />
                  <div className="p-4">
                    <h4 className="font-medium mb-1">{image.title}</h4>
                    <p className="text-sm text-gray-600 mb-2">{image.description}</p>
                    <div className="flex flex-wrap gap-1 mb-3">
                      {image.tags.slice(0, 3).map((tag) => (
                        <span 
                          key={tag}
                          className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-xs"
                        >
                          {tag}
                        </span>
                      ))}
                      {image.tags.length > 3 && (
                        <span className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-xs">
                          +{image.tags.length - 3} more
                        </span>
                      )}
                    </div>
                    <div className="text-xs text-gray-500 mb-3">
                      <p>{formatFileSize(image.file_size)}</p>
                      <p>{new Date(image.uploaded_at).toLocaleDateString()}</p>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm" className="flex-1">
                        <Download className="w-4 h-4 mr-1" />
                        Download
                      </Button>
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => deleteImage(image.id, image.storage_path)}
                        className="text-red-600 hover:text-red-700"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </Card>
              );
            })}
          </div>
        )}
      </Card>
    </div>
  );
};

export default AdminImages;
