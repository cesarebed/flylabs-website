"use client";

import { Icon as IconifyIcon, type IconProps } from "@iconify/react";

/**
 * Thin client wrapper around Iconify so server components can drop in icons
 * (logos brand + lucide) senza diventare client a loro volta.
 */
export function Icon(props: IconProps) {
  return <IconifyIcon {...props} />;
}
