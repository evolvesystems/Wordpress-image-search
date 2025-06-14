import React, { useState, useEffect } from 'react';
import { Search, Loader2, Camera, LogIn } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { toast } from '@/hooks/use-toast';
import { useAuth } from '@/hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import { useWordPressUserSettings } from '@/hooks/useWordPressUserSettings';
import { useWordPressImageSearch } from '@/hooks/useWordPressImageSearch';
import WordPressImageAnalyzeCard from "./WordPressImageAnalyzeCard";

const SearchInterface = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [query, setQuery] = useState('');
  const { settings, loading: wpLoading } = useWordPressUserSettings();
  const { results, isLoading, error, searchImages } = useWordPressImageSearch();

  const popularSearches = [
    'red soil', 'working dog', 'cattle grazing', 'wheat field', 
    'farm machinery', 'irrigation', 'sheep flock', 'harvest time'
  ];

  const [searchMode, setSearchMode] = useState<'wordpress' | 'local' | 'none'>('none');

  useEffect(() => {
    if (user && settings?.wordpress_url) {
      setSearchMode('wordpress');
    } else if (user) {
      setSearchMode('local');
    } else {
      setSearchMode('none');
    }
  }, [user, settings]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) {
      toast({
        title: "Sign in to search images",
        description: "You'll be redirected to your personal dashboard after signing in.",
      });
      return;
    }
    if (searchMode === 'wordpress' && settings?.wordpress_url && query) {
      searchImages(settings.wordpress_url, query);
    } else {
      // Default flow: redirect to dashboard
      navigate('/admin');
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <Card className="p-8 mb-8 bg-white shadow-lg">
        <form onSubmit={handleSearch} className="flex gap-4 mb-6">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <Input
              type="text"
              placeholder="Search by describing what you see... (e.g., 'red soil', 'working dog', 'cattle in field')"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="pl-10 py-3 text-lg"
            />
          </div>
          <Button 
            type="submit" 
            disabled={isLoading || wpLoading}
            className="px-8 py-3 bg-green-600 hover:bg-green-700"
          >
            {!user ? (
              <>
                <LogIn className="w-5 h-5 mr-2" />
                Sign In to Search
              </>
            ) : searchMode === 'wordpress' ? (
              <>
                <Camera className="w-5 h-5 mr-2" />
                Search WordPress Images
              </>
            ) : (
              <>
                <Camera className="w-5 h-5 mr-2" />
                Go to Dashboard
              </>
            )}
          </Button>
        </form>
        
        <div className="text-sm text-gray-600">
          <span className="font-medium">Popular searches:</span>
          <div className="flex flex-wrap gap-2 mt-2">
            {popularSearches.map((search) => (
              <button
                key={search}
                type="button"
                onClick={() => setQuery(search)}
                className="px-3 py-1 bg-green-100 text-green-700 rounded-full hover:bg-green-200 transition-colors"
              >
                {search}
              </button>
            ))}
          </div>
        </div>

        {searchMode === 'wordpress' && results.length > 0 && (
          <div className="mt-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {results.map(img => (
                <WordPressImageAnalyzeCard key={img.id} img={img} />
              ))}
            </div>
          </div>
        )}
        {searchMode === 'wordpress' && error && (
          <div className="text-red-600 text-sm mt-4">{error}</div>
        )}
        {user && searchMode === 'local' && (
          <div className="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
            <div className="flex items-center gap-3 mb-3">
              <Search className="w-5 h-5 text-yellow-600" />
              <h3 className="font-semibold text-yellow-800">WordPress Search Not Set Up</h3>
            </div>
            <p className="text-yellow-700 text-sm mb-2">
              To search images from your WordPress site directly, please{' '}
              <a href="/admin/wordpress-search-setup" className="text-green-700 underline">complete the WordPress setup here</a>.
            </p>
            <p className="text-yellow-700 text-sm">
              Or, continue to your dashboard to upload and search your local images.
            </p>
          </div>
        )}
        {!user && (
          <div className="mt-6 p-4 bg-green-50 border border-green-200 rounded-lg">
            <div className="flex items-center gap-3 mb-3">
              <LogIn className="w-5 h-5 text-green-600" />
              <h3 className="font-semibold text-green-800">Ready to start searching?</h3>
            </div>
            <p className="text-green-700 text-sm mb-3">
              Sign in to access your personal dashboard where you can:
            </p>
            <ul className="text-green-700 text-sm space-y-1 ml-4">
              <li>• Upload and manage your agricultural images</li>
              <li>• Search through images using natural language</li>
              <li>• Configure AI-powered image analysis</li>
              <li>• Track your uploads and search history</li>
            </ul>
          </div>
        )}
      </Card>
    </div>
  );
};

export default SearchInterface;
