"use client";

import { useEffect, useRef } from "react";
import { useCart } from "@/context/cart-context";

function CartIcon() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 100 4 2 2 0 000-4z"
      />
    </svg>
  );
}

export function CartButton() {
  const { count, toggleCart } = useCart();
  const badgeRef = useRef<HTMLSpanElement>(null);
  const prevCount = useRef(count);

  // Pop the badge when count increases
  useEffect(() => {
    if (count > prevCount.current && badgeRef.current) {
      badgeRef.current.classList.remove("badge-pop");
      void badgeRef.current.offsetWidth;
      badgeRef.current.classList.add("badge-pop");
    }
    prevCount.current = count;
  }, [count]);

  return (
    <button
      onClick={toggleCart}
      className="relative p-2 text-white/60 hover:text-white transition-colors rounded-lg hover:bg-white/5"
      aria-label={`Shopping cart${count > 0 ? `, ${count} items` : ""}`}
    >
      <CartIcon />
      {count > 0 && (
        <span
          ref={badgeRef}
          className="absolute -top-0.5 -right-0.5 flex items-center justify-center w-4.5 h-4.5 min-w-[18px] rounded-full bg-[#FF4D4D] text-[10px] font-mono font-bold text-white leading-none px-1 badge-pop"
        >
          {count}
        </span>
      )}
    </button>
  );
}
