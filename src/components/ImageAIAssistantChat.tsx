
import React, { useRef, useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Settings } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useWordPressUserSettings } from "@/hooks/useWordPressUserSettings";
import { useWordPressImageSearch } from "@/hooks/useWordPressImageSearch";
import { Message } from "./types";

type Props = {
  onClose: () => void;
};

const demoWelcome: Message[] = [
  {
    role: "bot",
    content:
      "👋 Hi! I'm your AI Image Assistant. Ask me for an image (e.g., 'Show me a wheat field', 'Find drone photos'), and I'll help you search your WordPress library.\n\nTap the settings ⚙️ icon to connect your API key if you haven't yet.",
  },
];

const ImageAIAssistantChat: React.FC<Props> = ({ onClose }) => {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Message[]>(demoWelcome);
  const [isLoading, setIsLoading] = useState(false);

  const { settings } = useWordPressUserSettings();
  const {
    results,
    isLoading: searchLoading,
    error: searchError,
    searchImages,
  } = useWordPressImageSearch();
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

  const handleSend = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
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
    await searchImages(settings.wordpress_url, value);
    setLastUserQuery(value);

    if (searchError) {
      setMessages((prev) => [
        ...prev,
        {
          role: "bot",
          content: `Error while searching WordPress: ${searchError}`,
        },
      ]);
    } else if (results?.length > 0) {
      setMessages((prev) => [
        ...prev,
        {
          role: "bot",
          content: `Found ${results.length} result(s):`,
        },
      ]);
    } else {
      setMessages((prev) => [
        ...prev,
        { role: "bot", content: "Sorry, I couldn't find any images for that search." },
      ]);
    }
    setIsLoading(false);
  };

  // Chat bubble open
  return (
    <div className="fixed bottom-4 right-4 z-50 w-[96vw] max-w-md rounded-xl shadow-2xl bg-white border border-gray-200 flex flex-col max-h-[90vh] animate-fade-in">
      <Card className="w-full rounded-t-xl px-2 py-3 shadow-none flex items-center justify-between border-b bg-white">
        <div className="flex items-center gap-2">
          <span className="font-bold text-lg text-green-700">AI Image Assistant</span>
        </div>
        <div className="flex items-center gap-1">
          <Button
            variant="outline"
            size="icon"
            aria-label="Settings"
            className="rounded-full border-gray-300 bg-white text-green-700 hover:bg-green-50"
            onClick={handleSettings}
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
          )}
          <div ref={chatEndRef} />
        </div>
      </div>
      <form onSubmit={handleSend} className="w-full flex py-3 px-4 border-t bg-white">
        <Input
          className="flex-1 rounded-l-md border border-gray-300 focus:border-green-700 text-base"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask for an image by description or concept..."
          disabled={isLoading}
          autoFocus
        />
        <Button
          type="submit"
          className="rounded-none rounded-r-md border-l-0 border-green-700 bg-green-600 text-white font-semibold px-5 hover:bg-green-700"
          disabled={!input.trim() || isLoading}
        >
          {isLoading ? "..." : "Send"}
        </Button>
      </form>
    </div>
  );
};

export default ImageAIAssistantChat;
