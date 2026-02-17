'use client';

import { Button } from "@heroui/react";
import { SiteNavbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import Link from 'next/link';
import { useState } from 'react';

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
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 0l1.09 8.26L22 9l-8.26 1.09L12 19l-1.09-8.91L2 9l8.91-1.09L12 0z"/>
      <path d="M19 15l.62 3.74L24 19l-3.74.62L19 24l-.62-3.38L14 19l3.38-.62L19 15z"/>
      <path d="M9 15l.62 3.74L14 19l-3.74.62L9 24l-.62-3.38L4 19l3.38-.62L9 15z"/>
    </svg>
  );
}

export default function CommunityPage() {
  const [isLoading, setIsLoading] = useState(false);

  const handleJoinClick = async () => {
    setIsLoading(true);
    try {
      const response = await fetch('/api/community/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
      });
      
      if (!response.ok) {
        throw new Error('Failed to create checkout session');
      }
      
      const { url } = await response.json();
      window.location.href = url;
    } catch (error) {
      console.error('Checkout error:', error);
      setIsLoading(false);
      // Handle error - could show a toast/alert
    }
  };
  return (
    <div className="min-h-screen flex flex-col bg-[#0A0604]">
      <SiteNavbar />
      
      <main className="flex-1 px-4 sm:px-6 pt-28 pb-20">
        <div className="max-w-4xl mx-auto">
          
          {/* Hero Section */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-[#1E1510]/30 border border-[#2D221C] rounded-full text-sm text-white/70 mb-6">
              <SparkleIcon />
              <span className="font-mono">Exclusive Community</span>
            </div>
            
            <h1 className="text-4xl sm:text-6xl font-bold tracking-tight text-white mb-6 leading-[1.1]">
              Join the{" "}
              <span className="bg-gradient-to-r from-[#FF4D4D] to-[#F97316] bg-clip-text text-transparent">
                OpenClaw
              </span>{" "}
              Community
            </h1>
            
            <p className="text-xl text-white/70 leading-relaxed mb-8 max-w-2xl mx-auto">
              Connect with other AI agent builders in our private Discord. Share business ideas, 
              get expert support, and discover new use cases for your OpenClaw agents.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <div className="flex items-center gap-3 px-6 py-3 bg-[#1E1510]/40 border border-[#2D221C] rounded-lg">
                <DiscordIcon />
                <span className="font-mono text-white/80">Private Discord Server</span>
              </div>
              <div className="flex items-center gap-2 text-[#F59E0B] font-mono font-medium">
                <span className="text-2xl">$19</span>
                <span className="text-white/60">/month</span>
              </div>
            </div>
          </div>

          {/* Benefits Grid */}
          <div className="grid md:grid-cols-2 gap-8 mb-16">
            <div className="bg-[#1E1510]/30 border border-[#2D221C] rounded-xl p-8">
              <h3 className="text-xl font-bold text-white mb-4">Business Ideas & Strategies</h3>
              <p className="text-white/70 leading-relaxed mb-4">
                Learn how other members are monetizing their AI agents. From service businesses 
                to SaaS products, discover proven models that work.
              </p>
              <ul className="space-y-2">
                <li className="flex items-center gap-3 text-white/60">
                  <CheckIcon />
                  <span>Case studies from successful members</span>
                </li>
                <li className="flex items-center gap-3 text-white/60">
                  <CheckIcon />
                  <span>Revenue model discussions</span>
                </li>
                <li className="flex items-center gap-3 text-white/60">
                  <CheckIcon />
                  <span>Market opportunity alerts</span>
                </li>
              </ul>
            </div>

            <div className="bg-[#1E1510]/30 border border-[#2D221C] rounded-xl p-8">
              <h3 className="text-xl font-bold text-white mb-4">Expert Support</h3>
              <p className="text-white/70 leading-relaxed mb-4">
                Get help from experienced OpenClaw users and the core team. Debug issues, 
                optimize your setup, and unlock advanced features.
              </p>
              <ul className="space-y-2">
                <li className="flex items-center gap-3 text-white/60">
                  <CheckIcon />
                  <span>Direct access to OpenClaw experts</span>
                </li>
                <li className="flex items-center gap-3 text-white/60">
                  <CheckIcon />
                  <span>Troubleshooting assistance</span>
                </li>
                <li className="flex items-center gap-3 text-white/60">
                  <CheckIcon />
                  <span>Configuration best practices</span>
                </li>
              </ul>
            </div>

            <div className="bg-[#1E1510]/30 border border-[#2D221C] rounded-xl p-8">
              <h3 className="text-xl font-bold text-white mb-4">Skill Sharing</h3>
              <p className="text-white/70 leading-relaxed mb-4">
                Access exclusive skills before they hit the marketplace. Share your own 
                creations and collaborate with other builders.
              </p>
              <ul className="space-y-2">
                <li className="flex items-center gap-3 text-white/60">
                  <CheckIcon />
                  <span>Early access to new skills</span>
                </li>
                <li className="flex items-center gap-3 text-white/60">
                  <CheckIcon />
                  <span>Member-exclusive collaborations</span>
                </li>
                <li className="flex items-center gap-3 text-white/60">
                  <CheckIcon />
                  <span>Skill development workshops</span>
                </li>
              </ul>
            </div>

            <div className="bg-[#1E1510]/30 border border-[#2D221C] rounded-xl p-8">
              <h3 className="text-xl font-bold text-white mb-4">Use Case Discovery</h3>
              <p className="text-white/70 leading-relaxed mb-4">
                See how others are using OpenClaw in creative ways. From home automation 
                to business process automation, get inspired by real implementations.
              </p>
              <ul className="space-y-2">
                <li className="flex items-center gap-3 text-white/60">
                  <CheckIcon />
                  <span>Real-world automation examples</span>
                </li>
                <li className="flex items-center gap-3 text-white/60">
                  <CheckIcon />
                  <span>Industry-specific use cases</span>
                </li>
                <li className="flex items-center gap-3 text-white/60">
                  <CheckIcon />
                  <span>Integration tutorials</span>
                </li>
              </ul>
            </div>
          </div>

          {/* CTA Section */}
          <div className="bg-gradient-to-r from-[#FF4D4D]/10 to-[#F97316]/10 border border-[#FF4D4D]/20 rounded-xl p-8 text-center">
            <h2 className="text-2xl font-bold text-white mb-4">
              Ready to level up your AI agent game?
            </h2>
            <p className="text-white/70 mb-8 max-w-xl mx-auto">
              Join hundreds of OpenClaw users sharing strategies, troubleshooting together, 
              and building the future of AI automation.
            </p>
            
            <Button
              onClick={handleJoinClick}
              isLoading={isLoading}
              size="lg"
              className="font-mono font-semibold text-lg px-8 py-4 bg-gradient-to-r from-[#FF4D4D] to-[#F97316] text-white hover:from-[#E63E3E] hover:to-[#E5640B] border-0 rounded-lg"
            >
              <DiscordIcon />
              {isLoading ? 'Processing...' : 'Join Now - $19/month'}
            </Button>
            
            <p className="text-sm text-white/50 mt-4">
              Cancel anytime. Discord invite sent immediately after payment.
            </p>
            
            <div className="mt-6">
              <Link 
                href="/community/manage" 
                className="text-sm text-[#F59E0B] hover:text-[#F97316] transition-colors font-mono"
              >
                Already a member? Manage subscription →
              </Link>
            </div>
          </div>

          {/* Testimonial Section */}
          <div className="mt-16 text-center">
            <div className="bg-[#1E1510]/20 border border-[#2D221C] rounded-xl p-8 max-w-2xl mx-auto">
              <div className="flex justify-center mb-4">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} width="20" height="20" viewBox="0 0 24 24" fill="#F59E0B">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                  </svg>
                ))}
              </div>
              <blockquote className="text-lg text-white/80 italic mb-4">
                "The Discord community completely transformed how I use OpenClaw. The business 
                ideas alone have paid for the subscription 10x over."
              </blockquote>
              <p className="text-sm text-white/60 font-mono">– Sarah Chen, OpenClaw Member</p>
            </div>
          </div>

        </div>
      </main>

      <Footer />
    </div>
  );
}