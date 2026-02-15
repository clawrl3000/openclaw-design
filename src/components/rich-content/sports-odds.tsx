"use client";

/**
 * Rich formatted content for the Sports Odds Analyzer product page.
 * PAS framework: lines move before you can check → you're always behind → this scans 15 books in real time.
 */

export function SportsOddsDescription() {
  return (
    <div className="space-y-4 text-[15px] text-white/45 leading-[1.7] max-w-[65ch]">
      <p>
        By the time you open a second sportsbook, the line has already moved.
        Sharp money hit it{" "}
        <strong className="text-[#F59E0B] font-mono font-medium glow-text-amber">
          12 minutes ago
        </strong>
        , and you&apos;re placing a bet at a price that no longer has edge.{" "}
        <span className="text-white/30 italic">
          This is why most casual bettors lose — they&apos;re always one step
          behind.
        </span>
      </p>
      <p>
        Sports Odds Analyzer scrapes{" "}
        <strong className="text-[#F59E0B] font-mono font-medium glow-text-amber">
          15 sportsbooks
        </strong>{" "}
        simultaneously — DraftKings, FanDuel, BetMGM, and 12 more. It runs{" "}
        <strong className="text-white/70 font-medium glow-text-white">
          expected value calculations on every line
        </strong>
        , tracks movement in real time, and alerts you the moment an edge
        appears. Not hours later.{" "}
        <strong className="text-white/70 font-medium glow-text-white">
          Seconds later.
        </strong>
      </p>
      <p>
        It even detects{" "}
        <strong className="text-[#FF4D4D] font-medium glow-text-coral">
          arbitrage opportunities
        </strong>{" "}
        — situations where you can bet both sides across books and lock in profit
        regardless of outcome. These windows last minutes, sometimes seconds.{" "}
        <strong className="text-white/70 font-medium">
          You need automation to catch them.
        </strong>
      </p>
    </div>
  );
}

export function SportsOddsTagline() {
  return (
    <p className="text-[14px] text-white/35 mt-2.5 leading-relaxed max-w-[40ch]">
      Compares odds across{" "}
      <span className="text-[#F59E0B] font-mono font-medium glow-text-amber">15 books</span>{" "}
      in real time. Alerts hit{" "}
      <strong className="text-white/60 font-medium">seconds after edge appears</strong>.
    </p>
  );
}

export function SportsOddsMobileTagline() {
  return (
    <p className="text-[12px] text-white/35 mt-1 leading-relaxed">
      <span className="text-[#F59E0B] font-mono glow-text-amber">15 books</span>.
      Real-time.{" "}
      <span className="text-white/60 font-medium">Alerts in seconds.</span>
    </p>
  );
}

const FEATURES = [
  <>
    Real-time odds from{" "}
    <strong className="text-[#F59E0B] font-mono font-medium glow-text-amber">
      15+
    </strong>{" "}
    sportsbooks — all in one view
  </>,
  <>
    <strong className="text-white/70 font-medium glow-text-white">
      Expected value (EV) calculations
    </strong>{" "}
    on every line, every market
  </>,
  <>
    <strong className="text-white/70 font-medium glow-text-white">
      Line movement tracking
    </strong>{" "}
    — see where sharp money is going
  </>,
  <>
    <strong className="text-[#FF4D4D] font-medium glow-text-coral">
      Arbitrage detection
    </strong>{" "}
    — lock in profit across books
  </>,
  <>
    Customizable{" "}
    <strong className="text-white/70 font-medium">alert thresholds</strong> —
    your edge criteria, your rules
  </>,
  <>
    Historical data export{" "}
    <span className="text-white/25">(CSV/JSON)</span> for backtesting
  </>,
];

export function getSportsFeature(index: number) {
  return FEATURES[index] ?? null;
}
export const SPORTS_FEATURE_COUNT = FEATURES.length;

const INCLUDES = [
  <>
    <strong className="text-white/60 font-medium">SKILL.md</strong> — full
    skill definition with scanning schedules
  </>,
  <>
    <strong className="text-white/60 font-medium">Odds scraping agents</strong>{" "}
    <span className="text-white/25">(15 sportsbooks configured)</span>
  </>,
  <>
    <strong className="text-white/60 font-medium">EV calculator module</strong>{" "}
    — plug in any market, get expected value
  </>,
  <>
    <strong className="text-white/60 font-medium">Alert config templates</strong>{" "}
    — SMS, email, or webhook
  </>,
  <>
    <strong className="text-white/60 font-medium">Historical odds DB schema</strong>{" "}
    — track everything for analysis
  </>,
];

export function getSportsInclude(index: number) {
  return INCLUDES[index] ?? null;
}
export const SPORTS_INCLUDE_COUNT = INCLUDES.length;
