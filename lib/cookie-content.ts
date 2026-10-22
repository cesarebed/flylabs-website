import type { Locale } from "@/lib/i18n";

// Cookie Policy (bilingue it/en). Descrive gli strumenti realmente presenti sul
// sito e come sono gestiti dal banner. Va tenuta allineata alle categorie di
// lib/consent.ts e agli strumenti effettivamente caricati.
type L = Record<Locale, string>;
type Section = { heading: L; body: L[] };

export const cookiePolicy = {
  meta: {
    it: {
      title: "Cookie Policy | flylabs.ai",
      description:
        "Quali cookie e strumenti di tracciamento usa flylabs.ai e come gestire il consenso.",
    },
    en: {
      title: "Cookie Policy | flylabs.ai",
      description:
        "Which cookies and tracking tools flylabs.ai uses, and how to manage your consent.",
    },
    es: {
      title: "Política de cookies | flylabs.ai",
      description:
        "Qué cookies y herramientas de seguimiento usa flylabs.ai y cómo gestionar el consentimiento.",
    },
    fr: {
      title: "Politique de cookies | flylabs.ai",
      description:
        "Quels cookies et outils de suivi flylabs.ai utilise, et comment gérer votre consentement.",
    },
  },
  title: { it: "Cookie Policy", en: "Cookie Policy", es: "Política de cookies", fr: "Politique de cookies" },
  updated: {
    it: "Ultimo aggiornamento: 24 settembre 2026",
    en: "Last updated: 24 September 2026",
    es: "Última actualización: 24 de septiembre de 2026",
    fr: "Dernière mise à jour : 24 septembre 2026",
  },
  intro: {
    it: "Questa pagina spiega quali cookie e strumenti di tracciamento utilizza questo sito e come puoi gestire le tue scelte, ai sensi dell'art. 122 del Codice Privacy e delle Linee guida del Garante del 10 giugno 2021.",
    en: "This page explains which cookies and tracking tools this site uses and how you can manage your choices, pursuant to art. 122 of the Italian Privacy Code and the Garante's guidelines of 10 June 2021.",
    es: "Esta página explica qué cookies y herramientas de seguimiento usa este sitio y cómo puedes gestionar tus preferencias, conforme al art. 122 del Código de Privacidad italiano y a las directrices del Garante del 10 de junio de 2021.",
    fr: "Cette page explique quels cookies et outils de suivi ce site utilise et comment vous pouvez gérer vos choix, conformément à l'art. 122 du Code italien de la protection des données personnelles et aux lignes directrices du Garante du 10 juin 2021.",
  },
  manageHeading: { it: "Gestisci le tue preferenze", en: "Manage your preferences", es: "Gestiona tus preferencias", fr: "Gérez vos préférences" },
  manageIntro: {
    it: "Puoi aggiornare o revocare il consenso in qualsiasi momento riaprendo il pannello:",
    en: "You can update or withdraw your consent at any time by reopening the panel:",
    es: "Puedes actualizar o retirar tu consentimiento en cualquier momento volviendo a abrir el panel:",
    fr: "Vous pouvez modifier ou retirer votre consentement à tout moment en rouvrant le panneau :",
  },
  manageButton: { it: "Gestisci cookie", en: "Manage cookies", es: "Gestionar cookies", fr: "Gérer les cookies" },
  sections: [
    {
      heading: { it: "Cosa sono i cookie", en: "What are cookies", es: "Qué son las cookies", fr: "Que sont les cookies" },
      body: [
        {
          it: "I cookie sono piccoli file salvati sul tuo dispositivo. Insieme ai cookie, la normativa considera «strumenti di tracciamento» anche tecnologie simili come il localStorage e il sessionStorage. I cookie tecnici non richiedono consenso; gli altri strumenti si attivano solo se acconsenti.",
          en: "Cookies are small files stored on your device. Alongside cookies, the law treats similar technologies such as localStorage and sessionStorage as “tracking tools”. Technical cookies require no consent; the other tools run only if you agree.",
          es: "Las cookies son pequeños archivos que se guardan en tu dispositivo. Junto a las cookies, la normativa considera «herramientas de seguimiento» tecnologías similares como localStorage y sessionStorage. Las cookies técnicas no requieren consentimiento; las demás herramientas solo funcionan si das tu consentimiento.",
          fr: "Les cookies sont de petits fichiers enregistrés sur votre appareil. Outre les cookies, la loi considère comme « outils de suivi » des technologies similaires telles que localStorage et sessionStorage. Les cookies techniques ne nécessitent aucun consentement ; les autres outils ne fonctionnent qu'avec votre accord.",
        },
      ],
    },
    {
      heading: { it: "Cookie tecnici (sempre attivi)", en: "Technical cookies (always on)", es: "Cookies técnicas (siempre activas)", fr: "Cookies techniques (toujours actifs)" },
      body: [
        {
          it: "Sono indispensabili al funzionamento del sito e alla memorizzazione delle tue preferenze, inclusa la scelta che fai nel banner dei cookie. Non richiedono consenso e non possono essere disattivati.",
          en: "These are essential for the site to work and to remember your preferences, including the choice you make in the cookie banner. They require no consent and cannot be turned off.",
          es: "Son imprescindibles para que el sitio funcione y para recordar tus preferencias, incluida la elección que haces en el banner de cookies. No requieren consentimiento y no se pueden desactivar.",
          fr: "Ils sont indispensables au fonctionnement du site et à la mémorisation de vos préférences, y compris le choix que vous faites dans le bandeau cookies. Ils ne nécessitent aucun consentement et ne peuvent pas être désactivés.",
        },
      ],
    },
    {
      heading: { it: "Statistiche", en: "Analytics", es: "Estadísticas", fr: "Statistiques" },
      body: [
        {
          it: "Google Analytics 4 (fornitore Google) ci aiuta a capire in forma aggregata come viene usato il sito. Utilizza cookie di terza parte e si attiva solo con il tuo consenso alla categoria «Statistiche»; senza consenso non viene nemmeno caricato. Google può trattare dati negli USA sulla base di garanzie adeguate (SCC / EU-US Data Privacy Framework).",
          en: "Google Analytics 4 (provider Google) helps us understand, in aggregate, how the site is used. It uses third-party cookies and runs only with your consent to the “Analytics” category; without consent it is not even loaded. Google may process data in the USA under appropriate safeguards (SCC / EU-US Data Privacy Framework).",
          es: "Google Analytics 4 (proveedor Google) nos ayuda a entender, de forma agregada, cómo se usa el sitio. Usa cookies de terceros y solo funciona con tu consentimiento a la categoría «Estadísticas»; sin consentimiento ni siquiera se carga. Google puede tratar datos en EE. UU. con las garantías adecuadas (CCT / EU-US Data Privacy Framework).",
          fr: "Google Analytics 4 (fournisseur Google) nous aide à comprendre, de façon agrégée, comment le site est utilisé. Il utilise des cookies tiers et ne fonctionne qu'avec votre consentement à la catégorie « Statistiques » ; sans consentement, il n'est même pas chargé. Google peut traiter des données aux États-Unis avec des garanties appropriées (CCT / EU-US Data Privacy Framework).",
        },
        {
          it: "Usiamo inoltre Vercel Web Analytics e Speed Insights per misurare traffico e prestazioni: sono cookieless (non salvano né leggono informazioni sul tuo dispositivo), quindi non richiedono consenso.",
          en: "We also use Vercel Web Analytics and Speed Insights to measure traffic and performance: they are cookieless (they neither store nor read information on your device), so they require no consent.",
          es: "También usamos Vercel Web Analytics y Speed Insights para medir el tráfico y el rendimiento: no usan cookies (no guardan ni leen información en tu dispositivo), por lo que no requieren consentimiento.",
          fr: "Nous utilisons aussi Vercel Web Analytics et Speed Insights pour mesurer le trafic et les performances : ils fonctionnent sans cookies (ils n'enregistrent ni ne lisent aucune information sur votre appareil) et ne nécessitent donc aucun consentement.",
        },
      ],
    },
    {
      heading: { it: "Assistente AI (chatbot)", en: "AI assistant (chatbot)", es: "Asistente IA (chatbot)", fr: "Assistant IA (chatbot)" },
      body: [
        {
          it: "L'assistente è fornito da gpt-trainer (tramite gptchatbot.it). Per impostazione predefinita non viene caricato: parte solo quando apri l'assistente dal suo pulsante, gesto che vale come consenso all'attivazione. Una volta attivo, il widget del fornitore salva i cookie e lo storage elencati sotto e comunica con i suoi server (app.gptchatbot.it e partners.gpt-trainer.com); carica anche i font da Google Fonts (fonts.googleapis.com), che riceve il tuo indirizzo IP. Non inserire nella chat dati particolari o riservati.",
          en: "The assistant is provided by gpt-trainer (via gptchatbot.it). By default it is not loaded: it starts only when you open the assistant from its button, an action that counts as consent to activate it. Once active, the provider's widget stores the cookies and storage listed below and communicates with its servers (app.gptchatbot.it and partners.gpt-trainer.com); it also loads fonts from Google Fonts (fonts.googleapis.com), which receives your IP address. Please do not enter sensitive or confidential data in the chat.",
          es: "El asistente lo proporciona gpt-trainer (a través de gptchatbot.it). Por defecto no se carga: se activa solo cuando abres el asistente desde su botón, una acción que equivale al consentimiento para activarlo. Una vez activo, el widget del proveedor guarda las cookies y el almacenamiento indicados abajo y se comunica con sus servidores (app.gptchatbot.it y partners.gpt-trainer.com); además carga fuentes de Google Fonts (fonts.googleapis.com), que recibe tu dirección IP. Te pedimos que no introduzcas datos sensibles o confidenciales en el chat.",
          fr: "L'assistant est fourni par gpt-trainer (via gptchatbot.it). Par défaut, il n'est pas chargé : il ne démarre que lorsque vous ouvrez l'assistant depuis son bouton, une action qui vaut consentement à son activation. Une fois actif, le widget du fournisseur enregistre les cookies et le stockage indiqués ci-dessous et communique avec ses serveurs (app.gptchatbot.it et partners.gpt-trainer.com) ; il charge aussi des polices depuis Google Fonts (fonts.googleapis.com), qui reçoit votre adresse IP. Merci de ne pas saisir de données sensibles ou confidentielles dans le chat.",
        },
      ],
    },
    {
      heading: { it: "Cosa viene salvato e per quanto", en: "What is stored and for how long", es: "Qué se guarda y durante cuánto tiempo", fr: "Ce qui est enregistré et pendant combien de temps" },
      body: [
        {
          it: "flylabs-consent · localStorage, nostro · memorizza la tua scelta sui cookie · 6 mesi.",
          en: "flylabs-consent · localStorage, ours · stores your cookie choice · 6 months.",
          es: "flylabs-consent · localStorage, nuestro · guarda tu elección sobre las cookies · 6 meses.",
          fr: "flylabs-consent · localStorage, le nôtre · enregistre votre choix sur les cookies · 6 mois.",
        },
        {
          it: "_ga e _ga_TC7Z5R5ZMR · cookie di Google, solo con il consenso alle Statistiche · statistiche aggregate · 2 anni. Se revochi il consenso li cancelliamo e la pagina si ricarica senza Google Analytics.",
          en: "_ga and _ga_TC7Z5R5ZMR · Google cookies, only with consent to Analytics · aggregated statistics · 2 years. If you withdraw consent we delete them and the page reloads without Google Analytics.",
          es: "_ga y _ga_TC7Z5R5ZMR · cookies de Google, solo con consentimiento a Estadísticas · estadísticas agregadas · 2 años. Si retiras el consentimiento las borramos y la página se recarga sin Google Analytics.",
          fr: "_ga et _ga_TC7Z5R5ZMR · cookies Google, uniquement avec consentement aux Statistiques · statistiques agrégées · 2 ans. Si vous retirez votre consentement, nous les supprimons et la page se recharge sans Google Analytics.",
        },
        {
          it: "www.flylabs.ai-chatbot-widget-initial-messages-shown-… · cookie scritto dal widget dell'assistente, solo dopo che lo apri · ricorda che il messaggio di benvenuto è già stato mostrato · 7 giorni.",
          en: "www.flylabs.ai-chatbot-widget-initial-messages-shown-… · cookie written by the assistant widget, only after you open it · remembers that the welcome message was already shown · 7 days.",
          es: "www.flylabs.ai-chatbot-widget-initial-messages-shown-… · cookie escrita por el widget del asistente, solo después de abrirlo · recuerda que el mensaje de bienvenida ya se mostró · 7 días.",
          fr: "www.flylabs.ai-chatbot-widget-initial-messages-shown-… · cookie écrit par le widget de l'assistant, uniquement après son ouverture · mémorise que le message d'accueil a déjà été affiché · 7 jours.",
        },
        {
          it: "www.flylabs.ai-chatbot-…-session · cookie scritto dal widget dell'assistente, dopo il primo messaggio · mantiene la conversazione in corso · circa 8 settimane.",
          en: "www.flylabs.ai-chatbot-…-session · cookie written by the assistant widget, after your first message · keeps the ongoing conversation · about 8 weeks.",
          es: "www.flylabs.ai-chatbot-…-session · cookie escrita por el widget del asistente, después de tu primer mensaje · mantiene la conversación en curso · unas 8 semanas.",
          fr: "www.flylabs.ai-chatbot-…-session · cookie écrit par le widget de l'assistant, après votre premier message · conserve la conversation en cours · environ 8 semaines.",
        },
        {
          it: "i18nextLng · localStorage del widget dell'assistente, solo dopo che lo apri · ricorda la lingua dell'interfaccia della chat · finché non lo cancelli dal browser.",
          en: "i18nextLng · assistant widget localStorage, only after you open it · remembers the chat interface language · until you clear it from your browser.",
          es: "i18nextLng · localStorage del widget del asistente, solo después de abrirlo · recuerda el idioma de la interfaz del chat · hasta que lo borres desde tu navegador.",
          fr: "i18nextLng · localStorage du widget de l'assistant, uniquement après son ouverture · mémorise la langue de l'interface du chat · jusqu'à ce que vous l'effaciez depuis votre navigateur.",
        },
      ],
    },
    {
      heading: { it: "Durata e revoca del consenso", en: "Duration and withdrawal of consent", es: "Duración y retirada del consentimiento", fr: "Durée et retrait du consentement" },
      body: [
        {
          it: "Conserviamo la tua scelta per 6 mesi, poi te la chiediamo di nuovo. Puoi modificarla o revocarla in ogni momento dal pulsante «Gestisci cookie» qui sotto o nel footer, oppure eliminando i cookie dalle impostazioni del browser. Se revochi le Statistiche o l'Assistente cancelliamo i cookie e lo storage della categoria e ricarichiamo la pagina senza quello strumento.",
          en: "We keep your choice for 6 months, then ask you again. You can change or withdraw it at any time via the “Manage cookies” button below or in the footer, or by deleting cookies from your browser settings. If you withdraw Analytics or the Assistant, we delete that category's cookies and storage and reload the page without that tool.",
          es: "Conservamos tu elección durante 6 meses y después te la volvemos a pedir. Puedes cambiarla o retirarla en cualquier momento con el botón «Gestionar cookies» de abajo o del pie de página, o borrando las cookies desde la configuración de tu navegador. Si retiras Estadísticas o el Asistente, borramos las cookies y el almacenamiento de esa categoría y recargamos la página sin esa herramienta.",
          fr: "Nous conservons votre choix pendant 6 mois, puis nous vous le redemandons. Vous pouvez le modifier ou le retirer à tout moment via le bouton « Gérer les cookies » ci-dessous ou en pied de page, ou en supprimant les cookies depuis les paramètres de votre navigateur. Si vous retirez les Statistiques ou l'Assistant, nous supprimons les cookies et le stockage de cette catégorie et rechargeons la page sans cet outil.",
        },
        {
          it: "Oltre alla scelta salvata nel tuo browser, registriamo sui nostri sistemi un record della scelta (categorie accettate o rifiutate, versione del banner, lingua, data e ora, famiglia di browser e sistema operativo, hash dell'indirizzo IP) per poter dimostrare il consenso. Lo conserviamo 24 mesi e poi lo cancelliamo; l'hash dell'IP lo togliamo già dopo 30 giorni.",
          en: "Besides the choice saved in your browser, we store a record of it on our systems (categories accepted or refused, banner version, language, date and time, browser and operating system family, a hash of your IP address) so that we can demonstrate consent. We keep it for 24 months and then delete it; the IP hash is removed after 30 days.",
          es: "Además de la elección guardada en tu navegador, conservamos un registro en nuestros sistemas (categorías aceptadas o rechazadas, versión del banner, idioma, fecha y hora, familia de navegador y sistema operativo, un hash de tu dirección IP) para poder demostrar el consentimiento. Lo conservamos 24 meses y después lo borramos; el hash de la IP se elimina a los 30 días.",
          fr: "En plus du choix enregistré dans votre navigateur, nous en conservons une trace dans nos systèmes (catégories acceptées ou refusées, version du bandeau, langue, date et heure, famille de navigateur et de système d'exploitation, un hash de votre adresse IP) afin de pouvoir prouver le consentement. Nous la conservons 24 mois puis la supprimons ; le hash de l'IP est effacé au bout de 30 jours.",
        },
      ],
    },
  ] satisfies Section[],
} as const;
