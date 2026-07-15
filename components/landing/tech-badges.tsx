import { techIcon } from "@/lib/tech-icons";
import { Icon } from "./icon";

// Badge dello stack tecnico di un caso (nomi uguali in tutte le lingue),
// con il logo del tool quando è mappato in lib/tech-icons.ts.
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
      {tech.map((name) => {
        const icon = techIcon(name);
        return (
          <span
            key={name}
            className="inline-flex items-center gap-1.5 rounded-md border border-line bg-white px-2 py-1 font-mono text-[10px] uppercase tracking-wider text-muted"
          >
            {icon && <Icon icon={icon} className="text-[13px]" aria-hidden />}
            {name}
          </span>
        );
      })}
    </div>
  );
}
