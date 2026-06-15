import { defineField, defineType } from "sanity";

// One string per site language. Use this instead of plain `string`
// for any short text that editors translate (titles, labels, CTAs).
export const localeString = defineType({
  name: "localeString",
  title: "Localized string",
  type: "object",
  fields: [
    defineField({ name: "it", title: "Italiano", type: "string" }),
    defineField({ name: "en", title: "English", type: "string" }),
  ],
});
