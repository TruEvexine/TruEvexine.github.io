// npm run build:projects — escribe las tarjetas de proyecto (en inglés) en index.html y projects.html
// a partir de data/projects.json. Los bloques están entre <!-- projects:start --> y <!-- projects:end -->.
// La versión en español de esas tarjetas la genera build-es.mjs (npm run build:es) al crear es/.
// npm run verify usa checkProjectPages() para avisar si las tarjetas quedaron desactualizadas.
import { readFileSync, writeFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { pathToFileURL } from 'node:url';
import { insertarProyectos } from './projects-render.mjs';

const raiz = resolve(import.meta.dirname, '..');
export const PAGINAS_CON_PROYECTOS = ['index.html', 'projects.html'];

export function buildProjectPages() {
    return Object.fromEntries(PAGINAS_CON_PROYECTOS.map((archivo) => {
        const html = readFileSync(resolve(raiz, archivo), 'utf8');
        const nuevo = insertarProyectos(html, 'en');
        if (nuevo === html && !html.includes('projects:start')) throw new Error(`${archivo}: faltan los marcadores <!-- projects:start variant=… -->`);
        return [archivo, nuevo];
    }));
}

// Para verify: archivos cuyas tarjetas no coinciden con data/projects.json
export function checkProjectPages() {
    return Object.entries(buildProjectPages()).filter(([archivo, html]) => readFileSync(resolve(raiz, archivo), 'utf8') !== html).map(([archivo]) => archivo);
}

if (import.meta.url === pathToFileURL(process.argv[1]).href) {
    for (const [archivo, html] of Object.entries(buildProjectPages())) writeFileSync(resolve(raiz, archivo), html);
    console.log(`build:projects: tarjetas en ${PAGINAS_CON_PROYECTOS.join(' y ')}`);
}
