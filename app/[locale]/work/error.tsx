"use client";

// Errore imprevisto (es. Sanity irraggiungibile): messaggio bilingue e retry.
export default function Error({ reset }: { error: Error; reset: () => void }) {
  return (
    <main className="site-zoom flex-1">
      <div className="mx-auto max-w-[1120px] px-6 py-24 text-center">
        <h1 className="font-display text-3xl font-semibold">
          Qualcosa è andato storto / Something went wrong
        </h1>
        <p className="mt-4 text-muted">
          Non siamo riusciti a caricare i casi di successo. / We couldn&apos;t
          load the case studies.
        </p>
        <button
          onClick={reset}
          className="mt-8 rounded-md bg-ink px-6 py-3 text-sm font-bold text-white"
        >
          Riprova / Retry
        </button>
      </div>
    </main>
  );
}
