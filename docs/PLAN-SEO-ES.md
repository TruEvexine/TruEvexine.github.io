# Plan: versión en español indexable + "Siguiente proyecto"

Fecha: 2026-10-28

## Problema

El español solo existe en el navegador: `layout.js` traduce la página en el momento, en la misma URL.
Google solo ve el HTML en inglés, así que el sitio no aparece en búsquedas en español (salvo `/cotizar`).

## Objetivo

Cada página tiene una URL por idioma, con el texto ya escrito en el HTML:

| Inglés (sin cambios) | Español (nuevo) |
|---|---|
| `/` | `/es/` |
| `/profile` | `/es/profile` |
| `/projects` | `/es/projects` |
| `/sin-guardar` | `/es/sin-guardar` |
| `/project-miralta` | `/es/project-miralta` |
| `/cv` | `/es/cv` |
| `/contact` | `/es/contact` |
| `/privacidad` | `/es/privacidad` |

Fuera de alcance: `/cotizar` (ya está en español y tiene sus propios textos), `/404`, `/admin`.

## Reglas para no romper lo que hay

1. **Las páginas en inglés siguen siendo la fuente.** No se editan a mano las de `es/`: las genera
   `_dev/build-es.mjs` a partir del HTML en inglés + el diccionario `es` de `layout.js` (el mismo que hoy
   usa el botón). Sin dependencias nuevas.
2. **Las URLs actuales no cambian** ni dejan de funcionar.
3. **El visitante ve lo mismo que hoy:**
   - Quien eligió español (o tiene el navegador en español y no ha elegido) y entra a una página en
     inglés, se va a su versión `/es/` (redirección temprana en `js-flag.js`, sin parpadeo).
     Googlebot no tiene preferencia guardada y su navegador está en inglés: ve el inglés.
   - Una URL `/es/` siempre se muestra en español (la URL manda).
   - El botón de idioma ahora navega a la otra URL en lugar de traducir en el lugar (en `/cotizar` y `/404`
     sigue como hoy).
4. **Rutas absolutas en JS** (`/data/cv.json`, `/assets/...`) para que funcionen desde `/es/`. En la raíz
   resuelven igual que ahora.
5. `npm run verify` comprueba que `es/` está al día (si alguien cambia una página o un texto y no regenera,
   falla).

## Fases

- [x] **0. Rutas absolutas en JS** — `cv.js` (cv.json y PDFs), `miralta.js` (sprites del lirio). Sin cambio visible.
- [x] **1. Idioma por URL en JS** — `js-flag.js` (redirección temprana), `layout.js` (idioma inicial,
      botón, enlaces del header/footer a `/es/`, página actual sin el prefijo `es/`).
- [x] **2. Generador** — `_dev/build-es.mjs` y `npm run build:es`: traduce `data-i18n`, `data-i18n-html` y
      `data-i18n-attr`, pone `lang="es"`, título, descripción, Open Graph y JSON-LD en español, vuelve
      absolutas las rutas relativas y apunta los enlaces internos a `/es/`.
- [x] **3. hreflang y sitemap** — `<link rel="alternate" hreflang>` (en, es, x-default) y `og:locale` en
      ambas versiones; sitemap con las URLs `/es/` y sus alternas.
- [x] **4. "Siguiente proyecto"** — al final de cada caso de estudio, enlace al otro (SIN GUARDAR ↔ Miralta).
- [x] **5. Pruebas en navegador** — cada página en ambos idiomas: texto igual al que hoy pone el botón,
      ida y vuelta con el botón, menú activo, CV (vista y descarga), galería, radio y panel de Miralta,
      móvil sin scroll horizontal, consola sin errores.

## Al terminar (manual)

- Search Console: enviar de nuevo `sitemap.xml` y pedir indexar `/es/` y `/es/project-miralta`.
- Cada vez que cambie una página o un texto: `npm run build:es` antes del commit (verify lo recuerda).

## Estado (2026-10-28)

Fases 0-5 hechas. Prueba automática en Firefox (16 páginas): idioma por URL, texto generado igual a la
traducción en vivo, menú con `/es/`, botón ida y vuelta, redirección por preferencia y por navegador,
cotizador sin cambios, CV para PDF y vista previa del admin sin redirección, descarga del CV, panel de
Miralta, 404 bajo `/es/`, sin errores de consola ni recursos 404. Arreglo extra: la foto del CV
(`data/cv.json` guarda una ruta del repo) ahora se pide con ruta absoluta.
