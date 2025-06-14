
import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "./useAuth";

export const useAnalyzeWordPressImage = () => {
  const [tags, setTags] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const { user } = useAuth();

  // Fetch the user's OpenAI API key from DB
  const getUserOpenAIKey = async () => {
    const { data, error } = await supabase
      .from('user_settings' as any)
      .select('openai_api_key')
      .eq('user_id', user?.id)
      .maybeSingle();
    if (error) throw new Error(error.message || "Could not load key");
    return (data as any)?.openai_api_key;
  };

  const analyzeImage = async (imageUrl: string) => {
    setIsLoading(true);
    setTags(null);
    setError(null);

    try {
      const openai_api_key = await getUserOpenAIKey();
      if (!openai_api_key) throw new Error("OpenAI API key not found.");

      // Use supabase.functions.invoke and send the key with request
      const { data, error } = await supabase.functions.invoke('analyze-wordpress-image', {
        body: { imageUrl, openai_api_key },
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
