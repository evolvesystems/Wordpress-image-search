
import React from 'react';
import ImageSearchHeader from '@/components/ImageSearchHeader';
import SearchInterface from '@/components/SearchInterface';
import TechnologyShowcase from '@/components/TechnologyShowcase';
import { useImageSearch } from '@/hooks/useImageSearch';

const Index = () => {
  const { searchImages, results, isLoading } = useImageSearch();

  return (
    <div className="min-h-screen bg-white">
      <ImageSearchHeader />
      <SearchInterface 
        onSearch={searchImages}
        isLoading={isLoading}
        results={results}
      />
      <TechnologyShowcase />
      
      <div className="bg-green-600 text-white py-12">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Transform Your Image Search?</h2>
          <p className="text-xl opacity-90 mb-6 max-w-2xl mx-auto">
            This demo shows the potential of AI-powered visual search for agricultural imagery. 
            Commercial solutions can be integrated into WordPress sites like AgriShots.
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
