import type { Locale } from "@/lib/i18n";
import { landing } from "@/lib/landing-content";
import heroImage from "@/public/hero-automation-2.png";
import { HeroVisual } from "./hero-visual";
import { MagneticCta } from "./magnetic-cta";

export function Hero({ lang }: { lang: Locale }) {
  const h = landing.hero;
  return (
    // <section> e non <header>: l'header della pagina (landmark banner) è la
    // Nav; l'hero è la prima sezione del contenuto, etichettata dal suo h1.
    <section id="top" aria-labelledby="hero-title" className="dark-paper text-white">
      <div className="mx-auto grid max-w-[1120px] grid-cols-1 items-center gap-12 px-6 pb-14 pt-10 md:gap-16 md:py-[120px] lg:grid-cols-[1.15fr_.85fr]">
        {/* copy: niente .fade qui, il paragrafo è l'elemento LCP su mobile e
            un'entrata da opacity 0 ne ritardava il rendering (~570 ms). */}
        <div>
          <h1 id="hero-title" className="mb-5 font-display text-4xl font-semibold leading-[1.08] md:mb-7 md:text-5xl">
            {h.titleBefore[lang]} <span className="mark text-ink">{h.titleMark[lang]}</span>{" "}
            {h.titleAfter[lang]}
          </h1>
          <p className="mb-7 max-w-xl text-base leading-relaxed text-white/65 sm:text-lg md:mb-9 md:text-xl">
            {h.body[lang]}
            <span className="uline">{h.bodyMark[lang]}</span>
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

        {/* visual: render 3D del flusso di automazione, con tilt al passaggio del mouse */}
        <div className="fade" style={{ animationDelay: "0.1s" }}>
          <HeroVisual
            src={heroImage}
            alt={
              lang === "it"
                ? "Flusso di automazione: un messaggio da sito, WhatsApp o Instagram viene qualificato e gestito dall'AI, che prenota e avvisa."
                : "Automation flow: a message from your site, WhatsApp or Instagram is qualified and handled by AI, which books and notifies."
            }
            sizes="(min-width: 1024px) 540px, 100vw"
          />
        </div>
      </div>
    </section>
  );
}
