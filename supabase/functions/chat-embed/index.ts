import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { corsHeaders } from '../_shared/cors.ts'

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const { message, siteName, wordpressUrl } = await req.json()

    let response = "I'm here to help! What would you like to know?"
    const lowerMessage = message.toLowerCase()

    const imageKeywords = ['image', 'photo', 'picture', 'show me', 'find', 'search for'];
    const isImageSearch = imageKeywords.some(keyword => lowerMessage.includes(keyword));

    if (isImageSearch && wordpressUrl) {
      let searchQuery = lowerMessage
        .replace(/show me/g, '')
        .replace(/find/g, '')
        .replace(/search for/g, '')
        .replace(/an image of/g, '')
        .replace(/a picture of/g, '')
        .replace(/a photo of/g, '')
        .replace(/images of/g, '')
        .replace(/pictures of/g, '')
        .replace(/photos of/g, '')
        .trim();

      if (!searchQuery) {
        response = "Please tell me what image you're looking for.";
      } else {
        const searchUrl = `${wordpressUrl.replace(/\/$/, "")}/wp-json/wp/v2/media?media_type=image&search=${encodeURIComponent(searchQuery)}&per_page=5&_fields=id,title,link`;
        
        try {
          const wpResponse = await fetch(searchUrl);
          if (wpResponse.ok) {
            const images = await wpResponse.json();
            if (images.length > 0) {
              let responseContent = `I found ${images.length} image(s) for "${searchQuery}":\n\n`;
              images.forEach((img: { title: { rendered: string }, link: string }) => {
                responseContent += `- ${img.title.rendered}: ${img.link}\n`;
              });
              response = responseContent;
            } else {
              response = `I couldn't find any images matching "${searchQuery}" on ${siteName}. Try searching for something else!`;
            }
          } else {
            console.error("WordPress API error:", wpResponse.status, await wpResponse.text());
            response = `I had some trouble searching for images on ${siteName} right now. Please try again in a moment.`;
          }
        } catch(e) {
            console.error("Error fetching from WordPress:", e);
            response = `I was unable to connect to the image library for ${siteName}.`;
        }
      }
    } else if (lowerMessage.includes('hello') || lowerMessage.includes('hi')) {
      response = `Hello! Welcome to ${siteName}. How can I assist you today?`
    } else if (lowerMessage.includes('price') || lowerMessage.includes('cost')) {
      response = "I'd be happy to help with pricing information. Could you tell me more about what you're looking for?"
    } else if (lowerMessage.includes('contact') || lowerMessage.includes('support')) {
      response = "You can reach our support team through the contact form on this website, or I can help answer your questions right here!"
    } else if (lowerMessage.includes('product') || lowerMessage.includes('service')) {
      response = "I can help you learn more about our products and services. What specific information are you looking for?"
    } else if (lowerMessage.includes('help')) {
      response = "I'm here to help! You can ask me about our products, services, pricing, or any other questions you might have."
    } else if (lowerMessage.includes('thank')) {
      response = "You're very welcome! Is there anything else I can help you with?"
    } else {
      // Default helpful response
      response = "That's a great question! While I'm still learning, I'd recommend checking out the main sections of this website or contacting our team directly for more detailed information."
    }

    return new Response(
      JSON.stringify({ response }),
      {
        headers: { 
          ...corsHeaders,
          'Content-Type': 'application/json'
        },
      },
    )
  } catch (error) {
    console.error('Error in chat-embed function:', error)
    return new Response(
      JSON.stringify({ 
        response: "I'm sorry, I'm having trouble processing your message right now. Please try again in a moment." 
      }),
      {
        headers: { 
          ...corsHeaders,
          'Content-Type': 'application/json'
        },
        status: 500,
      },
    )
  }
})
