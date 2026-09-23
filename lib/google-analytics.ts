// Google Analytics 4: ID e revoca del consenso nella sessione corrente.
// Solo lato client (usa window/document): chiamare da event handler.

// L'ID vive in NEXT_PUBLIC_GA_ID (non hardcodato).
export const GA_ID = process.env.NEXT_PUBLIC_GA_ID;

declare global {
  interface Window {
    // Definita dallo snippet inline di components/consent/google-analytics.tsx.
    gtag?: (...args: unknown[]) => void;
    dataLayer?: unknown[];
    // Opt-out ufficiale di gtag.js: con true la libreria smette di inviare hit.
    [key: `ga-disable-${string}`]: boolean | undefined;
  }
}

// Nomi dei cookie di GA4: _ga e _ga_<ID senza "G-">.
const GA_COOKIE = /^_ga($|_)/;

// Cancella i cookie di GA. gtag.js li scrive sul dominio più alto possibile
// (es. .flylabs.ai anche se la pagina è www.flylabs.ai), quindi proviamo tutte
// le varianti: senza domain (cookie host-only) e con ogni suffisso dell'host.
function deleteGaCookies() {
  const names = document.cookie
    .split(";")
    .map((c) => c.split("=")[0]?.trim())
    .filter((name): name is string => Boolean(name) && GA_COOKIE.test(name));
  if (names.length === 0) return;

  const parts = window.location.hostname.split(".");
  const domains: (string | null)[] = [null];
  for (let i = 0; i < parts.length - 1; i++) {
    domains.push(`.${parts.slice(i).join(".")}`);
  }
  for (const name of names) {
    for (const domain of domains) {
      document.cookie = `${name}=; Max-Age=0; path=/${domain ? `; domain=${domain}` : ""}`;
    }
  }
}

// Revoca delle Statistiche nella sessione corrente: gli <Script> già eseguiti
// restano in memoria anche quando <GoogleAnalytics> restituisce null, quindi
// fermiamo gtag esplicitamente (opt-out + consent update), cancelliamo i cookie
// e lasciamo al chiamante il reload che scarica la libreria.
export function revokeGoogleAnalytics() {
  if (GA_ID) window[`ga-disable-${GA_ID}`] = true;
  window.gtag?.("consent", "update", { analytics_storage: "denied" });
  deleteGaCookies();
}
