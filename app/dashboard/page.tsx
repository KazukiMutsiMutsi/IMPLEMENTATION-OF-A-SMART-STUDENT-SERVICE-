"use client";

import { useState, useEffect } from "react";
import type React from "react";
import Link from "next/link";


type Panel = "home" | "grades" | "schedule" | "tuition" | "library";


const gradeData = [
  { subject:"Mathematics",        icon:"📐", grade:"A",  pct:92, teacher:"Mr. Dela Cruz",  status:"Excellent" },
  { subject:"Physics",            icon:"⚛️", grade:"B+", pct:87, teacher:"Ms. Villanueva", status:"Passing"   },
  { subject:"English Literature", icon:"📖", grade:"A+", pct:96, teacher:"Ms. Santos",     status:"Excellent" },
  { subject:"Chemistry",          icon:"🧪", grade:"B",  pct:81, teacher:"Mr. Fernandez",  status:"Passing"   },
  { subject:"History",            icon:"🏛️", grade:"B+", pct:85, teacher:"Ms. Reyes",      status:"Passing"   },
  { subject:"Computer Science",   icon:"💻", grade:"A",  pct:93, teacher:"Mr. Uy",         status:"Excellent" },
];

const timetable: Record<string, { time:string; subject:string; icon:string; room:string; color:string }[]> = {
  Monday:[
    { time:"07:30–08:30", subject:"Mathematics",        icon:"📐", room:"Room 301", color:"bg-blue-600"   },
    { time:"08:30–09:30", subject:"English Literature", icon:"📖", room:"Room 205", color:"bg-pink-600"   },
    { time:"10:00–11:00", subject:"Computer Science",   icon:"💻", room:"ICT Lab",  color:"bg-green-600"  },
    { time:"13:00–14:00", subject:"Physical Education", icon:"🏃", room:"Gym",      color:"bg-rose-500"   },
  ],
  Tuesday:[
    { time:"07:30–09:00", subject:"Physics",            icon:"⚛️", room:"Sci. Lab", color:"bg-purple-600" },
    { time:"09:00–10:30", subject:"Chemistry",          icon:"🧪", room:"Chem Lab", color:"bg-cyan-600"   },
    { time:"13:00–14:30", subject:"History",            icon:"🏛️", room:"Room 108", color:"bg-amber-600"  },
  ],
  Wednesday:[
    { time:"07:30–08:30", subject:"Mathematics",        icon:"📐", room:"Room 301", color:"bg-blue-600"   },
    { time:"08:30–09:30", subject:"English Literature", icon:"📖", room:"Room 205", color:"bg-pink-600"   },
    { time:"10:00–11:00", subject:"Computer Science",   icon:"💻", room:"ICT Lab",  color:"bg-green-600"  },
  ],
  Thursday:[
    { time:"07:30–09:00", subject:"Physics",            icon:"⚛️", room:"Sci. Lab", color:"bg-purple-600" },
    { time:"09:00–10:30", subject:"Chemistry",          icon:"🧪", room:"Chem Lab", color:"bg-cyan-600"   },
    { time:"13:00–14:30", subject:"History",            icon:"🏛️", room:"Room 108", color:"bg-amber-600"  },
  ],
  Friday:[
    { time:"07:30–08:30", subject:"Mathematics",        icon:"📐", room:"Room 301", color:"bg-blue-600"   },
    { time:"08:30–09:30", subject:"Computer Science",   icon:"💻", room:"ICT Lab",  color:"bg-green-600"  },
    { time:"10:00–11:00", subject:"English Literature", icon:"📖", room:"Room 205", color:"bg-pink-600"   },
  ],
};

const fees = [
  { label:"Tuition Fee",          amount:18500, paid:true  },
  { label:"Miscellaneous Fee",    amount: 2200, paid:true  },
  { label:"Laboratory Fee",       amount: 1500, paid:true  },
  { label:"Library Fee",          amount:  500, paid:false },
  { label:"Student Activity Fee", amount:  800, paid:false },
  { label:"ID / Registration",    amount:  350, paid:false },
];

const books = [
  { title:"Calculus: Early Transcendentals",   author:"James Stewart",       category:"Mathematics", available:true,  due:null    },
  { title:"Conceptual Physics",                author:"Paul G. Hewitt",      category:"Physics",     available:false, due:"Jun 2" },
  { title:"Complete Works of Shakespeare",     author:"W. Shakespeare",      category:"Literature",  available:true,  due:null    },
  { title:"Chemistry: The Central Science",    author:"Brown & LeMay",       category:"Chemistry",   available:true,  due:null    },
  { title:"Sapiens: A Brief History",          author:"Yuval Noah Harari",   category:"History",     available:false, due:"Jun 5" },
  { title:"Introduction to Algorithms",        author:"Cormen et al.",       category:"CS",          available:true,  due:null    },
  { title:"The Great Gatsby",                  author:"F. Scott Fitzgerald", category:"Literature",  available:true,  due:null    },
];


