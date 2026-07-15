---
name: excalidraw-diagram
description: >-
  Genera o esporta un diagramma Excalidraw nello stile brand FlyLabs (palette
  blu/azzurro/grigio/nero, vedi flylabs-brain/03_Resources/materials/brand/diagram-style.md)
  in ITALIANO e INGLESE, e produce i PNG/SVG pronti per il campo `diagrams`
  di un documento Sanity `caseStudy`. Usa questa skill ogni volta che serve
  un diagramma di flusso/architettura per un use case sul sito — sia che lo
  disegni tu a mano in Obsidian sia che venga scriptato — e ogni volta che
  serve esportarlo in PNG per caricarlo su Sanity (di solito appena prima
  della skill `use-case-publish`, step "diagrammi").
---

# Diagrammi Excalidraw brand FlyLabs — due lingue, pronti per il sito

Obiettivo: un diagramma coerente con lo stile del brand, disponibile in **italiano
e inglese** (il sito è bilingue e i testi dei diagrammi sono nei pixel, non
traducibili a runtime), esportato come immagine pronta per Sanity.

Il flusso ha due fasi indipendenti:
1. **Autoring** — creare/modificare il file `.excalidraw.md` (IT + EN) nel vault.
2. **Export** — trasformarlo in PNG/SVG dentro `content/case-studies/assets/` nel
   repo del sito.

Puoi fare l'autoring in due modi; l'export è sempre lo stesso.

## Fase 1 — Autoring

### Opzione A — a mano in Obsidian (nessun codice)
La più semplice per chi non vuole scriptare. In `flylabs-brain`:
1. Crea `01_Projects/<slug>/diagrams/<nome>.excalidraw.md` e apri Obsidian in vista Excalidraw.
2. Disegna usando **solo** i colori della palette in `03_Resources/materials/brand/diagram-style.md`
   (stroke/background per ruolo: trigger, source, ai, store, output, human, decision), font hand-drawn,
   rettangoli arrotondati, frecce `#343a40`.
3. Duplica il file come `<nome>-en.excalidraw.md` e traduci ogni testo in inglese naturale (non letterale).
4. **Prima di esportare (fase 2)**: se hai disegnato/modificato a mano, il plugin spesso salva in
   formato `compressed-json`. Da Obsidian, command palette → **"Decompress current Excalidraw file"**,
   poi salva. Lo script di export si rifiuta di procedere su un file ancora compresso (errore chiaro,
   niente decompressione approssimativa).

### Opzione B — script Python (diagrammi riproducibili/templati)
Utile quando il diagramma ha una forma ricorrente (es. pipeline verticale a step) o va rigenerato
spesso. Il modulo di stile condiviso è in
`flylabs-brain/03_Resources/materials/brand/diagrams/flylabs_excalidraw.py` (palette, primitive
`rect`/`arrow`/`title`/`vchain`, `write_diagram`, `translate_scene`). Crea uno script di progetto in
`01_Projects/<slug>/diagrams/build/gen_diagrams.py` che lo importa — esempio completo e funzionante:
`01_Projects/isola-dei-gabbiani-recensioni/diagrams/build/gen_diagrams.py` (definisce i nodi IT +
un dizionario `TRANSLATIONS` EN, chiama `translate_scene` per generare la versione inglese, e
`write_diagram` per entrambe). Copialo come punto di partenza per un nuovo caso.

`translate_scene` solleva un errore se manca la traduzione di un nodo: niente diagrammi mezzo IT
mezzo EN pubblicati per distrazione.

## Fase 2 — Export (sempre uguale, indipendentemente da come hai disegnato)

Serve una sessione con accesso al Browser pane (l'export usa il motore ufficiale di Excalidraw via
browser, per il font hand-drawn vero — non è riproducibile con un semplice screenshot dei rettangoli).

1. **Estrai le scene** (allarga i box di testo che l'export ufficiale non wrappa automaticamente):
   ```
   python3 .claude/skills/excalidraw-diagram/scripts/extract_scene.py \
     /path/to/<nome>.excalidraw.md /path/to/<nome>-en.excalidraw.md \
     --out /tmp/excalidraw-export
   ```
   Passa tutti i file `.excalidraw.md` che vuoi esportare in questo giro (anche di diagrammi diversi):
   lo script scrive una scena `.json` per ciascuno + un `manifest.json` che li elenca tutti.

2. **Avvia il server locale** (in background):
   ```
   python3 .claude/skills/excalidraw-diagram/scripts/serve.py /tmp/excalidraw-export
   ```

3. **Apri `http://127.0.0.1:8123/render.html` nel Browser pane**, aspetta che lo stato passi a
   `DONE` (leggi il testo della pagina, non serve uno screenshot). Gli export finiscono in
   `/tmp/excalidraw-export/out/<nome>.png` (2x) e `.svg`.

4. **Copia i PNG** in `content/case-studies/assets/` con la convenzione di naming
   `<slug-caso>-<nome-diagramma>.png` (IT) e `<slug-caso>-<nome-diagramma>-en.png` (EN).

5. **Ferma il server** (stop del processo in background) quando hai finito.

6. Da qui prosegui con la skill `use-case-publish`: nel campo `diagrams` del JSON del caseStudy,
   ogni voce ha `it`/`en` come `{"_type": "image", "_localFile": "content/case-studies/assets/..."}`
   — l'importer di quella skill carica gli asset su Sanity e collega i ref (idempotente).

## Perché così (e non diversamente)

- **Due immagini, non traduzione a runtime**: i testi sono disegnati dentro Excalidraw (pixel), non
  overlay HTML — tradurli via CSS/JS non è praticabile senza rifare il diagramma. Da qui la scelta di
  avere due export, con l'inglese opzionale (fallback sull'italiano se manca).
- **fit_boxes in fase di export, non di autoring**: così funziona identico sia sui diagrammi scriptati
  sia su quelli disegnati a mano in Obsidian — non serve replicare la logica in entrambi i mondi.
- **Export via browser (motore reale di Excalidraw)**, non uno screenshot dei JSON grezzi: è l'unico
  modo di ottenere il font hand-drawn e il rendering ufficiale del brand.

## Nota sul coordinamento
Aggiorna `PLAN.md` come da regole del file se stai lavorando su un branch dedicato. Modifiche al modulo
condiviso `flylabs_excalidraw.py` valgono per **tutti** i diagrammi futuri: se cambi qualcosa lì,
aggiorna anche `diagram-style.md` così restano allineati.
