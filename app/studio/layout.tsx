import type { Metadata } from "next";
import { fontVars } from "@/lib/fonts";
import "../globals.css";

export const metadata: Metadata = {
  title: "Studio",
  robots: { index: false, follow: false, nocache: true },
};

// Root layout dello Studio embedded: separato da quello del sito perché lo
// Studio non vive sotto [locale] e ha bisogno del proprio <html>/<body>. La
// UI dello Studio è in inglese, quindi lang="en". noindex sopra: fuori da Google.
export default function StudioLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${fontVars} h-full antialiased`}>
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
