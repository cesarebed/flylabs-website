"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import type { PointerEvent as ReactPointerEvent } from "react";
import { useParams } from "next/navigation";
import { defaultLocale, isLocale } from "@/lib/i18n";
import { cases } from "@/lib/cases-content";
import { CaseCard, type CaseCardData } from "./case-card";

export type WorkItem = CaseCardData;

const AUTOPLAY_MS = 5000;
const GAP_REM = 1.25; // gap-5

// Stessi breakpoint delle classi di larghezza delle card (sm:w-[46%]
// lg:w-[31.5%] più sotto): niente più misura via ResizeObserver /
// getBoundingClientRect per calcolare il passo di scorrimento.
//
// Perché: il sito applica `zoom: 1.15` al wrapper della pagina (.site-zoom,
// vedi globals.css e PageShell). getBoundingClientRect() restituisce dimensioni GIÀ
// zoomate; se quel numero in px viene rimesso dentro un
// `transform: translateX(...px)` sullo stesso sottoalbero zoomato, il
// browser applica lo zoom una SECONDA volta a quel valore, quindi ogni
// passo scorre più del dovuto. L'overshoot si accumula ad ogni step:
// alla fine del carosello la card "corrente" finisce con il bordo
// sinistro tagliato (bug osservato in produzione, cresce con l'indice).
// Con calc() espresso in % + rem — le stesse unità delle classi di
// larghezza — il browser applica lo zoom una volta sola, come per
// qualunque altra dimensione della pagina: nessuna card viene più
// tagliata, a nessun indice.
const BREAKPOINTS = [
  { minWidth: 1024, perView: 3, cardPercent: 31.5 },
  { minWidth: 640, perView: 2, cardPercent: 46 },
  { minWidth: 0, perView: 1, cardPercent: 100 },
] as const;

function getBreakpoint(width: number) {
  return BREAKPOINTS.find((b) => width >= b.minWidth) ?? BREAKPOINTS[BREAKPOINTS.length - 1];
}

const SWIPE_THRESHOLD_PX = 40;

/**
 * Carosello dei casi di successo.
 *
 * Scorre da solo, lentamente, e si ferma appena l'utente interagisce
 * (hover, focus, drag). Il bottone Pausa/Riprendi è il comando esplicito
 * richiesto da WCAG 2.2.2 (hover e focus da touch non esistono); usare le
 * frecce o lo swipe ferma l'autoplay finché non si preme Riprendi, come nel
 * pattern carousel dell'APG. Oltre a frecce e autoplay, si può trascinare con
 * mouse/touch: il drag riconosce solo direzione e soglia (non segue il
 * dito a pixel), per lo stesso motivo dello zoom spiegato sopra — un
 * delta di trascinamento in px avrebbe lo stesso problema se usato per
 * posizionare la card invece che per decidere "avanti" o "indietro".
 */
