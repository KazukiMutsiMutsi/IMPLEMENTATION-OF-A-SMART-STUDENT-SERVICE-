"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

/* ── static student accounts ── */
const STUDENT_ACCOUNTS = [
  { id: "202400001", password: "jamie123", name: "Jamie Santos",    course: "BSCS Year 2" },
  { id: "202400002", password: "maria456", name: "Maria Reyes",     course: "BSED Year 1" },
  { id: "202400003", password: "carlo789", name: "Carlo Dela Cruz", course: "BSBA Year 3" },
  { id: "202400004", password: "ana2024",  name: "Ana Villanueva",  course: "BSN Year 2"  },
  { id: "202400005", password: "luis2024", name: "Luis Fernandez",  course: "BSCS Year 4" },
];

/* ══════════════════════════════════════════
   AI KNOWLEDGE BASE  (#1 expanded)
══════════════════════════════════════════ */
type QA = { patterns: string[]; answer: string; topic: string };

const KB: QA[] = [
  /* ── greetings ── */
  {
    topic: "greeting",
    patterns: ["hello","hi","hey","good morning","good afternoon","good evening","help","start","what can you do","who are you"],
    answer: "Hi! I am JOBERT, the INFORM Assistant — I know everything about the INFORM Student Information System.\n\nI can help you with:\n- Logging in\n- Grades & GWA\n- Class schedule\n- Tuition fees\n- Library books\n- Enrollment\n- Certificates & documents\n- Campus services\n\nWhat do you need help with?",
  },
  /* ── login ── */
  {
    topic: "login",
    patterns: ["how","login","log in","sign in","access","enter","portal","cant access","cannot access","steps to login"],
    answer: "To log in to INFORM:\n1. Enter your Student ID (numbers only, e.g. 202400001)\n2. Enter your password\n3. Click 'Access Portal'\n\nTip: Your Student ID is on your school ID card. If you need help, click 'Need a hint?' on the form.",
  },
  /* ── student ID ── */
  {
    topic: "student_id",
    patterns: ["student id","id number","id format","what is my id","find my id","where is my id","id card","school id"],
    answer: "Your Student ID is a 9-digit number (e.g. 202400001).\n\nWhere to find it:\n- On your school ID card\n- On your enrollment form\n- At the Registrar's Office\n\nImportant: Only numbers are accepted — no letters, dashes, or spaces.",
  },
  /* ── password ── */
  {
    topic: "password",
    patterns: ["password","forgot password","reset password","wrong password","cant login","cannot login","change password","lost password","no password"],
    answer: "Forgot or lost your password?\n\n1. Go to the Registrar's Office (Admin Bldg, Room 101)\n2. Bring your valid school ID\n3. Request a password reset\n4. A new temporary password will be issued\n\nFor demo testing, click 'Need a hint?' on the login form.",
  },
  /* ── demo accounts ── */
  {
    topic: "demo",
    patterns: ["demo","test account","sample","example account","try","practice","default account"],
    answer: "Demo accounts for testing:\n\nID: 202400001 | pw: jamie123 (Jamie Santos)\nID: 202400002 | pw: maria456 (Maria Reyes)\nID: 202400003 | pw: carlo789 (Carlo Dela Cruz)\nID: 202400004 | pw: ana2024  (Ana Villanueva)\nID: 202400005 | pw: luis2024 (Luis Fernandez)\n\nOr click 'Need a hint?' on the login form.",
  },
  /* ── grades ── */
  {
    topic: "grades",
    patterns: ["grades","grade","gwa","score","result","academic","passing","failed","average","performance","subject grade"],
    answer: "To view your grades:\n1. Log in to your portal\n2. Tap the 'View Grades' tile\n\nYou will see:\n- Grade per subject (A, B+, B, etc.)\n- Percentage score\n- General Weighted Average (GWA)\n- Performance status (Excellent / Passing / Failed)\n\nPassing grade is 75% or above.",
  },
  /* ── GWA explanation ── */
  {
    topic: "gwa",
    patterns: ["gwa","general weighted average","what is gwa","how is gwa computed","grading system","grade scale","1.0","1.25","1.5","1.75","2.0","3.0","5.0"],
    answer: "INFORM uses the Philippine Grading Scale:\n\n1.00 = 99-100% (Highest)\n1.25 = 96-98%\n1.50 = 93-95%\n1.75 = 90-92%\n2.00 = 87-89%\n2.25 = 84-86%\n2.50 = 81-83%\n2.75 = 78-80%\n3.00 = 75-77% (Passing)\n5.00 = Below 75% (Failed)\n\nYour GWA is the average of all subject grades.",
  },
  /* ── schedule ── */
  {
    topic: "schedule",
    patterns: ["schedule","class","timetable","subject","time","room","when is","what time","class schedule","my classes"],
    answer: "To view your class schedule:\n1. Log in to your portal\n2. Tap 'View Schedule'\n3. Switch between Mon–Fri tabs\n\nEach class shows:\n- Time slot\n- Subject name\n- Room / location\n- Active status indicator",
  },
  /* ── tuition ── */
  {
    topic: "tuition",
    patterns: ["tuition","fee","payment","balance","pay","unpaid","amount","how much","billing","assessment","miscellaneous","laboratory fee"],
    answer: "To view your tuition fees:\n1. Log in to your portal\n2. Tap 'Tuition Fee'\n\nYou will see:\n- Total assessment\n- Amount paid\n- Remaining balance\n- Status per fee item (Paid / Unpaid)\n\nClick 'Pay Balance' to proceed with payment. For payment issues, contact the Cashier's Office.",
  },
  /* ── library ── */
  {
    topic: "library",
    patterns: ["library","book","borrow","return","due","reading","reference","search book","available book"],
    answer: "To use the library:\n1. Log in to your portal\n2. Tap 'Library'\n3. Search for a book by title or author\n4. Click 'Borrow' on available books\n\nBorrowed books show a due date. Return books on time to avoid penalties.\n\nLibrary hours: Mon-Fri 7AM-9PM, Sat 8AM-5PM.",
  },
  /* ── enrollment ── */
  {
    topic: "enrollment",
    patterns: ["enrollment","enroll","register","semester","deadline","how to enroll","add subject","drop subject","enrolled"],
    answer: "Enrollment for the upcoming semester is NOW OPEN.\nDeadline: June 15, 2026\n\nHow to enroll:\n1. Log in to your portal\n2. Look for the enrollment banner on your dashboard\n3. Click 'Enroll Now'\n4. Select your subjects\n5. Submit for approval\n\nFor enrollment issues, visit the Registrar's Office.",
  },
  /* ── certificates & documents ── */
  {
    topic: "documents",
    patterns: ["certificate","transcript","tor","good moral","enrollment cert","document","request","clearance","diploma","form 137"],
    answer: "To request documents:\n1. Visit the Registrar's Office (Admin Bldg, Room 101)\n2. Fill out a request form\n3. Pay the processing fee at the Cashier\n4. Wait 3-5 working days for release\n\nAvailable documents:\n- Transcript of Records (TOR)\n- Certificate of Enrollment\n- Good Moral Certificate\n- Diploma\n- Form 137",
  },
  /* ── scholarship ── */
  {
    topic: "scholarship",
    patterns: ["scholarship","scholar","grant","financial aid","subsidy","discount","free tuition","voucher"],
    answer: "For scholarship inquiries:\n- Visit the Student Affairs Office (Admin Bldg, Room 205)\n- Bring your latest grades and proof of financial need\n- Application period: Start of each semester\n\nAvailable scholarships:\n- Academic Excellence Award (GWA 1.50 or higher)\n- Financial Assistance Grant\n- Government Voucher Program (SHS)\n- Sports & Cultural Scholarship",
  },
  /* ── lost ID ── */
  {
    topic: "lost_id",
    patterns: ["lost id","replace id","new id","id replacement","broken id","damaged id"],
    answer: "Lost or damaged your school ID?\n\n1. Report to the Security Office\n2. Go to the Registrar's Office\n3. Fill out an ID replacement form\n4. Pay the replacement fee (PHP 150)\n5. ID will be ready in 3-5 working days\n\nBring any valid government ID as temporary identification.",
  },
  /* ── admin access ── */
  {
    topic: "admin",
    patterns: ["admin","administrator","staff","teacher","faculty","registrar login","admin login","admin panel"],
    answer: "Admin access is separate from the student portal.\n\nTo access the admin panel:\n1. Click 'Admin Access' on the kiosk home screen\n2. Or go to /admin/login\n3. Use your admin username and password\n\nAdmin accounts are restricted to authorized university staff only. Students cannot access the admin panel.",
  },
  /* ── about INFORM ── */
  {
    topic: "about",
    patterns: ["what is inform","about inform","about this system","what can i do","features","services","inform system","kiosk"],
    answer: "INFORM is the Self-Service Student Information System of INFORM University.\n\nWhat you can do:\n- View grades & GWA\n- Check class schedule\n- Pay and view tuition fees\n- Borrow library books\n- Enroll for next semester\n- Request documents\n\nAccessible from the kiosk on campus or any browser.",
  },
  /* ── contact ── */
  {
    topic: "contact",
    patterns: ["contact","registrar","office","help desk","support","phone","email","where","location","address","how to reach"],
    answer: "INFORM University Contacts:\n\nRegistrar's Office\nRoom 101, Admin Building\nEmail: registrar@inform.edu\nHours: Mon-Fri, 8AM-5PM\n\nIT Help Desk\nRoom 010, Admin Building\nEmail: helpdesk@inform.edu\nHours: Mon-Fri, 8AM-5PM\n\nCashier's Office\nRoom 102, Admin Building\nHours: Mon-Fri, 8AM-4PM",
  },
  /* ── errors / troubleshooting ── */
  {
    topic: "error",
    patterns: ["error","not working","problem","issue","bug","blank","loading","slow","crash","white screen","page not loading"],
    answer: "Troubleshooting steps:\n\n1. Refresh the page (Ctrl+R or F5)\n2. Clear your browser cache\n3. Make sure your Student ID is numbers only\n4. Check your password for typos (case-sensitive)\n5. Try a different browser (Chrome recommended)\n6. Check your internet connection\n\nStill not working? Contact the IT Help Desk at helpdesk@inform.edu.",
  },
  /* ── SSO ── */
  {
    topic: "sso",
    patterns: ["google","microsoft","sso","social login","google account","microsoft account","linked account"],
    answer: "Google and Microsoft SSO are available for students with linked school accounts.\n\nTo set up SSO:\n1. Visit the IT Office (Admin Bldg, Room 010)\n2. Request account linking\n3. Provide your Student ID and personal email\n\nIf unsure, use your Student ID and password to log in instead.",
  },
  /* ── campus services ── */
  {
    topic: "campus",
    patterns: ["clinic","nurse","medical","guidance","counselor","canteen","cafeteria","gym","sports","dormitory","dorm","parking","chapel","church"],
    answer: "Campus Services:\n\nClinic: Ground Floor, Main Building | Mon-Fri 7AM-5PM\nGuidance Office: Room 203, Admin Bldg | Mon-Fri 8AM-5PM\nCanteen: Ground Floor, Student Center | Mon-Sat 6AM-7PM\nGym: Sports Complex | Mon-Sat 6AM-9PM\nDormitory: Contact Student Affairs Office\nParking: Gate 1 (students), Gate 2 (faculty)",
  },
  /* ── academic calendar ── */
  {
    topic: "calendar",
    patterns: ["calendar","academic calendar","holiday","vacation","sem break","semester break","when does","school year","start of classes","end of classes"],
    answer: "Academic Calendar 2025-2026:\n\n1st Semester: Aug 2025 - Jan 2026\nSem Break: Jan 20 - Feb 1, 2026\n2nd Semester: Feb 2026 - Jun 2026\nEnrollment Deadline: Jun 15, 2026\nGraduation: Jun 28, 2026\nSummer: Jul - Aug 2026\n\nFor the full calendar, visit the Registrar's Office.",
  },
];

