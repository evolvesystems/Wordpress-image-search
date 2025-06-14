
import React, { useEffect } from 'react';
import ImageSearchHeader from '@/components/ImageSearchHeader';
import SearchInterface from '@/components/SearchInterface';
import ImageUpload from '@/components/ImageUpload';
import OpenAIKeyForm from '@/components/OpenAIKeyForm';
import TechnologyShowcase from '@/components/TechnologyShowcase';
import { useImageSearch } from '@/hooks/useImageSearch';

const Index = () => {
  const { searchImages, results, isLoading, loadAllImages } = useImageSearch();

  useEffect(() => {
    loadAllImages();
  }, []);

  const handleUploadComplete = () => {
    loadAllImages();
  };

  return (
    <div className="min-h-screen bg-white">
      <ImageSearchHeader />
      
      <div className="container mx-auto px-4 py-8">
        <OpenAIKeyForm />
        
        <ImageUpload onUploadComplete={handleUploadComplete} />
        
        <SearchInterface 
          onSearch={searchImages}
          isLoading={isLoading}
          results={results}
        />
      </div>
      
      <TechnologyShowcase />
      
      <div className="bg-green-600 text-white py-12">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Transform Your Image Search?</h2>
          <p className="text-xl opacity-90 mb-6 max-w-2xl mx-auto">
            Upload your agricultural images and search through them using natural language. 
            This demonstrates the potential of AI-powered visual search for your image database.
          </p>
          <div className="text-green-100">
            <p className="mb-2">Next steps: Custom AI model training for Australian farming imagery</p>
            <p>Integration with existing WordPress database and tag system</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
