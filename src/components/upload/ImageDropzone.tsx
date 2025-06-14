
import React from 'react';
import { useDropzone } from 'react-dropzone';
import { Upload } from 'lucide-react';

interface ImageDropzoneProps {
  onDrop: (acceptedFiles: File[]) => void;
}

const ImageDropzone = ({ onDrop }: ImageDropzoneProps) => {
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.jpeg', '.jpg', '.png', '.gif', '.webp']
    },
    multiple: true,
    maxSize: 10 * 1024 * 1024, // 10MB limit
  });

  return (
    <div
      {...getRootProps()}
      className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors ${
        isDragActive ? 'border-green-500 bg-green-50' : 'border-gray-300 hover:border-green-400'
      }`}
    >
      <input {...getInputProps()} />
      <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
      {isDragActive ? (
        <p className="text-green-600">Drop the images here...</p>
      ) : (
        <div>
          <p className="text-lg mb-2">Drag & drop images here, or click to select</p>
          <p className="text-sm text-gray-500">Supports JPEG, PNG, GIF, WebP (max 10MB each)</p>
        </div>
      )}
    </div>
  );
};

export default ImageDropzone;
