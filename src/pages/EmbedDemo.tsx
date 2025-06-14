
import React from 'react';
import EmbeddableChat from '@/components/EmbeddableChat';

const EmbedDemo = () => {
  const embedCode = `<!-- AI Chat Widget -->
<script>
  (function() {
    // Create container
    var container = document.createElement('div');
    container.id = 'ai-chat-widget';
    document.body.appendChild(container);
    
    // Load React and the widget
    var script = document.createElement('script');
    script.src = '${window.location.origin}/embed.js';
    script.onload = function() {
      window.AIChat.init({
        apiEndpoint: '${window.location.origin}/api/chat',
        primaryColor: '#16a34a',
        position: 'bottom-right',
        siteName: 'Your Website Name'
      });
    };
    document.head.appendChild(script);
  })();
</script>`;

  return (
    <div className="max-w-4xl mx-auto">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Embeddable AI Chat Widget
        </h1>
        <p className="text-xl text-gray-600">
          Add our AI chat assistant to any website with a simple script tag
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        {/* Demo */}
        <div className="bg-white rounded-lg p-6 shadow-lg">
          <h2 className="text-2xl font-semibold mb-4">Live Demo</h2>
          <p className="text-gray-600 mb-4">
            This is how the chat widget will appear on your website. Try clicking the chat button!
          </p>
          <div className="bg-blue-50 rounded-lg p-8 min-h-[300px] relative border-2 border-dashed border-blue-200">
            <div className="text-center text-blue-600 font-medium">
              Your Website Content Here
            </div>
            <EmbeddableChat 
              siteName="Demo Website"
              primaryColor="#16a34a"
              position="bottom-right"
            />
          </div>
        </div>

        {/* Embed Code */}
        <div className="bg-white rounded-lg p-6 shadow-lg">
          <h2 className="text-2xl font-semibold mb-4">Embed Code</h2>
          <p className="text-gray-600 mb-4">
            Copy and paste this code into your website's HTML, preferably before the closing &lt;/body&gt; tag:
          </p>
          <div className="bg-gray-900 text-green-400 p-4 rounded-lg text-sm font-mono overflow-x-auto">
            <pre>{embedCode}</pre>
          </div>
          <button
            onClick={() => navigator.clipboard.writeText(embedCode)}
            className="mt-4 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition-colors"
          >
            Copy to Clipboard
          </button>
        </div>
      </div>

      {/* Configuration Options */}
      <div className="mt-8 bg-white rounded-lg p-6 shadow-lg">
        <h2 className="text-2xl font-semibold mb-4">Configuration Options</h2>
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <h3 className="font-semibold mb-2">Available Parameters:</h3>
            <ul className="space-y-2 text-gray-600">
              <li><code className="bg-gray-100 px-2 py-1 rounded">apiEndpoint</code> - Your API endpoint URL</li>
              <li><code className="bg-gray-100 px-2 py-1 rounded">primaryColor</code> - Widget color (hex code)</li>
              <li><code className="bg-gray-100 px-2 py-1 rounded">position</code> - 'bottom-right' or 'bottom-left'</li>
              <li><code className="bg-gray-100 px-2 py-1 rounded">siteName</code> - Your website name</li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold mb-2">Example Configuration:</h3>
            <div className="bg-gray-100 p-3 rounded text-sm font-mono">
              {`{
  apiEndpoint: '/api/chat',
  primaryColor: '#3b82f6',
  position: 'bottom-left',
  siteName: 'My Store'
}`}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmbedDemo;
