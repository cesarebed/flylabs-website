import type { StructureResolver } from "sanity/structure";

// Studio sidebar: pinned singleton for site settings, then regular lists.
export const structure: StructureResolver = (S) =>
  S.list()
    .title("Contenuti")
    .items([
      S.listItem()
        .title("Impostazioni sito")
        .id("siteSettings")
        .child(
          S.document().schemaType("siteSettings").documentId("siteSettings")
        ),
      S.divider(),
      S.documentTypeListItem("page").title("Pagine"),
    ]);
