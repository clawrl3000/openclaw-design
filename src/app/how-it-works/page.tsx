import { HowItWorksContent } from "@/components/how-it-works-content";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "How It Works — OpenClaw Marketplace",
  description:
    "Buy a skill, drop it in your skills/ folder, and your OpenClaw agent picks it up on next run. Five steps, under 60 seconds, $5–9 per skill.",
  openGraph: {
    title: "How It Works — OpenClaw Marketplace",
    description:
      "Five steps. Under 60 seconds. Buy a skill, drop it in, your agent runs it.",
    url: "https://openclaw.design/how-it-works",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "How It Works — OpenClaw Marketplace",
    description:
      "Five steps. Under 60 seconds. Buy a skill, drop it in, your agent runs it.",
  },
  alternates: {
    canonical: "https://openclaw.design/how-it-works",
  },
};

/* HowTo JSON-LD structured data for Google rich results */
const howToJsonLd = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  name: "How to Install an OpenClaw Skill",
  description:
    "Buy a skill from the OpenClaw Marketplace, download it, and drop it into your agent's skills folder. Under 60 seconds.",
  totalTime: "PT1M",
  estimatedCost: {
    "@type": "MonetaryAmount",
    currency: "USD",
    value: "5-9",
  },
  step: [
    {
      "@type": "HowToStep",
      position: 1,
      name: "Browse the Marketplace",
      text: "Visit the OpenClaw Marketplace and explore skills by category, rating, or price. Each skill page shows the full bundle contents, real ratings, and a feature-by-feature breakdown.",
      url: "https://openclaw.design/#skills",
    },
    {
      "@type": "HowToStep",
      position: 2,
      name: "Add to Cart & Checkout",
      text: "Skills are $5–9 each, one-time purchase. Add what you need, checkout, and you own the full source code forever. No subscriptions or recurring charges.",
    },
    {
      "@type": "HowToStep",
      position: 3,
      name: "Download Your Files",
      text: "Receive the SKILL.md, scripts, config templates, and documentation in under 10 seconds. Everything you need, nothing you don't.",
    },
    {
      "@type": "HowToStep",
      position: 4,
      name: "Drop Into Your Skills Folder",
      text: "Copy the downloaded files into your OpenClaw workspace's skills/ directory. No build step, no compilation, no configuration wizard.",
    },
    {
      "@type": "HowToStep",
      position: 5,
      name: "Your Agent Runs It",
      text: "Next time your agent runs, it reads the new skill and starts using it immediately. No restart needed — OpenClaw was built this way.",
    },
  ],
};

export default function HowItWorksPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(howToJsonLd) }}
      />
      <HowItWorksContent />
    </>
  );
}
