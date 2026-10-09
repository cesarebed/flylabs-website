import type { Locale } from "@/lib/i18n";

/**
 * Termini di servizio (bilingue it/en): termini d'uso del sito e condizioni
 * generali dei servizi. Servono anche per l'attivazione di Stripe (rimborsi,
 * contestazioni, cancellazione, contatto). Bozza e revisione legale in
 * flylabs-brain/02_Areas/legal/termini-di-servizio.md: modificare il testo là
 * e qui insieme. Tenere coerente con lib/privacy-content.ts.
 */
type L = Record<Locale, string>;
type Paragraph = { label?: L; text: L };
type Section = { heading: L; body: Paragraph[] };

export const terms: {
  meta: Record<Locale, { title: string; description: string }>;
  title: L;
  updated: L;
  intro: L;
  sections: Section[];
  withdrawalForm: { title: L; note: L; lines: L[] };
} = {
  "meta": {
    "it": {
      "title": "Termini di servizio | flylabs.ai",
      "description": "Termini d'uso del sito flylabs.ai e condizioni generali dei servizi: pagamenti, rimborsi, recesso e assistenza."
    },
    "en": {
      "title": "Terms of Service | flylabs.ai",
      "description": "Terms of use of the flylabs.ai website and general terms of our services: payments, refunds, withdrawal and support."
    }
  },
  "title": {
    "it": "Termini di servizio",
    "en": "Terms of Service"
  },
  "updated": {
    "it": "Ultimo aggiornamento: 9 ottobre 2026",
    "en": "Last updated: 9 October 2026"
  },
  "intro": {
    "it": "Questi termini regolano l'uso del sito e i servizi di flylabs.ai. Leggili insieme al preventivo, che per ogni progetto definisce perimetro, prezzi e tempi.",
    "en": "These terms govern the use of the site and the services of flylabs.ai. Read them together with the quote, which sets out scope, prices and timelines for each project."
  },
  "sections": [
    {
      "heading": {
        "it": "1. Chi siamo",
        "en": "1. Who we are"
      },
      "body": [
        {
          "text": {
            "it": "flylabs.ai è il marchio con cui offrono i propri servizi due professionisti indipendenti: Cesare Bedin (ditta individuale, P.IVA IT05755090288) e Federico De Cillia (ditta individuale, P.IVA IT13990330964). flylabs.ai non è una società.",
            "en": "flylabs.ai is the brand under which two independent professionals offer their services: Cesare Bedin (sole trader, VAT no. IT05755090288) and Federico De Cillia (sole trader, VAT no. IT13990330964). flylabs.ai is not a company."
          }
        },
        {
          "text": {
            "it": "Il fornitore di ciascun servizio, e quindi la tua controparte contrattuale, è il professionista indicato nel preventivo, che emette la fattura e incassa il pagamento, anche quando il pagamento avviene con carta tramite Stripe. L'altro professionista può collaborare al progetto come subfornitore senza diventare parte del contratto, salvo che il preventivo indichi espressamente entrambi e le attività di ciascuno. Nel testo \"flylabs\" o \"noi\" indica il professionista indicato nel preventivo o, per l'uso del sito, entrambi.",
            "en": "The provider of each service, and therefore your contractual counterparty, is the professional named in the quote, who issues the invoice and collects the payment, including when payment is made by card via Stripe. The other professional may work on the project as a subcontractor without becoming a party to the contract, unless the quote expressly names both and the activities of each. In these terms \"flylabs\" or \"we\" means the professional named in the quote or, for the use of the site, both."
          }
        },
        {
          "text": {
            "it": "L'indirizzo geografico e il recapito telefonico del professionista sono indicati nel preventivo e in fattura. Contatti: info@flylabs.ai.",
            "en": "The professional's geographical address and telephone number are stated in the quote and on the invoice. Contact: info@flylabs.ai."
          }
        }
      ]
    },
    {
      "heading": {
        "it": "2. Ambito",
        "en": "2. Scope"
      },
      "body": [
        {
          "text": {
            "it": "Questi termini regolano l'uso del sito www.flylabs.ai (incluso l'assistente AI) e, in via generale, i servizi professionali che offriamo: chatbot e agenti AI, automazioni e integrazioni, sviluppo di software e web app su misura, consulenza AI. Ogni progetto è regolato anche dal preventivo accettato dal cliente, che prevale su questi termini in caso di differenze.",
            "en": "These terms govern the use of the website www.flylabs.ai (including the AI assistant) and, in general, the professional services we offer: AI chatbots and agents, automation and integrations, custom software and web app development, AI consulting. Each project is also governed by the quote accepted by the client, which prevails over these terms in case of differences."
          }
        },
        {
          "text": {
            "it": "Per i servizi acquistati tramite piattaforme terze (ad esempio Fiverr o Upwork) prevalgono i termini della piattaforma, inclusi quelli su pagamenti, rimborsi e contestazioni; questi termini si applicano per quanto compatibili.",
            "en": "For services purchased through third-party platforms (for example Fiverr or Upwork), the platform's terms prevail, including those on payments, refunds and disputes; these terms apply insofar as compatible."
          }
        },
        {
          "text": {
            "it": "\"Cliente consumatore\" è la persona fisica che agisce per scopi estranei alla propria attività imprenditoriale, commerciale, artigianale o professionale (art. 3 D.Lgs. 206/2005, Codice del Consumo); \"cliente business\" è ogni altro cliente. Le clausole riservate ai clienti business non si applicano ai consumatori.",
            "en": "A \"consumer client\" is a natural person acting for purposes outside their trade, business, craft or profession (art. 3 of Legislative Decree 206/2005, the Italian Consumer Code); a \"business client\" is any other client. Clauses reserved to business clients do not apply to consumers."
          }
        }
      ]
    },
    {
      "heading": {
        "it": "3. Uso del sito",
        "en": "3. Use of the site"
      },
      "body": [
        {
          "text": {
            "it": "Puoi usare il sito per informarti sui nostri servizi e contattarci. Non è consentito usarlo in modo illecito, tentare di accedere ad aree o sistemi non pubblici, comprometterne il funzionamento o estrarne contenuti e dati con strumenti automatizzati senza autorizzazione, salvo l'indicizzazione dei motori di ricerca. Il sito è fornito \"così com'è\": cerchiamo di mantenerlo aggiornato e disponibile, ma non garantiamo che sia privo di errori o sempre raggiungibile.",
            "en": "You may use the site to learn about our services and contact us. You may not use it unlawfully, attempt to access non-public areas or systems, disrupt its operation or extract content and data by automated means without permission, except for search engine indexing. The site is provided \"as is\": we strive to keep it up to date and available, but we do not guarantee that it is error-free or always reachable."
          }
        }
      ]
    },
    {
      "heading": {
        "it": "4. Assistente AI",
        "en": "4. AI assistant"
      },
      "body": [
        {
          "text": {
            "it": "L'assistente del sito è un sistema di intelligenza artificiale, non una persona: risponde con testi generati da un modello linguistico, a scopo informativo e di primo contatto, e si attiva solo se lo apri e acconsenti. Le risposte possono essere incomplete o inesatte e non costituiscono un'offerta vincolante né una consulenza professionale: prezzi, tempi e condizioni sono quelli del preventivo.",
            "en": "The site's assistant is an artificial intelligence system, not a person: it replies with text generated by a language model, for informational and first-contact purposes, and activates only if you open it and consent. Answers may be incomplete or inaccurate and are neither a binding offer nor professional advice: prices, timelines and conditions are those in the quote."
          }
        },
        {
          "text": {
            "it": "Non inserire nella chat dati sensibili, riservati o di terzi. Per parlare con una persona scrivi a info@flylabs.ai. Piattaforma usata, conservazione e trattamento dei dati sono descritti nella Privacy Policy.",
            "en": "Do not enter sensitive, confidential or third-party data in the chat. To talk to a person, write to info@flylabs.ai. The platform used, retention and data processing are described in the Privacy Policy."
          }
        }
      ]
    },
    {
      "heading": {
        "it": "5. Servizi professionali",
        "en": "5. Professional services"
      },
      "body": [
        {
          "label": {
            "it": "Offerta e accettazione.",
            "en": "Offer and acceptance."
          },
          "text": {
            "it": "Il perimetro, i prezzi, i tempi e le modalità di pagamento di ogni progetto sono definiti nel preventivo, valido per il periodo in esso indicato. Il contratto si conclude quando il cliente accetta il preventivo per iscritto (firma, anche elettronica, email o piattaforma). Il contratto è composto dal preventivo accettato, da questi termini nella versione richiamata nel preventivo e dagli eventuali allegati; in caso di contrasto prevale il preventivo. Al cliente consumatore inviamo conferma del contratto su supporto durevole, ad esempio email con PDF.",
            "en": "Scope, prices, timelines and payment terms of each project are set out in the quote, which is valid for the period stated in it. The contract is concluded when the client accepts the quote in writing (signature, including electronic, email or platform). The contract consists of the accepted quote, these terms in the version referred to in the quote and any annexes; in case of conflict the quote prevails. Consumer clients receive confirmation of the contract on a durable medium, for example an email with a PDF."
          }
        },
        {
          "label": {
            "it": "Collaborazione del cliente.",
            "en": "Client cooperation."
          },
          "text": {
            "it": "Il cliente fornisce in tempo utile informazioni, accessi e materiali necessari e garantisce di averne il diritto. Ritardi o informazioni errate possono spostare i tempi concordati.",
            "en": "The client provides the necessary information, access and materials in good time and warrants that it has the right to do so. Delays or incorrect information may shift the agreed timelines."
          }
        },
        {
          "label": {
            "it": "Modifiche.",
            "en": "Changes."
          },
          "text": {
            "it": "Le richieste fuori dal perimetro del preventivo vengono stimate e concordate a parte.",
            "en": "Requests outside the scope of the quote are estimated and agreed separately."
          }
        },
        {
          "label": {
            "it": "Pagamenti.",
            "en": "Payments."
          },
          "text": {
            "it": "Termini e scadenze come da preventivo (vedi anche la sezione 6). Se una somma scaduta non viene pagata, possiamo sospendere le attività ai sensi dell'art. 1460 c.c., con avviso scritto di almeno 7 giorni, fino al pagamento; i tempi di consegna si spostano di conseguenza. Ai clienti business si applicano gli interessi di mora previsti dal D.Lgs. 231/2002.",
            "en": "Terms and due dates as per the quote (see also section 6). If an amount due is not paid, we may suspend work under art. 1460 of the Italian Civil Code, with at least 7 days' written notice, until payment; delivery timelines shift accordingly. Business clients are charged late-payment interest under Legislative Decree 231/2002."
          }
        },
        {
          "label": {
            "it": "Servizi di terzi.",
            "en": "Third-party services."
          },
          "text": {
            "it": "Molte soluzioni usano servizi di terzi (ad esempio fornitori di modelli AI, hosting, API). Il loro funzionamento, i prezzi e i termini dipendono da quei fornitori; eventuali costi di licenza o consumo sono a carico del cliente salvo diverso accordo.",
            "en": "Many solutions rely on third-party services (for example AI model providers, hosting, APIs). Their operation, pricing and terms depend on those providers; any licence or usage costs are borne by the client unless agreed otherwise."
          }
        }
      ]
    },
    {
      "heading": {
        "it": "6. Pagamenti, rimborsi e cancellazione",
        "en": "6. Payments, refunds and cancellation"
      },
      "body": [
        {
          "label": {
            "it": "Prezzi e pagamento.",
            "en": "Prices and payment."
          },
          "text": {
            "it": "I prezzi sono indicati in euro (EUR) nel preventivo. Per i clienti business sono al netto dell'IVA, se dovuta; per i clienti consumatori il preventivo indica il prezzo finale comprensivo di imposte e di ogni altro onere. Il pagamento avviene con i metodi indicati nel preventivo: carta tramite Stripe o bonifico bancario. I dati della carta sono trattati direttamente da Stripe, certificato PCI DSS: noi non li riceviamo né li conserviamo.",
            "en": "Prices are stated in euros (EUR) in the quote. For business clients they are exclusive of VAT, where due; for consumer clients the quote states the final price including taxes and all other charges. Payment is made using the methods stated in the quote: card via Stripe or bank transfer. Card data is processed directly by Stripe, which is PCI DSS certified: we neither receive nor store it."
          }
        },
        {
          "label": {
            "it": "Annullamento e rimborsi.",
            "en": "Cancellation and refunds."
          },
          "text": {
            "it": "Se il progetto viene annullato prima dell'inizio dei lavori, da noi o dal cliente, rimborsiamo per intero le somme versate. Se il cliente business recede dopo l'inizio dei lavori (artt. 2227 e 2237 c.c.), paga le attività svolte fino alla data del recesso e i costi di terzi già sostenuti e non recuperabili, e rimborsiamo l'eventuale eccedenza. Se annulliamo noi un progetto per motivi non imputabili al cliente, rimborsiamo le somme relative alle attività non svolte. I rimborsi avvengono con lo stesso metodo di pagamento usato, salvo diverso accordo, entro 14 giorni dalla comunicazione di annullamento.",
            "en": "If the project is cancelled before work begins, by us or by the client, we refund all amounts paid in full. If a business client withdraws after work has begun (arts. 2227 and 2237 of the Italian Civil Code), it pays for the work performed up to the withdrawal date and for third-party costs already incurred and not recoverable, and we refund any excess. If we cancel a project for reasons not attributable to the client, we refund the amounts relating to work not performed. Refunds are issued to the original payment method, unless agreed otherwise, within 14 days of the cancellation notice."
          }
        },
        {
          "label": {
            "it": "Servizi ricorrenti.",
            "en": "Recurring services."
          },
          "text": {
            "it": "Se il preventivo prevede un servizio ricorrente (ad esempio manutenzione, hosting gestito o canone mensile), durata del periodo e rinnovo sono indicati nel preventivo. Il cliente può disdirlo in ogni momento scrivendo a info@flylabs.ai: la disdetta ha effetto alla fine del periodo già pagato, senza ulteriori addebiti e senza rimborsi parziali per il periodo in corso, fermo il diritto di recesso dei consumatori.",
            "en": "If the quote includes a recurring service (for example maintenance, managed hosting or a monthly fee), the billing period and renewal are stated in the quote. The client may cancel at any time by writing to info@flylabs.ai: cancellation takes effect at the end of the period already paid, with no further charges and no partial refunds for the current period, without prejudice to the consumer right of withdrawal."
          }
        },
        {
          "label": {
            "it": "Diritto di recesso dei consumatori.",
            "en": "Consumer right of withdrawal."
          },
          "text": {
            "it": "Il cliente consumatore che conclude il contratto a distanza (ad esempio via email, telefono, videochiamata o online) può recedere senza indicarne il motivo entro 14 giorni dalla conclusione del contratto, inviando prima della scadenza una dichiarazione esplicita a info@flylabs.ai, anche con il modulo in fondo a questa pagina (non obbligatorio). Rimborsiamo tutti i pagamenti ricevuti entro 14 giorni dal giorno in cui riceviamo la comunicazione di recesso, con lo stesso mezzo di pagamento usato e senza costi per il consumatore. Iniziamo i lavori durante il periodo di recesso solo su richiesta espressa del consumatore su supporto durevole; se poi recede, paga un importo proporzionale al servizio prestato fino alla comunicazione del recesso. Il diritto di recesso si perde dopo la completa prestazione del servizio, se l'esecuzione è iniziata con l'accordo espresso del consumatore e con la sua accettazione di perdere il diritto a prestazione completata; per i contenuti digitali forniti senza supporto materiale si perde dall'inizio della fornitura, se il consumatore vi ha acconsentito espressamente accettando di perdere il diritto (artt. 52-59, in particolare art. 59, comma 1, lett. a e o, Codice del Consumo).",
            "en": "A consumer client who concludes the contract at a distance (for example by email, phone, video call or online) may withdraw without giving a reason within 14 days of the conclusion of the contract, by sending an explicit statement to info@flylabs.ai before the deadline, also using the form at the bottom of this page (not mandatory). We refund all payments received within 14 days of the day we receive the withdrawal notice, using the same means of payment and at no cost to the consumer. We start work during the withdrawal period only at the consumer's express request on a durable medium; if the consumer then withdraws, they pay an amount proportionate to the service provided up to the withdrawal notice. The right of withdrawal is lost once the service has been fully performed, if performance began with the consumer's express consent and acknowledgement that they lose the right once the contract is fully performed; for digital content not supplied on a tangible medium it is lost when supply begins, if the consumer expressly consented and acknowledged the loss of the right (arts. 52-59, in particular art. 59(1)(a) and (o), of the Italian Consumer Code)."
          }
        },
        {
          "label": {
            "it": "Reclami e contestazioni.",
            "en": "Complaints and disputes."
          },
          "text": {
            "it": "Per qualsiasi problema su un servizio o un pagamento scrivi a info@flylabs.ai indicando il riferimento del preventivo o della fattura: rispondiamo entro 5 giorni lavorativi e cerchiamo una soluzione, incluso il rimborso quando dovuto secondo questa sezione. Ti chiediamo di contattarci prima di aprire una contestazione (chargeback) con la banca o l'emittente della carta; resta salvo il tuo diritto di farlo.",
            "en": "For any issue with a service or a payment, write to info@flylabs.ai quoting the quote or invoice reference: we reply within 5 business days and look for a solution, including a refund where due under this section. Please contact us before opening a dispute (chargeback) with your bank or card issuer; your right to do so is unaffected."
          }
        }
      ]
    },
    {
      "heading": {
        "it": "7. Risultati generati dall'AI e sistemi AI per i clienti",
        "en": "7. AI-generated output and AI systems for clients"
      },
      "body": [
        {
          "text": {
            "it": "I sistemi basati su AI producono risultati probabilistici: possono contenere errori e vanno verificati prima di usarli per decisioni rilevanti. Progettiamo e testiamo le soluzioni con cura professionale, ma non garantiamo risultati economici o di business specifici, salvo che siano espressamente indicati nel preventivo. Il cliente resta responsabile dell'uso che fa dei risultati e del rispetto delle norme applicabili alla propria attività.",
            "en": "AI-based systems produce probabilistic output: it may contain errors and should be checked before being used for significant decisions. We design and test our solutions with professional care, but we do not guarantee specific financial or business results unless expressly stated in the quote. The client remains responsible for how it uses the output and for complying with the rules that apply to its business."
          }
        },
        {
          "text": {
            "it": "Quando realizziamo per il cliente un chatbot, un agente o un altro sistema di AI, lo configuriamo in modo che gli utenti siano informati che stanno interagendo con un sistema di AI (art. 50 Regolamento (UE) 2024/1689, AI Act). Il cliente che usa il sistema nella propria attività è responsabile di mantenere tale informativa, dei contenuti e dei dati che vi inserisce, di un'adeguata supervisione umana, dell'alfabetizzazione in materia di AI del proprio personale (art. 4 AI Act) e di non usare il sistema per pratiche vietate o per usi ad alto rischio (art. 5 e allegato III AI Act) senza uno specifico accordo scritto con noi.",
            "en": "When we build a chatbot, agent or other AI system for a client, we configure it so that users are informed that they are interacting with an AI system (art. 50 of Regulation (EU) 2024/1689, the AI Act). The client using the system in its business is responsible for keeping that disclosure in place, for the content and data it enters, for appropriate human oversight, for the AI literacy of its staff (art. 4 AI Act) and for not using the system for prohibited practices or high-risk uses (art. 5 and Annex III AI Act) without a specific written agreement with us."
          }
        },
        {
          "text": {
            "it": "Nello svolgere i servizi possiamo usare strumenti di AI, ad esempio assistenti alla programmazione e modelli linguistici: su richiesta indichiamo quali (art. 13 L. 132/2025). Per i clienti consumatori restano salve le garanzie legali di conformità previste dal Codice del Consumo, incluse quelle per contenuti e servizi digitali (artt. 135-octies e seguenti).",
            "en": "In performing our services we may use AI tools, for example coding assistants and language models: on request we tell you which ones (art. 13 of Italian Law 132/2025). Consumer clients keep the legal guarantees of conformity under the Italian Consumer Code, including those for digital content and digital services (arts. 135-octies et seq.)."
          }
        }
      ]
    },
    {
      "heading": {
        "it": "8. Proprietà intellettuale",
        "en": "8. Intellectual property"
      },
      "body": [
        {
          "text": {
            "it": "I contenuti del sito (testi, grafica, marchio flylabs.ai, codice) sono nostri o dei rispettivi titolari e non possono essere copiati o riutilizzati senza autorizzazione, salvo dove indicato diversamente (ad esempio progetti open source pubblicati con una licenza).",
            "en": "Site content (text, graphics, the flylabs.ai brand, code) belongs to us or to the respective owners and may not be copied or reused without permission, unless stated otherwise (for example open source projects released under a licence)."
          }
        },
        {
          "text": {
            "it": "Salvo diverso accordo nel preventivo, con il pagamento integrale del corrispettivo cediamo al cliente i diritti di utilizzazione economica, nella misura in cui sussistono, sui deliverable sviluppati su misura per lui (codice sorgente, configurazioni, contenuti). Fino al saldo il cliente può usarli solo per test e verifica. Restano nostri gli strumenti, i componenti, le librerie, i modelli di prompt e il know-how preesistenti o di uso generale, che concediamo al cliente in licenza non esclusiva, gratuita e a tempo indeterminato, limitata all'uso del deliverable. I componenti open source e i servizi di terzi restano soggetti alle rispettive licenze e termini.",
            "en": "Unless otherwise agreed in the quote, upon full payment we assign to the client the economic exploitation rights, to the extent they exist, in the deliverables custom-built for it (source code, configurations, content). Until full payment the client may use them for testing and review only. Our pre-existing or general-purpose tools, components, libraries, prompt templates and know-how remain ours; we grant the client a non-exclusive, royalty-free, perpetual licence to them, limited to the use of the deliverable. Open source components and third-party services remain subject to their respective licences and terms."
          }
        },
        {
          "text": {
            "it": "Il cliente garantisce di avere i diritti sui materiali, dati e contenuti che ci fornisce; il cliente business ci tiene indenni da pretese di terzi relative ad essi. Possiamo citare il cliente e descrivere il progetto nel nostro portfolio solo con il suo consenso.",
            "en": "The client warrants that it holds the rights to the materials, data and content it provides to us; business clients indemnify us against third-party claims relating to them. We may name the client and describe the project in our portfolio only with the client's consent."
          }
        }
      ]
    },
    {
      "heading": {
        "it": "9. Riservatezza e dati personali",
        "en": "9. Confidentiality and personal data"
      },
      "body": [
        {
          "text": {
            "it": "Trattiamo come riservate le informazioni non pubbliche del cliente ricevute per il progetto, le usiamo solo per eseguirlo e le condividiamo solo con chi collabora al progetto e con i fornitori necessari, vincolati a obblighi equivalenti. L'obbligo dura per tutto il rapporto e per 3 anni dalla sua fine e non riguarda le informazioni già pubbliche o che dobbiamo comunicare per legge o per ordine di un'autorità. Su richiesta firmiamo un accordo di riservatezza (NDA) specifico.",
            "en": "We treat the client's non-public information received for the project as confidential, use it only to carry out the project and share it only with those working on the project and with necessary providers bound by equivalent obligations. This obligation lasts for the whole relationship and for 3 years after it ends and does not cover information that is already public or that we must disclose by law or by order of an authority. On request we sign a specific non-disclosure agreement (NDA)."
          }
        },
        {
          "text": {
            "it": "Quando, per eseguire il servizio, trattiamo dati personali per conto del cliente (ad esempio le conversazioni del suo chatbot o i dati dei suoi clienti), agiamo come responsabili del trattamento e sottoscriviamo con il cliente un accordo ai sensi dell'art. 28 GDPR, che indica anche i sub-responsabili usati.",
            "en": "Where, to perform the service, we process personal data on the client's behalf (for example its chatbot conversations or its customers' data), we act as processor and sign with the client an agreement under art. 28 GDPR, which also lists the sub-processors used."
          }
        }
      ]
    },
    {
      "heading": {
        "it": "10. Limitazione di responsabilità",
        "en": "10. Limitation of liability"
      },
      "body": [
        {
          "text": {
            "it": "Questa sezione si applica ai soli clienti business. Salvi i casi di dolo o colpa grave, i danni alla persona e la violazione di obblighi derivanti da norme di ordine pubblico (art. 1229 c.c.), la nostra responsabilità complessiva per ciascun contratto è limitata al corrispettivo pagato dal cliente per quel contratto e, per i servizi ricorrenti, ai corrispettivi pagati nei 12 mesi precedenti il fatto che ha causato il danno. Non rispondiamo di danni indiretti o consequenziali, come mancato guadagno, perdita di opportunità o di avviamento, né di malfunzionamenti dei servizi di terzi indicati nella sezione 5 che non dipendano da nostra colpa. Il cliente è responsabile di conservare copie di backup dei propri dati.",
            "en": "This section applies to business clients only. Except in cases of wilful misconduct or gross negligence, personal injury and breach of obligations arising from public policy rules (art. 1229 of the Italian Civil Code), our total liability for each contract is limited to the fees paid by the client under that contract and, for recurring services, to the fees paid in the 12 months before the event giving rise to the damage. We are not liable for indirect or consequential damages, such as loss of profit, opportunity or goodwill, nor for failures of the third-party services referred to in section 5 that are not due to our fault. The client is responsible for keeping backup copies of its data."
          }
        },
        {
          "text": {
            "it": "Nei confronti dei clienti consumatori rispondiamo secondo la legge, senza limitazioni contrattuali.",
            "en": "Towards consumer clients we are liable as provided by law, without contractual limitations."
          }
        }
      ]
    },
    {
      "heading": {
        "it": "11. Link a siti terzi",
        "en": "11. Third-party links"
      },
      "body": [
        {
          "text": {
            "it": "Il sito può contenere link a siti o servizi di terzi, di cui non siamo responsabili.",
            "en": "The site may contain links to third-party sites or services, for which we are not responsible."
          }
        }
      ]
    },
    {
      "heading": {
        "it": "12. Privacy e cookie",
        "en": "12. Privacy and cookies"
      },
      "body": [
        {
          "text": {
            "it": "Il trattamento dei dati personali è descritto nella Privacy Policy e nella Cookie Policy.",
            "en": "The processing of personal data is described in the Privacy Policy and the Cookie Policy."
          }
        }
      ]
    },
    {
      "heading": {
        "it": "13. Modifiche e disposizioni finali",
        "en": "13. Changes and final provisions"
      },
      "body": [
        {
          "text": {
            "it": "Possiamo aggiornare questi termini nel tempo. La versione vigente è sempre pubblicata su questa pagina con la data di ultimo aggiornamento; ai contratti si applica la versione richiamata nel preventivo accettato e le modifiche successive non li riguardano senza accordo scritto del cliente.",
            "en": "We may update these terms over time. The current version is always published on this page with the date of the latest update; contracts are governed by the version referred to in the accepted quote, and later changes do not apply to them without the client's written agreement."
          }
        },
        {
          "label": {
            "it": "Forza maggiore.",
            "en": "Force majeure."
          },
          "text": {
            "it": "Nessuna parte è responsabile di ritardi o inadempimenti dovuti a eventi fuori dal suo ragionevole controllo (ad esempio calamità, interruzioni prolungate di servizi di terzi, provvedimenti delle autorità), purché ne dia pronto avviso; i tempi si spostano per la durata dell'evento. Se l'evento dura più di 60 giorni, ciascuna parte può recedere dal contratto con pagamento o rimborso delle attività svolte fino a quel momento.",
            "en": "Neither party is liable for delays or failures caused by events beyond its reasonable control (for example natural disasters, prolonged outages of third-party services, orders of public authorities), provided it gives prompt notice; timelines shift for the duration of the event. If the event lasts more than 60 days, either party may terminate the contract, with payment or refund for the work performed up to that point."
          }
        },
        {
          "label": {
            "it": "Comunicazioni.",
            "en": "Notices."
          },
          "text": {
            "it": "Le comunicazioni relative al contratto si fanno per iscritto agli indirizzi email indicati nel preventivo; per noi info@flylabs.ai.",
            "en": "Notices relating to the contract are given in writing to the email addresses stated in the quote; for us, info@flylabs.ai."
          }
        },
        {
          "label": {
            "it": "Collaboratori e cessione.",
            "en": "Subcontractors and assignment."
          },
          "text": {
            "it": "Possiamo avvalerci di collaboratori e fornitori per eseguire i servizi, restando responsabili verso il cliente. Nessuna parte può cedere il contratto senza il consenso scritto dell'altra.",
            "en": "We may use collaborators and providers to perform the services, remaining responsible to the client. Neither party may assign the contract without the other's written consent."
          }
        },
        {
          "label": {
            "it": "Invalidità parziale.",
            "en": "Severability."
          },
          "text": {
            "it": "Se una clausola è nulla o inefficace, le altre restano valide e la clausola è sostituita dalla norma di legge applicabile.",
            "en": "If a clause is void or unenforceable, the others remain valid and that clause is replaced by the applicable statutory rule."
          }
        },
        {
          "label": {
            "it": "Lingua.",
            "en": "Language."
          },
          "text": {
            "it": "Questi termini sono redatti in italiano e in inglese. In caso di contrasto prevale la versione italiana; nei confronti dei consumatori, nel dubbio prevale l'interpretazione più favorevole al consumatore (art. 35 Codice del Consumo).",
            "en": "These terms are drafted in Italian and English. In case of conflict the Italian version prevails; towards consumers, in case of doubt the interpretation most favourable to the consumer prevails (art. 35 of the Italian Consumer Code)."
          }
        }
      ]
    },
    {
      "heading": {
        "it": "14. Legge applicabile e foro",
        "en": "14. Governing law and jurisdiction"
      },
      "body": [
        {
          "text": {
            "it": "Questi termini e i contratti sono regolati dalla legge italiana. Per le controversie con clienti business è competente in via esclusiva il Foro di Milano. Per i clienti consumatori è competente in via inderogabile il giudice del luogo di residenza o domicilio del consumatore (art. 66-bis Codice del Consumo); al consumatore residente in un altro paese la scelta della legge italiana non toglie la protezione delle norme inderogabili del suo paese (art. 6 Reg. (CE) 593/2008).",
            "en": "These terms and the contracts are governed by Italian law. For disputes with business clients, the courts of Milan have exclusive jurisdiction. For consumer clients, the court of the consumer's place of residence or domicile has mandatory jurisdiction (art. 66-bis of the Italian Consumer Code); for consumers resident in another country, the choice of Italian law does not deprive them of the protection of the mandatory rules of their country (art. 6 of Regulation (EC) 593/2008)."
          }
        },
        {
          "text": {
            "it": "Se un reclamo non si risolve, ti indichiamo su supporto durevole l'organismo di risoluzione alternativa delle controversie (ADR) competente e se intendiamo ricorrervi (art. 141-sexies Codice del Consumo); resta salvo il ricorso al giudice.",
            "en": "If a complaint is not resolved, we will tell you on a durable medium which alternative dispute resolution (ADR) body is competent and whether we intend to use it (art. 141-sexies of the Italian Consumer Code); your right to go to court is unaffected."
          }
        }
      ]
    },
    {
      "heading": {
        "it": "15. Contatti e assistenza clienti",
        "en": "15. Contact and customer service"
      },
      "body": [
        {
          "text": {
            "it": "Per domande su questi termini, sui servizi o sui pagamenti scrivi a info@flylabs.ai: rispondiamo entro 5 giorni lavorativi. Il professionista che presta il servizio, con il suo indirizzo e recapito telefonico, è indicato nel preventivo e in fattura.",
            "en": "For questions about these terms, our services or payments, write to info@flylabs.ai: we reply within 5 business days. The professional providing the service, with their address and telephone number, is stated in the quote and on the invoice."
          }
        }
      ]
    }
  ],
  "withdrawalForm": {
    "title": {
      "it": "Modulo di recesso tipo",
      "en": "Model withdrawal form"
    },
    "note": {
      "it": "Compilare e restituire il presente modulo solo se si desidera recedere dal contratto.",
      "en": "Complete and return this form only if you wish to withdraw from the contract."
    },
    "lines": [
      {
        "it": "Destinatario: il professionista indicato nel preventivo (nome e indirizzo come da preventivo), info@flylabs.ai",
        "en": "To: the professional named in the quote (name and address as stated in the quote), info@flylabs.ai"
      },
      {
        "it": "Con la presente io/noi (*) notifico/notifichiamo (*) il recesso dal mio/nostro (*) contratto per la prestazione dei seguenti servizi: ________",
        "en": "I/We (*) hereby give notice that I/We (*) withdraw from my/our (*) contract for the provision of the following service: ________"
      },
      {
        "it": "Ordinato il (*) / ricevuto il (*): ________",
        "en": "Ordered on (*) / received on (*): ________"
      },
      {
        "it": "Nome del/dei consumatore/i: ________",
        "en": "Name of consumer(s): ________"
      },
      {
        "it": "Indirizzo del/dei consumatore/i: ________",
        "en": "Address of consumer(s): ________"
      },
      {
        "it": "Firma del/dei consumatore/i (solo se il presente modulo è notificato in versione cartacea): ________",
        "en": "Signature of consumer(s) (only if this form is notified on paper): ________"
      },
      {
        "it": "Data: ________",
        "en": "Date: ________"
      },
      {
        "it": "(*) Cancellare la dicitura inutile.",
        "en": "(*) Delete as appropriate."
      }
    ]
  }
};

