"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef } from "react";
import { SiteNavbar } from "@/components/navbar";
import { Footer } from "@/components/footer";

function ClockIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}>
      <circle cx="12" cy="12" r="10" />
      <polyline points="12,6 12,12 16,14" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function CalendarIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}>
      <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
      <line x1="16" y1="2" x2="16" y2="6" />
      <line x1="8" y1="2" x2="8" y2="6" />
      <line x1="3" y1="10" x2="21" y2="10" />
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

interface Article {
  slug: string;
  title: string;
  description: string;
  readTime: string;
  date: string;
  image: string;
}

const articles: Article[] = [
  {
    slug: "how-openclaw-works",
    title: "How OpenClaw Works",
    description: "Architecture deep dive into the gateway, inputs, heartbeats, cron jobs, webhooks, and the event loop that makes AI agents feel proactive and alive.",
    readTime: "12 min read",
    date: "Feb 15, 2026",
    image: "/images/how-openclaw-works/hero-event-loop.webp"
  },
  {
    slug: "lessons-from-210-hours",
    title: "Lessons from 210 Hours with OpenClaw",
    description: "Alex Finn's comprehensive guide to OpenClaw mastery: setup strategies, VPS vs local deployment, security best practices, and hard-won insights from real-world usage.",
    readTime: "18 min read",
    date: "Feb 16, 2026",
    image: "/images/lessons-from-210-hours/hero-experience.webp"
  }
];

function ArticleCard({ article }: { article: Article }) {
  return (
    <Link 
      href={`/learn/${article.slug}`}
      className="reveal group block bg-[#110B07]/60 rounded-xl border border-white/[0.08] hover:border-white/20 transition-all duration-300 overflow-hidden hover:transform hover:scale-[1.02] hover:shadow-xl hover:shadow-[#FF4D4D]/10"
    >
      <div className="aspect-video relative overflow-hidden">
        <Image
          src={article.image}
          alt={article.title}
          width={600}
          height={340}
          className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0A0604]/80 via-transparent to-transparent" />
      </div>
      
      <div className="p-6">
        <h2 className="text-xl font-semibold text-white group-hover:text-[#FF4D4D] transition-colors duration-200 mb-3 leading-tight">
          {article.title}
        </h2>
        
        <p className="text-white/70 leading-relaxed mb-4 line-clamp-3">
          {article.description}
        </p>
        
        <div className="flex items-center gap-4 text-sm text-white/50 font-mono">
          <div className="flex items-center gap-1.5">
            <ClockIcon />
            <span>{article.readTime}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <CalendarIcon />
            <span>{article.date}</span>
          </div>
        </div>
      </div>
    </Link>
  );
}

export function LearnContent() {
  const revealRef = useReveal();

  return (
    <div className="min-h-screen bg-[#0A0604]" ref={revealRef}>
      <SiteNavbar />
      
      <div className="pt-20 pb-24">
        <div className="max-w-7xl mx-auto px-6 sm:px-8">
          {/* Header */}
          <div className="text-center mb-16">
            <h1 className="reveal text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight tracking-tight">
              Learn — OpenClaw
              <span className="block bg-gradient-to-r from-[#FF4D4D] via-[#F97316] to-[#00E5CC] bg-clip-text text-transparent">
                Guides, Deep Dives & Tutorials
              </span>
            </h1>
            <p className="reveal text-xl text-white/70 max-w-3xl mx-auto leading-relaxed">
              Master OpenClaw with comprehensive guides, architectural deep dives, and hard-won lessons from real-world experience.
            </p>
          </div>

          {/* Articles Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {articles.map((article) => (
              <ArticleCard key={article.slug} article={article} />
            ))}
          </div>

          {/* Coming Soon Section */}
          <div className="reveal mt-20 text-center">
            <div className="bg-[#110B07]/60 rounded-xl border border-white/[0.08] p-8 max-w-2xl mx-auto">
              <h3 className="text-2xl font-semibold text-white mb-4">More Guides Coming Soon</h3>
              <p className="text-white/70 leading-relaxed">
                We're working on additional tutorials covering skill development, advanced deployment strategies, 
                and integration patterns. Follow <a 
                  href="https://x.com/openclaw" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-[#FF4D4D] hover:text-[#F97316] transition-colors font-mono"
                >
                  @openclaw
                </a> for updates.
              </p>
            </div>
          </div>
        </div>
      </div>

      <Footer />
      
      <style jsx global>{`
        .reveal {
          opacity: 0;
          transform: translateY(30px);
          transition: all 0.8s cubic-bezier(0.4, 0, 0.2, 1);
        }
        
        .reveal.visible {
          opacity: 1;
          transform: translateY(0);
        }
        
        .line-clamp-3 {
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </div>
  );
}