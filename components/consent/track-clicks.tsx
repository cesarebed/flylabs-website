"use client";

import { useEffect } from "react";
import { trackEvent } from "@/lib/google-analytics";

// Un solo listener delegato per i click che contano nel funnel, così i link
// restano nei Server Component e non serve un handler su ognuno:
// - prenotazione: ogni link verso TidyCal (bookingUrl di siteSettings);
// - caso studio: ogni link interno verso /<lang>/lavori/<slug>.
// `placement` dice da dove è partito il click: la sezione con id più vicina
// (hero, cta, lavori...) oppure header/footer.
const CASE_PATH = /^\/(?:it|en)\/lavori\/([^/?#]+)/;

function placementOf(el: Element) {
  const landmark = el.closest("header, footer");
  if (landmark) return landmark.tagName.toLowerCase();
  return el.closest("[id]")?.id || "page";
}

export function TrackClicks() {
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const link = (e.target as Element | null)?.closest?.("a[href]");
      if (!(link instanceof HTMLAnchorElement)) return;
      const url = new URL(link.href, window.location.href);
      const placement = placementOf(link);
      if (url.hostname.endsWith("tidycal.com")) {
        trackEvent("book_call_click", { placement });
        return;
      }
      const match = url.origin === window.location.origin && url.pathname.match(CASE_PATH);
      if (match) trackEvent("case_open", { case_slug: match[1], placement });
    };
    // capture: il click viene registrato anche se un altro handler ferma la propagazione
    document.addEventListener("click", onClick, { capture: true });
    return () => document.removeEventListener("click", onClick, { capture: true });
  }, []);
  return null;
}
