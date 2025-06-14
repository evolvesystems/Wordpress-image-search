
import React, { useRef, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useWordPressUserSettings } from "@/hooks/useWordPressUserSettings";
import { useWordPressImageSearch } from "@/hooks/useWordPressImageSearch";
import { Message } from "./types";
import ImageAssistantHeader from "./image-assistant/ImageAssistantHeader";
import ImageAssistantMessageArea from "./image-assistant/ImageAssistantMessageArea";
import ImageAssistantInput from "./image-assistant/ImageAssistantInput";

type Props = {
  onClose: () => void;
};

const demoWelcome: Message[] = [
  {
    role: "bot",
    content:
      "Hi! I'm your AI Image Assistant. Ask me for an image (e.g., 'Show me a wheat field', 'Find drone photos'), and I'll help you search your WordPress library.",
  },
];

const ImageAIAssistantChat: React.FC<Props> = ({ onClose }) => {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Message[]>(demoWelcome);
  const [isLoading, setIsLoading] = useState(false);

  const { settings } = useWordPressUserSettings();
  const { results, searchImages } = useWordPressImageSearch();
  const [lastUserQuery, setLastUserQuery] = useState<string | null>(null);

  const navigate = useNavigate();
  const chatEndRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, results]);

  const hasWordPressUrl = !!settings?.wordpress_url;

  const handleSettings = () => {
    navigate("/admin/api-keys");
  };

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    const value = input.trim();
    if (!value) return;
    setMessages((prev) => [...prev, { role: "user", content: value }]);
    setInput("");
    setIsLoading(true);

    if (!hasWordPressUrl) {
      setMessages((prev) => [
        ...prev,
        {
          role: "bot",
          content:
            "You need to connect your WordPress site to search images. Tap the ⚙️ settings icon to configure.",
        },
      ]);
      setIsLoading(false);
      return;
    }

    // Use existing search integration
    const { data: searchResults, error: searchError } = await searchImages(settings.wordpress_url, value);
    setLastUserQuery(value);

    if (searchError) {
      setMessages((prev) => [
        ...prev,
        {
          role: "bot",
          content: `Error while searching WordPress: ${searchError}`,
        },
      ]);
    } else if (searchResults && searchResults.length > 0) {
      setMessages((prev) => [
        ...prev,
        {
          role: "bot",
          content: `I found ${searchResults.length} image(s) for "${value}":`,
        },
      ]);
    } else {
      setMessages((prev) => [
        ...prev,
        { role: "bot", content: `Sorry, I couldn't find any images for "${value}".` },
      ]);
    }
    setIsLoading(false);
  };

  return (
    <div className="fixed bottom-4 right-4 z-50 w-[96vw] max-w-md rounded-xl shadow-2xl bg-white border border-gray-200 flex flex-col max-h-[90vh] animate-fade-in">
      <ImageAssistantHeader onClose={onClose} onSettings={handleSettings} />
      <ImageAssistantMessageArea
        messages={messages}
        results={results}
        chatEndRef={chatEndRef}
        lastUserQuery={lastUserQuery}
      />
      <ImageAssistantInput
        input={input}
        setInput={setInput}
        handleSend={handleSend}
        isLoading={isLoading}
      />
    </div>
  );
};

export default ImageAIAssistantChat;
