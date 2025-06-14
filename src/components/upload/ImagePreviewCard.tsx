
import React from 'react';
import { X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import ImageMetadataForm from './ImageMetadataForm';

interface ImageMetadata {
  title: string;
  description: string;
  altText: string;
  caption: string;
  tags: string;
}

interface ImagePreviewCardProps {
  file: File;
  metadata: ImageMetadata;
  onRemove: () => void;
  onMetadataUpdate: (field: string, value: string) => void;
}

const ImagePreviewCard = ({ file, metadata, onRemove, onMetadataUpdate }: ImagePreviewCardProps) => {
  return (
    <Card className="p-4">
      <div className="flex items-start gap-4">
        <img
          src={URL.createObjectURL(file)}
          alt={file.name}
          className="w-20 h-20 object-cover rounded"
        />
        <div className="flex-1">
          <div className="flex items-center justify-between mb-3">
            <span className="font-medium">{file.name}</span>
            <Button
              variant="ghost"
              size="sm"
              onClick={onRemove}
            >
              <X className="w-4 h-4" />
            </Button>
          </div>
          
          <ImageMetadataForm
            metadata={metadata}
            onUpdate={onMetadataUpdate}
          />
        </div>
      </div>
    </Card>
  );
};

export default ImagePreviewCard;