function BackBtn({ onClick }: { onClick: () => void }) {
  return (
    <button onClick={onClick}
      className="flex items-center gap-2 text-slate-500 hover:text-blue-600 text-sm font-semibold transition-colors mb-2">
      ← Back to Dashboard
    </button>
  );
}


function GradesView({ onBack }: { onBack: () => void }) {
  const avg = Math.round(gradeData.reduce((a, g) => a + g.pct, 0) / gradeData.length);
  return (
    <div className="flex flex-col gap-5 w-full max-w-2xl mx-auto">
      <BackBtn onClick={onBack} />
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-slate-800 font-extrabold text-2xl">My Grades</h2>
          <p className="text-slate-400 text-sm">1st Semester · 2025–2026</p>
        </div>
        <div className="bg-blue-50 border border-blue-100 rounded-2xl px-5 py-3 text-center">
          <div className="text-xs text-slate-400">General Average</div>
          <div className="text-2xl font-extrabold text-blue-600">{avg}%</div>
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {gradeData.map((g, i) => (
          <div key={i} className="bg-white rounded-2xl border border-slate-100 shadow-sm p-5">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center text-xl shrink-0">{g.icon}</div>
              <div className="flex-1 min-w-0">
                <div className="text-slate-700 font-bold text-sm truncate">{g.subject}</div>
                <div className="text-slate-400 text-xs">{g.teacher}</div>
              </div>
              <div className="text-2xl font-extrabold text-blue-600 shrink-0">{g.grade}</div>
            </div>
            <div className="h-2 bg-slate-100 rounded-full overflow-hidden mb-2">
              <div className="h-full bg-blue-500 rounded-full" style={{ width:`${g.pct}%` }} />
            </div>
            <div className="flex items-center justify-between">
              <span className="text-slate-400 text-xs">{g.pct}%</span>
              <span className={`text-xs font-semibold px-2.5 py-0.5 rounded-full ${g.status==="Excellent" ? "bg-green-100 text-green-600" : "bg-blue-50 text-blue-500"}`}>{g.status}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}


function ScheduleView({ onBack }: { onBack: () => void }) {
  const [day, setDay] = useState("Monday");
  const days = ["Monday","Tuesday","Wednesday","Thursday","Friday"];
  return (
    <div className="flex flex-col gap-5 w-full max-w-2xl mx-auto">
      <BackBtn onClick={onBack} />
      <div>
        <h2 className="text-slate-800 font-extrabold text-2xl">My Schedule</h2>
        <p className="text-slate-400 text-sm">1st Semester · 2025–2026</p>
      </div>
      <div className="flex gap-2 overflow-x-auto pb-1">
        {days.map(d => (
          <button key={d} onClick={() => setDay(d)}
            className={`shrink-0 px-4 py-2 rounded-xl text-sm font-semibold transition-all
              ${day===d ? "bg-blue-600 text-white shadow-md shadow-blue-200" : "bg-white border border-slate-200 text-slate-600 hover:border-blue-300 hover:text-blue-600"}`}>
            {d.slice(0,3)}
          </button>
        ))}
      </div>
      <div className="flex flex-col gap-3">
        {timetable[day].map((cls, i) => (
          <div key={i} className="bg-white rounded-2xl border border-slate-100 shadow-sm p-4 flex items-center gap-4 hover:border-blue-200 transition-all">
            <div className="text-xs font-mono text-slate-400 w-28 shrink-0">{cls.time}</div>
            <div className={`w-11 h-11 rounded-xl ${cls.color} flex items-center justify-center text-2xl shrink-0`}>{cls.icon}</div>
            <div className="flex-1 min-w-0">
              <div className="text-slate-700 font-bold text-sm">{cls.subject}</div>
              <div className="text-slate-400 text-xs mt-0.5">📍 {cls.room}</div>
            </div>
            <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse shrink-0" />
          </div>
        ))}
      </div>
    </div>
  );
}


function TuitionView({ onBack }: { onBack: () => void }) {
  const total   = fees.reduce((a, f) => a + f.amount, 0);
  const paid    = fees.filter(f => f.paid).reduce((a, f) => a + f.amount, 0);
  const balance = total - paid;
  return (
    <div className="flex flex-col gap-5 w-full max-w-2xl mx-auto">
      <BackBtn onClick={onBack} />
      <div>
        <h2 className="text-slate-800 font-extrabold text-2xl">Tuition Fee</h2>
        <p className="text-slate-400 text-sm">1st Semester · 2025–2026</p>
      </div>
      <div className="grid grid-cols-3 gap-3">
        {[
          { label:"Total",   value:`₱${total.toLocaleString()}`,   color:"text-slate-800", bg:"bg-slate-50  border-slate-200" },
          { label:"Paid",    value:`₱${paid.toLocaleString()}`,    color:"text-green-600", bg:"bg-green-50  border-green-200" },
          { label:"Balance", value:`₱${balance.toLocaleString()}`, color:"text-red-500",   bg:"bg-red-50    border-red-200"   },
        ].map(s => (
          <div key={s.label} className={`rounded-2xl border p-4 text-center ${s.bg}`}>
            <div className="text-slate-400 text-xs mb-1">{s.label}</div>
            <div className={`text-lg font-extrabold ${s.color}`}>{s.value}</div>
          </div>
        ))}
      </div>
      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
        {fees.map((f, i) => (
          <div key={i} className="flex items-center justify-between px-5 py-4 border-b border-slate-50 last:border-0 hover:bg-slate-50 transition-colors">
            <span className="text-slate-700 text-sm font-medium">{f.label}</span>
            <div className="flex items-center gap-3">
              <span className="text-slate-600 text-sm font-semibold">₱{f.amount.toLocaleString()}</span>
              <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${f.paid ? "bg-green-100 text-green-600" : "bg-red-100 text-red-500"}`}>
                {f.paid ? "Paid" : "Unpaid"}
              </span>
            </div>
          </div>
        ))}
      </div>
      <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 rounded-2xl transition-colors shadow-md shadow-blue-200 text-base">
        Pay Balance →
      </button>
    </div>
  );
}

/* ══════════════════════════════════════════
   LIBRARY VIEW
══════════════════════════════════════════ */
function LibraryView({ onBack }: { onBack: () => void }) {
  const [search, setSearch] = useState("");
  const borrowed = books.filter(b => !b.available);
  const filtered = books.filter(b =>
    b.title.toLowerCase().includes(search.toLowerCase()) ||
    b.author.toLowerCase().includes(search.toLowerCase())
  );
  return (
    <div className="flex flex-col gap-5 w-full max-w-2xl mx-auto">
      <BackBtn onClick={onBack} />
      <div>
        <h2 className="text-slate-800 font-extrabold text-2xl">Library</h2>
        <p className="text-slate-400 text-sm">{books.filter(b=>b.available).length} available · {borrowed.length} borrowed by you</p>
      </div>
      {borrowed.length > 0 && (
        <div className="bg-yellow-50 border border-yellow-200 rounded-2xl p-4">
          <div className="text-yellow-700 font-bold text-sm mb-2">📚 Currently Borrowed</div>
          {borrowed.map((b, i) => (
            <div key={i} className="flex items-center justify-between bg-white rounded-xl px-4 py-2.5 border border-yellow-100 mb-2 last:mb-0">
              <span className="text-slate-700 text-sm font-medium">{b.title}</span>
              <span className="text-xs font-semibold text-red-500 bg-red-50 border border-red-100 px-2.5 py-1 rounded-full">Due {b.due}</span>
            </div>
          ))}
        </div>
      )}
      <div className="flex items-center gap-2 bg-white border border-slate-200 rounded-xl px-3 py-2.5 shadow-sm">
        <span className="text-slate-400">🔍</span>
        <input value={search} onChange={e => setSearch(e.target.value)}
          placeholder="Search books..."
          className="flex-1 text-sm text-slate-600 placeholder-slate-300 bg-transparent focus:outline-none" />
      </div>
      <div className="flex flex-col gap-3">
        {filtered.map((b, i) => (
          <div key={i} className="bg-white rounded-2xl border border-slate-100 shadow-sm p-4 flex items-center gap-4 hover:border-blue-200 transition-all">
            <div className="w-10 h-10 rounded-xl bg-amber-100 flex items-center justify-center text-xl shrink-0">📖</div>
            <div className="flex-1 min-w-0">
              <div className="text-slate-700 font-bold text-sm truncate">{b.title}</div>
              <div className="text-slate-400 text-xs">{b.author} · {b.category}</div>
            </div>
            {b.available
              ? <button className="shrink-0 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold px-3 py-1.5 rounded-xl transition-colors">Borrow</button>
              : <span className="shrink-0 text-xs font-semibold text-red-500 bg-red-50 border border-red-100 px-2.5 py-1 rounded-full">Due {b.due}</span>
            }
          </div>
        ))}
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════
   TILE ICONS
══════════════════════════════════════════ */
function IconGrades() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" className="w-12 h-12">
      <path d="M9 11l3 3L22 4"/>
      <path d="M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h11"/>
    </svg>
  );
}
function IconSchedule() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" className="w-12 h-12">
      <rect x="3" y="4" width="18" height="18" rx="2"/>
      <path d="M16 2v4M8 2v4M3 10h18M8 14h.01M12 14h.01M16 14h.01M8 18h.01M12 18h.01"/>
    </svg>
  );
}
function IconTuition() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" className="w-12 h-12">
      <rect x="2" y="5" width="20" height="14" rx="2"/>
      <path d="M2 10h20"/>
      <circle cx="12" cy="15" r="2"/>
    </svg>
  );
}
function IconLibrary() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" className="w-12 h-12">
      <path d="M4 19.5A2.5 2.5 0 016.5 17H20"/>
      <path d="M6.5 2H20v20H6.5A2.5 2.5 0 014 19.5v-15A2.5 2.5 0 016.5 2z"/>
    </svg>
  );
}

/* ══════════════════════════════════════════
   EVENT SLIDESHOW
══════════════════════════════════════════ */
const events = [
  {
    title: "Graduation Ceremony 2026",
    date:  "June 28, 2026",
    desc:  "Celebrate the Class of 2026 at the Main Auditorium",
    bg:    "from-blue-500 to-indigo-700",
    emoji: "🎓",
    img:   "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=800&q=80",
  },
  {
    title: "Science & Technology Fair",
    date:  "June 10, 2026",
    desc:  "Showcase your innovations at the Annual SciTech Expo",
    bg:    "from-cyan-500 to-blue-600",
    emoji: "🔬",
    img:   "https://images.unsplash.com/photo-1532094349884-543559c5f185?w=800&q=80",
  },
  {
    title: "Sports Festival 2026",
    date:  "June 5, 2026",
    desc:  "Compete in track, basketball, volleyball and more",
    bg:    "from-green-500 to-teal-600",
    emoji: "🏆",
    img:   "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=800&q=80",
  },
  {
    title: "Cultural Night",
    date:  "May 30, 2026",
    desc:  "A night of music, dance, and cultural performances",
    bg:    "from-purple-500 to-pink-600",
    emoji: "🎭",
    img:   "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=800&q=80",
  },
  {
    title: "Enrollment Period Open",
    date:  "Until June 15, 2026",
    desc:  "Register now for the 2nd Semester — slots are limited",
    bg:    "from-amber-500 to-orange-600",
    emoji: "📋",
    img:   "https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?w=800&q=80",
  },
];

function EventSlideshow() {
  const [current, setCurrent] = useState(0);

  /* auto-advance every 3 seconds */
  useEffect(() => {
    const id = setInterval(() => {
      setCurrent(prev => (prev + 1) % events.length);
    }, 3000);
    return () => clearInterval(id);
  }, []);

  const ev = events[current];

  return (
    <div className="w-full relative" style={{ height: "280px" }}>
      {/* slides */}
      {events.map((e, i) => (
        <div
          key={i}
          className="absolute inset-0 transition-opacity duration-700"
          style={{ opacity: i === current ? 1 : 0 }}
        >
          {/* background image */}
          <img
            src={e.img}
            alt={e.title}
            className="w-full h-full object-cover"
          />
          {/* gradient overlay */}
          <div className={`absolute inset-0 bg-gradient-to-br ${e.bg} opacity-75`} />
          {/* text */}
          <div className="absolute inset-0 flex flex-col items-center justify-center px-8 text-center">
            <span className="text-5xl mb-3 drop-shadow-lg">{e.emoji}</span>
            <div className="text-white font-extrabold text-2xl drop-shadow-md leading-tight">{e.title}</div>
            <div className="text-white/90 text-sm mt-1.5 font-semibold">{e.date}</div>
            <div className="text-white/75 text-sm mt-1 max-w-sm">{e.desc}</div>
          </div>
        </div>
      ))}

      {/* dot indicators */}
      <div className="absolute bottom-3 left-0 right-0 flex justify-center gap-1.5 z-10">
        {events.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            className={`rounded-full transition-all duration-300 ${
              i === current
                ? "w-5 h-2 bg-white"
                : "w-2 h-2 bg-white/40 hover:bg-white/70"
            }`}
          />
        ))}
      </div>

      {/* prev / next arrows */}
      <button
        onClick={() => setCurrent(prev => (prev - 1 + events.length) % events.length)}
        className="absolute left-3 top-1/2 -translate-y-1/2 z-10 w-7 h-7 rounded-full bg-black/20 hover:bg-black/40 text-white flex items-center justify-center text-sm transition-all"
      >‹</button>
      <button
        onClick={() => setCurrent(prev => (prev + 1) % events.length)}
        className="absolute right-3 top-1/2 -translate-y-1/2 z-10 w-7 h-7 rounded-full bg-black/20 hover:bg-black/40 text-white flex items-center justify-center text-sm transition-all"
      >›</button>
    </div>
  );
}

/* ══════════════════════════════════════════
   HOME — kiosk tile grid (matches picture)
══════════════════════════════════════════ */
function KioskHome({ setPanel }: { setPanel: (p: Panel) => void }) {
  const tiles: { id: Panel; label: string; Icon: () => React.ReactElement }[] = [
    { id: "grades",   label: "View Grades",   Icon: IconGrades   },
    { id: "schedule", label: "View Schedule", Icon: IconSchedule },
    { id: "tuition",  label: "Tuition Fee",   Icon: IconTuition  },
    { id: "library",  label: "Library",       Icon: IconLibrary  },
  ];

  return (
    <div className="flex flex-col items-center w-full max-w-2xl mx-auto rounded-3xl overflow-hidden shadow-2xl shadow-blue-100 border border-slate-100">

      {/* slideshow */}
      <div className="w-full" style={{ height: "280px" }}>
        <EventSlideshow />
      </div>

      {/* welcome card */}
      <div className="w-full bg-white px-8 pt-7 pb-3">
        <p className="text-center text-slate-800 font-extrabold text-2xl">Welcome, Jamie Santos</p>
        <p className="text-center text-slate-400 text-sm mt-1">STU-2024-00123 · BSCS Year 2</p>
      </div>

      {/* 2×2 tile grid */}
      <div className="w-full bg-white px-8 pb-8 pt-5 grid grid-cols-2 gap-5">
        {tiles.map(tile => (
          <button
            key={tile.id}
            onClick={() => setPanel(tile.id)}
            className="flex flex-col items-center justify-center gap-4 rounded-2xl py-10 px-4 text-white transition-all hover:scale-105 hover:shadow-2xl active:scale-95"
            style={{
              background: "linear-gradient(145deg,#1e3a6e,#1a3260)",
              boxShadow:  "0 6px 24px rgba(30,58,110,0.4)",
            }}
          >
            <div className="opacity-90 w-12 h-12 flex items-center justify-center"><tile.Icon /></div>
            <span className="text-base font-bold tracking-wide">{tile.label}</span>
          </button>
        ))}
      </div>

      {/* footer */}
      <div className="w-full bg-white border-t border-slate-100 px-8 py-5 flex flex-col items-center gap-2">
        <div className="text-4xl">🎓</div>
        <p className="text-slate-400 text-xs text-center">© 2026 INFORM University. All rights reserved.</p>
        <Link href="/" className="text-slate-300 hover:text-slate-500 text-xs transition-colors">← Back to Kiosk</Link>
      </div>

    </div>
  );
}

/* ══════════════════════════════════════════
   PAGE
══════════════════════════════════════════ */
export default function DashboardPage() {
  const [panel, setPanel] = useState<Panel>("home");

  return (
    <div className="min-h-screen kiosk-bg flex flex-col items-center justify-start py-8 px-4" suppressHydrationWarning>
      {panel === "home"     && <KioskHome setPanel={setPanel} />}
      {panel === "grades"   && (
        <div className="w-full max-w-2xl">
          <GradesView   onBack={() => setPanel("home")} />
        </div>
      )}
      {panel === "schedule" && (
        <div className="w-full max-w-2xl">
          <ScheduleView onBack={() => setPanel("home")} />
        </div>
      )}
      {panel === "tuition"  && (
        <div className="w-full max-w-2xl">
          <TuitionView  onBack={() => setPanel("home")} />
        </div>
      )}
      {panel === "library"  && (
        <div className="w-full max-w-2xl">
          <LibraryView  onBack={() => setPanel("home")} />
        </div>
      )}
    </div>
  );
}
