"use client";

import { useCart } from "@/context/cart-context";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useCallback, useEffect, useState } from "react";

interface PurchasedSkill {
  id: string;
  name: string;
  slug: string;
  price_cents: number;
  currency: string;
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
    <svg
      width="48"
      height="48"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
      />
    </svg>
  );
}

function GitHubIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61-.546-1.385-1.335-1.755-1.335-1.755-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 21.795 24 17.295 24 12c0-6.63-5.37-12-12-12z" />
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
      className="absolute top-3 right-3 text-xs font-mono px-2 py-1 rounded bg-white/5 hover:bg-white/10 text-white/40 hover:text-white/70 transition-colors"
    >
      {copied ? "Copied!" : "Copy"}
    </button>
  );
}

export function SuccessContent() {
  const searchParams = useSearchParams();
  const sessionId = searchParams?.get("session_id");
  const { clearCart } = useCart();

  const [session, setSession] = useState<SessionData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [githubUsername, setGithubUsername] = useState<string>("");
  const [currentGithubUsername, setCurrentGithubUsername] = useState<string | null>(null);
  const [showGithubForm, setShowGithubForm] = useState(false);
  const [githubLoading, setGithubLoading] = useState(false);
  const [githubMessage, setGithubMessage] = useState<string | null>(null);

  // Fetch session data, GitHub username, and clear the cart
  useEffect(() => {
    if (!sessionId) {
      setError("No session ID found");
      setLoading(false);
      return;
    }

    async function fetchData() {
      try {
        // Fetch session data and GitHub username in parallel
        const [sessionRes, githubRes] = await Promise.all([
          fetch(`/api/checkout/session?session_id=${sessionId}`),
          fetch('/api/user/github'),
        ]);

        if (!sessionRes.ok) throw new Error("Failed to load session");
        const sessionData = await sessionRes.json();
        setSession(sessionData);

        // Clear the cart after successful purchase
        clearCart();

        // Check GitHub username
        if (githubRes.ok) {
          const githubData = await githubRes.json();
          setCurrentGithubUsername(githubData.github_username);
          // Show GitHub form if user doesn't have a username set and purchased skills with repos
          if (!githubData.github_username && sessionData.skills?.length > 0) {
            setShowGithubForm(true);
          }
        }
      } catch {
        setError("Could not load purchase details. Your purchase was still successful — check your email for repo invitations.");
      } finally {
        setLoading(false);
      }
    }

    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sessionId]);

  // Handle GitHub username submission
  const handleGithubSubmit = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();
    if (!githubUsername.trim()) return;

    setGithubLoading(true);
    setGithubMessage(null);

    try {
      const res = await fetch('/api/user/github', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ github_username: githubUsername }),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error || 'Failed to update GitHub username');
      }

      const data = await res.json();
      setCurrentGithubUsername(githubUsername);
      setShowGithubForm(false);
      setGithubMessage(
        `GitHub username updated! ${data.invitations_sent} repo invitations sent successfully.`
      );
    } catch (error) {
      setGithubMessage(
        error instanceof Error ? error.message : 'Failed to update GitHub username'
      );
    } finally {
      setGithubLoading(false);
    }
  }, [githubUsername]);

  if (loading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="animate-spin w-8 h-8 border-2 border-[#FF4D4D]/30 border-t-[#FF4D4D] rounded-full mx-auto" />
          <p className="font-mono text-sm text-white/40">
            Loading purchase details…
          </p>
        </div>
      </div>
    );
  }

  if (error && !session) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center px-6">
        <div className="max-w-md text-center space-y-4">
          <div className="text-emerald-400 mx-auto w-fit">
            <CheckIcon />
          </div>
          <h1 className="font-mono font-bold text-2xl text-white">
            Payment received
          </h1>
          <p className="font-mono text-sm text-white/50 leading-relaxed">
            {error}
          </p>
          <Link
            href="/"
            className="inline-block font-mono text-sm text-[#FF4D4D] hover:text-[#FF4D4D]/80 transition-colors mt-4"
          >
            ← Back to marketplace
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-[60vh] flex items-center justify-center px-6 py-16">
      <div className="max-w-lg w-full space-y-8">
        {/* Success header */}
        <div className="text-center space-y-4">
          <div className="text-emerald-400 mx-auto w-fit animate-[fadeIn_0.5s_ease-out]">
            <CheckIcon />
          </div>
          <h1 className="font-mono font-bold text-2xl md:text-3xl text-white">
            You&apos;re in!
          </h1>
          <p className="font-mono text-sm text-white/50 leading-relaxed max-w-sm mx-auto">
            Your skills are ready! Get GitHub repo access for source code, issues, and updates.
          </p>
        </div>

        {/* GitHub username form */}
        {showGithubForm && (
          <div className="rounded-xl bg-[#1E1510] border border-[#2D221C] p-6 space-y-4">
            <div className="flex items-center gap-3">
              <GitHubIcon />
              <h2 className="font-mono text-lg font-semibold text-white">
                Get GitHub repo access
              </h2>
            </div>
            <p className="font-mono text-sm text-white/60 leading-relaxed">
              Enter your GitHub username to receive invitations to the private repositories. 
              This gives you access to the source code, ability to file issues, and automatic updates.
            </p>
            
            <form onSubmit={handleGithubSubmit} className="space-y-3">
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="github-username"
                  value={githubUsername}
                  onChange={(e) => setGithubUsername(e.target.value)}
                  className="flex-1 px-3 py-2 bg-[#0A0604] border border-[#2D221C] rounded-lg text-white font-mono text-sm placeholder:text-white/30 focus:outline-none focus:border-[#FF4D4D]/50"
                  disabled={githubLoading}
                />
                <button
                  type="submit"
                  disabled={githubLoading || !githubUsername.trim()}
                  className="px-4 py-2 bg-[#FF4D4D] hover:bg-[#FF4D4D]/80 disabled:bg-[#FF4D4D]/30 text-white font-mono text-sm rounded-lg transition-colors"
                >
                  {githubLoading ? "Sending..." : "Send invites"}
                </button>
              </div>
              {githubMessage && (
                <p className="font-mono text-xs text-emerald-400 mt-2">
                  {githubMessage}
                </p>
              )}
            </form>
          </div>
        )}

        {/* GitHub username display */}
        {currentGithubUsername && !showGithubForm && (
          <div className="rounded-xl bg-[#1E1510] border border-[#2D221C] p-4">
            <div className="flex items-center gap-3">
              <GitHubIcon />
              <div>
                <p className="font-mono text-sm text-white">
                  GitHub: <span className="text-emerald-400">{currentGithubUsername}</span>
                </p>
                <p className="font-mono text-xs text-white/40">
                  Check your email for repository invitations
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Purchased skills */}
        {session?.skills && session.skills.length > 0 && (
          <div className="space-y-3">
            <h2 className="font-mono text-xs text-white/30 uppercase tracking-wider">
              Your Skills
            </h2>
            <ul className="space-y-2">
              {session.skills.map((skill) => (
                <li
                  key={skill.id}
                  className="flex items-center gap-3 p-4 rounded-xl bg-[#1E1510] border border-[#2D221C]"
                >
                  <span className="text-white/50">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
                      <polyline points="14,2 14,8 20,8"/>
                      <line x1="16" y1="13" x2="8" y2="13"/>
                      <line x1="16" y1="17" x2="8" y2="17"/>
                      <polyline points="10,9 9,9 8,9"/>
                    </svg>
                  </span>
                  <div className="flex-1 min-w-0">
                    <p className="font-mono text-sm font-semibold text-white truncate">
                      {skill.name}
                    </p>
                    <p className="font-mono text-xs text-white/30 truncate">
                      ${(skill.price_cents / 100).toFixed(2)} {skill.currency.toUpperCase()}
                    </p>
                  </div>
                  <a
                    href={`/api/downloads/${skill.id}`}
                    className="text-xs font-mono text-[#FF4D4D] hover:text-[#FF4D4D]/80 transition-colors shrink-0 px-3 py-1 rounded-md bg-[#FF4D4D]/10 hover:bg-[#FF4D4D]/20"
                  >
                    Download
                  </a>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Quick install guide */}
        <div className="space-y-3">
          <h2 className="font-mono text-xs text-white/30 uppercase tracking-wider">
            Install in 30 seconds
          </h2>
          <div className="rounded-xl bg-[#0A0604] border border-[#2D221C] p-4">
            <div className="relative">
              <pre className="font-mono text-xs text-emerald-400/80 leading-relaxed overflow-x-auto pr-16">
                <code>
                  # Download and extract your skills{"\n"}
                  # Copy SKILL.md files to your agent&apos;s skills/ folder{"\n"}
                  cp *.skill/SKILL.md ~/your-agent/skills/
                </code>
              </pre>
              <CopyButton text="cp *.skill/SKILL.md ~/your-agent/skills/" />
            </div>
          </div>
          <p className="font-mono text-[10px] text-white/20 leading-relaxed">
            Download each skill bundle above, extract them, and copy the
            SKILL.md into your agent&apos;s <code>skills/</code> folder. Your
            agent picks it up on next run.
          </p>
        </div>

        {/* Back link */}
        <div className="text-center pt-4">
          <Link
            href="/"
            className="inline-block font-mono text-sm text-[#FF4D4D] hover:text-[#FF4D4D]/80 transition-colors"
          >
            ← Back to marketplace
          </Link>
        </div>
      </div>
    </div>
  );
}
