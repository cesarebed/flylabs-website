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
    },
    "es": {
      "title": "Términos del servicio | flylabs.ai",
      "description": "Términos de uso del sitio flylabs.ai y condiciones generales de nuestros servicios: pagos, reembolsos, desistimiento y asistencia."
    },
    "fr": {
      "title": "Conditions générales | flylabs.ai",
      "description": "Conditions d'utilisation du site flylabs.ai et conditions générales de nos services : paiements, remboursements, rétractation et assistance."
    }
  },
  "title": {
    "it": "Termini di servizio",
    "en": "Terms of Service",
    "es": "Términos del servicio",
    "fr": "Conditions générales"
  },
  "updated": {
    "it": "Ultimo aggiornamento: 9 ottobre 2026",
    "en": "Last updated: 9 October 2026",
    "es": "Última actualización: 9 de octubre de 2026",
    "fr": "Dernière mise à jour : 9 octobre 2026"
  },
  "intro": {
    "it": "Questi termini regolano l'uso del sito e i servizi di flylabs.ai. Leggili insieme al preventivo, che per ogni progetto definisce perimetro, prezzi e tempi.",
    "en": "These terms govern the use of the site and the services of flylabs.ai. Read them together with the quote, which sets out scope, prices and timelines for each project.",
    "es": "Estos términos regulan el uso del sitio y los servicios de flylabs.ai. Léelos junto con el presupuesto, que fija alcance, precios y plazos de cada proyecto.",
    "fr": "Ces conditions régissent l'utilisation du site et les services de flylabs.ai. Lisez-les avec le devis, qui fixe le périmètre, les prix et les délais de chaque projet."
  },
  "sections": [
    {
      "heading": {
        "it": "1. Chi siamo",
        "en": "1. Who we are",
        "es": "1. Quiénes somos",
        "fr": "1. Qui sommes-nous"
      },
      "body": [
        {
          "text": {
            "it": "flylabs.ai è il marchio con cui offrono i propri servizi due professionisti indipendenti: Cesare Bedin (ditta individuale, P.IVA IT05755090288) e Federico De Cillia (ditta individuale, P.IVA IT13990330964). flylabs.ai non è una società.",
            "en": "flylabs.ai is the brand under which two independent professionals offer their services: Cesare Bedin (sole trader, VAT no. IT05755090288) and Federico De Cillia (sole trader, VAT no. IT13990330964). flylabs.ai is not a company.",
            "es": "flylabs.ai es la marca con la que dos profesionales independientes ofrecen sus servicios: Cesare Bedin (empresario individual, IVA IT05755090288) y Federico De Cillia (empresario individual, IVA IT13990330964). flylabs.ai no es una sociedad.",
            "fr": "flylabs.ai est la marque sous laquelle deux professionnels indépendants proposent leurs services : Cesare Bedin (entrepreneur individuel, TVA IT05755090288) et Federico De Cillia (entrepreneur individuel, TVA IT13990330964). flylabs.ai n'est pas une société."
          }
        },
        {
          "text": {
            "it": "Il fornitore di ciascun servizio, e quindi la tua controparte contrattuale, è il professionista indicato nel preventivo, che emette la fattura e incassa il pagamento, anche quando il pagamento avviene con carta tramite Stripe. L'altro professionista può collaborare al progetto come subfornitore senza diventare parte del contratto, salvo che il preventivo indichi espressamente entrambi e le attività di ciascuno. Nel testo \"flylabs\" o \"noi\" indica il professionista indicato nel preventivo o, per l'uso del sito, entrambi.",
            "en": "The provider of each service, and therefore your contractual counterparty, is the professional named in the quote, who issues the invoice and collects the payment, including when payment is made by card via Stripe. The other professional may work on the project as a subcontractor without becoming a party to the contract, unless the quote expressly names both and the activities of each. In these terms \"flylabs\" or \"we\" means the professional named in the quote or, for the use of the site, both.",
            "es": "El prestador de cada servicio, y por tanto tu contraparte contractual, es el profesional indicado en el presupuesto, que emite la factura y cobra el pago, también cuando se paga con tarjeta a través de Stripe. El otro profesional puede trabajar en el proyecto como subcontratista sin convertirse en parte del contrato, salvo que el presupuesto indique expresamente a ambos y las actividades de cada uno. En estos términos, \"flylabs\" o \"nosotros\" significa el profesional indicado en el presupuesto o, para el uso del sitio, ambos.",
            "fr": "Le prestataire de chaque service, et donc votre cocontractant, est le professionnel indiqué dans le devis, qui émet la facture et encaisse le paiement, y compris lorsque le paiement se fait par carte via Stripe. L'autre professionnel peut intervenir sur le projet en tant que sous-traitant sans devenir partie au contrat, sauf si le devis les désigne expressément tous les deux, avec les activités de chacun. Dans ces conditions, \"flylabs\" ou \"nous\" désigne le professionnel indiqué dans le devis ou, pour l'utilisation du site, les deux."
          }
        },
        {
          "text": {
            "it": "L'indirizzo geografico e il recapito telefonico del professionista sono indicati nel preventivo e in fattura. Contatti: info@flylabs.ai.",
            "en": "The professional's geographical address and telephone number are stated in the quote and on the invoice. Contact: info@flylabs.ai.",
            "es": "La dirección geográfica y el teléfono del profesional figuran en el presupuesto y en la factura. Contacto: info@flylabs.ai.",
            "fr": "L'adresse géographique et le numéro de téléphone du professionnel figurent sur le devis et sur la facture. Contact : info@flylabs.ai."
          }
        }
      ]
    },
    {
      "heading": {
        "it": "2. Ambito",
        "en": "2. Scope",
        "es": "2. Ámbito",
        "fr": "2. Champ d'application"
      },
      "body": [
        {
          "text": {
            "it": "Questi termini regolano l'uso del sito www.flylabs.ai (incluso l'assistente AI) e, in via generale, i servizi professionali che offriamo: chatbot e agenti AI, automazioni e integrazioni, sviluppo di software e web app su misura, consulenza AI. Ogni progetto è regolato anche dal preventivo accettato dal cliente, che prevale su questi termini in caso di differenze.",
            "en": "These terms govern the use of the website www.flylabs.ai (including the AI assistant) and, in general, the professional services we offer: AI chatbots and agents, automation and integrations, custom software and web app development, AI consulting. Each project is also governed by the quote accepted by the client, which prevails over these terms in case of differences.",
            "es": "Estos términos regulan el uso del sitio web www.flylabs.ai (incluido el asistente IA) y, en general, los servicios profesionales que ofrecemos: chatbots y agentes de IA, automatización e integraciones, desarrollo de software y web apps a medida, consultoría en IA. Cada proyecto se rige además por el presupuesto aceptado por el cliente, que prevalece sobre estos términos en caso de diferencias.",
            "fr": "Ces conditions régissent l'utilisation du site www.flylabs.ai (y compris l'assistant IA) et, de manière générale, les services professionnels que nous proposons : chatbots et agents IA, automatisation et intégrations, développement de logiciels et d'applications web sur mesure, conseil en IA. Chaque projet est en outre régi par le devis accepté par le client, qui prévaut sur ces conditions en cas de différence."
          }
        },
        {
          "text": {
            "it": "Per i servizi acquistati tramite piattaforme terze (ad esempio Fiverr o Upwork) prevalgono i termini della piattaforma, inclusi quelli su pagamenti, rimborsi e contestazioni; questi termini si applicano per quanto compatibili.",
            "en": "For services purchased through third-party platforms (for example Fiverr or Upwork), the platform's terms prevail, including those on payments, refunds and disputes; these terms apply insofar as compatible.",
            "es": "Para los servicios contratados a través de plataformas de terceros (por ejemplo Fiverr o Upwork), prevalecen los términos de la plataforma, incluidos los relativos a pagos, reembolsos y disputas; estos términos se aplican en la medida en que sean compatibles.",
            "fr": "Pour les services achetés via des plateformes tierces (par exemple Fiverr ou Upwork), les conditions de la plateforme prévalent, y compris celles relatives aux paiements, remboursements et litiges ; les présentes conditions s'appliquent dans la mesure où elles sont compatibles."
          }
        },
        {
          "text": {
            "it": "\"Cliente consumatore\" è la persona fisica che agisce per scopi estranei alla propria attività imprenditoriale, commerciale, artigianale o professionale (art. 3 D.Lgs. 206/2005, Codice del Consumo); \"cliente business\" è ogni altro cliente. Le clausole riservate ai clienti business non si applicano ai consumatori.",
            "en": "A \"consumer client\" is a natural person acting for purposes outside their trade, business, craft or profession (art. 3 of Legislative Decree 206/2005, the Italian Consumer Code); a \"business client\" is any other client. Clauses reserved to business clients do not apply to consumers.",
            "es": "Un \"cliente consumidor\" es una persona física que actúa con fines ajenos a su actividad comercial, empresarial, artesanal o profesional (art. 3 del Decreto Legislativo 206/2005, Código del Consumo italiano); un \"cliente empresa\" es cualquier otro cliente. Las cláusulas reservadas a los clientes empresa no se aplican a los consumidores.",
            "fr": "Un \"client consommateur\" est une personne physique agissant à des fins étrangères à son activité commerciale, industrielle, artisanale ou libérale (art. 3 du décret législatif 206/2005, Code de la consommation italien) ; un \"client professionnel\" est tout autre client. Les clauses réservées aux clients professionnels ne s'appliquent pas aux consommateurs."
          }
        }
      ]
    },
    {
      "heading": {
        "it": "3. Uso del sito",
        "en": "3. Use of the site",
        "es": "3. Uso del sitio",
        "fr": "3. Utilisation du site"
      },
      "body": [
        {
          "text": {
            "it": "Puoi usare il sito per informarti sui nostri servizi e contattarci. Non è consentito usarlo in modo illecito, tentare di accedere ad aree o sistemi non pubblici, comprometterne il funzionamento o estrarne contenuti e dati con strumenti automatizzati senza autorizzazione, salvo l'indicizzazione dei motori di ricerca. Il sito è fornito \"così com'è\": cerchiamo di mantenerlo aggiornato e disponibile, ma non garantiamo che sia privo di errori o sempre raggiungibile.",
            "en": "You may use the site to learn about our services and contact us. You may not use it unlawfully, attempt to access non-public areas or systems, disrupt its operation or extract content and data by automated means without permission, except for search engine indexing. The site is provided \"as is\": we strive to keep it up to date and available, but we do not guarantee that it is error-free or always reachable.",
            "es": "Puedes usar el sitio para conocer nuestros servicios y contactarnos. No puedes usarlo de forma ilícita, intentar acceder a áreas o sistemas no públicos, alterar su funcionamiento ni extraer contenidos y datos por medios automatizados sin permiso, salvo la indexación de los motores de búsqueda. El sitio se ofrece \"tal cual\": nos esforzamos por mantenerlo actualizado y disponible, pero no garantizamos que esté libre de errores ni que sea siempre accesible.",
            "fr": "Vous pouvez utiliser le site pour découvrir nos services et nous contacter. Vous ne pouvez pas l'utiliser de manière illicite, tenter d'accéder à des zones ou systèmes non publics, perturber son fonctionnement ni en extraire des contenus et des données par des moyens automatisés sans autorisation, sauf pour l'indexation par les moteurs de recherche. Le site est fourni \"en l'état\" : nous nous efforçons de le maintenir à jour et disponible, mais ne garantissons pas qu'il soit exempt d'erreurs ni toujours accessible."
          }
        }
      ]
    },
    {
      "heading": {
        "it": "4. Assistente AI",
        "en": "4. AI assistant",
        "es": "4. Asistente IA",
        "fr": "4. Assistant IA"
      },
      "body": [
        {
          "text": {
            "it": "L'assistente del sito è un sistema di intelligenza artificiale, non una persona: risponde con testi generati da un modello linguistico, a scopo informativo e di primo contatto, e si attiva solo se lo apri e acconsenti. Le risposte possono essere incomplete o inesatte e non costituiscono un'offerta vincolante né una consulenza professionale: prezzi, tempi e condizioni sono quelli del preventivo.",
            "en": "The site's assistant is an artificial intelligence system, not a person: it replies with text generated by a language model, for informational and first-contact purposes, and activates only if you open it and consent. Answers may be incomplete or inaccurate and are neither a binding offer nor professional advice: prices, timelines and conditions are those in the quote.",
            "es": "El asistente del sitio es un sistema de inteligencia artificial, no una persona: responde con textos generados por un modelo de lenguaje, con fines informativos y de primer contacto, y solo se activa si lo abres y das tu consentimiento. Las respuestas pueden ser incompletas o inexactas y no constituyen una oferta vinculante ni asesoramiento profesional: precios, plazos y condiciones son los del presupuesto.",
            "fr": "L'assistant du site est un système d'intelligence artificielle, pas une personne : il répond avec des textes générés par un modèle de langage, à des fins d'information et de premier contact, et ne s'active que si vous l'ouvrez et y consentez. Les réponses peuvent être incomplètes ou inexactes et ne constituent ni une offre ferme ni un conseil professionnel : les prix, délais et conditions sont ceux du devis."
          }
        },
        {
          "text": {
            "it": "Non inserire nella chat dati sensibili, riservati o di terzi. Per parlare con una persona scrivi a info@flylabs.ai. Piattaforma usata, conservazione e trattamento dei dati sono descritti nella Privacy Policy.",
            "en": "Do not enter sensitive, confidential or third-party data in the chat. To talk to a person, write to info@flylabs.ai. The platform used, retention and data processing are described in the Privacy Policy.",
            "es": "No introduzcas datos sensibles, confidenciales o de terceros en el chat. Para hablar con una persona, escribe a info@flylabs.ai. La plataforma utilizada, la conservación y el tratamiento de los datos se describen en la Política de privacidad.",
            "fr": "Ne saisissez pas de données sensibles, confidentielles ou de tiers dans le chat. Pour parler à une personne, écrivez à info@flylabs.ai. La plateforme utilisée, la conservation et le traitement des données sont décrits dans la Politique de confidentialité."
          }
        }
      ]
    },
    {
      "heading": {
        "it": "5. Servizi professionali",
        "en": "5. Professional services",
        "es": "5. Servicios profesionales",
        "fr": "5. Services professionnels"
      },
      "body": [
        {
          "label": {
            "it": "Offerta e accettazione.",
            "en": "Offer and acceptance.",
            "es": "Oferta y aceptación.",
            "fr": "Offre et acceptation."
          },
          "text": {
            "it": "Il perimetro, i prezzi, i tempi e le modalità di pagamento di ogni progetto sono definiti nel preventivo, valido per il periodo in esso indicato. Il contratto si conclude quando il cliente accetta il preventivo per iscritto (firma, anche elettronica, email o piattaforma). Il contratto è composto dal preventivo accettato, da questi termini nella versione richiamata nel preventivo e dagli eventuali allegati; in caso di contrasto prevale il preventivo. Al cliente consumatore inviamo conferma del contratto su supporto durevole, ad esempio email con PDF.",
            "en": "Scope, prices, timelines and payment terms of each project are set out in the quote, which is valid for the period stated in it. The contract is concluded when the client accepts the quote in writing (signature, including electronic, email or platform). The contract consists of the accepted quote, these terms in the version referred to in the quote and any annexes; in case of conflict the quote prevails. Consumer clients receive confirmation of the contract on a durable medium, for example an email with a PDF.",
            "es": "Alcance, precios, plazos y condiciones de pago de cada proyecto se indican en el presupuesto, válido durante el periodo que en él se indica. El contrato se celebra cuando el cliente acepta el presupuesto por escrito (firma, también electrónica, email o plataforma). El contrato está formado por el presupuesto aceptado, estos términos en la versión indicada en el presupuesto y los posibles anexos; en caso de conflicto prevalece el presupuesto. Los clientes consumidores reciben la confirmación del contrato en un soporte duradero, por ejemplo un email con un PDF.",
            "fr": "Le périmètre, les prix, les délais et les conditions de paiement de chaque projet figurent dans le devis, valable pendant la durée qui y est indiquée. Le contrat est conclu lorsque le client accepte le devis par écrit (signature, y compris électronique, e-mail ou plateforme). Le contrat se compose du devis accepté, des présentes conditions dans la version indiquée dans le devis et des éventuelles annexes ; en cas de conflit, le devis prévaut. Les clients consommateurs reçoivent la confirmation du contrat sur un support durable, par exemple un e-mail avec un PDF."
          }
        },
        {
          "label": {
            "it": "Collaborazione del cliente.",
            "en": "Client cooperation.",
            "es": "Colaboración del cliente.",
            "fr": "Collaboration du client."
          },
          "text": {
            "it": "Il cliente fornisce in tempo utile informazioni, accessi e materiali necessari e garantisce di averne il diritto. Ritardi o informazioni errate possono spostare i tempi concordati.",
            "en": "The client provides the necessary information, access and materials in good time and warrants that it has the right to do so. Delays or incorrect information may shift the agreed timelines.",
            "es": "El cliente facilita a tiempo la información, los accesos y los materiales necesarios y garantiza que tiene derecho a hacerlo. Los retrasos o la información incorrecta pueden desplazar los plazos acordados.",
            "fr": "Le client fournit en temps utile les informations, accès et éléments nécessaires et garantit qu'il a le droit de le faire. Des retards ou des informations inexactes peuvent décaler les délais convenus."
          }
        },
        {
          "label": {
            "it": "Modifiche.",
            "en": "Changes.",
            "es": "Cambios.",
            "fr": "Modifications."
          },
          "text": {
            "it": "Le richieste fuori dal perimetro del preventivo vengono stimate e concordate a parte.",
            "en": "Requests outside the scope of the quote are estimated and agreed separately.",
            "es": "Las peticiones fuera del alcance del presupuesto se estiman y se acuerdan por separado.",
            "fr": "Les demandes hors du périmètre du devis sont chiffrées et convenues séparément."
          }
        },
        {
          "label": {
            "it": "Pagamenti.",
            "en": "Payments.",
            "es": "Pagos.",
            "fr": "Paiements."
          },
          "text": {
            "it": "Termini e scadenze come da preventivo (vedi anche la sezione 6). Se una somma scaduta non viene pagata, possiamo sospendere le attività ai sensi dell'art. 1460 c.c., con avviso scritto di almeno 7 giorni, fino al pagamento; i tempi di consegna si spostano di conseguenza. Ai clienti business si applicano gli interessi di mora previsti dal D.Lgs. 231/2002.",
            "en": "Terms and due dates as per the quote (see also section 6). If an amount due is not paid, we may suspend work under art. 1460 of the Italian Civil Code, with at least 7 days' written notice, until payment; delivery timelines shift accordingly. Business clients are charged late-payment interest under Legislative Decree 231/2002.",
            "es": "Condiciones y vencimientos según el presupuesto (ver también la sección 6). Si un importe debido no se paga, podemos suspender el trabajo conforme al art. 1460 del Código Civil italiano, con un preaviso por escrito de al menos 7 días, hasta el pago; los plazos de entrega se desplazan en consecuencia. A los clientes empresa se les aplican intereses de demora conforme al Decreto Legislativo 231/2002.",
            "fr": "Modalités et échéances selon le devis (voir aussi la section 6). Si un montant dû n'est pas payé, nous pouvons suspendre les travaux en application de l'art. 1460 du Code civil italien, avec un préavis écrit d'au moins 7 jours, jusqu'au paiement ; les délais de livraison sont décalés d'autant. Des intérêts de retard au sens du décret législatif 231/2002 sont appliqués aux clients professionnels."
          }
        },
        {
          "label": {
            "it": "Servizi di terzi.",
            "en": "Third-party services.",
            "es": "Servicios de terceros.",
            "fr": "Services de tiers."
          },
          "text": {
            "it": "Molte soluzioni usano servizi di terzi (ad esempio fornitori di modelli AI, hosting, API). Il loro funzionamento, i prezzi e i termini dipendono da quei fornitori; eventuali costi di licenza o consumo sono a carico del cliente salvo diverso accordo.",
            "en": "Many solutions rely on third-party services (for example AI model providers, hosting, APIs). Their operation, pricing and terms depend on those providers; any licence or usage costs are borne by the client unless agreed otherwise.",
            "es": "Muchas soluciones se apoyan en servicios de terceros (por ejemplo proveedores de modelos de IA, alojamiento, API). Su funcionamiento, precios y condiciones dependen de esos proveedores; los posibles costes de licencia o de uso corren a cargo del cliente, salvo acuerdo distinto.",
            "fr": "De nombreuses solutions reposent sur des services de tiers (par exemple fournisseurs de modèles d'IA, hébergement, API). Leur fonctionnement, leurs prix et leurs conditions dépendent de ces fournisseurs ; les éventuels coûts de licence ou d'utilisation sont à la charge du client, sauf accord contraire."
          }
        }
      ]
    },
    {
      "heading": {
        "it": "6. Pagamenti, rimborsi e cancellazione",
        "en": "6. Payments, refunds and cancellation",
        "es": "6. Pagos, reembolsos y cancelación",
        "fr": "6. Paiements, remboursements et annulation"
      },
      "body": [
        {
          "label": {
            "it": "Prezzi e pagamento.",
            "en": "Prices and payment.",
            "es": "Precios y pago.",
            "fr": "Prix et paiement."
          },
          "text": {
            "it": "I prezzi sono indicati in euro (EUR) nel preventivo. Per i clienti business sono al netto dell'IVA, se dovuta; per i clienti consumatori il preventivo indica il prezzo finale comprensivo di imposte e di ogni altro onere. Il pagamento avviene con i metodi indicati nel preventivo: carta tramite Stripe o bonifico bancario. I dati della carta sono trattati direttamente da Stripe, certificato PCI DSS: noi non li riceviamo né li conserviamo.",
            "en": "Prices are stated in euros (EUR) in the quote. For business clients they are exclusive of VAT, where due; for consumer clients the quote states the final price including taxes and all other charges. Payment is made using the methods stated in the quote: card via Stripe or bank transfer. Card data is processed directly by Stripe, which is PCI DSS certified: we neither receive nor store it.",
            "es": "Los precios se indican en euros (EUR) en el presupuesto. Para los clientes empresa no incluyen el IVA, cuando corresponda; para los clientes consumidores el presupuesto indica el precio final con impuestos y cualquier otro cargo incluido. El pago se realiza con los medios indicados en el presupuesto: tarjeta a través de Stripe o transferencia bancaria. Los datos de la tarjeta los trata directamente Stripe, con certificación PCI DSS: nosotros no los recibimos ni los conservamos.",
            "fr": "Les prix sont indiqués en euros (EUR) dans le devis. Pour les clients professionnels, ils s'entendent hors TVA, lorsqu'elle est due ; pour les clients consommateurs, le devis indique le prix final, taxes et tous autres frais compris. Le paiement s'effectue selon les moyens indiqués dans le devis : carte via Stripe ou virement bancaire. Les données de carte sont traitées directement par Stripe, certifié PCI DSS : nous ne les recevons ni ne les conservons."
          }
        },
        {
          "label": {
            "it": "Annullamento e rimborsi.",
            "en": "Cancellation and refunds.",
            "es": "Cancelación y reembolsos.",
            "fr": "Annulation et remboursements."
          },
          "text": {
            "it": "Se il progetto viene annullato prima dell'inizio dei lavori, da noi o dal cliente, rimborsiamo per intero le somme versate. Se il cliente business recede dopo l'inizio dei lavori (artt. 2227 e 2237 c.c.), paga le attività svolte fino alla data del recesso e i costi di terzi già sostenuti e non recuperabili, e rimborsiamo l'eventuale eccedenza. Se annulliamo noi un progetto per motivi non imputabili al cliente, rimborsiamo le somme relative alle attività non svolte. I rimborsi avvengono con lo stesso metodo di pagamento usato, salvo diverso accordo, entro 14 giorni dalla comunicazione di annullamento.",
            "en": "If the project is cancelled before work begins, by us or by the client, we refund all amounts paid in full. If a business client withdraws after work has begun (arts. 2227 and 2237 of the Italian Civil Code), it pays for the work performed up to the withdrawal date and for third-party costs already incurred and not recoverable, and we refund any excess. If we cancel a project for reasons not attributable to the client, we refund the amounts relating to work not performed. Refunds are issued to the original payment method, unless agreed otherwise, within 14 days of the cancellation notice.",
            "es": "Si el proyecto se cancela antes de empezar el trabajo, por nuestra parte o por la del cliente, reembolsamos íntegramente las cantidades pagadas. Si un cliente empresa desiste después de iniciado el trabajo (arts. 2227 y 2237 del Código Civil italiano), paga el trabajo realizado hasta la fecha del desistimiento y los costes de terceros ya soportados y no recuperables, y reembolsamos el exceso. Si cancelamos un proyecto por motivos no imputables al cliente, reembolsamos las cantidades correspondientes al trabajo no realizado. Los reembolsos se hacen al medio de pago original, salvo acuerdo distinto, en un plazo de 14 días desde la comunicación de la cancelación.",
            "fr": "Si le projet est annulé avant le début des travaux, par nous ou par le client, nous remboursons intégralement les sommes versées. Si un client professionnel se retire après le début des travaux (art. 2227 et 2237 du Code civil italien), il paie le travail effectué jusqu'à la date du retrait et les frais de tiers déjà engagés et non récupérables, et nous remboursons l'excédent. Si nous annulons un projet pour des raisons non imputables au client, nous remboursons les sommes correspondant au travail non effectué. Les remboursements sont effectués sur le moyen de paiement d'origine, sauf accord contraire, dans les 14 jours suivant la notification de l'annulation."
          }
        },
        {
          "label": {
            "it": "Servizi ricorrenti.",
            "en": "Recurring services.",
            "es": "Servicios recurrentes.",
            "fr": "Services récurrents."
          },
          "text": {
            "it": "Se il preventivo prevede un servizio ricorrente (ad esempio manutenzione, hosting gestito o canone mensile), durata del periodo e rinnovo sono indicati nel preventivo. Il cliente può disdirlo in ogni momento scrivendo a info@flylabs.ai: la disdetta ha effetto alla fine del periodo già pagato, senza ulteriori addebiti e senza rimborsi parziali per il periodo in corso, fermo il diritto di recesso dei consumatori.",
            "en": "If the quote includes a recurring service (for example maintenance, managed hosting or a monthly fee), the billing period and renewal are stated in the quote. The client may cancel at any time by writing to info@flylabs.ai: cancellation takes effect at the end of the period already paid, with no further charges and no partial refunds for the current period, without prejudice to the consumer right of withdrawal.",
            "es": "Si el presupuesto incluye un servicio recurrente (por ejemplo mantenimiento, alojamiento gestionado o una cuota mensual), el periodo de facturación y la renovación se indican en el presupuesto. El cliente puede darse de baja en cualquier momento escribiendo a info@flylabs.ai: la baja surte efecto al final del periodo ya pagado, sin más cargos y sin reembolsos parciales del periodo en curso, sin perjuicio del derecho de desistimiento del consumidor.",
            "fr": "Si le devis comprend un service récurrent (par exemple maintenance, hébergement géré ou abonnement mensuel), la période de facturation et le renouvellement sont indiqués dans le devis. Le client peut résilier à tout moment en écrivant à info@flylabs.ai : la résiliation prend effet à la fin de la période déjà payée, sans frais supplémentaires ni remboursement partiel de la période en cours, sans préjudice du droit de rétractation du consommateur."
          }
        },
        {
          "label": {
            "it": "Diritto di recesso dei consumatori.",
            "en": "Consumer right of withdrawal.",
            "es": "Derecho de desistimiento de los consumidores.",
            "fr": "Droit de rétractation des consommateurs."
          },
          "text": {
            "it": "Il cliente consumatore che conclude il contratto a distanza (ad esempio via email, telefono, videochiamata o online) può recedere senza indicarne il motivo entro 14 giorni dalla conclusione del contratto, inviando prima della scadenza una dichiarazione esplicita a info@flylabs.ai, anche con il modulo in fondo a questa pagina (non obbligatorio). Rimborsiamo tutti i pagamenti ricevuti entro 14 giorni dal giorno in cui riceviamo la comunicazione di recesso, con lo stesso mezzo di pagamento usato e senza costi per il consumatore. Iniziamo i lavori durante il periodo di recesso solo su richiesta espressa del consumatore su supporto durevole; se poi recede, paga un importo proporzionale al servizio prestato fino alla comunicazione del recesso. Il diritto di recesso si perde dopo la completa prestazione del servizio, se l'esecuzione è iniziata con l'accordo espresso del consumatore e con la sua accettazione di perdere il diritto a prestazione completata; per i contenuti digitali forniti senza supporto materiale si perde dall'inizio della fornitura, se il consumatore vi ha acconsentito espressamente accettando di perdere il diritto (artt. 52-59, in particolare art. 59, comma 1, lett. a e o, Codice del Consumo).",
            "en": "A consumer client who concludes the contract at a distance (for example by email, phone, video call or online) may withdraw without giving a reason within 14 days of the conclusion of the contract, by sending an explicit statement to info@flylabs.ai before the deadline, also using the form at the bottom of this page (not mandatory). We refund all payments received within 14 days of the day we receive the withdrawal notice, using the same means of payment and at no cost to the consumer. We start work during the withdrawal period only at the consumer's express request on a durable medium; if the consumer then withdraws, they pay an amount proportionate to the service provided up to the withdrawal notice. The right of withdrawal is lost once the service has been fully performed, if performance began with the consumer's express consent and acknowledgement that they lose the right once the contract is fully performed; for digital content not supplied on a tangible medium it is lost when supply begins, if the consumer expressly consented and acknowledged the loss of the right (arts. 52-59, in particular art. 59(1)(a) and (o), of the Italian Consumer Code).",
            "es": "El cliente consumidor que celebra el contrato a distancia (por ejemplo por email, teléfono, videollamada u online) puede desistir sin indicar el motivo en un plazo de 14 días desde la celebración del contrato, enviando una declaración explícita a info@flylabs.ai antes del vencimiento, también mediante el formulario al final de esta página (no obligatorio). Reembolsamos todos los pagos recibidos en un plazo de 14 días desde el día en que recibimos la comunicación de desistimiento, con el mismo medio de pago y sin coste para el consumidor. Solo empezamos a trabajar durante el periodo de desistimiento a petición expresa del consumidor en un soporte duradero; si después el consumidor desiste, paga un importe proporcional al servicio prestado hasta la comunicación del desistimiento. El derecho de desistimiento se pierde una vez prestado el servicio por completo, si la ejecución comenzó con el consentimiento expreso del consumidor y su reconocimiento de que pierde el derecho una vez ejecutado el contrato; para los contenidos digitales no suministrados en un soporte material se pierde al comenzar el suministro, si el consumidor dio su consentimiento expreso y reconoció la pérdida del derecho (arts. 52-59, en particular art. 59.1.a y o, del Código del Consumo italiano).",
            "fr": "Le client consommateur qui conclut le contrat à distance (par exemple par e-mail, téléphone, visioconférence ou en ligne) peut se rétracter sans donner de motif dans un délai de 14 jours à compter de la conclusion du contrat, en envoyant une déclaration explicite à info@flylabs.ai avant l'échéance, y compris au moyen du formulaire en bas de cette page (non obligatoire). Nous remboursons tous les paiements reçus dans les 14 jours suivant le jour où nous recevons la notification de rétractation, avec le même moyen de paiement et sans frais pour le consommateur. Nous ne commençons les travaux pendant le délai de rétractation qu'à la demande expresse du consommateur sur un support durable ; si le consommateur se rétracte ensuite, il paie un montant proportionnel au service fourni jusqu'à la notification de rétractation. Le droit de rétractation est perdu une fois le service entièrement exécuté, si l'exécution a commencé avec l'accord exprès du consommateur et sa reconnaissance qu'il perd ce droit une fois le contrat entièrement exécuté ; pour les contenus numériques non fournis sur un support matériel, il est perdu au début de la fourniture, si le consommateur y a expressément consenti et a reconnu la perte du droit (art. 52 à 59, en particulier art. 59, paragraphe 1, lettres a et o, du Code de la consommation italien)."
          }
        },
        {
          "label": {
            "it": "Reclami e contestazioni.",
            "en": "Complaints and disputes.",
            "es": "Reclamaciones y disputas.",
            "fr": "Réclamations et contestations."
          },
          "text": {
            "it": "Per qualsiasi problema su un servizio o un pagamento scrivi a info@flylabs.ai indicando il riferimento del preventivo o della fattura: rispondiamo entro 5 giorni lavorativi e cerchiamo una soluzione, incluso il rimborso quando dovuto secondo questa sezione. Ti chiediamo di contattarci prima di aprire una contestazione (chargeback) con la banca o l'emittente della carta; resta salvo il tuo diritto di farlo.",
            "en": "For any issue with a service or a payment, write to info@flylabs.ai quoting the quote or invoice reference: we reply within 5 business days and look for a solution, including a refund where due under this section. Please contact us before opening a dispute (chargeback) with your bank or card issuer; your right to do so is unaffected.",
            "es": "Para cualquier problema con un servicio o un pago, escribe a info@flylabs.ai indicando la referencia del presupuesto o de la factura: respondemos en un plazo de 5 días laborables y buscamos una solución, incluido un reembolso cuando proceda según esta sección. Te pedimos que nos contactes antes de abrir una disputa (contracargo) con tu banco o emisor de la tarjeta; tu derecho a hacerlo no se ve afectado.",
            "fr": "Pour tout problème lié à un service ou à un paiement, écrivez à info@flylabs.ai en indiquant la référence du devis ou de la facture : nous répondons sous 5 jours ouvrés et cherchons une solution, y compris un remboursement lorsqu'il est dû au titre de cette section. Merci de nous contacter avant d'ouvrir une contestation (chargeback) auprès de votre banque ou de l'émetteur de votre carte ; votre droit de le faire n'en est pas affecté."
          }
        }
      ]
    },
    {
      "heading": {
        "it": "7. Risultati generati dall'AI e sistemi AI per i clienti",
        "en": "7. AI-generated output and AI systems for clients",
        "es": "7. Resultados generados por IA y sistemas de IA para los clientes",
        "fr": "7. Résultats générés par l'IA et systèmes d'IA pour les clients"
      },
      "body": [
        {
          "text": {
            "it": "I sistemi basati su AI producono risultati probabilistici: possono contenere errori e vanno verificati prima di usarli per decisioni rilevanti. Progettiamo e testiamo le soluzioni con cura professionale, ma non garantiamo risultati economici o di business specifici, salvo che siano espressamente indicati nel preventivo. Il cliente resta responsabile dell'uso che fa dei risultati e del rispetto delle norme applicabili alla propria attività.",
            "en": "AI-based systems produce probabilistic output: it may contain errors and should be checked before being used for significant decisions. We design and test our solutions with professional care, but we do not guarantee specific financial or business results unless expressly stated in the quote. The client remains responsible for how it uses the output and for complying with the rules that apply to its business.",
            "es": "Los sistemas basados en IA producen resultados probabilísticos: pueden contener errores y conviene revisarlos antes de usarlos para decisiones relevantes. Diseñamos y probamos nuestras soluciones con diligencia profesional, pero no garantizamos resultados económicos o empresariales concretos salvo que se indique expresamente en el presupuesto. El cliente sigue siendo responsable del uso que hace de los resultados y del cumplimiento de las normas aplicables a su actividad.",
            "fr": "Les systèmes fondés sur l'IA produisent des résultats probabilistes : ils peuvent contenir des erreurs et doivent être vérifiés avant d'être utilisés pour des décisions importantes. Nous concevons et testons nos solutions avec diligence professionnelle, mais ne garantissons pas de résultats financiers ou commerciaux précis, sauf mention expresse dans le devis. Le client reste responsable de l'usage qu'il fait des résultats et du respect des règles applicables à son activité."
          }
        },
        {
          "text": {
            "it": "Quando realizziamo per il cliente un chatbot, un agente o un altro sistema di AI, lo configuriamo in modo che gli utenti siano informati che stanno interagendo con un sistema di AI (art. 50 Regolamento (UE) 2024/1689, AI Act). Il cliente che usa il sistema nella propria attività è responsabile di mantenere tale informativa, dei contenuti e dei dati che vi inserisce, di un'adeguata supervisione umana, dell'alfabetizzazione in materia di AI del proprio personale (art. 4 AI Act) e di non usare il sistema per pratiche vietate o per usi ad alto rischio (art. 5 e allegato III AI Act) senza uno specifico accordo scritto con noi.",
            "en": "When we build a chatbot, agent or other AI system for a client, we configure it so that users are informed that they are interacting with an AI system (art. 50 of Regulation (EU) 2024/1689, the AI Act). The client using the system in its business is responsible for keeping that disclosure in place, for the content and data it enters, for appropriate human oversight, for the AI literacy of its staff (art. 4 AI Act) and for not using the system for prohibited practices or high-risk uses (art. 5 and Annex III AI Act) without a specific written agreement with us.",
            "es": "Cuando construimos un chatbot, un agente u otro sistema de IA para un cliente, lo configuramos para que los usuarios sepan que interactúan con un sistema de IA (art. 50 del Reglamento (UE) 2024/1689, AI Act). El cliente que usa el sistema en su actividad es responsable de mantener esa información, de los contenidos y datos que introduce, de una supervisión humana adecuada, de la alfabetización en IA de su personal (art. 4 AI Act) y de no usar el sistema para prácticas prohibidas o usos de alto riesgo (art. 5 y anexo III AI Act) sin un acuerdo específico por escrito con nosotros.",
            "fr": "Lorsque nous construisons un chatbot, un agent ou un autre système d'IA pour un client, nous le configurons pour que les utilisateurs sachent qu'ils interagissent avec un système d'IA (art. 50 du Règlement (UE) 2024/1689, AI Act). Le client qui utilise le système dans son activité est responsable du maintien de cette information, des contenus et données qu'il saisit, d'une supervision humaine appropriée, de la maîtrise de l'IA par son personnel (art. 4 AI Act) et de ne pas utiliser le système pour des pratiques interdites ou des usages à haut risque (art. 5 et annexe III AI Act) sans accord écrit spécifique avec nous."
          }
        },
        {
          "text": {
            "it": "Nello svolgere i servizi possiamo usare strumenti di AI, ad esempio assistenti alla programmazione e modelli linguistici: su richiesta indichiamo quali (art. 13 L. 132/2025). Per i clienti consumatori restano salve le garanzie legali di conformità previste dal Codice del Consumo, incluse quelle per contenuti e servizi digitali (artt. 135-octies e seguenti).",
            "en": "In performing our services we may use AI tools, for example coding assistants and language models: on request we tell you which ones (art. 13 of Italian Law 132/2025). Consumer clients keep the legal guarantees of conformity under the Italian Consumer Code, including those for digital content and digital services (arts. 135-octies et seq.).",
            "es": "En la prestación de nuestros servicios podemos usar herramientas de IA, por ejemplo asistentes de programación y modelos de lenguaje: si lo solicitas te decimos cuáles (art. 13 de la Ley italiana 132/2025). Los clientes consumidores conservan las garantías legales de conformidad del Código del Consumo italiano, incluidas las de los contenidos y servicios digitales (arts. 135-octies y siguientes).",
            "fr": "Dans l'exécution de nos services, nous pouvons utiliser des outils d'IA, par exemple des assistants de programmation et des modèles de langage : sur demande, nous vous indiquons lesquels (art. 13 de la loi italienne 132/2025). Les clients consommateurs conservent les garanties légales de conformité du Code de la consommation italien, y compris celles relatives aux contenus et services numériques (art. 135-octies et suivants)."
          }
        }
      ]
    },
    {
      "heading": {
        "it": "8. Proprietà intellettuale",
        "en": "8. Intellectual property",
        "es": "8. Propiedad intelectual",
        "fr": "8. Propriété intellectuelle"
      },
      "body": [
        {
          "text": {
            "it": "I contenuti del sito (testi, grafica, marchio flylabs.ai, codice) sono nostri o dei rispettivi titolari e non possono essere copiati o riutilizzati senza autorizzazione, salvo dove indicato diversamente (ad esempio progetti open source pubblicati con una licenza).",
            "en": "Site content (text, graphics, the flylabs.ai brand, code) belongs to us or to the respective owners and may not be copied or reused without permission, unless stated otherwise (for example open source projects released under a licence).",
            "es": "Los contenidos del sitio (textos, gráficos, la marca flylabs.ai, código) son nuestros o de sus respectivos titulares y no pueden copiarse ni reutilizarse sin permiso, salvo indicación contraria (por ejemplo proyectos open source publicados bajo licencia).",
            "fr": "Les contenus du site (textes, graphismes, la marque flylabs.ai, code) nous appartiennent ou appartiennent à leurs titulaires respectifs et ne peuvent être copiés ni réutilisés sans autorisation, sauf indication contraire (par exemple les projets open source publiés sous licence)."
          }
        },
        {
          "text": {
            "it": "Salvo diverso accordo nel preventivo, con il pagamento integrale del corrispettivo cediamo al cliente i diritti di utilizzazione economica, nella misura in cui sussistono, sui deliverable sviluppati su misura per lui (codice sorgente, configurazioni, contenuti). Fino al saldo il cliente può usarli solo per test e verifica. Restano nostri gli strumenti, i componenti, le librerie, i modelli di prompt e il know-how preesistenti o di uso generale, che concediamo al cliente in licenza non esclusiva, gratuita e a tempo indeterminato, limitata all'uso del deliverable. I componenti open source e i servizi di terzi restano soggetti alle rispettive licenze e termini.",
            "en": "Unless otherwise agreed in the quote, upon full payment we assign to the client the economic exploitation rights, to the extent they exist, in the deliverables custom-built for it (source code, configurations, content). Until full payment the client may use them for testing and review only. Our pre-existing or general-purpose tools, components, libraries, prompt templates and know-how remain ours; we grant the client a non-exclusive, royalty-free, perpetual licence to them, limited to the use of the deliverable. Open source components and third-party services remain subject to their respective licences and terms.",
            "es": "Salvo acuerdo distinto en el presupuesto, con el pago completo cedemos al cliente los derechos de explotación económica, en la medida en que existan, sobre los entregables desarrollados a medida para él (código fuente, configuraciones, contenidos). Hasta el pago completo, el cliente solo puede usarlos para pruebas y revisión. Nuestras herramientas, componentes, librerías, plantillas de prompts y know-how preexistentes o de uso general siguen siendo nuestros; concedemos al cliente una licencia no exclusiva, gratuita y perpetua sobre ellos, limitada al uso del entregable. Los componentes open source y los servicios de terceros siguen sujetos a sus respectivas licencias y condiciones.",
            "fr": "Sauf accord contraire dans le devis, à compter du paiement intégral, nous cédons au client les droits d'exploitation patrimoniaux, dans la mesure où ils existent, sur les livrables développés sur mesure pour lui (code source, configurations, contenus). Jusqu'au paiement intégral, le client ne peut les utiliser qu'à des fins de test et de vérification. Nos outils, composants, bibliothèques, modèles de prompts et savoir-faire préexistants ou d'usage général restent les nôtres ; nous accordons au client une licence non exclusive, gratuite et perpétuelle sur ceux-ci, limitée à l'utilisation du livrable. Les composants open source et les services de tiers restent soumis à leurs licences et conditions respectives."
          }
        },
        {
          "text": {
            "it": "Il cliente garantisce di avere i diritti sui materiali, dati e contenuti che ci fornisce; il cliente business ci tiene indenni da pretese di terzi relative ad essi. Possiamo citare il cliente e descrivere il progetto nel nostro portfolio solo con il suo consenso.",
            "en": "The client warrants that it holds the rights to the materials, data and content it provides to us; business clients indemnify us against third-party claims relating to them. We may name the client and describe the project in our portfolio only with the client's consent.",
            "es": "El cliente garantiza que tiene los derechos sobre los materiales, datos y contenidos que nos facilita; los clientes empresa nos mantienen indemnes frente a reclamaciones de terceros relacionadas con ellos. Solo podemos nombrar al cliente y describir el proyecto en nuestro portfolio con su consentimiento.",
            "fr": "Le client garantit détenir les droits sur les éléments, données et contenus qu'il nous fournit ; les clients professionnels nous garantissent contre toute réclamation de tiers à leur sujet. Nous ne pouvons citer le client et décrire le projet dans notre portfolio qu'avec son consentement."
          }
        }
      ]
    },
    {
      "heading": {
        "it": "9. Riservatezza e dati personali",
        "en": "9. Confidentiality and personal data",
        "es": "9. Confidencialidad y datos personales",
        "fr": "9. Confidentialité et données personnelles"
      },
      "body": [
        {
          "text": {
            "it": "Trattiamo come riservate le informazioni non pubbliche del cliente ricevute per il progetto, le usiamo solo per eseguirlo e le condividiamo solo con chi collabora al progetto e con i fornitori necessari, vincolati a obblighi equivalenti. L'obbligo dura per tutto il rapporto e per 3 anni dalla sua fine e non riguarda le informazioni già pubbliche o che dobbiamo comunicare per legge o per ordine di un'autorità. Su richiesta firmiamo un accordo di riservatezza (NDA) specifico.",
            "en": "We treat the client's non-public information received for the project as confidential, use it only to carry out the project and share it only with those working on the project and with necessary providers bound by equivalent obligations. This obligation lasts for the whole relationship and for 3 years after it ends and does not cover information that is already public or that we must disclose by law or by order of an authority. On request we sign a specific non-disclosure agreement (NDA).",
            "es": "Tratamos como confidencial la información no pública del cliente recibida para el proyecto, la usamos solo para realizar el proyecto y solo la compartimos con quienes trabajan en él y con los proveedores necesarios sujetos a obligaciones equivalentes. Esta obligación dura toda la relación y 3 años después de su fin, y no cubre la información que ya es pública o que debemos revelar por ley o por orden de una autoridad. Si lo solicitas, firmamos un acuerdo de confidencialidad específico (NDA).",
            "fr": "Nous traitons comme confidentielles les informations non publiques du client reçues pour le projet, ne les utilisons que pour réaliser le projet et ne les partageons qu'avec les personnes qui y travaillent et avec les prestataires nécessaires tenus à des obligations équivalentes. Cette obligation dure pendant toute la relation et 3 ans après sa fin, et ne couvre pas les informations déjà publiques ou que nous devons divulguer en vertu de la loi ou d'une décision d'une autorité. Sur demande, nous signons un accord de confidentialité spécifique (NDA)."
          }
        },
        {
          "text": {
            "it": "Quando, per eseguire il servizio, trattiamo dati personali per conto del cliente (ad esempio le conversazioni del suo chatbot o i dati dei suoi clienti), agiamo come responsabili del trattamento e sottoscriviamo con il cliente un accordo ai sensi dell'art. 28 GDPR, che indica anche i sub-responsabili usati.",
            "en": "Where, to perform the service, we process personal data on the client's behalf (for example its chatbot conversations or its customers' data), we act as processor and sign with the client an agreement under art. 28 GDPR, which also lists the sub-processors used.",
            "es": "Cuando, para prestar el servicio, tratamos datos personales por cuenta del cliente (por ejemplo las conversaciones de su chatbot o los datos de sus clientes), actuamos como encargados del tratamiento y firmamos con el cliente un acuerdo conforme al art. 28 RGPD, que también enumera los subencargados utilizados.",
            "fr": "Lorsque, pour fournir le service, nous traitons des données personnelles pour le compte du client (par exemple les conversations de son chatbot ou les données de ses clients), nous agissons en tant que sous-traitant et signons avec le client un accord au sens de l'art. 28 RGPD, qui liste aussi les sous-traitants ultérieurs utilisés."
          }
        }
      ]
    },
    {
      "heading": {
        "it": "10. Limitazione di responsabilità",
        "en": "10. Limitation of liability",
        "es": "10. Limitación de responsabilidad",
        "fr": "10. Limitation de responsabilité"
      },
      "body": [
        {
          "text": {
            "it": "Questa sezione si applica ai soli clienti business. Salvi i casi di dolo o colpa grave, i danni alla persona e la violazione di obblighi derivanti da norme di ordine pubblico (art. 1229 c.c.), la nostra responsabilità complessiva per ciascun contratto è limitata al corrispettivo pagato dal cliente per quel contratto e, per i servizi ricorrenti, ai corrispettivi pagati nei 12 mesi precedenti il fatto che ha causato il danno. Non rispondiamo di danni indiretti o consequenziali, come mancato guadagno, perdita di opportunità o di avviamento, né di malfunzionamenti dei servizi di terzi indicati nella sezione 5 che non dipendano da nostra colpa. Il cliente è responsabile di conservare copie di backup dei propri dati.",
            "en": "This section applies to business clients only. Except in cases of wilful misconduct or gross negligence, personal injury and breach of obligations arising from public policy rules (art. 1229 of the Italian Civil Code), our total liability for each contract is limited to the fees paid by the client under that contract and, for recurring services, to the fees paid in the 12 months before the event giving rise to the damage. We are not liable for indirect or consequential damages, such as loss of profit, opportunity or goodwill, nor for failures of the third-party services referred to in section 5 that are not due to our fault. The client is responsible for keeping backup copies of its data.",
            "es": "Esta sección se aplica solo a los clientes empresa. Salvo en los casos de dolo o culpa grave, daños a las personas e incumplimiento de obligaciones derivadas de normas de orden público (art. 1229 del Código Civil italiano), nuestra responsabilidad total por cada contrato se limita a los honorarios pagados por el cliente en virtud de ese contrato y, para los servicios recurrentes, a los honorarios pagados en los 12 meses anteriores al hecho que originó el daño. No respondemos de daños indirectos o consecuentes, como lucro cesante, pérdida de oportunidades o de imagen, ni de fallos de los servicios de terceros mencionados en la sección 5 que no se deban a culpa nuestra. El cliente es responsable de conservar copias de seguridad de sus datos.",
            "fr": "Cette section s'applique uniquement aux clients professionnels. Sauf en cas de dol ou de faute lourde, de dommages corporels et de manquement à des obligations découlant de règles d'ordre public (art. 1229 du Code civil italien), notre responsabilité totale pour chaque contrat est limitée aux honoraires payés par le client au titre de ce contrat et, pour les services récurrents, aux honoraires payés au cours des 12 mois précédant le fait générateur du dommage. Nous ne sommes pas responsables des dommages indirects ou consécutifs, tels que manque à gagner, perte d'opportunité ou atteinte à l'image, ni des défaillances des services de tiers visés à la section 5 qui ne sont pas dues à notre faute. Le client est responsable de la conservation de copies de sauvegarde de ses données."
          }
        },
        {
          "text": {
            "it": "Nei confronti dei clienti consumatori rispondiamo secondo la legge, senza limitazioni contrattuali.",
            "en": "Towards consumer clients we are liable as provided by law, without contractual limitations.",
            "es": "Frente a los clientes consumidores respondemos conforme a la ley, sin limitaciones contractuales.",
            "fr": "À l'égard des clients consommateurs, notre responsabilité est engagée conformément à la loi, sans limitation contractuelle."
          }
        }
      ]
    },
    {
      "heading": {
        "it": "11. Link a siti terzi",
        "en": "11. Third-party links",
        "es": "11. Enlaces a sitios de terceros",
        "fr": "11. Liens vers des sites tiers"
      },
      "body": [
        {
          "text": {
            "it": "Il sito può contenere link a siti o servizi di terzi, di cui non siamo responsabili.",
            "en": "The site may contain links to third-party sites or services, for which we are not responsible.",
            "es": "El sitio puede contener enlaces a sitios o servicios de terceros, de los que no somos responsables.",
            "fr": "Le site peut contenir des liens vers des sites ou services tiers, dont nous ne sommes pas responsables."
          }
        }
      ]
    },
    {
      "heading": {
        "it": "12. Privacy e cookie",
        "en": "12. Privacy and cookies",
        "es": "12. Privacidad y cookies",
        "fr": "12. Confidentialité et cookies"
      },
      "body": [
        {
          "text": {
            "it": "Il trattamento dei dati personali è descritto nella Privacy Policy e nella Cookie Policy.",
            "en": "The processing of personal data is described in the Privacy Policy and the Cookie Policy.",
            "es": "El tratamiento de los datos personales se describe en la Política de privacidad y en la Política de cookies.",
            "fr": "Le traitement des données personnelles est décrit dans la Politique de confidentialité et la Politique de cookies."
          }
        }
      ]
    },
    {
      "heading": {
        "it": "13. Modifiche e disposizioni finali",
        "en": "13. Changes and final provisions",
        "es": "13. Cambios y disposiciones finales",
        "fr": "13. Modifications et dispositions finales"
      },
      "body": [
        {
          "text": {
            "it": "Possiamo aggiornare questi termini nel tempo. La versione vigente è sempre pubblicata su questa pagina con la data di ultimo aggiornamento; ai contratti si applica la versione richiamata nel preventivo accettato e le modifiche successive non li riguardano senza accordo scritto del cliente.",
            "en": "We may update these terms over time. The current version is always published on this page with the date of the latest update; contracts are governed by the version referred to in the accepted quote, and later changes do not apply to them without the client's written agreement.",
            "es": "Podemos actualizar estos términos con el tiempo. La versión vigente está siempre publicada en esta página con la fecha de la última actualización; los contratos se rigen por la versión indicada en el presupuesto aceptado, y los cambios posteriores no se les aplican sin el acuerdo por escrito del cliente.",
            "fr": "Nous pouvons mettre à jour ces conditions au fil du temps. La version en vigueur est toujours publiée sur cette page avec la date de la dernière mise à jour ; les contrats sont régis par la version indiquée dans le devis accepté, et les modifications ultérieures ne s'y appliquent pas sans l'accord écrit du client."
          }
        },
        {
          "label": {
            "it": "Forza maggiore.",
            "en": "Force majeure.",
            "es": "Fuerza mayor.",
            "fr": "Force majeure."
          },
          "text": {
            "it": "Nessuna parte è responsabile di ritardi o inadempimenti dovuti a eventi fuori dal suo ragionevole controllo (ad esempio calamità, interruzioni prolungate di servizi di terzi, provvedimenti delle autorità), purché ne dia pronto avviso; i tempi si spostano per la durata dell'evento. Se l'evento dura più di 60 giorni, ciascuna parte può recedere dal contratto con pagamento o rimborso delle attività svolte fino a quel momento.",
            "en": "Neither party is liable for delays or failures caused by events beyond its reasonable control (for example natural disasters, prolonged outages of third-party services, orders of public authorities), provided it gives prompt notice; timelines shift for the duration of the event. If the event lasts more than 60 days, either party may terminate the contract, with payment or refund for the work performed up to that point.",
            "es": "Ninguna de las partes responde de retrasos o incumplimientos causados por hechos fuera de su control razonable (por ejemplo catástrofes naturales, caídas prolongadas de servicios de terceros, órdenes de autoridades públicas), siempre que avise con prontitud; los plazos se desplazan durante el hecho. Si el hecho dura más de 60 días, cualquiera de las partes puede resolver el contrato, con pago o reembolso del trabajo realizado hasta ese momento.",
            "fr": "Aucune des parties n'est responsable des retards ou manquements causés par des événements échappant à son contrôle raisonnable (par exemple catastrophes naturelles, pannes prolongées de services tiers, décisions des autorités publiques), à condition de prévenir rapidement ; les délais sont décalés pendant la durée de l'événement. Si l'événement dure plus de 60 jours, chaque partie peut résilier le contrat, avec paiement ou remboursement du travail effectué jusqu'alors."
          }
        },
        {
          "label": {
            "it": "Comunicazioni.",
            "en": "Notices.",
            "es": "Comunicaciones.",
            "fr": "Notifications."
          },
          "text": {
            "it": "Le comunicazioni relative al contratto si fanno per iscritto agli indirizzi email indicati nel preventivo; per noi info@flylabs.ai.",
            "en": "Notices relating to the contract are given in writing to the email addresses stated in the quote; for us, info@flylabs.ai.",
            "es": "Las comunicaciones relativas al contrato se hacen por escrito a las direcciones de email indicadas en el presupuesto; para nosotros, info@flylabs.ai.",
            "fr": "Les notifications relatives au contrat se font par écrit aux adresses e-mail indiquées dans le devis ; pour nous, info@flylabs.ai."
          }
        },
        {
          "label": {
            "it": "Collaboratori e cessione.",
            "en": "Subcontractors and assignment.",
            "es": "Colaboradores y cesión.",
            "fr": "Collaborateurs et cession."
          },
          "text": {
            "it": "Possiamo avvalerci di collaboratori e fornitori per eseguire i servizi, restando responsabili verso il cliente. Nessuna parte può cedere il contratto senza il consenso scritto dell'altra.",
            "en": "We may use collaborators and providers to perform the services, remaining responsible to the client. Neither party may assign the contract without the other's written consent.",
            "es": "Podemos recurrir a colaboradores y proveedores para prestar los servicios, manteniendo la responsabilidad frente al cliente. Ninguna de las partes puede ceder el contrato sin el consentimiento por escrito de la otra.",
            "fr": "Nous pouvons faire appel à des collaborateurs et prestataires pour exécuter les services, tout en restant responsables envers le client. Aucune des parties ne peut céder le contrat sans l'accord écrit de l'autre."
          }
        },
        {
          "label": {
            "it": "Invalidità parziale.",
            "en": "Severability.",
            "es": "Nulidad parcial.",
            "fr": "Nullité partielle."
          },
          "text": {
            "it": "Se una clausola è nulla o inefficace, le altre restano valide e la clausola è sostituita dalla norma di legge applicabile.",
            "en": "If a clause is void or unenforceable, the others remain valid and that clause is replaced by the applicable statutory rule.",
            "es": "Si una cláusula es nula o inaplicable, las demás siguen siendo válidas y esa cláusula se sustituye por la norma legal aplicable.",
            "fr": "Si une clause est nulle ou inapplicable, les autres restent valables et cette clause est remplacée par la règle légale applicable."
          }
        },
        {
          "label": {
            "it": "Lingua.",
            "en": "Language.",
            "es": "Idioma.",
            "fr": "Langue."
          },
          "text": {
            "it": "Questi termini sono redatti in italiano e in inglese. In caso di contrasto prevale la versione italiana; nei confronti dei consumatori, nel dubbio prevale l'interpretazione più favorevole al consumatore (art. 35 Codice del Consumo).",
            "en": "These terms are drafted in Italian and English. In case of conflict the Italian version prevails; towards consumers, in case of doubt the interpretation most favourable to the consumer prevails (art. 35 of the Italian Consumer Code).",
            "es": "Estos términos están redactados en italiano, inglés, español y francés. En caso de conflicto prevalece la versión italiana; frente a los consumidores, en caso de duda prevalece la interpretación más favorable al consumidor (art. 35 del Código del Consumo italiano).",
            "fr": "Ces conditions sont rédigées en italien, anglais, espagnol et français. En cas de conflit, la version italienne prévaut ; à l'égard des consommateurs, en cas de doute, l'interprétation la plus favorable au consommateur prévaut (art. 35 du Code de la consommation italien)."
          }
        }
      ]
    },
    {
      "heading": {
        "it": "14. Legge applicabile e foro",
        "en": "14. Governing law and jurisdiction",
        "es": "14. Ley aplicable y jurisdicción",
        "fr": "14. Droit applicable et juridiction"
      },
      "body": [
        {
          "text": {
            "it": "Questi termini e i contratti sono regolati dalla legge italiana. Per le controversie con clienti business è competente in via esclusiva il Foro di Milano. Per i clienti consumatori è competente in via inderogabile il giudice del luogo di residenza o domicilio del consumatore (art. 66-bis Codice del Consumo); al consumatore residente in un altro paese la scelta della legge italiana non toglie la protezione delle norme inderogabili del suo paese (art. 6 Reg. (CE) 593/2008).",
            "en": "These terms and the contracts are governed by Italian law. For disputes with business clients, the courts of Milan have exclusive jurisdiction. For consumer clients, the court of the consumer's place of residence or domicile has mandatory jurisdiction (art. 66-bis of the Italian Consumer Code); for consumers resident in another country, the choice of Italian law does not deprive them of the protection of the mandatory rules of their country (art. 6 of Regulation (EC) 593/2008).",
            "es": "Estos términos y los contratos se rigen por la ley italiana. Para las disputas con clientes empresa son competentes en exclusiva los tribunales de Milán. Para los clientes consumidores es competente obligatoriamente el tribunal del lugar de residencia o domicilio del consumidor (art. 66-bis del Código del Consumo italiano); para los consumidores residentes en otro país, la elección de la ley italiana no los priva de la protección de las normas imperativas de su país (art. 6 del Reglamento (CE) 593/2008).",
            "fr": "Ces conditions et les contrats sont régis par le droit italien. Pour les litiges avec les clients professionnels, les tribunaux de Milan sont exclusivement compétents. Pour les clients consommateurs, le tribunal du lieu de résidence ou de domicile du consommateur est obligatoirement compétent (art. 66-bis du Code de la consommation italien) ; pour les consommateurs résidant dans un autre pays, le choix du droit italien ne les prive pas de la protection des dispositions impératives de leur pays (art. 6 du Règlement (CE) 593/2008)."
          }
        },
        {
          "text": {
            "it": "Se un reclamo non si risolve, ti indichiamo su supporto durevole l'organismo di risoluzione alternativa delle controversie (ADR) competente e se intendiamo ricorrervi (art. 141-sexies Codice del Consumo); resta salvo il ricorso al giudice.",
            "en": "If a complaint is not resolved, we will tell you on a durable medium which alternative dispute resolution (ADR) body is competent and whether we intend to use it (art. 141-sexies of the Italian Consumer Code); your right to go to court is unaffected.",
            "es": "Si una reclamación no se resuelve, te indicaremos en un soporte duradero qué organismo de resolución alternativa de litigios (ADR) es competente y si tenemos intención de recurrir a él (art. 141-sexies del Código del Consumo italiano); tu derecho a acudir a los tribunales no se ve afectado.",
            "fr": "Si une réclamation n'est pas résolue, nous vous indiquerons sur un support durable l'organisme de règlement extrajudiciaire des litiges (ADR) compétent et si nous entendons y recourir (art. 141-sexies du Code de la consommation italien) ; votre droit de saisir la justice n'en est pas affecté."
          }
        }
      ]
    },
    {
      "heading": {
        "it": "15. Contatti e assistenza clienti",
        "en": "15. Contact and customer service",
        "es": "15. Contacto y atención al cliente",
        "fr": "15. Contact et service client"
      },
      "body": [
        {
          "text": {
            "it": "Per domande su questi termini, sui servizi o sui pagamenti scrivi a info@flylabs.ai: rispondiamo entro 5 giorni lavorativi. Il professionista che presta il servizio, con il suo indirizzo e recapito telefonico, è indicato nel preventivo e in fattura.",
            "en": "For questions about these terms, our services or payments, write to info@flylabs.ai: we reply within 5 business days. The professional providing the service, with their address and telephone number, is stated in the quote and on the invoice.",
            "es": "Para preguntas sobre estos términos, nuestros servicios o los pagos, escribe a info@flylabs.ai: respondemos en un plazo de 5 días laborables. El profesional que presta el servicio, con su dirección y teléfono, figura en el presupuesto y en la factura.",
            "fr": "Pour toute question sur ces conditions, nos services ou les paiements, écrivez à info@flylabs.ai : nous répondons sous 5 jours ouvrés. Le professionnel qui fournit le service, avec son adresse et son numéro de téléphone, figure sur le devis et sur la facture."
          }
        }
      ]
    }
  ],
  "withdrawalForm": {
    "title": {
      "it": "Modulo di recesso tipo",
      "en": "Model withdrawal form",
      "es": "Modelo de formulario de desistimiento",
      "fr": "Modèle de formulaire de rétractation"
    },
    "note": {
      "it": "Compilare e restituire il presente modulo solo se si desidera recedere dal contratto.",
      "en": "Complete and return this form only if you wish to withdraw from the contract.",
      "es": "Cumplimente y envíe este formulario solo si desea desistir del contrato.",
      "fr": "Veuillez compléter et renvoyer ce formulaire uniquement si vous souhaitez vous rétracter du contrat."
    },
    "lines": [
      {
        "it": "Destinatario: il professionista indicato nel preventivo (nome e indirizzo come da preventivo), info@flylabs.ai",
        "en": "To: the professional named in the quote (name and address as stated in the quote), info@flylabs.ai",
        "es": "A la atención de: el profesional indicado en el presupuesto (nombre y dirección según el presupuesto), info@flylabs.ai",
        "fr": "À l'attention de : le professionnel indiqué dans le devis (nom et adresse tels qu'indiqués dans le devis), info@flylabs.ai"
      },
      {
        "it": "Con la presente io/noi (*) notifico/notifichiamo (*) il recesso dal mio/nostro (*) contratto per la prestazione dei seguenti servizi: ________",
        "en": "I/We (*) hereby give notice that I/We (*) withdraw from my/our (*) contract for the provision of the following service: ________",
        "es": "Por la presente le comunico/comunicamos (*) que desisto/desistimos (*) de mi/nuestro (*) contrato de prestación del siguiente servicio: ________",
        "fr": "Je/Nous (*) vous notifie/notifions (*) par la présente ma/notre (*) rétractation du contrat portant sur la prestation de service ci-dessous : ________"
      },
      {
        "it": "Ordinato il (*) / ricevuto il (*): ________",
        "en": "Ordered on (*) / received on (*): ________",
        "es": "Pedido el (*) / recibido el (*): ________",
        "fr": "Commandé le (*) / reçu le (*) : ________"
      },
      {
        "it": "Nome del/dei consumatore/i: ________",
        "en": "Name of consumer(s): ________",
        "es": "Nombre del consumidor o de los consumidores: ________",
        "fr": "Nom du (des) consommateur(s) : ________"
      },
      {
        "it": "Indirizzo del/dei consumatore/i: ________",
        "en": "Address of consumer(s): ________",
        "es": "Domicilio del consumidor o de los consumidores: ________",
        "fr": "Adresse du (des) consommateur(s) : ________"
      },
      {
        "it": "Firma del/dei consumatore/i (solo se il presente modulo è notificato in versione cartacea): ________",
        "en": "Signature of consumer(s) (only if this form is notified on paper): ________",
        "es": "Firma del consumidor o de los consumidores (solo si el presente formulario se presenta en papel): ________",
        "fr": "Signature du (des) consommateur(s) (uniquement en cas de notification du présent formulaire sur papier) : ________"
      },
      {
        "it": "Data: ________",
        "en": "Date: ________",
        "es": "Fecha: ________",
        "fr": "Date : ________"
      },
      {
        "it": "(*) Cancellare la dicitura inutile.",
        "en": "(*) Delete as appropriate.",
        "es": "(*) Táchese lo que no proceda.",
        "fr": "(*) Rayez la mention inutile."
      }
    ]
  }
};

