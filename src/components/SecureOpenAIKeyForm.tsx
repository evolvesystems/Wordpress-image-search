
import React, { useState, useEffect } from 'react';
import { Key, Save, Eye, EyeOff } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { toast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';

const SecureOpenAIKeyForm = () => {
  const { user } = useAuth();
  const [apiKey, setApiKey] = useState('');
  const [showApiKey, setShowApiKey] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (user) {
      loadUserSettings();
    }
  }, [user]);

  const loadUserSettings = async () => {
    try {
      // RLS policies ensure users only see their own settings
      const { data, error } = await supabase
        .from('user_settings')
        .select('openai_api_key')
        .maybeSingle();

      if (error && error.code !== 'PGRST116') {
        console.error('Error loading settings:', error);
        return;
      }

      if (data?.openai_api_key) {
        // Show masked version for security
        setApiKey('••••••••••••••••••••••••••••••••••••••••••••••••••••');
        setIsVisible(false);
      }
    } catch (error) {
      console.error('Error loading user settings:', error);
    }
  };

  const validateApiKey = (key: string): boolean => {
    // Basic OpenAI API key validation
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

    if (!user) {
      toast({
        title: "Authentication required",
        description: "Please sign in to save your API key",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);

    try {
      // RLS policies ensure users can only update their own settings
      const { error } = await supabase
        .from('user_settings')
        .upsert({
          user_id: user.id,
          openai_api_key: apiKey.trim(),
          updated_at: new Date().toISOString(),
        }, { onConflict: "user_id" });

      if (error) throw error;

      setIsVisible(false);
      setApiKey('••••••••••••••••••••••••••••••••••••••••••••••••••••');
      setShowApiKey(false);
      toast({
        title: "API Key Saved",
        description: "Your OpenAI API key has been saved securely",
      });
    } catch (error) {
      console.error('Error saving API key:', error);
      toast({
        title: "Save failed",
        description: "Failed to save API key. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleRemove = async () => {
    if (!user) return;

    try {
      const { error } = await supabase
        .from('user_settings')
        .update({ openai_api_key: null })
        .eq('user_id', user.id);

      if (error) throw error;

      setApiKey('');
      setIsVisible(true);
      setShowApiKey(false);
      toast({
        title: "API Key Removed",
        description: "Your OpenAI API key has been removed",
      });
    } catch (error) {
      console.error('Error removing API key:', error);
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

  if (!isVisible && apiKey.includes('•')) {
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
              onClick={handleUpdate}
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
          <Button onClick={handleSave} size="sm" disabled={isLoading}>
            <Save className="w-4 h-4 mr-1" />
            {isLoading ? 'Saving...' : 'Save'}
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
  );
};

export default SecureOpenAIKeyForm;
