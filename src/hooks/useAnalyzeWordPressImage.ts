
import { useState } from "react";

export const useAnalyzeWordPressImage = () => {
  const [tags, setTags] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // "Analyze image" instantly simulates demo output, no backend call.
  const analyzeImage = async (_imageUrl: string) => {
    setIsLoading(true);
    setTags(null);
    setError(null);
    setTimeout(() => {
      setTags("wheat, tractor, sunrise, field");
      setError("Demo only – AI analysis is not enabled on this account.");
      setIsLoading(false);
    }, 800); // Small delay for effect
  };

  return { tags, isLoading, error, analyzeImage, setTags };
};
