import { NextResponse } from "next/server";
import { ElevenLabsClient } from "@elevenlabs/elevenlabs-js";

export async function POST(req: Request) {
  try {
    const { text } = await req.json();
    const apiKey = process.env.ELEVENLABS_API_KEY;

    if (!text) {
      return NextResponse.json({ error: "No text provided" }, { status: 400 });
    }

    if (!apiKey) {
      console.warn("⚠️ ELEVENLABS_API_KEY missing — using browser TTS fallback");
      return NextResponse.json({ fallback: true });
    }

    const client = new ElevenLabsClient({ apiKey });

    const audioStream = await client.textToSpeech.convert("21m00Tcm4TlvDq8ikWAM", {
      text,
      modelId: "eleven_multilingual_v2",
      outputFormat: "mp3_44100_128",
    });

    const chunks: Uint8Array[] = [];
    const reader = audioStream.getReader();
    let done, value;

    while (true) {
      ({ done, value } = await reader.read());
      if (done) break;
      if (value) chunks.push(value);
    }

    const buffer = Buffer.concat(chunks.map((chunk) => Buffer.from(chunk)));

    // ✅ Return binary response
    return new NextResponse(buffer, {
      status: 200,
      headers: {
        "Content-Type": "audio/mpeg",
        "Content-Length": buffer.length.toString(),
      },
    });
  } catch (err: any) {
    console.error("🔊 /api/tts error:", err);
    return NextResponse.json({ error: err.message || "TTS failed" }, { status: 500 });
  }
}
