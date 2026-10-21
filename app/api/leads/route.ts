import { NextResponse } from "next/server";

// Recibe solicitudes de paisajismo y pedidos especiales.
export async function POST(req: Request) {
  const body = await req.json().catch(() => null);
  const name = String(body?.name ?? "").trim();
  const phone = String(body?.phone ?? "").trim();
  if (!name || phone.replace(/\D/g, "").length < 10) {
    return NextResponse.json({ error: "Escribe tu nombre y un teléfono de 10 dígitos." }, { status: 400 });
  }
  const lead = {
    name,
    phone,
    city: String(body?.city ?? "").slice(0, 120),
    space: String(body?.space ?? "").slice(0, 60),
    message: String(body?.message ?? "").slice(0, 2000),
    receivedAt: new Date().toISOString(),
  };
  // TODO: enviar a hola@lannd.mx (por ejemplo con Resend) y guardar en la base de datos.
  console.log("Nuevo lead", lead);
  return NextResponse.json({ ok: true });
}
