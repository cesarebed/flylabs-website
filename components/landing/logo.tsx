import Image from "next/image";

/** Logo orizzontale dal kit brand/flylabs-ai, in chiaro o scuro. */
export function Logo({
  variant,
  className,
}: {
  variant: "light" | "dark";
  className?: string;
}) {
  return (
    <Image
      src={`/logo/flylabs-lockup-${variant}.svg`}
      // Keep the intrinsic size aligned with the SVG viewBox.
      width={164}
      height={36}
      alt="flylabs.ai"
      loading="eager"
      unoptimized
      className={className}
    />
  );
}
