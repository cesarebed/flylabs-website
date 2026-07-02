import type { Locale } from "@/lib/i18n";
import { landing } from "@/lib/landing-content";

export function Why({ lang }: { lang: Locale }) {
  const { kicker, statementBefore, statementMark, chips } = landing.why;
  return (
    <section className="pb-[120px]">
      <div className="mx-auto max-w-[1120px] px-6">
        <div className="dot-paper rounded-2xl border border-line p-10 md:p-16">
          <div className="max-w-3xl">
            <div className="kicker mb-5">{kicker[lang]}</div>
            <p className="mb-10 font-display text-3xl font-medium leading-[1.18] md:text-[2.5rem]">
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
        </div>
      </div>
    </section>
  );
}
