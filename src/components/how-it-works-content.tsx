"use client";

import { Button } from "@heroui/react";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { SiteNavbar } from "@/components/navbar";
import { Footer } from "@/components/footer";

/* ── Gradient SVG Icons ─────────────────────────────────── */

function SearchIcon() {
  return (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="url(#icGrad1)" strokeWidth={1.5}>
      <defs>
        <linearGradient id="icGrad1" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FF6B6B" />
          <stop offset="100%" stopColor="#F97316" />
        </linearGradient>
      </defs>
      <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
    </svg>
  );
}

function CartIcon() {
  return (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="url(#icGrad2)" strokeWidth={1.5}>
      <defs>
        <linearGradient id="icGrad2" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FF6B6B" />
          <stop offset="100%" stopColor="#F97316" />
        </linearGradient>
      </defs>
      <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
    </svg>
  );
}

function DownloadIcon() {
  return (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="url(#icGrad3)" strokeWidth={1.5}>
      <defs>
        <linearGradient id="icGrad3" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FF6B6B" />
          <stop offset="100%" stopColor="#F97316" />
        </linearGradient>
      </defs>
      <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3" />
    </svg>
  );
}

function FolderIcon() {
  return (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="url(#icGrad4)" strokeWidth={1.5}>
      <defs>
        <linearGradient id="icGrad4" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FF6B6B" />
          <stop offset="100%" stopColor="#F97316" />
        </linearGradient>
      </defs>
      <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12.75V12A2.25 2.25 0 014.5 9.75h15A2.25 2.25 0 0121.75 12v.75m-8.69-6.44l-2.12-2.12a1.5 1.5 0 00-1.061-.44H4.5A2.25 2.25 0 002.25 6v12a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9a2.25 2.25 0 00-2.25-2.25h-5.379a1.5 1.5 0 01-1.06-.44z" />
    </svg>
  );
}

function RocketIcon() {
  return (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="url(#icGrad5)" strokeWidth={1.5}>
      <defs>
        <linearGradient id="icGrad5" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FF6B6B" />
          <stop offset="100%" stopColor="#F97316" />
        </linearGradient>
      </defs>
      <path strokeLinecap="round" strokeLinejoin="round" d="M15.59 14.37a6 6 0 01-5.84 7.38v-4.8m5.84-2.58a14.98 14.98 0 006.16-12.12A14.98 14.98 0 009.631 8.41m5.96 5.96a14.926 14.926 0 01-5.841 2.58m-.119-8.54a6 6 0 00-7.381 5.84h4.8m2.581-5.84a14.927 14.927 0 00-2.58 5.84m2.699 2.7c-.103.021-.207.041-.311.06a15.09 15.09 0 01-2.448-2.448 14.9 14.9 0 01.06-.312m-2.24 2.39a4.493 4.493 0 00-1.757 4.306 4.493 4.493 0 004.306-1.758M16.5 9a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z" />
    </svg>
  );
}

function ArrowIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
    </svg>
  );
}

function ClipboardIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M15.666 3.888A2.25 2.25 0 0013.5 2.25h-3c-1.03 0-1.9.693-2.166 1.638m7.332 0c.055.194.084.4.084.612v0a.75.75 0 01-.75.75H9.75a.75.75 0 01-.75-.75v0c0-.212.03-.418.084-.612m7.332 0c.646.049 1.288.11 1.927.184 1.1.128 1.907 1.077 1.907 2.185V19.5a2.25 2.25 0 01-2.25 2.25H6.75A2.25 2.25 0 014.5 19.5V6.257c0-1.108.806-2.057 1.907-2.185a48.208 48.208 0 011.927-.184" />
    </svg>
  );
}

function CheckSmallIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
    </svg>
  );
}

/* ── Copy Block ─────────────────────────────────────────── */

