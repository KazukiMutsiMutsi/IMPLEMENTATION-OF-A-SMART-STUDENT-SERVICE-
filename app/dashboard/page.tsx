"use client";

import { useState } from "react";
import Link from "next/link";

/* ─── DATA ─── */
const subjects = [
  { id: 1, name: "Mathematics",        icon: "📐", color: "bg-blue-600",   progress: 78, files: 12, notes: 8,  deadline: "Exam — Jun 3"         },
  { id: 2, name: "Physics",            icon: "⚛️", color: "bg-purple-600", progress: 55, files: 9,  notes: 5,  deadline: "Assignment — May 28"   },
  { id: 3, name: "English Literature", icon: "📖", color: "bg-pink-600",   progress: 90, files: 15, notes: 11, deadline: "Essay — May 24"        },
  { id: 4, name: "Chemistry",          icon: "🧪", color: "bg-cyan-600",   progress: 42, files: 7,  notes: 4,  deadline: "Lab Report — Jun 1"    },
  { id: 5, name: "History",            icon: "🏛️", color: "bg-amber-600",  progress: 65, files: 10, notes: 7,  deadline: "Presentation — Jun 7"  },
  { id: 6, name: "Computer Science",   icon: "💻", color: "bg-green-600",  progress: 88, files: 18, notes: 14, deadline: "Project — Jun 10"      },
];

const recentFiles = [
  { name: "Calculus Notes — Chapter 7.pdf",  subject: "Mathematics",        time: "2h ago",    icon: "📄" },
  { name: "Newton's Laws Summary.docx",       subject: "Physics",            time: "Yesterday", icon: "📝" },
  { name: "Macbeth Essay Draft.docx",         subject: "English Literature", time: "Yesterday", icon: "📝" },
  { name: "Periodic Table Flashcards.pdf",    subject: "Chemistry",          time: "2 days ago",icon: "📄" },
  { name: "WW2 Timeline.pptx",               subject: "History",            time: "3 days ago",icon: "📊" },
];

const upcomingTasks = [
  { task: "Finish Macbeth Essay",    subject: "English",     due: "Today",  urgent: true  },
  { task: "Physics Assignment Ch.4", subject: "Physics",     due: "May 28", urgent: true  },
  { task: "Lab Report — Titration",  subject: "Chemistry",   due: "Jun 1",  urgent: false },
  { task: "Maths Exam Revision",     subject: "Mathematics", due: "Jun 3",  urgent: false },
];

const weekDays   = ["Mon","Tue","Wed","Thu","Fri","Sat","Sun"];
const studyHours = [2.5, 4, 3, 5, 4.5, 6, 2];

const navItems = [
  { id: "dashboard",  label: "Dashboard",   icon: "🏠" },
  { id: "subjects",   label: "My Subjects", icon: "📁" },
  { id: "schedule",   label: "Schedule",    icon: "📅" },
  { id: "ai-tutor",   label: "AI Tutor",    icon: "🧠" },
  { id: "notes",      label: "Notes",       icon: "📝" },
  { id: "progress",   label: "Progress",    icon: "📊" },
  { id: "enrollment", label: "Enrollment",  icon: "🎓" },
  { id: "fees",       label: "Fees",        icon: "💰" },
];

