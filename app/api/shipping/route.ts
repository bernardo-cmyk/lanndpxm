import { NextResponse } from "next/server";
import { resolveLines } from "@/lib/order";
import { quoteShipping } from "@/lib/shipping";

export async function POST(req: Request) {
  const body = await req.json().catch(() => null);
  const lines = resolveLines(body?.items);
  if (typeof lines === "string") return NextResponse.json({ error: lines }, { status: 400 });
  const quote = quoteShipping(String(body?.postalCode ?? ""), lines);
  if (!quote) return NextResponse.json({ error: "Código postal no válido." }, { status: 400 });
  return NextResponse.json(quote);
}
