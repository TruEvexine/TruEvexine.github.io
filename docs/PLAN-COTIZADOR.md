# Plan: portafolio con cotizador bajo `rogelioemmanuel.com`

Fecha: 19 de octubre de 2026. Plan de trabajo para este repositorio (el portafolio). Viene de la auditoría del repositorio
`Web_Quoter` y de la demo `Barber_page`; aquí solo está lo que se hace en este proyecto.

## Objetivo

Que el cotizador deje de ser un sitio aparte y pase a ser una **página de este portafolio** (`/cotizar`, y `/en/quote` en inglés),
accesible con un botón "Cotizar" en el encabezado y otro en Contacto. Todo bajo el dominio `rogelioemmanuel.com` (el subdominio
`arco-navaja.rogelioemmanuel.com` ya es la demo de barbería). Al terminar, `Web_Quoter` se pone privado.

## Decisiones ya tomadas por Rogelio

- **Los precios se muestran con IVA incluido** (16 %). Los valores base van sin IVA en un solo archivo y el cotizador suma el IVA y
  muestra el total con IVA en grande, con el desglose debajo. Confirmar el tratamiento fiscal con su contador antes de publicar.
- **Correo de contacto:** `rogelioemmanuelceja@gmail.com` (el que ya está en el portafolio). Se elimina del cotizador el correo
  `rceja711@uvaq.edu.mx`, que se cancela al egresar.
- **WhatsApp:** hoy es su número personal, `524523412556`. Todavía no tiene uno de trabajo. Debe vivir en **una sola constante** de
  configuración (`src/config/contacto.ts`) para cambiarlo en un solo lugar cuando tenga el de trabajo.
- **Repositorio de Web_Quoter:** se pone privado ahora y se borra unos 30 días después de publicar el cotizador nuevo.

## Reglas de diseño: las de este proyecto

El cotizador **sigue la identidad de este portafolio**, no la de la demo de barbería. Se conserva:

- Paleta: fondo `#0D0E15`, azul `#1D2D44`, texto `#F3F4F6`, acento verde `#10B981` (de `COMANDO_ARRANQUE.txt`; pasan a variables CSS
  con nombre semántico en un solo archivo de tokens).
- Tipografía: Arimo (texto), Oswald y la fuente de títulos "Extension". Hoy se cargan de Google Fonts y de un almacén de Supabase:
  pasan a **archivos propios** del repositorio. Confirmar que la licencia de "Extension" permite alojarla; si no, sustituirla.
- Estructura de componentes que ya existe (encabezado, pie, tarjetas, modal de proyectos) y su lenguaje visual.

De la demo se adoptan **solo las reglas de ingeniería**: sin `<script>` ni `<style>` en línea, sin `style=` ni `onclick=`, sin
recursos externos, CSP estricta, textos en archivos de idioma, accesibilidad AA con foco visible y `prefers-reduced-motion`, y
`npm run verify` al terminar cada tarea. Dependencias permitidas: solo `astro` (y `@astrojs/sitemap`); `wrangler` solo para
desarrollo. Cualquier otra, se pregunta antes.

## Arquitectura

Hoy: HTML, CSS y JavaScript sueltos; el encabezado y el pie se cargan con `fetch`; el idioma cambia con JavaScript sobre texto en
inglés. Propuesta:

- **Astro** con salida estática. Mismas páginas actuales (Inicio, Proyectos, Contacto) más Cotizar.
- **Español e inglés con rutas reales**: `/` y `/en/`. Pendiente que Rogelio confirme el idioma por defecto: recomendado español,
  porque el cotizador es para negocios de Morelia.
