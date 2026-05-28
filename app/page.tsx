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
      <div className="font-mono fw-bold fs-3 text-inform animate-blink">{time}</div>
      <div className="text-muted small">{date}</div>
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
    <div className="bg-primary py-2 ticker-wrap">
      <div className="animate-ticker d-inline-block text-white small fw-semibold">
        {announcements.join("     ·     ")}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{announcements.join("     ·     ")}
      </div>
    </div>
  );
}

/* ── Service tile ── */
const services = [
  { 
    icon: (
      <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M 8 12 L 20 4 L 32 12 L 32 28 Q 32 32 28 32 L 12 32 Q 8 32 8 28 Z" fill="#e11d48" stroke="#e11d48" strokeWidth="1.5"/>
        <rect x="14" y="20" width="12" height="12" fill="white"/>
      </svg>
    ),
    label: "Enrollment",
    desc: "Register for classes"
  },
  { 
    icon: (
      <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="6" y="8" width="28" height="24" rx="2" fill="none" stroke="#f59e0b" strokeWidth="2"/>
        <line x1="6" y1="16" x2="34" y2="16" stroke="#f59e0b" strokeWidth="2"/>
        <line x1="14" y1="20" x2="14" y2="28" stroke="#f59e0b" strokeWidth="2"/>
        <line x1="20" y1="20" x2="20" y2="28" stroke="#f59e0b" strokeWidth="2"/>
        <line x1="26" y1="20" x2="26" y2="28" stroke="#f59e0b" strokeWidth="2"/>
      </svg>
    ),
    label: "Grades",
    desc: "View your results"
  },
  { 
    icon: (
      <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="20" cy="20" r="14" fill="none" stroke="#06b6d4" strokeWidth="2"/>
        <line x1="20" y1="8" x2="20" y2="20" stroke="#06b6d4" strokeWidth="2" strokeLinecap="round"/>
        <line x1="20" y1="20" x2="26" y2="26" stroke="#06b6d4" strokeWidth="2" strokeLinecap="round"/>
      </svg>
    ),
    label: "Schedule",
    desc: "Class timetable"
  },
  { 
    icon: (
      <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M 12 10 L 12 32 Q 12 34 14 34 L 26 34 Q 28 34 28 32 L 28 10" fill="none" stroke="#8b5cf6" strokeWidth="2"/>
        <rect x="10" y="8" width="20" height="3" fill="#8b5cf6"/>
        <line x1="16" y1="16" x2="24" y2="16" stroke="#8b5cf6" strokeWidth="1.5"/>
        <line x1="16" y1="22" x2="24" y2="22" stroke="#8b5cf6" strokeWidth="1.5"/>
        <line x1="16" y1="28" x2="24" y2="28" stroke="#8b5cf6" strokeWidth="1.5"/>
      </svg>
    ),
    label: "Fees & Payments",
    desc: "Pay tuition & fees"
  },
];

