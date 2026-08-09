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
5. Live at `https://luisxavierxd.github.io/portfolio/` (project) or `https://luisxavierxd.github.io/` (user repo). The `og:url` and `og:image` tags in `index.html` are absolute and assume the `portfolio` project path — **update both if you deploy anywhere else.** · Las etiquetas `og:url` y `og:image` en `index.html` son absolutas y asumen la ruta del proyecto `portfolio`; **actualiza ambas si despliegas en otra ruta.**
6. `.nojekyll` keeps GitHub from processing the static files.

## Local preview

```
python -m http.server 8000
```

Then open `http://localhost:8000/`. Serving over HTTP is required — opening `index.html` directly from disk (`file://`) will not work, because the page's own Content-Security-Policy blocks that origin. · Es necesario servir por HTTP — abrir `index.html` directamente desde el disco (`file://`) no funciona, porque la Content-Security-Policy de la página bloquea ese origen.

The language can be deep-linked with `#es` / `#en` (e.g. `http://localhost:8000/#en`). · El idioma se puede enlazar directamente con `#es` / `#en` (p. ej. `http://localhost:8000/#en`).
