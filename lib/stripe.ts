import Stripe from "stripe";

let client: Stripe | null = null;

// Devuelve null si no hay llave configurada, para que el sitio funcione en modo demo.
export function getStripe(): Stripe | null {
  const key = process.env.STRIPE_SECRET_KEY;
  if (!key) return null;
  client ??= new Stripe(key);
  return client;
}
