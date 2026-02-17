import Image from "next/image";
import Link from "next/link";
import { SiteNavbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import type { Metadata } from "next";
import { LearnContent } from "@/components/learn-content";

export const metadata: Metadata = {
  title: "Learn — OpenClaw Guides, Deep Dives & Tutorials",
  description:
    "Master OpenClaw with comprehensive guides, architectural deep dives, and hard-won lessons from real-world experience. Learn AI agent deployment, security, and optimization.",
  openGraph: {
    title: "Learn — OpenClaw Guides, Deep Dives & Tutorials",
    description:
      "Comprehensive guides and tutorials for mastering OpenClaw AI agents: architecture, deployment, security, and real-world best practices.",
    url: "https://openclaw.design/learn",
    type: "website",
    siteName: "OpenClaw",
  },
  twitter: {
    card: "summary_large_image",
    title: "Learn — OpenClaw Guides & Tutorials",
    description:
      "Master OpenClaw AI agents with comprehensive guides, deep dives, and real-world lessons from experienced users.",
  },
  alternates: {
    canonical: "https://openclaw.design/learn",
  },
  keywords: [
    "OpenClaw tutorials",
    "OpenClaw guides",
    "AI agent training",
    "OpenClaw architecture",
    "AI agent deployment",
    "OpenClaw setup",
    "AI agent best practices",
    "OpenClaw documentation",
    "AI agent security",
    "OpenClaw optimization",
    "AI agent development",
    "OpenClaw learning resources",
  ],
  robots: {
    index: true,
    follow: true,
  },
};

/* CollectionPage JSON-LD structured data for Google rich results */
const collectionJsonLd = {
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  name: "Learn — OpenClaw Guides, Deep Dives & Tutorials",
  description:
    "Master OpenClaw with comprehensive guides, architectural deep dives, and hard-won lessons from real-world experience.",
  url: "https://openclaw.design/learn",
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
  mainEntity: {
    "@type": "ItemList",
    numberOfItems: 2,
    itemListElement: [
      {
        "@type": "Article",
        position: 1,
        name: "How OpenClaw Works",
        description: "Architecture deep dive into the gateway, inputs, heartbeats, cron jobs, webhooks, and the event loop that makes AI agents feel proactive and alive.",
        url: "https://openclaw.design/learn/how-openclaw-works",
        image: "https://openclaw.design/images/how-openclaw-works/hero-event-loop.webp",
        datePublished: "2026-02-15T00:00:00.000Z",
        author: {
          "@type": "Organization",
          name: "OpenClaw",
        },
      },
      {
        "@type": "Article",
        position: 2,
        name: "Lessons from 210 Hours with OpenClaw",
        description: "Alex Finn's comprehensive guide to OpenClaw mastery: setup strategies, VPS vs local deployment, security best practices, and hard-won insights from real-world usage.",
        url: "https://openclaw.design/learn/lessons-from-210-hours",
        image: "https://openclaw.design/images/lessons-from-210-hours/hero-experience.webp",
        datePublished: "2026-02-16T00:00:00.000Z",
        author: [
          {
            "@type": "Person",
            name: "Alex Finn",
          },
          {
            "@type": "Organization",
            name: "OpenClaw Community",
          },
        ],
      },
    ],
  },
  breadcrumb: {
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: "https://openclaw.design",
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Learn",
        item: "https://openclaw.design/learn",
      },
    ],
  },
  about: [
    {
      "@type": "Thing",
      name: "AI Agent Architecture",
      description: "Technical architecture and design patterns for AI agents",
    },
    {
      "@type": "Thing",
      name: "OpenClaw Framework",
      description: "Open-source AI agent runtime and development framework",
    },
    {
      "@type": "Thing",
      name: "AI Agent Deployment",
      description: "Best practices for deploying and managing AI agents in production",
    },
  ],
  inLanguage: "en-US",
};

export default function LearnPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionJsonLd) }}
      />
      <LearnContent />
    </>
  );
}