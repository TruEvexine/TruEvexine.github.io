import { test } from 'node:test';
import assert from 'node:assert/strict';
import { PRECIOS } from '../../js/precios.js';
import {
    aplicarIva, calcular, recomendar, MODULOS, formatoMoneda, limpiarTexto,
    generarFolio, armarMensaje, enlaceWhatsApp, enlaceCorreo,
} from '../../js/cotizador-calc.js';

const sinExtras = { cuidado: false, seoArranque: false, seoContinuo: false, whatsapp: false, kitNfc: false };

test('el IVA se suma a los precios de lista (tabla del plan)', () => {
    assert.equal(aplicarIva(PRECIOS.paquetes.esencial).total, 638000);
    assert.equal(aplicarIva(PRECIOS.paquetes.profesional).total, 1102000);
    assert.equal(aplicarIva(PRECIOS.paquetes.especializado).total, 2552000);
    assert.equal(aplicarIva(PRECIOS.horaDesarrollo).total, 46400);
});

test('el IVA se redondea al centavo', () => {
    assert.deepEqual(aplicarIva(1), { base: 1, iva: 0, total: 1 });
    assert.deepEqual(aplicarIva(33), { base: 33, iva: 5, total: 38 }); // 5.28 → 5
    assert.deepEqual(aplicarIva(34), { base: 34, iva: 5, total: 39 }); // 5.44 → 5
    assert.deepEqual(aplicarIva(125), { base: 125, iva: 20, total: 145 });
});

for (const paquete of ['esencial', 'profesional', 'especializado']) {
    test(`paquete ${paquete} solo, con IVA`, () => {
        const r = calcular({ paquete, ...sinExtras });
        assert.equal(r.unico.base, PRECIOS.paquetes[paquete]);
        assert.equal(r.unico.total, aplicarIva(PRECIOS.paquetes[paquete]).total);
        assert.equal(r.mensual.base, 0);
    });
}

test('cuidado mensual: $450 en Esencial y Profesional, más en Control Total', () => {
    assert.equal(calcular({ paquete: 'esencial', ...sinExtras, cuidado: true }).mensual.total, 52200);
    assert.equal(calcular({ paquete: 'profesional', ...sinExtras, cuidado: true }).mensual.total, 52200);
    assert.equal(calcular({ paquete: 'especializado', ...sinExtras, cuidado: true }).mensual.total, 174000);
});

test('cada extra suma en su periodo', () => {
    const base = { paquete: 'esencial', ...sinExtras };
    assert.equal(calcular({ ...base, seoArranque: true }).unico.total, 638000 + 290000);
    assert.equal(calcular({ ...base, kitNfc: true }).unico.total, 638000 + 162400);
    assert.equal(calcular({ ...base, seoContinuo: true }).mensual.total, 174000);
    const wa = calcular({ ...base, whatsapp: true });
    assert.equal(wa.unico.total, 638000 + 406000);
    assert.equal(wa.mensual.total, 69600);
});

test('Cuidado Plus reemplaza al cuidado normal y no aplica a Control Total', () => {
    const plus = calcular({ paquete: 'profesional', ...sinExtras, cuidado: true, cuidadoPlus: true });
    assert.equal(plus.mensual.base, PRECIOS.cuidadoPlus);
    assert.equal(plus.lineas.filter((l) => l.periodo === 'mensual').length, 1);
    const premium = calcular({ paquete: 'especializado', ...sinExtras, cuidadoPlus: true });
    assert.equal(premium.mensual.base, 0);
});

test('los módulos suman al Esencial y los incluidos no se cobran en Profesional', () => {
    const todos = Object.fromEntries(Object.keys(MODULOS).map((m) => [m, true]));
    const esencial = calcular({ paquete: 'esencial', ...sinExtras, modulos: todos });
    const suma = Object.values(PRECIOS.modulos).reduce((a, n) => a + n, 0);
    assert.equal(esencial.unico.base, PRECIOS.paquetes.esencial + suma);
    const profesional = calcular({ paquete: 'profesional', ...sinExtras, modulos: todos });
    const incluidos = ['calendario', 'formulario', 'seoBasico'].reduce((a, m) => a + PRECIOS.modulos[m], 0);
    assert.equal(profesional.unico.base, PRECIOS.paquetes.profesional + suma - incluidos);
    assert.ok(!profesional.lineas.some((l) => l.id === 'modulo.calendario'));
    assert.ok(profesional.lineas.some((l) => l.id === 'modulo.animacionLogo'));
});

test('Profesional cuesta menos que Esencial + sus tres módulos sueltos', () => {
    const sueltos = PRECIOS.paquetes.esencial + ['calendario', 'formulario', 'seoBasico'].reduce((a, m) => a + PRECIOS.modulos[m], 0);
    assert.ok(PRECIOS.paquetes.profesional < sueltos);
});

