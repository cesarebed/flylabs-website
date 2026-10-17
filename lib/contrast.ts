// WCAG 2.x contrast (Playbook 2.4) and a reader of the theme tokens in
// app/globals.css, for the contrast test. Pure: the test reads the file.
//
// FlyLabs Kit registry module `tema` (from Stellar Reviews,
// web/lib/theme-contrast.test.ts, and WeGrocery, lib/brand/contrast.ts).
// Copied to lib/contrast.ts on 2026-10-17 (kit v0.11, modulo tema 1.0).

export type Rgb = [number, number, number];

// #rgb or #rrggbb; null for anything else.
export function parseHex(value: string): Rgb | null {
  const m = /^#([0-9a-f]{3}|[0-9a-f]{6})$/i.exec(value.trim());
  if (!m) return null;
  const hex = m[1].length === 3 ? [...m[1]].map((c) => c + c).join("") : m[1];
  return [0, 2, 4].map((i) => parseInt(hex.slice(i, i + 2), 16)) as Rgb;
}

function toHex(rgb: Rgb): string {
  return `#${rgb.map((v) => Math.round(v).toString(16).padStart(2, "0")).join("")}`;
}

function luminance([r, g, b]: Rgb): number {
  const [lr, lg, lb] = [r, g, b].map((v) => {
    const c = v / 255;
    return c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4;
  });
  return 0.2126 * lr + 0.7152 * lg + 0.0722 * lb;
}

// The contrast ratio, from 1 to 21; NaN when either colour is not a hex.
export function contrastRatio(a: string, b: string): number {
  const ra = parseHex(a);
  const rb = parseHex(b);
  if (!ra || !rb) return NaN;
  const [hi, lo] = [luminance(ra), luminance(rb)].sort((x, y) => y - x);
  return (hi + 0.05) / (lo + 0.05);
}

// `top` at `share` (0 to 1) over `base`, as color-mix(in srgb) and
// bg-primary/20 do it.
export function mixHex(top: string, base: string, share: number): string {
  const t = parseHex(top);
  const b = parseHex(base);
  if (!t || !b) throw new Error(`cannot mix ${top} and ${base}`);
  return toHex(t.map((v, i) => v * share + b[i] * (1 - share)) as Rgb);
}

export type ThemeTokens = Record<string, string>;

// The raw values of the custom properties declared in one block, comments
// removed. Names without the leading "--".
function declarations(block: string): ThemeTokens {
  const out: ThemeTokens = {};
  for (const m of block.replace(/\/\*[\s\S]*?\*\//g, "").matchAll(/--([\w-]+)\s*:\s*([^;{}]+);/g)) out[m[1]] = m[2].trim();
  return out;
}

// The body of the block opened at `start` (the index of its "{"), up to its
// own closing brace.
function blockAt(css: string, start: number): string {
  let depth = 0;
  for (let i = start; i < css.length; i++) {
    if (css[i] === "{") depth += 1;
    else if (css[i] === "}" && --depth === 0) return css.slice(start + 1, i);
  }
  throw new Error("unclosed block in globals.css");
}

// The light and the dark tokens of app/globals.css, each fully resolved to
// a hex. Light: the first `:root {` block. Dark: the first `@variant dark {`
// block (Stellar, with @custom-variant dark on data-theme) or, failing that,
// the first `:root[data-theme="dark"] {` block. The dark block sets only
// what changes; anything else comes from the light one.
export function readThemeTokens(css: string): { light: ThemeTokens; dark: ThemeTokens } {
  const clean = css.replace(/\/\*[\s\S]*?\*\//g, (comment) => " ".repeat(comment.length));
  const lightAt = clean.search(/:root\s*\{/);
  if (lightAt < 0) throw new Error("no :root block in globals.css");
  const darkAt = [/@variant\s+dark\s*\{/, /:root\[data-theme=["']?dark["']?\]\s*\{/]
    .map((re) => clean.search(re))
    .find((i) => i >= 0);
  if (darkAt === undefined) throw new Error("no dark block in globals.css (@variant dark or :root[data-theme=\"dark\"])");
  const light = declarations(blockAt(clean, clean.indexOf("{", lightAt)));
  const dark = { ...light, ...declarations(blockAt(clean, clean.indexOf("{", darkAt))) };
  return { light: resolveAll(light), dark: resolveAll(dark) };
}

// Every token to a hex: a hex as is, var(--x) through the other tokens,
// color-mix(in srgb, A N%, B) mixed here as the browser does. Tokens that are
// not colours (sizes, radii, fonts) are left out.
function resolveAll(raw: ThemeTokens): ThemeTokens {
  const out: ThemeTokens = {};
  for (const name of Object.keys(raw)) {
    const value = resolveColor(raw[name], raw);
    if (value) out[name] = value;
  }
  return out;
}

export function resolveColor(value: string, tokens: ThemeTokens, depth = 0): string | null {
  if (depth > 10) throw new Error(`var() loop at ${value}`);
  const v = value.trim();
  const hex = parseHex(v);
  if (hex) return toHex(hex);
  const ref = /^var\(--([\w-]+)\)$/.exec(v);
  if (ref) return tokens[ref[1]] === undefined ? null : resolveColor(tokens[ref[1]], tokens, depth + 1);
  const mix = /^color-mix\(\s*in srgb\s*,\s*(.+?)\s+(\d+(?:\.\d+)?)%\s*,\s*(.+?)\s*\)$/i.exec(v);
  if (mix) {
    const a = resolveColor(mix[1], tokens, depth + 1);
    const b = resolveColor(mix[3], tokens, depth + 1);
    if (!a || !b) throw new Error(`cannot resolve ${v}`);
    return mixHex(a, b, Number(mix[2]) / 100);
  }
  return null;
}
