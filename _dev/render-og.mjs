// node _dev/render-og.mjs — genera las imágenes que se ven al compartir un enlace (assets/og/, 1200×630).
// Usa el Chrome instalado y ffmpeg, sin dependencias. Si Chrome está en otro lado: CHROME_PATH=...
// Se ejecuta a mano cuando cambian los textos, la foto o las capturas; los JPG se suben al repo.
import { execFileSync } from 'node:child_process';
import { readFileSync, writeFileSync, mkdirSync, mkdtempSync, rmSync, statSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join, resolve } from 'node:path';
import { pathToFileURL } from 'node:url';

const raiz = resolve(import.meta.dirname, '..');
const leer = (archivo) => readFileSync(resolve(raiz, archivo), 'utf8');
const CHROME = process.env.CHROME_PATH || (process.platform === 'win32'
    ? 'C:/Program Files/Google/Chrome/Application/chrome.exe' : 'google-chrome');

const TIPOS = { webp: 'image/webp', jpg: 'image/jpeg', png: 'image/png', woff2: 'font/woff2' };
const dato = (archivo) => `data:${TIPOS[archivo.split('.').pop()]};base64,${readFileSync(resolve(raiz, archivo)).toString('base64')}`;
const escapar = (s) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

// Los textos salen del diccionario y de data/projects.json: aquí no se escriben dos veces
const bloque = leer('js/layout.js');
const textos = new Function(`${bloque.slice(bloque.indexOf('const translations ='), bloque.indexOf('window.translations = translations'))}; return translations;`)();
const proyectos = JSON.parse(leer('data/projects.json')).projects;

// Color de cada proyecto, el mismo de css/project-card.css
const COLORES = {
    'sin-guardar': ['239, 68, 68', '56, 27, 33'],
    'project-miralta': ['56, 189, 248', '22, 45, 60'],
    'satin-player': ['230, 198, 134', '54, 43, 28'],
    'undefeated-stars': ['140, 121, 255', '41, 35, 66'],
};
const CAPTURAS = {
    'sin-guardar': 'assets/sin-guardar/video-max.jpg',
    'project-miralta': 'assets/project-miralta/video-max.jpg',
    'satin-player': 'assets/satin-player/landing_esc.webp',
    // undefeated-stars: todavía no hay captura real; la tarjeta es solo tipográfica
};

const tarjetas = [];
for (const idioma of ['en', 'es']) {
    tarjetas.push({
        archivo: `home-${idioma}`, titulo: 'Rogelio Emmanuel Ceja', texto: textos[idioma]['hero.role'],
        pie: 'rogelioemmanuel.com', foto: 'assets/Yo_Traje.webp',
    });
    for (const id of Object.keys(COLORES)) {
        const p = proyectos.find((x) => x.id === id);
        tarjetas.push({
            archivo: `${id}-${idioma}`, titulo: p.name, texto: p.tagline[idioma], pie: `rogelioemmanuel.com/${idioma === 'es' ? 'es/' : ''}${p.page}`,
            captura: CAPTURAS[id], color: COLORES[id],
        });
    }
}
// El cotizador tiene una sola URL, en español: es el enlace que se manda a un negocio
tarjetas.push({
    archivo: 'cotizar', titulo: '¿Cuánto cuesta tu página web?', texto: 'Cotízala en línea · Morelia',
    pie: 'rogelioemmanuel.com/cotizar', chips: ['Precios sin IVA', 'Sin registro', 'Respuesta por WhatsApp'],
});

const fuente = (familia, peso, archivo) => `@font-face{font-family:'${familia}';font-weight:${peso};src:url(${dato(`assets/fonts/${archivo}`)}) format('woff2')}`;
const fuentes = fuente('Oswald', 700, 'oswald-latin-700-normal.woff2') + fuente('Arimo', 400, 'arimo-latin-400-normal.woff2') + fuente('Arimo', 700, 'arimo-latin-700-normal.woff2');

function html({ titulo, texto, pie, foto, captura, color = ['16, 185, 129', '29, 45, 68'], chips }) {
    const [borde, fondo] = color;
    const lateral = foto
        ? `<img class="foto" src="${dato(foto)}">`
        : captura ? `<div class="marco"><img src="${dato(captura)}"></div>` : '';
    return `<!doctype html><meta charset="utf-8"><style>${fuentes}
*{margin:0;padding:0;box-sizing:border-box}
body{width:1200px;height:630px;overflow:hidden;display:flex;background:linear-gradient(135deg,rgb(${fondo}),#0D0E15 70%);color:#F3F4F6;font-family:Arimo}
.texto{flex:1;min-width:0;display:flex;flex-direction:column;justify-content:center;padding:64px 56px 64px 72px}
.barra{width:76px;height:8px;margin-bottom:40px;background:rgb(${borde})}
h1{font-family:Oswald;font-size:${titulo.length > 24 ? 66 : 76}px;line-height:1.12;text-transform:uppercase}
p{margin-top:24px;font-size:32px;line-height:1.4;color:#D1D5DB}
.pie{margin-top:44px;font-size:21px;white-space:nowrap;font-weight:700;color:rgb(${borde})}
ul{display:flex;flex-wrap:wrap;gap:14px;margin-top:36px;list-style:none}
li{padding:12px 22px;border:2px solid rgba(243,244,246,.2);border-radius:999px;font-size:24px}
.foto{width:500px;height:630px;object-fit:cover;object-position:50% 30%}
.marco{align-self:center;width:560px;margin-right:56px;border:2px solid rgba(${borde},.55);border-radius:20px;overflow:hidden}
.marco img{display:block;width:100%;aspect-ratio:16/10;object-fit:cover}
</style><div class="texto"><div class="barra"></div><h1>${escapar(titulo)}</h1><p>${escapar(texto)}</p>${chips ? `<ul>${chips.map((c) => `<li>${escapar(c)}</li>`).join('')}</ul>` : ''}<div class="pie">${escapar(pie)}</div></div>${lateral}`;
}

const temporal = mkdtempSync(join(tmpdir(), 'og-'));
mkdirSync(resolve(raiz, 'assets/og'), { recursive: true });
try {
    for (const tarjeta of tarjetas) {
        const pagina = join(temporal, `${tarjeta.archivo}.html`);
        const png = join(temporal, `${tarjeta.archivo}.png`);
        const salida = resolve(raiz, `assets/og/${tarjeta.archivo}.jpg`);
        writeFileSync(pagina, html(tarjeta));
        execFileSync(CHROME, ['--headless=new', '--disable-gpu', '--hide-scrollbars', '--force-device-scale-factor=1',
            `--user-data-dir=${join(temporal, 'perfil')}`, '--window-size=1200,630', '--virtual-time-budget=4000',
            `--screenshot=${png}`, pathToFileURL(pagina).href], { stdio: 'ignore', timeout: 60000 });
        execFileSync('ffmpeg', ['-v', 'error', '-y', '-i', png, '-q:v', '3', salida]);
        console.log(`✔ assets/og/${tarjeta.archivo}.jpg (${Math.round(statSync(salida).size / 1024)} KB)`);
    }
} finally {
    rmSync(temporal, { recursive: true, force: true, maxRetries: 5, retryDelay: 300 });
}
