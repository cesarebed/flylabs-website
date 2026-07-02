import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Le cover dei caseStudy sono servite dalla CDN immagini di Sanity.
    // next/image richiede di dichiarare l'host remoto (Next 16).
    remotePatterns: [{ protocol: "https", hostname: "cdn.sanity.io" }],
  },
};

export default nextConfig;
