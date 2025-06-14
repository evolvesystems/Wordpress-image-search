
import { useState } from "react";

export interface WPImageResult {
  id: number;
  source_url: string;
  title: { rendered: string };
  alt_text?: string;
  caption: { rendered: string };
  media_details?: {
    width?: number;
    height?: number;
  };
  mime_type?: string;
}

export const useWordPressImageSearch = () => {
  const [results, setResults] = useState<WPImageResult[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const searchImages = async (wordpressUrl: string, query: string) => {
    setIsLoading(true);
    setError(null);
    setResults([]);
    try {
      // Basic endpoint, change as needed for WordPress configs
      const url = `${wordpressUrl.replace(/\/$/, "")}/wp-json/wp/v2/media?media_type=image&search=${encodeURIComponent(
        query
      )}&per_page=12`;
      const resp = await fetch(url, { method: "GET" });

      if (!resp.ok) {
        throw new Error(`Unable to fetch from WordPress. Status: ${resp.status}`);
      }
      const data = await resp.json();
      setResults(data);
    } catch (e: any) {
      setError(e?.message || "Unknown error");
    } finally {
      setIsLoading(false);
    }
  };

  return { results, isLoading, error, searchImages };
};
