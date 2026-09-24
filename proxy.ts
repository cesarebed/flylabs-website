import { type NextRequest, NextResponse } from "next/server";
import { defaultLocale, isLocale, type Locale } from "@/lib/i18n";

// La root "/" non ha una pagina (il root layout vive sotto [locale]): qui si
// sceglie la lingua dal browser. Tra le lingue che il sito supporta vince
// quella con la preferenza più alta in Accept-Language; se nessuna è
// supportata (o l'header manca) si va sulla lingua di default.
function preferredLocale(acceptLanguage: string | null): Locale {
  if (!acceptLanguage) return defaultLocale;

  const ranked = acceptLanguage
    .split(",")
    .map((entry, index) => {
      const [tag = "", ...params] = entry.trim().split(";");
      const qParam = params.map((p) => p.trim()).find((p) => p.startsWith("q="));
      const q = qParam ? Number(qParam.slice(2)) : 1;
      return { lang: tag.trim().toLowerCase().split("-")[0], q, index };
    })
    .filter(({ q }) => Number.isFinite(q) && q > 0)
    // A parità di q conta l'ordine dell'header.
    .sort((a, b) => b.q - a.q || a.index - b.index);

  for (const { lang } of ranked) {
    if (isLocale(lang)) return lang;
  }
  return defaultLocale;
}

export function proxy(request: NextRequest) {
  const url = request.nextUrl.clone();
  url.pathname = `/${preferredLocale(request.headers.get("accept-language"))}`;
  // 307: temporaneo, il browser non lo memorizza (la lingua può cambiare).
  // La query string (es. UTM) resta nell'URL clonato.
  const response = NextResponse.redirect(url, 307);
  response.headers.set("Vary", "Accept-Language");
  return response;
}

export const config = {
  // Solo la root: il resto del sito (pagine, /studio, /api/*) non passa di qui.
  matcher: "/",
};
