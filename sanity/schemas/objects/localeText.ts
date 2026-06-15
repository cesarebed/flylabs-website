import { defineField, defineType } from "sanity";

// Multi-line variant of localeString, for descriptions and paragraphs.
export const localeText = defineType({
  name: "localeText",
  title: "Localized text",
  type: "object",
  fields: [
    defineField({ name: "it", title: "Italiano", type: "text", rows: 3 }),
    defineField({ name: "en", title: "English", type: "text", rows: 3 }),
  ],
});
