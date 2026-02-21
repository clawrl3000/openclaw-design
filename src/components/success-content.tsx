"use client";

import { useCart } from "@/context/cart-context";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
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
  const [inviteStatus, setInviteStatus] = useState<"loading" | "sent" | "failed" | "no_repo">("loading");
  const [inviteMessage, setInviteMessage] = useState<string | null>(null);

  const githubUsername = (authSession?.user as Record<string, unknown>)?.githubUsername as string | undefined;

  // Fetch session data and clear the cart
  useEffect(() => {
    if (!sessionId) {
      setError("No session ID found");
      setLoading(false);
      return;
    }

    async function fetchData() {
      try {
        const sessionRes = await fetch(`/api/checkout/session?session_id=${sessionId}`);
        if (!sessionRes.ok) throw new Error("Failed to load session");
        const sessionData = await sessionRes.json();
        setSession(sessionData);
        clearCart();
      } catch {
        setError("Could not load purchase details. Your purchase was still successful — check your email for repo invitations.");
      } finally {
        setLoading(false);
      }
    }

    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sessionId]);

  // Auto-send GitHub invites once we have the session data and GitHub username
  useEffect(() => {
    if (!session || !githubUsername) return;

    const skillsWithRepos = session.skills.filter(s => s.github_repo);
    if (skillsWithRepos.length === 0) {
      setInviteStatus("no_repo");
      return;
    }

    async function sendInvites() {
      try {
        const res = await fetch('/api/user/github', {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ github_username: githubUsername }),
        });

        if (res.ok) {
          const data = await res.json();
          if (data.invitations_sent > 0) {
            setInviteStatus("sent");
            setInviteMessage(`Repository access sent to @${githubUsername}`);
          } else if (data.invitations_failed > 0) {
            setInviteStatus("failed");
            setInviteMessage("Failed to send some invitations. Check the dashboard for details.");
          } else {
            // Already invited or no repos to invite to
            setInviteStatus("sent");
            setInviteMessage(`You already have access as @${githubUsername}`);
          }
        } else {
          setInviteStatus("failed");
          setInviteMessage("Failed to send invitations. Visit your dashboard to retry.");
        }
      } catch {
        setInviteStatus("failed");
        setInviteMessage("Failed to send invitations. Visit your dashboard to retry.");
      }
    }

    sendInvites();
  }, [session, githubUsername]);

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

  const skillsWithRepos = session?.skills.filter(s => s.github_repo) || [];

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
            {inviteStatus === "sent"
              ? "Your skills are ready. Repository invitations have been sent automatically."
              : "Your skills are ready. Setting up your repository access…"}
          </p>
        </div>

        {/* GitHub status */}
        {githubUsername && (
          <div className={`rounded-xl p-4 ${
            inviteStatus === "sent" 
              ? "bg-emerald-500/5 border border-emerald-500/20" 
              : inviteStatus === "failed"
              ? "bg-red-500/5 border border-red-500/20"
              : "bg-white/5 border border-white/10"
          }`}>
            <div className="flex items-center gap-3">
              <GitHubIcon />
              <div>
                <p className="font-mono text-sm text-white">
                  Signed in as <span className={inviteStatus === "sent" ? "text-emerald-400" : "text-white/70"}>@{githubUsername}</span>
                </p>
                {inviteMessage && (
                  <p className={`font-mono text-xs mt-1 ${
                    inviteStatus === "sent" ? "text-emerald-400/70" 
                    : inviteStatus === "failed" ? "text-red-400/70"
                    : "text-white/40"
                  }`}>
                    {inviteMessage}
                  </p>
                )}
                {inviteStatus === "loading" && (
                  <p className="font-mono text-xs text-white/40 mt-1">
                    Sending repository invitations…
                  </p>
                )}
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
                  {inviteStatus === "sent" && skill.github_repo ? (
                    <span className="text-xs font-mono text-emerald-400/70 shrink-0 px-3 py-1 rounded-md bg-emerald-500/10">
                      ✓ Invited
                    </span>
                  ) : inviteStatus === "loading" ? (
                    <span className="text-xs font-mono text-white/30 shrink-0 px-3 py-1 rounded-md bg-white/5 animate-pulse">
                      Sending…
                    </span>
                  ) : (
                    <span className="text-xs font-mono text-white/30 shrink-0 px-3 py-1 rounded-md bg-white/5">
                      Pending
                    </span>
                  )}
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Installation Guide */}
        <div className="space-y-4">
          <h2 className="font-mono text-xs text-white/30 uppercase tracking-wider">
            Install Your Skills
          </h2>

          {session?.skills && session.skills.length > 0 ? (
            session.skills.map((skill) => {
              const cloneCmd = skill.github_repo
                ? `git clone https://github.com/${GITHUB_OWNER}/${skill.github_repo}.git ~/openclaw/skills/${skill.slug}`
                : null;

              return (
                <div
                  key={skill.id}
                  className="rounded-xl bg-[#0A0604] border border-[#2D221C] p-5 space-y-4"
                >
                  <h3 className="font-mono text-sm font-semibold text-white">
                    {skill.name}
                  </h3>

                  {/* Option 1: Git Clone (primary) */}
                  {cloneCmd && (
                    <div className="space-y-2">
                      <p className="font-mono text-xs text-white/50">
                        Paste in your terminal:
                      </p>
                      <div>
                        <pre className="font-mono text-xs text-emerald-400/80 leading-relaxed whitespace-pre-wrap break-all bg-black/30 rounded-lg p-3">
                          <code>{cloneCmd}</code>
                        </pre>
                        <CopyButton text={cloneCmd} />
                      </div>
                    </div>
                  )}

                  {/* Divider */}
                  {cloneCmd && (
                    <div className="flex items-center gap-3">
                      <div className="flex-1 h-px bg-white/10" />
                      <span className="font-mono text-[10px] text-white/20 uppercase">or</span>
                      <div className="flex-1 h-px bg-white/10" />
                    </div>
                  )}

                  {/* Option 2: Download ZIP */}
                  <div className="space-y-2">
                    <a
                      href={`/api/downloads/${skill.id}`}
                      className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-white/5 hover:bg-white/10 text-white/70 hover:text-white font-mono text-xs transition-colors border border-white/10"
                    >
                      ⬇ Download ZIP
                    </a>
                    {!cloneCmd && (
                      <p className="font-mono text-[10px] text-white/30">
                        Unzip into ~/openclaw/skills/{skill.slug}/
                      </p>
                    )}
                  </div>
                </div>
              );
            })
          ) : (
            <div className="rounded-xl bg-[#0A0604] border border-[#2D221C] p-5">
              <p className="font-mono text-xs text-white/40">
                Your download links will appear here once payment is confirmed.
              </p>
            </div>
          )}

          {/* Accept invite reminder — only if auto-accept failed */}
          {inviteStatus === "sent" && inviteMessage && !inviteMessage.includes("already have access") && (
            <div className="rounded-lg bg-amber-500/5 border border-amber-500/20 p-3">
              <p className="font-mono text-xs text-amber-300 leading-relaxed">
                ⚠️ Accept the{" "}
                <a
                  href="https://github.com/notifications"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline hover:text-amber-200"
                >
                  GitHub repo invitation
                </a>{" "}
                before cloning. (You may need to re-sign in to grant repo access.)
              </p>
            </div>
          )}

          {/* Restart note */}
          <div className="rounded-xl bg-[#0A0604] border border-[#2D221C] p-4 space-y-2">
            <p className="font-mono text-xs text-white/50">
              Then restart your agent to load the new skill:
            </p>
            <div>
              <pre className="font-mono text-xs text-emerald-400/80 bg-black/30 rounded-lg p-3">
                <code>openclaw gateway restart</code>
              </pre>
              <CopyButton text="openclaw gateway restart" />
            </div>
          </div>

          {/* Need Help */}
          <div className="rounded-lg bg-blue-500/5 border border-blue-500/20 p-3">
            <p className="font-mono text-xs text-blue-300 leading-relaxed">
              💡 <strong>Need help?</strong> Each skill repo has setup instructions in its README.
              Join the <a href="https://discord.gg/openclaw" className="underline hover:text-blue-200">Discord</a> if you get stuck.
            </p>
          </div>
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
