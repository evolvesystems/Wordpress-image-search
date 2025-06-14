
import React, { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Loader2, BrainCircuit, Download, Copy, Info } from "lucide-react";

import { useAnalyzeWordPressImage } from "@/hooks/useAnalyzeWordPressImage";

interface WordPressAnalyzeCardProps {
  img: {
    id: number;
    source_url: string;
    title: { rendered: string };
    alt_text?: string;
    caption: { rendered: string };
    link?: string;
    media_details?: {
      width?: number;
      height?: number;
    };
    mime_type?: string;
    date?: string;
    [key: string]: any; // allow flexible extra meta
  };
}

const WordPressImageAnalyzeCard: React.FC<WordPressAnalyzeCardProps> = ({ img }) => {
  const [showAI, setShowAI] = useState(false);
  const [showMeta, setShowMeta] = useState(false);
  const [copyFeedback, setCopyFeedback] = useState("");
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

  const handleDownload = () => {
    const link = document.createElement("a");
    link.href = img.source_url;
    link.download = img.title?.rendered || "image";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(img.source_url);
      setCopyFeedback("Copied!");
      setTimeout(() => setCopyFeedback(""), 1200);
    } catch {
      setCopyFeedback("Failed!");
      setTimeout(() => setCopyFeedback(""), 1200);
    }
  };

  return (
    <Card className="overflow-hidden border flex flex-col bg-white">
      <img
        src={img.source_url}
        alt={img.alt_text || img.title?.rendered}
        className="w-full h-32 object-cover bg-gray-100"
      />
      <div className="p-2 flex flex-col flex-grow min-h-0">
        <div className="text-xs font-medium line-clamp-1">{img.title?.rendered}</div>
        {img.caption?.rendered && (
          <div
            className="text-xs text-gray-500 line-clamp-2 mb-1"
            dangerouslySetInnerHTML={{ __html: img.caption.rendered }}
          />
        )}

        <div className="text-xs text-gray-600 space-x-2 mb-1">
          {img.media_details?.width && img.media_details?.height && (
            <span>
              {img.media_details.width} × {img.media_details.height}px
            </span>
          )}
          {img.mime_type && (
            <span>
              {img.mime_type.toUpperCase()}
            </span>
          )}
          {img.date && (
            <span>
              {new Date(img.date).toLocaleDateString()}
            </span>
          )}
        </div>

        {/* Action buttons: Download, Copy URL, Show Meta */}
        <div className="flex gap-1 mt-1 flex-wrap">
          <Button
            variant="outline"
            size="sm"
            className="flex-1 flex items-center gap-1 min-w-[90px]"
            onClick={handleDownload}
            type="button"
          >
            <Download className="w-4 h-4" />
            Download
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="flex items-center gap-1 min-w-[90px]"
            onClick={handleCopy}
            type="button"
            title="Copy image direct URL"
          >
            <Copy className="w-4 h-4" />
            {copyFeedback ? (
              <span className="text-green-600">{copyFeedback}</span>
            ) : (
              <span>Copy URL</span>
            )}
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="flex items-center gap-1 min-w-[40px]"
            type="button"
            title="Show all image meta data"
            onClick={() => setShowMeta((v) => !v)}
          >
            <Info className="w-4 h-4" />
          </Button>
        </div>

        {showMeta && (
          <div className="rounded bg-gray-50 p-2 mt-2 text-xs text-gray-700 overflow-x-auto max-h-40">
            <pre className="whitespace-pre-wrap text-xs">{JSON.stringify(img, null, 2)}</pre>
          </div>
        )}

        {/* Spacer pushes analyze and view link to the bottom */}
        <div className="flex-grow" />
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
