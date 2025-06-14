import React, { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useWordPressImageSearch } from "@/hooks/useWordPressImageSearch";
import { Loader2, Search, Save } from "lucide-react";
import { useWordPressUserSettings } from "@/hooks/useWordPressUserSettings";

const DEFAULT_WP_URL = "https://wordpress.org/news"; // demo source

const WordPressSearchSetup = () => {
  const { settings, setSettings, loading: settingsLoading, error: settingsError, reload } = useWordPressUserSettings();
  const [wordpressUrl, setWordpressUrl] = useState(DEFAULT_WP_URL);
  const [query, setQuery] = useState("");
  const { results, isLoading, error, searchImages } = useWordPressImageSearch();
  const [savedMessage, setSavedMessage] = useState<string | null>(null);

  useEffect(() => {
    if (settings?.wordpress_url) setWordpressUrl(settings.wordpress_url);
  }, [settings]);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!wordpressUrl) return;
    await setSettings(wordpressUrl);
    setSavedMessage("WordPress URL saved!");
    setTimeout(() => setSavedMessage(null), 1800);
    reload();
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!wordpressUrl || !query) return;
    searchImages(wordpressUrl, query);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div>
        <h1 className="text-3xl font-bold mb-1">WordPress Image Search Integration</h1>
        <p className="text-gray-700 mb-1">
          Connect your WordPress site and search images directly via the WordPress REST API—no need to sync or import your full library.
        </p>
      </div>
      <Card className="p-6 space-y-4">
        <h2 className="font-semibold text-lg mb-2">Setup Instructions</h2>
        <ol className="list-decimal ml-6 space-y-2 text-gray-800 text-sm mb-3">
          <li>
            <strong>Find your WordPress site URL</strong>—e.g., <span className="font-mono text-xs">https://your-site.com</span>
          </li>
          <li>
            <strong>Make sure the REST API is enabled.</strong> By default, all modern WordPress installs allow public read access at <span className="font-mono text-xs">/wp-json/wp/v2/media</span>
          </li>
          <li>
            <strong>Copy–paste your site URL below</strong> and try a search!
          </li>
          <li>
            <strong>Advanced:</strong> For protected/private sites, you may need to install a plugin to enable public media REST API access.
          </li>
        </ol>
        <form onSubmit={handleSave} className="flex flex-col md:flex-row gap-3 items-stretch mb-3">
          <Input
            value={wordpressUrl}
            onChange={e => setWordpressUrl(e.target.value)}
            placeholder="WordPress site URL (e.g., https://your-site.com)"
            className="flex-1"
          />
          <Button type="submit" disabled={settingsLoading || !wordpressUrl} className="flex gap-2">
            <Save className="w-4 h-4" />
            {settingsLoading ? "Saving..." : "Save URL"}
          </Button>
        </form>
        {savedMessage && <div className="text-green-700 text-sm">{savedMessage}</div>}
        {settingsError && (
          <div className="text-red-600 text-sm">{settingsError}</div>
        )}
        <form onSubmit={handleSearch} className="flex flex-col md:flex-row gap-3 items-stretch mb-3">
          <Input
            value={query}
            onChange={e => setQuery(e.target.value)}
            placeholder='Search query (e.g., "dog", "sunset")'
            className="flex-1"
          />
          <Button type="submit" disabled={isLoading || !wordpressUrl || !query} className="flex gap-2">
            {isLoading ? <Loader2 className="animate-spin" /> : <Search />}
            Search
          </Button>
        </form>
        {error && (
          <div className="text-red-600 text-sm">{error}</div>
        )}
        <div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-2">
            {results.map(img => (
              <Card key={img.id} className="overflow-hidden border">
                <img src={img.source_url} alt={img.alt_text || img.title?.rendered} className="w-full h-32 object-cover bg-gray-100" />
                <div className="p-2">
                  <div className="text-xs font-medium">{img.title?.rendered}</div>
                  {img.caption?.rendered && (
                    <div className="text-xs text-gray-500" dangerouslySetInnerHTML={{ __html: img.caption.rendered }} />
                  )}
                  {img.link && (
                    <a
                      href={img.link}
                      className="inline-flex items-center gap-1 text-xs text-blue-600 hover:underline mt-1"
                      target="_blank"
                      rel="noopener noreferrer"
                      title="View this image in WordPress"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeWidth={2} d="M10 14L21 3m0 0v7m0-7h-7M13 10v11a1 1 0 001 1h6a1 1 0 001-1V8m-8 6H4a1 1 0 01-1-1v-5a1 1 0 011-1h5a1 1 0 011 1v5a1 1 0 01-1 1z"/></svg>
                      View page
                    </a>
                  )}
                </div>
              </Card>
            ))}
          </div>
        </div>
      </Card>
      <Card className="p-6">
        <h2 className="font-semibold mb-2">How this Works</h2>
        <ul className="list-disc ml-5 text-gray-700 text-sm space-y-1">
          <li>No import needed: Search images live from WordPress as you need them.</li>
          <li>Uses the <span className="font-mono text-xs">/wp-json/wp/v2/media</span> endpoint on your site—works with any public WordPress.</li>
          <li>Note: Private/media-protected sites will need special configuration (see above setup step 4).</li>
          <li>Add this page's logic anywhere in your dashboard or workflow for instant access to your full media library.</li>
        </ul>
      </Card>
    </div>
  );
};

export default WordPressSearchSetup;
