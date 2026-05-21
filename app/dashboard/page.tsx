"use client";

import { useState, useEffect, useRef } from "react";
import type React from "react";
import Link from "next/link";

type Panel = "home" | "grades" | "schedule" | "tuition" | "library";
type JMsg  = { role: "ai" | "user"; text: string; feedback?: "up" | "down" | null };

/* ── JOBERT Chat ── */
function JobertChat({ initialPrompt }: { initialPrompt?: string }) {
  const [open, setOpen]     = useState(false);
  const [msgs, setMsgs]     = useState<JMsg[]>([{ role: "ai", text: "Hi! I am JOBERT, your INFORM Assistant. I can help you understand your grades, schedule, tuition, library, and more. What do you need?" }]);
  const [input, setInput]   = useState("");
  const [typing, setTyping] = useState(false);
  const bottomRef           = useRef<HTMLDivElement>(null);

  useEffect(() => { bottomRef.current?.scrollIntoView({ behavior: "smooth" }); }, [msgs, typing]);
  useEffect(() => { if (initialPrompt) { setOpen(true); send(initialPrompt); } }, [initialPrompt]); // eslint-disable-line

  function send(text: string) {
    if (!text.trim()) return;
    const userMsg: JMsg = { role: "user", text: text.trim() };
    const newMsgs = [...msgs, userMsg];
    setMsgs(newMsgs); setInput(""); setTyping(true);
    fetch("/api/jobert", { method: "POST", headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message: text.trim(), history: newMsgs.slice(-6).map(m => ({ role: m.role, text: m.text })) }) })
      .then(r => r.json())
      .then(d => setMsgs(prev => [...prev, { role: "ai", text: d.reply ?? "Sorry, I could not respond.", feedback: null }]))
      .catch(() => setMsgs(prev => [...prev, { role: "ai", text: "I am having trouble connecting. Please try again.", feedback: null }]))
      .finally(() => setTyping(false));
  }

  function setFeedback(idx: number, val: "up" | "down") {
    setMsgs(prev => prev.map((m, i) => i === idx ? { ...m, feedback: val } : m));
  }

  const suggestions = ["Explain my GWA","How do I pay tuition?","How to request a TOR?","Enrollment deadline?","Library hours?"];

  return (
    <>
      <button className="chat-fab" onClick={() => setOpen(!open)}>
        {open
          ? <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" width="22" height="22"><path d="M18 6L6 18M6 6l12 12"/></svg>
          : <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" width="26" height="26"><path d="M12 2a10 10 0 0 1 10 10c0 5.52-4.48 10-10 10a9.96 9.96 0 0 1-5.06-1.37L2 22l1.37-4.94A9.96 9.96 0 0 1 2 12 10 10 0 0 1 12 2"/><path d="M8 10h.01M12 10h.01M16 10h.01" strokeLinecap="round"/></svg>
        }
        {!open && <span className="position-absolute top-0 end-0 rounded-circle bg-success border border-white" style={{ width: 13, height: 13 }} />}
      </button>
      {open && (
        <div className="chat-panel">
          <div className="px-4 py-3 d-flex align-items-center gap-3 flex-shrink-0" style={{ background: "linear-gradient(135deg,#2563eb,#1d4ed8)" }}>
            <div className="rounded-circle bg-white bg-opacity-25 d-flex align-items-center justify-content-center text-white fw-bold flex-shrink-0" style={{ width: 36, height: 36, fontSize: 13 }}>AI</div>
            <div className="flex-grow-1"><div className="text-white fw-bold small">JOBERT</div><div className="text-white-50" style={{ fontSize: 11 }}>Powered by Gemini AI</div></div>
            <span className="badge bg-success-subtle text-success border border-success-subtle" style={{ fontSize: 10 }}>Online</span>
          </div>
          <div className="flex-grow-1 overflow-auto p-3 d-flex flex-column gap-2" style={{ background: "#f8fafc" }}>
            {msgs.map((m, i) => (
              <div key={i} className={`d-flex gap-2 ${m.role === "user" ? "flex-row-reverse" : ""}`}>
                {m.role === "ai" && <div className="rounded-circle bg-primary d-flex align-items-center justify-content-center text-white fw-bold flex-shrink-0" style={{ width: 28, height: 28, fontSize: 11, marginTop: 2 }}>AI</div>}
                <div className="d-flex flex-column gap-1" style={{ maxWidth: "80%" }}>
                  <div className={`rounded-3 px-3 py-2 small lh-base ${m.role === "ai" ? "bg-white border text-dark shadow-sm" : "bg-primary text-white"}`} style={{ whiteSpace: "pre-line" }}>{m.text}</div>
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
                <div className="rounded-circle bg-primary d-flex align-items-center justify-content-center text-white fw-bold flex-shrink-0" style={{ width: 28, height: 28, fontSize: 11 }}>AI</div>
                <div className="bg-white border rounded-3 px-3 py-2 d-flex gap-1 align-items-center shadow-sm">
                  {[0,150,300].map(d => <span key={d} className="rounded-circle bg-primary" style={{ width: 6, height: 6, display: "inline-block", animation: `blink 1s ${d}ms infinite` }} />)}
                </div>
              </div>
            )}
            <div ref={bottomRef} />
          </div>
          <div className="px-3 py-2 d-flex gap-2 overflow-auto flex-shrink-0 bg-white border-top" style={{ flexWrap: "nowrap" }}>
            {suggestions.map(s => <button key={s} onClick={() => send(s)} className="btn btn-sm btn-outline-primary flex-shrink-0" style={{ fontSize: 11, whiteSpace: "nowrap" }}>{s}</button>)}
          </div>
          <div className="px-3 pb-3 pt-2 d-flex gap-2 flex-shrink-0 bg-white">
            <input value={input} onChange={e => setInput(e.target.value)} onKeyDown={e => e.key === "Enter" && send(input)} placeholder="Ask JOBERT anything..." className="form-control form-control-sm" />
            <button onClick={() => send(input)} disabled={!input.trim() || typing} className="btn btn-primary btn-sm px-2">
              <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" width="16" height="16"><path d="M22 2L11 13M22 2L15 22l-4-9-9-4 20-7z"/></svg>
            </button>
          </div>
        </div>
      )}
    </>
  );
}

