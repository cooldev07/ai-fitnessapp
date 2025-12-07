import { useState } from "react";

export function useGeneratePlan() {
  const [loading, setLoading] = useState(false);
  const [plan, setPlan] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  const generatePlan = async (userDetails: any) => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/generatePlan", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userDetails),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);
      setPlan(data);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return { loading, plan, error, generatePlan };
}
