// Contrasto dei token del sito (Playbook FlyLabs Kit 2.4): 4,5:1 per il
// testo, 3:1 per il focus. Legge i token del blocco `@theme` di
// app/globals.css, quindi un cambio di palette che rompe il contrasto fa
// fallire il test prima del merge.
//
// Il sito ha un solo tema (le sezioni scure sono sfondi, non un tema), per
// questo non usa `readThemeTokens` del kit, che vuole anche il blocco scuro.

import { readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import { contrastRatio, mixHex, resolveColor, type ThemeTokens } from "./contrast";

const css = readFileSync(join(__dirname, "..", "app", "globals.css"), "utf8");

// I `--color-*` del blocco `@theme {`, già risolti in esadecimale. Nomi senza
// il prefisso `--color-`.
function siteTokens(source: string): ThemeTokens {
  const clean = source.replace(/\/\*[\s\S]*?\*\//g, "");
  const start = clean.search(/@theme\s*\{/);
  if (start < 0) throw new Error("no @theme block in globals.css");
  const body = clean.slice(clean.indexOf("{", start) + 1, clean.indexOf("}", start));
  const raw: ThemeTokens = {};
  for (const m of body.matchAll(/--([\w-]+)\s*:\s*([^;]+);/g)) raw[m[1]] = m[2].trim();
  const out: ThemeTokens = {};
  for (const name of Object.keys(raw)) {
    if (!name.startsWith("color-")) continue;
    const value = resolveColor(raw[name], raw);
    if (value) out[name.slice("color-".length)] = value;
  }
  return out;
}

const t = siteTokens(css);
const WHITE = "#ffffff";

// [testo, sfondo, dove sta]
const TEXT_PAIRS: [string, string, string][] = [
  [t.foreground, t.background, "foreground su background"],
  [t.foreground, t.card, "foreground su card"],
  [t["card-foreground"], t.card, "card-foreground su card"],
  [t["muted-foreground"], t.background, "muted-foreground su background"],
  [t["muted-foreground"], t.card, "muted-foreground su card"],
  [t["primary-text"], t.background, "primary-text su background"],
  [t["primary-text"], t.card, "primary-text su card"],
  [t["primary-foreground"], t.primary, "primary-foreground su primary (btn-accent)"],
  // Propri del sito
  [t.ink, t.mark, "ink sull'evidenziatore .mark"],
  [WHITE, t.ink, "bianco su ink (btn-ink, .dark-section)"],
  [WHITE, t.dark, "bianco su dark (hero)"],
  [mixHex(WHITE, t.dark, 0.6), t.dark, "text-white/60 su dark"],
  [mixHex(WHITE, t.ink, 0.6), t.ink, "text-white/60 su ink"],
];

const NON_TEXT_PAIRS: [string, string, string][] = [
  [t.ring, t.background, "ring su background"],
  [t.ring, t.card, "ring su card"],
  [WHITE, t.dark, "anello di focus bianco su dark"],
];

describe("token per ruolo", () => {
  it("sono alias dei colori del brand", () => {
    expect(t.background).toBe(t.paper);
    expect(t.foreground).toBe(t.ink);
    expect(t.primary).toBe(t.accent);
    expect(t["muted-foreground"]).toBe(t.muted);
    expect(t.border).toBe(t.line);
    expect(t.ring).toBe(t.accent);
  });
});

describe("contrasto", () => {
  it.each(TEXT_PAIRS)("%s su %s (%s) almeno 4,5:1", (fg, bg) => {
    expect(contrastRatio(fg, bg)).toBeGreaterThanOrEqual(4.5);
  });

  it.each(NON_TEXT_PAIRS)("%s su %s (%s) almeno 3:1", (fg, bg) => {
    expect(contrastRatio(fg, bg)).toBeGreaterThanOrEqual(3);
  });
});
