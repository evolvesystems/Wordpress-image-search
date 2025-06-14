
import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.42.5";

const supabaseUrl = Deno.env.get("SUPABASE_URL");
const serviceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");
const supabase = createClient(supabaseUrl, serviceKey);

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { imageUrl, user_id } = await req.json();
    if (!imageUrl || !user_id) throw new Error("Missing imageUrl or user_id");

    // Use Supabase client to fetch user's OpenAI API key
    const { data: settings, error: settingsError } = await supabase
      .from("user_settings")
      .select("openai_api_key")
      .eq("user_id", user_id)
      .maybeSingle();

    if (settingsError) throw new Error("Failed to load user settings: " + settingsError.message);
    if (!settings?.openai_api_key) throw new Error("OpenAI API key not found for user");

    const openAIApiKey = settings.openai_api_key;

    // Download the image as blob
    const imgResp = await fetch(imageUrl);
    if (!imgResp.ok) throw new Error(`Could not fetch image: ${imgResp.status}`);
    const imgArrayBuffer = await imgResp.arrayBuffer();
    const imgBase64 = btoa(String.fromCharCode(...new Uint8Array(imgArrayBuffer)));

    // Call OpenAI Vision endpoint
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: "POST",
      headers: {
        'Authorization': `Bearer ${openAIApiKey}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: [
          {
            role: 'system',
            content: 'You are an agricultural image analysis expert. Analyze the image and return ONLY a comma-separated list of relevant tags for agricultural/farming context. Focus on: crops, animals, equipment, soil, weather, farming activities, landscape features. Keep tags simple and specific. Maximum 8 tags.'
          },
          {
            role: 'user',
            content: [
              { type: 'text', text: 'Analyze this agricultural image and provide relevant tags:' },
              { type: 'image_url', image_url: { url: `data:image/jpeg;base64,${imgBase64}` } }
            ]
          }
        ],
        max_tokens: 100
      })
    });

    if (!response.ok) {
      const errText = await response.text();
      throw new Error(`OpenAI Vision error: ${response.status} ${errText}`);
    }

    const data = await response.json();
    const tags = data.choices?.[0]?.message?.content?.trim() || '';

    return new Response(JSON.stringify({ tags }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    });
  } catch (err: any) {
    console.error('Error analyzing WordPress image:', err);
    return new Response(JSON.stringify({ error: err.message }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    });
  }
});
