// La fecha del sitemap solo debe moverse cuando cambia el contenido de una página
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { huella } from '../build-sitemap.mjs';

const pagina = '<title>Contacto</title><body><main class="a"><svg><path d="M0"/></svg><p>Hola</p><a href="/cotizar">Cotiza</a></main></body>';
const cambia = (antes, despues) => huella(pagina.replace(antes, despues)) !== huella(pagina);

test('estilos, íconos y comentarios no cambian la fecha', () => {
    assert.ok(!cambia('class="a"', 'class="a b"'));
    assert.ok(!cambia('d="M0"', 'd="M1 1"'));
    assert.ok(!cambia('<p>', '<!-- nota --><p>'));
});

test('el header y el footer compartidos no cambian la fecha', () => {
    const conPie = (texto) => huella(pagina.replace('</body>', `<footer data-layout="footer"><p>${texto}</p></footer></body>`));
    assert.equal(conPie('uno'), conPie('dos'));
});

test('texto, enlaces y título sí cambian la fecha', () => {
    assert.ok(cambia('>Hola<', '>Adiós<'));
    assert.ok(cambia('href="/cotizar"', 'href="/contacto"'));
    assert.ok(cambia('>Contacto<', '>Otro título<'));
});
