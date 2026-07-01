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
        <div className="grid grid-cols-1 gap-10 md:grid-cols-3">
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
