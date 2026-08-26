import type { Metadata } from "next";
import Link from "next/link";
import { fontVars } from "@/lib/fonts";
import "./globals.css";

export const metadata: Metadata = {
  title: "Pagina non trovata | flylabs.ai",
  description: "This page does not exist.",
};

// Sostituisce il classico app/not-found.tsx: il root layout vive sotto
// [locale] (segmento dinamico), quindi non c'è un app/layout.tsx dove
// comporre un 404 di root nel modo normale (vedi next.config.ts). Questo
// file bypassa il rendering standard e deve portarsi dietro tutto da solo:
// <html>/<body>, font, CSS globale. Bilingue perché non c'è nessun
// `[locale]` risolto quando si finisce qui (route del tutto sconosciuta, o
// primo segmento che non è "it"/"en").
export default function GlobalNotFound() {
  return (
    <html lang="it" className={`${fontVars} h-full antialiased`}>
      <body className="min-h-full flex flex-col">
        <main className="dark-paper flex flex-1 items-center justify-center px-6 py-24 text-white">
          <div className="max-w-lg text-center">
            <div className="mb-8 font-display text-2xl font-bold">
              flylabs<span className="logo-ai">.ai</span>
            </div>
            <div className="kicker mb-4 text-white/50">404</div>
            <h1 className="mb-5 font-display text-4xl font-semibold leading-tight">
              Pagina non trovata.
              <br />
              Page not found.
            </h1>
            <p className="mb-10 text-white/65">
              Il link potrebbe essere vecchio o scritto male. / The link might be old
              or mistyped.
            </p>
            <Link
              href="/it"
              className="btn-accent inline-block rounded-lg px-7 py-3.5 text-sm font-bold"
            >
              Torna alla home / Back home
            </Link>
          </div>
        </main>
      </body>
    </html>
  );
}