/* ══════════════════════════════════════════
   #2 FUZZY SCORING — best match wins
══════════════════════════════════════════ */
function getAIResponse(input: string, history: Msg[]): string {
  const lower = input.toLowerCase();

  /* score each KB entry by how many patterns match */
  let bestScore = 0;
  let bestAnswer = "";

  for (const qa of KB) {
    let score = 0;
    for (const p of qa.patterns) {
      if (lower.includes(p)) score += p.split(" ").length; // longer phrase = higher score
    }
    /* #3 context boost — if last AI message was about same topic, boost score */
    if (history.length >= 2) {
      const lastAI = history.filter(m => m.role === "ai").slice(-1)[0];
      if (lastAI && lastAI.topic === qa.topic) score += 1;
    }
    if (score > bestScore) {
      bestScore = score;
      bestAnswer = qa.answer;
    }
  }

  if (bestScore > 0) return bestAnswer;

  return "I am JOBERT and I am not sure about that. I can only help with INFORM system topics like:\n- Logging in\n- Grades & GWA\n- Schedule\n- Tuition fees\n- Library\n- Enrollment\n- Documents & certificates\n\nTry asking: 'How do I log in?' or 'What is my GWA?'";
}

/* ── quick suggestion chips ── */
const SUGGESTIONS = [
  "How do I log in?",
  "I forgot my password",
  "Show demo accounts",
  "What is my GWA?",
  "Enrollment deadline",
  "Request a certificate",
  "Library hours",
  "Contact info",
];

