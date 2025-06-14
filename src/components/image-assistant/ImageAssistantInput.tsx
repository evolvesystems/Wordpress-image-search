
import React from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

type Props = {
  input: string;
  setInput: (value: string) => void;
  handleSend: (e: React.FormEvent) => void;
  isLoading: boolean;
};

const ImageAssistantInput: React.FC<Props> = ({ input, setInput, handleSend, isLoading }) => {
  return (
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
  );
};

export default ImageAssistantInput;
