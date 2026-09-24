"use client";

import { useState, type ReactNode } from "react";

/**
 * Track animato del marquee + bottone per fermarlo (WCAG 2.2.2: un movimento
 * continuo oltre i 5s deve avere un comando di pausa; l'hover non basta, su
 * touch non esiste). Riceve le icone come `children` dal Server Component
 * (logo-marquee.tsx), così resta indipendente da come sono rese le icone.
 * Sotto prefers-reduced-motion il track è già fermo e il bottone sparisce.
 */
export function MarqueePause({
  children,
  labels,
}: {
  children: ReactNode;
  labels: { pause: string; play: string };
}) {
  const [paused, setPaused] = useState(false);
  return (
    <div className="group relative">
      <div
        className="overflow-hidden [mask-image:linear-gradient(90deg,transparent,black_8%,black_92%,transparent)]"
        aria-hidden
      >
        <div
          className={`flex w-max motion-safe:animate-marquee ${
            // play-state con lo stesso variant `motion-safe:` dell'animazione:
            // senza, lo shorthand di animate-marquee (generato dopo) lo
            // riporterebbe a running.
            paused
              ? "motion-safe:[animation-play-state:paused]"
              : "motion-safe:group-hover:[animation-play-state:paused]"
          }`}
        >
          {children}
        </div>
      </div>
      <div className="mx-auto mt-6 flex max-w-[1120px] justify-end px-6 motion-reduce:hidden">
        <button
          type="button"
          onClick={() => setPaused((p) => !p)}
          aria-label={paused ? labels.play : labels.pause}
          title={paused ? labels.play : labels.pause}
          className="flex h-9 w-9 items-center justify-center rounded-full border border-line bg-white text-ink/70 transition-colors hover:border-ink/30 hover:text-ink"
        >
          {paused ? (
            <svg viewBox="0 0 16 16" width="14" height="14" aria-hidden fill="currentColor">
              <path d="M4.5 2.8v10.4a.6.6 0 0 0 .92.5l8.1-5.2a.6.6 0 0 0 0-1l-8.1-5.2a.6.6 0 0 0-.92.5Z" />
            </svg>
          ) : (
            <svg viewBox="0 0 16 16" width="14" height="14" aria-hidden fill="currentColor">
              <rect x="3.5" y="2.5" width="3" height="11" rx="0.8" />
              <rect x="9.5" y="2.5" width="3" height="11" rx="0.8" />
            </svg>
          )}
        </button>
      </div>
    </div>
  );
}
