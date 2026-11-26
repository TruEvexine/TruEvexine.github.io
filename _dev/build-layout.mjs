// npm run build:layout — copia partials/header.html y partials/footer.html dentro de cada página, para que la
// navegación esté en el HTML sin depender de fetch ni de JavaScript. Los parciales siguen siendo la única fuente:
// se editan ahí y se vuelve a generar. es/ los recibe ya traducidos (build-es.mjs parte de estas páginas).
// npm run verify usa checkLayout() para avisar si alguna página se quedó atrás.
import { readFileSync, writeFileSync, readdirSync } from 'node:fs';
import { resolve } from 'node:path';
import { pathToFileURL } from 'node:url';
import { cargarTextos, traducir } from './build-es.mjs';

const raiz = resolve(import.meta.dirname, '..');
const leer = (archivo) => readFileSync(resolve(raiz, archivo), 'utf8');

export async function buildLayout() {
    const es = await cargarTextos();
    const parciales = Object.fromEntries(['header', 'footer'].map((n) => [n, leer(`partials/${n}.html`).replace(/\r\n/g, '\n').trim()]));
    const salida = {};
    for (const archivo of readdirSync(raiz).filter((f) => f.endsWith('.html'))) {
        let html = leer(archivo);
        if (!html.includes('data-layout=')) continue;
        // Sin él la página no marca html.js y el menú del teléfono saldría desplegado
        if (!html.includes('js/js-flag.js')) throw new Error(`${archivo}: falta js/js-flag.js`);
        const eol = html.includes('\r\n') ? '\r\n' : '\n';
        // cotizar.html se escribe en español: sus parciales también
        const enEspanol = /<html\b[^>]*\slang="es"/.test(html);
        for (const [nombre, parcial] of Object.entries(parciales)) {
            const hueco = new RegExp(`(<${nombre} data-layout="${nombre}">)[\\s\\S]*?(</${nombre}>)`);
            if (!hueco.test(html)) throw new Error(`${archivo}: falta <${nombre} data-layout="${nombre}">`);
            const contenido = enEspanol ? traducir(parcial, es, [], archivo) : parcial;
            const sangrado = contenido.split('\n').map((l) => (l ? `        ${l}` : l)).join(eol);
            html = html.replace(hueco, (m, abre, cierra) => `${abre}${eol}${sangrado}${eol}    ${cierra}`);
        }
        salida[archivo] = html;
    }
    return salida;
}

export async function checkLayout() {
    return Object.entries(await buildLayout()).filter(([archivo, html]) => leer(archivo) !== html).map(([archivo]) => archivo);
}

if (import.meta.url === pathToFileURL(process.argv[1]).href) {
    const salida = await buildLayout();
    for (const [archivo, html] of Object.entries(salida)) writeFileSync(resolve(raiz, archivo), html);
    console.log(`build:layout: header y footer en ${Object.keys(salida).length} páginas`);
}
