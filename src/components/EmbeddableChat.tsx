
import React, { useState, useEffect, useRef } from "react";
import { MessageCircle } from "lucide-react";
import { SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY } from "@/integrations/supabase/client";
import { WPImageResult } from "@/hooks/useWordPressImageSearch";
import ImageAssistantHeader from "./image-assistant/ImageAssistantHeader";
import ImageAssistantMessageArea from "./image-assistant/ImageAssistantMessageArea";
import ImageAssistantInput from "./image-assistant/ImageAssistantInput";

interface Message {
  role: "user" | "bot";
  content: string;
}

interface EmbeddableChatProps {
  apiEndpoint?: string;
  primaryColor?: string;
  position?: "bottom-right" | "bottom-left";
  siteName?: string;
  wordpressUrl?: string;
}

const sampleImages: WPImageResult[] = [
  {
    id: 101,
    source_url: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=400&q=80',
    title: { rendered: 'Misty Mountains' },
    alt_text: 'A landscape photo of mountains covered in mist.',
    caption: { rendered: 'Sample image for demonstration.' },
    media_details: { width: 400, height: 267 },
    mime_type: 'image/jpeg',
    link: '#',
  },
  {
    id: 102,
    source_url: 'https://images.unsplash.com/photo-1534353436294-0dbd4bdac845?w=400&q=80',
    title: { rendered: 'Cozy Living Room' },
    alt_text: 'A cozy living room with a couch and a cat.',
    caption: { rendered: 'Sample image for demonstration.' },
    media_details: { width: 400, height: 267 },
    mime_type: 'image/jpeg',
    link: '#',
  },
  {
    id: 103,
    source_url: 'https://images.unsplash.com/photo-1490750967868-88aa4486c946?w=400&q=80',
    title: { rendered: 'Yellow Flowers' },
    alt_text: 'A field of bright yellow flowers.',
    caption: { rendered: 'Sample image for demonstration.' },
    media_details: { width: 400, height: 600 },
    mime_type: 'image/jpeg',
    link: '#',
  },
  {
    id: 104,
    source_url: 'https://images.unsplash.com/photo-1507525428034-b723a9ce6890?w=400&q=80',
    title: { rendered: 'Beach Waves' },
    alt_text: 'Ocean waves crashing on a sandy beach.',
    caption: { rendered: 'Sample image for demonstration.' },
    media_details: { width: 400, height: 267 },
    mime_type: 'image/jpeg',
    link: '#',
  }
];

const EmbeddableChat: React.FC<EmbeddableChatProps> = ({
  apiEndpoint = `${SUPABASE_URL}/functions/v1/chat-embed`,
  position = "bottom-right",
  siteName = "Website",
  wordpressUrl
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "bot",
      content: "Hi! I'm your AI Image Assistant. Ask me for an image (e.g., 'Show me a wheat field', 'Find drone photos'), and I'll help you search your WordPress library.",
    },
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const [results, setResults] = useState<WPImageResult[]>([]);
  const [lastUserQuery, setLastUserQuery] = useState<string | null>(null);
  const chatEndRef = useRef<HTMLDivElement | null>(null);

  const positionClass = position === "bottom-left" ? "bottom-6 left-6" : "bottom-6 right-6";

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, results]);

  const handleSend = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    const value = input.trim();
    if (!value) return;

    setResults([]);
    setLastUserQuery(value);
    setMessages((prev) => [...prev, { role: "user", content: value }]);
    setInput("");
    setIsLoading(true);

    // DEMO MODE (client-side)
    if (!wordpressUrl) {
      setTimeout(() => { // simulate network delay
        setMessages((prev) => [...prev, { role: "bot", content: `This is a demo. In a live environment, I would search your media library. Here are some sample images for "${value}":` }]);
        setResults(sampleImages);
        setIsLoading(false);
      }, 500);
      return;
    }
    
    // LIVE MODE (backend)
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

  if (!isOpen) {
    return (
      <button
        className={`fixed ${positionClass} z-50 bg-green-600 text-white rounded-full shadow-lg p-4 flex items-center justify-center hover:bg-green-700 transition-colors`}
        onClick={() => setIsOpen(true)}
        aria-label="Open AI Image Assistant"
        style={{ boxShadow: "0px 4px 24px rgba(0,0,0,0.11)" }}
      >
        <MessageCircle className="w-7 h-7" />
      </button>
    );
  }

  return (
    <div className={`fixed ${positionClass} z-50 w-[96vw] max-w-md rounded-xl shadow-2xl bg-white border border-gray-200 flex flex-col max-h-[90vh] animate-fade-in`}>
      <ImageAssistantHeader
        onClose={() => setIsOpen(false)}
        onSettings={() => {}}
        showSettings={false}
      />
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

export default EmbeddableChat;
