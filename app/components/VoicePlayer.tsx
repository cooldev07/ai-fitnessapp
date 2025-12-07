"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";

interface VoicePlayerProps {
  text: string;
  label: string;
}

export default function VoicePlayer({ text, label }: VoicePlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const playAudio = async () => {
    setIsLoading(true);
    try {
      const res = await fetch("/api/tts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text }),
      });

      const dataType = res.headers.get("Content-Type");
      if (dataType === "application/json") {
        const json = await res.json();
        if (json.fallback) {
          // Fallback: use Web Speech API
          const utterance = new SpeechSynthesisUtterance(text);
          speechSynthesis.speak(utterance);
          setIsPlaying(true);
          utterance.onend = () => setIsPlaying(false);
        } else {
          throw new Error(json.error || "TTS request failed");
        }
      } else {
        const blob = await res.blob();
        const url = URL.createObjectURL(blob);
        const audio = new Audio(url);
        audio.play();
        setIsPlaying(true);
        audio.onended = () => {
          setIsPlaying(false);
          URL.revokeObjectURL(url);
        };
      }
    } catch (err) {
      console.error("TTS Error:", err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Button onClick={playAudio} disabled={isLoading || isPlaying}>
      {isLoading ? "Loading..." : isPlaying ? "Playing..." : `🔊 Read ${label}`}
    </Button>
  );
}
