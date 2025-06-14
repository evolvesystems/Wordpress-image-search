(function() {
  'use strict';
  
  // Prevent multiple initializations
  if (window.AIChat) {
    // If AIChat is already on the window, it might be from a previous script instance.
    // The init function will be called by the new script's onload.
    return;
  }
  
  window.AIChat = {
    init: function(config) {
      // Clean up any old widget instances
      const oldWidget = document.getElementById('ai-chat-widget-container');
      if (oldWidget) {
        oldWidget.parentNode.removeChild(oldWidget);
      }

      config = config || {};
      
      // Default configuration
      const defaultConfig = {
        apiEndpoint: '/api/chat',
        primaryColor: '#16a34a',
        position: 'bottom-right',
        siteName: 'Website',
        apiKey: '',
      };
      
      // Merge configurations
      const finalConfig = Object.assign(defaultConfig, config);
      
      // Create chat widget HTML
      const chatHTML = `
        <div id="ai-chat-widget-container" style="position: fixed; ${finalConfig.position === 'bottom-left' ? 'left: 24px' : 'right: 24px'}; bottom: 24px; z-index: 999999; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;">
          <div id="ai-chat-button" style="width: 60px; height: 60px; background-color: ${finalConfig.primaryColor}; border-radius: 50%; display: flex; align-items: center; justify-content: center; cursor: pointer; box-shadow: 0 4px 24px rgba(0,0,0,0.15); transition: transform 0.2s;">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
            </svg>
          </div>
          <div id="ai-chat-window" style="display: none; width: 320px; height: 400px; background: white; border-radius: 12px; box-shadow: 0 10px 40px rgba(0,0,0,0.2); margin-bottom: 80px; flex-direction: column;">
            <div id="ai-chat-header" style="background-color: ${finalConfig.primaryColor}; color: white; padding: 16px; border-radius: 12px 12px 0 0; display: flex; justify-content: space-between; align-items: center;">
              <div style="display: flex; align-items: center; gap: 8px;">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2">
                  <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
                </svg>
                <span style="font-weight: 600;">AI Assistant</span>
              </div>
              <button id="ai-chat-close" style="background: none; border: none; color: white; cursor: pointer; padding: 4px;">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
              </button>
            </div>
            <div id="ai-chat-messages" style="flex: 1; padding: 16px; overflow-y: auto; background: #f9fafb;">
              <div style="background: white; padding: 12px; border-radius: 8px; border: 1px solid #e5e7eb; margin-bottom: 12px; font-size: 14px;">
                👋 Hello! I'm your AI assistant for ${finalConfig.siteName}. How can I help you today?
              </div>
            </div>
            <div id="ai-chat-input-container" style="padding: 12px; border-top: 1px solid #e5e7eb; background: white; border-radius: 0 0 12px 12px;">
              <div style="display: flex; gap: 8px;">
                <input id="ai-chat-input" type="text" placeholder="Type your message..." style="flex: 1; padding: 8px 12px; border: 1px solid #d1d5db; border-radius: 6px; font-size: 14px; outline: none;">
                <button id="ai-chat-send" style="background-color: ${finalConfig.primaryColor}; color: white; border: none; padding: 8px 16px; border-radius: 6px; cursor: pointer; font-weight: 500; font-size: 14px;">Send</button>
              </div>
            </div>
          </div>
        </div>
      `;
      
      // Insert chat widget into page
      const div = document.createElement('div');
      div.innerHTML = chatHTML;
      document.body.appendChild(div);
      
      // Get elements
      const button = document.getElementById('ai-chat-button');
      const window = document.getElementById('ai-chat-window');
      const closeBtn = document.getElementById('ai-chat-close');
      const input = document.getElementById('ai-chat-input');
      const sendBtn = document.getElementById('ai-chat-send');
      const messages = document.getElementById('ai-chat-messages');
      
      // Chat functionality
      let isOpen = false;
      
      function toggleChat() {
        isOpen = !isOpen;
        window.style.display = isOpen ? 'flex' : 'none';
        if (isOpen) {
          input.focus();
        }
      }
      
      function addMessage(content, isUser = false) {
        const messageDiv = document.createElement('div');
        messageDiv.style.cssText = `
          display: flex;
          justify-content: ${isUser ? 'flex-end' : 'flex-start'};
          margin-bottom: 12px;
        `;
        
        const bubble = document.createElement('div');
        bubble.style.cssText = `
          padding: 12px;
          border-radius: 8px;
          font-size: 14px;
          max-width: 85%;
          ${isUser 
            ? `background-color: ${finalConfig.primaryColor}; color: white;` 
            : 'background: white; border: 1px solid #e5e7eb; color: #374151;'
          }
        `;
        bubble.textContent = content;
        messageDiv.appendChild(bubble);
        messages.appendChild(messageDiv);
        messages.scrollTop = messages.scrollHeight;
      }
      
      async function sendMessage() {
        const message = input.value.trim();
        if (!message) return;
        
        addMessage(message, true);
        input.value = '';
        sendBtn.textContent = '...';
        sendBtn.disabled = true;
        
        try {
          const response = await fetch(finalConfig.apiEndpoint, {
            method: 'POST',
            headers: { 
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${finalConfig.apiKey}`,
              'apikey': finalConfig.apiKey,
            },
            body: JSON.stringify({ message, siteName: finalConfig.siteName })
          });
          
          if (response.ok) {
            const data = await response.json();
            addMessage(data.response || "I'm here to help! What would you like to know?");
          } else {
            addMessage("I'm having trouble connecting right now. Please try again later.");
          }
        } catch (error) {
          addMessage("I'm currently offline. Please try again later.");
        }
        
        sendBtn.textContent = 'Send';
        sendBtn.disabled = false;
        input.focus();
      }
      
      // Event listeners
      button.addEventListener('click', toggleChat);
      closeBtn.addEventListener('click', toggleChat);
      sendBtn.addEventListener('click', sendMessage);
      input.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
          sendMessage();
        }
      });
      
      // Hover effect for button
      button.addEventListener('mouseenter', function() {
        this.style.transform = 'scale(1.05)';
      });
      button.addEventListener('mouseleave', function() {
        this.style.transform = 'scale(1)';
      });
    }
  };
})();
