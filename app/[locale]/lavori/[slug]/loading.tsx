// Skeleton del dettaglio caso mostrato durante il fetch da Sanity.
export default function Loading() {
  return (
    <main className="site-zoom flex-1">
      <div className="mx-auto max-w-3xl px-6 py-[80px]">
        <div className="mb-6 h-4 w-32 animate-pulse rounded bg-line" />
        <div className="mb-10 h-12 w-3/4 animate-pulse rounded bg-line" />
        <div className="mb-10 h-28 w-48 animate-pulse rounded-xl bg-line" />
        <div className="flex flex-col gap-4">
          <div className="h-4 w-full animate-pulse rounded bg-line" />
          <div className="h-4 w-5/6 animate-pulse rounded bg-line" />
          <div className="h-4 w-2/3 animate-pulse rounded bg-line" />
        </div>
      </div>
    </main>
  );
}
