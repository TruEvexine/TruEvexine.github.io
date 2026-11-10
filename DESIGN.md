---
name: Rogelio Ceja — Portfolio
description: Portafolio oscuro y plano de un estudiante de Ingeniería en Sistemas que hace sitios web y videojuegos narrativos; verde esmeralda sobre azul marino, títulos en Oswald y una fuente display propia.
colors:
  night-ink: "#0D0E15"
  navy-surface: "#1D2D44"
  paper-white: "#F3F4F6"
  emerald-accent: "#10B981"
  emerald-pressed: "#0E9F6E"
  emerald-soft: "#A7F3D0"
  text-secondary: "#D1D5DB"
  text-muted: "#9CA3AF"
  skeleton-base: "#1A2333"
  skeleton-shine: "#253147"
typography:
  display:
    fontFamily: "MiFuentePersonalizada, Oswald, sans-serif"
    fontSize: "clamp(2rem, 4vw, 2.8rem)"
    fontWeight: 400
    letterSpacing: "1px"
  headline:
    fontFamily: "Oswald, sans-serif"
    fontWeight: 700
    letterSpacing: "2px"
  title:
    fontFamily: "Oswald, sans-serif"
    fontWeight: 600
  body:
    fontFamily: "Arimo, Arial, sans-serif"
    fontSize: "1rem"
    fontWeight: 400
  label:
    fontFamily: "Arimo, Arial, sans-serif"
    fontSize: "0.85rem"
    fontWeight: 700
  project-hand:
    fontFamily: "Patrick Hand, cursive"
    fontSize: "1rem"
    fontWeight: 400
  cv-serif:
    fontFamily: "Tinos, Times New Roman, serif"
    fontSize: "10.5pt"
    fontWeight: 400
rounded:
  chip: "8px"
  inner: "12px"
  card: "16px"
  pill: "999px"
spacing:
  xs: "8px"
  sm: "16px"
  md: "24px"
  lg: "48px"
  container: "1100px"
components:
  button-primary:
    backgroundColor: "{colors.emerald-accent}"
    textColor: "{colors.night-ink}"
    rounded: "{rounded.pill}"
    padding: "10px 22px"
    height: "44px"
  button-primary-pressed:
    backgroundColor: "{colors.emerald-pressed}"
  button-ghost:
    backgroundColor: "transparent"
    textColor: "{colors.paper-white}"
    rounded: "{rounded.pill}"
    padding: "10px 22px"
    height: "44px"
  chip:
    textColor: "{colors.text-secondary}"
    rounded: "{rounded.chip}"
    padding: "5px 12px"
  card:
    backgroundColor: "rgba(29, 45, 68, 0.45)"
    textColor: "{colors.paper-white}"
    rounded: "{rounded.card}"
---

# Design System: Rogelio Ceja — Portfolio

## Overview

**Creative North Star: "The Night Desk"**

Un escritorio de noche: fondo casi negro, una superficie azul marino donde se apoya el trabajo y un solo verde esmeralda que marca lo que se puede tocar. El sitio es plano, sobrio y rápido; la personalidad viene de la tipografía (una fuente display propia en el H1, Oswald en los títulos) y de las piezas de cada proyecto, no de efectos de la interfaz.

El modo es **Experience** en portada y proyectos (el trabajo manda y la interfaz se hace a un lado) y **Operate** en el cotizador. La paleta es de cuatro valores heredados del proyecto (`docs/COMANDO_ARRANQUE.txt`) y no se amplía: las variantes salen de opacidades de esos mismos colores.

**Key Characteristics:**
- Tema oscuro único; no hay tema claro.
- Un acento: el verde esmeralda aparece en botones primarios, enlaces activos, foco y datos clave.
- Superficies planas con borde sutil; sin sombras de tarjeta.
- Texto en Arimo, títulos en Oswald, H1 en fuente display propia.
- Cada proyecto puede tener su propio "guiño" visual (por ejemplo la tarjeta de erosión de SIN GUARDAR o el estilo dibujado a mano de Project Miralta) sin salir de la paleta del sitio.

