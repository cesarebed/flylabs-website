import { defineField, defineType } from "sanity";

export const caseStudy = defineType({
  name: "caseStudy",
  title: "Caso di successo",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Titolo",
      description:
        "Titolo del caso, es. \"Chatbot h24 per studio dentistico\". Senza titolo la pagina non può esistere.",
      type: "localeString",
      validation: (rule) =>
        rule.required().custom((value?: { it?: string }) =>
          value?.it ? true : "Serve almeno il titolo in italiano"
        ),
    }),
    defineField({
      name: "slug",
      title: "Indirizzo della pagina (slug)",
      description: "Ultima parte dell'URL, es. /lavori/studio-dentistico.",
      type: "slug",
      options: { source: (doc) => (doc.title as { it?: string })?.it ?? "" },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "sector",
      title: "Settore del cliente",
      description:
        "Etichetta breve mostrata sulla card, es. \"Studio dentistico\".",
      type: "localeString",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "problem",
      title: "Problema",
      description: "Cosa non funzionava prima, in una o due frasi.",
      type: "localeText",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "solution",
      title: "Soluzione",
      description: "Cosa abbiamo costruito, in una o due frasi.",
      type: "localeText",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "metrics",
      title: "Metriche (1 o 2)",
      description:
        "I numeri in grande sulla card. Solo dati reali, mai stime inventate. Con 2 metriche la card le affianca.",
      type: "array",
      of: [
        {
          type: "object",
          name: "metric",
          title: "Metrica",
          fields: [
            defineField({
              name: "value",
              title: "Valore",
              description:
                "Il numero, es. \"428\", \"12h\", \"1 sessione\". Se contiene una parola va tradotto; se è uguale in tutte le lingue (\"17%\"), compila solo l'italiano.",
              type: "localeString",
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: "label",
              title: "Cosa misura",
              description: "Es. \"recensioni analizzate\".",
              type: "localeString",
              validation: (rule) => rule.required(),
            }),
          ],
          preview: {
            select: { title: "value.it", subtitle: "label.it" },
          },
        },
      ],
      validation: (rule) => rule.required().min(1).max(2),
    }),
    defineField({
      name: "tech",
      title: "Tecnologie usate",
      description:
        "Badge dello stack mostrati su card e pagina di dettaglio, es. \"Claude\", \"Make.com\". Nomi uguali in tutte le lingue.",
      type: "array",
      of: [{ type: "string" }],
      options: { layout: "tags" },
    }),
    defineField({
      name: "featured",
      title: "In evidenza in homepage",
      description:
        "Se attivo, il caso appare tra le card della sezione \"Alcune delle nostre soluzioni\" (i 3 più recenti tra quelli in evidenza).",
      type: "boolean",
      initialValue: false,
    }),
    defineField({
      name: "body",
      title: "Racconto esteso",
      description:
        "Approfondimento per la pagina di dettaglio: contesto, come abbiamo lavorato, risultati. Se vuoto la pagina mostra solo problema/soluzione.",
      type: "localeText",
    }),
    defineField({
      name: "testimonial",
      title: "Testimonianza del cliente",
      type: "object",
      fields: [
        defineField({
          name: "quote",
          title: "Citazione",
          type: "localeText",
        }),
        defineField({
          name: "author",
          title: "Chi la firma",
          description: "Nome e ruolo, es. \"Dr. Rossi, titolare dello studio\".",
          type: "string",
        }),
      ],
    }),
    defineField({
      name: "cover",
      title: "Foto di copertina",
      description:
        "Opzionale, mostrata nella pagina di dettaglio. Consigliata orizzontale.",
      type: "image",
      options: { hotspot: true },
      fields: [
        defineField({
          name: "alt",
          title: "Testo alternativo",
          description: "Descrizione dell'immagine per accessibilità e SEO.",
          type: "localeString",
        }),
      ],
    }),
    defineField({
      name: "diagrams",
      title: "Diagrammi della soluzione",
      description:
        "Export dei flussi Excalidraw (stile FlyLabs, convenzione nel brain: 03_Resources/materials/brand/diagram-style.md). Mostrati nella pagina di dettaglio nell'ordine dato.",
      type: "array",
      of: [
        {
          type: "object",
          name: "diagram",
          title: "Diagramma",
          fields: [
            defineField({
              name: "it",
              title: "Immagine (italiano)",
              description:
                "Export con i testi in italiano. Senza questa il diagramma non si vede.",
              type: "image",
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: "en",
              title: "Immagine (inglese)",
              description:
                "Export con i testi in inglese. Se manca, la pagina EN mostra la versione italiana.",
              type: "image",
            }),
            defineField({
              name: "alt",
              title: "Testo alternativo",
              description:
                "Descrizione del diagramma per accessibilità e SEO.",
              type: "localeString",
            }),
            defineField({
              name: "caption",
              title: "Didascalia",
              description:
                "Riga sotto il diagramma, es. \"La pipeline giornaliera\".",
              type: "localeString",
            }),
          ],
          preview: {
            select: { title: "caption.it", media: "it" },
          },
        },
      ],
    }),
    defineField({
      name: "date",
      title: "Data del progetto",
      description:
        "Usata per ordinare i casi (dal più recente), nello Studio e sul sito. Precompilata con oggi.",
      type: "date",
      initialValue: () => new Date().toISOString().slice(0, 10),
      validation: (rule) => rule.required(),
    }),
  ],
  preview: {
    select: { title: "title.it", subtitle: "sector.it", media: "cover" },
  },
});
