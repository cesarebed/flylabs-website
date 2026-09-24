import type { ReactNode } from "react";
import type { Locale } from "@/lib/i18n";
import { landing } from "@/lib/landing-content";
import { Footer } from "./footer";
import { Nav } from "./nav";

/**
 * Cornice di ogni pagina pubblica sotto [locale]: skip link, Nav, <main> e
 * Footer. Prima ogni pagina rendeva <main className="site-zoom"> con Nav e
 * Footer dentro: niente landmark banner/contentinfo e nessun modo di saltare
 * la navigazione. Lo zoom del sito resta sul wrapper, così nav e footer
 * escono da <main> senza cambiare scala.
 */
export function PageShell({
  lang,
  children,
}: {
  lang: Locale;
  children: ReactNode;
}) {
  return (
    <div className="site-zoom flex flex-1 flex-col">
      <a
        href="#contenuto"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-3 focus:z-[60] focus:rounded-lg focus:bg-ink focus:px-4 focus:py-2.5 focus:text-sm focus:font-semibold focus:text-white"
      >
        {landing.shell.skip[lang]}
      </a>
      <Nav lang={lang} />
      {/* tabIndex -1: lo skip link sposta davvero il focus su main (Safari
          altrimenti sposta solo lo scroll); nessun anello su un contenitore. */}
      <main id="contenuto" tabIndex={-1} className="flex-1 focus:outline-none">
        {children}
      </main>
      <Footer lang={lang} />
    </div>
  );
}
