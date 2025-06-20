
import React from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Download, Trash2, Info } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';

interface ImageData {
  id: string;
  filename: string;
  title: string;
  description: string;
  alt_text?: string;
  caption?: string;
  tags: string[];
  storage_path: string;
  uploaded_at: string;
  file_size: number;
  width?: number;
  height?: number;
  mime_type?: string;
}

interface ImageCardProps {
  image: ImageData;
  onDelete: (imageId: string, storagePath: string) => void;
  formatFileSize: (bytes: number) => string;
}

const ImageCard = ({ image, onDelete, formatFileSize }: ImageCardProps) => {
  const { data } = supabase.storage
    .from('agri-images')
    .getPublicUrl(image.storage_path);

  return (
    <Card className="overflow-hidden">
      <img 
        src={data.publicUrl} 
        alt={image.alt_text || image.title}
        className="w-full h-32 object-cover"
      />
      <div className="p-4">
        <h4 className="font-medium mb-1">{image.title}</h4>
        {image.caption && (
          <p className="text-sm text-gray-500 italic mb-1">{image.caption}</p>
        )}
        <p className="text-sm text-gray-600 mb-2">{image.description}</p>
        
        {image.tags && image.tags.length > 0 && (
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
        )}
        
        <div className="text-xs text-gray-500 mb-3 space-y-1">
          <div className="flex justify-between">
            <span>Size: {formatFileSize(image.file_size)}</span>
            {image.width && image.height && (
              <span>{image.width} × {image.height}</span>
            )}
          </div>
          <div className="flex justify-between">
            <span>Type: {image.mime_type?.split('/')[1]?.toUpperCase() || 'Unknown'}</span>
            <span>{new Date(image.uploaded_at).toLocaleDateString()}</span>
          </div>
          {image.alt_text && (
            <div className="pt-1 border-t border-gray-100">
              <span className="font-medium">Alt: </span>
              <span className="text-gray-600">{image.alt_text}</span>
            </div>
          )}
        </div>
        
        <div className="flex gap-2">
          <Button variant="outline" size="sm" className="flex-1">
            <Download className="w-4 h-4 mr-1" />
            Download
          </Button>
          <Button 
            variant="outline" 
            size="sm"
            onClick={() => onDelete(image.id, image.storage_path)}
            className="text-red-600 hover:text-red-700"
          >
            <Trash2 className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </Card>
  );
};

export default ImageCard;
