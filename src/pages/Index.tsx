
import React, { useEffect } from 'react';
import { useAuth } from '@/hooks/useAuth';
import AuthPage from '@/components/AuthPage';
import ImageSearchHeader from '@/components/ImageSearchHeader';
import SearchInterface from '@/components/SearchInterface';
import ImageUpload from '@/components/ImageUpload';
import TechnologyShowcase from '@/components/TechnologyShowcase';
import { useImageSearch } from '@/hooks/useImageSearch';

const Index = () => {
  const { user, loading } = useAuth();
  const { searchImages, results, isLoading, loadAllImages } = useImageSearch();

  useEffect(() => {
    if (user) {
      loadAllImages();
    }
  }, [user]);

  const handleUploadComplete = () => {
    loadAllImages();
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return <AuthPage />;
  }

  return (
    <div className="min-h-screen bg-white">
      <ImageSearchHeader />
      
      <div className="container mx-auto px-4 py-8">
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
