
import React from 'react';

interface EmbedCodeProps {
  embedCode: string;
}

const EmbedCode: React.FC<EmbedCodeProps> = ({ embedCode }) => {
  const handleCopy = () => {
    navigator.clipboard.writeText(embedCode);
    // Optionally, you could add a toast notification here for feedback.
  };

  return (
    <div className="bg-white rounded-lg p-6 shadow-lg">
      <h2 className="text-2xl font-semibold mb-4">Embed Code</h2>
      <p className="text-gray-600 mb-4">
        Copy and paste this code into your website's HTML, preferably before the closing &lt;/body&gt; tag:
      </p>
      <div className="bg-gray-900 text-green-400 p-4 rounded-lg text-sm font-mono overflow-x-auto">
        <pre>{embedCode}</pre>
      </div>
      <button
        onClick={handleCopy}
        className="mt-4 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition-colors"
      >
        Copy to Clipboard
      </button>
    </div>
  );
};

export default EmbedCode;
