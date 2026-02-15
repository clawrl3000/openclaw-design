"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef } from "react";
import { SiteNavbar } from "@/components/navbar";
import { Footer } from "@/components/footer";

function ExternalLinkIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
    </svg>
  );
}

function ClockIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="url(#clockGrad)" strokeWidth={1.5}>
      <defs>
        <linearGradient id="clockGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#F59E0B" />
          <stop offset="100%" stopColor="#F97316" />
        </linearGradient>
      </defs>
      <circle cx="12" cy="12" r="10" />
      <polyline points="12,6 12,12 16,14" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function ZapIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="url(#zapGrad)" strokeWidth={1.5}>
      <defs>
        <linearGradient id="zapGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#00E5CC" />
          <stop offset="100%" stopColor="#F97316" />
        </linearGradient>
      </defs>
      <polygon points="13,2 3,14 12,14 11,22 21,10 12,10 13,2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function AgentIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="url(#agentGrad)" strokeWidth={1.5}>
      <defs>
        <linearGradient id="agentGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FF6B6B" />
          <stop offset="100%" stopColor="#00E5CC" />
        </linearGradient>
      </defs>
      <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z" />
    </svg>
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
      { threshold: 0.15, rootMargin: "0px 0px -60px 0px" }
    );
    el.querySelectorAll(".reveal").forEach((c) => observer.observe(c));
    return () => observer.disconnect();
  }, []);
  return ref;
}

/* ── Editorial Components ──────────────────────────────── */

function PullQuote({ children }: { children: React.ReactNode }) {
  return (
    <blockquote className="reveal my-12 pl-6 border-l-2 border-[#FF4D4D]/30 relative">
      <div className="absolute left-0 top-0 w-0.5 h-full bg-gradient-to-b from-[#FF4D4D]/50 to-[#F97316]/30" />
      <div className="text-lg leading-relaxed text-white/80 font-light italic">
        {children}
      </div>
    </blockquote>
  );
}

function CodeBlock({ children, language = "yaml" }: { children: string; language?: string }) {
  return (
    <div className="reveal my-8 bg-[#110B07]/80 rounded-lg border border-white/[0.04] overflow-hidden">
      <div className="flex items-center justify-between px-4 py-2 bg-[#1E1510]/30 border-b border-white/[0.04]">
        <span className="text-xs text-white/40 font-mono uppercase tracking-wider">{language}</span>
      </div>
      <pre className="p-4 overflow-x-auto">
        <code className="text-sm font-mono text-[#F59E0B] leading-relaxed whitespace-pre">
          {children}
        </code>
      </pre>
    </div>
  );
}

function EditorialAside({ children, title }: { children: React.ReactNode; title?: string }) {
  return (
    <aside className="reveal my-10 bg-[#1E1510]/20 rounded-lg p-6 border-l-4 border-[#F59E0B]/40">
      {title && (
        <h4 className="text-base font-medium text-white/90 mb-3">{title}</h4>
      )}
      <div className="text-sm text-white/60 leading-relaxed space-y-3">
        {children}
      </div>
    </aside>
  );
}

/* ── Architecture Diagram ──────────────────────────────── */

