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

## Prima di iniziare: trova i repo e leggi le convenzioni

- **flylabs-brain**: di norma è una cartella sorella di questo repo (`../flylabs-brain`).
  Se non c'è lì, cercala (`~/Documents/Github/flylabs-brain` o simili) o chiedi il path.
- Leggi la convenzione completa dei case study nel brain: `docs/stack.md` §9 e il
  template `03_Resources/templates/case-study.md`. Ti dicono cosa è pubblicabile.
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
| Risultati / impatto | `metric` + `metricLabel` | vedi regola metrica sotto |
| Come funziona / Risultati | `body` | racconto esteso (opzionale) |
| (testimonianza, se c'è) | `testimonial` {quote, author} | opzionale; anonimizza l'autore |
| — | `cover` | opzionale; caricata in Studio, NON qui |
| data del progetto | `date` | per l'ordinamento |

Lo `slug` deriva dal titolo (kebab-case) o dallo slug esistente del brain; l'`_id` del
documento è `caseStudy.<slug>`.

### 4. Regola della metrica — non inventare mai
`metric` è **obbligatorio** ed è il numero grande sulla card. Nel brain i numeri
d'impatto sono spesso "da consolidare": in quel caso NON inventare un "+48".
In ordine di preferenza:
1. Un numero **reale e validato** dal brain (es. tempo risparmiato misurato).
2. Un **fatto reale** come metrica, onesto anche se meno "wow" (es. `428` →
   "recensioni analizzate", `17%` → "recensioni multilingua").
3. Se davvero non c'è nulla di solido: metti `metric` a `"—"` e in `metricLabel`
   scrivi `"[metrica da validare]"`, e **avvisa esplicitamente l'utente** che va
   completata prima di pubblicare. Non pubblicare mai un numero non verificato.

### 5. Scrivi i due output
**Brain** — aggiorna la nota del progetto:
- Compila/riordina la sezione *Pubblicabilità sul sito* (anonimizzare, `public_name`,
  angolo). Se l'utente conferma che è pronto e validato, porta `public_status` a
  `ready`. Non toccare le sezioni interne.

**Sito** — scrivi `content/case-studies/<slug>.json` con la forma esatta del documento
Sanity (vedi `assets/case-study.template.json`). Usa oggetti localizzati completi di
`_type` (`localeString`/`localeText`), es.
`"title": { "_type": "localeString", "it": "...", "en": "..." }`.

### 6. Verifica di sicurezza (obbligatoria)
Prima di considerarti finito, **cerca il nome reale del cliente** (dai campi
`client`/`company` del frontmatter brain) dentro `content/case-studies/<slug>.json`:
se compare, hai una fuga di dati — correggi. Controlla anche che il JSON sia valido e
che i campi obbligatori (`title.it`, `slug`, `sector`, `problem`, `solution`, `metric`,
`metricLabel`) ci siano.

### 7. Caricamento su Sanity (passo esplicito, non automatico)
Generare i file NON li carica su Sanity: caricare è un'azione verso l'esterno, va fatta
consapevolmente. Quando l'utente conferma:
```
node .claude/skills/use-case-publish/scripts/import-case-studies.mjs
```
Legge tutti i `content/case-studies/*.json`, li fa `createOrReplace` su Sanity usando
`SANITY_API_WRITE_TOKEN` da `.env.local`, e **preserva la cover** eventualmente
caricata in Studio. Poi verifica che il caso compaia su `/lavori` (skill `visual-check`).

## Dopo: linkare /lavori in nav
Il primo caso reale pubblicato è anche il momento di decidere se collegare `/lavori`
nel menu (oggi la voce "Lavori" punta alla sezione della homepage `#lavori`). È una
scelta di prodotto: proponila all'utente, non farla di default.

## Nota sul coordinamento
Se stai lavorando su un branch, aggiorna `PLAN.md` (chi/branch/stato) come da regole del
file. E ricorda: sul repo su piano Vercel Hobby, solo Cesare fa merge.