- Encabezado y pie como componentes (`Header.astro`, `Footer.astro`), sin `fetch`. Textos en `src/i18n/es.json` y `en.json`.
- **Cotizador:**
  - `src/config/precios.ts`: único lugar con los precios (centavos enteros, sin IVA) y la tasa de IVA.
  - `src/lib/cotizador.js`: función pura de cálculo, **con pruebas** (`node:test`) para cada paquete, extra, redondeo e IVA.
  - `src/scripts/cotizador.js`: solo la interfaz; todo dato se inserta con `textContent`.
  - Flujo: tipo de negocio → paquete recomendado → extras → resultado con total con IVA, pago único y mensualidad.
  - Acciones del resultado: **Pedir cotización formal por WhatsApp** (el mensaje sale armado con lo elegido), **por correo** y
    **copiar resumen**. **No se guarda nada y no hay formulario con servidor**, así que no hay datos personales que proteger.
  - Leyenda obligatoria: "Estimado informativo, no es una oferta. La cotización formal se entrega por escrito y tiene vigencia de
    15 días."
- Modal con `<dialog>` nativo (foco atrapado, Escape).
- Alojamiento en Cloudflare (archivos estáticos) con `public/_headers` y CSP. GitHub Pages se apaga al final.

## Precios iniciales (sin IVA → con IVA 16 %)

Son precios de lista iniciales: se validan con las primeras visitas y por eso viven en un solo archivo.

| Concepto | Sin IVA | Con IVA |
|---|---|---|
| Paquete Esencial (presencia: inicio, galería, nosotros, contacto, ES/EN) | 5,500 | 6,380 |
| Paquete Profesional (hasta 6 páginas, SEO básico) | 9,500 | 11,020 |
| Paquete Especializado (con agenda en línea, panel, reseñas, clientes y números) | 22,000 | 25,520 |
| Cuidado mensual Esencial | 450 | 522 |
| Cuidado mensual Profesional | 850 | 986 |
| Cuidado mensual Agenda | 1,500 | 1,740 |
| SEO local, arranque (único) | 2,500 | 2,900 |
| SEO continuo (mensual) | 1,500 | 1,740 |
| WhatsApp automático: instalación (único) | 3,500 | 4,060 |
| WhatsApp automático: cuota (mensual; los mensajes los paga el cliente a Meta) | 600 | 696 |
| Kit NFC y QR Local (el Básico va incluido en Especializado) | 1,400 | 1,624 |
| Hora de desarrollo a la medida | 400 | 464 |

Regla del cotizador: para proyectos fuera de los paquetes muestra "a la medida: se cotiza por hora" y manda al contacto; no calcula.
Se elimina el cobro por número de páginas, el servicio "Database" y el código de descuento fijo ("SEPTEMBER": un código que cualquiera
lee en el navegador no es un código).

## Renombres

| Hoy | Después |
|---|---|
| `TruEvexine.github.io` (repositorio) | `portafolio`, al pasar a Cloudflare (GitHub redirige los enlaces viejos) |
| `COMANDO_ARRANQUE.txt` | `docs/DESARROLLO.md` (su paleta y su guía de textos pasan a documentación) |
| `assets/YO.webp` | `assets/foto-perfil.webp` |
| `assets/me-at-uvaq.png` | `assets/uvaq.png` |
| `assets/2d1339…-2040x2208.webp` (sin rastrear ni usar) | se borra o se nombra por lo que es |
| `layout.js`, `layout.css`, `header.*`, `footer.*` | componentes de Astro y `src/styles/` |
| `ochet.css`, `index.html`, `service.html`, `contact.html` de Web_Quoter | no se migran: el cotizador se escribe de nuevo en `src/pages/cotizar.astro` |

## Auditoría de diseño y seguridad

Sitio chico y sin datos de usuarios: auditoría corta, sobre el sitio nuevo.

