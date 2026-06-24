"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const supabase = createClient();
    const { error: signInError } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (signInError) {
      setError("Invalid email or password");
      setLoading(false);
      return;
    }

    router.push("/admin");
    router.refresh();
  };

  return (
    <div className="min-h-screen bg-(--color-dark) flex items-center justify-center px-8">
      <div className="w-full max-w-2xl">
        {/* Monogram */}
        <div className="text-center mb-[4.8rem]">
          <p className="font-serif italic text-[4.8rem] text-(--color-gold) leading-none mb-[1.2rem]">
            A ♡ O
          </p>
          <p className="text-[1rem] sm:text-[1.3rem] tracking-[0.24em] uppercase text-(--color-text-muted)">
            Coordinator Login
          </p>
        </div>

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-[2.4rem] border-[0.5px] border-(--color-gold-dim) p-[3.6rem]"
        >
          {error && (
            <div className="px-[1.6rem] py-[1.2rem] border-[0.5px] border-red-700 bg-red-950/30">
              <p className="text-[1.3rem] text-red-400">{error}</p>
            </div>
          )}

          <div>
            <label className="block text-[1rem] tracking-[0.2em] uppercase text-(--color-text-muted) font-medium mb-[0.8rem]">
              Email
            </label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-transparent border-b-[0.5px] border-(--color-gold-dim) px-0 py-[1.2rem] font-serif text-[1.6rem] text-(--color-text-inverse) focus:outline-none focus:border-(--color-gold) transition-colors duration-300"
            />
          </div>

          <div>
            <label className="block text-[1rem] tracking-[0.2em] uppercase text-(--color-text-muted) font-medium mb-[0.8rem]">
              Password
            </label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-transparent border-b-[0.5px] border-(--color-gold-dim) px-0 py-[1.2rem] font-serif text-[1.6rem] text-(--color-text-inverse) focus:outline-none focus:border-(--color-gold) transition-colors duration-300"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="mt-[1.2rem] py-[1.4rem] bg-(--color-gold) text-(--color-dark) font-sans text-[1.1rem] font-medium tracking-[0.2em] uppercase transition-all duration-300 hover:bg-(--color-brown) disabled:opacity-50 cursor-pointer hover:text-(--color-text-inverse)"
          >
            {loading ? "Signing in..." : "Sign In"}
          </button>
        </form>
      </div>
    </div>
  );
}
