import type { Locale } from "@/lib/i18n";

// Cookie Policy (bilingue it/en). Descrive gli strumenti realmente presenti sul
// sito e come sono gestiti dal banner. Va tenuta allineata alle categorie di
// lib/consent.ts e agli strumenti effettivamente caricati.
type L = Record<Locale, string>;
type Section = { heading: L; body: L[] };

export const cookiePolicy = {
  meta: {
    it: {
      title: "Cookie Policy — flylabs.ai",
      description:
        "Quali cookie e strumenti di tracciamento usa flylabs.ai e come gestire il consenso.",
    },
    en: {
      title: "Cookie Policy — flylabs.ai",
      description:
        "Which cookies and tracking tools flylabs.ai uses, and how to manage your consent.",
    },
  },
  title: { it: "Cookie Policy", en: "Cookie Policy" },
  updated: {
    it: "Ultimo aggiornamento: 28 agosto 2026",
    en: "Last updated: 28 August 2026",
  },
  intro: {
    it: "Questa pagina spiega quali cookie e strumenti di tracciamento utilizza questo sito e come puoi gestire le tue scelte, ai sensi dell'art. 122 del Codice Privacy e delle Linee guida del Garante del 10 giugno 2021.",
    en: "This page explains which cookies and tracking tools this site uses and how you can manage your choices, pursuant to art. 122 of the Italian Privacy Code and the Garante's guidelines of 10 June 2021.",
  },
  manageHeading: { it: "Gestisci le tue preferenze", en: "Manage your preferences" },
  manageIntro: {
    it: "Puoi aggiornare o revocare il consenso in qualsiasi momento riaprendo il pannello:",
    en: "You can update or withdraw your consent at any time by reopening the panel:",
  },
  manageButton: { it: "Gestisci cookie", en: "Manage cookies" },
  sections: [
    {
      heading: { it: "Cosa sono i cookie", en: "What are cookies" },
      body: [
        {
          it: "I cookie sono piccoli file salvati sul tuo dispositivo. Insieme ai cookie, la normativa considera «strumenti di tracciamento» anche tecnologie simili come il localStorage e il sessionStorage. I cookie tecnici non richiedono consenso; gli altri strumenti si attivano solo se acconsenti.",
          en: "Cookies are small files stored on your device. Alongside cookies, the law treats similar technologies such as localStorage and sessionStorage as “tracking tools”. Technical cookies require no consent; the other tools run only if you agree.",
        },
      ],
    },
    {
      heading: { it: "Cookie tecnici (sempre attivi)", en: "Technical cookies (always on)" },
      body: [
        {
          it: "Sono indispensabili al funzionamento del sito e alla memorizzazione delle tue preferenze, inclusa la scelta espressa in questo banner. Non richiedono consenso e non possono essere disattivati.",
          en: "These are essential for the site to work and to remember your preferences, including the choice you make in this banner. They require no consent and cannot be turned off.",
        },
      ],
    },
    {
      heading: { it: "Statistiche", en: "Analytics" },
      body: [
        {
          it: "Google Analytics 4 (fornitore Google) ci aiuta a capire in forma aggregata come viene usato il sito. Utilizza cookie di terza parte e si attiva solo con il tuo consenso alla categoria «Statistiche»; senza consenso non viene nemmeno caricato. Google può trattare dati negli USA sulla base di garanzie adeguate (SCC / EU-US Data Privacy Framework).",
          en: "Google Analytics 4 (provider Google) helps us understand, in aggregate, how the site is used. It uses third-party cookies and runs only with your consent to the “Analytics” category; without consent it is not even loaded. Google may process data in the USA under appropriate safeguards (SCC / EU-US Data Privacy Framework).",
        },
        {
          it: "Usiamo inoltre Vercel Web Analytics e Speed Insights per misurare traffico e prestazioni: sono cookieless (non salvano né leggono informazioni sul tuo dispositivo), quindi non richiedono consenso.",
          en: "We also use Vercel Web Analytics and Speed Insights to measure traffic and performance: they are cookieless (they neither store nor read information on your device), so they require no consent.",
        },
      ],
    },
    {
      heading: { it: "Assistente (chatbot)", en: "Assistant (chatbot)" },
      body: [
        {
          it: "L'assistente è fornito da gpt-trainer (tramite gptchatbot.it). Per impostazione predefinita non viene caricato: parte solo quando apri l'assistente dal suo pulsante, gesto che vale come consenso all'attivazione. Una volta attivo utilizza cookie e storage di terza parte e comunica con i server del fornitore. Non inserire nella chat dati particolari o riservati.",
          en: "The assistant is provided by gpt-trainer (via gptchatbot.it). By default it is not loaded: it starts only when you open the assistant from its button, an action that counts as consent to activate it. Once active it uses third-party cookies and storage and communicates with the provider's servers. Please do not enter sensitive or confidential data in the chat.",
        },
      ],
    },
    {
      heading: { it: "Durata e revoca del consenso", en: "Duration and withdrawal of consent" },
      body: [
        {
          it: "La tua scelta viene conservata fino a 6 mesi, dopodiché ti verrà richiesta di nuovo. Puoi modificarla o revocarla in ogni momento dal pulsante «Gestisci cookie» qui sotto o nel footer, oppure eliminando i cookie dalle impostazioni del browser.",
          en: "Your choice is stored for up to 6 months, after which you will be asked again. You can change or withdraw it at any time via the “Manage cookies” button below or in the footer, or by deleting cookies from your browser settings.",
        },
      ],
    },
  ] satisfies Section[],
} as const;
