"use client";

import { useEffect, useRef } from "react";

/**
 * Video muto in loop che parte da solo solo se l'utente non ha chiesto meno
 * movimento (prefers-reduced-motion). L'attributo autoPlay non basterebbe:
 * sta nell'HTML del server e partirebbe comunque. Quindi il video nasce
 * fermo sul poster e lo avvia il client; con reduce resta fermo e si avvia
 * dai comandi. I comandi ci sono sempre: un loop più lungo di 5 secondi
 * deve poter essere messo in pausa (WCAG 2.2.2).
 */
export function AutoplayVideo({
  src,
  poster,
  width,
  height,
  label,
  className,
}: {
  src: string;
  poster: string;
  width: number;
  height: number;
  label: string;
  className?: string;
}) {
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = ref.current;
    if (!video) return;
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => {
      if (query.matches) {
        video.pause();
        return;
      }
      // I browser avviano da soli solo i video muti: la proprietà va messa
      // prima di play() (l'attributo del server non sempre la imposta).
      video.muted = true;
      video.play().catch(() => {
        // Autoplay negato (risparmio dati, policy del browser): resta il
        // poster con i comandi.
      });
    };
    sync();
    query.addEventListener("change", sync);
    return () => query.removeEventListener("change", sync);
  }, []);

  return (
    <video
      ref={ref}
      src={src}
      poster={poster}
      width={width}
      height={height}
      aria-label={label}
      muted
      loop
      playsInline
      controls
      preload="metadata"
      className={className}
    />
  );
}
