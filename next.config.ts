import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Il root layout vive sotto [locale] (segmento dinamico): senza un vero
  // app/layout.tsx, Next non ha dove comporre un app/not-found.tsx classico
  // (vedi docs not-found.md, caso "root layout con segmento dinamico top
  // level"). global-not-found.tsx sostituisce quel fallback: rende la sua
  // <html>/<body>, bypassando del tutto il rendering normale.
  experimental: {
    globalNotFound: true,
  },
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