export function WorkCarousel({
  items,
  labels,
}: {
  items: WorkItem[];
  labels: { prev: string; next: string; region: string };
}) {
  const params = useParams<{ locale?: string }>();
  const lang = params?.locale && isLocale(params.locale) ? params.locale : defaultLocale;
  const viewportRef = useRef<HTMLDivElement>(null);
  const [index, setIndex] = useState(0);
  // `paused`: pausa temporanea (hover, focus, drag in corso).
  // `stopped`: autoplay spento dall'utente (bottone Pausa, frecce, swipe),
  // resta spento finché non preme Riprendi.
  const [paused, setPaused] = useState(false);
  const [stopped, setStopped] = useState(false);
  const [reduceMotion, setReduceMotion] = useState(false);
  // Parte `true` di proposito: se l'IntersectionObserver non emettesse mai un
  // callback, il carosello continuerebbe comunque a scorrere invece di restare
  // fermo per sempre. L'observer semmai lo spegne quando la sezione esce.
  const [visible, setVisible] = useState(true);
  const [bp, setBp] = useState(BREAKPOINTS[BREAKPOINTS.length - 1]);
  const [ready, setReady] = useState(false);
  const [dragging, setDragging] = useState(false);

  useEffect(() => {
    // Il breakpoint iniziale va letto solo lato client (SSR-safe): rimandato
    // a un rAF, non chiamato in modo sincrono nel corpo dell'effect (regola
    // react-hooks/set-state-in-effect), un frame di ritardo è impercettibile.
    const update = () => {
      setBp(getBreakpoint(window.innerWidth));
      setReduceMotion(window.matchMedia("(prefers-reduced-motion: reduce)").matches);
      setReady(true);
    };
    const raf = requestAnimationFrame(update);
    window.addEventListener("resize", update);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", update);
    };
  }, []);

  const { perView, cardPercent } = bp;
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

  // Scorre solo quando la sezione è davvero sullo schermo: altrimenti il
  // movimento avviene mentre l'utente è altrove e la sezione sembra ferma.
  useEffect(() => {
    const viewport = viewportRef.current;
    if (!viewport) return;
    const observer = new IntersectionObserver(
      ([entry]) => setVisible(entry.isIntersecting),
      { threshold: 0.3 }
    );
    observer.observe(viewport);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (paused || stopped || !visible || lastIndex === 0) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = setInterval(() => go(1), AUTOPLAY_MS);
    return () => clearInterval(id);
  }, [paused, stopped, visible, lastIndex, go]);

  // Navigazione scelta dall'utente: sposta e spegne l'autoplay.
  const goByUser = (delta: number) => {
    setStopped(true);
    go(delta);
  };

  const dragStartX = useRef<number | null>(null);

  const endDrag = (clientX: number) => {
    const startX = dragStartX.current;
    dragStartX.current = null;
    setDragging(false);
    setPaused(false);
    if (startX === null) return;
    const delta = clientX - startX;
    if (delta > SWIPE_THRESHOLD_PX) goByUser(-1);
    else if (delta < -SWIPE_THRESHOLD_PX) goByUser(1);
  };

  const onPointerDown = (e: ReactPointerEvent<HTMLDivElement>) => {
    dragStartX.current = e.clientX;
    setDragging(true);
    setPaused(true);
  };
  const onPointerUp = (e: ReactPointerEvent<HTMLDivElement>) => endDrag(e.clientX);
  const onPointerCancel = () => {
    dragStartX.current = null;
    setDragging(false);
    setPaused(false);
  };

  const pad = (n: number) => String(n).padStart(2, "0");
  // Intervallo invece della sola posizione: "01-03 / 05" dice quante card
  // stai vedendo e quante ce ne sono, senza il salto controintuitivo di un
  // contatore singolo che arriva a 03 e riparte da 01. Con una card per
  // volta (mobile) basta la posizione: "01-01" sembrava un glitch.
  const from = safeIndex + 1;
  const to = Math.min(safeIndex + perView, items.length);
  const range = perView === 1 ? pad(from) : `${pad(from)}-${pad(to)}`;

  // Pausa/Riprendi solo se l'autoplay esiste davvero: con reduced motion o
  // con tutte le card già in vista non scorre niente.
  const showPause = !reduceMotion && lastIndex > 0;

  const step = `(${cardPercent}% + ${GAP_REM}rem)`;

  const controlClass =
    "flex h-9 w-9 items-center justify-center rounded-full border border-line bg-white text-ink transition hover:border-ink/30 hover:bg-paper focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent";

  return (
    <div>
      <div className="mb-6 flex items-center justify-end gap-4">
        {/* Finché il breakpoint non è misurato lato client, `perView` vale 1
            e il server renderizzerebbe "01 / 05", corretto solo dopo
            l'hydration. Meglio tenerlo invisibile (spazio riservato, niente
            salti) che mostrare per un istante un intervallo sbagliato. */}
        <span
          className={`font-mono text-[11px] tracking-[0.14em] text-muted tabular-nums ${
            ready ? "" : "invisible"
          }`}
        >
          {range} / {pad(items.length)}
        </span>
        <div className="flex gap-2">
          {showPause && (
            <button
              type="button"
              onClick={() => setStopped((s) => !s)}
              aria-label={stopped ? cases.carousel.resume[lang] : cases.carousel.pause[lang]}
              title={stopped ? cases.carousel.resume[lang] : cases.carousel.pause[lang]}
              className={`${controlClass} ${ready ? "" : "invisible"}`}
            >
              {stopped ? (
                <svg aria-hidden viewBox="0 0 16 16" className="h-3.5 w-3.5" fill="currentColor">
                  <path d="M4.5 2.8v10.4a.6.6 0 0 0 .9.5l8.2-5.2a.6.6 0 0 0 0-1L5.4 2.3a.6.6 0 0 0-.9.5Z" />
                </svg>
              ) : (
                <svg aria-hidden viewBox="0 0 16 16" className="h-3.5 w-3.5" fill="currentColor">
                  <rect x="3.5" y="2.5" width="3" height="11" rx="0.8" />
                  <rect x="9.5" y="2.5" width="3" height="11" rx="0.8" />
                </svg>
              )}
            </button>
          )}
          <button
            type="button"
            onClick={() => goByUser(-1)}
            aria-label={labels.prev}
            className={controlClass}
          >
            <span aria-hidden>←</span>
          </button>
          <button
            type="button"
            onClick={() => goByUser(1)}
            aria-label={labels.next}
            className={controlClass}
          >
            <span aria-hidden>→</span>
          </button>
        </div>
      </div>

      {/* La pausa vive qui, non sul blocco intero: hover o focus su una card
          fermano lo scorrimento, ma usare le frecce (che stanno fuori) no,
          altrimenti il focus del bottone lo terrebbe in pausa per sempre.

          overflow-clip, non overflow-hidden: un container hidden resta
          scrollabile da programma, e il Tab su una card fuori vista faceva
          scroll-into-view (scrollLeft 311 a 390px) sommato alla transform,
          con la card a fuoco finita fuori schermo. clip vieta ogni scroll,
          coerente con la scelta "transform sul track, mai scroll del
          container"; l'onScroll è una difesa per i browser senza clip. */}
      <div
        ref={viewportRef}
        role="region"
        aria-label={labels.region}
        aria-roledescription="carousel"
        className={`touch-pan-y overflow-clip select-none ${
          dragging ? "cursor-grabbing" : "cursor-grab"
        }`}
        onScroll={(e) => {
          if (e.currentTarget.scrollLeft !== 0) e.currentTarget.scrollLeft = 0;
        }}
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
        onFocusCapture={() => setPaused(true)}
        onBlurCapture={() => setPaused(false)}
        onPointerDown={onPointerDown}
        onPointerUp={onPointerUp}
        onPointerCancel={onPointerCancel}
        onPointerLeave={(e) => {
          if (dragStartX.current !== null) endDrag(e.clientX);
        }}
      >
        <div
          className={`flex gap-5 motion-safe:transition-[transform,scale] motion-safe:duration-700 motion-safe:ease-out ${
            dragging ? "scale-[0.99] motion-safe:duration-150" : ""
          }`}
          style={{ transform: `translateX(calc(-1 * ${safeIndex} * ${step}))` }}
        >
          {items.map((item, i) => (
            <CaseCard
              key={item.id}
              item={item}
              headingLevel="h3"
              // Se l'utente arriva con il tab su una card fuori vista, il
              // carosello la porta in vista invece di lasciare il focus cieco.
              onLinkFocus={() => setIndex(Math.min(i, lastIndex))}
              // Su mobile una card piena per pagina (niente "peek": con lo
              // schermo stretto un pezzo di card successiva sembra tagliata
              // a metà). Dal breakpoint `sm` in su torna il peek, a dire che
              // ce n'è dell'altra, prima ancora delle frecce.
              className="w-full shrink-0 sm:w-[46%] lg:w-[31.5%]"
            />
          ))}
        </div>
      </div>
    </div>
  );
}
