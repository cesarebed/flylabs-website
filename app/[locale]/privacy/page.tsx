import type { Metadata } from "next";
import { isLocale, defaultLocale, type Locale } from "@/lib/i18n";
import { privacy } from "@/lib/privacy-content";
import { buildMetadata } from "@/lib/seo";
import { Footer } from "@/components/landing/footer";
import { Nav } from "@/components/landing/nav";

export const revalidate = 3600;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const lang: Locale = isLocale(locale) ? locale : defaultLocale;
  const m = privacy.meta[lang];
  const base = await buildMetadata(lang, {
    title: m.title,
    description: m.description,
    path: "/privacy",
  });
  // BOZZA: noindex finché i dati del Titolare non sono compilati. Rimuovere
  // questa riga quando l'informativa è finalizzata.
  return { ...base, robots: { index: false, follow: true } };
}

export default async function PrivacyPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const lang: Locale = isLocale(locale) ? locale : defaultLocale;

  return (
    <main className="site-zoom flex-1">
      <Nav lang={lang} />

      <article className="mx-auto max-w-3xl px-6 py-[80px]">
        <h1 className="font-display text-4xl font-semibold leading-tight md:text-5xl">
          {privacy.title[lang]}
        </h1>
        <p className="mt-4 font-mono text-[12px] uppercase tracking-wider text-muted">
          {privacy.updated[lang]}
        </p>
        <p className="mt-8 text-lg leading-relaxed text-muted">
          {privacy.intro[lang]}
        </p>

        <div className="mt-12 flex flex-col gap-10">
          {privacy.sections.map((section) => (
            <section key={section.heading[lang]}>
              <h2 className="mb-3 font-display text-2xl font-semibold">
                {section.heading[lang]}
              </h2>
              <div className="flex flex-col gap-3">
                {section.body.map((p, i) => (
                  <p key={i} className="leading-relaxed text-ink/80">
                    {p[lang]}
                  </p>
                ))}
              </div>
            </section>
          ))}
        </div>
      </article>

      <Footer lang={lang} />
    </main>
  );
}
