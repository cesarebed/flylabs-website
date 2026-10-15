// Skeleton della lista lavori mostrato durante il fetch da Sanity.
export default function Loading() {
  return (
    <main className="site-zoom flex-1">
      <div className="mx-auto max-w-[1120px] px-6 py-16">
        <div className="mb-6 h-4 w-24 animate-pulse rounded bg-line" />
        <div className="mb-12 h-12 w-2/3 animate-pulse rounded bg-line" />
        <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              className="h-64 animate-pulse rounded-xl border border-line bg-paper"
            />
          ))}
        </div>
      </div>
    </main>
  );
}
