'use client';

import { Button } from "@heroui/react";
import { SiteNavbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import Link from 'next/link';

function DiscordIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
      <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515a.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0a12.64 12.64 0 0 0-.617-1.25a.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057a19.9 19.9 0 0 0 5.993 3.03a.078.078 0 0 0 .084-.028a14.09 14.09 0 0 0 1.226-1.994a.076.076 0 0 0-.041-.106a13.107 13.107 0 0 1-1.872-.892a.077.077 0 0 1-.008-.128a10.2 10.2 0 0 0 .372-.292a.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127a12.299 12.299 0 0 1-1.873.892a.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028a19.839 19.839 0 0 0 6.002-3.03a.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419c0-1.333.956-2.419 2.157-2.419c1.21 0 2.176 1.096 2.157 2.42c0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419c0-1.333.955-2.419 2.157-2.419c1.21 0 2.176 1.096 2.157 2.42c0 1.333-.946 2.418-2.157 2.418z"/>
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
    </svg>
  );
}

function SparkleIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 0l1.09 8.26L22 9l-8.26 1.09L12 19l-1.09-8.91L2 9l8.91-1.09L12 0z"/>
      <path d="M19 15l.62 3.74L24 19l-3.74.62L19 24l-.62-3.38L14 19l3.38-.62L19 15z"/>
      <path d="M9 15l.62 3.74L14 19l-3.74.62L9 24l-.62-3.38L4 19l3.38-.62L9 15z"/>
    </svg>
  );
}

export default function WelcomePage() {
  // TODO: Replace with real Discord invite link when available
  const discordInviteUrl = "https://discord.gg/openclaw-community"; // Placeholder

  return (
    <div className="min-h-screen flex flex-col bg-[#0A0604]">
      <SiteNavbar />
      
      <main className="flex-1 px-4 sm:px-6 pt-28 pb-20">
        <div className="max-w-2xl mx-auto text-center">
          
          {/* Success Header */}
          <div className="mb-8">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-[#10B981] to-[#059669] rounded-full mb-6">
              <CheckIcon />
            </div>
            
            <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-white mb-4">
              Welcome to the{" "}
              <span className="bg-gradient-to-r from-[#FF4D4D] to-[#F97316] bg-clip-text text-transparent">
                OpenClaw Community!
              </span>
            </h1>
            
            <p className="text-lg text-white/70 leading-relaxed">
              Your payment was successful! You now have access to our private Discord community.
            </p>
          </div>

          {/* Discord Invite */}
          <div className="bg-gradient-to-r from-[#5865F2]/10 to-[#7289DA]/10 border border-[#5865F2]/20 rounded-xl p-8 mb-8">
            <div className="flex items-center justify-center mb-4">
              <DiscordIcon />
              <h2 className="text-xl font-bold text-white ml-3">Join Our Discord Server</h2>
            </div>
            
            <p className="text-white/70 mb-6">
              Click the button below to join our private Discord community. This invite link is exclusive to paid members.
            </p>
            
            <Button
              as="a"
              href={discordInviteUrl}
              target="_blank"
              rel="noopener noreferrer"
              size="lg"
              className="font-mono font-semibold text-lg px-8 py-4 bg-[#5865F2] text-white hover:bg-[#4752C4] border-0 rounded-lg"
            >
              <DiscordIcon />
              Join Discord Server
            </Button>
            
            <p className="text-sm text-white/50 mt-4">
              Invite link: <code className="bg-[#1E1510] px-2 py-1 rounded font-mono">{discordInviteUrl}</code>
            </p>
          </div>

          {/* Next Steps */}
          <div className="bg-[#1E1510]/30 border border-[#2D221C] rounded-xl p-8 mb-8">
            <h3 className="text-xl font-bold text-white mb-4 flex items-center justify-center gap-2">
              <SparkleIcon />
              Next Steps
            </h3>
            
            <div className="space-y-4 text-left max-w-md mx-auto">
              <div className="flex items-start gap-3">
                <div className="flex items-center justify-center w-6 h-6 bg-[#FF4D4D]/20 rounded-full text-sm font-bold text-[#FF4D4D] flex-shrink-0 mt-0.5">
                  1
                </div>
                <div>
                  <p className="text-white/80 font-medium">Join the Discord</p>
                  <p className="text-sm text-white/60">Click the button above and introduce yourself in #introductions</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <div className="flex items-center justify-center w-6 h-6 bg-[#F97316]/20 rounded-full text-sm font-bold text-[#F97316] flex-shrink-0 mt-0.5">
                  2
                </div>
                <div>
                  <p className="text-white/80 font-medium">Share your setup</p>
                  <p className="text-sm text-white/60">Tell us about your OpenClaw configuration and use cases</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <div className="flex items-center justify-center w-6 h-6 bg-[#F59E0B]/20 rounded-full text-sm font-bold text-[#F59E0B] flex-shrink-0 mt-0.5">
                  3
                </div>
                <div>
                  <p className="text-white/80 font-medium">Explore channels</p>
                  <p className="text-sm text-white/60">Browse #business-ideas, #troubleshooting, and #skill-sharing</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <div className="flex items-center justify-center w-6 h-6 bg-[#00E5CC]/20 rounded-full text-sm font-bold text-[#00E5CC] flex-shrink-0 mt-0.5">
                  4
                </div>
                <div>
                  <p className="text-white/80 font-medium">Ask questions</p>
                  <p className="text-sm text-white/60">Get help from experts and experienced community members</p>
                </div>
              </div>
            </div>
          </div>

          {/* Subscription Management */}
          <div className="bg-[#1E1510]/20 border border-[#2D221C] rounded-lg p-6">
            <h4 className="text-lg font-semibold text-white mb-3">Manage Your Subscription</h4>
            <p className="text-white/60 text-sm mb-4">
              Need to update payment details, pause, or cancel? Access your subscription portal below.
            </p>
            
            <Link 
              href="/community/manage"
              className="inline-flex items-center gap-2 px-4 py-2 bg-[#1E1510] border border-[#2D221C] rounded-lg text-white/80 hover:bg-[#2D221C] transition-colors font-mono text-sm"
            >
              Manage Subscription →
            </Link>
          </div>

        </div>
      </main>

      <Footer />
    </div>
  );
}