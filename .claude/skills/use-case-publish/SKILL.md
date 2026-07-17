---
name: use-case-publish
description: >-
  Trasforma un progetto/cliente di flylabs-brain in un caso di successo (use
  case) ANONIMIZZATO pronto per il sito: aggiorna la nota nel brain
  (anonimizzazione + public_status) e genera il file JSON del documento Sanity
  `caseStudy` in flylabs-website (content/case-studies/), pronto da caricare su
  Sanity. Usa questa skill ogni volta che si parla di preparare/pubblicare un
  "caso di successo", uno "use case", un "case study", un caso cliente sul sito,
  o di trasformare una nota progetto del brain in contenuto per /lavori — anche
  se non viene detto esplicitamente "skill". Non inventare mai le metriche.
---

# Use case publish — dal brain al sito, anonimizzato

Obiettivo: prendere un progetto reale che vive in **flylabs-brain** e produrne una
versione **pubblicabile e anonima** in due posti, senza far trapelare né il nome del
cliente né dati commerciali interni:

1. **Nel brain** — aggiorni la nota del progetto (sezione *Pubblicabilità*, campi
   `anonymize`/`public_name`/`public_status`), così il brain resta la fonte di verità.
2. **Nel sito** (`flylabs-website`) — generi `content/case-studies/<slug>.json`, un
   documento `caseStudy` pronto per Sanity (la route `/[locale]/lavori` pesca da lì).

Il brain è la fonte; il file del sito è il **sottoinsieme pubblico**. Le sezioni
interne (soprattutto *Commerciale*) non escono mai.

## Perché serve questa skill

I casi studio sono il contenuto che converte di più per un'agency, ma trasformarli a
mano è ripetitivo e rischioso: è facile lasciare il nome del cliente, copiare numeri
non validati, o dimenticare una lingua. Questa skill rende il passaggio ripetibile e
sicuro, con la regola d'oro: **niente numeri inventati**.

## Skill collegata
Per generare/esportare i diagrammi Excalidraw del caso (fonte per il campo `diagrams`, passo 3),
usa la skill **`excalidraw-diagram`** prima o durante questa: produce i PNG bilingui IT/EN pronti
da referenziare qui.

## Prima di iniziare: trova i repo e leggi le convenzioni

- **flylabs-brain**: di norma è una cartella sorella di questo repo (`../flylabs-brain`).
  Se non c'è lì, cercala (`~/Documents/Github/flylabs-brain` o simili) o chiedi il path.
- Leggi la convenzione completa dei case study nel brain: `docs/stack.md` §9 e il
  template `03_Resources/templates/case-study.md`. Ti dicono cosa è pubblicabile.
  ⚠️ Dove la §9 parla di pagine **MDX in `content/use-cases/`** è superata: il formato
  attuale è **JSON `caseStudy` in `content/case-studies/`** (schema Sanity + importer di
  questa skill). Segui questa skill, non la §9, sul formato dei file.
- Leggi lo **schema del sito** per i campi esatti e obbligatori:
  `sanity/schemas/documents/caseStudy.ts` in questo repo (oppure vedi
  `assets/case-study.template.json` in questa skill).

## Passi

### 1. Individua il progetto e valuta la pubblicabilità
Chiedi (o ricava dal contesto) quale progetto del brain trasformare
(`01_Projects/<slug>/<slug>.md`). Apri la nota e controlla il frontmatter:
- Se `case_study: true` non c'è, non è un candidato: proponi di impostarlo prima.
- Rispetta `public_status`: il sito pubblica solo `ready`/`published`. Se è `draft`,
  puoi comunque **preparare** i file, ma segnala chiaramente che restano bozza finché
  qualcuno non valida e mette `ready`.

### 2. Anonimizza (parte critica)
- Usa `anonymize` e `public_name` dal frontmatter. Se `anonymize: true`, l'identità sul
  sito è **`public_name`** (es. "struttura ricettiva in Sardegna"), mai il nome vero.
- Rimuovi ogni dettaglio identificante: nome azienda, referente, città esatta, URL,
  numeri che identificano il cliente. Generalizza (settore, regione).
- **Non copiare mai** la sezione *Commerciale (interno)* né importi/margini/costi.
- Angolo per il sito: parti da *Pubblicabilità → Angolo per il sito* se presente.

### 3. Mappa il brain sui campi `caseStudy` (bilingue it + en)
Tutti i testi sono bilingui: scrivi l'italiano dal brain e **traduci in inglese** in
modo naturale (non letterale). Mappatura:

