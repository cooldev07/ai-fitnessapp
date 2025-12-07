"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export default function UserForm() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState<any>({});

  const handleChange = (key: string, value: any) =>
    setFormData((prev: any) => ({ ...prev, [key]: value }));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    localStorage.setItem("userDetails", JSON.stringify(formData));
    setTimeout(() => {
      setLoading(false);
      router.push("/plan");
    }, 1000);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="grid gap-4 max-w-lg w-full bg-card p-6 rounded-2xl shadow-md"
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Input placeholder="Name" onChange={(e) => handleChange("name", e.target.value)} required />
        <Input placeholder="Age" type="number" onChange={(e) => handleChange("age", e.target.value)} required />
      </div>

      <Select onValueChange={(v) => handleChange("gender", v)} required>
        <SelectTrigger><SelectValue placeholder="Gender" /></SelectTrigger>
        <SelectContent>
          <SelectItem value="male">Male</SelectItem>
          <SelectItem value="female">Female</SelectItem>
          <SelectItem value="other">Other</SelectItem>
        </SelectContent>
      </Select>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Input placeholder="Height (cm)" type="number" onChange={(e) => handleChange("height", e.target.value)} required />
        <Input placeholder="Weight (kg)" type="number" onChange={(e) => handleChange("weight", e.target.value)} required />
      </div>

      <Select onValueChange={(v) => handleChange("goal", v)} required>
        <SelectTrigger><SelectValue placeholder="Fitness Goal" /></SelectTrigger>
        <SelectContent>
          <SelectItem value="weight_loss">Weight Loss</SelectItem>
          <SelectItem value="muscle_gain">Muscle Gain</SelectItem>
          <SelectItem value="endurance">Endurance</SelectItem>
          <SelectItem value="flexibility">Flexibility</SelectItem>
        </SelectContent>
      </Select>

      <Select onValueChange={(v) => handleChange("level", v)} required>
        <SelectTrigger><SelectValue placeholder="Current Fitness Level" /></SelectTrigger>
        <SelectContent>
          <SelectItem value="beginner">Beginner</SelectItem>
          <SelectItem value="intermediate">Intermediate</SelectItem>
          <SelectItem value="advanced">Advanced</SelectItem>
        </SelectContent>
      </Select>

      <Select onValueChange={(v) => handleChange("location", v)} required>
        <SelectTrigger><SelectValue placeholder="Workout Location" /></SelectTrigger>
        <SelectContent>
          <SelectItem value="home">Home</SelectItem>
          <SelectItem value="gym">Gym</SelectItem>
          <SelectItem value="outdoor">Outdoor</SelectItem>
        </SelectContent>
      </Select>

      <Select onValueChange={(v) => handleChange("dietaryPref", v)} required>
        <SelectTrigger><SelectValue placeholder="Dietary Preference" /></SelectTrigger>
        <SelectContent>
          <SelectItem value="veg">Veg</SelectItem>
          <SelectItem value="non-veg">Non-Veg</SelectItem>
          <SelectItem value="vegan">Vegan</SelectItem>
          <SelectItem value="keto">Keto</SelectItem>
        </SelectContent>
      </Select>

      <Textarea placeholder="Medical History (optional)" onChange={(e) => handleChange("medicalHistory", e.target.value)} />
      <Select onValueChange={(v) => handleChange("stressLevel", v)}>
        <SelectTrigger><SelectValue placeholder="Stress Level (optional)" /></SelectTrigger>
        <SelectContent>
          <SelectItem value="low">Low</SelectItem>
          <SelectItem value="moderate">Moderate</SelectItem>
          <SelectItem value="high">High</SelectItem>
        </SelectContent>
      </Select>

      <Button type="submit" disabled={loading}>
        {loading ? "Generating Plan..." : "Generate My Plan 💪"}
      </Button>
    </form>
  );
}
