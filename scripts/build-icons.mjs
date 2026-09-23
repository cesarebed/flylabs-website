#!/usr/bin/env node
/**
 * Estrae in lib/icons.generated.json solo le icone Iconify usate dal sito,
 * così components/landing/icon.tsx le rende come <svg> inline senza nessuna
 * richiesta ad api.iconify.design (niente IP a terzi prima del consenso,
 * icone già nell'HTML SSR, hamburger mai vuoto).
 *
 * Come funziona:
 * - le collezioni disponibili sono i pacchetti `@iconify-json/<prefisso>` in
 *   devDependencies (per un set nuovo: `npm i -D @iconify-json/<prefisso>`);
 * - scansiona app/, components/, lib/, sanity/ cercando stringhe letterali
 *   "<prefisso>:<nome>" con un prefisso installato (es. "logos:hubspot" in
 *   lib/tech-icons.ts o lib/landing-content.ts);
 * - risolve alias e default del set con getIconData e scrive il JSON ordinato
 *   (diff stabili). Un'icona citata ma assente dal set fa fallire lo script.
 *
 * Gira in `predev` e `prebuild`; il JSON è committato, quindi il sito
 * funziona anche senza rigenerarlo.
 */
import { readFileSync, readdirSync, statSync, writeFileSync } from "node:fs";
import { createRequire } from "node:module";
import { dirname, join, relative } from "node:path";
import { fileURLToPath } from "node:url";
import { getIconData } from "@iconify/utils/lib/icon-set/get-icon";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const require = createRequire(join(root, "package.json"));
const OUT = join(root, "lib", "icons.generated.json");
const SCAN_DIRS = ["app", "components", "lib", "sanity"];
const EXT = /\.(?:tsx?|jsx?|mjs)$/;

const pkg = JSON.parse(readFileSync(join(root, "package.json"), "utf8"));
const prefixes = Object.keys({ ...pkg.dependencies, ...pkg.devDependencies })
  .filter((name) => name.startsWith("@iconify-json/"))
  .map((name) => name.slice("@iconify-json/".length));

function* walk(dir) {
  for (const entry of readdirSync(dir)) {
    const path = join(dir, entry);
    if (statSync(path).isDirectory()) yield* walk(path);
    else if (EXT.test(entry)) yield path;
  }
}

const literal = new RegExp(
  `["'\`](${prefixes.map((p) => p.replace(/[-]/g, "\\-")).join("|")}):([a-z0-9]+(?:-[a-z0-9]+)*)["'\`]`,
  "g"
);

/** "prefix:name" → file in cui compare (per l'errore). */
const used = new Map();
for (const dir of SCAN_DIRS) {
  let files;
  try {
    files = [...walk(join(root, dir))];
  } catch {
    continue;
  }
  for (const file of files) {
    const src = readFileSync(file, "utf8");
    for (const [, prefix, name] of src.matchAll(literal)) {
      const key = `${prefix}:${name}`;
      if (!used.has(key)) used.set(key, relative(root, file));
    }
  }
}

const sets = new Map();
const icons = {};
const missing = [];
for (const key of [...used.keys()].sort()) {
  const [prefix, name] = key.split(":");
  if (!sets.has(prefix)) {
    sets.set(prefix, require(`@iconify-json/${prefix}/icons.json`));
  }
  const data = getIconData(sets.get(prefix), name);
  if (!data) {
    missing.push(`${key} (${used.get(key)})`);
    continue;
  }
  const { body, left, top, width, height, rotate, hFlip, vFlip } = data;
  const icon = { body };
  if (left) icon.left = left;
  if (top) icon.top = top;
  icon.width = width ?? 16;
  icon.height = height ?? 16;
  if (rotate) icon.rotate = rotate;
  if (hFlip) icon.hFlip = true;
  if (vFlip) icon.vFlip = true;
  // id interni (gradienti, clipPath): Icon li rende unici per istanza
  const ids = [...body.matchAll(/\sid="(\S+?)"/g)].map((m) => m[1]);
  if (ids.length) icon.ids = ids;
  icons[key] = icon;
}

if (missing.length) {
  console.error(
    `[build-icons] icone non trovate nei set installati:\n  ${missing.join("\n  ")}`
  );
  process.exit(1);
}

const next = `${JSON.stringify(icons, null, 1)}\n`;
let prev = "";
try {
  prev = readFileSync(OUT, "utf8");
} catch {
  // primo giro
}
if (prev !== next) writeFileSync(OUT, next);
console.log(
  `[build-icons] ${Object.keys(icons).length} icone da ${sets.size} set → ${relative(root, OUT)}${prev === next ? " (invariato)" : ""}`
);
