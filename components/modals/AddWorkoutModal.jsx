"use client";
import { useWorkoutStore } from "@/store/useWorkoutStore";
import { Loader2, X } from "lucide-react";
import React, { useState } from "react";

const AddWorkoutModal = ({ setIsAddingWorkoutModal }) => {
  const { addWorkout, addingWorkout } = useWorkoutStore();

  const [exercises, setExercises] = useState([
    {
      name: "",
      sets: [{ reps: "", weight: "" }],
    },
  ]);

  // ➕ Add Exercise
  const addExercise = () => {
    setExercises([
      ...exercises,
      { name: "", sets: [{ reps: "", weight: "" }] },
    ]);
  };

  // ➕ Add Set
  const addSet = (exIndex) => {
    const updated = [...exercises];
    updated[exIndex].sets.push({ reps: "", weight: "" });

    setExercises(updated);
  };

  // 🔄 Handle Name Change
  const handleNameChange = (index, value) => {
    const updated = [...exercises];
    updated[index].name = value;

    setExercises(updated);
  };

  // 🔄 Handle Set Change
  const handleSetChange = (exIndex, setIndex, field, value) => {
    const updated = [...exercises];
    updated[exIndex].sets[setIndex][field] = value;

    setExercises(updated);
  };

  // 🚀 Submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(exercises);

    const success = await addWorkout(exercises);

    if (success) {
      setExercises([
        {
          name: "",
          sets: [{ reps: "", weight: "" }],
        },
      ]);
      setIsAddingWorkoutModal(false);
    }

    // reset form
  };

  return (
    <div className="modal modal-open">
      <div
        className="modal-backdrop"
        onClick={() => setIsAddingWorkoutModal(false)}
      ></div>
      <div className="modal-box space-y-4">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold ">Add Workout 💪</h2>
            <p className="text-sm text-gray-500">
              Track your exercise and sets
            </p>
          </div>

          <button
            className="btn btn-md btn-circle btn-ghost"
            onClick={() => setIsAddingWorkoutModal(false)}
          >
            <X size={18} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {exercises.map((ex, exIndex) => (
            <div key={exIndex} className="border border-base-300 bg-base-200/40 p-4 rounded-xl space-y-3">
              {/* Exercise Name */}
              <input
                className="input input-bordered w-full"
                type="text"
                placeholder="Exercise Name"
                value={ex.name}
                onChange={(e) => handleNameChange(exIndex, e.target.value)}
              />

              {/* Sets */}
              {ex.sets.map((set, setIndex) => (
                <div key={setIndex} className="flex gap-2">
                  <input
                    className="input input-bordered w-full"
                    type="number"
                    placeholder="Reps"
                    value={set.reps}
                    onChange={(e) =>
                      handleSetChange(exIndex, setIndex, "reps", e.target.value)
                    }
                  />
                  <input
                    className="input input-bordered w-full"
                    type="number"
                    placeholder="Weight"
                    value={set.weight}
                    onChange={(e) =>
                      handleSetChange(
                        exIndex,
                        setIndex,
                        "weight",
                        e.target.value
                      )
                    }
                  />
                </div>
              ))}

              {/* Add Set */}
              <button
                type="button"
                className="btn btn-outline w-full"
                onClick={() => addSet(exIndex)}
              >
                + Add Set
              </button>
            </div>
          ))}

          {/* Add Exercise */}
          <button
            type="button"
            className="btn btn-outline w-full"
            onClick={addExercise}
          >
            + Add Exercise
          </button>

          {/* Submit */}
          <div className="flex gap-3 modal-action">
            <button
              disabled={addingWorkout}
              type="submit"
              className="btn btn-neutral flex-1"
            >
              {addingWorkout ? (
                <Loader2 className="animate-spin" />
              ) : (
                "Save Workout"
              )}
            </button>
            <button
              type="button"
              className="btn btn-error flex-1"
              onClick={() => setIsAddingWorkoutModal(false)}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddWorkoutModal;
