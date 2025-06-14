
import React from 'react';
import { Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface ImageUploadButtonProps {
  fileCount: number;
  uploading: boolean;
  onUpload: () => void;
}

const ImageUploadButton = ({ fileCount, uploading, onUpload }: ImageUploadButtonProps) => {
  return (
    <Button onClick={onUpload} disabled={uploading} className="w-full">
      {uploading ? (
        <>
          <Loader2 className="w-4 h-4 mr-2 animate-spin" />
          Uploading...
        </>
      ) : (
        `Upload ${fileCount} Image(s)`
      )}
    </Button>
  );
};

export default ImageUploadButton;
