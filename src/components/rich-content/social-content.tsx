"use client";

/**
 * Rich formatted content for the Social Content Engine product page.
 * PAS framework: reformatting for 4 platforms is tedious → each has different rules → one brief, four posts.
 */

export function SocialContentDescription() {
  return (
    <div className="space-y-4 text-[15px] text-white/45 leading-[1.7] max-w-[65ch]">
      <p>
        You write one post. Then you spend the next hour reformatting it —
        trimming for X&apos;s{" "}
        <strong className="text-[#F59E0B] font-mono font-medium glow-text-amber">
          280 characters
        </strong>
        , adding hashtags for Instagram, making it sound professional for
        LinkedIn, adapting the hook for Threads.{" "}
        <span className="text-white/30 italic">
          Four platforms, four formats, four headaches.
        </span>
      </p>
      <p>
        Social Content Engine takes{" "}
        <strong className="text-white/70 font-medium glow-text-white">
          one content brief
        </strong>{" "}
        and generates{" "}
        <strong className="text-[#F59E0B] font-mono font-medium glow-text-amber">
          4 platform-native posts
        </strong>{" "}
        — each one tuned for the platform&apos;s algorithm. X gets a punchy hook
        with engagement bait. LinkedIn gets thought-leader framing with a
        professional sign-off. Instagram gets visual recs and carousel
        suggestions.{" "}
        <strong className="text-white/70 font-medium glow-text-white">
          Threads gets the conversational remix.
        </strong>
      </p>
      <p>
        It even generates{" "}
        <strong className="text-[#FF4D4D] font-medium glow-text-coral">
          A/B variants
        </strong>{" "}
        so you can test which angle performs best. Drop in your brief, get back
        scheduling-ready posts.{" "}
        <strong className="text-white/70 font-medium">
          No editing, no reformatting.
        </strong>
      </p>
    </div>
  );
}

export function SocialContentTagline() {
  return (
    <p className="text-[14px] text-white/35 mt-2.5 leading-relaxed max-w-[40ch]">
      One brief →{" "}
      <span className="text-[#F59E0B] font-mono font-medium glow-text-amber">4 platforms</span>.
      Algorithm-tuned, scheduling-ready,{" "}
      <strong className="text-white/60 font-medium">zero editing</strong>.
    </p>
  );
}

export function SocialContentMobileTagline() {
  return (
    <p className="text-[12px] text-white/35 mt-1 leading-relaxed">
      One brief.{" "}
      <span className="text-[#F59E0B] font-mono glow-text-amber">4 platforms</span>.{" "}
      <span className="text-white/60 font-medium">Ready to schedule.</span>
    </p>
  );
}

const FEATURES = [
  <>
    <strong className="text-white/70 font-medium glow-text-white">
      One brief
    </strong>{" "}
    → four platform-optimized posts
  </>,
  <>
    <strong className="text-white/70 font-medium glow-text-white">
      Algorithm-aware
    </strong>{" "}
    formatting for X, LinkedIn, Instagram, Threads
  </>,
  <>
    <strong className="text-[#F59E0B] font-medium glow-text-amber">
      Trending hashtag
    </strong>{" "}
    suggestions pulled from live data
  </>,
  <>
    Visual and{" "}
    <strong className="text-white/70 font-medium">carousel content</strong>{" "}
    recommendations for Instagram
  </>,
  <>
    <strong className="text-[#FF4D4D] font-medium glow-text-coral">
      A/B variants
    </strong>{" "}
    — test hooks, angles, and CTAs
  </>,
  <>
    Scheduling-ready output{" "}
    <span className="text-white/25">(copy-paste to Buffer, Later, or Hootsuite)</span>
  </>,
];

export function getSocialFeature(index: number) {
  return FEATURES[index] ?? null;
}
export const SOCIAL_FEATURE_COUNT = FEATURES.length;

const INCLUDES = [
  <>
    <strong className="text-white/60 font-medium">SKILL.md</strong> — full
    skill definition with platform rules
  </>,
  <>
    Platform optimization agents{" "}
    <span className="text-white/25">(X, LinkedIn, IG, Threads)</span>
  </>,
  <>
    <strong className="text-white/60 font-medium">Hashtag research module</strong>{" "}
    — trending tags by niche
  </>,
  <>
    <strong className="text-white/60 font-medium">Content calendar template</strong>{" "}
    — plan a month in advance
  </>,
  <>
    <strong className="text-[#F59E0B] font-mono font-medium glow-text-amber">
      10
    </strong>{" "}
    brief-to-post examples{" "}
    <span className="text-white/25">(real outputs you can reference)</span>
  </>,
];

export function getSocialInclude(index: number) {
  return INCLUDES[index] ?? null;
}
export const SOCIAL_INCLUDE_COUNT = INCLUDES.length;
