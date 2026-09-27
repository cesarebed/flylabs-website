"use client";

import Link from "next/link";
import {
  animate,
  inView,
  motion,
  useMotionValue,
  useReducedMotion,
  useTransform,
  type AnimationPlaybackControls,
  type MotionValue,
} from "motion/react";
import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type KeyboardEvent,
} from "react";
import { Icon } from "./icon";

/**
 * Pannello dell'hero "l'AI prepara, tu approvi" con tre scenari reali a tab
 * (pattern APG Tabs: attivazione automatica, frecce + Home/End, roving
 * tabindex). Client leaf: la pagina e il resto dell'hero restano Server
 * Components, qui arrivano solo le stringhe già risolte nella lingua.
 *
 * Server first: l'HTML del server contiene i tre scenari nello stato FINALE
 * (crawler, no-JS e reduced motion vedono tutto). I tabpanel stanno impilati
 * nella stessa cella di griglia (allineati in alto, senza stirarsi), quelli
 * inattivi `invisible` + `inert`: il blocco ha sempre l'altezza del più alto,
 * così cambiare tab non sposta la colonna del titolo (centrata in verticale).
 *
 * Animazione (una volta, quando il pannello entra in viewport): passo 1
 * spuntato → card di input → passo 2 attivo e l'AI "scrive" → passo 3 in
 * giallo + azioni. La scrittura aspetta che anche la card di output sia in
 * vista (su mobile è sotto la piega). Al cambio tab la stessa sequenza,
 * abbreviata (~1,2 s), che riparte da zero senza dissolvenze all'indietro.
 * Niente rotazione automatica fra scenari (WCAG 2.2.2).
 *
 * Niente flash all'idratazione: il corpo del pannello ([data-intro-hide]) è
 * nascosto in CSS finché `data-intro` vale "pending"/"armed", solo con
 * prefers-reduced-motion: no-preference (globals.css). Se il JS non parte,
 * un'animazione CSS a tempo lo rende visibile comunque, e il <noscript> qui
 * sotto annulla subito il nascondimento. I setState partono solo da callback
 * (requestAnimationFrame, IntersectionObserver di `inView`, eventi), mai in
 * modo sincrono dentro un effect.
 */

export type ScenarioView = {
  id: string;
  tab: string;
  caseHref: string;
  sector: string;
  flow: string;
  flowMeta: string;
  langChip: string;
  langChipSr: string;
  steps: [string, string, string];
  input: {
    source: string;
    icon: string;
    stars?: number;
    starsSr?: string;
    meta: string;
    text: string;
    attachment?: string;
  };
  output: {
    label: string;
    text?: string;
    items?: string[];
    working: string;
    done: string;
  };
  actions: [string, string];
  note: string;
};

type Labels = { tablist: string; casePrefix: string; caseCta: string };

// 0 = in attesa, 1 = input arrivato, 2 = l'AI lavora, 3 = finale (tocca a te).
type Phase = 0 | 1 | 2 | 3;
// pending: SSR/idratazione (CSS nasconde, con fallback a tempo); armed: JS
// pronto, in attesa della viewport; live: la sequenza la guida `phase`.
type Intro = "pending" | "armed" | "live";

const EASE = "ease-[cubic-bezier(0.16,1,0.3,1)]";

// Durata della "scrittura": proporzionale al testo, fra 1,5 e 2,4 s.
function typingSeconds(s: ScenarioView, fast: boolean) {
  if (fast) return 0.5;
  const chars = s.output.text?.length ?? 0;
  return s.output.items ? 1.5 : Math.min(2.4, Math.max(1.5, chars * 0.011));
}

