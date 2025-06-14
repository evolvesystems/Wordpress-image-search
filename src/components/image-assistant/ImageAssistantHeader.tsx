
import React from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Settings } from "lucide-react";

type Props = {
  onClose: () => void;
  onSettings: () => void;
};

const ImageAssistantHeader: React.FC<Props> = ({ onClose, onSettings }) => {
  return (
    <Card className="w-full rounded-t-xl px-2 py-3 shadow-none flex items-center justify-between border-b bg-white rounded-b-none">
      <div className="flex items-center gap-2">
        <span className="font-bold text-lg text-green-700">AI Image Assistant</span>
      </div>
      <div className="flex items-center gap-1">
        <Button
          variant="outline"
          size="icon"
          aria-label="Settings"
          className="rounded-full border-gray-300 bg-white text-green-700 hover:bg-green-50"
          onClick={onSettings}
        >
          <Settings className="w-5 h-5" />
        </Button>
        <Button
          variant="outline"
          size="icon"
          aria-label="Close chat"
          className="rounded-full ml-1 px-2 border-gray-300 text-gray-500 hover:text-green-700 bg-white"
          onClick={onClose}
        >
          <span className="sr-only">Close</span>
          <svg width={21} height={21} viewBox="0 0 20 20" fill="none">
            <path d="M6 6l8 8M6 14L14 6" stroke="currentColor" strokeWidth={2} strokeLinecap="round" />
          </svg>
        </Button>
      </div>
    </Card>
  );
};

export default ImageAssistantHeader;
