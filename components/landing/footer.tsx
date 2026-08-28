import type { Locale } from "@/lib/i18n";
import { landing } from "@/lib/landing-content";
import { getSiteSettings } from "@/sanity/site-settings";
import { LogoMark } from "./logo-mark";

export async function Footer({ lang }: { lang: Locale }) {
  const settings = await getSiteSettings();
  // Compaiono solo i link con dati reali su Sanity: se un campo è vuoto il
  // link sparisce, mai un href="#" morto.
  const socialLinks = (settings?.socialLinks ?? []).filter(
    (link): link is { _key: string; label: string; url: string } =>
      Boolean(link.label && link.url)
  );
  const contactEmail = settings?.contactEmail;
  // Titolari con dati completi: nome + P.IVA. Con due contitolari compaiono due
  // voci; se la lista è vuota, la riga legale sparisce.
  const legalEntities = (settings?.legalEntities ?? []).filter(
    (entity): entity is { _key: string; name: string; vatNumber: string } =>
      Boolean(entity.name && entity.vatNumber)
  );

  return (
    <footer className="bg-ink text-white">
      <div className="mx-auto max-w-[1120px] px-6 py-14">
        <div className="flex flex-col gap-10 md:flex-row md:items-start md:justify-between">
          <div>
            <div className="mb-3 flex items-center gap-2 font-display text-2xl font-bold">
              <LogoMark className="h-6 w-6" />
              <span>
                flylabs<span className="logo-ai">.ai</span>
              </span>
            </div>
            <p className="max-w-xs text-sm text-white/50">{landing.footer.tagline[lang]}</p>
          </div>

          {/* Nav e contatti restano vicini tra loro (gap fisso) invece di
              essere spinti ai due estremi da un justify-between a 3 colonne
              — con pochi item reali lasciava un vuoto enorme al centro. */}
          <div className="flex flex-col gap-8 md:flex-row md:items-start md:gap-16">
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
        </div>

        <div className="mt-12 flex flex-col gap-2 border-t border-white/10 pt-6 font-mono text-xs text-white/40 md:flex-row md:items-center md:justify-between">
          <div>© 2026 flylabs.ai - {landing.footer.tagline[lang]}</div>
          {legalEntities.length > 0 && (
            <div className="flex flex-col gap-x-4 gap-y-1 sm:flex-row sm:flex-wrap">
              {legalEntities.map((entity) => (
                <span key={entity._key}>
                  {entity.name} · P.IVA {entity.vatNumber}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>
    </footer>
  );
}
