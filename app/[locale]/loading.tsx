// Fallback minimo per home/servizi/stack/privacy (che oggi non ne avevano
// uno): evita il flash bianco durante il fetch di siteSettings da Sanity,
// dato che l'hero è scuro (.dark-paper). Nessuno spinner: un secondo di
// sfondo scuro è meno rumoroso di un'icona che gira.
export default function Loading() {
  return <div className="dark-paper min-h-[100dvh]" />;
}