function CopyBlock({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback for older browsers
      const el = document.createElement("textarea");
      el.value = text;
      el.style.position = "fixed";
      el.style.opacity = "0";
      document.body.appendChild(el);
      el.select();
      document.execCommand("copy");
      document.body.removeChild(el);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="mt-3 inline-flex items-center gap-0 bg-[#1E1510] border border-white/[0.06] rounded-lg overflow-hidden group/copy">
      <code className="font-mono text-[13px] px-4 py-2.5 text-[#F59E0B] glow-text-amber select-all">
        {text}
      </code>
      <button
        onClick={handleCopy}
        className={`flex items-center gap-1.5 px-3 py-2.5 border-l border-white/[0.06] transition-all duration-200 text-[11px] font-mono ${
          copied
            ? "bg-[#22c55e]/10 text-[#22c55e]"
            : "text-white/30 hover:text-white/60 hover:bg-white/[0.03]"
        }`}
        aria-label="Copy to clipboard"
      >
        {copied ? (
          <>
            <CheckSmallIcon /> <span>Copied</span>
          </>
        ) : (
          <>
            <ClipboardIcon /> <span>Copy</span>
          </>
        )}
      </button>
    </div>
  );
}

/* ── Scroll Reveal Hook ─────────────────────────────────── */

function useReveal() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) e.target.classList.add("visible");
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
    );
    el.querySelectorAll(".reveal-up").forEach((c) => observer.observe(c));
    return () => observer.disconnect();
  }, []);
  return ref;
}

/* ── Steps Data ─────────────────────────────────────────── */
/* Copy rewritten with click-driver + conversion-copy principles:
   - Lead with outcome, not feature
   - Specificity (numbers, timeframes)
   - Bold the result, not the action
   - One accent color per block
   - Stakes: what's lost by NOT doing this
*/

interface Step {
  num: string;
  icon: React.ReactNode;
  title: React.ReactNode;
  body: React.ReactNode;
  detail?: React.ReactNode;
  code?: string;
  stat?: { value: string; label: string };
}

const STEPS: Step[] = [
  {
    num: "01",
    icon: <SearchIcon />,
    title: (
      <>
        See Exactly What You&apos;re{" "}
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF6B6B] via-[#FF4D4D] to-[#F97316]">
          Getting
        </span>
      </>
    ),
    body: (
      <p className="text-[15px] text-white/45 leading-[1.7] max-w-[55ch]">
        Every skill page shows{" "}
        <strong className="text-white/70 font-medium">
          the full bundle contents
        </strong>
        , real ratings from people running it, and a feature-by-feature breakdown.{" "}
        <span className="text-white/30 italic">No guessing, no demos, no &ldquo;request access.&rdquo;</span>
      </p>
    ),
    detail: (
      <p className="text-[13px] text-white/25 leading-relaxed max-w-[50ch]">
        Filter by category, sort by price or rating. Read the docs before you buy.
      </p>
    ),
    stat: { value: "8", label: "skills live" },
  },
  {
    num: "02",
    icon: <CartIcon />,
    title: (
      <>
        One Price.{" "}
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF6B6B] via-[#FF4D4D] to-[#F97316]">
          No Subscriptions.
        </span>
      </>
    ),
    body: (
      <p className="text-[15px] text-white/45 leading-[1.7] max-w-[55ch]">
        Skills are{" "}
        <strong className="text-[#F59E0B] font-mono font-medium glow-text-amber">
          $5–9
        </strong>{" "}
        each. Add what you need, checkout, and you{" "}
        <strong className="text-white/70 font-medium">own it forever</strong>.
        No recurring charges, no seat limits, no lock-in.
      </p>
    ),
    detail: (
      <p className="text-[13px] text-white/25 leading-relaxed max-w-[50ch]">
        Full source code included. Read it, modify it, learn from it — it&apos;s yours.
      </p>
    ),
    stat: { value: "$5–9", label: "per skill" },
  },
  {
    num: "03",
    icon: <DownloadIcon />,
    title: (
      <>
        Files Land in{" "}
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF6B6B] via-[#FF4D4D] to-[#F97316]">
          Under 10 Seconds
        </span>
      </>
    ),
    body: (
      <p className="text-[15px] text-white/45 leading-[1.7] max-w-[55ch]">
        You get the{" "}
        <span className="text-[#F97316] font-mono">SKILL.md</span>,
        scripts, config templates, and docs.{" "}
        <strong className="text-white/70 font-medium">
          Everything you need, nothing you don&apos;t.
        </strong>
      </p>
    ),
    stat: { value: "<10s", label: "delivery" },
  },
  {
    num: "04",
    icon: <FolderIcon />,
    title: (
      <>
        Drop Into{" "}
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF6B6B] via-[#FF4D4D] to-[#F97316]">
          Your Skills Folder
        </span>
      </>
    ),
    body: (
      <p className="text-[15px] text-white/45 leading-[1.7] max-w-[55ch]">
        Copy the files into your{" "}
        <span className="text-[#F97316] font-mono">skills/</span> directory.{" "}
        <span className="text-white/30 italic">
          No build step. No compilation. No configuration wizard.
        </span>
      </p>
    ),
    code: "cp -r clawshi/ ~/clawd/skills/",
  },
  {
    num: "05",
    icon: <RocketIcon />,
    title: (
      <>
        Your Agent{" "}
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF6B6B] via-[#FF4D4D] to-[#F97316]">
          Just Runs It
        </span>
      </>
    ),
    body: (
      <p className="text-[15px] text-white/45 leading-[1.7] max-w-[55ch]">
        Next session, your agent reads the new skill and{" "}
        <strong className="text-white/70 font-medium glow-text-white">
          starts using it immediately
        </strong>
        . No restart, no setup wizard — it works because{" "}
        <span className="text-[#FF4D4D] font-medium glow-text-coral">
          OpenClaw
        </span>{" "}
        was built this way.
      </p>
    ),
    detail: (
      <p className="text-[13px] text-white/25 leading-relaxed max-w-[50ch]">
        Stuck? Every skill comes with hands-on setup support. We&apos;ll help you get it running.
      </p>
    ),
    stat: { value: "0", label: "config needed" },
  },
];

