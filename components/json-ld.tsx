// Dati strutturati schema.org come <script> inline, secondo la guida
// ufficiale Next (docs/01-app/02-guides/json-ld.md). JSON.stringify non
// sanifica "<": l'escape previene XSS da contenuti che arrivano dal CMS.
export function JsonLd({ data }: { data: Record<string, unknown> }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(data).replace(/</g, "\\u003c"),
      }}
    />
  );
}
