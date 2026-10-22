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
    es: {
      title: "Política de privacidad | flylabs.ai",
      description:
        "Cómo trata flylabs.ai los datos personales de los usuarios del sitio, conforme al RGPD.",
    },
    fr: {
      title: "Politique de confidentialité | flylabs.ai",
      description:
        "Comment flylabs.ai traite les données personnelles des utilisateurs du site, conformément au RGPD.",
    },
  },
  title: { it: "Privacy Policy", en: "Privacy Policy", es: "Política de privacidad", fr: "Politique de confidentialité" },
  updated: {
    it: "Ultimo aggiornamento: 9 ottobre 2026",
    en: "Last updated: 9 October 2026",
    es: "Última actualización: 9 de octubre de 2026",
    fr: "Dernière mise à jour : 9 octobre 2026",
  },
  intro: {
    it: "La presente informativa descrive come vengono trattati i dati personali degli utenti che visitano questo sito e ci contattano, ai sensi del Regolamento (UE) 2016/679 (GDPR).",
    en: "This policy describes how we process the personal data of users who visit this site and contact us, pursuant to Regulation (EU) 2016/679 (GDPR).",
    es: "Esta política describe cómo tratamos los datos personales de los usuarios que visitan este sitio y nos contactan, conforme al Reglamento (UE) 2016/679 (RGPD). Esta traducción se ofrece por comodidad: en caso de discrepancia prevalece la versión italiana.",
    fr: "Cette politique décrit comment nous traitons les données personnelles des utilisateurs qui visitent ce site et nous contactent, conformément au Règlement (UE) 2016/679 (RGPD). Cette traduction est fournie à titre de commodité : en cas de divergence, la version italienne prévaut.",
  },
  sections: [
    {
      heading: { it: "Titolari del trattamento", en: "Data Controllers", es: "Responsables del tratamiento", fr: "Responsables du traitement" },
      body: [
        {
          it: "Questo sito è gestito in contitolarità (art. 26 GDPR) da Cesare Bedin (P.IVA 05755090288) e Federico De Cillia (P.IVA IT13990330964), che ne determinano congiuntamente finalità e modalità del trattamento.",
          en: "This site is operated under joint controllership (art. 26 GDPR) by Cesare Bedin (VAT 05755090288) and Federico De Cillia (VAT IT13990330964), who jointly determine the purposes and means of the processing.",
          es: "Este sitio se gestiona en régimen de corresponsabilidad (art. 26 RGPD) por Cesare Bedin (IVA 05755090288) y Federico De Cillia (IVA IT13990330964), que determinan conjuntamente los fines y los medios del tratamiento.",
          fr: "Ce site est exploité en responsabilité conjointe (art. 26 RGPD) par Cesare Bedin (TVA 05755090288) et Federico De Cillia (TVA IT13990330964), qui déterminent conjointement les finalités et les moyens du traitement.",
        },
        {
          it: "Per qualsiasi richiesta relativa ai dati personali, incluso l'esercizio dei diritti, il punto di contatto unico è: info@flylabs.ai. I contitolari hanno definito con apposito accordo i rispettivi ambiti di responsabilità; l'essenza dell'accordo è disponibile su richiesta.",
          en: "For any request regarding personal data, including exercising your rights, the single point of contact is: info@flylabs.ai. The joint controllers have set out their respective areas of responsibility in an arrangement; its essence is available on request.",
          es: "Para cualquier solicitud relativa a los datos personales, incluido el ejercicio de tus derechos, el punto de contacto único es: info@flylabs.ai. Los corresponsables han definido sus respectivos ámbitos de responsabilidad en un acuerdo; su contenido esencial está disponible bajo solicitud.",
          fr: "Pour toute demande relative aux données personnelles, y compris l'exercice de vos droits, le point de contact unique est : info@flylabs.ai. Les responsables conjoints ont défini leurs domaines de responsabilité respectifs dans un accord ; ses grandes lignes sont disponibles sur demande.",
        },
        {
          it: "Non è prevista la nomina di un Responsabile della protezione dei dati (DPO): non ricorrono i presupposti dell'art. 37 GDPR (nessun monitoraggio sistematico su larga scala né trattamento di categorie particolari come attività principale).",
          en: "No Data Protection Officer (DPO) has been appointed: the conditions of art. 37 GDPR do not apply (no large-scale systematic monitoring nor processing of special categories as a core activity).",
          es: "No se ha designado un Delegado de Protección de Datos (DPO): no concurren las condiciones del art. 37 RGPD (ni seguimiento sistemático a gran escala ni tratamiento de categorías especiales como actividad principal).",
          fr: "Aucun délégué à la protection des données (DPO) n'a été désigné : les conditions de l'art. 37 RGPD ne sont pas remplies (ni suivi systématique à grande échelle, ni traitement de catégories particulières comme activité principale).",
        },
      ],
    },
    {
      heading: { it: "Dati che raccogliamo", en: "Data we collect", es: "Datos que recogemos", fr: "Données que nous collectons" },
      body: [
        {
          it: "Dati forniti volontariamente: quando ci contatti tramite il form raccogliamo i dati che ci comunichi (nome, email, eventuale azienda e il testo della richiesta).",
          en: "Data you provide voluntarily: when you contact us through the form we collect the data you share (name, email, any company and the text of your request).",
          es: "Datos que facilitas voluntariamente: cuando nos contactas a través del formulario recogemos los datos que compartes (nombre, email, empresa si la indicas y el texto de tu solicitud).",
          fr: "Données que vous fournissez volontairement : lorsque vous nous contactez via le formulaire, nous collectons les données que vous partagez (nom, e-mail, entreprise le cas échéant et le texte de votre demande).",
        },
        {
          it: "Dati di navigazione: i sistemi e i server raccolgono automaticamente alcuni dati tecnici (ad esempio indirizzo IP, tipo di browser, pagine visitate, data e ora), necessari al funzionamento e alla sicurezza del sito.",
          en: "Navigation data: systems and servers automatically collect certain technical data (for example IP address, browser type, pages visited, date and time), necessary for the operation and security of the site.",
          es: "Datos de navegación: los sistemas y servidores recogen automáticamente algunos datos técnicos (por ejemplo dirección IP, tipo de navegador, páginas visitadas, fecha y hora), necesarios para el funcionamiento y la seguridad del sitio.",
          fr: "Données de navigation : les systèmes et serveurs collectent automatiquement certaines données techniques (par exemple adresse IP, type de navigateur, pages consultées, date et heure), nécessaires au fonctionnement et à la sécurité du site.",
        },
        {
          it: "Conversazioni con l'assistente: se apri e usi il chatbot, il testo che inserisci viene trattato per fornirti una risposta (vedi la sezione «Assistente»).",
          en: "Conversations with the assistant: if you open and use the chatbot, the text you enter is processed to provide you an answer (see the “Assistant” section).",
          es: "Conversaciones con el asistente: si abres y usas el chatbot, el texto que introduces se trata para darte una respuesta (ver la sección «Asistente»).",
          fr: "Conversations avec l'assistant : si vous ouvrez et utilisez le chatbot, le texte que vous saisissez est traité pour vous répondre (voir la section « Assistant »).",
        },
        {
          it: "Cookie e strumenti di tracciamento: vedi la Cookie Policy dedicata.",
          en: "Cookies and tracking tools: see the dedicated Cookie Policy.",
          es: "Cookies y herramientas de seguimiento: ver la Política de cookies.",
          fr: "Cookies et outils de suivi : voir la Politique de cookies.",
        },
      ],
    },
    {
      heading: { it: "Finalità e basi giuridiche", en: "Purposes and legal bases", es: "Finalidades y bases jurídicas", fr: "Finalités et bases juridiques" },
      body: [
        {
          it: "Rispondere alle richieste inviate dal form. Base giuridica: esecuzione di misure precontrattuali richieste dall'interessato (art. 6.1.b).",
          en: "Responding to requests sent via the form. Legal basis: performance of pre-contractual measures requested by the data subject (art. 6.1.b).",
          es: "Responder a las solicitudes enviadas a través del formulario. Base jurídica: aplicación de medidas precontractuales solicitadas por el interesado (art. 6.1.b).",
          fr: "Répondre aux demandes envoyées via le formulaire. Base juridique : exécution de mesures précontractuelles prises à la demande de la personne concernée (art. 6.1.b).",
        },
        {
          it: "Rispondere alle tue domande sui nostri servizi tramite il chatbot. Base giuridica: misure precontrattuali su tua richiesta (art. 6.1.b).",
          en: "Answering your questions about our services through the chatbot. Legal basis: pre-contractual steps at your request (art. 6.1.b).",
          es: "Responder a tus preguntas sobre nuestros servicios a través del chatbot. Base jurídica: medidas precontractuales a petición tuya (art. 6.1.b).",
          fr: "Répondre à vos questions sur nos services via le chatbot. Base juridique : mesures précontractuelles à votre demande (art. 6.1.b).",
        },
        {
          it: "Garantire funzionamento, sicurezza e prevenzione degli abusi (ad esempio limiti anti-spam sul form). Base giuridica: legittimo interesse del Titolare.",
          en: "Ensuring operation, security and abuse prevention (for example anti-spam limits on the form). Legal basis: the Controller's legitimate interest.",
          es: "Garantizar el funcionamiento, la seguridad y la prevención de abusos (por ejemplo límites antispam en el formulario). Base jurídica: interés legítimo del Responsable.",
          fr: "Assurer le fonctionnement, la sécurité et la prévention des abus (par exemple des limites anti-spam sur le formulaire). Base juridique : intérêt légitime du Responsable.",
        },
        {
          it: "Misurare in forma aggregata traffico e prestazioni del sito. Base giuridica: legittimo interesse tramite strumenti cookieless (Vercel); Google Analytics viene attivato solo previo tuo consenso (art. 6.1.a).",
          en: "Measuring site traffic and performance in aggregate. Legal basis: legitimate interest via cookieless tools (Vercel); Google Analytics is activated only with your prior consent (art. 6.1.a).",
          es: "Medir de forma agregada el tráfico y el rendimiento del sitio. Base jurídica: interés legítimo mediante herramientas sin cookies (Vercel); Google Analytics solo se activa con tu consentimiento previo (art. 6.1.a).",
          fr: "Mesurer de façon agrégée le trafic et les performances du site. Base juridique : intérêt légitime via des outils sans cookies (Vercel) ; Google Analytics n'est activé qu'avec votre consentement préalable (art. 6.1.a).",
        },
        {
          it: "Gestire preventivi, contratti, fatturazione e pagamenti dei clienti. Base giuridica: esecuzione del contratto o di misure precontrattuali (art. 6.1.b) e obbligo legale (art. 6.1.c). Per questi dati il titolare è il professionista indicato nel preventivo.",
          en: "Managing clients' quotes, contracts, invoicing and payments. Legal basis: performance of the contract or of pre-contractual measures (art. 6.1.b) and legal obligation (art. 6.1.c). For this data the controller is the professional named in the quote.",
          es: "Gestionar presupuestos, contratos, facturación y pagos de los clientes. Base jurídica: ejecución del contrato o de medidas precontractuales (art. 6.1.b) y obligación legal (art. 6.1.c). Para estos datos el responsable es el profesional indicado en el presupuesto.",
          fr: "Gérer les devis, contrats, la facturation et les paiements des clients. Base juridique : exécution du contrat ou de mesures précontractuelles (art. 6.1.b) et obligation légale (art. 6.1.c). Pour ces données, le responsable est le professionnel indiqué dans le devis.",
        },
        {
          it: "Adempiere a obblighi di legge, inclusi quelli fiscali e contabili. Base giuridica: obbligo legale (art. 6.1.c).",
          en: "Complying with legal obligations, including tax and accounting ones. Legal basis: legal obligation (art. 6.1.c).",
          es: "Cumplir obligaciones legales, incluidas las fiscales y contables. Base jurídica: obligación legal (art. 6.1.c).",
          fr: "Respecter les obligations légales, notamment fiscales et comptables. Base juridique : obligation légale (art. 6.1.c).",
        },
      ],
    },
    {
      heading: {
        it: "Natura del conferimento",
        en: "Whether providing data is required",
        es: "Carácter obligatorio de los datos",
        fr: "Caractère obligatoire des données",
      },
      body: [
        {
          it: "Nel form di contatto, nome ed email sono necessari per poterti rispondere: senza di essi non è possibile dare seguito alla richiesta. Gli altri campi sono facoltativi.",
          en: "In the contact form, name and email are required so we can reply to you: without them we cannot follow up on your request. The other fields are optional.",
          es: "En el formulario de contacto, el nombre y el email son obligatorios para poder responderte: sin ellos no podemos atender tu solicitud. Los demás campos son opcionales.",
          fr: "Dans le formulaire de contact, le nom et l'e-mail sont obligatoires pour que nous puissions vous répondre : sans eux, nous ne pouvons pas donner suite à votre demande. Les autres champs sont facultatifs.",
        },
      ],
    },
    {
      heading: {
        it: "Destinatari e responsabili del trattamento",
        en: "Recipients and processors",
        es: "Destinatarios y encargados del tratamiento",
        fr: "Destinataires et sous-traitants",
      },
      body: [
        {
          it: "Per erogare il servizio ci avvaliamo di fornitori terzi che agiscono come responsabili del trattamento ai sensi dell'art. 28 GDPR: Vercel Inc. (hosting del sito e statistiche cookieless Web Analytics/Speed Insights), Sanity (sistema di gestione dei contenuti), Resend (invio delle email generate dal form), la piattaforma dell'assistente (GPT-trainer di Paladin Max, Inc., tramite gptchatbot.it, che per generare le risposte usa un modello linguistico di Google) e, ove attivato, Google (Google Analytics 4).",
          en: "To deliver the service we rely on third-party providers acting as processors under art. 28 GDPR: Vercel Inc. (site hosting and cookieless Web Analytics/Speed Insights), Sanity (content management system), Resend (sending emails generated by the form), the assistant platform (GPT-trainer by Paladin Max, Inc., via gptchatbot.it, which uses a Google language model to generate answers) and, where activated, Google (Google Analytics 4).",
          es: "Para prestar el servicio nos apoyamos en proveedores externos que actúan como encargados del tratamiento conforme al art. 28 RGPD: Vercel Inc. (alojamiento del sitio y Web Analytics/Speed Insights sin cookies), Sanity (sistema de gestión de contenidos), Resend (envío de los emails generados por el formulario), la plataforma del asistente (GPT-trainer de Paladin Max, Inc., a través de gptchatbot.it, que usa un modelo de lenguaje de Google para generar las respuestas) y, si se activa, Google (Google Analytics 4).",
          fr: "Pour fournir le service, nous faisons appel à des prestataires tiers agissant comme sous-traitants au sens de l'art. 28 RGPD : Vercel Inc. (hébergement du site et Web Analytics/Speed Insights sans cookies), Sanity (système de gestion de contenu), Resend (envoi des e-mails générés par le formulaire), la plateforme de l'assistant (GPT-trainer de Paladin Max, Inc., via gptchatbot.it, qui utilise un modèle de langage de Google pour générer les réponses) et, si activé, Google (Google Analytics 4).",
        },
        {
          it: "I pagamenti con carta sono gestiti da Stripe (Stripe Payments Europe, Ltd., Irlanda), che tratta i dati di pagamento anche come titolare autonomo, ad esempio per la prevenzione delle frodi, secondo la propria informativa (stripe.com/privacy).",
          en: "Card payments are handled by Stripe (Stripe Payments Europe, Ltd., Ireland), which also processes payment data as an independent controller, for example for fraud prevention, under its own privacy policy (stripe.com/privacy).",
          es: "Los pagos con tarjeta los gestiona Stripe (Stripe Payments Europe, Ltd., Irlanda), que también trata los datos de pago como responsable independiente, por ejemplo para la prevención del fraude, según su propia política de privacidad (stripe.com/privacy).",
          fr: "Les paiements par carte sont gérés par Stripe (Stripe Payments Europe, Ltd., Irlande), qui traite aussi les données de paiement en tant que responsable indépendant, par exemple pour la prévention de la fraude, selon sa propre politique de confidentialité (stripe.com/privacy).",
        },
        {
          it: "I dati non sono diffusi né ceduti a terzi per loro finalità di marketing. L'elenco aggiornato dei responsabili è disponibile su richiesta.",
          en: "Data is neither disclosed publicly nor sold to third parties for their own marketing purposes. An up-to-date list of processors is available on request.",
          es: "Los datos no se difunden públicamente ni se venden a terceros para sus propios fines de marketing. Una lista actualizada de los encargados está disponible bajo solicitud.",
          fr: "Les données ne sont ni diffusées publiquement ni vendues à des tiers pour leurs propres fins marketing. Une liste à jour des sous-traitants est disponible sur demande.",
        },
      ],
    },
    {
      heading: {
        it: "Trasferimenti fuori dall'Unione Europea",
        en: "Transfers outside the European Union",
        es: "Transferencias fuera de la Unión Europea",
        fr: "Transferts hors de l'Union européenne",
      },
      body: [
        {
          it: "Alcuni fornitori (ad esempio Vercel, Resend e Google) possono trattare dati negli Stati Uniti. In tal caso il trasferimento avviene sulla base di garanzie adeguate: clausole contrattuali standard (SCC) e/o certificazione EU-US Data Privacy Framework. Puoi richiederci copia delle garanzie adottate scrivendo a info@flylabs.ai.",
          en: "Some providers (for example Vercel, Resend and Google) may process data in the United States. In that case the transfer is based on appropriate safeguards: standard contractual clauses (SCC) and/or EU-US Data Privacy Framework certification. You can request a copy of the safeguards by writing to info@flylabs.ai.",
          es: "Algunos proveedores (por ejemplo Vercel, Resend y Google) pueden tratar datos en Estados Unidos. En ese caso la transferencia se basa en garantías adecuadas: cláusulas contractuales tipo (CCT) y/o certificación EU-US Data Privacy Framework. Puedes solicitar una copia de las garantías escribiendo a info@flylabs.ai.",
          fr: "Certains prestataires (par exemple Vercel, Resend et Google) peuvent traiter des données aux États-Unis. Dans ce cas, le transfert repose sur des garanties appropriées : clauses contractuelles types (CCT) et/ou certification EU-US Data Privacy Framework. Vous pouvez demander une copie des garanties en écrivant à info@flylabs.ai.",
        },
        {
          it: "Le conversazioni con l'assistente sono conservate negli Stati Uniti dal fornitore della piattaforma (vedi la sezione «Assistente»), che oggi non pubblica il meccanismo di trasferimento adottato: lo stiamo verificando con il fornitore. Nel frattempo ti chiediamo di non inserire nella chat dati personali non necessari.",
          en: "Conversations with the assistant are stored in the United States by the platform provider (see the “Assistant” section), which does not currently publish the transfer mechanism it relies on: we are verifying it with the provider. In the meantime, please do not enter unnecessary personal data in the chat.",
          es: "Las conversaciones con el asistente las conserva en Estados Unidos el proveedor de la plataforma (ver la sección «Asistente»), que por ahora no publica el mecanismo de transferencia en el que se basa: lo estamos verificando con el proveedor. Mientras tanto, te pedimos que no introduzcas datos personales innecesarios en el chat.",
          fr: "Les conversations avec l'assistant sont conservées aux États-Unis par le fournisseur de la plateforme (voir la section « Assistant »), qui ne publie pas à ce jour le mécanisme de transfert sur lequel il s'appuie : nous le vérifions avec lui. En attendant, merci de ne pas saisir de données personnelles inutiles dans le chat.",
        },
      ],
    },
    {
      heading: { it: "Assistente (chatbot)", en: "Assistant (chatbot)", es: "Asistente (chatbot)", fr: "Assistant (chatbot)" },
      body: [
        {
          it: "L'assistente usa la piattaforma GPT-trainer di Paladin Max, Inc. (Stati Uniti), tramite gptchatbot.it, e si attiva solo quando lo apri. I messaggi che scrivi vengono trattati per generare le risposte e conservati su server Amazon Web Services in Oregon (USA); per produrre la risposta il testo è inviato a un modello linguistico di Google (Gemini). GPT-trainer dichiara di non usare i contenuti degli utenti per addestrare modelli di intelligenza artificiale. Le conversazioni possono costituire dati personali: ti invitiamo a non inserire dati particolari (art. 9 GDPR) o riservati, né dati di terzi. Su richiesta a info@flylabs.ai cancelliamo le tue conversazioni.",
          en: "The assistant runs on the GPT-trainer platform by Paladin Max, Inc. (United States), via gptchatbot.it, and activates only when you open it. The messages you write are processed to generate replies and stored on Amazon Web Services servers in Oregon (USA); to produce the reply, the text is sent to a Google language model (Gemini). GPT-trainer states that it does not use user content to train AI models. Conversations may constitute personal data: please do not enter special-category data (art. 9 GDPR), confidential data, or third parties' data. On request to info@flylabs.ai we delete your conversations.",
          es: "El asistente funciona sobre la plataforma GPT-trainer de Paladin Max, Inc. (Estados Unidos), a través de gptchatbot.it, y solo se activa cuando lo abres. Los mensajes que escribes se tratan para generar las respuestas y se conservan en servidores de Amazon Web Services en Oregón (EE. UU.); para producir la respuesta, el texto se envía a un modelo de lenguaje de Google (Gemini). GPT-trainer declara que no usa los contenidos de los usuarios para entrenar modelos de IA. Las conversaciones pueden constituir datos personales: no introduzcas datos de categorías especiales (art. 9 RGPD), datos confidenciales ni datos de terceros. Si lo solicitas a info@flylabs.ai, borramos tus conversaciones.",
          fr: "L'assistant fonctionne sur la plateforme GPT-trainer de Paladin Max, Inc. (États-Unis), via gptchatbot.it, et ne s'active que lorsque vous l'ouvrez. Les messages que vous écrivez sont traités pour générer les réponses et conservés sur des serveurs Amazon Web Services en Oregon (États-Unis) ; pour produire la réponse, le texte est envoyé à un modèle de langage de Google (Gemini). GPT-trainer déclare ne pas utiliser les contenus des utilisateurs pour entraîner des modèles d'IA. Les conversations peuvent constituer des données personnelles : ne saisissez pas de données de catégories particulières (art. 9 RGPD), de données confidentielles ni de données de tiers. Sur demande à info@flylabs.ai, nous supprimons vos conversations.",
        },
      ],
    },
    {
      heading: { it: "Periodo di conservazione", en: "Retention period", es: "Plazo de conservación", fr: "Durée de conservation" },
      body: [
        {
          it: "Dati del form/richieste non trasformate in un rapporto: 24 mesi, poi cancellati automaticamente. Dati contrattuali, contabili e fiscali: 10 anni (art. 2220 c.c. e normativa fiscale). Log tecnici della piattaforma di hosting (Vercel): al massimo 30 giorni, oggi 1 ora. Conversazioni con l'assistente: sulla piattaforma del fornitore finché non le cancelliamo; puoi chiederne la cancellazione in ogni momento. Scelte sui cookie: fino a 6 mesi, oltre le quali il consenso viene richiesto di nuovo. Registro delle scelte sui cookie (scelta per categoria, versione del banner, lingua, data e ora, famiglia di browser e sistema operativo): 24 mesi dalla registrazione, per poter dimostrare il consenso (art. 7.1 GDPR), poi cancellato automaticamente. L'indirizzo IP, salvato solo in forma pseudonimizzata (hash) per limitare gli abusi del form e del registro, viene tolto dopo 30 giorni.",
          en: "Form/request data not turned into a relationship: 24 months, then deleted automatically. Contractual, accounting and tax data: 10 years (art. 2220 of the Italian Civil Code and tax law). Hosting platform technical logs (Vercel): 30 days at most, currently 1 hour. Assistant conversations: on the provider's platform until we delete them; you can ask us to delete them at any time. Cookie choices: up to 6 months, after which consent is requested again. Cookie choice records (choice per category, banner version, language, date and time, browser and operating system family): 24 months from recording, so that we can demonstrate consent (art. 7(1) GDPR), then deleted automatically. The IP address, stored only in pseudonymised form (hash) to limit abuse of the form and of the record, is removed after 30 days.",
          es: "Datos del formulario o de solicitudes que no dan lugar a una relación: 24 meses, después se borran automáticamente. Datos contractuales, contables y fiscales: 10 años (art. 2220 del Código Civil italiano y normativa fiscal). Logs técnicos de la plataforma de alojamiento (Vercel): 30 días como máximo, actualmente 1 hora. Conversaciones con el asistente: en la plataforma del proveedor hasta que las borramos; puedes pedirnos que las borremos en cualquier momento. Elecciones sobre las cookies: hasta 6 meses, después se vuelve a pedir el consentimiento. Registro de las elecciones sobre las cookies (elección por categoría, versión del banner, idioma, fecha y hora, familia de navegador y sistema operativo): 24 meses desde el registro, para poder demostrar el consentimiento (art. 7.1 RGPD), después se borra automáticamente. La dirección IP, conservada solo en forma seudonimizada (hash) para limitar los abusos del formulario y del registro, se elimina a los 30 días.",
          fr: "Données du formulaire ou de demandes n'ayant pas donné lieu à une relation : 24 mois, puis suppression automatique. Données contractuelles, comptables et fiscales : 10 ans (art. 2220 du Code civil italien et réglementation fiscale). Journaux techniques de la plateforme d'hébergement (Vercel) : 30 jours au maximum, actuellement 1 heure. Conversations avec l'assistant : sur la plateforme du fournisseur jusqu'à ce que nous les supprimions ; vous pouvez nous demander de les supprimer à tout moment. Choix relatifs aux cookies : jusqu'à 6 mois, après quoi le consentement est redemandé. Registre des choix relatifs aux cookies (choix par catégorie, version du bandeau, langue, date et heure, famille de navigateur et de système d'exploitation) : 24 mois à compter de l'enregistrement, afin de pouvoir prouver le consentement (art. 7.1 RGPD), puis suppression automatique. L'adresse IP, conservée uniquement sous forme pseudonymisée (hash) pour limiter les abus du formulaire et du registre, est effacée au bout de 30 jours.",
        },
      ],
    },
    {
      heading: { it: "I tuoi diritti", en: "Your rights", es: "Tus derechos", fr: "Vos droits" },
      body: [
        {
          it: "In qualità di interessato hai diritto di accedere ai tuoi dati, chiederne la rettifica o la cancellazione, limitarne il trattamento e ottenere la portabilità dei dati, oltre a revocare in ogni momento il consenso eventualmente prestato (ad esempio per le statistiche o l'assistente).",
          en: "As a data subject you have the right to access your data, request its rectification or erasure, restrict its processing and obtain data portability, as well as to withdraw at any time any consent given (for example for analytics or the assistant).",
          es: "Como interesado tienes derecho a acceder a tus datos, solicitar su rectificación o supresión, limitar su tratamiento y obtener su portabilidad, así como a retirar en cualquier momento el consentimiento prestado (por ejemplo para las estadísticas o el asistente).",
          fr: "En tant que personne concernée, vous avez le droit d'accéder à vos données, d'en demander la rectification ou l'effacement, d'en limiter le traitement et d'en obtenir la portabilité, ainsi que de retirer à tout moment le consentement donné (par exemple pour les statistiques ou l'assistant).",
        },
        {
          it: "Diritto di opposizione: puoi opporti in qualsiasi momento ai trattamenti basati sul nostro legittimo interesse (sicurezza del sito, statistiche senza cookie) scrivendo a info@flylabs.ai.",
          en: "Right to object: you can object at any time to processing based on our legitimate interest (site security, cookieless analytics) by writing to info@flylabs.ai.",
          es: "Derecho de oposición: puedes oponerte en cualquier momento al tratamiento basado en nuestro interés legítimo (seguridad del sitio, estadísticas sin cookies) escribiendo a info@flylabs.ai.",
          fr: "Droit d'opposition : vous pouvez vous opposer à tout moment au traitement fondé sur notre intérêt légitime (sécurité du site, statistiques sans cookies) en écrivant à info@flylabs.ai.",
        },
        {
          it: "Puoi esercitare questi diritti scrivendo a info@flylabs.ai. Hai inoltre il diritto di proporre reclamo al Garante per la protezione dei dati personali (www.garanteprivacy.it).",
          en: "You can exercise these rights by writing to info@flylabs.ai. You also have the right to lodge a complaint with the Italian Data Protection Authority (Garante per la protezione dei dati personali, www.garanteprivacy.it).",
          es: "Puedes ejercer estos derechos escribiendo a info@flylabs.ai. También tienes derecho a presentar una reclamación ante la autoridad italiana de protección de datos (Garante per la protezione dei dati personali, www.garanteprivacy.it).",
          fr: "Vous pouvez exercer ces droits en écrivant à info@flylabs.ai. Vous avez aussi le droit d'introduire une réclamation auprès de l'autorité italienne de protection des données (Garante per la protezione dei dati personali, www.garanteprivacy.it).",
        },
      ],
    },
    {
      heading: {
        it: "Processo decisionale automatizzato",
        en: "Automated decision-making",
        es: "Decisiones automatizadas",
        fr: "Prise de décision automatisée",
      },
      body: [
        {
          it: "Non effettuiamo trattamenti che producano decisioni automatizzate con effetti giuridici o similmente significativi ai sensi dell'art. 22 GDPR. L'assistente fornisce risposte generate da un modello linguistico a fini informativi e di primo contatto, e non prende decisioni sull'utente.",
          en: "We do not carry out processing that produces automated decisions with legal or similarly significant effects under art. 22 GDPR. The assistant provides answers generated by a language model for informational and first-contact purposes, and does not make decisions about the user.",
          es: "No realizamos tratamientos que produzcan decisiones automatizadas con efectos jurídicos o significativamente similares conforme al art. 22 RGPD. El asistente ofrece respuestas generadas por un modelo de lenguaje con fines informativos y de primer contacto, y no toma decisiones sobre el usuario.",
          fr: "Nous n'effectuons pas de traitements produisant des décisions automatisées ayant des effets juridiques ou des effets similaires significatifs au sens de l'art. 22 RGPD. L'assistant fournit des réponses générées par un modèle de langage à des fins d'information et de premier contact, et ne prend aucune décision concernant l'utilisateur.",
        },
      ],
    },
    {
      heading: { it: "Cookie", en: "Cookies", es: "Cookies", fr: "Cookies" },
      body: [
        {
          it: "Il sito usa cookie tecnici, sempre attivi. Solo con il tuo consenso attiviamo le statistiche (Google Analytics) e l'assistente AI. Puoi gestire o revocare le tue scelte in ogni momento dalla Cookie Policy o dal link «Gestisci cookie» nel footer.",
          en: "The site uses strictly necessary cookies, always on. Analytics (Google Analytics) and the AI assistant run only with your consent. You can manage or withdraw your choices at any time from the Cookie Policy or the “Manage cookies” link in the footer.",
          es: "El sitio usa cookies técnicas, siempre activas. Las estadísticas (Google Analytics) y el asistente IA solo funcionan con tu consentimiento. Puedes gestionar o retirar tus elecciones en cualquier momento desde la Política de cookies o el enlace «Gestionar cookies» del pie de página.",
          fr: "Le site utilise des cookies techniques, toujours actifs. Les statistiques (Google Analytics) et l'assistant IA ne fonctionnent qu'avec votre consentement. Vous pouvez gérer ou retirer vos choix à tout moment depuis la Politique de cookies ou le lien « Gérer les cookies » en pied de page.",
        },
      ],
    },
    {
      heading: { it: "Modifiche a questa informativa", en: "Changes to this policy", es: "Cambios en esta política", fr: "Modifications de cette politique" },
      body: [
        {
          it: "Possiamo aggiornare questa informativa nel tempo. La versione vigente è sempre pubblicata su questa pagina, con l'indicazione della data di ultimo aggiornamento.",
          en: "We may update this policy over time. The current version is always published on this page, with the date of the latest update.",
          es: "Podemos actualizar esta política con el tiempo. La versión vigente está siempre publicada en esta página, con la fecha de la última actualización.",
          fr: "Nous pouvons mettre à jour cette politique au fil du temps. La version en vigueur est toujours publiée sur cette page, avec la date de la dernière mise à jour.",
        },
      ],
    },
  ] satisfies Section[],
} as const;
