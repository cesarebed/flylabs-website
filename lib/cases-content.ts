import type { Locale } from "@/lib/i18n";

type Localized = Record<Locale, string>;

/**
 * Micro-copy delle pagine /lavori (etichette UI, non contenuti).
 * I contenuti veri (i casi) vivono su Sanity come documenti `caseStudy`.
 */
export const cases: {
  meta: Record<Locale, { title: string; description: string }>;
  kicker: Localized;
  title: Localized;
  intro: Localized;
  back: Localized;
  backToList: Localized;
  empty: Localized;
  problem: Localized;
  solution: Localized;
  cta: Localized;
} = {
  meta: {
    it: {
      title: "Lavori — flylabs.ai",
      description:
        "Casi di successo: problemi concreti, soluzioni AI in produzione e risultati misurati.",
    },
    en: {
      title: "Work — flylabs.ai",
      description:
        "Case studies: concrete problems, AI solutions in production and measured results.",
    },
  },
  kicker: { it: "Lavori", en: "Work" },
  title: {
    it: "Casi di successo",
    en: "Case studies",
  },
  intro: {
    it: "Problemi veri, soluzioni in produzione, numeri misurati.",
    en: "Real problems, solutions in production, measured numbers.",
  },
  back: { it: "← Torna alla home", en: "← Back home" },
  backToList: { it: "← Tutti i lavori", en: "← All work" },
  empty: {
    it: "Stiamo scrivendo i primi casi di successo. Torna a trovarci presto.",
    en: "We're writing up our first case studies. Check back soon.",
  },
  problem: { it: "Il problema", en: "The problem" },
  solution: { it: "La soluzione", en: "The solution" },
  cta: { it: "Leggi il caso →", en: "Read the case →" },
};
