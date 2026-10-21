import { NextResponse } from "next/server";
import { getStripe } from "@/lib/stripe";

// Stripe llama aquí cuando un pago se confirma (tarjeta al momento, OXXO cuando se paga en tienda).
export async function POST(req: Request) {
  const stripe = getStripe();
  const secret = process.env.STRIPE_WEBHOOK_SECRET;
  if (!stripe || !secret) return NextResponse.json({ error: "Stripe no configurado" }, { status: 503 });

  const signature = req.headers.get("stripe-signature") ?? "";
  let event;
  try {
    event = stripe.webhooks.constructEvent(await req.text(), signature, secret);
  } catch {
    return NextResponse.json({ error: "Firma inválida" }, { status: 400 });
  }

  switch (event.type) {
    case "checkout.session.completed":
    case "checkout.session.async_payment_succeeded": {
      const session = event.data.object;
      if (session.payment_status === "paid") {
        // TODO: guardar el pedido (Sanity/Supabase), avisar por correo y generar la guía de envío.
        console.log("Pedido pagado", session.id, session.metadata);
      }
      break;
    }
    case "checkout.session.async_payment_failed":
      console.log("Pago OXXO no completado", event.data.object.id);
      break;
  }

  return NextResponse.json({ received: true });
}