/* ── Data ── */
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
    { time:"07:30–08:30", subject:"Mathematics",        icon:"📐", room:"Room 301", color:"primary"   },
    { time:"08:30–09:30", subject:"English Literature", icon:"📖", room:"Room 205", color:"danger"    },
    { time:"10:00–11:00", subject:"Computer Science",   icon:"💻", room:"ICT Lab",  color:"success"   },
    { time:"13:00–14:00", subject:"Physical Education", icon:"🏃", room:"Gym",      color:"warning"   },
  ],
  Tuesday:[
    { time:"07:30–09:00", subject:"Physics",   icon:"⚛️", room:"Sci. Lab", color:"purple"  },
    { time:"09:00–10:30", subject:"Chemistry", icon:"🧪", room:"Chem Lab", color:"info"    },
    { time:"13:00–14:30", subject:"History",   icon:"🏛️", room:"Room 108", color:"warning" },
  ],
  Wednesday:[
    { time:"07:30–08:30", subject:"Mathematics",        icon:"📐", room:"Room 301", color:"primary" },
    { time:"08:30–09:30", subject:"English Literature", icon:"📖", room:"Room 205", color:"danger"  },
    { time:"10:00–11:00", subject:"Computer Science",   icon:"💻", room:"ICT Lab",  color:"success" },
  ],
  Thursday:[
    { time:"07:30–09:00", subject:"Physics",   icon:"⚛️", room:"Sci. Lab", color:"purple"  },
    { time:"09:00–10:30", subject:"Chemistry", icon:"🧪", room:"Chem Lab", color:"info"    },
    { time:"13:00–14:30", subject:"History",   icon:"🏛️", room:"Room 108", color:"warning" },
  ],
  Friday:[
    { time:"07:30–08:30", subject:"Mathematics",        icon:"📐", room:"Room 301", color:"primary" },
    { time:"08:30–09:30", subject:"Computer Science",   icon:"💻", room:"ICT Lab",  color:"success" },
    { time:"10:00–11:00", subject:"English Literature", icon:"📖", room:"Room 205", color:"danger"  },
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
  { title:"Calculus: Early Transcendentals",  author:"James Stewart",       category:"Mathematics", available:true,  due:null    },
  { title:"Conceptual Physics",               author:"Paul G. Hewitt",      category:"Physics",     available:false, due:"Jun 2" },
  { title:"Complete Works of Shakespeare",    author:"W. Shakespeare",      category:"Literature",  available:true,  due:null    },
  { title:"Chemistry: The Central Science",   author:"Brown & LeMay",       category:"Chemistry",   available:true,  due:null    },
  { title:"Sapiens: A Brief History",         author:"Yuval Noah Harari",   category:"History",     available:false, due:"Jun 5" },
  { title:"Introduction to Algorithms",       author:"Cormen et al.",       category:"CS",          available:true,  due:null    },
];

