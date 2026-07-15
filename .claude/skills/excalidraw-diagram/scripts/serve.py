#!/usr/bin/env python3
"""
Static server per il render Excalidraw (render.html + manifest.json + scene
*.json prodotti da extract_scene.py), con un endpoint POST /save che
raccoglie gli export (PNG/SVG) prodotti dal browser.

Uso:
    python3 serve.py <cartella-con-manifest-e-scene> [porta]

Scrive gli export in <cartella>/out/.
"""
import os
import sys
from http.server import HTTPServer, SimpleHTTPRequestHandler
from urllib.parse import urlparse, parse_qs

BASE = os.path.abspath(sys.argv[1]) if len(sys.argv) > 1 else os.getcwd()
PORT = int(sys.argv[2]) if len(sys.argv) > 2 else 8123
SCRIPT_DIR = os.path.dirname(os.path.abspath(__file__))


class Handler(SimpleHTTPRequestHandler):
    def translate_path(self, path):
        # render.html vive accanto a questo script; tutto il resto (manifest,
        # scene, output) nella cartella di lavoro passata come argomento.
        parsed = urlparse(path).path
        if parsed in ("/", "/render.html"):
            return os.path.join(SCRIPT_DIR, "render.html")
        return super().translate_path(path)

    def do_POST(self):
        length = int(self.headers.get("Content-Length", 0))
        data = self.rfile.read(length)
        query = parse_qs(urlparse(self.path).query)
        name = os.path.basename(query.get("name", ["out.bin"])[0])
        out_dir = os.path.join(BASE, "out")
        os.makedirs(out_dir, exist_ok=True)
        with open(os.path.join(out_dir, name), "wb") as f:
            f.write(data)
        self.send_response(200)
        self.end_headers()
        self.wfile.write(b"ok")

    def log_message(self, *args):
        pass


os.chdir(BASE)
print(f"serving {BASE} on http://127.0.0.1:{PORT}")
HTTPServer(("127.0.0.1", PORT), Handler).serve_forever()
