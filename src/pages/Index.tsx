
import React from 'react';
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

  return (
    <div className="min-h-screen bg-white">
      <ImageSearchHeader />

      <div className="max-w-4xl mx-auto px-4 py-8 text-center">
        <h1 className="text-5xl md:text-6xl font-extrabold text-green-700 mb-4">
          Instantly Search Your WordPress Images & Their Usage
        </h1>
        <p className="text-xl md:text-2xl text-gray-700 mb-6">
          Connect any WordPress site and instantly search your entire image library, including discovering where each image is used across your site. 
        </p>
        <div className="text-lg text-gray-800 mb-7">
          <span className="inline-block p-2 bg-green-50 rounded-md text-green-700 font-semibold">
            NEW: <span className="text-green-800">AI Chat Assistant</span> &mdash; Quickly find images or ask where a particular image appears using natural language!
          </span>
        </div>
        <div className="flex justify-center mb-4 gap-4 flex-wrap">
          <div className="bg-green-200 text-green-900 px-4 py-2 rounded-md font-semibold shadow-sm">
            <span>Free Account: </span>Sign up and instantly search your WordPress images and see where they’re used.
          </div>
          <div className="bg-blue-100 text-blue-900 px-4 py-2 rounded-md font-semibold shadow-sm">
            <span>Optional AI Chat: </span>Add your own API key to unlock advanced image discovery and usage questions.
          </div>
        </div>
        <p className="text-gray-600 mb-2">
          Start with a free account, connect your WordPress, and see your images become truly searchable in seconds.
        </p>
        <p className="text-md text-gray-500">
          <strong>Privacy:</strong> Your data stays on your WordPress site. AI features are only activated with your personal API key.
        </p>
      </div>

      <SearchInterface />

      <TechnologyShowcase />

      <div className="bg-green-600 text-white py-12">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Instantly Search & Organize?</h2>
          <p className="text-xl opacity-90 mb-6 max-w-2xl mx-auto">
            Search your WordPress media library and discover where every image is used—across posts, pages, and blocks. 
            Enable AI chat to ask for images by concept or usage pattern.
          </p>
          <div className="text-green-100">
            <p className="mb-2">Simple setup, no imports or syncing required. Works with any modern WordPress site.</p>
            <p>Add your API key for advanced AI-powered chat and usage insights.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
