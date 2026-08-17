# Portfolio — Luis Xavier García Pimentel Ascencio

**ES** — Sitio personal de Luis Xavier García Pimentel Ascencio, estudiante de ingeniería en
robótica (Tec de Monterrey, Guadalajara). Presenta proyectos y funciona también como página de
reservación de citas (Calendly integrado). Sitio estático: HTML, CSS y JavaScript puro, sin
frameworks ni build step.

**EN** — Personal site for Luis Xavier García Pimentel Ascencio, robotics engineering student
(Tec de Monterrey, Guadalajara). Showcases projects and doubles as a booking page (embedded
Calendly). Static site: plain HTML, CSS, and vanilla JavaScript, no frameworks, no build step.

## Licencia / License

> **Licencia / License** — El código está bajo licencia **MIT** (ver `LICENSE`). El contenido del sitio (textos, descripciones y diseño) está bajo **CC BY 4.0** (ver `LICENSE-content`). · The code is licensed under **MIT** (see `LICENSE`); the site content (text, descriptions, and design) under **CC BY 4.0** (see `LICENSE-content`).

## Deploy

1. Public repo, e.g. `portfolio` (or reuse `luisxavierxd.github.io` to serve at root).
2. Create the repo on GitHub and add it as a remote (`git remote add origin <url>`). · Crea el repo en GitHub y agrégalo como remoto (`git remote add origin <url>`).
3. Push files to the default branch.
4. Settings → Pages → Deploy from a branch → `main` / root.
5. Live at `https://luisxavierxd.github.io/Portfolio/`. The `og:url` and `og:image` tags in **every page** are absolute and match the repository name, capital P included — **update them all if the site is ever served from a different path.** · Las etiquetas `og:url` y `og:image` de **cada página** son absolutas y coinciden con el nombre del repositorio, con P mayúscula; **actualízalas todas si el sitio pasa a servirse desde otra ruta.**
6. `.nojekyll` keeps GitHub from processing the static files.

## Pages

`index.html` is the landing board: one featured module per category, each linking to that
category's own page. Every page shares `styles.css` and `main.js` — there is no build step, so a
copy change goes in the `i18n` dictionary in `main.js` **and** in the matching inline Spanish
default in the HTML (the inline text is what a visitor without JavaScript sees).

| Page | Contents |
|---|---|
| `index.html` | Hero, 6 featured modules, narrative About, booking |
| `robotica.html` | JTCS, AgroBot, Robot Interprepas |
| `senales.html` | NeuroBeat, Malaria · Dielectroforesis |
| `telemetria.html` | Coche MadRams, Quantum Speed Racing, Silca Elyos |
| `software.html` | TelemetryStack, Mapa TEC GDL, Loopzels, Frenado Magnético |
| `ia.html` | claude-unlimited, LaTeX Studio, websight, exploded-view, watermarks-remover |
| `formacion.html` | Cursos MadRams + the three-block training program |

## Local preview

```
python -m http.server 8000
```

Then open `http://localhost:8000/`. Serving over HTTP is required — opening `index.html` directly from disk (`file://`) will not work, because the page's own Content-Security-Policy blocks that origin. · Es necesario servir por HTTP — abrir `index.html` directamente desde el disco (`file://`) no funciona, porque la Content-Security-Policy de la página bloquea ese origen.

The language can be deep-linked with `?lang=es` / `?lang=en` (e.g. `http://localhost:8000/telemetria.html?lang=en`), and it follows the visitor across pages. The older `#es` / `#en` links still work and are upgraded to the query form on arrival. · El idioma se puede enlazar con `?lang=es` / `?lang=en` (p. ej. `http://localhost:8000/telemetria.html?lang=en`) y viaja con el visitante entre páginas. Los enlaces antiguos `#es` / `#en` siguen funcionando y se convierten al nuevo formato al entrar.
