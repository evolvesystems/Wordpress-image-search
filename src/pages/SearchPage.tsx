
import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, BarChart3 } from 'lucide-react';
import SearchInterface from '@/components/SearchInterface';
import ImageAIAssistant from '@/components/ImageAIAssistant';
import { Button } from '@/components/ui/button';

const SearchPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      {/* Navigation Header */}
      <div className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-10">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="sm" asChild>
              <Link to="/admin" className="flex items-center gap-2 text-gray-600 hover:text-green-600">
                <ArrowLeft className="w-4 h-4" />
                <span>Back to Dashboard</span>
              </Link>
            </Button>
            <div className="flex items-center gap-2 text-green-600">
              <BarChart3 className="w-5 h-5" />
              <span className="font-semibold">Search Interface</span>
            </div>
          </div>
        </div>
      </div>

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
