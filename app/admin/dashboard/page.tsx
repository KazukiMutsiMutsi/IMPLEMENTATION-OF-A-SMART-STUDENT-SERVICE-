"use client";

import { useState } from "react";
import Link from "next/link";

/* ─── DATA ─── */
const students = [
  { id:"STU-2024-001", name:"Jamie Santos",    course:"BSCS",  year:2, gwa:1.75, status:"Active",   tuition:"Paid"   },
  { id:"STU-2024-002", name:"Maria Reyes",     course:"BSED",  year:1, gwa:2.00, status:"Active",   tuition:"Unpaid" },
  { id:"STU-2024-003", name:"Carlo Dela Cruz", course:"BSBA",  year:3, gwa:1.50, status:"Active",   tuition:"Paid"   },
  { id:"STU-2024-004", name:"Ana Villanueva",  course:"BSN",   year:2, gwa:2.25, status:"Inactive", tuition:"Unpaid" },
  { id:"STU-2024-005", name:"Luis Fernandez",  course:"BSCS",  year:4, gwa:1.25, status:"Active",   tuition:"Paid"   },
  { id:"STU-2024-006", name:"Rosa Bautista",   course:"BSED",  year:1, gwa:2.50, status:"Active",   tuition:"Paid"   },
  { id:"STU-2024-007", name:"Mark Uy",         course:"BSBA",  year:2, gwa:3.00, status:"Active",   tuition:"Unpaid" },
  { id:"STU-2024-008", name:"Lena Cruz",       course:"BSN",   year:3, gwa:1.75, status:"Active",   tuition:"Paid"   },
];

const announcements = [
  { id:1, title:"Enrollment Period Open",        date:"May 20, 2026", target:"All Students",  status:"Active"  },
  { id:2, title:"Final Exam Schedule Released",  date:"May 18, 2026", target:"All Students",  status:"Active"  },
  { id:3, title:"Library Hours Extended",        date:"May 15, 2026", target:"All Students",  status:"Active"  },
  { id:4, title:"Tuition Deadline Reminder",     date:"May 10, 2026", target:"Unpaid Students",status:"Active" },
  { id:5, title:"Graduation Ceremony Details",   date:"May 5, 2026",  target:"4th Year",      status:"Draft"   },
];

const recentActivity = [
  { action:"New student enrolled",    name:"Rosa Bautista",   time:"2h ago",    icon:"🎓" },
  { action:"Tuition payment received",name:"Carlo Dela Cruz", time:"3h ago",    icon:"💰" },
  { action:"Grade submitted",         name:"Mr. Dela Cruz",   time:"5h ago",    icon:"📊" },
  { action:"Library book returned",   name:"Luis Fernandez",  time:"Yesterday", icon:"📚" },
  { action:"Announcement posted",     name:"Admin",           time:"Yesterday", icon:"📢" },
];

const navItems = [
  { id:"overview",       label:"Overview",        icon:"🏠" },
  { id:"students",       label:"Students",        icon:"🎓" },
  { id:"grades",         label:"Grades",          icon:"📊" },
  { id:"enrollment",     label:"Enrollment",      icon:"📋" },
  { id:"tuition",        label:"Tuition",         icon:"💰" },
  { id:"announcements",  label:"Announcements",   icon:"📢" },
  { id:"library",        label:"Library",         icon:"📚" },
  { id:"reports",        label:"Reports",         icon:"📈" },
];

