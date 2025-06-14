
import React, { useRef, useEffect, useState } from 'react';
import { SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY } from "@/integrations/supabase/client";
import { useWordPressUserSettings } from "@/hooks/useWordPressUserSettings";
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { RefreshCw } from 'lucide-react';
import EmbeddableChat from '@/components/EmbeddableChat';

const EmbedDemo = () => {
  const [config, setConfig] = useState({
    primaryColor: '#16a34a',
    position: 'bottom-right' as 'bottom-right' | 'bottom-left',
    siteName: 'Your Website Name'
  });
  const [formState, setFormState] = useState(config);
  const [showTestChat, setShowTestChat] = useState(false);
  const { settings: wpSettings } = useWordPressUserSettings();
  const wordpressUrl = wpSettings?.wordpress_url;


  const handleRefresh = () => {
    setConfig(formState);
  };

  const embedCode = `<!-- AI Chat Widget -->
<script>
  (function() {
    function initAIChat() {
      // Load the widget script
      var script = document.createElement('script');
      script.src = '${window.location.origin}/embed.js';
      script.onload = function() {
        if (window.AIChat) {
          window.AIChat.init({
            apiEndpoint: '${SUPABASE_URL}/functions/v1/chat-embed',
            apiKey: '${SUPABASE_PUBLISHABLE_KEY}',
            primaryColor: '${config.primaryColor}',
            position: '${config.position}',
            siteName: '${config.siteName}'${wordpressUrl ? `,
            wordpressUrl: '${wordpressUrl}'` : ''}
          });
        }
      };
      document.body.appendChild(script);
    }

    if (document.readyState === 'complete') {
      initAIChat();
    } else {
      window.addEventListener('load', initAIChat, { once: true });
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

      {/* Test Chat section */}
      <div className="mt-8 bg-white rounded-lg p-6 shadow-lg">
        <h2 className="text-2xl font-semibold mb-4">Test it on this page</h2>
        <p className="text-gray-600 mb-4">
          You can also launch the chat widget directly on this page to test the React component version. The settings from the configuration options below will be applied after you click refresh.
        </p>
        <Button onClick={() => setShowTestChat(prev => !prev)}>
          {showTestChat ? 'Hide Test Chat' : 'Launch Test Chat'}
        </Button>
      </div>
      {showTestChat && (
        <EmbeddableChat
          primaryColor={config.primaryColor}
          position="bottom-left"
          siteName={config.siteName}
          wordpressUrl={wordpressUrl}
        />
      )}

      {/* Configuration Options */}
      <div className="mt-8 bg-white rounded-lg p-6 shadow-lg">
        <h2 className="text-2xl font-semibold mb-4">Configuration Options</h2>
        <p className="text-gray-600 mb-6">
          Change the options below and click refresh to update the preview and the embed code.
        </p>
        <div className="space-y-4">
          <div>
            <Label htmlFor="siteName">Site Name</Label>
            <Input
              id="siteName"
              value={formState.siteName}
              onChange={(e) => setFormState({ ...formState, siteName: e.target.value })}
              placeholder="Your Website Name"
            />
          </div>
          <div className="flex flex-col gap-2">
            <Label htmlFor="primaryColor">Primary Color</Label>
            <Input
              id="primaryColor"
              type="color"
              value={formState.primaryColor}
              onChange={(e) => setFormState({ ...formState, primaryColor: e.target.value })}
              className="w-24 p-1 h-10"
            />
          </div>
          <div>
            <Label htmlFor="position">Widget Position</Label>
            <Select
              value={formState.position}
              onValueChange={(value: 'bottom-right' | 'bottom-left') => {
                setFormState({ ...formState, position: value });
              }}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select a position" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="bottom-right">Bottom Right</SelectItem>
                <SelectItem value="bottom-left">Bottom Left</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        <Button onClick={handleRefresh} className="mt-6">
          <RefreshCw className="mr-2 h-4 w-4" />
          Refresh Code & Preview
        </Button>
      </div>
    </div>
  );
};

export default EmbedDemo;
