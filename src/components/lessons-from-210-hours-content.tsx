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

function PlayIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="url(#playGrad)" strokeWidth={1.5}>
      <defs>
        <linearGradient id="playGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#F59E0B" />
          <stop offset="100%" stopColor="#F97316" />
        </linearGradient>
      </defs>
      <polygon points="5,3 19,12 5,21" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function SecurityIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="url(#securityGrad)" strokeWidth={1.5}>
      <defs>
        <linearGradient id="securityGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FF4D4D" />
          <stop offset="100%" stopColor="#DC2626" />
        </linearGradient>
      </defs>
      <path d="M9 12l2 2 4-4" />
      <path d="M21 12c-1 0-3-1-3-3s2-3 3-3 3 1 3 3-2 3-3 3" />
      <path d="M3 12c1 0 3-1 3-3s-2-3-3-3-3 1-3 3 2 3 3 3" />
      <path d="M12 3c0 1 1 3 3 3s3-2 3-3-1-3-3-3-3 2-3 3" />
      <path d="M12 21c0-1-1-3-3-3s-3 2-3 3 1 3 3 3 3-2 3-3" />
    </svg>
  );
}

function ServerIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="url(#serverGrad)" strokeWidth={1.5}>
      <defs>
        <linearGradient id="serverGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#00E5CC" />
          <stop offset="100%" stopColor="#0891B2" />
        </linearGradient>
      </defs>
      <rect x="2" y="3" width="20" height="4" rx="1" />
      <rect x="2" y="9" width="20" height="4" rx="1" />
      <rect x="2" y="15" width="20" height="4" rx="1" />
      <line x1="6" y1="5" x2="6.01" y2="5" />
      <line x1="6" y1="11" x2="6.01" y2="11" />
      <line x1="6" y1="17" x2="6.01" y2="17" />
    </svg>
  );
}

function LaptopIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="url(#laptopGrad)" strokeWidth={1.5}>
      <defs>
        <linearGradient id="laptopGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#8B5CF6" />
          <stop offset="100%" stopColor="#A855F7" />
        </linearGradient>
      </defs>
      <path d="M20 16V7a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v9m16 0H4m16 0 1.28 2.55a1 1 0 0 1-.9 1.45H3.62a1 1 0 0 1-.9-1.45L4 16" />
    </svg>
  );
}

function TrendingUpIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="url(#trendingGrad)" strokeWidth={1.5}>
      <defs>
        <linearGradient id="trendingGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#10B981" />
          <stop offset="100%" stopColor="#059669" />
        </linearGradient>
      </defs>
      <polyline points="22,7 13.5,15.5 8.5,10.5 2,17" />
      <polyline points="16,7 22,7 22,13" />
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

