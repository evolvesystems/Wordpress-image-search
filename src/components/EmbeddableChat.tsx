import React, { useState } from "react";
import { MessageCircle, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY } from "@/integrations/supabase/client";

interface Message {
  role: "user" | "bot";
  content: string;
}

interface EmbeddableChatProps {
  apiEndpoint?: string;
  primaryColor?: string;
  position?: "bottom-right" | "bottom-left";
  siteName?: string;
}

const EmbeddableChat: React.FC<EmbeddableChatProps> = ({
  apiEndpoint = `${SUPABASE_URL}/functions/v1/chat-embed`,
  primaryColor = "#16a34a",
  position = "bottom-right",
  siteName = "Website"
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "bot",
      content: `👋 Hello! I'm your AI assistant for ${siteName}. How can I help you today?`,
    },
  ]);
  const [isLoading, setIsLoading] = useState(false);

  const positionClass = position === "bottom-left" ? "bottom-6 left-6" : "bottom-6 right-6";

  const handleSend = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    const value = input.trim();
    if (!value) return;

    setMessages((prev) => [...prev, { role: "user", content: value }]);
    setInput("");
    setIsLoading(true);

    try {
      // Simulate API call - replace with actual endpoint
      const response = await fetch(apiEndpoint, {
        method: "POST",
        headers: { 
          "Content-Type": "application/json",
          "Authorization": `Bearer ${SUPABASE_PUBLISHABLE_KEY}`,
          "apikey": SUPABASE_PUBLISHABLE_KEY,
        },
        body: JSON.stringify({ message: value, siteName }),
      });

      if (response.ok) {
        const data = await response.json();
        setMessages((prev) => [
          ...prev,
          { role: "bot", content: data.response || "I'm here to help! What would you like to know?" },
        ]);
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
        className={`fixed ${positionClass} z-50 text-white rounded-full shadow-lg p-4 flex items-center justify-center hover:scale-105 transition-transform`}
        onClick={() => setIsOpen(true)}
        style={{ backgroundColor: primaryColor }}
        aria-label="Open chat assistant"
      >
        <MessageCircle className="w-6 h-6" />
      </button>
    );
  }

  return (
    <div className={`fixed ${positionClass} z-50 w-80 h-96 rounded-xl shadow-2xl bg-white border flex flex-col animate-scale-in`}>
      {/* Header */}
      <div 
        className="px-4 py-3 rounded-t-xl text-white flex items-center justify-between"
        style={{ backgroundColor: primaryColor }}
      >
        <div className="flex items-center gap-2">
          <MessageCircle className="w-5 h-5" />
          <span className="font-semibold">AI Assistant</span>
        </div>
        <button
          onClick={() => setIsOpen(false)}
          className="text-white hover:bg-black/10 rounded p-1"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-gray-50">
        {messages.map((msg, idx) => (
          <div key={idx} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
            <div
              className={`px-3 py-2 rounded-lg text-sm max-w-[85%] ${
                msg.role === "user" 
                  ? "text-white" 
                  : "bg-white text-gray-800 border"
              }`}
              style={msg.role === "user" ? { backgroundColor: primaryColor } : {}}
            >
              {msg.content}
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex justify-start">
            <div className="bg-white border px-3 py-2 rounded-lg text-sm text-gray-600">
              Typing...
            </div>
          </div>
        )}
      </div>

      {/* Input */}
      <form onSubmit={handleSend} className="flex p-3 border-t bg-white rounded-b-xl">
        <Input
          className="flex-1 rounded-l-md border-gray-300 text-sm"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type your message..."
          disabled={isLoading}
        />
        <Button
          type="submit"
          className="rounded-l-none border-l-0 text-white font-medium px-4"
          disabled={!input.trim() || isLoading}
          style={{ backgroundColor: primaryColor }}
        >
          Send
        </Button>
      </form>
    </div>
  );
};

export default EmbeddableChat;
