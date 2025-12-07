"use client";
import { Dumbbell } from "lucide-react";
import ThemeToggle from "./ThemeToggle";
import Link from "next/link";

export default function Navbar() {
  return (
    <header className="flex items-center justify-between px-15 py-4 border-b ">
      <Link href="/" className="flex items-center space-x-2 font-bold text-xl">
        <Dumbbell className="w-6 h-6 text-primary" />
        <span>AI Fitness Coach</span>
      </Link>
      <ThemeToggle />
    </header>
  );
}
