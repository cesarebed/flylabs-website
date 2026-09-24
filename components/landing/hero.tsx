import Link from "next/link";
import type { Locale } from "@/lib/i18n";
import { landing } from "@/lib/landing-content";
import diagramIt from "@/public/hero/noleggio-bici-assistente-multisito-it.png";
import diagramEn from "@/public/hero/noleggio-bici-assistente-multisito-en.png";
import { HeroVisual } from "./hero-visual";
import { MagneticCta } from "./magnetic-cta";

// Diagramma Excalidraw reale del caso del noleggio bici, nella lingua della
// pagina: export di content/case-studies/assets/ ritagliati del titolo (il
// contesto lo dà la didascalia) e ridotti a PNG a palette (~50 KB).
const DIAGRAM = { it: diagramIt, en: diagramEn } as const;

export function Hero({ lang }: { lang: Locale }) {
  const h = landing.hero;
  const v = h.visual;
  return (
    // <section> e non <header>: l'header della pagina (landmark banner) è la
    // Nav; l'hero è la prima sezione del contenuto, etichettata dal suo h1.
    <section id="top" aria-labelledby="hero-title" className="dark-paper text-white">
      <div className="mx-auto grid max-w-[1120px] grid-cols-1 items-center gap-12 px-6 pb-14 pt-10 md:gap-16 md:py-24 lg:grid-cols-[1.15fr_.85fr]">
        {/* copy: niente .fade qui, il paragrafo è l'elemento LCP su mobile e
            un'entrata da opacity 0 ne ritardava il rendering (~570 ms). */}
        <div>
          <h1 id="hero-title" className="mb-5 font-display text-4xl font-semibold leading-[1.08] md:mb-7 md:text-5xl">
            {h.titleBefore[lang]} <span className="mark text-ink">{h.titleMark[lang]}</span>{" "}
            {h.titleAfter[lang]}
          </h1>
          <p className="mb-7 max-w-xl text-base leading-relaxed text-white/65 sm:text-lg md:mb-9 md:text-xl">
            {h.body[lang]}
            <span className="uline whitespace-nowrap">{h.bodyMark[lang]}</span>
            {h.bodyAfter[lang]}
          </p>
          <div className="mb-6 flex flex-wrap items-center gap-4">
            <MagneticCta
              href="#cta"
              className="btn-accent inline-block rounded-lg px-7 py-4 text-base font-bold"
            >
              {h.ctaPrimary[lang]}
            </MagneticCta>
            <a
              href="#lavori"
              className="border-b-2 border-white/70 pb-0.5 text-base font-semibold transition-colors hover:border-mark hover:text-mark"
            >
              {h.ctaSecondary[lang]}
            </a>
          </div>
          <p className="text-sm text-white/60">{h.note[lang]}</p>
        </div>

        {/* visual: il flusso reale di un caso in un riquadro chiaro, con tilt
            al passaggio del mouse; sotto, fuori dal riquadro, il link al caso. */}
        <figure className="fade mx-auto w-full max-w-[460px] lg:max-w-none" style={{ animationDelay: "0.1s" }}>
          <HeroVisual
            src={DIAGRAM[lang]}
            alt={v.alt[lang]}
            // Da lg: colonna .85fr della griglia da 1120px (≈430px) × zoom
            // 1.15. Sotto: riquadro largo al massimo 460px, senza zoom.
            sizes="(min-width: 1024px) 500px, (min-width: 508px) 460px, calc(100vw - 48px)"
          />
          <figcaption className="mt-4 text-sm leading-relaxed text-white/60">
            {v.casePrefix[lang]} {v.sector[lang]}.{" "}
            <Link
              href={`/${lang}${v.caseHref}`}
              className="whitespace-nowrap font-semibold text-white underline decoration-white/40 underline-offset-4 transition-colors hover:text-mark hover:decoration-mark"
            >
              {v.caseCta[lang]}
            </Link>
          </figcaption>
        </figure>
      </div>
    </section>
  );
}
