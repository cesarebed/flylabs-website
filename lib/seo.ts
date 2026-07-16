import type { Metadata } from "next";
import type { Locale } from "@/lib/i18n";
import { getSiteSettings, type SiteSettings } from "@/sanity/site-settings";

const FALLBACK_SITE_URL = "https://flylabs.ai";
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
  const ogImages = s?.ogImage ? [s.ogImage] : undefined;

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
      images: ogImages?.map((url) => ({ url })),
    },
    twitter: {
      card: "summary_large_image",
      title: page.title,
      description: page.description,
      images: ogImages,
    },
  };
}
