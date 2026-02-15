"use client";

/**
 * Rich formatted content for the GitHub PR Reviewer product page.
 * PAS framework: PRs wait hours for review → bugs ship → this reviews in 90 seconds.
 */

export function PRReviewerDescription() {
  return (
    <div className="space-y-4 text-[15px] text-white/45 leading-[1.7] max-w-[65ch]">
      <p>
        Your team&apos;s PRs sit in the queue for hours — sometimes days. By the
        time someone reviews, the author has context-switched to something else,
        merge conflicts have piled up, and the feedback loop that should take
        minutes takes{" "}
        <strong className="text-[#F59E0B] font-mono font-medium glow-text-amber">
          3+ days
        </strong>
        .{" "}
        <span className="text-white/30 italic">
          That&apos;s not a code review process. That&apos;s a bottleneck.
        </span>
      </p>
      <p>
        GitHub PR Reviewer drops an{" "}
        <strong className="text-white/70 font-medium glow-text-white">
          automated, thorough review
        </strong>{" "}
        on every pull request in under{" "}
        <strong className="text-[#F59E0B] font-mono font-medium glow-text-amber">
          90 seconds
        </strong>
        . It checks for bugs, surfaces{" "}
        <strong className="text-[#FF4D4D] font-medium glow-text-coral">
          security vulnerabilities
        </strong>{" "}
        (OWASP Top 10), flags style drift, and catches performance anti-patterns
        — with inline comments on the exact lines that need attention.
      </p>
      <p>
        It doesn&apos;t replace your senior devs. It{" "}
        <strong className="text-white/70 font-medium glow-text-white">
          gives them a head start
        </strong>
        . By the time a human reviewer opens the PR, the obvious issues are
        already flagged, documented, and linked to fix suggestions.{" "}
        <strong className="text-white/70 font-medium">
          Reviews go from hours to minutes.
        </strong>
      </p>
    </div>
  );
}

export function PRReviewerTagline() {
  return (
    <p className="text-[14px] text-white/35 mt-2.5 leading-relaxed max-w-[40ch]">
      Every PR reviewed in{" "}
      <span className="text-[#F59E0B] font-mono font-medium glow-text-amber">&lt;90s</span>.
      Catches bugs,{" "}
      <span className="text-[#FF4D4D] font-medium glow-text-coral">security holes</span>,
      and style drift.
    </p>
  );
}

export function PRReviewerMobileTagline() {
  return (
    <p className="text-[12px] text-white/35 mt-1 leading-relaxed">
      <span className="text-[#F59E0B] font-mono glow-text-amber">&lt;90s</span> reviews.{" "}
      <span className="text-white/60 font-medium">Bugs, security, style — all caught.</span>
    </p>
  );
}

const FEATURES = [
  <>
    <strong className="text-white/70 font-medium glow-text-white">
      Instant review
    </strong>{" "}
    on PR open — no waiting for humans
  </>,
  <>
    Bug detection with{" "}
    <strong className="text-white/70 font-medium">
      explanation and fix suggestion
    </strong>
  </>,
  <>
    <strong className="text-[#FF4D4D] font-medium glow-text-coral">
      Security scanning
    </strong>{" "}
    — OWASP Top 10 coverage out of the box
  </>,
  <>
    <strong className="text-white/70 font-medium glow-text-white">
      Style enforcement
    </strong>{" "}
    — catches convention drift before it spreads
  </>,
  <>
    Performance{" "}
    <strong className="text-white/70 font-medium">anti-pattern detection</strong>{" "}
    — N+1 queries, memory leaks, bundle bloat
  </>,
  <>
    <strong className="text-white/70 font-medium">Inline comments</strong> on
    exact code lines — not vague summaries
  </>,
];

export function getPRFeature(index: number) {
  return FEATURES[index] ?? null;
}
export const PR_FEATURE_COUNT = FEATURES.length;

const INCLUDES = [
  <>
    <strong className="text-white/60 font-medium">SKILL.md</strong> — full
    skill definition with review rulesets
  </>,
  <>
    Language-specific agents{" "}
    <span className="text-white/25">(JS, TS, Python, Go, Rust)</span>
  </>,
  <>
    <strong className="text-[#FF4D4D] font-medium glow-text-coral">
      Security scanning rules
    </strong>{" "}
    — OWASP Top 10 + dependency audit
  </>,
  <>
    <strong className="text-white/60 font-medium">Custom rule config</strong>{" "}
    — enforce your team&apos;s standards
  </>,
  <>
    <strong className="text-white/60 font-medium">GitHub App integration guide</strong>{" "}
    — 5-minute setup
  </>,
];

export function getPRInclude(index: number) {
  return INCLUDES[index] ?? null;
}
export const PR_INCLUDE_COUNT = INCLUDES.length;
