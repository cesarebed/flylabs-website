"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { TechBadges } from "./tech-badges";

export type WorkItem = {
  id: string;
  href: string;
  sector: string;
  problem: string;
  solution: string;
  tech: string[];
  metrics: { key: string; value: string; label: string }[];
  cta: string;
};

const AUTOPLAY_MS = 5000;

/**
 * Carosello dei casi di successo.
 *
 * Il movimento è una `transform` sul track, non uno scroll del container:
 * su questa pagina lo scroll programmatico è inaffidabile (scroll-snap +
 * scroll-behavior smooth + `zoom` del layout si rincorrono e la posizione
 * torna indietro). Con la transform il passo è deterministico e non serve
 * un listener di scroll, quindi niente loop stato -> scroll -> stato.
 *
 * Scorre da solo, lentamente, e si ferma appena l'utente interagisce.
 */
export function WorkCarousel({
  items,
  labels,
}: {
  items: WorkItem[];
  labels: { prev: string; next: string; region: string };
}) {
  const viewportRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const [step, setStep] = useState(0);
  const [perView, setPerView] = useState(1);

  // Passo e card visibili si misurano dal DOM: così restano corretti a ogni
  // breakpoint senza duplicare i numeri fra CSS e JS.
  useEffect(() => {
    const viewport = viewportRef.current;
    const track = trackRef.current;
    if (!viewport || !track) return;
    const measure = () => {
      const card = track.children[0] as HTMLElement | undefined;
      if (!card) return;
      const gap = parseFloat(getComputedStyle(track).columnGap) || 0;
      const cardWidth = card.getBoundingClientRect().width;
      const next = cardWidth + gap;
      setStep(next);
      setPerView(
        Math.max(1, Math.round(viewport.getBoundingClientRect().width / next))
      );
    };
    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(viewport);
    return () => observer.disconnect();
  }, [items.length]);

  const lastIndex = Math.max(0, items.length - perView);
  // Clamp derivato in render, non corretto in un effect: dopo un resize che
  // mostra più card l'indice salvato può essere oltre l'ultima posizione utile.
  const safeIndex = Math.min(index, lastIndex);

  const go = useCallback(
    (delta: number) =>
      setIndex((i) => {
        const next = Math.min(i, lastIndex) + delta;
        if (next < 0) return lastIndex;
        if (next > lastIndex) return 0;
        return next;
      }),
    [lastIndex]
  );

  useEffect(() => {
    if (paused || lastIndex === 0) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = setInterval(() => go(1), AUTOPLAY_MS);
    return () => clearInterval(id);
  }, [paused, lastIndex, go]);

  const pad = (n: number) => String(n).padStart(2, "0");

  return (
    <div
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={() => setPaused(false)}
    >
      <div className="mb-6 flex items-center justify-end gap-4">
        <span className="font-mono text-[11px] tracking-[0.14em] text-muted tabular-nums">
          {pad(safeIndex + 1)} / {pad(items.length)}
        </span>
        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => go(-1)}
            aria-label={labels.prev}
            className="flex h-9 w-9 items-center justify-center rounded-full border border-line bg-white text-ink transition hover:border-ink/30 hover:bg-paper focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
          >
            <span aria-hidden>←</span>
          </button>
          <button
            type="button"
            onClick={() => go(1)}
            aria-label={labels.next}
            className="flex h-9 w-9 items-center justify-center rounded-full border border-line bg-white text-ink transition hover:border-ink/30 hover:bg-paper focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
          >
            <span aria-hidden>→</span>
          </button>
        </div>
      </div>

      <div
        ref={viewportRef}
        role="region"
        aria-label={labels.region}
        aria-roledescription="carousel"
        className="overflow-hidden"
      >
        <div
          ref={trackRef}
          className="flex gap-5 motion-safe:transition-transform motion-safe:duration-700 motion-safe:ease-out"
          style={{ transform: `translate3d(-${safeIndex * step}px, 0, 0)` }}
        >
          {items.map((item, i) => (
            <Link
              key={item.id}
              href={item.href}
              // Se l'utente arriva con il tab su una card fuori vista, il
              // carosello la porta in vista invece di lasciare il focus cieco.
              onFocus={() => setIndex(Math.min(i, lastIndex))}
              // Larghezze che lasciano intravedere la card successiva: il
              // "peek" dice che ce n'è dell'altra, prima ancora delle frecce.
              className="card-hover flex w-[85%] shrink-0 flex-col rounded-xl border border-line bg-paper p-7 sm:w-[46%] lg:w-[31.5%]"
            >
              <span className="stamp mb-6 text-muted">{item.sector}</span>
              <p className="mb-1 font-semibold">{item.problem}</p>
              <p className="mb-4 text-sm text-muted">{item.solution}</p>
              <TechBadges tech={item.tech} className="mb-6" max={5} />
              <div
                className={`mt-auto border-t border-line pt-6 ${
                  item.metrics.length > 1 ? "grid grid-cols-2 gap-4" : ""
                }`}
              >
                {item.metrics.map((metric) => (
                  <div key={metric.key}>
                    <div className="whitespace-nowrap font-display text-4xl font-semibold leading-none text-accent">
                      {metric.value}
                    </div>
                    <div className="mt-2 font-mono text-[11px] uppercase tracking-wider text-muted">
                      {metric.label}
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-5 text-sm font-medium text-ink/70">{item.cta}</div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
