
import React, { useEffect } from 'react';
import { useAuth } from '@/hooks/useAuth';
import AuthPage from '@/components/AuthPage';
import ImageSearchHeader from '@/components/ImageSearchHeader';
import SearchInterface from '@/components/SearchInterface';
import TechnologyShowcase from '@/components/TechnologyShowcase';
import { Button } from "@/components/ui/button";
import { Settings } from "lucide-react";

const Index = () => {
  const { user, loading } = useAuth();

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

  // For authenticated users, show the landing page but redirect them to admin on search
  return (
    <div className="min-h-screen bg-white">
      <ImageSearchHeader />

      <div className="max-w-4xl mx-auto px-4 py-8 text-center">
        <h1 className="text-5xl md:text-6xl font-extrabold text-green-700 mb-4">Instantly Search Your WordPress Images</h1>
        <p className="text-xl md:text-2xl text-gray-700 mb-6">
          Connect your WordPress site and find any image by keyword, context, or description &mdash; instantly. 
          No need to import or sync—search your live library in seconds.
        </p>
        <div className="text-lg text-gray-800 mb-7">
          <span className="inline-block p-2 bg-green-50 rounded-md text-green-700 font-semibold">
            NEW: <span className="text-green-800">AI Chat Assistant</span> &mdash; Ask in natural language for images by concept, time, or content!
          </span>
        </div>
        <div className="flex justify-center mb-4 gap-4 flex-wrap">
          <div className="bg-green-200 text-green-900 px-4 py-2 rounded-md font-semibold shadow-sm">
            <span>Free Account: </span>Sign up &amp; instantly search your images
          </div>
          <div className="bg-blue-100 text-blue-900 px-4 py-2 rounded-md font-semibold shadow-sm">
            <span>Smarter Search: </span>Add your API key to unlock AI-powered chat and tagging
          </div>
        </div>
        <p className="text-gray-600 mb-2">
          Start with a free account, connect your WordPress, and see how easy searching images can be.
        </p>
        <p className="text-md text-gray-500">
          <strong>Privacy:</strong> Your data stays on your WordPress. AI features are powered by your own API key!
        </p>
      </div>

      <SearchInterface />

      <TechnologyShowcase />

      <div className="bg-green-600 text-white py-12">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Instantly Explore Your Media Library?</h2>
          <p className="text-xl opacity-90 mb-6 max-w-2xl mx-auto">
            Instantly search and organize your WordPress images. 
            Try our AI chat to discover images by event, shape, object, place, or keyword.
          </p>
          <div className="text-green-100">
            <p className="mb-2">Easy setup. No import required. Works with any modern WordPress site.</p>
            <p>Upgrade with an API key for advanced AI-driven chat and tagging.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
