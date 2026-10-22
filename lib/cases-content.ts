import type { Locale } from "@/lib/i18n";

type Localized = Record<Locale, string>;

/**
 * Micro-copy delle pagine /work (etichette UI, non contenuti).
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
    es: {
      title: "Casos de éxito de IA en producción | flylabs.ai",
      description:
        "Casos de éxito: problemas concretos, soluciones de IA a medida y cifras que se pueden comprobar.",
    },
    fr: {
      title: "Études de cas IA en production | flylabs.ai",
      description:
        "Études de cas : problèmes concrets, solutions IA sur mesure et chiffres vérifiables.",
    },
  } satisfies Record<Locale, { title: string; description: string }>,
  kicker: { it: "Lavori", en: "Work", es: "Proyectos", fr: "Réalisations" } satisfies Localized,
  title: { it: "Casi di successo", en: "Case studies", es: "Casos de éxito", fr: "Études de cas" } satisfies Localized,
  intro: {
    it: "Il problema di partenza, cosa abbiamo costruito, cosa è cambiato.",
    en: "The starting problem, what we built, what changed.",
    es: "El problema de partida, qué construimos, qué cambió.",
    fr: "Le problème de départ, ce que nous avons construit, ce qui a changé.",
  } satisfies Localized,
  back: { it: "← Torna alla home", en: "← Back home", es: "← Volver al inicio", fr: "← Retour à l'accueil" } satisfies Localized,
  backToList: { it: "← Tutti i lavori", en: "← All work", es: "← Todos los proyectos", fr: "← Toutes les réalisations" } satisfies Localized,
  empty: {
    it: "Stiamo scrivendo i primi casi di successo. Torna a trovarci presto.",
    en: "We're writing up our first case studies. Check back soon.",
    es: "Estamos redactando nuestros primeros casos de éxito. Vuelve pronto.",
    fr: "Nous rédigeons nos premières études de cas. Revenez bientôt.",
  } satisfies Localized,
  problem: { it: "Il problema", en: "The problem", es: "El problema", fr: "Le problème" } satisfies Localized,
  solution: { it: "La soluzione", en: "The solution", es: "La solución", fr: "La solution" } satisfies Localized,
  // Titolo del racconto esteso (campo `body`), dopo i diagrammi.
  story: { it: "Com'è andata", en: "How it went", es: "Cómo fue", fr: "Le résultat" } satisfies Localized,
  // Link della card (carosello in home e /work). Senza freccia: vedi sopra.
  cta: { it: "Leggi il caso", en: "Read the case", es: "Leer el caso", fr: "Lire le cas" } satisfies Localized,

  diagram: {
    enlarge: { it: "Tocca per ingrandire", en: "Tap to enlarge", es: "Toca para ampliar", fr: "Touchez pour agrandir" } satisfies Localized,
    newTab: {
      it: "(si apre in una nuova scheda)",
      en: "(opens in a new tab)",
      es: "(se abre en una pestaña nueva)",
      fr: "(s'ouvre dans un nouvel onglet)",
    } satisfies Localized,
  },

  // Rimando caso → prodotto (l'inverso, prodotto → caso, esiste già sulle
  // pagine prodotto). Mappa nel codice e non campo Sanity: i prodotti sono
  // pagine hardcoded e cambiano di rado.
  relatedProduct: {
    label: {
      it: "Il prodotto dietro questo caso:",
      en: "The product behind this case:",
      es: "El producto detrás de este caso:",
      fr: "Le produit derrière ce cas :",
    } satisfies Localized,
    bySlug: {
      "ai-review-replies": { name: "Stellar Reviews", href: "/stellar-reviews" },
      "wegrocery-group-orders": { name: "WeGrocery", href: "/wegrocery" },
      "multi-site-rental-assistant": { name: "GPT Chatbot", href: "/gpt-chatbot" },
      "website-form-to-whatsapp-promo": { name: "GPT Chatbot", href: "/gpt-chatbot" },
    } as Partial<Record<string, { name: string; href: string }>>,
  },

  // Blocchi di chiusura (components/landing/closing-cta.tsx) prima del footer.
  closing: {
    // Pagina del singolo caso.
    caseStudy: {
      title: { it: "Hai un processo simile?", en: "Got a similar process?", es: "¿Tienes un proceso parecido?", fr: "Vous avez un processus similaire ?" } satisfies Localized,
      body: {
        it: "Nella prima call, gratuita, ti diciamo se e come si può fare. Se non si può, te lo diciamo.",
        en: "In the first call, which is free, we'll tell you whether and how it can be done. If it can't, we'll say so.",
        es: "En la primera llamada, que es gratuita, te decimos si se puede hacer y cómo. Si no se puede, te lo decimos.",
        fr: "Lors du premier appel, gratuit, nous vous disons si c'est faisable et comment. Si ce n'est pas le cas, nous vous le disons.",
      } satisfies Localized,
      cta: { it: "Parliamone", en: "Let's talk", es: "Hablemos", fr: "Parlons-en" } satisfies Localized,
      // Con il link di prenotazione: 15 minuti sul calendario, senza passare dal form.
      ctaBook: { it: "Prenota 15 minuti", en: "Book 15 minutes", es: "Reserva 15 minutos", fr: "Réservez 15 minutes" } satisfies Localized,
      next: { it: "Caso successivo", en: "Next case", es: "Caso siguiente", fr: "Cas suivant" } satisfies Localized,
    },
    // Lista /work.
    list: {
      title: { it: "Non trovi il tuo caso?", en: "Don't see your case?", es: "¿No encuentras tu caso?", fr: "Vous ne trouvez pas votre cas ?" } satisfies Localized,
      body: {
        it: "Se un lavoro si ripete e ti porta via tempo, quasi sempre si può automatizzare. Partiamo dal tuo.",
        en: "If a task repeats and eats your time, it can almost always be automated. Let's start with yours.",
        es: "Si una tarea se repite y te quita tiempo, casi siempre se puede automatizar. Empecemos por la tuya.",
        fr: "Si une tâche se répète et vous prend du temps, elle peut presque toujours être automatisée. Commençons par la vôtre.",
      } satisfies Localized,
      cta: { it: "Raccontaci il tuo", en: "Tell us about yours", es: "Cuéntanos el tuyo", fr: "Parlez-nous du vôtre" } satisfies Localized,
    },
    // Per /products, /stack e /services (le monta un altro step dell'audit).
    start: {
      title: { it: "Non sai da dove partire?", en: "Not sure where to start?", es: "¿No sabes por dónde empezar?", fr: "Vous ne savez pas par où commencer ?" } satisfies Localized,
      body: {
        it: "La prima call serve a capirlo insieme, ed è gratuita.",
        en: "The first call is there to figure it out together, and it's free.",
        es: "La primera llamada sirve para averiguarlo juntos, y es gratuita.",
        fr: "Le premier appel sert à le déterminer ensemble, et il est gratuit.",
      } satisfies Localized,
    },
    realExample: { it: "Vedi un esempio reale", en: "See a real example", es: "Ver un ejemplo real", fr: "Voir un exemple réel" } satisfies Localized,
  },

  // Carosello in home: comando di pausa dell'autoplay (WCAG 2.2.2). Le legge
  // il client component con useParams().
  carousel: {
    pause: { it: "Metti in pausa lo scorrimento", en: "Pause autoplay", es: "Pausar el desplazamiento", fr: "Mettre le défilement en pause" } satisfies Localized,
    resume: { it: "Riprendi lo scorrimento", en: "Resume autoplay", es: "Reanudar el desplazamiento", fr: "Reprendre le défilement" } satisfies Localized,
  },

  // Caso inesistente (work/not-found.tsx e generateMetadata del dettaglio).
  notFound: {
    metaTitle: {
      it: "Caso non trovato | flylabs.ai",
      en: "Case study not found | flylabs.ai",
      es: "Caso no encontrado | flylabs.ai",
      fr: "Cas introuvable | flylabs.ai",
    } satisfies Localized,
    title: { it: "Caso non trovato", en: "Case study not found", es: "Caso no encontrado", fr: "Cas introuvable" } satisfies Localized,
    body: {
      it: "Questo caso non esiste o è stato spostato.",
      en: "This case study doesn't exist or has moved.",
      es: "Este caso no existe o se ha movido.",
      fr: "Ce cas n'existe pas ou a été déplacé.",
    } satisfies Localized,
    cta: { it: "Tutti i lavori", en: "All work", es: "Todos los proyectos", fr: "Toutes les réalisations" } satisfies Localized,
  },
};
