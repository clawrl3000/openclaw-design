"use client";

import { Button, Chip } from "@heroui/react";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { SiteNavbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { useCart } from "@/context/cart-context";
import type { Skill } from "@/data/skills";
import { SKILLS } from "@/data/skills";
import { getRichContent } from "@/components/rich-content";

// Get related skills based on category and other factors
function getRelatedSkills(currentSkill: Skill): Skill[] {
  return SKILLS
    .filter(skill => skill.slug !== currentSkill.slug) // Exclude current skill
    .sort((a, b) => {
      // Prioritize same category
      if (a.category === currentSkill.category && b.category !== currentSkill.category) return -1;
      if (b.category === currentSkill.category && a.category !== currentSkill.category) return 1;
      
      // Then sort by rating
      return b.rating - a.rating;
    });
}

/* ── Icons ────────────────────────────────────────────────── */

function CheckIcon({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
    </svg>
  );
}

function ArrowLeftIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M19 12H5m0 0l7 7m-7-7l7-7" />
    </svg>
  );
}

function PackageIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
    </svg>
  );
}

function ShieldIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
    </svg>
  );
}

function BoltIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
    </svg>
  );
}

/* ── Scroll Reveal Hook ───────────────────────────────────── */

function useRevealOnScroll() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
          }
        });
      },
      { threshold: 0.15, rootMargin: "0px 0px -40px 0px" }
    );

    // Observe the container and all .reveal-up children
    const reveals = el.querySelectorAll(".reveal-up");
    reveals.forEach((child) => observer.observe(child));

    return () => observer.disconnect();
  }, []);

  return ref;
}

/* ── Sub-components ───────────────────────────────────────── */

function InCartButton() {
  const { openCart } = useCart();
  return (
    <Button
      size="lg"
      className="w-full font-mono rounded-xl text-base bg-[#2D221C] text-white/60 border border-[#2D221C] hover:border-white/10 h-12 transition-all"
      onPress={openCart}
    >
      <CheckIcon /> In Cart — View Cart
    </Button>
  );
}

function StarRating({ rating, reviewCount }: { rating: number; reviewCount: number }) {
  return (
    <div className="flex items-center gap-2">
      <div className="flex gap-0.5">
        {[1, 2, 3, 4, 5].map((star) => (
          <span
            key={star}
            className={`text-[13px] inline-block ${
              star <= Math.round(rating) ? "text-[#F59E0B] glow-text-amber" : "text-white/10"
            }`}
            style={{
              animation: star <= Math.round(rating)
                ? `starAppear 0.35s cubic-bezier(0.68, -0.6, 0.32, 1.6) ${star * 0.08}s both`
                : undefined,
            }}
          >
            ★
          </span>
        ))}
      </div>
      <span className="text-[13px] text-white/50 font-mono">
        {rating.toFixed(1)}
      </span>
      <span className="text-[11px] text-white/25 font-mono">
        ({reviewCount.toLocaleString()} reviews)
      </span>
    </div>
  );
}

/* ── Main Component ───────────────────────────────────────── */

