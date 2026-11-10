// npm run verify: revisa lo del cotizador (no hay build porque el sitio es estático).
// - sin código en línea ni recursos externos
// - sin innerHTML ni eval en el código nuevo
// - mismas claves en español e inglés, y todas las claves usadas existen
// - precios solo en precios.js
// - pruebas de cálculo
import { execSync } from 'node:child_process';
import { readFileSync, existsSync } from 'node:fs';
import { pathToFileURL } from 'node:url';
import { resolve } from 'node:path';

const raiz = resolve(import.meta.dirname, '..');
const leer = (archivo) => readFileSync(resolve(raiz, archivo), 'utf8');

let fallos = 0;
const falla = (msg) => { fallos += 1; console.error(`✗ ${msg}`); };
const ok = (msg) => console.log(`✓ ${msg}`);

const paginas = ['cotizar.html', 'cv.html'];
const hojas = ['cotizar.css'];
const codigo = ['cotizador.js', 'cotizador-calc.js', 'precios.js', 'contacto.js', 'cotizar-textos.js', 'cv.js', 'cv-credentials.js'];

// 1. Código en línea (la CSP estricta no lo permite). El JSON-LD es dato, no se ejecuta.
function codigoEnLinea(html) {
    const problemas = [];
    if (/<style[\s>]/i.test(html)) problemas.push('<style> en línea');
    for (const m of html.matchAll(/<script\b([^>]*)>/gi)) {
        const esJsonLd = /type\s*=\s*["']application\/ld\+json["']/i.test(m[1]);
        if (!/\bsrc\s*=/i.test(m[1]) && !esJsonLd) problemas.push('<script> en línea');
    }
    if (/\sstyle\s*=/i.test(html)) problemas.push('atributo style=');
    if (/\son[a-z]+\s*=/i.test(html)) problemas.push('manejador on*= en línea');
    return problemas;
}

// 2. Recursos que se descargan de otro dominio (los enlaces <a> y las metas Open Graph sí valen)
function recursosExternos(texto) {
    const patrones = [
        /<(?:script|img|iframe|source|video|audio)\b[^>]*\ssrc\s*=\s*["'](https?:)?\/\/[^"']+/gi,
        /<link\b[^>]*\brel\s*=\s*["'](?:stylesheet|preload|preconnect|prefetch|icon|apple-touch-icon|modulepreload)["'][^>]*\shref\s*=\s*["'](https?:)?\/\/[^"']+/gi,
        /<link\b[^>]*\shref\s*=\s*["'](https?:)?\/\/[^"']+["'][^>]*\brel\s*=\s*["'](?:stylesheet|preload|preconnect|prefetch|icon|apple-touch-icon|modulepreload)["']/gi,
        /url\(\s*["']?(https?:)?\/\/[^)"']+/gi,
        /@import\s+["'](https?:)?\/\/[^"']+/gi,
        /\bfrom\s+["']https?:\/\//gi,
        /\bfetch\(\s*["'`]https?:\/\//gi,
    ];
    return patrones.flatMap((re) => [...texto.matchAll(re)].map((m) => m[0].slice(0, 100)));
}

for (const archivo of paginas) {
    const html = leer(archivo);
    codigoEnLinea(html).forEach((p) => falla(`${archivo}: ${p}`));
    recursosExternos(html).forEach((r) => falla(`${archivo}: recurso externo → ${r}`));
}
for (const archivo of [...hojas, ...codigo]) {
    recursosExternos(leer(archivo)).forEach((r) => falla(`${archivo}: recurso externo → ${r}`));
}
if (!fallos) ok('sin código en línea ni recursos externos');

// 3. Prohibido insertar HTML desde datos
const antes = fallos;
for (const archivo of ['cotizador.js', 'cotizador-calc.js', 'cotizar-textos.js', 'cv-credentials.js']) {
    const texto = leer(archivo);
    for (const prohibido of ['innerHTML', 'outerHTML', 'insertAdjacentHTML', 'document.write', 'eval(']) {
        if (texto.includes(prohibido)) falla(`${archivo}: usa ${prohibido}`);
    }
}
if (fallos === antes) ok('sin innerHTML ni eval');

// 4. Precios solo en precios.js: ni cantidades en pesos en el HTML ni en los textos
const antesPrecios = fallos;
for (const archivo of ['cotizar.html', 'cotizar-textos.js', 'cotizador.js', 'cotizador-calc.js']) {
    const texto = leer(archivo);
    for (const m of texto.matchAll(/\$\s?\d[\d,.]*/g)) falla(`${archivo}: precio escrito a mano → ${m[0]}`);
}
if (fallos === antesPrecios) ok('precios solo en precios.js');

// 5. Claves de idioma: layout.js + cotizar-textos.js, mismas en es y en, y todas las usadas existen
globalThis.window = { translations: {} };
const bloque = leer('layout.js');
const inicio = bloque.indexOf('const translations =');
const fin = bloque.indexOf('window.translations = translations');
window.translations = new Function(`${bloque.slice(inicio, fin)}; return translations;`)();
await import(`${pathToFileURL(resolve(raiz, 'cotizar-textos.js')).href}`);
const { es, en } = window.translations;
const antesClaves = fallos;
Object.keys(es).filter((k) => !(k in en)).forEach((k) => falla(`falta en inglés: ${k}`));
Object.keys(en).filter((k) => !(k in es)).forEach((k) => falla(`falta en español: ${k}`));
for (const archivo of ['cotizar.html', 'contact.html', 'footer.html', 'cv.html']) {
    for (const m of leer(archivo).matchAll(/data-i18n(?:-html)?="([^"]+)"/g)) {
        if (!(m[1] in es) || !(m[1] in en)) falla(`${archivo}: clave sin traducir → ${m[1]}`);
    }
}
for (const m of leer('cotizador.js').matchAll(/texto\(\s*['"]([^'"]+)['"]/g)) {
    if (!(m[1] in es) || !(m[1] in en)) falla(`cotizador.js: clave sin traducir → ${m[1]}`);
}
if (fallos === antesClaves) ok('mismas claves en español e inglés, y ninguna falta');

// 5b. CV: enlaces de proyecto y tarjetas de certificaciones (datos en cv/cv.json)
{
    const antesCv = fallos;
    const cv = JSON.parse(leer('cv/cv.json'));
    const paginasLocales = JSON.parse(leer('js-flag.js').match(/localizedPages = (\[[^\]]*\])/)[1]);
    if ('projects' in cv) falla('cv.json: los proyectos viven solo en data/projects.json');
    const catalogo = JSON.parse(leer('data/projects.json')).projects;
    const diccionarios = (await import(pathToFileURL(resolve(raiz, '_dev/projects-render.mjs')).href)).cargarDiccionarios();
    const ids = new Set();
    for (const pr of catalogo) {
        const quien = `data/projects.json: "${pr.id}"`;
        if (ids.has(pr.id)) falla(`${quien} repetido`);
        ids.add(pr.id);
        for (const l of ['es', 'en']) if (!pr.tagline?.[l]) falla(`${quien}: falta tagline.${l}`);
        if (!pr.name || !pr.date || !pr.stack?.length) falla(`${quien}: faltan name, date o stack`);
        if (pr.page) {
            if (!paginasLocales.includes(pr.page) || ['index', 'cv'].includes(pr.page)) falla(`${quien}: page "${pr.page}" no está en localizedPages`);
            else for (const ruta of [`${pr.page}.html`, `es/${pr.page}.html`]) if (!existsSync(resolve(raiz, ruta))) falla(`${quien}: falta ${ruta}`);
        }
        if (pr.card) {
            if (!pr.page) falla(`${quien}: una tarjeta necesita page (el título y el botón enlazan al caso de estudio)`);
            for (const l of ['es', 'en']) if (!pr.card.description?.[l]) falla(`${quien}: falta card.description.${l}`);
            for (const clave of [pr.statusKey, pr.card.meterKey, pr.card.video?.labelKey]) {
                if (!(clave in diccionarios.es) || !(clave in diccionarios.en)) falla(`${quien}: clave sin traducir ${clave}`);
            }
            for (const archivo of ['video-max.jpg', 'video-hq.jpg']) {
                if (!existsSync(resolve(raiz, pr.card.video.media, archivo))) falla(`${quien}: falta ${pr.card.video.media}/${archivo}`);
            }
        }
        if (pr.cv?.include) {
            for (const l of ['es', 'en']) if (!pr.cv.bullets?.[l]?.length) falla(`${quien}: cv.include sin bullets en ${l}`);
        }
    }
    // Una página de caso de estudio (data-nav="projects") que ningún proyecto referencia es un proyecto olvidado
    for (const pagina of paginasLocales) {
        if (existsSync(resolve(raiz, `${pagina}.html`)) && /<body[^>]*data-nav="projects"/.test(leer(`${pagina}.html`)) && !catalogo.some((pr) => pr.page === pagina)) {
            falla(`${pagina}.html es un caso de estudio que no está en data/projects.json`);
        }
    }
    // Sin tarjetas escritas a mano: solo las generadas, entre marcadores
    for (const archivo of ['index.html', 'projects.html']) {
        const sinBloque = leer(archivo).replace(/<!-- projects:start[\s\S]*?<!-- projects:end -->/, '');
        if (/class="project-feature\b/.test(sinBloque)) falla(`${archivo}: hay una tarjeta de proyecto fuera de los marcadores projects:start/end`);
    }
    const { checkProjectPages } = await import(pathToFileURL(resolve(raiz, '_dev/build-projects.mjs')).href);
    const tarjetasViejas = checkProjectPages();
    if (tarjetasViejas.length) falla(`tarjetas de proyecto desactualizadas (${tarjetasViejas.join(', ')}): ejecuta npm run build`);
    // Los textos de las tarjetas ya no deben estar duplicados en el diccionario
    for (const clave of Object.keys(diccionarios.en)) {
        if (/^projects\.project\d/.test(clave)) falla(`layout.js: ${clave} duplica data/projects.json`);
    }
    const tipos = ['certification', 'diploma', 'participation'];
    for (const c of cv.certifications) {
        if (c.type && !tipos.includes(c.type)) falla(`cv.json: tipo desconocido "${c.type}" en "${c.name.en}"`);
        for (const img of c.images || []) {
            if (/^([a-z][a-z0-9+.-]*:|\/\/)/i.test(img.src || '')) falla(`cv.json: la imagen debe ser local (la CSP no permite otras): ${img.src}`);
            else if (!existsSync(resolve(raiz, (img.src || '').replace(/^\//, '')))) falla(`cv.json: no existe la imagen ${img.src}`);
            if (!img.alt?.es || !img.alt?.en) falla(`cv.json: la imagen ${img.src} necesita alt en es y en`);
        }
    }
    if (fallos === antesCv) ok('proyectos: fuente única, enlaces, tarjetas y CV válidos');
}

// 6. Versión en español (es/) al día con las páginas en inglés y los textos
const { checkSpanishPages } = await import(`${pathToFileURL(resolve(raiz, '_dev/build-es.mjs')).href}`);
const desactualizadas = await checkSpanishPages();
if (desactualizadas.length) falla(`es/ desactualizado (${desactualizadas.join(', ')}): ejecuta npm run build:es`);
else ok('es/ al día');

// 7. Pruebas
try {
    execSync('node --test _dev/tests/*.test.js', { cwd: raiz, stdio: 'inherit' });
    ok('pruebas');
} catch {
    falla('las pruebas fallaron');
}

if (fallos) {
    console.error(`\nverify: ${fallos} problema(s)`);
    process.exit(1);
}
console.log('\nverify: todo en verde');
