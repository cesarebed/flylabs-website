import { readFile } from "node:fs/promises";
import { join } from "node:path";

// Logo orizzontale per le immagini OG (next/og non legge i file di public/
// da URL relativo): l'SVG del kit come data URI, da passare a <img>.
// Proporzioni dal viewBox del file (202,9 × 45,5).
export const OG_LOGO_RATIO = 202.9 / 45.5;

export async function ogLogoDark(): Promise<string> {
  const svg = await readFile(join(process.cwd(), "public/logo/flylabs-lockup-dark.svg"));
  return `data:image/svg+xml;base64,${svg.toString("base64")}`;
}
