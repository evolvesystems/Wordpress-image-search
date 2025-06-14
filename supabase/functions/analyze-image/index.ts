
import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { imageUrl, filename, apiKey } = await req.json();

    if (!apiKey) {
      throw new Error('OpenAI API key is required');
    }

    console.log('Analyzing image:', filename);

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: [
          {
            role: 'system',
            content: 'You are an agricultural image analysis expert. Analyze the image and return ONLY a comma-separated list of relevant tags for agricultural/farming context. Focus on: crops, animals, equipment, soil conditions, weather, farming activities, landscape features. Keep tags simple and specific. Maximum 8 tags.'
          },
          {
            role: 'user',
            content: [
              {
                type: 'text',
                text: 'Analyze this agricultural image and provide relevant tags:'
              },
              {
                type: 'image_url',
                image_url: {
                  url: imageUrl
                }
              }
            ]
          }
        ],
        max_tokens: 100
      }),
    });

    if (!response.ok) {
      throw new Error(`OpenAI API error: ${response.statusText}`);
    }

    const data = await response.json();
    const tags = data.choices[0].message.content.trim();

    console.log('Generated tags:', tags);

    return new Response(JSON.stringify({ tags }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('Error analyzing image:', error);
    return new Response(JSON.stringify({ 
      error: 'Failed to analyze image', 
      details: error.message 
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