/* ── Stat Pill ──────────────────────────────────────────── */

function StatPill({ value, label }: { value: string; label: string }) {
  return (
    <div className="mt-4 inline-flex items-center gap-2 bg-[#1E1510]/80 border border-white/[0.06] rounded-full px-3.5 py-1.5">
      <span className="font-mono text-[14px] font-bold text-[#F59E0B] glow-text-amber">
        {value}
      </span>
      <span className="font-mono text-[11px] text-white/25 uppercase tracking-wider">
        {label}
      </span>
    </div>
  );
}

/* ── FAQ Accordion ──────────────────────────────────────── */

const FAQS = [
  {
    q: "Do I need to be technical to install a skill?",
    a: "If you can copy a folder, you can install a skill. The entire process is: download, paste into skills/ directory, done. Your agent handles the rest.",
  },
  {
    q: "What if a skill doesn't work with my setup?",
    a: "Every skill lists its compatibility (e.g., \"OpenClaw v2.0+\"). If something doesn't work, we offer hands-on setup support — we'll help you troubleshoot.",
  },
  {
    q: "Can I modify the skills I buy?",
    a: "Yes — you get full source code. The SKILL.md, all scripts, and config templates are yours to read, learn from, and customize however you want.",
  },
  {
    q: "Are there recurring fees?",
    a: "No. Every skill is a one-time purchase. You own it forever. No subscriptions, no seat licenses, no API keys that expire.",
  },
];

function FAQItem({ q, a, index }: { q: string; a: string; index: number }) {
  const [open, setOpen] = useState(false);
  return (
    <div
      className="reveal-up border-b border-white/[0.04] last:border-0"
      style={{ transitionDelay: `${index * 80}ms` }}
    >
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between gap-4 py-5 text-left group"
        aria-expanded={open}
      >
        <span className="font-mono text-[15px] text-white/70 font-medium group-hover:text-white/90 transition-colors">
          {q}
        </span>
        <span
          className="text-[#FF4D4D] text-xl flex-shrink-0 transition-transform duration-300"
          style={{ transform: open ? "rotate(45deg)" : "rotate(0deg)" }}
        >
          +
        </span>
      </button>
      <div
        className="grid transition-[grid-template-rows] duration-300 ease-out"
        style={{ gridTemplateRows: open ? "1fr" : "0fr" }}
      >
        <div className="overflow-hidden">
          <p className="text-[14px] text-white/40 leading-[1.7] pb-5 max-w-[55ch]">
            {a}
          </p>
        </div>
      </div>
    </div>
  );
}

