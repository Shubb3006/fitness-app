"use client";
import React, { useState } from "react";
import { useAuthStore } from "@/store/useAutjStore";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";

const signin = () => {
  const router = useRouter();
  const { signin,isSigningIn } = useAuthStore();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  async function handleSubmit(e) {
    e.preventDefault();
    console.log(formData);

    const success = await signin(formData);
    if (success) router.push("/dashboard");
  }
  return (
    <div className="min-h-screen flex items-center justify-center bg-base-200 px-4">
      <div className="w-full max-w-md bg-base-100 rounded-2xl shadow-xl p-8">
        <h2 className="text-2xl font-bold text-center">Log In</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
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
          <p className="text-sm text-gray-500 text-center">
            New user?{" "}
            <Link
              href="/signup"
              className="text-blue-500 font-medium hover:underline"
            >
              Sign Up
            </Link>
          </p>
          <button disabled={isSigningIn} className="btn btn-neutral w-full mt-2 hover:scale-[1.02] transition">
           {isSigningIn?<Loader2 className="animate-spin"/>:" Sign in"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default signin;