function CodeBlock({ children, language = "bash" }: { children: string; language?: string }) {
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

function EditorialAside({ children, title, variant = "default" }: { 
  children: React.ReactNode; 
  title?: string;
  variant?: "default" | "warning" | "success" | "info";
}) {
  const variants = {
    default: "border-[#F59E0B]/40 bg-[#1E1510]/20",
    warning: "border-[#FF4D4D]/40 bg-[#1E0E0E]/20",
    success: "border-[#10B981]/40 bg-[#0E1E18]/20",
    info: "border-[#00E5CC]/40 bg-[#0E1E1C]/20"
  };

  return (
    <aside className={`reveal my-10 rounded-lg p-6 border-l-4 ${variants[variant]}`}>
      {title && (
        <h4 className="text-base font-medium text-white/90 mb-3">{title}</h4>
      )}
      <div className="text-sm text-white/60 leading-relaxed space-y-3">
        {children}
      </div>
    </aside>
  );
}

/* ── Setup Strategy Diagram ────────────────────────────── */

function SetupStrategyDiagram() {
  return (
    <div className="reveal my-16 bg-[#1E1510]/30 rounded-xl p-8 border border-white/[0.04] relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-br from-[#FF4D4D]/[0.015] via-transparent to-[#00E5CC]/[0.015]" />
        <div className="noise-overlay opacity-[0.008]" />
      </div>
      
      <div className="relative">
        <h3 className="text-center text-lg font-medium text-white/90 mb-8">
          Setup Strategy Decision Tree
        </h3>
        
        <div className="flex flex-col items-center space-y-8">
          {/* Decision Point */}
          <div className="flex flex-col items-center text-center">
            <div className="w-16 h-16 rounded-2xl bg-[#1E1510] border border-white/[0.1] flex items-center justify-center mb-3 relative">
              <span className="text-2xl">🤔</span>
              <div className="absolute inset-[-1px] rounded-2xl bg-gradient-to-br from-[#F59E0B] to-[#F97316] opacity-15 -z-10" />
            </div>
            <h4 className="font-mono text-sm font-semibold text-white/90">First Time?</h4>
            <p className="text-xs text-white/40 mt-1">Choose your path</p>
          </div>

          {/* Paths */}
          <div className="flex flex-col lg:flex-row gap-8 lg:gap-16 w-full">
            {/* Beginner Path */}
            <div className="flex-1 bg-[#1E1510]/20 rounded-xl p-6 border border-[#10B981]/20">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-[#10B981]/20 flex items-center justify-center">
                  <span className="text-lg">🟢</span>
                </div>
                <div>
                  <h4 className="font-mono text-sm font-semibold text-white/90">Beginner Path</h4>
                  <p className="text-xs text-white/40">Safe & Easy</p>
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm text-white/70">
                  <span className="w-1.5 h-1.5 bg-[#10B981] rounded-full"></span>
                  Railway one-click deploy
                </div>
                <div className="flex items-center gap-2 text-sm text-white/70">
                  <span className="w-1.5 h-1.5 bg-[#10B981] rounded-full"></span>
                  Sandboxed environment  
                </div>
                <div className="flex items-center gap-2 text-sm text-white/70">
                  <span className="w-1.5 h-1.5 bg-[#10B981] rounded-full"></span>
                  No local installation needed
                </div>
                <div className="flex items-center gap-2 text-sm text-white/70">
                  <span className="w-1.5 h-1.5 bg-[#10B981] rounded-full"></span>
                  Perfect for experimentation
                </div>
              </div>
            </div>

            {/* Advanced Path */}
            <div className="flex-1 bg-[#1E1510]/20 rounded-xl p-6 border border-[#FF4D4D]/20">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-[#FF4D4D]/20 flex items-center justify-center">
                  <span className="text-lg">🔴</span>
                </div>
                <div>
                  <h4 className="font-mono text-sm font-semibold text-white/90">Advanced Path</h4>
                  <p className="text-xs text-white/40">Full Control</p>
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm text-white/70">
                  <span className="w-1.5 h-1.5 bg-[#FF4D4D] rounded-full"></span>
                  VPS or local installation
                </div>
                <div className="flex items-center gap-2 text-sm text-white/70">
                  <span className="w-1.5 h-1.5 bg-[#FF4D4D] rounded-full"></span>
                  Full system access
                </div>
                <div className="flex items-center gap-2 text-sm text-white/70">
                  <span className="w-1.5 h-1.5 bg-[#FF4D4D] rounded-full"></span>
                  Custom configurations
                </div>
                <div className="flex items-center gap-2 text-sm text-white/70">
                  <span className="w-1.5 h-1.5 bg-[#FF4D4D] rounded-full"></span>
                  Production workloads
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ── VPS vs Local Comparison ────────────────────────────── */

function VPSvsLocalComparison() {
  return (
    <div className="reveal my-16 bg-[#1E1510]/30 rounded-xl p-8 border border-white/[0.04] relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-br from-[#FF4D4D]/[0.015] via-transparent to-[#00E5CC]/[0.015]" />
        <div className="noise-overlay opacity-[0.008]" />
      </div>
      
      <div className="relative">
        <h3 className="text-center text-lg font-medium text-white/90 mb-8">
          VPS vs Local Deployment
        </h3>
        
        <div className="grid lg:grid-cols-2 gap-8">
          {/* VPS Column */}
          <div className="bg-[#1E1510]/20 rounded-xl p-6 border border-[#00E5CC]/20">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-xl bg-[#1E1510] border border-white/[0.08] flex items-center justify-center relative">
                <ServerIcon />
                <div className="absolute inset-[-1px] rounded-xl bg-gradient-to-br from-[#00E5CC] to-[#0891B2] opacity-15 -z-10" />
              </div>
              <div>
                <h4 className="font-mono text-lg font-semibold text-white/90">VPS</h4>
                <p className="text-xs text-white/40">Always-on, cloud-based</p>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <h5 className="text-sm font-medium text-[#10B981] mb-2">✅ Pros</h5>
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm text-white/70">
                    <span className="w-1.5 h-1.5 bg-[#10B981] rounded-full"></span>
                    24/7 uptime for heartbeats & cron
                  </div>
                  <div className="flex items-center gap-2 text-sm text-white/70">
                    <span className="w-1.5 h-1.5 bg-[#10B981] rounded-full"></span>
                    Dedicated resources
                  </div>
                  <div className="flex items-center gap-2 text-sm text-white/70">
                    <span className="w-1.5 h-1.5 bg-[#10B981] rounded-full"></span>
                    No home network changes
                  </div>
                  <div className="flex items-center gap-2 text-sm text-white/70">
                    <span className="w-1.5 h-1.5 bg-[#10B981] rounded-full"></span>
                    Static IP for webhooks
                  </div>
                  <div className="flex items-center gap-2 text-sm text-white/70">
                    <span className="w-1.5 h-1.5 bg-[#10B981] rounded-full"></span>
                    Better for production use
                  </div>
                </div>
              </div>

              <div>
                <h5 className="text-sm font-medium text-[#FF4D4D] mb-2">❌ Cons</h5>
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm text-white/70">
                    <span className="w-1.5 h-1.5 bg-[#FF4D4D] rounded-full"></span>
                    Monthly hosting costs
                  </div>
                  <div className="flex items-center gap-2 text-sm text-white/70">
                    <span className="w-1.5 h-1.5 bg-[#FF4D4D] rounded-full"></span>
                    SSH/server management
                  </div>
                  <div className="flex items-center gap-2 text-sm text-white/70">
                    <span className="w-1.5 h-1.5 bg-[#FF4D4D] rounded-full"></span>
                    Security configuration required
                  </div>
                  <div className="flex items-center gap-2 text-sm text-white/70">
                    <span className="w-1.5 h-1.5 bg-[#FF4D4D] rounded-full"></span>
                    Network latency for UI tasks
                  </div>
                </div>
              </div>

              <div>
                <h5 className="text-sm font-medium text-[#F59E0B] mb-2">💰 Best For</h5>
                <div className="text-sm text-white/70 space-y-1">
                  <p>• Production workflows</p>
                  <p>• Always-on automation</p>
                  <p>• Team/shared usage</p>
                  <p>• Webhook-heavy setups</p>
                </div>
              </div>
            </div>
          </div>

          {/* Local Column */}
          <div className="bg-[#1E1510]/20 rounded-xl p-6 border border-[#8B5CF6]/20">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-xl bg-[#1E1510] border border-white/[0.08] flex items-center justify-center relative">
                <LaptopIcon />
                <div className="absolute inset-[-1px] rounded-xl bg-gradient-to-br from-[#8B5CF6] to-[#A855F7] opacity-15 -z-10" />
              </div>
              <div>
                <h4 className="font-mono text-lg font-semibold text-white/90">Local</h4>
                <p className="text-xs text-white/40">Your machine, your rules</p>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <h5 className="text-sm font-medium text-[#10B981] mb-2">✅ Pros</h5>
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm text-white/70">
                    <span className="w-1.5 h-1.5 bg-[#10B981] rounded-full"></span>
                    Zero hosting costs
                  </div>
                  <div className="flex items-center gap-2 text-sm text-white/70">
                    <span className="w-1.5 h-1.5 bg-[#10B981] rounded-full"></span>
                    Direct file system access
                  </div>
                  <div className="flex items-center gap-2 text-sm text-white/70">
                    <span className="w-1.5 h-1.5 bg-[#10B981] rounded-full"></span>
                    Native browser automation
                  </div>
                  <div className="flex items-center gap-2 text-sm text-white/70">
                    <span className="w-1.5 h-1.5 bg-[#10B981] rounded-full"></span>
                    Easier for development
                  </div>
                  <div className="flex items-center gap-2 text-sm text-white/70">
                    <span className="w-1.5 h-1.5 bg-[#10B981] rounded-full"></span>
                    Full hardware access
                  </div>
                </div>
              </div>

              <div>
                <h5 className="text-sm font-medium text-[#FF4D4D] mb-2">❌ Cons</h5>
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm text-white/70">
                    <span className="w-1.5 h-1.5 bg-[#FF4D4D] rounded-full"></span>
                    Requires machine to stay on
                  </div>
                  <div className="flex items-center gap-2 text-sm text-white/70">
                    <span className="w-1.5 h-1.5 bg-[#FF4D4D] rounded-full"></span>
                    Home network exposure
                  </div>
                  <div className="flex items-center gap-2 text-sm text-white/70">
                    <span className="w-1.5 h-1.5 bg-[#FF4D4D] rounded-full"></span>
                    Dynamic IP challenges
                  </div>
                  <div className="flex items-center gap-2 text-sm text-white/70">
                    <span className="w-1.5 h-1.5 bg-[#FF4D4D] rounded-full"></span>
                    Potential resource conflicts
                  </div>
                </div>
              </div>

              <div>
                <h5 className="text-sm font-medium text-[#F59E0B] mb-2">💰 Best For</h5>
                <div className="text-sm text-white/70 space-y-1">
                  <p>• Development & testing</p>
                  <p>• Personal automation</p>
                  <p>• UI-heavy workflows</p>
                  <p>• Budget-conscious users</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ── Security Layers Diagram ────────────────────────────── */

function SecurityLayersDiagram() {
  return (
    <div className="reveal my-16 bg-[#1E1510]/30 rounded-xl p-8 border border-white/[0.04] relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-br from-[#FF4D4D]/[0.015] via-transparent to-[#00E5CC]/[0.015]" />
        <div className="noise-overlay opacity-[0.008]" />
      </div>
      
      <div className="relative">
        <h3 className="text-center text-lg font-medium text-white/90 mb-8">
          Security Layers (Defense in Depth)
        </h3>
        
        <div className="flex flex-col items-center space-y-6">
          {[
            {
              title: "Network Security",
              description: "Firewall, VPN, isolated networks",
              color: "from-[#FF4D4D] to-[#DC2626]",
              level: "Level 1"
            },
            {
              title: "System Security", 
              description: "User permissions, sandboxing, containers",
              color: "from-[#F59E0B] to-[#F97316]",
              level: "Level 2"
            },
            {
              title: "Application Security",
              description: "Skill auditing, code review, input validation",
              color: "from-[#00E5CC] to-[#0891B2]", 
              level: "Level 3"
            },
            {
              title: "Data Security",
              description: "Encryption, secure storage, key management",
              color: "from-[#8B5CF6] to-[#A855F7]",
              level: "Level 4"
            },
            {
              title: "Operational Security",
              description: "Monitoring, logging, incident response", 
              color: "from-[#10B981] to-[#059669]",
              level: "Level 5"
            }
          ].map((layer, i) => (
            <div key={i} className="w-full max-w-md">
              <div className="bg-[#1E1510]/30 rounded-xl p-4 border border-white/[0.08] relative">
                <div className={`absolute inset-[-1px] rounded-xl bg-gradient-to-r ${layer.color} opacity-10 -z-10`} />
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${layer.color} opacity-20 flex items-center justify-center relative`}>
                    <SecurityIcon />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h4 className="font-mono text-sm font-semibold text-white/90">{layer.title}</h4>
                      <span className="text-xs text-white/40 bg-white/[0.05] px-2 py-0.5 rounded">{layer.level}</span>
                    </div>
                    <p className="text-xs text-white/60">{layer.description}</p>
                  </div>
                </div>
              </div>
              {i < 4 && (
                <div className="flex justify-center py-2">
                  <div className="text-[#FF4D4D]/40 text-lg">↓</div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ── Experience Timeline ────────────────────────────────── */

function ExperienceTimeline() {
  return (
    <div className="reveal my-16 bg-[#1E1510]/30 rounded-xl p-8 border border-white/[0.04] relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-br from-[#FF4D4D]/[0.015] via-transparent to-[#00E5CC]/[0.015]" />
        <div className="noise-overlay opacity-[0.008]" />
      </div>
      
      <div className="relative">
        <h3 className="text-center text-lg font-medium text-white/90 mb-8">
          The 210-Hour Journey
        </h3>
        
        <div className="space-y-8">
          {[
            {
              phase: "Hours 0-20",
              title: "Setup Hell",
              description: "Fighting dependencies, configuration, and basic concepts. Nothing works as expected.",
              icon: "😵",
              color: "from-[#FF4D4D] to-[#DC2626]"
            },
            {
              phase: "Hours 20-50", 
              title: "First Success",
              description: "Basic message handling works. The 'holy crap it's alive' moment hits.",
              icon: "🤯",
              color: "from-[#F59E0B] to-[#F97316]"
            },
            {
              phase: "Hours 50-100",
              title: "Feature Addiction",
              description: "Adding every skill and webhook. More is better, right? Wrong.",
              icon: "🤪", 
              color: "from-[#8B5CF6] to-[#A855F7]"
            },
            {
              phase: "Hours 100-150",
              title: "Reality Check",
              description: "Performance issues, security scares, and broken workflows. Time to clean up.",
              icon: "😰",
              color: "from-[#FF4D4D] to-[#F97316]"
            },
            {
              phase: "Hours 150-210+",
              title: "Mastery",
              description: "Lean, focused setup. Understanding what actually matters vs what's just cool.",
              icon: "🧠",
              color: "from-[#10B981] to-[#059669]"
            }
          ].map((milestone, i) => (
            <div key={i} className="flex items-start gap-4">
              <div className="flex-shrink-0">
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${milestone.color} opacity-20 flex items-center justify-center relative`}>
                  <span className="text-lg">{milestone.icon}</span>
                </div>
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <h4 className="font-mono text-sm font-semibold text-white/90">{milestone.title}</h4>
                  <span className="text-xs text-white/40 bg-white/[0.05] px-2 py-0.5 rounded">{milestone.phase}</span>
                </div>
                <p className="text-sm text-white/70 leading-relaxed">{milestone.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ── Main Component ─────────────────────────────────────── */

export function LessonsFrom210HoursContent() {
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
              Lessons from 210 Hours with OpenClaw
            </h1>
            
            <p className="text-xl text-white/60 leading-relaxed mb-8">
              Real-world experience and hard-won insights from Alex Finn's viral deep-dive into OpenClaw mastery. Setup strategies, deployment decisions, security practices, and the lessons that only come from extensive hands-on usage.
            </p>

            <div className="flex items-center gap-4 text-sm text-white/40 mb-6">
              <span>February 16, 2026</span>
              <span>•</span>
              <span>12 min read</span>
              <span>•</span>
              <span>210+ hours of experience</span>
            </div>

            <div className="flex items-center gap-4">
              <a 
                href="https://x.com/i/status/2023439732328525890" 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 bg-[#FF4D4D]/10 border border-[#FF4D4D]/20 rounded-lg hover:bg-[#FF4D4D]/15 transition-colors text-white/80 hover:text-white"
              >
                <PlayIcon />
                Watch the original video <ExternalLinkIcon />
              </a>
              <div className="text-sm text-white/40">
                35 min • 13K views • 497 bookmarks
              </div>
            </div>
          </header>

          {/* ── Hero Image ────────────────────────────── */}
          <div className="reveal my-12 rounded-xl overflow-hidden border border-white/[0.04]">
            <Image
              src="/images/lessons-from-210-hours/hero-experience.webp"
              alt="Abstract visualization of accumulated experience — glowing amber streams converging into crystallized wisdom on a dark background"
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
                When Alex Finn published his 35-minute breakdown of everything he learned from 210+ hours with OpenClaw, it struck a nerve. The video went viral—13K views, 314 likes, 497 bookmarks—because it captured something most setup guides miss: the messy reality of learning a powerful tool.
              </p>

              <p className="article-p">
                This isn't another "OpenClaw in 5 minutes" tutorial. It's the distilled wisdom from someone who's been through setup hell, experienced the "holy crap it's alive" moment, fell into feature addiction, hit performance walls, had security scares, and emerged with a lean, focused understanding of what actually matters.
              </p>
            </div>

            <PullQuote>
              "The biggest mistake I made wasn't technical—it was thinking more features meant better automation. The opposite is true. Less is more, but only if that 'less' is exactly what you need." — Alex Finn
            </PullQuote>

            <ExperienceTimeline />

            <div className="reveal">
              <h2 className="article-h2">The Setup Decision That Matters Most</h2>

              <p className="article-p">
                Before touching a single config file, you need to answer one question: are you experimenting or deploying? This decision shapes everything that follows—hosting strategy, security posture, feature selection, and maintenance overhead.
              </p>

              <p className="article-p">
                Alex's recommendation after 210 hours: start with Railway's one-click deploy, even if you think you want local installation. The sandboxed environment lets you break things safely while learning OpenClaw's concepts. Once you understand the tool, you can make informed deployment decisions.
              </p>
            </div>

            <SetupStrategyDiagram />

            <EditorialAside title="Alex's Railway Experience" variant="success">
              <p><strong>First deployment:</strong> 3 minutes from click to working agent</p>
              <p><strong>Learning value:</strong> Focus on concepts instead of troubleshooting dependencies</p>
              <p><strong>Cost:</strong> $5-15/month during experimentation phase</p>
              <p><strong>Migration path:</strong> Export config and skills once you understand what you need</p>
            </EditorialAside>

            <div className="reveal my-12 rounded-xl overflow-hidden border border-white/[0.04]">
              <Image
                src="/images/lessons-from-210-hours/deployment-paths.webp"
                alt="Branching light paths representing different deployment strategies — Railway's simple route versus VPS and local installation complexity"
                width={1536}
                height={1024}
                className="w-full h-auto"
              />
            </div>

            <div className="reveal">
              <h2 className="article-h2">VPS vs Local: The Real-World Comparison</h2>

              <p className="article-p">
                The documentation makes both options sound equivalent. After 210 hours, Alex learned they're not. Each has scenarios where it shines and scenarios where it creates unnecessary pain. The key is matching your deployment strategy to your actual usage patterns.
              </p>

              <p className="article-p">
                Most people default to local installation because it seems "free." But that's misleading accounting. Local means your machine stays on 24/7, handling network configuration for webhooks, managing updates and security patches, and dealing with the resource conflicts that come from running production workloads on your development machine.
              </p>
            </div>

            <VPSvsLocalComparison />

            <div className="reveal">
              <h3 className="article-h3">Alex's VPS Recommendations</h3>
              
              <p className="article-p">
                After testing Linode, DigitalOcean, and Hetzner, Alex's current setup runs on a Hetzner VPS (4 vCPU, 8GB RAM, $12/month) with Ubuntu 22.04 LTS. His config priorities: dedicated resources for the agent, static IP for webhook reliability, and automated backups for peace of mind.
              </p>
            </div>

            <CodeBlock language="bash">{`# Alex's VPS setup script (condensed)
#!/bin/bash

# System updates
apt update && apt upgrade -y

# Install dependencies
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
apt install -y nodejs nginx certbot python3-certbot-nginx

# OpenClaw installation
npm install -g openclaw@latest

# Basic firewall (only SSH, HTTP, HTTPS)
ufw allow 22/tcp
ufw allow 80/tcp  
ufw allow 443/tcp
ufw --force enable

# Reverse proxy setup for webhook endpoints
# (nginx config omitted for brevity)

# Auto-renewal for SSL certificates
echo "0 12 * * * /usr/bin/certbot renew --quiet" | crontab -`}</CodeBlock>

            <div className="reveal">
              <h3 className="article-h3">When to Choose Local</h3>
              
              <p className="article-p">
                Local makes sense for development, UI automation workflows, and personal projects where you're already keeping your machine on constantly. Alex keeps a local instance for testing new skills and debugging configurations before pushing to his production VPS.
              </p>

              <p className="article-p">
                The hybrid approach works well: local for experimentation and development, VPS for production workloads and always-on automation. This gives you the best of both worlds—fast iteration cycles and reliable operation.
              </p>
            </div>

            <div className="reveal my-12 rounded-xl overflow-hidden border border-white/[0.04]">
              <Image
                src="/images/lessons-from-210-hours/security-threats.webp"
                alt="Abstract representation of digital threats — red warning signals penetrating through layers of defenses in a dark cyber environment"
                width={1536}
                height={1024}
                className="w-full h-auto"
              />
            </div>

            <div className="reveal">
              <h2 className="article-h2">Security: The Wake-Up Call</h2>

              <p className="article-p">
                Around hour 130, Alex experienced what he calls his "security wake-up call." A skill he installed to automate social media posting had broader permissions than advertised. It started making API calls he didn't authorize, burning through rate limits and potentially exposing sensitive data.
              </p>

              <p className="article-p">
                The incident wasn't malicious, just poorly written code with excessive permissions. But it drove home a crucial reality: OpenClaw agents have significant system access, and every skill you install inherits those permissions. Security isn't optional—it's the foundation everything else builds on.
              </p>
            </div>

            <SecurityLayersDiagram />

            <div className="reveal">
              <h3 className="article-h3">The Essential Security Checklist</h3>
              
              <p className="article-p">
                Alex's current security practices evolved from that wake-up call. He now treats every skill installation like a code review, runs agents with limited user permissions, and maintains air-gapped environments for testing untrusted code.
              </p>
            </div>

            <EditorialAside title="Critical Security Measures" variant="warning">
              <p><strong>Skill auditing:</strong> Read the source code before installation. No exceptions.</p>
              <p><strong>Limited permissions:</strong> Run agents as non-admin users with minimal necessary access</p>
              <p><strong>Network isolation:</strong> Use firewall rules to restrict outbound connections</p>
              <p><strong>Regular monitoring:</strong> Check logs daily for unexpected activity</p>
              <p><strong>Backup strategy:</strong> Automated daily backups with point-in-time recovery</p>
            </EditorialAside>

            <CodeBlock language="bash">{`# Alex's security-focused OpenClaw setup
# Create dedicated user
adduser openclaw-agent --disabled-password

# Restrict shell access
chsh -s /usr/sbin/nologin openclaw-agent

# Firewall rules (whitelist approach)
ufw default deny outgoing
ufw allow out 53/tcp    # DNS
ufw allow out 80/tcp    # HTTP
ufw allow out 443/tcp   # HTTPS
ufw allow out 587/tcp   # SMTP
# Add specific API endpoints as needed

# Log monitoring (fail2ban for automated response)
apt install -y fail2ban
# Custom rules for OpenClaw anomaly detection`}</CodeBlock>

            <div className="reveal">
              <h3 className="article-h3">The Skill Trust Hierarchy</h3>
              
              <p className="article-p">
                Not all skills are created equal. Alex developed a trust hierarchy for evaluating skills: Core team skills get automatic trust, community skills require source review, and personal/experimental skills get sandboxed testing before production deployment.
              </p>
            </div>

            <div className="reveal my-12 rounded-xl overflow-hidden border border-white/[0.04]">
              <Image
                src="/images/lessons-from-210-hours/optimization-insights.webp"
                alt="Crystalline structures representing optimized systems — geometric patterns of efficiency glowing with teal and amber light"
                width={1536}
                height={1024}
                className="w-full h-auto"
              />
            </div>

            <div className="reveal">
              <h2 className="article-h2">Performance & Optimization: What Actually Matters</h2>

              <p className="article-p">
                The feature addiction phase (hours 50-100) taught Alex valuable lessons about performance. Adding every available skill and webhook seemed like maximizing OpenClaw's potential. Instead, it created a bloated system with unclear behavior, slow responses, and maintenance overhead that consumed more time than the automation saved.
              </p>

              <p className="article-p">
                The turning point came during a performance crisis where his agent started timing out on simple requests. The problem wasn't hardware—it was architectural. Too many skills meant too much context loading, too many webhook endpoints meant too much noise, and too many cron jobs meant resource contention.
              </p>
            </div>

            <div className="reveal">
              <h3 className="article-h3">The 80/20 Rule for Agent Configuration</h3>
              
              <p className="article-p">
                Alex's current setup uses 6 skills that handle 80% of his automation needs: email management, calendar integration, weather alerts, social media posting, file operations, and system monitoring. Everything else got removed or moved to manual on-demand installation.
              </p>
            </div>

            <EditorialAside title="Alex's Lean Configuration" variant="info">
              <p><strong>Active skills:</strong> 6 core skills for daily workflows</p>
              <p><strong>Webhooks:</strong> 3 endpoints (email, calendar, GitHub) with filtered triggers</p>
              <p><strong>Cron jobs:</strong> 4 scheduled tasks (morning briefing, evening summary, weekly review, monthly cleanup)</p>
              <p><strong>Heartbeat interval:</strong> 45 minutes (reduced from default 30 for battery life)</p>
            </EditorialAside>

            <div className="reveal">
              <h3 className="article-h3">Memory and State Management</h3>
              
              <p className="article-p">
                One of Alex's biggest insights involves memory management. OpenClaw's markdown-based memory system is elegant, but it requires maintenance. Files grow indefinitely without pruning, context windows get polluted with irrelevant history, and the agent's personality can drift over time without periodic memory curation.
              </p>
            </div>

            <CodeBlock language="bash">{`# Alex's weekly memory maintenance script
#!/bin/bash

cd ~/.openclaw/agents/main

# Archive old daily logs (keep last 30 days)
find memory/ -name "*.md" -mtime +30 -exec mv {} archive/ \\;

# Compress large session files
find sessions/ -name "*.json" -size +10M -exec gzip {} \\;

# Clean temporary files
rm -rf /tmp/openclaw-*

# Update core memory with weekly review
echo "$(date): Weekly maintenance completed" >> memory/system.md`}</CodeBlock>

            <div className="reveal">
              <h2 className="article-h2">The Workflow Evolution</h2>

              <p className="article-p">
                Alex's usage patterns evolved significantly over 210 hours. Early on, he tried to automate everything. By hour 150, he learned to distinguish between tasks that should be automated, tasks that should be assisted, and tasks that should remain manual.
              </p>

              <p className="article-p">
                The sweet spot isn't full automation—it's intelligent assistance. His agent handles routine information gathering, monitors for important events, and provides context-rich summaries. But complex decisions, creative work, and anything requiring nuanced judgment remains human-driven with AI support.
              </p>
            </div>

            <div className="reveal">
              <h3 className="article-h3">The Three Automation Tiers</h3>
            </div>

            <EditorialAside title="Alex's Automation Framework">
              <p><strong>Tier 1 - Full Automation:</strong> Weather alerts, calendar reminders, system backups, routine status checks. Clear triggers, predictable actions, low risk.</p>
              <p><strong>Tier 2 - Assisted Manual:</strong> Email drafting, research summarization, meeting preparation. AI provides content, human reviews and decides.</p>
              <p><strong>Tier 3 - Manual Only:</strong> Strategic decisions, sensitive communications, creative projects, anything involving money or commitments.</p>
            </EditorialAside>

            <PullQuote>
              "The goal isn't to replace human judgment—it's to augment it with better information, faster context switching, and fewer routine distractions." — Alex Finn
            </PullQuote>

            <div className="reveal">
              <h2 className="article-h2">The Hard-Won Lessons</h2>

              <p className="article-p">
                After 210 hours, Alex's most valuable insights aren't technical—they're operational. How to maintain the system long-term, how to prevent configuration drift, how to upgrade safely, and how to troubleshoot when things break (and they will break).
              </p>
            </div>

            <div className="reveal">
              <h3 className="article-h3">Maintenance Rhythms</h3>
              
              <p className="article-p">
                Alex established maintenance rhythms that prevent the slow degradation that kills automation projects. Daily log reviews catch issues early, weekly memory curation prevents personality drift, monthly security audits catch permission creep, and quarterly skill reviews remove unused functionality.
              </p>
            </div>

            <div className="reveal">
              <h3 className="article-h3">Documentation as Insurance</h3>
              
              <p className="article-p">
                "Document everything" sounds obvious, but Alex's approach is specific: document not what the system does, but why you configured it that way. Future you (and anyone inheriting the system) needs to understand the reasoning behind configuration choices to make intelligent changes.
              </p>
            </div>

            <CodeBlock language="yaml">{`# Alex's config.yml with decision rationale
heartbeat:
  interval: 45m  # 45min instead of 30min - laptop battery optimization
  
cron_jobs:
  - name: "morning_briefing"
    schedule: "0 7 * * *"  # 7am daily
    # Rationale: Need weather/calendar before commute decisions
    
  - name: "evening_summary"  
    schedule: "0 21 * * *"  # 9pm daily
    # Rationale: Review day, prepare tomorrow, but not too late
    
skills:
  weather:
    enabled: true
    api_key: \${WEATHER_API_KEY}
    # Rationale: Critical for commute/outdoor activity decisions
    
  # Disabled experimental skills (kept for reference)
  # social_media_bulk_poster:  
  #   enabled: false
  #   # Rationale: Too risky, prefer manual posting with AI drafts`}</CodeBlock>

            <div className="reveal">
              <h3 className="article-h3">The Upgrade Strategy</h3>
              
              <p className="article-p">
                OpenClaw moves fast, and Alex learned that staying current requires strategy. He now maintains a staging environment that mirrors production, tests updates there first, and maintains rollback procedures for when upgrades break working configurations.
              </p>
            </div>

            <div className="reveal">
              <h2 className="article-h2">What's Next: The Road to 500 Hours</h2>

              <p className="article-p">
                Alex's 210-hour journey represents mastery of the fundamentals, but he's already identifying the next learning phase. Multi-agent architectures, custom skill development, integration with specialized hardware, and advanced security postures that could enable new use cases.
              </p>

              <p className="article-p">
                More importantly, he's moving from individual optimization to community contribution. The insights from his 210 hours are now feeding back into skill development, documentation improvements, and mentoring other users through their own learning curves.
              </p>
            </div>

            <div className="reveal">
              <h2 className="article-h2">The Bottom Line</h2>

              <p className="article-p">
                OpenClaw isn't plug-and-play automation—it's a framework for building personalized AI assistance. The learning curve is real, the security implications are serious, and the maintenance overhead is non-zero. But for users willing to invest the time and thought, it enables a level of AI integration that commercial solutions can't match.
              </p>

              <p className="article-p">
                Alex's 35-minute video went viral because it acknowledged this reality while providing a roadmap through the complexity. His journey from setup hell to mastery proves that the learning curve, while steep, is climbable with the right approach and realistic expectations.
              </p>
            </div>

            <PullQuote>
              "210 hours taught me that OpenClaw isn't about replacing human intelligence—it's about amplifying it. The agents handle the information gathering, pattern recognition, and routine execution. I handle the strategy, creativity, and judgment. Together, we're more capable than either could be alone."
            </PullQuote>

            {/* ── Explore Further Section ──────────────── */}
            <div className="reveal">
              <h2 className="article-h2">Start Your Own Journey</h2>
              <div className="space-y-4">
                <p className="article-p">
                  <a 
                    href="https://railway.app/template/openclaw" 
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-[#F59E0B] hover:text-[#FF4D4D] transition-colors font-medium decoration-none border-b border-[#F59E0B]/30 hover:border-[#FF4D4D]/50"
                  >
                    Try Railway one-click deploy → <ExternalLinkIcon />
                  </a>
                </p>
                <p className="article-p">
                  <Link 
                    href="/how-openclaw-works" 
                    className="inline-flex items-center gap-2 text-[#00E5CC] hover:text-[#F59E0B] transition-colors font-medium decoration-none border-b border-[#00E5CC]/30 hover:border-[#F59E0B]/50"
                  >
                    Understand the architecture →
                  </Link>
                </p>
                <p className="article-p">
                  <Link 
                    href="/browse" 
                    className="inline-flex items-center gap-2 text-[#FF4D4D] hover:text-[#00E5CC] transition-colors font-medium decoration-none border-b border-[#FF4D4D]/30 hover:border-[#00E5CC]/50"
                  >
                    Browse skills marketplace →
                  </Link>
                </p>
                <p className="article-p">
                  <a 
                    href="https://x.com/i/status/2023439732328525890" 
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-[#8B5CF6] hover:text-[#F59E0B] transition-colors font-medium decoration-none border-b border-[#8B5CF6]/30 hover:border-[#F59E0B]/50"
                  >
                    Watch Alex's full 35-minute breakdown → <ExternalLinkIcon />
                  </a>
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

        .noise-overlay {
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='1' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E");
        }
      `}</style>
    </div>
  );
}