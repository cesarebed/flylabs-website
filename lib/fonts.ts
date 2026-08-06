import { Fraunces, Inter, JetBrains_Mono } from "next/font/google";

// Font condivisi tra il layout del sito ([locale]) e quello dello Studio:
// definiti una volta sola così le CSS variables (--font-display/sans/mono)
// sono identiche ovunque e non si duplicano le istanze di next/font.

// Display serif for headlines — caratteriale, "meno vibe-AI".
export const fraunces = Fraunces({
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

// Micro-label / annotazioni da quaderno tecnico.
export const jetbrainsMono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  display: "swap",
});

// Le tre variabili font da applicare al className di <html>.
export const fontVars = `${fraunces.variable} ${inter.variable} ${jetbrainsMono.variable}`;