export function HeroScenarios({
  scenarios,
  labels,
}: {
  scenarios: ScenarioView[];
  labels: Labels;
}) {
  const [active, setActive] = useState(0);
  const [phase, setPhase] = useState<Phase>(3);
  const [intro, setIntro] = useState<Intro>("pending");
  const [fast, setFast] = useState(false);
  const reduce = useReducedMotion();
  // Avanzamento della scrittura dell'AI (0 → 1), fuori dal ciclo di render:
  // il testo digitato lo aggiorna Motion direttamente nel DOM.
  const progress = useMotionValue(1);

  const rootRef = useRef<HTMLDivElement>(null);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const timers = useRef<number[]>([]);
  const typing = useRef<AnimationPlaybackControls | null>(null);
  const waitOutput = useRef<(() => void) | null>(null);
  const played = useRef(false);

  const stop = useCallback(() => {
    timers.current.forEach((id) => window.clearTimeout(id));
    timers.current = [];
    typing.current?.stop();
    typing.current = null;
    waitOutput.current?.();
    waitOutput.current = null;
  }, []);

  // Sequenza dello scenario `index`. Chiamata solo da callback (viewport,
  // click, tastiera): i setState qui dentro finiscono in un unico commit,
  // quindi `intro` e `phase` cambiano insieme e nessuno stato intermedio
  // arriva a schermo.
  const play = useCallback(
    (index: number, isFast: boolean) => {
      stop();
      played.current = true;
      progress.set(0);
      setFast(isFast);
      setIntro("live");
      setPhase(0);
      const at = (ms: number, fn: () => void) => {
        timers.current.push(window.setTimeout(fn, ms));
      };
      const type = () => {
        setPhase(2);
        typing.current = animate(progress, 1, {
          duration: typingSeconds(scenarios[index], isFast),
          ease: "linear",
          onComplete: () => at(isFast ? 60 : 180, () => setPhase(3)),
        });
      };
      at(isFast ? 60 : 350, () => setPhase(1));
      if (isFast) {
        at(300, type);
        return;
      }
      // Prima volta: la scrittura parte solo quando anche la card di output è
      // in vista (fuori dal 20% basso della viewport). Su mobile sta sotto la
      // piega: senza questa attesa finirebbe prima che l'utente scrolli.
      const card = rootRef.current?.querySelector<HTMLElement>(
        `#hero-panel-${scenarios[index].id} [data-output]`
      );
      let ready = false;
      let seen = !card;
      at(1050, () => {
        ready = true;
        if (seen) type();
      });
      if (card) {
        waitOutput.current = inView(
          card,
          () => {
            seen = true;
            if (ready) type();
            waitOutput.current?.();
            waitOutput.current = null;
          },
          { margin: "0px 0px -20% 0px" }
        );
      }
    },
    [progress, scenarios, stop]
  );

  // Dopo l'idratazione: se il fallback CSS ha già mostrato il pannello (JS
  // lento) o c'è reduced motion, resta lo stato finale; altrimenti si arma e
  // parte la prima volta che il pannello entra in viewport.
  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    let stopInView: (() => void) | undefined;
    const raf = window.requestAnimationFrame(() => {
      const probe = root.querySelector<HTMLElement>("[data-intro-hide]");
      const stillHidden = probe ? getComputedStyle(probe).opacity === "0" : false;
      if (reduce || !stillHidden) {
        played.current = true;
        setIntro("live");
        return;
      }
      setIntro("armed");
      // Parte appena una parte qualsiasi del primo pannello è in viewport:
      // una soglia in percentuale del blocco non scatterebbe mai con viewport
      // basse (zoom al 400%), e il corpo resterebbe nascosto.
      const first = root.querySelector<HTMLElement>('[role="tabpanel"]') ?? root;
      stopInView = inView(
        first,
        () => {
          if (!played.current) play(0, false);
          stopInView?.();
        },
        { amount: "some" }
      );
    });
    return () => {
      window.cancelAnimationFrame(raf);
      stopInView?.();
      stop();
    };
    // Solo al mount: `reduce` e `play` sono letti una volta, di proposito.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const select = (index: number, focus: boolean) => {
    if (focus) tabRefs.current[index]?.focus();
    if (index === active) return;
    setActive(index);
    if (reduce) {
      stop();
      progress.set(1);
      setIntro("live");
      setPhase(3);
      return;
    }
    play(index, true);
  };

  const onKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    const last = scenarios.length - 1;
    const next =
      e.key === "ArrowRight"
        ? active === last ? 0 : active + 1
        : e.key === "ArrowLeft"
          ? active === 0 ? last : active - 1
          : e.key === "Home"
            ? 0
            : e.key === "End"
              ? last
              : null;
    if (next === null) return;
    e.preventDefault();
    select(next, true);
  };

  return (
    <div
      ref={rootRef}
      data-intro={intro}
      className="hero-scenarios"
      style={{ "--hs-dur": fast ? "300ms" : "560ms" } as CSSProperties}
    >
      <noscript>
        {/* Senza JS: corpo subito visibile e niente tab che non fanno nulla
            (resta il primo scenario, con la micro-label sopra). */}
        <style>
          {"[data-intro-hide]{opacity:1!important;animation:none!important}.hero-scenarios [role=tablist]{display:none}"}
        </style>
      </noscript>

      {/* Da 1280px label e tab stanno su una riga che non va mai a capo: la
          label (JetBrains Mono, non precaricato) col font di fallback è più
          larga e prima mandava la riga su due righe, poi tornava su una allo
          swap (layout shift sopra la piega). Ora al massimo si tronca per un
          attimo, e i tab stanno a destra, così non si spostano quando la
          label cambia larghezza. Sotto i 1280px la riga è comunque su due
          righe o ha margine. */}
      <div className="mb-3.5 flex flex-wrap items-center gap-x-3 gap-y-2.5 xl:flex-nowrap xl:justify-between">
        <p
          id="hero-scenarios-label"
          className="font-mono text-[10.5px] uppercase tracking-[0.14em] text-white/50 xl:min-w-0 xl:truncate"
        >
          {labels.tablist}
        </p>
        <div
          role="tablist"
          aria-labelledby="hero-scenarios-label"
          onKeyDown={onKeyDown}
          className="flex shrink-0 gap-1.5"
        >
          {scenarios.map((s, i) => {
            const selected = i === active;
            return (
              <button
                key={s.id}
                ref={(el) => {
                  tabRefs.current[i] = el;
                }}
                type="button"
                role="tab"
                id={`hero-tab-${s.id}`}
                aria-selected={selected}
                aria-controls={`hero-panel-${s.id}`}
                tabIndex={selected ? 0 : -1}
                onClick={() => select(i, false)}
                className={`rounded-full border px-2.5 py-1.5 text-[13px] font-medium transition-colors ${
                  selected
                    ? "border-white/55 bg-white/[0.12] text-white"
                    : "border-white/15 text-white/65 hover:border-white/35 hover:text-white"
                }`}
              >
                {s.tab}
              </button>
            );
          })}
        </div>
      </div>

      {/* grid-cols-1 (minmax(0,1fr)) e non `grid` e basta: con una traccia
          auto il testo troncato dell'intestazione allargava il pannello oltre
          la colonna a 360px. */}
      <div className="grid grid-cols-1">
        {scenarios.map((s, i) => {
          const isActive = i === active;
          return (
            <ScenarioPanel
              key={s.id}
              scenario={s}
              labels={labels}
              active={isActive}
              // I pannelli inattivi restano nello stato finale (invisibili).
              phase={isActive ? phase : 3}
              progress={progress}
            />
          );
        })}
      </div>
    </div>
  );
}

