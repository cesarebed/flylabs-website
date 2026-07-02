import type { Locale } from "@/lib/i18n";
import { landing } from "@/lib/landing-content";
import { LangToggle } from "./lang-toggle";

export function Nav({ lang }: { lang: Locale }) {
  const { links, cta } = landing.nav;
  return (
    <nav className="nav-light sticky top-0 z-50 border-b border-line text-ink backdrop-blur">
      <div className="mx-auto flex h-16 max-w-[1120px] items-center justify-between px-6">
        <a
          href="#top"
          className="font-display text-2xl font-bold tracking-tight"
        >
          flylabs<span className="logo-ai">.ai</span>
        </a>
        <div className="hidden items-center gap-8 text-sm font-medium text-ink/70 md:flex">
          {links.map((l) => (
            <a key={l.href} href={l.href} className="hover:text-ink">
              {l.label[lang]}
            </a>
          ))}
        </div>
        <div className="flex items-center gap-4">
          <LangToggle lang={lang} />
          <a
            href="#cta"
            className="btn-ink rounded-lg px-5 py-2.5 text-sm font-semibold"
          >
            {cta[lang]}
          </a>
        </div>
      </div>
    </nav>
  );
}