function ArchitectureDiagram() {
  return (
    <div className="reveal my-16 bg-[#1E1510]/30 rounded-xl p-8 border border-white/[0.04] relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-br from-[#FF4D4D]/[0.015] via-transparent to-[#00E5CC]/[0.015]" />
        <div className="noise-overlay opacity-[0.008]" />
      </div>
      
      <div className="relative">
        <h3 className="text-center text-lg font-medium text-white/90 mb-8">
          The Event Loop Architecture
        </h3>
        
        <div className="flex flex-col lg:flex-row items-center justify-center gap-6 lg:gap-8">
          {/* Time */}
          <div className="flex flex-col items-center text-center min-w-[100px]">
            <div className="w-12 h-12 rounded-xl bg-[#1E1510] border border-white/[0.08] flex items-center justify-center mb-3 relative">
              <ClockIcon />
              <div className="absolute inset-[-1px] rounded-xl bg-gradient-to-br from-[#F59E0B] to-[#F97316] opacity-15 -z-10" />
            </div>
            <h4 className="text-sm font-medium text-white/80">Time</h4>
            <p className="text-xs text-white/40 mt-1">Timers, Cron</p>
          </div>

          <div className="text-[#FF4D4D]/40 text-xl rotate-90 lg:rotate-0">→</div>

          {/* Events */}
          <div className="flex flex-col items-center text-center min-w-[100px]">
            <div className="w-12 h-12 rounded-xl bg-[#1E1510] border border-white/[0.08] flex items-center justify-center mb-3 relative">
              <ZapIcon />
              <div className="absolute inset-[-1px] rounded-xl bg-gradient-to-br from-[#00E5CC] to-[#F97316] opacity-15 -z-10" />
            </div>
            <h4 className="text-sm font-medium text-white/80">Events</h4>
            <p className="text-xs text-white/40 mt-1">Messages, Hooks</p>
          </div>

          <div className="text-[#FF4D4D]/40 text-xl rotate-90 lg:rotate-0">→</div>

          {/* Queue */}
          <div className="flex flex-col items-center text-center min-w-[100px]">
            <div className="w-12 h-12 rounded-xl bg-[#1E1510] border border-white/[0.08] flex items-center justify-center mb-3 relative">
              <div className="w-5 h-5 border-2 border-[#F59E0B] rounded opacity-50" />
              <div className="absolute inset-[-1px] rounded-xl bg-gradient-to-br from-[#F59E0B] to-[#FF4D4D] opacity-15 -z-10" />
            </div>
            <h4 className="text-sm font-medium text-white/80">Queue</h4>
            <p className="text-xs text-white/40 mt-1">Ordered Processing</p>
          </div>

          <div className="text-[#FF4D4D]/40 text-xl rotate-90 lg:rotate-0">→</div>

          {/* Agent */}
          <div className="flex flex-col items-center text-center min-w-[100px]">
            <div className="w-12 h-12 rounded-xl bg-[#1E1510] border border-white/[0.08] flex items-center justify-center mb-3 relative">
              <AgentIcon />
              <div className="absolute inset-[-1px] rounded-xl bg-gradient-to-br from-[#FF6B6B] to-[#00E5CC] opacity-15 -z-10" />
            </div>
            <h4 className="text-sm font-medium text-white/80">Agent</h4>
            <p className="text-xs text-white/40 mt-1">Executes</p>
          </div>

          <div className="text-[#FF4D4D]/40 text-xl rotate-90 lg:rotate-0">→</div>

          {/* State */}
          <div className="flex flex-col items-center text-center min-w-[100px]">
            <div className="w-12 h-12 rounded-xl bg-[#1E1510] border border-white/[0.08] flex items-center justify-center mb-3 relative">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="url(#stateGrad)" strokeWidth={1.5}>
                <defs>
                  <linearGradient id="stateGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#00E5CC" />
                    <stop offset="100%" stopColor="#F59E0B" />
                  </linearGradient>
                </defs>
                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0-1.125-.504-1.125-1.125V11.25a9 9 0 00-9-9z" />
              </svg>
              <div className="absolute inset-[-1px] rounded-xl bg-gradient-to-br from-[#00E5CC] to-[#F59E0B] opacity-15 -z-10" />
            </div>
            <h4 className="text-sm font-medium text-white/80">State</h4>
            <p className="text-xs text-white/40 mt-1">Memory</p>
          </div>
        </div>

        {/* Loop back */}
        <div className="mt-6 flex justify-center">
          <div className="flex items-center gap-3 text-xs text-white/30">
            <div className="w-16 h-px bg-gradient-to-r from-transparent via-[#FF4D4D]/25 to-transparent" />
            <span>Loop continues</span>
            <div className="w-16 h-px bg-gradient-to-r from-transparent via-[#FF4D4D]/25 to-transparent" />
          </div>
        </div>
      </div>
    </div>
  );
}

