import { defineField, defineType } from "sanity";

// Singleton: configurazione del sito usata per SEO, anteprime social e
// contatti del footer. Il resto dei contenuti resta hardcoded in
// lib/landing-content.ts.
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
    defineField({
      name: "socialLinks",
      title: "Profili social",
      description:
        "Link ai profili pubblici (es. LinkedIn), mostrati nel footer e segnalati a Google (sameAs). Se la lista è vuota, nel footer non compare nessun link social.",
      type: "array",
      of: [
        {
          type: "object",
          name: "socialLink",
          title: "Profilo social",
          fields: [
            defineField({
              name: "label",
              title: "Nome",
              description:
                "Testo del link nel footer, es. \"LinkedIn\". Uguale in tutte le lingue.",
              type: "string",
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: "url",
              title: "URL",
              description:
                "Indirizzo completo del profilo, es. https://www.linkedin.com/company/flylabs-ai. Senza URL il link non compare.",
              type: "url",
              validation: (rule) => rule.required(),
            }),
          ],
          preview: {
            select: { title: "label", subtitle: "url" },
          },
        },
      ],
    }),
    defineField({
      name: "contactEmail",
      title: "Email di contatto pubblica",
      description:
        "Mostrata nel footer come link \"Email\" (mailto). Se vuota, il link non compare. Attenzione: è leggibile da chiunque, usa una casella pensata per il pubblico.",
      type: "string",
      validation: (rule) => rule.email(),
    }),
  ],
  preview: {
    prepare: () => ({ title: "Impostazioni sito" }),
  },
});
