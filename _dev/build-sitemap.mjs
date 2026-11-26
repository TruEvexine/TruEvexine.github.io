// npm run build:sitemap — genera sitemap.xml desde las páginas.
// La fecha de una página solo cambia cuando cambia su contenido: texto, enlaces, imágenes con alt o datos
// estructurados (no por clases, íconos decorativos o estilos). Esa huella se guarda en _dev/sitemap-estado.json.
// npm run verify usa checkSitemap() para avisar si quedó desactualizado.
import { readFileSync, writeFileSync, existsSync } from 'node:fs';
import { createHash } from 'node:crypto';
import { resolve } from 'node:path';
import { pathToFileURL } from 'node:url';

const raiz = resolve(import.meta.dirname, '..');
const leer = (archivo) => readFileSync(resolve(raiz, archivo), 'utf8').replace(/\r\n/g, '\n');
const ESTADO = '_dev/sitemap-estado.json';
const SITIO = 'https://rogelioemmanuel.com';

const PAGINAS = JSON.parse(leer('js/js-flag.js').match(/localizedPages = (\[[^\]]*\])/)[1]);
// El CV y los precios se dibujan con JavaScript: sus datos también son contenido de la página
const DATOS = { cv: ['data/cv.json', 'data/projects.json'], cotizar: ['js/precios.js', 'js/cotizar-textos.js'] };

export function huella(html) {
    const limpio = html.replace(/<!--[\s\S]*?-->/g, '').replace(/<svg[\s\S]*?<\/svg>/g, '');
    const datos = [...limpio.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)].map((m) => m[1]);
    const cuerpo = limpio.slice(limpio.indexOf('<body'));
    const atributos = [...cuerpo.matchAll(/\s(?:href|src|alt|data-yt)="([^"]+)"/g)].map((m) => m[1]);
    const texto = cuerpo.replace(/<script[\s\S]*?<\/script>/g, '').replace(/<[^>]+>/g, ' ');
    const cabeza = [...limpio.matchAll(/<title[^>]*>[^<]*|<meta name="description" content="[^"]*"/g)].map((m) => m[0]);
    return [...cabeza, texto, ...atributos, ...datos].join(' ').replace(/\s+/g, ' ').trim();
}

function entradas() {
    const lista = [];
    for (const pagina of PAGINAS) {
        const nombre = pagina === 'index' ? '' : pagina;
        const alternos = [['en', `${SITIO}/${nombre}`], ['es', `${SITIO}/es/${nombre}`], ['x-default', `${SITIO}/${nombre}`]];
        lista.push({ archivo: `${pagina}.html`, pagina, loc: alternos[0][1], alternos });
        lista.push({ archivo: `es/${pagina}.html`, pagina, loc: alternos[1][1], alternos });
    }
    lista.push({ archivo: 'cotizar.html', pagina: 'cotizar', loc: `${SITIO}/cotizar`, alternos: [] });
    return lista.filter((e) => !/name="robots" content="[^"]*noindex/.test(leer(e.archivo).replace(/<!--[\s\S]*?-->/g, '')));
}

export function buildSitemap(hoy = new Date().toLocaleDateString('sv')) {
    const anterior = existsSync(resolve(raiz, ESTADO)) ? JSON.parse(leer(ESTADO)) : {};
    const estado = {};
    const urls = entradas().map(({ archivo, pagina, loc, alternos }) => {
        const contenido = [huella(leer(archivo)), ...(DATOS[pagina] ?? []).map(leer)].join(' ');
        const hash = createHash('sha256').update(contenido).digest('hex').slice(0, 16);
        const lastmod = anterior[loc]?.hash === hash ? anterior[loc].lastmod : hoy;
        estado[loc] = { hash, lastmod };
        const enlaces = alternos.map(([idioma, url]) => `<xhtml:link rel="alternate" hreflang="${idioma}" href="${url}"/>`).join('');
        return `    <url><loc>${loc}</loc><lastmod>${lastmod}</lastmod>${enlaces ? `\n        ${enlaces}</url>` : '</url>'}`;
    });
    const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">\n${urls.join('\n')}\n</urlset>\n`;
    return { 'sitemap.xml': xml, [ESTADO]: `${JSON.stringify(estado, null, 2)}\n` };
}

// Para verify: con la misma huella las fechas se conservan, así que cualquier diferencia es un sitemap sin regenerar
export function checkSitemap() {
    return Object.entries(buildSitemap()).filter(([archivo, texto]) => {
        try { return leer(archivo) !== texto; } catch { return true; }
    }).map(([archivo]) => archivo);
}

if (import.meta.url === pathToFileURL(process.argv[1]).href) {
    for (const [archivo, texto] of Object.entries(buildSitemap())) writeFileSync(resolve(raiz, archivo), texto);
    console.log('build:sitemap: sitemap.xml');
}
