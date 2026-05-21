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
        background: "linear-gradient(160deg,#e8eeff 0%,#f0f4ff 50%,#eaf0ff 100%)",
        opacity: fadeOut ? 0 : 1,
        transition: "opacity 0.5s",
        pointerEvents: fadeOut ? "none" : "auto",
      }}
    >
      <div className="d-flex flex-column align-items-center gap-4 animate-fade-in">
        {/* Spinning ring + logo */}
        <div className="position-relative d-flex align-items-center justify-content-center">
          <div className="position-absolute rounded-circle animate-spin"
            style={{ width: 176, height: 176, border: "4px solid transparent", borderTopColor: "#2563eb", borderRightColor: "#c0440a", animationDuration: "1.4s" }} />
          <div className="rounded-circle bg-white shadow d-flex align-items-center justify-content-center overflow-hidden p-2"
            style={{ width: 144, height: 144, boxShadow: "0 8px 32px rgba(37,99,235,0.2)" }}>
            <Image src="/image.png" alt="Benedicto College" width={128} height={128} priority />
          </div>
        </div>

        {/* School name */}
        <div className="text-center">
          <h1 className="fw-black fs-4 text-dark mb-1">Benedicto College</h1>
          <p className="text-muted fst-italic small mb-0">Your Education... Our Mission</p>
        </div>

        {/* System badge */}
        <div className="d-flex align-items-center gap-2 bg-primary rounded-pill px-4 py-2 shadow">
          <span className="text-white fw-black" style={{ letterSpacing: "0.15em" }}>INFORM</span>
          <span className="text-white-50 small">Student Information System</span>
        </div>

        {/* Progress bar */}
        <div className="d-flex flex-column align-items-center gap-2" style={{ width: 256 }}>
          <div className="progress w-100" style={{ height: 6 }}>
            <div className="progress-bar" role="progressbar"
              style={{ width: `${Math.min(progress, 100)}%`, background: "linear-gradient(90deg,#2563eb,#c0440a)", transition: "width 0.075s" }} />
          </div>
          <p className="text-muted small mb-0">Loading system...</p>
        </div>
      </div>
    </div>
  );
}