function ScenarioPanel({
  scenario: s,
  labels,
  active,
  phase,
  progress,
}: {
  scenario: ScenarioView;
  labels: Labels;
  active: boolean;
  phase: Phase;
  progress: MotionValue<number>;
}) {
  const stepState = (i: 0 | 1 | 2) => {
    if (i === 0) return phase >= 1 ? "done" : "todo";
    if (i === 1) return phase === 2 ? "working" : phase === 3 ? "done" : "todo";
    return phase === 3 ? "now" : "todo";
  };
  const shown = (from: Phase) =>
    phase >= from ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2";
  // Solo in avanti: il ritorno a fase 0 (cambio tab, il pannello era nello
  // stato finale) è istantaneo, niente dissolvenza all'indietro.
  const anim =
    phase === 0
      ? "transition-none"
      : `transition-[opacity,transform] duration-[var(--hs-dur)] ${EASE} motion-reduce:transition-none`;

  return (
    <div
      role="tabpanel"
      id={`hero-panel-${s.id}`}
      aria-labelledby={`hero-tab-${s.id}`}
      // APG Tabs: il primo contenuto del pannello non è focusabile, quindi
      // il pannello stesso entra nel tab order (gli inattivi sono inert).
      tabIndex={0}
      inert={!active}
      className={`col-start-1 row-start-1 self-start ${active ? "" : "invisible"}`}
    >
      <div className="overflow-hidden rounded-xl border border-white/10 bg-[#1b1a21] shadow-[0_40px_80px_-40px_rgba(52,59,236,0.55),inset_0_1px_0_rgba(255,255,255,0.06)]">
        <div className="flex items-center justify-between gap-3 border-b border-white/[0.08] px-4 py-3 max-md:px-3.5 max-md:py-2.5">
          <p className="min-w-0 truncate text-[13px] font-semibold text-white/90">
            {s.flow} <span className="font-medium text-white/50">· {s.flowMeta}</span>
          </p>
          <span className="shrink-0 rounded-md border border-white/15 px-1.5 py-0.5 font-mono text-[10px] uppercase tracking-[0.12em] text-white/55">
            <span aria-hidden="true">{s.langChip}</span>
            <span className="sr-only">{s.langChipSr}</span>
          </span>
        </div>

        <ol
          data-intro-hide=""
          className={`flex flex-wrap gap-1 px-4 pt-3 max-md:px-3.5 ${anim}`}
        >
          {s.steps.map((label, i) => (
            <Step key={label} label={label} state={stepState(i as 0 | 1 | 2)} />
          ))}
        </ol>

        <div className="grid gap-3 p-4 max-md:gap-2.5 max-md:p-3.5">
          {/* Input: il messaggio, la recensione o il referto che arriva. */}
          <div
            data-intro-hide=""
            className={`rounded-lg border border-white/[0.08] bg-white/[0.05] px-3.5 py-3 ${anim} ${shown(1)}`}
          >
            <p className="mb-1.5 flex flex-wrap items-center gap-x-2.5 gap-y-1 text-xs text-white/55">
              <span className="inline-flex items-center gap-1.5 font-medium text-white/75">
                <Icon icon={s.input.icon} width={13} height={13} aria-hidden="true" />
                {s.input.source}
              </span>
              {s.input.stars ? (
                <span className="tracking-[1px] text-mark">
                  <span aria-hidden="true">
                    {"★".repeat(s.input.stars)}
                    <span className="text-white/25">{"★".repeat(5 - s.input.stars)}</span>
                  </span>
                  <span className="sr-only">
                    {s.input.stars} {s.input.starsSr}
                  </span>
                </span>
              ) : null}
              <span>{s.input.meta}</span>
            </p>
            {/* Testo e allegato sulla stessa riga quando ci stanno (il chip
                va a capo da solo se non c'è spazio). */}
            <div className="flex flex-wrap items-center gap-x-2 gap-y-1.5">
              <p className="text-sm leading-normal text-white/85 max-md:line-clamp-2 max-md:text-[13.5px]">
                {s.input.text}
              </p>
              {s.input.attachment ? (
                <span className="inline-flex items-center gap-1.5 rounded-md border border-white/15 px-2 py-0.5 font-mono text-[11px] text-white/70">
                  <Icon icon="lucide:link" width={12} height={12} aria-hidden="true" />
                  {s.input.attachment}
                </span>
              ) : null}
            </div>
          </div>

          {/* Output dell'AI: card chiara, l'unico punto "caldo" del pannello. */}
          <div
            data-intro-hide=""
            data-output=""
            className={`rounded-lg bg-[#ecebe6] px-3.5 pb-3.5 pt-3 text-ink shadow-[inset_3px_0_0_var(--color-accent)] ${anim} ${shown(2)}`}
          >
            {/* Testi piccoli su #ecebe6: ink/70 e verde scuro, non `muted`
                (#6b6b72 qui fa 4,4:1, sotto AA). */}
            <div className="mb-1.5 flex items-center justify-between gap-2">
              <span className="font-mono text-[10px] uppercase tracking-[0.12em] text-ink/70 max-md:tracking-[0.06em]">
                {s.output.label}
              </span>
              {/* I due stati nella stessa cella: la larghezza è sempre quella
                  del più lungo, così la label non cambia righe a fine
                  scrittura e il pannello non salta. */}
              <span className="grid shrink-0 text-right text-[11.5px] font-semibold">
                <span
                  className={`col-start-1 row-start-1 text-accent ${phase === 3 ? "invisible" : ""}`}
                >
                  {s.output.working}
                </span>
                <span
                  className={`col-start-1 row-start-1 text-[#1a6b44] ${phase === 3 ? "" : "invisible"}`}
                >
                  {s.output.done}
                </span>
              </span>
            </div>

            {s.output.text ? (
              <TypedText text={s.output.text} progress={progress} typing={phase === 2} />
            ) : null}
            {s.output.items ? (
              <ol className="grid gap-1 text-sm leading-snug max-md:text-[13.5px]">
                {s.output.items.map((item, i, all) => (
                  <SlideItem
                    key={item}
                    index={i}
                    total={all.length}
                    label={item}
                    progress={progress}
                  />
                ))}
              </ol>
            ) : null}

            <div
              className={`flex flex-wrap items-center gap-2 pt-3 ${anim} ${shown(3)}`}
            >
              {/* Finti bottoni: ridondanti con la nota, fuori dall'albero
                  accessibile e mai focusabili. */}
              <span
                aria-hidden="true"
                className="rounded-lg bg-accent px-3.5 py-2 text-[13px] font-semibold text-white"
              >
                {s.actions[0]}
              </span>
              <span
                aria-hidden="true"
                className="rounded-lg border border-[#d3d1ca] bg-white/70 px-3 py-[7px] text-[13px] font-semibold text-ink"
              >
                {s.actions[1]}
              </span>
              <span className="ml-auto text-[11.5px] text-ink/70">{s.note}</span>
            </div>
          </div>
        </div>
      </div>

      <p className="mt-4 text-sm leading-relaxed text-white/60">
        {labels.casePrefix} {s.sector}.{" "}
        <Link
          href={s.caseHref}
          className="whitespace-nowrap font-semibold text-white underline decoration-white/40 underline-offset-4 transition-colors hover:text-mark hover:decoration-mark"
        >
          {labels.caseCta}
        </Link>
      </p>
    </div>
  );
}

