import { Icon } from "./icon";

/**
 * Striscia di loghi in scorrimento continuo (Kinetic Marquee, vedi skill
 * design-taste-frontend §10) — unico marquee della pagina (§5, "max uno per
 * pagina"). Puro CSS (animation su un track duplicato): nessun JS, resta un
 * Server Component. In pausa sotto prefers-reduced-motion via
 * `motion-reduce:` (vedi globals.css per l'animazione `marquee`).
 */
export function LogoMarquee({ logos }: { logos: readonly string[] }) {
  return (
    <div
      className="group relative overflow-hidden [mask-image:linear-gradient(90deg,transparent,black_8%,black_92%,transparent)]"
      aria-hidden
    >
      <div className="flex w-max motion-safe:animate-marquee motion-safe:group-hover:[animation-play-state:paused]">
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
      </div>
    </div>
  );
}
