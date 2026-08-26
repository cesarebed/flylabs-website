"use client";

// Error boundary di fallback per l'intero sito sotto [locale] (home,
// servizi, stack, privacy): prima d'ora solo lavori/ ne aveva uno, le altre
// pagine mostravano la schermata di errore grezza di Next. Bilingue per lo
// stesso motivo di lavori/error.tsx: un errore può arrivare prima che sia
// chiaro in che lingua stava navigando l'utente.
export default function Error({ reset }: { error: Error; reset: () => void }) {
  return (
    <main className="dark-paper flex flex-1 items-center justify-center px-6 py-24 text-white">
      <div className="max-w-lg text-center">
        <div className="mb-8 font-display text-2xl font-bold">
          flylabs<span className="logo-ai">.ai</span>
        </div>
        <h1 className="mb-5 font-display text-4xl font-semibold leading-tight">
          Qualcosa è andato storto.
          <br />
          Something went wrong.
        </h1>
        <p className="mb-10 text-white/65">
          Riprova tra poco. / Please try again in a moment.
        </p>
        <button
          onClick={reset}
          className="btn-accent rounded-lg px-7 py-3.5 text-sm font-bold"
        >
          Riprova / Retry
        </button>
      </div>
    </main>
  );
}
