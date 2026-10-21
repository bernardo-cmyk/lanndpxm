import { getProduct, type Product } from "./products";

export type OrderLine = { slug: string; quantity: number };

// Valida las líneas que manda el navegador contra el catálogo del servidor.
export function resolveLines(raw: unknown): { product: Product; quantity: number }[] | string {
  if (!Array.isArray(raw) || raw.length === 0) return "El carrito está vacío.";
  const out: { product: Product; quantity: number }[] = [];
  for (const line of raw as OrderLine[]) {
    const product = getProduct(String(line?.slug));
    const quantity = Math.floor(Number(line?.quantity));
    if (!product) return "Uno de los productos ya no existe.";
    if (product.soldOut) return `${product.name} (${product.finish}) está agotada; pídela por WhatsApp.`;
    if (!(quantity >= 1 && quantity <= 20)) return "Cantidad no válida.";
    out.push({ product, quantity });
  }
  return out;
}
