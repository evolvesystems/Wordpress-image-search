
import React from 'react';
import { Card } from '@/components/ui/card';
import { useAuth } from '@/hooks/useAuth';
import { Key, Search, Image, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useWordPressUserSettings } from '@/hooks/useWordPressUserSettings';
import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';

const AdminDashboard = () => {
  const { user } = useAuth();

  // WordPress setup status
  const { settings } = useWordPressUserSettings();
  const isWordPressSet = !!settings?.wordpress_url;

  // API key setup status
  const [hasAPIKey, setHasAPIKey] = useState<boolean>(false);

  useEffect(() => {
    const checkAPIKey = async () => {
      if (!user) {
        setHasAPIKey(false);
        return;
      }
      const { data, error } = await supabase
        .from('user_settings' as any)
        .select('openai_api_key')
        .eq('user_id', user.id)
        .maybeSingle();

      // Robust null check and assign to a temp variable for type safety
      if (
        !error &&
        data !== null &&
        typeof data === 'object' &&
        'openai_api_key' in data
      ) {
        const safeData = data as { openai_api_key?: string | null }; // guaranteed non-null here
        const apiKey = safeData.openai_api_key;
        setHasAPIKey(Boolean(apiKey));
      } else {
        setHasAPIKey(false);
      }
    };
    checkAPIKey();
  }, [user]);

  // Both steps complete -> ready to search & chat
  const readyToSearch = isWordPressSet && hasAPIKey;

  return (
    <div className="max-w-2xl mx-auto space-y-8">
      <div className="mb-6 text-center">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Welcome to Your Dashboard</h1>
        <p className="text-gray-700">
          Get started in just 3 simple steps – instantly search your WordPress media library. AI enhancement (API key) is optional.
        </p>
      </div>

      <Card className="p-8 space-y-8">
        <div className="flex flex-col md:flex-row gap-8 items-stretch md:items-start justify-between">
          {/* Step 1 */}
          <div className="flex-1 flex flex-col items-center">
            <div className="bg-blue-100 w-12 h-12 flex items-center justify-center rounded-full mb-3">
              <Image className="w-6 h-6 text-blue-600" />
            </div>
            <div className="flex items-center gap-1">
              <h3 className="font-semibold text-lg mb-1">1. Connect WordPress</h3>
              {isWordPressSet && <Check className="w-5 h-5 text-green-600 animate-fade-in" />}
            </div>
            <p className="text-sm text-gray-600 mb-3 text-center">Paste your WordPress site address to fetch and search your media library directly.</p>
            <Button variant="outline" asChild>
              <a href="/admin/wordpress-search-setup">Set Up WordPress</a>
            </Button>
          </div>
          {/* Divider */}
          <div className="hidden md:flex flex-col items-center justify-center">
            <div className="w-1 h-20 bg-gray-200 rounded" />
          </div>
          {/* Step 2 */}
          <div className="flex-1 flex flex-col items-center">
            <div className="bg-green-100 w-12 h-12 flex items-center justify-center rounded-full mb-3">
              <Key className="w-6 h-6 text-green-600" />
            </div>
            <div className="flex items-center gap-1">
              <h3 className="font-semibold text-lg mb-1">2. (Optional) Add API Key</h3>
              {hasAPIKey && <Check className="w-5 h-5 text-green-600 animate-fade-in" />}
            </div>
            <p className="text-sm text-gray-600 mb-3 text-center">Enable advanced AI-powered search, tagging, and chat assistance with your OpenAI key.</p>
            <Button variant="outline" asChild>
              <a href="/admin/api-keys">Add API Key</a>
            </Button>
          </div>
          {/* Divider */}
          <div className="hidden md:flex flex-col items-center justify-center">
            <div className="w-1 h-20 bg-gray-200 rounded" />
          </div>
          {/* Step 3 */}
          <div className="flex-1 flex flex-col items-center">
            <div className="bg-purple-100 w-12 h-12 flex items-center justify-center rounded-full mb-3">
              <Search className="w-6 h-6 text-purple-600" />
            </div>
            <div className="flex items-center gap-1">
              <h3 className="font-semibold text-lg mb-1">3. Search & Chat</h3>
              {readyToSearch && <Check className="w-5 h-5 text-green-600 animate-fade-in" />}
            </div>
            <p className="text-sm text-gray-600 mb-3 text-center">Instantly find images in your site, see where they’re used, or ask questions via AI chat.</p>
            <Button variant="default" asChild>
              <a href="/">Start Searching</a>
            </Button>
          </div>
        </div>
      </Card>

      <Card className="p-6">
        <h2 className="text-lg font-semibold mb-2">Why connect WordPress?</h2>
        <ul className="list-disc ml-6 text-gray-700 text-sm space-y-1">
          <li>No syncing or importing needed: Search your images instantly and directly from your WordPress site.</li>
          <li>See where any image is used across posts, pages, blocks, and more.</li>
          <li>Enjoy peace of mind: Your data stays on your WordPress site.</li>
          <li>Want more? Add your OpenAI API key to unlock AI chat and discover images in entirely new ways.</li>
        </ul>
      </Card>
    </div>
  );
};

export default AdminDashboard;

