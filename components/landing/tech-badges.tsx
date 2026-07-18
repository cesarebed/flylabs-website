import Image from "next/image";
import { techIcon, techImageLogo } from "@/lib/tech-icons";
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
        const logo = techImageLogo(name);
        return (
          <span
            key={name}
            className="inline-flex items-center gap-1.5 rounded-md border border-line bg-white px-2 py-1 font-mono text-[10px] uppercase tracking-wider text-muted"
          >
            {logo ? (
              <Image
                src={logo.src}
                alt={logo.alt}
                width={13}
                height={13}
                className="h-[13px] w-[13px] object-contain"
              />
            ) : (
              icon && <Icon icon={icon} className="text-[13px]" aria-hidden />
            )}
            {name}
          </span>
        );
      })}
    </div>
  );
}
