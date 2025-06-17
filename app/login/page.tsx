"use client";
import { useUser } from "@/context/UserContext";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";

export default function page() {
  const router = useRouter();
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [isLogin, setIsLogin] = useState<boolean>(true);
  const [message, setMessage] = useState<string>("");
  const [error, setError] = useState<boolean>(false);

  const { user, setUser } = useUser();
  useEffect(() => {
    const fetchUser = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (session) {
        setUser(session.user);
        router.push("/dashboard");
      }
    };
    fetchUser();
  }, []);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (isLogin) {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      if (error) {
        setMessage(error.message);
        setError(true);
      } else {
        const user = data.user;
        setUser(user);
        setMessage("Login successful");
        setError(false);
        router.push("/dashboard");
      }
    } else {
      console.log(email);
      const { data: existingUser, error } = await supabase
        .from("users")
        .select("*")
        .eq("email", email.toLowerCase());
      if (existingUser && existingUser.length > 0) {
        setMessage("User already exists.");
        setError(true);
        return;
      }

      const { data: signUpData, error: signUpError } =
        await supabase.auth.signUp({
          email,
          password,
        });

      if (signUpError || !signUpData.user) {
        setMessage(signUpError?.message || "Signup failed");
        setError(true);
        return;
      }
      const newUser = signUpData.user;

      // Insert user profile into 'users' table
      const { error: insertError } = await supabase.from("users").insert([
        {
          id: newUser.id,
          name: name.toLowerCase(),
          email: newUser.email?.toLowerCase(),
        },
      ]);
      if (insertError) {
        setMessage(insertError.message);
        setError(true);
        return;
      }

      setUser(newUser);
      setError(false);
      setMessage("Signup successful. Please check your email to confirm.");
      router.push("/dashboard");

      setName("");
      setEmail("");
      setPassword("");
    }
  }
  return (
    <div className="items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)] bg-gray-50">
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-lg rounded-xl p-8 w-full max-w-md flex flex-col gap-4"
      >
        {!isLogin && (
          <>
            <label htmlFor="name" className="text-sm font-medium text-gray-700">
              Name
            </label>
            <input
              id="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="px-3 py-2 border rounded-md border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </>
        )}

        <label htmlFor="email" className="text-sm font-medium text-gray-700">
          Email
        </label>
        <input
          id="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="px-3 py-2 border rounded-md border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <label htmlFor="password" className="text-sm font-medium text-gray-700">
          Password
        </label>
        <input
          id="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="px-3 py-2 border rounded-md border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <button
          type="submit"
          className="mt-4 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition"
        >
          {isLogin ? "Login" : "Signup"}
        </button>

        <button
          type="button"
          onClick={() => setIsLogin(!isLogin)}
          className="text-sm text-blue-600 mt-2 hover:underline"
        >
          {isLogin
            ? "Need an account? Sign up"
            : "Already have an account? Log in"}
        </button>
        {message && (
          <p
            className={
              error ? `text-red-500 text-center` : `text-green-400 text-center`
            }
          >
            {message}
          </p>
        )}
      </form>
    </div>
  );
}