| Sezione brain | Campo `caseStudy` | Note |
|---|---|---|
| Cliente & contesto → settore | `sector` | etichetta breve sulla card |
| (angolo/titolo) | `title` | es. "Recensioni gestite dall'AI, tono calibrato" |
| Problema / sfida | `problem` | 1-2 frasi |
| Soluzione | `solution` | 1-2 frasi |
| Risultati / impatto | `metrics` | array di 1-2 `{_type:"metric", _key, value, label}`; vedi regola metrica sotto |
| frontmatter `tech: [...]` | `tech` | badge dello stack (array di stringhe, nomi invariati nelle lingue) |
| scelta editoriale | `featured` | `true` = card nella sezione homepage "Alcune delle nostre soluzioni" (max 3) |
| diagrammi in `diagrams/` | `diagrams` | array di oggetti `{it: image, en: image, alt, caption}`. **Autoring + export bilingue: skill `excalidraw-diagram`** (`.claude/skills/excalidraw-diagram/`) — produce i PNG in `content/case-studies/assets/` (suffisso `-en` per l'inglese) partendo dai `.excalidraw.md` nel brain. Qui devi solo referenziarli con `_localFile` dentro `it`/`en`: l'importer carica gli asset e collega i ref (idempotente per `_key`+lingua; per forzare il re-upload cambia `_key`) |
| Come funziona / Risultati | `body` | racconto esteso (opzionale) |
| (testimonianza, se c'è) | `testimonial` {quote, author} | opzionale; anonimizza l'autore |
| — | `cover` | opzionale; caricata in Studio, NON qui |
| data del progetto | `date` | per l'ordinamento |

Lo `slug` deriva dal **titolo anonimizzato** (kebab-case). ⚠️ Se `anonymize: true`, NON
riusare lo slug della nota del brain: spesso contiene il nome del cliente (es.
`isola-dei-gabbiani-...`) e finirebbe nell'URL pubblico — sarebbe una fuga. L'`_id` del
documento è `caseStudy.<slug>`.

### 4. Regola della metrica — non inventare mai
`metrics` è **obbligatorio** (da 1 a 2 voci) ed è il blocco di numeri grandi sulla
card. Nel brain i numeri d'impatto sono spesso "da consolidare": in quel caso NON
inventare un "+48". In ordine di preferenza:
1. Un numero **reale e validato** dal brain (es. tempo risparmiato misurato).
2. Un **fatto reale** come metrica, onesto anche se meno "wow" (es. `428` →
   "recensioni analizzate", `17%` → "recensioni multilingua").
3. Se davvero non c'è nulla di solido: una sola voce con `value: "—"` e `label`
   `"[metrica da validare]"`, e **avvisa esplicitamente l'utente** che va
   completata prima di pubblicare. Non pubblicare mai un numero non verificato.
Meglio una metrica solida che due deboli: la seconda voce si aggiunge solo se
regge da sola.

### 5. Scrivi i due output
**Brain** — aggiorna la nota del progetto:
- Compila/riordina la sezione *Pubblicabilità sul sito* (anonimizzare, `public_name`,
  angolo). Se l'utente conferma che è pronto e validato, porta `public_status` a
  `ready`. Non toccare le sezioni interne.

**Sito** — scrivi `content/case-studies/<slug>.json` con la forma esatta del documento
Sanity (vedi `assets/case-study.template.json`). Usa oggetti localizzati completi di
`_type` (`localeString`/`localeText`), es.
`"title": { "_type": "localeString", "it": "...", "en": "..." }`. **Ometti del tutto** le
chiavi opzionali (`body`, `testimonial`, `cover`, `date`) se non hai il dato reale — non
lasciare placeholder (il template le mostra solo come riferimento di forma). Se la
cartella `content/case-studies/` non esiste ancora, creala.

### 6. Verifica di sicurezza (obbligatoria)
Prima di considerarti finito, cerca dentro `content/case-studies/<slug>.json` **e nello
`slug`/`_id`** tutti i dati identificanti o interni, e assicurati che NON compaiano:
- **nome del cliente / azienda** (campi `client`/`company` del frontmatter brain);
- **referente, città esatta, URL o dominio** del cliente;
- **importi e dati commerciali** (campi `amount_eur`/`phase2_eur`, simboli `€`/`$`, prezzi).

Se trovi uno di questi, è una fuga: correggi. Poi verifica che il JSON sia valido e che i
campi obbligatori (`title.it`, `slug`, `sector`, `problem`, `solution`, `metrics` con
1-2 voci complete di `_key`) ci siano. I numeri ammessi sono solo quelli non identificanti usati come
metrica/racconto (es. conteggi aggregati).

### 7. Caricamento su Sanity (passo esplicito, non automatico)
Generare i file NON li carica su Sanity: caricare è un'azione verso l'esterno, va fatta
consapevolmente. Quando l'utente conferma:
```
node .claude/skills/use-case-publish/scripts/import-case-studies.mjs
```
Legge tutti i `content/case-studies/*.json`, li fa `createOrReplace` su Sanity usando
`SANITY_API_WRITE_TOKEN` da `.env.local`, e **preserva la cover** eventualmente
caricata in Studio. Poi verifica che il caso compaia su `/lavori` (skill `visual-check`).

## Ciclo di vita dei file in `content/case-studies/` (issue #8)
I JSON generati (e i PNG/SVG dei diagrammi in `assets/`) **si committano**: sono
l'input dell'importer (`createOrReplace` idempotente), passano dalla review di PR —
che fa anche da secondo paio d'occhi sulla verifica anti-fughe del passo 6 — e
restano come storico versionato di ciò che è pubblicato. Niente bozze locali non
tracciate: se un caso non deve ancora andare online, resta `public_status: draft`
nel brain e il JSON non si genera. Per **togliere** un caso dal sito: cancella il
documento su Sanity E il JSON dal repo nella stessa occasione, altrimenti il
prossimo import lo ripubblica.

## Dopo: /lavori è raggiungibile dalla home
Dal 2026-07-16 (issue #13) in fondo alla sezione lavori della home c'è
"Tutti i lavori →" verso `/[locale]/lavori`, visibile quando le card vengono dai
casi reali su Sanity: per i nuovi casi non c'è nulla da collegare a mano.

## Nota sul coordinamento
Se stai lavorando su un branch, aggiorna `PLAN.md` (chi/branch/stato) come da regole del
file. Merge: sia Cesare che Federico (repo pubblica; regola aggiornata 2026-07-04, dettagli in PLAN.md).
