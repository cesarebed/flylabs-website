"use client";

import Image, { type StaticImageData } from "next/image";
import type { PointerEvent as ReactPointerEvent } from "react";
import { motion, useMotionValue, useReducedMotion, useSpring, useTransform } from "motion/react";

/**
 * Tilt 3D leggero sull'immagine hero, guidato dal puntatore (Parallax Tilt
 * Card, design-taste-frontend §10). Motion values, non useState: niente
 * re-render a ogni movimento del mouse (vedi §3.B). Ferma sotto
 * prefers-reduced-motion e su touch (nessun pointermove continuo).
 */
export function HeroVisual({
  src,
  alt,
  sizes,
}: {
  src: StaticImageData;
  alt: string;
  sizes: string;
}) {
  const reduce = useReducedMotion();
  const px = useMotionValue(0);
  const py = useMotionValue(0);
  const springConfig = { stiffness: 220, damping: 22, mass: 0.4 };
  const rotateX = useSpring(useTransform(py, [-0.5, 0.5], [7, -7]), springConfig);
  const rotateY = useSpring(useTransform(px, [-0.5, 0.5], [-7, 7]), springConfig);
  const liftY = useSpring(useTransform(py, [-0.5, 0.5], [4, -4]), springConfig);

  const onPointerMove = (e: ReactPointerEvent<HTMLDivElement>) => {
    if (reduce || e.pointerType !== "mouse") return;
    const rect = e.currentTarget.getBoundingClientRect();
    px.set((e.clientX - rect.left) / rect.width - 0.5);
    py.set((e.clientY - rect.top) / rect.height - 0.5);
  };
  const onPointerLeave = () => {
    px.set(0);
    py.set(0);
  };

  return (
    <motion.div
      onPointerMove={onPointerMove}
      onPointerLeave={onPointerLeave}
      style={{ perspective: 1000 }}
      className="relative"
    >
      <motion.div
        style={reduce ? undefined : { rotateX, rotateY, y: liftY, transformStyle: "preserve-3d" }}
      >
        <Image
          src={src}
          alt={alt}
          priority
          sizes={sizes}
          className="h-auto w-full rounded-xl"
        />
      </motion.div>
    </motion.div>
  );
}
