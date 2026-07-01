import type { Locale } from "@/lib/i18n";
import { landing } from "@/lib/landing-content";

export function Offer({ lang }: { lang: Locale }) {
  const { section, tracks, cta, badgeFeatured } = landing.offer;
  return (
    <section id="offerta" className="border-y border-line bg-white py-[120px]">
      <div className="mx-auto max-w-[1120px] px-6">
        <div className="mb-14 flex flex-wrap items-end justify-between gap-4">
          <div>
            <div className="kicker mb-4">{section.kicker[lang]}</div>
            <h2 className="font-display text-4xl font-semibold leading-tight">
              {section.title[lang]}
            </h2>
          </div>
          <p className="max-w-sm text-muted">{section.intro[lang]}</p>
        </div>

        <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
          {tracks.map((track) => {
            const featured = track.featured ?? false;
            return (
              <div
                key={track.title[lang]}
                className={
                  featured
                    ? "card-hover relative flex flex-col rounded-xl border-2 border-accent bg-accent/[0.04] p-7"
                    : "card-hover relative flex flex-col rounded-xl border border-line bg-paper p-7"
                }
              >
                {featured && (
                  <span className="stamp absolute -top-3 left-7 rounded-full bg-accent px-3 py-1 text-white">
                    {badgeFeatured[lang]}
                  </span>
                )}
                <span className="stamp mb-6 text-muted">{track.kind[lang]}</span>
                <h3 className="mb-2 text-xl font-bold">{track.title[lang]}</h3>
                <p className="mb-6 text-[15px] leading-relaxed text-muted">
                  {track.body[lang]}
                </p>
                <div className="mt-auto border-t border-line pt-6">
                  <div className="mb-5 font-mono text-[13px] text-accent">
                    {track.price[lang]}
                  </div>
                  <a
                    href="#cta"
                    className={
                      featured
                        ? "btn-accent block rounded-lg px-5 py-2.5 text-center text-sm font-semibold"
                        : "block rounded-lg border border-line px-5 py-2.5 text-center text-sm font-semibold text-accent transition-colors hover:border-accent"
                    }
                  >
                    {cta[lang]}
                  </a>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
