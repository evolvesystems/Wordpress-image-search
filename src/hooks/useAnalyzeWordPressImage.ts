
import { useState } from "react";
import { useAuth } from "./useAuth";

export const useAnalyzeWordPressImage = () => {
  const [tags, setTags] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const { user } = useAuth();

  const analyzeImage = async (imageUrl: string) => {
    setIsLoading(true);
    setTags(null);
    setError(null);

    try {
      const resp = await fetch("https://zyvgxaghgmyjfkoxnxve.functions.supabase.co/analyze-wordpress-image", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ imageUrl, user_id: user?.id }),
      });
      if (!resp.ok) {
        throw new Error(`Failed to analyze image (${resp.status})`);
      }
      const data = await resp.json();
      setTags(data.tags);
    } catch (e: any) {
      setError(e?.message || "Failed to analyze image");
    } finally {
      setIsLoading(false);
    }
  };

  return { tags, isLoading, error, analyzeImage, setTags };
};
