import { defineField, defineType } from "sanity";

export const page = defineType({
  name: "page",
  title: "Pagina",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Titolo",
      type: "localeString",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Indirizzo della pagina (slug)",
      type: "slug",
      options: { source: (doc) => (doc.title as { it?: string })?.it ?? "" },
      validation: (rule) => rule.required(),
    }),
  ],
  preview: {
    select: { title: "title.it", subtitle: "slug.current" },
  },
});
