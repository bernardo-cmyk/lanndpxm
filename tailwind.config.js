/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        // Paleta tomada del catálogo LANND 2026
        arena: { DEFAULT: "#F3ECE2", 50: "#FAF6F0", 200: "#EADFCF", 300: "#DCCBB3" },
        barro: { DEFAULT: "#D99A6C", dark: "#B97A4F" },
        terracota: { DEFAULT: "#B04A1A", dark: "#8E3A12" },
        ahumado: "#6B5A4E",
        cacao: { DEFAULT: "#3B2A20", soft: "#5A4636" },
        salvia: "#9CAF88",
        olivo: "#3A6B35",
        mar: { DEFAULT: "#0E3A5C", light: "#7FA7A3" },
        mostaza: "#E3A812",
      },
      fontFamily: {
        display: ["var(--font-display)", "Georgia", "serif"],
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
      },
      letterSpacing: { wider2: "0.25em", widest2: "0.4em" },
      borderRadius: { pebble: "2rem" },
      keyframes: {
        drift: { "0%,100%": { transform: "translateX(0)" }, "50%": { transform: "translateX(-12px)" } },
      },
      animation: { drift: "drift 12s ease-in-out infinite" },
    },
  },
  plugins: [],
};
