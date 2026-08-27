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
    <main className="site-zoom flex-1">
      <JsonLd
        data={breadcrumbLd([
          { name: "flylabs.ai", url: `${siteUrl}/${lang}` },
          { name: title[lang], url: `${siteUrl}/${lang}/prodotti` },
        ])}
      />

      <Nav lang={lang} />

      <section className="dot-paper border-b border-line py-[88px]">
        <div className="mx-auto max-w-[1120px] px-6">
          <div className="kicker mb-4">{kicker[lang]}</div>
          <h1 className="max-w-[20ch] font-display text-5xl font-semibold leading-[1.05]">
            {title[lang]}
          </h1>
          <p className="mt-6 max-w-[58ch] text-lg leading-relaxed text-muted">
            {intro[lang]}
          </p>
        </div>
      </section>

      <section className="bg-white py-[88px]">
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

      <section className="dark-section py-[88px] text-white">
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

      <section className="bg-white py-[88px]">
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
                  <h3 className="mt-2 font-display text-2xl font-semibold">
                    {product.name}
                  </h3>
                  <p className="mt-3 text-[15px] leading-relaxed text-muted">
                    {product.tagline[lang]}
                  </p>
                  <div className="mt-auto pt-8 text-sm font-medium text-ink/70">
                    {product.external ? cardCtaExternal[lang] : cardCtaInternal[lang]}
                  </div>
                </Link>
                {product.note && (
                  <p className="mt-3 text-[13px] leading-snug text-muted">
                    {product.note[lang]}
                  </p>
                )}
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </section>

      <Footer lang={lang} />
    </main>
  );
}
