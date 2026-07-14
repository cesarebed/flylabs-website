/**
 * Carica su Sanity i case study generati in `content/case-studies/*.json`.
 *
 * Uso (dalla root del repo flylabs-website):
 *   node .claude/skills/use-case-publish/scripts/import-case-studies.mjs
 *
 * Legge projectId/dataset e SANITY_API_WRITE_TOKEN da .env.local. Fa
 * `createOrReplace` (il brain è la fonte, ri-lanciarlo riallinea i testi) ma
 * PRESERVA la cover se è già stata caricata dallo Studio, così non perdi le
 * immagini rifacendo l'import.
 */
import { createReadStream } from "node:fs";
import { readdir, readFile } from "node:fs/promises";
import { basename, join } from "node:path";
import { createClient } from "next-sanity";

const DIR = "content/case-studies";

// .env.local minimale (senza dipendenze esterne).
async function loadEnv() {
  try {
    const raw = await readFile(".env.local", "utf8");
    for (const line of raw.split("\n")) {
      const m = line.match(/^([A-Z0-9_]+)=(.*)$/);
      if (m && !(m[1] in process.env)) process.env[m[1]] = m[2];
    }
  } catch {
    /* .env.local assente: si usano le env già presenti */
  }
}

async function main() {
  await loadEnv();
  const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
  const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";
  const token = process.env.SANITY_API_WRITE_TOKEN;
  if (!projectId || !token) {
    console.error(
      "✗ Mancano NEXT_PUBLIC_SANITY_PROJECT_ID o SANITY_API_WRITE_TOKEN (.env.local)."
    );
    process.exit(1);
  }

  const client = createClient({
    projectId,
    dataset,
    apiVersion: "2026-06-01",
    useCdn: false,
    token,
  });

  let files;
  try {
    files = (await readdir(DIR)).filter((f) => f.endsWith(".json"));
  } catch {
    console.error(`✗ Cartella ${DIR}/ non trovata. Genera prima i casi con la skill.`);
    process.exit(1);
  }
  if (files.length === 0) {
    console.error(`✗ Nessun .json in ${DIR}/.`);
    process.exit(1);
  }

  for (const file of files) {
    const doc = JSON.parse(await readFile(join(DIR, file), "utf8"));
    if (!doc._id || !doc._type) {
      console.error(`  ✗ ${file}: manca _id o _type, salto.`);
      continue;
    }
    // I diagrammi possono arrivare come file locali (`_localFile` accanto ad
    // alt/caption): l'importer carica l'asset su Sanity e collega il ref.
    // L'upload avviene solo se l'asset con lo stesso filename non è già
    // collegato al documento esistente (re-import idempotente).
    const existing = await client.getDocument(doc._id).catch(() => null);
    if (Array.isArray(doc.diagrams)) {
      for (const diagram of doc.diagrams) {
        const localFile = diagram._localFile;
        delete diagram._localFile;
        if (!localFile || diagram.asset) continue;
        const prev = existing?.diagrams?.find((d) => d._key === diagram._key);
        if (prev?.asset) {
          diagram.asset = prev.asset;
          continue;
        }
        const asset = await client.assets.upload(
          "image",
          createReadStream(localFile),
          { filename: basename(localFile) }
        );
        diagram.asset = { _type: "reference", _ref: asset._id };
        console.log(`    ↑ asset ${basename(localFile)}`);
      }
    }
    // Preserva le immagini caricate nello Studio (cover, diagrammi) se il
    // JSON non le porta: ri-lanciare l'import non deve perderle.
    if (!doc.cover && existing?.cover) doc.cover = existing.cover;
    if (!doc.diagrams && existing?.diagrams) doc.diagrams = existing.diagrams;
    await client.createOrReplace(doc);
    console.log(`  ✓ ${doc._id}`);
  }
  console.log(`Fatto: ${files.length} caso/i caricati su ${dataset}.`);
}

main().catch((err) => {
  console.error("✗ import fallito:", err.message);
  process.exit(1);
});
