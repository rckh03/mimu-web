#!/usr/bin/env python3
"""Une index.html + css/ + js/ + assets/ en UN solo archivo: dist/mimu.html
Uso:  python3 build.py
Solo usa la librería estándar de Python 3."""
import re, base64, mimetypes
from pathlib import Path

root = Path(__file__).parent
html = (root / 'index.html').read_text('utf-8')

def data_uri(m):
    p = root / m.group(0)
    mime = mimetypes.guess_type(p.name)[0] or 'application/octet-stream'
    return f'data:{mime};base64,' + base64.b64encode(p.read_bytes()).decode()

def inline_assets(text):
    return re.sub(r'assets/[\w.\-]+\.(?:png|jpe?g|gif|svg|webp)', data_uri, text)

def bundle(pattern, wrap):
    """Reemplaza el primer tag por el bloque unido y elimina los demás (conserva el orden)."""
    global html
    files = re.findall(pattern, html)
    body = '\n'.join(inline_assets((root / f).read_text('utf-8')) for f in files)
    if wrap('x').startswith('<script'):
        assert '</script>' not in body, 'Un archivo JS contiene </script>'
    done = []
    def sub(m):
        if done: return ''
        done.append(1)
        return wrap(body)
    html = re.sub(pattern + r'\n?', sub, html)

bundle(r'<link rel="stylesheet" href="(css/[^"]+)">', lambda b: f'<style>\n{b}\n</style>\n')
bundle(r'<script src="(js/[^"]+)"></script>', lambda b: f'<script>\n{b}\n</script>\n')
html = inline_assets(html)

out = root / 'dist' / 'mimu.html'
out.parent.mkdir(exist_ok=True)
out.write_text(html, 'utf-8')
print(f'Listo: {out} ({out.stat().st_size/1024:.1f} KB)')
