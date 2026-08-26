#!/usr/bin/env python3
"""Local preview server with GitHub Pages-style clean URLs.

`python -m http.server` serves files verbatim, so a link to `/robotica`
404s locally even though GitHub Pages resolves it to `robotica.html`.
This server mirrors that resolution: a request for an extensionless path
that has no matching file is served from `<path>.html` if it exists — so
navigation behaves the same locally as it does in production.

Usage:  python serve.py   (then open http://localhost:8000/)
        PORT=3000 python serve.py   to pick another port.
"""
import http.server
import os

PORT = int(os.environ.get("PORT", "8000"))


class CleanURLHandler(http.server.SimpleHTTPRequestHandler):
    def translate_path(self, path):
        local = super().translate_path(path)
        # No such file and no extension → try the .html sibling, like GH Pages.
        if not os.path.exists(local) and not os.path.splitext(local)[1]:
            candidate = local + ".html"
            if os.path.isfile(candidate):
                return candidate
        return local


def main():
    server = http.server.ThreadingHTTPServer(("", PORT), CleanURLHandler)
    print("Clean-URL preview on http://localhost:%d/  (Ctrl+C to stop)" % PORT)
    try:
        server.serve_forever()
    except KeyboardInterrupt:
        print("\nStopped.")
        server.server_close()


if __name__ == "__main__":
    main()
