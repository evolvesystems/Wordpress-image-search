
import React from "react";
import { MessageCircle } from "lucide-react";

type Props = { onClick: () => void };

const ImageAIAssistantBubbleButton: React.FC<Props> = ({ onClick }) => (
  <button
    className="fixed bottom-6 right-6 z-50 bg-green-600 text-white rounded-full shadow-lg p-4 flex items-center justify-center hover:bg-green-700 transition-colors"
    onClick={onClick}
    aria-label="Open AI Chat Assistant"
    style={{ boxShadow: "0px 4px 24px rgba(0,0,0,0.11)" }}
  >
    <MessageCircle className="w-7 h-7" />
  </button>
);

export default ImageAIAssistantBubbleButton;
