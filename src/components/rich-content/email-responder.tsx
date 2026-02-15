"use client";

/**
 * Rich formatted content for the Smart Email Responder product page.
 * PAS framework: you waste hours on emails → this agent learns your voice → replies sound like you.
 */

export function EmailResponderDescription() {
  return (
    <div className="space-y-4 text-[15px] text-white/45 leading-[1.7] max-w-[65ch]">
      <p>
        You spend{" "}
        <strong className="text-[#F59E0B] font-mono font-medium glow-text-amber">
          2+ hours a day
        </strong>{" "}
        writing emails that all follow the same patterns — the same greetings,
        the same sign-offs, the same way you explain your position.{" "}
        <span className="text-white/30 italic">
          That&apos;s 500+ hours a year on autopilot writing.
        </span>
      </p>
      <p>
        Smart Email Responder studies{" "}
        <strong className="text-[#F59E0B] font-mono font-medium glow-text-amber">
          50 of your past threads
        </strong>{" "}
        to learn the nuances of your voice — formality level, sentence rhythm,
        go-to phrases, even how you handle tricky situations. It doesn&apos;t
        generate generic AI slop.{" "}
        <strong className="text-white/70 font-medium glow-text-white">
          It generates drafts that sound like you on your best day.
        </strong>
      </p>
      <p>
        Every reply is context-aware — it reads the full thread, understands
        what&apos;s being asked, and matches the{" "}
        <strong className="text-white/70 font-medium">right tone</strong> for
        the conversation. Quick ack to a colleague? Two sentences. Detailed
        response to a client? Full breakdown with your personal touch.{" "}
        <strong className="text-white/70 font-medium glow-text-white">
          You review, you send. That&apos;s it.
        </strong>
      </p>
    </div>
  );
}

export function EmailResponderTagline() {
  return (
    <p className="text-[14px] text-white/35 mt-2.5 leading-relaxed max-w-[40ch]">
      Learns your voice from{" "}
      <span className="text-[#F59E0B] font-mono font-medium glow-text-amber">50 threads</span>.
      Drafts replies that{" "}
      <strong className="text-white/60 font-medium">sound like you wrote them</strong>.
    </p>
  );
}

export function EmailResponderMobileTagline() {
  return (
    <p className="text-[12px] text-white/35 mt-1 leading-relaxed">
      Learns your voice.{" "}
      <span className="text-white/60 font-medium">Drafts replies that sound like you.</span>
    </p>
  );
}

const FEATURES = [
  <>
    Learns your{" "}
    <strong className="text-white/70 font-medium glow-text-white">
      unique writing voice
    </strong>{" "}
    from{" "}
    <span className="text-[#F59E0B] font-mono glow-text-amber">50</span> past
    threads
  </>,
  <>
    <strong className="text-white/70 font-medium glow-text-white">
      Context-aware
    </strong>{" "}
    — reads the full thread before drafting
  </>,
  <>
    Adjustable{" "}
    <strong className="text-[#F97316] font-medium">formality slider</strong>{" "}
    — casual to corporate in one toggle
  </>,
  <>
    Supports{" "}
    <strong className="text-white/70 font-medium">Gmail, Outlook</strong>, and
    any IMAP provider
  </>,
  <>
    <strong className="text-white/70 font-medium glow-text-white">
      Draft review mode
    </strong>{" "}
    — nothing sends without your approval
  </>,
];

export function getEmailFeature(index: number) {
  return FEATURES[index] ?? null;
}
export const EMAIL_FEATURE_COUNT = FEATURES.length;

const INCLUDES = [
  <>
    <strong className="text-white/60 font-medium">SKILL.md</strong> — full
    skill definition with tone calibration prompts
  </>,
  <>
    <strong className="text-white/60 font-medium">Tone calibration agent</strong>{" "}
    — analyzes your writing patterns
  </>,
  <>
    <strong className="text-white/60 font-medium">Thread context analyzer</strong>{" "}
    — reads full conversation before replying
  </>,
  <>
    <strong className="text-[#F59E0B] font-mono font-medium glow-text-amber">
      3
    </strong>{" "}
    example configurations{" "}
    <span className="text-white/25">(casual, business, executive)</span>
  </>,
];

export function getEmailInclude(index: number) {
  return INCLUDES[index] ?? null;
}
export const EMAIL_INCLUDE_COUNT = INCLUDES.length;
