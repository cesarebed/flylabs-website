import type { Locale } from "@/lib/i18n";
import { landing } from "@/lib/landing-content";
import { Reveal } from "./reveal";
import { Spotlight } from "./spotlight";

export function Why({ lang }: { lang: Locale }) {
  const { kicker, statementBefore, statementMark, chips } = landing.why;
  // Padding anche sopra: la sezione precedente (Lavori) chiude con una
  // hairline, e senza stacco il bordo della card ci finiva attaccato.
  return (
    <section className="bg-paper py-16 md:py-24 lg:py-[120px]">
      <div className="mx-auto max-w-[1120px] px-6">
        <Reveal>
          <Spotlight className="overflow-hidden rounded-2xl border border-line dot-paper p-6 md:p-16">
            <div className="max-w-3xl">
              <div className="kicker mb-5">{kicker[lang]}</div>
              <p className="mb-8 font-display text-2xl font-medium leading-[1.18] md:text-[2.5rem]">
                {statementBefore[lang]}
                <span className="mark">{statementMark[lang]}</span>
              </p>
              <div className="flex flex-wrap gap-3">
                {chips.map((chip) => (
                  <span
                    key={chip[lang]}
                    className="stamp rounded-full border border-line bg-white px-4 py-1.5"
                  >
                    {chip[lang]}
                  </span>
                ))}
              </div>
            </div>
          </Spotlight>
        </Reveal>
      </div>
    </section>
  );
}
