// Tarjetas de proyecto (Inicio y Proyectos) generadas desde data/projects.json, la única fuente de los proyectos.
// En el HTML, cada bloque va entre estos marcadores y no se edita a mano:
//   <!-- projects:start variant=page|home -->  …  <!-- projects:end -->
// build-projects.mjs lo escribe en inglés; build-es.mjs lo vuelve a generar en español para es/.
import { existsSync, readFileSync } from 'node:fs';
import { resolve } from 'node:path';

const raiz = resolve(import.meta.dirname, '..');
const leer = (archivo) => readFileSync(resolve(raiz, archivo), 'utf8');

// Inicio usa h3 y carga las miniaturas en diferido; Proyectos usa h2 y revela al hacer scroll
const VARIANTES = {
    page: { heading: 'h2', reveal: true, lazy: false },
    home: { heading: 'h3', reveal: false, lazy: true },
};

// Cada tema trae sus clases (el efecto de Erosión solo lo lleva el título de SIN GUARDAR)
const TEMAS = {
    erosion: { card: 'erosion-card', scan: 'erosion-scan', titleClass: ' erosion-title', barClass: '' },
    water: { card: 'water-card', scan: 'rain-scan', titleClass: '', barClass: ' water-bar' },
};

const escaparTexto = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
const escaparAtributo = (s) => escaparTexto(s).replace(/"/g, '&quot;');

export function cargarProyectos() {
    return JSON.parse(leer('data/projects.json')).projects;
}

// Los textos fijos de la interfaz siguen en el diccionario de layout.js (son los mismos del resto del sitio)
export function cargarDiccionarios() {
    globalThis.window = { translations: {} };
    const bloque = leer('layout.js');
    const inicio = bloque.indexOf('const translations =');
    const fin = bloque.indexOf('window.translations = translations');
    return new Function(`${bloque.slice(inicio, fin)}; return translations;`)();
}

export function paginasLocalizadas() {
    return JSON.parse(leer('js-flag.js').match(/localizedPages = (\[[^\]]*\])/)[1]);
}

// Una página de proyecto es válida si el sitio la sirve en ambos idiomas: está en localizedPages y existe su HTML.
// (es/<página>.html lo genera build-es.mjs a partir de esa misma lista.)
export function paginaValida(pagina, locales = paginasLocalizadas()) {
    return Boolean(pagina) && !['index', 'cv'].includes(pagina) && locales.includes(pagina) && existsSync(resolve(raiz, `${pagina}.html`));
}

function tarjeta(p, lang, variante, textos, locales) {
    const { heading, reveal, lazy } = VARIANTES[variante];
    const tema = TEMAS[p.card.theme];
    if (!tema) throw new Error(`data/projects.json: tema desconocido "${p.card.theme}" en ${p.id}`);
    const en = textos.en;
    const t = (clave) => {
        if (!(clave in en)) throw new Error(`data/projects.json: la clave "${clave}" (${p.id}) no existe en layout.js`);
        return escaparTexto(en[clave]);
    };
    const valida = paginaValida(p.page, locales);
    const titulo = escaparTexto(`${p.name} — ${p.tagline[lang]}`);
    const v = p.card.video;
    const ruta = `/${p.page}`;
    return [
        `<article class="project-feature ${tema.card}${reveal ? ' scroll-reveal' : ''}">`,
        `    <div class="project-feature-media skel" data-error="${escaparAtributo(en['ui.mediaError'])}" data-i18n-attr="data-error:ui.mediaError">`,
        `        <button type="button" class="yt-facade" data-yt="${v.id}"${v.start ? ` data-start="${v.start}"` : ''} aria-label="${escaparAtributo(en[v.labelKey])}" data-i18n-attr="aria-label:${v.labelKey}">`,
        `            <img src="${v.media}/video-max.jpg" data-fallback="${v.media}/video-hq.jpg" alt="" width="1280" height="720"${lazy ? ' loading="lazy"' : ''}>`,
        '            <span class="yt-play" aria-hidden="true"></span>',
        '        </button>',
        `        <span class="${tema.scan}" aria-hidden="true"></span>`,
        '    </div>',
        '    <div class="project-feature-body">',
        // El título enlaza al caso de estudio solo si esa página existe; si no, queda como texto
        `        <${heading} class="project-feature-title${tema.titleClass}">${valida ? `<a class="project-title-link" href="${ruta}">${titulo}</a>` : titulo}</${heading}>`,
        `        <p class="project-meta"><span class="project-status" data-i18n="${p.statusKey}">${t(p.statusKey)}</span></p>`,
        `        <p>${escaparTexto(p.card.description[lang])}</p>`,
        `        <ul class="chips">${p.stack.map((s) => `<li>${escaparTexto(s)}</li>`).join('')}</ul>`,
        ...(valida ? [`        <a class="btn btn-primary" href="${ruta}" data-i18n="projects.caseStudy">${t('projects.caseStudy')}</a>`] : []),
        `        <div class="erosion-meter" aria-hidden="true"><span data-i18n="${p.card.meterKey}">${t(p.card.meterKey)}</span><span class="erosion-bar${tema.barClass}"><span></span></span></div>`,
        '    </div>',
        '</article>',
    ];
}

export function renderizarBloque(variante, lang, sangria, proyectos = cargarProyectos(), textos = cargarDiccionarios()) {
    const locales = paginasLocalizadas();
    return proyectos.filter((p) => p.card)
        .map((p) => tarjeta(p, lang, variante, textos, locales).map((l) => sangria + l).join('\n'))
        .join('\n\n');
}

const BLOQUE = /^([ \t]*)(<!-- projects:start variant=(\w+)[^>]*-->)\n(?:[\s\S]*?\n)?[ \t]*(<!-- projects:end -->)/m;

// Sustituye el bloque marcado de un HTML por las tarjetas del idioma pedido. Devuelve el HTML sin cambios si no hay marcadores.
export function insertarProyectos(html, lang) {
    const eol = html.includes('\r\n') ? '\r\n' : '\n';
    const texto = html.replace(/\r\n/g, '\n');
    const m = texto.match(BLOQUE);
    if (!m) return html;
    const [completo, sangria, abre, variante, cierra] = m;
    if (!VARIANTES[variante]) throw new Error(`projects:start con variante desconocida: ${variante}`);
    const cuerpo = renderizarBloque(variante, lang, sangria);
    return texto.replace(completo, () => `${sangria}${abre}\n${cuerpo}\n${sangria}${cierra}`).replace(/\n/g, eol);
}
