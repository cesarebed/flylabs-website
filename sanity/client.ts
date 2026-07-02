import { createClient } from "next-sanity";
import { apiVersion, dataset, projectId } from "./env";

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