| Hallazgo | Dónde | Arreglo |
|---|---|---|
| Fuentes de Google, tipografía y imágenes en un almacén de Supabase, video de YouTube | `*.html`, `*.css` | Archivos propios; el video, como enlace o carga al hacer clic |
| Sin encabezados de seguridad ni CSP | GitHub Pages no lo permite | `public/_headers` en Cloudflare |
| `style="display: none"` en `projects.html` | proyectos | Clase CSS o atributo `hidden` |
| `innerHTML` con textos de un diccionario propio | `layout.js`, `projects.js` | Rutas de idioma reales; sin `innerHTML` |
| Modal sin foco atrapado | proyectos | `<dialog>` nativo |
| Idioma por defecto "en" guardado en `localStorage` | `layout.js` | Rutas reales; sin depender de `localStorage` |
| Un mensaje de bienvenida con emoji | `index.html` | Decisión de Rogelio |
| Pendiente en el sitio nuevo | todo | Contraste AA, foco visible, `prefers-reduced-motion`, `alt`, `robots.txt`, mapa del sitio, Open Graph y una página de privacidad de un párrafo (el sitio no guarda datos; WhatsApp y correo son de sus proveedores) |

## Fases

| # | Tarea | Esfuerzo (aprox.) | Hecho cuando |
|---|---|---|---|
| 1 | Proyecto Astro con las reglas de ingeniería de arriba; renombres; fuentes e imágenes locales; tokens de la paleta | 1 día | `npm run verify` en verde |
| 2 | Portafolio en español e inglés con rutas reales: Inicio, Proyectos, Contacto | 1 día | Mismo contenido y mismo aspecto, sin `fetch` de encabezado ni `innerHTML` |
| 3 | Cotizador: `precios.ts`, `cotizador.js` con pruebas, `/cotizar` y `/en/quote`, botón en el encabezado y en Contacto | 1.5 días | Pruebas de cálculo en verde; el mensaje de WhatsApp sale con lo elegido |
| 4 | Auditoría de diseño y seguridad sobre el sitio nuevo | 0.5 día | Tabla de arriba cerrada |
| 5 | Despliegue en Cloudflare en `rogelioemmanuel.com`; `www` redirige; GitHub Pages apagado | 0.5 día | El dominio abre el sitio nuevo |
| 6 | Web_Quoter a privado; borrarlo 30 días después si todo sigue bien | 10 min | Repositorio privado |

Trabajo de un archivo a la vez; al terminar cada fase, `npm run verify` y avisar a Rogelio. Los precios de la tabla se tocan solo
en `precios.ts`.

## Estado (19 de octubre de 2026)

El sitio se quedó estático (HTML, CSS y JavaScript, sin Astro) y se publica como Worker con assets estáticos de Cloudflare;
`wrangler.jsonc` y `_headers` viven en el repo. Por eso las fases 1 y 2 no se hicieron como estaban escritas.

| # | Estado | Nota |
|---|---|---|
| 1 | Cambiada | Fuentes e imágenes ya son locales; sin Astro |
| 2 | Cambiada | Idiomas con `layout.js` y `localStorage`; URLs limpias (`/cotizar`, `/privacidad`) |
| 3 | Hecha | Cotizador con pruebas en verde (`npm test`, `npm run verify`) |
| 4 | Hecha | Auditoría cerrada: sin recursos externos, CSP estricta en `_headers`, axe en 0 en todas las páginas, página de privacidad, sitemap y Open Graph. `innerHTML` se acepta: solo recibe archivos y textos propios |
| 5 | Hecha | Dominio en Cloudflare, `www` redirige con 301, GitHub Pages apagado |
| 6 | Hecha | Web_Quoter privado; borrarlo no antes de 30 días después (contando desde el 19 de octubre, el 18 de noviembre de 2026) si todo sigue bien |

## Pendientes de Rogelio

- ~~Confirmar con su contador que mostrar el precio con IVA incluido es lo correcto en su régimen.~~ Hecho.
- ~~Elegir el idioma por defecto.~~ Hecho.
- Número de WhatsApp de trabajo: hasta tenerlo, el personal queda en la constante de `contacto.ts`.
- Confirmar la licencia de la fuente "Extension".
