import { HowOpenclawWorksContent } from "@/components/how-openclaw-works-content";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "How OpenClaw Works — The Architecture Behind the 'Alive' AI Agent",
  description:
    "Deep dive into OpenClaw's architecture: gateway, inputs, heartbeats, cron jobs, webhooks, and the event loop that makes AI agents feel proactive and alive.",
  openGraph: {
    title: "How OpenClaw Works — The Architecture Behind the 'Alive' AI Agent",
    description:
      "It's not magic. It's inputs, queues, and a loop. Understand the 5 input types that make OpenClaw agents feel proactive.",
    url: "https://openclaw.design/how-openclaw-works",
    type: "article",
    article: {
      publishedTime: "2026-02-15T00:00:00.000Z",
      modifiedTime: "2026-02-15T00:00:00.000Z",
      authors: ["OpenClaw"],
      section: "Technology",
      tags: ["AI Agents", "Architecture", "OpenClaw", "Gateway", "Event Loop", "Automation"],
    },
  },
  twitter: {
    card: "summary_large_image",
    title: "How OpenClaw Works — The Architecture Behind the 'Alive' AI Agent",
    description:
      "It's not magic. It's inputs, queues, and a loop. The 5 input types that make OpenClaw feel alive.",
  },
  alternates: {
    canonical: "https://openclaw.design/how-openclaw-works",
  },
  keywords: [
    "OpenClaw architecture",
    "AI agent gateway",
    "agent runtime",
    "heartbeats",
    "webhooks",
    "cron jobs",
    "event loop",
    "proactive AI",
    "AI agent inputs",
    "OpenClaw explained",
  ],
};

/* Article JSON-LD structured data for Google rich results */
const articleJsonLd = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "How OpenClaw Works — The Architecture Behind the 'Alive' AI Agent",
  description:
    "Deep dive into OpenClaw's architecture: gateway, inputs, heartbeats, cron jobs, webhooks, and the event loop that makes AI agents feel proactive and alive.",
  author: {
    "@type": "Organization",
    name: "OpenClaw",
    url: "https://openclaw.design",
  },
  publisher: {
    "@type": "Organization",
    name: "OpenClaw",
    logo: {
      "@type": "ImageObject",
      url: "https://openclaw.design/logo.png",
    },
  },
  datePublished: "2026-02-15T00:00:00.000Z",
  dateModified: "2026-02-15T00:00:00.000Z",
  mainEntityOfPage: {
    "@type": "WebPage",
    "@id": "https://openclaw.design/how-openclaw-works",
  },
  about: [
    {
      "@type": "Thing",
      name: "AI Agent Architecture",
    },
    {
      "@type": "Thing",
      name: "Event-Driven Systems",
    },
    {
      "@type": "Thing",
      name: "OpenClaw Framework",
    },
  ],
  articleSection: "Technology",
  wordCount: 2500,
  citation: {
    "@type": "VideoObject",
    name: "How OpenClaw Works (YouTube Video)",
    url: "https://youtu.be/CAbrRTu5xcw",
    description: "The original video explaining OpenClaw's architecture",
  },
  relatedLink: [
    "https://openclaw.design/how-it-works",
    "https://openclaw.design/browse"
  ],
};

export default function HowOpenclawWorksPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />
      <HowOpenclawWorksContent />
    </>
  );
}