// npm run build:es — genera la versión en español de cada página en es/ (para que Google la indexe).
// Fuente: el HTML en inglés + el diccionario "es" de layout.js (el mismo que usa el botón de idioma).
// Las páginas de es/ no se editan a mano: se cambia el original o el texto y se vuelve a generar.
// npm run verify usa checkSpanishPages() para avisar si es/ quedó desactualizado.
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { resolve } from 'node:path';
import { pathToFileURL } from 'node:url';

const raiz = resolve(import.meta.dirname, '..');
const leer = (archivo) => readFileSync(resolve(raiz, archivo), 'utf8');
const SITIO = 'https://rogelioemmanuel.com';

// Lista de páginas: la misma que usa js-flag.js para redirigir
const PAGINAS = JSON.parse(leer('js-flag.js').match(/localizedPages = (\[[^\]]*\])/)[1]);

// SEO en español de cada página (la versión en inglés vive en su HTML)
const SEO = {
    index: {
        ogTitle: 'Rogelio Emmanuel Ceja — Portafolio de desarrollo web',
        description: 'Rogelio Emmanuel Ceja Acosta (Rogelio Ceja), estudiante de Ingeniería en Sistemas en Morelia que crea sitios web y videojuegos narrativos. Proyectos y contacto.',
    },
    profile: {
        ogTitle: 'Perfil — Rogelio Ceja',
        description: 'Stack técnico, forma de trabajo y formación de Rogelio Emmanuel Ceja, estudiante de Ingeniería en Sistemas en la UVAQ.',
    },
    projects: {
        ogTitle: 'Proyectos — Rogelio Ceja',
        description: 'SIN GUARDAR, un videojuego narrativo de horror cósmico en Java, y Project Miralta, un cozy survival en Phaser, de Rogelio Emmanuel Ceja.',
    },
    'sin-guardar': {
        ogTitle: 'SIN GUARDAR — Caso de estudio',
        description: 'SIN GUARDAR: videojuego de horror cósmico en Java de Rogelio Ceja. 22 nodos de decisión, 3 finales y una Erosión que cambia cómo se ve el juego.',
    },
    'project-miralta': {
        ogTitle: 'Project Miralta — Videojuego cozy survival en Phaser',
        description: 'Project Miralta, un cozy survival dibujado a mano de Rogelio Ceja: cuida un huerto en una azotea mientras la ciudad se queda sin agua. Hecho con Phaser y Vite.',
    },
    cv: {
        ogTitle: 'CV — Rogelio Ceja',
        description: 'CV de Rogelio Emmanuel Ceja Acosta, estudiante de Ingeniería en Sistemas Computacionales en la UVAQ. Descárgalo en formato Harvard (ATS) o visual, en español o inglés.',
    },
    contact: {
        ogTitle: 'Contacto — Rogelio Ceja',
        description: 'Contacta a Rogelio Emmanuel Ceja por correo, WhatsApp, GitHub o LinkedIn.',
    },
    privacidad: {
        ogTitle: 'Privacidad — Rogelio Ceja',
        description: 'Este sitio no tiene cuentas, cookies ni analítica, y no guarda tus datos en ningún servidor.',
    },
};

const BREADCRUMBS = { Home: 'Inicio', Projects: 'Proyectos' };

const rutaEn = (pagina) => `/${pagina === 'index' ? '' : pagina}`;
const rutaEs = (pagina) => `/es/${pagina === 'index' ? '' : pagina}`;
const paginaDe = (ruta) => ruta.split(/[?#]/)[0].replace(/^\/(es(?:\/|$))?/, '').replace(/\/$/, '').replace(/\.html$/, '') || 'index';

async function cargarTextos() {
    globalThis.window = { translations: {} };
    const bloque = leer('layout.js');
    const inicio = bloque.indexOf('const translations =');
    const fin = bloque.indexOf('window.translations = translations');
    return new Function(`${bloque.slice(inicio, fin)}; return translations;`)().es;
}

const escaparTexto = (s) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
const escaparAtributo = (s) => escaparTexto(s).replace(/"/g, '&quot;');

function traducir(html, es, avisos, archivo) {
    const texto = (clave, original) => {
        if (clave in es) return es[clave];
        avisos.push(`${archivo}: sin traducción para ${clave}`);
        return original;
    };

    // data-i18n: reemplaza el texto del elemento (como textContent)
    html = html.replace(/(<(\w+)\b[^>]*\sdata-i18n="([^"]+)"[^>]*>)([\s\S]*?)(<\/\2>)/g,
        (m, abre, _tag, clave, contenido, cierra) => abre + escaparTexto(texto(clave, contenido)) + cierra);

    // data-i18n-html: reemplaza el HTML interior (como innerHTML)
    html = html.replace(/(<(\w+)\b[^>]*\sdata-i18n-html="([^"]+)"[^>]*>)([\s\S]*?)(<\/\2>)/g,
        (m, abre, _tag, clave, contenido, cierra) => abre + texto(clave, contenido) + cierra);

    // data-i18n-attr="attr:clave; attr2:clave2": reemplaza esos atributos de la etiqueta
    html = html.replace(/<\w+\b[^>]*\sdata-i18n-attr="([^"]+)"[^>]*>/g, (etiqueta, pares) => {
        for (const par of pares.split(';')) {
            const [attr, clave] = par.split(':').map((p) => p.trim());
            if (!(clave in es)) { avisos.push(`${archivo}: sin traducción para ${clave}`); continue; }
            const valor = escaparAtributo(es[clave]);
            const re = new RegExp(`(\\s${attr}=")[^"]*(")`);
            etiqueta = re.test(etiqueta) ? etiqueta.replace(re, `$1${valor}$2`) : etiqueta.replace(/\s*\/?>$/, ` ${attr}="${valor}">`);
        }
        return etiqueta;
    });
    return html;
}

