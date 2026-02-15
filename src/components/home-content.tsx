"use client";

import { Button, Chip, Select, SelectItem } from "@heroui/react";
import Link from "next/link";
import { useEffect, useRef } from "react";
import { SiteNavbar } from "@/components/navbar";
import { AsciiClaw } from "@/components/ascii-claw";
import { SkillCard } from "@/components/skill-card";
import { Footer } from "@/components/footer";
import { SKILLS, CATEGORIES, SORT_OPTIONS } from "@/data/skills";

/* ── Scroll Reveal Hook ─────────────────────────────────── */

function useRevealOnScroll() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add("visible");
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -40px 0px" }
    );
    el.querySelectorAll(".reveal-up").forEach((c) => observer.observe(c));
    return () => observer.disconnect();
  }, []);
  return ref;
}

/* ── Arrow Icon ─────────────────────────────────────────── */

function ArrowIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
    </svg>
  );
}

/* ── Main Component ─────────────────────────────────────── */

export function HomeContent() {
  const contentRef = useRevealOnScroll();

  return (
    <div className="min-h-screen flex flex-col" ref={contentRef}>
      <SiteNavbar />

      {/* ══════════════════════════════════════════════════════
          HERO — Outcome-first headline, specificity, stakes
          Click-driver: hook in first 5 words
          Typography: gradient on outcome, bold on stakes
          ══════════════════════════════════════════════════════ */}
      <section className="relative overflow-hidden px-4 sm:px-6 pt-28 pb-24 sm:pt-32 sm:pb-28">
        <AsciiClaw />

        {/* Nebula overlays — warm red/coral atmospheric glow */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#110B07] pointer-events-none" />
        <div
          className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[500px] rounded-full blur-[140px] pointer-events-none"
          style={{ background: "radial-gradient(ellipse, rgba(255, 77, 77, 0.1) 0%, rgba(249, 115, 22, 0.05) 50%, transparent 70%)" }}
        />
        <div
          className="absolute top-20 right-[10%] w-[400px] h-[300px] rounded-full blur-[120px] pointer-events-none"
          style={{ background: "radial-gradient(ellipse, rgba(249, 115, 22, 0.06) 0%, transparent 70%)" }}
        />

        <div className="relative max-w-4xl mx-auto text-center">
          {/* Overline — 11px mono uppercase per typography skill */}
          <span className="font-mono text-[11px] font-medium text-[#FF4D4D]/60 uppercase tracking-[0.2em] mb-5 inline-block">
            The OpenClaw Skills Marketplace
          </span>

          {/* Hero h1: outcome-first, gradient on the payoff line
              Click-driver: "Your Agent" → personal, "Works While You Sleep" → outcome
              Conversion-copy: specific, benefit-driven, no weasel words */}
          <h1 className="font-mono text-[44px] sm:text-[56px] md:text-[64px] font-bold tracking-tight text-white leading-[1.06]">
            Your Agent Learns
            <br />
            <span
              className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF6B6B] via-[#FF4D4D] to-[#F97316]"
              style={{ filter: "drop-shadow(0 0 16px rgba(255,77,77,0.2)) drop-shadow(0 0 40px rgba(249,115,22,0.08))" }}
            >
              New Abilities in 60s
            </span>
          </h1>

          {/* Body — bold the outcome, accent the method
              Typography: white/45 base, bold outcomes at white/70
              Click-driver: specificity ("$5–9", "60 seconds") */}
          <p className="mt-6 text-base sm:text-lg text-white/45 max-w-2xl mx-auto leading-relaxed">
            Drop-in skills that make your{" "}
            <strong className="text-[#FF4D4D] font-medium">OpenClaw</strong> agent{" "}
            <strong className="text-white/70 font-medium">
              trade markets, review code, draft emails
            </strong>
            , and run your smart home —{" "}
            <span className="text-white/30 italic">
              tested on real workloads, not demos.
            </span>
          </p>

          {/* CTAs — outcome-focused per conversion-copy
              Primary: "Browse Skills" + arrow (action + direction)
              Secondary: "How It Works" (education path) */}
          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button
              as={Link}
              href="#skills"
              size="lg"
              className="btn-coral font-mono px-8 rounded-lg text-base glow-coral"
            >
              Browse {SKILLS.length} Skills <ArrowIcon />
            </Button>
            <Button
              as={Link}
              href="/how-it-works"
              size="lg"
              variant="bordered"
              className="font-mono text-white/60 border-[#2D221C] hover:border-white/20 rounded-lg"
            >
              See How It Works
            </Button>
          </div>

          {/* Stats — glow effects, amber accent on numbers per typography skill
              Dopamine: concrete numbers build credibility instantly */}
          <div className="mt-16 flex items-center justify-center gap-8 sm:gap-12">
            <div className="text-center">
              <p className="font-mono text-2xl font-extrabold text-white glow-text-white">
                1,112
              </p>
              <p className="text-[11px] text-white/25 font-mono mt-1 uppercase tracking-wider">
                Installs
              </p>
            </div>
            <div className="w-px h-8 bg-white/10" />
            <div className="text-center">
              <p className="font-mono text-2xl font-extrabold text-[#F59E0B] glow-text-amber">
                4.7★
              </p>
              <p className="text-[11px] text-white/25 font-mono mt-1 uppercase tracking-wider">
                Avg Rating
              </p>
            </div>
            <div className="w-px h-8 bg-white/10" />
            <div className="text-center">
              <p className="font-mono text-2xl font-extrabold text-white glow-text-white">
                &lt;60s
              </p>
              <p className="text-[11px] text-white/25 font-mono mt-1 uppercase tracking-wider">
                To Install
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          SKILLS GRID — benefit-driven header, staggered reveal
          ══════════════════════════════════════════════════════ */}
      <section id="skills" className="px-4 sm:px-6 py-20 sm:py-24">
        <div className="max-w-[1280px] mx-auto">
          {/* Section header — gradient accent on key word per typography skill */}
          <div className="reveal-up flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-10">
            <div>
              <h2 className="font-mono text-[28px] sm:text-[32px] font-bold text-white tracking-tight">
                Skills That{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF6B6B] via-[#FF4D4D] to-[#F97316]">
                  Ship Today
                </span>
              </h2>
              <p className="text-[15px] text-white/35 mt-1.5 leading-relaxed">
                Each one{" "}
                <strong className="text-white/55 font-medium">
                  tested on real workloads
                </strong>{" "}
                before it hits the store.{" "}
                <span className="text-[#F59E0B] font-mono text-[13px]">
                  $5–9
                </span>{" "}
                <span className="text-white/25">one-time.</span>
              </p>
            </div>

            <Select
              size="sm"
              label="Sort by"
              className="max-w-[180px]"
              classNames={{
                trigger:
                  "bg-[#1E1510] border border-[#2D221C] data-[hover=true]:bg-[#2D221C] rounded-lg h-10",
                value: "text-white/60 text-sm font-mono",
                label: "text-white/30 text-xs font-mono",
                listboxWrapper: "bg-[#1E1510]",
                popoverContent: "bg-[#1E1510] border border-[#2D221C]",
              }}
              defaultSelectedKeys={["newest"]}
            >
              {SORT_OPTIONS.map((opt) => (
                <SelectItem key={opt.key} className="text-white/70 font-mono text-sm">
                  {opt.label}
                </SelectItem>
              ))}
            </Select>
          </div>

          {/* Category filter chips */}
          <div className="reveal-up flex flex-wrap gap-2 mb-8">
            {CATEGORIES.map((cat) => (
              <Chip
                key={cat}
                variant={cat === "All" ? "solid" : "bordered"}
                size="sm"
                className={
                  cat === "All"
                    ? "bg-[#FF4D4D]/12 text-[#FF4D4D] border border-[#FF4D4D]/25 font-mono text-xs cursor-pointer"
                    : "border-[#2D221C] text-white/40 font-mono text-xs cursor-pointer hover:border-white/20 hover:text-white/60 transition-colors"
                }
              >
                {cat}
              </Chip>
            ))}
          </div>

          {/* Grid — staggered reveal per dopamine skill */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {SKILLS.map((skill, i) => (
              <div
                key={skill.slug}
                className="reveal-up"
                style={{ transitionDelay: `${i * 80}ms` }}
              >
                <SkillCard {...skill} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          HOW IT WORKS — gradient borders, bold outcomes, glow
          Click-driver: outcome-first step titles
          Typography: gradient number + accent on benefit
          ══════════════════════════════════════════════════════ */}
      <section className="px-4 sm:px-6 py-20 sm:py-24">
        <div className="max-w-[1280px] mx-auto">
          <h2 className="reveal-up font-mono text-[28px] sm:text-[32px] font-bold text-white text-center mb-4 tracking-tight">
            How It{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF6B6B] via-[#FF4D4D] to-[#F97316]">
              Works
            </span>
          </h2>
          <p className="reveal-up text-center text-[15px] text-white/35 max-w-md mx-auto mb-14 leading-relaxed">
            Three steps.{" "}
            <strong className="text-white/60 font-medium">Under 60 seconds.</strong>{" "}
            No build tools, no configuration.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                step: "01",
                title: "See What You're Getting",
                description: (
                  <>
                    Every skill shows the{" "}
                    <strong className="text-white/70 font-medium">
                      full bundle contents
                    </strong>
                    , real ratings, and a feature breakdown.{" "}
                    <span className="text-white/25 italic">
                      No guessing.
                    </span>
                  </>
                ),
              },
              {
                step: "02",
                title: "One Click, You Own It",
                description: (
                  <>
                    <span className="text-[#F59E0B] font-mono font-medium glow-text-amber">
                      $5–9
                    </span>{" "}
                    one-time.{" "}
                    <strong className="text-white/70 font-medium">
                      SKILL.md + scripts + config
                    </strong>{" "}
                    land in your inbox in under{" "}
                    <span className="text-white/60 font-mono">10 seconds</span>.
                  </>
                ),
              },
              {
                step: "03",
                title: "Drop & Your Agent Runs It",
                description: (
                  <>
                    Paste into your{" "}
                    <span className="text-[#F97316] font-mono">skills/</span>{" "}
                    folder. Your agent{" "}
                    <strong className="text-white/70 font-medium glow-text-white">
                      picks it up on next run
                    </strong>
                    .{" "}
                    <span className="text-white/25 italic">
                      Zero configuration.
                    </span>
                  </>
                ),
              },
            ].map((item, i) => (
              <div
                key={item.step}
                className="reveal-up relative p-8 rounded-xl bg-[#1E1510] transition-all duration-300 group"
                style={{ transitionDelay: `${i * 100}ms` }}
              >
                {/* Gradient border */}
                <div
                  className="absolute inset-0 rounded-xl -z-10 opacity-20 group-hover:opacity-40 transition-opacity duration-300"
                  style={{
                    background: "linear-gradient(135deg, #FF6B6B, #FF4D4D, #F97316)",
                    padding: "1px",
                    WebkitMask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
                    WebkitMaskComposite: "xor",
                    maskComposite: "exclude",
                  }}
                />
                {/* Step number — gradient per typography skill */}
                <span className="font-mono text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#FF6B6B]/20 via-[#FF4D4D]/20 to-[#F97316]/20">
                  {item.step}
                </span>
                {/* Title — semibold, white/90 */}
                <h3 className="font-mono text-xl font-semibold text-white/90 mt-3 tracking-tight">
                  {item.title}
                </h3>
                {/* Description — rich JSX with bold outcomes */}
                <p className="text-[15px] text-white/40 mt-3 leading-[1.7]">
                  {item.description}
                </p>
              </div>
            ))}
          </div>

          {/* Link to full How It Works page */}
          <div className="reveal-up mt-8 text-center">
            <Link
              href="/how-it-works"
              className="inline-flex items-center gap-2 text-[13px] font-mono text-white/30 hover:text-white/60 transition-colors"
            >
              See the full 5-step breakdown <ArrowIcon />
            </Link>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          TRUST STRIP — social proof + risk reduction
          Conversion-copy: trust signals near decision point
          ══════════════════════════════════════════════════════ */}
      <section className="px-4 sm:px-6 py-12">
        <div className="reveal-up max-w-[900px] mx-auto flex flex-col sm:flex-row items-center justify-center gap-6 sm:gap-10 text-[13px] font-mono text-white/25">
          <span className="flex items-center gap-2">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
            </svg>
            Hands-on setup support
          </span>
          <span className="hidden sm:block w-px h-4 bg-white/10" />
          <span className="flex items-center gap-2">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 6.75L22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3l-4.5 16.5" />
            </svg>
            Full source code included
          </span>
          <span className="hidden sm:block w-px h-4 bg-white/10" />
          <span className="flex items-center gap-2">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
            Delivered in under 10 seconds
          </span>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          BOTTOM CTA — gradient border, outcome-driven headline
          Conversion-copy: final push, risk-reducing language
          ══════════════════════════════════════════════════════ */}
      <section className="px-4 sm:px-6 py-20 sm:py-24">
        <div className="max-w-3xl mx-auto text-center">
          <div
            className="reveal-up relative p-12 sm:p-16 rounded-2xl overflow-hidden"
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
                opacity: 0.15,
              }}
            />

            <h2 className="font-mono text-[28px] sm:text-[36px] font-bold text-white leading-tight tracking-tight">
              Your agent is one skill
              <br />
              away from{" "}
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
            <p className="mt-4 text-[15px] text-white/40 max-w-lg mx-auto leading-relaxed">
              Full source code.{" "}
              <strong className="text-white/60 font-medium">
                Hands-on setup support.
              </strong>{" "}
              One-time purchase. Stuck? We&apos;ll help you get it running.
            </p>
            <Button
              as={Link}
              href="#skills"
              size="lg"
              className="mt-8 btn-coral font-mono px-8 rounded-lg text-base glow-coral"
            >
              Find Your Skill <ArrowIcon />
            </Button>
          </div>
        </div>
      </section>

      <Footer />

      {/* Reveal animation styles */}
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
