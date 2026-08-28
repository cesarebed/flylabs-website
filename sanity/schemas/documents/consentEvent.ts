import { defineField, defineType } from "sanity";

// Registro dei consensi cookie: un documento per ogni scelta espressa
// dall'utente. Creato via route handler (/api/consent) con token di scrittura,
// sola lettura nello Studio — è la prova di accountability (art. 7 GDPR), non
// contenuto editoriale.
export const consentEvent = defineType({
  name: "consentEvent",
  title: "Consenso cookie",
  type: "document",
  readOnly: true,
  fields: [
    defineField({
      name: "analytics",
      title: "Statistiche (GA4)",
      type: "boolean",
    }),
    defineField({
      name: "assistant",
      title: "Assistente (chatbot)",
      type: "boolean",
    }),
    defineField({
      name: "version",
      title: "Versione del banner",
      description:
        "Versione della cookie policy/banner al momento della scelta: se cambia, il consenso va richiesto di nuovo.",
      type: "number",
    }),
    defineField({
      name: "at",
      title: "Registrato il",
      type: "datetime",
    }),
    defineField({
      name: "locale",
      title: "Lingua del sito",
      type: "string",
    }),
    defineField({
      name: "userAgent",
      title: "User agent",
      type: "string",
      hidden: true,
    }),
    defineField({
      name: "ipHash",
      title: "Hash IP",
      description: "SHA-256 dell'IP (mai in chiaro), solo come riferimento tecnico.",
      type: "string",
      hidden: true,
    }),
  ],
  orderings: [
    {
      title: "Più recenti",
      name: "atDesc",
      by: [{ field: "at", direction: "desc" }],
    },
  ],
  preview: {
    select: { analytics: "analytics", assistant: "assistant", at: "at", locale: "locale" },
    prepare: ({ analytics, assistant, at, locale }) => ({
      title: `Statistiche: ${analytics ? "sì" : "no"} · Assistente: ${assistant ? "sì" : "no"}`,
      subtitle: [locale, at ? new Date(at).toLocaleString("it-IT") : null]
        .filter(Boolean)
        .join(" · "),
    }),
  },
});
