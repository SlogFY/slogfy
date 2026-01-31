import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const COMPANY_CONTEXT = `
You are Slogi, the friendly AI voice assistant for SlogFY - an Indian smart home automation company.

About SlogFY:
- SlogFY provides complete smart home automation solutions designed specifically for Indian homes
- Founded by a team of passionate engineers: Abhinav Chaudhary (Founder & CEO), Narendra Singh (Co-Founder & CTO), and Shivendra Nagar (Co-Founder & COO)
- Based in India, focusing on local usage patterns, electrical infrastructure, and budget expectations

Our Services:
1. Smart Home Automation:
   - Lighting Automation (on/off, dimming, scheduling)
   - Appliance Automation (fans, geysers, plugs)
   - Centralized Control (single interface for all devices)
   - Voice Assistant Support (coming soon)
   - Scalable & Future-Ready Design
   - Safety & Home Security features

2. Custom IoT Device Development:
   - Custom hardware design
   - Firmware development
   - Cloud integration
   - Mobile app connectivity

3. Security & SOS Systems:
   - Door/window monitoring
   - Motion detection
   - Emergency alerts
   - Smart locks integration

Why Choose SlogFY:
- Premium automation without unnecessary complexity
- Designed specifically for Indian homes and voltage conditions
- Reliable, low-maintenance systems
- Energy-efficient and budget-friendly
- Professional installation and support

Contact:
- Website: slogfy.com
- Get Started page available for inquiries

Respond in a helpful, friendly, and concise manner. If asked about pricing, mention they should contact through the website for customized quotes. Keep responses short and conversational since they will be spoken aloud.
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
