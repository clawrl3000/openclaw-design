"use client";

/**
 * Rich formatted content for the Memory System product page.
 * PAS framework: your agent has amnesia → this gives it a brain.
 */

export function MemorySystemDescription() {
  return (
    <div className="space-y-4 text-[15px] text-white/45 leading-[1.7] max-w-[65ch]">
      <p>
        OpenClaw agents have{" "}
        <strong className="text-white/70 font-medium glow-text-white">
          amnesia by default
        </strong>
        . Sessions reset daily at 4 AM, gateway restarts wipe context, and your
        agent can&apos;t remember yesterday&apos;s conversations, decisions, or
        hard-won lessons.{" "}
        <span className="text-white/30 italic">
          Without this, it&apos;s just an expensive chatbot that forgets
          everything between sessions.
        </span>
      </p>
      <p>
        The Memory System is a{" "}
        <strong className="text-white/70 font-medium">
          file-based architecture
        </strong>{" "}
        — daily journals, long-term curated memory, a boot sequence that
        restores full context every session, and{" "}
        <strong className="text-[#F59E0B] font-medium glow-text-amber">
          heartbeat-driven maintenance
        </strong>{" "}
        that automatically promotes daily notes into permanent knowledge. Your
        agent wakes up, reads its files, and picks up exactly where it left off.
      </p>
      <p>
        The{" "}
        <strong className="text-[#FF4D4D] font-medium glow-text-coral">
          Decision Ledger
        </strong>{" "}
        is the killer feature — a structured log of every major choice with
        date, rationale, and outcome. When your agent encounters a similar
        question months later, it checks the ledger instead of re-debating from
        scratch.{" "}
        <strong className="text-white/70 font-medium glow-text-white">
          Saves tokens, prevents flip-flopping, creates institutional knowledge.
        </strong>
      </p>
    </div>
  );
}

export function MemorySystemTagline() {
  return (
    <p className="text-[14px] text-white/35 mt-2.5 leading-relaxed max-w-[40ch]">
      Your agent wakes up fresh every session. This gives it a{" "}
      <strong className="text-white/70 font-medium glow-text-white">brain</strong>{" "}
      — structured memory, a{" "}
      <span className="text-[#FF4D4D] font-medium glow-text-coral">decision ledger</span>,
      and a test to prove it works.
    </p>
  );
}

export function MemorySystemMobileTagline() {
  return (
    <p className="text-[12px] text-white/35 mt-1 leading-relaxed">
      Your agent has amnesia.{" "}
      <span className="text-white/60 font-medium">This gives it a brain.</span>
    </p>
  );
}

const FEATURES = [
  <>
    Survives{" "}
    <strong className="text-white/70 font-medium glow-text-white">
      session resets
    </strong>
    , gateway restarts, and daily 4 AM wipes
  </>,
  <>
    <strong className="text-[#FF4D4D] font-medium glow-text-coral">
      Decision Ledger
    </strong>{" "}
    — never relitigate a settled decision again
  </>,
  <>
    <strong className="text-[#F59E0B] font-medium glow-text-amber">
      Heartbeat-driven
    </strong>{" "}
    promotion from daily notes to long-term memory
  </>,
  <>
    The{" "}
    <strong className="text-white/70 font-medium glow-text-white">
      Pumpernickel Test
    </strong>{" "}
    — built-in verification that memory actually works
  </>,
  <>
    Session bloat prevention{" "}
    <span className="text-white/25">(trims &gt;2MB, keeps 7-day backups)</span>
  </>,
  <>
    <strong className="text-white/70 font-medium">Security-aware</strong> —
    private memory excluded from group chats
  </>,
  <>
    <strong className="text-white/70 font-medium">Self-maintaining</strong> —
    weekly prune cycle keeps memory lean
  </>,
  <>
    <strong className="text-[#F59E0B] font-medium glow-text-amber">
      Zero dependencies
    </strong>{" "}
    — no API keys, no external services, just files
  </>,
];

export function getMemoryFeature(index: number) {
  return FEATURES[index] ?? null;
}

export const MEMORY_FEATURE_COUNT = FEATURES.length;

/* ── Includes ──────────────────────────────────────────── */

const INCLUDES = [
  <>
    <strong className="text-white/60 font-medium">SKILL.md</strong>{" "}
    —{" "}
    <span className="text-[#F59E0B] font-mono glow-text-amber">10K+</span>{" "}
    word skill definition
  </>,
  <>
    <strong className="text-white/60 font-medium">AGENTS.md</strong>{" "}
    template — boot sequence{" "}
    <span className="text-white/25">(what to do when waking up)</span>
  </>,
  <>
    <strong className="text-white/60 font-medium">MEMORY.md</strong>{" "}
    template — long-term curated knowledge
  </>,
  <>
    <strong className="text-white/60 font-medium">HEARTBEAT.md</strong>{" "}
    template — periodic maintenance checklist
  </>,
  <>
    <strong className="text-white/60 font-medium">USER.md</strong>{" "}
    template — info about your human
  </>,
  <>
    <strong className="text-[#FF4D4D] font-medium glow-text-coral">
      Decision Ledger
    </strong>{" "}
    format — structured decision tracking
  </>,
  <>
    <strong className="text-white/60 font-medium">trim-sessions.sh</strong>{" "}
    — auto-trims bloated sessions &gt;2MB
  </>,
  <>
    <strong className="text-white/60 font-medium">memory-stats.sh</strong>{" "}
    — memory health overview CLI
  </>,
  <>
    Filled-out examples{" "}
    <span className="text-white/25">(daily-log, memory)</span>
  </>,
];

export function getMemoryInclude(index: number) {
  return INCLUDES[index] ?? null;
}

export const MEMORY_INCLUDE_COUNT = INCLUDES.length;
