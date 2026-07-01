import type { Metadata } from "next";
import Link from "next/link";
import { isLocale, defaultLocale, type Locale } from "@/lib/i18n";
import { landing } from "@/lib/landing-content";
import { buildMetadata } from "@/lib/seo";
import { Icon } from "@/components/landing/icon";
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
  const m = landing.stack.meta[lang];
  // Pagina volutamente non in menu: comunque indicizzabile via link diretto.
  return buildMetadata(lang, {
    title: m.title,
    description: m.description,
    path: "/stack",
  });
}

export default async function StackPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const lang: Locale = isLocale(locale) ? locale : defaultLocale;
  const { kicker, title, intro, back, groups } = landing.stack;

  return (
    <main className="flex-1">
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

      <section className="dot-paper border-b border-line py-16">
        <div className="mx-auto max-w-[1120px] px-6">
          <div className="kicker mb-5">{kicker[lang]}</div>
          <h1 className="mb-6 max-w-3xl font-display text-4xl font-semibold leading-tight md:text-5xl">
            {title[lang]}
          </h1>
          <p className="max-w-2xl text-lg text-muted">{intro[lang]}</p>
        </div>
      </section>

      <div className="mx-auto max-w-[1120px] px-6 py-16">
        <div className="flex flex-col gap-10">
          {groups.map((group) => (
            <div key={group.name[lang]}>
              <h2 className="mb-4 font-mono text-[12px] uppercase tracking-[0.14em] text-accent">
                {group.name[lang]}
              </h2>
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {group.tools.map((tool) => (
                  <div
                    key={tool.name}
                    className="card-hover flex items-start gap-3 rounded-lg border border-line bg-white p-4"
                  >
                    <Icon
                      icon={tool.icon}
                      className="mt-0.5 shrink-0 text-[24px]"
                      aria-hidden
                    />
                    <div>
                      <h3 className="text-[15px] font-bold">{tool.name}</h3>
                      <p className="mt-0.5 text-[13px] leading-snug text-muted">
                        {tool.desc[lang]}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      <Footer lang={lang} />
    </main>
  );
}
