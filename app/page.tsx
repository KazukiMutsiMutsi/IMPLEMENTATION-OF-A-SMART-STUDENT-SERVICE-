"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import LoadingScreen from "./components/LoadingScreen";

/* ── Live clock ── */
function Clock() {
  const [time, setTime] = useState("");
  const [date, setDate] = useState("");
  useEffect(() => {
    const tick = () => {
      const now = new Date();
      setTime(now.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit", second: "2-digit" }));
      setDate(now.toLocaleDateString("en-US", { weekday: "long", year: "numeric", month: "long", day: "numeric" }));
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);
  return (
    <div className="text-center">
      <div className="font-mono fw-bold fs-4 text-white animate-blink" style={{ letterSpacing: "0.05em" }}>{time}</div>
      <div className="text-white-50 small">{date}</div>
    </div>
  );
}

/* ── Announcement ticker ── */
const announcements = [
  "📢  Enrollment Period is Now Open — Deadline: June 15, 2026",
  "📋  Final Exam Schedule has been posted — Check your student portal",
  "🎓  Graduation Ceremony: June 28, 2026 at the Main Auditorium",
  "📚  Library hours extended during exam week: 7AM – 11PM",
  "💳  Student ID renewal available at the Registrar's Office",
];
function Ticker() {
  return (
    <div className="py-2 ticker-wrap" style={{ background: "rgba(225,29,72,0.85)", backdropFilter: "blur(8px)" }}>
      <div className="animate-ticker d-inline-block text-white small fw-semibold" style={{ letterSpacing: "0.02em" }}>
        {announcements.join("     ·     ")}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{announcements.join("     ·     ")}
      </div>
    </div>
  );
}

/* ── Service tiles ── */
const services = [
  { icon: "📋", label: "Enrollment",     desc: "Register for classes",  href: "/enrollment" },
  { icon: "📊", label: "Grades",         desc: "View your results",     href: "/login"       },
  { icon: "🕐", label: "Schedule",       desc: "Class timetable",       href: "/login"       },
  { icon: "💰", label: "Fees & Payments",desc: "Pay tuition & fees",    href: "/login"       },
];

export default function KioskHome() {
  const [loaded, setLoaded] = useState(false);

  return (
    <>
      {!loaded && <LoadingScreen onDone={() => setLoaded(true)} />}
      <div
        className="kiosk-bg d-flex flex-column"
        style={{ opacity: loaded ? 1 : 0, transition: "opacity 0.5s", minHeight: "100vh" }}
        suppressHydrationWarning
      >
        {/* ── Navbar ── */}
        <nav className="navbar border-bottom px-3 px-md-4 py-3 d-flex align-items-center justify-content-between flex-wrap gap-2"
          style={{ background: "rgba(15,23,42,0.85)", backdropFilter: "blur(20px)", borderColor: "rgba(255,255,255,0.1) !important" }}>
          {/* Brand */}
          <div className="d-flex align-items-center gap-3">
            <img src="/cfei-logo.jpg" alt="CFEI" className="rounded-circle" style={{ width: 40, height: 40, objectFit: "cover", border: "2px solid rgba(255,255,255,0.2)" }} />
            <div className="d-flex align-items-center justify-content-center rounded-3 text-white fw-black" style={{ width: 40, height: 40, fontSize: 16, background: "linear-gradient(135deg,#e11d48,#be123c)" }}>IN</div>
            <div>
              <div className="fw-bold text-white lh-1" style={{ fontSize: 15 }}>INFORM</div>
              <div style={{ color: "rgba(255,255,255,0.5)", fontSize: 11 }}>Cebu Far East Institute</div>
            </div>
          </div>

          {/* Clock — center on md+ */}
          <div className="d-none d-md-block"><Clock /></div>

          {/* Right actions */}
          <div className="d-flex align-items-center gap-2 gap-sm-3">
            <span className="badge d-flex align-items-center gap-1 px-2 py-2" style={{ background: "rgba(34,197,94,0.15)", border: "1px solid rgba(34,197,94,0.35)", color: "#4ade80", fontSize: 11 }}>
              <span className="rounded-circle bg-success d-inline-block" style={{ width: 7, height: 7 }} />
              System Online
            </span>
            <Link href="/admin/login" className="btn btn-sm fw-semibold" style={{ background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.15)", color: "rgba(255,255,255,0.7)", fontSize: 12 }}>
              🛡️ Admin
            </Link>
          </div>
        </nav>

        {/* ── Ticker ── */}
        <Ticker />

        {/* ── Main ── */}
        <main className="flex-grow-1 d-flex flex-column align-items-center justify-content-center px-3 py-5 gap-5">

          {/* Mobile clock */}
          <div className="d-md-none animate-fade-in"><Clock /></div>

          {/* Headline */}
          <div className="text-center animate-fade-in delay-1" style={{ maxWidth: 680 }}>
            <div className="d-flex align-items-center justify-content-center gap-2 mb-3">
              <span className="badge px-3 py-2 rounded-pill" style={{ background: "rgba(225,29,72,0.15)", border: "1px solid rgba(225,29,72,0.35)", color: "#fca5a5", fontSize: 12 }}>
                🎓 Academic Year 2025–2026
              </span>
            </div>
            <h1 className="fw-black text-white lh-sm mb-3" style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)", letterSpacing: "-1px" }}>
              Student Information<br />
              <span style={{ background: "linear-gradient(135deg, #f59e0b, #e11d48)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
                Management System
              </span>
            </h1>
            <p style={{ color: "rgba(255,255,255,0.55)", fontSize: "1.05rem", lineHeight: 1.7 }}>
              Streamlined academic management for Cebu Far East Institute.<br className="d-none d-sm-block" />
              Access your records, enrollment, and academic information in one unified platform.
            </p>
          </div>

          {/* Enrollment banner */}
          <div className="animate-fade-in delay-2 rounded-3 d-flex flex-column flex-sm-row align-items-center gap-4 px-4 py-4"
            style={{ maxWidth: 640, width: "100%", background: "rgba(245,158,11,0.08)", border: "1px solid rgba(245,158,11,0.35)", backdropFilter: "blur(10px)" }}>
            <div className="rounded-3 d-flex align-items-center justify-content-center flex-shrink-0" style={{ width: 56, height: 56, fontSize: 28, background: "linear-gradient(135deg, #f59e0b, #d97706)" }}>📋</div>
            <div className="flex-grow-1 text-center text-sm-start">
              <div className="fw-bold text-white mb-1">Enrollment Period is Now Open</div>
              <div style={{ color: "rgba(255,255,255,0.55)", fontSize: 13 }}>
                Don&apos;t miss the deadline! Enroll by <strong className="text-warning">June 15, 2026</strong>.
              </div>
            </div>
            <Link href="/enrollment" className="btn fw-bold flex-shrink-0 px-4 py-2 rounded-3"
              style={{ background: "linear-gradient(135deg, #f59e0b, #d97706)", color: "#fff", border: "none", boxShadow: "0 4px 16px rgba(245,158,11,0.4)", whiteSpace: "nowrap" }}>
              Enroll Now →
            </Link>
          </div>

          {/* Login buttons */}
          <div className="animate-fade-in delay-3 d-flex flex-column align-items-center gap-4" style={{ width: "100%", maxWidth: 560 }}>
            <p className="text-uppercase small fw-semibold mb-0" style={{ color: "rgba(255,255,255,0.35)", letterSpacing: "0.1em" }}>Select your role to continue</p>
            <div className="d-flex flex-column flex-sm-row align-items-center justify-content-center gap-4 position-relative w-100">
              {/* Glowing logo background */}
              <div style={{
                position: "absolute", top: "50%", left: "50%",
                transform: "translate(-50%, -50%)",
                width: 420, height: 420, borderRadius: "50%",
                backgroundImage: "url('/cfei-logo.jpg')",
                backgroundSize: "contain", backgroundRepeat: "no-repeat", backgroundPosition: "center",
                opacity: 0.18, zIndex: 0, pointerEvents: "none",
                animation: "glowRGB 4s ease-in-out infinite"
              }} />
              <Link href="/login" className="tap-btn text-decoration-none position-relative"
                style={{ width: 190, height: 190, background: "linear-gradient(135deg, #e11d48 0%, #be123c 50%, #9f1239 100%)", zIndex: 1 }}>
                <svg width="52" height="52" viewBox="0 0 56 56" fill="none">
                  <circle cx="28" cy="16" r="8" fill="white" />
                  <path d="M 12 32 Q 12 28 16 28 L 40 28 Q 44 28 44 32 L 44 44 Q 44 48 40 48 L 16 48 Q 12 48 12 44 Z" fill="white" />
                </svg>
                <div className="fw-bold text-white text-center" style={{ fontSize: "0.9rem", lineHeight: 1.4 }}>
                  <div>Log In as</div>
                  <div>Student</div>
                </div>
              </Link>
              <Link href="/teacher/login" className="tap-btn text-decoration-none position-relative"
                style={{ width: 190, height: 190, background: "linear-gradient(135deg, #1e293b 0%, #334155 50%, #1e293b 100%)", zIndex: 1 }}>
                <svg width="52" height="52" viewBox="0 0 56 56" fill="none">
                  <circle cx="20" cy="16" r="6" fill="white" />
                  <path d="M 10 28 Q 10 25 13 25 L 27 25 Q 30 25 30 28 L 30 40 Q 30 43 27 43 L 13 43 Q 10 43 10 40 Z" fill="white" />
                  <circle cx="40" cy="16" r="6" fill="white" />
                  <path d="M 30 28 Q 30 25 33 25 L 47 25 Q 50 25 50 28 L 50 40 Q 50 43 47 43 L 33 43 Q 30 43 30 40 Z" fill="white" />
                </svg>
                <div className="fw-bold text-white text-center" style={{ fontSize: "0.9rem", lineHeight: 1.4 }}>
                  <div>Log In as</div>
                  <div>Teacher</div>
                </div>
              </Link>
            </div>
          </div>

          {/* Quick services */}
          <div className="animate-fade-in delay-4" style={{ maxWidth: 720, width: "100%" }}>
            <p className="text-center text-uppercase small fw-semibold mb-3" style={{ color: "rgba(255,255,255,0.35)", letterSpacing: "0.1em" }}>Quick Access Services</p>
            <div className="row g-3">
              {services.map((s) => (
                <div key={s.label} className="col-6 col-sm-3">
                  <Link href={s.href} className="service-tile h-100 text-decoration-none">
                    <span style={{ fontSize: 36 }}>{s.icon}</span>
                    <span className="fw-semibold small text-dark">{s.label}</span>
                    <span className="text-muted" style={{ fontSize: 11 }}>{s.desc}</span>
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </main>

        {/* ── Footer ── */}
        <footer className="border-top px-4 py-3 d-flex flex-column flex-sm-row align-items-center justify-content-between gap-2"
          style={{ background: "rgba(15,23,42,0.7)", backdropFilter: "blur(10px)", borderColor: "rgba(255,255,255,0.08) !important" }}>
          <p style={{ color: "rgba(255,255,255,0.3)", fontSize: 12 }} className="mb-0">© 2026 Cebu Far East Institute. All rights reserved.</p>
          <div className="d-flex gap-3">
            {["Privacy Policy", "Help", "Accessibility"].map((l) => (
              <a key={l} href="#" style={{ color: "rgba(255,255,255,0.3)", fontSize: 12 }} className="text-decoration-none">{l}</a>
            ))}
          </div>
        </footer>
      </div>
    </>
  );
}
