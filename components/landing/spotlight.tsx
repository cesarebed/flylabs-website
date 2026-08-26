"use client";

import { useRef } from "react";
import type { PointerEvent as ReactPointerEvent, ReactNode } from "react";

/**
 * Alone di luce che segue il cursore (Spotlight Border Card, vedi skill
 * design-taste-frontend §10). Puramente CSS: pointermove aggiorna due
 * custom property (--mx/--my), un layer assoluto le legge in un
 * radial-gradient. Niente stato React per il movimento (niente re-render
 * a ogni frame, vedi §3.B) — su touch/senza hover resta semplicemente
 * fermo al centro, innocuo.
 */
export function Spotlight({
  children,
  className,
  size = 480,
}: {
  children: ReactNode;
  className?: string;
  size?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);

  const onPointerMove = (e: ReactPointerEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    el.style.setProperty("--mx", `${e.clientX - rect.left}px`);
    el.style.setProperty("--my", `${e.clientY - rect.top}px`);
  };

  return (
    <div ref={ref} onPointerMove={onPointerMove} className={`group relative ${className ?? ""}`}>
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100 motion-reduce:!opacity-0"
        style={{
          background: `radial-gradient(${size}px circle at var(--mx, 50%) var(--my, 50%), rgba(52, 59, 237, 0.10), transparent 70%)`,
        }}
      />
      {children}
    </div>
  );
}
