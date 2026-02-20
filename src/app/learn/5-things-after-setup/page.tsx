import { FiveThingsContent } from "@/components/5-things-content";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "5 Things to Do Right After Setting Up OpenClaw — From Glorified ChatGPT to Autonomous Employee",
  description:
    "Turn your OpenClaw from a basic chatbot into an autonomous AI employee. Brain dump context, connect tools, build mission control, create a mission statement, and set proactive expectations.",
  openGraph: {
    title: "5 Things to Do Right After Setting Up OpenClaw",
    description:
      "Brain dump, tool connections, mission control, mission statement, and proactive expectations — the 5 steps that transform OpenClaw from chatbot to autonomous employee.",
    url: "https://openclaw.design/learn/5-things-after-setup",
    type: "article",
    article: {
      publishedTime: "2026-02-21T00:00:00.000Z",
      modifiedTime: "2026-02-21T00:00:00.000Z",
      authors: ["OpenClaw"],
      section: "Getting Started",
      tags: ["OpenClaw", "Setup", "Getting Started", "AI Agents", "Automation", "Mission Control", "Productivity"],
    },
  },
  twitter: {
    card: "summary_large_image",
    title: "5 Things to Do Right After Setting Up OpenClaw",
    description:
      "Transform your OpenClaw from glorified ChatGPT to an autonomous AI employee with these 5 critical steps.",
  },
  alternates: {
    canonical: "https://openclaw.design/learn/5-things-after-setup",
  },
  keywords: [
    "OpenClaw setup",
    "OpenClaw getting started",
    "OpenClaw brain dump",
    "OpenClaw mission control",
    "AI agent setup",
    "OpenClaw productivity",
    "autonomous AI employee",
    "OpenClaw proactive",
    "OpenClaw mission statement",
    "OpenClaw tool connections",
  ],
};

const articleJsonLd = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "5 Things to Do Right After Setting Up OpenClaw",
  description:
    "Turn your OpenClaw from a basic chatbot into an autonomous AI employee with brain dumps, tool connections, mission control, a mission statement, and proactive expectations.",
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
      width: 512,
      height: 512,
    },
    url: "https://openclaw.design",
  },
  datePublished: "2026-02-21T00:00:00.000Z",
  dateModified: "2026-02-21T00:00:00.000Z",
  mainEntityOfPage: {
    "@type": "WebPage",
    "@id": "https://openclaw.design/learn/5-things-after-setup",
  },
  image: "https://openclaw.design/images/5-things/hero-setup.webp",
  articleSection: "Getting Started",
  keywords: "OpenClaw, setup, brain dump, mission control, autonomous AI, productivity",
  wordCount: 2800,
  inLanguage: "en-US",
};

export default function FiveThingsPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />
      <FiveThingsContent />
    </>
  );
}