export function SkillDetailContent({ skill }: { skill: Skill }) {
  const { addItem, isInCart, openCart } = useCart();
  const inCart = isInCart(skill.slug);
  const rich = getRichContent(skill.slug);
  const contentRef = useRevealOnScroll();
  const mobileCTARef = useRef<HTMLDivElement>(null);
  const desktopCTARef = useRef<HTMLDivElement>(null);
  const [showStickyBar, setShowStickyBar] = useState(false);

  useEffect(() => {
    const mobileEl = mobileCTARef.current;
    const desktopEl = desktopCTARef.current;

    // Track visibility of both CTA zones
    let mobileVisible = false;
    let desktopVisible = false;

    const update = () => setShowStickyBar(!mobileVisible && !desktopVisible);

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.target === mobileEl) mobileVisible = entry.isIntersecting;
          if (entry.target === desktopEl) desktopVisible = entry.isIntersecting;
        });
        update();
      },
      { threshold: 0 }
    );

    if (mobileEl) observer.observe(mobileEl);
    if (desktopEl) observer.observe(desktopEl);
    return () => observer.disconnect();
  }, []);

  const addToCartWithJuice = (btnEl?: HTMLElement | null) => {
    // Layer 1: Add item
    addItem({
      slug: skill.slug,
      name: skill.name,
      price: skill.price,
      priceNum: skill.priceNum,
    });

    // Layer 2: Button bounce
    if (btnEl) {
      btnEl.classList.remove("add-cart-bounce");
      void btnEl.offsetWidth; // reflow to restart animation
      btnEl.classList.add("add-cart-bounce");

      // Layer 3: Flash overlay
      const flash = document.createElement("div");
      flash.style.cssText =
        "position:absolute;inset:0;background:white;border-radius:inherit;pointer-events:none;mix-blend-mode:overlay;z-index:10;";
      btnEl.style.position = "relative";
      btnEl.style.overflow = "hidden";
      btnEl.appendChild(flash);
      flash.animate([{ opacity: 0.5 }, { opacity: 0 }], {
        duration: 250,
        easing: "ease-out",
        fill: "forwards",
      }).onfinish = () => flash.remove();
    }
  };

  const handleAddToCart = () => addToCartWithJuice();

  return (
    <div className="min-h-screen flex flex-col">
      <SiteNavbar />

      <main className="flex-1 px-4 sm:px-6 pt-24 pb-20" ref={contentRef}>
        <div className="max-w-[1200px] mx-auto">

          {/* ── Breadcrumb ─────────────────────────────────── */}
          <nav className="mb-6 flex items-center gap-2 text-[12px] font-mono text-white/25">
            <Link href="/" className="hover:text-white/50 transition-colors flex items-center gap-1">
              <ArrowLeftIcon />
              Home
            </Link>
            <span>/</span>
            <Link href="/#skills" className="hover:text-white/50 transition-colors">
              Skills
            </Link>
            <span>/</span>
            <span className="text-white/50 truncate max-w-[240px]">{skill.name}</span>
          </nav>

          {/* ── Two Column Layout ──────────────────────────── */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">

            {/* ── Left: Hero + Content (7/12) ────────────── */}
            <div className="lg:col-span-7 space-y-10">

              {/* Hero Image */}
              <div className={`reveal-up w-full aspect-[16/9] rounded-2xl bg-gradient-to-br from-[#FF4D4D]/10 via-[#1E1510] to-[#F97316]/8 flex items-center justify-center border border-white/[0.04] overflow-hidden relative group ${skill.heroImage ? "hero-glow-container" : ""}`}>
                {skill.heroImage ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={skill.heroImage}
                    alt={skill.name}
                    className="w-full h-full object-cover hero-glow-img"
                  />
                ) : (
                  <div className="text-center">
                    <span className="font-mono text-8xl text-white/[0.03] select-none">
                      {"{ }"}
                    </span>
                  </div>
                )}

                {/* Noise grain */}
                <div className="noise-overlay" />

                {/* Category badge — frosted glass */}
                <div className="absolute top-4 left-4 z-10">
                  <Chip
                    size="sm"
                    variant="flat"
                    className="bg-black/40 text-white/80 text-[11px] font-mono backdrop-blur-md border border-white/[0.08] tracking-wide uppercase"
                  >
                    {skill.category}
                  </Chip>
                </div>

                {/* HTML text overlay */}
                {skill.heroOverlay && (
                  <>
                    <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/25 to-transparent pointer-events-none z-[1]" />
                    <div className="absolute bottom-6 left-6 z-[2] pointer-events-none">
                      <h2
                        className="font-mono font-extrabold text-[32px] sm:text-[40px] leading-[1.05] tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-[#FF6B6B] via-[#FF4D4D] to-[#F97316]"
                        style={{ filter: "drop-shadow(0 0 10px rgba(255,77,77,0.4)) drop-shadow(0 0 30px rgba(249,115,22,0.15))" }}
                      >
                        {skill.heroOverlay.title}
                      </h2>
                      <p className="font-mono text-[13px] sm:text-[14px] text-white/45 mt-2 leading-[1.4] whitespace-pre-line glow-text-white">
                        {skill.heroOverlay.subtitle}
                      </p>
                    </div>
                  </>
                )}

                {/* Bottom gradient fade */}
                <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-[#110B07] to-transparent pointer-events-none z-[3]" />
              </div>

              {/* ── Mobile Purchase Summary (shows on mobile before content) ── */}
              <div className="lg:hidden reveal-up" ref={mobileCTARef}>
                <MobilePurchaseCard skill={skill} inCart={inCart} onAddToCart={addToCartWithJuice} rich={rich} />
              </div>

              {/* ── About ──────────────────────────────────── */}
              <section className="reveal-up">
                <SectionHeading>What It Does</SectionHeading>
                {rich ? (
                  <rich.Description />
                ) : (
                  <p className="text-[15px] text-white/45 leading-[1.7] max-w-[65ch]">
                    {skill.description}
                  </p>
                )}
              </section>

              {/* ── Features — 2 col grid ──────────────────── */}
              <section className="reveal-up">
                <SectionHeading>What You Get</SectionHeading>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-3">
                  {Array.from(
                    { length: rich ? rich.featureCount : skill.features.length },
                    (_, i) => i
                  ).map((i) => (
                    <div
                      key={i}
                      className="reveal-up flex items-start gap-3 py-2"
                      style={{ transitionDelay: `${i * 75}ms` }}
                    >
                      <span className="text-[#FF4D4D] mt-[3px] flex-shrink-0">
                        <CheckIcon size={14} />
                      </span>
                      <span className="text-[14px] text-white/50 leading-relaxed">
                        {rich ? rich.getFeature(i) : skill.features[i]}
                      </span>
                    </div>
                  ))}
                </div>
              </section>

              {/* ── What's Included ─────────────────────────── */}
              <section className="reveal-up">
                <SectionHeading>Inside the Bundle</SectionHeading>
                <div className="bg-[#1E1510]/60 rounded-xl border border-white/[0.04] p-5 sm:p-6">
                  <ul className="space-y-3">
                    {Array.from(
                      { length: rich ? rich.includeCount : skill.includes.length },
                      (_, i) => i
                    ).map((i) => (
                      <li
                        key={i}
                        className="reveal-up flex items-center gap-3"
                        style={{ transitionDelay: `${i * 60}ms` }}
                      >
                        <span className="text-[#F97316]/50 flex-shrink-0">
                          <PackageIcon />
                        </span>
                        <span className="text-[13px] text-white/45 font-mono leading-relaxed">
                          {rich ? rich.getInclude(i) : skill.includes[i]}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </section>
            </div>

            {/* ── Right: Purchase Card (5/12) — Desktop ──── */}
            <div className="hidden lg:block lg:col-span-5">
              <div className="sticky top-24 space-y-5" ref={desktopCTARef}>

                {/* Purchase card */}
                <div className="bg-[#1E1510]/80 rounded-2xl border border-white/[0.04] hover:border-white/[0.08] transition-colors duration-300 p-7 space-y-6 backdrop-blur-sm">

                  {/* Name */}
                  <div>
                    <h1
                      className={`font-mono text-[28px] font-bold leading-[1.15] tracking-tight ${
                        rich
                          ? "text-transparent bg-clip-text bg-gradient-to-r from-[#FF6B6B] via-[#FF4D4D] to-[#F97316]"
                          : "text-white/90"
                      }`}
                      style={
                        rich
                          ? { filter: "drop-shadow(0 0 8px rgba(255,77,77,0.35)) drop-shadow(0 0 24px rgba(249,115,22,0.15))" }
                          : undefined
                      }
                    >
                      {skill.name}
                    </h1>
                    {rich ? (
                      <rich.Tagline />
                    ) : (
                      <p className="text-[14px] text-white/35 mt-2.5 leading-relaxed max-w-[40ch]">
                        {skill.tagline}
                      </p>
                    )}
                    <div className="mt-3">
                      <StarRating rating={skill.rating} reviewCount={skill.reviewCount} />
                    </div>
                  </div>

                  {/* Divider */}
                  <div className="border-t border-white/[0.04]" />

                  {/* Price */}
                  <div className="flex items-baseline gap-2.5">
                    <span className="font-mono text-[42px] font-extrabold text-white tracking-tight leading-none glow-text-white">
                      {skill.price}
                    </span>
                    <span className="text-[12px] text-white/20 font-mono uppercase tracking-widest">
                      one-time
                    </span>
                  </div>

                  {/* CTA */}
                  {inCart ? (
                    <InCartButton />
                  ) : (
                    <button
                      className="w-full btn-coral font-mono rounded-xl glow-coral text-[15px] h-12 transition-transform active:scale-[0.98] font-medium"
                      onClick={(e) => addToCartWithJuice(e.currentTarget)}
                    >
                      Add to Cart — {skill.price}
                    </button>
                  )}

                  {/* Divider */}
                  <div className="border-t border-white/[0.04]" />

                  {/* Meta info */}
                  <div className="space-y-2.5">
                    <MetaRow label="Version" value={skill.version} />
                    <MetaRow label="Compatibility" value={skill.compatibility} />
                    <MetaRow label="License" value="Commercial" />
                    <MetaRow label="Support" value="Email + Discord" />
                  </div>
                </div>

                {/* Trust signals */}
                <div className="flex flex-col items-center gap-2 pt-1">
                  <div className="flex items-center gap-1.5 text-[11px] text-white/20 font-mono">
                    <ShieldIcon />
                    <span>Stuck? We&apos;ll help you get it running</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-[11px] text-white/20 font-mono">
                    <BoltIcon />
                    <span>In your inbox in under 10 seconds</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Related Skills Section */}
      <section className="bg-[#0A0401] py-16 border-t border-white/[0.04]">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <h2 className="font-mono text-2xl font-bold text-white/90 mb-3">
              Related Skills
            </h2>
            <p className="text-white/40 font-mono">
              Other skills that work great with {skill.name}
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {getRelatedSkills(skill).slice(0, 3).map((relatedSkill) => (
              <div
                key={relatedSkill.slug}
                className="bg-gradient-to-br from-gray-800/20 to-gray-900/20 border border-white/[0.04] rounded-xl p-6 hover:border-white/[0.08] transition-all duration-300 group"
              >
                <div className="flex items-start gap-4 mb-4">
                  {relatedSkill.heroImage && (
                    <div className="w-12 h-12 rounded-lg overflow-hidden shrink-0 bg-gray-800/50">
                      <img 
                        src={relatedSkill.heroImage} 
                        alt={relatedSkill.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  )}
                  <div className="min-w-0">
                    <h3 className="font-mono font-semibold text-white/90 text-lg leading-tight group-hover:text-white transition-colors">
                      {relatedSkill.name}
                    </h3>
                    <Chip 
                      size="sm" 
                      variant="flat"
                      className="mt-1 bg-white/5 text-white/40 font-mono text-xs"
                    >
                      {relatedSkill.category}
                    </Chip>
                  </div>
                </div>
                
                <p className="text-white/50 text-sm font-mono leading-relaxed mb-4 line-clamp-2">
                  {relatedSkill.tagline}
                </p>
                
                <div className="flex items-center justify-between">
                  <span className="font-mono font-bold text-white/80">
                    {relatedSkill.price}
                  </span>
                  <Button 
                    as={Link}
                    href={`/skills/${relatedSkill.slug}`}
                    size="sm"
                    variant="flat"
                    className="font-mono bg-white/5 text-white/60 hover:bg-white/10 hover:text-white/80 border border-white/10 hover:border-white/20 transition-all"
                  >
                    View Details
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />

      {/* ── Sticky Bottom Bar ─────────────────────────────── */}
      <div
        className={`fixed bottom-0 left-0 right-0 z-50 ${
          showStickyBar
            ? "sticky-enter"
            : "translate-y-full opacity-0 pointer-events-none transition-all duration-200"
        }`}
      >
        <div className="bg-[#110B07]/90 backdrop-blur-xl border-t border-white/[0.06]">
          <div className="max-w-[1200px] mx-auto px-4 sm:px-6 py-3 flex items-center justify-between gap-4">
            {/* Left: Name + Price */}
            <div className="flex items-center gap-3 min-w-0">
              <span className="font-mono text-[14px] sm:text-[15px] font-bold text-white/80 truncate">
                {skill.name}
              </span>
              <span className="font-mono text-[18px] sm:text-[20px] font-extrabold text-white glow-text-white flex-shrink-0">
                {skill.price}
              </span>
              <span className="hidden sm:inline text-[11px] text-white/20 font-mono uppercase tracking-widest flex-shrink-0">
                one-time
              </span>
            </div>

            {/* Right: CTA */}
            {inCart ? (
              <Button
                size="sm"
                className="font-mono rounded-lg text-[13px] bg-[#2D221C] text-white/60 border border-[#2D221C] hover:border-white/10 h-9 px-5 transition-all flex-shrink-0"
                onPress={openCart}
              >
                <CheckIcon size={13} /> In Cart
              </Button>
            ) : (
              <button
                className="btn-coral font-mono rounded-lg glow-coral text-[13px] h-9 px-5 transition-transform active:scale-[0.97] flex-shrink-0 font-medium"
                onClick={(e) => addToCartWithJuice(e.currentTarget)}
              >
                Add to Cart
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Reveal animation styles */}
      <style>{`
        .reveal-up {
          opacity: 0;
          transform: translateY(24px);
          transition: opacity 0.55s cubic-bezier(0.16, 1, 0.3, 1),
                      transform 0.55s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .reveal-up.visible {
          opacity: 1;
          transform: translateY(0);
        }
      `}</style>
    </div>
  );
}

/* ── Shared Small Components ──────────────────────────────── */

function SectionHeading({ children, accent }: { children: React.ReactNode; accent?: boolean }) {
  return (
    <h2
      className={`font-mono text-[18px] font-semibold mb-5 tracking-tight ${
        accent
          ? "text-transparent bg-clip-text bg-gradient-to-r from-white/80 to-white/50"
          : "text-white/80"
      }`}
    >
      {children}
    </h2>
  );
}

function MetaRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between text-[13px]">
      <span className="text-white/20 font-mono">{label}</span>
      <span className="text-white/50 font-mono">{value}</span>
    </div>
  );
}

/* ── Mobile Purchase Card ─────────────────────────────────── */

function MobilePurchaseCard({
  skill,
  inCart,
  onAddToCart,
  rich,
}: {
  skill: Skill;
  inCart: boolean;
  onAddToCart: (btn?: HTMLElement | null) => void;
  rich?: ReturnType<typeof getRichContent>;
}) {
  return (
    <div className="bg-[#1E1510]/80 rounded-2xl border border-white/[0.04] p-5 space-y-4">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h1 className="font-mono text-xl font-bold text-white/90 leading-tight">
            {skill.name}
          </h1>
          {rich && <rich.MobileTagline />}
          <div className="mt-1.5">
            <StarRating rating={skill.rating} reviewCount={skill.reviewCount} />
          </div>
        </div>
        <span className="font-mono text-3xl font-extrabold text-white leading-none flex-shrink-0 glow-text-white">
          {skill.price}
        </span>
      </div>
      {inCart ? (
        <InCartButton />
      ) : (
        <button
          className="w-full btn-coral font-mono rounded-xl glow-coral text-[15px] h-12 transition-transform active:scale-[0.98] font-medium"
          onClick={(e) => onAddToCart(e.currentTarget)}
        >
          Add to Cart — {skill.price}
        </button>
      )}
      <div className="flex items-center justify-center gap-4 text-[11px] text-white/20 font-mono">
        <span className="flex items-center gap-1"><ShieldIcon /> We help you set up</span>
        <span className="flex items-center gap-1"><BoltIcon /> Delivered in 10s</span>
      </div>
    </div>
  );
}
