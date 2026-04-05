"use client";
import React, { useState } from "react";
import { useAuthStore } from "@/store/useAutjStore";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";

const Signup = () => {
  const router = useRouter();
  const { signup, isSigningUp } = useAuthStore();
  const [formData, setFormData] = useState({
    email: "",
    name: "",
    password: "",
  });

  async function handleSubmit(e) {
    e.preventDefault();

    const success = await signup(formData);
    if (success) router.push("/dashboard");
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-base-200 px-4">
      <div className="w-full max-w-md bg-base-100 rounded-2xl shadow-xl p-8">
        {/* Heading */}
        <h2 className="text-2xl font-bold text-center ">Create Account 🚀</h2>
        <p className="text-sm  text-center mt-1 mb-6">
          Start your fitness journey today
        </p>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Email */}
          <div>
            <label className="text-sm font-medium ">Email</label>
            <input
              type="email"
              className="input input-bordered w-full mt-1 focus:outline-none focus:ring-2 focus:ring-black"
              placeholder="Enter your email"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
            />
          </div>

          {/* Name */}
          <div>
            <label className="text-sm font-medium ">Name</label>
            <input
              type="text"
              className="input input-bordered w-full mt-1 focus:outline-none focus:ring-2 focus:ring-black"
              placeholder="Enter your name"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
            />
          </div>

          {/* Password */}
          <div>
            <label className="text-sm font-medium">Password</label>
            <input
              type="password"
              className="input input-bordered w-full mt-1 focus:outline-none focus:ring-2 focus:ring-black"
              placeholder="Enter your password"
              value={formData.password}
              onChange={(e) =>
                setFormData({ ...formData, password: e.target.value })
              }
            />
          </div>

          {/* Link */}
          <p className="text-sm text-gray-500 text-center">
            Already a user?{" "}
            <Link
              href="/signin"
              className="text-blue-500 font-medium hover:underline"
            >
              Sign in
            </Link>
          </p>

          {/* Button */}
          <button
            disabled={isSigningUp}
            className="btn btn-neutral w-full mt-2 hover:scale-[1.02] transition"
          >
            {isSigningUp ? <Loader2 className="animate-spin" /> : "Signup"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Signup;
