import type { Metadata } from "next";
import { defaultLocale, locales, type Locale } from "@/lib/i18n";
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

/** Dimensioni delle OG generate con next/og (app/[locale]/opengraph-image.tsx). */
const OG_SIZE = { width: 1200, height: 630 } as const;

/**
 * Alt dell'OG generica di app/[locale]/opengraph-image.tsx, per lingua.
 * Descrive il contenuto dell'immagine (stessa frase dell'hero), quindi vale
 * anche per le sottopagine che la riusano come fallback.
 */
export const DEFAULT_OG_ALT: Record<Locale, string> = {
  it: "flylabs.ai: il partner per integrare l'AI nei tuoi processi",
  en: "flylabs.ai: your partner for building AI into your processes",
};

/**
 * Costruisce i metadata di una pagina arricchendoli con le impostazioni SEO
 * gestite da Sanity (URL del sito, immagine OG). title/description li decide
 * la pagina; il resto dei contenuti resta hardcoded.
 *
 * `ogImage`/`ogImageAlt` (opzionali) servono alle pagine con un'immagine OG
 * propria da 1200x630 (es. il caso studio, che punta alla sua route
 * opengraph-image).
 */
export async function buildMetadata(
  lang: Locale,
  page: {
    title: string;
    description: string;
    path?: string;
    ogImage?: string;
    ogImageAlt?: string;
  },
  settings?: SiteSettings | null
): Promise<Metadata> {
  const s = settings ?? (await getSiteSettings());
  const siteUrl = s?.siteUrl || FALLBACK_SITE_URL;
  const path = page.path ?? "";
  const canonical = `/${lang}${path}`;

  // hreflang anche nell'HTML (non solo in sitemap). x-default: per la home la
  // root "/" (oggi 307 → lingua di default, pensata per un futuro redirect in
  // base alla lingua del browser), per le altre pagine la versione italiana.
  const languages: Record<string, string> = {
    ...Object.fromEntries(locales.map((l) => [l, `/${l}${path}`])),
    "x-default": xDefaultPath(path),
  };

  // og:image SEMPRE esplicita. Il merge dei metadata di Next è shallow: un
  // `openGraph` definito dalla pagina sostituisce quello del padre, e la
  // opengraph-image.tsx di [locale] non arriverebbe alle sottopagine. In più
  // la OG file-based viene iniettata solo se il segmento NON dichiara
  // `openGraph.images` (next/dist/lib/metadata/resolve-metadata.js), quindi
  // qui scegliamo noi: immagine della pagina > siteSettings.ogImage (override
  // globale da Sanity) > OG generica per lingua. La route
  // `/{lang}/opengraph-image` risponde 200 image/png anche senza hash.
  // L'immagine di siteSettings la carica l'editor e il suo contenuto non lo
  // conosciamo (DEFAULT_OG_ALT descrive l'OG generata): alt neutro.
  const image = page.ogImage
    ? { url: page.ogImage, ...OG_SIZE, alt: page.ogImageAlt || page.title }
    : s?.ogImage
      ? { url: s.ogImage, alt: SITE_NAME }
      : {
          url: `/${lang}/opengraph-image`,
          ...OG_SIZE,
          alt: DEFAULT_OG_ALT[lang],
        };

  return {
    metadataBase: new URL(siteUrl),
    title: { absolute: page.title },
    description: page.description,
    alternates: { canonical, languages },
    openGraph: {
      title: page.title,
      description: page.description,
      url: canonical,
      siteName: SITE_NAME,
      locale: lang === "it" ? "it_IT" : "en_US",
      type: "website",
      images: [image],
    },
    twitter: {
      card: "summary_large_image",
      title: page.title,
      description: page.description,
      images: [image],
    },
  };
}

/**
 * Path x-default di una pagina (relativo, senza lingua in `path`): la root
 * per la home, la lingua di default per il resto. Condiviso con la sitemap.
 */
export function xDefaultPath(path: string): string {
  return path ? `/${defaultLocale}${path}` : "/";
}
