import type { Locale } from "@/lib/i18n";
import { landing } from "@/lib/landing-content";
import { LogoMarquee } from "./logo-marquee";
import { Reveal } from "./reveal";

export function ToolsStrip({ lang }: { lang: Locale }) {
  const { kicker, title, body, cta, href, logos } = landing.toolsStrip;
  return (
    <section className="overflow-hidden border-t border-line bg-white py-[100px]">
      <div className="mx-auto max-w-[1120px] px-6">
        <Reveal className="max-w-md">
          <div className="kicker mb-4">{kicker[lang]}</div>
          <h2 className="mb-4 font-display text-3xl font-semibold leading-tight md:text-4xl">
            {title[lang]}
          </h2>
          <p className="mb-6 text-muted">{body[lang]}</p>
          <a
            href={`/${lang}${href}`}
            className="text-sm font-semibold text-accent hover:underline"
          >
            {cta[lang]}
          </a>
        </Reveal>
      </div>

      {/* Full-bleed: unica sezione della pagina che rompe il max-w-[1120px],
          coerente con l'idea di un flusso continuo di strumenti. */}
      <div className="mt-14">
        <LogoMarquee logos={logos} />
      </div>
    </section>
  );
}