/* ─── SIDEBAR ─── */
function Sidebar({ active, setActive, mobileOpen, setMobileOpen }: {
  active: string;
  setActive: (s: string) => void;
  mobileOpen: boolean;
  setMobileOpen: (b: boolean) => void;
}) {
  return (
    <>
      {mobileOpen && (
        <div className="fixed inset-0 bg-black/20 z-30 lg:hidden" onClick={() => setMobileOpen(false)} />
      )}
      <aside className={`fixed top-0 left-0 h-full w-64 bg-white border-r border-slate-100 z-40 flex flex-col transition-transform duration-300 shadow-xl shadow-blue-50
        ${mobileOpen ? "translate-x-0" : "-translate-x-full"} lg:translate-x-0 lg:static lg:z-auto`}>

        {/* logo */}
        <div className="flex items-center gap-3 px-5 py-5 border-b border-slate-100">
          <div className="w-9 h-9 rounded-xl bg-blue-600 flex items-center justify-center text-white font-extrabold text-base shadow-md shadow-blue-200">
            IN
          </div>
          <div>
            <div className="text-slate-800 font-bold text-base leading-tight">INFORM</div>
            <div className="text-slate-400 text-xs">Student Portal</div>
          </div>
          <button className="ml-auto text-slate-300 hover:text-slate-600 lg:hidden" onClick={() => setMobileOpen(false)}>✕</button>
        </div>

        {/* nav */}
        <nav className="flex-1 px-3 py-4 flex flex-col gap-1 overflow-y-auto">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => { setActive(item.id); setMobileOpen(false); }}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all w-full text-left
                ${active === item.id
                  ? "bg-blue-600 text-white shadow-md shadow-blue-200"
                  : "text-slate-500 hover:text-slate-800 hover:bg-slate-50"}`}
            >
              <span>{item.icon}</span>
              {item.label}
            </button>
          ))}
        </nav>

        {/* user */}
        <div className="px-3 py-4 border-t border-slate-100">
          <div className="flex items-center gap-3 bg-slate-50 rounded-xl px-3 py-3 border border-slate-100">
            <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-white text-xs font-bold shrink-0">JS</div>
            <div className="flex-1 min-w-0">
              <div className="text-slate-700 text-xs font-semibold truncate">Jamie Student</div>
              <div className="text-slate-400 text-xs truncate">STU-2024-00123</div>
            </div>
            <Link href="/" className="text-slate-300 hover:text-slate-500 text-xs transition-colors" title="Log out">↩</Link>
          </div>
        </div>
      </aside>
    </>
  );
}

/* ─── FOLDER CARD ─── */
function FolderCard({ s }: { s: typeof subjects[0] }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="bg-white rounded-2xl overflow-hidden border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
      <button onClick={() => setOpen(!open)} className="w-full flex items-center gap-3 px-5 py-4 hover:bg-slate-50 transition-colors">
        <div className={`w-10 h-10 rounded-xl ${s.color} flex items-center justify-center text-xl shrink-0`}>{s.icon}</div>
        <div className="flex-1 text-left">
          <div className="text-slate-700 font-bold text-sm">{s.name}</div>
          <div className="text-slate-400 text-xs mt-0.5">{s.files} files · {s.notes} notes</div>
        </div>
        <div className="hidden sm:flex flex-col items-end gap-1 mr-3">
          <span className="text-xs font-semibold text-slate-400">{s.progress}%</span>
          <div className="w-20 h-1.5 bg-slate-100 rounded-full overflow-hidden">
            <div className={`h-full ${s.color} rounded-full`} style={{ width: `${s.progress}%` }} />
          </div>
        </div>
        <span className={`text-slate-300 text-sm transition-transform ${open ? "rotate-90" : ""}`}>▶</span>
      </button>

      {open && (
        <div className="border-t border-slate-100 px-5 py-4 bg-slate-50">
          <div className="flex items-center gap-2 mb-4">
            <span className="text-xs text-slate-400">📌 Next:</span>
            <span className="text-xs font-semibold text-slate-700 bg-white border border-slate-200 rounded-full px-2.5 py-0.5">{s.deadline}</span>
          </div>
          <div className="flex flex-col gap-2 mb-4">
            {["Chapter Notes.pdf", "Past Papers.pdf", "Revision Slides.pptx"].map((f, i) => (
              <div key={i} className="flex items-center gap-3 bg-white border border-slate-100 rounded-xl px-3 py-2.5 hover:bg-blue-50 hover:border-blue-200 cursor-pointer transition-colors">
                <span className="text-base">{i === 2 ? "📊" : "📄"}</span>
                <div className="flex-1 min-w-0">
                  <div className="text-slate-600 text-xs font-medium truncate">{s.name} — {f}</div>
                  <div className="text-slate-400 text-xs">{i === 0 ? "1.2 MB" : i === 1 ? "3.4 MB" : "2.1 MB"}</div>
                </div>
                <span className="text-slate-300 text-xs">↓</span>
              </div>
            ))}
          </div>
          <div className="flex gap-2">
            <button className={`flex-1 ${s.color} text-white text-xs font-semibold py-2 rounded-xl hover:opacity-90 transition-opacity`}>+ Add File</button>
            <button className="flex-1 bg-white border border-slate-200 text-slate-500 text-xs font-semibold py-2 rounded-xl hover:bg-slate-50 transition-colors">Open Folder</button>
          </div>
        </div>
      )}
    </div>
  );
}

/* ─── DASHBOARD CONTENT ─── */
function DashboardContent() {
  const maxH = Math.max(...studyHours);
  return (
    <div className="flex flex-col gap-6">

      {/* welcome */}
      <div className="bg-white rounded-2xl p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border border-blue-100 shadow-sm">
        <div>
          <h2 className="text-slate-800 font-extrabold text-xl sm:text-2xl">Good morning, Jamie 👋</h2>
          <p className="text-slate-400 text-sm mt-1">
            You have <span className="text-slate-700 font-semibold">3 tasks due this week</span>. Keep up the streak!
          </p>
        </div>
        <div className="flex items-center gap-3 bg-blue-50 border border-blue-100 rounded-xl px-4 py-3 shrink-0">
          <span className="text-2xl">🔥</span>
          <div>
            <div className="text-blue-700 font-extrabold text-xl leading-none">14</div>
            <div className="text-slate-400 text-xs">Day streak</div>
          </div>
        </div>
      </div>

      {/* enrollment alert */}
      <div className="bg-yellow-50 rounded-2xl px-5 py-4 flex items-center gap-4 border border-yellow-200 shadow-sm">
        <span className="text-2xl shrink-0">🔔</span>
        <div className="flex-1">
          <div className="text-yellow-700 font-bold text-sm">Enrollment Period is Now Open</div>
          <div className="text-slate-400 text-xs mt-0.5">Deadline: <span className="text-slate-700 font-semibold">June 15, 2026</span></div>
        </div>
        <button className="shrink-0 bg-yellow-400 hover:bg-yellow-300 text-yellow-900 font-bold text-xs px-4 py-2 rounded-xl transition-all shadow-sm">
          Enroll Now
        </button>
      </div>

      {/* stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: "Subjects",    value: "6",   icon: "📁", sub: "Active this term"    },
          { label: "Study Hours", value: "27h", icon: "⏱️", sub: "This week"           },
          { label: "Tasks Done",  value: "18",  icon: "✅", sub: "This month"          },
          { label: "Avg. Score",  value: "82%", icon: "📈", sub: "+4% vs last month"   },
        ].map((s) => (
          <div key={s.label} className="bg-white rounded-2xl p-4 border border-slate-100 shadow-sm">
            <div className="flex items-center justify-between mb-2">
              <span className="text-slate-400 text-xs font-medium">{s.label}</span>
              <span className="text-xl">{s.icon}</span>
            </div>
            <div className="text-slate-800 font-extrabold text-2xl">{s.value}</div>
            <div className="text-slate-400 text-xs mt-1">{s.sub}</div>
          </div>
        ))}
      </div>

      {/* chart + tasks */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-2xl p-5 border border-slate-100 shadow-sm">
          <h3 className="text-slate-700 font-bold text-sm mb-4">Weekly Study Hours</h3>
          <div className="flex items-end gap-2 h-28">
            {studyHours.map((h, i) => (
              <div key={i} className="flex-1 flex flex-col items-center gap-1">
                <span className="text-slate-400 text-xs">{h}h</span>
                <div className="w-full rounded-t-lg bg-blue-500" style={{ height: `${(h / maxH) * 100}%` }} />
              </div>
            ))}
          </div>
          <div className="flex justify-between mt-2">
            {weekDays.map((d) => (
              <span key={d} className="flex-1 text-center text-slate-400 text-xs">{d}</span>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-2xl p-5 border border-slate-100 shadow-sm">
          <h3 className="text-slate-700 font-bold text-sm mb-4">Upcoming Tasks</h3>
          <div className="flex flex-col gap-2">
            {upcomingTasks.map((t, i) => (
              <div key={i} className="flex items-center gap-3 p-3 rounded-xl bg-slate-50 hover:bg-blue-50 transition-colors cursor-pointer border border-transparent hover:border-blue-100">
                <div className={`w-2 h-2 rounded-full shrink-0 ${t.urgent ? "bg-red-400" : "bg-green-400"}`} />
                <div className="flex-1 min-w-0">
                  <div className="text-slate-700 text-xs font-semibold truncate">{t.task}</div>
                  <div className="text-slate-400 text-xs">{t.subject}</div>
                </div>
                <span className={`text-xs font-semibold px-2 py-0.5 rounded-full shrink-0 ${t.urgent ? "bg-red-100 text-red-500" : "bg-slate-100 text-slate-400"}`}>
                  {t.due}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* subject folders */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-slate-800 font-bold text-lg">My Subject Folders</h3>
          <button className="text-blue-500 hover:text-blue-600 text-sm font-semibold transition-colors">+ New Folder</button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {subjects.map((s) => <FolderCard key={s.id} s={s} />)}
        </div>
      </div>

      {/* recent files */}
      <div className="bg-white rounded-2xl p-5 border border-slate-100 shadow-sm">
        <h3 className="text-slate-700 font-bold text-sm mb-4">Recent Files</h3>
        <div className="flex flex-col divide-y divide-slate-50">
          {recentFiles.map((f, i) => (
            <div key={i} className="flex items-center gap-3 py-3 hover:bg-slate-50 rounded-xl px-2 cursor-pointer transition-colors">
              <span className="text-xl shrink-0">{f.icon}</span>
              <div className="flex-1 min-w-0">
                <div className="text-slate-600 text-xs font-medium truncate">{f.name}</div>
                <div className="text-slate-400 text-xs">{f.subject}</div>
              </div>
              <span className="text-slate-300 text-xs shrink-0">{f.time}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ─── PAGE ─── */
export default function DashboardPage() {
  const [activeNav, setActiveNav] = useState("dashboard");
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="flex h-screen kiosk-bg overflow-hidden" suppressHydrationWarning>
      <Sidebar active={activeNav} setActive={setActiveNav} mobileOpen={mobileOpen} setMobileOpen={setMobileOpen} />

      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* topbar */}
        <header className="bg-white border-b border-slate-100 px-4 sm:px-6 py-3 flex items-center gap-4 shrink-0 shadow-sm">
          <button className="lg:hidden text-slate-400 hover:text-slate-700 p-1" onClick={() => setMobileOpen(true)}>
            <div className="w-5 h-0.5 bg-current mb-1" />
            <div className="w-5 h-0.5 bg-current mb-1" />
            <div className="w-5 h-0.5 bg-current" />
          </button>

          <div className="flex-1 max-w-md">
            <div className="flex items-center gap-2 bg-slate-50 border border-slate-200 rounded-xl px-3 py-2">
              <span className="text-slate-400 text-sm">🔍</span>
              <input
                type="text"
                placeholder="Search records, files, subjects..."
                className="bg-transparent text-sm text-slate-600 placeholder-slate-300 flex-1 focus:outline-none"
              />
            </div>
          </div>

          <div className="flex items-center gap-3 ml-auto">
            <button className="relative text-slate-400 hover:text-slate-600 transition-colors p-1">
              <span className="text-xl">🔔</span>
              <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full" />
            </button>
            <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-white text-xs font-bold cursor-pointer shadow-md shadow-blue-200">
              JS
            </div>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto px-4 sm:px-6 py-6">
          <DashboardContent />
        </main>
      </div>
    </div>
  );
}
