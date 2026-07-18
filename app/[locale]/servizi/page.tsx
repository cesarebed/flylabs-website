import type { Metadata } from "next";
import Link from "next/link";
import { isLocale, defaultLocale, type Locale } from "@/lib/i18n";
import { landing } from "@/lib/landing-content";
import { buildMetadata, getSiteUrl } from "@/lib/seo";
import { breadcrumbLd } from "@/lib/structured-data";
import { JsonLd } from "@/components/json-ld";
import { Footer } from "@/components/landing/footer";
import { LangToggle } from "@/components/landing/lang-toggle";

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
    <main className="site-zoom flex-1">
      <JsonLd
        data={breadcrumbLd([
          { name: "flylabs.ai", url: `${siteUrl}/${lang}` },
          { name: title[lang], url: `${siteUrl}/${lang}/servizi` },
        ])}
      />

      <header className="nav-light sticky top-0 z-50 border-b border-line backdrop-blur">
        <div className="mx-auto flex h-16 max-w-[1120px] items-center justify-between px-6">
          <Link
            href={`/${lang}`}
            className="font-display text-2xl font-bold tracking-tight"
          >
            flylabs<span className="logo-ai">.ai</span>
          </Link>
          <LangToggle lang={lang} />
        </div>
      </header>

      <section className="dot-paper border-b border-line py-[88px]">
        <div className="mx-auto max-w-[1120px] px-6">
          <div className="kicker mb-4">{kicker[lang]}</div>
          <h1 className="max-w-[18ch] font-display text-5xl font-semibold leading-[1.05]">
            {title[lang]}
          </h1>
          <p className="mt-6 max-w-[58ch] text-lg leading-relaxed text-muted">
            {intro[lang]}
          </p>
        </div>
      </section>

      <section className="bg-white py-[88px]">
        <div className="mx-auto flex max-w-[1120px] flex-col gap-6 px-6">
          {tracks.map((track) => {
            const featured = track.featured ?? false;
            return (
              <article
                key={track.title[lang]}
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
                    <h2 className="mt-4 font-display text-3xl font-semibold leading-tight">
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

      <section className="dark-section py-[88px] text-white">
        <div className="mx-auto max-w-[1120px] px-6">
          <h2 className="max-w-[20ch] font-display text-4xl font-semibold leading-tight">
            {closing.title[lang]}
          </h2>
          <p className="mt-5 max-w-[56ch] text-lg leading-relaxed text-white/70">
            {closing.body[lang]}
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-6">
            <Link
              href={`/${lang}#cta`}
              className="btn-light rounded-lg px-6 py-3 text-sm font-semibold"
            >
              {closing.cta[lang]}
            </Link>
            <Link
              href={`/${lang}`}
              className="text-sm font-medium text-white/60 transition-colors hover:text-white"
            >
              {back[lang]}
            </Link>
          </div>
        </div>
      </section>

      <Footer lang={lang} />
    </main>
  );
}
