
import React from 'react';
import { Key } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Eye, EyeOff, Save } from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import { useAuth } from '@/hooks/useAuth';
import { useUserSettings } from '@/hooks/useUserSettings';
import { useState } from 'react';

const ApiKeys = () => {
  const { user } = useAuth();
  const { settings, loading, updateApiKey } = useUserSettings();
  const [apiKey, setApiKey] = useState('');
  const [showApiKey, setShowApiKey] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [isSaving, setIsSaving] = useState(false);

  React.useEffect(() => {
    if (settings?.openai_api_key) {
      // Show masked version for security
      setApiKey('••••••••••••••••••••••••••••••••••••••••••••••••••••');
      setIsVisible(false);
    }
  }, [settings]);

  const validateApiKey = (key: string): boolean => {
    return key.startsWith('sk-') && key.length >= 50;
  };

  const handleSave = async () => {
    if (!apiKey.trim() || apiKey.includes('•')) {
      toast({
        title: "Invalid API Key",
        description: "Please enter a valid OpenAI API key",
        variant: "destructive",
      });
      return;
    }

    if (!validateApiKey(apiKey.trim())) {
      toast({
        title: "Invalid API Key Format",
        description: "OpenAI API keys should start with 'sk-' and be at least 50 characters long",
        variant: "destructive",
      });
      return;
    }

    setIsSaving(true);
    try {
      await updateApiKey(apiKey.trim());
      setIsVisible(false);
      setApiKey('••••••••••••••••••••••••••••••••••••••••••••••••••••');
      setShowApiKey(false);
      toast({
        title: "API Key Saved",
        description: "Your OpenAI API key has been saved securely",
      });
    } catch (error) {
      toast({
        title: "Save failed",
        description: "Failed to save API key. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSaving(false);
    }
  };

  const handleRemove = async () => {
    try {
      await updateApiKey('');
      setApiKey('');
      setIsVisible(true);
      setShowApiKey(false);
      toast({
        title: "API Key Removed",
        description: "Your OpenAI API key has been removed",
      });
    } catch (error) {
      toast({
        title: "Remove failed",
        description: "Failed to remove API key. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleUpdate = () => {
    setApiKey('');
    setIsVisible(true);
    setShowApiKey(false);
  };

  if (!user) return null;

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">API Keys Management</h1>
            <p className="text-gray-600 mt-2">Configure your API keys to enable AI-powered features.</p>
          </div>
          <Key className="w-8 h-8 text-green-600" />
        </div>
        <div className="animate-pulse">
          <div className="h-32 bg-gray-200 rounded-lg"></div>
        </div>
      </div>
    );
  }

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
        {!isVisible && apiKey.includes('•') ? (
          <Card className="p-4 mb-4 bg-green-50 border-green-200">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Key className="w-4 h-4 text-green-600" />
                <span className="text-sm text-green-700">OpenAI API key configured</span>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" onClick={handleUpdate}>
                  Update
                </Button>
                <Button variant="outline" size="sm" onClick={handleRemove}>
                  Remove
                </Button>
              </div>
            </div>
          </Card>
        ) : (
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
                <div className="relative flex-1">
                  <Input
                    type={showApiKey ? "text" : "password"}
                    placeholder="sk-..."
                    value={apiKey}
                    onChange={(e) => setApiKey(e.target.value)}
                    className="pr-10"
                    maxLength={200}
                  />
                  <button
                    type="button"
                    onClick={() => setShowApiKey(!showApiKey)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    tabIndex={-1}
                  >
                    {showApiKey ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
                <Button onClick={handleSave} size="sm" disabled={isSaving}>
                  <Save className="w-4 h-4 mr-1" />
                  {isSaving ? 'Saving...' : 'Save'}
                </Button>
              </div>
              <p className="text-xs text-gray-500">
                Your API key is stored securely and encrypted in your account.
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
        )}
        
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
