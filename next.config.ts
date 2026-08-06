import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Le cover dei caseStudy sono servite dalla CDN immagini di Sanity.
    // next/image richiede di dichiarare l'host remoto (Next 16).
    remotePatterns: [{ protocol: "https", hostname: "cdn.sanity.io" }],
  },
  async redirects() {
    return [
      // La root "/" non ha più una pagina: il root layout ora vive sotto
      // [locale] (per avere <html lang> corretto), quindi mandiamo alla lingua
      // di default. 307 (temporaneo) così in futuro si può introdurre un
      // redirect basato sulla lingua del browser senza cache di un 308.
      { source: "/", destination: "/it", permanent: false },
    ];
  },
};

export default nextConfig;
