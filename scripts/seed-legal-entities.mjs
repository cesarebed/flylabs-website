/**
 * Seed NON distruttivo dei titolari (P.IVA) e dell'email di contatto pubblica
 * sul singleton `siteSettings`.
 *
 * A differenza di seed-site-settings.ts (che fa createOrReplace e riazzera il
 * documento), questo fa un PATCH mirato: tocca SOLO `legalEntities` e
 * `contactEmail`, rimuove i vecchi campi `legalName`/`vatNumber`, e lascia
 * intatto tutto il resto (siteUrl, socialLinks, ogImage, keywords, SEO).
 *
 * Uso:
 *   node --env-file=.env.local scripts/seed-legal-entities.mjs
 * Richiede SANITY_API_WRITE_TOKEN (permesso Editor) in .env.local.
 *
 * Idempotente: rilanciandolo, i _key restano stabili e i valori si riallineano.
 */
import { createClient } from "next-sanity";

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";
const token = process.env.SANITY_API_WRITE_TOKEN;

if (!projectId) {
  console.error("✗ NEXT_PUBLIC_SANITY_PROJECT_ID mancante");
  process.exit(1);
}
if (!token) {
  console.error("✗ SANITY_API_WRITE_TOKEN mancante in .env.local (serve un token Editor)");
  process.exit(1);
}

const client = createClient({
  projectId,
  dataset,
  apiVersion: "2024-06-01",
  token,
  useCdn: false,
});

const legalEntities = [
  { _key: "ent-cesare", _type: "legalEntity", name: "Cesare Bedin", vatNumber: "05755090288" },
  { _key: "ent-federico", _type: "legalEntity", name: "Federico De Cillia", vatNumber: "IT13990330964" },
];
const contactEmail = "info@flylabs.ai";

async function main() {
  console.log(`→ Progetto ${projectId} / dataset ${dataset}`);

  // Patcha sia il pubblicato sia l'eventuale bozza, così Studio e sito coincidono.
  const ids = ["siteSettings"];
  const draft = await client.getDocument("drafts.siteSettings");
  if (draft) ids.push("drafts.siteSettings");

  const before = await client.getDocument("siteSettings");
  console.log("  Prima:", {
    contactEmail: before?.contactEmail ?? null,
    legalName: before?.legalName ?? null,
    vatNumber: before?.vatNumber ?? null,
  });

  for (const id of ids) {
    const res = await client
      .patch(id)
      .set({ legalEntities, contactEmail })
      .unset(["legalName", "vatNumber"])
      .commit();
    console.log(`  ✓ ${id} → ${res.legalEntities?.length ?? 0} titolari, contactEmail=${res.contactEmail}`);
  }
}

main().catch((err) => {
  console.error("✗ seed fallito:", err.message);
  process.exit(1);
});
