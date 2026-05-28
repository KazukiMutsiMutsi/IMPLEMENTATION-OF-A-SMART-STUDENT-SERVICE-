"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

export default function LoadingScreen({ onDone }: { onDone: () => void }) {
  const [progress, setProgress] = useState(0);
  const [fadeOut, setFadeOut]   = useState(false);

  useEffect(() => {
    const steps    = 44;
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) { clearInterval(interval); return 100; }
        return prev + 100 / steps;
      });
    }, 50);
    const fadeTimer = setTimeout(() => setFadeOut(true), 2400);
    const doneTimer = setTimeout(() => onDone(), 2900);
    return () => { clearInterval(interval); clearTimeout(fadeTimer); clearTimeout(doneTimer); };
  }, [onDone]);

  return (
    <div
      className="position-fixed top-0 start-0 w-100 h-100 d-flex flex-column align-items-center justify-content-center"
      style={{
        zIndex: 9999,
        background: "linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #0f172a 100%)",
        opacity: fadeOut ? 0 : 1,
        transition: "opacity 0.5s",
        pointerEvents: fadeOut ? "none" : "auto",
      }}
    >
      <div className="d-flex flex-column align-items-center gap-4 animate-fade-in">
        {/* Spinning ring + logo */}
        <div className="position-relative d-flex align-items-center justify-content-center">
          <div className="position-absolute rounded-circle animate-spin"
            style={{ width: 180, height: 180, border: "3px solid transparent", borderTopColor: "#f59e0b", borderRightColor: "#e11d48", animationDuration: "2s" }} />
          <div className="rounded-circle bg-white shadow d-flex align-items-center justify-content-center overflow-hidden p-3"
            style={{ width: 150, height: 150, boxShadow: "0 20px 50px rgba(245, 158, 11, 0.2)" }}>
            <Image src="/cfei-logo.jpg" alt="Cebu Far East Institute" width={140} height={140} priority />
          </div>
        </div>

        {/* School name */}
        <div className="text-center">
          <h1 className="fw-black fs-3 text-white mb-2">Cebu Far East Institute</h1>
          <p className="text-white-50 fst-italic small mb-0">Excellence in Education</p>
        </div>

        {/* System badge */}
        <div className="d-flex align-items-center gap-2 rounded-pill px-5 py-3 shadow" style={{ background: "linear-gradient(135deg, rgba(245, 158, 11, 0.1), rgba(225, 29, 72, 0.1))", border: "1px solid rgba(255, 255, 255, 0.2)" }}>
          <span className="text-white fw-black" style={{ letterSpacing: "0.2em", fontSize: "0.95rem" }}>INFORM</span>
          <span className="text-white-50 small">Student Information System</span>
        </div>

        {/* Progress bar */}
        <div className="d-flex flex-column align-items-center gap-3" style={{ width: 280 }}>
          <div className="progress w-100" style={{ height: 4, background: "rgba(255, 255, 255, 0.1)", borderRadius: "2px", overflow: "hidden" }}>
            <div className="progress-bar" role="progressbar"
              style={{ width: `${Math.min(progress, 100)}%`, background: "linear-gradient(90deg, #f59e0b, #e11d48)", transition: "width 0.075s", borderRadius: "2px" }} />
          </div>
          <p className="text-white-50 small mb-0">Loading system...</p>
        </div>
      </div>
    </div>
  );
}
