
import { useState } from 'react';
import { toast } from '@/hooks/use-toast';

interface SearchResult {
  id: string;
  url: string;
  title: string;
  description: string;
  confidence: number;
  tags: string[];
}

// Sample agricultural images for demonstration
const sampleImages: SearchResult[] = [
  {
    id: '1',
    url: 'https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=400',
    title: 'Red soil wheat field',
    description: 'Wheat growing in characteristic red Australian soil with clear blue sky',
    confidence: 0.95,
    tags: ['red soil', 'wheat', 'farming', 'agriculture', 'field', 'crop']
  },
  {
    id: '2',
    url: 'https://images.unsplash.com/photo-1551632436-cbf8dd35adfa?w=400',
    title: 'Working cattle dog',
    description: 'Australian cattle dog herding sheep in rural farming landscape',
    confidence: 0.92,
    tags: ['working dog', 'cattle dog', 'herding', 'livestock', 'farm dog']
  },
  {
    id: '3',
    url: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=400',
    title: 'Cattle grazing on red earth',
    description: 'Beef cattle grazing on red soil with scattered trees in background',
    confidence: 0.88,
    tags: ['cattle', 'grazing', 'red soil', 'beef', 'pastoral', 'livestock']
  },
  {
    id: '4',
    url: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=400',
    title: 'Modern farm machinery',
    description: 'Large harvester working in golden wheat field during harvest',
    confidence: 0.91,
    tags: ['harvester', 'machinery', 'wheat', 'harvest', 'equipment', 'farming']
  },
  {
    id: '5',
    url: 'https://images.unsplash.com/photo-1500595046743-cd271d694d30?w=400',
    title: 'Sheep flock in paddock',
    description: 'Large flock of sheep in green paddock with working dog nearby',
    confidence: 0.89,
    tags: ['sheep', 'flock', 'paddock', 'wool', 'livestock', 'grazing']
  },
  {
    id: '6',
    url: 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=400',
    title: 'Irrigation system',
    description: 'Center pivot irrigation system watering crops in dry landscape',
    confidence: 0.87,
    tags: ['irrigation', 'water', 'crops', 'farming', 'dry', 'agriculture']
  }
];

export const useImageSearch = () => {
  const [results, setResults] = useState<SearchResult[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const searchImages = async (query: string) => {
    setIsLoading(true);
    console.log('Searching for:', query);
    
    try {
      // Simulate AI analysis delay
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Simple keyword matching for demonstration
      // In real implementation, this would use AI image analysis
      const keywords = query.toLowerCase().split(' ');
      const matchedResults = sampleImages.filter(image => {
        const searchableText = (image.title + ' ' + image.description + ' ' + image.tags.join(' ')).toLowerCase();
        return keywords.some(keyword => searchableText.includes(keyword));
      });

      if (matchedResults.length === 0) {
        // Show similar results even if no exact match
        setResults(sampleImages.slice(0, 3));
        toast({
          title: "Similar results shown",
          description: `No exact matches for "${query}", but here are some related agricultural images.`,
        });
      } else {
        setResults(matchedResults);
        toast({
          title: "Search completed",
          description: `Found ${matchedResults.length} images matching "${query}".`,
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

  return { searchImages, results, isLoading };
};
