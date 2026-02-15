"use client";

import { HeroUIProvider } from "@heroui/react";
import { useRouter } from "next/navigation";
import { SessionProvider } from "next-auth/react";
import { CartProvider } from "@/context/cart-context";
import { CartDrawer } from "@/components/cart-drawer";

export function Providers({ children }: { children: React.ReactNode }) {
  const router = useRouter();

  return (
    <SessionProvider>
      <HeroUIProvider navigate={router.push}>
        <CartProvider>
          {children}
          <CartDrawer />
        </CartProvider>
      </HeroUIProvider>
    </SessionProvider>
  );
}
