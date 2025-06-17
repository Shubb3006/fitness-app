"use client";
import React from "react";
import { supabase } from "@/lib/supabase";
import { useState, useEffect } from "react";
import { useUser } from "@/context/UserContext";
import { useRouter } from "next/navigation";
import { exercises_Gain, exercises_Lose } from "@/components/Workout-plan";

const page = () => {
  const router = useRouter();
  const { user, userDetails, setUserDetails } = useUser();

  useEffect(() => {
    if (!user?.email) return;

    const fetchUserData = async () => {
      const { data, error } = await supabase
        .from("users")
        .select("*")
        .eq("email", user.email)
        .single(); // expects exactly one match

      if (error) {
        console.error("Error fetching user data:", error.message);
      } else {
        setUserDetails(data);
      }
    };

    fetchUserData();
  }, [user]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setUserDetails((prev) =>
      prev
        ? {
            ...prev,
            [name]: value,
          }
        : prev
    );
  };

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const updated = {
      name: userDetails?.name,
      age: userDetails?.age,
      goal: userDetails?.goal,
      fitness_level: userDetails?.fitness_level,
      days_per_week: userDetails?.days_per_week,
    };
    const { data, error } = await supabase
      .from("users")
      .update(updated)
      .eq("email", userDetails?.email);

    if (error) {
      console.log(error.message);
      return;
    }

    const goal = userDetails?.goal;
    const workouts = goal === "muscle_gain" ? exercises_Gain : exercises_Lose;

    const { data: workoutData, error: workoutError } = await supabase
      .from("workouts")
      .select("*")
      .eq("user_id", user?.id);

    if (workoutData && workoutData.length > 0) {
      const { data: existingData, error: exitingError } = await supabase
        .from("workouts")
        .update({ exercises: workouts, user_id: user?.id })
        .eq("user_id", user?.id);
    } else {
      const { data, error } = await supabase
        .from("workouts")
        .insert({ exercises: workouts, user_id: user?.id });
    }
    alert("Profile Updated");
    router.push("/dashboard");
  }

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-center font-bold pb-2.5">Edit Profile</h1>
      <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
        <label className="font-semibold">Name</label>
        <input
          className="border p-2 rounded"
          name="name"
          type="text"
          value={userDetails?.name ?? ""}
          onChange={handleChange}
        />
        <label className="font-semibold">age</label>
        <input
          className="border p-2 rounded"
          name="age"
          type="number"
          value={userDetails?.age ?? ""}
          onChange={handleChange}
        />
        <label className="font-semibold">Goal</label>
        <select
          name="goal"
          id=""
          className="border p-2 rounded cursor-pointer"
          value={userDetails?.goal ?? ""}
          onChange={handleChange}
        >
          <option value="">Select Your Goal</option>
          <option value="muscle_gain">Muscle Gain</option>
          <option value="fat_loss">Fat Loss</option>
        </select>
        <label htmlFor="fitness_level" className="font-semibold">
          Fitness Level
        </label>
        <select
          name="fitness_level"
          id="fitness_level"
          className="border p-2 rounded cursor-pointer"
          value={userDetails?.fitness_level ?? ""}
          onChange={handleChange}
        >
          <option value="">Select Your Fitness Level</option>
          <option value="beginner">Beginner (Up to 5 push-ups)</option>
          <option value="intermediate">Intermediate (6–20 push-ups)</option>
          <option value="advanced">Advanced (20+ push-ups)</option>
        </select>
        <label className="font-semibold">Days Per Week</label>
        <input
          className="border p-2 rounded"
          name="days_per_week"
          type="number"
          value={userDetails?.days_per_week ?? ""}
          onChange={handleChange}
        />
        <button
          type="submit"
          className="mt-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default page;