type StepState = "todo" | "done" | "working" | "now";

function Step({ label, state }: { label: string; state: StepState }) {
  const pill = {
    todo: "border-white/10 text-white/45",
    done: "border-white/10 text-white/80",
    working: "border-white/30 bg-white/[0.06] text-white",
    now: "border-mark bg-mark font-semibold text-ink",
  }[state];
  return (
    <li
      aria-current={state === "now" ? "step" : undefined}
      // Transizione solo in avanti: tornando a "todo" (reset al cambio tab)
      // il giallo del passo 3 sparisce subito, senza dissolvenza.
      className={`flex items-center gap-1.5 rounded-full border py-1 pl-1 pr-2 text-[12.5px] font-medium max-md:text-[11.5px] ${
        state === "todo" ? "" : "transition-colors duration-300"
      } ${pill}`}
    >
      <span
        aria-hidden="true"
        className={`grid h-4 w-4 shrink-0 place-items-center rounded-full border-[1.5px] ${
          state === "done"
            ? "border-transparent bg-white/90 text-dark"
            : state === "now"
              ? "border-ink"
              : state === "working"
                ? "border-white/25 border-t-white motion-safe:animate-spin"
                : "border-white/30"
        }`}
      >
        {state === "done" ? <Icon icon="lucide:check" width={10} height={10} strokeWidth={3} /> : null}
      </span>
      {label}
    </li>
  );
}

