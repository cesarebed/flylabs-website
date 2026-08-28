import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { isLocale, defaultLocale, type Locale } from "@/lib/i18n";
import { landing } from "@/lib/landing-content";
import { buildMetadata, getSiteUrl } from "@/lib/seo";
import { breadcrumbLd } from "@/lib/structured-data";
import { JsonLd } from "@/components/json-ld";
import { Footer } from "@/components/landing/footer";
import { Nav } from "@/components/landing/nav";
import { Reveal } from "@/components/landing/reveal";

export const revalidate = 3600;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const lang: Locale = isLocale(locale) ? locale : defaultLocale;
  const m = landing.stellarReviews.meta[lang];
  return buildMetadata(lang, {
    title: m.title,
    description: m.description,
    path: "/stellar-reviews",
  });
}

export default async function StellarReviewsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const lang: Locale = isLocale(locale) ? locale : defaultLocale;
  const {
    kicker,
    title,
    tagline,
    problem,
    solution,
    featuresTitle,
    features,
    modesTitle,
    modeCustom,
    modeSaas,
    caseLink,
    back,
    logo,
  } = landing.stellarReviews;
  const siteUrl = await getSiteUrl();

  return (
    <main className="site-zoom flex-1">
      <JsonLd
        data={breadcrumbLd([
          { name: "flylabs.ai", url: `${siteUrl}/${lang}` },
          {
            name: landing.products.kicker[lang],
            url: `${siteUrl}/${lang}/prodotti`,
          },
          { name: title[lang], url: `${siteUrl}/${lang}/stellar-reviews` },
        ])}
      />

      <Nav lang={lang} />

      <section className="dot-paper border-b border-line py-[88px]">
        <div className="mx-auto max-w-[1120px] px-6">
          <div className="mb-6 flex h-16 w-16 items-center justify-center overflow-hidden rounded-xl">
            <Image src={logo} alt="" width={64} height={64} />
          </div>
          <div className="kicker mb-4">{kicker[lang]}</div>
          <h1 className="max-w-[20ch] font-display text-5xl font-semibold leading-[1.05]">
            {title[lang]}
          </h1>
          <p className="mt-6 max-w-[58ch] text-lg leading-relaxed text-muted">
            {tagline[lang]}
          </p>
        </div>
      </section>

      <section className="bg-white py-[88px]">
        <div className="mx-auto max-w-[1120px] px-6">
          <Reveal>
            <div className="grid gap-10 md:grid-cols-2">
              <div>
                <h2 className="stamp text-muted">
                  {landing.productLabels.problem[lang]}
                </h2>
                <p className="mt-4 text-[15px] leading-relaxed text-ink/80">
                  {problem[lang]}
                </p>
              </div>
              <div>
                <h2 className="stamp text-accent">
                  {landing.productLabels.solution[lang]}
                </h2>
                <p className="mt-4 text-[15px] leading-relaxed text-ink/80">
                  {solution[lang]}
                </p>
              </div>
            </div>
          </Reveal>

          <Reveal className="mt-16">
            <h2 className="font-display text-2xl font-semibold">
              {featuresTitle[lang]}
            </h2>
            <ul className="mt-6 space-y-4">
              {features.map((line) => (
                <li key={line[lang]} className="flex gap-3">
                  <span aria-hidden className="mt-1 shrink-0 text-accent">
                    ✓
                  </span>
                  <span className="text-[15px] leading-relaxed text-ink/80">
                    {line[lang]}
                  </span>
                </li>
              ))}
            </ul>
          </Reveal>

          <div className="mt-10">
            <Link
              href={`/${lang}${caseLink.href}`}
              className="text-sm font-medium text-accent hover:underline"
            >
              {caseLink.label[lang]}
            </Link>
          </div>
        </div>
      </section>

      <section className="dark-section py-[88px] text-white">
        <div className="mx-auto max-w-[1120px] px-6">
          <h2 className="font-display text-3xl font-semibold leading-tight">
            {modesTitle[lang]}
          </h2>
          <div className="mt-10 grid gap-6 md:grid-cols-2">
            <div className="rounded-xl border-2 border-accent bg-accent/[0.08] p-8">
              <h3 className="font-display text-xl font-semibold">
                {modeCustom.title[lang]}
              </h3>
              <p className="mt-3 text-[15px] leading-relaxed text-white/70">
                {modeCustom.body[lang]}
              </p>
              {modeCustom.cta && (
                <Link
                  href={`/${lang}#cta`}
                  className="btn-accent mt-6 inline-block rounded-lg px-5 py-2.5 text-sm font-semibold"
                >
                  {modeCustom.cta[lang]}
                </Link>
              )}
            </div>
            <div className="rounded-xl border border-white/10 bg-white/[0.04] p-8">
              <div className="flex items-center gap-3">
                <h3 className="font-display text-xl font-semibold">
                  {modeSaas.title[lang]}
                </h3>
                {modeSaas.note && (
                  <span className="stamp rounded-full bg-white/10 px-3 py-1 text-white/60">
                    {modeSaas.note[lang]}
                  </span>
                )}
              </div>
              <p className="mt-3 text-[15px] leading-relaxed text-white/70">
                {modeSaas.body[lang]}
              </p>
            </div>
          </div>

          <div className="mt-10">
            <Link
              href={`/${lang}/prodotti`}
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
