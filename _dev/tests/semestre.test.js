import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';

// layout.js es un script de navegador: se toma solo el bloque del semestre
const fuente = readFileSync(resolve(import.meta.dirname, '../../js/layout.js'), 'utf8');
const bloque = fuente.slice(fuente.indexOf('// semestre:inicio'), fuente.indexOf('// semestre:fin'));
const semestreEnCurso = new Function(`${bloque}; return semestreEnCurso;`)();

test('el semestre sube cada 6 meses desde agosto de 2026; tras el 9.º queda concluida (10)', () => {
    assert.equal(semestreEnCurso(new Date(2026, 7, 1)), 5);
    assert.equal(semestreEnCurso(new Date(2027, 0, 31)), 5);
    assert.equal(semestreEnCurso(new Date(2027, 1, 1)), 6);
    assert.equal(semestreEnCurso(new Date(2027, 7, 1)), 7);
    assert.equal(semestreEnCurso(new Date(2028, 1, 1)), 8);
    assert.equal(semestreEnCurso(new Date(2028, 7, 1)), 9);
    assert.equal(semestreEnCurso(new Date(2029, 0, 31)), 9);
    assert.equal(semestreEnCurso(new Date(2029, 1, 1)), 10);
    assert.equal(semestreEnCurso(new Date(2031, 0, 1)), 10);
});

test('antes de agosto de 2026 no baja del 5.º', () => {
    assert.equal(semestreEnCurso(new Date(2026, 0, 1)), 5);
});
