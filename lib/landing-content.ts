import type { Locale } from "@/lib/i18n";

/**
 * Contenuti della landing, bilingue (it/en).
 *
 * NOTA: temporaneo. Quando il design è bloccato, questo migra su Sanity
 * (localeString/localeText) — vedi skill cms-change. Tenuto qui come fonte
 * unica e tipizzata per iterare veloce sul visivo.
 */

export type Localized = Record<Locale, string>;

type NavContent = {
  cta: Localized;
};

type HeroContent = {
  titleBefore: Localized;
  titleMark: Localized;
  titleAfter: Localized;
  body: Localized;
  bodyMark: Localized; // parola sottolineata dentro il body
  bodyAfter: Localized;
  ctaPrimary: Localized;
  ctaSecondary: Localized;
  note: Localized;
  // Diagramma reale di un caso accanto al copy (file in public/hero/,
  // importati staticamente da hero.tsx). `caseHref` punta allo slug Sanity
  // del caseStudy, hardcoded come i link di "Cosa costruiamo": se cambia
  // nello Studio va aggiornato a mano. `sector` è il campo `sector` pubblico
  // dello stesso caso.
  visual: {
    alt: Localized;
    caseHref: string;
    casePrefix: Localized;
    sector: Localized;
    caseCta: Localized;
  };
};

type Section = { kicker: Localized; title: Localized };

// Link "visto in produzione" dentro una card di "Cosa costruiamo": un
// prodotto flylabs (con logo) o un caso reale. I casi puntano allo slug
// Sanity del `caseStudy` (`/lavori/<slug>`), hardcoded qui: se lo slug
// cambia nello Studio va aggiornato a mano.
export type BuildCardLink = {
  label: Localized;
  href: string; // path interno ("/lavori/...", "/wegrocery") o URL esterno
  logo?: string; // path in /public — presente solo per i prodotti flylabs
  external?: boolean;
};

export type BuildCard = {
  icon: string;
  title: Localized;
  body: Localized;
  claim: Localized;
  links?: BuildCardLink[];
};

export type Step = { n: string; title: Localized; body: Localized };
export type Faq = { q: Localized; a: Localized };

export type OfferTrack = {
  kind: Localized; // micro-label (stamp) es. "formazione"
  title: Localized;
  body: Localized;
  price: Localized; // segnale di prezzo trasparente
  timeline: Localized; // quanto ci vuole, detto prima
  includes: Localized[]; // cosa c'è dentro davvero (3 voci)
  featured?: boolean; // evidenzia il binario di punta
  cta: Localized; // CTA del binario: una per scelta, non tre "Parliamone" uguali
  // Approfondimento usato solo dalla pagina /servizi: per chi è e come va.
  who: Localized;
  steps: Localized[];
  // id dell'<article> su /servizi (deep link: /servizi#formazione).
  anchor?: string;
  // "Vedi un esempio reale" su /servizi: path interno di un caso (o della lista).
  example?: string;
};

// `icon` assente = il tool non ha un logo su Iconify: la pagina mostra un
// monogramma neutro (stesso stile per tutti), non un'icona semantica a caso.
export type StackTool = { icon?: string; name: string; desc: Localized };
export type StackGroup = { name: Localized; tools: StackTool[] };

// Le "due modalità" con cui offriamo ogni prodotto: implementazione custom
// nel workspace del cliente, o self-service sulla web app SaaS.
export type ProductMode = {
  title: Localized;
  body: Localized;
  cta?: Localized;
  href?: string; // se assente, il CTA punta al contatto (#cta)
  external?: boolean;
  note?: Localized; // es. "in arrivo" quando la modalità non è ancora attiva
  // CTA secondaria facoltativa (es. "Codice su GitHub" nel self-service).
  cta2?: Localized;
  href2?: string;
  external2?: boolean;
};

export type Product = {
  slug: string;
  icon: string;
  logo: string; // path in /public, logo reale del prodotto (non un'icona generica)
  name: string; // nome del brand, non tradotto
  tagline: Localized;
  sector: Localized;
  href: string;
  external?: boolean;
  note?: Localized; // nota facoltativa mostrata sotto la card
  // Anteprima 16:10 in cima alla card: screenshot reale del prodotto. Senza,
  // la card mostra il logo in grande (stessa altezza, griglia allineata).
  preview?: { src: Localized; alt: Localized };
};