test('Especializado incluye el kit NFC básico y no lo cobra', () => {
    const r = calcular({ paquete: 'especializado', ...sinExtras, kitNfc: true });
    assert.equal(r.unico.base, PRECIOS.paquetes.especializado);
    assert.ok(r.lineas.some((l) => l.id === 'kitNfcIncluido' && l.incluido));
});

test('con todo elegido, el total coincide con la suma de las líneas', () => {
    const r = calcular({ paquete: 'profesional', cuidado: true, seoArranque: true, seoContinuo: true, whatsapp: true, kitNfc: true });
    const unico = r.lineas.filter((l) => l.periodo === 'unico').reduce((a, l) => a + l.total, 0);
    const mensual = r.lineas.filter((l) => l.periodo === 'mensual').reduce((a, l) => a + l.total, 0);
    assert.equal(r.unico.total, unico);
    assert.equal(r.mensual.total, mensual);
});

test('a tu medida parte del paquete de su tipo de negocio y evalúa lo demás por hora', () => {
    const r = calcular({ paquete: 'medida', ...sinExtras, negocio: 'barberia', cuidado: true });
    assert.equal(r.aMedida, true);
    assert.equal(r.unico, null);
    assert.equal(r.desde, 'especializado');
    assert.equal(r.desdeMonto.base, PRECIOS.paquetes.especializado);
    assert.equal(r.hora.base, PRECIOS.horaDesarrollo);
    assert.equal(calcular({ paquete: 'medida', ...sinExtras, negocio: 'servicios' }).desdeMonto.base, PRECIOS.paquetes.esencial);
});

test('un paquete desconocido falla', () => {
    assert.throws(() => calcular({ paquete: 'gratis', ...sinExtras }));
});

test('recomendación por tipo de negocio', () => {
    assert.equal(recomendar('barberia'), 'especializado');
    assert.equal(recomendar('restaurante'), 'profesional');
    assert.equal(recomendar('servicios'), 'esencial');
    assert.equal(recomendar('inventado'), 'profesional');
});

test('formato de moneda', () => {
    assert.equal(formatoMoneda(638000), '$6,380');
    assert.equal(formatoMoneda(638050), '$6,380.50');
});

test('limpiarTexto quita saltos, controles y recorta', () => {
    assert.equal(limpiarTexto('  hola\n\n  mundo\u0000 ', 50), 'hola mundo');
    assert.equal(limpiarTexto('abcdef', 3), 'abc');
    assert.equal(limpiarTexto(null, 3), '');
});

test('folio con fecha y sufijo', () => {
    assert.equal(generarFolio(new Date(2026, 9, 19), 'K7QF'), 'COT-261019-K7QF');
});

test('el mensaje de WhatsApp trae lo elegido', () => {
    const seleccion = { paquete: 'profesional', ...sinExtras, cuidado: true, whatsapp: true };
    const resultado = calcular(seleccion);
    const msg = armarMensaje({
        folio: 'COT-261019-K7QF', seleccion, resultado, idioma: 'es',
        datos: { negocio: 'restaurante', nombre: 'Ana', empresa: 'Café Sol', ciudad: 'Morelia', nota: 'Quiero menú digital' },
    });
    for (const texto of ['COT-261019-K7QF', 'Restaurante o cafetería', 'Paquete Profesional', 'Cuidado mensual Profesional',
        'WhatsApp automático: instalación', 'Cuidado mensual Profesional: $450 al mes', 'Pago único: $13,000 más IVA (con factura: $15,080)', 'Mensualidad: $1,050 más IVA', 'Ana', 'Café Sol', 'Morelia', 'Quiero menú digital']) {
        assert.ok(msg.includes(texto), `falta: ${texto}`);
    }
});

test('el mensaje a tu medida no inventa totales', () => {
    const seleccion = { paquete: 'medida', ...sinExtras };
    const msg = armarMensaje({ folio: 'COT-1', seleccion, resultado: calcular(seleccion), idioma: 'en', datos: { negocio: 'otro' } });
    assert.ok(msg.includes('a tu medida'));
    assert.ok(msg.includes('Paquete Profesional: $9,500 más IVA'));
    assert.ok(!msg.includes('Pago único'));
    assert.ok(msg.includes('inglés'));
});

test('los enlaces codifican el mensaje', () => {
    assert.equal(enlaceWhatsApp('5211', 'hola & adiós\nok'), 'https://wa.me/5211?text=hola%20%26%20adi%C3%B3s%0Aok');
    assert.equal(enlaceCorreo('a@b.c', 'Hola', 'x y'), 'mailto:a@b.c?subject=Hola&body=x%20y');
});
