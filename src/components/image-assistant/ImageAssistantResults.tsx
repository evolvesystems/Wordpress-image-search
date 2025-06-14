
import React from "react";
import { Card } from "@/components/ui/card";
import { WPImageResult } from "@/hooks/useWordPressImageSearch";

type Props = {
  results: WPImageResult[];
};

const ImageAssistantResults: React.FC<Props> = ({ results }) => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-1">
      {results.map((img) => (
        <Card key={img.id} className="overflow-hidden border group">
          <img
            src={img.source_url}
            alt={img.alt_text || img.title?.rendered}
            className="w-full h-28 object-cover bg-gray-100"
          />
          <div className="p-2 flex flex-col">
            <div className="text-xs font-medium line-clamp-1">{img.title?.rendered}</div>
            {img.caption?.rendered && (
              <div
                className="text-xs text-gray-500 line-clamp-2 mb-1"
                dangerouslySetInnerHTML={{ __html: img.caption.rendered }}
              />
            )}
            <div className="text-xs text-gray-600">
              {img.media_details?.width &&
                img.media_details?.height && (
                  <span>
                    {img.media_details.width} × {img.media_details.height}px
                  </span>
                )}
              {img.mime_type && (
                <span className="ml-2">{img.mime_type.toUpperCase()}</span>
              )}
            </div>
            <a
              href={img.link}
              className="inline-flex items-center gap-1 text-xs text-blue-600 hover:underline mt-1"
              target="_blank"
              rel="noopener noreferrer"
              title="View in WordPress"
            >
              View page
            </a>
          </div>
        </Card>
      ))}
    </div>
  );
};

export default ImageAssistantResults;
