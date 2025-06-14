
import { useState, useCallback } from 'react';

interface ImageMetadata {
  title: string;
  description: string;
  altText: string;
  caption: string;
  tags: string;
}

interface ExtractedMetadata {
  width: number;
  height: number;
  exifData?: any;
}

export const useImageMetadata = () => {
  const [metadata, setMetadata] = useState<{[key: string]: ImageMetadata}>({});

  const initializeMetadata = useCallback((files: File[]) => {
    const newMetadata = { ...metadata };
    files.forEach(file => {
      if (!newMetadata[file.name]) {
        newMetadata[file.name] = {
          title: file.name.replace(/\.[^/.]+$/, ""), // Remove extension
          description: '',
          altText: '',
          caption: '',
          tags: ''
        };
      }
    });
    setMetadata(newMetadata);
  }, [metadata]);

  const updateMetadata = useCallback((fileName: string, field: string, value: string) => {
    setMetadata(prev => ({
      ...prev,
      [fileName]: {
        ...prev[fileName],
        [field]: value
      }
    }));
  }, []);

  const removeMetadata = useCallback((fileName: string) => {
    const newMetadata = { ...metadata };
    delete newMetadata[fileName];
    setMetadata(newMetadata);
  }, [metadata]);

  const clearAllMetadata = useCallback(() => {
    setMetadata({});
  }, []);

  const extractImageMetadata = useCallback((file: File): Promise<ExtractedMetadata> => {
    return new Promise((resolve) => {
      const img = new Image();
      img.onload = () => {
        resolve({
          width: img.naturalWidth,
          height: img.naturalHeight,
        });
      };
      img.onerror = () => {
        resolve({ width: 0, height: 0 });
      };
      img.src = URL.createObjectURL(file);
    });
  }, []);

  return {
    metadata,
    initializeMetadata,
    updateMetadata,
    removeMetadata,
    clearAllMetadata,
    extractImageMetadata
  };
};
