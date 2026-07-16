import { projectId } from "./env";
import { SITE_SETTINGS_QUERY } from "./queries";

type Localized = { it?: string | null; en?: string | null };

export type SiteSettings = {
  title: Localized | null;
  description: Localized | null;
  siteUrl: string | null;
  ogImage: string | null;
  keywords: string[] | null;
  socialLinks:
    | { _key: string; label: string | null; url: string | null }[]
    | null;
  contactEmail: string | null;
};

/**
 * Legge le impostazioni SEO del sito da Sanity. Difensivo di proposito:
 * se il progetto non è configurato (no projectId) o l'API è irraggiungibile,
 * torna null e il chiamante usa i fallback hardcoded. Così il sito non si
 * rompe mai per colpa del CMS.
 */
export async function getSiteSettings(): Promise<SiteSettings | null> {
  if (!projectId) return null;
  try {
    const { sanityFetch } = await import("./fetch");
    return await sanityFetch<SiteSettings | null>({
      query: SITE_SETTINGS_QUERY,
      tags: ["siteSettings"],
    });
  } catch {
    return null;
  }
}