## Colors

Paleta fría y nocturna con un único acento cálido-verde. Todos los valores viven como variables en `css/layout.css` (`:root`) y se usan por su variable, nunca por el hex.

### Primary
- **Esmeralda** (#10B981, `--brand-accent`): botones primarios, estado activo del menú, foco, precios y cifras destacadas. Variante pulsada #0E9F6E; tinte `rgba(16, 185, 129, 0.1)` para fondos de selección; suave #A7F3D0 (`--brand-accent-soft`) para texto sobre fondos oscuros.

### Neutral
- **Tinta de noche** (#0D0E15, `--bg-page`): fondo de la página y texto sobre el acento (`--text-on-accent`).
- **Superficie marino** (#1D2D44, `--bg-surface`): hero, footer, bloques de apoyo. En tarjetas se usa al 45 % (`--surface-card`).
- **Blanco papel** (#F3F4F6, `--text-primary`): texto principal y bordes sutiles al 16 % (`--border-subtle`).
- **Gris claro** (#D1D5DB, `--text-secondary`) y **gris medio** (#9CA3AF, `--text-muted`): texto secundario y metadatos.
- **Esqueleto** (#1A2333 → #253147): carga de imágenes y video, con brillo animado.

### Named Rules
**The One Voice Rule.** El esmeralda es el único acento. Si algo necesita énfasis y no es interactivo ni una cifra clave, se resuelve con peso o tamaño, no con color.

**The Token Rule.** Los colores de la paleta se escriben con su variable (`var(--brand-accent)`), no con hex. La hoja del CV (`css/cv.css`) es la excepción: es un documento impreso con valores propios.

## Typography

**Display Font:** MiFuentePersonalizada (`assets/fonts/extension-regular.ttf`, con Oswald de respaldo)
**Headline Font:** Oswald 500/600/700
**Body Font:** Arimo 400/700 (con Arial)
Todas se sirven desde `/assets/fonts`; el sitio no llama a Google Fonts (la CSP no lo permite).

**Character:** una display ancha y geométrica para el nombre y los títulos de página, contra el Oswald condensado de las secciones y un Arimo neutro para leer.

### Hierarchy
- **Display** (400, `clamp(2rem, 4vw, 2.8rem)`+, tracking 1px): H1 de cada página.
- **Headline** (Oswald 700, tracking 2px, mayúsculas): H2 de sección.
- **Title** (Oswald 600): H3, nombres de tarjeta y de paquete.
- **Body** (Arimo 400, 1rem, medida de 65–75ch): párrafos; `text-wrap: pretty` en `p` y `balance` en títulos.
- **Label** (Arimo 700, 0.85rem): chips, etiquetas de formulario y metadatos.

### Project and document faces
- **Patrick Hand** (`project-hand`): solo dentro de Project Miralta (radio, panel del apagón, tarjetas dibujadas a mano). Es el guiño tipográfico de ese proyecto; no sale a otras páginas.
- **Tinos** (`cv-serif`) y las copias `CV Oswald` / `CV Arimo`: solo en la hoja del CV (plantillas Harvard y visual), con tamaños en pt para el PDF.

### Named Rules
**The Own-Face Rule.** El H1 siempre usa la display propia; no se sustituye por una fuente del sistema.

## Layout

Contenedor central de 1100–1136 px con gutter lateral de 20–32 px (`min(100% - 40px, 1136px)`); el header sticky mide 60 px. Los hero usan padding vertical fluido (`clamp(48px, 9vh, 96px)`) y las secciones respiran con `clamp(24px, 5vw, 72px)` entre columnas.

Puntos de corte: 640, 768 y 1024 px. En móvil el header se oculta al bajar y vuelve al subir; el footer pasa a una columna y reserva 88 px abajo para el botón flotante "Cotiza tu sitio". Las secciones entran una sola vez con un desplazamiento de 24 px y se quedan; con `prefers-reduced-motion` aparecen sin movimiento.

Áreas táctiles mínimas de 24 px (44 px en botones). Los enlaces del footer y los puntos del carrusel ocupan 24 px de alto aunque se vean más pequeños.

## Elevation & Depth

Plano por defecto. La profundidad viene del contraste entre superficies (negro → marino) y de bordes de 1 px al 14–16 % de blanco, no de sombras. El header, al hacer scroll, pasa a negro translúcido con desenfoque de 12 px: es el único uso de blur y existe por legibilidad.

### Named Rules
**The Flat-By-Default Rule.** Las tarjetas no llevan sombra en reposo. El estado (hover, foco, selección) cambia borde y color, no profundidad.

## Shapes

Botones en píldora (999 px). Tarjetas de 16 px, medios y bloques internos de 12 px, chips de 8 px. Bordes de 1 px; ningún borde de color de más de 1 px en un solo lado. Los íconos son SVG monocromos usados como máscara, de 18 px en botones.

## Components

### Buttons
- **Shape:** píldora (999 px), 44 px de alto mínimo, 10 × 22 px de relleno, Arimo 700.
- **Primary:** fondo esmeralda, texto tinta de noche. Hover/foco: fondo transparente con texto y borde esmeralda. Pulsado: #0E9F6E.
- **Ghost:** transparente con borde al 35 % de blanco; hover/foco en esmeralda.
- **Estados:** `.is-copied` marca confirmación en esmeralda; `:active` reduce la escala a 0.94 solo con movimiento permitido.

### Chips
- **Style:** borde al 16 % de blanco, radio 8 px, texto #D1D5DB a 0.85rem, relleno 5 × 12 px. Etiquetan tecnologías y estado de proyecto.

### Cards / Containers
- **Corner Style:** 16 px.
- **Background:** `rgba(29, 45, 68, 0.45)`, plana, sin degradado.
- **Border:** 1 px al 14 % de blanco.
- **Internal Padding:** 22–40 px según la tarjeta.

### Inputs / Fields (cotizador)
- **Style:** opciones como tarjetas seleccionables con radio o casilla; seleccionada = borde y tinte esmeralda.
- **Focus:** anillo visible con `:focus-visible`.

### Navigation
- Header sticky de 60 px: logo a la izquierda, enlaces en Oswald a la derecha, enlace activo subrayado en esmeralda, botón de idioma en píldora. En móvil, menú de hamburguesa.

### Slider de casos de estudio
- Galería con flechas, contador y barras de página de 28 × 6 px dibujadas dentro de un botón de 28 × 24 px; la activa va en esmeralda.

### Botón flotante "Cotiza tu sitio"
- Píldora esmeralda fija abajo a la derecha; aparece después de bajar ~60 % de la pantalla.

## Do's and Don'ts

### Do:
- **Do** usar siempre las variables de `:root` de `css/layout.css`; si falta una, agrégala ahí.
- **Do** escribir el texto en inglés en el HTML con `data-i18n` y añadir las dos versiones en `js/layout.js`; luego `npm run build:es`.
- **Do** dar a cada proyecto su guiño propio (como `erosion-card` en SIN GUARDAR) sin salir de la paleta del sitio.
- **Do** mantener áreas táctiles de al menos 24 px y respetar `prefers-reduced-motion`.
- **Do** servir fuentes, íconos e imágenes desde `/assets` (la CSP solo permite `'self'`).

### Don't:
- **Don't** añadir un segundo acento ni un tema claro.
- **Don't** usar sombras de tarjeta, degradados en texto ni bordes de color de más de 1 px en un lado.
- **Don't** usar un título sin la fuente display (H1) u Oswald (secciones).
- **Don't** escribir código o estilos en línea: la CSP lo bloquea.
- **Don't** editar `es/` a mano: se genera con `npm run build:es`.
