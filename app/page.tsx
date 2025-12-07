"use client";
import UserForm from "./components/UserForm";
import { motion } from "framer-motion";

export default function Home() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="flex flex-col items-center justify-center space-y-8"
    >
      <h1 className="text-4xl font-bold text-center">
        🧠 Your Personal AI Fitness Coach
      </h1>
      <p className="text-center text-muted-foreground max-w-md">
        Enter your details and let AI craft your personalized workout and diet plan.
      </p>
      <UserForm />
    </motion.div>
  );
}
