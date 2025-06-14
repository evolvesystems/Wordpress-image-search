
import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
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
      // Use supabase.functions.invoke to ensure auth header inclusion
      const { data, error } = await supabase.functions.invoke('analyze-wordpress-image', {
        body: { imageUrl, user_id: user?.id },
      });

      if (error) {
        throw new Error(error.message || "Failed to analyze image");
      }
      if (!data || typeof data.tags !== "string") {
        throw new Error("No tags returned from AI");
      }
      setTags(data.tags);
    } catch (e: any) {
      setError(e?.message || "Failed to analyze image");
    } finally {
      setIsLoading(false);
    }
  };

  return { tags, isLoading, error, analyzeImage, setTags };
};
