import { Geist, Inter, JetBrains_Mono } from "next/font/google";

// Font condivisi tra il layout del sito ([locale]) e quello dello Studio:
// definiti una volta sola così le CSS variables (--font-display/sans/mono)
// sono identiche ovunque e non si duplicano le istanze di next/font.

// Display per headline e logo — grotesk geometrico (Geist), non un serif
// "caratteriale": Fraunces è stato tolto il 2026-08-27, è uno dei due serif
// più abusati dai design generati da AI (vedi skill design-taste-frontend
// §4.1) ed era la causa della "f" di flylabs.ai che stonava nel logo.
export const geist = Geist({
  variable: "--font-display",
  subsets: ["latin"],
  display: "swap",
});

// Body sans — pulito e credibile.
export const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
  display: "swap",
});

// Micro-label / annotazioni da quaderno tecnico. Non precaricato: serve solo
// a testi piccoli e secondari, e il preload (~40 KB) competeva con i font del
// testo e con l'hero sul percorso critico mobile.
export const jetbrainsMono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  display: "swap",
  preload: false,
});

// Le tre variabili font da applicare al className di <html>.
export const fontVars = `${geist.variable} ${inter.variable} ${jetbrainsMono.variable}`;
