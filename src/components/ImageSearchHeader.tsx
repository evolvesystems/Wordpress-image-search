
import React from 'react';
import { Search, Camera, Image } from 'lucide-react';
import UserMenu from './UserMenu';

const ImageSearchHeader = () => {
  return (
    <div className="bg-gradient-to-r from-green-600 to-emerald-700 text-white py-16">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-start mb-6">
          <div className="flex-1"></div>
          <div className="flex-1 text-center">
            <div className="flex justify-center items-center gap-3 mb-6">
              <Image className="w-12 h-12" />
              <h1 className="text-5xl font-bold">WordPress Image Search</h1>
            </div>
          </div>
          <div className="flex-1 flex justify-end">
            <UserMenu />
          </div>
        </div>
        <div className="text-center">
          <p className="text-xl opacity-90 mb-8 max-w-3xl mx-auto">
            Instantly search and organize images across your entire WordPress site—including finding where each image appears in posts, pages, and more. 
            Just describe what you need; search by keyword, subject, color, or usage context.
          </p>
          <div className="flex justify-center items-center gap-6 text-green-100">
            <div className="flex items-center gap-2">
              <Camera className="w-5 h-5" />
              <span>Full WordPress Media Library Integration</span>
            </div>
            <div className="flex items-center gap-2">
              <Search className="w-5 h-5" />
              <span>AI Chat Search Available—describe or ask about image usage</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImageSearchHeader;
