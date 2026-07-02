import type { Locale } from "@/lib/i18n";
import { landing } from "@/lib/landing-content";

export function Footer({ lang }: { lang: Locale }) {
  return (
    <footer className="bg-ink py-12 text-white">
      <div className="mx-auto flex max-w-[1120px] flex-col items-center justify-between gap-6 px-6 md:flex-row">
        <div className="font-display text-2xl font-bold">
          flylabs<span className="logo-ai">.ai</span>
        </div>
        <div className="font-mono text-xs text-white/40">
          © 2026 flylabs.ai — {landing.footer.tagline[lang]}
        </div>
        <div className="flex gap-6 text-sm text-white/70">
          <a href="#" className="hover:text-mark">
            LinkedIn
          </a>
          <a href="#" className="hover:text-mark">
            Email
          </a>
          <a href={`/${lang}/privacy`} className="hover:text-mark">
            Privacy
          </a>
        </div>
      </div>
    </footer>
  );
}
