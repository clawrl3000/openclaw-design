'use client';

import { Button } from "@heroui/react";
import { SiteNavbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import Link from 'next/link';
import { useState } from 'react';

function SettingsIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
      <circle cx="12" cy="12" r="3"/>
      <path d="M12 1v6m0 6v6"/>
      <path d="m21 12-6-3.5M3 12l6-3.5M21 12l-6 3.5M3 12l6 3.5"/>
    </svg>
  );
}

function CreditCardIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
      <rect width="20" height="14" x="2" y="5" rx="2"/>
      <line x1="2" x2="22" y1="10" y2="10"/>
    </svg>
  );
}

function DiscordIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
      <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515a.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0a12.64 12.64 0 0 0-.617-1.25a.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057a19.9 19.9 0 0 0 5.993 3.03a.078.078 0 0 0 .084-.028a14.09 14.09 0 0 0 1.226-1.994a.076.076 0 0 0-.041-.106a13.107 13.107 0 0 1-1.872-.892a.077.077 0 0 1-.008-.128a10.2 10.2 0 0 0 .372-.292a.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127a12.299 12.299 0 0 1-1.873.892a.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028a19.839 19.839 0 0 0 6.002-3.03a.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419c0-1.333.956-2.419 2.157-2.419c1.21 0 2.176 1.096 2.157 2.42c0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419c0-1.333.955-2.419 2.157-2.419c1.21 0 2.176 1.096 2.157 2.42c0 1.333-.946 2.418-2.157 2.418z"/>
    </svg>
  );
}

function ArrowRightIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
    </svg>
  );
}

export default function ManagePage() {
  const [isLoading, setIsLoading] = useState(false);

  const handlePortalClick = async () => {
    setIsLoading(true);
    try {
      const response = await fetch('/api/community/portal', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
      });
      
      if (!response.ok) {
        throw new Error('Failed to create portal session');
      }
      
      const { url } = await response.json();
      window.location.href = url;
    } catch (error) {
      console.error('Portal error:', error);
      setIsLoading(false);
      // Handle error - could show a toast/alert
    }
  };
  // TODO: Replace with real Discord invite link when available
  const discordInviteUrl = "https://discord.gg/openclaw-community"; // Placeholder

  return (
    <div className="min-h-screen flex flex-col bg-[#0A0604]">
      <SiteNavbar />
      
      <main className="flex-1 px-4 sm:px-6 pt-28 pb-20">
        <div className="max-w-2xl mx-auto">
          
          {/* Header */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-[#FF4D4D]/20 to-[#F97316]/20 rounded-full mb-6">
              <SettingsIcon />
            </div>
            
            <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-white mb-4">
              Manage Your{" "}
              <span className="bg-gradient-to-r from-[#FF4D4D] to-[#F97316] bg-clip-text text-transparent">
                Community
              </span>{" "}
              Subscription
            </h1>
            
            <p className="text-lg text-white/70 leading-relaxed">
              Update payment details, view billing history, or manage your subscription settings.
            </p>
          </div>

          {/* Current Status */}
          <div className="bg-[#1E1510]/30 border border-[#2D221C] rounded-xl p-8 mb-8">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-xl font-bold text-white mb-2">Community Membership</h2>
                <div className="flex items-center gap-2">
                  <span className="inline-flex items-center px-2 py-1 bg-[#10B981]/20 border border-[#10B981]/30 rounded-full text-xs font-medium text-[#10B981]">
                    Active
                  </span>
                  <span className="text-white/60">$19.00/month</span>
                </div>
              </div>
              <div className="text-right">
                <p className="text-sm text-white/60">Next billing date</p>
                <p className="text-white font-mono">Mar 16, 2026</p>
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-3">
              <Button
                onClick={handlePortalClick}
                isLoading={isLoading}
                size="lg"
                className="w-full font-mono font-semibold bg-[#FF4D4D] text-white hover:bg-[#E63E3E] border-0 rounded-lg"
              >
                <CreditCardIcon />
                {isLoading ? 'Loading...' : 'Manage Subscription'}
                <ArrowRightIcon />
              </Button>
            </div>
            
            <p className="text-xs text-white/50 mt-3">
              Manage billing details, update payment method, download invoices, or cancel your subscription 
              through our secure billing portal powered by Stripe.
            </p>
          </div>

          {/* Discord Access */}
          <div className="bg-gradient-to-r from-[#5865F2]/10 to-[#7289DA]/10 border border-[#5865F2]/20 rounded-xl p-8 mb-8">
            <div className="flex items-center mb-4">
              <DiscordIcon />
              <h3 className="text-lg font-bold text-white ml-3">Discord Community Access</h3>
            </div>
            
            <p className="text-white/70 mb-6">
              Your membership includes full access to our private Discord community. Join conversations, 
              ask questions, and connect with other OpenClaw users.
            </p>
            
            <Button
              as="a"
              href={discordInviteUrl}
              target="_blank"
              rel="noopener noreferrer"
              size="md"
              className="font-mono bg-[#5865F2] text-white hover:bg-[#4752C4] border-0 rounded-lg"
            >
              <DiscordIcon />
              Join Discord
              <ArrowRightIcon />
            </Button>
          </div>

          {/* Help Section */}
          <div className="bg-[#1E1510]/20 border border-[#2D221C] rounded-xl p-8">
            <h3 className="text-lg font-bold text-white mb-4">Need Help?</h3>
            
            <div className="space-y-4">
              <div>
                <h4 className="text-white font-medium mb-1">Billing Questions</h4>
                <p className="text-sm text-white/60 mb-2">
                  Issues with payments, invoices, or subscription changes? Use the Stripe billing portal above 
                  or contact our support team.
                </p>
              </div>
              
              <div>
                <h4 className="text-white font-medium mb-1">Discord Access</h4>
                <p className="text-sm text-white/60 mb-2">
                  Can't access the Discord server? Make sure your subscription is active and try the invite link again. 
                  If you're still having issues, reach out in the community or email support.
                </p>
              </div>
              
              <div>
                <h4 className="text-white font-medium mb-1">Account Issues</h4>
                <p className="text-sm text-white/60 mb-2">
                  For other account-related questions or technical support, please email us at{" "}
                  <a href="mailto:support@openclaw.design" className="text-[#F59E0B] hover:text-[#F97316]">
                    support@openclaw.design
                  </a>
                </p>
              </div>
            </div>
          </div>

          {/* Back to Community */}
          <div className="text-center mt-8">
            <Link 
              href="/community" 
              className="inline-flex items-center gap-2 text-white/60 hover:text-white transition-colors font-mono text-sm"
            >
              ← Back to Community Page
            </Link>
          </div>

        </div>
      </main>

      <Footer />
    </div>
  );
}