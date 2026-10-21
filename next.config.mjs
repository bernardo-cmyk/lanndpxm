/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    // Cuando el catálogo viva en Sanity/Supabase, agrega aquí sus dominios.
    remotePatterns: [
      { protocol: "https", hostname: "cdn.sanity.io" },
      { protocol: "https", hostname: "*.supabase.co" },
    ],
  },
};

export default nextConfig;
