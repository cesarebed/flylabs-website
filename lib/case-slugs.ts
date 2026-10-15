/**
 * Slug inglesi dei casi studio (2026-10-15): gli URL del sito sono in inglese
 * in entrambe le lingue (/it/work/ai-review-replies, /en/work/...).
 *
 * Mappa slug storico (italiano) → slug inglese. Serve a tre cose:
 * - redirect 301 dei vecchi URL (next.config.ts), da tenere per sempre;
 * - link e sitemap con lo slug nuovo anche finché su Sanity c'è ancora quello
 *   storico (caseSlug);
 * - lookup del documento con entrambi gli slug (caseSlugCandidates), così la
 *   pagina funziona prima e dopo l'aggiornamento dello slug su Sanity.
 *
 * Un caso nuovo nasce già con lo slug inglese su Sanity e qui non va aggiunto.
 */
export const LEGACY_CASE_SLUGS: Record<string, string> = {
  "assistenti-noleggio-multisito": "multi-site-rental-assistant",
  "creative-ads-loop-ai": "ai-ad-creative-loop",
  "form-whatsapp-promo-conversione": "website-form-to-whatsapp-promo",
  "formazione-ai-in-aula": "in-person-ai-training",
  "pratiche-connessione-automatiche": "automated-grid-connection-paperwork",
  "report-medico-automatico": "automated-medical-report",
  "risposte-recensioni-ai": "ai-review-replies",
  "second-brain-aziendale": "company-second-brain",
  "wegrocery-ordini-di-gruppo": "wegrocery-group-orders",
};

/** Slug pubblico (inglese) di un caso, dato lo slug salvato su Sanity. */
export function caseSlug(slug: string | null): string {
  if (!slug) return "";
  return LEGACY_CASE_SLUGS[slug] ?? slug;
}

/** Slug con cui cercare su Sanity il caso di un URL: quello inglese e, se c'è, quello storico. */
export function caseSlugCandidates(slug: string): string[] {
  const legacy = Object.keys(LEGACY_CASE_SLUGS).find(
    (old) => LEGACY_CASE_SLUGS[old] === slug
  );
  return legacy ? [slug, legacy] : [slug];
}
