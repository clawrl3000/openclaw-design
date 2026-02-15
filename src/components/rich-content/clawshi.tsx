"use client";

/**
 * Rich formatted content for the Clawshi product page.
 * PAS framework + curiosity gaps: sell the outcome, tease the method,
 * never reveal the playbook.
 */

export function ClawshiDescription() {
  return (
    <div className="space-y-4 text-[15px] text-white/45 leading-[1.7] max-w-[65ch]">
      <p>
        We studied{" "}
        <strong className="text-[#F59E0B] font-mono font-medium glow-text-amber">72 million</strong>{" "}
        Kalshi trades and found something most traders miss — a{" "}
        <strong className="text-white/70 font-medium glow-text-white">
          repeating pattern
        </strong>{" "}
        in how retail bettors price contracts. It shows up in sports,
        politics, crypto, entertainment.{" "}
        <span className="text-white/30 italic">Every single category.</span>
      </p>
      <p>
        The edge isn&apos;t theoretical. It&apos;s a{" "}
        <strong className="text-white/70 font-medium">
          documented statistical bias
        </strong>{" "}
        that creates mispriced contracts{" "}
        <span className="text-white/30">—</span> and most traders are on the wrong
        side of it. Clawshi scans for these moments{" "}
        <strong className="text-[#F59E0B] font-mono font-medium glow-text-amber">
          3x&nbsp;daily
        </strong>
        , validates each one against real-time news, and executes with
        risk controls you define.{" "}
        <strong className="text-white/70 font-medium glow-text-white">
          You set the rules. It trades them.
        </strong>
      </p>
      <p>
        Need to react to breaking news in seconds?{" "}
        <strong className="text-[#FF4D4D] font-medium glow-text-coral">
          &ldquo;Clawshi&rdquo;
        </strong>{" "}
        is the quick-bet system built for exactly that — say what happened, and the
        agent places the trade before the market catches up.
      </p>
    </div>
  );
}

export function ClawshiTagline() {
  return (
    <p className="text-[14px] text-white/35 mt-2.5 leading-relaxed max-w-[40ch]">
      <span className="text-[#F59E0B] font-mono font-medium glow-text-amber">72M trades</span>{" "}
      revealed a pattern most bettors don&apos;t know exists. This agent trades it for you.
    </p>
  );
}

export function ClawshiMobileTagline() {
  return (
    <p className="text-[12px] text-white/35 mt-1 leading-relaxed">
      <span className="text-[#F59E0B] font-mono glow-text-amber">72M trades</span>.
      One repeating pattern. This agent trades it for you.
    </p>
  );
}

const FEATURES = [
  <>
    Strategy built on{" "}
    <strong className="text-[#F59E0B] font-mono font-medium glow-text-amber">72M+</strong>{" "}
    real Kalshi trades — not backtests
  </>,
  <>
    <strong className="text-white/70 font-medium glow-text-white">Scans every category</strong>{" "}
    3x daily for mispriced contracts
  </>,
  <>
    <strong className="text-white/70 font-medium glow-text-white">Real-time news check</strong>{" "}
    before every trade — no stale data
  </>,
  <>
    <strong className="text-[#FF4D4D] font-medium glow-text-coral">&ldquo;Clawshi&rdquo;</strong>{" "}
    — breaking news hits, your agent trades in seconds
  </>,
  <>
    Dedicated{" "}
    <strong className="text-white/70 font-medium">sports scanner</strong>{" "}
    with live injury and line data
  </>,
  <>
    <strong className="text-white/70 font-medium glow-text-white">You control the risk</strong>{" "}
    — max bet, daily limit, minimum edge
  </>,
  <>
    <strong className="text-white/70 font-medium">Maker-only orders</strong>{" "}
    — built-in fee advantage on every trade
  </>,
  <>
    Full <strong className="text-white/70 font-medium glow-text-white">audit trail</strong>{" "}
    — every trade logged with P&amp;L
  </>,
  <>
    <span className="text-white/60 font-mono text-[13px]">RSA-authenticated</span>{" "}
    Kalshi API — secure by default
  </>,
  <>
    <strong className="text-white/70 font-medium glow-text-white">Your choice</strong>{" "}
    — fully autonomous or human-in-the-loop
  </>,
];

export function ClawshiFeatures() {
  return <>{FEATURES}</>;
}

export function getClawshiFeature(index: number) {
  return FEATURES[index] ?? null;
}

export const CLAWSHI_FEATURE_COUNT = FEATURES.length;

/* ── Includes (Inside the Bundle) ──────────────────────── */

const INCLUDES = [
  <>
    <strong className="text-white/60 font-medium">SKILL.md</strong>{" "}
    — full strategy definition with automated cron prompts
  </>,
  <>
    <strong className="text-white/60 font-medium">Opportunity scanner</strong>{" "}
    <span className="text-white/25">(all categories, 3x daily)</span>
  </>,
  <>
    <strong className="text-white/60 font-medium">Gameday scanner</strong>{" "}
    — sports-specific with live injury data
  </>,
  <>
    <strong className="text-white/60 font-medium">Position monitor</strong>{" "}
    with settlement tracking
  </>,
  <>
    <strong className="text-[#FF4D4D] font-medium glow-text-coral">Clawshi</strong>{" "}
    quick-bet system{" "}
    <span className="text-white/25">(voice/text triggered)</span>
  </>,
  <>
    <strong className="text-white/60 font-medium">Dashboard export</strong>{" "}
    for P&amp;L visualization
  </>,
  <>
    <strong className="text-[#F59E0B] font-mono font-medium glow-text-amber">7</strong>{" "}
    Python scripts{" "}
    <span className="text-white/25">(ready to deploy)</span>
  </>,
  <>
    <strong className="text-white/60 font-medium">Risk config templates</strong>{" "}
    — your limits, your rules
  </>,
  <>
    Full research documentation{" "}
    <span className="text-white/25">(the data behind the strategy)</span>
  </>,
];

export function getClawshiInclude(index: number) {
  return INCLUDES[index] ?? null;
}

export const CLAWSHI_INCLUDE_COUNT = INCLUDES.length;
