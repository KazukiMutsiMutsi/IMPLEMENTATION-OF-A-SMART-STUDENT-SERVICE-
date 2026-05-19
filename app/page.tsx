"use client";

import Link from "next/link";
import { useState, useEffect } from "react";

/* ── live clock ── */
function Clock() {
  const [time, setTime] = useState("");
  const [date, setDate] = useState("");

  useEffect(() => {
    function tick() {
      const now = new Date();
      setTime(now.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit", second: "2-digit" }));
      setDate(now.toLocaleDateString("en-US", { weekday: "long", year: "numeric", month: "long", day: "numeric" }));
    }
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="text-center">
      <div className="text-4xl sm:text-5xl font-mono font-bold text-blue-700 tracking-widest animate-blink">
        {time}
      </div>
      <div className="text-slate-400 text-sm mt-1 tracking-wide">{date}</div>
    </div>
  );
}

/* ── announcement ticker ── */
const announcements = [
  "📢  Enrollment Period is Now Open — Deadline: June 15, 2026",
  "📋  Final Exam Schedule has been posted — Check your student portal",
  "🎓  Graduation Ceremony: June 28, 2026 at the Main Auditorium",
  "📚  Library hours extended during exam week: 7AM – 11PM",
  "💳  Student ID renewal available at the Registrar's Office",
];

function Ticker() {
  return (
    <div className="w-full bg-blue-600 py-2 ticker-wrap">
      <div className="animate-ticker inline-block text-white text-sm font-medium tracking-wide">
        {announcements.join("     ·     ")}
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        {announcements.join("     ·     ")}
      </div>
    </div>
  );
}

/* ── quick service tiles ── */
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
  return (
    <div className="min-h-screen kiosk-bg flex flex-col" suppressHydrationWarning>

      {/* ── top bar ── */}
      <header className="flex items-center justify-between px-6 py-4 border-b border-blue-100 glass-dark">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center text-white font-extrabold text-lg shadow-md shadow-blue-200">
            IN
          </div>
          <div>
            <div className="text-slate-800 font-bold text-base leading-tight">INFORM</div>
            <div className="text-slate-400 text-xs">Student Information System</div>
          </div>
        </div>

        {/* live clock — desktop */}
        <div className="hidden md:block">
          <Clock />
        </div>

        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
            <span className="text-green-600 text-xs font-medium">System Online</span>
          </div>
          <Link
            href="/login"
            className="text-slate-500 hover:text-slate-800 text-xs border border-slate-200 hover:border-slate-400 px-3 py-1.5 rounded-lg transition-all bg-white/60"
          >
            Admin Access
          </Link>
        </div>
      </header>

      {/* ── announcement ticker ── */}
      <Ticker />

      {/* ── main kiosk body ── */}
      <main className="flex-1 flex flex-col items-center justify-center px-4 py-10 gap-10">

        {/* mobile clock */}
        <div className="md:hidden animate-fade-in">
          <Clock />
        </div>

        {/* headline */}
        <div className="text-center animate-fade-in delay-100">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-800 leading-tight tracking-tight">
            Self-Service Student
            <br />
            <span className="text-blue-600">Information Kiosk</span>
          </h1>
          <p className="text-slate-500 text-base sm:text-lg mt-3 max-w-lg mx-auto">
            Access your academic records anytime, anywhere on campus
          </p>
        </div>

        {/* enrollment banner */}
        <div className="w-full max-w-2xl glass rounded-2xl px-6 py-4 flex flex-col sm:flex-row items-center gap-4 animate-fade-in delay-200 border-l-4 border-yellow-400">
          <div className="w-10 h-10 rounded-full bg-yellow-100 border border-yellow-300 flex items-center justify-center text-xl shrink-0">
            🔔
          </div>
          <div className="flex-1 text-center sm:text-left">
            <div className="text-yellow-600 font-bold text-sm">Enrollment Period is Now Open</div>
            <div className="text-slate-500 text-xs mt-0.5">
              Don&apos;t miss the deadline! Enroll for the upcoming semester by{" "}
              <span className="text-slate-800 font-semibold">June 15, 2026</span>.
            </div>
          </div>
          <Link
            href="/login"
            className="shrink-0 bg-yellow-400 hover:bg-yellow-300 text-yellow-900 font-bold text-xs px-4 py-2 rounded-xl transition-all shadow-sm"
          >
            Enroll Now
          </Link>
        </div>

        {/* TAP TO START button */}
        <div className="relative animate-fade-in delay-300 flex flex-col items-center gap-3">
          {/* pulse rings */}
          <span className="absolute inset-0 rounded-full animate-pulse-ring bg-blue-400/20 pointer-events-none" />
          <span className="absolute inset-0 rounded-full animate-pulse-ring bg-blue-400/15 pointer-events-none" style={{ animationDelay: "0.6s" }} />

          <Link
            href="/login"
            className="tap-btn relative z-10 w-48 h-48 sm:w-56 sm:h-56 rounded-full flex flex-col items-center justify-center gap-2 text-white select-none"
          >
            <span className="text-4xl sm:text-5xl">👆</span>
            <span className="font-extrabold text-xl sm:text-2xl tracking-wide">TAP TO</span>
            <span className="font-extrabold text-xl sm:text-2xl tracking-wide">START</span>
          </Link>
        </div>

        {/* quick services grid */}
        <div className="w-full max-w-3xl animate-fade-in delay-400">
          <p className="text-slate-400 text-xs text-center uppercase tracking-widest mb-4">
            Quick Access Services
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {services.map((s) => (
              <Link
                key={s.label}
                href="/login"
                className="service-card rounded-2xl p-4 flex flex-col items-center gap-2 text-center cursor-pointer"
              >
                <span className="text-3xl">{s.icon}</span>
                <span className="text-slate-700 font-semibold text-sm">{s.label}</span>
                <span className="text-slate-400 text-xs">{s.desc}</span>
              </Link>
            ))}
          </div>
        </div>
      </main>

      {/* ── footer ── */}
      <footer className="border-t border-blue-100 px-6 py-4 flex flex-col sm:flex-row items-center justify-between gap-2 glass-dark">
        <p className="text-slate-400 text-xs">© 2026 INFORM University. All rights reserved.</p>
        <div className="flex items-center gap-4">
          {["Privacy Policy", "Help", "Accessibility"].map((l) => (
            <a key={l} href="#" className="text-slate-400 hover:text-slate-600 text-xs transition-colors">
              {l}
            </a>
          ))}
        </div>
      </footer>
    </div>
  );
}
