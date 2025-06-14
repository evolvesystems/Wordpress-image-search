
import React from 'react';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

interface ImageMetadata {
  title: string;
  description: string;
  altText: string;
  caption: string;
  tags: string;
}

interface ImageMetadataFormProps {
  metadata: ImageMetadata;
  onUpdate: (field: string, value: string) => void;
}

const ImageMetadataForm = ({ metadata, onUpdate }: ImageMetadataFormProps) => {
  return (
    <div className="space-y-3">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        <div>
          <label className="text-sm font-medium">Title</label>
          <Input
            value={metadata.title || ''}
            onChange={(e) => onUpdate('title', e.target.value)}
            placeholder="Image title"
            maxLength={255}
          />
        </div>
        <div>
          <label className="text-sm font-medium">Alt Text</label>
          <Input
            value={metadata.altText || ''}
            onChange={(e) => onUpdate('altText', e.target.value)}
            placeholder="Alt text for accessibility"
            maxLength={255}
          />
        </div>
      </div>
      
      <div>
        <label className="text-sm font-medium">Description</label>
        <Textarea
          value={metadata.description || ''}
          onChange={(e) => onUpdate('description', e.target.value)}
          placeholder="Describe this image"
          rows={2}
          maxLength={1000}
        />
      </div>
      
      <div>
        <label className="text-sm font-medium">Caption</label>
        <Input
          value={metadata.caption || ''}
          onChange={(e) => onUpdate('caption', e.target.value)}
          placeholder="Image caption"
          maxLength={255}
        />
      </div>
      
      <div>
        <label className="text-sm font-medium">Tags</label>
        <Input
          value={metadata.tags || ''}
          onChange={(e) => onUpdate('tags', e.target.value)}
          placeholder="agriculture, crop, farming (comma separated)"
          maxLength={500}
        />
      </div>
    </div>
  );
};

export default ImageMetadataForm;
