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
  },
  title: { it: "Cookie Policy", en: "Cookie Policy" },
  updated: {
    it: "Ultimo aggiornamento: 24 settembre 2026",
    en: "Last updated: 24 September 2026",
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
          it: "Sono indispensabili al funzionamento del sito e alla memorizzazione delle tue preferenze, inclusa la scelta che fai nel banner dei cookie. Non richiedono consenso e non possono essere disattivati.",
          en: "These are essential for the site to work and to remember your preferences, including the choice you make in the cookie banner. They require no consent and cannot be turned off.",
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
      heading: { it: "Assistente AI (chatbot)", en: "AI assistant (chatbot)" },
      body: [
        {
          it: "L'assistente è fornito da gpt-trainer (tramite gptchatbot.it). Per impostazione predefinita non viene caricato: parte solo quando apri l'assistente dal suo pulsante, gesto che vale come consenso all'attivazione. Una volta attivo, il widget del fornitore salva i cookie e lo storage elencati sotto e comunica con i suoi server (app.gptchatbot.it e partners.gpt-trainer.com); carica anche i font da Google Fonts (fonts.googleapis.com), che riceve il tuo indirizzo IP. Non inserire nella chat dati particolari o riservati.",
          en: "The assistant is provided by gpt-trainer (via gptchatbot.it). By default it is not loaded: it starts only when you open the assistant from its button, an action that counts as consent to activate it. Once active, the provider's widget stores the cookies and storage listed below and communicates with its servers (app.gptchatbot.it and partners.gpt-trainer.com); it also loads fonts from Google Fonts (fonts.googleapis.com), which receives your IP address. Please do not enter sensitive or confidential data in the chat.",
        },
      ],
    },
    {
      heading: { it: "Cosa viene salvato e per quanto", en: "What is stored and for how long" },
      body: [
        {
          it: "flylabs-consent · localStorage, nostro · memorizza la tua scelta sui cookie · 6 mesi.",
          en: "flylabs-consent · localStorage, ours · stores your cookie choice · 6 months.",
        },
        {
          it: "_ga e _ga_TC7Z5R5ZMR · cookie di Google, solo con il consenso alle Statistiche · statistiche aggregate · 2 anni. Se revochi il consenso li cancelliamo e la pagina si ricarica senza Google Analytics.",
          en: "_ga and _ga_TC7Z5R5ZMR · Google cookies, only with consent to Analytics · aggregated statistics · 2 years. If you withdraw consent we delete them and the page reloads without Google Analytics.",
        },
        {
          it: "www.flylabs.ai-chatbot-widget-initial-messages-shown-… · cookie scritto dal widget dell'assistente, solo dopo che lo apri · ricorda che il messaggio di benvenuto è già stato mostrato · 7 giorni.",
          en: "www.flylabs.ai-chatbot-widget-initial-messages-shown-… · cookie written by the assistant widget, only after you open it · remembers that the welcome message was already shown · 7 days.",
        },
        {
          it: "www.flylabs.ai-chatbot-…-session · cookie scritto dal widget dell'assistente, dopo il primo messaggio · mantiene la conversazione in corso · circa 8 settimane.",
          en: "www.flylabs.ai-chatbot-…-session · cookie written by the assistant widget, after your first message · keeps the ongoing conversation · about 8 weeks.",
        },
        {
          it: "i18nextLng · localStorage del widget dell'assistente, solo dopo che lo apri · ricorda la lingua dell'interfaccia della chat · finché non lo cancelli dal browser.",
          en: "i18nextLng · assistant widget localStorage, only after you open it · remembers the chat interface language · until you clear it from your browser.",
        },
      ],
    },
    {
      heading: { it: "Durata e revoca del consenso", en: "Duration and withdrawal of consent" },
      body: [
        {
          it: "Conserviamo la tua scelta per 6 mesi, poi te la chiediamo di nuovo. Puoi modificarla o revocarla in ogni momento dal pulsante «Gestisci cookie» qui sotto o nel footer, oppure eliminando i cookie dalle impostazioni del browser. Se revochi le Statistiche o l'Assistente cancelliamo i cookie e lo storage della categoria e ricarichiamo la pagina senza quello strumento.",
          en: "We keep your choice for 6 months, then ask you again. You can change or withdraw it at any time via the “Manage cookies” button below or in the footer, or by deleting cookies from your browser settings. If you withdraw Analytics or the Assistant, we delete that category's cookies and storage and reload the page without that tool.",
        },
        {
          it: "Oltre alla scelta salvata nel tuo browser, registriamo sui nostri sistemi un record della scelta (categorie accettate o rifiutate, versione del banner, lingua, data e ora, famiglia di browser e sistema operativo, hash dell'indirizzo IP) per poter dimostrare il consenso. Lo conserviamo 24 mesi e poi lo cancelliamo; l'hash dell'IP lo togliamo già dopo 30 giorni.",
          en: "Besides the choice saved in your browser, we store a record of it on our systems (categories accepted or refused, banner version, language, date and time, browser and operating system family, a hash of your IP address) so that we can demonstrate consent. We keep it for 24 months and then delete it; the IP hash is removed after 30 days.",
        },
      ],
    },
  ] satisfies Section[],
} as const;