export default function KioskHome() {
  const [loaded, setLoaded] = useState(false);

  return (
    <>
      {!loaded && <LoadingScreen onDone={() => setLoaded(true)} />}
      <div className={`kiosk-bg d-flex flex-column`} style={{ opacity: loaded ? 1 : 0, transition: "opacity 0.5s" }} suppressHydrationWarning>

        {/* ── Navbar ── */}
        <nav className="navbar glass border-bottom px-3 px-md-4 py-3">
          <div className="d-flex align-items-center gap-3">
            <img src="/cfei-logo.jpg" alt="CFEI" className="rounded-circle border" style={{ width: 36, height: 36, objectFit: "cover" }} />
            <div className="d-flex align-items-center justify-content-center rounded-3 bg-primary text-white fw-black" style={{ width: 40, height: 40, fontSize: 16 }}>IN</div>
            <div>
              <div className="fw-bold text-dark lh-1">INFORM</div>
              <div className="text-muted" style={{ fontSize: 11 }}>Cebu Far East Institute</div>
            </div>
          </div>

          <div className="d-none d-md-block mx-auto"><Clock /></div>

          <div className="d-flex align-items-center gap-3">
            <span className="badge bg-success-subtle text-success border border-success-subtle d-flex align-items-center gap-1">
              <span className="rounded-circle bg-success d-inline-block" style={{ width: 7, height: 7 }} />
              System Online
            </span>
            <Link href="/admin/login" className="btn btn-sm btn-outline-secondary">Admin Access</Link>
          </div>
        </nav>

        {/* ── Ticker ── */}
        <Ticker />

        {/* ── Main ── */}
        <main className="flex-grow-1 d-flex flex-column align-items-center justify-content-center px-3 py-5 gap-4">

          {/* Mobile clock */}
          <div className="d-md-none animate-fade-in"><Clock /></div>

          {/* Headline */}
          <div className="text-center animate-fade-in delay-1">
            <h1 className="fw-black display-4 text-white lh-sm mb-3" style={{ fontSize: "3.5rem", letterSpacing: "-1px" }}>
              Student Information<br />
              <span style={{ background: "linear-gradient(135deg, #f59e0b, #e11d48)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>Management System</span>
            </h1>
            <p className="text-white-50 mt-3 fs-5" style={{ maxWidth: 600, margin: "0 auto" }}>Streamlined academic management for Cebu Far East Institute. Access your records, enrollment, and academic information in one unified platform.</p>
          </div>

          {/* Enrollment banner */}
          <div className="glass rounded-3 px-5 py-4 d-flex flex-column flex-sm-row align-items-center gap-4 animate-fade-in delay-2 border-start border-5" style={{ maxWidth: 640, width: "100%", borderColor: "#f59e0b" }}>
            <div className="rounded-circle d-flex align-items-center justify-content-center flex-shrink-0" style={{ width: 56, height: 56, fontSize: 28, background: "linear-gradient(135deg, #f59e0b, #d97706)" }}>📋</div>
            <div className="flex-grow-1">
              <div className="fw-bold text-dark mb-1">Enrollment Period is Now Open</div>
              <div className="text-muted small">
                Don&apos;t miss the deadline! Enroll by <strong className="text-dark">June 15, 2026</strong>.
              </div>
            </div>
            <Link href="/enrollment" className="btn btn-sm fw-bold flex-shrink-0 px-4" style={{ background: "linear-gradient(135deg, #f59e0b, #d97706)", color: "#fff", border: "none" }}>Enroll Now</Link>
          </div>

          {/* Login buttons */}
          <div className="d-flex flex-column flex-sm-row align-items-center justify-content-center gap-4 animate-fade-in delay-3 position-relative" style={{ maxWidth: 700, width: "100%" }}>
            {/* Glowing logo background */}
            <div style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: 500,
              height: 500,
              borderRadius: "50%",
              backgroundImage: "url('/cfei-logo.jpg')",
              backgroundSize: "contain",
              backgroundRepeat: "no-repeat",
              backgroundPosition: "center",
              opacity: 0.3,
              zIndex: 0,
              pointerEvents: "none",
              animation: "glowRGB 4s ease-in-out infinite"
            }} />
            
            <Link href="/login" className="tap-btn text-decoration-none position-relative" style={{ width: 200, height: 200, background: "linear-gradient(135deg, #e11d48 0%, #be123c 50%, #9f1239 100%)", zIndex: 1 }}>
              <svg width="56" height="56" viewBox="0 0 56 56" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="28" cy="16" r="8" fill="white"/>
                <path d="M 12 32 Q 12 28 16 28 L 40 28 Q 44 28 44 32 L 44 44 Q 44 48 40 48 L 16 48 Q 12 48 12 44 Z" fill="white"/>
              </svg>
              <div className="fw-bold text-white" style={{ fontSize: "0.95rem", lineHeight: 1.3 }}>
                <div>Log In as</div>
                <div>Student</div>
              </div>
            </Link>
            <Link href="/teacher/login" className="tap-btn text-decoration-none position-relative" style={{ width: 200, height: 200, background: "linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #0f172a 100%)", zIndex: 1 }}>
              <svg width="56" height="56" viewBox="0 0 56 56" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="20" cy="16" r="6" fill="white"/>
                <path d="M 10 28 Q 10 25 13 25 L 27 25 Q 30 25 30 28 L 30 40 Q 30 43 27 43 L 13 43 Q 10 43 10 40 Z" fill="white"/>
                <circle cx="40" cy="16" r="6" fill="white"/>
                <path d="M 30 28 Q 30 25 33 25 L 47 25 Q 50 25 50 28 L 50 40 Q 50 43 47 43 L 33 43 Q 30 43 30 40 Z" fill="white"/>
              </svg>
              <div className="fw-bold text-white" style={{ fontSize: "0.95rem", lineHeight: 1.3 }}>
                <div>Log In as</div>
                <div>Teacher</div>
              </div>
            </Link>
          </div>

          {/* Quick services */}
          <div className="animate-fade-in delay-4" style={{ maxWidth: 720, width: "100%" }}>
            <p className="text-muted text-center text-uppercase small fw-semibold mb-3 ls-wide">Quick Access Services</p>
            <div className="row g-3">
              {services.map((s) => (
                <div key={s.label} className="col-6 col-sm-3">
                  <Link href="/login" className="service-tile h-100">
                    {s.icon}
                    <span className="fw-semibold small text-dark">{s.label}</span>
                    <span className="text-muted" style={{ fontSize: 11 }}>{s.desc}</span>
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </main>

        {/* ── Footer ── */}
        <footer className="glass border-top px-4 py-3 d-flex flex-column flex-sm-row align-items-center justify-content-between gap-2">
          <p className="text-muted small mb-0">© 2026 Cebu Far East Institute. All rights reserved.</p>
          <div className="d-flex gap-3">
            {["Privacy Policy", "Help", "Accessibility"].map((l) => (
              <a key={l} href="#" className="text-muted small text-decoration-none">{l}</a>
            ))}
          </div>
        </footer>
      </div>
    </>
  );
}
