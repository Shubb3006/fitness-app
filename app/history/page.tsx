"use client";
import { useUser } from "@/context/UserContext";
import React, { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

const page = () => {
  const { user } = useUser();
  const [loading, setLoading] = useState(true);
  const [groupedExercises, setGroupedExercises] = useState<{
    [date: string]: any[];
  }>({});

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
        return;
      }
      const grouped: { [date: string]: any[] } = {};
      data.forEach((exercise) => {
        const date = new Date(exercise.completed_on)
          .toISOString()
          .split("T")[0];
        if (!grouped[date]) grouped[date] = [];
        grouped[date].push(exercise);
      });
      setGroupedExercises(grouped);

      setLoading(false);
    }

    getExercises();
  }, [user]);
  console.log(groupedExercises);
  console.log(Object.entries(groupedExercises));

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-4 text-blue-700">
        📜 Workout History
      </h1>

      {loading ? (
        <p className="text-gray-500">Loading...</p>
      ) : Object.keys(groupedExercises).length === 0 ? (
        <p className="text-gray-500">No workout history found.</p>
      ) : (
        <div className="space-y-4">
          {Object.entries(groupedExercises).map(([date, exercises]) => (
            <div
              key={date}
              className="bg-white shadow rounded-xl p-4 border border-gray-200"
            >
              <h2 className="text-xl font-semibold text-gray-800 mb-2">
                ✅ {new Date(date).toLocaleDateString()}
              </h2>
              <div className="grid gap-3">
                {exercises.map((exercise, index) => (
                  <div
                    key={`${exercise.name}-${index}`}
                    className="bg-white shadow rounded-xl p-4 border border-gray-200"
                  >
                    <p className="text-lg font-semibold text-gray-800">
                      {exercise.name}
                    </p>
                    <p className="text-sm text-gray-600">
                      {exercise.sets} sets × {exercise.reps} reps
                    </p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
export default page;
