
import React from 'react';
import { Card } from '@/components/ui/card';
import { Image } from 'lucide-react';
import ImageCard from './ImageCard';

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

interface ImageGridProps {
  images: ImageData[];
  filteredImages: ImageData[];
  onDeleteImage: (imageId: string, storagePath: string) => void;
  formatFileSize: (bytes: number) => string;
}

const ImageGrid = ({ images, filteredImages, onDeleteImage, formatFileSize }: ImageGridProps) => {
  const totalPixels = images.reduce((sum, img) => {
    if (img.width && img.height) {
      return sum + (img.width * img.height);
    }
    return sum;
  }, 0);

  const megapixels = (totalPixels / 1000000).toFixed(1);

  return (
    <Card className="p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold">All Images ({filteredImages.length})</h3>
        <div className="text-sm text-gray-600 space-x-4">
          <span>Total: {formatFileSize(images.reduce((sum, img) => sum + img.file_size, 0))}</span>
          {totalPixels > 0 && <span>~{megapixels}MP</span>}
        </div>
      </div>

      {filteredImages.length === 0 ? (
        <div className="text-center py-8">
          <Image className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-600">No images found</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredImages.map((image) => (
            <ImageCard
              key={image.id}
              image={image}
              onDelete={onDeleteImage}
              formatFileSize={formatFileSize}
            />
          ))}
        </div>
      )}
    </Card>
  );
};

export default ImageGrid;
