
import React, { useState } from 'react';
import { Search, Loader2, Camera, LogIn } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { toast } from '@/hooks/use-toast';
import { useAuth } from '@/hooks/useAuth';
import { useNavigate } from 'react-router-dom';

interface SearchResult {
  id: string;
  url: string;
  title: string;
  description: string;
  confidence: number;
  tags: string[];
}

const SearchInterface = ({ onSearch, isLoading, results }: {
  onSearch: (query: string) => void;
  isLoading: boolean;
  results: SearchResult[];
}) => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [query, setQuery] = useState('');
  
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!user) {
      toast({
        title: "Sign in to search images",
        description: "You'll be redirected to your personal dashboard after signing in.",
      });
      return;
    }
    
    // Redirect to admin panel for authenticated users
    navigate('/admin');
  };

  const popularSearches = [
    'red soil', 'working dog', 'cattle grazing', 'wheat field', 
    'farm machinery', 'irrigation', 'sheep flock', 'harvest time'
  ];

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
            disabled={isLoading}
            className="px-8 py-3 bg-green-600 hover:bg-green-700"
          >
            {!user ? (
              <>
                <LogIn className="w-5 h-5 mr-2" />
                Sign In to Search
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
                onClick={() => setQuery(search)}
                className="px-3 py-1 bg-green-100 text-green-700 rounded-full hover:bg-green-200 transition-colors"
              >
                {search}
              </button>
            ))}
          </div>
        </div>

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