// Rutas relativas → absolutas (es/ está un nivel abajo) y enlaces internos → su versión en español
function ajustarRutas(html) {
    return html.replace(/(\s(?:src|href|data-fallback)=")([^"]*)"/g, (m, attr, valor) => {
        if (/^(https?:|mailto:|tel:|data:|#|\/\/)/.test(valor) || valor === '') return m;
        if (!valor.startsWith('/')) return `${attr}/${valor}"`;
        const pagina = paginaDe(valor);
        if (PAGINAS.includes(pagina) && !/^\/es(\/|$)/.test(valor)) {
            const resto = valor.match(/[?#].*$/)?.[0] ?? '';
            return `${attr}${rutaEs(pagina)}${resto}"`;
        }
        return m;
    });
}

function ajustarJsonLd(html, pagina) {
    return html.replace(/(<script type="application\/ld\+json">\s*)([\s\S]*?)(\s*<\/script>)/g, (m, abre, json, cierra) => {
        const dato = JSON.parse(json);
        if (dato['@type'] === 'BreadcrumbList') {
            for (const item of dato.itemListElement) {
                item.name = BREADCRUMBS[item.name] ?? item.name;
                item.item = SITIO + rutaEs(paginaDe(new URL(item.item).pathname));
            }
        } else if (dato['@type'] === 'VideoGame') {
            dato.url = SITIO + rutaEs(pagina);
            dato.description = SEO[pagina].description;
        } else {
            return m; // Person y WebSite describen al autor y al sitio: son iguales en ambos idiomas
        }
        const sangria = abre.match(/\n?([ \t]*)$/)?.[1] ?? '';
        const texto = JSON.stringify(dato, null, 4).split('\n').map((l, i) => (i ? sangria + l : l)).join('\n');
        return abre + texto + cierra;
    });
}

function generar(pagina, es, avisos) {
    const archivo = `${pagina}.html`;
    const seo = SEO[pagina];
    if (!seo) throw new Error(`Falta el SEO en español de ${pagina} en _dev/build-es.mjs`);
    let html = leer(archivo);
    const eol = html.includes('\r\n') ? '\r\n' : '\n';
    html = html.replace(/\r\n/g, '\n');

    // Los comentarios (instrucciones para mí, plantillas) se dejan tal cual
    const comentarios = [];
    html = html.replace(/<!--[\s\S]*?-->/g, (c) => `<!--c${comentarios.push(c) - 1}-->`);
    html = traducir(html, es, avisos, archivo);
    html = ajustarRutas(html);
    html = ajustarJsonLd(html, pagina);
    html = html.replace(/<!--c(\d+)-->/g, (m, n) => comentarios[n]);

    const url = SITIO + rutaEs(pagina);
    const metas = [
        [/(<html\b[^>]*\slang=")en(")/, `$1es$2`],
        [/(<meta name="description" content=")[^"]*(")/, `$1${escaparAtributo(seo.description)}$2`],
        [/(<meta property="og:description" content=")[^"]*(")/, `$1${escaparAtributo(seo.description)}$2`],
        [/(<meta property="og:title" content=")[^"]*(")/, `$1${escaparAtributo(seo.ogTitle)}$2`],
        [/(<meta property="og:url" content=")[^"]*(")/, `$1${url}$2`],
        [/(<link rel="canonical" href=")[^"]*(")/, `$1${url}$2`],
        [/(<meta property="og:locale" content=")en_US(")/, `$1es_MX$2`],
        [/(<meta property="og:locale:alternate" content=")es_MX(")/, `$1en_US$2`],
    ];
    for (const [re, valor] of metas) {
        if (!re.test(html) && !/og:locale/.test(re.source)) throw new Error(`${archivo}: no encontré ${re}`);
        html = html.replace(re, valor);
    }
    html = html.replace(/^<!DOCTYPE html>\n/i, (d) => `${d}<!-- Generado por _dev/build-es.mjs desde ${archivo}. No editar: cambia el original y ejecuta npm run build:es -->\n`);
    return html.replace(/\n/g, eol);
}

export async function buildSpanishPages() {
    const es = await cargarTextos();
    const avisos = [];
    const salida = Object.fromEntries(PAGINAS.map((p) => [`es/${p}.html`, generar(p, es, avisos)]));
    return { salida, avisos };
}

// Para verify: lista de archivos de es/ que no coinciden con lo que se generaría
export async function checkSpanishPages() {
    const { salida } = await buildSpanishPages();
    return Object.entries(salida).filter(([archivo, html]) => {
        try { return leer(archivo) !== html; } catch { return true; }
    }).map(([archivo]) => archivo);
}

if (import.meta.url === pathToFileURL(process.argv[1]).href) {
    const { salida, avisos } = await buildSpanishPages();
    mkdirSync(resolve(raiz, 'es'), { recursive: true });
    for (const [archivo, html] of Object.entries(salida)) writeFileSync(resolve(raiz, archivo), html);
    avisos.forEach((a) => console.warn(`! ${a}`));
    console.log(`build:es: ${Object.keys(salida).length} páginas en es/`);
}