type Msg = { role: "ai" | "user"; text: string; topic?: string; feedback?: "up" | "down" | null };

/* ── AI Chat Widget ── */
function AIChat() {
  const [open, setOpen]     = useState(false);
  const [msgs, setMsgs]     = useState<Msg[]>([
    { role: "ai", text: "Hi! I am JOBERT, the INFORM Assistant.\n\nI can help you with logging in, grades, schedule, tuition, library, enrollment, documents, and more.\n\nWhat do you need help with?", topic: "greeting" },
  ]);
  const [input, setInput]   = useState("");
  const [typing, setTyping] = useState(false);
  const bottomRef           = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [msgs, typing]);

  function send(text: string) {
    if (!text.trim()) return;
    const userMsg: Msg = { role: "user", text: text.trim() };
    const newMsgs = [...msgs, userMsg];
    setMsgs(newMsgs);
    setInput("");
    setTyping(true);
    setTimeout(() => {
      /* pass history for context (#3) */
      const reply = getAIResponse(text, newMsgs);
      /* find which topic matched for context tracking */
      const lower = text.toLowerCase();
      let matchedTopic = "general";
      let bestScore = 0;
      for (const qa of KB) {
        let score = 0;
        for (const p of qa.patterns) { if (lower.includes(p)) score += p.split(" ").length; }
        if (score > bestScore) { bestScore = score; matchedTopic = qa.topic; }
      }
      setMsgs(prev => [...prev, { role: "ai", text: reply, topic: matchedTopic, feedback: null }]);
      setTyping(false);
    }, 700);
  }

  /* #6 thumbs feedback */
  function setFeedback(idx: number, val: "up" | "down") {
    setMsgs(prev => prev.map((m, i) => i === idx ? { ...m, feedback: val } : m));
  }

  return (
    <>
      {/* floating button */}
      <button
        onClick={() => setOpen(!open)}
        className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full flex items-center justify-center shadow-2xl transition-all hover:scale-110 active:scale-95"
        style={{ background: "linear-gradient(135deg,#2563eb,#1d4ed8)", boxShadow: "0 8px 32px rgba(37,99,235,0.45)" }}
        aria-label="Open AI Assistant"
      >
        {open ? (
          <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" className="w-6 h-6">
            <path d="M18 6L6 18M6 6l12 12"/>
          </svg>
        ) : (
          <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" className="w-7 h-7">
            <path d="M12 2a10 10 0 0 1 10 10c0 5.52-4.48 10-10 10a9.96 9.96 0 0 1-5.06-1.37L2 22l1.37-4.94A9.96 9.96 0 0 1 2 12 10 10 0 0 1 12 2z"/>
            <path d="M8 10h.01M12 10h.01M16 10h.01" strokeLinecap="round"/>
          </svg>
        )}
        {!open && (
          <span className="absolute top-0 right-0 w-3.5 h-3.5 bg-green-400 rounded-full border-2 border-white animate-pulse" />
        )}
      </button>

      {/* chat panel */}
      {open && (
        <div
          className="fixed bottom-24 right-6 z-50 w-80 sm:w-96 rounded-3xl overflow-hidden flex flex-col"
          style={{
            height: "520px",
            background: "white",
            boxShadow: "0 24px 64px rgba(37,99,235,0.18), 0 4px 16px rgba(0,0,0,0.08)",
            border: "1px solid rgba(37,99,235,0.1)",
          }}
        >
          {/* header */}
          <div className="px-5 py-4 flex items-center gap-3 shrink-0"
            style={{ background: "linear-gradient(135deg,#2563eb,#1d4ed8)" }}>
            <div className="w-9 h-9 rounded-full bg-white/20 flex items-center justify-center text-white font-bold text-sm shrink-0">AI</div>
            <div className="flex-1 min-w-0">
              <div className="text-white font-bold text-sm">JOBERT</div>
              <div className="text-blue-200 text-xs">INFORM Assistant &middot; Context-aware</div>
            </div>
            <div className="flex items-center gap-1.5 shrink-0">
              <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
              <span className="text-blue-200 text-xs">Online</span>
            </div>
          </div>

          {/* messages */}
          <div className="flex-1 overflow-y-auto px-4 py-3 flex flex-col gap-3 bg-slate-50">
            {msgs.map((m, i) => (
              <div key={i} className={`flex gap-2 ${m.role === "user" ? "flex-row-reverse" : ""}`}>
                {m.role === "ai" && (
                  <div className="w-7 h-7 rounded-full bg-blue-600 flex items-center justify-center text-white text-xs font-bold shrink-0 mt-0.5">AI</div>
                )}
                <div className="flex flex-col gap-1 max-w-[80%]">
                  <div className={`rounded-2xl px-3.5 py-2.5 text-xs leading-relaxed whitespace-pre-line ${
                    m.role === "ai"
                      ? "bg-white border border-slate-200 text-slate-700 rounded-tl-sm shadow-sm"
                      : "bg-blue-600 text-white rounded-tr-sm"
                  }`}>
                    {m.text}
                  </div>
                  {/* #6 thumbs feedback — only on AI messages */}
                  {m.role === "ai" && i > 0 && (
                    <div className="flex gap-1 ml-1">
                      <button
                        onClick={() => setFeedback(i, "up")}
                        className={`text-xs px-1.5 py-0.5 rounded-lg transition-all ${m.feedback === "up" ? "bg-green-100 text-green-600" : "text-slate-300 hover:text-green-500"}`}
                        title="Helpful"
                      >&#128077;</button>
                      <button
                        onClick={() => setFeedback(i, "down")}
                        className={`text-xs px-1.5 py-0.5 rounded-lg transition-all ${m.feedback === "down" ? "bg-red-100 text-red-500" : "text-slate-300 hover:text-red-400"}`}
                        title="Not helpful"
                      >&#128078;</button>
                      {m.feedback === "down" && (
                        <span className="text-xs text-slate-400 ml-1 self-center">Thanks — we will improve this answer.</span>
                      )}
                      {m.feedback === "up" && (
                        <span className="text-xs text-slate-400 ml-1 self-center">Glad that helped!</span>
                      )}
                    </div>
                  )}
                </div>
              </div>
            ))}
            {typing && (
              <div className="flex gap-2">
                <div className="w-7 h-7 rounded-full bg-blue-600 flex items-center justify-center text-white text-xs font-bold shrink-0">AI</div>
                <div className="bg-white border border-slate-200 rounded-2xl rounded-tl-sm px-4 py-3 flex gap-1 items-center shadow-sm">
                  <span className="w-1.5 h-1.5 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
                  <span className="w-1.5 h-1.5 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
                  <span className="w-1.5 h-1.5 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
                </div>
              </div>
            )}
            <div ref={bottomRef} />
          </div>

          {/* suggestions */}
          <div className="px-3 py-2 flex gap-1.5 overflow-x-auto shrink-0 bg-white border-t border-slate-100">
            {SUGGESTIONS.map(s => (
              <button key={s} onClick={() => send(s)}
                className="shrink-0 text-xs px-3 py-1.5 rounded-full bg-blue-50 hover:bg-blue-100 border border-blue-200 text-blue-600 transition-colors whitespace-nowrap">
                {s}
              </button>
            ))}
          </div>

          {/* input */}
          <div className="px-3 pb-3 pt-2 flex gap-2 shrink-0 bg-white">
            <input
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={e => e.key === "Enter" && send(input)}
              placeholder="Ask me anything about INFORM..."
              className="flex-1 bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-xs text-slate-700 placeholder-slate-400 focus:outline-none focus:border-blue-400 focus:ring-1 focus:ring-blue-100 transition"
            />
            <button onClick={() => send(input)} disabled={!input.trim() || typing}
              className="w-9 h-9 rounded-xl bg-blue-600 hover:bg-blue-700 disabled:opacity-40 flex items-center justify-center transition-colors shrink-0">
              <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" className="w-4 h-4">
                <path d="M22 2L11 13M22 2L15 22l-4-9-9-4 20-7z"/>
              </svg>
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
  const [form, setForm]         = useState({ id: "", password: "" });
  const [loading, setLoading]   = useState(false);
  const [error, setError]       = useState("");
  const [showHint, setShowHint] = useState(false);

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;
    const sanitized = name === "id" ? value.replace(/\D/g, "") : value;
    setForm({ ...form, [name]: sanitized });
    setError("");
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!form.id || !form.password) {
      setError("Please enter your Student ID and password.");
      return;
    }
    const match = STUDENT_ACCOUNTS.find(
      a => a.id === form.id && a.password === form.password
    );
    if (!match) {
      setError("Invalid Student ID or password. Please try again.");
      return;
    }
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      router.push("/dashboard");
    }, 1000);
  }

  return (
    <div
      className="min-h-screen kiosk-bg flex flex-col items-center justify-center px-4 py-10"
      suppressHydrationWarning
    >
      {/* back */}
      <Link
        href="/"
        className="absolute top-5 left-5 flex items-center gap-2 text-slate-400 hover:text-slate-700 text-sm transition-colors"
      >
        &larr; Back to Kiosk
      </Link>

      {/* card */}
      <div className="w-full max-w-sm glass rounded-3xl p-8 flex flex-col items-center gap-6 shadow-xl shadow-blue-100">

        {/* logo */}
        <div className="flex flex-col items-center gap-2">
          <div className="w-16 h-16 rounded-2xl bg-blue-600 flex items-center justify-center text-white font-extrabold text-2xl shadow-lg shadow-blue-200">
            IN
          </div>
          <div className="text-slate-800 font-bold text-xl tracking-tight">INFORM</div>
          <div className="text-slate-400 text-xs">Student Information System</div>
        </div>

        <div className="w-full h-px bg-slate-100" />

        <div className="text-center">
          <h1 className="text-slate-800 font-extrabold text-2xl">Student Login</h1>
          <p className="text-slate-400 text-sm mt-1">Enter your credentials to access your portal</p>
        </div>

        <form onSubmit={handleSubmit} className="w-full flex flex-col gap-4">
          {/* Student ID */}
          <div className="flex flex-col gap-1.5">
            <label className="text-slate-500 text-xs font-semibold uppercase tracking-widest">
              Student ID
            </label>
            <input
              type="text"
              name="id"
              value={form.id}
              onChange={handleChange}
              onKeyDown={e => {
                const allowed = ["Backspace","Delete","Tab","ArrowLeft","ArrowRight","Home","End"];
                if (!allowed.includes(e.key) && !/^\d$/.test(e.key)) e.preventDefault();
              }}
              inputMode="numeric"
              maxLength={12}
              placeholder="e.g. 202400001"
              autoComplete="username"
              className="bg-white border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 rounded-xl px-4 py-3 text-slate-800 placeholder-slate-300 text-sm outline-none transition shadow-sm"
            />
            <p className="text-slate-400 text-xs">Numbers only &middot; max 12 digits</p>
          </div>

          {/* Password */}
          <div className="flex flex-col gap-1.5">
            <div className="flex items-center justify-between">
              <label className="text-slate-500 text-xs font-semibold uppercase tracking-widest">
                Password
              </label>
              <button
                type="button"
                onClick={() => setShowHint(!showHint)}
                className="text-blue-500 hover:text-blue-600 text-xs transition-colors"
              >
                {showHint ? "Hide hint" : "Need a hint?"}
              </button>
            </div>
            <input
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              placeholder="••••••••"
              autoComplete="current-password"
              className="bg-white border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 rounded-xl px-4 py-3 text-slate-800 placeholder-slate-300 text-sm outline-none transition shadow-sm"
            />
          </div>

          {/* hint box */}
          {showHint && (
            <div className="bg-blue-50 border border-blue-100 rounded-xl px-4 py-3">
              <p className="font-semibold text-blue-600 text-xs mb-2">Demo Student Accounts</p>
              <div className="flex flex-col gap-1.5">
                {STUDENT_ACCOUNTS.map(a => (
                  <div key={a.id} className="flex items-center justify-between gap-2">
                    <span className="font-mono text-slate-600 text-xs">{a.id}</span>
                    <span className="font-mono text-slate-500 text-xs">{a.password}</span>
                    <span className="text-slate-400 text-xs truncate">{a.name}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* error */}
          {error && (
            <div className="bg-red-50 border border-red-200 rounded-xl px-4 py-2.5 text-red-500 text-xs">
              {error}
            </div>
          )}

          {/* submit */}
          <button
            type="submit"
            disabled={loading}
            className="tap-btn w-full py-3.5 rounded-xl text-white font-bold text-base mt-1 flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {loading ? (
              <>
                <span className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" />
                Signing in...
              </>
            ) : "Access Portal"}
          </button>
        </form>

        <div className="flex items-center gap-3 w-full">
          <div className="flex-1 h-px bg-slate-100" />
          <span className="text-slate-300 text-xs">or</span>
          <div className="flex-1 h-px bg-slate-100" />
        </div>

        <div className="grid grid-cols-2 gap-3 w-full">
          {[{ label:"Google Account", icon:"G" },{ label:"Microsoft SSO", icon:"M" }].map(s => (
            <button key={s.label}
              className="flex items-center justify-center gap-2 bg-white hover:bg-slate-50 border border-slate-200 rounded-xl py-2.5 text-slate-500 hover:text-slate-700 text-xs font-medium transition-all shadow-sm">
              <span className="w-5 h-5 rounded-full bg-slate-100 flex items-center justify-center text-xs font-bold text-slate-600">{s.icon}</span>
              {s.label}
            </button>
          ))}
        </div>

        <p className="text-slate-400 text-xs text-center">
          Need help?{" "}
          <a href="#" className="text-blue-500 hover:text-blue-600 transition-colors">
            Contact the Registrar&apos;s Office
          </a>
        </p>
      </div>

      <p className="text-slate-400 text-xs mt-6">
        &copy; 2026 INFORM University. All rights reserved.
      </p>

      {/* AI chat widget */}
      <AIChat />
    </div>
  );
}
