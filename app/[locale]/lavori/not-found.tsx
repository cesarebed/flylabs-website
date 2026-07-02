import Link from "next/link";

// Caso non trovato: not-found.tsx non riceve params, quindi testo bilingue.
export default function NotFound() {
  return (
    <main className="site-zoom flex-1">
      <div className="mx-auto max-w-[1120px] px-6 py-24 text-center">
        <h1 className="font-display text-3xl font-semibold">
          Caso non trovato / Case not found
        </h1>
        <p className="mt-4 text-muted">
          Questo caso di successo non esiste o non è ancora pubblicato. / This
          case study doesn&apos;t exist or isn&apos;t published yet.
        </p>
        <Link
          href="/it/lavori"
          className="mt-8 inline-block rounded-md bg-ink px-6 py-3 text-sm font-bold text-white"
        >
          Tutti i lavori / All work
        </Link>
      </div>
    </main>
  );
}
