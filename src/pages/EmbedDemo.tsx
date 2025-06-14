
import React, { useState } from 'react';
import { SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY } from "@/integrations/supabase/client";
import { useWordPressUserSettings } from "@/hooks/useWordPressUserSettings";
import EmbeddableChat from '@/components/EmbeddableChat';
import EmbedHeader from '@/components/embed/EmbedHeader';
import EmbedPreview from '@/components/embed/EmbedPreview';
import EmbedCode from '@/components/embed/EmbedCode';
import EmbedConfig from '@/components/embed/EmbedConfig';
import EmbedTestChatSection from '@/components/embed/EmbedTestChatSection';

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

  return (
    <div className="max-w-4xl mx-auto pb-8">
      <EmbedHeader />

      <div className="grid md:grid-cols-2 gap-8">
        <EmbedPreview embedCode={embedCode} />
        <EmbedCode embedCode={embedCode} />
      </div>

      <EmbedTestChatSection
        showTestChat={showTestChat}
        onToggle={() => setShowTestChat(prev => !prev)}
      />

      {showTestChat && (
        <EmbeddableChat
          primaryColor={config.primaryColor}
          position="bottom-left"
          siteName={config.siteName}
          wordpressUrl={wordpressUrl}
        />
      )}

      <EmbedConfig
        formState={formState}
        setFormState={setFormState}
        onRefresh={handleRefresh}
      />
    </div>
  );
};

export default EmbedDemo;
