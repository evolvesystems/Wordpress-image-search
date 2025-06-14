
import React, { useState } from 'react';
import { Key, Save } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { toast } from '@/hooks/use-toast';

const OpenAIKeyForm = () => {
  const [apiKey, setApiKey] = useState(localStorage.getItem('openai_api_key') || '');
  const [isVisible, setIsVisible] = useState(!localStorage.getItem('openai_api_key'));

  const handleSave = () => {
    if (!apiKey.trim()) {
      toast({
        title: "Invalid API Key",
        description: "Please enter a valid OpenAI API key",
        variant: "destructive",
      });
      return;
    }

    localStorage.setItem('openai_api_key', apiKey.trim());
    setIsVisible(false);
    toast({
      title: "API Key Saved",
      description: "Your OpenAI API key has been saved locally",
    });
  };

  const handleRemove = () => {
    localStorage.removeItem('openai_api_key');
    setApiKey('');
    setIsVisible(true);
    toast({
      title: "API Key Removed",
      description: "Your OpenAI API key has been removed",
    });
  };

  if (!isVisible && localStorage.getItem('openai_api_key')) {
    return (
      <Card className="p-4 mb-4 bg-green-50 border-green-200">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Key className="w-4 h-4 text-green-600" />
            <span className="text-sm text-green-700">OpenAI API key configured</span>
          </div>
          <div className="flex gap-2">
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => setIsVisible(true)}
            >
              Update
            </Button>
            <Button 
              variant="outline" 
              size="sm"
              onClick={handleRemove}
            >
              Remove
            </Button>
          </div>
        </div>
      </Card>
    );
  }

  return (
    <Card className="p-4 mb-4 bg-blue-50 border-blue-200">
      <div className="space-y-3">
        <div className="flex items-center gap-2">
          <Key className="w-4 h-4 text-blue-600" />
          <h3 className="text-sm font-medium text-blue-900">Configure OpenAI API Key</h3>
        </div>
        <p className="text-xs text-blue-700">
          Add your OpenAI API key to enable AI-powered image analysis and automatic tagging.
        </p>
        <div className="flex gap-2">
          <Input
            type="password"
            placeholder="sk-..."
            value={apiKey}
            onChange={(e) => setApiKey(e.target.value)}
            className="flex-1"
          />
          <Button onClick={handleSave} size="sm">
            <Save className="w-4 h-4 mr-1" />
            Save
          </Button>
        </div>
        <p className="text-xs text-gray-500">
          Your API key is stored locally in your browser and never sent to our servers.
          Get your key from{' '}
          <a 
            href="https://platform.openai.com/api-keys" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-blue-600 hover:underline"
          >
            OpenAI Platform
          </a>
        </p>
      </div>
    </Card>
  );
};

export default OpenAIKeyForm;
