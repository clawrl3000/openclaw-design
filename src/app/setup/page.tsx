import { SetupWizard } from "@/components/setup-wizard";
import { SiteNavbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Setup Wizard — Build Your AI Employee in 5 Minutes | OpenClaw",
  description:
    "Create your OpenClaw agent configuration files in 5 minutes. Generate SOUL.md, USER.md, AGENTS.md, TOOLS.md, and MEMORY.md — the 5 files that turn a forgetful AI into a reliable employee that knows your business.",
  keywords: [
    "OpenClaw setup",
    "OpenClaw configuration",
    "AI agent setup",
    "AI employee",
    "SOUL.md",
    "AGENTS.md",
    "OpenClaw memory",
    "AI agent memory",
    "OpenClaw getting started",
    "AI assistant configuration",
    "claude agent setup",
    "openclaw tutorial",
  ],
  openGraph: {
    title: "Build Your AI Employee in 5 Minutes — OpenClaw Setup Wizard",
    description:
      "Answer a few questions, download 5 configuration files, and turn OpenClaw into an AI employee that knows your business, remembers your decisions, and never makes the same mistake twice.",
    url: "https://openclaw.design/setup",
    type: "website",
    siteName: "OpenClaw",
  },
  twitter: {
    card: "summary_large_image",
    title: "Build Your AI Employee in 5 Minutes",
    description:
      "Stop configuring. Start onboarding. The OpenClaw Setup Wizard generates your agent's personality, memory, and tools config in one shot.",
  },
  alternates: {
    canonical: "https://openclaw.design/setup",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "OpenClaw Setup Wizard",
  description:
    "Generate AI agent configuration files (SOUL.md, USER.md, AGENTS.md, TOOLS.md, MEMORY.md) for OpenClaw in 5 minutes.",
  url: "https://openclaw.design/setup",
  applicationCategory: "DeveloperApplication",
  operatingSystem: "Any",
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "USD",
  },
  publisher: {
    "@type": "Organization",
    name: "OpenClaw",
    url: "https://openclaw.design",
  },
};

export default function SetupPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <SiteNavbar />

      <main className="flex-1 px-4 sm:px-6 pt-28 pb-20">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <span className="font-mono text-[11px] font-medium text-[#FF4D4D]/60 uppercase tracking-[0.2em] mb-4 inline-block">
            Zero to AI Employee
          </span>

          <h1 className="font-mono text-[36px] sm:text-[48px] font-bold tracking-tight text-white leading-[1.08] mt-3">
            Build Your AI Employee
            <br />
            <span
              className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF6B6B] via-[#FF4D4D] to-[#F97316]"
              style={{
                filter:
                  "drop-shadow(0 0 12px rgba(255,77,77,0.25)) drop-shadow(0 0 32px rgba(249,115,22,0.1))",
              }}
            >
              in 5 Minutes
            </span>
          </h1>

          <p className="mt-5 text-base sm:text-lg text-white/45 max-w-xl mx-auto leading-relaxed">
            Answer a few questions. Get configuration files ready to drop into{" "}
            <span className="text-[#FF4D4D] font-medium">OpenClaw</span>.
          </p>

          {/* Key differentiator */}
          <div className="mt-8 inline-flex items-center gap-3 px-6 py-3 bg-[#1E1510]/60 rounded-full border border-white/[0.06]">
            <div className="w-2 h-2 bg-[#FF4D4D] rounded-full animate-pulse" />
            <span className="font-mono text-sm text-white/70">
              You're not setting up a chatbot. You're{" "}
              <strong className="text-[#FF4D4D]">onboarding an employee</strong>.
            </span>
          </div>
        </div>

        {/* Wizard */}
        <SetupWizard />

        {/* Bottom explanation */}
        <div className="mt-20 max-w-[800px] mx-auto text-center">
          <h2 className="font-mono text-[20px] font-semibold text-white mb-4">
            How This Works
          </h2>
          <div className="grid sm:grid-cols-3 gap-6 text-left">
            <div className="bg-[#1E1510]/40 rounded-lg p-6 border border-white/[0.04]">
              <div className="w-8 h-8 bg-[#FF4D4D]/20 rounded-lg flex items-center justify-center mb-3">
                <span className="text-[#FF4D4D] font-mono font-bold text-sm">1</span>
              </div>
              <h3 className="font-mono text-white font-medium mb-2">Answer Questions</h3>
              <p className="text-white/50 text-sm">
                Tell us about your role, communication style, and what you need help with.
              </p>
            </div>
            
            <div className="bg-[#1E1510]/40 rounded-lg p-6 border border-white/[0.04]">
              <div className="w-8 h-8 bg-[#F97316]/20 rounded-lg flex items-center justify-center mb-3">
                <span className="text-[#F97316] font-mono font-bold text-sm">2</span>
              </div>
              <h3 className="font-mono text-white font-medium mb-2">Generate Config Files</h3>
              <p className="text-white/50 text-sm">
                We create SOUL.md, USER.md, and other files that define your agent's personality and knowledge.
              </p>
            </div>
            
            <div className="bg-[#1E1510]/40 rounded-lg p-6 border border-white/[0.04]">
              <div className="w-8 h-8 bg-[#F59E0B]/20 rounded-lg flex items-center justify-center mb-3">
                <span className="text-[#F59E0B] font-mono font-bold text-sm">3</span>
              </div>
              <h3 className="font-mono text-white font-medium mb-2">Drop & Go</h3>
              <p className="text-white/50 text-sm">
                Download the files, drop them in your OpenClaw workspace, and start your first conversation.
              </p>
            </div>
          </div>

          <div className="mt-8 text-center">
            <p className="text-white/40 text-sm">
              All generation happens in your browser. We never see your responses or configuration files.
            </p>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}