import { createHash, createHmac } from "node:crypto";

// Pseudonimizzazione dell'IP per rate limit e registro consensi. Con
// IP_HASH_SECRET (solo server, mai NEXT_PUBLIC) l'hash è un HMAC-SHA256: senza il
// segreto non si può risalire all'IP provando tutti gli IPv4 possibili, cosa che
// con uno SHA-256 senza sale richiede pochi minuti. Senza la variabile resta lo
// SHA-256 di prima, così il deploy non dipende dalla configurazione su Vercel.
export function hashIp(ip: string): string {
  const secret = process.env.IP_HASH_SECRET;
  if (secret) return createHmac("sha256", secret).update(ip).digest("hex");
  return createHash("sha256").update(ip).digest("hex");
}
