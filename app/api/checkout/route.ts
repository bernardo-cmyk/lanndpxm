import { NextResponse } from "next/server";
import { resolveLines } from "@/lib/order";
import { quoteShipping } from "@/lib/shipping";
import { getStripe } from "@/lib/stripe";

export async function POST(req: Request) {
  const body = await req.json().catch(() => null);
  const lines = resolveLines(body?.items);
  if (typeof lines === "string") return NextResponse.json({ error: lines }, { status: 400 });

  const postalCode = String(body?.postalCode ?? "");
  const shipping = quoteShipping(postalCode, lines);
  if (!shipping) return NextResponse.json({ error: "Escribe un código postal válido." }, { status: 400 });

  const stripe = getStripe();
  if (!stripe) {
    return NextResponse.json(
      { error: "Los pagos en línea se activan al configurar Stripe. Mientras tanto, termina tu pedido por WhatsApp." },
      { status: 503 },
    );
  }

  const origin = process.env.NEXT_PUBLIC_SITE_URL || new URL(req.url).origin;
  const session = await stripe.checkout.sessions.create({
    mode: "payment",
    locale: "es",
    currency: "mxn",
    line_items: lines.map(({ product, quantity }) => ({
      quantity,
      price_data: {
        currency: "mxn",
        unit_amount: product.price * 100,
        product_data: {
          name: `${product.name} · ${product.finish}`,
          description: `${product.heightCm} x ${product.diameterCm} cm · ${product.code}`,
          images: [new URL(product.image, origin).toString()],
        },
      },
    })),
    shipping_address_collection: { allowed_countries: ["MX"] },
    shipping_options: [
      {
        shipping_rate_data: {
          type: "fixed_amount",
          display_name: `Envío ${shipping.zoneLabel} (${shipping.days})`,
          fixed_amount: { amount: shipping.amount * 100, currency: "mxn" },
        },
      },
    ],
    phone_number_collection: { enabled: true },
    metadata: {
      postal_code: postalCode,
      items: lines.map((l) => `${l.product.code}x${l.quantity}`).join(","),
    },
    success_url: `${origin}/gracias?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${origin}/#tienda`,
  });

  return NextResponse.json({ url: session.url });
}
