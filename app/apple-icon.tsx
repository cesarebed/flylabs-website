import { ImageResponse } from "next/og";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

// apple-touch-icon: quello che appare aggiungendo il sito alla home da
// Safari/Instagram in-app browser. Niente trasparenza (iOS la riempie di
// nero), stesso trattamento di app/icon.tsx a risoluzione più alta.
export default function AppleIcon() {
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
          fontFamily: "sans-serif",
          fontSize: 108,
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
