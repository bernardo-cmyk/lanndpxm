"use client";

import { useCart } from "@/lib/cart";

export default function AddToCartButton({ slug }: { slug: string }) {
  const { add } = useCart();
  return (
    <button onClick={() => add(slug)} className="btn-primary">
      Agregar al carrito
    </button>
  );
}
