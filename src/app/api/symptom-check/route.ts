// app/api/symptom-check/route.ts
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { symptom } = await req.json();

    if (!symptom || typeof symptom !== "string") {
      return NextResponse.json({ error: "Invalid input" }, { status: 400 });
    }

 const prompt = `You are a helpful medical assistant. 
A patient reports: "${symptom}".
Respond ONLY in JSON like this:
{
  "diagnosis": "text",
  "remedy": "text",
  "precautions": "text"
}`;


    const HF_API_TOKEN = process.env.HUGGINGFACE_API_TOKEN;
    const MODEL_ID = "HuggingFaceH4/zephyr-7b-beta"; // friendlier for text-generation


    const response = await fetch(`https://api-inference.huggingface.co/models/${MODEL_ID}`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${HF_API_TOKEN}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        inputs: prompt,
        parameters: { max_new_tokens: 200 },
      }),
    });

    const result = await response.json();

    const message = result?.[0]?.generated_text;

    if (!message || typeof message !== "string") {
      return NextResponse.json(
        { error: "Model returned no valid output" },
        { status: 502 }
      );
    }

    const jsonStart = message.indexOf("{");
    const jsonEnd = message.lastIndexOf("}") + 1;

    if (jsonStart === -1 || jsonEnd === -1) {
      console.error("Model output is not in expected JSON format:", message);
      return NextResponse.json(
        { error: "Invalid JSON structure in model output" },
        { status: 502 }
      );
    }

    const jsonString = message.slice(jsonStart, jsonEnd).trim();

    let parsed;
    try {
      parsed = JSON.parse(jsonString);
    } catch {
      console.error("JSON.parse failed. Message:", message);
      return NextResponse.json(
        { error: "Failed to parse model response as JSON",
            rawOutput: message,
         },
        { status: 502 }
      );
    }

    return NextResponse.json(parsed);
  } catch (error) {
    console.error("Error in /api/symptom-check:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
