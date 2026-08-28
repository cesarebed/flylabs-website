import type { Metadata } from "next";
import Link from "next/link";
import { isLocale, defaultLocale, type Locale } from "@/lib/i18n";
import { cookiePolicy } from "@/lib/cookie-content";
import { buildMetadata } from "@/lib/seo";
import { Footer } from "@/components/landing/footer";
import { LangToggle } from "@/components/landing/lang-toggle";
import { ManageCookiesLink } from "@/components/consent/manage-cookies-link";

export const revalidate = 3600;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const lang: Locale = isLocale(locale) ? locale : defaultLocale;
  const m = cookiePolicy.meta[lang];
  return buildMetadata(lang, {
    title: m.title,
    description: m.description,
    path: "/cookie-policy",
  });
}

export default async function CookiePolicyPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const lang: Locale = isLocale(locale) ? locale : defaultLocale;
  const back = { it: "← Torna alla home", en: "← Back home" };

  return (
    <main className="site-zoom flex-1">
      <header className="nav-light sticky top-0 z-50 border-b border-line backdrop-blur">
        <div className="mx-auto flex h-16 max-w-[1120px] items-center justify-between px-6">
          <Link
            href={`/${lang}`}
            className="font-display text-2xl font-bold tracking-tight"
          >
            flylabs<span className="logo-ai">.ai</span>
          </Link>
          <div className="flex items-center gap-4">
            <LangToggle lang={lang} />
            <Link
              href={`/${lang}`}
              className="text-sm font-medium text-ink/70 hover:text-ink"
            >
              {back[lang]}
            </Link>
          </div>
        </div>
      </header>

      <article className="mx-auto max-w-3xl px-6 py-[80px]">
        <h1 className="font-display text-4xl font-semibold leading-tight md:text-5xl">
          {cookiePolicy.title[lang]}
        </h1>
        <p className="mt-4 font-mono text-[12px] uppercase tracking-wider text-muted">
          {cookiePolicy.updated[lang]}
        </p>
        <p className="mt-8 text-lg leading-relaxed text-muted">
          {cookiePolicy.intro[lang]}
        </p>

        <div className="mt-12 flex flex-col gap-10">
          {cookiePolicy.sections.map((section) => (
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

          <section>
            <h2 className="mb-3 font-display text-2xl font-semibold">
              {cookiePolicy.manageHeading[lang]}
            </h2>
            <p className="mb-4 leading-relaxed text-ink/80">
              {cookiePolicy.manageIntro[lang]}
            </p>
            <ManageCookiesLink
              label={cookiePolicy.manageButton[lang]}
              className="inline-flex rounded-full bg-ink px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-ink/90"
            />
          </section>
        </div>
      </article>

      <Footer lang={lang} />
    </main>
  );
}
