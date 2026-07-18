import type { Locale } from "@/lib/i18n";

/**
 * Contenuti della landing, bilingue (it/en).
 *
 * NOTA: temporaneo. Quando il design è bloccato, questo migra su Sanity
 * (localeString/localeText) — vedi skill cms-change. Tenuto qui come fonte
 * unica e tipizzata per iterare veloce sul visivo.
 *
 * I numeri in `work` sono PLACEHOLDER: vanno sostituiti coi dati reali dei
 * clienti (cfr. .context/positioning.md → "Da fare").
 */

export type Localized = Record<Locale, string>;

type NavContent = {
  links: { href: string; label: Localized }[];
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
  flow: {
    label: Localized;
    status: Localized;
    trigger: { kind: Localized; title: Localized; sub: Localized };
    brain: { kind: Localized; title: Localized; sub: Localized };
    action1: { kind: Localized; title: Localized };
    action2: { kind: Localized; title: Localized };
    annotation: Localized;
  };
};

type Section = { no: string; kicker: Localized; title: Localized };

export type BuildCard = {
  icon: string;
  title: Localized;
  body: Localized;
  claim: Localized;
};

export type WorkCard = {
  tag: Localized;
  problem: Localized;
  solution: Localized;
  metric: string;
  metricLabel: Localized;
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
  // Approfondimento usato solo dalla pagina /servizi: per chi è e come va.
  who: Localized;
  steps: Localized[];
};

export type StackTool = { icon: string; name: string; desc: Localized };
export type StackGroup = { name: Localized; tools: StackTool[] };

