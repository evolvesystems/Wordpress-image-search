
import { useState } from 'react';
import { toast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from './useAuth';

interface SearchResult {
  id: string;
  url: string;
  title: string;
  description: string;
  confidence: number;
  tags: string[];
  filename: string;
}

export const useImageSearch = () => {
  const { user } = useAuth();
  const [results, setResults] = useState<SearchResult[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [allImages, setAllImages] = useState<SearchResult[]>([]);

  const loadAllImages = async () => {
    if (!user) {
      setAllImages([]);
      return [];
    }

    try {
      const { data: images, error } = await supabase
        .from('uploaded_images')
        .select('*')
        .eq('user_id', user.id)
        .order('uploaded_at', { ascending: false });

      if (error) throw error;

      const imageResults = await Promise.all(
        images.map(async (image) => {
          const { data } = supabase.storage
            .from('agri-images')
            .getPublicUrl(image.storage_path);

          return {
            id: image.id,
            url: data.publicUrl,
            title: image.title || image.filename,
            description: image.description || '',
            confidence: 1.0,
            tags: image.tags || [],
            filename: image.filename
          };
        })
      );

      setAllImages(imageResults);
      return imageResults;
    } catch (error) {
      console.error('Error loading images:', error);
      toast({
        title: "Error loading images",
        description: "Failed to load uploaded images",
        variant: "destructive",
      });
      return [];
    }
  };

  const searchImages = async (query: string) => {
    if (!user) {
      toast({
        title: "Authentication required",
        description: "Please sign in to search your images",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    console.log('Searching for:', query);
    
    try {
      // Load all images if not already loaded
      const imagesToSearch = allImages.length > 0 ? allImages : await loadAllImages();
      
      if (imagesToSearch.length === 0) {
        toast({
          title: "No images found",
          description: "Please upload some images first to search through them.",
        });
        setResults([]);
        setIsLoading(false);
        return;
      }

      // Simulate AI analysis delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Simple keyword matching for demonstration
      const keywords = query.toLowerCase().split(' ');
      const matchedResults = imagesToSearch.filter(image => {
        const searchableText = (
          image.title + ' ' + 
          image.description + ' ' + 
          image.tags.join(' ') + ' ' +
          image.filename
        ).toLowerCase();
        
        return keywords.some(keyword => searchableText.includes(keyword));
      });

      // Calculate confidence based on number of keyword matches
      const resultsWithConfidence = matchedResults.map(image => {
        const searchableText = (
          image.title + ' ' + 
          image.description + ' ' + 
          image.tags.join(' ')
        ).toLowerCase();
        
        const matchCount = keywords.filter(keyword => 
          searchableText.includes(keyword)
        ).length;
        
        return {
          ...image,
          confidence: Math.min(0.95, 0.5 + (matchCount / keywords.length) * 0.45)
        };
      });

      // Sort by confidence
      resultsWithConfidence.sort((a, b) => b.confidence - a.confidence);

      if (resultsWithConfidence.length === 0) {
        // Show all images if no matches found
        setResults(imagesToSearch.slice(0, 6));
        toast({
          title: "No exact matches",
          description: `No exact matches for "${query}". Showing all your uploaded images.`,
        });
      } else {
        setResults(resultsWithConfidence);
        toast({
          title: "Search completed",
          description: `Found ${resultsWithConfidence.length} images matching "${query}".`,
        });
      }
    } catch (error) {
      console.error('Search error:', error);
      toast({
        title: "Search failed",
        description: "There was an error processing your search. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return { searchImages, results, isLoading, loadAllImages, allImages };
};
