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
  // CTA quando c'è il link di prenotazione (siteSettings.bookingUrl): porta
  // dritta al calendario invece che al form in fondo alla home.
  book: Localized;
};

type HeroContent = {
  titleBefore: Localized;
  titleMark: Localized;
  titleAfter: Localized;
  body: Localized;
  bodyMark: Localized; // parola sottolineata dentro il body
  bodyAfter: Localized;
  ctaPrimary: Localized;
  ctaBook: Localized; // CTA primaria quando c'è il link di prenotazione
  ctaSecondary: Localized;
  note: Localized;
  // Pannello "l'AI prepara, tu approvi" accanto al copy, con tre scenari
  // selezionabili a tab (components/landing/hero-scenarios.tsx). Ogni
  // scenario mette in scena un caso reale: testi illustrativi ma fedeli al
  // caso, nessun numero che il caso non pubblichi già.
  scenarios: {
    label: Localized; // etichetta del tablist (visibile, micro-label mono)
    casePrefix: Localized; // didascalia: "<prefisso> <settore>."
    caseCta: Localized;
    starsSr: Localized; // "<n> stelle su 5" per gli screen reader
    items: HeroScenario[];
  };
};

// Uno scenario del pannello hero. `caseHref` punta allo slug Sanity del
// caseStudy, hardcoded come i link di "Cosa costruiamo": se cambia nello
// Studio va aggiornato a mano. `sector` è il campo `sector` pubblico dello
// stesso caso (content/case-studies/<file>.json).
export type HeroScenario = {
  id: string; // stabile, non tradotto: id di tab e tabpanel
  tab: Localized;
  caseHref: string;
  sector: Localized;
  flow: Localized; // titolo del flusso nell'intestazione del pannello
  flowMeta: Localized;
  // Lingua dell'esempio mostrato, uguale su tutti i tab: quella della pagina
  // (IT/EN), oppure la lingua originale + "tradotto" quando l'esempio è una
  // traduzione (il caso WhatsApp non lavora in italiano). `langChipSr` è la
  // versione per esteso letta dagli screen reader al posto della sigla.
  langChip: Localized;
  langChipSr: Localized;
  steps: [Localized, Localized, Localized];
  input: {
    source: string; // nome della piattaforma, non tradotto
    icon: string; // icona Iconify monocromatica della piattaforma
    stars?: number; // solo per le recensioni
    meta: Localized;
    text: Localized;
    attachment?: Localized; // es. il link del referto, reso come chip
  };
  output: {
    label: Localized;
    // Testo che l'AI "scrive" oppure elenco di voci che compaiono in
    // sequenza (le slide generate): uno dei due.
    text?: Localized;
    items?: Localized[];
    working: Localized; // stato mentre l'AI lavora
    done: Localized; // stato finale
  };
  actions: [Localized, Localized]; // [primaria, secondaria], finti bottoni
  note: Localized; // nota breve sul controllo umano
};

type Section = { kicker: Localized; title: Localized };

// Link "visto in produzione" dentro una card di "Cosa costruiamo": un
// prodotto flylabs (con logo) o un caso reale. I casi puntano allo slug
// Sanity del `caseStudy` (`/work/<slug>`), hardcoded qui: se lo slug
// cambia nello Studio va aggiornato a mano.
export type BuildCardLink = {
  label: Localized;
  href: string; // path interno ("/work/...", "/wegrocery") o URL esterno
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
  // Approfondimento usato solo dalla pagina /services: per chi è e come va.
  who: Localized;
  steps: Localized[];
  // id dell'<article> su /services (deep link: /services#training).
  anchor?: string;
  // "Vedi un esempio reale" su /services: path interno di un caso (o della lista).
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
  // Logo con nome (in tracciati) per l'anteprima quando manca lo screenshot.
  lockup?: string;
};

