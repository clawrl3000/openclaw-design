"use client";

import { useCart } from "@/context/cart-context";
import { Button } from "@heroui/react";
import { useCallback, useEffect, useRef, useState } from "react";
import { useSession, signIn } from "next-auth/react";

const CHECKOUT_PENDING_KEY = "openclaw-checkout-pending";

function GitHubIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61-.546-1.385-1.335-1.755-1.335-1.755-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 21.795 24 17.295 24 12c0-6.63-5.37-12-12-12z" />
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

function CheckCircleIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
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
    openCart,
    closeCart,
  } = useCart();

  const { data: session, status: sessionStatus } = useSession();
  const [checkoutLoading, setCheckoutLoading] = useState(false);
  const [checkoutError, setCheckoutError] = useState<string | null>(null);
  const [autoCheckoutState, setAutoCheckoutState] = useState<"idle" | "confirming" | "redirecting">("idle");
  const autoCheckoutTriggered = useRef(false);

  // Track which slugs are animating out
  const [removing, setRemoving] = useState<Set<string>>(new Set());
  // Track which slugs have just entered (for entrance animation)
  const prevSlugs = useRef<Set<string>>(new Set());
  const [newSlugs, setNewSlugs] = useState<Set<string>>(new Set());

  const githubUsername = (session?.user as Record<string, unknown>)?.githubUsername as string | undefined;
  const isAuthenticated = !!session?.user;

  // Fire the actual checkout API call
  const fireCheckout = useCallback(async () => {
    if (items.length === 0) return;

    setCheckoutLoading(true);
    setCheckoutError(null);

    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          items: items.map((i) => ({ slug: i.slug })),
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setCheckoutError(data.error || "Checkout failed");
        setAutoCheckoutState("idle");
        return;
      }

      if (data.url) {
        window.location.href = data.url;
      }
    } catch (err) {
      setCheckoutError("Network error — please try again");
      setAutoCheckoutState("idle");
      console.error("Checkout error:", err);
    } finally {
      setCheckoutLoading(false);
    }
  }, [items]);

  // Auto-checkout: after OAuth return, detect pending flag + authenticated session → go straight to Stripe
  useEffect(() => {
    if (autoCheckoutTriggered.current) return;
    if (sessionStatus !== "authenticated") return;
    if (items.length === 0) return;

    try {
      const pending = localStorage.getItem(CHECKOUT_PENDING_KEY);
      if (!pending) return;

      // Clear the flag immediately so it doesn't re-trigger
      localStorage.removeItem(CHECKOUT_PENDING_KEY);
      autoCheckoutTriggered.current = true;

      // Open the cart drawer and show confirmation state
      openCart();
      setAutoCheckoutState("confirming");

      // Brief pause to show "Signed in ✓" then auto-redirect
      const timer = setTimeout(() => {
        setAutoCheckoutState("redirecting");
        fireCheckout();
      }, 1500);

      return () => clearTimeout(timer);
    } catch {
      // localStorage blocked — no-op
    }
  }, [sessionStatus, items, openCart, fireCheckout]);

  // Detect new items added
  useEffect(() => {
    const currentSlugs = new Set(items.map((i) => i.slug));
    const added = new Set<string>();
    currentSlugs.forEach((slug) => {
      if (!prevSlugs.current.has(slug)) added.add(slug);
    });
    if (added.size > 0) {
      setNewSlugs(added);
      const t = setTimeout(() => setNewSlugs(new Set()), 400);
      return () => clearTimeout(t);
    }
    prevSlugs.current = currentSlugs;
  }, [items]);

  useEffect(() => {
    prevSlugs.current = new Set(items.map((i) => i.slug));
  }, [items]);

  const handleRemove = useCallback(
    (slug: string) => {
      setRemoving((prev) => new Set(prev).add(slug));
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
    const allSlugs = new Set(items.map((i) => i.slug));
    setRemoving(allSlugs);
    setTimeout(() => {
      clearCart();
      setRemoving(new Set());
    }, 400);
  }, [items, clearCart]);

  // Handle checkout — if not signed in, set pending flag + redirect to GitHub OAuth
  const handleCheckout = useCallback(async () => {
    if (items.length === 0) return;

    if (!session?.user) {
      // Set flag so we auto-checkout after OAuth return
      try {
        localStorage.setItem(CHECKOUT_PENDING_KEY, Date.now().toString());
      } catch {
        // localStorage blocked
      }
      signIn("github", { callbackUrl: window.location.href });
      return;
    }

    // Already authenticated — go straight to Stripe
    await fireCheckout();
  }, [items, session, fireCheckout]);

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

  // Determine what the footer shows
  const isAutoCheckout = autoCheckoutState !== "idle";

  return (
    <>
      {/* Backdrop */}
      <div
        className={`fixed inset-0 z-40 bg-black/60 backdrop-blur-sm transition-opacity duration-300 ${
          isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
        onClick={isAutoCheckout ? undefined : closeCart}
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
          {!isAutoCheckout && (
            <button
              onClick={closeCart}
              className="text-white/40 hover:text-white transition-colors p-1 rounded-lg hover:bg-white/5"
              aria-label="Close cart"
            >
              <CloseIcon />
            </button>
          )}
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

                    {!isAutoCheckout && (
                      <button
                        onClick={() => handleRemove(item.slug)}
                        className="text-white/20 hover:text-[#FF4D4D] transition-colors p-1.5 rounded-lg hover:bg-[#FF4D4D]/10 flex-shrink-0 opacity-0 group-hover:opacity-100"
                        aria-label={`Remove ${item.name}`}
                        disabled={isRemoving}
                      >
                        <TrashIcon />
                      </button>
                    )}
                  </li>
                );
              })}
            </ul>
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="px-6 py-5 border-t border-[#1E1510] space-y-4">
            {/* Auto-checkout state: signed in, heading to Stripe */}
            {isAutoCheckout ? (
              <>
                {/* Signed-in confirmation */}
                <div className="flex items-center gap-2 px-3 py-2.5 rounded-lg bg-emerald-500/10 border border-emerald-500/20 transition-all duration-300">
                  <span className="text-emerald-400">
                    <CheckCircleIcon />
                  </span>
                  <span className="font-mono text-sm text-emerald-300">
                    Signed in as {githubUsername || session?.user?.name}
                  </span>
                </div>

                {/* Total */}
                <div className="flex items-center justify-between pt-1">
                  <span className="text-sm text-white/40 font-mono">Total</span>
                  <span className="font-mono font-bold text-xl text-white glow-text-white">
                    ${total}
                  </span>
                </div>

                {/* Auto-redirect status */}
                <div className="flex items-center justify-center gap-2 py-3">
                  <SpinnerIcon />
                  <span className="font-mono text-sm text-white/60">
                    {autoCheckoutState === "confirming"
                      ? "Preparing checkout…"
                      : "Redirecting to payment…"}
                  </span>
                </div>
              </>
            ) : (
              <>
                {/* Auth status */}
                {isAuthenticated ? (
                  <div className="flex items-center gap-2 px-3 py-2.5 rounded-lg bg-[#0A0604] border border-[#2D221C]">
                    <GitHubIcon />
                    <span className="font-mono text-sm text-white/70">
                      {githubUsername || session?.user?.name || session?.user?.email}
                    </span>
                    <span className="ml-auto text-emerald-400">
                      <CheckCircleIcon />
                    </span>
                  </div>
                ) : (
                  <p className="text-[10px] text-white/30 font-mono text-center leading-relaxed">
                    You&apos;ll sign in with GitHub at checkout — we use it to deliver your skills.
                  </p>
                )}

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
                  isDisabled={checkoutLoading}
                  onPress={handleCheckout}
                >
                  {checkoutLoading ? (
                    <span className="flex items-center gap-2">
                      <SpinnerIcon />
                      Redirecting…
                    </span>
                  ) : isAuthenticated ? (
                    <>Checkout — ${total}</>
                  ) : (
                    <span className="flex items-center gap-2">
                      <GitHubIcon />
                      Sign in & Checkout — ${total}
                    </span>
                  )}
                </Button>

                <button
                  onClick={handleClearCart}
                  className="w-full text-center text-xs text-white/30 hover:text-white/50 transition-colors font-mono py-1"
                >
                  Clear cart
                </button>
              </>
            )}
          </div>
        )}
      </div>
    </>
  );
}
