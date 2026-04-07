"use client";
import { useWorkoutStore } from "@/store/useWorkoutStore";
import React from "react";

const PRdata = () => {
  const { workouts } = useWorkoutStore();

  const workoutNames = [
    ...new Set(
      workouts.flatMap((w) => w.exercises.map((e) => e.name.toLowerCase()))
    ),
  ];

  const prData = workoutNames.map((name) => {
    let maxWeight = 0;

    workouts.map((w) => {
      w.exercises.map((e) => {
        if (e.name.toLowerCase() === name) {
          e.sets.map((s) => {
            maxWeight = Math.max(maxWeight, s.weight);
          });
        }
      });
    });

    return { name, PR: maxWeight };
  });

  return (
    <div className="bg-base-100 rounded-2xl shadow mb-8 border border-base-300 p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold">🏆 Personal Records</h2>
        <span className="text-sm text-gray-400">Best lifts</span>
      </div>

      {prData.length === 0 ? (
        <p className="text-sm text-gray-400">No records yet</p>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {prData
            .sort((a, b) => b.PR - a.PR)
            .slice(0, 6)
            .map((item) => (
              <div
                className="bg-base-200 p-4 rounded-xl border border-base-300 hover:shadow transition"
                key={item.name}
              >
                <p className="text-sm text-gray-500 capitalize">{item.name}</p>

                <h3 className="text-xl font-bold">
                  {item.PR} <span className="text-sm font-normal">kg</span>
                </h3>
              </div>
            ))}
        </div>
      )}
    </div>
  );
};

export default PRdata;
