"use client";
import { useUser } from "@/context/UserContext";
import Link from "next/link";
import { supabase } from "@/lib/supabase";
import { useEffect, useState } from "react";
// /pages/index.tsx
export default function Home() {
  const { user, userDetails, setUserDetails } = useUser();
  const [email, setEmail] = useState();
  console.log(user?.email);
  useEffect(() => {
    // if (!user?.email) return;

    async function fetchUserData() {
      const { data, error } = await supabase
        .from("users")
        .select("email")
        .eq("email", user?.email?.toLowerCase());
      if (error) {
        console.error("Error fetching email:", error.message);
      } else if (data && data.length > 0) {
        setEmail(data[0].email);
      }
    }

    fetchUserData();
  }, []);
  useEffect(() => {
    if (email) {
      console.log("Fetched email:", email);
    }
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6 text-center bg-white text-gray-900">
      <h1 className="text-4xl md:text-5xl font-bold mb-4">Welcome to FitGen</h1>
      <p className="text-lg md:text-xl mb-6">
        Your Personalized Workout Planner
      </p>
      <Link
        href="/login"
        className="bg-blue-600 text-white px-6 py-3 rounded-full hover:bg-blue-700 transition"
      >
        Get Started
      </Link>
    </div>
  );
}
