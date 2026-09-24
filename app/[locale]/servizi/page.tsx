import type { Metadata } from "next";
import Link from "next/link";
import { isLocale, defaultLocale, type Locale } from "@/lib/i18n";
import { landing } from "@/lib/landing-content";
import { buildMetadata, getSiteUrl } from "@/lib/seo";
import { cases } from "@/lib/cases-content";
import { siteBreadcrumbLd } from "@/lib/structured-data";
import { JsonLd } from "@/components/json-ld";
import { ClosingCta, WithArrow } from "@/components/landing/closing-cta";
import { PageHeader } from "@/components/landing/page-header";
import { PageShell } from "@/components/landing/page-shell";

export const revalidate = 3600;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const lang: Locale = isLocale(locale) ? locale : defaultLocale;
  const m = landing.services.meta[lang];
  return buildMetadata(lang, {
    title: m.title,
    description: m.description,
    path: "/servizi",
  });
}

export default async function ServicesPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const lang: Locale = isLocale(locale) ? locale : defaultLocale;
  const { kicker, title, intro, back, labels, closing } = landing.services;
  const { tracks, badgeFeatured } = landing.offer;
  const siteUrl = await getSiteUrl();

  return (
    <PageShell lang={lang}>
      <JsonLd
        data={siteBreadcrumbLd(siteUrl, lang, [
          { name: kicker[lang], path: "/servizi" },
        ])}
      />

      <PageHeader kicker={kicker[lang]} title={title[lang]} intro={intro[lang]} />

      <section className="bg-white py-16 md:py-[88px]">
        <div className="mx-auto flex max-w-[1120px] flex-col gap-6 px-6">
          {tracks.map((track, trackIndex) => {
            const featured = track.featured ?? false;
            const headingId = `binario-${track.anchor ?? trackIndex}`;
            return (
              <article
                key={track.title[lang]}
                id={track.anchor}
                className={`relative rounded-xl p-8 md:p-10 ${
                  featured
                    ? "border-2 border-accent bg-accent/[0.04]"
                    : "border border-line bg-paper"
                }`}
              >
                {featured && (
                  <span className="stamp absolute -top-3 left-8 rounded-full bg-accent px-3 py-1 text-white">
                    {badgeFeatured[lang]}
                  </span>
                )}

                <div className="grid gap-10 md:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
                  <div>
                    <span className="stamp text-muted">{track.kind[lang]}</span>
                    <h2
                      id={headingId}
                      className="mt-4 font-display text-3xl font-semibold leading-tight"
                    >
                      {track.title[lang]}
                    </h2>
                    <p className="mt-4 text-[15px] leading-relaxed text-muted">
                      {track.body[lang]}
                    </p>
                    <p className="mt-4 text-[15px] leading-relaxed text-ink/80">
                      <span className="font-semibold">{labels.who[lang]}: </span>
                      {track.who[lang]}
                    </p>

                    <dl className="mt-6 flex flex-wrap gap-x-10 gap-y-4 border-t border-line pt-6">
                      <div>
                        <dt className="stamp text-muted">
                          {labels.timeline[lang]}
                        </dt>
                        <dd className="mt-1 font-mono text-[13px] text-accent">
                          {track.timeline[lang]}
                        </dd>
                      </div>
                      <div>
                        <dt className="stamp text-muted">
                          {labels.price[lang]}
                        </dt>
                        <dd className="mt-1 font-mono text-[13px] text-accent">
                          {track.price[lang]}
                        </dd>
                      </div>
                    </dl>

                    {track.example && (
                      <Link
                        href={`/${lang}${track.example}`}
                        aria-describedby={headingId}
                        className="mt-6 inline-block text-sm font-semibold text-accent hover:underline"
                      >
                        <WithArrow>{cases.closing.realExample[lang]}</WithArrow>
                      </Link>
                    )}
                  </div>

                  <div>
                    <h3 className="stamp text-muted">{labels.includes[lang]}</h3>
                    <ul className="mt-4 space-y-2">
                      {track.includes.map((line) => (
                        <li
                          key={line[lang]}
                          className="flex gap-2 text-[15px] leading-snug text-ink/80"
                        >
                          <span aria-hidden className="text-accent">
                            ✓
                          </span>
                          {line[lang]}
                        </li>
                      ))}
                    </ul>

                    <h3 className="stamp mt-8 text-muted">
                      {labels.steps[lang]}
                    </h3>
                    <ol className="mt-4 space-y-3">
                      {track.steps.map((step, i) => (
                        <li key={step[lang]} className="flex gap-3">
                          <span className="secno mt-[3px] shrink-0 tabular-nums">
                            {String(i + 1).padStart(2, "0")}
                          </span>
                          <span className="text-[15px] leading-snug text-ink/80">
                            {step[lang]}
                          </span>
                        </li>
                      ))}
                    </ol>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </section>

      <ClosingCta
        title={closing.title[lang]}
        body={closing.body[lang]}
        cta={{ label: closing.cta[lang], href: `/${lang}#cta` }}
        secondary={{ label: back[lang], href: `/${lang}`, arrow: false }}
      />
    </PageShell>
  );
}
