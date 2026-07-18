import { projectId } from "./env";
import { SITE_SETTINGS_QUERY } from "./queries";
import type { SITE_SETTINGS_QUERY_RESULT } from "@/sanity.types";

// Tipo generato da `npm run typegen` — mai riscriverlo a mano (Fase 4b).
export type SiteSettings = NonNullable<SITE_SETTINGS_QUERY_RESULT>;

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
    return await sanityFetch<SITE_SETTINGS_QUERY_RESULT>({
      query: SITE_SETTINGS_QUERY,
      tags: ["siteSettings"],
    });
  } catch {
    return null;
  }
}
