"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

const STUDENT_ACCOUNTS = [
  { id: "202400001", password: "jamie123", name: "Jamie Santos",    course: "BSCS Year 2" },
  { id: "202400002", password: "maria456", name: "Maria Reyes",     course: "BSED Year 1" },
  { id: "202400003", password: "carlo789", name: "Carlo Dela Cruz", course: "BSBA Year 3" },
  { id: "202400004", password: "ana2024",  name: "Ana Villanueva",  course: "BSN Year 2"  },
  { id: "202400005", password: "luis2024", name: "Luis Fernandez",  course: "BSCS Year 4" },
];

/* ── JOBERT AI Chat ── */
type Msg = { role: "ai" | "user"; text: string; feedback?: "up" | "down" | null };

const SUGGESTIONS = ["How do I log in?","I forgot my password","Show demo accounts","What is my GWA?","Enrollment deadline","Contact info"];

function AIChat() {
  const [open, setOpen]     = useState(false);
  const [msgs, setMsgs]     = useState<Msg[]>([{ role: "ai", text: "Hi! I am JOBERT, the INFORM Assistant.\n\nI can help you with logging in, grades, schedule, tuition, library, enrollment, and more.\n\nWhat do you need help with?" }]);
  const [input, setInput]   = useState("");
  const [typing, setTyping] = useState(false);
  const [showDot, setShowDot] = useState(true);
  const bottomRef           = useRef<HTMLDivElement>(null);

  useEffect(() => { bottomRef.current?.scrollIntoView({ behavior: "smooth" }); }, [msgs, typing]);

  function send(text: string) {
    if (!text.trim()) return;
    const userMsg: Msg = { role: "user", text: text.trim() };
    const newMsgs = [...msgs, userMsg];
    setMsgs(newMsgs);
    setInput("");
    setTyping(true);
    fetch("/api/jobert", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message: text.trim(), history: newMsgs.slice(-6).map(m => ({ role: m.role, text: m.text })) }),
    })
      .then(r => r.json())
      .then(d => setMsgs(prev => [...prev, { role: "ai", text: d.reply ?? "Sorry, I could not respond.", feedback: null }]))
      .catch(() => setMsgs(prev => [...prev, { role: "ai", text: "I am having trouble connecting. Please try again.", feedback: null }]))
      .finally(() => setTyping(false));
  }

  function setFeedback(idx: number, val: "up" | "down") {
    setMsgs(prev => prev.map((m, i) => i === idx ? { ...m, feedback: val } : m));
  }

  return (
    <>
      <button className="chat-fab" onClick={() => setOpen(!open)} aria-label="Open AI Assistant">
        {open
          ? <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" width="22" height="22"><path d="M18 6L6 18M6 6l12 12"/></svg>
          : <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" width="26" height="26"><path d="M12 2a10 10 0 0 1 10 10c0 5.52-4.48 10-10 10a9.96 9.96 0 0 1-5.06-1.37L2 22l1.37-4.94A9.96 9.96 0 0 1 2 12 10 10 0 0 1 12 2z"/><path d="M8 10h.01M12 10h.01M16 10h.01" strokeLinecap="round"/></svg>
        }
        {!open && showDot && (
          <span 
            className="position-absolute top-0 end-0 rounded-circle bg-success border border-white" 
            style={{ width: 13, height: 13, cursor: 'pointer' }}
            onClick={(e) => {
              e.stopPropagation();
              setShowDot(false);
            }}
          />
        )}
      </button>

      {open && (
        <div className="chat-panel">
          {/* header */}
          <div className="px-4 py-3 d-flex align-items-center gap-3 flex-shrink-0" style={{ background: "linear-gradient(135deg,#1e40af,#dc2626)" }}>
            <div className="rounded-circle overflow-hidden flex-shrink-0 border border-white border-opacity-50" style={{ width: 36, height: 36 }}>
              <img src="/jobert-avatar.png" alt="JOBERT" style={{ width: 36, height: 36, objectFit: "cover", objectPosition: "center top" }} />
            </div>
            <div className="flex-grow-1">
              <div className="text-white fw-bold small">JOBERT</div>
              <div className="text-white-50" style={{ fontSize: 11 }}>Powered by Zoilo Tomaquin · BC Assistant</div>
            </div>
            <span className="badge bg-success-subtle text-success border border-success-subtle d-flex align-items-center gap-1" style={{ fontSize: 10 }}>
              <span className="rounded-circle bg-success d-inline-block" style={{ width: 6, height: 6 }} />Online
            </span>
          </div>

          {/* messages */}
          <div className="flex-grow-1 overflow-auto p-3 d-flex flex-column gap-2" style={{ background: "#f8fafc" }}>
            {msgs.map((m, i) => (
              <div key={i} className={`d-flex gap-2 ${m.role === "user" ? "flex-row-reverse" : ""}`}>
                {m.role === "ai" && (
                  <div className="rounded-circle overflow-hidden flex-shrink-0" style={{ width: 28, height: 28, marginTop: 2 }}>
                    <img src="/jobert-avatar.png" alt="JOBERT" style={{ width: 28, height: 28, objectFit: "cover", objectPosition: "center top" }} />
                  </div>
                )}
                <div className="d-flex flex-column gap-1" style={{ maxWidth: "80%" }}>
                  <div className={`rounded-3 px-3 py-2 small lh-base ${m.role === "ai" ? "bg-white border text-dark shadow-sm" : "bg-primary text-white"}`} style={{ whiteSpace: "pre-line", borderRadius: m.role === "ai" ? "0 1rem 1rem 1rem" : "1rem 0 1rem 1rem" }}>
                    {m.text}
                  </div>
                  {m.role === "ai" && i > 0 && (
                    <div className="d-flex gap-1 ms-1">
                      <button onClick={() => setFeedback(i, "up")} className={`btn btn-sm py-0 px-1 border-0 ${m.feedback === "up" ? "text-success" : "text-secondary"}`} style={{ fontSize: 13 }}>👍</button>
                      <button onClick={() => setFeedback(i, "down")} className={`btn btn-sm py-0 px-1 border-0 ${m.feedback === "down" ? "text-danger" : "text-secondary"}`} style={{ fontSize: 13 }}>👎</button>
                      {m.feedback === "up" && <span className="text-muted" style={{ fontSize: 10, alignSelf: "center" }}>Glad that helped!</span>}
                      {m.feedback === "down" && <span className="text-muted" style={{ fontSize: 10, alignSelf: "center" }}>Thanks, we will improve this.</span>}
                    </div>
                  )}
                </div>
              </div>
            ))}
            {typing && (
              <div className="d-flex gap-2">
                <div className="rounded-circle overflow-hidden flex-shrink-0" style={{ width: 28, height: 28 }}>
                  <img src="/jobert-avatar.png" alt="JOBERT" style={{ width: 28, height: 28, objectFit: "cover", objectPosition: "center top" }} />
                </div>
                <div className="bg-white border rounded-3 px-3 py-2 d-flex gap-1 align-items-center shadow-sm">
                  {[0, 150, 300].map(d => <span key={d} className="rounded-circle bg-primary" style={{ width: 6, height: 6, display: "inline-block", animation: `blink 1s ${d}ms infinite` }} />)}
                </div>
              </div>
            )}
            <div ref={bottomRef} />
          </div>

          {/* suggestions */}
          <div className="px-3 py-2 d-flex gap-2 overflow-auto flex-shrink-0 bg-white border-top" style={{ flexWrap: "nowrap" }}>
            {SUGGESTIONS.map(s => (
              <button key={s} onClick={() => send(s)} className="btn btn-sm btn-outline-primary flex-shrink-0" style={{ fontSize: 11, whiteSpace: "nowrap" }}>{s}</button>
            ))}
          </div>

          {/* input */}
          <div className="px-3 pb-3 pt-2 d-flex gap-2 flex-shrink-0 bg-white">
            <input value={input} onChange={e => setInput(e.target.value)} onKeyDown={e => e.key === "Enter" && send(input)}
              placeholder="Ask me anything about INFORM..."
              className="form-control form-control-sm" />
            <button onClick={() => send(input)} disabled={!input.trim() || typing} className="btn btn-primary btn-sm px-2">
              <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" width="16" height="16"><path d="M22 2L11 13M22 2L15 22l-4-9-9-4 20-7z"/></svg>
            </button>
          </div>
        </div>
      )}
    </>
  );
}

