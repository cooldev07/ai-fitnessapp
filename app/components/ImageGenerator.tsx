"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";

interface ImageGeneratorProps {
  prompt: string;
}

export default function ImageGenerator({ prompt }: ImageGeneratorProps) {
  const [image, setImage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const generateImage = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/generateImage", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt }),
      });

      const data = await res.json();
      if (data.image) {
        setImage(data.image);
      } else {
        console.error("⚠️ No image received:", data);
      }
    } catch (err) {
      console.error("Image generation error:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mt-2 flex flex-col items-center gap-2">
      <Button onClick={generateImage} disabled={loading}>
        {loading ? "Generating..." : "🖼️ Generate Image"}
      </Button>

      {image && (
        <img
          src={image}
          alt={prompt}
          className="mt-3 rounded-lg shadow-md max-w-xs border"
        />
      )}
    </div>
  );
}