export const landing = {
  // Le pagine mostrate in nav (sitewide, anche da mobile) sono le stesse del
  // footer — unica fonte, `footer.nav` più sotto — così le etichette restano
  // sincronizzate senza doverle duplicare.
  nav: {
    cta: { it: "Parliamone", en: "Let's talk" },
  } satisfies NavContent,

  hero: {
    titleBefore: { it: "Il partner per", en: "Your partner for" },
    titleMark: { it: "integrare l'AI", en: "building AI" },
    titleAfter: { it: "nei tuoi processi.", en: "into your processes." },
    body: {
      it: "Partiamo da un processo che oggi ti costa ore o clienti, costruiamo la soluzione AI che lo risolve e formiamo il tuo team a gestirla ",
      en: "We start from a process that costs you hours or customers today, build the AI that fixes it and train your team to run it ",
    },
    bodyMark: { it: "in autonomia", en: "on their own" },
    bodyAfter: { it: ".", en: "." },
    ctaPrimary: { it: "Parliamone →", en: "Let's talk →" },
    ctaSecondary: {
      it: "Guarda cosa abbiamo costruito",
      en: "See what we've built",
    },
    note: {
      it: "Prima call gratuita. Nessun impegno, nessun pitch.",
      en: "First call is free. No commitment, no pitch.",
    },
    visual: {
      alt: {
        it: "Tre siti di un noleggio bici collegati a un unico assistente AI, che risponde sulla chat del sito, su Instagram, Facebook Messenger e WhatsApp Business: informazioni su mezzi, taglie, sedi e prezzi, appuntamenti e prenotazione online, e passaggio a un operatore per le richieste in giornata e i problemi durante il noleggio.",
        en: "Three bike rental websites connected to a single AI assistant that replies on the website chat, Instagram, Facebook Messenger and WhatsApp Business: answers on bikes, sizes, locations and prices, appointments and online booking, and handover to a person for same-day requests and issues during the rental.",
      },
      caseHref: "/lavori/assistenti-noleggio-multisito",
      casePrefix: { it: "Caso reale:", en: "Real case:" },
      sector: { it: "Noleggio bici · Arizona (USA)", en: "Bike rental · Arizona (USA)" },
      caseCta: { it: "Leggi il caso →", en: "Read the case →" },
    },
  } satisfies HeroContent,

  build: {
    section: {
      kicker: { it: "Cosa costruiamo", en: "What we build" },
      title: { it: "Cosa costruiamo", en: "What we build" },
    } satisfies Section,
    cards: [
      {
        icon: "lucide:messages-square",
        title: {
          it: "Chatbot e assistenti AI",
          en: "AI chatbots and assistants",
        },
        body: {
          it: "Rispondono su sito, WhatsApp, Instagram e Facebook. Anche di notte.",
          en: "They reply on your site, WhatsApp, Instagram and Facebook. Even at night.",
        },
        claim: {
          it: "→ nessun cliente senza risposta",
          en: "→ no customer left without an answer",
        },
        links: [
          {
            label: { it: "GPT Chatbot", en: "GPT Chatbot" },
            href: "https://gptchatbot.it/",
            logo: "/logos/gpt-chatbot.png",
            external: true,
          },
          {
            label: {
              it: "Caso: noleggio bici, USA",
              en: "Case: bike rental, USA",
            },
            href: "/lavori/assistenti-noleggio-multisito",
          },
        ],
      },
      {
        icon: "lucide:zap",
        title: {
          it: "Risposta lead automatica",
          en: "Automatic lead response",
        },
        body: {
          it: "Ogni richiesta ricontattata in meno di un minuto, in automatico.",
          en: "Every request answered in under a minute, automatically.",
        },
        claim: {
          it: "→ chi risponde prima vince",
          en: "→ the first to answer wins",
        },
        links: [
          {
            label: {
              it: "Caso: studio tatuaggi, Spagna",
              en: "Case: tattoo studio, Spain",
            },
            href: "/lavori/form-whatsapp-promo-conversione",
          },
        ],
      },
      {
        icon: "lucide:file-text",
        title: {
          it: "Preventivi e documenti",
          en: "Quotes and documents",
        },
        body: {
          it: "L'AI prepara la bozza dai dati che hai già. Tu controlli e mandi.",
          en: "AI drafts them from the data you already have. You review and send.",
        },
        claim: {
          it: "→ le ore tornano al lavoro che conta",
          en: "→ your hours go back to the work that matters",
        },
        links: [
          {
            label: {
              it: "Caso: medicina estetica",
              en: "Case: aesthetic medicine",
            },
            href: "/lavori/report-medico-automatico",
          },
        ],
      },
      {
        icon: "lucide:workflow",
        title: { it: "Automazione processi", en: "Process automation" },
        body: {
          it: "Le procedure manuali ripetitive iniziano a girare da sole.",
          en: "The repetitive manual steps start running on their own.",
        },
        claim: {
          it: "→ meno lavoro a mano, meno errori",
          en: "→ less work by hand, fewer mistakes",
        },
        links: [
          {
            label: {
              it: "Caso: installatore fotovoltaico",
              en: "Case: solar installer",
            },
            href: "/lavori/pratiche-connessione-automatiche",
          },
        ],
      },
      {
        icon: "lucide:app-window",
        title: { it: "Web app su misura", en: "Custom web apps" },
        body: {
          it: "Il gestionale o il portale che ti manca, costruito su misura e collegato ai tuoi dati.",
          en: "The internal tool or portal you're missing, built to fit and wired to your data.",
        },
        claim: {
          it: "→ lo strumento giusto, non un compromesso",
          en: "→ the right tool, not a workaround",
        },
        links: [
          {
            label: { it: "WeGrocery", en: "WeGrocery" },
            href: "/wegrocery",
            logo: "/products/wegrocery/logo.png",
          },
        ],
      },
      {
        icon: "lucide:file-search",
        title: { it: "Ricerca nei documenti", en: "Search across documents" },
        body: {
          it: "Contratti, manuali e listini diventano risposte immediate.",
          en: "Contracts, manuals and price lists turn into instant answers.",
        },
        claim: {
          it: "→ basta cercare a mano",
          en: "→ no more digging by hand",
        },
        links: [
          {
            label: {
              it: "Esempio open source: second brain aziendale",
              en: "Open-source example: company second brain",
            },
            href: "/lavori/second-brain-aziendale",
          },
        ],
      },
      {
        icon: "lucide:globe",
        title: {
          it: "Raccolta dati dal web",
          en: "Web data collection",
        },
        body: {
          it: "Prezzi, cataloghi, recensioni e mosse della concorrenza: raccolti dal web in automatico e messi in tabella.",
          en: "Prices, catalogues, reviews and competitor moves: collected from the web automatically and put into a table.",
        },
        claim: {
          it: "→ i dati che ti servono, aggiornati da soli",
          en: "→ the data you need, kept current on its own",
        },
      },
      {
        icon: "lucide:chart-no-axes-column",
        title: { it: "Report e analisi", en: "Reports and analysis" },
        body: {
          it: "Dati sparsi su più sistemi diventano un report leggibile, ogni settimana senza chiederlo.",
          en: "Data scattered across systems becomes one readable report, every week without asking.",
        },
        claim: {
          it: "→ decidi sui numeri, non a sensazione",
          en: "→ decide on numbers, not gut feel",
        },
      },
      {
        icon: "lucide:star",
        title: { it: "Recensioni e reputazione", en: "Reviews and reputation" },
        body: {
          it: "Bozze di risposta nel tono della tua azienda, in ogni lingua. Tu rivedi e pubblichi.",
          en: "Draft replies in your company's tone, in any language. You review and publish.",
        },
        claim: {
          it: "→ nessuna recensione senza risposta",
          en: "→ no review left unanswered",
        },
        links: [
          {
            label: { it: "Stellar Reviews", en: "Stellar Reviews" },
            href: "/stellar-reviews",
            logo: "/products/stellar-reviews/logo.svg",
          },
          {
            label: {
              it: "Caso: struttura ricettiva, Sardegna",
              en: "Case: hospitality, Sardinia",
            },
            href: "/lavori/risposte-recensioni-ai",
          },
        ],
      },
      {
        icon: "lucide:compass",
        title: { it: "Formazione operativa", en: "Hands-on training" },
        body: {
          it: "Insegniamo a te e al tuo team a usare quello che costruiamo, sul lavoro di tutti i giorni.",
          en: "We teach you and your team to use what we build, in your day-to-day work.",
        },
        claim: {
          it: "→ resti autonomo, non dipendente",
          en: "→ you stay in charge, not tied to us",
        },
        links: [
          {
            label: {
              it: "Caso: formazione AI in aula",
              en: "Case: AI training in the classroom",
            },
            href: "/lavori/formazione-ai-in-aula",
          },
        ],
      },
    ] satisfies BuildCard[],
    extra: {
      title: { it: "Hai un altro problema?", en: "Something else slowing you down?" },
      body: {
        it: "Se si ripete e ti porta via tempo, quasi sempre si può automatizzare.",
        en: "If it repeats and eats your time, it can almost always be automated.",
      },
      cta: { it: "→ raccontacelo", en: "→ tell us about it" },
    },
  },

  work: {
    section: {
      kicker: { it: "Casi di successo", en: "Case studies" },
      titleBefore: {
        it: "Clienti veri, risultati ",
        en: "Real clients, ",
      },
      titleMark: { it: "misurati", en: "measured" },
      titleAfter: { it: "", en: " results" },
    },
    deck: {
      it: "Lavori per clienti e progetti nostri: per ognuno il problema di partenza, cosa abbiamo costruito e i numeri che si possono verificare.",
      en: "Client work and our own projects: for each one, the starting problem, what we built and numbers you can check.",
    },
    nav: {
      prev: { it: "Caso precedente", en: "Previous case" },
      next: { it: "Caso successivo", en: "Next case" },
      region: { it: "Casi di successo", en: "Case studies" },
    },
    // Link alla pagina archivio /lavori, sotto il carosello dei casi Sanity
    // (issue #13) e anche quando non ce n'è nessuno in evidenza.
    allLink: {
      label: { it: "Tutti i lavori →", en: "All work →" },
      href: "/lavori",
    },
  },

  method: {
    section: {
      kicker: { it: "Come lavoriamo", en: "How we work" },
      title: { it: "Il nostro processo", en: "Our process" },
    } satisfies Section,
    steps: [
      {
        n: "01",
        title: { it: "Ascoltiamo", en: "We listen" },
        body: {
          it: "Guardiamo come lavori oggi: quali sono i tuoi processi, dove si inceppano, cosa ti costa tempo o clienti.",
          en: "We look at how you actually work: what your processes are, where they jam, what costs you time or customers.",
        },
      },
      {
        n: "02",
        title: { it: "Costruiamo", en: "We build" },
        body: {
          it: "La soluzione è cucita sul tuo processo, non un pacchetto preconfezionato.",
          en: "The solution is tailored to your process, not an off-the-shelf package.",
        },
      },
      {
        n: "03",
        title: { it: "Ti rendiamo autonomo", en: "We hand it over" },
        body: {
          it: "Formiamo il tuo team, sia su come usare l'AI nel quotidiano sia su come usarla dentro i flussi evoluti che costruiamo insieme.",
          en: "We train your team to use AI day to day and to run what we've built together on their own.",
        },
      },
      {
        n: "04",
        title: { it: "Misuriamo", en: "We measure" },
        body: {
          it: "Monitoriamo le performance nel tempo, sui tuoi numeri. Se qualcosa non rende, lo sistemiamo.",
          en: "We track performance over time, against your own numbers. If something underperforms, we fix it.",
        },
      },
    ] satisfies Step[],
  },

  offer: {
    section: {
      kicker: { it: "Come possiamo aiutarti", en: "How we can help" },
      title: {
        it: "Tre modi di lavorare insieme, una direzione sola",
        en: "Three ways to work together, one goal: making you self-sufficient",
      },
      intro: {
        it: "Il tuo team adotta l'AI e migliora i processi di oggi senza perderne il controllo. Scegli da dove partire, senza contratti che ti legano.",
        en: "Your team adopts AI and improves today's processes without losing control of them. Pick where to start, no strings attached.",
      },
    },
    badgeFeatured: { it: "dall'idea alla produzione", en: "from idea to production" },
    tracks: [
      {
        kind: { it: "formazione", en: "training" },
        title: { it: "Formazione AI", en: "AI training" },
        body: {
          it: "Sessioni pratiche per te e il tuo team, costruite sul tuo lavoro di tutti i giorni. Alla fine il team usa l'AI senza bisogno di noi.",
          en: "Hands-on sessions for you and your team, built around your day-to-day work. By the end, your team uses AI without needing us.",
        },
        price: { it: "preventivo in base al team", en: "quoted on team size" },
        timeline: { it: "1-2 sessioni", en: "1 to 2 sessions" },
        includes: [
          {
            it: "Sessioni sul tuo lavoro di tutti i giorni, non slide",
            en: "Sessions on your day-to-day work, not slides",
          },
          {
            it: "Prompt e flussi pronti da riusare il giorno dopo",
            en: "Prompts and flows ready to reuse the next day",
          },
          {
            it: "Registrazione e materiali che restano al team",
            en: "Recording and materials the team keeps",
          },
        ],
        who: {
          it: "Team che usano già l'AI a intuito e vogliono smettere di improvvisare.",
          en: "Teams already using AI by instinct who want to stop improvising.",
        },
        steps: [
          {
            it: "Ci dici dove il team perde tempo: raccogliamo i casi concreti prima della sessione.",
            en: "You tell us where your team loses time: we collect concrete cases before the session.",
          },
          {
            it: "Lavoriamo insieme su quei casi, dal vivo, sui tuoi strumenti.",
            en: "We work through those cases together, live, on your own tools.",
          },
          {
            it: "Restano prompt, flussi e una guida scritta per il team.",
            en: "You keep the prompts, the flows and a written guide for the team.",
          },
        ],
        cta: { it: "Organizziamo la formazione\u00a0→", en: "Let's plan the training\u00a0→" },
        anchor: "formazione",
        example: "/lavori/formazione-ai-in-aula",
      },
      {
        kind: { it: "soluzione", en: "solution" },
        title: { it: "Chiavi in mano", en: "Turnkey solution" },
        body: {
          it: "Progettiamo, costruiamo e consegniamo la soluzione. Formazione inclusa: la gestisci tu, senza dipendere da noi.",
          en: "We design, build and deliver the solution. Training included: you run it, without depending on us.",
        },
        price: { it: "prezzo fisso, deciso prima", en: "fixed price, agreed upfront" },
        timeline: { it: "2-4 settimane", en: "2 to 4 weeks" },
        includes: [
          {
            it: "Analisi del processo e scelta del modello adatto",
            en: "Process analysis and the right model for the job",
          },
          {
            it: "Soluzione in produzione, integrata con i sistemi che usi",
            en: "Solution in production, integrated with the systems you use",
          },
          {
            it: "Formazione del team e documentazione per gestirla in autonomia",
            en: "Team training and documentation so you can run it yourself",
          },
        ],
        featured: true,
        who: {
          it: "Chi ha un processo che si ripete ogni giorno e costa ore o clienti persi.",
          en: "Anyone with a process that repeats every day and costs hours or lost customers.",
        },
        steps: [
          {
            it: "Mappiamo il processo con le persone che lo seguono e fissiamo il risultato atteso.",
            en: "We map the process with the people who run it and agree on the target result.",
          },
          {
            it: "Costruiamo in pochi giorni una prima versione funzionante e la provi sul lavoro di tutti i giorni.",
            en: "We build a first working version in a few days and you try it on your day-to-day work.",
          },
          {
            it: "Andiamo in produzione con una persona che controlla i passaggi delicati: niente automatismi alla cieca.",
            en: "We go live with a person checking the sensitive steps: no blind automation.",
          },
          {
            it: "Formiamo il team, lasciamo la documentazione e da lì in poi sei autonomo.",
            en: "We train the team, hand over the documentation, and from then on you're self-sufficient.",
          },
        ],
        cta: { it: "Raccontaci il processo\u00a0→", en: "Tell us about your process\u00a0→" },
        anchor: "chiavi-in-mano",
        example: "/lavori/pratiche-connessione-automatiche",
      },
      {
        kind: { it: "consulenza", en: "consulting" },
        title: { it: "Consulenza spot", en: "Advisory session" },
        body: {
          it: "Dopo la call gratuita, una sessione di lavoro a ore per capire dove l'AI conviene nella tua azienda e da dove partire. Esci con un piano scritto, che resta tuo.",
          en: "After the free call, an hourly working session to find where AI pays off in your business and where to start. You leave with a written plan that's yours to keep.",
        },
        price: { it: "a ore · prezzo trasparente", en: "hourly · transparent rate" },
        timeline: { it: "una sessione", en: "one session" },
        includes: [
          {
            it: "Una mappa di dove l'AI conviene, e dove no",
            en: "A map of where AI actually pays off, and where it doesn't",
          },
          {
            it: "Stima onesta di tempi e costi per ogni idea",
            en: "An honest time and cost estimate for each idea",
          },
          {
            it: "Che cosa fare per primo, con quale ritorno atteso",
            en: "What to do first, and the return to expect",
          },
        ],
        who: {
          it: "Chi ha molte idee sull'AI e vuole sapere quale regge prima di investirci.",
          en: "Anyone with lots of AI ideas who wants to know which one holds up before investing.",
        },
        steps: [
          {
            it: "Ci racconti il problema e come lavori oggi.",
            en: "You walk us through the problem and how you work today.",
          },
          {
            it: "Mettiamo le idee in ordine per impatto e difficoltà, insieme a te.",
            en: "We rank the ideas by impact and difficulty, with you in the room.",
          },
          {
            it: "Ti lasciamo il piano: se vuoi lo costruiamo insieme, altrimenti lo porti avanti tu.",
            en: "You leave with the plan: we can build it together, or you can take it forward on your own.",
          },
        ],
        cta: { it: "Chiedi una sessione\u00a0→", en: "Ask for a session\u00a0→" },
        anchor: "consulenza",
        example: "/lavori",
      },
    ] satisfies OfferTrack[],
    deepLink: {
      label: { it: "Vedi i servizi nel dettaglio →", en: "See our services in detail →" },
      href: "/servizi",
    },
  },

  why: {
    kicker: { it: "Perché flylabs", en: "Why flylabs" },
    statementBefore: {
      it: "Costruiamo la soluzione su misura e formiamo il team per gestirla in autonomia. Prezzo deciso prima, nessun contratto che ti lega. ",
      en: "We build the solution around your process and train your team to run it on their own. Price agreed upfront, no strings attached. ",
    },
    statementMark: {
      it: "Parli con chi costruisce.",
      en: "You talk to the people who build.",
    },
    chips: [
      { it: "prezzo trasparente", en: "transparent pricing" },
      { it: "no lock-in", en: "no lock-in" },
      { it: "team formato", en: "trained team" },
      { it: "live in 2-4 settimane", en: "live in 2-4 weeks" },
    ] as Localized[],
  },

  faq: {
    section: {
      kicker: { it: "FAQ", en: "FAQ" },
      title: { it: "Le domande che ci fanno tutti.", en: "Questions we always get." },
    } satisfies Section,
    items: [
      {
        q: { it: "Quanto costa?", en: "How much does it cost?" },
        a: {
          it: "Prezzo fisso per soluzione. Prima di iniziare sai cosa paghi e cosa ricevi.",
          en: "Fixed price per solution. Before we start, you know what you pay and what you get.",
        },
      },
      {
        q: {
          it: "Devo capirci di AI?",
          en: "Do I need to understand AI?",
        },
        a: {
          it: "No. La parte tecnica è nostra. Quello che ti serve te lo insegniamo.",
          en: "No. The technical part is on us. What you need to know, we teach you.",
        },
      },
      {
        q: { it: "Resto legato a voi?", en: "Am I locked in?" },
        a: {
          it: "No. Costruiamo la soluzione, ti formiamo e da lì è tua. Se vuoi farla crescere ci siamo, ma decidi tu.",
          en: "No. We build it, train you, and from then on it's yours. If you want to grow it further we're here, but it's your call.",
        },
      },
      {
        q: { it: "Quanto ci vuole?", en: "How long does it take?" },
        a: {
          it: "Dalla prima call alla soluzione in produzione di solito passano 2-4 settimane. Se il caso è grande lo spezziamo, partendo dal pezzo che ti fa risparmiare tempo subito.",
          en: "From the first call to a solution in production it's usually 2 to 4 weeks. If the case is big we split it, starting with the piece that saves you time right away.",
        },
      },
      {
        q: { it: "E se l'AI sbaglia?", en: "What if the AI gets it wrong?" },
        a: {
          it: "Progettiamo perché sbagliare costi poco: nei punti delicati l'AI prepara e una persona conferma. Niente invii o pubblicazioni alla cieca.",
          en: "We design so mistakes stay cheap: at the sensitive steps the AI drafts and a person confirms. Nothing gets sent or published blindly.",
        },
      },
      {
        q: {
          it: "Si integra con i software che usiamo già?",
          en: "Does it work with the software we already use?",
        },
        a: {
          it: "Di solito sì: CRM, gestionali, fogli di lavoro, WhatsApp e i canali social. Se un sistema non ha API, spesso si automatizza lo stesso.",
          en: "Usually yes: CRMs, business software, spreadsheets, WhatsApp and social channels. If a system has no API, it can often be automated anyway.",
        },
      },
      {
        q: { it: "Quale modello AI usate?", en: "Which AI model do you use?" },
        a: {
          it: "Quello che serve al problema. Lavoriamo con Claude, GPT, Gemini e DeepSeek e scegliamo in base a qualità, costo e privacy: non sei legato a un fornitore.",
          en: "Whichever fits the problem. We work with Claude, GPT, Gemini and DeepSeek and choose on quality, cost and privacy: you're not tied to one vendor.",
        },
      },
      {
        q: { it: "I nostri dati dove finiscono?", en: "Where does our data end up?" },
        a: {
          it: "Nei sistemi che usi già, più i soli servizi che il flusso richiede, come il fornitore del modello AI. Prima di partire ti diciamo quali servizi tocca il flusso, quali dati ci passano e dove vengono trattati.",
          en: "In the systems you already use, plus only the services the workflow needs, such as the AI model provider. Before we start we tell you which services the workflow touches, what data goes through them and where it's processed.",
        },
      },
      {
        q: { it: "Cosa vi serve da noi?", en: "What do you need from us?" },
        a: {
          it: "Poche ore di chi conosce il processo, gli accessi ai sistemi coinvolti e qualche esempio concreto. Il resto è lavoro nostro.",
          en: "A few hours from whoever knows the process, access to the systems involved and a handful of real examples. The rest is on us.",
        },
      },
    ] satisfies Faq[],
  },

  finalCta: {
    title: {
      it: "Il primo passo è capire il tuo problema.",
      en: "The first step is understanding your problem.",
    },
    body: {
      it: "Scrivici in due righe cosa ti fa perdere tempo. Ti risponde uno di noi, Cesare o Federico, e fissiamo una call gratuita per capire cosa si può automatizzare e da dove partire.",
      en: "Tell us in a couple of lines what's eating your time. One of us, Cesare or Federico, will reply and set up a free call to see what can be automated and where to start.",
    },
    cta: {
      it: "Prenota una call gratuita →",
      en: "Book a free call →",
    },
    // Sotto il bottone di prenotazione (TidyCal): cosa aspettarsi, in una riga.
    bookNote: {
      it: "15 minuti online, scegli tu l'orario. Il calendario si apre in una nuova scheda.",
      en: "15 minutes online, at a time that suits you. The calendar opens in a new tab.",
    },
    orEmail: { it: "oppure scrivici a", en: "or email us at" },
    formHeading: {
      it: "Preferisci scrivere? Raccontaci il problema.",
      en: "Rather write? Tell us the problem.",
    },
  },

  // Form di contatto (nel blocco CTA finale). Le richieste finiscono su Sanity.
  contact: {
    labels: {
      name: { it: "Nome", en: "Name" },
      company: { it: "Azienda", en: "Company" },
      email: { it: "Email", en: "Email" },
      message: { it: "Messaggio", en: "Message" },
    },
    optional: { it: "facoltativo", en: "optional" },
    requiredLegend: {
      it: "I campi con * sono obbligatori.",
      en: "Fields marked * are required.",
    },
    // Hint visibile sotto la label del messaggio (era il placeholder).
    messageHint: {
      it: "Cosa ti fa perdere tempo? Raccontaci in due righe.",
      en: "What's eating your time? Tell us in a couple of lines.",
    },
    submit: { it: "Invia richiesta", en: "Send request" },
    sending: { it: "Invio…", en: "Sending…" },
    // Richiamo all'informativa nel punto di raccolta (primo livello, WP260).
    privacy: {
      before: {
        it: "Usiamo i tuoi dati solo per risponderti e li conserviamo al massimo 24 mesi. Dettagli nella ",
        en: "We only use your details to reply to you and keep them for up to 24 months. Details in our ",
      },
      link: { it: "Privacy Policy", en: "Privacy Policy" },
      after: { it: ".", en: "." },
    },
    success: {
      title: {
        it: "Ricevuto, grazie.",
        en: "Got it, thanks.",
      },
      body: {
        it: "Ti scrive Cesare o Federico da info@flylabs.ai per fissare la call. Intanto, se vuoi, ",
        en: "Cesare or Federico will email you from info@flylabs.ai to set up the call. Meanwhile, feel free to ",
      },
      link: {
        label: { it: "guarda i nostri lavori", en: "browse our work" },
        href: "/lavori",
      },
      after: { it: ".", en: "." },
      // Mostrato solo se su Sanity c'è il link di prenotazione.
      book: {
        it: "Se preferisci, prenota subito 15 minuti →",
        en: "If you prefer, book 15 minutes right away →",
      },
    },
    // Precompilazioni del messaggio per le CTA con contesto (B55, WS-10).
    prefill: {
      stellarAudit: {
        it: "Vorrei l'audit gratuito di Stellar Reviews per la mia struttura: [nome o link Google/Booking]",
        en: "I'd like the free Stellar Reviews audit for my business: [name or Google/Booking link]",
      },
      training: {
        it: "Vorrei organizzare una formazione AI per il mio team di [N] persone.",
        en: "I'd like to organise AI training for my team of [N] people.",
      },
    },
    errors: {
      // Fallback generico: la server action indica sempre anche il campo,
      // e il form mostra il messaggio specifico di `fields`.
      missing: {
        it: "Compila i campi obbligatori.",
        en: "Please fill in the required fields.",
      },
      email: {
        it: "Controlla l'email: deve essere tipo nome@azienda.it",
        en: "Check your email: it should look like name@company.com",
      },
      fields: {
        name: { it: "Scrivi il tuo nome.", en: "Please enter your name." },
        email: {
          it: "Controlla l'email: deve essere tipo nome@azienda.it",
          en: "Check your email: it should look like name@company.com",
        },
        message: {
          it: "Scrivi due righe su cosa ti serve.",
          en: "Write a couple of lines about what you need.",
        },
      },
      // Aggiunto agli errori server/rate: i campi restano compilati.
      kept: {
        it: "Quello che hai scritto è ancora qui.",
        en: "What you typed is still here.",
      },
      server: {
        it: "Qualcosa è andato storto. Riprova tra poco.",
        en: "Something went wrong. Please try again shortly.",
      },
      rate: {
        it: "Troppe richieste ravvicinate. Riprova tra qualche minuto.",
        en: "Too many requests in a short time. Please try again in a few minutes.",
      },
    },
  },

  // Teaser in fondo alla home → rimanda alla pagina /stack (non in menu).
  toolsStrip: {
    kicker: { it: "Sotto il cofano", en: "Under the hood" },
    title: { it: "I tool che usiamo", en: "The tools we use" },
    body: {
      it: "Non reinventiamo la ruota: combiniamo i migliori strumenti di AI, automazione e dati in base al tuo problema.",
      en: "We don't reinvent the wheel: we combine the best AI, automation and data tools to fit your problem.",
    },
    cta: { it: "Vedi tutto lo stack →", en: "See the full stack →" },
    href: "/stack",
    logos: [
      "logos:anthropic-icon",
      "logos:openai-icon",
      "simple-icons:n8n",
      "simple-icons:make",
      "logos:zapier-icon",
      "logos:hubspot",
      "logos:nextjs-icon",
      "logos:vercel-icon",
    ],
  },

  // Pagina /servizi: approfondimento dei tre modi di lavorare insieme.
  // I contenuti dei binari vivono in `offer.tracks` (who/steps/includes):
  // qui stanno solo le etichette e la cornice della pagina.
  services: {
    meta: {
      it: {
        title: "Consulenza, sviluppo e formazione AI | flylabs.ai",
        description:
          "Formazione AI per il team, soluzioni chiavi in mano e consulenza a ore: tempi, cosa è incluso e come si decide il prezzo, detti prima.",
      },
      en: {
        title: "AI consulting, development and training | flylabs.ai",
        description:
          "AI training for your team, turnkey solutions and hourly advisory: timelines, what's included and how pricing works, stated upfront.",
      },
    },
    kicker: { it: "Servizi", en: "Services" },
    title: { it: "Come lavoriamo insieme", en: "How we work together" },
    intro: {
      it: "Tre punti di partenza, un solo metodo: capire il problema, costruire la soluzione più semplice che lo risolve, lasciarti in grado di gestirla da solo.",
      en: "Three starting points, one method: understand the problem, build the simplest thing that solves it, and leave you able to run it yourself.",
    },
    back: { it: "← Torna alla home", en: "← Back home" },
    labels: {
      who: { it: "Per chi è", en: "Who it's for" },
      includes: { it: "Cosa è incluso", en: "What's included" },
      steps: { it: "Come funziona", en: "How it works" },
      timeline: { it: "Tempi", en: "Timeline" },
      price: { it: "Prezzo", en: "Price" },
    },
    closing: {
      title: {
        it: "Non sai quale dei tre ti serve?",
        en: "Not sure which one you need?",
      },
      body: {
        it: "Nemmeno noi, finché non ci racconti il problema. La prima call serve a capirlo insieme, ed è gratuita.",
        en: "Neither do we, until you tell us the problem. The first call is there to figure it out together, and it's free.",
      },
      cta: { it: "Parliamone →", en: "Let's talk →" },
    },
  },

  // Pagina dedicata /stack: dal teaser in home e dalla nav/footer.
  stack: {
    meta: {
      it: {
        title: "Il nostro stack AI e di automazione | flylabs.ai",
        description:
          "I tool AI, di automazione e dati che usiamo per costruire le soluzioni: Claude, n8n, Make, Apify e altri.",
      },
      en: {
        title: "Our AI and automation stack | flylabs.ai",
        description:
          "The AI, automation and data tools we use to build solutions: Claude, n8n, Make, Apify and more.",
      },
    },
    kicker: { it: "Sotto il cofano", en: "Under the hood" },
    title: { it: "I tool che usiamo", en: "The tools we use" },
    intro: {
      it: "Scegliamo lo strumento giusto per ogni pezzo del lavoro (modelli, orchestrazione, dati, web) e li combiniamo sul tuo caso. Nessun lock-in su una piattaforma sola.",
      en: "We pick the right tool for each part of the job (models, orchestration, data, web) and combine them for your case. No lock-in to a single platform.",
    },
    back: { it: "← Torna alla home", en: "← Back home" },
    // Disclaimer sui marchi di terzi, in fondo alla pagina (B32, WS-5).
    disclaimer: {
      it: "Marchi e loghi appartengono ai rispettivi titolari. Li mostriamo per indicare gli strumenti che usiamo: non implicano partnership o sponsorizzazione.",
      en: "Trademarks and logos belong to their respective owners. We show them to indicate the tools we use: no partnership or endorsement is implied.",
    },
    groups: [
      {
        name: { it: "AI e modelli", en: "AI & models" },
        tools: [
          {
            icon: "logos:anthropic-icon",
            name: "Claude",
            desc: {
              it: "Il nostro modello principale per ragionamento e scrittura.",
              en: "Our main model for reasoning and writing.",
            },
          },
          {
            icon: "logos:openai-icon",
            name: "GPT · OpenAI",
            desc: {
              it: "Modelli OpenAI dove sono la scelta migliore.",
              en: "OpenAI models where they're the better fit.",
            },
          },
          {
            icon: "logos:google-gemini",
            name: "Gemini",
            desc: {
              it: "Modelli Google per task multimodali.",
              en: "Google models for multimodal tasks.",
            },
          },
          {
            icon: "logos:perplexity-icon",
            name: "Perplexity",
            desc: {
              it: "Ricerca con fonti per contenuti e analisi.",
              en: "Sourced research for content and analysis.",
            },
          },
        ],
      },
      {
        name: { it: "Framework AI e RAG", en: "AI frameworks & RAG" },
        tools: [
          {
            icon: "simple-icons:langchain",
            name: "LangChain",
            desc: {
              it: "Orchestrazione di catene e agenti LLM.",
              en: "Orchestrating LLM chains and agents.",
            },
          },
          {
            name: "LlamaIndex",
            desc: {
              it: "Indicizzazione e retrieval sui tuoi dati.",
              en: "Indexing and retrieval over your data.",
            },
          },
          {
            icon: "logos:vercel-icon",
            name: "Vercel AI SDK",
            desc: {
              it: "Streaming, tool calling e UI AI in produzione.",
              en: "Streaming, tool calling and AI UI in production.",
            },
          },
          {
            icon: "simple-icons:crewai",
            name: "CrewAI",
            desc: {
              it: "Più agenti che collaborano sullo stesso task.",
              en: "Multiple agents collaborating on one task.",
            },
          },
          {
            icon: "logos:pinecone",
            name: "Pinecone",
            desc: {
              it: "Vector database per la ricerca semantica.",
              en: "Vector database for semantic search.",
            },
          },
          {
            icon: "logos:supabase-icon",
            name: "Supabase",
            desc: {
              it: "Postgres + pgvector, auth e storage per le app.",
              en: "Postgres + pgvector, auth and storage for apps.",
            },
          },
        ],
      },
      {
        name: { it: "Automazione e orchestrazione", en: "Automation & orchestration" },
        tools: [
          {
            icon: "simple-icons:n8n",
            name: "n8n",
            desc: {
              it: "Orchestrazione self-hosted dei flussi, senza limiti di piattaforma.",
              en: "Self-hosted workflow orchestration, no platform limits.",
            },
          },
          {
            icon: "simple-icons:make",
            name: "Make",
            desc: {
              it: "Automazioni visuali multi-step, veloci da montare.",
              en: "Visual multi-step automations, quick to assemble.",
            },
          },
          {
            icon: "logos:zapier-icon",
            name: "Zapier",
            desc: {
              it: "Connettori rapidi tra le app che già usi.",
              en: "Quick connectors between the apps you already use.",
            },
          },
        ],
      },
      {
        name: { it: "Voice, telefonia e audio", en: "Voice, telephony & audio" },
        tools: [
          {
            icon: "simple-icons:elevenlabs",
            name: "ElevenLabs",
            desc: {
              it: "Voci sintetiche realistiche per gli agenti.",
              en: "Realistic synthetic voices for agents.",
            },
          },
          {
            name: "Vapi",
            desc: {
              it: "Voice agent telefonici in tempo reale.",
              en: "Real-time telephone voice agents.",
            },
          },
          {
            icon: "logos:twilio-icon",
            name: "Twilio",
            desc: {
              it: "SMS, voce e WhatsApp programmabili.",
              en: "Programmable SMS, voice and WhatsApp.",
            },
          },
          {
            icon: "logos:openai-icon",
            name: "Whisper",
            desc: {
              it: "Trascrizione speech-to-text multilingua.",
              en: "Multilingual speech-to-text transcription.",
            },
          },
          {
            icon: "simple-icons:deepgram",
            name: "Deepgram",
            desc: {
              it: "Trascrizione in tempo reale a bassa latenza.",
              en: "Low-latency real-time transcription.",
            },
          },
          {
            name: "Fireflies",
            desc: {
              it: "Trascrive le call e ne estrae gli action item.",
              en: "Transcribes calls and extracts action items.",
            },
          },
        ],
      },
      {
        name: { it: "Dati e scraping", en: "Data & scraping" },
        tools: [
          {
            icon: "devicon:apify",
            name: "Apify",
            desc: {
              it: "Scraping di recensioni, social e web a scala.",
              en: "Scraping reviews, social and web at scale.",
            },
          },
          {
            icon: "simple-icons:googlesheets",
            name: "Google Sheets",
            desc: {
              it: "Interfacce operative human-in-the-loop.",
              en: "Human-in-the-loop operator interfaces.",
            },
          },
          {
            icon: "logos:airtable",
            name: "Airtable",
            desc: {
              it: "Database no-code per dati e workflow leggeri.",
              en: "No-code database for data and light workflows.",
            },
          },
          {
            icon: "logos:google-cloud",
            name: "BigQuery",
            desc: {
              it: "Data warehouse per analisi su grandi volumi.",
              en: "Data warehouse for large-scale analytics.",
            },
          },
        ],
      },
      {
        name: { it: "Web e deploy", en: "Web & deploy" },
        tools: [
          {
            icon: "logos:nextjs-icon",
            name: "Next.js",
            desc: {
              it: "Web app e siti moderni, veloci e SEO-ready.",
              en: "Modern web apps and sites, fast and SEO-ready.",
            },
          },
          {
            icon: "logos:vercel-icon",
            name: "Vercel",
            desc: {
              it: "Hosting e deploy continui, preview su ogni modifica.",
              en: "Continuous hosting and deploy, preview on every change.",
            },
          },
          {
            icon: "logos:postgresql",
            name: "Postgres",
            desc: {
              it: "Database solido per le app su misura.",
              en: "Solid database for custom apps.",
            },
          },
        ],
      },
      {
        name: { it: "Marketing e advertising", en: "Marketing & advertising" },
        tools: [
          {
            name: "Higgsfield",
            desc: {
              it: "Video AI per creatività social e ads.",
              en: "AI video for social and ad creative.",
            },
          },
          {
            icon: "logos:meta-icon",
            name: "Meta Ads",
            desc: {
              it: "Campagne su Facebook e Instagram, anche automatizzate.",
              en: "Facebook and Instagram campaigns, automated too.",
            },
          },
          {
            icon: "logos:google-ads",
            name: "Google Ads",
            desc: {
              it: "Campagne search e performance su Google.",
              en: "Search and performance campaigns on Google.",
            },
          },
        ],
      },
      {
        name: { it: "CRM, email e booking", en: "CRM, email & booking" },
        tools: [
          {
            icon: "logos:hubspot",
            name: "HubSpot",
            desc: {
              it: "CRM e gestione dei lead.",
              en: "CRM and lead management.",
            },
          },
          {
            icon: "simple-icons:brevo",
            name: "Brevo",
            desc: {
              it: "Email, sequenze e follow-up automatici.",
              en: "Email, sequences and automated follow-up.",
            },
          },
          {
            icon: "simple-icons:resend",
            name: "Resend",
            desc: {
              it: "Email transazionali affidabili.",
              en: "Reliable transactional email.",
            },
          },
          {
            name: "TidyCal",
            desc: {
              it: "Prenotazione call con domande di qualifica.",
              en: "Call booking with qualification questions.",
            },
          },
          {
            icon: "simple-icons:calendly",
            name: "Calendly",
            desc: {
              it: "Scheduling delle call e sync col calendario.",
              en: "Call scheduling and calendar sync.",
            },
          },
        ],
      },
      {
        name: { it: "Dev e produttività", en: "Dev & productivity" },
        tools: [
          {
            icon: "logos:python",
            name: "Python",
            desc: {
              it: "Il linguaggio dei nostri script, modelli e pipeline.",
              en: "The language of our scripts, models and pipelines.",
            },
          },
          {
            icon: "logos:notion-icon",
            name: "Notion",
            desc: {
              it: "Knowledge base e gestione del lavoro.",
              en: "Knowledge base and work management.",
            },
          },
        ],
      },
      {
        name: { it: "Canali e messaggistica", en: "Channels & messaging" },
        tools: [
          {
            icon: "logos:whatsapp-icon",
            name: "WhatsApp",
            desc: {
              it: "Chatbot e notifiche dove sono i tuoi clienti.",
              en: "Chatbots and notifications where your customers are.",
            },
          },
          {
            icon: "skill-icons:instagram",
            name: "Instagram",
            desc: {
              it: "Risposte e lead dai social.",
              en: "Replies and leads from social.",
            },
          },
          {
            icon: "logos:messenger",
            name: "Messenger",
            desc: {
              it: "Conversazioni su Facebook.",
              en: "Conversations on Facebook.",
            },
          },
          {
            icon: "logos:telegram",
            name: "Telegram",
            desc: {
              it: "Bot e notifiche su Telegram.",
              en: "Bots and notifications on Telegram.",
            },
          },
        ],
      },
    ] satisfies StackGroup[],
  },

  // Etichette condivise dalle pagine di dettaglio prodotto (Stellar Reviews,
  // WeGrocery): stesso "Problema"/"Soluzione" in entrambe, un solo posto da
  // tradurre invece di duplicarlo per prodotto.
  productLabels: {
    problem: { it: "Problema", en: "Problem" },
    solution: { it: "Soluzione", en: "Solution" },
  },

  products: {
    meta: {
      it: {
        title: "Prodotti AI: chatbot, recensioni, ordini di gruppo | flylabs.ai",
        description:
          "I prodotti che abbiamo costruito e offriamo ai nostri clienti: chatbot AI, gestione recensioni, ordini di gruppo. Implementazione su misura o self-service.",
      },
      en: {
        title: "AI products: chatbot, reviews, group orders | flylabs.ai",
        description:
          "The products we've built and offer to our clients: AI chatbot, review management, group ordering. Custom implementation or self-service.",
      },
    },
    kicker: { it: "Prodotti", en: "Products" },
    title: {
      it: "Software che abbiamo costruito, pronto per il tuo caso",
      en: "Software we've built, ready for your case",
    },
    intro: {
      it: "Ogni prodotto nasce dal problema concreto di un cliente. Li manteniamo e aggiorniamo, e li offriamo a chi ha lo stesso problema.",
      en: "Every product started from one client's concrete problem. We maintain and update them, and offer them to anyone with the same problem.",
    },
    philosophyTitle: {
      it: "Perché prodotti, non solo progetti su misura",
      en: "Why products, not just bespoke projects",
    },
    philosophyBody: {
      it: "Un progetto su misura risolve un problema una volta sola. Quando lo stesso problema si ripete su clienti diversi, lo generalizziamo in un prodotto: stessa qualità, meno tempo per arrivarci, prezzo più accessibile.",
      en: "A bespoke project solves a problem once. When the same problem shows up across different clients, we generalise it into a product: same quality, less time to get there, a more accessible price.",
    },
    modes: {
      kicker: { it: "Come li offriamo", en: "How we offer them" },
      title: {
        it: "Due modalità, la stessa qualità",
        en: "Two ways to run it, the same quality",
      },
      custom: {
        title: { it: "Implementazione su misura", en: "Custom implementation" },
        body: {
          it: "Lo implementiamo noi nel tuo workspace, con le tue chiavi e i tuoi account. Tu mantieni il controllo pieno, noi ci occupiamo di tutto il resto.",
          en: "We implement it inside your own workspace, with your keys and your accounts. You keep full control, we handle everything else.",
        },
      } satisfies ProductMode,
      saas: {
        title: { it: "Self-service SaaS", en: "Self-service SaaS" },
        body: {
          it: "Ti abboni e usi la web app in autonomia, senza bisogno di noi per partire.",
          en: "You subscribe and run the web app on your own, with no need for us to get started.",
        },
      } satisfies ProductMode,
    },
    items: [
      {
        slug: "gpt-chatbot",
        icon: "lucide:message-circle",
        logo: "/logos/gpt-chatbot.png",
        name: "GPT Chatbot",
        tagline: {
          it: "Chatbot AI addestrato sui tuoi contenuti, sul tuo sito in pochi minuti.",
          en: "AI chatbot trained on your content, live on your site in minutes.",
        },
        sector: { it: "Assistenza e vendita online", en: "Support and online sales" },
        href: "https://gptchatbot.it/",
        external: true,
        note: {
          it: "È lo stesso chatbot che vedi in basso a destra su questo sito.",
          en: "It's the same chatbot you see in the bottom-right corner of this site.",
        },
        preview: {
          src: { it: "/products/gpt-chatbot/chat-it.jpg", en: "/products/gpt-chatbot/chat-en.jpg" },
          alt: {
            it: "Conversazione reale con l'assistente di flylabs.ai: a una domanda sulle richieste WhatsApp serali risponde che si possono gestire H24 con un assistente AI.",
            en: "Real conversation with the flylabs.ai assistant: asked about evening WhatsApp messages, it explains they can be handled 24/7 by an AI assistant.",
          },
        },
      },
      {
        slug: "stellar-reviews",
        icon: "lucide:star",
        logo: "/products/stellar-reviews/logo.svg",
        name: "Stellar Reviews",
        tagline: {
          it: "Audit e risposte alle recensioni, da Google, Tripadvisor e Booking.",
          en: "Review audits and replies, from Google, Tripadvisor and Booking.",
        },
        sector: { it: "Ricettivo e retail", en: "Hospitality and retail" },
        href: "/stellar-reviews",
      },
      {
        slug: "wegrocery",
        icon: "lucide:shopping-basket",
        logo: "/products/wegrocery/logo.png",
        name: "WeGrocery",
        tagline: {
          it: "Piattaforma open source per gli ordini di gruppo dei GAS.",
          en: "Open-source platform for buying clubs' group orders.",
        },
        sector: { it: "No-profit, gruppi d'acquisto", en: "Non-profit, buying clubs" },
        href: "/wegrocery",
        preview: {
          src: { it: "/products/wegrocery/launch-poster.jpg", en: "/products/wegrocery/launch-poster.jpg" },
          alt: {
            it: "Fotogramma del video di lancio di WeGrocery.",
            en: "Frame from the WeGrocery launch video.",
          },
        },
      },
    ] satisfies Product[],
    cardCtaInternal: { it: "Scopri di più →", en: "Learn more →" },
    cardCtaExternal: { it: "Vai al sito →", en: "Visit the site →" },
    back: { it: "← Torna alla home", en: "← Back home" },
  },

  stellarReviews: {
    meta: {
      it: {
        title: "Stellar Reviews: risposte AI alle recensioni | flylabs.ai",
        description:
          "Legge e risponde alle recensioni della tua struttura da Google, Tripadvisor e Booking. Audit gratuito, poi il motore che prepara le bozze ogni giorno.",
      },
      en: {
        title: "Stellar Reviews: AI replies to your reviews | flylabs.ai",
        description:
          "Reads and drafts replies to your business reviews from Google, Tripadvisor and Booking. Free audit, then a daily engine that drafts replies for you.",
      },
    },
    title: { it: "Stellar Reviews", en: "Stellar Reviews" },
    logo: "/products/stellar-reviews/logo.svg",
    tagline: {
      it: "Le recensioni della tua struttura, lette ogni giorno, con la bozza di risposta già pronta.",
      en: "Your reviews, read every day, with a reply draft ready to go.",
    },
    problem: {
      it: "I gruppi ricettivi gestiscono le recensioni a mano: si perde tempo a leggerle su tre piattaforme diverse, e chi non ha ancora risposto rischia di restarci per mesi.",
      en: "Hospitality businesses manage reviews by hand: time is lost reading them across three different platforms, and unanswered ones can sit there for months.",
    },
    solution: {
      it: "Stellar Reviews scarica le recensioni da Google, Tripadvisor e Booking ogni giorno, e prepara le bozze di risposta con Claude, nella lingua di chi ha scritto e nel tono del titolare. La pubblicazione resta sempre una scelta umana.",
      en: "Stellar Reviews pulls in reviews from Google, Tripadvisor and Booking every day, and drafts replies with Claude, in the reviewer's language and the owner's tone. Publishing stays a human choice, always.",
    },
    featuresTitle: { it: "Cosa fa", en: "What it does" },
    features: [
      {
        it: "Audit gratuito: quante recensioni hai, quante senza risposta, come ti posizioni rispetto ai concorrenti della zona",
        en: "Free audit: how many reviews you have, how many are unanswered, and how you compare to nearby competitors",
      },
      {
        it: "Controllo giornaliero: scarica le nuove recensioni e prepara le bozze di risposta, pronte da rivedere",
        en: "Daily check: pulls in new reviews and drafts replies, ready for you to review",
      },
      {
        it: "Tre fonti in un colpo solo: Google, Tripadvisor e Booking, senza passare da una piattaforma all'altra",
        en: "Three sources at once: Google, Tripadvisor and Booking, no need to hop between platforms",
      },
    ] satisfies Localized[],
    modesTitle: { it: "Come lo attivi", en: "How to get it" },
    modeCustom: {
      title: { it: "Implementazione su misura", en: "Custom implementation" },
      body: {
        it: "Attiviamo l'audit e il controllo giornaliero per la tua struttura, con le tue credenziali. Si parte da un audit gratuito.",
        en: "We set up the audit and the daily check for your business, with your own credentials. It starts with a free audit.",
      },
      cta: { it: "Richiedi l'audit gratuito", en: "Request the free audit" },
    } satisfies ProductMode,
    modeSaas: {
      title: { it: "Self-service SaaS", en: "Self-service SaaS" },
      body: {
        it: "Una dashboard a cui abbonarsi in autonomia è il passo successivo: oggi Stellar Reviews si attiva come implementazione su misura.",
        en: "A dashboard you can subscribe to on your own is the next step: today Stellar Reviews is only available as a custom implementation.",
      },
      note: { it: "In arrivo", en: "Coming soon" },
    } satisfies ProductMode,
    caseLink: {
      label: {
        it: "Caso reale: come lo usa una struttura ricettiva →",
        en: "Real case: how a hospitality business uses it →",
      },
      href: "/lavori/risposte-recensioni-ai",
    },
    back: { it: "← Tutti i prodotti", en: "← All products" },
  },

  wegroceryProduct: {
    meta: {
      it: {
        title: "WeGrocery: ordini di gruppo per GAS, open source | flylabs.ai",
        description:
          "WeGrocery: la piattaforma open source white-label per gestire gli ordini di gruppo dei GAS. Provala in demo o attiva il tuo deploy.",
      },
      en: {
        title: "WeGrocery: open-source group ordering for buying clubs | flylabs.ai",
        description:
          "WeGrocery: the open-source, white-label platform for buying clubs' group orders. Try the demo or activate your own deployment.",
      },
    },
    title: { it: "WeGrocery", en: "WeGrocery" },
    logo: "/products/wegrocery/logo.png",
    media: {
      // Tour della demo pubblica: era una GIF da 248 KB in loop infinito,
      // anche con reduced-motion. Ora è un MP4 muto con comandi, in autoplay
      // solo se l'utente non chiede meno movimento (components/landing/
      // autoplay-video.tsx). Il poster è il primo fotogramma.
      demoVideo: {
        src: "/products/wegrocery/demo.mp4",
        poster: "/products/wegrocery/demo-poster.jpg",
        width: 340,
        height: 712,
        label: {
          it: "Demo pubblica di WeGrocery, senza audio: le schermate del socio (saldo, ordine, storico, notifiche, guida) e dell'admin (ciclo, prodotti, ordini, cassa, soci, fornitori, statistiche)",
          en: "WeGrocery public demo, no audio: the member screens (balance, order, history, notifications, guide) and the admin screens (cycle, products, orders, treasury, members, suppliers, stats)",
        },
      },
      launchVideo: {
        src: "/products/wegrocery/launch.mp4",
        poster: "/products/wegrocery/launch-poster.jpg",
        caption: {
          it: "Video di lancio di WeGrocery",
          en: "WeGrocery launch video",
        },
        // Alternativa testuale del video (senza audio, testi in sovraimpressione):
        // resa sotto il player da WS-5 (B32, A11Y-09).
        transcript: {
          it: "Cosa mostra il video: ogni settimana lo stesso foglio di calcolo, con errori nelle formule. WeGrocery raccoglie gli ordini di tutto il gruppo in un'unica pagina, con un ciclo settimanale. Costo di esercizio: 0 € al mese per hosting, database, job pianificati ed email, tutto su piani gratuiti (Next.js su Vercel, Neon Postgres, GitHub Actions, Resend). È open source con licenza MIT: puoi installarlo per il tuo gruppo.",
          en: "What the video shows: every week, the same spreadsheet with broken formulas. WeGrocery collects the whole group's orders on one page, in a weekly cycle. Running cost: €0 per month for hosting, database, scheduled jobs and email, all on free tiers (Next.js on Vercel, Neon Postgres, GitHub Actions, Resend). It's open source under the MIT licence: you can run it for your group.",
        },
      },
    },
    tagline: {
      it: "Ordini di gruppo e saldo prepagato, senza fogli di calcolo.",
      en: "Group orders and a prepaid balance, no spreadsheets.",
    },
    problem: {
      it: "I gruppi d'acquisto solidale coordinano gli ordini condivisi a mano, tra fogli di calcolo e messaggi WhatsApp, con errori e tempo perso a ogni ciclo.",
      en: "Group buying clubs coordinate shared orders by hand, between spreadsheets and WhatsApp threads, with mistakes and wasted time on every cycle.",
    },
    solution: {
      it: "Un'unica piattaforma open source (licenza MIT) che ogni gruppo attiva con il proprio nome, la propria lingua e i propri colori, senza sviluppi dedicati: quando miglioriamo la piattaforma, l'aggiornamento arriva a tutti i gruppi insieme.",
      en: "A single open-source platform (MIT licence) that any group can launch under its own name, language and colours, with no custom development: when we improve the platform, every group gets the update at once.",
    },
    mediaTitle: { it: "WeGrocery in azione", en: "WeGrocery in action" },
    featuresTitle: { it: "Cosa fa", en: "What it does" },
    features: [
      {
        it: "Cicli d'ordine con finestra di apertura e chiusura, catalogo condiviso e notifiche automatiche",
        en: "Order cycles with an opening and closing window, a shared catalogue and automatic notifications",
      },
      {
        it: "Saldo prepagato per ogni socio, aggiornato in tempo reale mentre ordina",
        en: "A prepaid balance for every member, updated in real time as they order",
      },
      {
        it: "Nome, lingua (italiano o inglese) e colori del tuo gruppo, senza toccare il codice",
        en: "Your group's name, language (Italian or English) and colours, with no code changes",
      },
    ] satisfies Localized[],
    modesTitle: { it: "Come lo attivi", en: "How to get it" },
    modeCustom: {
      title: { it: "Implementazione su misura", en: "Custom implementation" },
      body: {
        it: "Ti attiviamo il tuo deploy white-label: dominio, marchio e integrazioni con i tuoi fornitori, senza doverlo gestire da solo.",
        en: "We activate your own white-label deployment: domain, branding and integrations with your suppliers, without you having to run it yourself.",
      },
      cta: { it: "Parliamo del tuo progetto", en: "Let's talk about your project" },
    } satisfies ProductMode,
    modeSaas: {
      title: { it: "Self-service", en: "Self-service" },
      body: {
        it: "Il codice è pubblico e gratuito: lo installi e lo gestisci da solo, oppure prima esplori la demo pubblica con dati finti.",
        en: "The code is public and free: install and run it yourself, or start by exploring the public demo with fake data.",
      },
      cta: { it: "Prova la demo", en: "Try the demo" },
      href: "https://wegrocery-demo.vercel.app",
      external: true,
      cta2: { it: "Codice su GitHub →", en: "Code on GitHub →" },
      href2: "https://github.com/federicodecillia/wegrocery",
      external2: true,
    } satisfies ProductMode,
    caseLink: {
      label: {
        it: "Caso reale: un gruppo d'acquisto a Milano →",
        en: "Real case: a buying club in Milan →",
      },
      href: "/lavori/wegrocery-ordini-di-gruppo",
    },
    back: { it: "← Tutti i prodotti", en: "← All products" },
  },

  // Cornice comune delle pagine (components/landing/page-shell.tsx).
  shell: {
    skip: { it: "Salta al contenuto", en: "Skip to content" },
  },

  // 404 localizzata per i path con prefisso /it o /en (app/[locale]/not-found.tsx).
  // I path senza lingua restano su app/global-not-found.tsx, bilingue.
  notFound: {
    metaTitle: {
      it: "Pagina non trovata | flylabs.ai",
      en: "Page not found | flylabs.ai",
    },
    metaDescription: { it: "Pagina non trovata.", en: "Page not found." },
    title: {
      it: "Questa pagina non esiste (più).",
      en: "This page doesn't exist (anymore).",
    },
    body: {
      it: "Forse il link è vecchio o c'è un errore di battitura. Intanto puoi guardare cosa abbiamo costruito o scriverci.",
      en: "The link may be old or mistyped. Meanwhile, have a look at what we've built or drop us a line.",
    },
    home: { it: "Torna alla home", en: "Back to home" },
    work: { it: "Vedi i lavori", en: "See our work" },
  },

  footer: {
    tagline: {
      it: "AI concreta, costruita sul tuo lavoro. Poi la gestisci tu.",
      en: "Practical AI, built around your work. Then you run it.",
    },
    vatLabel: { it: "P.IVA", en: "VAT no." },
    navLabel: { it: "Link del sito", en: "Site links" },
    nav: [
      { href: "", label: { it: "Home", en: "Home" } },
      { href: "/lavori", label: { it: "Lavori", en: "Work" } },
      { href: "/servizi", label: { it: "Servizi", en: "Services" } },
      { href: "/prodotti", label: { it: "Prodotti", en: "Products" } },
      { href: "/stack", label: { it: "Stack", en: "Stack" } },
    ],
  },
} as const;
