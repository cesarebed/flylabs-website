import { Fragment } from "react";
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
            l'hero e mai usato). Ogni segmento è un SVG a sé, dimensionato dal
            proprio spazio flex: nessuna percentuale calcolata a mano. */}
        <div className="hidden md:flex md:items-start">
          {steps.map((step, i) => (
            <Fragment key={step.n}>
              <div className="min-w-0 flex-1">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full border border-white/15 bg-white/[0.06] font-display text-lg font-semibold text-peri">
                  {step.n}
                </div>
                <h3 className="mb-2 text-xl font-bold">{step.title[lang]}</h3>
                <p className="max-w-[32ch] leading-relaxed text-white/65">
                  {step.body[lang]}
                </p>
              </div>
              {i < steps.length - 1 && (
                <svg
                  viewBox="0 0 100 4"
                  preserveAspectRatio="none"
                  className="mt-6 h-1 w-full min-w-8 flex-1"
                  aria-hidden
                >
                  <line x1="0" y1="2" x2="100" y2="2" className="wire" />
                </svg>
              )}
            </Fragment>
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
