
import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { corsHeaders } from '../_shared/cors.ts'

interface WPImageResult {
  id: number;
  source_url: string;
  title: { rendered: string };
  alt_text?: string;
  caption: { rendered: string };
  media_details?: {
    width?: number;
    height?: number;
  };
  mime_type?: string;
  link?: string;
}

const sampleImages: WPImageResult[] = [
  {
    id: 101,
    source_url: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=400&q=80',
    title: { rendered: 'Misty Mountains' },
    alt_text: 'A landscape photo of mountains covered in mist.',
    caption: { rendered: 'Sample image for demonstration.' },
    media_details: { width: 400, height: 267 },
    mime_type: 'image/jpeg',
    link: '#',
  },
  {
    id: 102,
    source_url: 'https://images.unsplash.com/photo-1534353436294-0dbd4bdac845?w=400&q=80',
    title: { rendered: 'Cozy Living Room' },
    alt_text: 'A cozy living room with a couch and a cat.',
    caption: { rendered: 'Sample image for demonstration.' },
    media_details: { width: 400, height: 267 },
    mime_type: 'image/jpeg',
    link: '#',
  },
  {
    id: 103,
    source_url: 'https://images.unsplash.com/photo-1490750967868-88aa4486c946?w=400&q=80',
    title: { rendered: 'Yellow Flowers' },
    alt_text: 'A field of bright yellow flowers.',
    caption: { rendered: 'Sample image for demonstration.' },
    media_details: { width: 400, height: 600 },
    mime_type: 'image/jpeg',
    link: '#',
  },
  {
    id: 104,
    source_url: 'https://images.unsplash.com/photo-1507525428034-b723a9ce6890?w=400&q=80',
    title: { rendered: 'Beach Waves' },
    alt_text: 'Ocean waves crashing on a sandy beach.',
    caption: { rendered: 'Sample image for demonstration.' },
    media_details: { width: 400, height: 267 },
    mime_type: 'image/jpeg',
    link: '#',
  }
];

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const body = await req.json()
    console.log('chat-embed function invoked with body:', JSON.stringify(body, null, 2));
    const { message, siteName, wordpressUrl } = body;

    let response: {
      type: 'text' | 'image_results';
      content: string;
      results?: WPImageResult[];
    } = {
      type: 'text',
      content: "I'm here to help! What would you like to know?"
    }
    
    const lowerMessage = message.toLowerCase()

    if (wordpressUrl) {
      // LIVE MODE: If a WordPress URL is provided, we assume every query is for an image search.
      const searchQuery = lowerMessage.trim();

      if (!searchQuery) {
        response.content = "Please tell me what image you're looking for.";
      } else {
        const searchUrl = `${wordpressUrl.replace(/\/$/, "")}/wp-json/wp/v2/media?media_type=image&search=${encodeURIComponent(searchQuery)}&per_page=5`;
        
        try {
          const wpResponse = await fetch(searchUrl);
          if (wpResponse.ok) {
            const images: WPImageResult[] = await wpResponse.json();
            if (images.length > 0) {
              response = {
                type: 'image_results',
                content: `I found ${images.length} image(s) for "${searchQuery}":`,
                results: images
              };
            } else {
              response.content = `I couldn't find any images matching "${searchQuery}" on ${siteName}. Try searching for something else!`;
            }
          } else {
            console.error("WordPress API error:", wpResponse.status, await wpResponse.text());
            response.content = `I had some trouble searching for images on ${siteName} right now. Please try again in a moment.`;
          }
        } catch(e) {
            console.error("Error fetching from WordPress:", e);
            response.content = `I was unable to connect to the image library for ${siteName}.`;
        }
      }
    } else {
      // DEMO MODE: Fallback to sample images if no wordpressUrl is configured.
      const searchQuery = lowerMessage.trim();

      if (!searchQuery) {
        response.content = "Please tell me what image you're looking for.";
      } else {
        response = {
          type: 'image_results',
          content: `This is a demo. In a live environment, I would search your media library. Here are some sample images for "${searchQuery}":`,
          results: sampleImages
        };
      }
    }

    console.log('chat-embed function responding with:', JSON.stringify({ response }, null, 2));
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
        response: {
          type: 'text',
          content: "I'm sorry, I'm having trouble processing your message right now. Please try again in a moment."
        }
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
