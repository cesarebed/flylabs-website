import { defineField, defineType } from "sanity";

// Singleton: configurazione del sito usata per la SEO e le anteprime social.
// Tutto il resto dei contenuti resta hardcoded in lib/landing-content.ts.
export const siteSettings = defineType({
  name: "siteSettings",
  title: "Impostazioni sito",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Titolo per Google (home)",
      description:
        "È il <title> della homepage: appare nella scheda del browser e come titolo blu nei risultati di ricerca.",
      type: "localeString",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "description",
      title: "Descrizione (meta per Google e social)",
      description:
        "Il testo sotto il titolo nei risultati di ricerca e nell'anteprima quando il link viene condiviso. ~150-160 caratteri.",
      type: "localeText",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "siteUrl",
      title: "URL del sito",
      description:
        "Dominio di produzione (es. https://flylabs.ai). Serve per i link canonical e le anteprime social.",
      type: "url",
    }),
    defineField({
      name: "ogImage",
      title: "Immagine di anteprima social",
      description:
        "Immagine mostrata quando il sito viene condiviso su WhatsApp, LinkedIn, ecc. Consigliata 1200×630px.",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({
      name: "keywords",
      title: "Parole chiave SEO",
      description:
        "Termini principali con cui vuoi essere trovato. Peso SEO basso oggi, ma utili come promemoria di posizionamento.",
      type: "array",
      of: [{ type: "string" }],
      options: { layout: "tags" },
    }),
  ],
  preview: {
    prepare: () => ({ title: "Impostazioni sito" }),
  },
});
