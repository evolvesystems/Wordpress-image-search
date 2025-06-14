
import React, { useRef, useEffect } from 'react';
import { SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY } from "@/integrations/supabase/client";

const EmbedDemo = () => {
  const embedCode = `<!-- AI Chat Widget -->
<script>
  (function() {
    function initAIChat() {
      // Create container
      var container = document.createElement('div');
      container.id = 'ai-chat-widget';
      document.body.appendChild(container);
      
      // Load the widget script
      var script = document.createElement('script');
      script.src = '${window.location.origin}/embed.js';
      script.onload = function() {
        window.AIChat.init({
          apiEndpoint: '${SUPABASE_URL}/functions/v1/chat-embed',
          apiKey: '${SUPABASE_PUBLISHABLE_KEY}',
          primaryColor: '#16a34a',
          position: 'bottom-right',
          siteName: 'Your Website Name'
        });
      };
      document.head.appendChild(script);
    }

    if (document.readyState === 'interactive' || document.readyState === 'complete') {
      initAIChat();
    } else {
      document.addEventListener('DOMContentLoaded', initAIChat, { once: true });
    }
  })();
</script>`;

  const iframeRef = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    const iframe = iframeRef.current;
    if (!iframe) return;

    const doc = iframe.contentDocument;
    if (!doc) return;

    const iframeContent = `
      <!DOCTYPE html>
      <html>
        <head>
          <style>
            body { 
              margin: 0; 
              font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
              display: flex;
              align-items: center;
              justify-content: center;
              height: 100%;
              text-align: center;
              color: #2563eb; /* text-blue-600 */
              font-weight: 500; /* font-medium */
              background-color: #eff6ff; /* bg-blue-50 */
            }
          </style>
        </head>
        <body>
          <div>Your Website Content Here</div>
          ${embedCode}
        </body>
      </html>
    `;

    doc.open();
    doc.write(iframeContent);
    doc.close();
  }, [embedCode]);

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
          <h2 className="text-2xl font-semibold mb-4">Live Preview</h2>
          <p className="text-gray-600 mb-4">
            This is a true preview of how the chat widget will appear on your website. The script below is running in this sandboxed frame. Try clicking the chat button!
          </p>
          <div className="bg-blue-100 rounded-lg h-[300px] relative border-2 border-dashed border-blue-200 overflow-hidden">
            <iframe
              ref={iframeRef}
              title="Embed Preview"
              className="w-full h-full absolute top-0 left-0 border-0"
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
