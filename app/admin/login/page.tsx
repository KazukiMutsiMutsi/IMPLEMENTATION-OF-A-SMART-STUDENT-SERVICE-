"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

/* -- static admin accounts -- */
const ADMIN_ACCOUNTS = [
  { username: "admin@inform.edu",     password: "Admin@2026", name: "System Administrator", role: "Super Admin" },
  { username: "registrar@inform.edu", password: "Reg@2026",   name: "Registrar Office",     role: "Registrar"   },
  { username: "dean@inform.edu",      password: "Dean@2026",  name: "Dean of Students",     role: "Dean"        },
];

export default function AdminLoginPage() {
  const router = useRouter();
  const [form, setForm]         = useState({ username: "", password: "" });
  const [loading, setLoading]   = useState(false);
  const [error, setError]       = useState("");
  const [showHint, setShowHint] = useState(false);

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError("");
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!form.username || !form.password) {
      setError("Please enter your username and password.");
      return;
    }
    const match = ADMIN_ACCOUNTS.find(
      a => a.username === form.username && a.password === form.password
    );
    if (!match) {
      setError("Invalid credentials. Access denied.");
      return;
    }
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      router.push("/admin/dashboard");
    }, 1000);
  }

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center px-4 py-10"
      style={{ background: "linear-gradient(135deg, #1e1b4b 0%, #312e81 50%, #1e1b4b 100%)" }}
      suppressHydrationWarning
    >
      {/* back link */}
      <Link
        href="/"
        className="absolute top-5 left-5 flex items-center gap-2 text-indigo-300 hover:text-white text-sm transition-colors"
      >
        &larr; Back to Kiosk
      </Link>

      {/* card */}
      <div
        className="w-full max-w-sm rounded-3xl p-8 flex flex-col items-center gap-6"
        style={{
          background: "rgba(255,255,255,0.07)",
          border: "1px solid rgba(255,255,255,0.12)",
          backdropFilter: "blur(16px)",
        }}
      >
        {/* logo */}
        <div className="flex flex-col items-center gap-3">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white font-extrabold text-2xl shadow-lg">
            IN
          </div>
          <div className="text-white font-bold text-xl tracking-tight">INFORM</div>
          <div className="flex items-center gap-2 bg-indigo-500/20 border border-indigo-400/30 rounded-full px-4 py-1.5">
            <span className="text-sm">&#128737;</span>
            <span className="text-indigo-300 text-xs font-semibold tracking-wide">Administrator Access</span>
          </div>
        </div>

        <div className="w-full h-px bg-white/10" />

        {/* heading */}
        <div className="text-center">
          <h1 className="text-white font-extrabold text-2xl">Admin Login</h1>
          <p className="text-indigo-300 text-sm mt-1">Restricted to authorized personnel only</p>
        </div>

        {/* form */}
        <form onSubmit={handleSubmit} className="w-full flex flex-col gap-4">

          {/* username */}
          <div className="flex flex-col gap-1.5">
            <label className="text-indigo-300 text-xs font-semibold uppercase tracking-widest">
              Username
            </label>
            <input
              type="text"
              name="username"
              value={form.username}
              onChange={handleChange}
              placeholder="admin@inform.edu"
              autoComplete="username"
              className="rounded-xl px-4 py-3 text-white placeholder-white/30 text-sm outline-none transition focus:ring-2 focus:ring-indigo-500/50"
              style={{ background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.15)" }}
            />
          </div>

          {/* password */}
          <div className="flex flex-col gap-1.5">
            <div className="flex items-center justify-between">
              <label className="text-indigo-300 text-xs font-semibold uppercase tracking-widest">
                Password
              </label>
              <button
                type="button"
                onClick={() => setShowHint(!showHint)}
                className="text-indigo-400 hover:text-indigo-200 text-xs transition-colors"
              >
                {showHint ? "Hide hint" : "Need a hint?"}
              </button>
            </div>
            <input
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              placeholder="••••••••"
              autoComplete="current-password"
              className="rounded-xl px-4 py-3 text-white placeholder-white/30 text-sm outline-none transition focus:ring-2 focus:ring-indigo-500/50"
              style={{ background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.15)" }}
            />
          </div>

          {/* hint box */}
          {showHint && (
            <div
              className="rounded-xl px-4 py-3"
              style={{ background: "rgba(99,102,241,0.15)", border: "1px solid rgba(99,102,241,0.35)" }}
            >
              <p className="font-semibold text-indigo-300 text-xs mb-2">Demo Admin Accounts</p>
              <div className="flex flex-col gap-2">
                {ADMIN_ACCOUNTS.map(a => (
                  <div key={a.username} className="flex flex-col gap-0.5">
                    <div className="flex items-center justify-between gap-2">
                      <span className="font-mono text-indigo-300 text-xs">{a.username}</span>
                      <span className="text-white/40 text-xs shrink-0">{a.role}</span>
                    </div>
                    <span className="font-mono text-white/50 text-xs">pw: {a.password}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* error */}
          {error && (
            <div className="bg-red-500/10 border border-red-500/30 rounded-xl px-4 py-2.5 text-red-400 text-xs">
              {error}
            </div>
          )}

          {/* submit */}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-3.5 rounded-xl text-white font-bold text-base mt-1 flex items-center justify-center gap-2 disabled:opacity-60 transition-all hover:opacity-90"
            style={{
              background: "linear-gradient(135deg, #6366f1, #7c3aed)",
              boxShadow: "0 8px 24px rgba(99,102,241,0.4)",
            }}
          >
            {loading ? (
              <>
                <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                Signing in...
              </>
            ) : (
              "Access Admin Panel"
            )}
          </button>
        </form>

        <p className="text-white/30 text-xs text-center">
          Student?{" "}
          <Link href="/login" className="text-indigo-400 hover:text-indigo-300 transition-colors">
            Go to Student Login
          </Link>
        </p>
      </div>

      <p className="text-white/20 text-xs mt-6">
        &copy; 2026 INFORM University. All rights reserved.
      </p>
    </div>
  );
}
