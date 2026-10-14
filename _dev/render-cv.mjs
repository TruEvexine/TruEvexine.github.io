// Genera los 4 PDFs del CV (Harvard / Visual × ES / EN) a partir de cv.html.
// Uso: node _dev/render-cv.mjs   (desde la raíz del repo; requiere el paquete "playwright")
// Lo ejecuta la GitHub Action .github/workflows/cv-pdf.yml cada vez que cambia cv/cv.json.
import { createServer } from 'node:http';
import { readFile, mkdir } from 'node:fs/promises';
import { extname, join, normalize } from 'node:path';
import { chromium } from 'playwright';

const root = process.cwd();
const types = { '.html': 'text/html', '.css': 'text/css', '.js': 'text/javascript', '.json': 'application/json',
    '.svg': 'image/svg+xml', '.webp': 'image/webp', '.png': 'image/png', '.jpg': 'image/jpeg', '.woff2': 'font/woff2' };

const server = createServer(async (req, res) => {
    const path = normalize(decodeURIComponent(new URL(req.url, 'http://x').pathname)).replace(/^(\.\.[/\\])+/, '');
    try {
        const body = await readFile(join(root, path === '/' ? 'index.html' : path));
        res.writeHead(200, { 'Content-Type': types[extname(path)] || 'application/octet-stream' });
        res.end(body);
    } catch {
        res.writeHead(404).end();
    }
}).listen(0);
const base = `http://localhost:${server.address().port}`;

await mkdir(join(root, 'assets/cv'), { recursive: true });
const browser = await chromium.launch();
const page = await browser.newPage();
// Las fuentes del CV son locales; Google Fonts no hace falta para el PDF
await page.route(/fonts\.(googleapis|gstatic)\.com/, (route) => route.abort());

let warnings = 0;
for (const template of ['harvard', 'visual']) {
    for (const lang of ['es', 'en']) {
        await page.goto(`${base}/cv.html?print=1&t=${template}&lang=${lang}`);
        await page.waitForSelector('html.cv-rendered', { timeout: 20000 });
        const file = `assets/cv/Rogelio-Ceja-CV-${template === 'harvard' ? 'Harvard' : 'Visual'}-${lang.toUpperCase()}.pdf`;
        const pages = await page.evaluate(() => Math.ceil(document.getElementById('cv-paper').scrollHeight / 1056));
        if (pages > 1) {
            warnings++;
            console.warn(`⚠ ${file}: el contenido ocupa ${pages} páginas`);
        }
        await page.pdf({ path: join(root, file), preferCSSPageSize: true, printBackground: true });
        console.log(`✔ ${file}`);
    }
}

await browser.close();
server.close();
if (warnings) console.warn('Revisa el CV: algún PDF pasó de una página.');
