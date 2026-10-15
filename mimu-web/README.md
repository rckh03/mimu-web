# MIMU web

Abre `index.html` (doble clic) o sírvelo con `python3 -m http.server`.

```
index.html          estructura y orden de carga
css/tokens.css      colores, tipografías, modo oscuro
css/styles.css      layout y componentes
css/responsive.css  ajustes para celular
js/data.js          datos de ejemplo, estado, localStorage
js/api.js           reglas y permisos (aquí se conectará el backend)
js/components.js    logos, títulos, menú lateral
js/view-*.js        pantallas: públicas, profesor, administración
js/app.js           router, eventos, arranque
assets/             logos
```
Los scripts se cargan en ese orden (comparten variables globales).

## Generar un solo archivo
`python3 build.py` crea `dist/mimu.html` (CSS, JS y logos incluidos).
Ese archivo es el que se publica como enlace de Claude.