/* ── Back button ── */
function BackBtn({ onClick }: { onClick: () => void }) {
  return (
    <button onClick={onClick} className="btn btn-link text-muted text-decoration-none ps-0 mb-3 d-flex align-items-center gap-1 small fw-semibold">
      ← Back to Dashboard
    </button>
  );
}

/* ── Grades View ── */
function GradesView({ onBack, onAskJobert }: { onBack: () => void; onAskJobert: (p: string) => void }) {
  const avg = Math.round(gradeData.reduce((a, g) => a + g.pct, 0) / gradeData.length);
  return (
    <div className="d-flex flex-column gap-4">
      <BackBtn onClick={onBack} />
      <div className="d-flex align-items-start justify-content-between gap-3 flex-wrap">
        <div>
          <h2 className="fw-black fs-4 text-dark mb-0">My Grades</h2>
          <p className="text-muted small mb-0">1st Semester · 2025–2026</p>
        </div>
        <div className="d-flex flex-column align-items-center gap-1">
          <div className="bg-primary bg-opacity-10 border border-primary border-opacity-25 rounded-3 px-4 py-2 text-center">
            <div className="text-muted" style={{ fontSize: 11 }}>General Average</div>
            <div className="fw-black fs-3 text-primary">{avg}%</div>
          </div>
          <button onClick={() => onAskJobert(`My general average is ${avg}%. Can you explain what this means in the Philippine grading scale?`)}
            className="btn btn-link btn-sm p-0 text-primary" style={{ fontSize: 12 }}>🤖 Ask JOBERT to explain</button>
        </div>
      </div>
      <div className="row g-3">
        {gradeData.map((g, i) => (
          <div key={i} className="col-12 col-sm-6">
            <div className="card border-0 shadow-sm rounded-3 h-100">
              <div className="card-body p-4">
                <div className="d-flex align-items-center gap-3 mb-3">
                  <div className="rounded-3 bg-primary d-flex align-items-center justify-content-center flex-shrink-0" style={{ width: 40, height: 40, fontSize: 20 }}>{g.icon}</div>
                  <div className="flex-grow-1 overflow-hidden">
                    <div className="fw-bold small text-dark text-truncate">{g.subject}</div>
                    <div className="text-muted" style={{ fontSize: 11 }}>{g.teacher}</div>
                  </div>
                  <div className="fw-black fs-4 text-primary flex-shrink-0">{g.grade}</div>
                </div>
                <div className="progress mb-2" style={{ height: 6 }}>
                  <div className="progress-bar bg-primary" style={{ width: `${g.pct}%` }} />
                </div>
                <div className="d-flex justify-content-between align-items-center mb-3">
                  <span className="text-muted small">{g.pct}%</span>
                  <span className={`badge ${g.status === "Excellent" ? "bg-success-subtle text-success border border-success-subtle" : "bg-primary-subtle text-primary border border-primary-subtle"}`}>{g.status}</span>
                </div>
                <button onClick={() => onAskJobert(`I got ${g.grade} (${g.pct}%) in ${g.subject} with ${g.teacher}. Can you explain this grade and give me tips to improve?`)}
                  className="btn btn-outline-primary btn-sm w-100" style={{ fontSize: 12 }}>🤖 Ask JOBERT about this grade</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ── Schedule View ── */
function ScheduleView({ onBack, onAskJobert }: { onBack: () => void; onAskJobert: (p: string) => void }) {
  const days = ["Monday","Tuesday","Wednesday","Thursday","Friday"];
  const todayIdx = Math.min(new Date().getDay() - 1, 4);
  const [day, setDay] = useState(days[todayIdx >= 0 ? todayIdx : 0]);
  const subjectList = timetable[day].map(c => c.subject).join(", ");

  return (
    <div className="d-flex flex-column gap-4">
      <BackBtn onClick={onBack} />
      <div className="d-flex align-items-start justify-content-between gap-3 flex-wrap">
        <div>
          <h2 className="fw-black fs-4 text-dark mb-0">My Schedule</h2>
          <p className="text-muted small mb-0">1st Semester · 2025–2026</p>
        </div>
        <button onClick={() => onAskJobert(`Today is ${day}. My classes are: ${subjectList}. Can you give me study tips for each subject?`)}
          className="btn btn-outline-primary btn-sm d-flex align-items-center gap-1 flex-shrink-0" style={{ fontSize: 12 }}>🤖 Study tips for today</button>
      </div>
      <div className="d-flex gap-2 overflow-auto pb-1">
        {days.map(d => (
          <button key={d} onClick={() => setDay(d)}
            className={`btn btn-sm flex-shrink-0 ${day === d ? "btn-primary shadow-sm" : "btn-outline-secondary"}`}>
            {d.slice(0, 3)}
          </button>
        ))}
      </div>
      <div className="d-flex flex-column gap-2">
        {timetable[day].map((cls, i) => (
          <div key={i} className="card border-0 shadow-sm rounded-3">
            <div className="card-body p-3 d-flex align-items-center gap-3">
              <span className="font-mono text-muted flex-shrink-0" style={{ fontSize: 12, width: 110 }}>{cls.time}</span>
              <div className={`rounded-3 bg-${cls.color} d-flex align-items-center justify-content-center flex-shrink-0`} style={{ width: 44, height: 44, fontSize: 22 }}>{cls.icon}</div>
              <div className="flex-grow-1">
                <div className="fw-bold small text-dark">{cls.subject}</div>
                <div className="text-muted" style={{ fontSize: 11 }}>📍 {cls.room}</div>
              </div>
              <button onClick={() => onAskJobert(`Give me a quick study tip for ${cls.subject} class at ${cls.time} in ${cls.room}.`)}
                className="btn btn-link btn-sm p-0 text-primary flex-shrink-0" title="Ask JOBERT">🤖</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ── Tuition View ── */
function TuitionView({ onBack, onAskJobert }: { onBack: () => void; onAskJobert: (p: string) => void }) {
  const total   = fees.reduce((a, f) => a + f.amount, 0);
  const paid    = fees.filter(f => f.paid).reduce((a, f) => a + f.amount, 0);
  const balance = total - paid;
  const unpaidList = fees.filter(f => !f.paid).map(f => f.label).join(", ");

  return (
    <div className="d-flex flex-column gap-4">
      <BackBtn onClick={onBack} />
      <div className="d-flex align-items-start justify-content-between gap-3 flex-wrap">
        <div>
          <h2 className="fw-black fs-4 text-dark mb-0">Tuition Fee</h2>
          <p className="text-muted small mb-0">1st Semester · 2025–2026</p>
        </div>
        <button onClick={() => onAskJobert(`I have an unpaid balance of ₱${balance.toLocaleString()} for: ${unpaidList}. How do I pay my tuition?`)}
          className="btn btn-outline-primary btn-sm flex-shrink-0" style={{ fontSize: 12 }}>🤖 How do I pay?</button>
      </div>
      <div className="row g-3">
        {[
          { label:"Total",   value:`₱${total.toLocaleString()}`,   cls:"bg-light border-secondary"   },
          { label:"Paid",    value:`₱${paid.toLocaleString()}`,    cls:"bg-success-subtle border-success text-success" },
          { label:"Balance", value:`₱${balance.toLocaleString()}`, cls:"bg-danger-subtle border-danger text-danger"   },
        ].map(s => (
          <div key={s.label} className="col-4">
            <div className={`rounded-3 border p-3 text-center ${s.cls}`}>
              <div className="text-muted small mb-1">{s.label}</div>
              <div className="fw-black fs-5">{s.value}</div>
            </div>
          </div>
        ))}
      </div>
      <div className="card border-0 shadow-sm rounded-3">
        <ul className="list-group list-group-flush rounded-3">
          {fees.map((f, i) => (
            <li key={i} className="list-group-item d-flex align-items-center justify-content-between px-4 py-3">
              <span className="small fw-medium text-dark">{f.label}</span>
              <div className="d-flex align-items-center gap-3">
                <span className="small fw-semibold text-dark">₱{f.amount.toLocaleString()}</span>
                <span className={`badge ${f.paid ? "bg-success-subtle text-success border border-success-subtle" : "bg-danger-subtle text-danger border border-danger-subtle"}`}>
                  {f.paid ? "Paid" : "Unpaid"}
                </span>
              </div>
            </li>
          ))}
        </ul>
      </div>
      <button className="btn btn-inform w-100 py-3 rounded-3 fw-bold fs-6">Pay Balance</button>
    </div>
  );
}

/* ── Library View ── */
function LibraryView({ onBack, onAskJobert }: { onBack: () => void; onAskJobert: (p: string) => void }) {
  const [search, setSearch] = useState("");
  const borrowed = books.filter(b => !b.available);
  const filtered = books.filter(b =>
    b.title.toLowerCase().includes(search.toLowerCase()) ||
    b.author.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="d-flex flex-column gap-4">
      <BackBtn onClick={onBack} />
      <div className="d-flex align-items-start justify-content-between gap-3 flex-wrap">
        <div>
          <h2 className="fw-black fs-4 text-dark mb-0">Library</h2>
          <p className="text-muted small mb-0">{books.filter(b => b.available).length} available · {borrowed.length} borrowed</p>
        </div>
        <button onClick={() => onAskJobert("What are the library hours? How do I borrow and return books? Are there penalties for late returns?")}
          className="btn btn-outline-primary btn-sm flex-shrink-0" style={{ fontSize: 12 }}>🤖 Library guide</button>
      </div>

      {borrowed.length > 0 && (
        <div className="alert alert-warning rounded-3 py-3">
          <div className="fw-bold small mb-2">📚 Currently Borrowed</div>
          {borrowed.map((b, i) => (
            <div key={i} className="d-flex justify-content-between align-items-center bg-white rounded-3 px-3 py-2 border border-warning-subtle mb-2 last:mb-0">
              <span className="small fw-medium text-dark">{b.title}</span>
              <span className="badge bg-danger-subtle text-danger border border-danger-subtle">Due {b.due}</span>
            </div>
          ))}
        </div>
      )}

      <div className="input-group shadow-sm">
        <span className="input-group-text bg-white border-end-0">🔍</span>
        <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search books..."
          className="form-control border-start-0 rounded-end-3" />
      </div>

      <div className="d-flex flex-column gap-2">
        {filtered.map((b, i) => (
          <div key={i} className="card border-0 shadow-sm rounded-3">
            <div className="card-body p-3 d-flex align-items-center gap-3">
              <div className="rounded-3 bg-warning-subtle d-flex align-items-center justify-content-center flex-shrink-0" style={{ width: 44, height: 44, fontSize: 22 }}>📖</div>
              <div className="flex-grow-1 overflow-hidden">
                <div className="fw-bold small text-dark text-truncate">{b.title}</div>
                <div className="text-muted" style={{ fontSize: 11 }}>{b.author} · {b.category}</div>
              </div>
              {b.available
                ? <button className="btn btn-primary btn-sm flex-shrink-0">Borrow</button>
                : <span className="badge bg-danger-subtle text-danger border border-danger-subtle flex-shrink-0">Due {b.due}</span>
              }
            </div>
          </div>
        ))}
      </div>

      <div className="card border-primary border-opacity-25 rounded-3 bg-primary bg-opacity-10">
        <div className="card-body p-4">
          <div className="fw-bold small text-dark mb-2">📄 Need a Document?</div>
          <p className="text-muted small mb-3">Not sure which document to request? Ask JOBERT to guide you.</p>
          <div className="row g-2">
            {[
              { label:"Transcript of Records",    prompt:"How do I request a Transcript of Records (TOR)? What are the steps, requirements, fees, and processing time?" },
              { label:"Certificate of Enrollment",prompt:"How do I get a Certificate of Enrollment? What do I need to bring and how long does it take?" },
              { label:"Good Moral Certificate",   prompt:"How do I request a Good Moral Certificate? What are the requirements and processing time?" },
              { label:"Other Documents",          prompt:"What documents can I request from the Registrar's Office? I need help figuring out which one I need." },
            ].map(d => (
              <div key={d.label} className="col-6">
                <button onClick={() => onAskJobert(d.prompt)}
                  className="btn btn-outline-primary btn-sm w-100 text-start d-flex align-items-center gap-1" style={{ fontSize: 11 }}>
                  🤖 {d.label}
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ── Dashboard Home ── */
const tiles = [
  { id: "grades"   as const, label: "View Grades",   icon: "📊", color: "#1e3a6e" },
  { id: "schedule" as const, label: "View Schedule", icon: "📅", color: "#1e3a6e" },
  { id: "tuition"  as const, label: "Tuition Fee",   icon: "💰", color: "#1e3a6e" },
  { id: "library"  as const, label: "Library",       icon: "📚", color: "#1e3a6e" },
];

function DashboardHome({ setPanel, onAskJobert }: { setPanel: (p: "grades"|"schedule"|"tuition"|"library") => void; onAskJobert: (p: string) => void }) {
  return (
    <div className="card border-0 shadow-lg rounded-3 overflow-hidden" style={{ maxWidth: 640, width: "100%" }}>
      {/* Hero banner */}
      <div className="p-5 text-white text-center" style={{ background: "linear-gradient(135deg,#1e3a6e,#2563eb)" }}>
        <div className="fw-black fs-3 mb-1">Welcome, Jamie Santos</div>
        <div className="text-white-50 small">202400001 · BSCS Year 2 · 2nd Semester SY 2025–2026</div>
        <div className="d-flex justify-content-center gap-2 mt-3 flex-wrap">
          <span className="badge bg-white bg-opacity-20 border border-white border-opacity-25 text-white px-3 py-2">🎓 Active Student</span>
          <span className="badge bg-warning-subtle text-warning border border-warning-subtle px-3 py-2">🔔 Enrollment Open</span>
        </div>
      </div>

      {/* Service tiles */}
      <div className="card-body p-4">
        <p className="text-muted text-uppercase small fw-semibold text-center mb-3" style={{ letterSpacing: "0.08em" }}>Quick Access</p>
        <div className="row g-3 mb-4">
          {tiles.map(t => (
            <div key={t.id} className="col-6">
              <button onClick={() => setPanel(t.id)}
                className="btn w-100 py-4 d-flex flex-column align-items-center gap-2 rounded-3 text-white fw-bold border-0 shadow-sm"
                style={{ background: `linear-gradient(145deg,${t.color},#2563eb)`, boxShadow: "0 4px 16px rgba(30,58,110,0.35)", transition: "transform 0.15s" }}
                onMouseEnter={e => (e.currentTarget.style.transform = "scale(1.03)")}
                onMouseLeave={e => (e.currentTarget.style.transform = "scale(1)")}>
                <span style={{ fontSize: 32 }}>{t.icon}</span>
                <span className="small">{t.label}</span>
              </button>
            </div>
          ))}
        </div>

        {/* Enrollment assistant */}
        <div className="alert alert-primary rounded-3 mb-0">
          <div className="fw-bold small mb-2">📋 Enrollment Assistant</div>
          <p className="text-muted small mb-3">Need help with enrollment? Ask JOBERT to guide you step by step.</p>
          <div className="d-flex flex-column gap-2">
            {[
              { step:1, title:"Check enrollment status",  desc:"Am I eligible to enroll this semester?",          prompt:"Am I eligible to enroll this semester? What are the requirements?" },
              { step:2, title:"Select your subjects",     desc:"How do I choose the right subjects?",             prompt:"How do I choose the right subjects for my course this semester?" },
              { step:3, title:"Submit enrollment form",   desc:"Where and how do I submit my enrollment?",        prompt:"Where and how do I submit my enrollment form at Benedicto College?" },
              { step:4, title:"Pay enrollment fees",      desc:"What fees do I need to pay and where?",           prompt:"What fees do I need to pay for enrollment and where do I pay them?" },
            ].map(s => (
              <button key={s.step} onClick={() => onAskJobert(s.prompt)}
                className="btn btn-outline-primary btn-sm text-start d-flex align-items-center gap-3 rounded-3 py-2 px-3">
                <div className="rounded-circle bg-primary text-white d-flex align-items-center justify-content-center fw-bold flex-shrink-0" style={{ width: 26, height: 26, fontSize: 12 }}>{s.step}</div>
                <div className="flex-grow-1 overflow-hidden">
                  <div className="fw-semibold text-dark" style={{ fontSize: 12 }}>{s.title}</div>
                  <div className="text-muted text-truncate" style={{ fontSize: 11 }}>{s.desc}</div>
                </div>
                <span className="text-primary flex-shrink-0" style={{ fontSize: 11 }}>Ask 🤖</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="card-footer bg-white border-top text-center py-3">
        <p className="text-muted small mb-1">© 2026 Benedicto College. All rights reserved.</p>
        <Link href="/" className="text-muted small text-decoration-none">← Back to Kiosk</Link>
      </div>
    </div>
  );
}

/* ── Page ── */
export default function DashboardPage() {
  const [panel, setPanel]               = useState<Panel>("home");
  const [jobertPrompt, setJobertPrompt] = useState<string | undefined>(undefined);

  function askJobert(prompt: string) {
    setJobertPrompt(undefined);
    setTimeout(() => setJobertPrompt(prompt), 50);
  }

  return (
    <div className="kiosk-bg d-flex flex-column align-items-center justify-content-start py-4 px-3" style={{ minHeight: "100vh" }} suppressHydrationWarning>
      {panel === "home"     && <DashboardHome setPanel={setPanel} onAskJobert={askJobert} />}
      {panel === "grades"   && <div style={{ width: "100%", maxWidth: 640 }}><GradesView   onBack={() => setPanel("home")} onAskJobert={askJobert} /></div>}
      {panel === "schedule" && <div style={{ width: "100%", maxWidth: 640 }}><ScheduleView onBack={() => setPanel("home")} onAskJobert={askJobert} /></div>}
      {panel === "tuition"  && <div style={{ width: "100%", maxWidth: 640 }}><TuitionView  onBack={() => setPanel("home")} onAskJobert={askJobert} /></div>}
      {panel === "library"  && <div style={{ width: "100%", maxWidth: 640 }}><LibraryView  onBack={() => setPanel("home")} onAskJobert={askJobert} /></div>}
      <JobertChat initialPrompt={jobertPrompt} />
    </div>
  );
}