/**
 * Testo dell'AI che si scrive. Due strati nella stessa cella di griglia: il
 * testo completo, invisibile, tiene l'altezza (niente salti di layout); sopra,
 * il testo digitato, guidato da un motion value (nessun re-render per
 * carattere). Nell'HTML del server il testo digitato è già completo.
 */
function TypedText({
  text,
  progress,
  typing,
}: {
  text: string;
  progress: MotionValue<number>;
  typing: boolean;
}) {
  const typed = useTransform(progress, (p) => text.slice(0, Math.round(p * text.length)));
  return (
    <p className="grid text-sm leading-[1.55] max-md:text-[13.5px]">
      <span aria-hidden="true" className="invisible col-start-1 row-start-1">
        {text}
      </span>
      <span className="col-start-1 row-start-1">
        <motion.span>{typed}</motion.span>
        {typing ? (
          <span
            aria-hidden="true"
            className="ml-px inline-block h-[1.05em] w-0.5 translate-y-[2px] bg-accent motion-safe:animate-pulse"
          />
        ) : null}
      </span>
    </p>
  );
}

function SlideItem({
  index,
  total,
  label,
  progress,
}: {
  index: number;
  total: number;
  label: string;
  progress: MotionValue<number>;
}) {
  const start = index / total;
  const opacity = useTransform(progress, [start, start + 0.6 / total], [0, 1]);
  const x = useTransform(progress, [start, start + 0.6 / total], [-6, 0]);
  return (
    <motion.li style={{ opacity, x }} className="flex items-center gap-2.5">
      <span
        aria-hidden="true"
        className="grid h-5 w-7 shrink-0 place-items-center rounded-[4px] border border-[#d3d1ca] bg-white font-mono text-[10px] text-ink/70"
      >
        {index + 1}
      </span>
      {label}
    </motion.li>
  );
}
