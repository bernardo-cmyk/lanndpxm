// Catálogo LANND 2026 (tomado del PDF "Catalogo_Lannd_2026").
// Medidas: alto x diámetro en cm. Precios en pesos mexicanos.
// Cuando el catálogo pase a Sanity, este archivo se reemplaza por una consulta.

export type CollectionId = "cuates" | "erizo" | "pelon";
export type FinishKind = "ahumado" | "natural" | "negro" | "vidriado";

export type Product = {
  slug: string;
  code: string;
  name: string;
  collection: CollectionId;
  heightCm: number;
  diameterCm: number;
  finish: string;
  finishKind: FinishKind;
  swatch: string;
  price: number;
  soldOut: boolean;
  image: string;
};

export const collections: Record<
  CollectionId,
  { name: string; description: string; accent: string; cover: string }
> = {
  cuates: {
    name: "Cuates",
    description:
      "Rostros modelados a mano, cada uno con su propio carácter. Ninguno sale igual a otro.",
    accent: "#B04A1A",
    cover: "/assets/productos/chango-bigoton-ahumado.webp",
  },
  erizo: {
    name: "Erizo",
    description:
      "Texturas de espinas y anillos que juegan con la luz, en barro y vidriados intensos.",
    accent: "#0E3A5C",
    cover: "/assets/productos/espinoza-40-vidriado-azul.webp",
  },
  pelon: {
    name: "Pelón",
    description:
      "Formas limpias y atemporales, marcadas solo con la huella de LANND.",
    accent: "#3A6B35",
    cover: "/assets/productos/tubo-40-vidriado-amarillo.webp",
  },
};

const SW = {
  ahumado: "#6B5A4E",
  natural: "#D99A6C",
  negro: "#222222",
  verde: "#3A6B35",
  amarillo: "#E3A812",
  azul: "#0E3A5C",
  naranja: "#D35414",
  rojo: "#B0301A",
};

const p = (
  slug: string,
  code: string,
  name: string,
  collection: CollectionId,
  heightCm: number,
  diameterCm: number,
  finish: string,
  finishKind: FinishKind,
  swatch: string,
  price: number,
  soldOut = false,
): Product => ({
  slug,
  code,
  name,
  collection,
  heightCm,
  diameterCm,
  finish,
  finishKind,
  swatch,
  price,
  soldOut,
  image: `/assets/productos/${slug}.webp`,
});

