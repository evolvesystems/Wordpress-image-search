
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
  link?: string;
  tags?: string[]; // extracted from embedded taxonomies, if available
}

function extractTagsFromEmbeds(embed: any): string[] {
  // Try to get tags from 'wp:term' or plug custom taxonomy here
  // The structure depends on which plugins you use!
  // Example when images are tagged with the 'post_tag' taxonomy:
  if (
    embed &&
    Array.isArray(embed["wp:term"])
  ) {
    const terms = embed["wp:term"]
      .flat()
      .filter(
        (term: any) =>
          term.taxonomy === "post_tag" ||
          term.taxonomy === "media_tag" // some plugins
      );
    return terms.map((term: any) => term.name);
  }
  return [];
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
      // Use _embed param to try to get taxonomies (tags/categories).
      const url = `${wordpressUrl.replace(/\/$/, "")}/wp-json/wp/v2/media?media_type=image&search=${encodeURIComponent(
        query
      )}&per_page=12&_embed`;
      const resp = await fetch(url, { method: "GET" });

      if (!resp.ok) {
        throw new Error(`Unable to fetch from WordPress. Status: ${resp.status}`);
      }
      const data = await resp.json();

      // Extract tags if they're present in _embedded
      const resultsWithTags: WPImageResult[] = data.map((img: any) => ({
        ...img,
        tags: img._embedded ? extractTagsFromEmbeds(img._embedded) : [],
      }));

      setResults(resultsWithTags);
      return { data: resultsWithTags, error: null };
    } catch (e: any) {
      const errorMessage = e?.message || "Unknown error";
      setError(errorMessage);
      return { data: [], error: errorMessage };
    } finally {
      setIsLoading(false);
    }
  };

  return { results, isLoading, error, searchImages };
};
