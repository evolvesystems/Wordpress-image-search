
import React from 'react';
import { Search, Camera, Wheat } from 'lucide-react';

const ImageSearchHeader = () => {
  return (
    <div className="bg-gradient-to-r from-green-600 to-emerald-700 text-white py-16">
      <div className="container mx-auto px-4 text-center">
        <div className="flex justify-center items-center gap-3 mb-6">
          <Wheat className="w-12 h-12" />
          <h1 className="text-5xl font-bold">AgriVision Search</h1>
        </div>
        <p className="text-xl opacity-90 mb-8 max-w-3xl mx-auto">
          AI-powered visual search for agricultural imagery. Find photos by describing what you see - 
          from red soil and working dogs to specific crops and farming equipment.
        </p>
        <div className="flex justify-center items-center gap-6 text-green-100">
          <div className="flex items-center gap-2">
            <Camera className="w-5 h-5" />
            <span>200,000+ Images</span>
          </div>
          <div className="flex items-center gap-2">
            <Search className="w-5 h-5" />
            <span>AI Content Analysis</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImageSearchHeader;
