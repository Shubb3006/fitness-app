"use client";
import { useUser } from "@/context/UserContext";
import React, { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

const page = () => {
  const [exercises, setExercises] = useState<any[]>([]);
  const { user } = useUser();
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    async function getExercises() {
      if (!user) return;
      const { data, error } = await supabase
        .from("exercises")
        .select("*")
        .eq("user_id", user?.id)
        .order("completed_on", { ascending: false });

      if (error) {
        console.error("Fetch error:", error.message);
      } else {
        setExercises(data || []);
      }
      setLoading(false);
    }

    getExercises();
  }, [user]);

  console.log(exercises);
  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-4 text-blue-700">
        📜 Workout History
      </h1>

      {loading ? (
        <p className="text-gray-500">Loading...</p>
      ) : exercises.length === 0 ? (
        <p className="text-gray-500">No workout history found.</p>
      ) : (
        <div className="space-y-4">
          {exercises.map((exercise, index) => (
            <div
              key={`${exercise.name}-${exercise.completed_on}-${index}`}
              className="bg-white shadow rounded-xl p-4 border border-gray-200"
            >
              <p className="text-lg font-semibold text-gray-800">
                {exercise.name}
              </p>
              <p className="text-sm text-gray-600">
                {exercise.sets} sets × {exercise.reps} reps
              </p>
              <p className="text-sm text-gray-500">
                ✅ Completed on:{" "}
                {new Date(exercise.completed_on).toLocaleDateString()}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default page;
