
import React, { useState } from "react";
import ImageAIAssistantBubbleButton from "./ImageAIAssistantBubbleButton";
import ImageAIAssistantChat from "./ImageAIAssistantChat";

const ImageAIAssistant: React.FC = () => {
  const [open, setOpen] = useState(false);

  if (!open) {
    return <ImageAIAssistantBubbleButton onClick={() => setOpen(true)} />;
  }
  return <ImageAIAssistantChat onClose={() => setOpen(false)} />;
};

export default ImageAIAssistant;
