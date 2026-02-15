"use client";

import { useCart } from "@/context/cart-context";
import { Button } from "@heroui/react";
import { useCallback, useEffect, useRef, useState } from "react";

function GitHubIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61-.546-1.385-1.335-1.755-1.335-1.755-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 21.795 24 17.295 24 12c0-6.63-5.37-12-12-12z" />
    </svg>
  );
}

function CheckCircleIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  );
}

function SpinnerIcon() {
  return (
    <svg className="animate-spin" width="16" height="16" viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth={3} strokeLinecap="round" className="opacity-20" />
      <path d="M12 2a10 10 0 019.95 9" stroke="currentColor" strokeWidth={3} strokeLinecap="round" />
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
    </svg>
  );
}

function TrashIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
    </svg>
  );
}

export function CartDrawer() {
  const {
    items,
    count,
    total,
    removeItem,
    clearCart,
    isOpen,
    closeCart,
    githubUsername,
    setGithubUsername,
  } = useCart();

  const [checkoutLoading, setCheckoutLoading] = useState(false);
  const [checkoutError, setCheckoutError] = useState<string | null>(null);
  const [ghValidating, setGhValidating] = useState(false);
  const [ghValid, setGhValid] = useState<boolean | null>(null);
  const ghDebounce = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Track which slugs are animating out
  const [removing, setRemoving] = useState<Set<string>>(new Set());
  // Track which slugs have just entered (for entrance animation)
  const prevSlugs = useRef<Set<string>>(new Set());
  const [newSlugs, setNewSlugs] = useState<Set<string>>(new Set());

  // Detect new items added
  useEffect(() => {
    const currentSlugs = new Set(items.map((i) => i.slug));
    const added = new Set<string>();
    currentSlugs.forEach((slug) => {
      if (!prevSlugs.current.has(slug)) added.add(slug);
    });
    if (added.size > 0) {
      setNewSlugs(added);
      // Clear entrance flag after animation completes
      const t = setTimeout(() => setNewSlugs(new Set()), 400);
      return () => clearTimeout(t);
    }
    prevSlugs.current = currentSlugs;
  }, [items]);

  // Keep prevSlugs in sync (also handles removals)
  useEffect(() => {
    prevSlugs.current = new Set(items.map((i) => i.slug));
  }, [items]);

  const handleRemove = useCallback(
    (slug: string) => {
      // Start exit animation
      setRemoving((prev) => new Set(prev).add(slug));
      // Actually remove after animation completes
      setTimeout(() => {
        removeItem(slug);
        setRemoving((prev) => {
          const next = new Set(prev);
          next.delete(slug);
          return next;
        });
      }, 400);
    },
    [removeItem]
  );

  const handleClearCart = useCallback(() => {
    // Animate all items out, then clear
    const allSlugs = new Set(items.map((i) => i.slug));
    setRemoving(allSlugs);
    setTimeout(() => {
      clearCart();
      setRemoving(new Set());
    }, 400);
  }, [items, clearCart]);

  // Validate GitHub username (debounced)
  useEffect(() => {
    if (ghDebounce.current) clearTimeout(ghDebounce.current);

    const username = githubUsername.trim();
    if (!username) {
      setGhValid(null);
      setGhValidating(false);
      return;
    }

    // Basic format check
    if (!/^[a-zA-Z0-9](?:[a-zA-Z0-9]|-(?=[a-zA-Z0-9])){0,38}$/.test(username)) {
      setGhValid(false);
      setGhValidating(false);
      return;
    }

    setGhValidating(true);
    ghDebounce.current = setTimeout(async () => {
      try {
        const res = await fetch(`https://api.github.com/users/${username}`);
        setGhValid(res.ok);
      } catch {
        setGhValid(null); // Network error — don't block
      } finally {
        setGhValidating(false);
      }
    }, 500);

    return () => {
      if (ghDebounce.current) clearTimeout(ghDebounce.current);
    };
  }, [githubUsername]);

  // Handle checkout — POST to /api/checkout, redirect to Stripe
  const handleCheckout = useCallback(async () => {
    const username = githubUsername.trim();
    if (!username || items.length === 0) return;

    setCheckoutLoading(true);
    setCheckoutError(null);

    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          items: items.map((i) => ({ slug: i.slug })),
          githubUsername: username,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setCheckoutError(data.error || "Checkout failed");
        return;
      }

      if (data.url) {
        window.location.href = data.url;
      }
    } catch (err) {
      setCheckoutError("Network error — please try again");
      console.error("Checkout error:", err);
    } finally {
      setCheckoutLoading(false);
    }
  }, [items, githubUsername]);

  // Close on Escape
  useEffect(() => {
    function handleKey(e: KeyboardEvent) {
      if (e.key === "Escape") closeCart();
    }
    if (isOpen) {
      document.addEventListener("keydown", handleKey);
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.removeEventListener("keydown", handleKey);
      document.body.style.overflow = "";
    };
  }, [isOpen, closeCart]);

  return (
    <>
      {/* Backdrop */}
      <div
        className={`fixed inset-0 z-40 bg-black/60 backdrop-blur-sm transition-opacity duration-300 ${
          isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
        onClick={closeCart}
        aria-hidden="true"
      />

      {/* Drawer */}
      <div
        className={`fixed top-0 right-0 z-50 h-full w-full max-w-md bg-[#110B07] border-l border-[#1E1510] shadow-2xl transition-transform duration-300 ease-out flex flex-col ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
        role="dialog"
        aria-label="Shopping cart"
        aria-modal="true"
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-[#1E1510]">
          <h2 className="font-mono font-bold text-lg text-white">
            Cart{" "}
            {count > 0 && (
              <span className="text-sm font-normal text-white/40">
                ({count} {count === 1 ? "item" : "items"})
              </span>
            )}
          </h2>
          <button
            onClick={closeCart}
            className="text-white/40 hover:text-white transition-colors p-1 rounded-lg hover:bg-white/5"
            aria-label="Close cart"
          >
            <CloseIcon />
          </button>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto px-6 py-4">
          {items.length === 0 && removing.size === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center">
              <span className="font-mono text-4xl text-white/[0.06] mb-4">
                {"{ }"}
              </span>
              <p className="text-white/40 text-sm">Your cart is empty</p>
              <p className="text-white/20 text-xs mt-1">
                Browse skills to get started
              </p>
            </div>
          ) : (
            <ul className="space-y-3">
              {items.map((item, i) => {
                const isRemoving = removing.has(item.slug);
                const isNew = newSlugs.has(item.slug);

                return (
                  <li
                    key={item.slug}
                    className={`flex items-start gap-4 p-4 rounded-xl bg-[#1E1510] border border-[#1E1510] hover:border-[#2D221C] transition-colors group ${
                      isRemoving
                        ? "cart-item-exit"
                        : isNew
                          ? "cart-item-enter"
                          : ""
                    }`}
                    style={isNew ? { animationDelay: `${i * 60}ms` } : undefined}
                  >
                    {/* Skill icon placeholder */}
                    <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#FF4D4D]/15 to-[#F97316]/10 flex items-center justify-center flex-shrink-0">
                      <span className="font-mono text-xs text-[#FF4D4D]/60">
                        {"{ }"}
                      </span>
                    </div>

                    <div className="flex-1 min-w-0">
                      <h3 className="font-mono text-sm font-semibold text-white truncate">
                        {item.name}
                      </h3>
                      <p className="font-mono text-xs text-[#FF4D4D] mt-0.5">
                        {item.price}
                      </p>
                    </div>

                    <button
                      onClick={() => handleRemove(item.slug)}
                      className="text-white/20 hover:text-[#FF4D4D] transition-colors p-1.5 rounded-lg hover:bg-[#FF4D4D]/10 flex-shrink-0 opacity-0 group-hover:opacity-100"
                      aria-label={`Remove ${item.name}`}
                      disabled={isRemoving}
                    >
                      <TrashIcon />
                    </button>
                  </li>
                );
              })}
            </ul>
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="px-6 py-5 border-t border-[#1E1510] space-y-4">
            {/* GitHub username input */}
            <div className="space-y-2">
              <label
                htmlFor="gh-username"
                className="text-xs text-white/50 font-mono flex items-center gap-1.5"
              >
                <GitHubIcon />
                GitHub username
                <span className="text-[#FF4D4D]">*</span>
              </label>
              <div className="relative">
                <input
                  id="gh-username"
                  type="text"
                  value={githubUsername}
                  onChange={(e) => setGithubUsername(e.target.value)}
                  placeholder="your-github-username"
                  className="w-full bg-[#0A0604] border border-[#2D221C] rounded-lg px-3 py-2.5 font-mono text-sm text-white placeholder:text-white/20 focus:outline-none focus:border-[#FF4D4D]/40 focus:ring-1 focus:ring-[#FF4D4D]/20 transition-colors"
                  autoComplete="username"
                  spellCheck={false}
                />
                <div className="absolute right-3 top-1/2 -translate-y-1/2">
                  {ghValidating && (
                    <span className="text-white/30">
                      <SpinnerIcon />
                    </span>
                  )}
                  {!ghValidating && ghValid === true && (
                    <span className="text-emerald-400">
                      <CheckCircleIcon />
                    </span>
                  )}
                  {!ghValidating && ghValid === false && (
                    <span className="text-[#FF4D4D] text-xs font-mono">
                      Not found
                    </span>
                  )}
                </div>
              </div>
              <p className="text-[10px] text-white/25 font-mono leading-relaxed">
                We&apos;ll invite this account to the private skill repos after
                payment.
              </p>
            </div>

            {/* Total */}
            <div className="flex items-center justify-between pt-1">
              <span className="text-sm text-white/40 font-mono">Total</span>
              <span className="font-mono font-bold text-xl text-white glow-text-white">
                ${total}
              </span>
            </div>

            {/* Error */}
            {checkoutError && (
              <p className="text-xs text-[#FF4D4D] font-mono text-center">
                {checkoutError}
              </p>
            )}

            {/* Checkout button */}
            <Button
              size="lg"
              className="w-full btn-coral font-mono rounded-lg glow-coral text-base disabled:opacity-40 disabled:cursor-not-allowed"
              isDisabled={
                !githubUsername.trim() ||
                ghValid === false ||
                checkoutLoading
              }
              onPress={handleCheckout}
            >
              {checkoutLoading ? (
                <span className="flex items-center gap-2">
                  <SpinnerIcon />
                  Redirecting…
                </span>
              ) : (
                <>Checkout — ${total}</>
              )}
            </Button>

            <button
              onClick={handleClearCart}
              className="w-full text-center text-xs text-white/30 hover:text-white/50 transition-colors font-mono py-1"
            >
              Clear cart
            </button>
          </div>
        )}
      </div>
    </>
  );
}
