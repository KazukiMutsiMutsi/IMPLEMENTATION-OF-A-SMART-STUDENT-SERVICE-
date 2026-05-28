"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

const TEACHER_ACCOUNTS = [
  { id: "T001", password: "Teacher@2026", name: "Maria Santos",    subject: "Mathematics" },
  { id: "T002", password: "Teacher@2026", name: "Juan Dela Cruz",  subject: "English" },
  { id: "T003", password: "Teacher@2026", name: "Ana Reyes",       subject: "Science" },
  { id: "T004", password: "Teacher@2026", name: "Carlos Fernandez", subject: "History" },
];

export default function TeacherLoginPage() {
  const router = useRouter();
  const [form, setForm]         = useState({ id: "", password: "" });
  const [loading, setLoading]   = useState(false);
  const [error, setError]       = useState("");
  const [showHint, setShowHint] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
    setError("");
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!form.id || !form.password) { setError("Please enter your Teacher ID and password."); return; }
    const match = TEACHER_ACCOUNTS.find(a => a.id === form.id && a.password === form.password);
    if (!match) { setError("Invalid Teacher ID or password. Access denied."); return; }
    setLoading(true);
    setTimeout(() => { setLoading(false); router.push("/teacher/dashboard"); }, 1000);
  }

  return (
    <div className="min-vh-100 d-flex flex-column align-items-center justify-content-center px-3 py-5 position-relative"
      style={{ background: "linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #0f172a 100%)" }}
      suppressHydrationWarning>

      <Link href="/" className="position-absolute top-0 start-0 m-3 text-decoration-none" style={{ color: "rgba(255,255,255,0.35)", fontSize: 12, transition: "color 0.2s" }}
        onMouseEnter={e => (e.currentTarget.style.color = "rgba(255,255,255,0.8)")}
        onMouseLeave={e => (e.currentTarget.style.color = "rgba(255,255,255,0.35)")}>← Back</Link>

      <div className="rounded-3 p-4 p-md-5 d-flex flex-column align-items-center gap-4" style={{ width: "100%", maxWidth: 420, background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.15)", backdropFilter: "blur(20px)" }}>

        {/* Logo */}
        <div className="d-flex flex-column align-items-center gap-2">
          <div className="d-flex align-items-center gap-3">
            <img src="/cfei-logo.jpg" alt="CFEI" className="rounded-circle" style={{ width: 56, height: 56, objectFit: "cover", border: "2px solid rgba(255,255,255,0.2)" }} />
            <div style={{ width: 1, height: 40, background: "rgba(255,255,255,0.2)" }} />
            <div className="rounded-3 d-flex align-items-center justify-content-center text-white fw-black shadow" style={{ width: 56, height: 56, fontSize: 22, background: "linear-gradient(135deg, #0f172a, #1e293b)" }}>IN</div>
          </div>
          <div className="text-white fw-bold fs-5">INFORM</div>
          <div style={{ color: "rgba(255,255,255,0.6)", fontSize: 12 }}>Cebu Far East Institute · Student Information System</div>
          <span className="badge rounded-pill d-flex align-items-center gap-1 px-3 py-2" style={{ background: "linear-gradient(135deg, rgba(225, 29, 72, 0.2), rgba(245, 158, 11, 0.2))", border: "1px solid rgba(225, 29, 72, 0.35)", color: "rgba(255,255,255,0.8)", fontSize: 12 }}>
            👨‍🏫 Teacher Access
          </span>
        </div>

        <hr className="w-100 my-0" style={{ borderColor: "rgba(255,255,255,0.1)" }} />

        <div className="text-center">
          <h1 className="text-white fw-black fs-4 mb-1">Teacher Login</h1>
          <p style={{ color: "rgba(255,255,255,0.6)", fontSize: 13 }} className="mb-0">Access your class management and grading portal</p>
        </div>

        <form onSubmit={handleSubmit} className="w-100 d-flex flex-column gap-3">
          {/* Teacher ID */}
          <div>
            <label className="form-label fw-semibold text-uppercase mb-1" style={{ color: "rgba(255,255,255,0.7)", fontSize: 11, letterSpacing: "0.08em" }}>Teacher ID</label>
            <input type="text" name="id" value={form.id} onChange={handleChange}
              placeholder="e.g., T001" autoComplete="username"
              className="form-control rounded-xl text-white"
              style={{ background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.15)", color: "#fff" }} />
            <div className="form-text" style={{ color: "rgba(255,255,255,0.4)", fontSize: 11 }}>Format: T followed by numbers</div>
          </div>

          {/* Password */}
          <div>
            <div className="d-flex justify-content-between align-items-center mb-1">
              <label className="form-label mb-0 fw-semibold text-uppercase" style={{ color: "rgba(255,255,255,0.7)", fontSize: 11, letterSpacing: "0.08em" }}>Password</label>
              <button type="button" onClick={() => setShowHint(!showHint)} className="btn btn-link btn-sm p-0" style={{ color: "rgba(245, 158, 11, 0.8)", fontSize: 12 }}>
                {showHint ? "Hide hint" : "Need a hint?"}
              </button>
            </div>
            <div className="position-relative">
              <input type={showPassword ? "text" : "password"} name="password" value={form.password} onChange={handleChange}
                placeholder="••••••••" autoComplete="current-password"
                className="form-control rounded-xl pe-5"
                style={{ background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.15)", color: "#fff" }} />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="btn btn-link position-absolute top-50 end-0 translate-middle-y pe-3 p-0"
                style={{ color: "rgba(255,255,255,0.5)", fontSize: 16, lineHeight: 1 }}
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword
                  ? <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94"/><path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19"/><line x1="1" y1="1" x2="23" y2="23"/></svg>
                  : <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
                }
              </button>
            </div>
          </div>

          {/* Hint */}
          {showHint && (
            <div className="rounded-xl p-3" style={{ background: "rgba(225, 29, 72, 0.1)", border: "1px solid rgba(225, 29, 72, 0.25)" }}>
              <p className="fw-semibold small mb-2" style={{ color: "rgba(255,255,255,0.8)" }}>Demo Teacher Accounts</p>
              {TEACHER_ACCOUNTS.map(a => (
                <div key={a.id} className="mb-2">
                  <div className="d-flex justify-content-between gap-2">
                    <span className="font-mono small" style={{ color: "rgba(245, 158, 11, 0.9)" }}>{a.id}</span>
                    <span style={{ color: "rgba(255,255,255,0.6)", fontSize: 12 }}>{a.subject}</span>
                  </div>
                  <span className="font-mono" style={{ color: "rgba(255,255,255,0.4)", fontSize: 12 }}>pw: {a.password}</span>
                </div>
              ))}
            </div>
          )}

          {/* Error */}
          {error && <div className="alert alert-danger py-2 px-3 small rounded-xl mb-0">{error}</div>}

          {/* Submit */}
          <button type="submit" disabled={loading}
            className="btn w-100 py-3 rounded-xl text-white fw-bold fs-6 mt-1 d-flex align-items-center justify-content-center gap-2"
            style={{ background: "linear-gradient(135deg, #e11d48, #be123c)", boxShadow: "0 8px 24px rgba(225, 29, 72, 0.4)", border: "none" }}>
            {loading ? (<><span className="spinner-border spinner-border-sm" />Signing in...</>) : "Access Teacher Portal"}
          </button>
        </form>

        <p className="text-center mb-0" style={{ color: "rgba(255,255,255,0.3)", fontSize: 12 }}>
          Student?{" "}
          <Link href="/login" className="text-decoration-none" style={{ color: "rgba(245, 158, 11, 0.8)" }}>Go to Student Login</Link>
        </p>
      </div>

      <p className="mt-4" style={{ color: "rgba(255,255,255,0.2)", fontSize: 12 }}>© 2026 Cebu Far East Institute. All rights reserved.</p>
    </div>
  );
}
