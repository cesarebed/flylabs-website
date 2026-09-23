import type { NextConfig } from "next";

const isDev = process.env.NODE_ENV !== "production";

// Header di sicurezza (difesa in profondità). Niente CSP con nonce: renderebbe
// dinamiche tutte le pagine e romperebbe l'ISR. La parte "enforced" copre solo
// direttive che non toccano gli script; per gli script c'è una policy
// Report-Only (le violazioni finiscono nella console del browser) da stringere
// e rendere effettiva quando è pulita.
const baseHeaders = [
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  // Il widget dell'assistente non usa camera né geolocalizzazione (verificato
  // sul bundle di gpt-trainer): si possono spegnere senza romperlo.
  { key: "Permissions-Policy", value: "camera=(), geolocation=(), browsing-topics=()" },
];

// Sito pubblico: nessun dominio esterno può incorniciarlo (clickjacking).
const siteCsp = "frame-ancestors 'self'; base-uri 'self'; form-action 'self'; object-src 'none'";

// Studio: Sanity Dashboard (www.sanity.io) lo apre in un iframe, quindi
// frame-ancestors include *.sanity.io e X-Frame-Options non va messo
// (SAMEORIGIN bloccherebbe il Dashboard). Niente form-action: il login dello
// Studio passa dagli host di autenticazione di Sanity.
const studioCsp = "frame-ancestors 'self' https://*.sanity.io; base-uri 'self'; object-src 'none'";

// Allowlist delle risorse di terze parti che il sito carica: GA4 (dopo il
// consenso), widget assistente (app.gptchatbot.it → gpt-trainer, con iframe
// YouTube e Google Fonts), Vercel Analytics/Speed Insights, API di Iconify.
// Le violazioni compaiono nella console del browser. In dev servono
// anche eval e il websocket dell'HMR.
const reportOnlyCsp = [
  "default-src 'self'",
  [
    "script-src 'self' 'unsafe-inline'",
    isDev && "'unsafe-eval'",
    "https://www.googletagmanager.com",
    "https://app.gptchatbot.it https://app.gpt-trainer.com",
    "https://va.vercel-scripts.com",
  ]
    .filter(Boolean)
    .join(" "),
  "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
  "font-src 'self' data: https://fonts.gstatic.com",
  "img-src 'self' data: blob: https://cdn.sanity.io https://www.googletagmanager.com https://*.google-analytics.com https://app.gptchatbot.it https://*.gpt-trainer.com",
  "media-src 'self' https://cdn.sanity.io",
  [
    "connect-src 'self'",
    isDev && "ws:",
    "https://*.google-analytics.com https://*.analytics.google.com https://www.googletagmanager.com https://stats.g.doubleclick.net",
    "https://app.gptchatbot.it wss://app.gptchatbot.it https://*.gpt-trainer.com wss://*.gpt-trainer.com",
    "https://va.vercel-scripts.com",
    // @iconify/react scarica le icone a runtime (host principale + fallback).
    "https://api.iconify.design https://api.simplesvg.com https://api.unisvg.com",
  ]
    .filter(Boolean)
    .join(" "),
  "frame-src 'self' https://www.youtube.com https://app.gptchatbot.it https://*.gpt-trainer.com",
  "worker-src 'self' blob:",
].join("; ");

const nextConfig: NextConfig = {
  poweredByHeader: false,
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
  // La root "/" non ha una pagina: il redirect alla lingua del browser
  // (Accept-Language) vive in proxy.ts.
  async headers() {
    return [
      { source: "/:path*", headers: baseHeaders },
      {
        // Tutto tranne /studio e le sue sottopagine.
        source: "/:path((?!studio(?:/|$)).*)",
        headers: [
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
          { key: "Content-Security-Policy", value: siteCsp },
          { key: "Content-Security-Policy-Report-Only", value: reportOnlyCsp },
        ],
      },
      {
        source: "/studio/:path*",
        headers: [{ key: "Content-Security-Policy", value: studioCsp }],
      },
    ];
  },
};

export default nextConfig;
