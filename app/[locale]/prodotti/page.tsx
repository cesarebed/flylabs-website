import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { isLocale, defaultLocale, type Locale } from "@/lib/i18n";
import { landing } from "@/lib/landing-content";
import { buildMetadata, getSiteUrl } from "@/lib/seo";
import { cases } from "@/lib/cases-content";
import { siteBreadcrumbLd } from "@/lib/structured-data";
import { JsonLd } from "@/components/json-ld";
import { ClosingCta } from "@/components/landing/closing-cta";
import { PageHeader } from "@/components/landing/page-header";
import { PageShell } from "@/components/landing/page-shell";
import { Reveal, RevealGroup, RevealItem } from "@/components/landing/reveal";

export const revalidate = 3600;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const lang: Locale = isLocale(locale) ? locale : defaultLocale;
  const m = landing.products.meta[lang];
  return buildMetadata(lang, {
    title: m.title,
    description: m.description,
    path: "/prodotti",
  });
}

export default async function ProductsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const lang: Locale = isLocale(locale) ? locale : defaultLocale;
  const {
    kicker,
    title,
    intro,
    philosophyTitle,
    philosophyBody,
    modes,
    items,
    cardCtaInternal,
    cardCtaExternal,
  } = landing.products;
  const siteUrl = await getSiteUrl();

  return (
    <PageShell lang={lang}>
      <JsonLd
        data={siteBreadcrumbLd(siteUrl, lang, [
          { name: kicker[lang], path: "/prodotti" },
        ])}
      />

      <PageHeader kicker={kicker[lang]} title={title[lang]} intro={intro[lang]} />

      {/* Prima i prodotti, poi le spiegazioni: chi clicca "Prodotti" vuole
          vedere i prodotti (prima la griglia arrivava al 67% della pagina). */}
      <section className="bg-white py-16 md:py-[88px]">
        <div className="mx-auto max-w-[1120px] px-6">
          <RevealGroup className="grid gap-6 md:grid-cols-3">
            {items.map((product) => (
              <RevealItem key={product.slug} className="flex flex-col">
                <Link
                  href={product.external ? product.href : `/${lang}${product.href}`}
                  target={product.external ? "_blank" : undefined}
                  rel={product.external ? "noopener noreferrer" : undefined}
                  className="card-hover flex h-full flex-col rounded-xl border border-line bg-paper p-8"
                >
                  <div className="flex h-14 w-14 items-center justify-center rounded-lg border border-line bg-white p-2">
                    <Image
                      src={product.logo}
                      alt=""
                      width={40}
                      height={40}
                      className="h-auto max-h-10 w-auto max-w-10 object-contain"
                    />
                  </div>
                  <span className="stamp mt-6 text-muted">
                    {product.sector[lang]}
                  </span>
                  {/* h2: la griglia viene subito dopo l'H1, senza un titolo di
                      sezione in mezzo (niente salto h1 → h3). */}
                  <h2 className="mt-2 font-display text-2xl font-semibold">
                    {product.name}
                  </h2>
                  <p className="mt-3 text-[15px] leading-relaxed text-muted">
                    {product.tagline[lang]}
                  </p>
                  {/* La nota sta dentro la card, prima della CTA: fuori la
                      rendeva più corta delle altre. */}
                  {product.note && (
                    <p className="mt-3 text-[13px] leading-snug text-muted">
                      {product.note[lang]}
                    </p>
                  )}
                  <div className="mt-auto pt-8 text-sm font-medium text-ink/70">
                    {product.external ? cardCtaExternal[lang] : cardCtaInternal[lang]}
                  </div>
                </Link>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </section>

      <section className="dark-section py-16 text-white md:py-[88px]">
        <div className="mx-auto max-w-[1120px] px-6">
          <div className="kicker mb-4 text-white/60">{modes.kicker[lang]}</div>
          <h2 className="max-w-[24ch] font-display text-3xl font-semibold leading-tight">
            {modes.title[lang]}
          </h2>
          <div className="mt-10 grid gap-6 md:grid-cols-2">
            <div className="rounded-xl border border-white/10 bg-white/[0.04] p-8">
              <h3 className="font-display text-xl font-semibold">
                {modes.custom.title[lang]}
              </h3>
              <p className="mt-3 text-[15px] leading-relaxed text-white/70">
                {modes.custom.body[lang]}
              </p>
            </div>
            <div className="rounded-xl border border-white/10 bg-white/[0.04] p-8">
              <h3 className="font-display text-xl font-semibold">
                {modes.saas.title[lang]}
              </h3>
              <p className="mt-3 text-[15px] leading-relaxed text-white/70">
                {modes.saas.body[lang]}
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white py-16 md:py-[88px]">
        <div className="mx-auto max-w-[1120px] px-6">
          <Reveal>
            <h2 className="max-w-[24ch] font-display text-3xl font-semibold leading-tight">
              {philosophyTitle[lang]}
            </h2>
            <p className="mt-4 max-w-[62ch] text-[15px] leading-relaxed text-muted">
              {philosophyBody[lang]}
            </p>
          </Reveal>
        </div>
      </section>

      <ClosingCta
        title={cases.closing.start.title[lang]}
        body={cases.closing.start.body[lang]}
        cta={{ label: landing.nav.cta[lang], href: `/${lang}#cta` }}
      />
    </PageShell>
  );
}