export const products: Product[] = [
  // Colección "Cuates"
  p("chango-bigoton-ahumado", "#CHBI/40/AHU", "Chango Bigotón", "cuates", 40, 30, "Barro ahumado", "ahumado", SW.ahumado, 1300),
  p("manolo-ahumado", "#MAN/40/AHU", "Manolo", "cuates", 40, 30, "Barro ahumado", "ahumado", SW.ahumado, 1300),
  p("chuy-50-vidriado-naranja", "#CHU/60/NA", "Chuy", "cuates", 50, 28, "Vidriado naranja", "vidriado", SW.naranja, 2300, true),
  p("gala-ahumado", "#C/GAL/30/AHU", "Gala", "cuates", 30, 30, "Barro ahumado", "ahumado", SW.ahumado, 1300),
  p("chuy-40-natural", "#CHU/40/AHU", "Chuy", "cuates", 40, 30, "Barro natural", "natural", SW.natural, 1200),
  p("noe-ahumado", "#C/NOE/25/AHU", "Noé", "cuates", 25, 25, "Barro ahumado", "ahumado", SW.ahumado, 850),
  p("lilii-ahumado-natural", "#C/LI/30/AHU", "Lilii", "cuates", 30, 28, "Barro ahumado y natural", "ahumado", SW.ahumado, 850, true),
  p("chuy-40-vidriado-verde", "#C/CHU/40/VE", "Chuy", "cuates", 40, 30, "Vidriado verde", "vidriado", SW.verde, 1300),
  p("martina-negro-achapado", "#C/MAR/AHU", "Martina", "cuates", 40, 30, "Barro negro achapado", "negro", SW.negro, 1300),
  p("pancho-negro-achapado", "#C/PAN/40/AHU", "Pancho", "cuates", 40, 30, "Barro negro achapado", "negro", SW.negro, 1300),
  p("compa-2-ahumado", "#COM02/50/AHU", "Compa 2", "cuates", 50, 30, "Barro ahumado", "ahumado", SW.ahumado, 1500),
  p("yael-ahumado", "#C/YAEL/20/AHU", "Yael", "cuates", 20, 28, "Barro ahumado", "ahumado", SW.ahumado, 690),
  p("birlo-vidriado-amarillo", "#C/BIR/40/AM", "Birlo", "cuates", 40, 30, "Vidriado amarillo", "vidriado", SW.amarillo, 1300, true),
  p("bartolo-ahumado", "#C/BAR/28/AHU", "Bartolo", "cuates", 28, 18, "Barro ahumado", "ahumado", SW.ahumado, 750),
  p("omi-vidriado-verde", "#C/OMI/15/VE", "Omi", "cuates", 18, 15, "Vidriado verde", "vidriado", SW.verde, 550),
  p("compa-1-ahumado", "#COM01/50/AHU", "Compa 1", "cuates", 50, 30, "Barro ahumado", "ahumado", SW.ahumado, 1500),
  p("ramona-ahumado", "#C/RA/28/AHU", "Ramona", "cuates", 28, 20, "Barro ahumado", "ahumado", SW.ahumado, 750, true),
  p("rasta-natural", "#C/RAST/15/NAT", "Rasta", "cuates", 15, 10, "Barro ahumado", "ahumado", SW.ahumado, 550),

  // Colección "Erizo"
  p("mix-ahumado", "#E/MIX/35/AHU", "Mix", "erizo", 35, 35, "Barro ahumado", "ahumado", SW.ahumado, 1300),
  p("erizo-vidriado-amarillo", "#E/ESP/25/AM", "Erizo", "erizo", 25, 55, "Vidriado amarillo", "vidriado", SW.amarillo, 1800),
  p("tortuga-01-vidriado-verde", "#E/TOR01/15/VE", "Tortuga 01", "erizo", 15, 18, "Vidriado verde", "vidriado", SW.verde, 550),
  p("espinoza-20-vidriado-amarillo", "#E/ESP/20/AM", "Espinoza", "erizo", 20, 18, "Vidriado amarillo", "vidriado", SW.amarillo, 690),
  p("tortuga-02-vidriado-verde", "#E/TOR02/15/VE", "Tortuga 02", "erizo", 15, 22, "Vidriado verde", "vidriado", SW.verde, 550),
  p("roldan-vidriado-azul", "#E/ROL/40/AZ", "Roldán", "erizo", 40, 30, "Vidriado azul", "vidriado", SW.azul, 1200, true),
  p("roldan-vidriado-verde", "#E/ROL/40/VE", "Roldán", "erizo", 40, 30, "Vidriado verde", "vidriado", SW.verde, 1200),
  p("roldan-vidriado-naranja", "#E/ROL/40/NAR", "Roldán", "erizo", 40, 30, "Vidriado naranja", "vidriado", SW.naranja, 1200, true),
  p("espinoza-40-vidriado-verde", "#E/ESP/40/VE", "Espinoza", "erizo", 40, 30, "Vidriado verde", "vidriado", SW.verde, 1600),
  p("espinoza-40-ahumado", "#E/ESP/40/AHU", "Espinoza", "erizo", 40, 30, "Barro ahumado", "ahumado", SW.ahumado, 1300),
  p("espinoza-40-vidriado-azul", "#E/ESP/40/AZ", "Espinoza", "erizo", 40, 30, "Vidriado azul", "vidriado", SW.azul, 1600),
  p("espinoza-40-natural", "#E/ESP/40/NAT", "Espinoza", "erizo", 40, 30, "Barro natural", "natural", SW.natural, 1300, true),
  p("mix-natural", "#E/MIX/35/NAT", "Mix", "erizo", 35, 35, "Barro natural", "natural", SW.natural, 1300),

  // Colección "Pelón"
  p("copa-natural", "#E/COP/40/NAT", "Copa", "pelon", 40, 35, "Barro natural", "natural", SW.natural, 1200, true),
  p("tubo-35-natural", "#E/TUB/35/NAT", "Tubo", "pelon", 35, 30, "Barro natural", "natural", SW.natural, 1200),
  p("serpiente-natural", "#E/SER/25/NAT", "Serpiente", "pelon", 25, 20, "Barro natural", "natural", SW.natural, 1200, true),
  p("tubo-40-vidriado-rojo", "#E/TUB/40/RO", "Tubo", "pelon", 40, 28, "Vidriado rojo", "vidriado", SW.rojo, 1400, true),
  p("tubo-40-vidriado-verde", "#E/TUB/40/VE", "Tubo", "pelon", 40, 28, "Vidriado verde", "vidriado", SW.verde, 1300, true),
  p("tubo-40-vidriado-amarillo", "#E/TUB/40/AM", "Tubo", "pelon", 40, 28, "Vidriado amarillo", "vidriado", SW.amarillo, 1300),
];

export const getProduct = (slug: string) => products.find((x) => x.slug === slug);
