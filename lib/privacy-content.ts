import type { Locale } from "@/lib/i18n";

/**
 * Informativa privacy (bilingue it/en), ai sensi dell'art. 13 GDPR.
 * Titolarità in contitolarità (art. 26 GDPR) tra Cesare Bedin e Federico De
 * Cillia. Tenere allineata a: destinatari reali (Vercel, Sanity, Resend,
 * gpt-trainer/GA), lib/cookie-content.ts e lib/consent.ts.
 */
type L = Record<Locale, string>;
type Section = { heading: L; body: L[] };

export const privacy = {
  meta: {
    it: {
      title: "Privacy Policy | flylabs.ai",
      description:
        "Come flylabs.ai tratta i dati personali degli utenti del sito, in conformità al GDPR.",
    },
    en: {
      title: "Privacy Policy | flylabs.ai",
      description:
        "How flylabs.ai handles personal data of site users, in compliance with the GDPR.",
    },
  },
  title: { it: "Privacy Policy", en: "Privacy Policy" },
  updated: {
    it: "Ultimo aggiornamento: 24 settembre 2026",
    en: "Last updated: 24 September 2026",
  },
  intro: {
    it: "La presente informativa descrive come vengono trattati i dati personali degli utenti che visitano questo sito e ci contattano, ai sensi del Regolamento (UE) 2016/679 (GDPR).",
    en: "This policy describes how we process the personal data of users who visit this site and contact us, pursuant to Regulation (EU) 2016/679 (GDPR).",
  },
  sections: [
    {
      heading: { it: "Titolari del trattamento", en: "Data Controllers" },
      body: [
        {
          it: "Questo sito è gestito in contitolarità (art. 26 GDPR) da Cesare Bedin (P.IVA 05755090288) e Federico De Cillia (P.IVA IT13990330964), che ne determinano congiuntamente finalità e modalità del trattamento.",
          en: "This site is operated under joint controllership (art. 26 GDPR) by Cesare Bedin (VAT 05755090288) and Federico De Cillia (VAT IT13990330964), who jointly determine the purposes and means of the processing.",
        },
        {
          it: "Per qualsiasi richiesta relativa ai dati personali, incluso l'esercizio dei diritti, il punto di contatto unico è: info@flylabs.ai. I contitolari hanno definito con apposito accordo i rispettivi ambiti di responsabilità; l'essenza dell'accordo è disponibile su richiesta.",
          en: "For any request regarding personal data, including exercising your rights, the single point of contact is: info@flylabs.ai. The joint controllers have set out their respective areas of responsibility in an arrangement; its essence is available on request.",
        },
        {
          it: "Non è prevista la nomina di un Responsabile della protezione dei dati (DPO): non ricorrono i presupposti dell'art. 37 GDPR (nessun monitoraggio sistematico su larga scala né trattamento di categorie particolari come attività principale).",
          en: "No Data Protection Officer (DPO) has been appointed: the conditions of art. 37 GDPR do not apply (no large-scale systematic monitoring nor processing of special categories as a core activity).",
        },
      ],
    },
    {
      heading: { it: "Dati che raccogliamo", en: "Data we collect" },
      body: [
        {
          it: "Dati forniti volontariamente: quando ci contatti tramite il form raccogliamo i dati che ci comunichi (nome, email, eventuale azienda e il testo della richiesta).",
          en: "Data you provide voluntarily: when you contact us through the form we collect the data you share (name, email, any company and the text of your request).",
        },
        {
          it: "Dati di navigazione: i sistemi e i server raccolgono automaticamente alcuni dati tecnici (ad esempio indirizzo IP, tipo di browser, pagine visitate, data e ora), necessari al funzionamento e alla sicurezza del sito.",
          en: "Navigation data: systems and servers automatically collect certain technical data (for example IP address, browser type, pages visited, date and time), necessary for the operation and security of the site.",
        },
        {
          it: "Conversazioni con l'assistente: se apri e usi il chatbot, il testo che inserisci viene trattato per fornirti una risposta (vedi la sezione «Assistente»).",
          en: "Conversations with the assistant: if you open and use the chatbot, the text you enter is processed to provide you an answer (see the “Assistant” section).",
        },
        {
          it: "Cookie e strumenti di tracciamento: vedi la Cookie Policy dedicata.",
          en: "Cookies and tracking tools: see the dedicated Cookie Policy.",
        },
      ],
    },
    {
      heading: { it: "Finalità e basi giuridiche", en: "Purposes and legal bases" },
      body: [
        {
          it: "Rispondere alle richieste inviate dal form. Base giuridica: esecuzione di misure precontrattuali richieste dall'interessato (art. 6.1.b).",
          en: "Responding to requests sent via the form. Legal basis: performance of pre-contractual measures requested by the data subject (art. 6.1.b).",
        },
        {
          it: "Rispondere alle tue domande sui nostri servizi tramite il chatbot. Base giuridica: misure precontrattuali su tua richiesta (art. 6.1.b).",
          en: "Answering your questions about our services through the chatbot. Legal basis: pre-contractual steps at your request (art. 6.1.b).",
        },
        {
          it: "Garantire funzionamento, sicurezza e prevenzione degli abusi (ad esempio limiti anti-spam sul form). Base giuridica: legittimo interesse del Titolare.",
          en: "Ensuring operation, security and abuse prevention (for example anti-spam limits on the form). Legal basis: the Controller's legitimate interest.",
        },
        {
          it: "Misurare in forma aggregata traffico e prestazioni del sito. Base giuridica: legittimo interesse tramite strumenti cookieless (Vercel); Google Analytics viene attivato solo previo tuo consenso (art. 6.1.a).",
          en: "Measuring site traffic and performance in aggregate. Legal basis: legitimate interest via cookieless tools (Vercel); Google Analytics is activated only with your prior consent (art. 6.1.a).",
        },
        {
          it: "Adempiere a obblighi di legge, inclusi quelli fiscali e contabili. Base giuridica: obbligo legale (art. 6.1.c).",
          en: "Complying with legal obligations, including tax and accounting ones. Legal basis: legal obligation (art. 6.1.c).",
        },
      ],
    },
    {
      heading: {
        it: "Natura del conferimento",
        en: "Whether providing data is required",
      },
      body: [
        {
          it: "Nel form di contatto, nome ed email sono necessari per poterti rispondere: senza di essi non è possibile dare seguito alla richiesta. Gli altri campi sono facoltativi.",
          en: "In the contact form, name and email are required so we can reply to you: without them we cannot follow up on your request. The other fields are optional.",
        },
      ],
    },
    {
      heading: {
        it: "Destinatari e responsabili del trattamento",
        en: "Recipients and processors",
      },
      body: [
        {
          it: "Per erogare il servizio ci avvaliamo di fornitori terzi che agiscono come responsabili del trattamento ai sensi dell'art. 28 GDPR: Vercel Inc. (hosting del sito e statistiche cookieless Web Analytics/Speed Insights), Sanity (sistema di gestione dei contenuti), Resend (invio delle email generate dal form), la piattaforma dell'assistente (GPT-trainer di Paladin Max, Inc., tramite gptchatbot.it, che per generare le risposte usa un modello linguistico di Google) e, ove attivato, Google (Google Analytics 4).",
          en: "To deliver the service we rely on third-party providers acting as processors under art. 28 GDPR: Vercel Inc. (site hosting and cookieless Web Analytics/Speed Insights), Sanity (content management system), Resend (sending emails generated by the form), the assistant platform (GPT-trainer by Paladin Max, Inc., via gptchatbot.it, which uses a Google language model to generate answers) and, where activated, Google (Google Analytics 4).",
        },
        {
          it: "I dati non sono diffusi né ceduti a terzi per loro finalità di marketing. L'elenco aggiornato dei responsabili è disponibile su richiesta.",
          en: "Data is neither disclosed publicly nor sold to third parties for their own marketing purposes. An up-to-date list of processors is available on request.",
        },
      ],
    },
    {
      heading: {
        it: "Trasferimenti fuori dall'Unione Europea",
        en: "Transfers outside the European Union",
      },
      body: [
        {
          it: "Alcuni fornitori (ad esempio Vercel, Resend e Google) possono trattare dati negli Stati Uniti. In tal caso il trasferimento avviene sulla base di garanzie adeguate: clausole contrattuali standard (SCC) e/o certificazione EU-US Data Privacy Framework. Puoi richiederci copia delle garanzie adottate scrivendo a info@flylabs.ai.",
          en: "Some providers (for example Vercel, Resend and Google) may process data in the United States. In that case the transfer is based on appropriate safeguards: standard contractual clauses (SCC) and/or EU-US Data Privacy Framework certification. You can request a copy of the safeguards by writing to info@flylabs.ai.",
        },
        {
          it: "Le conversazioni con l'assistente sono conservate negli Stati Uniti dal fornitore della piattaforma (vedi la sezione «Assistente»), che oggi non pubblica il meccanismo di trasferimento adottato: lo stiamo verificando con il fornitore. Nel frattempo ti chiediamo di non inserire nella chat dati personali non necessari.",
          en: "Conversations with the assistant are stored in the United States by the platform provider (see the “Assistant” section), which does not currently publish the transfer mechanism it relies on: we are verifying it with the provider. In the meantime, please do not enter unnecessary personal data in the chat.",
        },
      ],
    },
    {
      heading: { it: "Assistente (chatbot)", en: "Assistant (chatbot)" },
      body: [
        {
          it: "L'assistente usa la piattaforma GPT-trainer di Paladin Max, Inc. (Stati Uniti), tramite gptchatbot.it, e si attiva solo quando lo apri. I messaggi che scrivi vengono trattati per generare le risposte e conservati su server Amazon Web Services in Oregon (USA); per produrre la risposta il testo è inviato a un modello linguistico di Google (Gemini). GPT-trainer dichiara di non usare i contenuti degli utenti per addestrare modelli di intelligenza artificiale. Le conversazioni possono costituire dati personali: ti invitiamo a non inserire dati particolari (art. 9 GDPR) o riservati, né dati di terzi. Su richiesta a info@flylabs.ai cancelliamo le tue conversazioni.",
          en: "The assistant runs on the GPT-trainer platform by Paladin Max, Inc. (United States), via gptchatbot.it, and activates only when you open it. The messages you write are processed to generate replies and stored on Amazon Web Services servers in Oregon (USA); to produce the reply, the text is sent to a Google language model (Gemini). GPT-trainer states that it does not use user content to train AI models. Conversations may constitute personal data: please do not enter special-category data (art. 9 GDPR), confidential data, or third parties' data. On request to info@flylabs.ai we delete your conversations.",
        },
      ],
    },
    {
      heading: { it: "Periodo di conservazione", en: "Retention period" },
      body: [
        {
          it: "Dati del form/richieste non trasformate in un rapporto: 24 mesi, poi cancellati automaticamente. Dati contrattuali, contabili e fiscali: 10 anni (art. 2220 c.c. e normativa fiscale). Log tecnici della piattaforma di hosting (Vercel): al massimo 30 giorni, oggi 1 ora. Conversazioni con l'assistente: sulla piattaforma del fornitore finché non le cancelliamo; puoi chiederne la cancellazione in ogni momento. Scelte sui cookie: fino a 6 mesi, oltre le quali il consenso viene richiesto di nuovo. Registro delle scelte sui cookie (scelta per categoria, versione del banner, lingua, data e ora, famiglia di browser e sistema operativo): 24 mesi dalla registrazione, per poter dimostrare il consenso (art. 7.1 GDPR), poi cancellato automaticamente. L'indirizzo IP, salvato solo in forma pseudonimizzata (hash) per limitare gli abusi del form e del registro, viene tolto dopo 30 giorni.",
          en: "Form/request data not turned into a relationship: 24 months, then deleted automatically. Contractual, accounting and tax data: 10 years (art. 2220 of the Italian Civil Code and tax law). Hosting platform technical logs (Vercel): 30 days at most, currently 1 hour. Assistant conversations: on the provider's platform until we delete them; you can ask us to delete them at any time. Cookie choices: up to 6 months, after which consent is requested again. Cookie choice records (choice per category, banner version, language, date and time, browser and operating system family): 24 months from recording, so that we can demonstrate consent (art. 7(1) GDPR), then deleted automatically. The IP address, stored only in pseudonymised form (hash) to limit abuse of the form and of the record, is removed after 30 days.",
        },
      ],
    },
    {
      heading: { it: "I tuoi diritti", en: "Your rights" },
      body: [
        {
          it: "In qualità di interessato hai diritto di accedere ai tuoi dati, chiederne la rettifica o la cancellazione, limitarne il trattamento e ottenere la portabilità dei dati, oltre a revocare in ogni momento il consenso eventualmente prestato (ad esempio per le statistiche o l'assistente).",
          en: "As a data subject you have the right to access your data, request its rectification or erasure, restrict its processing and obtain data portability, as well as to withdraw at any time any consent given (for example for analytics or the assistant).",
        },
        {
          it: "Diritto di opposizione: puoi opporti in qualsiasi momento ai trattamenti basati sul nostro legittimo interesse (sicurezza del sito, statistiche senza cookie) scrivendo a info@flylabs.ai.",
          en: "Right to object: you can object at any time to processing based on our legitimate interest (site security, cookieless analytics) by writing to info@flylabs.ai.",
        },
        {
          it: "Puoi esercitare questi diritti scrivendo a info@flylabs.ai. Hai inoltre il diritto di proporre reclamo al Garante per la protezione dei dati personali (www.garanteprivacy.it).",
          en: "You can exercise these rights by writing to info@flylabs.ai. You also have the right to lodge a complaint with the Italian Data Protection Authority (Garante per la protezione dei dati personali, www.garanteprivacy.it).",
        },
      ],
    },
    {
      heading: {
        it: "Processo decisionale automatizzato",
        en: "Automated decision-making",
      },
      body: [
        {
          it: "Non effettuiamo trattamenti che producano decisioni automatizzate con effetti giuridici o similmente significativi ai sensi dell'art. 22 GDPR. L'assistente fornisce risposte generate da un modello linguistico a fini informativi e di primo contatto, e non prende decisioni sull'utente.",
          en: "We do not carry out processing that produces automated decisions with legal or similarly significant effects under art. 22 GDPR. The assistant provides answers generated by a language model for informational and first-contact purposes, and does not make decisions about the user.",
        },
      ],
    },
    {
      heading: { it: "Cookie", en: "Cookies" },
      body: [
        {
          it: "Il sito usa cookie tecnici, sempre attivi. Solo con il tuo consenso attiviamo le statistiche (Google Analytics) e l'assistente AI. Puoi gestire o revocare le tue scelte in ogni momento dalla Cookie Policy o dal link «Gestisci cookie» nel footer.",
          en: "The site uses strictly necessary cookies, always on. Analytics (Google Analytics) and the AI assistant run only with your consent. You can manage or withdraw your choices at any time from the Cookie Policy or the “Manage cookies” link in the footer.",
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
