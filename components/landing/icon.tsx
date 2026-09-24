import { useId, type SVGProps } from "react";
import type { IconifyIconCustomisations } from "@iconify/utils/lib/customisations/defaults";
import { flipFromString } from "@iconify/utils/lib/customisations/flip";
import { rotateFromString } from "@iconify/utils/lib/customisations/rotate";
import type { IconifyIcon } from "@iconify/utils/lib/icon/defaults";
import { iconToSVG } from "@iconify/utils/lib/svg/build";
import generated from "@/lib/icons.generated.json";

/**
 * Icona Iconify resa come <svg> inline, offline: i dati vengono da
 * lib/icons.generated.json (solo le icone usate, estratte da
 * scripts/build-icons.mjs in predev/prebuild), mai da api.iconify.design.
 *
 * Isomorfo di proposito: niente "use client" né "server-only", perché lo
 * usano sia Server Components (stack, what-we-build, logo-marquee) sia
 * client (work-carousel → TechBadges). Nessuno stato né effetto, quindi
 * l'SVG è già nell'HTML SSR e l'hydration combacia; gli id interni
 * (gradienti, clipPath) diventano unici per istanza con useId, stabile tra
 * server e client.
 *
 * Stesse props del vecchio wrapper di @iconify/react che si usano davvero:
 * `icon` (nome "prefisso:nome" o dati IconifyIcon), width/height (default
 * altezza 1em, larghezza in proporzione), inline, rotate, flip/hFlip/vFlip,
 * più ogni attributo SVG (className, style, aria-*).
 */
type GeneratedIcon = IconifyIcon & { ids?: string[] };

const ICONS: Record<string, GeneratedIcon> = generated;

export type IconProps = Omit<
  SVGProps<SVGSVGElement>,
  "ref" | "children" | "dangerouslySetInnerHTML" | "width" | "height" | "rotate"
> & {
  icon: string | IconifyIcon;
  width?: string | number;
  height?: string | number;
  inline?: boolean;
  rotate?: string | number;
  flip?: string;
  hFlip?: boolean;
  vFlip?: boolean;
};

/** Rende unici gli id del body (stessa regex di replaceIDs di @iconify/utils,
 *  ma deterministica: quella della libreria usa un contatore globale che
 *  darebbe id diversi tra server e client). */
function scopeIds(body: string, ids: string[], prefix: string): string {
  let out = body;
  for (const id of ids) {
    const escaped = id.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    out = out.replace(
      new RegExp(`([#;"])(${escaped})([")]|\\.[a-z])`, "g"),
      `$1${prefix}$2$3`
    );
  }
  return out;
}

export function Icon({
  icon,
  width,
  height,
  inline,
  rotate,
  flip,
  hFlip,
  vFlip,
  style,
  ...rest
}: IconProps) {
  const uid = useId();
  const data: GeneratedIcon | undefined = typeof icon === "string" ? ICONS[icon] : icon;

  if (!data) {
    if (process.env.NODE_ENV !== "production" && typeof window === "undefined") {
      console.warn(
        `[Icon] "${String(icon)}" non è in lib/icons.generated.json: lancia scripts/build-icons.mjs (e installa il set @iconify-json se manca).`
      );
    }
    // segnaposto della stessa misura, così il layout non salta
    return (
      <svg aria-hidden="true" width="1em" height="1em" viewBox="0 0 16 16" style={style} {...rest} />
    );
  }

  const custom: IconifyIconCustomisations = {};
  if (width !== undefined) custom.width = width;
  if (height !== undefined) custom.height = height;
  if (rotate !== undefined) {
    custom.rotate = typeof rotate === "string" ? rotateFromString(rotate) : rotate;
  }
  if (hFlip) custom.hFlip = true;
  if (vFlip) custom.vFlip = true;
  if (flip) flipFromString(custom, flip);

  const { attributes, body } = iconToSVG(data, custom);
  const ids = "ids" in data ? data.ids : undefined;
  const html = ids?.length
    ? scopeIds(body, ids, `${uid.replace(/[^\w-]/g, "")}-`)
    : body;

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      role="img"
      {...attributes}
      {...rest}
      style={inline ? { verticalAlign: "-0.125em", ...style } : style}
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}
