"use client";

import { useCart } from "@/context/cart-context";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useCallback, useEffect, useState, useRef } from "react";
import { useSession } from "next-auth/react";

interface PurchasedSkill {
  id: string;
  name: string;
  slug: string;
  price_cents: number;
  currency: string;
  github_repo: string | null;
}

interface SessionData {
  userId: string;
  skills: PurchasedSkill[];
  customerEmail: string | null;
  paymentStatus: string;
  amountTotal: number;
  currency: string;
}

function CheckIcon() {
  return (
    <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  );
}

function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);
  const handleCopy = useCallback(() => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }, [text]);

  return (
    <button
      onClick={handleCopy}
      className="mt-2 text-xs font-mono px-3 py-1.5 rounded-md bg-[#FF4D4D]/10 hover:bg-[#FF4D4D]/20 text-[#FF4D4D] hover:text-[#FF4D4D]/80 transition-colors border border-[#FF4D4D]/20"
    >
      {copied ? "✓ Copied!" : "📋 Copy to clipboard"}
    </button>
  );
}

const GITHUB_OWNER = "openclaw-design";

export function SuccessContent() {
  const searchParams = useSearchParams();
  const sessionId = searchParams?.get("session_id");
  const { clearCart } = useCart();
  const { data: authSession } = useSession();

  const [session, setSession] = useState<SessionData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [inviteSent, setInviteSent] = useState(false);
  const [acceptedSkills, setAcceptedSkills] = useState<Set<string>>(new Set());
  const pollRef = useRef<NodeJS.Timeout | null>(null);

  const githubUsername = (authSession?.user as Record<string, unknown>)?.githubUsername as string | undefined;

  const allAccepted = session?.skills
    ? session.skills.filter(s => s.github_repo).every(s => acceptedSkills.has(s.id))
    : false;

  // Fetch session data and clear the cart
  useEffect(() => {
    if (!sessionId) {
      setError("No session ID found");
      setLoading(false);
      return;
    }

    async function fetchData() {
      try {
        const res = await fetch(`/api/checkout/session?session_id=${sessionId}`);
        if (!res.ok) throw new Error("Failed to load session");
        const data = await res.json();
        setSession(data);
        clearCart();
      } catch {
        setError("Could not load purchase details. Your purchase was still successful — check your email.");
      } finally {
        setLoading(false);
      }
    }

    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sessionId]);

  // Auto-send GitHub invites
  useEffect(() => {
    if (!session || !githubUsername) return;

    const skillsWithRepos = session.skills.filter(s => s.github_repo);
    if (skillsWithRepos.length === 0) return;

    async function sendInvites() {
      try {
        const res = await fetch("/api/user/github", {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ github_username: githubUsername }),
        });
        if (res.ok) {
          setInviteSent(true);
        }
      } catch {
        // Invite failed — user will see the pending state
      }
    }

    sendInvites();
  }, [session, githubUsername]);

  // Poll for invite acceptance
  useEffect(() => {
    if (!session || !inviteSent || allAccepted) return;

    const skillIds = session.skills.filter(s => s.github_repo).map(s => s.id);
    if (skillIds.length === 0) return;

    async function checkStatus() {
      try {
        const res = await fetch(`/api/purchases/status?skill_ids=${skillIds.join(",")}`);
        if (!res.ok) return;
        const data = await res.json();
        const newAccepted = new Set(acceptedSkills);
        for (const r of data.results) {
          if (r.accepted) newAccepted.add(r.skill_id);
        }
        setAcceptedSkills(newAccepted);
      } catch {
        // silently retry next poll
      }
    }

    // Check immediately
    checkStatus();

    // Then poll every 3 seconds
    pollRef.current = setInterval(checkStatus, 3000);

    return () => {
      if (pollRef.current) clearInterval(pollRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [session, inviteSent, allAccepted]);

  if (loading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="animate-spin w-8 h-8 border-2 border-[#FF4D4D]/30 border-t-[#FF4D4D] rounded-full mx-auto" />
          <p className="font-mono text-sm text-white/40">Loading purchase details…</p>
        </div>
      </div>
    );
  }

  if (error && !session) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center px-6">
        <div className="max-w-md text-center space-y-4">
          <div className="text-emerald-400 mx-auto w-fit"><CheckIcon /></div>
          <h1 className="font-mono font-bold text-2xl text-white">Payment received</h1>
          <p className="font-mono text-sm text-white/50 leading-relaxed">{error}</p>
          <Link href="/" className="inline-block font-mono text-sm text-[#FF4D4D] hover:text-[#FF4D4D]/80 transition-colors mt-4">
            ← Back to marketplace
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-[60vh] flex items-center justify-center px-6 py-16">
      <div className="max-w-lg w-full space-y-8">
        {/* Header */}
        <div className="text-center space-y-4">
          <div className="text-emerald-400 mx-auto w-fit animate-[fadeIn_0.5s_ease-out]">
            <CheckIcon />
          </div>
          <h1 className="font-mono font-bold text-2xl md:text-3xl text-white">
            You&apos;re in!
          </h1>
          <p className="font-mono text-sm text-white/50 leading-relaxed max-w-sm mx-auto">
            {allAccepted
              ? "You're all set. Install your skills below."
              : "One more step — accept your GitHub invitation to unlock your skills."}
          </p>
        </div>

        {/* GitHub status */}
        {githubUsername && (
          <div className={`rounded-xl p-4 ${
            allAccepted
              ? "bg-emerald-500/5 border border-emerald-500/20"
              : "bg-amber-500/5 border border-amber-500/20"
          }`}>
            <div className="flex items-center gap-3">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61-.546-1.385-1.335-1.755-1.335-1.755-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 21.795 24 17.295 24 12c0-6.63-5.37-12-12-12z" />
              </svg>
              <div>
                <p className="font-mono text-sm text-white">
                  Signed in as <span className={allAccepted ? "text-emerald-400" : "text-amber-400"}>@{githubUsername}</span>
                </p>
                <p className={`font-mono text-xs mt-1 ${allAccepted ? "text-emerald-400/70" : "text-amber-400/70"}`}>
                  {allAccepted ? "✓ All repos connected" : "Invitation sent — waiting for you to accept"}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Step 1: Accept invitation (shown when NOT yet accepted) */}
        {!allAccepted && inviteSent && (
          <div className="rounded-xl bg-[#0A0604] border-2 border-amber-500/30 p-5 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-amber-500 rounded-full flex items-center justify-center text-black text-sm font-bold shrink-0 animate-pulse">
                1
              </div>
              <h3 className="font-mono text-base font-semibold text-white">
                Accept Your GitHub Invitation
              </h3>
            </div>
            <p className="font-mono text-xs text-white/50 pl-11">
              We sent you a repo invitation. Click below to open GitHub, then accept the invite. This page updates automatically.
            </p>

            {/* Visual mockup of what the GitHub notification looks like */}
            <div className="pl-11">
              <p className="font-mono text-[10px] text-white/25 uppercase tracking-wider mb-2">You&apos;ll see something like this:</p>
              <div className="rounded-lg border border-[#30363d] bg-[#0d1117] p-3 space-y-2 max-w-sm">
                <div className="flex items-start gap-2.5">
                  <div className="mt-0.5 w-4 h-4 rounded-full bg-[#1f6feb] flex items-center justify-center shrink-0">
                    <svg width="10" height="10" viewBox="0 0 16 16" fill="white"><path d="M2 2.5A2.5 2.5 0 014.5 0h8.75a.75.75 0 01.75.75v12.5a.75.75 0 01-.75.75h-2.5a.75.75 0 110-1.5h1.75v-2h-8a1 1 0 00-.714 1.7.75.75 0 01-1.072 1.05A2.495 2.495 0 012 11.5v-9z"/></svg>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-[11px] text-[#c9d1d9] leading-tight">
                      <span className="font-semibold text-[#58a6ff]">openclaw-design</span> invited you to collaborate on{" "}
                      <span className="font-semibold text-[#58a6ff]">openclaw-design/{session?.skills?.[0]?.github_repo || "skill-name"}</span>
                    </p>
                    <p className="text-[10px] text-[#8b949e] mt-1">just now</p>
                  </div>
                </div>
                <div className="flex gap-2 pl-6">
                  <div className="px-3 py-1 rounded-md bg-[#238636] text-white text-[10px] font-semibold cursor-default">
                    Accept
                  </div>
                  <div className="px-3 py-1 rounded-md bg-[#21262d] border border-[#30363d] text-[#c9d1d9] text-[10px] font-semibold cursor-default">
                    Decline
                  </div>
                </div>
              </div>
              <p className="font-mono text-[10px] text-white/20 mt-1.5">☝️ Click the green <strong>Accept</strong> button on GitHub</p>
            </div>

            <div className="pl-11">
              <a
                href="https://github.com/notifications"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-amber-500 hover:bg-amber-400 text-black font-mono text-sm font-semibold transition-colors"
              >
                Open GitHub Notifications →
              </a>
            </div>
            <div className="pl-11 flex items-center gap-2">
              <div className="animate-spin w-3 h-3 border border-white/20 border-t-amber-400 rounded-full" />
              <p className="font-mono text-[10px] text-white/30">
                Waiting for you to accept…
              </p>
            </div>
          </div>
        )}

        {/* YOUR SKILLS list */}
        {session?.skills && session.skills.length > 0 && (
          <div className="space-y-3">
            <h2 className="font-mono text-xs text-white/30 uppercase tracking-wider">
              Your Skills
            </h2>
            <ul className="space-y-2">
              {session.skills.map((skill) => {
                const accepted = acceptedSkills.has(skill.id);
                return (
                  <li key={skill.id} className="flex items-center gap-3 p-4 rounded-xl bg-[#1E1510] border border-[#2D221C]">
                    <span className="text-white/50">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
                        <polyline points="14,2 14,8 20,8"/>
                      </svg>
                    </span>
                    <div className="flex-1 min-w-0">
                      <p className="font-mono text-sm font-semibold text-white truncate">{skill.name}</p>
                      <p className="font-mono text-xs text-white/30">${(skill.price_cents / 100).toFixed(2)} {skill.currency.toUpperCase()}</p>
                    </div>
                    {accepted ? (
                      <span className="text-xs font-mono text-emerald-400/70 shrink-0 px-3 py-1 rounded-md bg-emerald-500/10">✓ Ready</span>
                    ) : (
                      <span className="text-xs font-mono text-amber-400/70 shrink-0 px-3 py-1 rounded-md bg-amber-500/10 animate-pulse">Pending</span>
                    )}
                  </li>
                );
              })}
            </ul>
          </div>
        )}

        {/* Install instructions — ONLY shown after acceptance */}
        {allAccepted && (
          <div className="space-y-4 animate-[fadeIn_0.5s_ease-out]">
            <h2 className="font-mono text-xs text-white/30 uppercase tracking-wider">
              Install Your Skills
            </h2>

            {session?.skills.map((skill) => {
              const cloneCmd = skill.github_repo
                ? `git clone https://github.com/${GITHUB_OWNER}/${skill.github_repo}.git ~/openclaw/skills/${skill.slug}`
                : null;

              return (
                <div key={skill.id} className="rounded-xl bg-[#0A0604] border border-emerald-500/20 p-5 space-y-4">
                  <h3 className="font-mono text-sm font-semibold text-white">{skill.name}</h3>

                  {/* Primary: Git Clone */}
                  {cloneCmd && (
                    <div className="space-y-2">
                      <p className="font-mono text-xs text-white/50">Paste in your terminal:</p>
                      <div>
                        <pre className="font-mono text-xs text-emerald-400/80 leading-relaxed whitespace-pre-wrap break-all bg-black/30 rounded-lg p-3">
                          <code>{cloneCmd}</code>
                        </pre>
                        <CopyButton text={cloneCmd} />
                      </div>
                    </div>
                  )}

                  {/* Secondary: Download ZIP */}
                  {cloneCmd && (
                    <div className="flex items-center gap-3">
                      <div className="flex-1 h-px bg-white/10" />
                      <span className="font-mono text-[10px] text-white/20 uppercase">or</span>
                      <div className="flex-1 h-px bg-white/10" />
                    </div>
                  )}
                  <a
                    href={`/api/downloads/${skill.id}`}
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-white/5 hover:bg-white/10 text-white/70 hover:text-white font-mono text-xs transition-colors border border-white/10"
                  >
                    ⬇ Download ZIP
                  </a>
                </div>
              );
            })}

            {/* Restart */}
            <div className="rounded-xl bg-[#0A0604] border border-[#2D221C] p-4 space-y-2">
              <p className="font-mono text-xs text-white/50">Then restart your agent to load the new skill:</p>
              <div>
                <pre className="font-mono text-xs text-emerald-400/80 bg-black/30 rounded-lg p-3">
                  <code>openclaw gateway restart</code>
                </pre>
                <CopyButton text="openclaw gateway restart" />
              </div>
            </div>

            {/* Help */}
            <div className="rounded-lg bg-blue-500/5 border border-blue-500/20 p-3">
              <p className="font-mono text-xs text-blue-300 leading-relaxed">
                💡 <strong>Need help?</strong> Each skill repo has setup instructions in its README.
                Join the <a href="https://discord.gg/openclaw" className="underline hover:text-blue-200">Discord</a> if you get stuck.
              </p>
            </div>
          </div>
        )}

        {/* Back link */}
        <div className="text-center pt-4">
          <Link href="/" className="inline-block font-mono text-sm text-[#FF4D4D] hover:text-[#FF4D4D]/80 transition-colors">
            ← Back to marketplace
          </Link>
        </div>
      </div>
    </div>
  );
}
