"use client";

/**
 * Rich formatted content for the Smart Home Orchestrator product page.
 * PAS framework: 4 ecosystems, 3 apps, 12 taps → one command controls everything.
 */

export function SmartHomeDescription() {
  return (
    <div className="space-y-4 text-[15px] text-white/45 leading-[1.7] max-w-[65ch]">
      <p>
        You bought smart devices from{" "}
        <strong className="text-[#F59E0B] font-mono font-medium glow-text-amber">
          4 different ecosystems
        </strong>
        . Now &ldquo;movie mode&rdquo; means opening 3 apps, tapping 12 buttons,
        and waiting for each device to catch up.{" "}
        <span className="text-white/30 italic">
          That&apos;s not a smart home. That&apos;s a chore with extra steps.
        </span>
      </p>
      <p>
        Smart Home Orchestrator connects everything through{" "}
        <strong className="text-white/70 font-medium glow-text-white">
          one natural language interface
        </strong>
        . Say &ldquo;movie mode&rdquo; and it dims lights, closes blinds, turns
        on the TV, adjusts the thermostat, and sets Do Not Disturb — all{" "}
        <strong className="text-white/70 font-medium glow-text-white">
          in a single command
        </strong>
        .
      </p>
      <p>
        It works with{" "}
        <strong className="text-white/70 font-medium">
          HomeKit, Google Home, SmartThings, and MQTT
        </strong>{" "}
        devices. You can build custom scenes, add time-based triggers (lights on
        at sunset, coffee at 6 AM), and even set up{" "}
        <strong className="text-[#FF4D4D] font-medium glow-text-coral">
          sensor-based automation
        </strong>{" "}
        — motion sensors, door contacts, temperature thresholds.{" "}
        <strong className="text-white/70 font-medium">
          One agent. Every device. Zero friction.
        </strong>
      </p>
    </div>
  );
}

export function SmartHomeTagline() {
  return (
    <p className="text-[14px] text-white/35 mt-2.5 leading-relaxed max-w-[40ch]">
      Say &ldquo;movie mode&rdquo; and{" "}
      <strong className="text-white/60 font-medium glow-text-white">every device responds</strong>.
      One command,{" "}
      <span className="text-[#F59E0B] font-mono font-medium glow-text-amber">4 ecosystems</span>,
      zero apps.
    </p>
  );
}

export function SmartHomeMobileTagline() {
  return (
    <p className="text-[12px] text-white/35 mt-1 leading-relaxed">
      One command.{" "}
      <span className="text-[#F59E0B] font-mono glow-text-amber">4 ecosystems</span>.{" "}
      <span className="text-white/60 font-medium">Every device responds.</span>
    </p>
  );
}

const FEATURES = [
  <>
    <strong className="text-white/70 font-medium glow-text-white">
      Natural language control
    </strong>{" "}
    — just say what you want
  </>,
  <>
    Multi-device{" "}
    <strong className="text-white/70 font-medium">scene automation</strong>{" "}
    — one command triggers everything
  </>,
  <>
    Supports{" "}
    <strong className="text-white/70 font-medium glow-text-white">
      HomeKit, Google Home, SmartThings
    </strong>
    , and MQTT
  </>,
  <>
    <strong className="text-[#F59E0B] font-medium glow-text-amber">
      Time-based triggers
    </strong>{" "}
    — lights at sunset, coffee at 6 AM
  </>,
  <>
    <strong className="text-[#FF4D4D] font-medium glow-text-coral">
      Sensor automation
    </strong>{" "}
    — motion, door contacts, temperature
  </>,
  <>
    <strong className="text-white/70 font-medium">Energy monitoring</strong> —
    see what&apos;s drawing power
  </>,
];

export function getSmartHomeFeature(index: number) {
  return FEATURES[index] ?? null;
}
export const SMART_HOME_FEATURE_COUNT = FEATURES.length;

const INCLUDES = [
  <>
    <strong className="text-white/60 font-medium">SKILL.md</strong> — full
    skill definition with scene syntax
  </>,
  <>
    <strong className="text-white/60 font-medium">Device discovery agents</strong>{" "}
    — auto-detect everything on your network
  </>,
  <>
    <strong className="text-white/60 font-medium">Scene builder module</strong>{" "}
    — create complex automations visually
  </>,
  <>
    <strong className="text-white/60 font-medium">MQTT bridge config</strong>{" "}
    — connect DIY devices instantly
  </>,
  <>
    <strong className="text-[#F59E0B] font-mono font-medium glow-text-amber">
      5
    </strong>{" "}
    pre-built scene templates{" "}
    <span className="text-white/25">(movie, morning, away, sleep, party)</span>
  </>,
];

export function getSmartHomeInclude(index: number) {
  return INCLUDES[index] ?? null;
}
export const SMART_HOME_INCLUDE_COUNT = INCLUDES.length;
