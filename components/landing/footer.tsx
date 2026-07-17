import type { Locale } from "@/lib/i18n";
import { landing } from "@/lib/landing-content";
import { getSiteSettings } from "@/sanity/site-settings";

export async function Footer({ lang }: { lang: Locale }) {
  const settings = await getSiteSettings();
  // Compaiono solo i link con dati reali su Sanity: se un campo è vuoto il
  // link sparisce, mai un href="#" morto.
  const socialLinks = (settings?.socialLinks ?? []).filter(
    (link): link is { _key: string; label: string; url: string } =>
      Boolean(link.label && link.url)
  );
  const contactEmail = settings?.contactEmail;

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
          {socialLinks.map((link) => (
            <a
              key={link._key}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-mark"
            >
              {link.label}
            </a>
          ))}
          {contactEmail && (
            <a href={`mailto:${contactEmail}`} className="hover:text-mark">
              Email
            </a>
          )}
          <a href={`/${lang}/privacy`} className="hover:text-mark">
            Privacy
          </a>
        </div>
      </div>
    </footer>
  );
}
