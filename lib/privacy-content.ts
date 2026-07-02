import type { Locale } from "@/lib/i18n";

/**
 * Testo dell'informativa privacy (bilingue it/en). BOZZA: i dati identificativi
 * del Titolare (ragione sociale, sede, P.IVA, email) sono volutamente lasciati
 * come placeholder — vanno compilati prima della pubblicazione. La pagina è
 * `noindex` finché è in bozza (vedi app/[locale]/privacy/page.tsx).
 */
type L = Record<Locale, string>;
type Section = { heading: L; body: L[] };

export const privacy = {
  meta: {
    it: {
      title: "Privacy Policy — flylabs.ai",
      description:
        "Come flylabs tratta i dati personali degli utenti del sito, in conformità al GDPR.",
    },
    en: {
      title: "Privacy Policy — flylabs.ai",
      description:
        "How flylabs handles personal data of site users, in compliance with the GDPR.",
    },
  },
  title: { it: "Privacy Policy", en: "Privacy Policy" },
  updated: {
    it: "Ultimo aggiornamento: 1 luglio 2026",
    en: "Last updated: 1 July 2026",
  },
  intro: {
    it: "La presente informativa descrive come vengono trattati i dati personali degli utenti che visitano questo sito e ci contattano, ai sensi del Regolamento (UE) 2016/679 (GDPR).",
    en: "This policy describes how we process the personal data of users who visit this site and contact us, pursuant to Regulation (EU) 2016/679 (GDPR).",
  },
  sections: [
    {
      heading: { it: "Titolare del trattamento", en: "Data Controller" },
      body: [
        {
          it: "Il Titolare del trattamento è flylabs. I dati identificativi completi del Titolare (ragione sociale, sede legale, P.IVA) e il contatto dedicato saranno indicati in questa sezione prima della pubblicazione del sito.",
          en: "The Data Controller is flylabs. The Controller's full identifying details (company name, registered office, VAT number) and a dedicated contact will be provided in this section before the site goes live.",
        },
      ],
    },
    {
      heading: { it: "Dati che raccogliamo", en: "Data we collect" },
      body: [
        {
          it: "Dati forniti volontariamente: quando ci contatti o prenoti una call raccogliamo i dati che ci comunichi (ad esempio nome, email ed eventuali informazioni sulla tua richiesta).",
          en: "Data you provide voluntarily: when you contact us or book a call we collect the data you share (for example name, email and any information about your request).",
        },
        {
          it: "Dati di navigazione: i sistemi e i server raccolgono automaticamente alcuni dati tecnici (ad esempio indirizzo IP, tipo di browser, pagine visitate, data e ora), necessari al funzionamento e alla sicurezza del sito.",
          en: "Navigation data: systems and servers automatically collect certain technical data (for example IP address, browser type, pages visited, date and time), necessary for the operation and security of the site.",
        },
        {
          it: "Cookie e tecnologie simili: vedi la sezione «Cookie».",
          en: "Cookies and similar technologies: see the “Cookies” section.",
        },
      ],
    },
    {
      heading: { it: "Finalità e basi giuridiche", en: "Purposes and legal bases" },
      body: [
        {
          it: "Rispondere alle richieste e gestire le prenotazioni di call — base giuridica: esecuzione di misure precontrattuali richieste dall'interessato e/o consenso.",
          en: "Responding to requests and managing call bookings — legal basis: performance of pre-contractual measures requested by the data subject and/or consent.",
        },
        {
          it: "Garantire il funzionamento, la sicurezza e il miglioramento del sito — base giuridica: legittimo interesse del Titolare.",
          en: "Ensuring the operation, security and improvement of the site — legal basis: the Controller's legitimate interest.",
        },
        {
          it: "Adempiere a obblighi di legge, ove applicabili — base giuridica: obbligo legale.",
          en: "Complying with legal obligations, where applicable — legal basis: legal obligation.",
        },
      ],
    },
    {
      heading: {
        it: "Modalità del trattamento e destinatari",
        en: "How we process data and recipients",
      },
      body: [
        {
          it: "I dati sono trattati con strumenti elettronici, adottando misure di sicurezza adeguate a prevenire accessi non autorizzati.",
          en: "Data is processed with electronic tools, adopting security measures adequate to prevent unauthorised access.",
        },
        {
          it: "Per erogare il servizio ci avvaliamo di fornitori terzi che agiscono come responsabili del trattamento, tra cui il fornitore di hosting del sito e il fornitore del CMS. Gli strumenti per la gestione dei contatti e delle prenotazioni saranno indicati qui una volta attivati. Alcuni fornitori possono trattare dati anche fuori dall'Unione Europea, in tal caso sulla base di garanzie adeguate (ad esempio clausole contrattuali standard).",
          en: "To deliver the service we rely on third-party providers acting as data processors, including the site's hosting provider and the CMS provider. The tools used to manage contacts and bookings will be listed here once activated. Some providers may process data outside the European Union, in which case on the basis of appropriate safeguards (for example standard contractual clauses).",
        },
        {
          it: "I dati non sono diffusi né ceduti a terzi per loro finalità di marketing.",
          en: "Data is neither disclosed publicly nor sold to third parties for their own marketing purposes.",
        },
      ],
    },
    {
      heading: { it: "Periodo di conservazione", en: "Retention period" },
      body: [
        {
          it: "Conserviamo i dati per il tempo necessario alle finalità per cui sono stati raccolti e, comunque, nei limiti previsti dalla legge. I dati relativi a una richiesta sono conservati per il tempo utile a gestire la relazione e i successivi adempimenti.",
          en: "We keep data for the time necessary for the purposes for which it was collected and, in any case, within the limits set by law. Data relating to a request is kept for as long as needed to manage the relationship and any follow-up obligations.",
        },
      ],
    },
    {
      heading: { it: "I tuoi diritti", en: "Your rights" },
      body: [
        {
          it: "In qualità di interessato hai diritto di accedere ai tuoi dati, chiederne la rettifica o la cancellazione, limitarne od opporti al trattamento e ottenere la portabilità dei dati, oltre a revocare in ogni momento il consenso eventualmente prestato.",
          en: "As a data subject you have the right to access your data, request its rectification or erasure, restrict or object to its processing and obtain data portability, as well as to withdraw at any time any consent given.",
        },
        {
          it: "Puoi esercitare questi diritti scrivendo al contatto del Titolare (vedi «Titolare del trattamento»). Hai inoltre il diritto di proporre reclamo all'Autorità Garante per la protezione dei dati personali.",
          en: "You can exercise these rights by writing to the Controller's contact (see “Data Controller”). You also have the right to lodge a complaint with the competent data protection authority.",
        },
      ],
    },
    {
      heading: { it: "Cookie", en: "Cookies" },
      body: [
        {
          it: "Il sito utilizza cookie tecnici necessari al suo funzionamento. Eventuali cookie analitici o di terze parti verranno attivati solo previo tuo consenso e descritti in una Cookie Policy dedicata.",
          en: "The site uses technical cookies necessary for its operation. Any analytics or third-party cookies will be activated only with your prior consent and described in a dedicated Cookie Policy.",
        },
      ],
    },
    {
      heading: { it: "Modifiche a questa informativa", en: "Changes to this policy" },
      body: [
        {
          it: "Possiamo aggiornare questa informativa nel tempo. La versione vigente è sempre pubblicata su questa pagina, con l'indicazione della data di ultimo aggiornamento.",
          en: "We may update this policy over time. The current version is always published on this page, with the date of the latest update.",
        },
      ],
    },
  ] satisfies Section[],
} as const;
