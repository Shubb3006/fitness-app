"use client";
import { useWorkoutStore } from "@/store/useWorkoutStore";
import { Loader2 } from "lucide-react";
import React, { useState } from "react";
import toast from "react-hot-toast";

const Page = () => {
  const { generateWorkout, generatingWorkout, workoutSchedule } =
    useWorkoutStore();

  const [data, setData] = useState({
    goal: "",
    experience: "",
  });

  async function handleSubmit(e) {
    e.preventDefault();

    if (!data.goal || !data.experience) {
      toast.error("Please select both goal and experience");
      return;
    }

    await generateWorkout(data);
  }
  console.log(generatingWorkout);
  console.log(workoutSchedule);

  return (
    <div className="min-h-screen bg-base-200 px-4 py-6">
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-6">
        {/* LEFT → FORM */}
        <div className="bg-base-100 p-6 rounded-2xl shadow space-y-4 ">
          <h2 className="text-xl font-bold">AI Workout Generator 💪</h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            <select
              className="select select-bordered w-full"
              value={data.goal}
              onChange={(e) => setData({ ...data, goal: e.target.value })}
            >
              <option value="" disabled>
                Select Goal
              </option>
              <option value="Muscle Gain">Muscle Gain</option>
              <option value="Fat Loss">Fat Loss</option>
            </select>

            <select
              className="select select-bordered w-full"
              value={data.experience}
              onChange={(e) => setData({ ...data, experience: e.target.value })}
            >
              <option value="" disabled>
                Select Experience
              </option>
              <option value="Beginner">Beginner</option>
              <option value="Intermediate">Intermediate</option>
              <option value="Advanced">Advanced</option>
            </select>

            <button
              type="submit"
              className="btn btn-primary w-full"
              disabled={generatingWorkout}
            >
              {generatingWorkout ? "Generating..." : "Generate Workout"}
            </button>
          </form>
        </div>

        {/* RIGHT → OUTPUT */}
        <div className="bg-base-100 p-6 rounded-2xl shadow">
          <h2 className="text-xl font-bold mb-4">Your Plan 📋</h2>

          {generatingWorkout && (
            <div className="flex flex-col items-center justify-center h-full gap-3">
              <Loader2 className="animate-spin" />
              <p className="text-sm text-gray-400">
                Generating your workout...
              </p>
            </div>
          )}

          {workoutSchedule.length === 0 && !generatingWorkout && (
            <div className="flex flex-col items-center justify-center h-full text-center gap-2">
              <p className="text-lg font-medium">No plan yet 🤖</p>
              <p className="text-sm text-gray-400">
                Select your goal & experience to generate a plan
              </p>
            </div>
          )}

          {!generatingWorkout && workoutSchedule && (
            <div className="space-y-4">
              {workoutSchedule.map((day, index) => (
                <div
                  key={index}
                  className="bg-base-200 p-4 rounded-xl border border-base-300 hover:shadow-md transition"
                >
                  <h3 className="font-semibold mb-2">{day.day}</h3>

                  {day.exercises.map((ex, i) => (
                    <p key={i} className="text-sm text-gray-500">
                      {ex.name} — {ex.sets} × {ex.reps}
                    </p>
                  ))}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Page;
