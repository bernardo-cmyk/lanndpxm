"use client";

import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { getProduct, type Product } from "./products";

type CartLine = { slug: string; quantity: number };
type CartItem = { product: Product; quantity: number };

type CartContextValue = {
  items: CartItem[];
  count: number;
  subtotal: number;
  isOpen: boolean;
  open: () => void;
  close: () => void;
  add: (slug: string) => void;
  setQuantity: (slug: string, quantity: number) => void;
  clear: () => void;
};

const CartContext = createContext<CartContextValue | null>(null);
const STORAGE_KEY = "lannd-cart";

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [lines, setLines] = useState<CartLine[]>([]);
  const [isOpen, setOpen] = useState(false);

  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) setLines(JSON.parse(saved));
    } catch {}
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(lines));
    } catch {}
  }, [lines]);

  const value = useMemo<CartContextValue>(() => {
    const items = lines
      .map((l) => ({ product: getProduct(l.slug), quantity: l.quantity }))
      .filter((i): i is CartItem => Boolean(i.product));
    return {
      items,
      count: items.reduce((n, i) => n + i.quantity, 0),
      subtotal: items.reduce((n, i) => n + i.product.price * i.quantity, 0),
      isOpen,
      open: () => setOpen(true),
      close: () => setOpen(false),
      add: (slug) => {
        setLines((prev) => {
          const found = prev.find((l) => l.slug === slug);
          if (found) return prev.map((l) => (l.slug === slug ? { ...l, quantity: l.quantity + 1 } : l));
          return [...prev, { slug, quantity: 1 }];
        });
        setOpen(true);
      },
      setQuantity: (slug, quantity) =>
        setLines((prev) =>
          quantity <= 0
            ? prev.filter((l) => l.slug !== slug)
            : prev.map((l) => (l.slug === slug ? { ...l, quantity: Math.min(quantity, 20) } : l)),
        ),
      clear: () => setLines([]),
    };
  }, [lines, isOpen]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart debe usarse dentro de CartProvider");
  return ctx;
}
