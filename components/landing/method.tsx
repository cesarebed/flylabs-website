import type { Locale } from "@/lib/i18n";
import { landing } from "@/lib/landing-content";

export function Method({ lang }: { lang: Locale }) {
  const { section, steps } = landing.method;
  return (
    <section id="metodo" className="dark-section py-[120px] text-white">
      <div className="mx-auto max-w-[1120px] px-6">
        <h2 className="mb-14 font-display text-4xl font-semibold leading-tight">
          {section.title[lang]}
        </h2>

        {/* Desktop: 3 nodi collegati da una linea di flusso, non 3 card isolate
            (riusa il linguaggio visivo di globals.css .wire, disegnato per
            l'hero e mai usato). Griglia a colonne UGUALI (non flex-1: con
            colonne di larghezza diversa i connettori, messi in un elemento a
            parte tra le colonne, finivano scollegati dai cerchi veri e
            sembravano "tagliati"). Con colonne di uguale ampiezza il centro
            di ogni cerchio è sempre a `(colonna * larghezza) + 1.5rem` (metà
            di h-12/w-12): i due connettori sono quindi calcolati per
            estendersi esattamente dal bordo destro di un cerchio al bordo
            sinistro del successivo, niente di più. */}
        <div className="relative hidden md:grid md:grid-cols-3">
          {steps.map((step) => (
            <div key={step.n} className="min-w-0 pr-6">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full border border-white/15 bg-white/[0.06] font-display text-lg font-semibold text-peri">
                {step.n}
              </div>
              <h3 className="mb-2 text-xl font-bold">{step.title[lang]}</h3>
              <p className="max-w-[32ch] leading-relaxed text-white/65">
                {step.body[lang]}
              </p>
            </div>
          ))}
          {steps.slice(0, -1).map((_, i) => (
            <svg
              key={`wire-${i}`}
              viewBox="0 0 100 4"
              preserveAspectRatio="none"
              aria-hidden
              className="absolute top-6 h-1"
              style={{
                left: `calc(${i} * 100% / 3 + 3rem)`,
                width: `calc(100% / 3 - 3rem)`,
              }}
            >
              <line x1="0" y1="2" x2="100" y2="2" className="wire" />
            </svg>
          ))}
        </div>

        {/* Mobile: stack verticale semplice, niente connettori. */}
        <div className="grid grid-cols-1 gap-10 md:hidden">
          {steps.map((step) => (
            <div key={step.n}>
              <div className="mb-4 font-display text-5xl font-medium text-peri">
                {step.n}
              </div>
              <h3 className="mb-2 text-xl font-bold">{step.title[lang]}</h3>
              <p className="leading-relaxed text-white/65">{step.body[lang]}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
