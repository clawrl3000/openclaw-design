"use client";

import { HeroUIProvider } from "@heroui/react";
import { useRouter } from "next/navigation";
import { CartProvider } from "@/context/cart-context";
import { CartDrawer } from "@/components/cart-drawer";

export function Providers({ children }: { children: React.ReactNode }) {
  const router = useRouter();

  return (
    <HeroUIProvider navigate={router.push}>
      <CartProvider>
        {children}
        <CartDrawer />
      </CartProvider>
    </HeroUIProvider>
  );
}
