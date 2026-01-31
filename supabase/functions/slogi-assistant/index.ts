import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const COMPANY_CONTEXT = `
You are Slogi, a friendly voice assistant for Slogfy, an Indian smart home automation company.

CRITICAL OUTPUT RULES:
- Give ONLY plain spoken text. NO bullet points, NO numbers, NO dashes, NO asterisks, NO markdown.
- Keep responses SHORT (2-3 sentences max). This is for voice, not reading.
- Sound natural and conversational, like talking to a friend.
- Never say "here are" or "the following" - just answer directly.
- Pronounce company name as "Slogfy" (one word, not "slog F Y").

COMPANY INFO (use naturally, don't list):
Slogfy makes smart home automation for Indian homes. Founded by Abhinav Chaudhary (CEO), Narendra Singh (CTO), and Shivendra Nagar (COO). 

Services include lighting control, fan and appliance automation, security systems, and custom IoT development. Everything is designed for Indian electrical systems and budgets.

For pricing, direct users to the website slogfy.com or Get Started page.

Remember: Short, natural, conversational responses only. No formatting whatsoever.
`;

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { message } = await req.json();
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    
    if (!LOVABLE_API_KEY) {
      throw new Error("LOVABLE_API_KEY is not configured");
    }

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-3-flash-preview",
        messages: [
          { role: "system", content: COMPANY_CONTEXT },
          { role: "user", content: message },
        ],
      }),
    });

    if (!response.ok) {
      if (response.status === 429) {
        return new Response(JSON.stringify({ error: "Rate limit exceeded. Please try again later." }), {
          status: 429,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      if (response.status === 402) {
        return new Response(JSON.stringify({ error: "Service temporarily unavailable." }), {
          status: 402,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      const errorText = await response.text();
      console.error("AI gateway error:", response.status, errorText);
      throw new Error("Failed to get AI response");
    }

    const data = await response.json();
    const reply = data.choices?.[0]?.message?.content || "Sorry, I couldn't understand that.";

    return new Response(JSON.stringify({ reply }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Slogi assistant error:", error);
    return new Response(JSON.stringify({ error: error instanceof Error ? error.message : "Unknown error" }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
