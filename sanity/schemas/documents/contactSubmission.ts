import { defineField, defineType } from "sanity";

// Richieste inviate dal form di contatto del sito. Create via server action
// (token di scrittura), sola lettura nello Studio: sono dati ricevuti, non
// contenuti editoriali.
export const contactSubmission = defineType({
  name: "contactSubmission",
  title: "Richiesta di contatto",
  type: "document",
  readOnly: true,
  fields: [
    defineField({
      name: "name",
      title: "Nome",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "company",
      title: "Azienda",
      type: "string",
    }),
    defineField({
      name: "email",
      title: "Email",
      type: "string",
      validation: (rule) => rule.required().email(),
    }),
    defineField({
      name: "message",
      title: "Messaggio",
      type: "text",
      rows: 4,
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "submittedAt",
      title: "Ricevuto il",
      type: "datetime",
    }),
    defineField({
      name: "locale",
      title: "Lingua del sito",
      type: "string",
    }),
    defineField({
      name: "handled",
      title: "Gestito",
      description: "Segna la richiesta come già presa in carico.",
      type: "boolean",
      // handled è l'unico campo pensato per essere modificato a mano.
      readOnly: false,
    }),
  ],
  orderings: [
    {
      title: "Più recenti",
      name: "submittedAtDesc",
      by: [{ field: "submittedAt", direction: "desc" }],
    },
  ],
  preview: {
    select: { title: "name", company: "company", email: "email", date: "submittedAt" },
    prepare: ({ title, company, email, date }) => ({
      title: company ? `${title} — ${company}` : title,
      subtitle: [email, date ? new Date(date).toLocaleDateString("it-IT") : null]
        .filter(Boolean)
        .join(" · "),
    }),
  },
});
