"use client";

/**
 * Rich formatted content for the Meeting Notes Pro product page.
 * PAS framework: nobody takes notes → decisions get lost → paste transcript, get everything in 8 seconds.
 */

export function MeetingNotesDescription() {
  return (
    <div className="space-y-4 text-[15px] text-white/45 leading-[1.7] max-w-[65ch]">
      <p>
        Nobody wants to take meeting notes. So either nobody does — and
        decisions get relitigated next week — or someone volunteers and spends{" "}
        <strong className="text-[#F59E0B] font-mono font-medium glow-text-amber">
          20 minutes
        </strong>{" "}
        after every call reformatting a messy transcript into something usable.{" "}
        <span className="text-white/30 italic">
          Both options cost your team more than they realize.
        </span>
      </p>
      <p>
        Meeting Notes Pro takes a raw transcript — from Zoom, Google Meet,
        Teams, or Otter.ai — and produces{" "}
        <strong className="text-white/70 font-medium glow-text-white">
          clean, structured output in {" "}
          <span className="text-[#F59E0B] font-mono font-medium glow-text-amber">
            8 seconds
          </span>
        </strong>
        : a concise summary, key decisions highlighted, every action item
        extracted with an owner assigned, and a{" "}
        <strong className="text-white/70 font-medium">
          follow-up email draft
        </strong>{" "}
        ready to send.
      </p>
      <p>
        It builds a{" "}
        <strong className="text-[#FF4D4D] font-medium glow-text-coral">
          searchable meeting archive
        </strong>{" "}
        — so when someone asks &ldquo;didn&apos;t we decide this three months
        ago?&rdquo; you can find the exact meeting, the exact decision, and who
        was responsible.{" "}
        <strong className="text-white/70 font-medium glow-text-white">
          No more guessing. No more relitigating.
        </strong>
      </p>
    </div>
  );
}

export function MeetingNotesTagline() {
  return (
    <p className="text-[14px] text-white/35 mt-2.5 leading-relaxed max-w-[40ch]">
      Paste a transcript. Get a summary, action items, and a follow-up email in{" "}
      <span className="text-[#F59E0B] font-mono font-medium glow-text-amber">8 seconds</span>.
    </p>
  );
}

export function MeetingNotesMobileTagline() {
  return (
    <p className="text-[12px] text-white/35 mt-1 leading-relaxed">
      Transcript → summary + action items.{" "}
      <span className="text-[#F59E0B] font-mono glow-text-amber">8 seconds</span>.
    </p>
  );
}

const FEATURES = [
  <>
    Processes transcripts from{" "}
    <strong className="text-white/70 font-medium glow-text-white">
      Zoom, Meet, Teams, and Otter.ai
    </strong>
  </>,
  <>
    <strong className="text-white/70 font-medium glow-text-white">
      Clean summary
    </strong>{" "}
    with key decisions highlighted
  </>,
  <>
    Action items extracted with{" "}
    <strong className="text-[#F59E0B] font-medium glow-text-amber">
      assigned owners
    </strong>
  </>,
  <>
    <strong className="text-white/70 font-medium">Follow-up email drafts</strong>{" "}
    generated automatically
  </>,
  <>
    <strong className="text-[#FF4D4D] font-medium glow-text-coral">
      Searchable archive
    </strong>{" "}
    — find any decision from any meeting
  </>,
  <>
    <strong className="text-white/70 font-medium">Slack/Teams integration</strong>{" "}
    for instant sharing
  </>,
];

export function getMeetingFeature(index: number) {
  return FEATURES[index] ?? null;
}
export const MEETING_FEATURE_COUNT = FEATURES.length;

const INCLUDES = [
  <>
    <strong className="text-white/60 font-medium">SKILL.md</strong> — full
    skill definition with transcript parsing rules
  </>,
  <>
    <strong className="text-white/60 font-medium">Transcript parser</strong>{" "}
    <span className="text-white/25">(Zoom, Meet, Teams, Otter.ai)</span>
  </>,
  <>
    <strong className="text-white/60 font-medium">Action item extractor</strong>{" "}
    — auto-assigns owners from context
  </>,
  <>
    <strong className="text-white/60 font-medium">Follow-up email generator</strong>{" "}
    — customizable templates
  </>,
  <>
    <strong className="text-white/60 font-medium">Summary template library</strong>{" "}
    <span className="text-white/25">(standup, planning, retro, all-hands)</span>
  </>,
];

export function getMeetingInclude(index: number) {
  return INCLUDES[index] ?? null;
}
export const MEETING_INCLUDE_COUNT = INCLUDES.length;