/* ── Login Page ── */
export default function LoginPage() {
  const router = useRouter();
  const [form, setForm]           = useState({ id: "", password: "" });
  const [loading, setLoading]     = useState(false);
  const [error, setError]         = useState("");
  const [showHint, setShowHint]   = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;
    setForm({ ...form, [name]: name === "id" ? value.replace(/\D/g, "") : value });
    setError("");
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!form.id || !form.password) { setError("Please enter your Student ID and password."); return; }
    const match = STUDENT_ACCOUNTS.find(a => a.id === form.id && a.password === form.password);
    if (!match) { setError("Invalid Student ID or password. Please try again."); return; }
    setLoading(true);
    setTimeout(() => { setLoading(false); router.push("/dashboard"); }, 1000);
  }

  return (
    <div className="kiosk-bg d-flex flex-column align-items-center justify-content-center px-3 py-5 position-relative" suppressHydrationWarning>
      <Link href="/" className="position-absolute top-0 start-0 m-3 text-decoration-none" style={{ color: "rgba(100,116,139,0.45)", fontSize: 12, transition: "color 0.2s" }}
        onMouseEnter={e => (e.currentTarget.style.color = "rgba(100,116,139,0.85)")}
        onMouseLeave={e => (e.currentTarget.style.color = "rgba(100,116,139,0.45)")}>← Back</Link>

      <div className="glass rounded-3 p-4 p-md-5 d-flex flex-column align-items-center gap-4 shadow" style={{ width: "100%", maxWidth: 400 }}>

        {/* Logo */}
        <div className="d-flex flex-column align-items-center gap-2">
          <div className="d-flex align-items-center gap-3">
            <img src="/cfei-logo.jpg" alt="CFEI" className="rounded-circle border" style={{ width: 56, height: 56, objectFit: "cover" }} />
            <div className="vr" />
            <div className="rounded-3 bg-primary d-flex align-items-center justify-content-center text-white fw-black shadow" style={{ width: 56, height: 56, fontSize: 22 }}>IN</div>
          </div>
          <div className="fw-bold fs-5 text-dark">INFORM</div>
          <div className="text-muted" style={{ fontSize: 12 }}>Cebu Far East Institute · Student Information System</div>
        </div>

        <hr className="w-100 my-0" />

        <div className="text-center">
          <h1 className="fw-black fs-4 text-dark mb-1">Student Login</h1>
          <p className="text-muted small mb-0">Enter your credentials to access your portal</p>
        </div>

        <form onSubmit={handleSubmit} className="w-100 d-flex flex-column gap-3">
          {/* Student ID */}
          <div>
            <label className="form-label text-muted fw-semibold text-uppercase" style={{ fontSize: 11, letterSpacing: "0.08em" }}>Student ID</label>
            <input type="text" name="id" value={form.id} onChange={handleChange}
              onKeyDown={e => { const ok = ["Backspace","Delete","Tab","ArrowLeft","ArrowRight","Home","End"]; if (!ok.includes(e.key) && !/^\d$/.test(e.key)) e.preventDefault(); }}
              inputMode="numeric" maxLength={12} placeholder="e.g. 202400001" autoComplete="username"
              className="form-control rounded-xl" />
            <div className="form-text">Numbers only · max 12 digits</div>
          </div>

          {/* Password */}
          <div>
            <div className="d-flex justify-content-between align-items-center mb-1">
              <label className="form-label mb-0 text-muted fw-semibold text-uppercase" style={{ fontSize: 11, letterSpacing: "0.08em" }}>Password</label>
              <button type="button" onClick={() => setShowHint(!showHint)} className="btn btn-link btn-sm p-0 text-primary" style={{ fontSize: 12 }}>
                {showHint ? "Hide hint" : "Need a hint?"}
              </button>
            </div>
            <div className="position-relative">
              <input type={showPassword ? "text" : "password"} name="password" value={form.password} onChange={handleChange}
                placeholder="••••••••" autoComplete="current-password" className="form-control rounded-xl pe-5" />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="btn btn-link position-absolute top-50 end-0 translate-middle-y pe-3 p-0 text-muted"
                style={{ fontSize: 16, lineHeight: 1 }}
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
            <div className="rounded-3 mb-0 overflow-hidden" style={{ background: "rgba(241,245,249,0.8)", border: "1px solid rgba(148,163,184,0.25)", animation: "fadeInUp 0.2s ease-out" }}>
              <div className="px-3 py-2 border-bottom" style={{ borderColor: "rgba(148,163,184,0.2) !important" }}>
                <span className="text-muted" style={{ fontSize: 11, letterSpacing: "0.06em" }}>DEMO ACCOUNTS</span>
              </div>
              <div className="px-3 py-2 d-flex flex-column gap-1">
                {STUDENT_ACCOUNTS.map(a => (
                  <div key={a.id} className="d-flex justify-content-between gap-2" style={{ fontSize: 11 }}>
                    <span className="font-mono text-secondary">{a.id}</span>
                    <span className="font-mono text-muted">{a.password}</span>
                    <span className="text-muted text-truncate d-none d-sm-block">{a.name}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Error */}
          {error && <div className="alert alert-danger py-2 px-3 small rounded-xl mb-0">{error}</div>}

          {/* Submit */}
          <button type="submit" disabled={loading} className="btn btn-inform w-100 py-3 rounded-xl fw-bold fs-6 mt-1 d-flex align-items-center justify-content-center gap-2">
            {loading ? (<><span className="spinner-border spinner-border-sm" />Signing in...</>) : "Access Portal"}
          </button>
        </form>

        <p className="text-muted small text-center mb-0">
          Need help?{" "}
          <a href="#" className="text-primary text-decoration-none">Contact the Registrar&apos;s Office</a>
        </p>
      </div>

      <p className="text-muted small mt-4">© 2026 Cebu Far East Institute. All rights reserved.</p>
      <AIChat />
    </div>
  );
}
