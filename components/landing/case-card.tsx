import Link from "next/link";
import { TechBadges } from "./tech-badges";
import { WithArrow } from "./closing-cta";

export type CaseCardData = {
  id: string;
  href: string;
  title: string;
  sector: string;
  problem: string;
  solution: string;
  tech: string[];
  metrics: { key: string; value: string; label: string }[];
  cta: string;
};

/**
 * Card di un caso di successo, condivisa fra il carosello in home (h3) e la
 * lista /lavori (h2). Nessun hook: gira sia lato server sia dentro il
 * carosello client.
 *
 * Il link vero è solo "Leggi il caso", allargato a tutta la card con un
 * ::after (così la card resta cliccabile ovunque), con un nome accessibile
 * breve: testo del link + titolo + settore, invece dell'intera card.
 */
export function CaseCard({
  item,
  headingLevel = "h3",
  className = "",
  onLinkFocus,
}: {
  item: CaseCardData;
  headingLevel?: "h2" | "h3";
  className?: string;
  /** Solo carosello: porta in vista la card quando riceve il focus. */
  onLinkFocus?: () => void;
}) {
  const Heading = headingLevel;
  // Gli id derivano dall'_id Sanity: una sola lista di card per pagina.
  const base = `case-${item.id}`;
  const single = item.metrics.length <= 1;

  return (
    <article
      className={`card-hover relative flex flex-col rounded-xl border border-line bg-paper p-7 has-[a:focus-visible]:outline-2 has-[a:focus-visible]:-outline-offset-2 has-[a:focus-visible]:outline-accent ${className}`}
    >
      <span id={`${base}-sector`} className="stamp mb-4 text-muted">
        {item.sector}
      </span>
      <Heading
        id={`${base}-title`}
        className="mb-3 font-display text-xl font-semibold leading-snug text-ink"
      >
        {item.title}
      </Heading>
      <p className="mb-2 line-clamp-3 text-[15px] leading-snug text-ink/80">
        {item.problem}
      </p>
      <p className="mb-5 line-clamp-3 text-sm text-muted">{item.solution}</p>
      <TechBadges tech={item.tech} className="mb-6" max={4} />
      <div
        className={`mt-auto border-t border-line pt-6 ${
          single ? "" : "grid grid-cols-2 gap-4"
        }`}
      >
        {item.metrics.map((metric) => (
          <div key={metric.key} className="min-w-0">
            {/* Sotto sm il valore può andare a capo: a 320px "1 sessione"
                in nowrap usciva dalla card (reflow, WCAG 1.4.10). */}
            <div
              className={`break-words font-display font-semibold leading-none text-accent sm:whitespace-nowrap ${
                single ? "text-4xl sm:text-5xl" : "text-4xl"
              }`}
            >
              {metric.value}
            </div>
            <div className="mt-2 text-[12px] leading-snug text-muted">
              {metric.label}
            </div>
          </div>
        ))}
      </div>
      <Link
        id={`${base}-cta`}
        href={item.href}
        aria-labelledby={`${base}-cta ${base}-title ${base}-sector`}
        onFocus={onLinkFocus}
        // Gli <a> sono trascinabili di default: nel carosello uno swipe
        // avvierebbe il drag-and-drop nativo e interromperebbe il gesto.
        draggable={false}
        className="mt-5 text-sm font-medium text-ink/70 outline-none after:absolute after:inset-0 after:rounded-xl after:content-[''] hover:text-ink"
      >
        <WithArrow>{item.cta}</WithArrow>
      </Link>
    </article>
  );
}
