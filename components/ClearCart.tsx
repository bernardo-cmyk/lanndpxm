"use client";

import { useEffect } from "react";
import { useCart } from "@/lib/cart";

// Vacía el carrito después de un pago exitoso.
export default function ClearCart() {
  const { clear } = useCart();
  useEffect(() => {
    try {
      localStorage.removeItem("lannd-cart");
    } catch {}
    clear();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return null;
}
