
import React, { useState } from 'react';
import { Upload, X, Plus, Brain } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { toast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';

interface UploadedImage {
  file: File;
  preview: string;
  title: string;
  description: string;
  tags: string;
  aiTags?: string;
  isAnalyzing?: boolean;
}

const ImageUpload = ({ onUploadComplete }: { onUploadComplete: () => void }) => {
  const { user } = useAuth();
  const [images, setImages] = useState<UploadedImage[]>([]);
  const [isUploading, setIsUploading] = useState(false);

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);
    const newImages = files.map(file => ({
      file,
      preview: URL.createObjectURL(file),
      title: '',
      description: '',
      tags: '',
      aiTags: '',
      isAnalyzing: false
    }));
    setImages(prev => [...prev, ...newImages]);
  };

  const getUserApiKey = async () => {
    if (!user) return null;
    
    const { data, error } = await supabase
      .from('user_settings' as any)
      .select('openai_api_key')
      .eq('user_id', user.id)
      .maybeSingle();
    
    if (error || !data?.openai_api_key) return null;
    return data.openai_api_key;
  };

  const analyzeImage = async (index: number) => {
    const apiKey = await getUserApiKey();
    if (!apiKey) {
      toast({
        title: "OpenAI API Key Required",
        description: "Please configure your OpenAI API key above to use AI analysis",
        variant: "destructive",
      });
      return;
    }

    setImages(prev => prev.map((img, i) => 
      i === index ? { ...img, isAnalyzing: true } : img
    ));

    try {
      const { data, error } = await supabase.functions.invoke('analyze-image', {
        body: { 
          imageUrl: images[index].preview,
          filename: images[index].file.name,
          apiKey: apiKey
        }
      });

      if (error) throw error;

      setImages(prev => prev.map((img, i) => 
        i === index ? { 
          ...img, 
          aiTags: data.tags,
          isAnalyzing: false 
        } : img
      ));

      toast({
        title: "Image analyzed",
        description: "AI has generated tags for your image",
      });
    } catch (error) {
      console.error('Analysis error:', error);
      setImages(prev => prev.map((img, i) => 
        i === index ? { ...img, isAnalyzing: false } : img
      ));
      toast({
        title: "Analysis failed",
        description: "Could not analyze image. Please check your API key and try again.",
        variant: "destructive",
      });
    }
  };

  const removeImage = (index: number) => {
    setImages(prev => {
      URL.revokeObjectURL(prev[index].preview);
      return prev.filter((_, i) => i !== index);
    });
  };

  const updateImageData = (index: number, field: keyof UploadedImage, value: string) => {
    setImages(prev => prev.map((img, i) => 
      i === index ? { ...img, [field]: value } : img
    ));
  };

  const combineAITags = (index: number) => {
    const image = images[index];
    const aiTags = image.aiTags || '';
    const manualTags = image.tags || '';
    
    if (aiTags && manualTags) {
      const combined = `${manualTags}, ${aiTags}`;
      updateImageData(index, 'tags', combined);
    } else if (aiTags) {
      updateImageData(index, 'tags', aiTags);
    }
  };

  const uploadImages = async () => {
    if (images.length === 0) return;
    
    if (!user) {
      toast({
        title: "Authentication required",
        description: "Please sign in to upload images",
        variant: "destructive",
      });
      return;
    }

    setIsUploading(true);
    let successCount = 0;

    for (const image of images) {
      try {
        const fileName = `${Date.now()}-${image.file.name}`;
        const filePath = `${user.id}/${fileName}`;

        // Upload to storage
        const { error: uploadError } = await supabase.storage
          .from('agri-images')
          .upload(filePath, image.file);

        if (uploadError) throw uploadError;

        // Combine manual tags and AI tags
        const allTags = image.tags ? image.tags.split(',').map(tag => tag.trim()) : [];

        // Save metadata to database
        const { error: dbError } = await supabase
          .from('uploaded_images')
          .insert({
            filename: image.file.name,
            storage_path: filePath,
            title: image.title || image.file.name,
            description: image.description,
            tags: allTags,
            file_size: image.file.size,
            mime_type: image.file.type,
            user_id: user.id
          } as any);

        if (dbError) throw dbError;
        successCount++;
      } catch (error) {
        console.error('Upload error:', error);
        toast({
          title: "Upload failed",
          description: `Failed to upload ${image.file.name}`,
          variant: "destructive",
        });
      }
    }

    setIsUploading(false);
    
    if (successCount > 0) {
      toast({
        title: "Upload successful",
        description: `Successfully uploaded ${successCount} image${successCount > 1 ? 's' : ''}`,
      });
      setImages([]);
      onUploadComplete();
    }
  };

  if (!user) {
    return (
      <Card className="p-6 mb-8 text-center">
        <h2 className="text-2xl font-bold mb-4">Upload Agricultural Images</h2>
        <p className="text-gray-600 mb-4">Please sign in to upload and manage your images.</p>
      </Card>
    );
  }

  return (
    <Card className="p-6 mb-8">
      <h2 className="text-2xl font-bold mb-4">Upload Agricultural Images</h2>
      
      <div className="mb-4">
        <label className="flex items-center justify-center w-full h-32 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50">
          <div className="flex flex-col items-center">
            <Plus className="w-8 h-8 text-gray-400 mb-2" />
            <span className="text-gray-500">Click to select images</span>
          </div>
          <input
            type="file"
            multiple
            accept="image/*"
            onChange={handleFileSelect}
            className="hidden"
          />
        </label>
      </div>

      {images.length > 0 && (
        <div className="space-y-4 mb-4">
          {images.map((image, index) => (
            <div key={index} className="flex gap-4 p-4 border rounded-lg">
              <img 
                src={image.preview} 
                alt="Preview" 
                className="w-20 h-20 object-cover rounded"
              />
              <div className="flex-1 space-y-2">
                <Input
                  placeholder="Image title"
                  value={image.title}
                  onChange={(e) => updateImageData(index, 'title', e.target.value)}
                />
                <Input
                  placeholder="Description"
                  value={image.description}
                  onChange={(e) => updateImageData(index, 'description', e.target.value)}
                />
                <div className="flex gap-2">
                  <Input
                    placeholder="Tags (comma separated)"
                    value={image.tags}
                    onChange={(e) => updateImageData(index, 'tags', e.target.value)}
                    className="flex-1"
                  />
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => analyzeImage(index)}
                    disabled={image.isAnalyzing}
                    className="whitespace-nowrap"
                  >
                    {image.isAnalyzing ? (
                      <>
                        <Brain className="w-4 h-4 mr-2 animate-pulse" />
                        Analyzing...
                      </>
                    ) : (
                      <>
                        <Brain className="w-4 h-4 mr-2" />
                        AI Analyze
                      </>
                    )}
                  </Button>
                </div>
                {image.aiTags && (
                  <div className="text-sm">
                    <span className="text-green-600 font-medium">AI suggested tags: </span>
                    <span className="text-gray-600">{image.aiTags}</span>
                    <Button
                      type="button"
                      variant="link"
                      size="sm"
                      onClick={() => combineAITags(index)}
                      className="ml-2 p-0 h-auto"
                    >
                      Use these tags
                    </Button>
                  </div>
                )}
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={() => removeImage(index)}
              >
                <X className="w-4 h-4" />
              </Button>
            </div>
          ))}
        </div>
      )}

      {images.length > 0 && (
        <Button 
          onClick={uploadImages}
          disabled={isUploading}
          className="w-full"
        >
          {isUploading ? (
            <>
              <Upload className="w-4 h-4 mr-2 animate-spin" />
              Uploading...
            </>
          ) : (
            <>
              <Upload className="w-4 h-4 mr-2" />
              Upload {images.length} Image{images.length > 1 ? 's' : ''}
            </>
          )}
        </Button>
      )}
    </Card>
  );
};

export default ImageUpload;
