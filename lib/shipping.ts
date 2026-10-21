// Cálculo de envío nacional (fase 1: tabla propia).
// Las paqueterías cobran el mayor entre el peso real y el peso volumétrico
// (largo x ancho x alto / 5000). Las tarifas de abajo son de referencia y
// deben ajustarse con las cotizaciones reales de la paquetería que se elija.

import type { Product } from "./products";

export type ZoneId = "local" | "oaxaca" | "sur" | "centro" | "norte";

export const zones: Record<
  ZoneId,
  { label: string; base: number; perKg: number; days: string }
> = {
  local: { label: "Puerto Escondido (entrega propia)", base: 150, perKg: 0, days: "1 a 2 días" },
  oaxaca: { label: "Resto de Oaxaca", base: 180, perKg: 22, days: "2 a 4 días" },
  sur: { label: "Sur y sureste", base: 220, perKg: 28, days: "3 a 5 días" },
  centro: { label: "Centro y occidente", base: 250, perKg: 32, days: "3 a 6 días" },
  norte: { label: "Norte y península de Baja California", base: 290, perKg: 38, days: "4 a 8 días" },
};

// Cargo por pieza: caja doble, esquineros y relleno para barro.
export const FRAGILE_PACKING_PER_PIECE = 120;
const BOX_PADDING_CM = 10;
const VOLUMETRIC_DIVISOR = 5000;

// Prefijos de código postal (dos primeros dígitos) por zona.
const prefixZones: Array<[number, number, ZoneId]> = [
  [68, 71, "oaxaca"],
  [24, 24, "sur"], // Campeche
  [29, 30, "sur"], // Chiapas
  [39, 41, "sur"], // Guerrero
  [77, 77, "sur"], // Quintana Roo
  [86, 86, "sur"], // Tabasco
  [91, 97, "sur"], // Veracruz y Yucatán
  [1, 16, "centro"], // CDMX
  [20, 20, "centro"], // Aguascalientes
  [28, 28, "centro"], // Colima
  [36, 38, "centro"], // Guanajuato
  [42, 43, "centro"], // Hidalgo
  [44, 49, "centro"], // Jalisco
  [50, 57, "centro"], // Estado de México
  [58, 61, "centro"], // Michoacán
  [62, 62, "centro"], // Morelos
  [63, 63, "centro"], // Nayarit
  [72, 75, "centro"], // Puebla
  [76, 76, "centro"], // Querétaro
  [78, 79, "centro"], // San Luis Potosí
  [90, 90, "centro"], // Tlaxcala
  [98, 99, "centro"], // Zacatecas
];

export function zoneForPostalCode(cp: string): ZoneId | null {
  if (!/^\d{5}$/.test(cp)) return null;
  // Puerto Escondido y alrededores (71980 a 71989)
  if (cp.startsWith("7198")) return "local";
  const prefix = Number(cp.slice(0, 2));
  for (const [from, to, zone] of prefixZones) {
    if (prefix >= from && prefix <= to) return zone;
  }
  // 21-23, 25-27, 31-35, 64-67, 80-85, 87-89: estados del norte
  return prefix > 0 ? "norte" : null;
}

// Peso empacado estimado por tamaño. Reemplazar por el peso real de cada pieza.
export function estimatedWeightKg(p: Pick<Product, "heightCm" | "diameterCm">) {
  const volumeL = (Math.PI * (p.diameterCm / 2) ** 2 * p.heightCm) / 1000;
  return Math.max(1.5, Math.round((0.25 * volumeL + 1) * 10) / 10);
}

export function billableWeightKg(p: Pick<Product, "heightCm" | "diameterCm">) {
  const side = p.diameterCm + BOX_PADDING_CM;
  const height = p.heightCm + BOX_PADDING_CM;
  const volumetric = (side * side * height) / VOLUMETRIC_DIVISOR;
  return Math.ceil(Math.max(volumetric, estimatedWeightKg(p)));
}

export type ShippingQuote = {
  zone: ZoneId;
  zoneLabel: string;
  days: string;
  billableKg: number;
  pieces: number;
  amount: number;
};

export function quoteShipping(
  cp: string,
  items: Array<{ product: Pick<Product, "heightCm" | "diameterCm">; quantity: number }>,
): ShippingQuote | null {
  const zone = zoneForPostalCode(cp);
  if (!zone) return null;
  const rate = zones[zone];
  let kg = 0;
  let pieces = 0;
  for (const { product, quantity } of items) {
    kg += billableWeightKg(product) * quantity;
    pieces += quantity;
  }
  const amount =
    zone === "local"
      ? rate.base
      : rate.base + rate.perKg * kg + FRAGILE_PACKING_PER_PIECE * pieces;
  return {
    zone,
    zoneLabel: rate.label,
    days: rate.days,
    billableKg: kg,
    pieces,
    amount: Math.round(amount / 10) * 10,
  };
}
