
import React from 'react';
import { Button } from '@/components/ui/button';

interface EmbedTestChatSectionProps {
  showTestChat: boolean;
  onToggle: () => void;
}

const EmbedTestChatSection: React.FC<EmbedTestChatSectionProps> = ({ showTestChat, onToggle }) => {
  return (
    <div className="mt-8 bg-white rounded-lg p-6 shadow-lg">
      <h2 className="text-2xl font-semibold mb-4">Test it on this page</h2>
      <p className="text-gray-600 mb-4">
        You can also launch the chat widget directly on this page to test the React component version. The settings from the configuration options below will be applied after you click refresh.
      </p>
      <Button onClick={onToggle}>
        {showTestChat ? 'Hide Test Chat' : 'Launch Test Chat'}
      </Button>
    </div>
  );
};

export default EmbedTestChatSection;
