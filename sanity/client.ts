import { createClient } from "next-sanity";
import { apiVersion, dataset, projectId } from "./env";

// Senza read token il dataset non espone `caseStudy` e le query tornano []
// in silenzio (la home resterebbe senza casi): in produzione lo diciamo nei
// log di Vercel invece di accorgercene dal sito.
if (process.env.NODE_ENV === "production" && !process.env.SANITY_API_READ_TOKEN) {
  console.error(
    "SANITY_API_READ_TOKEN mancante: le query Sanity leggono solo i tipi pubblici (niente caseStudy)."
  );
}

export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  // Live API instead of the Sanity CDN: the CDN has a ~60s propagation
  // delay that would defeat on-demand revalidation. Vercel ISR already
  // caches responses for us.
  useCdn: false,
  // Read token (server-side): il dataset limita la lettura pubblica ad alcuni
  // tipi, quindi leggiamo autenticati. `published` = mai contenuti draft.
  token: process.env.SANITY_API_READ_TOKEN,
  perspective: "published",
});
