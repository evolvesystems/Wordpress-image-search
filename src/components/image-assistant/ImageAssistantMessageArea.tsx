
import React from "react";
import { Message } from "../types";
import { WPImageResult } from "@/hooks/useWordPressImageSearch";
import ImageAssistantResults from "./ImageAssistantResults";

type Props = {
  messages: Message[];
  results: WPImageResult[];
  chatEndRef: React.RefObject<HTMLDivElement>;
  lastUserQuery: string | null;
};

const ImageAssistantMessageArea: React.FC<Props> = ({ messages, results, chatEndRef, lastUserQuery }) => {
  return (
    <div className="flex-1 overflow-y-auto px-4 py-3 bg-gray-50">
      <div className="max-w-xl mx-auto space-y-6 pb-8">
        {messages.map((msg, idx) => (
          <div key={idx} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
            <div
              className={`px-3 py-2 rounded-lg text-sm max-w-[80vw] md:max-w-md whitespace-pre-line ${
                msg.role === "user" ? "bg-green-600 text-white" : "bg-white text-gray-800 border"
              }`}
            >
              {msg.content}
            </div>
          </div>
        ))}
        {lastUserQuery && results && results.length > 0 && (
          <ImageAssistantResults results={results} />
        )}
        <div ref={chatEndRef} />
      </div>
    </div>
  );
};

export default ImageAssistantMessageArea;
