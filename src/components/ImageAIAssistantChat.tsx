
import React, { useRef, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useWordPressUserSettings } from "@/hooks/useWordPressUserSettings";
import { type WPImageResult } from "@/hooks/useWordPressImageSearch";
import { Message } from "./types";
import ImageAssistantHeader from "./image-assistant/ImageAssistantHeader";
import ImageAssistantMessageArea from "./image-assistant/ImageAssistantMessageArea";
import ImageAssistantInput from "./image-assistant/ImageAssistantInput";
import { SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY } from "@/integrations/supabase/client";

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
  const [results, setResults] = useState<WPImageResult[]>([]);
  const [lastUserQuery, setLastUserQuery] = useState<string | null>(null);

  const navigate = useNavigate();
  const chatEndRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, results]);

  const handleSettings = () => {
    navigate("/admin/api-keys");
  };

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    const value = input.trim();
    if (!value) return;
    
    setResults([]);
    setMessages((prev) => [...prev, { role: "user", content: value }]);
    setInput("");
    setIsLoading(true);
    setLastUserQuery(value);

    const wordpressUrl = settings?.wordpress_url;
    const apiEndpoint = `${SUPABASE_URL}/functions/v1/chat-embed`;
    const siteName = "Admin Assistant";

    try {
      const response = await fetch(apiEndpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${SUPABASE_PUBLISHABLE_KEY}`,
          "apikey": SUPABASE_PUBLISHABLE_KEY,
        },
        body: JSON.stringify({ message: value, siteName, wordpressUrl }),
      });

      if (response.ok) {
        const data = await response.json();
        const botResponse = data.response;

        if (botResponse) {
          setMessages((prev) => [...prev, { role: "bot", content: botResponse.content }]);
          if (botResponse.type === 'image_results' && botResponse.results) {
            setResults(botResponse.results);
          }
        } else {
           setMessages((prev) => [
            ...prev,
            { role: "bot", content: "I'm here to help! What would you like to know?" },
          ]);
        }
      } else {
        setMessages((prev) => [
          ...prev,
          { role: "bot", content: "I'm having trouble connecting right now. Please try again later." },
        ]);
      }
    } catch (error) {
      setMessages((prev) => [
        ...prev,
        { role: "bot", content: "I'm currently offline. Please try again later." },
      ]);
    } finally {
      setIsLoading(false);
    }
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