export const landing = {
  nav: {
    links: [
      { href: "#cosa", label: { it: "Cosa costruiamo", en: "What we build" } },
      { href: "#lavori", label: { it: "Lavori", en: "Work" } },
      { href: "#metodo", label: { it: "Come lavoriamo", en: "How we work" } },
      { href: "#offerta", label: { it: "Offerta", en: "Offer" } },
      { href: "#faq", label: { it: "FAQ", en: "FAQ" } },
    ],
    cta: { it: "Parliamone", en: "Let's talk" },
  } satisfies NavContent,

  hero: {
    titleBefore: { it: "Mettiamo l'AI", en: "Make AI" },
    titleMark: { it: "al lavoro", en: "work" },
    titleAfter: { it: "nella tua azienda.", en: "for your business." },
    body: {
      it: "Costruiamo soluzioni concrete per smettere di perdere tempo e clienti. Poi ti insegniamo a gestirle ",
      en: "We build concrete solutions that stop you from losing time and customers. Then we teach you to run them ",
    },
    bodyMark: { it: "da solo", en: "yourself" },
    bodyAfter: {
      it: ", senza contratti che ti legano.",
      en: ", with no contracts that tie you down.",
    },
    ctaPrimary: { it: "Parliamone →", en: "Let's talk →" },
    ctaSecondary: {
      it: "Guarda cosa abbiamo costruito",
      en: "See what we've built",
    },
    note: {
      it: "Prima call gratuita. Nessun impegno, nessun pitch.",
      en: "First call is free. No commitment, no pitch.",
    },
    flow: {
      label: { it: "flusso · prenotazioni", en: "flow · bookings" },
      status: { it: "attivo", en: "live" },
      trigger: {
        kind: { it: "trigger", en: "trigger" },
        title: { it: "Messaggio in arrivo", en: "Incoming message" },
        sub: { it: "sito · WhatsApp · IG", en: "site · WhatsApp · IG" },
      },
      brain: {
        kind: { it: "flylabs", en: "flylabs" },
        title: { it: "Capisce la richiesta", en: "Understands the request" },
        sub: { it: "qualifica e risponde", en: "qualifies and replies" },
      },
      action1: {
        kind: { it: "azione", en: "action" },
        title: { it: "Prenota lo slot", en: "Books the slot" },
      },
      action2: {
        kind: { it: "azione", en: "action" },
        title: { it: "Avvisa lo studio", en: "Notifies the team" },
      },
      annotation: {
        it: "gira da sola. anche di notte.",
        en: "runs on its own. even at night.",
      },
    },
  } satisfies HeroContent,

  build: {
    section: {
      no: "01",
      kicker: { it: "Cosa costruiamo", en: "What we build" },
      title: { it: "Cosa costruiamo", en: "What we build" },
    } satisfies Section,
    cards: [
      {
        icon: "lucide:messages-square",
        title: { it: "Chatbot e assistenti", en: "Chatbots and assistants" },
        body: {
          it: "Rispondono su sito, WhatsApp, Instagram e Facebook. Anche di notte.",
          en: "They reply on your site, WhatsApp, Instagram and Facebook. Even at night.",
        },
        claim: {
          it: "→ nessun cliente senza risposta",
          en: "→ no customer left without an answer",
        },
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
          it: "→ le ore tornano al lavoro vero",
          en: "→ the hours go back to real work",
        },
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
      },
      {
        icon: "lucide:file-search",
        title: { it: "Ricerca nei documenti", en: "Search across documents" },
        body: {
          it: "Contratti, manuali e listini diventano risposte immediate, con la fonte citata.",
          en: "Contracts, manuals and price lists turn into instant answers, with the source cited.",
        },
        claim: {
          it: "→ basta cercare a mano",
          en: "→ no more digging by hand",
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
      },
      {
        icon: "lucide:compass",
        title: { it: "Formazione operativa", en: "Hands-on training" },
        body: {
          it: "Insegniamo a te e al team a usare quello che costruiamo, sul vostro lavoro.",
          en: "We teach you and your team to use what we build, on your real work.",
        },
        claim: {
          it: "→ resti autonomo, non dipendente",
          en: "→ you stay independent, not dependent",
        },
      },
    ] satisfies BuildCard[],
    extra: {
      title: { it: "Hai un altro problema?", en: "Got another problem?" },
      body: {
        it: "Se si ripete e ti porta via tempo, quasi sempre si può automatizzare.",
        en: "If it repeats and eats your time, it can almost always be automated.",
      },
      cta: { it: "→ raccontacelo", en: "→ tell us about it" },
    },
  },

  work: {
    section: {
      no: "02",
      kicker: { it: "Casi di successo", en: "Case studies" },
      titleBefore: {
        it: "Clienti veri, risultati ",
        en: "Real clients, ",
      },
      titleMark: { it: "misurati", en: "measured" },
      titleAfter: { it: "", en: " results" },
    },
    deck: {
      it: "Ogni caso qui sotto è in produzione da un cliente vero, con numeri misurati. Scorri per vederli tutti.",
      en: "Every case below runs in production for a real client, with measured numbers. Scroll through them all.",
    },
    nav: {
      prev: { it: "Caso precedente", en: "Previous case" },
      next: { it: "Caso successivo", en: "Next case" },
      region: { it: "Casi di successo", en: "Case studies" },
    },
    cards: [
      {
        tag: { it: "Studio dentistico", en: "Dental practice" },
        problem: {
          it: "Perdeva richieste fuori orario.",
          en: "Was losing requests after hours.",
        },
        solution: {
          it: "Chatbot su sito e WhatsApp, appuntamenti h24.",
          en: "Chatbot on site and WhatsApp, 24/7 bookings.",
        },
        metric: "+48",
        metricLabel: {
          it: "richieste · primo mese",
          en: "requests · first month",
        },
      },
      {
        tag: { it: "Installatore fotovoltaico", en: "Solar installer" },
        problem: {
          it: "Preventivi e pratiche lente.",
          en: "Slow quotes and paperwork.",
        },
        solution: {
          it: "Automazione delle pratiche ripetitive.",
          en: "Automation of repetitive paperwork.",
        },
        metric: "12h",
        metricLabel: {
          it: "liberate a settimana",
          en: "freed up per week",
        },
      },
      {
        tag: { it: "Concessionario", en: "Car dealership" },
        problem: {
          it: "Lead dai portali ricontattati tardi.",
          en: "Portal leads contacted too late.",
        },
        solution: {
          it: "Risposta automatica su ogni richiesta.",
          en: "Automatic reply on every request.",
        },
        metric: "<60s",
        metricLabel: {
          it: "tempo di prima risposta",
          en: "first response time",
        },
      },
    ] satisfies WorkCard[],
    // Link alla pagina archivio /lavori, mostrato solo quando le card
    // vengono dai casi reali su Sanity (issue #13).
    allLink: {
      label: { it: "Tutti i lavori →", en: "All work →" },
      href: "/lavori",
    },
  },

  method: {
    section: {
      no: "03",
      kicker: { it: "Come lavoriamo", en: "How we work" },
      title: { it: "Il nostro processo", en: "Our process" },
    } satisfies Section,
    steps: [
      {
        n: "01",
        title: { it: "Ascoltiamo", en: "We listen" },
        body: {
          it: "Troviamo dove l'AI ti fa risparmiare di più. Senza gergo.",
          en: "We find where AI saves you the most. No jargon.",
        },
      },
      {
        n: "02",
        title: { it: "Costruiamo", en: "We build" },
        body: {
          it: "Soluzione a prezzo fisso e scope chiaro. Sai cosa ricevi e quanto costa.",
          en: "A fixed-price solution with a clear scope. You know what you get and what it costs.",
        },
      },
      {
        n: "03",
        title: { it: "Misuriamo", en: "We measure" },
        body: {
          it: "Verifichiamo sui tuoi numeri veri e ti lasciamo gli strumenti in mano.",
          en: "We check it against your real numbers and leave the tools in your hands.",
        },
      },
    ] satisfies Step[],
  },

  offer: {
    section: {
      no: "04",
      kicker: { it: "Come possiamo aiutarti", en: "How we can help" },
      title: {
        it: "Tre modi di lavorare insieme.",
        en: "Three ways to work together.",
      },
      intro: {
        it: "Scegli il punto di ingresso. Prezzo chiaro prima di iniziare, nessun retainer obbligato.",
        en: "Pick your entry point. Clear price before we start, no forced retainer.",
      },
    },
    cta: { it: "Parliamone →", en: "Let's talk →" },
    badgeFeatured: { it: "più richiesto", en: "most popular" },
    tracks: [
      {
        kind: { it: "formazione", en: "training" },
        title: { it: "Formazione AI", en: "AI training" },
        body: {
          it: "Sessioni pratiche per te e il team, sul vostro lavoro reale. Uscite sapendo usare l'AI da soli.",
          en: "Hands-on sessions for you and your team, on your real work. You leave able to use AI on your own.",
        },
        price: { it: "su misura sul team", en: "tailored to the team" },
        timeline: { it: "1-2 sessioni", en: "1 to 2 sessions" },
        includes: [
          {
            it: "Sessioni sul vostro lavoro reale, non slide",
            en: "Sessions on your real work, not slides",
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
          it: "Per team che usano già l'AI a intuito e vogliono smettere di improvvisare.",
          en: "For teams already using AI by instinct who want to stop improvising.",
        },
        steps: [
          {
            it: "Ci dite su cosa perdete tempo: raccogliamo i casi veri prima della sessione.",
            en: "You tell us where time goes: we collect the real cases before the session.",
          },
          {
            it: "Lavoriamo insieme su quei casi, dal vivo, sui vostri strumenti.",
            en: "We work through those cases together, live, on your own tools.",
          },
          {
            it: "Restano prompt, flussi e una guida scritta per il team.",
            en: "You keep the prompts, the flows and a written guide for the team.",
          },
        ],
      },
      {
        kind: { it: "soluzione", en: "solution" },
        title: { it: "Chiave in mano", en: "Turnkey solution" },
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
            it: "Soluzione in produzione, integrata con i sistemi che usate",
            en: "Solution in production, integrated with the systems you use",
          },
          {
            it: "Formazione del team e documentazione per gestirla da soli",
            en: "Team training and documentation to run it yourselves",
          },
        ],
        featured: true,
        who: {
          it: "Per chi ha un processo che si ripete ogni giorno e costa ore o clienti persi.",
          en: "For anyone with a process that repeats daily and costs hours or lost customers.",
        },
        steps: [
          {
            it: "Mappiamo il processo con chi lo fa davvero e fissiamo il risultato atteso.",
            en: "We map the process with the people who run it and agree on the target result.",
          },
          {
            it: "Costruiamo la prima versione utile in pochi giorni e la provate sul lavoro vero.",
            en: "We build the first useful version in days and you try it on real work.",
          },
          {
            it: "Andiamo in produzione con la persona nel punto delicato, mai in automatico cieco.",
            en: "We go to production with a person at the sensitive step, never blind automation.",
          },
          {
            it: "Formiamo il team, lasciamo la documentazione e restate autonomi.",
            en: "We train the team, hand over the documentation and you stay independent.",
          },
        ],
      },
      {
        kind: { it: "consulenza", en: "consulting" },
        title: { it: "Consulenza spot", en: "Spot consulting" },
        body: {
          it: "Una call strategica per capire dove l'AI conviene davvero. Zero impegno, solo risposte concrete.",
          en: "A strategic call to find where AI actually pays off. No commitment, just concrete answers.",
        },
        price: { it: "a ore · prezzo trasparente", en: "hourly · transparent rate" },
        timeline: { it: "una call", en: "a single call" },
        includes: [
          {
            it: "Una mappa di dove l'AI conviene davvero, e dove no",
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
          it: "Per chi ha molte idee sull'AI e vuole sapere quale regge prima di investirci.",
          en: "For anyone with lots of AI ideas who wants to know which one holds up before investing.",
        },
        steps: [
          {
            it: "Ci raccontate il problema e come lavorate oggi.",
            en: "You walk us through the problem and how you work today.",
          },
          {
            it: "Mettiamo le idee in ordine per impatto e difficoltà, davanti a voi.",
            en: "We rank the ideas by impact and difficulty, with you in the room.",
          },
          {
            it: "Vi lasciamo il piano. Se lo volete costruire con noi, bene; altrimenti è vostro.",
            en: "You leave with the plan. Build it with us if you want; either way it's yours.",
          },
        ],
      },
    ] satisfies OfferTrack[],
    deepLink: {
      label: { it: "Come lavoriamo, nel dettaglio →", en: "How we work, in detail →" },
      href: "/servizi",
    },
  },

  why: {
    kicker: { it: "Perché flylabs", en: "Why flylabs" },
    statementBefore: {
      it: "Soluzioni su misura, a prezzo fisso, e il team formato per gestirle da solo. Niente account manager, niente retainer obbligati. ",
      en: "Custom solutions, fixed price, and your team trained to run them. No account managers, no forced retainers. ",
    },
    statementMark: {
      it: "Parli con chi costruisce.",
      en: "You talk to the people who build.",
    },
    chips: [
      { it: "prezzo trasparente", en: "transparent pricing" },
      { it: "no lock-in", en: "no lock-in" },
      { it: "parli con chi costruisce", en: "talk to the builders" },
      { it: "live in 2–4 settimane", en: "live in 2–4 weeks" },
    ] as Localized[],
  },

  faq: {
    section: {
      no: "04",
      kicker: { it: "FAQ", en: "FAQ" },
      title: { it: "Le domande vere.", en: "The real questions." },
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
          it: "No. Costruiamo, ti formiamo, e decidi tu se restare per farla evolvere.",
          en: "No. We build it, we train you, and you decide whether to stay for further work.",
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
          it: "Restano dove sono già: costruiamo sopra i sistemi che usi. Prima di partire ti diciamo quali servizi tocca il flusso e quali dati ci passano, così puoi validarlo con chi si occupa di privacy.",
          en: "It stays where it already is: we build on top of the systems you use. Before we start we tell you which services the flow touches and what data goes through, so you can clear it with whoever handles privacy.",
        },
      },
      {
        q: { it: "Cosa vi serve da noi?", en: "What do you need from us?" },
        a: {
          it: "Poche ore di chi conosce il processo, gli accessi ai sistemi coinvolti e qualche esempio reale. Il resto è lavoro nostro.",
          en: "A few hours from whoever knows the process, access to the systems involved and a handful of real examples. The rest is on us.",
        },
      },
    ] satisfies Faq[],
  },

  finalCta: {
    title: {
      it: "Raccontaci cosa ti porta via tempo.",
      en: "Tell us what's eating your time.",
    },
    body: {
      it: "Venti minuti per capire cosa si può automatizzare e da dove partire.",
      en: "Twenty minutes to figure out what can be automated and where to start.",
    },
    cta: {
      it: "Prenota una call gratuita →",
      en: "Book a free call →",
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
    messagePlaceholder: {
      it: "Cosa ti fa perdere tempo? Raccontaci in due righe.",
      en: "What's eating your time? Tell us in a couple of lines.",
    },
    submit: { it: "Invia richiesta", en: "Send request" },
    sending: { it: "Invio…", en: "Sending…" },
    success: {
      title: {
        it: "Grazie, ci sentiamo presto.",
        en: "Thanks, we'll be in touch soon.",
      },
      body: {
        it: "Abbiamo ricevuto la tua richiesta e ti rispondiamo al più presto.",
        en: "We got your request and will get back to you shortly.",
      },
    },
    errors: {
      missing: {
        it: "Compila i campi obbligatori.",
        en: "Please fill in the required fields.",
      },
      email: {
        it: "Inserisci un'email valida.",
        en: "Please enter a valid email.",
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
      it: "Non reinventiamo la ruota: componiamo i migliori strumenti AI, automazione e dati sul tuo problema.",
      en: "We don't reinvent the wheel: we compose the best AI, automation and data tools around your problem.",
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

  // Pagina dedicata /stack (raggiungibile solo dal teaser, non dal menu).
  // Pagina /servizi: approfondimento dei tre modi di lavorare insieme.
  // I contenuti dei binari vivono in `offer.tracks` (who/steps/includes):
  // qui stanno solo le etichette e la cornice della pagina.
  services: {
    meta: {
      it: {
        title: "Come lavoriamo insieme — flylabs.ai",
        description:
          "I tre modi di lavorare con flylabs: consulenza spot, soluzione chiave in mano, formazione AI. Tempi, prezzi e cosa è incluso, detti prima.",
      },
      en: {
        title: "How we work together — flylabs.ai",
        description:
          "The three ways to work with flylabs: spot consulting, turnkey solution, AI training. Timelines, pricing and what's included, stated upfront.",
      },
    },
    kicker: { it: "Servizi", en: "Services" },
    title: { it: "Come lavoriamo insieme", en: "How we work together" },
    intro: {
      it: "Tre punti di ingresso, un metodo solo: capire il problema vero, costruire la cosa più piccola che lo risolve, lasciarti in grado di gestirla da solo.",
      en: "Three entry points, one method: understand the real problem, build the smallest thing that solves it, leave you able to run it yourself.",
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

  stack: {
    meta: {
      it: {
        title: "Il nostro stack — flylabs.ai",
        description:
          "I tool AI, di automazione e dati che usiamo per costruire le soluzioni: Claude, n8n, Make, Apify e altri.",
      },
      en: {
        title: "Our stack — flylabs.ai",
        description:
          "The AI, automation and data tools we use to build solutions: Claude, n8n, Make, Apify and more.",
      },
    },
    kicker: { it: "Sotto il cofano", en: "Under the hood" },
    title: { it: "I tool che usiamo", en: "The tools we use" },
    intro: {
      it: "Scegliamo lo strumento giusto per ogni pezzo del lavoro — modelli, orchestrazione, dati, web — e li combiniamo sul tuo caso reale. Nessun lock-in su una piattaforma sola.",
      en: "We pick the right tool for each part of the job — models, orchestration, data, web — and combine them on your real case. No lock-in to a single platform.",
    },
    back: { it: "← Torna alla home", en: "← Back home" },
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
            icon: "lucide:library",
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
            icon: "lucide:audio-lines",
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
            icon: "lucide:mic",
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
            icon: "lucide:flame",
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
            icon: "lucide:globe",
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
            icon: "lucide:clapperboard",
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
            icon: "lucide:calendar-check",
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

  footer: {
    tagline: {
      it: "AI concreta per chi lavora",
      en: "Concrete AI for people who work",
    },
  },
} as const;
