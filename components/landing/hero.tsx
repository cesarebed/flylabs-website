import type { Locale } from "@/lib/i18n";
import { landing } from "@/lib/landing-content";
import { HeroScenarios, type ScenarioView } from "./hero-scenarios";
import { MagneticCta } from "./magnetic-cta";

export function Hero({
  lang,
  bookingUrl,
}: {
  lang: Locale;
  // Con il link di prenotazione la CTA primaria apre il calendario; senza,
  // scende al form in fondo alla pagina.
  bookingUrl?: string | null;
}) {
  const h = landing.hero;
  const sc = h.scenarios;
  // Stringhe risolte qui, lato server: al client component arriva solo la
  // lingua della pagina, non tutto landing-content.
  const scenarios: ScenarioView[] = sc.items.map((s) => ({
    id: s.id,
    tab: s.tab[lang],
    caseHref: `/${lang}${s.caseHref}`,
    sector: s.sector[lang],
    flow: s.flow[lang],
    flowMeta: s.flowMeta[lang],
    langChip: s.langChip[lang],
    langChipSr: s.langChipSr[lang],
    steps: [s.steps[0][lang], s.steps[1][lang], s.steps[2][lang]],
    input: {
      source: s.input.source,
      icon: s.input.icon,
      stars: s.input.stars,
      starsSr: s.input.stars ? sc.starsSr[lang] : undefined,
      meta: s.input.meta[lang],
      text: s.input.text[lang],
      attachment: s.input.attachment?.[lang],
    },
    output: {
      label: s.output.label[lang],
      text: s.output.text?.[lang],
      items: s.output.items?.map((item) => item[lang]),
      working: s.output.working[lang],
      done: s.output.done[lang],
    },
    actions: [s.actions[0][lang], s.actions[1][lang]],
    note: s.note[lang],
  }));

  return (
    // <section> e non <header>: l'header della pagina (landmark banner) è la
    // Nav; l'hero è la prima sezione del contenuto, etichettata dal suo h1.
    <section id="top" aria-labelledby="hero-title" className="dark-paper text-white">
      {/* lg:pt-16: da desktop il pannello (tab + card + didascalia) deve
          chiudersi sopra la pillola "Assistente AI" anche su schermi da
          800px di altezza, e la didascalia col link al caso restare visibile. */}
      <div className="mx-auto grid max-w-[1120px] grid-cols-1 items-center gap-12 px-6 pb-14 pt-10 md:gap-14 md:py-24 lg:grid-cols-[1.05fr_.95fr] lg:pt-16">
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
              href={bookingUrl || "#cta"}
              external={Boolean(bookingUrl)}
              className="btn-accent inline-block rounded-lg px-7 py-4 text-base font-bold"
            >
              {bookingUrl ? h.ctaBook[lang] : h.ctaPrimary[lang]}
              {bookingUrl && (
                <span className="sr-only"> {landing.shell.newTab[lang]}</span>
              )}
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

        {/* visual: pannello "l'AI prepara, tu approvi" su tre casi reali; la
            didascalia col link al caso sta dentro ogni tabpanel. min-w-0: la
            larghezza delle colonne non dipende dal contenuto del pannello
            (col font di fallback la riga dei tab allargava la colonna). */}
        <div className="fade mx-auto w-full min-w-0 max-w-[520px] lg:max-w-none" style={{ animationDelay: "0.1s" }}>
          <HeroScenarios
            scenarios={scenarios}
            labels={{
              tablist: sc.label[lang],
              casePrefix: sc.casePrefix[lang],
              caseCta: sc.caseCta[lang],
            }}
          />
        </div>
      </div>
    </section>
  );
}
