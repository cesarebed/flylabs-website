#!/usr/bin/env python3
"""
Estrae una scena Excalidraw "raw" (elements/appState/files) da un file
.excalidraw.md (formato plugin Obsidian) e la prepara per l'export via
render.html: allarga i box di testo perché ogni riga stia dentro il
rettangolo (l'export ufficiale di Excalidraw non fa auto-wrap del testo
vincolato a un container, a differenza della preview del plugin Obsidian).

Uso:
    python3 extract_scene.py <file.excalidraw.md> [<file2.excalidraw.md> ...] --out <dir>

Scrive in <dir>: una scena .json per ogni input (stesso basename) +
manifest.json con l'elenco {name, file} che render.html consuma.

Richiede che il file sia in formato ```json (non ```compressed-json). Se il
diagramma è stato disegnato/modificato a mano in Obsidian, il plugin lo
ri-salva spesso in compressed-json: prima di esportare, apri il file in
Obsidian e lancia dalla command palette "Decompress current Excalidraw
file", poi salva. Lo script si ferma con un errore chiaro se trova solo il
blocco compresso, invece di tentare una decompressione approssimativa.
"""
import argparse
import copy
import json
import os
import re
import sys

CHAR_W = 0.6  # stima larghezza media carattere Excalifont vs fontSize
PAD = 28


def load_scene(path):
    txt = open(path, encoding="utf-8").read()
    m = re.search(r"```json\n(.*?)\n```", txt, re.S)
    if not m:
        if "```compressed-json" in txt:
            raise SystemExit(
                f"{path}: trovato solo un blocco 'compressed-json'. Apri il file "
                "in Obsidian, lancia 'Decompress current Excalidraw file' dalla "
                "command palette, salva, e ri-lancia questo script."
            )
        raise SystemExit(f"{path}: nessun blocco ```json trovato, file non valido.")
    return json.loads(m.group(1))


def fit_boxes(elements):
    """Allarga simmetricamente ogni rettangolo il cui testo bound eccede la
    larghezza attuale, così l'export non taglia le righe. Simmetrico ->
    il centro (e quindi le frecce collegate) non si sposta."""
    by_id = {el["id"]: el for el in elements}
    for el in elements:
        if el["type"] != "text":
            continue
        font = el["fontSize"]
        needed = max(len(line) for line in el["text"].split("\n")) * font * CHAR_W
        container = by_id.get(el.get("containerId") or "")
        if container:
            needed += PAD
            if needed > container["width"]:
                delta = needed - container["width"]
                container["x"] -= delta / 2
                container["width"] = needed
                el["x"] = container["x"] + 6
                el["width"] = needed - 12
        else:
            el["width"] = max(el["width"], needed + 10)
    return elements


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("inputs", nargs="+", help=".excalidraw.md file(s)")
    ap.add_argument("--out", required=True, help="cartella di output per scene + manifest")
    args = ap.parse_args()

    os.makedirs(args.out, exist_ok=True)
    manifest = []
    for path in args.inputs:
        scene = load_scene(path)
        elements = fit_boxes(copy.deepcopy(scene["elements"]))
        out_scene = {
            "type": "excalidraw",
            "version": 2,
            "source": "extract_scene.py",
            "elements": elements,
            "appState": {"viewBackgroundColor": "#ffffff"},
            "files": scene.get("files", {}),
        }
        name = os.path.basename(path).replace(".excalidraw.md", "")
        out_path = os.path.join(args.out, f"{name}.json")
        with open(out_path, "w", encoding="utf-8") as f:
            json.dump(out_scene, f, ensure_ascii=False)
        manifest.append({"name": name, "file": f"{name}.json"})
        print(f"  {path} -> {out_path} ({len(elements)} elementi)")

    with open(os.path.join(args.out, "manifest.json"), "w", encoding="utf-8") as f:
        json.dump(manifest, f, ensure_ascii=False, indent=2)
    print(f"manifest.json scritto con {len(manifest)} scena/e")


if __name__ == "__main__":
    main()
