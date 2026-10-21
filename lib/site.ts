export const site = {
  name: "LANND",
  tagline: "Diseño con origen",
  location: "Puerto Escondido, Oaxaca",
  email: "hola@lannd.mx",
  phones: ["(52) 55 5106 5553", "(52) 55 1452 4149"],
  // Número del catálogo marcado con WhatsApp. Se puede cambiar con NEXT_PUBLIC_WHATSAPP_NUMBER.
  whatsapp: process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "525551065553",
  instagram: "https://www.instagram.com/lanndpxm",
  instagramHandle: "@lanndpxm",
  stockists: ["Vivero Aline", "Dialecto Colectivo", "Ola Verde"],
};

export function whatsappLink(message: string) {
  return `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(message)}`;
}
