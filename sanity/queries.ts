import { defineQuery } from "next-sanity";

// All GROQ queries live here — never inline them in page files.

export const SITE_SETTINGS_QUERY = defineQuery(
  `*[_type == "siteSettings"][0]{ title, description }`
);
