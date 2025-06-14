
import React, { useState } from 'react';
import { Search, Loader2, Camera } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { toast } from '@/hooks/use-toast';

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
  const [query, setQuery] = useState('');
  
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      onSearch(query.trim());
    } else {
      toast({
        title: "Please enter a search term",
        description: "Describe what you're looking for (e.g., 'red soil', 'working dog', 'wheat field')",
      });
    }
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
            {isLoading ? (
              <>
                <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                Analyzing...
              </>
            ) : (
              <>
                <Camera className="w-5 h-5 mr-2" />
                Search Images
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
      </Card>

      {results.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {results.map((result) => (
            <Card key={result.id} className="overflow-hidden hover:shadow-lg transition-shadow">
              <div className="relative">
                <img 
                  src={result.url} 
                  alt={result.title}
                  className="w-full h-48 object-cover"
                />
                <div className="absolute top-2 right-2 bg-green-600 text-white px-2 py-1 rounded text-sm">
                  {Math.round(result.confidence * 100)}% match
                </div>
              </div>
              <div className="p-4">
                <h3 className="font-semibold text-lg mb-2">{result.title}</h3>
                <p className="text-gray-600 text-sm mb-3">{result.description}</p>
                <div className="flex flex-wrap gap-1">
                  {result.tags.map((tag) => (
                    <span 
                      key={tag}
                      className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-xs"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchInterface;
