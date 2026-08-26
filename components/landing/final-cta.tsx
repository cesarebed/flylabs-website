import type { Locale } from "@/lib/i18n";
import { landing } from "@/lib/landing-content";
import { ContactForm } from "./contact-form";
import { Reveal } from "./reveal";
import { Spotlight } from "./spotlight";

export function FinalCta({ lang }: { lang: Locale }) {
  const { title, body } = landing.finalCta;
  return (
    <section id="cta" className="dot-paper py-[120px]">
      <Spotlight size={720} className="mx-auto max-w-[1120px] px-6 text-center">
        <Reveal>
          <h2 className="mb-5 font-display text-4xl font-semibold leading-tight md:text-5xl">
            {title[lang]}
          </h2>
          <p className="mx-auto mb-10 max-w-xl text-xl text-muted">{body[lang]}</p>
          <ContactForm lang={lang} />
        </Reveal>
      </Spotlight>
    </section>
  );
}
