import { NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";

export async function POST(req: Request) {
  try {
    const { prompt } = await req.json();

    if (!prompt) {
      return NextResponse.json({ error: "No prompt provided" }, { status: 400 });
    }

    const apiKey = process.env.GEMINI_API_KEY;
    const genAI = apiKey ? new GoogleGenerativeAI(apiKey) : null;

    if (genAI) {
      try {
        const model = genAI.getGenerativeModel({ model: "imagen-3.0" });
        const result = await model.generateContent([
          prompt
        ]);

        const base64Image =
          result.response?.candidates?.[0]?.content?.parts?.[0]?.inlineData?.data;

        if (base64Image) {
          const imageUrl = `data:image/png;base64,${base64Image}`;
          return NextResponse.json({ image: imageUrl });
        }
      } catch (err) {
        console.warn("⚠️ Gemini image generation failed, using Pollinations fallback.");
      }
    }

    // 🧠 Free fallback: Pollinations API (no key needed)
    const fallbackUrl = `https://image.pollinations.ai/prompt/${encodeURIComponent(prompt)}`;
    return NextResponse.json({
      image: fallbackUrl,
      note: "⚠️ Using free Pollinations image generator",
    });

  } catch (err: any) {
    console.error("🔥 /api/generateImage error:", err);
    return NextResponse.json(
      { error: err.message || "Image generation failed" },
      { status: 500 }
    );
  }
}
