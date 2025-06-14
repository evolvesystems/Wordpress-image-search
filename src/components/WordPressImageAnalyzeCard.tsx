
import React, { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Loader2, BrainCircuit } from "lucide-react";
import { useAnalyzeWordPressImage } from "@/hooks/useAnalyzeWordPressImage";

interface WordPressAnalyzeCardProps {
  img: {
    id: number;
    source_url: string;
    title: { rendered: string };
    alt_text?: string;
    caption: { rendered: string };
    link?: string;
    // Optionally add other fields as needed
  };
}

const WordPressImageAnalyzeCard: React.FC<WordPressAnalyzeCardProps> = ({ img }) => {
  const [showAI, setShowAI] = useState(false);
  const {
    tags,
    isLoading,
    error,
    analyzeImage,
    setTags,
  } = useAnalyzeWordPressImage();

  const handleAnalyze = () => {
    setTags(null);
    setShowAI(true);
    analyzeImage(img.source_url);
  };

  return (
    <Card className="overflow-hidden border flex flex-col h-full">
      <img
        src={img.source_url}
        alt={img.alt_text || img.title?.rendered}
        className="w-full h-32 object-cover bg-gray-100"
      />
      <div className="p-2 flex-1 flex flex-col">
        <div className="text-xs font-medium line-clamp-1">{img.title?.rendered}</div>
        {img.caption?.rendered && (
          <div
            className="text-xs text-gray-500 line-clamp-2"
            dangerouslySetInnerHTML={{ __html: img.caption.rendered }}
          />
        )}
        <div className="flex-1" />
        {img.link && (
          <a
            href={img.link}
            className="inline-flex items-center gap-1 text-xs text-blue-600 hover:underline mt-1"
            target="_blank"
            rel="noopener noreferrer"
            title="View this image in WordPress"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeWidth={2} d="M10 14L21 3m0 0v7m0-7h-7M13 10v11a1 1 0 001 1h6a1 1 0 001-1V8m-8 6H4a1 1 0 01-1-1v-5a1 1 0 011-1h5a1 1 0 011 1v5a1 1 0 01-1 1z" /></svg>
            View page
          </a>
        )}
        <Button
          variant="outline"
          size="sm"
          className="mt-2 w-full flex items-center justify-center"
          disabled={isLoading}
          onClick={handleAnalyze}
        >
          {isLoading ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin mr-2" />
              Analyzing...
            </>
          ) : (
            <>
              <BrainCircuit className="w-4 h-4 mr-2" />
              Analyze Image (AI)
            </>
          )}
        </Button>
        {showAI && (
          <div className="mt-2">
            {error && (
              <div className="text-xs text-red-500">
                Error: {error}
              </div>
            )}
            {tags && (
              <div className="text-xs bg-green-50 text-green-700 p-2 rounded">
                <span className="font-medium">AI Tags: </span>
                {tags}
              </div>
            )}
          </div>
        )}
      </div>
    </Card>
  );
};

export default WordPressImageAnalyzeCard;
