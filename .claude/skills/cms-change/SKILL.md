---
name: cms-change
description: Flusso completo per aggiungere o modificare il content model Sanity (nuova sezione, nuovo tipo di documento, nuovi campi). Da usare ogni volta che una feature richiede contenuti editabili dallo Studio.
---

# Modifica al content model Sanity

Obiettivo: chi edita i contenuti nello Studio trova campi chiari in italiano, mai vuoti, e il sito non si rompe per un documento mancante.

## Passi

1. **Modella il minimo.** Decidi i campi davvero necessari ora, niente page-builder generici o campi "per il futuro". Riusa i tipi esistenti (`localeString`, `localeText`) prima di crearne di nuovi.
2. **Schema** in `sanity/schemas/documents/` (o `objects/`):
   - `title`/`description` di ogni campo in italiano sintetico.
   - Testi editabili → `localeString`/`localeText`, mai `string` nudo.
   - `validation: required` dove il frontend si romperebbe; `preview` leggibile su ogni documento.
   - Registra il tipo in `sanity/schemas/index.ts` (e in `SINGLETON_TYPES` se è un singleton).
3. **Sidebar**: aggiorna `sanity/structure.ts` così il nuovo tipo è raggiungibile e al posto giusto.
4. **Query** in `sanity/queries.ts` con `defineQuery`; fetch SOLO via `sanityFetch` con tag = nome del tipo (es. `tags: ["page"]`).
5. **Frontend**: gestisci sempre il caso documento-mancante (`notFound()` o fallback); rotte dinamiche nuove → `generateStaticParams` + `loading.tsx`/`error.tsx`/`not-found.tsx`.
6. **Seed**: crea subito un documento iniziale con i contenuti correnti (mutate API con il token CLI in `~/.config/sanity/config.json`, o `createIfNotExists` in uno script in `scripts/`). Niente Studio aperto sul vuoto.
7. **Typegen** quando lo schema cresce: `npx sanity@latest typegen generate`, mai interfacce scritte a mano.
8. **Verifica** con la skill `visual-check`: pagine toccate in `/it` e `/en` + lo Studio su `/studio` (lo schema appare, i campi si compilano, il preview è leggibile).
9. **Test pubblicazione**: modifica e pubblica il documento seed dallo Studio (o via mutate API) e verifica che la pagina si aggiorni in pochi secondi, conferma che webhook → `/api/revalidate` → tag funziona.
10. **Git**: una modifica di schema è SEMPRE "strutturale", apri una PR con riassunto della migrazione necessaria, branch `feat/...` o `chore/cms-...`.

## Modifiche distruttive (rinomina/rimozione campi o tipi)

1. Prima scrivi e lancia la migrazione dei documenti esistenti (mutation `patch` per ogni documento; script riusabile in `scripts/`).
2. Poi cambia schema e frontend nello stesso PR.
3. Le query devono tollerare il campo mancante durante la transizione (`coalesce` o fallback nel codice).
4. Mai cancellare contenuto pubblicato senza concordarlo.
