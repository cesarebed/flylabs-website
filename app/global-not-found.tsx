import type { Metadata } from "next";
import Link from "next/link";
import { fontVars } from "@/lib/fonts";
import "./globals.css";

export const metadata: Metadata = {
  title: "Pagina non trovata | flylabs.ai",
  description: "Pagina non trovata. / Page not found.",
};

// Sostituisce il classico app/not-found.tsx: il root layout vive sotto
// [locale] (segmento dinamico), quindi non c'è un app/layout.tsx dove
// comporre un 404 di root nel modo normale (vedi next.config.ts). Questo
// file bypassa il rendering standard e deve portarsi dietro tutto da solo:
// <html>/<body>, font, CSS globale.
//
// Serve solo i path SENZA lingua (/xyz, primo segmento diverso da it/en):
// quelli sotto /it o /en hanno la 404 localizzata di app/[locale]/not-found.tsx
// (via app/[locale]/[...rest]). Qui la lingua non si conosce, quindi resta
// bilingue: le righe inglesi in lang="en" (lo screen reader cambia voce) e
// una home per lingua.
export default function GlobalNotFound() {
  return (
    <html lang="it" className={`${fontVars} h-full antialiased`}>
      <body className="min-h-full flex flex-col">
        <main className="dark-paper flex flex-1 items-center justify-center px-6 py-24 text-white">
          <div className="max-w-lg text-center">
            <div className="mb-8 font-display text-2xl font-bold">
              flylabs<span className="logo-ai">.ai</span>
            </div>
            <div className="kicker mb-4 text-white/60">404</div>
            <h1 className="mb-5 font-display text-4xl font-semibold leading-tight">
              Pagina non trovata.
              <br />
              <span lang="en">Page not found.</span>
            </h1>
            <p className="mb-10 text-white/65">
              Il link potrebbe essere vecchio o scritto male.{" "}
              <span lang="en">The link might be old or mistyped.</span>
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <Link
                href="/it"
                className="btn-accent inline-block rounded-lg px-7 py-3.5 text-sm font-bold"
              >
                Torna alla home
              </Link>
              <Link
                href="/en"
                lang="en"
                hrefLang="en"
                className="btn-light inline-block rounded-lg px-7 py-3.5 text-sm font-bold"
              >
                Back to home
              </Link>
            </div>
          </div>
        </main>
      </body>
    </html>
  );
}
