import type { Locale } from "@/lib/i18n";
import { Icon } from "./icon";
import { MarqueePause } from "./marquee-pause";

// aria-label del bottone di pausa (solo per screen reader e tooltip).
const LABELS: Record<Locale, { pause: string; play: string }> = {
  it: { pause: "Ferma l'animazione dei loghi", play: "Riavvia l'animazione dei loghi" },
  en: { pause: "Stop the logo animation", play: "Restart the logo animation" },
};

/**
 * Striscia di loghi in scorrimento continuo (Kinetic Marquee, vedi skill
 * design-taste-frontend §10) — unico marquee della pagina (§5, "max uno per
 * pagina"). Animazione CSS pura su un track duplicato (vedi globals.css per
 * `marquee`); il solo JS è il bottone di pausa in MarqueePause, che riceve
 * le icone già rese qui come children. In pausa anche all'hover e fermo
 * sotto prefers-reduced-motion (`motion-safe:`).
 */
export function LogoMarquee({
  logos,
  lang = "it",
}: {
  logos: readonly string[];
  lang?: Locale;
}) {
  return (
    <MarqueePause labels={LABELS[lang]}>
      {[0, 1].map((copy) => (
        <div key={copy} className="flex shrink-0 items-center gap-14 pr-14">
          {logos.map((icon, i) => (
            <Icon
              key={`${copy}-${icon}-${i}`}
              icon={icon}
              className="text-[34px] text-ink/70 grayscale transition-all duration-300 hover:text-ink hover:grayscale-0"
            />
          ))}
        </div>
      ))}
    </MarqueePause>
  );
}
