# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Stack
Sitio estático: HTML, CSS y JavaScript sin frameworks ni dependencias de ejecución. Se publica en Cloudflare Pages (`wrangler`) y GitHub Pages bajo `rogelioemmanuel.com`. `_dev/` solo contiene scripts de build, verificación y pruebas con `node:test`.

## Users
- **Reclutadores y equipos de contratación** que evalúan a Rogelio para prácticas, empleo o colaboraciones. Llegan desde el CV, LinkedIn o un mensaje, y quieren juzgar rápido nivel, estilo de trabajo y proyectos reales.
- **Dueños de negocios locales** (barberías, consultorios, restaurantes, tiendas, oficios) que quieren saber cuánto costaría su sitio web. Usan el cotizador, ven el precio con IVA y cierran por WhatsApp, sin registrarse.
- Audiencias secundarias de los proyectos: jugadores y posibles colaboradores o financiadores de Project Miralta.

## Product Purpose
Portafolio personal de Rogelio Emmanuel Ceja Acosta, estudiante de Ingeniería en Sistemas en la UVAQ que construye sitios web y videojuegos narrativos. Presenta su perfil, su CV, sus proyectos (SIN GUARDAR y Project Miralta) y un cotizador de sitios web. Éxito: que lo contacten por WhatsApp o correo, sea por una oferta de prácticas o empleo, por un cliente del cotizador o por una colaboración. Los tres objetivos pesan igual.

## Positioning
Cuidado por el detalle y sitios sin dependencias: HTML, CSS y JS propios, fuentes e íconos alojados en el mismo sitio, CSP estricta, bilingüe (español e inglés con URLs reales) y accesible. Eso mismo es lo que ofrece a sus clientes.

## Operating Context
- Dos idiomas: inglés en `/` y español en `/es/`; los textos viven en `js/layout.js` y las páginas en español se generan con `npm run build:es`.
- El CV se dibuja desde `data/cv.json` en dos plantillas (Harvard y visual) y los PDFs se regeneran con una GitHub Action.
- Las tarjetas de proyecto salen de `data/projects.json`.
- Todos los precios del cotizador viven en `js/precios.js` y se muestran con IVA incluido (16 %).

## Capabilities and Constraints
- Sin código en línea ni recursos externos: la CSP solo permite `'self'` (más YouTube sin cookies para el video).
- Contacto: `rogelioemmanuelceja@gmail.com`, WhatsApp personal (+52 452 341 2556, en una sola constante), GitHub TruEvexine y LinkedIn.
- Los precios del cotizador no son una oferta vinculante; se ajustan por WhatsApp.
- Aún sin decidir: número de WhatsApp de trabajo y tratamiento fiscal definitivo (ver `docs/PLAN-COTIZADOR.md`).

## Brand Commitments
Nombre "Rogelio Ceja" / "Rogelio Emmanuel Ceja". Tono cercano y directo, en primera persona. Paleta, tipografías y reglas visuales en `DESIGN.md`. Cada proyecto conserva su propio guiño visual.

## Evidence on Hand
- Casos de estudio reales: SIN GUARDAR y Project Miralta (`assets/sin-guardar`, `assets/project-miralta`), con capturas y video.
- CV con educación, certificaciones y proyectos (`data/cv.json`, PDFs en `assets/cv`).
- Foto personal y de la UVAQ (`assets/YO.webp`, `assets/me-at-uvaq.webp`).
- No hay testimonios ni clientes publicados: no inventarlos. Project Miralta es una demo (preview) creada para un congreso, no un juego terminado.

## Product Principles
1. Mostrar trabajo real antes que afirmaciones; nada inventado.
2. El sitio demuestra lo que vende: rápido, sin dependencias, accesible y bilingüe.
3. Un solo camino claro hacia el contacto (WhatsApp o correo) desde cualquier página.
4. Precios y condiciones del cotizador transparentes, con IVA y sin pedir datos.
5. Cada cambio se verifica con `npm run verify` y las pruebas.

## Accessibility & Inclusion
Meta WCAG 2.2 AA: foco visible, `prefers-reduced-motion` respetado, áreas táctiles de al menos 24 px, jerarquía de encabezados correcta y contenido disponible en español e inglés.
