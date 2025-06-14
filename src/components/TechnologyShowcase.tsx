
import React from 'react';
import { Card } from '@/components/ui/card';
import { Brain, Zap, Globe, Shield } from 'lucide-react';

const TechnologyShowcase = () => {
  const features = [
    {
      icon: Brain,
      title: "AI Image Analysis",
      description: "Advanced computer vision models automatically analyze image content, identifying objects, colors, textures, and scenes without manual tagging."
    },
    {
      icon: Zap,
      title: "Instant Results",
      description: "Search through thousands of images in seconds. Our AI processes visual queries faster than traditional keyword searches."
    },
    {
      icon: Globe,
      title: "Natural Language",
      description: "Search using everyday language. Ask for 'red soil' or 'working dog' and get relevant results based on visual content."
    },
    {
      icon: Shield,
      title: "WordPress Integration",
      description: "Can be integrated into existing WordPress sites as a plugin, working alongside your current image management system."
    }
  ];

  return (
    <div className="bg-gray-50 py-16">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            How AI Visual Search Works
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            This demonstration shows how modern AI can automatically understand image content, 
            making your photo database searchable by visual elements rather than just tags.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <Card key={index} className="p-6 text-center hover:shadow-lg transition-shadow">
              <feature.icon className="w-12 h-12 text-green-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </Card>
          ))}
        </div>
        
        <div className="mt-12 p-8 bg-white rounded-lg shadow-md">
          <h3 className="text-2xl font-bold mb-4 text-center">Commercial Solutions Available</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="text-lg font-semibold mb-2">Cloud-Based Options:</h4>
              <ul className="space-y-2 text-gray-700">
                <li>• Google Vision AI - Excellent for general object detection</li>
                <li>• Amazon Rekognition - Strong agricultural object recognition</li>
                <li>• Clarifai - Customizable for specific agricultural needs</li>
                <li>• Microsoft Azure Computer Vision</li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-2">WordPress Plugins:</h4>
              <ul className="space-y-2 text-gray-700">
                <li>• WP Visual Search (can be customized)</li>
                <li>• Smart Image Search plugins</li>
                <li>• Custom integration with AI APIs</li>
                <li>• Elasticsearch with image analysis</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TechnologyShowcase;
