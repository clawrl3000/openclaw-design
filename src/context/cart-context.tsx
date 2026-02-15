"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

export interface CartItem {
  slug: string;
  name: string;
  price: string;
  priceNum: number;
  quantity: number;
}

interface CartContextValue {
  items: CartItem[];
  /** Total number of items in cart */
  count: number;
  /** Total price in dollars */
  total: number;
  addItem: (item: Omit<CartItem, "quantity">) => void;
  removeItem: (slug: string) => void;
  clearCart: () => void;
  /** Check if a skill is already in the cart */
  isInCart: (slug: string) => boolean;
  /** Whether the cart drawer is open */
  isOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
  toggleCart: () => void;
  /** GitHub username for delivery */
  githubUsername: string;
  setGithubUsername: (username: string) => void;
}

const CartContext = createContext<CartContextValue | undefined>(undefined);

const STORAGE_KEY = "openclaw-cart";
const GH_USERNAME_KEY = "openclaw-gh-username";

function loadCart(): CartItem[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function saveCart(items: CartItem[]) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  } catch {
    // localStorage may be full or blocked
  }
}

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [hydrated, setHydrated] = useState(false);
  const [githubUsername, setGithubUsernameState] = useState("");

  // Hydrate from localStorage after mount
  useEffect(() => {
    setItems(loadCart());
    try {
      const savedGh = localStorage.getItem(GH_USERNAME_KEY);
      if (savedGh) setGithubUsernameState(savedGh);
    } catch {}
    setHydrated(true);
  }, []);

  // Persist to localStorage on change (skip initial mount)
  useEffect(() => {
    if (hydrated) {
      saveCart(items);
    }
  }, [items, hydrated]);

  const addItem = useCallback(
    (item: Omit<CartItem, "quantity">) => {
      setItems((prev) => {
        const existing = prev.find((i) => i.slug === item.slug);
        if (existing) {
          // Skills are digital — only 1 per cart
          return prev;
        }
        return [...prev, { ...item, quantity: 1 }];
      });
      setIsOpen(true);
    },
    []
  );

  const removeItem = useCallback((slug: string) => {
    setItems((prev) => prev.filter((i) => i.slug !== slug));
  }, []);

  const clearCart = useCallback(() => {
    setItems([]);
  }, []);

  const isInCart = useCallback(
    (slug: string) => items.some((i) => i.slug === slug),
    [items]
  );

  const count = items.length;
  const total = items.reduce((sum, i) => sum + i.priceNum * i.quantity, 0);

  const openCart = useCallback(() => setIsOpen(true), []);
  const closeCart = useCallback(() => setIsOpen(false), []);
  const toggleCart = useCallback(() => setIsOpen((p) => !p), []);

  const setGithubUsername = useCallback((username: string) => {
    setGithubUsernameState(username);
    try {
      localStorage.setItem(GH_USERNAME_KEY, username);
    } catch {}
  }, []);

  const value = useMemo<CartContextValue>(
    () => ({
      items,
      count,
      total,
      addItem,
      removeItem,
      clearCart,
      isInCart,
      isOpen,
      openCart,
      closeCart,
      toggleCart,
      githubUsername,
      setGithubUsername,
    }),
    [items, count, total, addItem, removeItem, clearCart, isInCart, isOpen, openCart, closeCart, toggleCart, githubUsername, setGithubUsername]
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart(): CartContextValue {
  const ctx = useContext(CartContext);
  if (!ctx) {
    throw new Error("useCart must be used within <CartProvider>");
  }
  return ctx;
}
