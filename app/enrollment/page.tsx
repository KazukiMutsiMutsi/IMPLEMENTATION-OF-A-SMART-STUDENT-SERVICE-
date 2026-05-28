"use client";

import { useState } from "react";
import Link from "next/link";

export default function EnrollmentPage() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    course: "",
    year: "",
    address: "",
    dateOfBirth: "",
    studentStatus: "",
    studentId: "",
    middleName: "",
    gender: "",
    civilStatus: "",
    nationality: "",
    religion: "",
    fatherName: "",
    fatherOccupation: "",
    motherName: "",
    motherOccupation: "",
    guardianName: "",
    guardianRelation: "",
    guardianPhone: "",
    previousSchool: "",
    previousSchoolAddress: "",
    yearsAttended: "",
    idPhoto: null as File | null,
  });

  const [submitted, setSubmitted] = useState(false);
  const [generatedStudentId, setGeneratedStudentId] = useState("");
  const [generatedLRN, setGeneratedLRN] = useState("");
  const [staticPassword, setStaticPassword] = useState("CFEI@2026");
  const [showTerms, setShowTerms] = useState(false);
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const [hasScrolledToBottom, setHasScrolledToBottom] = useState(false);

  const handleTermsScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const element = e.currentTarget;
    const isAtBottom = element.scrollHeight - element.scrollTop <= element.clientHeight + 10;
    setHasScrolledToBottom(isAtBottom);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const target = e.target as HTMLInputElement;
    if (target.type === "file") {
      const files = target.files;
      if (files && files[0]) {
        setFormData(prev => ({ ...prev, idPhoto: files[0] }));
      }
    } else {
      const { name, value } = target;
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Check if all required fields are filled
    const requiredFields = {
      firstName: formData.firstName,
      lastName: formData.lastName,
      email: formData.email,
      phone: formData.phone,
      course: formData.course,
      year: formData.year,
      address: formData.address,
      dateOfBirth: formData.dateOfBirth,
      studentStatus: formData.studentStatus,
      nationality: formData.nationality,
      religion: formData.religion,
    };
    
    const allFieldsFilled = Object.values(requiredFields).every(field => field && field.toString().trim() !== "");
    
    // For old students, Student ID is required
    if (formData.studentStatus === "old" && !formData.studentId.trim()) {
      alert("Please enter your Student ID");
      return;
    }
    
    // Check if ID photo is uploaded
    if (!formData.idPhoto) {
      alert("Please upload a 2x2 ID photo");
      return;
    }
    
    if (!allFieldsFilled) {
      alert("Please fill in all required fields");
      return;
    }

    // Show terms and conditions modal
    setShowTerms(true);
  };

  const handleConfirmEnrollment = () => {
    if (!agreedToTerms) {
      alert("Please agree to the terms and conditions to proceed");
      return;
    }

    let studentId = formData.studentId;
    let lrn = "";
    
    // Generate Student ID and LRN only for new students
    if (formData.studentStatus === "new") {
      const now = new Date();
      const year = now.getFullYear();
      const month = String(now.getMonth() + 1).padStart(2, "0");
      const day = String(now.getDate()).padStart(2, "0");
      const randomNum = String(Math.floor(Math.random() * 10000)).padStart(4, "0");
      studentId = `STU-${year}${month}${day}${randomNum}`;
      
      // Generate LRN (12 digits: YYYYMMDD + 4 random digits)
      const lrnRandom = String(Math.floor(Math.random() * 10000)).padStart(4, "0");
      lrn = `${year}${month}${day}${lrnRandom}`;
    } else {
      // For old students, generate LRN if not already provided
      const now = new Date();
      const year = now.getFullYear();
      const month = String(now.getMonth() + 1).padStart(2, "0");
      const day = String(now.getDate()).padStart(2, "0");
      const lrnRandom = String(Math.floor(Math.random() * 10000)).padStart(4, "0");
      lrn = `${year}${month}${day}${lrnRandom}`;
    }
    
    setGeneratedStudentId(studentId);
    setGeneratedLRN(lrn);
    setShowTerms(false);
    setAgreedToTerms(false);
    setHasScrolledToBottom(false);

    // Submit enrollment
    console.log("Enrollment submitted:", { ...formData, studentId, lrn, password: staticPassword });
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="d-flex flex-column align-items-center justify-content-center px-3 py-5 position-relative" style={{ minHeight: "100vh", background: "linear-gradient(-45deg, #0f172a, #1e3a6e, #1e293b, #0f172a, #1a1f35, #2d3748, #0f172a)", backgroundSize: "400% 400%", animation: "animatedGradient 15s ease infinite" }}>
        {/* Animated background orbs */}
        <div style={{
          position: "absolute",
          top: "20%",
          left: "10%",
          width: 250,
          height: 250,
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(30, 58, 110, 0.3) 0%, transparent 70%)",
          filter: "blur(40px)",
          animation: "floatOrb1 20s ease-in-out infinite",
          pointerEvents: "none"
        }} />
        <div style={{
          position: "absolute",
          bottom: "20%",
          right: "10%",
          width: 300,
          height: 300,
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(225, 29, 72, 0.25) 0%, transparent 70%)",
          filter: "blur(40px)",
          animation: "floatOrb2 25s ease-in-out infinite",
          pointerEvents: "none"
        }} />
        
        <div className="card border-0 shadow-lg rounded-3 overflow-hidden position-relative" style={{ maxWidth: 550, width: "100%", zIndex: 10 }}>
          <div className="card-body p-5 text-center">
            <div style={{ fontSize: 64, marginBottom: 20 }}>✅</div>
            <h2 className="fw-black text-success mb-3">Enrollment Successful!</h2>
            <p className="text-muted mb-4">
              Your enrollment has been submitted successfully. Please save your credentials below.
            </p>
            
            {/* Enrollment Details */}
            <div className="alert alert-info mb-4 text-start">
              <div className="mb-3">
                <strong>Name:</strong> {formData.firstName} {formData.middleName && formData.middleName + " "}{formData.lastName}
              </div>
              <div className="mb-3">
                <strong>Status:</strong> {formData.studentStatus === "new" ? "New Student" : "Old Student"}
              </div>
              <div>
                <strong>Track:</strong> {formData.course} - Grade {formData.year}
              </div>
            </div>

            {/* Credentials Box */}
            <div className="card border-2 border-primary rounded-3 mb-4">
              <div className="card-body p-4">
                <h5 className="fw-bold text-primary mb-3">📋 Your Login Credentials</h5>
                
                {/* LRN */}
                <div className="mb-3 p-3 rounded-2" style={{ background: "#f0f4ff", border: "1px solid #bfdbfe" }}>
                  <div className="text-muted small mb-1">Learner Reference Number (LRN)</div>
                  <div className="fw-black fs-5 text-primary font-mono">{generatedLRN}</div>
                </div>

                {/* Student ID */}
                <div className="mb-3 p-3 rounded-2" style={{ background: "#fef2f2", border: "1px solid #fecaca" }}>
                  <div className="text-muted small mb-1">Student ID</div>
                  <div className="fw-black fs-5 text-danger font-mono">{generatedStudentId}</div>
                </div>

                {/* Password */}
                <div className="p-3 rounded-2" style={{ background: "#fffbeb", border: "1px solid #fde68a" }}>
                  <div className="text-muted small mb-1">Temporary Password</div>
                  <div className="fw-black fs-5 text-warning font-mono">{staticPassword}</div>
                </div>

                <small className="text-muted d-block mt-3">
                  ⚠️ Please save these credentials. You will need them to log in to the system.
                </small>
              </div>
            </div>

            {/* Important Notice */}
            <div className="alert alert-warning mb-4 text-start small">
              <strong>Important:</strong> Change your password on your first login. Do not share your credentials with anyone.
            </div>

            <Link href="/login" className="btn btn-primary btn-lg rounded-2 fw-bold">
              Go to Login
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      {/* Terms and Conditions Modal */}
      {showTerms && (
        <div className="position-fixed top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center px-3" style={{ background: "rgba(0,0,0,0.5)", zIndex: 9999, overflowY: "auto" }}>
          <div className="card border-0 shadow-lg rounded-3 overflow-hidden my-4" style={{ maxWidth: 600, width: "100%", maxHeight: "90vh" }}>
            {/* Header */}
            <div className="p-4 text-white text-center flex-shrink-0" style={{ background: "linear-gradient(135deg,#1e40af,#dc2626)" }}>
              <h2 className="fw-black fs-5 mb-0">Terms and Conditions</h2>
            </div>

            {/* Content - Scrollable */}
            <div className="card-body p-4" style={{ overflowY: "auto", maxHeight: "calc(90vh - 200px)" }} onScroll={handleTermsScroll}>
              <div className="mb-4" style={{ fontSize: "0.95rem", lineHeight: 1.6, color: "#333" }}>
                <h5 className="fw-bold mb-3">TERMS AND CONDITIONS</h5>
                
                <p className="mb-3">
                  <strong>1. ENROLLMENT AGREEMENT</strong><br/>
                  A pupil or student who withdraws enrollment before or after the beginning of classes must submit a written request stating the reason for withdrawal. The withdrawal of documents must be processed within the school year only after being cleared with accountabilities.
                </p>

                <p className="mb-3">
                  <strong>2. REFUND POLICY</strong><br/>
                  Refund on tuition fees is governed by the Law for Private Schools (Republic No. 64, 1992 Manual of Regulations for Private Schools). Refund of tuition fees shall be made within two weeks after the request for withdrawal is made. The student shall be charged at the school fees in full for the first month of classes. If the student withdraws within the first month, he/she shall be charged fifty percent (50%) of the total monthly dues for the term. If he withdraws within the second week of classes, he shall be charged twenty-five percent (25%) of the total monthly dues.
                </p>

                <p className="mb-3">
                  <strong>3. GRADING AND ACADEMIC POLICIES</strong><br/>
                  Students from Grade 7 to Grade 12 are entitled to free tuition fees and miscellaneous expenses under applicable subsidy programs. However, should the student transfer to another school or go abroad within the school year or grade level, the student shall be required to pay the full cost of tuition fees and miscellaneous expenses for the entire school year.
                </p>

                <p className="mb-3">
                  <strong>4. DATA PRIVACY</strong><br/>
                  I hereby agree to the processing of my personal and sensitive personal data for legitimate school purposes in accordance with the Data Privacy Act of 2012.
                </p>

                <hr className="my-4" />

                <p className="text-muted small mb-0">
                  <em>By checking the box below, you acknowledge that you have read and understood these terms and conditions.</em>
                </p>
              </div>
            </div>

            {/* Footer - Fixed */}
            <div className="p-4 border-top bg-light flex-shrink-0">
              {/* Show checkbox only if scrolled to bottom */}
              {!hasScrolledToBottom && (
                <div className="alert alert-info mb-3 small">
                  📖 Please scroll down to read all terms and conditions
                </div>
              )}

              {hasScrolledToBottom && (
                <>
                  {/* Checkbox */}
                  <div className="form-check mb-3">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      id="agreeTerms"
                      checked={agreedToTerms}
                      onChange={(e) => setAgreedToTerms(e.target.checked)}
                    />
                    <label className="form-check-label fw-semibold" htmlFor="agreeTerms">
                      I agree to the terms and conditions above
                    </label>
                  </div>

                  {/* Buttons */}
                  <div className="d-flex gap-2">
                    <button
                      type="button"
                      onClick={() => {
                        setShowTerms(false);
                        setAgreedToTerms(false);
                        setHasScrolledToBottom(false);
                      }}
                      className="btn btn-outline-secondary flex-grow-1 rounded-2 fw-bold"
                    >
                      Decline
                    </button>
                    <button
                      type="button"
                      onClick={handleConfirmEnrollment}
                      disabled={!agreedToTerms}
                      className="btn btn-primary flex-grow-1 rounded-2 fw-bold"
                      style={{ background: "linear-gradient(135deg, #1e40af, #dc2626)", border: "none" }}
                    >
                      Agree & Continue
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      )}

    <div className="d-flex flex-column align-items-center justify-content-start px-3 py-4 position-relative" style={{ minHeight: "100vh", background: "linear-gradient(-45deg, #0f172a, #1e3a6e, #1e293b, #0f172a, #1a1f35, #2d3748, #0f172a)", backgroundSize: "400% 400%", animation: "animatedGradient 15s ease infinite" }}>
      {/* Animated background orbs */}
      <div style={{
        position: "absolute",
        top: "10%",
        left: "5%",
        width: 300,
        height: 300,
        borderRadius: "50%",
        background: "radial-gradient(circle, rgba(30, 58, 110, 0.3) 0%, transparent 70%)",
        filter: "blur(40px)",
        animation: "floatOrb1 20s ease-in-out infinite",
        pointerEvents: "none"
      }} />
      <div style={{
        position: "absolute",
        top: "60%",
        right: "10%",
        width: 350,
        height: 350,
        borderRadius: "50%",
        background: "radial-gradient(circle, rgba(225, 29, 72, 0.25) 0%, transparent 70%)",
        filter: "blur(40px)",
        animation: "floatOrb2 25s ease-in-out infinite",
        pointerEvents: "none"
      }} />
      <div style={{
        position: "absolute",
        bottom: "10%",
        left: "50%",
        width: 280,
        height: 280,
        borderRadius: "50%",
        background: "radial-gradient(circle, rgba(245, 158, 11, 0.2) 0%, transparent 70%)",
        filter: "blur(40px)",
        animation: "floatOrb3 22s ease-in-out infinite",
        pointerEvents: "none"
      }} />
      
      <div className="card border-0 shadow-lg rounded-3 overflow-hidden position-relative" style={{ maxWidth: 600, width: "100%", marginTop: 20, zIndex: 10 }}>
        {/* Header */}
        <div className="p-4 text-white text-center" style={{ background: "linear-gradient(135deg,#1e40af,#dc2626)" }}>
          <h1 className="fw-black fs-4 mb-1">Student Enrollment Form</h1>
          <p className="text-white-50 small mb-0">Complete all fields to enroll for the semester</p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="card-body p-4">
          <div className="row g-3">
            {/* Student Status */}
            <div className="col-12">
              <label className="form-label fw-semibold text-muted small">Student Status *</label>
              <select
                name="studentStatus"
                value={formData.studentStatus}
                onChange={handleChange}
                className="form-select rounded-2"
                required
              >
                <option value="">Select student status</option>
                <option value="new">New Student</option>
                <option value="old">Old Student</option>
              </select>
            </div>

            {/* Student ID (only for old students) */}
            {formData.studentStatus === "old" && (
              <div className="col-12">
                <label className="form-label fw-semibold text-muted small">Student ID *</label>
                <input
                  type="text"
                  name="studentId"
                  value={formData.studentId}
                  onChange={handleChange}
                  placeholder="Enter your Student ID"
                  className="form-control rounded-2"
                  required
                />
              </div>
            )}

            {/* First Name */}
            <div className="col-md-6">
              <label className="form-label fw-semibold text-muted small">First Name *</label>
              <input
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                placeholder="First name"
                className="form-control rounded-2"
                required
              />
            </div>

            {/* Last Name */}
            <div className="col-md-6">
              <label className="form-label fw-semibold text-muted small">Last Name *</label>
              <input
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                placeholder="Last name"
                className="form-control rounded-2"
                required
              />
            </div>

            {/* Middle Name */}
            <div className="col-md-6">
              <label className="form-label fw-semibold text-muted small">Middle Name</label>
              <input
                type="text"
                name="middleName"
                value={formData.middleName}
                onChange={handleChange}
                placeholder="Middle name"
                className="form-control rounded-2"
              />
            </div>

            {/* Gender */}
            <div className="col-md-6">
              <label className="form-label fw-semibold text-muted small">Gender *</label>
              <select
                name="gender"
                value={formData.gender}
                onChange={handleChange}
                className="form-select rounded-2"
                required
              >
                <option value="">Select gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
            </div>

            {/* Civil Status */}
            <div className="col-md-6">
              <label className="form-label fw-semibold text-muted small">Civil Status *</label>
              <select
                name="civilStatus"
                value={formData.civilStatus}
                onChange={handleChange}
                className="form-select rounded-2"
                required
              >
                <option value="">Select civil status</option>
                <option value="Single">Single</option>
                <option value="Married">Married</option>
                <option value="Widowed">Widowed</option>
                <option value="Separated">Separated</option>
              </select>
            </div>

            {/* Email */}
            <div className="col-md-6">
              <label className="form-label fw-semibold text-muted small">Email *</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="your.email@example.com"
                className="form-control rounded-2"
                required
              />
            </div>

            {/* Phone */}
            <div className="col-md-6">
              <label className="form-label fw-semibold text-muted small">Phone Number *</label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="+63 9XX XXX XXXX"
                className="form-control rounded-2"
                required
              />
            </div>

            {/* Track */}
            <div className="col-md-6">
              <label className="form-label fw-semibold text-muted small">Track *</label>
              <select
                name="course"
                value={formData.course}
                onChange={handleChange}
                className="form-select rounded-2"
                required
              >
                <option value="">Select a track</option>
                <option value="TVL">Technical-Vocational-Livelihood (TVL)</option>
                <option value="STEM">Science, Technology, Engineering, Mathematics (STEM)</option>
                <option value="GAS">General Academic Strand (GAS)</option>
                <option value="HUMMS">Humanities and Social Sciences (HUMMS)</option>
                <option value="ABM">Accountancy, Business, and Management (ABM)</option>
              </select>
            </div>

            {/* Grade Level */}
            <div className="col-md-6">
              <label className="form-label fw-semibold text-muted small">Grade Level *</label>
              <select
                name="year"
                value={formData.year}
                onChange={handleChange}
                className="form-select rounded-2"
                required
              >
                <option value="">Select grade level</option>
                <option value="11">Grade 11</option>
                <option value="12">Grade 12</option>
              </select>
            </div>

            {/* Date of Birth */}
            <div className="col-md-6">
              <label className="form-label fw-semibold text-muted small">Date of Birth *</label>
              <input
                type="date"
                name="dateOfBirth"
                value={formData.dateOfBirth}
                onChange={handleChange}
                className="form-control rounded-2"
                required
              />
            </div>

            {/* Address */}
            <div className="col-12">
              <label className="form-label fw-semibold text-muted small">Address *</label>
              <input
                type="text"
                name="address"
                value={formData.address}
                onChange={handleChange}
                placeholder="Street address, city, province"
                className="form-control rounded-2"
                required
              />
            </div>

            {/* Nationality */}
            <div className="col-md-6">
              <label className="form-label fw-semibold text-muted small">Nationality *</label>
              <input
                type="text"
                name="nationality"
                value={formData.nationality}
                onChange={handleChange}
                placeholder="e.g., Filipino"
                className="form-control rounded-2"
                required
              />
            </div>

            {/* Religion */}
            <div className="col-md-6">
              <label className="form-label fw-semibold text-muted small">Religion *</label>
              <input
                type="text"
                name="religion"
                value={formData.religion}
                onChange={handleChange}
                placeholder="e.g., Roman Catholic"
                className="form-control rounded-2"
                required
              />
            </div>

            {/* Father's Name */}
            <div className="col-md-6">
              <label className="form-label fw-semibold text-muted small">Father's Name</label>
              <input
                type="text"
                name="fatherName"
                value={formData.fatherName}
                onChange={handleChange}
                placeholder="Father's full name"
                className="form-control rounded-2"
              />
            </div>

            {/* Father's Occupation */}
            <div className="col-md-6">
              <label className="form-label fw-semibold text-muted small">Father's Occupation</label>
              <input
                type="text"
                name="fatherOccupation"
                value={formData.fatherOccupation}
                onChange={handleChange}
                placeholder="Father's occupation"
                className="form-control rounded-2"
              />
            </div>

            {/* Mother's Name */}
            <div className="col-md-6">
              <label className="form-label fw-semibold text-muted small">Mother's Name</label>
              <input
                type="text"
                name="motherName"
                value={formData.motherName}
                onChange={handleChange}
                placeholder="Mother's full name"
                className="form-control rounded-2"
              />
            </div>

            {/* Mother's Occupation */}
            <div className="col-md-6">
              <label className="form-label fw-semibold text-muted small">Mother's Occupation</label>
              <input
                type="text"
                name="motherOccupation"
                value={formData.motherOccupation}
                onChange={handleChange}
                placeholder="Mother's occupation"
                className="form-control rounded-2"
              />
            </div>

            {/* Guardian Name */}
            <div className="col-md-6">
              <label className="form-label fw-semibold text-muted small">Guardian Name</label>
              <input
                type="text"
                name="guardianName"
                value={formData.guardianName}
                onChange={handleChange}
                placeholder="Guardian's full name"
                className="form-control rounded-2"
              />
            </div>

            {/* Guardian Relation */}
            <div className="col-md-6">
              <label className="form-label fw-semibold text-muted small">Guardian Relation</label>
              <input
                type="text"
                name="guardianRelation"
                value={formData.guardianRelation}
                onChange={handleChange}
                placeholder="e.g., Aunt, Uncle, Grandparent"
                className="form-control rounded-2"
              />
            </div>

            {/* Guardian Phone */}
            <div className="col-md-6">
              <label className="form-label fw-semibold text-muted small">Guardian Phone</label>
              <input
                type="tel"
                name="guardianPhone"
                value={formData.guardianPhone}
                onChange={handleChange}
                placeholder="+63 9XX XXX XXXX"
                className="form-control rounded-2"
              />
            </div>

            {/* Previous School */}
            <div className="col-md-6">
              <label className="form-label fw-semibold text-muted small">Previous School</label>
              <input
                type="text"
                name="previousSchool"
                value={formData.previousSchool}
                onChange={handleChange}
                placeholder="Name of previous school"
                className="form-control rounded-2"
              />
            </div>

            {/* Previous School Address */}
            <div className="col-12">
              <label className="form-label fw-semibold text-muted small">Previous School Address</label>
              <input
                type="text"
                name="previousSchoolAddress"
                value={formData.previousSchoolAddress}
                onChange={handleChange}
                placeholder="Address of previous school"
                className="form-control rounded-2"
              />
            </div>

            {/* Years Attended */}
            <div className="col-md-6">
              <label className="form-label fw-semibold text-muted small">Years Attended</label>
              <input
                type="text"
                name="yearsAttended"
                value={formData.yearsAttended}
                onChange={handleChange}
                placeholder="e.g., 2020-2024"
                className="form-control rounded-2"
              />
            </div>

            {/* 2x2 ID Photo */}
            <div className="col-12">
              <label className="form-label fw-semibold text-muted small">2x2 ID Photo *</label>
              <div className="position-relative">
                <input
                  type="file"
                  name="idPhoto"
                  onChange={handleChange}
                  accept="image/*"
                  className="form-control rounded-2"
                  required
                />
                <small className="form-text text-muted d-block mt-2">
                  Upload a 2x2 inch ID photo (JPG, PNG). Max size: 5MB
                </small>
              </div>
              {formData.idPhoto && (
                <div className="mt-3">
                  <div className="text-success small mb-2">✓ File selected: {formData.idPhoto.name}</div>
                  <img 
                    src={URL.createObjectURL(formData.idPhoto)} 
                    alt="ID Preview" 
                    className="rounded-2"
                    style={{ maxWidth: "150px", maxHeight: "150px", objectFit: "cover" }}
                  />
                </div>
              )}
            </div>
          </div>

          {/* Submit Button */}
          <div className="d-flex gap-2 mt-4">
            <button
              type="submit"
              className="btn btn-primary btn-lg flex-grow-1 rounded-2 fw-bold"
            >
              Submit Enrollment
            </button>
            <Link href="/" className="btn btn-outline-secondary btn-lg rounded-2 fw-bold">
              Cancel
            </Link>
          </div>
        </form>
      </div>
    </div>
    </>
  );
}
