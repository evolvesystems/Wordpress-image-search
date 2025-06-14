
import React from 'react';
import SearchInterface from '@/components/SearchInterface';
import ImageAIAssistant from '@/components/ImageAIAssistant';

const SearchPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            AI-Powered Image Search
          </h1>
          <p className="text-xl text-gray-600">
            Search through your images using natural language descriptions
          </p>
        </div>
        <SearchInterface />
      </div>
      <ImageAIAssistant />
    </div>
  );
};

export default SearchPage;
