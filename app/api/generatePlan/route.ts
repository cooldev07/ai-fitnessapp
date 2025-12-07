import { NextResponse } from "next/server";

export async function POST(req: Request) {
  console.log("📩 Incoming request to /api/generatePlan");

  try {
    const userDetails = await req.json();
    console.log("🧾 Received user details:", userDetails);

    if (!process.env.GEMINI_API_KEY) {
      console.warn("⚠️ GEMINI_API_KEY is missing — returning mock response");
      return NextResponse.json({
        mock: true,
        workoutPlan: [
          {
            day: "Day 1",
            exercises: [
              { name: "Push-ups", sets: 3, reps: "8-12", rest: "60s" },
              { name: "Bodyweight Squats", sets: 3, reps: "12-15", rest: "60s" },
            ],
          },
        ],
        dietPlan: [
          {
            day: "Day 1",
            breakfast: "Oats with fruit",
            lunch: "Grilled veggies & quinoa",
            dinner: "Salmon & salad",
          },
        ],
        tips: "Mock response — set GEMINI_API_KEY for live AI.",
      });
    }

    const { GoogleGenerativeAI } = await import("@google/generative-ai");
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

    const prompt = `
You are a professional fitness and nutrition coach.
Based on these details:
${JSON.stringify(userDetails, null, 2)}

Generate:
1. A 7-day workout plan (exercises, sets, reps, rest).
2. A 7-day diet plan (breakfast, lunch, dinner, snacks).
3. Motivation and posture tips.

Return valid JSON with keys:
{
  "workoutPlan": [...],
  "dietPlan": [...],
  "tips": "..."
}
`;

    console.log("🧠 Sending prompt to Gemini...");
    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });
    const result = await model.generateContent(prompt);
    let text = result.response?.text?.() ?? "";

    console.log("📝 Raw Gemini text output:\n", text);

    // 🧹 Remove markdown code fences if present
    text = text
      .replace(/^```(?:json)?/i, "")
      .replace(/```$/, "")
      .trim();

    let parsed;
    try {
      parsed = JSON.parse(text);
      console.log("✅ Parsed JSON successfully");
    } catch (err) {
      console.warn("⚠️ JSON parse failed, returning raw text");
      parsed = { rawText: text };
    }

    return NextResponse.json(parsed);
  } catch (err: any) {
    console.error("🔥 /api/generatePlan error:", err);
    return NextResponse.json({ error: err.message || "Failed to generate plan" }, { status: 500 });
  }
}