export const landing = {
  // Le pagine mostrate in nav (sitewide, anche da mobile) sono le stesse del
  // footer — unica fonte, `footer.nav` più sotto — così le etichette restano
  // sincronizzate senza doverle duplicare.
  nav: {
    cta: { it: "Parliamone", en: "Let's talk", es: "Hablemos", fr: "Parlons-en" },
    book: { it: "Prenota una call", en: "Book a call", es: "Reserva una llamada", fr: "Réservez un appel" },
  } satisfies NavContent,

  hero: {
    titleBefore: { it: "Il partner per", en: "Your partner for", es: "Tu socio para", fr: "Votre partenaire pour" },
    titleMark: { it: "integrare l'AI", en: "building AI", es: "integrar la IA", fr: "intégrer l'IA" },
    titleAfter: { it: "nei tuoi processi.", en: "into your processes.", es: "en tus procesos.", fr: "dans vos processus." },
    body: {
      it: "Partiamo da un processo che oggi ti costa ore o clienti, costruiamo la soluzione AI che lo risolve e formiamo il tuo team a gestirla ",
      en: "We start from a process that costs you hours or customers today, build the AI that fixes it and train your team to run it ",
      es: "Partimos de un proceso que hoy te cuesta horas o clientes, construimos la IA que lo resuelve y formamos a tu equipo para gestionarla ",
      fr: "Nous partons d'un processus qui vous coûte aujourd'hui des heures ou des clients, nous construisons l'IA qui le règle et formons votre équipe à la piloter ",
    },
    bodyMark: { it: "in autonomia", en: "on their own", es: "por su cuenta", fr: "en autonomie" },
    bodyAfter: { it: ".", en: ".", es: ".", fr: "." },
    ctaPrimary: { it: "Parliamone →", en: "Let's talk →", es: "Hablemos →", fr: "Parlons-en →" },
    ctaBook: { it: "Prenota 15 minuti →", en: "Book 15 minutes →", es: "Reserva 15 minutos →", fr: "Réservez 15 minutes →" },
    ctaSecondary: {
      it: "Guarda cosa abbiamo costruito",
      en: "See what we've built",
      es: "Mira lo que hemos construido",
      fr: "Voir nos réalisations",
    },
    note: {
      it: "Prima call gratuita. Nessun impegno, nessun pitch.",
      en: "First call is free. No commitment, no pitch.",
      es: "La primera llamada es gratuita. Sin compromiso, sin discursos de venta.",
      fr: "Le premier appel est gratuit. Sans engagement, sans argumentaire commercial.",
    },
    scenarios: {
      label: { it: "Esempi da casi reali", en: "Examples from real cases", es: "Ejemplos de casos reales", fr: "Exemples tirés de cas réels" },
      casePrefix: { it: "Esempio dal caso reale:", en: "Example from a real case:", es: "Ejemplo del caso real:", fr: "Exemple tiré du cas réel :" },
      caseCta: { it: "Leggi il caso →", en: "Read the case →", es: "Leer el caso →", fr: "Lire le cas →" },
      starsSr: { it: "stelle su 5", en: "out of 5 stars", es: "estrellas de 5", fr: "étoiles sur 5" },
      items: [
        {
          // risposte-recensioni-ai: la pipeline prepara la bozza nel tono
          // della struttura, l'operatore la rivede e la pubblica.
          id: "recensioni",
          tab: { it: "Recensioni", en: "Reviews", es: "Reseñas", fr: "Avis" },
          caseHref: "/work/ai-review-replies",
          sector: { it: "Struttura ricettiva · Sardegna", en: "Hospitality · Sardinia", es: "Alojamiento turístico · Cerdeña", fr: "Hébergement touristique · Sardaigne" },
          flow: { it: "Risposte alle recensioni", en: "Review replies", es: "Respuestas a las reseñas", fr: "Réponses aux avis" },
          flowMeta: { it: "bozze di oggi", en: "today's drafts", es: "borradores de hoy", fr: "brouillons du jour" },
          langChip: { it: "IT", en: "EN", es: "ES", fr: "FR" },
          langChipSr: {
            it: "Lingua dell'esempio: italiano",
            en: "Example language: English",
            es: "Idioma del ejemplo: español",
            fr: "Langue de l'exemple : français",
          },
          steps: [
            { it: "Arriva la recensione", en: "A review comes in", es: "Llega la reseña", fr: "Un avis arrive" },
            { it: "L'AI scrive la bozza", en: "AI drafts the reply", es: "La IA redacta la respuesta", fr: "L'IA rédige la réponse" },
            { it: "Tu approvi", en: "You approve", es: "Tú apruebas", fr: "Vous validez" },
          ],
          input: {
            source: "Google",
            icon: "simple-icons:google",
            stars: 4,
            meta: { it: "Ospite, agosto", en: "Guest, August", es: "Huésped, agosto", fr: "Client, août" },
            text: {
              it: "Camere pulite e staff gentilissimo. Unico neo: trovare parcheggio ad agosto è stata un'impresa.",
              en: "Clean rooms and really friendly staff. Only catch: finding a parking spot in August was a struggle.",
              es: "Habitaciones limpias y personal muy amable. La única pega: encontrar aparcamiento en agosto fue complicado.",
              fr: "Chambres propres et personnel vraiment adorable. Seul bémol : trouver une place de parking en août, c'était compliqué.",
            },
          },
          output: {
            label: { it: "Bozza dell'AI · nel tuo tono", en: "AI draft · in your tone", es: "Borrador de la IA · con tu tono", fr: "Brouillon de l'IA · dans votre ton" },
            text: {
              it: "Grazie per le belle parole sullo staff, le giriamo a tutto il team! Sul parcheggio ha ragione: la prossima volta ci scriva prima di arrivare e le indichiamo noi dove lasciare l'auto.",
              en: "Thanks for the kind words about our staff, we'll pass them on to the team! You're right about parking: next time, message us before you arrive and we'll tell you where to leave the car.",
              es: "¡Gracias por tus palabras sobre el personal, se las trasladaremos al equipo! Tienes razón con el aparcamiento: la próxima vez, escríbenos antes de llegar y te diremos dónde dejar el coche.",
              fr: "Merci pour vos mots sur notre personnel, nous les transmettrons à l'équipe ! Vous avez raison pour le parking : la prochaine fois, écrivez-nous avant d'arriver et nous vous dirons où laisser la voiture.",
            },
            working: { it: "Sta scrivendo", en: "Drafting", es: "Redactando", fr: "En rédaction" },
            done: { it: "Pronta", en: "Ready", es: "Lista", fr: "Prête" },
          },
          actions: [
            { it: "Approva", en: "Approve", es: "Aprobar", fr: "Valider" },
            { it: "Modifica", en: "Edit", es: "Editar", fr: "Modifier" },
          ],
          note: { it: "Niente esce senza di te", en: "Nothing goes out without you", es: "Nada sale sin ti", fr: "Rien ne part sans vous" },
        },
        {
          // form-whatsapp-promo-conversione: dopo il form parte un WhatsApp
          // con lo sconto, poi l'assistente AI continua la chat (EN/ES/DE),
          // raccoglie i dettagli e tiene vivo il contatto finché non subentra
          // lo studio. Qui il passo umano è "subentri", non "approvi".
          id: "messaggi",
          tab: { it: "Messaggi", en: "Messages", es: "Mensajes", fr: "Messages" },
          caseHref: "/work/website-form-to-whatsapp-promo",
          sector: { it: "Studio di tatuaggi · Spagna", en: "Tattoo studio · Spain", es: "Estudio de tatuajes · España", fr: "Studio de tatouage · Espagne" },
          flow: { it: "Richieste dal sito", en: "Website enquiries", es: "Solicitudes desde la web", fr: "Demandes depuis le site" },
          flowMeta: { it: "su WhatsApp", en: "on WhatsApp", es: "en WhatsApp", fr: "sur WhatsApp" },
          // Il caso lavora in inglese, spagnolo e tedesco: su /it la chat è
          // un esempio tradotto dallo spagnolo, su /en è già in una delle tre.
          langChip: { it: "ES · tradotto", en: "EN", es: "ES", fr: "ES · traduit" },
          langChipSr: {
            it: "Esempio tradotto dallo spagnolo",
            en: "Example language: English",
            es: "Idioma del ejemplo: español",
            fr: "Exemple traduit de l'espagnol",
          },
          steps: [
            { it: "Arriva il messaggio", en: "A message comes in", es: "Llega el mensaje", fr: "Un message arrive" },
            { it: "L'AI risponde", en: "AI replies", es: "La IA responde", fr: "L'IA répond" },
            { it: "Subentri tu", en: "You take over", es: "Tú tomas el relevo", fr: "Vous prenez le relais" },
          ],
          input: {
            source: "WhatsApp",
            icon: "simple-icons:whatsapp",
            meta: { it: "Dopo il form del sito", en: "After the website form", es: "Después del formulario de la web", fr: "Après le formulaire du site" },
            text: {
              it: "Ciao! Ho appena compilato il form: vorrei una rondine piccola sul polso, stile fine line. Siete liberi a fine mese?",
              en: "Hi! I just filled in the form: I'd love a small swallow on my wrist, fine line style. Any openings at the end of the month?",
              es: "¡Hola! Acabo de rellenar el formulario: me gustaría una golondrina pequeña en la muñeca, estilo fine line. ¿Tenéis hueco a final de mes?",
              fr: "Bonjour ! Je viens de remplir le formulaire : j'aimerais une petite hirondelle au poignet, style fine line. Vous avez des disponibilités en fin de mois ?",
            },
          },
          output: {
            label: { it: "Risposta dell'AI · in chat", en: "AI reply · in the chat", es: "Respuesta de la IA · en el chat", fr: "Réponse de l'IA · dans le chat" },
            text: {
              it: "Ciao! Richiesta ricevuta. Per prepararla: più o meno quanto grande la vuoi, hai una foto di riferimento e che giorni ti vanno meglio? Il tuo sconto è già attivo.",
              en: "Hi! Got your request. To get it ready: how big do you want it, do you have a reference photo, and which days work best? Your discount is already active.",
              es: "¡Hola! Hemos recibido tu solicitud. Para prepararla: ¿de qué tamaño la quieres, tienes una foto de referencia y qué días te vienen mejor? Tu descuento ya está activo.",
              fr: "Bonjour ! Nous avons bien reçu votre demande. Pour la préparer : quelle taille souhaitez-vous, avez-vous une photo de référence et quels jours vous conviennent le mieux ? Votre réduction est déjà active.",
            },
            working: { it: "Sta scrivendo", en: "Typing", es: "Escribiendo", fr: "En train d'écrire" },
            done: { it: "Inviata", en: "Sent", es: "Enviada", fr: "Envoyée" },
          },
          actions: [
            { it: "Prendi la chat", en: "Take over", es: "Tomar el chat", fr: "Reprendre le chat" },
            { it: "Lascia all'AI", en: "Leave it to the AI", es: "Dejarlo a la IA", fr: "Laisser l'IA" },
          ],
          note: { it: "Subentri quando vuoi", en: "Step in anytime", es: "Intervienes cuando quieras", fr: "Vous intervenez quand vous voulez" },
        },
        {
          // report-medico-automatico (file report-pelle-automatico.json): il
          // link del referto arriva su Telegram, l'AI ne fa sintesi e piano
          // di trattamento, il sistema genera le Google Slides in 1-3 minuti.
          // Nessun dato sanitario, nessuna promessa clinica.
          id: "documenti",
          tab: { it: "Documenti", en: "Documents", es: "Documentos", fr: "Documents" },
          caseHref: "/work/automated-medical-report",
          sector: { it: "Medicina estetica", en: "Aesthetic medicine", es: "Medicina estética", fr: "Médecine esthétique" },
          flow: { it: "Referti dei pazienti", en: "Patient reports", es: "Informes de los pacientes", fr: "Comptes rendus des patients" },
          flowMeta: { it: "presentazioni", en: "decks", es: "presentaciones", fr: "présentations" },
          langChip: { it: "IT", en: "EN", es: "ES", fr: "FR" },
          langChipSr: {
            it: "Lingua dell'esempio: italiano",
            en: "Example language: English",
            es: "Idioma del ejemplo: español",
            fr: "Langue de l'exemple : français",
          },
          steps: [
            { it: "Arriva il referto", en: "A report comes in", es: "Llega el informe", fr: "Un compte rendu arrive" },
            { it: "L'AI crea le slide", en: "AI builds the deck", es: "La IA crea las diapositivas", fr: "L'IA crée les slides" },
            { it: "Controlli e condividi", en: "Check and share", es: "Revisas y compartes", fr: "Vous vérifiez et partagez" },
          ],
          input: {
            source: "Telegram",
            icon: "simple-icons:telegram",
            meta: { it: "Dallo staff dello studio", en: "From the practice staff", es: "Del personal de la clínica", fr: "De l'équipe du cabinet" },
            text: {
              it: "Ecco il referto di stamattina:",
              en: "Here's this morning's report:",
              es: "Aquí está el informe de esta mañana:",
              fr: "Voici le compte rendu de ce matin :",
            },
            attachment: { it: "Link al referto", en: "Report link", es: "Enlace al informe", fr: "Lien vers le compte rendu" },
          },
          output: {
            label: { it: "Presentazione · Google Slides", en: "Patient deck · Google Slides", es: "Presentación · Google Slides", fr: "Présentation · Google Slides" },
            items: [
              { it: "La tua pelle, spiegata in parole semplici", en: "Your skin, explained in plain language", es: "Tu piel, explicada con palabras sencillas", fr: "Votre peau, expliquée simplement" },
              { it: "Piano di trattamenti consigliati", en: "Recommended treatment plan", es: "Plan de tratamientos recomendados", fr: "Plan de soins recommandé" },
              { it: "Routine skincare mattina e sera", en: "Morning and evening skincare routine", es: "Rutina de cuidado de la piel mañana y noche", fr: "Routine de soin matin et soir" },
            ],
            working: { it: "In preparazione", en: "Building", es: "En preparación", fr: "En préparation" },
            done: { it: "Pronta in 2 min", en: "Ready in 2 min", es: "Lista en 2 min", fr: "Prête en 2 min" },
          },
          actions: [
            { it: "Condividi", en: "Share", es: "Compartir", fr: "Partager" },
            { it: "Modifica", en: "Edit", es: "Editar", fr: "Modifier" },
          ],
          note: { it: "Il paziente la vede dopo di te", en: "The patient sees it after you do", es: "El paciente la ve después de ti", fr: "Le patient la voit après vous" },
        },
      ],
    },
  } satisfies HeroContent,

  build: {
    section: {
      kicker: { it: "Cosa costruiamo", en: "What we build", es: "Qué construimos", fr: "Ce que nous construisons" },
      title: { it: "Cosa costruiamo", en: "What we build", es: "Qué construimos", fr: "Ce que nous construisons" },
    } satisfies Section,
    cards: [
      {
        icon: "lucide:messages-square",
        title: {
          it: "Chatbot e assistenti AI",
          en: "AI chatbots and assistants",
          es: "Chatbots y asistentes IA",
          fr: "Chatbots et assistants IA",
        },
        body: {
          it: "Rispondono su sito, WhatsApp, Instagram e Facebook. Anche di notte.",
          en: "They reply on your site, WhatsApp, Instagram and Facebook. Even at night.",
          es: "Responden en tu web, WhatsApp, Instagram y Facebook. Incluso de noche.",
          fr: "Ils répondent sur votre site, WhatsApp, Instagram et Facebook. Même la nuit.",
        },
        claim: {
          it: "→ nessun cliente senza risposta",
          en: "→ no customer left without an answer",
          es: "→ ningún cliente sin respuesta",
          fr: "→ aucun client sans réponse",
        },
        links: [
          {
            label: { it: "GPT Chatbot", en: "GPT Chatbot", es: "GPT Chatbot", fr: "GPT Chatbot" },
            href: "/gpt-chatbot",
            logo: "/logos/gpt-chatbot.png",
          },
          {
            label: {
              it: "Caso: noleggio bici, USA",
              en: "Case: bike rental, USA",
              es: "Caso: alquiler de bicis, EE. UU.",
              fr: "Cas : location de vélos, États-Unis",
            },
            href: "/work/multi-site-rental-assistant",
          },
        ],
      },
      {
        icon: "lucide:zap",
        title: {
          it: "Risposta lead automatica",
          en: "Automatic lead response",
          es: "Respuesta automática a los leads",
          fr: "Réponse automatique aux prospects",
        },
        body: {
          it: "Ogni richiesta ricontattata in meno di un minuto, in automatico.",
          en: "Every request answered in under a minute, automatically.",
          es: "Cada solicitud recibe respuesta en menos de un minuto, de forma automática.",
          fr: "Chaque demande reçoit une réponse en moins d'une minute, automatiquement.",
        },
        claim: {
          it: "→ chi risponde prima vince",
          en: "→ the first to answer wins",
          es: "→ quien responde primero gana",
          fr: "→ le premier qui répond gagne",
        },
        links: [
          {
            label: {
              it: "Caso: studio tatuaggi, Spagna",
              en: "Case: tattoo studio, Spain",
              es: "Caso: estudio de tatuajes, España",
              fr: "Cas : studio de tatouage, Espagne",
            },
            href: "/work/website-form-to-whatsapp-promo",
          },
        ],
      },
      {
        icon: "lucide:file-text",
        title: {
          it: "Preventivi e documenti",
          en: "Quotes and documents",
          es: "Presupuestos y documentos",
          fr: "Devis et documents",
        },
        body: {
          it: "L'AI prepara la bozza dai dati che hai già. Tu controlli e mandi.",
          en: "AI drafts them from the data you already have. You review and send.",
          es: "La IA los redacta con los datos que ya tienes. Tú revisas y envías.",
          fr: "L'IA les rédige à partir des données que vous avez déjà. Vous relisez et envoyez.",
        },
        claim: {
          it: "→ le ore tornano al lavoro che conta",
          en: "→ your hours go back to the work that matters",
          es: "→ tus horas vuelven al trabajo que importa",
          fr: "→ vos heures retournent au travail qui compte",
        },
        links: [
          {
            label: {
              it: "Caso: medicina estetica",
              en: "Case: aesthetic medicine",
              es: "Caso: medicina estética",
              fr: "Cas : médecine esthétique",
            },
            href: "/work/automated-medical-report",
          },
        ],
      },
      {
        icon: "lucide:workflow",
        title: { it: "Automazione processi", en: "Process automation", es: "Automatización de procesos", fr: "Automatisation des processus" },
        body: {
          it: "Le procedure manuali ripetitive iniziano a girare da sole.",
          en: "The repetitive manual steps start running on their own.",
          es: "Los pasos manuales repetitivos empiezan a funcionar solos.",
          fr: "Les étapes manuelles répétitives se mettent à tourner toutes seules.",
        },
        claim: {
          it: "→ meno lavoro a mano, meno errori",
          en: "→ less work by hand, fewer mistakes",
          es: "→ menos trabajo manual, menos errores",
          fr: "→ moins de travail manuel, moins d'erreurs",
        },
        links: [
          {
            label: {
              it: "Caso: installatore fotovoltaico",
              en: "Case: solar installer",
              es: "Caso: instalador fotovoltaico",
              fr: "Cas : installateur photovoltaïque",
            },
            href: "/work/automated-grid-connection-paperwork",
          },
        ],
      },
      {
        icon: "lucide:app-window",
        title: { it: "Web app su misura", en: "Custom web apps", es: "Web apps a medida", fr: "Applications web sur mesure" },
        body: {
          it: "Il gestionale o il portale che ti manca, costruito su misura e collegato ai tuoi dati.",
          en: "The internal tool or portal you're missing, built to fit and wired to your data.",
          es: "La herramienta interna o el portal que te falta, hecho a medida y conectado a tus datos.",
          fr: "L'outil interne ou le portail qui vous manque, fait sur mesure et connecté à vos données.",
        },
        claim: {
          it: "→ lo strumento giusto, non un compromesso",
          en: "→ the right tool, not a workaround",
          es: "→ la herramienta adecuada, no un parche",
          fr: "→ le bon outil, pas un compromis",
        },
        links: [
          {
            label: { it: "WeGrocery", en: "WeGrocery", es: "WeGrocery", fr: "WeGrocery" },
            href: "/wegrocery",
            logo: "/products/wegrocery/logo.png",
          },
        ],
      },
      {
        icon: "lucide:file-search",
        title: { it: "Ricerca nei documenti", en: "Search across documents", es: "Búsqueda en documentos", fr: "Recherche dans les documents" },
        body: {
          it: "Contratti, manuali e listini diventano risposte immediate.",
          en: "Contracts, manuals and price lists turn into instant answers.",
          es: "Contratos, manuales y tarifas se convierten en respuestas inmediatas.",
          fr: "Contrats, manuels et grilles tarifaires deviennent des réponses instantanées.",
        },
        claim: {
          it: "→ basta cercare a mano",
          en: "→ no more digging by hand",
          es: "→ se acabó buscar a mano",
          fr: "→ fini de chercher à la main",
        },
        links: [
          {
            label: {
              it: "Esempio open source: second brain aziendale",
              en: "Open-source example: company second brain",
              es: "Ejemplo open source: segundo cerebro empresarial",
              fr: "Exemple open source : second cerveau d'entreprise",
            },
            href: "/work/company-second-brain",
          },
        ],
      },
      {
        icon: "lucide:globe",
        title: {
          it: "Raccolta dati dal web",
          en: "Web data collection",
          es: "Recogida de datos de la web",
          fr: "Collecte de données sur le web",
        },
        body: {
          it: "Prezzi, cataloghi, recensioni e mosse della concorrenza: raccolti dal web in automatico e messi in tabella.",
          en: "Prices, catalogues, reviews and competitor moves: collected from the web automatically and put into a table.",
          es: "Precios, catálogos, reseñas y movimientos de la competencia: recogidos de la web automáticamente y ordenados en una tabla.",
          fr: "Prix, catalogues, avis et mouvements des concurrents : collectés automatiquement sur le web et rangés dans un tableau.",
        },
        claim: {
          it: "→ i dati che ti servono, aggiornati da soli",
          en: "→ the data you need, kept current on its own",
          es: "→ los datos que necesitas, siempre actualizados",
          fr: "→ les données dont vous avez besoin, toujours à jour",
        },
      },
      {
        icon: "lucide:chart-no-axes-column",
        title: { it: "Report e analisi", en: "Reports and analysis", es: "Informes y análisis", fr: "Rapports et analyses" },
        body: {
          it: "Dati sparsi su più sistemi diventano un report leggibile, ogni settimana senza chiederlo.",
          en: "Data scattered across systems becomes one readable report, every week without asking.",
          es: "Los datos repartidos entre sistemas se convierten en un único informe legible, cada semana sin pedirlo.",
          fr: "Les données dispersées entre plusieurs systèmes deviennent un seul rapport lisible, chaque semaine sans avoir à le demander.",
        },
        claim: {
          it: "→ decidi sui numeri, non a sensazione",
          en: "→ decide on numbers, not gut feel",
          es: "→ decides con cifras, no por intuición",
          fr: "→ décidez sur des chiffres, pas au feeling",
        },
      },
      {
        icon: "lucide:star",
        title: { it: "Recensioni e reputazione", en: "Reviews and reputation", es: "Reseñas y reputación", fr: "Avis et réputation" },
        body: {
          it: "Bozze di risposta nel tono della tua azienda, in ogni lingua. Tu rivedi e pubblichi.",
          en: "Draft replies in your company's tone, in any language. You review and publish.",
          es: "Borradores de respuesta con el tono de tu empresa, en cualquier idioma. Tú revisas y publicas.",
          fr: "Des brouillons de réponse dans le ton de votre entreprise, dans toutes les langues. Vous relisez et publiez.",
        },
        claim: {
          it: "→ nessuna recensione senza risposta",
          en: "→ no review left unanswered",
          es: "→ ninguna reseña sin respuesta",
          fr: "→ aucun avis sans réponse",
        },
        links: [
          {
            label: { it: "Stellar Reviews", en: "Stellar Reviews", es: "Stellar Reviews", fr: "Stellar Reviews" },
            href: "/stellar-reviews",
            logo: "/products/stellar-reviews/logo.svg",
          },
          {
            label: {
              it: "Caso: struttura ricettiva, Sardegna",
              en: "Case: hospitality, Sardinia",
              es: "Caso: alojamiento turístico, Cerdeña",
              fr: "Cas : hébergement touristique, Sardaigne",
            },
            href: "/work/ai-review-replies",
          },
        ],
      },
      {
        icon: "lucide:compass",
        title: { it: "Formazione operativa", en: "Hands-on training", es: "Formación práctica", fr: "Formation opérationnelle" },
        body: {
          it: "Insegniamo a te e al tuo team a usare quello che costruiamo, sul lavoro di tutti i giorni.",
          en: "We teach you and your team to use what we build, in your day-to-day work.",
          es: "Te enseñamos a ti y a tu equipo a usar lo que construimos, en el trabajo del día a día.",
          fr: "Nous vous apprenons, à vous et à votre équipe, à utiliser ce que nous construisons, dans votre travail au quotidien.",
        },
        claim: {
          it: "→ resti autonomo, non dipendente",
          en: "→ you stay in charge, not tied to us",
          es: "→ sigues siendo autónomo, no dependiente",
          fr: "→ vous restez autonome, pas dépendant",
        },
        links: [
          {
            label: {
              it: "Caso: formazione AI in aula",
              en: "Case: AI training in the classroom",
              es: "Caso: formación en IA en el aula",
              fr: "Cas : formation IA en salle",
            },
            href: "/work/in-person-ai-training",
          },
        ],
      },
    ] satisfies BuildCard[],
    extra: {
      title: { it: "Hai un altro problema?", en: "Something else slowing you down?", es: "¿Tienes otro problema?", fr: "Un autre problème ?" },
      body: {
        it: "Se si ripete e ti porta via tempo, quasi sempre si può automatizzare.",
        en: "If it repeats and eats your time, it can almost always be automated.",
        es: "Si se repite y te quita tiempo, casi siempre se puede automatizar.",
        fr: "S'il se répète et vous prend du temps, il peut presque toujours être automatisé.",
      },
      cta: { it: "→ raccontacelo", en: "→ tell us about it", es: "→ cuéntanoslo", fr: "→ parlez-nous-en" },
    },
  },

  work: {
    section: {
      kicker: { it: "Casi di successo", en: "Case studies", es: "Casos de éxito", fr: "Études de cas" },
      titleBefore: {
        it: "Clienti veri, risultati ",
        en: "Real clients, ",
        es: "Clientes reales, resultados ",
        fr: "De vrais clients, des résultats ",
      },
      titleMark: { it: "misurati", en: "measured", es: "medidos", fr: "mesurés" },
      titleAfter: { it: "", en: " results", es: "", fr: "" },
    },
    deck: {
      it: "Lavori per clienti e progetti nostri: per ognuno il problema di partenza, cosa abbiamo costruito e i numeri che si possono verificare.",
      en: "Client work and our own projects: for each one, the starting problem, what we built and numbers you can check.",
      es: "Trabajos para clientes y proyectos propios: para cada uno, el problema de partida, qué construimos y cifras que se pueden comprobar.",
      fr: "Missions pour des clients et projets internes : pour chacun, le problème de départ, ce que nous avons construit et des chiffres vérifiables.",
    },
    nav: {
      prev: { it: "Caso precedente", en: "Previous case", es: "Caso anterior", fr: "Cas précédent" },
      next: { it: "Caso successivo", en: "Next case", es: "Caso siguiente", fr: "Cas suivant" },
      region: { it: "Casi di successo", en: "Case studies", es: "Casos de éxito", fr: "Études de cas" },
    },
    // Link alla pagina archivio /work, sotto il carosello dei casi Sanity
    // (issue #13) e anche quando non ce n'è nessuno in evidenza.
    allLink: {
      label: { it: "Tutti i lavori →", en: "All work →", es: "Todos los proyectos →", fr: "Toutes les réalisations →" },
      href: "/work",
    },
  },

  method: {
    section: {
      kicker: { it: "Come lavoriamo", en: "How we work", es: "Cómo trabajamos", fr: "Notre méthode" },
      title: { it: "Il nostro processo", en: "Our process", es: "Nuestro proceso", fr: "Notre processus" },
    } satisfies Section,
    steps: [
      {
        n: "01",
        title: { it: "Ascoltiamo", en: "We listen", es: "Escuchamos", fr: "Nous écoutons" },
        body: {
          it: "Guardiamo come lavori oggi: quali sono i tuoi processi, dove si inceppano, cosa ti costa tempo o clienti.",
          en: "We look at how you actually work: what your processes are, where they jam, what costs you time or customers.",
          es: "Observamos cómo trabajas de verdad: cuáles son tus procesos, dónde se atascan, qué te cuesta tiempo o clientes.",
          fr: "Nous regardons comment vous travaillez vraiment : quels sont vos processus, où ils coincent, ce qui vous coûte du temps ou des clients.",
        },
      },
      {
        n: "02",
        title: { it: "Costruiamo", en: "We build", es: "Construimos", fr: "Nous construisons" },
        body: {
          it: "La soluzione è cucita sul tuo processo, non un pacchetto preconfezionato.",
          en: "The solution is tailored to your process, not an off-the-shelf package.",
          es: "La solución se adapta a tu proceso, no es un paquete estándar.",
          fr: "La solution est taillée pour votre processus, ce n'est pas un produit standard.",
        },
      },
      {
        n: "03",
        title: { it: "Ti rendiamo autonomo", en: "We hand it over", es: "Te damos autonomía", fr: "Nous vous rendons autonome" },
        body: {
          it: "Formiamo il tuo team, sia su come usare l'AI nel quotidiano sia su come usarla dentro i flussi evoluti che costruiamo insieme.",
          en: "We train your team to use AI day to day and to run what we've built together on their own.",
          es: "Formamos a tu equipo para usar la IA en el día a día y gestionar por su cuenta lo que hemos construido juntos.",
          fr: "Nous formons votre équipe à utiliser l'IA au quotidien et à piloter seule ce que nous avons construit ensemble.",
        },
      },
      {
        n: "04",
        title: { it: "Misuriamo", en: "We measure", es: "Medimos", fr: "Nous mesurons" },
        body: {
          it: "Monitoriamo le performance nel tempo, sui tuoi numeri. Se qualcosa non rende, lo sistemiamo.",
          en: "We track performance over time, against your own numbers. If something underperforms, we fix it.",
          es: "Seguimos el rendimiento en el tiempo, con tus propias cifras. Si algo no rinde, lo corregimos.",
          fr: "Nous suivons les performances dans le temps, avec vos propres chiffres. Si quelque chose ne donne pas les résultats attendus, nous le corrigeons.",
        },
      },
    ] satisfies Step[],
  },

  offer: {
    section: {
      kicker: { it: "Come possiamo aiutarti", en: "How we can help", es: "Cómo podemos ayudarte", fr: "Comment nous pouvons vous aider" },
      title: {
        it: "Tre modi di lavorare insieme, una direzione sola",
        en: "Three ways to work together, one goal: making you self-sufficient",
        es: "Tres formas de colaborar, un objetivo: que seas autónomo",
        fr: "Trois façons de collaborer, un seul objectif : vous rendre autonome",
      },
      intro: {
        it: "Il tuo team adotta l'AI e migliora i processi di oggi senza perderne il controllo. Scegli da dove partire, senza contratti che ti legano.",
        en: "Your team adopts AI and improves today's processes without losing control of them. Pick where to start, no strings attached.",
        es: "Tu equipo adopta la IA y mejora los procesos actuales sin perder el control. Elige por dónde empezar, sin ataduras.",
        fr: "Votre équipe adopte l'IA et améliore les processus actuels sans en perdre le contrôle. Choisissez par où commencer, sans engagement.",
      },
    },
    badgeFeatured: { it: "dall'idea alla produzione", en: "from idea to production", es: "de la idea a producción", fr: "de l'idée à la production" },
    tracks: [
      {
        kind: { it: "formazione", en: "training", es: "formación", fr: "formation" },
        title: { it: "Formazione AI", en: "AI training", es: "Formación en IA", fr: "Formation IA" },
        body: {
          it: "Sessioni pratiche per te e il tuo team, costruite sul tuo lavoro di tutti i giorni. Alla fine il team usa l'AI senza bisogno di noi.",
          en: "Hands-on sessions for you and your team, built around your day-to-day work. By the end, your team uses AI without needing us.",
          es: "Sesiones prácticas para ti y tu equipo, construidas sobre vuestro trabajo diario. Al terminar, tu equipo usa la IA sin necesitarnos.",
          fr: "Des sessions pratiques pour vous et votre équipe, construites autour de votre travail quotidien. À la fin, votre équipe utilise l'IA sans avoir besoin de nous.",
        },
        price: { it: "preventivo in base al team", en: "quoted on team size", es: "presupuesto según el equipo", fr: "devis selon la taille de l'équipe" },
        timeline: { it: "1-2 sessioni", en: "1 to 2 sessions", es: "1-2 sesiones", fr: "1 à 2 sessions" },
        includes: [
          {
            it: "Sessioni sul tuo lavoro di tutti i giorni, non slide",
            en: "Sessions on your day-to-day work, not slides",
            es: "Sesiones sobre tu trabajo diario, no diapositivas",
            fr: "Des sessions sur votre travail quotidien, pas des slides",
          },
          {
            it: "Prompt e flussi pronti da riusare il giorno dopo",
            en: "Prompts and flows ready to reuse the next day",
            es: "Prompts y flujos listos para reutilizar al día siguiente",
            fr: "Des prompts et des flux prêts à réutiliser dès le lendemain",
          },
          {
            it: "Registrazione e materiali che restano al team",
            en: "Recording and materials the team keeps",
            es: "Grabación y materiales que se quedan en el equipo",
            fr: "Enregistrement et supports qui restent à l'équipe",
          },
        ],
        who: {
          it: "Team che usano già l'AI a intuito e vogliono smettere di improvvisare.",
          en: "Teams already using AI by instinct who want to stop improvising.",
          es: "Equipos que ya usan la IA por instinto y quieren dejar de improvisar.",
          fr: "Les équipes qui utilisent déjà l'IA à l'instinct et veulent arrêter d'improviser.",
        },
        steps: [
          {
            it: "Ci dici dove il team perde tempo: raccogliamo i casi concreti prima della sessione.",
            en: "You tell us where your team loses time: we collect concrete cases before the session.",
            es: "Nos cuentas dónde pierde tiempo tu equipo: recogemos casos concretos antes de la sesión.",
            fr: "Vous nous dites où votre équipe perd du temps : nous rassemblons des cas concrets avant la session.",
          },
          {
            it: "Lavoriamo insieme su quei casi, dal vivo, sui tuoi strumenti.",
            en: "We work through those cases together, live, on your own tools.",
            es: "Trabajamos esos casos juntos, en directo, con tus propias herramientas.",
            fr: "Nous traitons ces cas ensemble, en direct, sur vos propres outils.",
          },
          {
            it: "Restano prompt, flussi e una guida scritta per il team.",
            en: "You keep the prompts, the flows and a written guide for the team.",
            es: "Te quedas con los prompts, los flujos y una guía escrita para el equipo.",
            fr: "Vous gardez les prompts, les flux et un guide écrit pour l'équipe.",
          },
        ],
        cta: { it: "Organizziamo la formazione\u00a0→", en: "Let's plan the training\u00a0→", es: "Organicemos la formación →", fr: "Organisons la formation →" },
        anchor: "training",
        example: "/work/in-person-ai-training",
      },
      {
        kind: { it: "soluzione", en: "solution", es: "solución", fr: "solution" },
        title: { it: "Chiavi in mano", en: "Turnkey solution", es: "Llave en mano", fr: "Clé en main" },
        body: {
          it: "Progettiamo, costruiamo e consegniamo la soluzione. Formazione inclusa: la gestisci tu, senza dipendere da noi.",
          en: "We design, build and deliver the solution. Training included: you run it, without depending on us.",
          es: "Diseñamos, construimos y entregamos la solución. Formación incluida: la gestionas tú, sin depender de nosotros.",
          fr: "Nous concevons, construisons et livrons la solution. Formation incluse : vous la pilotez, sans dépendre de nous.",
        },
        price: { it: "prezzo fisso, deciso prima", en: "fixed price, agreed upfront", es: "precio cerrado, acordado antes", fr: "prix fixe, convenu à l'avance" },
        timeline: { it: "2-4 settimane", en: "2 to 4 weeks", es: "2-4 semanas", fr: "2 à 4 semaines" },
        includes: [
          {
            it: "Analisi del processo e scelta del modello adatto",
            en: "Process analysis and the right model for the job",
            es: "Análisis del proceso y el modelo adecuado para cada tarea",
            fr: "Analyse du processus et le bon modèle pour la tâche",
          },
          {
            it: "Soluzione in produzione, integrata con i sistemi che usi",
            en: "Solution in production, integrated with the systems you use",
            es: "Solución en producción, integrada con los sistemas que usas",
            fr: "Solution en production, intégrée aux systèmes que vous utilisez",
          },
          {
            it: "Formazione del team e documentazione per gestirla in autonomia",
            en: "Team training and documentation so you can run it yourself",
            es: "Formación del equipo y documentación para que la gestiones tú",
            fr: "Formation de l'équipe et documentation pour que vous la pilotiez vous-même",
          },
        ],
        featured: true,
        who: {
          it: "Chi ha un processo che si ripete ogni giorno e costa ore o clienti persi.",
          en: "Anyone with a process that repeats every day and costs hours or lost customers.",
          es: "Quien tiene un proceso que se repite cada día y cuesta horas o clientes perdidos.",
          fr: "Ceux qui ont un processus qui se répète chaque jour et coûte des heures ou des clients perdus.",
        },
        steps: [
          {
            it: "Mappiamo il processo con le persone che lo seguono e fissiamo il risultato atteso.",
            en: "We map the process with the people who run it and agree on the target result.",
            es: "Mapeamos el proceso con quienes lo llevan y acordamos el resultado objetivo.",
            fr: "Nous cartographions le processus avec ceux qui le font tourner et convenons du résultat visé.",
          },
          {
            it: "Costruiamo in pochi giorni una prima versione funzionante e la provi sul lavoro di tutti i giorni.",
            en: "We build a first working version in a few days and you try it on your day-to-day work.",
            es: "Construimos una primera versión funcional en pocos días y la pruebas en tu trabajo diario.",
            fr: "Nous construisons une première version fonctionnelle en quelques jours et vous la testez dans votre travail quotidien.",
          },
          {
            it: "Andiamo in produzione con una persona che controlla i passaggi delicati: niente automatismi alla cieca.",
            en: "We go live with a person checking the sensitive steps: no blind automation.",
            es: "Pasamos a producción con una persona controlando los pasos delicados: nada de automatización a ciegas.",
            fr: "Nous passons en production avec une personne qui contrôle les étapes sensibles : pas d'automatisation à l'aveugle.",
          },
          {
            it: "Formiamo il team, lasciamo la documentazione e da lì in poi sei autonomo.",
            en: "We train the team, hand over the documentation, and from then on you're self-sufficient.",
            es: "Formamos al equipo, entregamos la documentación y a partir de ahí eres autónomo.",
            fr: "Nous formons l'équipe, remettons la documentation, et à partir de là vous êtes autonome.",
          },
        ],
        cta: { it: "Raccontaci il processo\u00a0→", en: "Tell us about your process\u00a0→", es: "Cuéntanos tu proceso →", fr: "Parlez-nous de votre processus →" },
        anchor: "turnkey",
        example: "/work/automated-grid-connection-paperwork",
      },
      {
        kind: { it: "consulenza", en: "consulting", es: "consultoría", fr: "conseil" },
        title: { it: "Consulenza spot", en: "Advisory session", es: "Consultoría puntual", fr: "Conseil ponctuel" },
        body: {
          it: "Dopo la call gratuita, una sessione di lavoro a ore per capire dove l'AI conviene nella tua azienda e da dove partire. Esci con un piano scritto, che resta tuo.",
          en: "After the free call, an hourly working session to find where AI pays off in your business and where to start. You leave with a written plan that's yours to keep.",
          es: "Después de la llamada gratuita, una sesión de trabajo por horas para encontrar dónde la IA compensa en tu negocio y por dónde empezar. Te llevas un plan escrito que es tuyo.",
          fr: "Après l'appel gratuit, une séance de travail facturée à l'heure pour trouver où l'IA est rentable dans votre activité et par où commencer. Vous repartez avec un plan écrit qui vous appartient.",
        },
        price: { it: "a ore · prezzo trasparente", en: "hourly · transparent rate", es: "por horas · precio transparente", fr: "à l'heure · tarif transparent" },
        timeline: { it: "una sessione", en: "one session", es: "una sesión", fr: "une séance" },
        includes: [
          {
            it: "Una mappa di dove l'AI conviene, e dove no",
            en: "A map of where AI actually pays off, and where it doesn't",
            es: "Un mapa de dónde la IA compensa de verdad, y dónde no",
            fr: "Une carte des endroits où l'IA est vraiment rentable, et de ceux où elle ne l'est pas",
          },
          {
            it: "Stima onesta di tempi e costi per ogni idea",
            en: "An honest time and cost estimate for each idea",
            es: "Una estimación honesta de tiempos y costes para cada idea",
            fr: "Une estimation honnête des délais et des coûts pour chaque idée",
          },
          {
            it: "Che cosa fare per primo, con quale ritorno atteso",
            en: "What to do first, and the return to expect",
            es: "Qué hacer primero y qué retorno esperar",
            fr: "Quoi faire en premier, et quel retour attendre",
          },
        ],
        who: {
          it: "Chi ha molte idee sull'AI e vuole sapere quale regge prima di investirci.",
          en: "Anyone with lots of AI ideas who wants to know which one holds up before investing.",
          es: "Quien tiene muchas ideas sobre IA y quiere saber cuál se sostiene antes de invertir.",
          fr: "Ceux qui ont beaucoup d'idées sur l'IA et veulent savoir laquelle tient la route avant d'investir.",
        },
        steps: [
          {
            it: "Ci racconti il problema e come lavori oggi.",
            en: "You walk us through the problem and how you work today.",
            es: "Nos explicas el problema y cómo trabajas hoy.",
            fr: "Vous nous expliquez le problème et comment vous travaillez aujourd'hui.",
          },
          {
            it: "Mettiamo le idee in ordine per impatto e difficoltà, insieme a te.",
            en: "We rank the ideas by impact and difficulty, with you in the room.",
            es: "Ordenamos las ideas por impacto y dificultad, contigo delante.",
            fr: "Nous classons les idées par impact et difficulté, avec vous.",
          },
          {
            it: "Ti lasciamo il piano: se vuoi lo costruiamo insieme, altrimenti lo porti avanti tu.",
            en: "You leave with the plan: we can build it together, or you can take it forward on your own.",
            es: "Te llevas el plan: podemos construirlo juntos o puedes seguir adelante por tu cuenta.",
            fr: "Vous repartez avec le plan : nous pouvons le construire ensemble, ou vous pouvez le mener seul.",
          },
        ],
        cta: { it: "Chiedi una sessione\u00a0→", en: "Ask for a session\u00a0→", es: "Pide una sesión →", fr: "Demandez une séance →" },
        anchor: "consulting",
        example: "/work",
      },
    ] satisfies OfferTrack[],
    deepLink: {
      label: { it: "Vedi i servizi nel dettaglio →", en: "See our services in detail →", es: "Ver los servicios en detalle →", fr: "Voir les services en détail →" },
      href: "/services",
    },
  },

  why: {
    kicker: { it: "Perché flylabs", en: "Why flylabs", es: "Por qué flylabs", fr: "Pourquoi flylabs" },
    statementBefore: {
      it: "Costruiamo la soluzione su misura e formiamo il team per gestirla in autonomia. Prezzo deciso prima, nessun contratto che ti lega. ",
      en: "We build the solution around your process and train your team to run it on their own. Price agreed upfront, no strings attached. ",
      es: "Construimos la solución en torno a tu proceso y formamos a tu equipo para gestionarla por su cuenta. Precio acordado antes, sin ataduras. ",
      fr: "Nous construisons la solution autour de votre processus et formons votre équipe à la piloter seule. Prix convenu à l'avance, sans engagement. ",
    },
    statementMark: {
      it: "Parli con chi costruisce.",
      en: "You talk to the people who build.",
      es: "Hablas con quien construye.",
      fr: "Vous parlez à ceux qui construisent.",
    },
    chips: [
      { it: "prezzo trasparente", en: "transparent pricing", es: "precio transparente", fr: "prix transparent" },
      { it: "no lock-in", en: "no lock-in", es: "sin permanencia", fr: "sans engagement" },
      { it: "team formato", en: "trained team", es: "equipo formado", fr: "équipe formée" },
      { it: "live in 2-4 settimane", en: "live in 2-4 weeks", es: "en producción en 2-4 semanas", fr: "en production en 2 à 4 semaines" },
    ] as Localized[],
  },

  faq: {
    section: {
      kicker: { it: "FAQ", en: "FAQ", es: "Preguntas frecuentes", fr: "FAQ" },
      title: { it: "Le domande che ci fanno tutti.", en: "Questions we always get.", es: "Las preguntas que todos nos hacen.", fr: "Les questions qu'on nous pose toujours." },
    } satisfies Section,
    items: [
      {
        q: { it: "Quanto costa?", en: "How much does it cost?", es: "¿Cuánto cuesta?", fr: "Combien ça coûte ?" },
        a: {
          it: "Prezzo fisso per soluzione. Prima di iniziare sai cosa paghi e cosa ricevi.",
          en: "Fixed price per solution. Before we start, you know what you pay and what you get.",
          es: "Precio cerrado por solución. Antes de empezar sabes qué pagas y qué recibes.",
          fr: "Un prix fixe par solution. Avant de commencer, vous savez ce que vous payez et ce que vous obtenez.",
        },
      },
      {
        q: {
          it: "Devo capirci di AI?",
          en: "Do I need to understand AI?",
          es: "¿Tengo que saber de IA?",
          fr: "Faut-il s'y connaître en IA ?",
        },
        a: {
          it: "No. La parte tecnica è nostra. Quello che ti serve te lo insegniamo.",
          en: "No. The technical part is on us. What you need to know, we teach you.",
          es: "No. La parte técnica es cosa nuestra. Lo que necesitas saber, te lo enseñamos.",
          fr: "Non. La partie technique, c'est notre affaire. Ce que vous devez savoir, nous vous l'apprenons.",
        },
      },
      {
        q: { it: "Resto legato a voi?", en: "Am I locked in?", es: "¿Me quedo atado a vosotros?", fr: "Est-ce que je reste lié à vous ?" },
        a: {
          it: "No. Costruiamo la soluzione, ti formiamo e da lì è tua. Se vuoi farla crescere ci siamo, ma decidi tu.",
          en: "No. We build it, train you, and from then on it's yours. If you want to grow it further we're here, but it's your call.",
          es: "No. Lo construimos, te formamos y a partir de ahí es tuyo. Si quieres hacerlo crecer, aquí estamos, pero tú decides.",
          fr: "Non. Nous le construisons, nous vous formons, et ensuite c'est à vous. Si vous voulez le faire évoluer, nous sommes là, mais c'est vous qui décidez.",
        },
      },
      {
        q: { it: "Quanto ci vuole?", en: "How long does it take?", es: "¿Cuánto tiempo lleva?", fr: "Combien de temps ça prend ?" },
        a: {
          it: "Dalla prima call alla soluzione in produzione di solito passano 2-4 settimane. Se il caso è grande lo spezziamo, partendo dal pezzo che ti fa risparmiare tempo subito.",
          en: "From the first call to a solution in production it's usually 2 to 4 weeks. If the case is big we split it, starting with the piece that saves you time right away.",
          es: "De la primera llamada a una solución en producción suelen pasar de 2 a 4 semanas. Si el caso es grande lo dividimos, empezando por la parte que te ahorra tiempo enseguida.",
          fr: "Du premier appel à une solution en production, il faut en général 2 à 4 semaines. Si le projet est important, nous le découpons, en commençant par la partie qui vous fait gagner du temps tout de suite.",
        },
      },
      {
        q: { it: "E se l'AI sbaglia?", en: "What if the AI gets it wrong?", es: "¿Y si la IA se equivoca?", fr: "Et si l'IA se trompe ?" },
        a: {
          it: "Progettiamo perché sbagliare costi poco: nei punti delicati l'AI prepara e una persona conferma. Niente invii o pubblicazioni alla cieca.",
          en: "We design so mistakes stay cheap: at the sensitive steps the AI drafts and a person confirms. Nothing gets sent or published blindly.",
          es: "Diseñamos para que los errores salgan baratos: en los pasos delicados la IA redacta y una persona confirma. Nada se envía ni se publica a ciegas.",
          fr: "Nous concevons pour que les erreurs coûtent peu : aux étapes sensibles, l'IA rédige et une personne valide. Rien n'est envoyé ni publié à l'aveugle.",
        },
      },
      {
        q: {
          it: "Si integra con i software che usiamo già?",
          en: "Does it work with the software we already use?",
          es: "¿Funciona con el software que ya usamos?",
          fr: "Est-ce que ça marche avec les logiciels que nous utilisons déjà ?",
        },
        a: {
          it: "Di solito sì: CRM, gestionali, fogli di lavoro, WhatsApp e i canali social. Se un sistema non ha API, spesso si automatizza lo stesso.",
          en: "Usually yes: CRMs, business software, spreadsheets, WhatsApp and social channels. If a system has no API, it can often be automated anyway.",
          es: "Normalmente sí: CRM, software de gestión, hojas de cálculo, WhatsApp y redes sociales. Si un sistema no tiene API, a menudo se puede automatizar igualmente.",
          fr: "En général oui : CRM, logiciels de gestion, tableurs, WhatsApp et réseaux sociaux. Si un système n'a pas d'API, on peut souvent l'automatiser quand même.",
        },
      },
      {
        q: { it: "Quale modello AI usate?", en: "Which AI model do you use?", es: "¿Qué modelo de IA usáis?", fr: "Quel modèle d'IA utilisez-vous ?" },
        a: {
          it: "Quello che serve al problema. Lavoriamo con Claude, GPT, Gemini e DeepSeek e scegliamo in base a qualità, costo e privacy: non sei legato a un fornitore.",
          en: "Whichever fits the problem. We work with Claude, GPT, Gemini and DeepSeek and choose on quality, cost and privacy: you're not tied to one vendor.",
          es: "El que mejor se adapta al problema. Trabajamos con Claude, GPT, Gemini y DeepSeek y elegimos por calidad, coste y privacidad: no dependes de un solo proveedor.",
          fr: "Celui qui convient au problème. Nous travaillons avec Claude, GPT, Gemini et DeepSeek et choisissons selon la qualité, le coût et la confidentialité : vous ne dépendez pas d'un seul fournisseur.",
        },
      },
      {
        q: { it: "I nostri dati dove finiscono?", en: "Where does our data end up?", es: "¿Dónde acaban nuestros datos?", fr: "Où vont nos données ?" },
        a: {
          it: "Nei sistemi che usi già, più i soli servizi che il flusso richiede, come il fornitore del modello AI. Prima di partire ti diciamo quali servizi tocca il flusso, quali dati ci passano e dove vengono trattati.",
          en: "In the systems you already use, plus only the services the workflow needs, such as the AI model provider. Before we start we tell you which services the workflow touches, what data goes through them and where it's processed.",
          es: "En los sistemas que ya usas, más solo los servicios que el flujo necesita, como el proveedor del modelo de IA. Antes de empezar te decimos qué servicios toca el flujo, qué datos pasan por ellos y dónde se tratan.",
          fr: "Dans les systèmes que vous utilisez déjà, plus uniquement les services dont le flux a besoin, comme le fournisseur du modèle d'IA. Avant de commencer, nous vous indiquons quels services le flux utilise, quelles données y transitent et où elles sont traitées.",
        },
      },
      {
        q: { it: "Cosa vi serve da noi?", en: "What do you need from us?", es: "¿Qué necesitáis de nosotros?", fr: "De quoi avez-vous besoin de notre part ?" },
        a: {
          it: "Poche ore di chi conosce il processo, gli accessi ai sistemi coinvolti e qualche esempio concreto. Il resto è lavoro nostro.",
          en: "A few hours from whoever knows the process, access to the systems involved and a handful of real examples. The rest is on us.",
          es: "Unas horas de quien conoce el proceso, acceso a los sistemas implicados y algunos ejemplos reales. Del resto nos encargamos nosotros.",
          fr: "Quelques heures de la personne qui connaît le processus, l'accès aux systèmes concernés et une poignée d'exemples réels. Le reste, on s'en charge.",
        },
      },
    ] satisfies Faq[],
  },

  finalCta: {
    title: {
      it: "Il primo passo è capire il tuo problema.",
      en: "The first step is understanding your problem.",
      es: "El primer paso es entender tu problema.",
      fr: "La première étape, c'est de comprendre votre problème.",
    },
    body: {
      it: "Scrivici in due righe cosa ti fa perdere tempo. Ti risponde uno di noi, Cesare o Federico, e fissiamo una call gratuita per capire cosa si può automatizzare e da dove partire.",
      en: "Tell us in a couple of lines what's eating your time. One of us, Cesare or Federico, will reply and set up a free call to see what can be automated and where to start.",
      es: "Cuéntanos en un par de líneas qué te quita tiempo. Uno de nosotros, Cesare o Federico, te responderá y organizará una llamada gratuita para ver qué se puede automatizar y por dónde empezar.",
      fr: "Dites-nous en deux lignes ce qui vous prend du temps. L'un de nous, Cesare ou Federico, vous répondra et organisera un appel gratuit pour voir ce qui peut être automatisé et par où commencer.",
    },
    cta: {
      it: "Prenota una call gratuita →",
      en: "Book a free call →",
      es: "Reserva una llamada gratuita →",
      fr: "Réservez un appel gratuit →",
    },
    // Sotto il bottone di prenotazione (TidyCal): cosa aspettarsi, in una riga.
    bookNote: {
      it: "15 minuti online, scegli tu l'orario. Il calendario si apre in una nuova scheda.",
      en: "15 minutes online, at a time that suits you. The calendar opens in a new tab.",
      es: "15 minutos online, a la hora que te venga bien. El calendario se abre en una pestaña nueva.",
      fr: "15 minutes en ligne, au moment qui vous convient. Le calendrier s'ouvre dans un nouvel onglet.",
    },
    orEmail: { it: "oppure scrivici a", en: "or email us at", es: "o escríbenos a", fr: "ou écrivez-nous à" },
    formHeading: {
      it: "Preferisci scrivere? Raccontaci il problema.",
      en: "Rather write? Tell us the problem.",
      es: "¿Prefieres escribir? Cuéntanos el problema.",
      fr: "Vous préférez écrire ? Décrivez-nous le problème.",
    },
  },

  // Form di contatto (nel blocco CTA finale). Le richieste finiscono su Sanity.
  contact: {
    labels: {
      name: { it: "Nome", en: "Name", es: "Nombre", fr: "Nom" },
      company: { it: "Azienda", en: "Company", es: "Empresa", fr: "Entreprise" },
      email: { it: "Email", en: "Email", es: "Email", fr: "E-mail" },
      message: { it: "Messaggio", en: "Message", es: "Mensaje", fr: "Message" },
    },
    optional: { it: "facoltativo", en: "optional", es: "opcional", fr: "facultatif" },
    requiredLegend: {
      it: "I campi con * sono obbligatori.",
      en: "Fields marked * are required.",
      es: "Los campos con * son obligatorios.",
      fr: "Les champs marqués * sont obligatoires.",
    },
    // Hint visibile sotto la label del messaggio (era il placeholder).
    messageHint: {
      it: "Cosa ti fa perdere tempo? Raccontaci in due righe.",
      en: "What's eating your time? Tell us in a couple of lines.",
      es: "¿Qué te quita tiempo? Cuéntanoslo en un par de líneas.",
      fr: "Qu'est-ce qui vous prend du temps ? Dites-le-nous en deux lignes.",
    },
    submit: { it: "Invia richiesta", en: "Send request", es: "Enviar solicitud", fr: "Envoyer la demande" },
    sending: { it: "Invio…", en: "Sending…", es: "Enviando…", fr: "Envoi…" },
    // Richiamo all'informativa nel punto di raccolta (primo livello, WP260).
    privacy: {
      before: {
        it: "Usiamo i tuoi dati solo per risponderti e li conserviamo al massimo 24 mesi. Dettagli nella ",
        en: "We only use your details to reply to you and keep them for up to 24 months. Details in our ",
        es: "Usamos tus datos solo para responderte y los conservamos hasta 24 meses. Detalles en nuestra ",
        fr: "Nous utilisons vos données uniquement pour vous répondre et les conservons jusqu'à 24 mois. Détails dans notre ",
      },
      link: { it: "Privacy Policy", en: "Privacy Policy", es: "Política de privacidad", fr: "Politique de confidentialité" },
      after: { it: ".", en: ".", es: ".", fr: "." },
    },
    success: {
      title: {
        it: "Ricevuto, grazie.",
        en: "Got it, thanks.",
        es: "Recibido, gracias.",
        fr: "Bien reçu, merci.",
      },
      body: {
        it: "Ti scrive Cesare o Federico da info@flylabs.ai per fissare la call. Intanto, se vuoi, ",
        en: "Cesare or Federico will email you from info@flylabs.ai to set up the call. Meanwhile, feel free to ",
        es: "Cesare o Federico te escribirá desde info@flylabs.ai para organizar la llamada. Mientras tanto, puedes ",
        fr: "Cesare ou Federico vous écrira depuis info@flylabs.ai pour organiser l'appel. En attendant, vous pouvez ",
      },
      link: {
        label: { it: "guarda i nostri lavori", en: "browse our work", es: "ver nuestros proyectos", fr: "découvrir nos réalisations" },
        href: "/work",
      },
      after: { it: ".", en: ".", es: ".", fr: "." },
      // Mostrato solo se su Sanity c'è il link di prenotazione.
      book: {
        it: "Se preferisci, prenota subito 15 minuti →",
        en: "If you prefer, book 15 minutes right away →",
        es: "Si lo prefieres, reserva 15 minutos ahora mismo →",
        fr: "Si vous préférez, réservez 15 minutes tout de suite →",
      },
    },
    // Precompilazioni del messaggio per le CTA con contesto (B55, WS-10).
    prefill: {
      stellarAudit: {
        it: "Vorrei l'audit gratuito di Stellar Reviews per la mia struttura: [nome o link Google/Booking]",
        en: "I'd like the free Stellar Reviews audit for my business: [name or Google/Booking link]",
        es: "Me gustaría la auditoría gratuita de Stellar Reviews para mi negocio: [nombre o enlace de Google/Booking]",
        fr: "J'aimerais l'audit gratuit Stellar Reviews pour mon établissement : [nom ou lien Google/Booking]",
      },
      training: {
        it: "Vorrei organizzare una formazione AI per il mio team di [N] persone.",
        en: "I'd like to organise AI training for my team of [N] people.",
        es: "Me gustaría organizar una formación en IA para mi equipo de [N] personas.",
        fr: "J'aimerais organiser une formation IA pour mon équipe de [N] personnes.",
      },
    },
    errors: {
      // Fallback generico: la server action indica sempre anche il campo,
      // e il form mostra il messaggio specifico di `fields`.
      missing: {
        it: "Compila i campi obbligatori.",
        en: "Please fill in the required fields.",
        es: "Rellena los campos obligatorios.",
        fr: "Merci de remplir les champs obligatoires.",
      },
      email: {
        it: "Controlla l'email: deve essere tipo nome@azienda.it",
        en: "Check your email: it should look like name@company.com",
        es: "Revisa tu email: debería ser del tipo nombre@empresa.com",
        fr: "Vérifiez votre e-mail : il doit ressembler à nom@entreprise.com",
      },
      fields: {
        name: { it: "Scrivi il tuo nome.", en: "Please enter your name.", es: "Escribe tu nombre.", fr: "Indiquez votre nom." },
        email: {
          it: "Controlla l'email: deve essere tipo nome@azienda.it",
          en: "Check your email: it should look like name@company.com",
          es: "Revisa tu email: debería ser del tipo nombre@empresa.com",
          fr: "Vérifiez votre e-mail : il doit ressembler à nom@entreprise.com",
        },
        message: {
          it: "Scrivi due righe su cosa ti serve.",
          en: "Write a couple of lines about what you need.",
          es: "Escribe un par de líneas sobre lo que necesitas.",
          fr: "Écrivez deux lignes sur ce dont vous avez besoin.",
        },
      },
      // Aggiunto agli errori server/rate: i campi restano compilati.
      kept: {
        it: "Quello che hai scritto è ancora qui.",
        en: "What you typed is still here.",
        es: "Lo que has escrito sigue aquí.",
        fr: "Ce que vous avez écrit est toujours là.",
      },
      server: {
        it: "Qualcosa è andato storto. Riprova tra poco.",
        en: "Something went wrong. Please try again shortly.",
        es: "Algo ha fallado. Vuelve a intentarlo en unos momentos.",
        fr: "Une erreur s'est produite. Réessayez dans un instant.",
      },
      rate: {
        it: "Troppe richieste ravvicinate. Riprova tra qualche minuto.",
        en: "Too many requests in a short time. Please try again in a few minutes.",
        es: "Demasiadas solicitudes en poco tiempo. Vuelve a intentarlo en unos minutos.",
        fr: "Trop de demandes en peu de temps. Réessayez dans quelques minutes.",
      },
    },
  },

  // Teaser in fondo alla home → rimanda alla pagina /stack (non in menu).
  toolsStrip: {
    kicker: { it: "Sotto il cofano", en: "Under the hood", es: "Bajo el capó", fr: "Sous le capot" },
    title: { it: "I tool che usiamo", en: "The tools we use", es: "Las herramientas que usamos", fr: "Les outils que nous utilisons" },
    body: {
      it: "Non reinventiamo la ruota: combiniamo i migliori strumenti di AI, automazione e dati in base al tuo problema.",
      en: "We don't reinvent the wheel: we combine the best AI, automation and data tools to fit your problem.",
      es: "No reinventamos la rueda: combinamos las mejores herramientas de IA, automatización y datos según tu problema.",
      fr: "Nous ne réinventons pas la roue : nous combinons les meilleurs outils d'IA, d'automatisation et de données selon votre problème.",
    },
    cta: { it: "Vedi tutto lo stack →", en: "See the full stack →", es: "Ver todo el stack →", fr: "Voir toute la stack →" },
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

  // Pagina /services: approfondimento dei tre modi di lavorare insieme.
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
      es: {
        title: "Consultoría, desarrollo y formación en IA | flylabs.ai",
        description:
          "Formación en IA para tu equipo, soluciones llave en mano y consultoría por horas: plazos, qué incluye y cómo se fija el precio, dicho desde el principio.",
      },
      fr: {
        title: "Conseil, développement et formation IA | flylabs.ai",
        description:
          "Formation IA pour votre équipe, solutions clé en main et conseil à l'heure : délais, contenu et mode de calcul du prix, annoncés dès le départ.",
      },
    },
    kicker: { it: "Servizi", en: "Services", es: "Servicios", fr: "Services" },
    title: { it: "Come lavoriamo insieme", en: "How we work together", es: "Cómo trabajamos juntos", fr: "Comment nous travaillons ensemble" },
    intro: {
      it: "Tre punti di partenza, un solo metodo: capire il problema, costruire la soluzione più semplice che lo risolve, lasciarti in grado di gestirla da solo.",
      en: "Three starting points, one method: understand the problem, build the simplest thing that solves it, and leave you able to run it yourself.",
      es: "Tres puntos de partida, un método: entender el problema, construir lo más sencillo que lo resuelva y dejarte capaz de gestionarlo por tu cuenta.",
      fr: "Trois points de départ, une méthode : comprendre le problème, construire la solution la plus simple qui le résout, et vous rendre capable de la piloter vous-même.",
    },
    back: { it: "← Torna alla home", en: "← Back home", es: "← Volver al inicio", fr: "← Retour à l'accueil" },
    labels: {
      who: { it: "Per chi è", en: "Who it's for", es: "Para quién es", fr: "Pour qui" },
      includes: { it: "Cosa è incluso", en: "What's included", es: "Qué incluye", fr: "Ce qui est inclus" },
      steps: { it: "Come funziona", en: "How it works", es: "Cómo funciona", fr: "Comment ça marche" },
      timeline: { it: "Tempi", en: "Timeline", es: "Plazos", fr: "Délais" },
      price: { it: "Prezzo", en: "Price", es: "Precio", fr: "Prix" },
    },
    closing: {
      title: {
        it: "Non sai quale dei tre ti serve?",
        en: "Not sure which one you need?",
        es: "¿No sabes cuál de los tres necesitas?",
        fr: "Vous ne savez pas laquelle des trois il vous faut ?",
      },
      body: {
        it: "Nemmeno noi, finché non ci racconti il problema. La prima call serve a capirlo insieme, ed è gratuita.",
        en: "Neither do we, until you tell us the problem. The first call is there to figure it out together, and it's free.",
        es: "Nosotros tampoco, hasta que nos cuentes el problema. La primera llamada sirve para averiguarlo juntos, y es gratuita.",
        fr: "Nous non plus, tant que vous ne nous avez pas décrit le problème. Le premier appel sert à le déterminer ensemble, et il est gratuit.",
      },
      cta: { it: "Parliamone →", en: "Let's talk →", es: "Hablemos →", fr: "Parlons-en →" },
      ctaBook: { it: "Prenota 15 minuti →", en: "Book 15 minutes →", es: "Reserva 15 minutos →", fr: "Réservez 15 minutes →" },
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
      es: {
        title: "Nuestro stack de IA y automatización | flylabs.ai",
        description:
          "Las herramientas de IA, automatización y datos que usamos para construir las soluciones: Claude, n8n, Make, Apify y otras.",
      },
      fr: {
        title: "Notre stack IA et automatisation | flylabs.ai",
        description:
          "Les outils d'IA, d'automatisation et de données que nous utilisons pour construire nos solutions : Claude, n8n, Make, Apify et d'autres.",
      },
    },
    kicker: { it: "Sotto il cofano", en: "Under the hood", es: "Bajo el capó", fr: "Sous le capot" },
    title: { it: "I tool che usiamo", en: "The tools we use", es: "Las herramientas que usamos", fr: "Les outils que nous utilisons" },
    intro: {
      it: "Scegliamo lo strumento giusto per ogni pezzo del lavoro (modelli, orchestrazione, dati, web) e li combiniamo sul tuo caso. Nessun lock-in su una piattaforma sola.",
      en: "We pick the right tool for each part of the job (models, orchestration, data, web) and combine them for your case. No lock-in to a single platform.",
      es: "Elegimos la herramienta adecuada para cada parte del trabajo (modelos, orquestación, datos, web) y las combinamos para tu caso. Sin ataduras a una sola plataforma.",
      fr: "Nous choisissons le bon outil pour chaque partie du travail (modèles, orchestration, données, web) et les combinons pour votre cas. Aucune dépendance à une seule plateforme.",
    },
    back: { it: "← Torna alla home", en: "← Back home", es: "← Volver al inicio", fr: "← Retour à l'accueil" },
    // Disclaimer sui marchi di terzi, in fondo alla pagina (B32, WS-5).
    disclaimer: {
      it: "Marchi e loghi appartengono ai rispettivi titolari. Li mostriamo per indicare gli strumenti che usiamo: non implicano partnership o sponsorizzazione.",
      en: "Trademarks and logos belong to their respective owners. We show them to indicate the tools we use: no partnership or endorsement is implied.",
      es: "Las marcas y los logotipos pertenecen a sus respectivos titulares. Los mostramos para indicar las herramientas que usamos: no implican ninguna colaboración ni respaldo.",
      fr: "Les marques et logos appartiennent à leurs propriétaires respectifs. Nous les affichons pour indiquer les outils que nous utilisons : ils n'impliquent aucun partenariat ni aucune approbation.",
    },
    groups: [
      {
        name: { it: "AI e modelli", en: "AI & models", es: "IA y modelos", fr: "IA et modèles" },
        tools: [
          {
            icon: "logos:anthropic-icon",
            name: "Claude",
            desc: {
              it: "Il nostro modello principale per ragionamento e scrittura.",
              en: "Our main model for reasoning and writing.",
              es: "Nuestro modelo principal para razonar y redactar.",
              fr: "Notre modèle principal pour le raisonnement et la rédaction.",
            },
          },
          {
            icon: "logos:openai-icon",
            name: "GPT · OpenAI",
            desc: {
              it: "Modelli OpenAI dove sono la scelta migliore.",
              en: "OpenAI models where they're the better fit.",
              es: "Modelos de OpenAI donde encajan mejor.",
              fr: "Les modèles OpenAI là où ils sont les plus adaptés.",
            },
          },
          {
            icon: "logos:google-gemini",
            name: "Gemini",
            desc: {
              it: "Modelli Google per task multimodali.",
              en: "Google models for multimodal tasks.",
              es: "Modelos de Google para tareas multimodales.",
              fr: "Les modèles Google pour les tâches multimodales.",
            },
          },
          {
            icon: "logos:perplexity-icon",
            name: "Perplexity",
            desc: {
              it: "Ricerca con fonti per contenuti e analisi.",
              en: "Sourced research for content and analysis.",
              es: "Investigación con fuentes para contenidos y análisis.",
              fr: "Recherche sourcée pour les contenus et les analyses.",
            },
          },
        ],
      },
      {
        name: { it: "Framework AI e RAG", en: "AI frameworks & RAG", es: "Frameworks de IA y RAG", fr: "Frameworks IA et RAG" },
        tools: [
          {
            icon: "simple-icons:langchain",
            name: "LangChain",
            desc: {
              it: "Orchestrazione di catene e agenti LLM.",
              en: "Orchestrating LLM chains and agents.",
              es: "Orquestación de cadenas y agentes LLM.",
              fr: "Orchestration de chaînes et d'agents LLM.",
            },
          },
          {
            name: "LlamaIndex",
            desc: {
              it: "Indicizzazione e retrieval sui tuoi dati.",
              en: "Indexing and retrieval over your data.",
              es: "Indexación y recuperación sobre tus datos.",
              fr: "Indexation et recherche sur vos données.",
            },
          },
          {
            icon: "logos:vercel-icon",
            name: "Vercel AI SDK",
            desc: {
              it: "Streaming, tool calling e UI AI in produzione.",
              en: "Streaming, tool calling and AI UI in production.",
              es: "Streaming, tool calling e interfaces de IA en producción.",
              fr: "Streaming, tool calling et interfaces IA en production.",
            },
          },
          {
            icon: "simple-icons:crewai",
            name: "CrewAI",
            desc: {
              it: "Più agenti che collaborano sullo stesso task.",
              en: "Multiple agents collaborating on one task.",
              es: "Varios agentes colaborando en una misma tarea.",
              fr: "Plusieurs agents qui collaborent sur une même tâche.",
            },
          },
          {
            icon: "logos:pinecone",
            name: "Pinecone",
            desc: {
              it: "Vector database per la ricerca semantica.",
              en: "Vector database for semantic search.",
              es: "Base de datos vectorial para la búsqueda semántica.",
              fr: "Base de données vectorielle pour la recherche sémantique.",
            },
          },
          {
            icon: "logos:supabase-icon",
            name: "Supabase",
            desc: {
              it: "Postgres + pgvector, auth e storage per le app.",
              en: "Postgres + pgvector, auth and storage for apps.",
              es: "Postgres + pgvector, autenticación y almacenamiento para apps.",
              fr: "Postgres + pgvector, authentification et stockage pour les applications.",
            },
          },
        ],
      },
      {
        name: { it: "Automazione e orchestrazione", en: "Automation & orchestration", es: "Automatización y orquestación", fr: "Automatisation et orchestration" },
        tools: [
          {
            icon: "simple-icons:n8n",
            name: "n8n",
            desc: {
              it: "Orchestrazione self-hosted dei flussi, senza limiti di piattaforma.",
              en: "Self-hosted workflow orchestration, no platform limits.",
              es: "Orquestación de flujos self-hosted, sin límites de plataforma.",
              fr: "Orchestration de workflows auto-hébergée, sans limites de plateforme.",
            },
          },
          {
            icon: "simple-icons:make",
            name: "Make",
            desc: {
              it: "Automazioni visuali multi-step, veloci da montare.",
              en: "Visual multi-step automations, quick to assemble.",
              es: "Automatizaciones visuales de varios pasos, rápidas de montar.",
              fr: "Automatisations visuelles en plusieurs étapes, rapides à assembler.",
            },
          },
          {
            icon: "logos:zapier-icon",
            name: "Zapier",
            desc: {
              it: "Connettori rapidi tra le app che già usi.",
              en: "Quick connectors between the apps you already use.",
              es: "Conectores rápidos entre las apps que ya usas.",
              fr: "Des connecteurs rapides entre les applications que vous utilisez déjà.",
            },
          },
        ],
      },
      {
        name: { it: "Voice, telefonia e audio", en: "Voice, telephony & audio", es: "Voz, telefonía y audio", fr: "Voix, téléphonie et audio" },
        tools: [
          {
            icon: "simple-icons:elevenlabs",
            name: "ElevenLabs",
            desc: {
              it: "Voci sintetiche realistiche per gli agenti.",
              en: "Realistic synthetic voices for agents.",
              es: "Voces sintéticas realistas para los agentes.",
              fr: "Des voix de synthèse réalistes pour les agents.",
            },
          },
          {
            name: "Vapi",
            desc: {
              it: "Voice agent telefonici in tempo reale.",
              en: "Real-time telephone voice agents.",
              es: "Agentes de voz telefónicos en tiempo real.",
              fr: "Agents vocaux téléphoniques en temps réel.",
            },
          },
          {
            icon: "logos:twilio-icon",
            name: "Twilio",
            desc: {
              it: "SMS, voce e WhatsApp programmabili.",
              en: "Programmable SMS, voice and WhatsApp.",
              es: "SMS, voz y WhatsApp programables.",
              fr: "SMS, voix et WhatsApp programmables.",
            },
          },
          {
            icon: "logos:openai-icon",
            name: "Whisper",
            desc: {
              it: "Trascrizione speech-to-text multilingua.",
              en: "Multilingual speech-to-text transcription.",
              es: "Transcripción de voz a texto multilingüe.",
              fr: "Transcription de la parole en texte, multilingue.",
            },
          },
          {
            icon: "simple-icons:deepgram",
            name: "Deepgram",
            desc: {
              it: "Trascrizione in tempo reale a bassa latenza.",
              en: "Low-latency real-time transcription.",
              es: "Transcripción en tiempo real con baja latencia.",
              fr: "Transcription en temps réel à faible latence.",
            },
          },
          {
            name: "Fireflies",
            desc: {
              it: "Trascrive le call e ne estrae gli action item.",
              en: "Transcribes calls and extracts action items.",
              es: "Transcribe las llamadas y extrae las tareas pendientes.",
              fr: "Transcrit les appels et en extrait les actions à mener.",
            },
          },
        ],
      },
      {
        name: { it: "Dati e scraping", en: "Data & scraping", es: "Datos y scraping", fr: "Données et scraping" },
        tools: [
          {
            icon: "devicon:apify",
            name: "Apify",
            desc: {
              it: "Scraping di recensioni, social e web a scala.",
              en: "Scraping reviews, social and web at scale.",
              es: "Scraping de reseñas, redes sociales y web a gran escala.",
              fr: "Scraping d'avis, de réseaux sociaux et du web à grande échelle.",
            },
          },
          {
            icon: "simple-icons:googlesheets",
            name: "Google Sheets",
            desc: {
              it: "Interfacce operative human-in-the-loop.",
              en: "Human-in-the-loop operator interfaces.",
              es: "Interfaces operativas human-in-the-loop.",
              fr: "Interfaces opérationnelles human-in-the-loop.",
            },
          },
          {
            icon: "logos:airtable",
            name: "Airtable",
            desc: {
              it: "Database no-code per dati e workflow leggeri.",
              en: "No-code database for data and light workflows.",
              es: "Base de datos no-code para datos y flujos ligeros.",
              fr: "Base de données no-code pour les données et les workflows légers.",
            },
          },
          {
            icon: "logos:google-cloud",
            name: "BigQuery",
            desc: {
              it: "Data warehouse per analisi su grandi volumi.",
              en: "Data warehouse for large-scale analytics.",
              es: "Data warehouse para análisis a gran escala.",
              fr: "Data warehouse pour l'analyse à grande échelle.",
            },
          },
        ],
      },
      {
        name: { it: "Web e deploy", en: "Web & deploy", es: "Web y despliegue", fr: "Web et déploiement" },
        tools: [
          {
            icon: "logos:nextjs-icon",
            name: "Next.js",
            desc: {
              it: "Web app e siti moderni, veloci e SEO-ready.",
              en: "Modern web apps and sites, fast and SEO-ready.",
              es: "Web apps y sitios modernos, rápidos y preparados para el SEO.",
              fr: "Applications et sites web modernes, rapides et prêts pour le SEO.",
            },
          },
          {
            icon: "logos:vercel-icon",
            name: "Vercel",
            desc: {
              it: "Hosting e deploy continui, preview su ogni modifica.",
              en: "Continuous hosting and deploy, preview on every change.",
              es: "Hosting y despliegue continuo, con vista previa en cada cambio.",
              fr: "Hébergement et déploiement continus, avec aperçu à chaque modification.",
            },
          },
          {
            icon: "logos:postgresql",
            name: "Postgres",
            desc: {
              it: "Database solido per le app su misura.",
              en: "Solid database for custom apps.",
              es: "Base de datos sólida para las apps a medida.",
              fr: "Une base de données solide pour les applications sur mesure.",
            },
          },
        ],
      },
      {
        name: { it: "Marketing e advertising", en: "Marketing & advertising", es: "Marketing y publicidad", fr: "Marketing et publicité" },
        tools: [
          {
            name: "Higgsfield",
            desc: {
              it: "Video AI per creatività social e ads.",
              en: "AI video for social and ad creative.",
              es: "Vídeo con IA para creatividades en redes y anuncios.",
              fr: "Vidéo IA pour les créations réseaux sociaux et publicitaires.",
            },
          },
          {
            icon: "logos:meta-icon",
            name: "Meta Ads",
            desc: {
              it: "Campagne su Facebook e Instagram, anche automatizzate.",
              en: "Facebook and Instagram campaigns, automated too.",
              es: "Campañas en Facebook e Instagram, también automatizadas.",
              fr: "Campagnes Facebook et Instagram, automatisées elles aussi.",
            },
          },
          {
            icon: "logos:google-ads",
            name: "Google Ads",
            desc: {
              it: "Campagne search e performance su Google.",
              en: "Search and performance campaigns on Google.",
              es: "Campañas de búsqueda y performance en Google.",
              fr: "Campagnes de recherche et de performance sur Google.",
            },
          },
        ],
      },
      {
        name: { it: "CRM, email e booking", en: "CRM, email & booking", es: "CRM, email y reservas", fr: "CRM, e-mail et réservations" },
        tools: [
          {
            icon: "logos:hubspot",
            name: "HubSpot",
            desc: {
              it: "CRM e gestione dei lead.",
              en: "CRM and lead management.",
              es: "CRM y gestión de leads.",
              fr: "CRM et gestion des prospects.",
            },
          },
          {
            icon: "simple-icons:brevo",
            name: "Brevo",
            desc: {
              it: "Email, sequenze e follow-up automatici.",
              en: "Email, sequences and automated follow-up.",
              es: "Email, secuencias y seguimiento automatizado.",
              fr: "E-mails, séquences et relances automatisées.",
            },
          },
          {
            icon: "simple-icons:resend",
            name: "Resend",
            desc: {
              it: "Email transazionali affidabili.",
              en: "Reliable transactional email.",
              es: "Emails transaccionales fiables.",
              fr: "E-mails transactionnels fiables.",
            },
          },
          {
            name: "TidyCal",
            desc: {
              it: "Prenotazione call con domande di qualifica.",
              en: "Call booking with qualification questions.",
              es: "Reserva de llamadas con preguntas de cualificación.",
              fr: "Réservation d'appels avec questions de qualification.",
            },
          },
          {
            icon: "simple-icons:calendly",
            name: "Calendly",
            desc: {
              it: "Scheduling delle call e sync col calendario.",
              en: "Call scheduling and calendar sync.",
              es: "Programación de llamadas y sincronización con el calendario.",
              fr: "Planification des appels et synchronisation avec l'agenda.",
            },
          },
        ],
      },
      {
        name: { it: "Dev e produttività", en: "Dev & productivity", es: "Desarrollo y productividad", fr: "Développement et productivité" },
        tools: [
          {
            icon: "logos:python",
            name: "Python",
            desc: {
              it: "Il linguaggio dei nostri script, modelli e pipeline.",
              en: "The language of our scripts, models and pipelines.",
              es: "El lenguaje de nuestros scripts, modelos y pipelines.",
              fr: "Le langage de nos scripts, modèles et pipelines.",
            },
          },
          {
            icon: "logos:notion-icon",
            name: "Notion",
            desc: {
              it: "Knowledge base e gestione del lavoro.",
              en: "Knowledge base and work management.",
              es: "Base de conocimiento y gestión del trabajo.",
              fr: "Base de connaissances et gestion du travail.",
            },
          },
        ],
      },
      {
        name: { it: "Canali e messaggistica", en: "Channels & messaging", es: "Canales y mensajería", fr: "Canaux et messagerie" },
        tools: [
          {
            icon: "logos:whatsapp-icon",
            name: "WhatsApp",
            desc: {
              it: "Chatbot e notifiche dove sono i tuoi clienti.",
              en: "Chatbots and notifications where your customers are.",
              es: "Chatbots y notificaciones donde están tus clientes.",
              fr: "Chatbots et notifications là où sont vos clients.",
            },
          },
          {
            icon: "skill-icons:instagram",
            name: "Instagram",
            desc: {
              it: "Risposte e lead dai social.",
              en: "Replies and leads from social.",
              es: "Respuestas y leads desde las redes sociales.",
              fr: "Réponses et prospects depuis les réseaux sociaux.",
            },
          },
          {
            icon: "logos:messenger",
            name: "Messenger",
            desc: {
              it: "Conversazioni su Facebook.",
              en: "Conversations on Facebook.",
              es: "Conversaciones en Facebook.",
              fr: "Conversations sur Facebook.",
            },
          },
          {
            icon: "logos:telegram",
            name: "Telegram",
            desc: {
              it: "Bot e notifiche su Telegram.",
              en: "Bots and notifications on Telegram.",
              es: "Bots y notificaciones en Telegram.",
              fr: "Bots et notifications sur Telegram.",
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
    problem: { it: "Problema", en: "Problem", es: "Problema", fr: "Problème" },
    solution: { it: "Soluzione", en: "Solution", es: "Solución", fr: "Solution" },
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
      es: {
        title: "Productos de IA: chatbot, reseñas, pedidos de grupo | flylabs.ai",
        description:
          "Los productos que hemos construido y ofrecemos a nuestros clientes: chatbot de IA, gestión de reseñas, pedidos de grupo. Implementación a medida o self-service.",
      },
      fr: {
        title: "Produits IA : chatbot, avis, commandes groupées | flylabs.ai",
        description:
          "Les produits que nous avons construits et proposons à nos clients : chatbot IA, gestion des avis, commandes groupées. Mise en place sur mesure ou en libre-service.",
      },
    },
    kicker: { it: "Prodotti", en: "Products", es: "Productos", fr: "Produits" },
    title: {
      it: "Software che abbiamo costruito, pronto per il tuo caso",
      en: "Software we've built, ready for your case",
      es: "Software que hemos construido, listo para tu caso",
      fr: "Des logiciels que nous avons construits, prêts pour votre cas",
    },
    intro: {
      it: "Ogni prodotto nasce dal problema concreto di un cliente. Li manteniamo e aggiorniamo, e li offriamo a chi ha lo stesso problema.",
      en: "Every product started from one client's concrete problem. We maintain and update them, and offer them to anyone with the same problem.",
      es: "Cada producto nació del problema concreto de un cliente. Los mantenemos y actualizamos, y los ofrecemos a quien tenga el mismo problema.",
      fr: "Chaque produit est né du problème concret d'un client. Nous les maintenons, les faisons évoluer et les proposons à tous ceux qui ont le même problème.",
    },
    philosophyTitle: {
      it: "Perché prodotti, non solo progetti su misura",
      en: "Why products, not just bespoke projects",
      es: "Por qué productos, no solo proyectos a medida",
      fr: "Pourquoi des produits, et pas seulement des projets sur mesure",
    },
    philosophyBody: {
      it: "Un progetto su misura risolve un problema una volta sola. Quando lo stesso problema si ripete su clienti diversi, lo generalizziamo in un prodotto: stessa qualità, meno tempo per arrivarci, prezzo più accessibile.",
      en: "A bespoke project solves a problem once. When the same problem shows up across different clients, we generalise it into a product: same quality, less time to get there, a more accessible price.",
      es: "Un proyecto a medida resuelve un problema una vez. Cuando el mismo problema aparece en clientes distintos, lo generalizamos en un producto: misma calidad, menos tiempo para llegar, un precio más accesible.",
      fr: "Un projet sur mesure résout un problème une fois. Quand le même problème revient chez plusieurs clients, nous le généralisons en produit : même qualité, moins de temps pour y arriver, un prix plus accessible.",
    },
    modes: {
      kicker: { it: "Come li offriamo", en: "How we offer them", es: "Cómo los ofrecemos", fr: "Comment nous les proposons" },
      title: {
        it: "Due modalità, la stessa qualità",
        en: "Two ways to run it, the same quality",
        es: "Dos modalidades, la misma calidad",
        fr: "Deux formules, la même qualité",
      },
      custom: {
        title: { it: "Implementazione su misura", en: "Custom implementation", es: "Implementación a medida", fr: "Mise en place sur mesure" },
        body: {
          it: "Lo implementiamo noi nel tuo workspace, con le tue chiavi e i tuoi account. Tu mantieni il controllo pieno, noi ci occupiamo di tutto il resto.",
          en: "We implement it inside your own workspace, with your keys and your accounts. You keep full control, we handle everything else.",
          es: "Lo implementamos dentro de tu propio espacio de trabajo, con tus claves y tus cuentas. Tú mantienes el control total, nosotros nos ocupamos del resto.",
          fr: "Nous le mettons en place dans votre propre espace de travail, avec vos clés et vos comptes. Vous gardez le contrôle total, nous nous occupons du reste.",
        },
      } satisfies ProductMode,
      saas: {
        title: { it: "Self-service SaaS", en: "Self-service SaaS", es: "SaaS self-service", fr: "SaaS en libre-service" },
        body: {
          it: "Ti abboni e usi la web app in autonomia, senza bisogno di noi per partire.",
          en: "You subscribe and run the web app on your own, with no need for us to get started.",
          es: "Te suscribes y usas la web app por tu cuenta, sin necesitarnos para empezar.",
          fr: "Vous vous abonnez et utilisez l'application web en autonomie, sans avoir besoin de nous pour démarrer.",
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
          es: "Chatbot de IA entrenado con tus contenidos, en tu web en pocos minutos.",
          fr: "Un chatbot IA entraîné sur vos contenus, en ligne sur votre site en quelques minutes.",
        },
        sector: { it: "Assistenza e vendita online", en: "Support and online sales", es: "Atención al cliente y venta online", fr: "Service client et vente en ligne" },
        href: "/gpt-chatbot",
        note: {
          it: "È lo stesso chatbot che vedi in basso a destra su questo sito.",
          en: "It's the same chatbot you see in the bottom-right corner of this site.",
          es: "Es el mismo chatbot que ves en la esquina inferior derecha de este sitio.",
          fr: "C'est le même chatbot que vous voyez en bas à droite de ce site.",
        },
        preview: {
          src: { it: "/products/gpt-chatbot/chat-it.jpg", en: "/products/gpt-chatbot/chat-en.jpg", es: "/products/gpt-chatbot/chat-es.jpg", fr: "/products/gpt-chatbot/chat-fr.jpg" },
          alt: {
            it: "Conversazione reale con l'assistente di flylabs.ai: a una domanda sulle richieste WhatsApp serali risponde che si possono gestire H24 con un assistente AI.",
            en: "Real conversation with the flylabs.ai assistant: asked about evening WhatsApp messages, it explains they can be handled 24/7 by an AI assistant.",
            es: "Conversación real con el asistente de flylabs.ai: ante una pregunta sobre los mensajes de WhatsApp de la noche, explica que un asistente de IA puede gestionarlos 24/7.",
            fr: "Conversation réelle avec l'assistant flylabs.ai : interrogé sur les messages WhatsApp du soir, il explique qu'un assistant IA peut les gérer 24 h/24, 7 j/7.",
          },
        },
      },
      {
        slug: "stellar-reviews",
        icon: "lucide:star",
        logo: "/products/stellar-reviews/logo.svg",
        // Senza screenshot l'anteprima mostra il logo orizzontale del kit.
        lockup: "/products/stellar-reviews/logo-orizzontale.svg",
        name: "Stellar Reviews",
        tagline: {
          it: "Bozze di risposta alle recensioni di Google, Tripadvisor e Booking, pronte ogni mattina.",
          en: "Reply drafts for your Google, Tripadvisor and Booking reviews, ready every morning.",
          es: "Borradores de respuesta para tus reseñas de Google, Tripadvisor y Booking, listos cada mañana.",
          fr: "Des brouillons de réponse pour vos avis Google, Tripadvisor et Booking, prêts chaque matin.",
        },
        sector: { it: "Ricettivo e retail", en: "Hospitality and retail", es: "Hostelería y retail", fr: "Hôtellerie et commerce" },
        href: "/stellar-reviews",
      },
      {
        slug: "wegrocery",
        icon: "lucide:shopping-basket",
        logo: "/products/wegrocery/logo.png",
        name: "WeGrocery",
        tagline: {
          it: "Ordini di gruppo, pagamenti con Stripe e conti dei GAS in un'unica app open source.",
          en: "Group orders, Stripe payments and buying-club accounts in one open-source app.",
          es: "Pedidos de grupo, pagos con Stripe y cuentas del grupo de compra en una app open source.",
          fr: "Commandes groupées, paiements Stripe et comptes du groupement d'achat dans une application open source.",
        },
        sector: { it: "No-profit, gruppi d'acquisto", en: "Non-profit, buying clubs", es: "Sin ánimo de lucro, grupos de compra", fr: "Associations, groupements d'achat" },
        href: "/wegrocery",
        preview: {
          src: { it: "/products/wegrocery/preview-it.webp", en: "/products/wegrocery/preview-en.webp", es: "/products/wegrocery/preview-es.webp", fr: "/products/wegrocery/preview-fr.webp" },
          alt: {
            it: "Tre schermate di WeGrocery da telefono: il saldo del socio, l'ordine del ciclo aperto e la ricarica online con carta.",
            en: "Three WeGrocery phone screens: the member's balance, the order for the open cycle and the online card top-up.",
            es: "Tres pantallas de WeGrocery en el móvil: el saldo del socio, el pedido del ciclo abierto y la recarga online con tarjeta.",
            fr: "Trois écrans de WeGrocery sur téléphone : le solde du membre, la commande du cycle ouvert et la recharge en ligne par carte.",
          },
        },
      },
    ] satisfies Product[],
    cardCtaInternal: { it: "Scopri di più →", en: "Learn more →", es: "Descubre más →", fr: "En savoir plus →" },
    cardCtaExternal: { it: "Vai al sito →", en: "Visit the site →", es: "Ir al sitio →", fr: "Aller sur le site →" },
    back: { it: "← Torna alla home", en: "← Back home", es: "← Volver al inicio", fr: "← Retour à l'accueil" },
  },

  stellarReviews: {
    meta: {
      it: {
        title: "Stellar Reviews: gestione delle recensioni con l'AI | flylabs.ai",
        description:
          "Non perdere più nessuna recensione: Stellar Reviews raccoglie le recensioni di Google, Tripadvisor e Booking e prepara con l'AI bozze di risposta nel tuo stile. Tu le rivedi e le pubblichi. Da 24 € al mese, con piano gratuito.",
      },
      en: {
        title: "Stellar Reviews: AI-powered review management | flylabs.ai",
        description:
          "Never miss a review again: Stellar Reviews gathers your Google, Tripadvisor and Booking reviews and uses AI to draft replies in your style. You review them and publish. From €24 a month, with a free plan.",
      },
      es: {
        title: "Stellar Reviews: gestión de reseñas con IA | flylabs.ai",
        description:
          "No vuelvas a perder ninguna reseña: Stellar Reviews reúne tus reseñas de Google, Tripadvisor y Booking y prepara con IA borradores de respuesta con tu estilo. Tú los revisas y los publicas. Desde 24 € al mes, con plan gratuito.",
      },
      fr: {
        title: "Stellar Reviews : la gestion des avis avec l'IA | flylabs.ai",
        description:
          "Ne manquez plus aucun avis : Stellar Reviews rassemble vos avis Google, Tripadvisor et Booking et prépare avec l'IA des brouillons de réponse dans votre style. Vous les relisez et les publiez. À partir de 24 € par mois, avec une offre gratuite.",
      },
    },
    // Anteprima link del kit del marchio (05-social), solo in italiano: la
    // pagina inglese resta sulla OG generica di flylabs.ai.
    og: {
      it: {
        src: "/products/stellar-reviews/og-it.png",
        alt: "Stellar Reviews: le risposte alle recensioni, pronte ogni mattina",
      },
    } as Partial<Record<Locale, { src: string; alt: string }>>,
    title: { it: "Stellar Reviews", en: "Stellar Reviews", es: "Stellar Reviews", fr: "Stellar Reviews" },
    // Icona del kit (01-logo/icona/stellar-icona.svg) e logo orizzontale su
    // chiaro (01-logo/orizzontale): la scritta è già in tracciati, non va
    // riscritta in HTML accanto all'icona.
    logo: "/products/stellar-reviews/logo.svg",
    logoAlt: "Stellar Reviews",
    // Il giallo Stella fa da evidenziatore su una sola parte del tagline
    // (testo inchiostro, come da manuale): `highlight` deve comparire nel testo.
    tagline: {
      it: "Non perdere più nessuna recensione: Stellar Reviews automatizza la gestione delle recensioni e, con l'aiuto dell'AI, ti fa rispondere a tutte.",
      en: "Never miss a review again: Stellar Reviews automates review management and, with the help of AI, lets you answer every single one.",
      es: "No vuelvas a perder ninguna reseña: Stellar Reviews automatiza la gestión de las reseñas y, con la ayuda de la IA, te permite responder a todas.",
      fr: "Ne manquez plus aucun avis : Stellar Reviews automatise la gestion des avis et, grâce à l'IA, vous permet de répondre à chacun.",
    },
    taglineHighlight: {
      it: "rispondere a tutte",
      en: "answer every single one",
      es: "responder a todas",
      fr: "répondre à chacun",
    },
    // Una sola fonte per i prezzi: qui solo il "da", il resto sulla pagina
    // prezzi dell'app (verificata il 2026-10-10).
    priceNote: {
      it: "Web app online su stellar.flylabs.ai. Da 24 € al mese (IVA esclusa), con piano gratuito.",
      en: "Web app live at stellar.flylabs.ai. From €24 a month (excl. VAT), with a free plan.",
      es: "Web app disponible en stellar.flylabs.ai. Desde 24 € al mes (IVA no incluido), con plan gratuito.",
      fr: "Application web disponible sur stellar.flylabs.ai. À partir de 24 € HT par mois, avec une offre gratuite.",
    },
    // Link all'app. L'iscrizione oggi è su invito: niente "iscriviti ora"
    // finché l'iscrizione libera non è attiva.
    app: {
      demo: {
        label: { it: "Prova la demo", en: "Try the demo", es: "Prueba la demo", fr: "Essayer la démo" },
        href: "https://stellar.flylabs.ai/demo",
      },
      pricing: {
        label: { it: "Vedi i prezzi", en: "See pricing", es: "Ver precios", fr: "Voir les tarifs" },
        href: "https://stellar.flylabs.ai/prezzi",
      },
      access: {
        label: { it: "Richiedi l'accesso", en: "Request access", es: "Solicitar acceso", fr: "Demander un accès" },
        href: "https://stellar.flylabs.ai/richiedi-accesso",
      },
      verify: {
        label: { it: "stellar.flylabs.ai/verifica", en: "stellar.flylabs.ai/verifica", es: "stellar.flylabs.ai/verifica", fr: "stellar.flylabs.ai/verifica" },
        href: "https://stellar.flylabs.ai/verifica",
      },
    },
    // Piattaforme (decisione di Federico 2026-10-12). Oggi: le tre lette
    // davvero. In arrivo: mai mostrate come disponibili (Codice del Consumo,
    // artt. 21-22), sempre dietro "In arrivo", senza date. Loghi Simple Icons
    // (CC0) nel colore ufficiale; Google usa la "G" ufficiale a quattro colori
    // del set logos (Simple Icons la ha solo in tinta unita). Solo accanto al
    // nome: indicano con cosa lavora Stellar, non una partnership. Vrbo non ha
    // logo, solo nel testo.
    platforms: {
      today: [
        { name: "Google", icon: "logos:google-icon", color: "#4285F4" },
        { name: "Booking.com", icon: "simple-icons:bookingdotcom", color: "#003A9A" },
        { name: "Tripadvisor", icon: "simple-icons:tripadvisor", color: "#34E0A1" },
      ],
      coming: [
        { name: "Expedia", icon: "simple-icons:expedia", color: "#191E3B" },
        { name: "Hotels.com", icon: "simple-icons:hotelsdotcom", color: "#EF3346" },
        { name: "Airbnb", icon: "simple-icons:airbnb", color: "#FF5A5F" },
      ],
      todayLabel: { it: "Oggi:", en: "Today:", es: "Hoy:", fr: "Aujourd'hui :" },
      comingLabel: { it: "In arrivo:", en: "Coming soon:", es: "Próximamente:", fr: "Bientôt :" },
      and: { it: "e", en: "and", es: "y", fr: "et" },
      faq: {
        q: {
          it: "Funziona con Booking e Tripadvisor?",
          en: "Does it work with Booking and Tripadvisor?",
          es: "¿Funciona con Booking y Tripadvisor?",
          fr: "Est-ce que ça marche avec Booking et Tripadvisor ?",
        },
        a: {
          it: "Sì, insieme a Google. Stiamo aggiungendo Expedia (con Vrbo), Hotels.com e Airbnb. Usi un'altra piattaforma?",
          en: "Yes, together with Google. We are adding Expedia (with Vrbo), Hotels.com and Airbnb. Do you use another platform?",
          es: "Sí, junto con Google. Estamos añadiendo Expedia (con Vrbo), Hotels.com y Airbnb. ¿Usas otra plataforma?",
          fr: "Oui, en plus de Google. Nous ajoutons Expedia (avec Vrbo), Hotels.com et Airbnb. Vous utilisez une autre plateforme ?",
        },
        contact: {
          label: { it: "Scrivici a stellar@flylabs.ai", en: "Write to stellar@flylabs.ai", es: "Escríbenos a stellar@flylabs.ai", fr: "Écrivez-nous à stellar@flylabs.ai" },
          href: {
            it: "mailto:stellar@flylabs.ai?subject=Stellar%20Reviews%3A%20piattaforma%20da%20aggiungere",
            en: "mailto:stellar@flylabs.ai?subject=Stellar%20Reviews%3A%20platform%20request",
            es: "mailto:stellar@flylabs.ai?subject=Stellar%20Reviews%3A%20solicitud%20de%20plataforma",
            fr: "mailto:stellar@flylabs.ai?subject=Stellar%20Reviews%20%3A%20demande%20de%20plateforme",
          },
        },
      },
      pricingNote: {
        it: "Le piattaforme in arrivo non sono comprese nei piani finché non sono disponibili.",
        en: "Coming platforms are not included in the plans until they are available.",
        es: "Las plataformas que llegarán no están incluidas en los planes hasta que estén disponibles.",
        fr: "Les plateformes à venir ne sont pas incluses dans les offres tant qu'elles ne sont pas disponibles.",
      },
    },
    // Schermate reali della demo pubblica (dati di esempio), una per lingua:
    // l'interfaccia è nei pixel. Il filtro "Expedia" della demo è nascosto
    // nello scatto: sul sito una piattaforma in arrivo non deve mai sembrare
    // già disponibile (vedi platforms qui sopra).
    screens: {
      desktop: {
        src: {
          it: "/products/stellar-reviews/demo-desktop-it.webp",
          en: "/products/stellar-reviews/demo-desktop-en.webp",
          es: "/products/stellar-reviews/demo-desktop-en.webp",
          fr: "/products/stellar-reviews/demo-desktop-en.webp",
        },
        alt: {
          it: "Stellar Reviews dal computer: a sinistra la coda delle recensioni a cui rispondere, a destra una recensione da una stella su TripAdvisor con la risposta proposta dall'AI e i pulsanti Copia risposta e Ho pubblicato.",
          en: "Stellar Reviews on a computer: on the left the queue of reviews to answer, on the right a Booking.com review rated 4 out of 10, about a long check-in wait, with the AI-suggested reply and the Copy reply and I've posted it buttons.",
          es: "Stellar Reviews en un ordenador: a la izquierda la cola de reseñas por responder, a la derecha una reseña de Booking.com con nota 4 sobre 10, sobre una larga espera en el check-in, con la respuesta sugerida por la IA y los botones Copy reply e I've posted it.",
          fr: "Stellar Reviews sur un ordinateur : à gauche la file des avis à traiter, à droite un avis Booking.com noté 4 sur 10, sur une longue attente au check-in, avec la réponse suggérée par l'IA et les boutons Copy reply et I've posted it.",
        },
      },
      mobile: {
        src: {
          it: "/products/stellar-reviews/demo-mobile-it.webp",
          en: "/products/stellar-reviews/demo-mobile-en.webp",
          es: "/products/stellar-reviews/demo-mobile-en.webp",
          fr: "/products/stellar-reviews/demo-mobile-en.webp",
        },
        alt: {
          it: "Stellar Reviews dal telefono: la recensione da rivedere con cura e la risposta proposta dall'AI, da rileggere prima di pubblicarla.",
          en: "Stellar Reviews on a phone: a Booking.com review about a long check-in wait and the AI-suggested reply, to read through before publishing.",
          es: "Stellar Reviews en un móvil: una reseña de Booking.com sobre una larga espera en el check-in y la respuesta sugerida por la IA, para leerla antes de publicarla.",
          fr: "Stellar Reviews sur un téléphone : un avis Booking.com sur une longue attente au check-in et la réponse suggérée par l'IA, à relire avant de la publier.",
        },
      },
      caption: {
        it: "Dalla demo pubblica, con dati di esempio. Stellar propone la risposta, tu la rileggi, la copi e la pubblichi sulla piattaforma.",
        en: "From the public demo, with sample data. Stellar suggests the reply, you read it through, copy it and post it on the platform.",
        es: "De la demo pública, con datos de ejemplo (interfaz en inglés). Stellar sugiere la respuesta, tú la lees, la copias y la publicas en la plataforma.",
        fr: "Tiré de la démo publique, avec des données d'exemple (interface en anglais). Stellar suggère la réponse, vous la relisez, la copiez et la publiez sur la plateforme.",
      },
    },
    problem: {
      it: "Chi gestisce una struttura ricettiva risponde alle recensioni a mano: le legge su tre piattaforme diverse, le scrive una a una, spesso in un'altra lingua. E quelle senza risposta restano lì per mesi.",
      en: "People running a hospitality business answer reviews by hand: they read them on three different platforms and write each reply one by one, often in another language. And the unanswered ones sit there for months.",
      es: "Quien gestiona un negocio de hostelería responde las reseñas a mano: las lee en tres plataformas distintas y escribe cada respuesta una a una, a menudo en otro idioma. Y las que quedan sin respuesta se acumulan durante meses.",
      fr: "Ceux qui gèrent un établissement d'hébergement répondent aux avis à la main : ils les lisent sur trois plateformes différentes et rédigent chaque réponse une par une, souvent dans une autre langue. Et celles restées sans réponse s'accumulent pendant des mois.",
    },
    solution: {
      it: "Stellar Reviews è un sistema completo di gestione delle recensioni su più piattaforme (Google, Tripadvisor e Booking), integrato con i modelli di AI più avanzati. Raccoglie ogni giorno le recensioni nuove e prepara per te bozze di risposta personalizzate nel tuo stile, che migliora nel tempo grazie ai tuoi feedback. Tu le rileggi e le pubblichi: l'ultima parola resta sempre tua.",
      en: "Stellar Reviews is a complete review management system across platforms (Google, Tripadvisor and Booking), built on the most advanced AI models. Every day it gathers new reviews and prepares personalised reply drafts in your style, getting better over time from your feedback. You read them and publish them: the final word is always yours.",
      es: "Stellar Reviews es un sistema completo de gestión de reseñas multiplataforma (Google, Tripadvisor y Booking), construido sobre los modelos de IA más avanzados. Cada día reúne las nuevas reseñas y prepara borradores de respuesta personalizados con tu estilo, que mejoran con el tiempo gracias a tus comentarios. Tú los lees y los publicas: la última palabra es siempre tuya.",
      fr: "Stellar Reviews est un système complet de gestion des avis multiplateforme (Google, Tripadvisor et Booking), construit sur les modèles d'IA les plus avancés. Chaque jour, il rassemble les nouveaux avis et prépare des brouillons de réponse personnalisés dans votre style, qui s'améliorent avec le temps grâce à vos retours. Vous les relisez et les publiez : le dernier mot vous revient toujours.",
    },
    featuresTitle: { it: "Cosa fa", en: "What it does", es: "Qué hace", fr: "Ce qu'il fait" },
    features: [
      {
        title: { it: "Ogni mattina", en: "Every morning", es: "Cada mañana", fr: "Chaque matin" },
        body: {
          it: "Legge le recensioni nuove da Google, Tripadvisor e Booking e prepara una bozza di risposta, nella lingua di chi ha scritto.",
          en: "It reads new reviews from Google, Tripadvisor and Booking and drafts a reply in the reviewer's own language.",
          es: "Lee las nuevas reseñas de Google, Tripadvisor y Booking y redacta una respuesta en el idioma de quien la escribió.",
          fr: "Il lit les nouveaux avis Google, Tripadvisor et Booking et rédige une réponse dans la langue de leur auteur.",
        },
      },
      {
        title: { it: "La voce della tua struttura", en: "Your property's voice", es: "La voz de tu alojamiento", fr: "La voix de votre établissement" },
        body: {
          it: "Le bozze seguono il tuo tono: scegli uno stile pronto (cordiale, caloroso, formale) e rendi il profilo più preciso con indicazioni sul tuo modo di scrivere.",
          en: "Drafts follow your tone: pick a ready-made style (friendly, warm, formal) and sharpen the profile with notes on how you write.",
          es: "Los borradores siguen tu tono: elige un estilo predefinido (cercano, cálido, formal) y afina el perfil con notas sobre cómo escribes.",
          fr: "Les brouillons suivent votre ton : choisissez un style prêt à l'emploi (convivial, chaleureux, formel) et affinez le profil avec des notes sur votre façon d'écrire.",
        },
      },
      {
        title: { it: "Riscrivi con un clic", en: "Rewrite in one click", es: "Reescribe con un clic", fr: "Réécrire en un clic" },
        body: {
          it: "Da ogni bozza chiedi una versione più breve, più formale o più calorosa, oppure dai un'indicazione libera.",
          en: "From any draft, ask for a shorter, more formal or warmer version, or give your own instruction.",
          es: "Desde cualquier borrador, pide una versión más corta, más formal o más cálida, o da tu propia instrucción.",
          fr: "Depuis n'importe quel brouillon, demandez une version plus courte, plus formelle ou plus chaleureuse, ou donnez votre propre consigne.",
        },
      },
      {
        title: { it: "La pubblicazione resta tua", en: "You do the publishing", es: "La publicación es cosa tuya", fr: "La publication reste entre vos mains" },
        body: {
          it: "Copi la bozza, la incolli sulla piattaforma e segni «Ho pubblicato». Stellar Reviews non pubblica niente da solo.",
          en: "You copy the draft, paste it on the platform and mark it “Published”. Stellar Reviews never publishes anything on its own.",
          es: "Copias el borrador, lo pegas en la plataforma y lo marcas como «Publicada». Stellar Reviews nunca publica nada por su cuenta.",
          fr: "Vous copiez le brouillon, le collez sur la plateforme et le marquez « Publié ». Stellar Reviews ne publie jamais rien de lui-même.",
        },
      },
      {
        title: { it: "Prima le recensioni delicate", en: "Sensitive reviews first", es: "Primero las reseñas delicadas", fr: "Les avis sensibles d'abord" },
        body: {
          it: "Voti bassi e reclami sono messi in evidenza. Puoi filtrare per piattaforma, stelle e periodo.",
          en: "Low ratings and complaints are highlighted. You can filter by platform, stars and date range.",
          es: "Las valoraciones bajas y las quejas aparecen destacadas. Puedes filtrar por plataforma, estrellas y rango de fechas.",
          fr: "Les notes basses et les plaintes sont mises en avant. Vous pouvez filtrer par plateforme, étoiles et période.",
        },
      },
      {
        title: { it: "Più strutture, un solo team", en: "Several properties, one team", es: "Varios alojamientos, un solo equipo", fr: "Plusieurs établissements, une seule équipe" },
        body: {
          it: "Passi da una struttura all'altra e inviti collaboratori con ruoli diversi: titolare, operatore, sola lettura.",
          en: "Switch between properties and invite teammates with different roles: owner, operator, read-only.",
          es: "Cambia de un alojamiento a otro e invita a compañeros con distintos roles: propietario, operador, solo lectura.",
          fr: "Passez d'un établissement à l'autre et invitez des collègues avec différents rôles : propriétaire, opérateur, lecture seule.",
        },
      },
      {
        title: { it: "Riepilogo via email", en: "Email digest", es: "Resumen por email", fr: "Récapitulatif par e-mail" },
        body: {
          it: "Le bozze pronte ti arrivano per email ogni giorno, ogni settimana o ogni mese, come preferisci, con le notifiche nell'app.",
          en: "Ready drafts reach you by email every day, week or month, as you prefer, with notifications in the app.",
          es: "Los borradores listos te llegan por email cada día, semana o mes, como prefieras, con notificaciones en la app.",
          fr: "Les brouillons prêts vous arrivent par e-mail chaque jour, semaine ou mois, au choix, avec des notifications dans l'application.",
        },
      },
      {
        title: { it: "Anche dal telefono", en: "On your phone too", es: "También desde el móvil", fr: "Aussi sur téléphone" },
        body: {
          it: "Funziona su telefono, tablet e computer, e si installa come app sulla schermata home.",
          en: "It works on phone, tablet and computer, and installs as an app on your home screen.",
          es: "Funciona en móvil, tablet y ordenador, y se instala como app en tu pantalla de inicio.",
          fr: "Il fonctionne sur téléphone, tablette et ordinateur, et s'installe comme une application sur votre écran d'accueil.",
        },
      },
      {
        title: { it: "Trasparenza sull'AI", en: "Transparent about AI", es: "Transparencia sobre la IA", fr: "Transparence sur l'IA" },
        body: {
          it: "Le bozze sono marcate come generate dall'AI (AI Act, art. 50). Chiunque può controllare un testo su",
          en: "Drafts are marked as AI-generated (AI Act, art. 50). Anyone can check a text at",
          es: "Los borradores se marcan como generados por IA (AI Act, art. 50). Cualquiera puede verificar un texto en",
          fr: "Les brouillons sont signalés comme générés par l'IA (AI Act, art. 50). Chacun peut vérifier un texte sur",
        },
        link: "verify",
      },
      {
        title: { it: "Multilingua, dati al sicuro", en: "Multilingual, data kept safe", es: "Multilingüe, datos seguros", fr: "Multilingue, données protégées" },
        body: {
          it: "Risponde nella lingua di chi ha scritto. I dati restano in Europa (Francoforte), con DPA pronto per il GDPR, e le bozze rispettano gli obblighi di trasparenza dell'AI Act.",
          en: "It replies in the reviewer's language. Data stays in Europe (Frankfurt) with a GDPR-ready DPA, and drafts meet the AI Act's transparency rules.",
          es: "Responde en el idioma de quien escribió la reseña. Los datos se quedan en Europa (Fráncfort) con un DPA conforme al RGPD, y los borradores cumplen las normas de transparencia del AI Act.",
          fr: "Il répond dans la langue de l'auteur de l'avis. Les données restent en Europe (Francfort) avec un DPA conforme au RGPD, et les brouillons respectent les règles de transparence de l'AI Act.",
        },
      },
    ] satisfies { title: Localized; body: Localized; link?: "verify" }[],
    modesTitle: { it: "Come lo attivi", en: "How to get it", es: "Cómo activarlo", fr: "Comment l'activer" },
    // Il self-service ora esiste: viene prima ed è la via evidenziata. Il su
    // misura è l'offerta business, con l'audit gratuito.
    modeSaas: {
      title: { it: "Self-service, la web app", en: "Self-service, the web app", es: "Self-service, la web app", fr: "En libre-service, l'application web" },
      body: {
        it: "Stellar Reviews è online su stellar.flylabs.ai. Da 24 € al mese (IVA esclusa), con piano gratuito e 14 giorni di prova delle funzioni Premium. Per ora l'accesso è su invito.",
        en: "Stellar Reviews is live at stellar.flylabs.ai. From €24 a month (excl. VAT), with a free plan and a 14-day trial of the Premium features. For now, access is by invitation.",
        es: "Stellar Reviews está disponible en stellar.flylabs.ai. Desde 24 € al mes (IVA no incluido), con plan gratuito y 14 días de prueba de las funciones Premium. Por ahora el acceso es por invitación.",
        fr: "Stellar Reviews est disponible sur stellar.flylabs.ai. À partir de 24 € HT par mois, avec une offre gratuite et un essai de 14 jours des fonctions Premium. Pour l'instant, l'accès se fait sur invitation.",
      },
    } satisfies ProductMode,
    modeCustom: {
      title: { it: "Implementazione business su misura", en: "Custom business implementation", es: "Implementación a medida para empresas", fr: "Mise en place sur mesure pour les entreprises" },
      body: {
        it: "Per le aziende che vogliono un servizio dedicato lo implementiamo noi, sulle tue strutture e con le tue credenziali. Si parte da un audit gratuito delle recensioni (quante sono, quante senza risposta, come ti posizioni rispetto ai concorrenti), poi definiamo il tono di voce sul tuo storico di risposte e colleghiamo il flusso agli strumenti che usi già.",
        en: "For businesses that want a dedicated service, we implement it for you, on your properties and with your own credentials. It starts with a free review audit (how many there are, how many are unanswered, how you compare to competitors), then we define the tone of voice from your past replies and connect the workflow to the tools you already use.",
        es: "Para las empresas que quieren un servicio dedicado, lo implementamos por ti, en tus alojamientos y con tus propias credenciales. Empieza con una auditoría gratuita de las reseñas (cuántas hay, cuántas sin respuesta, cómo te comparas con la competencia), después definimos el tono de voz a partir de tus respuestas anteriores y conectamos el flujo con las herramientas que ya usas.",
        fr: "Pour les entreprises qui veulent un service dédié, nous le mettons en place pour vous, sur vos établissements et avec vos propres identifiants. On commence par un audit gratuit de vos avis (combien il y en a, combien sont sans réponse, comment vous vous situez face à la concurrence), puis nous définissons le ton à partir de vos réponses passées et connectons le flux aux outils que vous utilisez déjà.",
      },
      cta: { it: "Richiedi l'audit gratuito", en: "Request the free audit", es: "Solicita la auditoría gratuita", fr: "Demander l'audit gratuit" },
    } satisfies ProductMode,
    caseLink: {
      label: {
        it: "Caso reale: come lo usa una struttura ricettiva in Sardegna →",
        en: "Real case: how a hospitality business in Sardinia uses it →",
        es: "Caso real: cómo lo usa un alojamiento turístico en Cerdeña →",
        fr: "Cas réel : comment un hébergement touristique en Sardaigne l'utilise →",
      },
      href: "/work/ai-review-replies",
    },
    back: { it: "← Tutti i prodotti", en: "← All products", es: "← Todos los productos", fr: "← Tous les produits" },
  },

  wegroceryProduct: {
    meta: {
      it: {
        title: "WeGrocery: ordini di gruppo e pagamenti per GAS, open source | flylabs.ai",
        description:
          "WeGrocery: la piattaforma open source white-label per i GAS. Ordini di gruppo, saldo prepagato, pagamenti con carta via Stripe e cassa in un'unica app. Provala in demo o attiva il tuo deploy.",
      },
      en: {
        title: "WeGrocery: open-source group orders and payments for buying clubs | flylabs.ai",
        description:
          "WeGrocery: the open-source, white-label platform for buying clubs. Group orders, a prepaid balance, card payments through Stripe and a treasury in one app. Try the demo or activate your own deployment.",
      },
      es: {
        title: "WeGrocery: pedidos de grupo y pagos para grupos de compra, open source | flylabs.ai",
        description:
          "WeGrocery: la plataforma open source y white-label para grupos de compra. Pedidos de grupo, saldo prepago, pagos con tarjeta a través de Stripe y caja en una sola app. Pruébala en la demo o activa tu propia instalación.",
      },
      fr: {
        title: "WeGrocery : commandes groupées et paiements pour groupements d'achat, open source | flylabs.ai",
        description:
          "WeGrocery : la plateforme open source en marque blanche pour les groupements d'achat. Commandes groupées, solde prépayé, paiements par carte via Stripe et trésorerie dans une seule application. Essayez la démo ou activez votre propre déploiement.",
      },
    },
    title: { it: "WeGrocery", en: "WeGrocery", es: "WeGrocery", fr: "WeGrocery" },
    logo: "/products/wegrocery/logo.png",
    // Video e schermate vengono dalla demo dell'app (dati finti) girata in
    // locale, una versione per lingua: l'interfaccia è nei pixel.
    media: {
      // Video di lancio fatto con HyperFrames (HTML + GSAP renderizzato in MP4).
      launchVideo: {
        src: { it: "/products/wegrocery/launch-it.mp4", en: "/products/wegrocery/launch-en.mp4", es: "/products/wegrocery/launch-es.mp4", fr: "/products/wegrocery/launch-fr.mp4" },
        poster: {
          it: "/products/wegrocery/launch-it-poster.jpg",
          en: "/products/wegrocery/launch-en-poster.jpg",
          es: "/products/wegrocery/launch-es-poster.jpg",
          fr: "/products/wegrocery/launch-fr-poster.jpg",
        },
        caption: {
          it: "Video di lancio di WeGrocery",
          en: "WeGrocery launch video",
          es: "Vídeo de lanzamiento de WeGrocery",
          fr: "Vidéo de lancement de WeGrocery",
        },
        // Alternativa testuale del video (senza audio, testi in sovraimpressione):
        // resa sotto il player (B32, A11Y-09).
        transcript: {
          it: "Cosa mostra il video: ogni settimana lo stesso foglio di calcolo, con errori nelle formule. WeGrocery, rifatta da capo, mette ordini di gruppo, pagamenti e conti in un'unica app. Per i soci: il saldo sempre in vista e l'ordine in pochi tocchi. Pagamenti online con carta via Stripe: ricarica del saldo, pagamento per ordine, conguaglio e rimborsi sulla carta. Per gli admin: cicli, cassa e statistiche in un unico pannello. Conti che tornano: le correzioni non riscrivono la storia dei movimenti, pagamenti, rimborsi e addebiti sono verificati ogni notte e la chiusura del ciclo è tutto o niente. E poi ordini in famiglia, app sul telefono, guida con ricerca, italiano e inglese. Open source con licenza MIT: il tuo gruppo, il tuo marchio.",
          en: "What the video shows: every week, the same spreadsheet with broken formulas. WeGrocery, rebuilt from scratch, puts group orders, payments and accounts in one app. For members: the balance always in view and orders in a few taps. Online card payments through Stripe: balance top-ups, pay per order, settling up with refunds to the card. For admins: cycles, treasury and stats in one panel. Accounts that add up: corrections never rewrite the ledger's history, payments, refunds and charges are verified every night, and closing a cycle is all or nothing. Plus family orders, a phone app, a searchable guide, Italian and English. Open source under the MIT licence: your group, your brand.",
          es: "Qué muestra el vídeo: cada semana, la misma hoja de cálculo con fórmulas rotas. WeGrocery, rehecha desde cero, reúne pedidos de grupo, pagos y cuentas en una sola app. Para los socios: el saldo siempre a la vista y pedidos en pocos toques. Pagos online con tarjeta a través de Stripe: recargas de saldo, pago por pedido, ajustes con reembolsos a la tarjeta. Para los administradores: ciclos, caja y estadísticas en un solo panel. Cuentas que cuadran: las correcciones nunca reescriben el historial del libro de cuentas, pagos, reembolsos y cargos se verifican cada noche, y el cierre de un ciclo es todo o nada. Además pedidos familiares, app para el móvil, guía con buscador, cuatro idiomas. Código abierto con licencia MIT: tu grupo, tu marca.",
          fr: "Ce que montre la vidéo : chaque semaine, le même tableur aux formules cassées. WeGrocery, reconstruite de zéro, réunit commandes groupées, paiements et comptes dans une seule application. Pour les membres : le solde toujours visible et des commandes en quelques gestes. Paiements en ligne par carte via Stripe : recharges du solde, paiement à la commande, régularisations avec remboursement sur la carte. Pour les administrateurs : cycles, trésorerie et statistiques dans un seul panneau. Des comptes justes : les corrections ne réécrivent jamais l'historique du registre, paiements, remboursements et prélèvements sont vérifiés chaque nuit, et la clôture d'un cycle se fait en tout ou rien. En plus : commandes familiales, application mobile, guide avec recherche, quatre langues. Open source sous licence MIT : votre groupe, votre marque.",
        },
      },
    },
    tagline: {
      it: "Ordini di gruppo, pagamenti con carta e conti che tornano, senza fogli di calcolo.",
      en: "Group orders, card payments and accounts that add up, no spreadsheets.",
      es: "Pedidos de grupo, pagos con tarjeta y cuentas que cuadran, sin hojas de cálculo.",
      fr: "Commandes groupées, paiements par carte et comptes justes, sans tableur.",
    },
    problem: {
      it: "I gruppi d'acquisto solidale coordinano gli ordini condivisi a mano, tra fogli di calcolo, messaggi WhatsApp e bonifici da riconciliare, con errori e tempo perso a ogni ciclo.",
      en: "Group buying clubs coordinate shared orders by hand, between spreadsheets, WhatsApp threads and bank transfers to reconcile, with mistakes and wasted time on every cycle.",
      es: "Los grupos de compra coordinan los pedidos compartidos a mano, entre hojas de cálculo, chats de WhatsApp y transferencias que cuadrar, con errores y tiempo perdido en cada ciclo.",
      fr: "Les groupements d'achat coordonnent les commandes partagées à la main, entre tableurs, fils WhatsApp et virements à rapprocher, avec des erreurs et du temps perdu à chaque cycle.",
    },
    solution: {
      it: "Un'unica piattaforma open source (licenza MIT), rifatta da capo: ordini, saldo prepagato, pagamenti con carta via Stripe e cassa nella stessa app, con un nuovo design pensato per il telefono. Ogni gruppo la attiva con il proprio nome, logo, lingua e colori, senza sviluppi dedicati: quando miglioriamo la piattaforma, l'aggiornamento arriva a tutti i gruppi insieme.",
      en: "A single open-source platform (MIT licence), rebuilt from scratch: orders, a prepaid balance, card payments through Stripe and a treasury in the same app, with a new phone-first design. Any group launches it under its own name, logo, language and colours, with no custom development: when we improve the platform, every group gets the update at once.",
      es: "Una sola plataforma open source (licencia MIT), rehecha desde cero: pedidos, saldo prepago, pagos con tarjeta a través de Stripe y caja en la misma app, con un nuevo diseño pensado para el móvil. Cualquier grupo la lanza con su propio nombre, logo, idioma y colores, sin desarrollo a medida: cuando mejoramos la plataforma, todos los grupos reciben la actualización a la vez.",
      fr: "Une seule plateforme open source (licence MIT), reconstruite de zéro : commandes, solde prépayé, paiements par carte via Stripe et trésorerie dans la même application, avec un nouveau design pensé pour le mobile. Chaque groupe la lance sous son propre nom, logo, langue et couleurs, sans développement sur mesure : quand nous améliorons la plateforme, tous les groupes reçoivent la mise à jour en même temps.",
    },
    mediaTitle: { it: "WeGrocery in azione", en: "WeGrocery in action", es: "WeGrocery en acción", fr: "WeGrocery en action" },
    screensTitle: { it: "Le schermate", en: "The screens", es: "Las pantallas", fr: "Les écrans" },
    screensIntro: {
      it: "Dalla demo pubblica, con dati finti. Il socio usa l'app dal telefono, l'admin anche dal computer.",
      en: "From the public demo, with fake data. Members use the app on their phone, admins on a computer too.",
      es: "De la app en español, con datos ficticios. Los socios usan la app en el móvil, los administradores también en el ordenador.",
      fr: "Tiré de l'app en français, avec des données fictives. Les membres utilisent l'application sur leur téléphone, les administrateurs aussi sur ordinateur.",
    },
    phoneScreens: [
      {
        src: { it: "/products/wegrocery/screens/home-it.webp", en: "/products/wegrocery/screens/home-en.webp", es: "/products/wegrocery/screens/home-es.webp", fr: "/products/wegrocery/screens/home-fr.webp" },
        caption: { it: "Saldo e prossimo ritiro", en: "Balance and next pickup", es: "Saldo y próxima recogida", fr: "Solde et prochain retrait" },
        alt: {
          it: "Home del socio: saldo di 90 euro, costo dell'ordine in corso e saldo dopo l'ordine, prossimo ritiro tra 7 giorni.",
          en: "Member home: a 90 euro balance, the cost of the current order and the balance after it, next pickup in 7 days.",
          es: "Inicio del socio: un saldo de 90 euros, el coste del pedido en curso y el saldo resultante, próxima recogida en 7 días.",
          fr: "Accueil du membre : un solde de 90 euros, le coût de la commande en cours et le solde après celle-ci, prochain retrait dans 7 jours.",
        },
      },
      {
        src: { it: "/products/wegrocery/screens/order-edit-it.webp", en: "/products/wegrocery/screens/order-edit-en.webp", es: "/products/wegrocery/screens/order-edit-es.webp", fr: "/products/wegrocery/screens/order-edit-fr.webp" },
        caption: { it: "L'ordine del ciclo aperto", en: "The open cycle's order", es: "El pedido del ciclo abierto", fr: "La commande du cycle ouvert" },
        alt: {
          it: "Modulo d'ordine: prodotti per categoria con i pulsanti più e meno, totale dell'ordine e saldo dopo l'ordine.",
          en: "Order form: products by category with plus and minus buttons, order total and balance after the order.",
          es: "Formulario de pedido: productos por categoría con botones más y menos, total del pedido y saldo después del pedido.",
          fr: "Formulaire de commande : produits par catégorie avec boutons plus et moins, total de la commande et solde après la commande.",
        },
      },
      {
        src: { it: "/products/wegrocery/screens/topup-it.webp", en: "/products/wegrocery/screens/topup-en.webp", es: "/products/wegrocery/screens/topup-es.webp", fr: "/products/wegrocery/screens/topup-fr.webp" },
        caption: { it: "Ricarica con carta, via Stripe", en: "Card top-up, through Stripe", es: "Recarga con tarjeta, a través de Stripe", fr: "Recharge par carte, via Stripe" },
        alt: {
          it: "Pagina Ricarica il saldo: importi rapidi da 25, 50 e 100 euro e il pulsante Paga che apre il pagamento Stripe.",
          en: "Top up your balance page: quick amounts of 25, 50 and 100 euros and the Pay button that opens Stripe checkout.",
          es: "Página de recarga del saldo: importes rápidos de 25, 50 y 100 euros y el botón Pagar que abre el checkout de Stripe.",
          fr: "Page de recharge du solde : montants rapides de 25, 50 et 100 euros et le bouton Payer qui ouvre le paiement Stripe.",
        },
      },
      {
        src: { it: "/products/wegrocery/screens/guide-it.webp", en: "/products/wegrocery/screens/guide-en.webp", es: "/products/wegrocery/screens/guide-es.webp", fr: "/products/wegrocery/screens/guide-fr.webp" },
        caption: { it: "Guida con ricerca", en: "Searchable guide", es: "Guía con buscador", fr: "Guide avec recherche" },
        alt: {
          it: "Guida dell'app: casella di ricerca e argomenti come Primi passi, Ordinare, Saldo e pagamenti, Notifiche.",
          en: "In-app guide: a search box and topics such as Getting started, Ordering, Balance and payments, Notifications.",
          es: "Guía dentro de la app: un buscador y temas como Primeros pasos, Pedidos, Saldo y pagos, Notificaciones.",
          fr: "Guide intégré : un champ de recherche et des rubriques comme Premiers pas, Commandes, Solde et paiements, Notifications.",
        },
      },
    ],
    desktopScreens: [
      {
        src: { it: "/products/wegrocery/screens/admin-cash-it.webp", en: "/products/wegrocery/screens/admin-cash-en.webp", es: "/products/wegrocery/screens/admin-cash-es.webp", fr: "/products/wegrocery/screens/admin-cash-fr.webp" },
        caption: { it: "Admin: la cassa", en: "Admin: the treasury", es: "Admin: la caja", fr: "Admin : la trésorerie" },
        alt: {
          it: "Pannello admin, scheda Cassa: saldo totale e medio dei soci, nuova ricarica, movimento in uscita e saldi dei soci per ruolo.",
          en: "Admin panel, Treasury tab: total and average member balance, new top-up, outgoing payment and member balances by role.",
          es: "Panel de administración, pestaña Caja: saldo total y medio de los socios, nueva recarga, pago saliente y saldos de los socios por rol.",
          fr: "Panneau d'administration, onglet Trésorerie : solde total et moyen des membres, nouvelle recharge, paiement sortant et soldes des membres par rôle.",
        },
      },
      {
        src: { it: "/products/wegrocery/screens/admin-stats-it.webp", en: "/products/wegrocery/screens/admin-stats-en.webp", es: "/products/wegrocery/screens/admin-stats-es.webp", fr: "/products/wegrocery/screens/admin-stats-fr.webp" },
        caption: { it: "Admin: le statistiche", en: "Admin: the stats", es: "Admin: las estadísticas", fr: "Admin : les statistiques" },
        alt: {
          it: "Pannello admin, scheda Statistiche: cicli chiusi, soci attivi, spesa totale, prodotto più ordinato e classifica dei 10 prodotti più ordinati.",
          en: "Admin panel, Stats tab: closed cycles, active members, total spend, top product and a ranking of the 10 most ordered products.",
          es: "Panel de administración, pestaña Estadísticas: ciclos cerrados, socios activos, gasto total, producto estrella y un ranking de los 10 productos más pedidos.",
          fr: "Panneau d'administration, onglet Statistiques : cycles clôturés, membres actifs, dépense totale, produit phare et un classement des 10 produits les plus commandés.",
        },
      },
    ],
    featuresTitle: { it: "Cosa fa", en: "What it does", es: "Qué hace", fr: "Ce qu'elle fait" },
    featuresIntro: {
      it: "Nuovo design, pagamenti con Stripe e molte funzioni in più rispetto alla prima versione.",
      en: "A new design, Stripe payments and many more features than the first version.",
      es: "Un nuevo diseño, pagos con Stripe y muchas más funciones que la primera versión.",
      fr: "Un nouveau design, les paiements Stripe et bien plus de fonctions que la première version.",
    },
    changelog: {
      label: { it: "Tutte le novità nel changelog →", en: "Every change in the changelog →", es: "Todas las novedades en el changelog →", fr: "Toutes les nouveautés dans le changelog →" },
      href: {
        it: "https://github.com/federicodecillia/wegrocery/blob/main/CHANGELOG.it.md",
        en: "https://github.com/federicodecillia/wegrocery/blob/main/CHANGELOG.md",
        es: "https://github.com/federicodecillia/wegrocery/blob/main/CHANGELOG.md",
        fr: "https://github.com/federicodecillia/wegrocery/blob/main/CHANGELOG.md",
      },
    },
    featureGroups: [
      {
        icon: "lucide:users",
        title: { it: "Per i soci", en: "For members", es: "Para los socios", fr: "Pour les membres" },
        items: [
          {
            it: "Saldo prepagato sempre in vista, con il saldo dopo l'ordine calcolato mentre ordini",
            en: "A prepaid balance always in view, with the balance after the order computed as you go",
            es: "Un saldo prepago siempre a la vista, con el saldo después del pedido calculado sobre la marcha",
            fr: "Un solde prépayé toujours visible, avec le solde après commande calculé au fur et à mesure",
          },
          {
            it: "L'ordine si salva mentre lo fai, anche cambiando dispositivo, e si ripropone l'ultimo con un tocco",
            en: "The order saves as you go, even across devices, and the last one comes back in one tap",
            es: "El pedido se guarda sobre la marcha, incluso entre dispositivos, y el último vuelve con un toque",
            fr: "La commande s'enregistre au fil de l'eau, même d'un appareil à l'autre, et la précédente revient en un geste",
          },
          {
            it: "Ordini in famiglia: carrello, saldo e storico condivisi, ognuno con la propria email",
            en: "Family orders: shared cart, balance and history, each person with their own email",
            es: "Pedidos familiares: carrito, saldo e historial compartidos, cada persona con su propio email",
            fr: "Commandes familiales : panier, solde et historique partagés, chaque personne avec son propre e-mail",
          },
          {
            it: "Accesso con un link o un codice via email, app da installare sul telefono, guida con ricerca",
            en: "Sign-in with an email link or code, an app to install on the phone, a searchable guide",
            es: "Acceso con enlace o código por email, una app para instalar en el móvil, una guía con buscador",
            fr: "Connexion par lien ou code envoyé par e-mail, une application à installer sur le téléphone, un guide avec recherche",
          },
        ] satisfies Localized[],
      },
      {
        icon: "lucide:credit-card",
        title: { it: "Pagamenti con Stripe", en: "Payments with Stripe", es: "Pagos con Stripe", fr: "Paiements avec Stripe" },
        items: [
          {
            it: "Ricarica del saldo con carta: il saldo si aggiorna da solo appena il pagamento è confermato",
            en: "Card top-ups: the balance updates on its own as soon as the payment is confirmed",
            es: "Recargas con tarjeta: el saldo se actualiza solo en cuanto se confirma el pago",
            fr: "Recharges par carte : le solde se met à jour tout seul dès que le paiement est confirmé",
          },
          {
            it: "In alternativa, ogni ordine si paga con la carta e a fine ciclo \"Chiudi i conti\" rimborsa sulla carta quanto pagato in più",
            en: "Or every order is paid by card, and at the end of the cycle \"Settle up\" refunds any overpayment to the card",
            es: "O cada pedido se paga con tarjeta y, al final del ciclo, «Ajustar cuentas» devuelve a la tarjeta lo pagado de más",
            fr: "Ou chaque commande est payée par carte, et en fin de cycle « Régulariser » rembourse sur la carte le trop-perçu",
          },
          {
            it: "Rimborsi registrati uno per uno, con avviso a socio e admin se uno non va a buon fine",
            en: "Refunds recorded one by one, with an alert to the member and the admins if one fails",
            es: "Reembolsos registrados uno a uno, con un aviso al socio y a los administradores si alguno falla",
            fr: "Des remboursements enregistrés un par un, avec une alerte au membre et aux administrateurs si l'un d'eux échoue",
          },
          {
            it: "Bonifico con IBAN da copiare e pagamenti in contanti segnati dall'admin",
            en: "Bank transfer with a copyable IBAN, and cash payments recorded by the admin",
            es: "Transferencia bancaria con IBAN copiable, y pagos en efectivo registrados por el administrador",
            fr: "Virement bancaire avec IBAN copiable, et paiements en espèces enregistrés par l'administrateur",
          },
        ] satisfies Localized[],
      },
      {
        icon: "lucide:layout-dashboard",
        title: { it: "Per gli admin", en: "For admins", es: "Para los administradores", fr: "Pour les administrateurs" },
        items: [
          {
            it: "Cicli d'ordine con apertura, chiusura e ritiro, spedizione ripartita fissa o in proporzione",
            en: "Order cycles with opening, closing and pickup, shipping split flat or proportionally",
            es: "Ciclos de pedido con apertura, cierre y recogida, gastos de envío repartidos a partes iguales o en proporción",
            fr: "Cycles de commande avec ouverture, clôture et retrait, frais de port répartis à parts égales ou au prorata",
          },
          {
            it: "Listino del fornitore importato da Excel o CSV, distinta inviata al fornitore e riletta al ritorno",
            en: "Supplier price lists imported from Excel or CSV, an order sheet sent to the supplier and read back on return",
            es: "Tarifas de proveedores importadas desde Excel o CSV, una hoja de pedido enviada al proveedor y releída a la vuelta",
            fr: "Tarifs fournisseurs importés depuis Excel ou CSV, un bon de commande envoyé au fournisseur et relu à son retour",
          },
          {
            it: "Cassa con ricariche, uscite e saldi dei soci, statistiche su prodotti, fornitori e partecipazione",
            en: "A treasury with top-ups, outgoing payments and member balances, stats on products, suppliers and participation",
            es: "Una caja con recargas, pagos salientes y saldos de los socios, estadísticas de productos, proveedores y participación",
            fr: "Une trésorerie avec recharges, paiements sortants et soldes des membres, des statistiques sur les produits, les fournisseurs et la participation",
          },
          {
            it: "Soci e ruoli, con gli account doppi da unire con un tocco",
            en: "Members and roles, with duplicate accounts merged in one tap",
            es: "Socios y roles, con las cuentas duplicadas fusionadas con un toque",
            fr: "Membres et rôles, avec fusion des comptes en double en un geste",
          },
        ] satisfies Localized[],
      },
      {
        icon: "lucide:shield-check",
        title: { it: "Conti che tornano", en: "Accounts that add up", es: "Cuentas que cuadran", fr: "Des comptes justes" },
        items: [
          {
            it: "Le correzioni non riscrivono la storia: ogni modifica a un movimento è uno storno tracciato",
            en: "Corrections never rewrite history: every change to an entry is a traceable reversal",
            es: "Las correcciones nunca reescriben el historial: cada cambio en un movimiento es un asiento de anulación trazable",
            fr: "Les corrections ne réécrivent jamais l'historique : chaque modification d'une écriture est une contre-passation traçable",
          },
          {
            it: "Chiusura del ciclo tutto o niente: il database rifiuta un secondo addebito per lo stesso ciclo",
            en: "All-or-nothing cycle close: the database rejects a second charge for the same cycle",
            es: "Cierre del ciclo todo o nada: la base de datos rechaza un segundo cargo para el mismo ciclo",
            fr: "Clôture du cycle en tout ou rien : la base de données refuse un second prélèvement pour le même cycle",
          },
          {
            it: "Controllo notturno di pagamenti, rimborsi e addebiti, e backup automatici del database",
            en: "A nightly check of payments, refunds and charges, plus automatic database backups",
            es: "Una comprobación nocturna de pagos, reembolsos y cargos, además de copias de seguridad automáticas de la base de datos",
            fr: "Un contrôle nocturne des paiements, remboursements et prélèvements, plus des sauvegardes automatiques de la base de données",
          },
          {
            it: "Nome, logo, colori e lingua (italiano o inglese) del tuo gruppo da una sola configurazione, senza toccare il codice",
            en: "Your group's name, logo, colours and language (Italian or English) from one setting, with no code changes",
            es: "Nombre, logo, colores e idioma de tu grupo (italiano o inglés) desde un solo ajuste, sin tocar el código",
            fr: "Nom, logo, couleurs et langue de votre groupe (italien ou anglais) depuis un seul réglage, sans toucher au code",
          },
        ] satisfies Localized[],
      },
    ],
    techTitle: { it: "Sotto il cofano", en: "Under the hood", es: "Bajo el capó", fr: "Sous le capot" },
    tech: ["Next.js", "React", "TypeScript", "Postgres", "Neon", "Drizzle", "Better Auth", "Stripe", "Resend", "Vercel", "Claude Code"],
    modesTitle: { it: "Come lo attivi", en: "How to get it", es: "Cómo activarlo", fr: "Comment l'activer" },
    modeCustom: {
      title: { it: "Implementazione su misura", en: "Custom implementation", es: "Implementación a medida", fr: "Mise en place sur mesure" },
      body: {
        it: "Ti attiviamo il tuo deploy white-label: dominio, marchio e integrazioni con i tuoi fornitori, senza doverlo gestire da solo.",
        en: "We activate your own white-label deployment: domain, branding and integrations with your suppliers, without you having to run it yourself.",
        es: "Activamos tu propia instalación white-label: dominio, marca e integraciones con tus proveedores, sin que tengas que gestionarla tú.",
        fr: "Nous activons votre propre déploiement en marque blanche : domaine, image de marque et intégrations avec vos fournisseurs, sans que vous ayez à le gérer vous-même.",
      },
      cta: { it: "Parliamo del tuo progetto", en: "Let's talk about your project", es: "Hablemos de tu proyecto", fr: "Parlons de votre projet" },
    } satisfies ProductMode,
    modeSaas: {
      title: { it: "Self-service", en: "Self-service", es: "Self-service", fr: "Libre-service" },
      body: {
        it: "Il codice è pubblico e gratuito: lo installi e lo gestisci da solo, oppure prima esplori la demo pubblica con dati finti.",
        en: "The code is public and free: install and run it yourself, or start by exploring the public demo with fake data.",
        es: "El código es público y gratuito: instálalo y gestiónalo tú mismo, o empieza explorando la demo pública con datos ficticios.",
        fr: "Le code est public et gratuit : installez-le et gérez-le vous-même, ou commencez par explorer la démo publique avec des données fictives.",
      },
      cta: { it: "Prova la demo", en: "Try the demo", es: "Prueba la demo", fr: "Essayer la démo" },
      href: "https://wegrocery-demo.vercel.app",
      external: true,
      cta2: { it: "Codice su GitHub →", en: "Code on GitHub →", es: "Código en GitHub →", fr: "Code sur GitHub →" },
      href2: "https://github.com/federicodecillia/wegrocery",
      external2: true,
    } satisfies ProductMode,
    caseLink: {
      label: {
        it: "Caso reale: un gruppo d'acquisto a Milano →",
        en: "Real case: a buying club in Milan →",
        es: "Caso real: un grupo de compra en Milán →",
        fr: "Cas réel : un groupement d'achat à Milan →",
      },
      href: "/work/wegrocery-group-orders",
    },
    back: { it: "← Tutti i prodotti", en: "← All products", es: "← Todos los productos", fr: "← Tous les produits" },
  },

  // Pagina prodotto di GPT Chatbot (richiesta Federico 2026-10-15). Prima la
  // card di /products portava dritta a gptchatbot.it: ora c'è una pagina come
  // per gli altri prodotti, con i link veri a gptchatbot.it per iscriversi.
  // Testi solo da quello che gptchatbot.it dichiara (home e funzionalità,
  // verificate il 2026-10-15): niente numeri d'uso, niente casi di altri.
  gptChatbotProduct: {
    meta: {
      it: {
        title: "GPT Chatbot: chatbot e agenti AI addestrati sui tuoi dati | flylabs.ai",
        description:
          "GPT Chatbot è il nostro chatbot AI per sito, WhatsApp, Instagram e Messenger: addestrato sui tuoi contenuti, risponde ai clienti, prenota e passa la conversazione a una persona quando serve. Provalo gratis con 100 crediti, senza carta.",
      },
      en: {
        title: "GPT Chatbot: AI chatbots and agents trained on your data | flylabs.ai",
        description:
          "GPT Chatbot is our AI chatbot for your website, WhatsApp, Instagram and Messenger: trained on your content, it answers customers, books appointments and hands the chat to a person when needed. Try it free with 100 credits, no card required.",
      },
      es: {
        title: "GPT Chatbot: chatbots y agentes de IA entrenados con tus datos | flylabs.ai",
        description:
          "GPT Chatbot es nuestro chatbot de IA para tu web, WhatsApp, Instagram y Messenger: entrenado con tus contenidos, responde a los clientes, reserva citas y pasa la conversación a una persona cuando hace falta. Pruébalo gratis con 100 créditos, sin tarjeta.",
      },
      fr: {
        title: "GPT Chatbot : chatbots et agents IA entraînés sur vos données | flylabs.ai",
        description:
          "GPT Chatbot est notre chatbot IA pour votre site, WhatsApp, Instagram et Messenger : entraîné sur vos contenus, il répond aux clients, prend des rendez-vous et passe la conversation à une personne quand il le faut. Essayez-le gratuitement avec 100 crédits, sans carte bancaire.",
      },
    },
    title: { it: "GPT Chatbot", en: "GPT Chatbot", es: "GPT Chatbot", fr: "GPT Chatbot" },
    logo: "/logos/gpt-chatbot.png",
    tagline: {
      it: "Il chatbot AI addestrato sui tuoi contenuti, che risponde ai tuoi clienti sul sito, su WhatsApp e su Instagram. Anche di notte.",
      en: "The AI chatbot trained on your content that answers your customers on your website, WhatsApp and Instagram. Even at night.",
      es: "El chatbot de IA entrenado con tus contenidos que responde a tus clientes en tu web, WhatsApp e Instagram. Incluso de noche.",
      fr: "Le chatbot IA entraîné sur vos contenus qui répond à vos clients sur votre site, WhatsApp et Instagram. Même la nuit.",
    },
    // Fatti dichiarati su gptchatbot.it (hero e chiusura della home).
    facts: [
      { it: "100 crediti gratis", en: "100 free credits", es: "100 créditos gratis", fr: "100 crédits offerts" },
      { it: "Senza carta", en: "No card required", es: "Sin tarjeta", fr: "Sans carte bancaire" },
      { it: "Attivo in 10 minuti", en: "Live in 10 minutes", es: "Activo en 10 minutos", fr: "Actif en 10 minutes" },
    ] satisfies Localized[],
    // Link veri al sito del prodotto, per lingua, senza UTM.
    app: {
      start: {
        label: { it: "Provalo gratis su gptchatbot.it", en: "Try it free on gptchatbot.it", es: "Pruébalo gratis en gptchatbot.it", fr: "Essayez-le gratuitement sur gptchatbot.it" },
        href: { it: "https://gptchatbot.it/it", en: "https://gptchatbot.it", es: "https://gptchatbot.it/es", fr: "https://gptchatbot.it" },
      },
      pricing: {
        label: { it: "Vedi i prezzi", en: "See pricing", es: "Ver precios", fr: "Voir les tarifs" },
        href: { it: "https://gptchatbot.it/it/prezzi", en: "https://gptchatbot.it/pricing", es: "https://gptchatbot.it/es/precios", fr: "https://gptchatbot.it/pricing" },
      },
    },
    mediaTitle: { it: "GPT Chatbot in azione", en: "GPT Chatbot in action", es: "GPT Chatbot en acción", fr: "GPT Chatbot en action" },
    media: {
      // Registrato dalla demo animata della home di gptchatbot.it (sito girato
      // in locale), una versione per lingua: le conversazioni sono di esempio.
      demoVideo: {
        src: { it: "/products/gpt-chatbot/demo-it.mp4", en: "/products/gpt-chatbot/demo-en.mp4", es: "/products/gpt-chatbot/demo-es.mp4", fr: "/products/gpt-chatbot/demo-fr.mp4" },
        poster: {
          it: "/products/gpt-chatbot/demo-it-poster.jpg",
          en: "/products/gpt-chatbot/demo-en-poster.jpg",
          es: "/products/gpt-chatbot/demo-es-poster.jpg",
          fr: "/products/gpt-chatbot/demo-fr-poster.jpg",
        },
        caption: {
          it: "Tre conversazioni di esempio, dalla demo di gptchatbot.it",
          en: "Three sample conversations, from the gptchatbot.it demo",
          es: "Tres conversaciones de ejemplo, de la demo de gptchatbot.it",
          fr: "Trois conversations d'exemple, tirées de la démo de gptchatbot.it",
        },
        transcript: {
          it: "Cosa mostra il video: tre conversazioni di esempio con tre attività diverse. In una boutique il cliente chiede se un vestito è disponibile nella sua taglia: il chatbot controlla il magazzino, cita le fonti, lo tiene da parte e manda il link per il pagamento. In uno studio dentistico risponde sul costo di un trattamento leggendo il listino, propone due appuntamenti e lo aggiunge al calendario. In un noleggio bici verifica la disponibilità per il giorno dopo, propone caschi e assicurazione e conferma la prenotazione con il totale.",
          en: "What the video shows: three sample conversations with three different businesses. In a boutique the customer asks whether a dress is available in their size: the chatbot checks the stock, cites its sources, holds the item and sends the checkout link. In a dental clinic it answers about the cost of a treatment from the price list, offers two appointment slots and adds the booking to the calendar. In a bike rental it checks availability for the next day, offers helmets and insurance and confirms the booking with the total.",
          es: "Qué muestra el vídeo: tres conversaciones de ejemplo con tres negocios distintos. En una boutique, la clienta pregunta si un vestido está disponible en su talla: el chatbot comprueba el stock, cita sus fuentes, reserva la prenda y envía el enlace de pago. En una clínica dental responde sobre el coste de un tratamiento a partir de la lista de precios, propone dos horarios y añade la cita al calendario. En un alquiler de bicis comprueba la disponibilidad para el día siguiente, ofrece cascos y seguro y confirma la reserva con el total.",
          fr: "Ce que montre la vidéo : trois conversations d'exemple avec trois entreprises différentes. Dans une boutique, la cliente demande si une robe est disponible dans sa taille : le chatbot vérifie le stock, cite ses sources, met l'article de côté et envoie le lien de paiement. Dans un cabinet dentaire, il répond sur le coût d'un soin à partir de la grille tarifaire, propose deux créneaux et ajoute le rendez-vous à l'agenda. Chez un loueur de vélos, il vérifie la disponibilité pour le lendemain, propose casques et assurance et confirme la réservation avec le total.",
        },
      },
      realChat: {
        src: { it: "/products/gpt-chatbot/chat-it.jpg", en: "/products/gpt-chatbot/chat-en.jpg", es: "/products/gpt-chatbot/chat-es.jpg", fr: "/products/gpt-chatbot/chat-fr.jpg" },
        caption: {
          it: "Una conversazione vera con l'assistente di questo sito",
          en: "A real conversation with this site's assistant",
          es: "Una conversación real con el asistente de este sitio",
          fr: "Une vraie conversation avec l'assistant de ce site",
        },
        alt: {
          it: "Conversazione reale con l'assistente di flylabs.ai: a una domanda sulle richieste WhatsApp serali risponde che si possono gestire H24 con un assistente AI.",
          en: "Real conversation with the flylabs.ai assistant: asked about evening WhatsApp messages, it explains they can be handled 24/7 by an AI assistant.",
          es: "Conversación real con el asistente de flylabs.ai: ante una pregunta sobre los mensajes de WhatsApp de la noche, explica que un asistente de IA puede gestionarlos 24/7.",
          fr: "Conversation réelle avec l'assistant flylabs.ai : interrogé sur les messages WhatsApp du soir, il explique qu'un assistant IA peut les gérer 24 h/24, 7 j/7.",
        },
      },
    },
    note: {
      it: "È lo stesso chatbot che vedi in basso a destra: aprilo e fagli una domanda.",
      en: "It's the same chatbot you see in the bottom-right corner: open it and ask a question.",
      es: "Es el mismo chatbot que ves en la esquina inferior derecha: ábrelo y hazle una pregunta.",
      fr: "C'est le même chatbot que vous voyez en bas à droite : ouvrez-le et posez-lui une question.",
    },
    stepsTitle: { it: "Come funziona", en: "How it works", es: "Cómo funciona", fr: "Comment ça marche" },
    steps: [
      {
        title: { it: "Carica i tuoi contenuti", en: "Add your content", es: "Sube tus contenidos", fr: "Ajoutez vos contenus" },
        body: {
          it: "Pagine del sito, PDF, Word, Excel, video YouTube e Google Drive. Quando i contenuti cambiano, il chatbot si aggiorna da solo.",
          en: "Website pages, PDF, Word, Excel, YouTube videos and Google Drive. When your content changes, the chatbot updates itself.",
          es: "Páginas de tu web, PDF, Word, Excel, vídeos de YouTube y Google Drive. Cuando tus contenidos cambian, el chatbot se actualiza solo.",
          fr: "Pages de votre site, PDF, Word, Excel, vidéos YouTube et Google Drive. Quand vos contenus changent, le chatbot se met à jour tout seul.",
        },
      },
      {
        title: { it: "Configura gli agenti", en: "Set up the agents", es: "Configura los agentes", fr: "Configurez les agents" },
        body: {
          it: "Scegli agenti, strumenti e regole. Un supervisore AI passa ogni domanda all'agente giusto (vendite, supporto, prenotazioni) e capisce quando serve una persona.",
          en: "Choose agents, tools and rules. An AI supervisor routes each question to the right agent (sales, support, bookings) and knows when a person is needed.",
          es: "Elige agentes, herramientas y reglas. Un supervisor de IA envía cada pregunta al agente adecuado (ventas, soporte, reservas) y sabe cuándo hace falta una persona.",
          fr: "Choisissez agents, outils et règles. Un superviseur IA oriente chaque question vers le bon agent (ventes, assistance, réservations) et sait quand une personne doit intervenir.",
        },
      },
      {
        title: { it: "Pubblicalo sui tuoi canali", en: "Publish it on your channels", es: "Publícalo en tus canales", fr: "Publiez-le sur vos canaux" },
        body: {
          it: "Sito web, WhatsApp, Instagram e Messenger, con un solo sistema e lo stesso contesto su ogni canale.",
          en: "Website, WhatsApp, Instagram and Messenger, from one system with the same context on every channel.",
          es: "Web, WhatsApp, Instagram y Messenger, desde un único sistema con el mismo contexto en todos los canales.",
          fr: "Site web, WhatsApp, Instagram et Messenger, depuis un seul système avec le même contexte sur tous les canaux.",
        },
      },
    ],
    screensTitle: { it: "Le schermate", en: "The screens", es: "Las pantallas", fr: "Les écrans" },
    screensIntro: {
      it: "Dal sito di GPT Chatbot: come gli agenti si dividono il lavoro e dove puoi collegarli.",
      en: "From the GPT Chatbot website: how the agents split the work and where you can connect them.",
      es: "De la web de GPT Chatbot: cómo se reparten el trabajo los agentes y dónde puedes conectarlos.",
      fr: "Tiré du site de GPT Chatbot : comment les agents se répartissent le travail et où vous pouvez les connecter.",
    },
    screens: [
      {
        src: { it: "/products/gpt-chatbot/screens/orchestration-it.webp", en: "/products/gpt-chatbot/screens/orchestration-en.webp", es: "/products/gpt-chatbot/screens/orchestration-es.webp", fr: "/products/gpt-chatbot/screens/orchestration-fr.webp" },
        width: 1800,
        height: 1030,
        caption: { it: "Un supervisore AI e gli agenti specializzati", en: "An AI supervisor and specialised agents", es: "Un supervisor de IA y agentes especializados", fr: "Un superviseur IA et des agents spécialisés" },
        alt: {
          it: "Schema dell'orchestrazione degli agenti: un supervisore AI monitora la conversazione e la passa all'agente vendite, supporto o prenotazioni.",
          en: "Agent orchestration diagram: an AI supervisor monitors the conversation and routes it to the sales, support or booking agent.",
          es: "Diagrama de orquestación de los agentes: un supervisor de IA sigue la conversación y la envía al agente de ventas, soporte o reservas.",
          fr: "Schéma d'orchestration des agents : un superviseur IA suit la conversation et l'oriente vers l'agent ventes, assistance ou réservations.",
        },
      },
      {
        src: { it: "/products/gpt-chatbot/screens/integrations-it.webp", en: "/products/gpt-chatbot/screens/integrations-en.webp", es: "/products/gpt-chatbot/screens/integrations-es.webp", fr: "/products/gpt-chatbot/screens/integrations-fr.webp" },
        width: 1940,
        height: 1210,
        caption: { it: "I canali e le integrazioni", en: "Channels and integrations", es: "Canales e integraciones", fr: "Canaux et intégrations" },
        alt: {
          it: "Elenco delle integrazioni: sito, WhatsApp Business, Instagram, Facebook Messenger, Slack, Discord, Zapier, Make, n8n, HubSpot, Salesforce, Shopify, Stripe, Notion, calendari e strumenti Google e Microsoft.",
          en: "List of integrations: website, WhatsApp Business, Instagram, Facebook Messenger, Slack, Discord, Zapier, Make, n8n, HubSpot, Salesforce, Shopify, Stripe, Notion, calendars and Google and Microsoft tools.",
          es: "Lista de integraciones: web, WhatsApp Business, Instagram, Facebook Messenger, Slack, Discord, Zapier, Make, n8n, HubSpot, Salesforce, Shopify, Stripe, Notion, calendarios y herramientas de Google y Microsoft.",
          fr: "Liste des intégrations : site web, WhatsApp Business, Instagram, Facebook Messenger, Slack, Discord, Zapier, Make, n8n, HubSpot, Salesforce, Shopify, Stripe, Notion, agendas et outils Google et Microsoft.",
        },
      },
    ],
    problem: {
      it: "I clienti scrivono a ogni ora e su canali diversi, spesso con le stesse domande. Rispondere a mano toglie tempo al lavoro vero, e chi non riceve una risposta subito va altrove.",
      en: "Customers write at all hours and on different channels, often with the same questions. Answering by hand takes time away from real work, and anyone who doesn't get a quick answer goes elsewhere.",
      es: "Los clientes escriben a todas horas y por canales distintos, a menudo con las mismas preguntas. Responder a mano quita tiempo al trabajo de verdad, y quien no recibe una respuesta rápida se va a otra parte.",
      fr: "Les clients écrivent à toute heure et sur différents canaux, souvent avec les mêmes questions. Répondre à la main prend du temps sur le vrai travail, et ceux qui n'obtiennent pas de réponse rapide vont voir ailleurs.",
    },
    solution: {
      it: "Un chatbot che conosce la tua attività perché è addestrato sui tuoi contenuti: risponde subito, cita le fonti, fa azioni come prenotare o mandare un'email e passa la conversazione a una persona quando serve.",
      en: "A chatbot that knows your business because it's trained on your content: it answers right away, cites its sources, takes actions like booking or sending an email, and hands the chat to a person when needed.",
      es: "Un chatbot que conoce tu negocio porque está entrenado con tus contenidos: responde al momento, cita sus fuentes, realiza acciones como reservar o enviar un email y pasa la conversación a una persona cuando hace falta.",
      fr: "Un chatbot qui connaît votre activité parce qu'il est entraîné sur vos contenus : il répond tout de suite, cite ses sources, effectue des actions comme réserver ou envoyer un e-mail, et passe la conversation à une personne quand il le faut.",
    },
    featuresTitle: { it: "Cosa fa", en: "What it does", es: "Qué hace", fr: "Ce qu'il fait" },
    featureGroups: [
      {
        icon: "lucide:database",
        title: { it: "Addestrato sui tuoi dati", en: "Trained on your data", es: "Entrenado con tus datos", fr: "Entraîné sur vos données" },
        items: [
          {
            it: "Documenti PDF, Word, Excel, CSV e testo, pagine web, video YouTube, immagini e Google Drive",
            en: "PDF, Word, Excel, CSV and text documents, web pages, YouTube videos, images and Google Drive",
            es: "Documentos PDF, Word, Excel, CSV y de texto, páginas web, vídeos de YouTube, imágenes y Google Drive",
            fr: "Documents PDF, Word, Excel, CSV et texte, pages web, vidéos YouTube, images et Google Drive",
          },
          {
            it: "Si riaddestra da solo quando i tuoi contenuti cambiano",
            en: "Retrains on its own when your content changes",
            es: "Se vuelve a entrenar solo cuando tus contenidos cambian",
            fr: "Se réentraîne tout seul quand vos contenus changent",
          },
          {
            it: "Risposte con la citazione della fonte, per sapere da dove viene ogni informazione",
            en: "Answers that cite their source, so you know where each piece of information comes from",
            es: "Respuestas que citan su fuente, para que sepas de dónde viene cada información",
            fr: "Des réponses qui citent leur source, pour savoir d'où vient chaque information",
          },
          {
            it: "Strumenti per rivedere e ripulire i contenuti e trovare le lacune",
            en: "Tools to review and clean up the content and spot knowledge gaps",
            es: "Herramientas para revisar y limpiar los contenidos y detectar lagunas de conocimiento",
            fr: "Des outils pour relire et nettoyer les contenus et repérer les lacunes de connaissance",
          },
        ] satisfies Localized[],
      },
      {
        icon: "lucide:workflow",
        title: { it: "Agenti che fanno, non solo rispondono", en: "Agents that act, not just answer", es: "Agentes que actúan, no solo responden", fr: "Des agents qui agissent, pas seulement qui répondent" },
        items: [
          {
            it: "Un supervisore AI smista ogni domanda all'agente specializzato più adatto",
            en: "An AI supervisor routes each question to the best-suited specialised agent",
            es: "Un supervisor de IA envía cada pregunta al agente especializado más adecuado",
            fr: "Un superviseur IA oriente chaque question vers l'agent spécialisé le plus adapté",
          },
          {
            it: "Chiama i tuoi strumenti e le tue API: prenota appuntamenti, gestisce resi, manda email",
            en: "Calls your tools and APIs: books appointments, processes returns, sends emails",
            es: "Llama a tus herramientas y API: reserva citas, gestiona devoluciones, envía emails",
            fr: "Il appelle vos outils et API : prend des rendez-vous, traite les retours, envoie des e-mails",
          },
          {
            it: "Webhook per collegarlo a qualsiasi sistema e automatizzare i flussi",
            en: "Webhooks to connect it to any system and automate workflows",
            es: "Webhooks para conectarlo a cualquier sistema y automatizar flujos",
            fr: "Des webhooks pour le connecter à n'importe quel système et automatiser les workflows",
          },
          {
            it: "Modelli GPT, Claude, Gemini e DeepSeek, scelti agente per agente",
            en: "GPT, Claude, Gemini and DeepSeek models, chosen agent by agent",
            es: "Modelos GPT, Claude, Gemini y DeepSeek, elegidos agente por agente",
            fr: "Modèles GPT, Claude, Gemini et DeepSeek, choisis agent par agent",
          },
        ] satisfies Localized[],
      },
      {
        icon: "lucide:messages-square",
        title: { it: "Dove sono i tuoi clienti", en: "Where your customers are", es: "Donde están tus clientes", fr: "Là où sont vos clients" },
        items: [
          {
            it: "Sito web, WhatsApp Business, Instagram, Facebook Messenger, Slack e Discord",
            en: "Website, WhatsApp Business, Instagram, Facebook Messenger, Slack and Discord",
            es: "Web, WhatsApp Business, Instagram, Facebook Messenger, Slack y Discord",
            fr: "Site web, WhatsApp Business, Instagram, Facebook Messenger, Slack et Discord",
          },
          {
            it: "Integrazioni con Zapier, Make, n8n, HubSpot, Salesforce, Shopify, Stripe e Notion",
            en: "Integrations with Zapier, Make, n8n, HubSpot, Salesforce, Shopify, Stripe and Notion",
            es: "Integraciones con Zapier, Make, n8n, HubSpot, Salesforce, Shopify, Stripe y Notion",
            fr: "Intégrations avec Zapier, Make, n8n, HubSpot, Salesforce, Shopify, Stripe et Notion",
          },
          {
            it: "Calendari Calendly, TidyCal, Google Calendar e Outlook per le prenotazioni",
            en: "Calendly, TidyCal, Google Calendar and Outlook calendars for bookings",
            es: "Calendarios Calendly, TidyCal, Google Calendar y Outlook para las reservas",
            fr: "Agendas Calendly, TidyCal, Google Calendar et Outlook pour les réservations",
          },
          {
            it: "Il tuo marchio: immagine, colori, stile dei messaggi e benvenuto, in white label",
            en: "Your brand: avatar, colours, bubble style and welcome message, fully white-label",
            es: "Tu marca: avatar, colores, estilo de la burbuja y mensaje de bienvenida, totalmente white-label",
            fr: "Votre marque : avatar, couleurs, style de la bulle et message d'accueil, entièrement en marque blanche",
          },
        ] satisfies Localized[],
      },
      {
        icon: "lucide:shield-check",
        title: { it: "Sotto il tuo controllo", en: "Under your control", es: "Bajo tu control", fr: "Sous votre contrôle" },
        items: [
          {
            it: "Passaggio a un operatore con tutta la conversazione, quando la domanda lo richiede",
            en: "Handover to a live agent with the full conversation, when the question calls for it",
            es: "Traspaso a un agente humano con toda la conversación, cuando la pregunta lo requiere",
            fr: "Transfert à un conseiller humain avec toute la conversation, quand la question l'exige",
          },
          {
            it: "Analisi delle conversazioni, segnali di frustrazione e tasso di risoluzione",
            en: "Conversation analytics, frustration signals and resolution rates",
            es: "Analítica de las conversaciones, señales de frustración y tasas de resolución",
            fr: "Analyse des conversations, signaux de frustration et taux de résolution",
          },
          {
            it: "Verifica dell'identità del cliente e protezione dei dati sensibili",
            en: "Customer identity verification and protection of sensitive data",
            es: "Verificación de la identidad del cliente y protección de los datos sensibles",
            fr: "Vérification de l'identité du client et protection des données sensibles",
          },
          {
            it: "Validazione umana delle risposte, per contenuti affidabili",
            en: "Human-in-the-loop validation of answers, for reliable content",
            es: "Validación human-in-the-loop de las respuestas, para contenidos fiables",
            fr: "Validation human-in-the-loop des réponses, pour des contenus fiables",
          },
        ] satisfies Localized[],
      },
    ],
    allFeatures: {
      label: { it: "Tutte le funzionalità su gptchatbot.it →", en: "Every feature on gptchatbot.it →", es: "Todas las funciones en gptchatbot.it →", fr: "Toutes les fonctionnalités sur gptchatbot.it →" },
      href: { it: "https://gptchatbot.it/it/funzionalita", en: "https://gptchatbot.it/features", es: "https://gptchatbot.it/es/funcionalidades", fr: "https://gptchatbot.it/features" },
    },
    modesTitle: { it: "Come lo attivi", en: "How to get it", es: "Cómo activarlo", fr: "Comment l'activer" },
    modeSaas: {
      title: { it: "Self-service", en: "Self-service", es: "Self-service", fr: "Libre-service" },
      body: {
        it: "Ti iscrivi su gptchatbot.it e crei il tuo chatbot da solo, in pochi minuti. Parti gratis con 100 crediti, senza carta, e disdici quando vuoi.",
        en: "Sign up on gptchatbot.it and build your chatbot yourself, in a few minutes. Start free with 100 credits, no card, and cancel anytime.",
        es: "Regístrate en gptchatbot.it y crea tu chatbot tú mismo, en pocos minutos. Empieza gratis con 100 créditos, sin tarjeta, y cancela cuando quieras.",
        fr: "Inscrivez-vous sur gptchatbot.it et créez votre chatbot vous-même, en quelques minutes. Commencez gratuitement avec 100 crédits, sans carte bancaire, et résiliez quand vous voulez.",
      },
    },
    modeCustom: {
      title: { it: "Implementazione su misura", en: "Custom implementation", es: "Implementación a medida", fr: "Mise en place sur mesure" },
      body: {
        it: "Lo configuriamo noi sulla tua attività: contenuti, agenti, integrazioni con i tuoi strumenti e canali come WhatsApp. Poi lo seguiamo e lo miglioriamo con te.",
        en: "We set it up around your business: content, agents, integrations with your tools and channels like WhatsApp. Then we look after it and improve it with you.",
        es: "Lo configuramos en torno a tu negocio: contenidos, agentes, integraciones con tus herramientas y canales como WhatsApp. Después lo cuidamos y lo mejoramos contigo.",
        fr: "Nous le configurons autour de votre activité : contenus, agents, intégrations avec vos outils et canaux comme WhatsApp. Ensuite, nous en prenons soin et l'améliorons avec vous.",
      },
      cta: { it: "Parliamo del tuo progetto", en: "Let's talk about your project", es: "Hablemos de tu proyecto", fr: "Parlons de votre projet" },
    },
    // Casi pubblicati costruiti con GPT Chatbot (stesse etichette di "Cosa costruiamo").
    caseLinks: [
      {
        label: { it: "Caso reale: noleggio bici, USA →", en: "Real case: bike rental, USA →", es: "Caso real: alquiler de bicis, EE. UU. →", fr: "Cas réel : location de vélos, États-Unis →" },
        href: "/work/multi-site-rental-assistant",
      },
      {
        label: { it: "Caso reale: studio tatuaggi, Spagna →", en: "Real case: tattoo studio, Spain →", es: "Caso real: estudio de tatuajes, España →", fr: "Cas réel : studio de tatouage, Espagne →" },
        href: "/work/website-form-to-whatsapp-promo",
      },
    ],
    back: { it: "← Tutti i prodotti", en: "← All products", es: "← Todos los productos", fr: "← Tous les produits" },
  },

  // Cornice comune delle pagine (components/landing/page-shell.tsx).
  shell: {
    skip: { it: "Salta al contenuto", en: "Skip to content", es: "Saltar al contenido", fr: "Aller au contenu" },
    // Per i link che aprono il calendario in una nuova scheda (solo screen reader).
    newTab: { it: "(si apre in una nuova scheda)", en: "(opens in a new tab)", es: "(se abre en una pestaña nueva)", fr: "(s'ouvre dans un nouvel onglet)" },
  },

  // 404 localizzata per i path con prefisso /it o /en (app/[locale]/not-found.tsx).
  // I path senza lingua restano su app/global-not-found.tsx, bilingue.
  notFound: {
    metaTitle: {
      it: "Pagina non trovata | flylabs.ai",
      en: "Page not found | flylabs.ai",
      es: "Página no encontrada | flylabs.ai",
      fr: "Page introuvable | flylabs.ai",
    },
    metaDescription: { it: "Pagina non trovata.", en: "Page not found.", es: "Página no encontrada.", fr: "Page introuvable." },
    title: {
      it: "Questa pagina non esiste (più).",
      en: "This page doesn't exist (anymore).",
      es: "Esta página no existe (o ya no existe).",
      fr: "Cette page n'existe pas (ou plus).",
    },
    body: {
      it: "Forse il link è vecchio o c'è un errore di battitura. Intanto puoi guardare cosa abbiamo costruito o scriverci.",
      en: "The link may be old or mistyped. Meanwhile, have a look at what we've built or drop us a line.",
      es: "Puede que el enlace sea antiguo o tenga un error. Mientras tanto, echa un vistazo a lo que hemos construido o escríbenos.",
      fr: "Le lien est peut-être ancien ou mal saisi. En attendant, jetez un œil à nos réalisations ou écrivez-nous.",
    },
    home: { it: "Torna alla home", en: "Back to home", es: "Volver al inicio", fr: "Retour à l'accueil" },
    work: { it: "Vedi i lavori", en: "See our work", es: "Ver los proyectos", fr: "Voir les réalisations" },
  },

  footer: {
    tagline: {
      it: "AI concreta, costruita sul tuo lavoro. Poi la gestisci tu.",
      en: "Practical AI, built around your work. Then you run it.",
      es: "IA práctica, construida en torno a tu trabajo. Después la gestionas tú.",
      fr: "Une IA concrète, construite autour de votre travail. Ensuite, c'est vous qui la pilotez.",
    },
    vatLabel: { it: "P.IVA", en: "VAT no.", es: "NIF-IVA", fr: "N° TVA" },
    navLabel: { it: "Link del sito", en: "Site links", es: "Enlaces del sitio", fr: "Liens du site" },
    nav: [
      { href: "", label: { it: "Home", en: "Home", es: "Inicio", fr: "Accueil" } },
      { href: "/work", label: { it: "Lavori", en: "Work", es: "Proyectos", fr: "Réalisations" } },
      { href: "/services", label: { it: "Servizi", en: "Services", es: "Servicios", fr: "Services" } },
      { href: "/products", label: { it: "Prodotti", en: "Products", es: "Productos", fr: "Produits" } },
      { href: "/stack", label: { it: "Stack", en: "Stack", es: "Stack", fr: "Stack" } },
    ],
  },
} as const;
