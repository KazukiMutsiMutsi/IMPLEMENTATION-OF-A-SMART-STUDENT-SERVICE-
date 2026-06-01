"use client";

import { useState } from "react";
import Link from "next/link";

type FormData = {
  firstName: string; lastName: string; middleName: string;
  email: string; phone: string; course: string; year: string;
  address: string; dateOfBirth: string; studentStatus: string;
  studentId: string; gender: string; civilStatus: string;
  nationality: string; religion: string;
  fatherName: string; fatherOccupation: string;
  motherName: string; motherOccupation: string;
  guardianName: string; guardianRelation: string; guardianPhone: string;
  previousSchool: string; previousSchoolAddress: string; yearsAttended: string;
  idPhoto: File | null;
};

const INITIAL: FormData = {
  firstName:"", lastName:"", middleName:"", email:"", phone:"",
  course:"", year:"", address:"", dateOfBirth:"", studentStatus:"",
  studentId:"", gender:"", civilStatus:"", nationality:"", religion:"",
  fatherName:"", fatherOccupation:"", motherName:"", motherOccupation:"",
  guardianName:"", guardianRelation:"", guardianPhone:"",
  previousSchool:"", previousSchoolAddress:"", yearsAttended:"", idPhoto: null,
};

/* ── Section header ── */
function SectionHeader({ icon, title }: { icon: string; title: string }) {
  return (
    <div className="col-12 mt-2">
      <div className="d-flex align-items-center gap-2 pb-2 mb-1" style={{ borderBottom: "1px solid #e2e8f0" }}>
        <span style={{ fontSize: 18 }}>{icon}</span>
        <span className="fw-bold text-dark small text-uppercase" style={{ letterSpacing: "0.06em" }}>{title}</span>
      </div>
    </div>
  );
}

