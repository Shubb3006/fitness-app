"use client";
import React, { useState } from "react";
import { useAuthStore } from "@/store/useAutjStore";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Eye, EyeClosed, EyeClosedIcon, EyeOff, Loader2 } from "lucide-react";

const Signin = () => {
  const router = useRouter();
  const { signin, isSigningIn } = useAuthStore();
  const [showPassword, setShowPassword] = useState(false);
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
        <h2 className="text-2xl font-bold text-center mb-3">Log In</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-sm font-medium ">
              <input
                type="email"
                className="input input-bordered w-full mt-1 focus:outline-none focus:ring-2 focus:ring-black"
                placeholder="Enter your Email"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
              />
            </label>
          </div>

          {/* Password */}
          <div>
            <label className="text-sm font-medium relative ">
              <input
                type={showPassword ? "text" : "password"}
                className="input input-bordered w-full mt-1 focus:outline-none focus:ring-2 focus:ring-black"
                placeholder="Enter your password"
                value={formData.password}
                onChange={(e) =>
                  setFormData({ ...formData, password: e.target.value })
                }
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-0 cursor-pointer"
              >
                {showPassword ? <EyeOff className="" /> : <Eye className="" />}
              </button>
            </label>
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
          <button
            disabled={isSigningIn}
            className="btn btn-neutral w-full mt-2 hover:scale-[1.02] transition"
          >
            {isSigningIn ? <Loader2 className="animate-spin" /> : " Sign in"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Signin;