function GatewayRoutingDiagram() {
  return (
    <div className="reveal my-16 bg-[#1E1510]/30 rounded-xl p-8 border border-white/[0.04] relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-br from-[#FF4D4D]/[0.015] via-transparent to-[#00E5CC]/[0.015]" />
        <div className="noise-overlay opacity-[0.008]" />
      </div>
      
      <div className="relative">
        <h3 className="text-center text-lg font-medium text-white/90 mb-8">
          Message Routing
        </h3>
        
        <div className="flex flex-col lg:flex-row items-center justify-center gap-6 lg:gap-8">
          {/* Channels */}
          <div className="flex flex-col items-center text-center min-w-[120px]">
            <div className="flex flex-col gap-2 mb-3">
              {[
                { name: "WhatsApp", color: "from-[#25D366] to-[#128C7E]" },
                { name: "Telegram", color: "from-[#0088CC] to-[#229ED9]" },
                { name: "Slack", color: "from-[#4A154B] to-[#611F69]" },
                { name: "iMessage", color: "from-[#007AFF] to-[#5856D6]" },
                { name: "Discord", color: "from-[#5865F2] to-[#7289DA]" }
              ].map((channel, i) => (
                <div key={i} className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded bg-[#1E1510] border border-white/[0.08] flex items-center justify-center relative">
                    <div className={`absolute inset-[-1px] rounded bg-gradient-to-br ${channel.color} opacity-20 -z-10`} />
                    <div className="w-2 h-2 rounded-full bg-white/30" />
                  </div>
                  <span className="text-xs text-white/60 font-mono">{channel.name}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="text-[#FF4D4D]/40 text-2xl rotate-90 lg:rotate-0">→</div>

          {/* Gateway */}
          <div className="flex flex-col items-center text-center min-w-[100px]">
            <div className="w-16 h-16 rounded-2xl bg-[#1E1510] border border-white/[0.1] flex items-center justify-center mb-3 relative">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="url(#gatewayGrad)" strokeWidth={1.5}>
                <defs>
                  <linearGradient id="gatewayGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#F59E0B" />
                    <stop offset="100%" stopColor="#00E5CC" />
                  </linearGradient>
                </defs>
                <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
                <circle cx="9" cy="9" r="2" />
                <path d="M21 15.5c-5 0-9-4-9-9" />
                <path d="M21 21.5c-9 0-16-7-16-16" />
              </svg>
              <div className="absolute inset-[-1px] rounded-2xl bg-gradient-to-br from-[#F59E0B] to-[#00E5CC] opacity-15 -z-10" />
            </div>
            <h4 className="font-mono text-sm font-semibold text-white/90">Gateway</h4>
            <p className="text-xs text-white/40 mt-1">Routes & Queues</p>
          </div>

          <div className="text-[#FF4D4D]/40 text-2xl rotate-90 lg:rotate-0">→</div>

          {/* Agent */}
          <div className="flex flex-col items-center text-center min-w-[100px]">
            <div className="w-16 h-16 rounded-2xl bg-[#1E1510] border border-white/[0.1] flex items-center justify-center mb-3 relative">
              <AgentIcon />
              <div className="absolute inset-[-1px] rounded-2xl bg-gradient-to-br from-[#FF6B6B] to-[#00E5CC] opacity-15 -z-10" />
            </div>
            <h4 className="font-mono text-sm font-semibold text-white/90">Agent</h4>
            <p className="text-xs text-white/40 mt-1">Processes</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function CallSequenceDiagram() {
  return (
    <div className="reveal my-16 bg-[#1E1510]/30 rounded-xl p-8 border border-white/[0.04] relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-br from-[#FF4D4D]/[0.015] via-transparent to-[#00E5CC]/[0.015]" />
        <div className="noise-overlay opacity-[0.008]" />
      </div>
      
      <div className="relative">
        <h3 className="text-center text-lg font-medium text-white/90 mb-8">
          What Actually Happened at 3 AM
        </h3>
        
        <div className="flex flex-col lg:flex-row items-center justify-center gap-4 lg:gap-6">
          {[
            {
              icon: "⏰",
              title: "Timer Fires",
              subtitle: "3 AM cron job triggers",
              color: "from-[#F59E0B] to-[#F97316]"
            },
            {
              icon: "📥",
              title: "Enters Queue",
              subtitle: "Event joins processing queue",
              color: "from-[#00E5CC] to-[#0891B2]"
            },
            {
              icon: "🤖",
              title: "Agent Processes",
              subtitle: "Reads cron prompt",
              color: "from-[#8B5CF6] to-[#A855F7]"
            },
            {
              icon: "✅",
              title: "Checks Conditions",
              subtitle: "Temperature < 32°F detected",
              color: "from-[#10B981] to-[#059669]"
            },
            {
              icon: "📞",
              title: "Makes Call",
              subtitle: "Acquires Twilio, dials number",
              color: "from-[#FF4D4D] to-[#DC2626]",
              highlight: true
            }
          ].map((step, i) => (
            <div key={i} className="flex flex-col items-center text-center min-w-[100px]">
              <div className={`w-16 h-16 rounded-2xl bg-[#1E1510] border border-white/[0.1] flex items-center justify-center mb-3 relative ${step.highlight ? 'ring-2 ring-[#FF4D4D]/40' : ''}`}>
                <span className="text-2xl">{step.icon}</span>
                <div className={`absolute inset-[-1px] rounded-2xl bg-gradient-to-br ${step.color} opacity-15 -z-10 ${step.highlight ? 'opacity-25' : ''}`} />
              </div>
              <h4 className="font-mono text-sm font-semibold text-white/90">{step.title}</h4>
              <p className="text-xs text-white/40 mt-1">{step.subtitle}</p>
              {i < 4 && (
                <div className="text-[#FF4D4D]/40 text-xl rotate-90 lg:rotate-0 absolute lg:relative lg:top-0 top-6 left-20 lg:left-0">→</div>
              )}
            </div>
          ))}
        </div>
        
        <div className="mt-8 text-center">
          <div className="inline-flex items-center gap-3 px-4 py-2 bg-[#FF4D4D]/10 border border-[#FF4D4D]/20 rounded-lg">
            <span className="text-[#FF4D4D] font-medium text-sm">The dramatic moment that feels like AI consciousness</span>
          </div>
        </div>
      </div>
    </div>
  );
}

function MemoryCycleDiagram() {
  return (
    <div className="reveal my-16 bg-[#1E1510]/30 rounded-xl p-8 border border-white/[0.04] relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-br from-[#FF4D4D]/[0.015] via-transparent to-[#00E5CC]/[0.015]" />
        <div className="noise-overlay opacity-[0.008]" />
      </div>
      
      <div className="relative">
        <h3 className="text-center text-lg font-medium text-white/90 mb-8">
          The Memory Cycle
        </h3>
        
        <div className="flex flex-col lg:flex-row items-center justify-center gap-6 lg:gap-8">
          {/* Event Arrives */}
          <div className="flex flex-col items-center text-center min-w-[100px]">
            <div className="w-16 h-16 rounded-2xl bg-[#1E1510] border border-white/[0.1] flex items-center justify-center mb-3 relative">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="url(#memoryZapGrad)" strokeWidth={1.5}>
                <defs>
                  <linearGradient id="memoryZapGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#F59E0B" />
                    <stop offset="100%" stopColor="#F97316" />
                  </linearGradient>
                </defs>
                <polygon points="13,2 3,14 12,14 11,22 21,10 12,10 13,2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <div className="absolute inset-[-1px] rounded-2xl bg-gradient-to-br from-[#F59E0B] to-[#F97316] opacity-15 -z-10" />
            </div>
            <h4 className="font-mono text-sm font-semibold text-white/90">Event Arrives</h4>
            <p className="text-xs text-white/40 mt-1">Message/Timer/Hook</p>
          </div>

          <div className="text-[#FF4D4D]/40 text-2xl rotate-90 lg:rotate-0">→</div>

          {/* Agent Reads */}
          <div className="flex flex-col items-center text-center min-w-[100px]">
            <div className="w-16 h-16 rounded-2xl bg-[#1E1510] border border-white/[0.1] flex items-center justify-center mb-3 relative">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="url(#memoryFileGrad)" strokeWidth={1.5}>
                <defs>
                  <linearGradient id="memoryFileGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#00E5CC" />
                    <stop offset="100%" stopColor="#0891B2" />
                  </linearGradient>
                </defs>
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                <polyline points="14,2 14,8 20,8" />
                <line x1="16" y1="13" x2="8" y2="13" />
                <line x1="16" y1="17" x2="8" y2="17" />
                <polyline points="10,9 9,9 8,9" />
              </svg>
              <div className="absolute inset-[-1px] rounded-2xl bg-gradient-to-br from-[#00E5CC] to-[#0891B2] opacity-15 -z-10" />
            </div>
            <h4 className="font-mono text-sm font-semibold text-white/90">Reads .md Files</h4>
            <p className="text-xs text-white/40 mt-1">Memory & Context</p>
          </div>

          <div className="text-[#FF4D4D]/40 text-2xl rotate-90 lg:rotate-0">→</div>

          {/* Processes & Responds */}
          <div className="flex flex-col items-center text-center min-w-[100px]">
            <div className="w-16 h-16 rounded-2xl bg-[#1E1510] border border-white/[0.1] flex items-center justify-center mb-3 relative">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="url(#memoryBrainGrad)" strokeWidth={1.5}>
                <defs>
                  <linearGradient id="memoryBrainGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#8B5CF6" />
                    <stop offset="100%" stopColor="#A855F7" />
                  </linearGradient>
                </defs>
                <circle cx="12" cy="12" r="3" />
                <path d="M12 1v6m0 6v6" />
                <path d="m21 12-6-3.5M3 12l6-3.5M21 12l-6 3.5M3 12l6 3.5" />
              </svg>
              <div className="absolute inset-[-1px] rounded-2xl bg-gradient-to-br from-[#8B5CF6] to-[#A855F7] opacity-15 -z-10" />
            </div>
            <h4 className="font-mono text-sm font-semibold text-white/90">Processes</h4>
            <p className="text-xs text-white/40 mt-1">Thinks & Responds</p>
          </div>

          <div className="text-[#FF4D4D]/40 text-2xl rotate-90 lg:rotate-0">→</div>

          {/* Writes State */}
          <div className="flex flex-col items-center text-center min-w-[100px]">
            <div className="w-16 h-16 rounded-2xl bg-[#1E1510] border border-white/[0.1] flex items-center justify-center mb-3 relative">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="url(#memoryWriteGrad)" strokeWidth={1.5}>
                <defs>
                  <linearGradient id="memoryWriteGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#10B981" />
                    <stop offset="100%" stopColor="#059669" />
                  </linearGradient>
                </defs>
                <path d="M12 19l7-7 3 3-7 7-3-3z" />
                <path d="M18 13l-1.5-7.5L2 2l3.5 14.5L13 18l5-5z" />
                <path d="M2 2l7.586 7.586" />
                <circle cx="11" cy="11" r="2" />
              </svg>
              <div className="absolute inset-[-1px] rounded-2xl bg-gradient-to-br from-[#10B981] to-[#059669] opacity-15 -z-10" />
            </div>
            <h4 className="font-mono text-sm font-semibold text-white/90">Writes State</h4>
            <p className="text-xs text-white/40 mt-1">Updates Memory</p>
          </div>
        </div>

        {/* Loop back */}
        <div className="mt-6 flex justify-center">
          <div className="flex items-center gap-3 text-xs text-white/30">
            <div className="w-16 h-px bg-gradient-to-r from-transparent via-[#FF4D4D]/25 to-transparent" />
            <span>Cycle continues</span>
            <div className="w-16 h-px bg-gradient-to-r from-transparent via-[#FF4D4D]/25 to-transparent" />
          </div>
        </div>
      </div>
    </div>
  );
}

function AgentHandoffDiagram() {
  return (
    <div className="reveal my-16 bg-[#1E1510]/30 rounded-xl p-8 border border-white/[0.04] relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-br from-[#FF4D4D]/[0.015] via-transparent to-[#00E5CC]/[0.015]" />
        <div className="noise-overlay opacity-[0.008]" />
      </div>
      
      <div className="relative">
        <h3 className="text-center text-lg font-medium text-white/90 mb-8">
          Multi-Agent Workflow
        </h3>
        
        <div className="flex flex-col lg:flex-row items-center justify-center gap-4 lg:gap-6">
          {/* Agent A */}
          <div className="flex flex-col items-center text-center min-w-[100px]">
            <div className="w-16 h-16 rounded-2xl bg-[#1E1510] border border-white/[0.1] flex items-center justify-center mb-3 relative">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="url(#handoffAgentAGrad)" strokeWidth={1.5}>
                <defs>
                  <linearGradient id="handoffAgentAGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#F59E0B" />
                    <stop offset="100%" stopColor="#F97316" />
                  </linearGradient>
                </defs>
                <path d="M21 21v-2a4 4 0 0 0-3-3.87" />
                <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                <circle cx="9" cy="7" r="4" />
                <path d="M3 21v-2a4 4 0 0 1 6-3.46" />
                <path d="M9 13h6l-3-3" />
              </svg>
              <div className="absolute inset-[-1px] rounded-2xl bg-gradient-to-br from-[#F59E0B] to-[#F97316] opacity-15 -z-10" />
            </div>
            <h4 className="font-mono text-sm font-semibold text-white/90">Agent A</h4>
            <p className="text-xs text-white/40 mt-1">Research</p>
          </div>

          <div className="text-[#FF4D4D]/40 text-2xl rotate-90 lg:rotate-0">→</div>

          {/* Queue 1 */}
          <div className="flex flex-col items-center text-center min-w-[80px]">
            <div className="w-12 h-12 rounded-xl bg-[#1E1510] border border-white/[0.08] flex items-center justify-center mb-3 relative">
              <div className="w-4 h-4 border border-[#00E5CC] rounded opacity-50" />
              <div className="absolute inset-[-1px] rounded-xl bg-gradient-to-br from-[#00E5CC] to-[#0891B2] opacity-15 -z-10" />
            </div>
            <h4 className="font-mono text-xs font-medium text-white/70">Queue</h4>
          </div>

          <div className="text-[#FF4D4D]/40 text-2xl rotate-90 lg:rotate-0">→</div>

          {/* Agent B */}
          <div className="flex flex-col items-center text-center min-w-[100px]">
            <div className="w-16 h-16 rounded-2xl bg-[#1E1510] border border-white/[0.1] flex items-center justify-center mb-3 relative">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="url(#handoffAgentBGrad)" strokeWidth={1.5}>
                <defs>
                  <linearGradient id="handoffAgentBGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#8B5CF6" />
                    <stop offset="100%" stopColor="#A855F7" />
                  </linearGradient>
                </defs>
                <path d="M12 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                <path d="M18.375 2.625a2.121 2.121 0 1 1 3 3L12 15l-4 1 1-4Z" />
              </svg>
              <div className="absolute inset-[-1px] rounded-2xl bg-gradient-to-br from-[#8B5CF6] to-[#A855F7] opacity-15 -z-10" />
            </div>
            <h4 className="font-mono text-sm font-semibold text-white/90">Agent B</h4>
            <p className="text-xs text-white/40 mt-1">Writing</p>
          </div>

          <div className="text-[#FF4D4D]/40 text-2xl rotate-90 lg:rotate-0">→</div>

          {/* Queue 2 */}
          <div className="flex flex-col items-center text-center min-w-[80px]">
            <div className="w-12 h-12 rounded-xl bg-[#1E1510] border border-white/[0.08] flex items-center justify-center mb-3 relative">
              <div className="w-4 h-4 border border-[#10B981] rounded opacity-50" />
              <div className="absolute inset-[-1px] rounded-xl bg-gradient-to-br from-[#10B981] to-[#059669] opacity-15 -z-10" />
            </div>
            <h4 className="font-mono text-xs font-medium text-white/70">Queue</h4>
          </div>

          <div className="text-[#FF4D4D]/40 text-2xl rotate-90 lg:rotate-0">→</div>

          {/* Agent C */}
          <div className="flex flex-col items-center text-center min-w-[100px]">
            <div className="w-16 h-16 rounded-2xl bg-[#1E1510] border border-white/[0.1] flex items-center justify-center mb-3 relative">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="url(#handoffAgentCGrad)" strokeWidth={1.5}>
                <defs>
                  <linearGradient id="handoffAgentCGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#10B981" />
                    <stop offset="100%" stopColor="#059669" />
                  </linearGradient>
                </defs>
                <path d="M20 6L9 17l-5-5" />
                <path d="M12 12l8-8" />
              </svg>
              <div className="absolute inset-[-1px] rounded-2xl bg-gradient-to-br from-[#10B981] to-[#059669] opacity-15 -z-10" />
            </div>
            <h4 className="font-mono text-sm font-semibold text-white/90">Agent C</h4>
            <p className="text-xs text-white/40 mt-1">Editing</p>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ── Main Component ─────────────────────────────────────── */

export function HowOpenclawWorksContent() {
  const contentRef = useReveal();

  return (
    <div className="min-h-screen flex flex-col">
      <SiteNavbar />

      <main className="flex-1 px-4 sm:px-6 pt-28 pb-20" ref={contentRef}>
        {/* Article Container - Single column, editorial layout */}
        <article className="max-w-[720px] mx-auto">

          {/* ── Article Header ────────────────────────── */}
          <header className="mb-16 reveal">
            <h1 className="text-[42px] sm:text-[48px] font-bold tracking-tight text-white leading-[1.1] mb-6">
              How OpenClaw Works
            </h1>
            
            <p className="text-xl text-white/60 leading-relaxed mb-8">
              It's not magic. It's inputs, queues, and a loop. Here's how the architecture behind the "alive" AI agent actually works.
            </p>

            <div className="flex items-center gap-4 text-sm text-white/40">
              <span>February 15, 2026</span>
              <span>•</span>
              <span>8 min read</span>
              <span>•</span>
              <a 
                href="https://youtu.be/CAbrRTu5xcw" 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 hover:text-white/60 transition-colors"
              >
                Video source <ExternalLinkIcon />
              </a>
            </div>
          </header>

          {/* ── Hero Image ────────────────────────────── */}
          <div className="reveal my-12 rounded-xl overflow-hidden border border-white/[0.04]">
            <Image
              src="/images/how-openclaw-works/hero-event-loop.webp"
              alt="Abstract visualization of OpenClaw's event loop architecture — glowing amber and teal light traces forming a circular processing loop on a dark background"
              width={1536}
              height={1024}
              className="w-full h-auto"
              priority
            />
          </div>

          {/* ── Article Body ──────────────────────────── */}
          <div className="prose-article">
            <div className="reveal">
              <p className="article-p">
                When people see OpenClaw make a phone call at 3 AM or send a perfectly-timed "good morning" text, they think there's some mystical AI consciousness running in the background. The reality is much more interesting—and much simpler.
              </p>

              <p className="article-p">
                OpenClaw is an agent runtime with a gateway in front. The gateway doesn't think, plan, or strategize. It's a traffic manager that accepts inputs and routes them to agents through queues. Understanding this architecture is the key to understanding how AI agents feel "proactive" and "alive."
              </p>
            </div>

            <PullQuote>
              The magic isn't magic. It's just well-designed inputs, queues, and an event loop that never stops running.
            </PullQuote>

            <div className="reveal my-12 rounded-xl overflow-hidden border border-white/[0.04]">
              <Image
                src="/images/how-openclaw-works/five-inputs.webp"
                alt="Five distinct streams of colored light converging into a single point — representing the five input types that feed into OpenClaw's processing queue"
                width={1536}
                height={1024}
                className="w-full h-auto"
              />
            </div>

            <div className="reveal">
              <h2 className="article-h2">The Five Input Types</h2>

              <p className="article-p">
                Every interaction with OpenClaw falls into one of five categories. Each one feels different from the user's perspective, but they all follow the same pattern: something happens, an event enters the queue, the agent processes it, and state updates. Here's how each type works.
              </p>
            </div>

            <div className="reveal">
              <h3 className="article-h3">1. Messages</h3>
              <p className="article-p">
                This is the most familiar input type. You send text via WhatsApp, Telegram, Discord, Slack, or iMessage. The message gets routed to your agent, which processes it and responds. Sessions are per-channel, with queued processing so responses never get jumbled even if multiple people are messaging simultaneously.
              </p>

              <p className="article-p">
                Example: You text "What's the weather?" → Gateway routes to agent → Agent checks forecast → Responds with current conditions. Simple request-response, but it happens through the same queue system as everything else.
              </p>
            </div>

            <div className="reveal">
              <h3 className="article-h3">2. Heartbeats</h3>
              <p className="article-p">
                Every ~30 minutes, a timer fires and sends a configurable prompt to your agent. The agent checks inbox, calendar, tasks—whatever you've configured it to monitor. If nothing's urgent, it stays quiet with a suppressed "HEARTBEAT_OK" response. If something needs your attention, it reaches out.
              </p>

              <p className="article-p">
                This is why OpenClaw feels proactive. It's not thinking between your messages; it's running scheduled checks. You set up the behavior once, and the timer keeps firing, creating the illusion of constant awareness.
              </p>
            </div>

            <div className="reveal">
              <h3 className="article-h3">3. Cron Jobs</h3>
              <p className="article-p">
                Scheduled events with specific prompts and precise timing. "9 AM: check email and summarize urgent items," "Monday 3 PM: review this week's calendar," "Midnight: browse Twitter for industry news." The famous "wife-texting" example runs on cron: 8 AM "good morning," 10 PM "good night."
              </p>

              <p className="article-p">
                Cron jobs are heartbeats with better timing control. Where heartbeats drift slightly (every ~30 minutes), cron jobs fire at exact moments. They're perfect for routines that need to happen at specific times.
              </p>
            </div>

            <CodeBlock language="yaml">{`# Example cron configuration
cron_jobs:
  - schedule: "0 8 * * *"   # 8 AM daily  
    prompt: "Send my wife a good morning text"
    enabled: true
    
  - schedule: "0 22 * * *"  # 10 PM daily
    prompt: "Send my wife a good night text" 
    enabled: true

  - schedule: "0 9 * * MON" # Monday 9 AM
    prompt: "Review this week's calendar and email me a summary"
    enabled: true`}</CodeBlock>

            <div className="reveal">
              <h3 className="article-h3">4. Hooks</h3>
              <p className="article-p">
                Internal state changes trigger hook events. Gateway startup, agent begins task, commands issued, session resets—all of these can fire hooks with custom prompts. Your agent manages itself through event-driven triggers.
              </p>

              <p className="article-p">
                Hooks enable self-management behaviors that feel intelligent but are actually reactive. Gateway starts → hook fires → agent reads morning briefing → updates you on daily priorities. The agent isn't "deciding" to do this; it's responding to a configured trigger.
              </p>
            </div>

            <div className="reveal">
              <h3 className="article-h3">5. Webhooks</h3>
              <p className="article-p">
                External systems send real-time events: email arrives, Slack reaction added, Jira ticket created, GitHub commit pushed, calendar event updated. Your agent responds to your entire digital life as it happens.
              </p>

              <p className="article-p">
                Webhooks make OpenClaw feel omniscient. It's not watching everything constantly; it's receiving notifications from systems you've connected. When something happens in your digital world, a webhook fires, the event enters the queue, and your agent responds accordingly.
              </p>
            </div>

            <GatewayRoutingDiagram />

            <div className="reveal">
              <h3 className="article-h3">6. Agent-to-Agent Communication</h3>
              <p className="article-p">
                Multi-agent setups look like sophisticated collaboration, but they're just messages entering queues. Agent A finishes a task → queues work for Agent B → Agent B processes it and responds. The handoff looks seamless because both agents are operating through the same queue system.
              </p>

              <p className="article-p">
                This enables complex workflows that feel coordinated but are actually just well-orchestrated message passing. Research agent finds data → queues summary for writing agent → writing agent creates report → queues review for editing agent.
              </p>
            </div>

            <AgentHandoffDiagram />

            <ArchitectureDiagram />

            <div className="reveal my-12 rounded-xl overflow-hidden border border-white/[0.04]">
              <Image
                src="/images/how-openclaw-works/three-am-alert.webp"
                alt="A single amber pulse radiating outward against a dark background — representing a cron job triggering an alert in the middle of the night"
                width={1536}
                height={1024}
                className="w-full h-auto"
              />
            </div>

            <div className="reveal">
              <h2 className="article-h2">The 3 AM Call, Demystified</h2>

              <p className="article-p">
                Let's walk through the dramatic example that makes people think AI is "thinking overnight." Someone's OpenClaw agent called them at 3 AM about a home security issue. Here's what actually happened:
              </p>
            </div>

            <CallSequenceDiagram />

            <CodeBlock language="yaml">{`# The actual 3 AM cron job configuration
cron_jobs:
  - schedule: "0 3 * * *"  # 3 AM daily
    prompt: |
      Check home status. If ANY of these conditions are met:
      - Temperature drops below 32°F  
      - Severe weather alerts for my area
      - Security system shows "triggered" status
      - Power outage detected
      
      Then: Call me immediately via Twilio with details
    enabled: true`}</CodeBlock>

            <div className="reveal">
              <h2 className="article-h2">State and Memory</h2>

              <p className="article-p">
                Your agent's memory isn't stored in some mystical AI consciousness—it lives in local markdown files. Preferences, conversation history, context, learned behaviors, all written to disk as plain text files that you can read and edit.
              </p>

              <p className="article-p">
                On heartbeat, the agent reads these files and "remembers" yesterday's conversation. When state updates after processing an event, new information gets written back to the files. It's a simple, transparent system that feels like memory because it works like memory.
              </p>
            </div>

            <MemoryCycleDiagram />

            <div className="reveal">
              <h2 className="article-h2">Security Implications</h2>

              <p className="article-p">
                This architecture comes with significant security considerations. OpenClaw agents have deep system access—shell commands, file operations, browser automation, API calls. They're designed to be powerful, which means they're also potentially dangerous.
              </p>

              <p className="article-p">
                Cisco's research found that 26% of AI agent skills contain security vulnerabilities. Attack vectors include prompt injection, malicious skills, credential exposure, and privilege escalation. One compromised skill can access everything your agent can access.
              </p>
            </div>

            <EditorialAside title="Recommended Precautions">
              <p><strong>Run on a secondary machine</strong> if possible, isolated from your primary work environment</p>
              <p><strong>Use limited user accounts</strong> for agent operations, not your admin account</p>
              <p><strong>Audit skills carefully</strong> before installation—read the source code, understand what it does</p>
              <p><strong>Monitor logs regularly</strong> to see what your agent is actually doing</p>
              <p><strong>Start with Railway's one-click deploy</strong> for sandboxed experimentation before running locally</p>
            </EditorialAside>

            <div className="reveal">
              <h2 className="article-h2">Why This Architecture Matters</h2>

              <p className="article-p">
                Understanding OpenClaw's event-driven architecture helps you evaluate other AI agent frameworks intelligently. Most follow similar patterns: inputs generate events, events trigger processing, state persists, loops continue. The implementation details vary, but the core concept remains consistent.
              </p>

              <p className="article-p">
                This knowledge also helps you debug issues effectively. If your agent isn't responding to heartbeats, check the timer configuration. If webhooks aren't firing, verify the endpoint setup. If responses seem inconsistent, look at queue processing and state persistence.
              </p>

              <p className="article-p">
                Most importantly, it demystifies the "AI magic." Your agent feels alive because it's designed with good architecture, not because it has consciousness. It's proactive because of well-configured inputs, responsive because of efficient queuing, and intelligent because of thoughtful prompts and state management.
              </p>
            </div>

            <PullQuote>
              The illusion of intelligence comes from well-designed systems, not mystical AI consciousness. Four simple components—time, events, queues, and state—create behaviors that feel remarkably alive.
            </PullQuote>

            <div className="reveal">
              <p className="article-p">
                Next time you see an AI agent doing something that seems impossibly prescient or perfectly timed, remember: it's not magic. It's inputs, queues, and a loop that never stops running. And honestly, that's far more impressive than magic would be.
              </p>
            </div>

            {/* ── Explore Further Section ──────────────── */}
            <div className="reveal">
              <h2 className="article-h2">Explore Further</h2>
              <div className="space-y-4">
                <p className="article-p">
                  <Link 
                    href="/how-it-works" 
                    className="inline-flex items-center gap-2 text-[#F59E0B] hover:text-[#FF4D4D] transition-colors font-medium decoration-none border-b border-[#F59E0B]/30 hover:border-[#FF4D4D]/50"
                  >
                    See how skills extend your agent →
                  </Link>
                </p>
                <p className="article-p">
                  <Link 
                    href="/skills/openclaw-memory-system" 
                    className="inline-flex items-center gap-2 text-[#00E5CC] hover:text-[#F59E0B] transition-colors font-medium decoration-none border-b border-[#00E5CC]/30 hover:border-[#F59E0B]/50"
                  >
                    Get the Memory System skill →
                  </Link>
                </p>
                <p className="article-p">
                  <Link 
                    href="/browse" 
                    className="inline-flex items-center gap-2 text-[#FF4D4D] hover:text-[#00E5CC] transition-colors font-medium decoration-none border-b border-[#FF4D4D]/30 hover:border-[#00E5CC]/50"
                  >
                    Browse all skills →
                  </Link>
                </p>
              </div>
            </div>

          </div>

        </article>
      </main>

      <Footer />

      <style>{`
        .reveal {
          opacity: 0;
          transform: translateY(20px);
          transition: opacity 0.6s ease-out, transform 0.6s ease-out;
        }
        .reveal.visible {
          opacity: 1;
          transform: translateY(0);
        }

        /* Article Typography */
        .prose-article {
          color: #ECEDEE;
        }
        
        .article-p {
          font-size: 17px;
          line-height: 1.7;
          color: rgba(236, 237, 238, 0.85);
          margin-bottom: 24px;
        }
        
        .article-h2 {
          font-size: 28px;
          font-weight: 700;
          color: #ECEDEE;
          margin-top: 48px;
          margin-bottom: 20px;
          line-height: 1.3;
        }
        
        .article-h3 {
          font-size: 22px; 
          font-weight: 600;
          color: #ECEDEE;
          margin-top: 36px;
          margin-bottom: 16px;
          line-height: 1.4;
        }
      `}</style>
    </div>
  );
}