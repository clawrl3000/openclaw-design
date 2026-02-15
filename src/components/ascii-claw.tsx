"use client";

import { useState } from "react";
import ASCIIAnimation from "@/components/ascii-animation";

const CLAW_OPTIONS = [
  { key: "claw-open", label: "Open Claw" },
  { key: "claw-closed", label: "Closed Claw" },
  { key: "claw", label: "Classic Claw" },
];

export function AsciiClaw() {
  const [selected, setSelected] = useState("claw");

  return (
    <div
      className="absolute inset-0 overflow-hidden pointer-events-none select-none flex items-center justify-center"
      aria-hidden="true"
    >
      {/* Dropdown — needs pointer events so user can interact */}
      <div className="absolute top-4 right-4 z-20 pointer-events-auto">
        <select
          value={selected}
          onChange={(e) => setSelected(e.target.value)}
          className="bg-[#1E1510] border border-[#2D221C] text-white/60 text-xs font-mono rounded-lg px-3 py-1.5 cursor-pointer hover:border-[#FF4D4D]/30 focus:outline-none focus:border-[#FF4D4D]/50 transition-colors"
        >
          {CLAW_OPTIONS.map((opt) => (
            <option key={opt.key} value={opt.key}>
              {opt.label}
            </option>
          ))}
        </select>
      </div>

      {/* ASCII claw with float/pulse */}
      <div
        style={{
          width: "min(600px, 80vw)",
          height: "min(360px, 45vh)",
          opacity: 0.5,
          maskImage: "linear-gradient(to right, transparent 0%, black 40%)",
          WebkitMaskImage:
            "linear-gradient(to right, transparent 0%, black 40%)",
          animation: "clawFloat 8s ease-in-out infinite",
        }}
      >
        <ASCIIAnimation
          key={selected}
          frameFolder={`animations/${selected}`}
          quality="high"
          fps={1}
          frameCount={1}
          className="w-full h-full"
          color="#FF4D4D"
          ariaLabel="ASCII lobster claw"
        />
      </div>

      <style>{`
        @keyframes clawFloat {
          0%, 100% {
            translate: 0 0;
            scale: 1;
          }
          25% {
            translate: 0 -6px;
            scale: 1.03;
          }
          50% {
            translate: 0 2px;
            scale: 0.97;
          }
          75% {
            translate: 0 -3px;
            scale: 1.01;
          }
        }
      `}</style>
    </div>
  );
}