/* ── Main Component ─────────────────────────────────────── */

export function HowItWorksContent() {
  const contentRef = useReveal();

  return (
    <div className="min-h-screen flex flex-col">
      <SiteNavbar />

      <main className="flex-1 px-4 sm:px-6 pt-28 pb-20" ref={contentRef}>
        <div className="max-w-[900px] mx-auto">

          {/* ── Hero ──────────────────────────────────── */}
          <div className="text-center mb-20 reveal-up">
            {/* Overline label: mono, uppercase, 11px per typography skill */}
            <span className="font-mono text-[11px] font-medium text-[#FF4D4D]/60 uppercase tracking-[0.2em] mb-4 inline-block">
              From purchase to running agent
            </span>

            {/* h1: 36-48px, mono, bold — gradient on the hook word */}
            <h1 className="font-mono text-[36px] sm:text-[48px] font-bold tracking-tight text-white leading-[1.08] mt-3">
              Five Steps.{" "}
              <span
                className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF6B6B] via-[#FF4D4D] to-[#F97316]"
                style={{
                  filter:
                    "drop-shadow(0 0 12px rgba(255,77,77,0.25)) drop-shadow(0 0 32px rgba(249,115,22,0.1))",
                }}
              >
                Under 60 Seconds.
              </span>
            </h1>

            {/* Subhead: 16-18px, sans, white/45 — benefit first */}
            <p className="mt-5 text-base sm:text-lg text-white/45 max-w-xl mx-auto leading-relaxed">
              Buy a skill, drop it in a folder, and your{" "}
              <span className="text-[#FF4D4D] font-medium">OpenClaw</span> agent
              picks it up on next run.{" "}
              <strong className="text-white/60 font-medium">
                No configuration. No build tools.
              </strong>
            </p>

            {/* Quick stat row — dopamine: tangible numbers up front */}
            <div className="mt-8 flex items-center justify-center gap-6 sm:gap-10">
              {[
                { val: "<60s", lab: "to install" },
                { val: "$5–9", lab: "per skill" },
                { val: "0", lab: "config" },
              ].map((s) => (
                <div key={s.lab} className="text-center">
                  <p className="font-mono text-lg sm:text-xl font-bold text-white glow-text-white">
                    {s.val}
                  </p>
                  <p className="text-[11px] text-white/25 font-mono mt-0.5 uppercase tracking-wider">
                    {s.lab}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* ── Steps ─────────────────────────────────── */}
          <div className="relative">
            {/* Gradient connector line */}
            <div
              className="absolute left-[27px] sm:left-[31px] top-0 bottom-0 w-px hidden sm:block"
              style={{
                background:
                  "linear-gradient(to bottom, transparent, #FF4D4D 10%, #F97316 50%, #FF4D4D 90%, transparent)",
                opacity: 0.2,
              }}
            />

            <div className="space-y-14 sm:space-y-20">
              {STEPS.map((step, i) => (
                <div
                  key={step.num}
                  className="reveal-up flex gap-6 sm:gap-8 items-start"
                  style={{ transitionDelay: `${i * 100}ms` }}
                >
                  {/* Step badge — gradient border ring */}
                  <div className="flex-shrink-0 relative">
                    <div
                      className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl flex items-center justify-center bg-[#1E1510]"
                    >
                      {step.icon}
                    </div>
                    {/* Gradient border via outer ring */}
                    <div
                      className="absolute inset-[-1.5px] rounded-2xl -z-10"
                      style={{
                        background:
                          "linear-gradient(135deg, #FF6B6B, #FF4D4D, #F97316)",
                        opacity: 0.45,
                      }}
                    />
                    {/* Number badge */}
                    <span
                      className="absolute -top-2 -right-2 w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-mono font-bold text-white"
                      style={{
                        background:
                          "linear-gradient(135deg, #FF6B6B, #F97316)",
                      }}
                    >
                      {step.num}
                    </span>
                  </div>

                  {/* Content */}
                  <div className="flex-1 pt-1">
                    {/* Step title: mono, 18-20px, semibold */}
                    <h3 className="font-mono text-[18px] sm:text-[20px] font-semibold text-white/90 tracking-tight leading-tight">
                      {step.title}
                    </h3>

                    {/* Body: 15px, white/45, bold outcomes */}
                    <div className="mt-2.5">
                      {step.body}
                    </div>

                    {/* Detail: 13px, white/25 — supporting info */}
                    {step.detail && <div className="mt-2">{step.detail}</div>}

                    {/* Code snippet: mono, amber glow, one-click copy */}
                    {step.code && <CopyBlock text={step.code} />}

                    {/* Stat pill — dopamine: rewarding concrete number */}
                    {step.stat && (
                      <StatPill value={step.stat.value} label={step.stat.label} />
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* ── FAQ Section ───────────────────────────── */}
          <section className="mt-28 reveal-up">
            <h2 className="font-mono text-[22px] sm:text-[26px] font-bold text-white text-center mb-10 tracking-tight">
              Common{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF6B6B] via-[#FF4D4D] to-[#F97316]">
                Questions
              </span>
            </h2>
            <div className="max-w-[700px] mx-auto bg-[#1E1510]/40 rounded-2xl border border-white/[0.04] p-6 sm:p-8">
              {FAQS.map((faq, i) => (
                <FAQItem key={i} q={faq.q} a={faq.a} index={i} />
              ))}
            </div>
          </section>

          {/* ── Bottom CTA ────────────────────────────── */}
          <div className="mt-24 text-center reveal-up">
            <div
              className="relative p-10 sm:p-14 rounded-2xl overflow-hidden"
              style={{
                background:
                  "linear-gradient(135deg, rgba(255,77,77,0.06) 0%, rgba(249,115,22,0.04) 50%, transparent 100%)",
              }}
            >
              {/* Gradient border */}
              <div
                className="absolute inset-0 rounded-2xl -z-10"
                style={{
                  background: "linear-gradient(135deg, #FF6B6B, #FF4D4D, #F97316)",
                  padding: "1px",
                  WebkitMask:
                    "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
                  WebkitMaskComposite: "xor",
                  maskComposite: "exclude",
                  opacity: 0.2,
                }}
              />

              <h2 className="font-mono text-[24px] sm:text-[28px] font-bold text-white leading-tight">
                Your agent is one skill away
                <br />
                from{" "}
                <span
                  className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF6B6B] via-[#FF4D4D] to-[#F97316]"
                  style={{
                    filter:
                      "drop-shadow(0 0 8px rgba(255,77,77,0.25)) drop-shadow(0 0 20px rgba(249,115,22,0.1))",
                  }}
                >
                  doing this for you
                </span>
                .
              </h2>
              <p className="mt-3 text-[15px] text-white/40 max-w-md mx-auto">
                Full source code. Hands-on setup support. One-time purchase.
              </p>
              <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
                <Button
                  as={Link}
                  href="/#skills"
                  size="lg"
                  className="btn-coral font-mono px-8 rounded-lg text-base glow-coral"
                >
                  Browse Skills <ArrowIcon />
                </Button>
                <Button
                  as={Link}
                  href="/"
                  size="lg"
                  variant="bordered"
                  className="font-mono text-white/60 border-[#2D221C] hover:border-white/20 rounded-lg"
                >
                  Back to Home
                </Button>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />

      <style>{`
        .reveal-up {
          opacity: 0;
          transform: translateY(24px);
          transition: opacity 0.55s cubic-bezier(0.16, 1, 0.3, 1),
                      transform 0.55s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .reveal-up.visible {
          opacity: 1;
          transform: translateY(0);
        }
      `}</style>
    </div>
  );
}
