
import React from 'react';
import { Key } from 'lucide-react';
import SecureOpenAIKeyForm from '@/components/SecureOpenAIKeyForm';

const ApiKeys = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">API Keys Management</h1>
          <p className="text-gray-600 mt-2">Configure your API keys to enable AI-powered features.</p>
        </div>
        <Key className="w-8 h-8 text-green-600" />
      </div>
      
      <div className="max-w-2xl">
        <SecureOpenAIKeyForm />
        
        <div className="mt-8 p-6 bg-gray-50 rounded-lg border">
          <h3 className="text-lg font-semibold text-gray-900 mb-3">Why do I need an API key?</h3>
          <div className="space-y-2 text-sm text-gray-700">
            <p>• <strong>Image Analysis:</strong> AI analyzes your uploaded images to understand content and generate descriptions</p>
            <p>• <strong>Smart Search:</strong> Natural language search through your image collection</p>
            <p>• <strong>Auto Tagging:</strong> Automatic generation of relevant tags for better organization</p>
            <p>• <strong>Content Recognition:</strong> Identify objects, scenes, and activities in agricultural images</p>
          </div>
          
          <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded">
            <p className="text-sm text-blue-800">
              <strong>Security:</strong> Your API key is encrypted and stored securely. It's only used to process your images and is never shared.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ApiKeys;
