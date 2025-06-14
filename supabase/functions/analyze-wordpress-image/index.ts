
import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  // Diagnostic: simple start log to prove entry
  console.log("analyze-wordpress-image: function entry, method:", req.method);

  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Basic parse and check for expected keys (no extra logic)
    const body = await req.json();
    if (!body?.imageUrl || !body?.openai_api_key) {
      throw new Error("Missing imageUrl or openai_api_key");
    }
    // Respond with dummy tags for testing recursion only
    return new Response(JSON.stringify({ tags: "diagnostic-test, recursion-check, success" }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    });
  } catch (err: any) {
    console.error('Diagnostic error in analyze-wordpress-image:', err);
    return new Response(JSON.stringify({ error: err.message || "Unknown error" }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    });
  }
});
