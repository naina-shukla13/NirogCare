import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { symptom } = await req.json();

    if (!symptom || typeof symptom !== "string") {
      return NextResponse.json({ error: "Invalid symptom input" }, { status: 400 });
    }

    const OPENROUTER_API_KEY = process.env.OPENROUTER_API_KEY;

    const prompt = `A patient is experiencing the following symptom: "${symptom}".
Please provide:
1. A likely medical diagnosis,
2. A simple home remedy (if safe),
3. Precautionary advice.

Respond strictly in JSON format like:
{
  "diagnosis": "...",
  "remedy": "...",
  "precautions": "..."
}`;

    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${OPENROUTER_API_KEY}`,
        "Content-Type": "application/json",
        "HTTP-Referer": "https://nirogcare.vercel.app", // optional: your live site
        "X-Title": "NirogCare AI Diagnosis"
      },
      body: JSON.stringify({
        model: "openai/gpt-3.5-turbo", // or try "openai/gpt-3.5-turbo" or "anthropic/claude-3-haiku"
        messages: [
          {
            role: "user",
            content: prompt
          }
        ],
        temperature: 0.7
      })
    });

    const result = await response.json();

    const message = result.choices?.[0]?.message?.content;

    if (!message) {
      return NextResponse.json({ error: "No message returned from OpenRouter" }, { status: 502 });
    }

    // Try to extract JSON from the response
    const jsonStart = message.indexOf("{");
    const jsonEnd = message.lastIndexOf("}") + 1;
    const jsonString = message.slice(jsonStart, jsonEnd);

    try {
      const parsed = JSON.parse(jsonString);
      return NextResponse.json(parsed);
    } catch {
      return NextResponse.json(
        { error: "AI responded with invalid JSON", raw: message },
        { status: 502 }
      );
    }
  } catch (err) {
    console.error("Error in /api/symptom-check:", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
