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

/* ── Service tiles ── */
const services = [
  { icon: "🎓", label: "Enrollment",      desc: "Register for classes" },
  { icon: "📊", label: "Grades",          desc: "View your results"    },
  { icon: "💳", label: "Student ID",      desc: "Print or renew ID"    },
  { icon: "📅", label: "Schedule",        desc: "Class timetable"      },
  { icon: "💰", label: "Fees & Payments", desc: "Pay tuition & fees"   },
  { icon: "📄", label: "Transcripts",     desc: "Request documents"    },
  { icon: "🏥", label: "Health Services", desc: "Medical records"      },
  { icon: "📚", label: "Library",         desc: "Books & resources"    },
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
            <img src="/image.png" alt="BC" className="rounded-circle border" style={{ width: 36, height: 36, objectFit: "cover" }} />
            <div className="d-flex align-items-center justify-content-center rounded-3 bg-primary text-white fw-black" style={{ width: 40, height: 40, fontSize: 16 }}>IN</div>
            <div>
              <div className="fw-bold text-dark lh-1">INFORM</div>
              <div className="text-muted" style={{ fontSize: 11 }}>Benedicto College</div>
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
            <h1 className="fw-black display-5 text-dark lh-sm">
              Self-Service Student<br />
              <span className="text-inform">Information Kiosk</span>
            </h1>
            <p className="text-muted mt-2 fs-6">Access your academic records anytime, anywhere on campus</p>
          </div>

          {/* Enrollment banner */}
          <div className="glass rounded-3 px-4 py-3 d-flex flex-column flex-sm-row align-items-center gap-3 animate-fade-in delay-2 border-start border-4 border-warning" style={{ maxWidth: 640, width: "100%" }}>
            <div className="rounded-circle bg-warning-subtle border border-warning d-flex align-items-center justify-content-center flex-shrink-0" style={{ width: 44, height: 44, fontSize: 22 }}>🔔</div>
            <div className="flex-grow-1 text-center text-sm-start">
              <div className="fw-bold text-warning-emphasis small">Enrollment Period is Now Open</div>
              <div className="text-muted" style={{ fontSize: 12 }}>
                Don&apos;t miss the deadline! Enroll by <strong className="text-dark">June 15, 2026</strong>.
              </div>
            </div>
            <Link href="/login" className="btn btn-warning btn-sm fw-bold flex-shrink-0">Enroll Now</Link>
          </div>

          {/* TAP TO START */}
          <div className="position-relative d-flex flex-column align-items-center animate-fade-in delay-3">
            <span className="position-absolute top-50 start-50 translate-middle rounded-circle animate-pulse-ring" style={{ width: 220, height: 220, background: "rgba(37,99,235,0.12)", pointerEvents: "none" }} />
            <Link href="/login" className="tap-btn text-decoration-none">
              <span style={{ fontSize: 44 }}>👆</span>
              <span className="fw-black fs-4 lh-1">TAP TO</span>
              <span className="fw-black fs-4 lh-1">START</span>
            </Link>
          </div>

          {/* Quick services */}
          <div className="animate-fade-in delay-4" style={{ maxWidth: 720, width: "100%" }}>
            <p className="text-muted text-center text-uppercase small fw-semibold mb-3 ls-wide">Quick Access Services</p>
            <div className="row g-3">
              {services.map((s) => (
                <div key={s.label} className="col-6 col-sm-3">
                  <Link href="/login" className="service-tile h-100">
                    <span style={{ fontSize: 32 }}>{s.icon}</span>
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
          <p className="text-muted small mb-0">© 2026 INFORM University. All rights reserved.</p>
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
