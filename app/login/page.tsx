"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();
  const [form, setForm] = useState({ id: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError("");
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!form.id || !form.password) {
      setError("Please enter your Student ID and password.");
      return;
    }
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      router.push("/dashboard");
    }, 1200);
  }

  return (
    <div className="min-h-screen kiosk-bg flex flex-col items-center justify-center px-4 py-10" suppressHydrationWarning>

      {/* back */}
      <Link
        href="/"
        className="absolute top-5 left-5 flex items-center gap-2 text-slate-400 hover:text-slate-700 text-sm transition-colors"
      >
        ← Back to Kiosk
      </Link>

      {/* card */}
      <div className="w-full max-w-sm glass rounded-3xl p-8 flex flex-col items-center gap-6 animate-fade-in shadow-xl shadow-blue-100">

        {/* logo */}
        <div className="flex flex-col items-center gap-2">
          <div className="w-16 h-16 rounded-2xl bg-blue-600 flex items-center justify-center text-white font-extrabold text-2xl shadow-lg shadow-blue-200">
            IN
          </div>
          <div className="text-slate-800 font-bold text-xl tracking-tight">INFORM</div>
          <div className="text-slate-400 text-xs">Student Information System</div>
        </div>

        <div className="w-full h-px bg-slate-100" />

        <div className="text-center">
          <h1 className="text-slate-800 font-extrabold text-2xl">Student Login</h1>
          <p className="text-slate-400 text-sm mt-1">Enter your credentials to access your portal</p>
        </div>

        <form onSubmit={handleSubmit} className="w-full flex flex-col gap-4">
          {/* Student ID */}
          <div className="flex flex-col gap-1.5">
            <label className="text-slate-500 text-xs font-semibold uppercase tracking-widest">
              Student ID
            </label>
            <input
              type="text"
              name="id"
              value={form.id}
              onChange={handleChange}
              placeholder="e.g. STU-2024-00123"
              className="bg-white border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 rounded-xl px-4 py-3 text-slate-800 placeholder-slate-300 text-sm outline-none transition shadow-sm"
            />
          </div>

          {/* Password */}
          <div className="flex flex-col gap-1.5">
            <div className="flex items-center justify-between">
              <label className="text-slate-500 text-xs font-semibold uppercase tracking-widest">
                Password
              </label>
              <a href="#" className="text-blue-500 hover:text-blue-600 text-xs transition-colors">
                Forgot password?
              </a>
            </div>
            <input
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              placeholder="••••••••"
              className="bg-white border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 rounded-xl px-4 py-3 text-slate-800 placeholder-slate-300 text-sm outline-none transition shadow-sm"
            />
          </div>

          {/* error */}
          {error && (
            <div className="bg-red-50 border border-red-200 rounded-xl px-4 py-2.5 text-red-500 text-xs">
              {error}
            </div>
          )}

          {/* submit */}
          <button
            type="submit"
            disabled={loading}
            className="tap-btn w-full py-3.5 rounded-xl text-white font-bold text-base mt-1 flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {loading ? (
              <>
                <span className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" />
                Signing in...
              </>
            ) : (
              "Access Portal →"
            )}
          </button>
        </form>

        {/* divider */}
        <div className="flex items-center gap-3 w-full">
          <div className="flex-1 h-px bg-slate-100" />
          <span className="text-slate-300 text-xs">or</span>
          <div className="flex-1 h-px bg-slate-100" />
        </div>

        {/* social */}
        <div className="grid grid-cols-2 gap-3 w-full">
          {[
            { label: "Google Account", icon: "G" },
            { label: "Microsoft SSO", icon: "M" },
          ].map((s) => (
            <button
              key={s.label}
              className="flex items-center justify-center gap-2 bg-white hover:bg-slate-50 border border-slate-200 rounded-xl py-2.5 text-slate-500 hover:text-slate-700 text-xs font-medium transition-all shadow-sm"
            >
              <span className="w-5 h-5 rounded-full bg-slate-100 flex items-center justify-center text-xs font-bold text-slate-600">
                {s.icon}
              </span>
              {s.label}
            </button>
          ))}
        </div>

        <p className="text-slate-400 text-xs text-center">
          Need help?{" "}
          <a href="#" className="text-blue-500 hover:text-blue-600 transition-colors">
            Contact the Registrar&apos;s Office
          </a>
        </p>
      </div>

      <p className="text-slate-400 text-xs mt-6">© 2026 INFORM University. All rights reserved.</p>
    </div>
  );
}
