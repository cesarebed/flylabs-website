// Badge dello stack tecnico di un caso (nomi uguali in tutte le lingue).
export function TechBadges({
  tech,
  className = "",
}: {
  tech: string[] | null | undefined;
  className?: string;
}) {
  if (!tech || tech.length === 0) return null;
  return (
    <div className={`flex flex-wrap gap-1.5 ${className}`}>
      {tech.map((name) => (
        <span
          key={name}
          className="rounded-md border border-line bg-white px-2 py-1 font-mono text-[10px] uppercase tracking-wider text-muted"
        >
          {name}
        </span>
      ))}
    </div>
  );
}