export default function EnrollmentPage() {
  const [formData, setFormData] = useState<FormData>(INITIAL);
  const [submitted, setSubmitted]   = useState(false);
  const [genId, setGenId]           = useState("");
  const [genLRN, setGenLRN]         = useState("");
  const [showTerms, setShowTerms]   = useState(false);
  const [agreed, setAgreed]         = useState(false);
  const [scrolled, setScrolled]     = useState(false);
  const [errors, setErrors]         = useState<Record<string, string>>({});
  const PASSWORD = "CFEI@2026";

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const target = e.target as HTMLInputElement;
    if (target.type === "file") {
      const files = target.files;
      if (files?.[0]) setFormData(p => ({ ...p, idPhoto: files[0] }));
    } else {
      const { name, value } = target;
      setFormData(p => ({ ...p, [name]: value }));
      setErrors(p => { const n = { ...p }; delete n[name]; return n; });
    }
  };

  const validate = (): boolean => {
    const e: Record<string, string> = {};
    const req: (keyof FormData)[] = [
      "firstName","lastName","email","phone","course","year",
      "address","dateOfBirth","studentStatus","nationality","religion","gender","civilStatus",
    ];
    req.forEach(k => { if (!formData[k]?.toString().trim()) e[k] = "This field is required."; });
    if (formData.studentStatus === "old" && !formData.studentId.trim()) e.studentId = "Student ID is required for returning students.";
    if (!formData.idPhoto) e.idPhoto = "Please upload a 2×2 ID photo.";
    if (formData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) e.email = "Enter a valid email address.";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) setShowTerms(true);
  };

  const handleConfirm = () => {
    if (!agreed) return;
    const now = new Date();
    const ymd = `${now.getFullYear()}${String(now.getMonth()+1).padStart(2,"0")}${String(now.getDate()).padStart(2,"0")}`;
    const rand = () => String(Math.floor(Math.random()*10000)).padStart(4,"0");
    const id = formData.studentStatus === "new" ? `STU-${ymd}${rand()}` : formData.studentId;
    setGenId(id);
    setGenLRN(`${ymd}${rand()}`);
    setShowTerms(false);
    setAgreed(false);
    setScrolled(false);
    setSubmitted(true);
  };

  /* ── Field helper ── */
  const F = ({ name, label, type="text", placeholder="", required=false, children }: {
    name: keyof FormData; label: string; type?: string;
    placeholder?: string; required?: boolean; children?: React.ReactNode;
  }) => (
    <div>
      <label className="form-label fw-semibold mb-1" style={{ color: "#374151", fontSize: 12 }}>
        {label}{required && <span className="text-danger ms-1">*</span>}
      </label>
      {children ?? (
        <input
          type={type} name={name}
          value={formData[name] as string}
          onChange={handleChange}
          placeholder={placeholder}
          className={`form-control rounded-2 ${errors[name] ? "is-invalid" : ""}`}
        />
      )}
      {errors[name] && <div className="invalid-feedback d-block" style={{ fontSize: 11 }}>{errors[name]}</div>}
    </div>
  );


  /* ── Success screen ── */
  if (submitted) {
    return (
      <div className="kiosk-bg d-flex flex-column align-items-center justify-content-center px-3 py-5" style={{ minHeight: "100vh" }}>
        <div className="card border-0 shadow-lg rounded-3 overflow-hidden" style={{ maxWidth: 520, width: "100%", zIndex: 10 }}>
          <div className="p-4 text-white text-center" style={{ background: "linear-gradient(135deg,#16a34a,#15803d)" }}>
            <div style={{ fontSize: 56 }}>✅</div>
            <h2 className="fw-black fs-4 mt-2 mb-0">Enrollment Submitted!</h2>
          </div>
          <div className="card-body p-4">
            <p className="text-muted text-center mb-4">Your enrollment has been received. Save your credentials below.</p>

            <div className="rounded-3 p-3 mb-3" style={{ background: "#f0f9ff", border: "1px solid #bae6fd" }}>
              <div className="small text-muted mb-1">Name</div>
              <div className="fw-bold text-dark">{formData.firstName} {formData.middleName && formData.middleName + " "}{formData.lastName}</div>
              <div className="small text-muted mt-2 mb-1">Track / Grade</div>
              <div className="fw-semibold text-dark">{formData.course} — Grade {formData.year}</div>
            </div>

            <div className="d-flex flex-column gap-2 mb-4">
              {[
                { label: "Learner Reference Number (LRN)", value: genLRN,    bg: "#eff6ff", border: "#bfdbfe", color: "#1d4ed8" },
                { label: "Student ID",                     value: genId,     bg: "#fef2f2", border: "#fecaca", color: "#dc2626" },
                { label: "Temporary Password",             value: PASSWORD,  bg: "#fffbeb", border: "#fde68a", color: "#d97706" },
              ].map(c => (
                <div key={c.label} className="rounded-2 p-3" style={{ background: c.bg, border: `1px solid ${c.border}` }}>
                  <div className="text-muted small mb-1">{c.label}</div>
                  <div className="fw-black fs-5 font-mono" style={{ color: c.color }}>{c.value}</div>
                </div>
              ))}
            </div>

            <div className="alert alert-warning small mb-4">
              <strong>⚠️ Important:</strong> Change your password on first login. Do not share your credentials.
            </div>

            <Link href="/login" className="btn btn-primary w-100 py-3 rounded-3 fw-bold">Go to Login →</Link>
          </div>
        </div>
      </div>
    );
  }


  return (
    <>
      {/* ── Terms Modal ── */}
      {showTerms && (
        <div className="position-fixed top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center px-3"
          style={{ background: "rgba(0,0,0,0.6)", zIndex: 9999 }}>
          <div className="card border-0 shadow-lg rounded-3 overflow-hidden" style={{ maxWidth: 580, width: "100%", maxHeight: "90vh", display: "flex", flexDirection: "column" }}>
            <div className="p-4 text-white text-center flex-shrink-0" style={{ background: "linear-gradient(135deg,#1e40af,#dc2626)" }}>
              <h2 className="fw-black fs-5 mb-0">📋 Terms and Conditions</h2>
            </div>
            <div className="card-body p-4 overflow-auto" style={{ flex: 1 }}
              onScroll={e => {
                const el = e.currentTarget;
                if (el.scrollHeight - el.scrollTop <= el.clientHeight + 10) setScrolled(true);
              }}>
              <h6 className="fw-bold mb-3">ENROLLMENT TERMS AND CONDITIONS</h6>
              <p className="small text-muted mb-3"><strong>1. ENROLLMENT AGREEMENT</strong><br />A student who withdraws enrollment before or after the beginning of classes must submit a written request stating the reason. Withdrawal of documents must be processed within the school year only after being cleared of all accountabilities.</p>
              <p className="small text-muted mb-3"><strong>2. REFUND POLICY</strong><br />Refund on tuition fees is governed by the Law for Private Schools (Republic Act No. 6728, 1992 Manual of Regulations for Private Schools). Refunds shall be made within two weeks after the withdrawal request. The student shall be charged full fees for the first month. Withdrawals within the first week: 90% refund. Second week: 80% refund. Third week: 50% refund. After the third week: no refund.</p>
              <p className="small text-muted mb-3"><strong>3. ACADEMIC POLICIES</strong><br />Students from Grade 7 to Grade 12 are entitled to free tuition and miscellaneous fees under applicable subsidy programs. Should the student transfer to another school within the school year, the student shall be required to pay the full cost of tuition and miscellaneous fees for the entire school year.</p>
              <p className="small text-muted mb-3"><strong>4. DATA PRIVACY</strong><br />I hereby agree to the processing of my personal and sensitive personal data for legitimate school purposes in accordance with the Data Privacy Act of 2012 (Republic Act No. 10173).</p>
              <p className="small text-muted mb-0"><em>By checking the box below, you acknowledge that you have read and understood all terms and conditions.</em></p>
            </div>
            <div className="p-4 border-top bg-light flex-shrink-0">
              {!scrolled
                ? <div className="alert alert-info small mb-0">📖 Please scroll down to read all terms before proceeding.</div>
                : (
                  <>
                    <div className="form-check mb-3">
                      <input className="form-check-input" type="checkbox" id="agreeTerms" checked={agreed} onChange={e => setAgreed(e.target.checked)} />
                      <label className="form-check-label fw-semibold small" htmlFor="agreeTerms">I have read and agree to the terms and conditions above.</label>
                    </div>
                    <div className="d-flex gap-2">
                      <button type="button" onClick={() => { setShowTerms(false); setAgreed(false); setScrolled(false); }} className="btn btn-outline-secondary flex-grow-1 rounded-3 fw-bold">Decline</button>
                      <button type="button" onClick={handleConfirm} disabled={!agreed} className="btn flex-grow-1 rounded-3 fw-bold text-white" style={{ background: "linear-gradient(135deg,#1e40af,#dc2626)", border: "none" }}>Agree & Submit</button>
                    </div>
                  </>
                )
              }
            </div>
          </div>
        </div>
      )}


      {/* ── Main Form ── */}
      <div className="kiosk-bg d-flex flex-column align-items-center justify-content-start px-3 py-4" style={{ minHeight: "100vh" }}>
        {/* Back */}
        <div className="w-100 mb-3" style={{ maxWidth: 680 }}>
          <Link href="/" className="text-decoration-none d-inline-flex align-items-center gap-1" style={{ color: "rgba(255,255,255,0.4)", fontSize: 13 }}
            onMouseEnter={e => (e.currentTarget.style.color = "rgba(255,255,255,0.8)")}
            onMouseLeave={e => (e.currentTarget.style.color = "rgba(255,255,255,0.4)")}>
            ← Back to Home
          </Link>
        </div>

        <div className="card border-0 shadow-lg rounded-3 overflow-hidden" style={{ maxWidth: 680, width: "100%", zIndex: 10 }}>
          {/* Header */}
          <div className="p-4 text-white text-center" style={{ background: "linear-gradient(135deg,#1e40af,#dc2626)" }}>
            <div className="d-flex align-items-center justify-content-center gap-3 mb-2">
              <img src="/cfei-logo.jpg" alt="CFEI" className="rounded-circle" style={{ width: 44, height: 44, objectFit: "cover", border: "2px solid rgba(255,255,255,0.3)" }} />
              <div className="text-start">
                <div className="fw-black fs-5 lh-1">INFORM</div>
                <div className="text-white-50" style={{ fontSize: 11 }}>Cebu Far East Institute</div>
              </div>
            </div>
            <h1 className="fw-black fs-4 mb-1">Student Enrollment Form</h1>
            <p className="text-white-50 small mb-0">Academic Year 2025–2026 · Deadline: June 15, 2026</p>
          </div>

          {/* Form body */}
          <form onSubmit={handleSubmit} noValidate className="card-body p-4">
            <div className="row g-3">

              {/* ── Student Status ── */}
              <SectionHeader icon="🎓" title="Enrollment Type" />
              <div className="col-12">
                <F name="studentStatus" label="Student Status" required>
                  <select name="studentStatus" value={formData.studentStatus} onChange={handleChange}
                    className={`form-select rounded-2 ${errors.studentStatus ? "is-invalid" : ""}`}>
                    <option value="">Select student status</option>
                    <option value="new">New Student</option>
                    <option value="old">Returning / Old Student</option>
                  </select>
                </F>
              </div>
              {formData.studentStatus === "old" && (
                <div className="col-12">
                  <F name="studentId" label="Existing Student ID" placeholder="e.g. STU-20240001" required />
                </div>
              )}

              {/* ── Personal Info ── */}
              <SectionHeader icon="👤" title="Personal Information" />
              <div className="col-md-4"><F name="firstName"  label="First Name"  placeholder="First name"  required /></div>
              <div className="col-md-4"><F name="middleName" label="Middle Name" placeholder="Middle name (optional)" /></div>
              <div className="col-md-4"><F name="lastName"   label="Last Name"   placeholder="Last name"   required /></div>

              <div className="col-md-6">
                <F name="gender" label="Gender" required>
                  <select name="gender" value={formData.gender} onChange={handleChange}
                    className={`form-select rounded-2 ${errors.gender ? "is-invalid" : ""}`}>
                    <option value="">Select gender</option>
                    <option>Male</option><option>Female</option><option>Other</option>
                  </select>
                </F>
              </div>
              <div className="col-md-6">
                <F name="civilStatus" label="Civil Status" required>
                  <select name="civilStatus" value={formData.civilStatus} onChange={handleChange}
                    className={`form-select rounded-2 ${errors.civilStatus ? "is-invalid" : ""}`}>
                    <option value="">Select civil status</option>
                    <option>Single</option><option>Married</option><option>Widowed</option><option>Separated</option>
                  </select>
                </F>
              </div>

              <div className="col-md-6"><F name="dateOfBirth" label="Date of Birth" type="date" required /></div>
              <div className="col-md-6"><F name="nationality" label="Nationality" placeholder="e.g. Filipino" required /></div>
              <div className="col-md-6"><F name="religion"    label="Religion"    placeholder="e.g. Roman Catholic" required /></div>
              <div className="col-12">  <F name="address"     label="Home Address" placeholder="Street, Barangay, City, Province" required /></div>


              {/* ── Contact ── */}
              <SectionHeader icon="📞" title="Contact Information" />
              <div className="col-md-6"><F name="email" label="Email Address" type="email" placeholder="your.email@example.com" required /></div>
              <div className="col-md-6"><F name="phone" label="Phone Number"  type="tel"   placeholder="+63 9XX XXX XXXX" required /></div>

              {/* ── Academic ── */}
              <SectionHeader icon="📚" title="Academic Information" />
              <div className="col-md-6">
                <F name="course" label="Track / Strand" required>
                  <select name="course" value={formData.course} onChange={handleChange}
                    className={`form-select rounded-2 ${errors.course ? "is-invalid" : ""}`}>
                    <option value="">Select a track</option>
                    <option value="TVL">Technical-Vocational-Livelihood (TVL)</option>
                    <option value="STEM">Science, Technology, Engineering, Mathematics (STEM)</option>
                    <option value="GAS">General Academic Strand (GAS)</option>
                    <option value="HUMMS">Humanities and Social Sciences (HUMMS)</option>
                    <option value="ABM">Accountancy, Business, and Management (ABM)</option>
                  </select>
                </F>
              </div>
              <div className="col-md-6">
                <F name="year" label="Grade Level" required>
                  <select name="year" value={formData.year} onChange={handleChange}
                    className={`form-select rounded-2 ${errors.year ? "is-invalid" : ""}`}>
                    <option value="">Select grade level</option>
                    <option value="11">Grade 11</option>
                    <option value="12">Grade 12</option>
                  </select>
                </F>
              </div>
              <div className="col-md-6"><F name="previousSchool"        label="Previous School"         placeholder="Name of previous school" /></div>
              <div className="col-md-6"><F name="yearsAttended"         label="Years Attended"          placeholder="e.g. 2022–2024" /></div>
              <div className="col-12">  <F name="previousSchoolAddress" label="Previous School Address" placeholder="Address of previous school" /></div>

              {/* ── Family ── */}
              <SectionHeader icon="👨‍👩‍👧" title="Family Information" />
              <div className="col-md-6"><F name="fatherName"       label="Father's Full Name"   placeholder="Father's full name" /></div>
              <div className="col-md-6"><F name="fatherOccupation" label="Father's Occupation"  placeholder="e.g. Engineer" /></div>
              <div className="col-md-6"><F name="motherName"       label="Mother's Full Name"   placeholder="Mother's full name" /></div>
              <div className="col-md-6"><F name="motherOccupation" label="Mother's Occupation"  placeholder="e.g. Teacher" /></div>
              <div className="col-md-4"><F name="guardianName"     label="Guardian Name"        placeholder="Guardian's full name" /></div>
              <div className="col-md-4"><F name="guardianRelation" label="Guardian Relation"    placeholder="e.g. Aunt, Uncle" /></div>
              <div className="col-md-4"><F name="guardianPhone"    label="Guardian Phone"       placeholder="+63 9XX XXX XXXX" type="tel" /></div>

              {/* ── ID Photo ── */}
              <SectionHeader icon="📷" title="ID Photo" />
              <div className="col-12">
                <label className="form-label fw-semibold mb-1" style={{ color: "#374151", fontSize: 12 }}>
                  2×2 ID Photo <span className="text-danger">*</span>
                </label>
                <input type="file" name="idPhoto" accept="image/*" onChange={handleChange}
                  className={`form-control rounded-2 ${errors.idPhoto ? "is-invalid" : ""}`} />
                <div className="form-text text-muted" style={{ fontSize: 11 }}>JPG or PNG · max 5 MB · white background preferred</div>
                {errors.idPhoto && <div className="invalid-feedback d-block" style={{ fontSize: 11 }}>{errors.idPhoto}</div>}
                {formData.idPhoto && (
                  <div className="mt-3 d-flex align-items-center gap-3">
                    <img src={URL.createObjectURL(formData.idPhoto)} alt="Preview"
                      className="rounded-2 border" style={{ width: 80, height: 80, objectFit: "cover" }} />
                    <div>
                      <div className="text-success small fw-semibold">✓ {formData.idPhoto.name}</div>
                      <div className="text-muted" style={{ fontSize: 11 }}>{(formData.idPhoto.size / 1024).toFixed(0)} KB</div>
                    </div>
                  </div>
                )}
              </div>

            </div>{/* end row */}

            {/* Submit */}
            <div className="d-flex gap-3 mt-4 pt-2 border-top">
              <Link href="/" className="btn btn-outline-secondary flex-shrink-0 rounded-3 fw-bold px-4">Cancel</Link>
              <button type="submit" className="btn flex-grow-1 py-3 rounded-3 fw-bold text-white fs-6"
                style={{ background: "linear-gradient(135deg,#1e40af,#dc2626)", border: "none", boxShadow: "0 4px 16px rgba(30,64,175,0.3)" }}>
                Review & Submit Enrollment
              </button>
            </div>
          </form>
        </div>

        <p className="mt-4" style={{ color: "rgba(255,255,255,0.2)", fontSize: 12 }}>© 2026 Cebu Far East Institute. All rights reserved.</p>
      </div>
    </>
  );
}
