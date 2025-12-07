"use client";

import { useEffect } from "react";
import { motion } from "framer-motion";
import Slider from "react-slick";
import { useGeneratePlan } from "../hooks/useGeneratePlan";
import PlanCard from "../components/PlanCard";
import VoicePlayer from "../components/VoicePlayer";
import ImageGenerator from "../components/ImageGenerator";

export default function PlanPage() {
  const { loading, plan, error, generatePlan } = useGeneratePlan();

  useEffect(() => {
    const userDetails = JSON.parse(localStorage.getItem("userDetails") || "{}");
    if (Object.keys(userDetails).length > 0) generatePlan(userDetails);
  }, []);

  if (loading)
    return (
      <p className="text-center text-lg animate-pulse text-blue-500 mt-20">
        ⚡ Generating your personalized plan…
      </p>
    );

  if (error)
    return (
      <p className="text-center text-red-500 mt-20">
        ❌ {error}
      </p>
    );

  if (!plan) return null;

  const { workoutPlan, dietPlan, tips, aiSummary, rawText } = plan;

  // Slider settings
  const settings = {
    dots: true,
    infinite: false,
    speed: 600,
    slidesToShow: 1,
    slidesToScroll: 1,
    adaptiveHeight: true,
    arrows: true,
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.7 }}
      className="max-w-4xl mx-auto p-4"
    >
      <h2 className="text-3xl font-bold text-center mb-6 text-gray-800">
        🎯 Your AI Fitness Plan
      </h2>

      <Slider {...settings}>
        {/* 🏋️ Workout Plan */}
        {workoutPlan && (
          <div key="workout" className="p-4">
            <PlanCard title="🏋️ Workout Plan">
              <div className="space-y-4">
                {workoutPlan.map((day: any, i: number) => (
                  <div
                    key={i}
                    className="rounded-xl border bg-linear-to-br from-blue-50 to-white shadow-sm p-4"
                  >
                    <h4 className="text-lg font-semibold text-blue-700 mb-2">
                      {day.day || `Day ${i + 1}`} — {day.focus}
                    </h4>
                    <ul className="space-y-2">
                      {day.exercises?.map((ex: any, j: number) => (
                        <li
                          key={j}
                          className="flex flex-col gap-1 border-l-4 border-blue-400 pl-3"
                        >
                          <span className="font-medium text-gray-800">
                            {ex.name}
                          </span>
                          <span className="text-sm text-gray-500">
                            {ex.sets} sets × {ex.reps} reps ({ex.rest} rest)
                          </span>
                          <ImageGenerator prompt={ex.name} />
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
              <div className="mt-4 flex justify-center">
                <VoicePlayer
                  label="Workout Plan"
                  text={`Here is your personalized workout plan.`}
                />
              </div>
            </PlanCard>
          </div>
        )}

        {/* 🥗 Diet Plan */}
        {dietPlan && (
          <div key="diet" className="p-4">
            <PlanCard title="🥗 Diet Plan">
              <div className="space-y-4">
                {dietPlan.map((day: any, i: number) => (
                  <div
                    key={i}
                    className="rounded-xl border bg-linear-to-br from-green-50 to-white shadow-sm p-4 text-blue-950"
                  >
                    <h4 className="text-lg font-semibold text-green-700 mb-2">
                      {day.day || `Day ${i + 1}`}
                    </h4>
                    <ul className="space-y-2">
                      <li>
                        <strong>Breakfast:</strong> {day.breakfast}
                        <ImageGenerator prompt={day.breakfast} />
                      </li>
                      <li>
                        <strong>Lunch:</strong> {day.lunch}
                        <ImageGenerator prompt={day.lunch} />
                      </li>
                      <li>
                        <strong>Dinner:</strong> {day.dinner}
                        <ImageGenerator prompt={day.dinner} />
                      </li>
                      {day.snacks && (
                        <li>
                          <strong>Snacks:</strong> {day.snacks}
                          <ImageGenerator prompt={day.snacks} />
                        </li>
                      )}
                    </ul>
                  </div>
                ))}
              </div>
              <div className="mt-4 flex justify-center">
                <VoicePlayer
                  label="Diet Plan"
                  text={`Here is your personalized diet plan.`}
                />
              </div>
            </PlanCard>
          </div>
        )}

        {tips && (
          <div key="tips" className="p-4">
            <PlanCard title="💬 Tips & Motivation">
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="p-6 rounded-2xl bg-linear-to-br from-yellow-50 via-orange-50 to-white shadow-lg border border-amber-200"
              >
                <h3 className="text-2xl font-bold text-amber-700 mb-4 text-center">
                  🌟 Motivation & Posture Guidance
                </h3>

                {/* 🧩 Split the tips into sections */}
                <div className="space-y-4 text-gray-800 leading-relaxed">
                  {tips
                    .split(/\n+/) // Split by blank lines
                    .filter((line: string) => line.trim().length > 0)
                    .map((line: string, index: number) => {
                      const isNumbered = /^\d+[\.\)]?\s*/.test(line.trim());
                      const cleanLine = line.trim().replace(/^\d+[\.\)]?\s*/, "");

                      return (
                        <div
                          key={index}
                          className={`${isNumbered
                              ? "flex items-start gap-2"
                              : "flex items-start gap-3"
                            }`}
                        >
                          {isNumbered && (
                            <span className="font-semibold text-amber-600 mt-0.5">
                              {line.match(/^\d+/)?.[0]}.
                            </span>
                          )}
                          <p
                            className={`${line.toLowerCase().includes("posture")
                                ? "font-semibold text-amber-700 mt-2"
                                : ""
                              }`}
                          >
                            {cleanLine}
                          </p>
                        </div>
                      );
                    })}
                </div>

                <div className="mt-6 flex justify-center">
                  <VoicePlayer text={tips} label="Motivation Tips" />
                </div>
              </motion.div>
            </PlanCard>
          </div>
        )}
      </Slider>
    </motion.div>
  );
}
