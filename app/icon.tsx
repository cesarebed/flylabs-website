import { ImageResponse } from "next/og";

export const size = { width: 64, height: 64 };
export const contentType = "image/png";

// Icona moderna (SVG/PNG multi-res, favicon.ico resta per i browser vecchi):
// "f" bianca su fondo ink, coerente col logo di testo "flylabs.ai" in
// globals.css (.logo-ai). Applicata a livello app/ così vale per tutto il
// sito, Studio incluso.
export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#15151a",
          borderRadius: 14,
          fontFamily: "sans-serif",
          fontSize: 40,
          fontWeight: 700,
          color: "#fff",
        }}
      >
        f
      </div>
    ),
    { ...size }
  );
}