/* ─── SIDEBAR ─── */
function Sidebar({ active, setActive, mobileOpen, setMobileOpen }: {
  active: string; setActive: (s: string) => void;
  mobileOpen: boolean; setMobileOpen: (b: boolean) => void;
}) {
  return (
    <>
      {mobileOpen && <div className="fixed inset-0 bg-black/40 z-30 lg:hidden" onClick={() => setMobileOpen(false)} />}
      <aside className={`fixed top-0 left-0 h-full w-64 z-40 flex flex-col transition-transform duration-300
        bg-gradient-to-b from-indigo-950 to-purple-950 border-r border-white/10
        ${mobileOpen ? "translate-x-0" : "-translate-x-full"} lg:translate-x-0 lg:static lg:z-auto`}>

        {/* logo */}
        <div className="flex items-center gap-3 px-5 py-5 border-b border-white/10">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white font-extrabold text-base shadow-lg">
            IN
          </div>
          <div>
            <div className="text-white font-bold text-base leading-tight">INFORM</div>
            <div className="text-indigo-400 text-xs">Admin Panel</div>
          </div>
          <button className="ml-auto text-white/30 hover:text-white lg:hidden" onClick={() => setMobileOpen(false)}>✕</button>
        </div>

        {/* admin badge */}
        <div className="mx-3 mt-3 mb-1 px-3 py-2 rounded-xl bg-indigo-500/20 border border-indigo-500/30 flex items-center gap-2">
          <span>🛡️</span>
          <div>
            <div className="text-indigo-300 text-xs font-bold">Administrator</div>
            <div className="text-indigo-400/70 text-xs">Full Access</div>
          </div>
        </div>

        {/* nav */}
        <nav className="flex-1 px-3 py-3 flex flex-col gap-1 overflow-y-auto">
          {navItems.map(item => (
            <button key={item.id} onClick={() => { setActive(item.id); setMobileOpen(false); }}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all w-full text-left
                ${active === item.id
                  ? "bg-indigo-600 text-white shadow-md shadow-indigo-900/50"
                  : "text-white/50 hover:text-white hover:bg-white/5"}`}>
              <span>{item.icon}</span>{item.label}
            </button>
          ))}
        </nav>

        {/* user */}
        <div className="px-3 py-4 border-t border-white/10">
          <div className="flex items-center gap-3 bg-white/5 rounded-xl px-3 py-3 border border-white/10">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white text-xs font-bold shrink-0">AD</div>
            <div className="flex-1 min-w-0">
              <div className="text-white text-xs font-semibold truncate">Admin User</div>
              <div className="text-white/30 text-xs truncate">admin@inform.edu</div>
            </div>
            <Link href="/" className="text-white/20 hover:text-white/60 text-xs transition-colors" title="Log out">↩</Link>
          </div>
        </div>
      </aside>
    </>
  );
}

/* ─── OVERVIEW PANEL ─── */
function Overview({ setActive }: { setActive: (s: string) => void }) {
  const totalStudents  = students.length;
  const activeStudents = students.filter(s => s.status === "Active").length;
  const unpaidCount    = students.filter(s => s.tuition === "Unpaid").length;
  const avgGwa         = (students.reduce((a, s) => a + s.gwa, 0) / students.length).toFixed(2);

  const quickLinks = [
    { id:"students",      label:"Manage Students",   icon:"🎓", color:"from-blue-500 to-blue-700",     shadow:"shadow-blue-200"   },
    { id:"grades",        label:"Manage Grades",     icon:"📊", color:"from-violet-500 to-purple-700", shadow:"shadow-violet-200" },
    { id:"enrollment",    label:"Enrollment",        icon:"📋", color:"from-teal-500 to-cyan-600",     shadow:"shadow-teal-200"   },
    { id:"tuition",       label:"Tuition Records",   icon:"💰", color:"from-amber-500 to-orange-600",  shadow:"shadow-amber-200"  },
    { id:"announcements", label:"Announcements",     icon:"📢", color:"from-pink-500 to-rose-600",     shadow:"shadow-pink-200"   },
    { id:"reports",       label:"Reports",           icon:"📈", color:"from-green-500 to-emerald-600", shadow:"shadow-green-200"  },
  ];

  return (
    <div className="flex flex-col gap-6">
      {/* welcome */}
      <div className="rounded-2xl p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
        style={{ background:"linear-gradient(135deg,#6366f1,#7c3aed)", boxShadow:"0 8px 32px rgba(99,102,241,0.25)" }}>
        <div>
          <h2 className="text-white font-extrabold text-xl sm:text-2xl">Welcome back, Admin 👋</h2>
          <p className="text-white/70 text-sm mt-1">
            <span className="text-white font-semibold">{unpaidCount} students</span> have unpaid tuition this semester.
          </p>
        </div>
        <div className="flex items-center gap-3 bg-white/20 border border-white/30 rounded-xl px-4 py-3 shrink-0">
          <span className="text-2xl">🎓</span>
          <div>
            <div className="text-white font-extrabold text-xl leading-none">{totalStudents}</div>
            <div className="text-white/70 text-xs">Total Students</div>
          </div>
        </div>
      </div>

      {/* stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label:"Total Students",   value: totalStudents,           icon:"🎓", color:"text-indigo-600",  bg:"bg-indigo-50  border-indigo-100"  },
          { label:"Active Students",  value: activeStudents,          icon:"✅", color:"text-green-600",   bg:"bg-green-50   border-green-100"   },
          { label:"Unpaid Tuition",   value: unpaidCount,             icon:"⚠️", color:"text-red-500",     bg:"bg-red-50     border-red-100"     },
          { label:"Class Avg. GWA",   value: avgGwa,                  icon:"📈", color:"text-purple-600",  bg:"bg-purple-50  border-purple-100"  },
        ].map(s => (
          <div key={s.label} className={`rounded-2xl p-4 border ${s.bg}`}>
            <div className="flex items-center justify-between mb-2">
              <span className="text-slate-500 text-xs font-medium">{s.label}</span>
              <span className="text-xl">{s.icon}</span>
            </div>
            <div className={`font-extrabold text-2xl ${s.color}`}>{s.value}</div>
          </div>
        ))}
      </div>

      {/* quick access tiles */}
      <div>
        <p className="text-slate-400 text-xs uppercase tracking-widest font-semibold mb-4">Quick Access</p>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          {quickLinks.map(q => (
            <button key={q.id} onClick={() => setActive(q.id)}
              className={`bg-gradient-to-br ${q.color} rounded-2xl p-4 flex flex-col items-center gap-2 text-center shadow-md ${q.shadow} hover:scale-105 hover:shadow-lg transition-all duration-200`}>
              <span className="text-3xl">{q.icon}</span>
              <span className="text-white font-bold text-xs leading-tight">{q.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* recent activity + announcements */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-5">
          <h3 className="text-slate-700 font-bold text-sm mb-4">Recent Activity</h3>
          <div className="flex flex-col gap-3">
            {recentActivity.map((a, i) => (
              <div key={i} className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center text-lg shrink-0">{a.icon}</div>
                <div className="flex-1 min-w-0">
                  <div className="text-slate-700 text-xs font-semibold truncate">{a.action}</div>
                  <div className="text-slate-400 text-xs">{a.name}</div>
                </div>
                <span className="text-slate-300 text-xs shrink-0">{a.time}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-5">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-slate-700 font-bold text-sm">Active Announcements</h3>
            <button onClick={() => setActive("announcements")} className="text-indigo-500 hover:text-indigo-700 text-xs font-semibold transition-colors">View all →</button>
          </div>
          <div className="flex flex-col gap-2">
            {announcements.filter(a => a.status === "Active").slice(0,4).map(a => (
              <div key={a.id} className="flex items-start gap-3 p-3 rounded-xl bg-slate-50 hover:bg-indigo-50 transition-colors cursor-pointer border border-transparent hover:border-indigo-100">
                <span className="text-lg shrink-0">📢</span>
                <div className="flex-1 min-w-0">
                  <div className="text-slate-700 text-xs font-semibold truncate">{a.title}</div>
                  <div className="text-slate-400 text-xs">{a.target} · {a.date}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─── STUDENTS PANEL ─── */
function StudentsPanel() {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");
  const filtered = students.filter(s => {
    const matchSearch = s.name.toLowerCase().includes(search.toLowerCase()) || s.id.toLowerCase().includes(search.toLowerCase());
    const matchFilter = filter === "All" || s.status === filter || s.tuition === filter;
    return matchSearch && matchFilter;
  });

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h2 className="text-slate-800 font-extrabold text-2xl">Students</h2>
          <p className="text-slate-400 text-sm mt-0.5">{students.length} enrolled students this semester</p>
        </div>
        <button className="bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-bold px-4 py-2 rounded-xl transition-colors shadow-md shadow-indigo-200 flex items-center gap-2 self-start sm:self-auto">
          + Add Student
        </button>
      </div>

      <div className="flex flex-col sm:flex-row gap-3">
        <div className="flex items-center gap-2 bg-white border border-slate-200 rounded-xl px-3 py-2 shadow-sm flex-1">
          <span className="text-slate-400">🔍</span>
          <input value={search} onChange={e => setSearch(e.target.value)}
            placeholder="Search by name or ID..."
            className="flex-1 text-sm text-slate-600 placeholder-slate-300 bg-transparent focus:outline-none" />
        </div>
        <div className="flex gap-2">
          {["All","Active","Inactive","Paid","Unpaid"].map(f => (
            <button key={f} onClick={() => setFilter(f)}
              className={`px-3 py-2 rounded-xl text-xs font-semibold transition-all border
                ${filter === f ? "bg-indigo-600 text-white border-indigo-600 shadow-md shadow-indigo-200" : "bg-white text-slate-500 border-slate-200 hover:border-indigo-300 hover:text-indigo-600"}`}>
              {f}
            </button>
          ))}
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
        <div className="grid grid-cols-12 px-5 py-3 bg-slate-50 border-b border-slate-100">
          <span className="col-span-1 text-xs font-semibold text-slate-400 uppercase tracking-wider hidden sm:block">#</span>
          <span className="col-span-4 sm:col-span-3 text-xs font-semibold text-slate-400 uppercase tracking-wider">Name</span>
          <span className="col-span-3 sm:col-span-2 text-xs font-semibold text-slate-400 uppercase tracking-wider hidden sm:block">ID</span>
          <span className="col-span-2 text-xs font-semibold text-slate-400 uppercase tracking-wider hidden lg:block">Course</span>
          <span className="col-span-1 text-xs font-semibold text-slate-400 uppercase tracking-wider hidden lg:block">GWA</span>
          <span className="col-span-4 sm:col-span-2 text-xs font-semibold text-slate-400 uppercase tracking-wider">Status</span>
          <span className="col-span-4 sm:col-span-2 text-xs font-semibold text-slate-400 uppercase tracking-wider">Tuition</span>
        </div>
        {filtered.length === 0 ? (
          <div className="px-5 py-10 text-center text-slate-400 text-sm">No students found.</div>
        ) : filtered.map((s, i) => (
          <div key={s.id} className="grid grid-cols-12 px-5 py-3.5 border-b border-slate-50 last:border-0 items-center hover:bg-slate-50 transition-colors cursor-pointer">
            <span className="col-span-1 text-slate-300 text-xs hidden sm:block">{i + 1}</span>
            <div className="col-span-4 sm:col-span-3 flex items-center gap-2 min-w-0">
              <div className="w-7 h-7 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 text-xs font-bold shrink-0">
                {s.name.split(" ").map(n => n[0]).join("").slice(0,2)}
              </div>
              <span className="text-slate-700 text-sm font-medium truncate">{s.name}</span>
            </div>
            <span className="col-span-3 sm:col-span-2 text-slate-400 text-xs hidden sm:block font-mono">{s.id}</span>
            <span className="col-span-2 text-slate-500 text-xs hidden lg:block">{s.course} — Y{s.year}</span>
            <span className="col-span-1 text-indigo-600 text-xs font-bold hidden lg:block">{s.gwa}</span>
            <div className="col-span-4 sm:col-span-2">
              <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${s.status === "Active" ? "bg-green-100 text-green-600" : "bg-slate-100 text-slate-400"}`}>
                {s.status}
              </span>
            </div>
            <div className="col-span-4 sm:col-span-2">
              <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${s.tuition === "Paid" ? "bg-blue-100 text-blue-600" : "bg-red-100 text-red-500"}`}>
                {s.tuition}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ─── GRADES PANEL ─── */
function GradesPanel() {
  const [selected, setSelected] = useState(students[0].id);
  const student = students.find(s => s.id === selected)!;
  const grades = [
    { subject:"Mathematics",        grade:"A",  pct:92, units:3, teacher:"Mr. Dela Cruz"   },
    { subject:"Physics",            grade:"B+", pct:87, units:3, teacher:"Ms. Villanueva"  },
    { subject:"English Literature", grade:"A+", pct:96, units:3, teacher:"Ms. Santos"      },
    { subject:"Chemistry",          grade:"B",  pct:81, units:3, teacher:"Mr. Fernandez"   },
    { subject:"History",            grade:"B+", pct:85, units:3, teacher:"Ms. Reyes"       },
    { subject:"Computer Science",   grade:"A",  pct:93, units:3, teacher:"Mr. Uy"          },
  ];
  const avg = Math.round(grades.reduce((a, g) => a + g.pct, 0) / grades.length);

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h2 className="text-slate-800 font-extrabold text-2xl">Grades Management</h2>
          <p className="text-slate-400 text-sm mt-0.5">View and manage student grades</p>
        </div>
        <button className="bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-bold px-4 py-2 rounded-xl transition-colors shadow-md shadow-indigo-200 self-start sm:self-auto">
          + Submit Grades
        </button>
      </div>

      <div className="flex flex-col sm:flex-row gap-4">
        <div className="sm:w-56 shrink-0">
          <label className="text-slate-500 text-xs font-semibold uppercase tracking-widest block mb-1.5">Select Student</label>
          <select value={selected} onChange={e => setSelected(e.target.value)}
            className="w-full bg-white border border-slate-200 rounded-xl px-3 py-2.5 text-sm text-slate-700 focus:outline-none focus:border-indigo-400 shadow-sm">
            {students.map(s => <option key={s.id} value={s.id}>{s.name}</option>)}
          </select>
        </div>
        <div className="flex-1 bg-indigo-50 border border-indigo-100 rounded-2xl px-5 py-4 flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-indigo-600 flex items-center justify-center text-white font-bold text-lg shrink-0">
            {student.name.split(" ").map(n => n[0]).join("").slice(0,2)}
          </div>
          <div className="flex-1">
            <div className="text-slate-800 font-bold">{student.name}</div>
            <div className="text-slate-400 text-xs">{student.id} · {student.course} Year {student.year}</div>
          </div>
          <div className="text-right">
            <div className="text-2xl font-extrabold text-indigo-600">{avg}%</div>
            <div className="text-slate-400 text-xs">General Average</div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
        <div className="grid grid-cols-12 px-5 py-3 bg-slate-50 border-b border-slate-100">
          <span className="col-span-4 text-xs font-semibold text-slate-400 uppercase tracking-wider">Subject</span>
          <span className="col-span-3 text-xs font-semibold text-slate-400 uppercase tracking-wider hidden sm:block">Teacher</span>
          <span className="col-span-2 text-xs font-semibold text-slate-400 uppercase tracking-wider text-center">Units</span>
          <span className="col-span-2 text-xs font-semibold text-slate-400 uppercase tracking-wider text-right">Score</span>
          <span className="col-span-1 text-xs font-semibold text-slate-400 uppercase tracking-wider text-right">Grade</span>
        </div>
        {grades.map((g, i) => (
          <div key={i} className="grid grid-cols-12 px-5 py-4 border-b border-slate-50 last:border-0 items-center hover:bg-slate-50 transition-colors">
            <span className="col-span-4 text-slate-700 text-sm font-medium">{g.subject}</span>
            <span className="col-span-3 text-slate-400 text-xs hidden sm:block">{g.teacher}</span>
            <span className="col-span-2 text-slate-500 text-xs text-center">{g.units}</span>
            <div className="col-span-2 text-right">
              <div className="inline-flex items-center gap-1">
                <div className="w-16 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                  <div className="h-full bg-indigo-500 rounded-full" style={{ width:`${g.pct}%` }} />
                </div>
                <span className="text-slate-600 text-xs font-semibold">{g.pct}%</span>
              </div>
            </div>
            <span className={`col-span-1 text-right text-sm font-extrabold ${g.pct >= 90 ? "text-green-600" : g.pct >= 80 ? "text-indigo-600" : "text-amber-600"}`}>{g.grade}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ─── ENROLLMENT PANEL ─── */
function EnrollmentPanel() {
  const enrollments = [
    { name:"Jamie Santos",    id:"STU-2024-001", course:"BSCS",  year:2, date:"May 18, 2026", status:"Confirmed" },
    { name:"Maria Reyes",     id:"STU-2024-002", course:"BSED",  year:1, date:"May 19, 2026", status:"Pending"   },
    { name:"Carlo Dela Cruz", id:"STU-2024-003", course:"BSBA",  year:3, date:"May 17, 2026", status:"Confirmed" },
    { name:"Ana Villanueva",  id:"STU-2024-004", course:"BSN",   year:2, date:"May 20, 2026", status:"Pending"   },
    { name:"Luis Fernandez",  id:"STU-2024-005", course:"BSCS",  year:4, date:"May 16, 2026", status:"Confirmed" },
    { name:"Rosa Bautista",   id:"STU-2024-006", course:"BSED",  year:1, date:"May 20, 2026", status:"Confirmed" },
  ];
  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h2 className="text-slate-800 font-extrabold text-2xl">Enrollment</h2>
          <p className="text-slate-400 text-sm mt-0.5">1st Semester · Deadline: June 15, 2026</p>
        </div>
        <div className="flex items-center gap-2 bg-yellow-50 border border-yellow-200 rounded-xl px-4 py-2">
          <span>🔔</span>
          <span className="text-yellow-700 text-xs font-semibold">Enrollment period is open</span>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {[
          { label:"Total Enrolled",  value: enrollments.length,                                          color:"text-indigo-600", bg:"bg-indigo-50 border-indigo-100" },
          { label:"Confirmed",       value: enrollments.filter(e => e.status==="Confirmed").length,      color:"text-green-600",  bg:"bg-green-50  border-green-100"  },
          { label:"Pending Review",  value: enrollments.filter(e => e.status==="Pending").length,        color:"text-amber-600",  bg:"bg-amber-50  border-amber-100"  },
        ].map(s => (
          <div key={s.label} className={`rounded-2xl border p-5 ${s.bg}`}>
            <div className="text-slate-400 text-xs font-medium mb-1">{s.label}</div>
            <div className={`text-3xl font-extrabold ${s.color}`}>{s.value}</div>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
        <div className="grid grid-cols-12 px-5 py-3 bg-slate-50 border-b border-slate-100">
          <span className="col-span-4 sm:col-span-3 text-xs font-semibold text-slate-400 uppercase tracking-wider">Student</span>
          <span className="col-span-3 sm:col-span-2 text-xs font-semibold text-slate-400 uppercase tracking-wider hidden sm:block">ID</span>
          <span className="col-span-2 text-xs font-semibold text-slate-400 uppercase tracking-wider hidden lg:block">Course</span>
          <span className="col-span-3 sm:col-span-2 text-xs font-semibold text-slate-400 uppercase tracking-wider hidden sm:block">Date</span>
          <span className="col-span-4 sm:col-span-2 text-xs font-semibold text-slate-400 uppercase tracking-wider">Status</span>
          <span className="col-span-4 sm:col-span-1 text-xs font-semibold text-slate-400 uppercase tracking-wider text-right">Action</span>
        </div>
        {enrollments.map((e, i) => (
          <div key={i} className="grid grid-cols-12 px-5 py-3.5 border-b border-slate-50 last:border-0 items-center hover:bg-slate-50 transition-colors">
            <div className="col-span-4 sm:col-span-3 flex items-center gap-2 min-w-0">
              <div className="w-7 h-7 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 text-xs font-bold shrink-0">
                {e.name.split(" ").map(n => n[0]).join("").slice(0,2)}
              </div>
              <span className="text-slate-700 text-sm font-medium truncate">{e.name}</span>
            </div>
            <span className="col-span-3 sm:col-span-2 text-slate-400 text-xs hidden sm:block font-mono">{e.id}</span>
            <span className="col-span-2 text-slate-500 text-xs hidden lg:block">{e.course} Y{e.year}</span>
            <span className="col-span-3 sm:col-span-2 text-slate-400 text-xs hidden sm:block">{e.date}</span>
            <div className="col-span-4 sm:col-span-2">
              <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${e.status==="Confirmed" ? "bg-green-100 text-green-600" : "bg-amber-100 text-amber-600"}`}>
                {e.status}
              </span>
            </div>
            <div className="col-span-4 sm:col-span-1 text-right">
              {e.status === "Pending" && (
                <button className="text-xs bg-indigo-600 hover:bg-indigo-700 text-white px-2.5 py-1 rounded-lg transition-colors">Confirm</button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ─── TUITION PANEL ─── */
function TuitionPanel() {
  const records = students.map(s => ({
    ...s,
    total:  22050,
    paid:   s.tuition === "Paid" ? 22050 : 18500,
    balance:s.tuition === "Paid" ? 0 : 3550,
  }));
  const totalCollected = records.reduce((a, r) => a + r.paid, 0);
  const totalBalance   = records.reduce((a, r) => a + r.balance, 0);

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h2 className="text-slate-800 font-extrabold text-2xl">Tuition Records</h2>
        <p className="text-slate-400 text-sm mt-0.5">1st Semester · Academic Year 2025–2026</p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {[
          { label:"Total Assessment",  value:`₱${(records.length * 22050).toLocaleString()}`, color:"text-slate-800",  bg:"bg-slate-50  border-slate-200"  },
          { label:"Total Collected",   value:`₱${totalCollected.toLocaleString()}`,            color:"text-green-600",  bg:"bg-green-50  border-green-100"  },
          { label:"Total Balance Due", value:`₱${totalBalance.toLocaleString()}`,              color:"text-red-500",    bg:"bg-red-50    border-red-100"    },
        ].map(s => (
          <div key={s.label} className={`rounded-2xl border p-5 ${s.bg}`}>
            <div className="text-slate-400 text-xs font-medium mb-1">{s.label}</div>
            <div className={`text-2xl font-extrabold ${s.color}`}>{s.value}</div>
          </div>
        ))}
      </div>
      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
        <div className="grid grid-cols-12 px-5 py-3 bg-slate-50 border-b border-slate-100">
          <span className="col-span-4 sm:col-span-3 text-xs font-semibold text-slate-400 uppercase tracking-wider">Student</span>
          <span className="col-span-3 sm:col-span-2 text-xs font-semibold text-slate-400 uppercase tracking-wider hidden sm:block">Course</span>
          <span className="col-span-2 text-xs font-semibold text-slate-400 uppercase tracking-wider text-right hidden sm:block">Total</span>
          <span className="col-span-2 text-xs font-semibold text-slate-400 uppercase tracking-wider text-right hidden sm:block">Paid</span>
          <span className="col-span-2 text-xs font-semibold text-slate-400 uppercase tracking-wider text-right">Balance</span>
          <span className="col-span-4 sm:col-span-1 text-xs font-semibold text-slate-400 uppercase tracking-wider text-right">Status</span>
        </div>
        {records.map((r, i) => (
          <div key={i} className="grid grid-cols-12 px-5 py-3.5 border-b border-slate-50 last:border-0 items-center hover:bg-slate-50 transition-colors">
            <div className="col-span-4 sm:col-span-3 flex items-center gap-2 min-w-0">
              <div className="w-7 h-7 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 text-xs font-bold shrink-0">
                {r.name.split(" ").map(n => n[0]).join("").slice(0,2)}
              </div>
              <span className="text-slate-700 text-sm font-medium truncate">{r.name}</span>
            </div>
            <span className="col-span-3 sm:col-span-2 text-slate-400 text-xs hidden sm:block">{r.course}</span>
            <span className="col-span-2 text-slate-500 text-xs text-right hidden sm:block">₱{r.total.toLocaleString()}</span>
            <span className="col-span-2 text-green-600 text-xs font-semibold text-right hidden sm:block">₱{r.paid.toLocaleString()}</span>
            <span className={`col-span-2 text-xs font-semibold text-right ${r.balance > 0 ? "text-red-500" : "text-slate-400"}`}>
              {r.balance > 0 ? `₱${r.balance.toLocaleString()}` : "—"}
            </span>
            <div className="col-span-4 sm:col-span-1 text-right">
              <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${r.tuition==="Paid" ? "bg-green-100 text-green-600" : "bg-red-100 text-red-500"}`}>
                {r.tuition}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ─── ANNOUNCEMENTS PANEL ─── */
function AnnouncementsPanel() {
  const [items, setItems] = useState(announcements);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ title:"", target:"All Students" });

  function addAnnouncement() {
    if (!form.title.trim()) return;
    setItems(prev => [{
      id: Date.now(), title: form.title, date: "Today",
      target: form.target, status: "Active",
    }, ...prev]);
    setForm({ title:"", target:"All Students" });
    setShowForm(false);
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h2 className="text-slate-800 font-extrabold text-2xl">Announcements</h2>
          <p className="text-slate-400 text-sm mt-0.5">{items.filter(a => a.status==="Active").length} active announcements</p>
        </div>
        <button onClick={() => setShowForm(!showForm)}
          className="bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-bold px-4 py-2 rounded-xl transition-colors shadow-md shadow-indigo-200 self-start sm:self-auto">
          + New Announcement
        </button>
      </div>

      {showForm && (
        <div className="bg-white rounded-2xl border border-indigo-200 shadow-sm p-5 flex flex-col gap-4">
          <h3 className="text-slate-700 font-bold text-sm">New Announcement</h3>
          <input value={form.title} onChange={e => setForm({...form, title:e.target.value})}
            placeholder="Announcement title..."
            className="bg-slate-50 border border-slate-200 focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100 rounded-xl px-4 py-3 text-slate-800 placeholder-slate-300 text-sm outline-none transition" />
          <select value={form.target} onChange={e => setForm({...form, target:e.target.value})}
            className="bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm text-slate-700 focus:outline-none focus:border-indigo-400">
            {["All Students","Active Students","Unpaid Students","4th Year","New Students"].map(t => (
              <option key={t}>{t}</option>
            ))}
          </select>
          <div className="flex gap-3">
            <button onClick={() => setShowForm(false)} className="flex-1 bg-slate-100 hover:bg-slate-200 text-slate-600 font-semibold text-sm py-2.5 rounded-xl transition-colors">Cancel</button>
            <button onClick={addAnnouncement} className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-sm py-2.5 rounded-xl transition-colors shadow-md shadow-indigo-200">Post</button>
          </div>
        </div>
      )}

      <div className="flex flex-col gap-3">
        {items.map(a => (
          <div key={a.id} className="bg-white rounded-2xl border border-slate-100 shadow-sm p-5 flex items-start gap-4 hover:border-indigo-200 transition-colors">
            <div className="w-10 h-10 rounded-xl bg-indigo-50 border border-indigo-100 flex items-center justify-center text-xl shrink-0">📢</div>
            <div className="flex-1 min-w-0">
              <div className="text-slate-700 font-bold text-sm">{a.title}</div>
              <div className="text-slate-400 text-xs mt-0.5">Target: {a.target} · {a.date}</div>
            </div>
            <div className="flex items-center gap-2 shrink-0">
              <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${a.status==="Active" ? "bg-green-100 text-green-600" : "bg-slate-100 text-slate-400"}`}>
                {a.status}
              </span>
              <button className="text-slate-300 hover:text-red-400 transition-colors text-sm" onClick={() => setItems(items.filter(i => i.id !== a.id))}>✕</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ─── LIBRARY PANEL ─── */
function LibraryPanel() {
  const books = [
    { title:"Calculus: Early Transcendentals",    author:"James Stewart",      category:"Mathematics", copies:5, available:3 },
    { title:"Conceptual Physics",                 author:"Paul G. Hewitt",     category:"Physics",     copies:4, available:1 },
    { title:"The Complete Works of Shakespeare",  author:"W. Shakespeare",     category:"Literature",  copies:6, available:6 },
    { title:"Chemistry: The Central Science",     author:"Brown & LeMay",      category:"Chemistry",   copies:4, available:4 },
    { title:"Sapiens: A Brief History",           author:"Yuval Noah Harari",  category:"History",     copies:3, available:1 },
    { title:"Introduction to Algorithms",         author:"Cormen et al.",      category:"CS",          copies:5, available:5 },
    { title:"The Great Gatsby",                   author:"F. Scott Fitzgerald",category:"Literature",  copies:8, available:7 },
    { title:"Physics for Scientists & Engineers", author:"Serway & Jewett",    category:"Physics",     copies:4, available:4 },
  ];
  const [search, setSearch] = useState("");
  const filtered = books.filter(b =>
    b.title.toLowerCase().includes(search.toLowerCase()) ||
    b.author.toLowerCase().includes(search.toLowerCase())
  );
  const totalBooks     = books.reduce((a, b) => a + b.copies, 0);
  const totalAvailable = books.reduce((a, b) => a + b.available, 0);
  const totalBorrowed  = totalBooks - totalAvailable;

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h2 className="text-slate-800 font-extrabold text-2xl">Library Management</h2>
          <p className="text-slate-400 text-sm mt-0.5">{books.length} titles · {totalBooks} total copies</p>
        </div>
        <button className="bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-bold px-4 py-2 rounded-xl transition-colors shadow-md shadow-indigo-200 self-start sm:self-auto">
          + Add Book
        </button>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {[
          { label:"Total Copies",    value:totalBooks,     color:"text-indigo-600", bg:"bg-indigo-50 border-indigo-100" },
          { label:"Available",       value:totalAvailable, color:"text-green-600",  bg:"bg-green-50  border-green-100"  },
          { label:"Borrowed",        value:totalBorrowed,  color:"text-amber-600",  bg:"bg-amber-50  border-amber-100"  },
        ].map(s => (
          <div key={s.label} className={`rounded-2xl border p-5 ${s.bg}`}>
            <div className="text-slate-400 text-xs font-medium mb-1">{s.label}</div>
            <div className={`text-3xl font-extrabold ${s.color}`}>{s.value}</div>
          </div>
        ))}
      </div>
      <div className="flex items-center gap-2 bg-white border border-slate-200 rounded-xl px-3 py-2.5 shadow-sm">
        <span className="text-slate-400">🔍</span>
        <input value={search} onChange={e => setSearch(e.target.value)}
          placeholder="Search books..."
          className="flex-1 text-sm text-slate-600 placeholder-slate-300 bg-transparent focus:outline-none" />
      </div>
      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
        <div className="grid grid-cols-12 px-5 py-3 bg-slate-50 border-b border-slate-100">
          <span className="col-span-5 text-xs font-semibold text-slate-400 uppercase tracking-wider">Title</span>
          <span className="col-span-3 text-xs font-semibold text-slate-400 uppercase tracking-wider hidden sm:block">Author</span>
          <span className="col-span-2 text-xs font-semibold text-slate-400 uppercase tracking-wider text-center">Copies</span>
          <span className="col-span-2 text-xs font-semibold text-slate-400 uppercase tracking-wider text-center">Available</span>
        </div>
        {filtered.map((b, i) => (
          <div key={i} className="grid grid-cols-12 px-5 py-4 border-b border-slate-50 last:border-0 items-center hover:bg-slate-50 transition-colors">
            <div className="col-span-5 min-w-0 pr-2">
              <div className="text-slate-700 text-sm font-medium truncate">{b.title}</div>
              <div className="text-slate-400 text-xs">{b.category}</div>
            </div>
            <span className="col-span-3 text-slate-400 text-xs hidden sm:block truncate">{b.author}</span>
            <span className="col-span-2 text-slate-600 text-sm font-semibold text-center">{b.copies}</span>
            <div className="col-span-2 text-center">
              <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${b.available > 0 ? "bg-green-100 text-green-600" : "bg-red-100 text-red-500"}`}>
                {b.available}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ─── REPORTS PANEL ─── */
function ReportsPanel() {
  const weekDays   = ["Mon","Tue","Wed","Thu","Fri","Sat","Sun"];
  const logins     = [12, 28, 22, 35, 30, 18, 8];
  const maxL       = Math.max(...logins);
  const courseData = [
    { course:"BSCS", count:2, color:"bg-indigo-500" },
    { course:"BSED", count:2, color:"bg-pink-500"   },
    { course:"BSBA", count:2, color:"bg-amber-500"  },
    { course:"BSN",  count:2, color:"bg-cyan-500"   },
  ];
  return (
    <div className="flex flex-col gap-6">
      <div>
        <h2 className="text-slate-800 font-extrabold text-2xl">Reports</h2>
        <p className="text-slate-400 text-sm mt-0.5">System analytics and summaries</p>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-5">
          <h3 className="text-slate-700 font-bold text-sm mb-4">Daily Portal Logins (This Week)</h3>
          <div className="flex items-end gap-2 h-32">
            {logins.map((h, i) => (
              <div key={i} className="flex-1 flex flex-col items-center gap-1">
                <span className="text-slate-400 text-xs">{h}</span>
                <div className="w-full rounded-t-lg bg-indigo-500" style={{ height:`${(h/maxL)*100}%` }} />
              </div>
            ))}
          </div>
          <div className="flex justify-between mt-2">
            {weekDays.map(d => <span key={d} className="flex-1 text-center text-slate-400 text-xs">{d}</span>)}
          </div>
        </div>
        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-5">
          <h3 className="text-slate-700 font-bold text-sm mb-4">Students by Course</h3>
          <div className="flex flex-col gap-3">
            {courseData.map(c => (
              <div key={c.course} className="flex items-center gap-3">
                <span className="text-slate-500 text-xs font-semibold w-12 shrink-0">{c.course}</span>
                <div className="flex-1 h-3 bg-slate-100 rounded-full overflow-hidden">
                  <div className={`h-full ${c.color} rounded-full`} style={{ width:`${(c.count/students.length)*100}%` }} />
                </div>
                <span className="text-slate-500 text-xs w-6 text-right shrink-0">{c.count}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {[
          { label:"Total Logins Today",   value:"35",  icon:"🔐", color:"text-indigo-600", bg:"bg-indigo-50 border-indigo-100" },
          { label:"Files Uploaded",       value:"12",  icon:"📁", color:"text-blue-600",   bg:"bg-blue-50   border-blue-100"   },
          { label:"Books Borrowed",       value:"7",   icon:"📚", color:"text-amber-600",  bg:"bg-amber-50  border-amber-100"  },
          { label:"Payments Received",    value:"₱44,100",icon:"💰",color:"text-green-600",bg:"bg-green-50  border-green-100"  },
        ].map(s => (
          <div key={s.label} className={`rounded-2xl border p-4 ${s.bg}`}>
            <div className="flex items-center justify-between mb-2">
              <span className="text-slate-400 text-xs">{s.label}</span>
              <span className="text-xl">{s.icon}</span>
            </div>
            <div className={`text-xl font-extrabold ${s.color}`}>{s.value}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ─── PAGE ─── */
export default function AdminDashboardPage() {
  const [activeNav, setActiveNav] = useState("overview");
  const [mobileOpen, setMobileOpen] = useState(false);

  function renderPanel() {
    switch (activeNav) {
      case "students":      return <StudentsPanel />;
      case "grades":        return <GradesPanel />;
      case "enrollment":    return <EnrollmentPanel />;
      case "tuition":       return <TuitionPanel />;
      case "announcements": return <AnnouncementsPanel />;
      case "library":       return <LibraryPanel />;
      case "reports":       return <ReportsPanel />;
      default:              return <Overview setActive={setActiveNav} />;
    }
  }

  return (
    <div className="flex h-screen overflow-hidden" style={{ background:"#f0f4ff" }} suppressHydrationWarning>
      <Sidebar active={activeNav} setActive={setActiveNav} mobileOpen={mobileOpen} setMobileOpen={setMobileOpen} />

      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* topbar */}
        <header className="bg-white border-b border-slate-100 px-4 sm:px-6 py-3 flex items-center gap-4 shrink-0 shadow-sm">
          <button className="lg:hidden text-slate-400 hover:text-slate-700 p-1" onClick={() => setMobileOpen(true)}>
            <div className="w-5 h-0.5 bg-current mb-1" /><div className="w-5 h-0.5 bg-current mb-1" /><div className="w-5 h-0.5 bg-current" />
          </button>
          <div className="flex-1 max-w-md">
            <div className="flex items-center gap-2 bg-slate-50 border border-slate-200 rounded-xl px-3 py-2">
              <span className="text-slate-400 text-sm">🔍</span>
              <input type="text" placeholder="Search students, records..."
                className="bg-transparent text-sm text-slate-600 placeholder-slate-300 flex-1 focus:outline-none" />
            </div>
          </div>
          <div className="flex items-center gap-3 ml-auto">
            <div className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
              <span className="text-green-600 text-xs font-medium hidden sm:block">System Online</span>
            </div>
            <button className="relative text-slate-400 hover:text-slate-600 transition-colors p-1">
              <span className="text-xl">🔔</span>
              <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full" />
            </button>
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white text-xs font-bold cursor-pointer shadow-md">AD</div>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto px-4 sm:px-6 py-6">
          {renderPanel()}
        </main>
      </div>
    </div>
  );
}
