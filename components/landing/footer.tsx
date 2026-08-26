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
  const legalName = settings?.legalName;
  const vatNumber = settings?.vatNumber;

  return (
    <footer className="bg-ink text-white">
      <div className="mx-auto max-w-[1120px] px-6 py-14">
        <div className="flex flex-col gap-10 md:flex-row md:justify-between">
          <div>
            <div className="mb-3 font-display text-2xl font-bold">
              flylabs<span className="logo-ai">.ai</span>
            </div>
            <p className="max-w-xs text-sm text-white/50">{landing.footer.tagline[lang]}</p>
          </div>

          <nav className="flex flex-wrap gap-x-8 gap-y-3 text-sm text-white/70">
            {landing.footer.nav.map((item) => (
              <a key={item.href} href={`/${lang}${item.href}`} className="hover:text-mark">
                {item.label[lang]}
              </a>
            ))}
            <a href={`/${lang}/privacy`} className="hover:text-mark">
              Privacy
            </a>
          </nav>

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
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-2 border-t border-white/10 pt-6 font-mono text-xs text-white/40 md:flex-row md:items-center md:justify-between">
          <div>© 2026 flylabs.ai - {landing.footer.tagline[lang]}</div>
          {(legalName || vatNumber) && (
            <div>
              {legalName}
              {legalName && vatNumber && " · "}
              {vatNumber}
            </div>
          )}
        </div>
      </div>
    </footer>
  );
}
