"use client";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { useUser } from "@/context/UserContext";
import Link from "next/link";

export default function Dashboard() {
  const { user, userDetails } = useUser();
  const [todayWorkout, setTodayWorkout] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [completed, setCompleted] = useState(false);
  useEffect(() => {
    const fetchTodayWorkout = async () => {
      if (!user) return;

      // Get day index (0 = Sunday, 1 = Monday, ... 6 = Saturday)
      const dayIndex = new Date().getDay();
      const dayKey = `Day${dayIndex + 1}`;

      const { data, error } = await supabase
        .from("workouts")
        .select("exercises")
        .eq("user_id", user.id)
        .single();

      if (error) {
        console.error("Workout fetch error:", error.message);
        setLoading(false);
        return;
      }

      if (data && data.exercises && data.exercises[dayKey]) {
        setTodayWorkout(data.exercises[dayKey]);
      } else {
        setTodayWorkout([]);
      }

      setLoading(false);
    };

    fetchTodayWorkout();
  }, [user]);

  useEffect(() => {
    async function checkCompleted() {
      const today = new Date().toISOString().split("T")[0];
      const { data, error } = await supabase
        .from("exercises")
        .select("id")
        .eq("user_id", user?.id)
        .eq("completed_on", today);

      if (data && data.length > 0) {
        setCompleted(true);
      }
    }

    if (user) checkCompleted();
  }, [user]);

  const markComplete = async () => {
    const today = new Date().toISOString().split("T")[0];

    try {
      for (const workout of todayWorkout) {
        const { error } = await supabase.from("exercises").insert({
          name: workout.name,
          sets: workout.sets,
          reps: workout.reps,
          user_id: user?.id,
          completed_on: today,
        });

        if (error) {
          console.error(`Error inserting ${workout.name}:`, error.message);
          alert(`Error inserting ${workout.name}:`);
          return;
        }
      }

      setCompleted(true);
      alert("✅ Workout marked as complete!");
    } catch (err) {
      console.error("Insert error:", err);
      alert("❌ Failed to mark as complete.");
    }
  };

  return (
    <div className="p-6 max-w-3xl mx-auto">
      {userDetails?.goal ? (
        <>
          <h1 className="text-3xl font-bold mb-6 text-blue-600">
            Welcome, {userDetails?.name.toUpperCase() || "User"} 👋
          </h1>

          <div className="bg-white border border-gray-200 p-6 rounded-2xl shadow-md mb-6">
            <h2 className="text-2xl font-semibold mb-4 text-gray-800">
              🏋️ Today’s Workout
            </h2>

            {loading ? (
              <p className="text-gray-500">Loading...</p>
            ) : todayWorkout.length ? (
              <ul className="list-disc list-inside space-y-2 text-gray-700 mb-4">
                {todayWorkout.map((exercise: any, index: number) => (
                  <li key={index}>
                    <span className="font-medium">{exercise.name}</span> –{" "}
                    {exercise.sets}x{exercise.reps}
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-yellow-600">
                Today Is Rest Day or you can simply do walking.....
              </p>
            )}

            {!completed ? (
              <button
                onClick={markComplete}
                className="mt-4 px-5 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
              >
                ✅ Mark as Complete
              </button>
            ) : (
              <p className="mt-4 px-5 py-2 text-green-700 font-semibold">
                ✅ Workout already completed!
              </p>
            )}
          </div>

          <div className="bg-white border border-gray-200 p-6 rounded-2xl shadow-md">
            <h2 className="text-2xl font-semibold mb-4 text-gray-800">
              📈 Your Progress
            </h2>
            <p className="text-gray-500">
              Coming soon: weight chart & completion rate
            </p>
          </div>
        </>
      ) : (
        <div className="text-center mt-10">
          <p className="text-lg text-gray-700 mb-4">
            🚨 Please complete your profile first!
          </p>
          <Link
            href="/profile"
            className="inline-block bg-blue-600 text-white px-5 py-2 rounded hover:bg-blue-700 transition"
          >
            Go to Profile
          </Link>
        </div>
      )}
    </div>
  );
}
