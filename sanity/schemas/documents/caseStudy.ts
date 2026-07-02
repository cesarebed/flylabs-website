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
      name: "metric",
      title: "Metrica principale",
      description:
        "Il numero in grande sulla card, es. \"+48\", \"12h\", \"<60s\". Uguale in tutte le lingue.",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "metricLabel",
      title: "Descrizione della metrica",
      description: "Cosa misura il numero, es. \"richieste · primo mese\".",
      type: "localeString",
      validation: (rule) => rule.required(),
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
      name: "date",
      title: "Data del progetto",
      description:
        "Usata per ordinare i casi (dal più recente). Se manca vale la data di creazione.",
      type: "date",
    }),
  ],
  preview: {
    select: { title: "title.it", subtitle: "sector.it", media: "cover" },
  },
});
