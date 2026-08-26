import type { Metadata } from "next";
import type { Locale } from "@/lib/i18n";
import { getSiteSettings, type SiteSettings } from "@/sanity/site-settings";

const FALLBACK_SITE_URL = "https://www.flylabs.ai";
const SITE_NAME = "flylabs.ai";

/**
 * URL base del sito (senza slash finale): il siteUrl gestito su Sanity,
 * con fallback hardcoded. Unica fonte per canonical, sitemap e robots.
 */
export async function getSiteUrl(
  settings?: SiteSettings | null
): Promise<string> {
  const s = settings ?? (await getSiteSettings());
  return (s?.siteUrl || FALLBACK_SITE_URL).replace(/\/+$/, "");
}

/**
 * Costruisce i metadata di una pagina arricchendoli con le impostazioni SEO
 * gestite da Sanity (URL del sito, immagine OG, keywords). title/description
 * li decide la pagina; il resto dei contenuti resta hardcoded.
 */
export async function buildMetadata(
  lang: Locale,
  page: { title: string; description: string; path?: string },
  settings?: SiteSettings | null
): Promise<Metadata> {
  const s = settings ?? (await getSiteSettings());
  const siteUrl = s?.siteUrl || FALLBACK_SITE_URL;
  const canonical = `/${lang}${page.path ?? ""}`;
  const ogImage = s?.ogImage || undefined;

  // IMPORTANTE: la chiave `images` va inclusa SOLO se c'è davvero un'immagine
  // dal CMS. Se la settassimo a `undefined`, Next la considera comunque
  // "gestita dai metadata" e NON inietta più l'immagine file-based generata da
  // `opengraph-image.tsx` → nessun og:image in pagina. Con la chiave assente,
  // la convenzione file-based (OG dinamica generica + per caso studio) vince.
  // Se `siteSettings.ogImage` viene valorizzato su Sanity, quello ha la meglio.
  return {
    metadataBase: new URL(siteUrl),
    title: { absolute: page.title },
    description: page.description,
    keywords: s?.keywords ?? undefined,
    alternates: { canonical },
    openGraph: {
      title: page.title,
      description: page.description,
      url: canonical,
      siteName: SITE_NAME,
      locale: lang === "it" ? "it_IT" : "en_US",
      type: "website",
      ...(ogImage ? { images: [{ url: ogImage }] } : {}),
    },
    twitter: {
      card: "summary_large_image",
      title: page.title,
      description: page.description,
      ...(ogImage ? { images: [ogImage] } : {}),
    },
  };
}
