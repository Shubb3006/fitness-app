"use client";
import AddWorkoutModal from "@/components/modals/AddWorkoutModal";
import UpdateWorkoutModal from "@/components/modals/UpdateWorkoutModal";
import PRdata from "@/components/PRdata";
import DashboardSkeleton from "@/components/skeletons/DashboardSkeletons";
import StreakData from "@/components/StreakData";
import { useAuthStore } from "@/store/useAutjStore";
import { useWorkoutStore } from "@/store/useWorkoutStore";
import { Edit, Loader2, Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

const Dashboard = () => {
  const router = useRouter();
  const { logout } = useAuthStore();
  const { workouts, getWorkouts, deleteWorkout, gettingWorkouts } =
    useWorkoutStore();
  const [isAddingWorkoutModal, setIsAddingWorkoutModal] = useState(false);
  const [deletingId, setDeletinId] = useState(null);
  const [updatingWorkout, setUpdatingWorkout] = useState(null);

  async function handleLogout() {
    await logout();
    router.push("/signin");
  }

  useEffect(() => {
    getWorkouts();
  }, []);

  async function handleDelete(id) {
    setDeletinId(id);
    await deleteWorkout(id);
  }

  console.log(workouts);

  if (gettingWorkouts) return <DashboardSkeleton />;
  return (
    <div className="min-h-screen bg-base-200 px-4 py-6 md:px-10">
      {/* Header */}
      {/* Header */}

      <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4 mb-6">
        <div>
          <h1 className="text-4xl font-extrabold tracking-tight">
            Dashboard 💪
          </h1>
          <p className="text-gray-500 text-sm">
            Track your workouts & progress
          </p>
        </div>

        <div className="flex gap-3">
          <button
            className="btn btn-neutral rounded-xl px-6 shadow hover:scale-105 transition"
            onClick={() => setIsAddingWorkoutModal(true)}
          >
            + Add Workout
          </button>

          <button
            className="btn btn-error rounded-xl px-6 shadow hover:scale-105 transition"
            onClick={handleLogout}
          >
            Logout
          </button>
        </div>
      </div>

      <StreakData  />
      <PRdata  />

      {/* Empty State */}
      {workouts.length === 0 ? (
        <div className="flex flex-col items-center justify-center mt-24 text-center">
          <p className="text-xl font-semibold">No workouts yet 😔</p>
          <p className="text-gray-400 mt-1">
            Start logging your workouts to see progress
          </p>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {workouts.map((w) => (
            <div
              key={w._id}
              className="bg-base-100 p-5 rounded-2xl shadow-md hover:shadow-xl hover:-translate-y-1 transition duration-300 border border-base-300"
            >
              {/* Date + Delete */}
              <div className="flex justify-between items-center mb-4">
                <p className="text-sm text-gray-500">
                  {new Date(w.createdAt).toLocaleDateString()}
                </p>

                <div className="flex gap-1">
                  <button
                    className="btn btn-ghost btn-sm text-red-500 hover:bg-red-100"
                    onClick={() => handleDelete(w._id)}
                  >
                    {deletingId === w._id ? (
                      <Loader2 className="animate-spin" size={16} />
                    ) : (
                      <Trash2 size={16} />
                    )}
                  </button>

                  <button
                    className="btn btn-ghost btn-sm hover:bg-base-200"
                    onClick={() => setUpdatingWorkout(w)}
                  >
                    <Edit size={16} />
                  </button>
                </div>
              </div>

              {/* Exercises */}
              <div className="space-y-3">
                {w.exercises?.map((e) => (
                  <div
                    key={e._id}
                    className="bg-base-200 p-3 rounded-xl border border-base-300"
                  >
                    <h2 className="font-semibold text-md mb-1 flex justify-between">
                      {e.name}
                      <span className="text-xs text-gray-400">
                        {e.sets.length} sets
                      </span>
                    </h2>

                    {e.sets.map((s) => (
                      <p key={s._id} className="text-sm text-gray-600 ml-1">
                        {s.reps} reps × {s.weight} kg
                      </p>
                    ))}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Modal */}
      {isAddingWorkoutModal && (
        <AddWorkoutModal setIsAddingWorkoutModal={setIsAddingWorkoutModal} />
      )}
      {updatingWorkout && (
        <UpdateWorkoutModal
          workout={updatingWorkout}
          setUpdatingWorkout={setUpdatingWorkout}
        />
      )}
    </div>
  );
};

export default Dashboard;
