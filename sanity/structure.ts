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
      S.listItem()
        .title("Richieste di contatto")
        .child(
          S.documentTypeList("contactSubmission")
            .title("Richieste di contatto")
            .defaultOrdering([{ field: "submittedAt", direction: "desc" }])
        ),
      S.divider(),
      S.listItem()
        .title("Casi di successo")
        .child(
          S.documentTypeList("caseStudy")
            .title("Casi di successo")
            .defaultOrdering([{ field: "date", direction: "desc" }])
        ),
      S.divider(),
      S.documentTypeListItem("page").title("Pagine"),
    ]);
