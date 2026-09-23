import type { Locale } from "@/lib/i18n";

type Localized = Record<Locale, string>;

/**
 * Micro-copy delle pagine /lavori (etichette UI, non contenuti).
 * I contenuti veri (i casi) vivono su Sanity come documenti `caseStudy`.
 *
 * Le etichette dei link qui sotto sono SENZA freccia: la aggiunge il
 * componente (`WithArrow` in components/landing/closing-cta.tsx, oppure
 * CaseCard) dentro uno <span aria-hidden>, così lo screen reader non legge
 * "freccia destra" e la freccia non va a capo da sola.
 */
export const cases = {
  meta: {
    it: {
      title: "Casi di successo AI in produzione | flylabs.ai",
      description:
        "Casi di successo: problemi concreti, soluzioni AI su misura e i numeri che si possono verificare.",
    },
    en: {
      title: "AI case studies in production | flylabs.ai",
      description:
        "Case studies: concrete problems, custom AI solutions and numbers you can check.",
    },
  } satisfies Record<Locale, { title: string; description: string }>,
  kicker: { it: "Lavori", en: "Work" } satisfies Localized,
  title: { it: "Casi di successo", en: "Case studies" } satisfies Localized,
  intro: {
    it: "Il problema di partenza, cosa abbiamo costruito, cosa è cambiato.",
    en: "The starting problem, what we built, what changed.",
  } satisfies Localized,
  back: { it: "← Torna alla home", en: "← Back home" } satisfies Localized,
  backToList: { it: "← Tutti i lavori", en: "← All work" } satisfies Localized,
  empty: {
    it: "Stiamo scrivendo i primi casi di successo. Torna a trovarci presto.",
    en: "We're writing up our first case studies. Check back soon.",
  } satisfies Localized,
  problem: { it: "Il problema", en: "The problem" } satisfies Localized,
  solution: { it: "La soluzione", en: "The solution" } satisfies Localized,
  // Titolo del racconto esteso (campo `body`), dopo i diagrammi.
  story: { it: "Com'è andata", en: "How it went" } satisfies Localized,
  // Link della card (carosello in home e /lavori). Senza freccia: vedi sopra.
  cta: { it: "Leggi il caso", en: "Read the case" } satisfies Localized,

  diagram: {
    enlarge: { it: "Tocca per ingrandire", en: "Tap to enlarge" } satisfies Localized,
    newTab: {
      it: "(si apre in una nuova scheda)",
      en: "(opens in a new tab)",
    } satisfies Localized,
  },

  // Rimando caso → prodotto (l'inverso, prodotto → caso, esiste già sulle
  // pagine prodotto). Mappa nel codice e non campo Sanity: i prodotti sono
  // pagine hardcoded e cambiano di rado.
  relatedProduct: {
    label: {
      it: "Il prodotto dietro questo caso:",
      en: "The product behind this case:",
    } satisfies Localized,
    bySlug: {
      "risposte-recensioni-ai": { name: "Stellar Reviews", href: "/stellar-reviews" },
      "wegrocery-ordini-di-gruppo": { name: "WeGrocery", href: "/wegrocery" },
      // GPT Chatbot non ha una pagina flylabs: la sua card sta su /prodotti.
      "assistenti-noleggio-multisito": { name: "GPT Chatbot", href: "/prodotti" },
      "form-whatsapp-promo-conversione": { name: "GPT Chatbot", href: "/prodotti" },
    } as Partial<Record<string, { name: string; href: string }>>,
  },

  // Blocchi di chiusura (components/landing/closing-cta.tsx) prima del footer.
  closing: {
    // Pagina del singolo caso.
    caseStudy: {
      title: { it: "Hai un processo simile?", en: "Got a similar process?" } satisfies Localized,
      body: {
        it: "Raccontacelo in due righe: nella prima call, gratuita, ti diciamo se e come si può fare. Se non si può, te lo diciamo.",
        en: "Tell us about it in a couple of lines: in the first call, which is free, we'll tell you whether and how it can be done. If it can't, we'll say so.",
      } satisfies Localized,
      cta: { it: "Parliamone", en: "Let's talk" } satisfies Localized,
      next: { it: "Caso successivo", en: "Next case" } satisfies Localized,
    },
    // Lista /lavori.
    list: {
      title: { it: "Non trovi il tuo caso?", en: "Don't see your case?" } satisfies Localized,
      body: {
        it: "Se un lavoro si ripete e ti porta via tempo, quasi sempre si può automatizzare. Partiamo dal tuo.",
        en: "If a task repeats and eats your time, it can almost always be automated. Let's start with yours.",
      } satisfies Localized,
      cta: { it: "Raccontaci il tuo", en: "Tell us about yours" } satisfies Localized,
    },
    // Per /prodotti, /stack e /servizi (le monta un altro step dell'audit).
    start: {
      title: { it: "Non sai da dove partire?", en: "Not sure where to start?" } satisfies Localized,
      body: {
        it: "La prima call serve a capirlo insieme, ed è gratuita.",
        en: "The first call is there to figure it out together, and it's free.",
      } satisfies Localized,
    },
    realExample: { it: "Vedi un esempio reale", en: "See a real example" } satisfies Localized,
  },

  // Carosello in home: comando di pausa dell'autoplay (WCAG 2.2.2). Le legge
  // il client component con useParams().
  carousel: {
    pause: { it: "Metti in pausa lo scorrimento", en: "Pause autoplay" } satisfies Localized,
    resume: { it: "Riprendi lo scorrimento", en: "Resume autoplay" } satisfies Localized,
  },

  // Caso inesistente (lavori/not-found.tsx e generateMetadata del dettaglio).
  notFound: {
    metaTitle: {
      it: "Caso non trovato | flylabs.ai",
      en: "Case study not found | flylabs.ai",
    } satisfies Localized,
    title: { it: "Caso non trovato", en: "Case study not found" } satisfies Localized,
    body: {
      it: "Questo caso non esiste o è stato spostato.",
      en: "This case study doesn't exist or has moved.",
    } satisfies Localized,
    cta: { it: "Tutti i lavori", en: "All work" } satisfies Localized,
  },
};
