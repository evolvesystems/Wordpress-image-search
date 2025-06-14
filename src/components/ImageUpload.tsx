
import React, { useState, useCallback } from 'react';
import { Card } from '@/components/ui/card';
import { useImageMetadata } from '@/hooks/useImageMetadata';
import { useImageUpload } from '@/hooks/useImageUpload';
import ImageDropzone from './upload/ImageDropzone';
import ImagePreviewCard from './upload/ImagePreviewCard';
import ImageUploadButton from './upload/ImageUploadButton';

interface ImageUploadProps {
  onUploadComplete: () => void;
}

const ImageUpload = ({ onUploadComplete }: ImageUploadProps) => {
  const [files, setFiles] = useState<File[]>([]);
  const { 
    metadata, 
    initializeMetadata, 
    updateMetadata, 
    removeMetadata, 
    clearAllMetadata,
    extractImageMetadata 
  } = useImageMetadata();
  const { uploadImages, uploading } = useImageUpload();

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const imageFiles = acceptedFiles.filter(file => file.type.startsWith('image/'));
    setFiles(prev => [...prev, ...imageFiles]);
    initializeMetadata(imageFiles);
  }, [initializeMetadata]);

  const removeFile = (fileName: string) => {
    setFiles(prev => prev.filter(file => file.name !== fileName));
    removeMetadata(fileName);
  };

  const handleMetadataUpdate = (fileName: string, field: string, value: string) => {
    updateMetadata(fileName, field, value);
  };

  const handleUpload = async () => {
    await uploadImages(files, metadata, extractImageMetadata, () => {
      setFiles([]);
      clearAllMetadata();
      onUploadComplete();
    });
  };

  return (
    <Card className="p-6">
      <div className="space-y-4">
        <ImageDropzone onDrop={onDrop} />

        {files.length > 0 && (
          <div className="space-y-4">
            <h3 className="font-medium">Selected Images ({files.length})</h3>
            <div className="space-y-4 max-h-96 overflow-y-auto">
              {files.map((file) => (
                <ImagePreviewCard
                  key={file.name}
                  file={file}
                  metadata={metadata[file.name] || {
                    title: '',
                    description: '',
                    altText: '',
                    caption: '',
                    tags: ''
                  }}
                  onRemove={() => removeFile(file.name)}
                  onMetadataUpdate={(field, value) => handleMetadataUpdate(file.name, field, value)}
                />
              ))}
            </div>
            
            <ImageUploadButton
              fileCount={files.length}
              uploading={uploading}
              onUpload={handleUpload}
            />
          </div>
        )}
      </div>
    </Card>
  );
};

export default ImageUpload;
