
import React from 'react';
import ImageUpload from '@/components/ImageUpload';

interface ImageUploadSectionProps {
  onUploadComplete: () => void;
}

const ImageUploadSection = ({ onUploadComplete }: ImageUploadSectionProps) => {
  return <ImageUpload onUploadComplete={onUploadComplete} />;
};

export default ImageUploadSection;
