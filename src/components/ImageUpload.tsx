
import React, { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { Upload, X, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card } from '@/components/ui/card';
import { toast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';

interface ImageUploadProps {
  onUploadComplete: () => void;
}

interface ExtractedMetadata {
  width: number;
  height: number;
  exifData?: any;
}

const ImageUpload = ({ onUploadComplete }: ImageUploadProps) => {
  const { user } = useAuth();
  const [files, setFiles] = useState<File[]>([]);
  const [uploading, setUploading] = useState(false);
  const [metadata, setMetadata] = useState<{[key: string]: {
    title: string;
    description: string;
    altText: string;
    caption: string;
    tags: string;
  }}>({});

  const extractImageMetadata = (file: File): Promise<ExtractedMetadata> => {
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
  };

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const imageFiles = acceptedFiles.filter(file => file.type.startsWith('image/'));
    setFiles(prev => [...prev, ...imageFiles]);
    
    // Initialize metadata for new files
    const newMetadata = { ...metadata };
    imageFiles.forEach(file => {
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

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.jpeg', '.jpg', '.png', '.gif', '.webp']
    },
    multiple: true,
    maxSize: 10 * 1024 * 1024, // 10MB limit
  });

  const removeFile = (fileName: string) => {
    setFiles(prev => prev.filter(file => file.name !== fileName));
    const newMetadata = { ...metadata };
    delete newMetadata[fileName];
    setMetadata(newMetadata);
  };

  const updateMetadata = (fileName: string, field: string, value: string) => {
    setMetadata(prev => ({
      ...prev,
      [fileName]: {
        ...prev[fileName],
        [field]: value
      }
    }));
  };

  const uploadImages = async () => {
    if (!user) {
      toast({
        title: "Authentication required",
        description: "Please sign in to upload images",
        variant: "destructive",
      });
      return;
    }

    if (files.length === 0) {
      toast({
        title: "No files selected",
        description: "Please select images to upload",
        variant: "destructive",
      });
      return;
    }

    setUploading(true);

    try {
      for (const file of files) {
        const fileMetadata = metadata[file.name];
        const extractedMetadata = await extractImageMetadata(file);
        
        // Create user-specific storage path for security
        const timestamp = Date.now();
        const sanitizedFileName = file.name.replace(/[^a-zA-Z0-9.-]/g, '_');
        const fileName = `${user.id}/${timestamp}-${sanitizedFileName}`;
        
        // Upload to storage with user-specific path
        const { data: uploadData, error: uploadError } = await supabase.storage
          .from('agri-images')
          .upload(fileName, file);

        if (uploadError) throw uploadError;

        // Save metadata to database with proper user_id
        const { error: dbError } = await supabase
          .from('uploaded_images')
          .insert({
            filename: file.name,
            title: fileMetadata.title,
            description: fileMetadata.description,
            alt_text: fileMetadata.altText,
            caption: fileMetadata.caption,
            tags: fileMetadata.tags.split(',').map(tag => tag.trim()).filter(tag => tag),
            storage_path: fileName,
            mime_type: file.type,
            file_size: file.size,
            width: extractedMetadata.width,
            height: extractedMetadata.height,
            user_id: user.id // Explicitly set user_id for security
          });

        if (dbError) throw dbError;
      }

      toast({
        title: "Upload successful",
        description: `Successfully uploaded ${files.length} image(s)`,
      });

      setFiles([]);
      setMetadata({});
      onUploadComplete();
    } catch (error) {
      console.error('Upload error:', error);
      toast({
        title: "Upload failed",
        description: "Failed to upload images. Please try again.",
        variant: "destructive",
      });
    } finally {
      setUploading(false);
    }
  };

  return (
    <Card className="p-6">
      <div className="space-y-4">
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

        {files.length > 0 && (
          <div className="space-y-4">
            <h3 className="font-medium">Selected Images ({files.length})</h3>
            <div className="space-y-4 max-h-96 overflow-y-auto">
              {files.map((file) => (
                <Card key={file.name} className="p-4">
                  <div className="flex items-start gap-4">
                    <img
                      src={URL.createObjectURL(file)}
                      alt={file.name}
                      className="w-20 h-20 object-cover rounded"
                    />
                    <div className="flex-1 space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="font-medium">{file.name}</span>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => removeFile(file.name)}
                        >
                          <X className="w-4 h-4" />
                        </Button>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        <div>
                          <label className="text-sm font-medium">Title</label>
                          <Input
                            value={metadata[file.name]?.title || ''}
                            onChange={(e) => updateMetadata(file.name, 'title', e.target.value)}
                            placeholder="Image title"
                            maxLength={255}
                          />
                        </div>
                        <div>
                          <label className="text-sm font-medium">Alt Text</label>
                          <Input
                            value={metadata[file.name]?.altText || ''}
                            onChange={(e) => updateMetadata(file.name, 'altText', e.target.value)}
                            placeholder="Alt text for accessibility"
                            maxLength={255}
                          />
                        </div>
                      </div>
                      
                      <div>
                        <label className="text-sm font-medium">Description</label>
                        <Textarea
                          value={metadata[file.name]?.description || ''}
                          onChange={(e) => updateMetadata(file.name, 'description', e.target.value)}
                          placeholder="Describe this image"
                          rows={2}
                          maxLength={1000}
                        />
                      </div>
                      
                      <div>
                        <label className="text-sm font-medium">Caption</label>
                        <Input
                          value={metadata[file.name]?.caption || ''}
                          onChange={(e) => updateMetadata(file.name, 'caption', e.target.value)}
                          placeholder="Image caption"
                          maxLength={255}
                        />
                      </div>
                      
                      <div>
                        <label className="text-sm font-medium">Tags</label>
                        <Input
                          value={metadata[file.name]?.tags || ''}
                          onChange={(e) => updateMetadata(file.name, 'tags', e.target.value)}
                          placeholder="agriculture, crop, farming (comma separated)"
                          maxLength={500}
                        />
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
            
            <Button onClick={uploadImages} disabled={uploading} className="w-full">
              {uploading ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Uploading...
                </>
              ) : (
                `Upload ${files.length} Image(s)`
              )}
            </Button>
          </div>
        )}
      </div>
    </Card>
  );
};

export default ImageUpload;
