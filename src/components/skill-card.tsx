"use client";

import { Card, CardBody, CardFooter, Chip } from "@heroui/react";
import Link from "next/link";
import { useCart } from "@/context/cart-context";

export interface SkillCardProps {
  slug: string;
  name: string;
  tagline: string;
  price: string;
  priceNum: number;
  category: string;
  rating?: number;
  heroImage?: string;
  heroOverlay?: {
    title: string;
    subtitle: string;
  };
}

function CheckIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
    </svg>
  );
}

export function SkillCard({
  slug,
  name,
  tagline,
  price,
  priceNum,
  category,
  rating,
  heroImage,
  heroOverlay,
}: SkillCardProps) {
  const { addItem, isInCart, openCart } = useCart();
  const inCart = isInCart(slug);

  const handleAddToCart = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();

    const btn = e.currentTarget;

    addItem({ slug, name, price, priceNum });

    // Bounce animation
    btn.classList.remove("add-cart-bounce");
    void btn.offsetWidth;
    btn.classList.add("add-cart-bounce");

    // Flash overlay
    const flash = document.createElement("div");
    flash.style.cssText =
      "position:absolute;inset:0;background:white;border-radius:inherit;pointer-events:none;mix-blend-mode:overlay;z-index:10;";
    btn.style.position = "relative";
    btn.style.overflow = "hidden";
    btn.appendChild(flash);
    flash.animate([{ opacity: 0.5 }, { opacity: 0 }], {
      duration: 250,
      easing: "ease-out",
      fill: "forwards",
    }).onfinish = () => flash.remove();
  };

  const handleViewCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    openCart();
  };

  return (
    <Link href={`/skills/${slug}`}>
      <Card
        className="bg-[#1E1510] border border-[#1E1510] hover:border-[#FF4D4D]/20 transition-all duration-300 hover:scale-[1.02] hover:shadow-[0_0_30px_rgba(255,77,77,0.08)] group rounded-xl cursor-pointer"
      >
        {/* Hero image area */}
        <CardBody className="p-0 overflow-hidden">
          <div className="w-full h-52 bg-gradient-to-br from-[#FF4D4D]/15 via-[#1E1510] to-[#F97316]/10 flex items-center justify-center relative rounded-t-xl">
            {heroImage ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={heroImage}
                alt={name}
                className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 group-hover:translate-x-[-2%] group-hover:translate-y-[-1%] transition-transform duration-[1200ms] ease-out"
              />
            ) : (
              <span className="font-mono text-5xl text-white/[0.06] group-hover:text-white/[0.12] transition-colors">
                {`{ }`}
              </span>
            )}
            {/* Animated noise grain */}
            <div className="noise-overlay" />
            {/* HTML text overlay for cards with heroOverlay */}
            {heroOverlay && (
              <>
                <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/30 to-transparent pointer-events-none z-[1]" />
                <div className="absolute bottom-4 left-4 z-[2] pointer-events-none">
                  <h3
                    className="font-mono font-extrabold text-[22px] leading-[1.1] tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-[#FF6B6B] via-[#FF4D4D] to-[#F97316]"
                    style={{ filter: "drop-shadow(0 0 8px rgba(255,77,77,0.4)) drop-shadow(0 0 24px rgba(249,115,22,0.12))" }}
                  >
                    {heroOverlay.title}
                  </h3>
                  <p className="font-mono text-[10px] text-white/45 mt-1.5 leading-[1.4] whitespace-pre-line">
                    {heroOverlay.subtitle}
                  </p>
                </div>
              </>
            )}
            {/* Category badge — top-left */}
            <div className="absolute top-3 left-3">
              <Chip
                size="sm"
                variant="flat"
                className="bg-black/50 text-white/70 text-[11px] font-mono backdrop-blur-sm border border-white/[0.06]"
              >
                {category}
              </Chip>
            </div>
            {/* Price pill — bottom-right */}
            <div className="absolute bottom-3 right-3">
              <span className="price-pill font-mono">{price}</span>
            </div>
          </div>
        </CardBody>

        <CardFooter className="flex flex-col items-start gap-2 px-4 py-4">
          {!heroOverlay && (
            <h3 className="font-mono font-bold text-[15px] text-white group-hover:text-[#FF4D4D] transition-colors truncate w-full">
              {name}
            </h3>
          )}
          <p className="text-[13px] text-white/40 leading-relaxed line-clamp-2">
            {tagline}
          </p>

          {/* Rating + Add to Cart row */}
          <div className="flex items-center justify-between w-full mt-1">
            {rating !== undefined && (
              <div className="flex items-center gap-1.5">
                <div className="flex gap-0.5">
                  {[1, 2, 3, 4, 5].map((star) => {
                    const fill = Math.min(1, Math.max(0, rating - (star - 1)));
                    return (
                      <span
                        key={star}
                        className="text-xs relative inline-block"
                        style={{ width: "1em", height: "1em" }}
                      >
                        <span className="absolute inset-0 text-white/10">★</span>
                        {fill > 0 && (
                          <span
                            className="absolute inset-0 text-[#F59E0B]"
                            style={{ clipPath: `inset(0 ${(1 - fill) * 100}% 0 0)` }}
                          >
                            ★
                          </span>
                        )}
                      </span>
                    );
                  })}
                </div>
                <span className="text-[11px] text-white/30 font-mono">
                  {rating.toFixed(1)}
                </span>
                <span className="text-[10px] text-white/20 font-mono">
                  (10 reviews)
                </span>
              </div>
            )}

            {/* Add to Cart / In Cart button */}
            {inCart ? (
              <button
                onClick={handleViewCart}
                className="flex items-center gap-1 text-[11px] font-mono text-white/50 bg-[#2D221C] hover:bg-[#3D2F24] border border-white/[0.04] hover:border-white/[0.08] rounded-lg px-2.5 py-1.5 transition-all"
              >
                <CheckIcon /> In Cart
              </button>
            ) : (
              <button
                onClick={handleAddToCart}
                className="text-[11px] font-mono font-medium text-white/80 bg-[#FF4D4D]/15 hover:bg-[#FF4D4D]/25 border border-[#FF4D4D]/20 hover:border-[#FF4D4D]/40 rounded-lg px-2.5 py-1.5 transition-all"
              >
                + Add
              </button>
            )}
          </div>
        </CardFooter>
      </Card>
    </Link>
  );
}
