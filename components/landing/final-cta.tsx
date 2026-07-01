import type { Locale } from "@/lib/i18n";
import { landing } from "@/lib/landing-content";

export function FinalCta({ lang }: { lang: Locale }) {
  const { title, body, cta } = landing.finalCta;
  return (
    <section id="cta" className="dot-paper py-[120px]">
      <div className="mx-auto max-w-[1120px] px-6 text-center">
        <h2 className="mb-5 font-display text-4xl font-semibold leading-tight md:text-5xl">
          {title[lang]}
        </h2>
        <p className="mx-auto mb-10 max-w-xl text-xl text-muted">{body[lang]}</p>
        <a
          href="#"
          className="btn-ink inline-block rounded-lg px-9 py-5 text-lg font-bold"
        >
          {cta[lang]}
        </a>
      </div>
    </section>
  );
}
