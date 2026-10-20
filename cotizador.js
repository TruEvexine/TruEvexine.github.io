// Interfaz del cotizador. No guarda nada ni envía datos a ningún servidor:
// arma el mensaje en el dispositivo del visitante y él decide si lo envía.
// Todo texto o dato se inserta con textContent, nunca como HTML.
import { PRECIOS, IVA_PORCENTAJE, VIGENCIA_DIAS } from './precios.js';
import { CORREO, WHATSAPP, SITIO } from './contacto.js';
import {
    calcular, recomendar, formatoMoneda, aplicarIva, limpiarTexto, generarFolio,
    armarMensaje, enlaceWhatsApp, enlaceCorreo,
} from './cotizador-calc.js';

const $ = (selector) => document.querySelector(selector);
const form = $('#quote-form');
const panelResultado = $('#quote-result');

let ultimo = null;          // { seleccion, resultado, datos } de la última cotización
let paqueteElegidoAMano = false;
let folio = null;

const idioma = () => (document.documentElement.lang === 'en' ? 'en' : 'es');

function texto(clave, marcas = {}) {
    const diccionario = window.translations[idioma()];
    let valor = diccionario[clave] ?? clave;
    for (const [nombre, dato] of Object.entries(marcas)) valor = valor.replaceAll(`{${nombre}}`, dato);
    return valor;
}

// "paquetes.esencial" → PRECIOS.paquetes.esencial
function precioDe(ruta) {
    return ruta.split('.').reduce((nodo, clave) => nodo[clave], PRECIOS);
}

function precioConIva(centavos) {
    return formatoMoneda(aplicarIva(centavos).total);
}

// ---------- Precios en la página (siempre vienen de precios.js) ----------
function pintarPrecios() {
    document.querySelectorAll('[data-price]').forEach((el) => {
        el.textContent = precioConIva(precioDe(el.dataset.price));
    });
    pintarPrecioCuidado();
}

function leerSeleccion() {
    const dato = new FormData(form);
    return {
        paquete: dato.get('paquete') ?? 'profesional',
        cuidado: dato.has('cuidado'),
        seoArranque: dato.has('seoArranque'),
        seoContinuo: dato.has('seoContinuo'),
        whatsapp: dato.has('whatsapp'),
        kitNfc: dato.has('kitNfc'),
    };
}

// El cuidado mensual cuesta distinto según el paquete elegido
function pintarPrecioCuidado() {
    const paquete = leerSeleccion().paquete;
    const el = $('[data-price-cuidado]');
    el.textContent = paquete === 'medida' ? '' : precioConIva(PRECIOS.cuidadoMensual[paquete]);
}

// Según el paquete, algunos extras no aplican o ya vienen incluidos
function ajustarExtras() {
    const { paquete } = leerSeleccion();
    const kit = $('#extra-kit');
    const incluido = paquete === 'especializado';
    const input = kit.querySelector('input');
    kit.classList.toggle('is-included', incluido);
    input.disabled = incluido;
    if (incluido) input.checked = false;
    kit.querySelector('.extra-price').replaceChildren(...(incluido ? [textoIncluido()] : precioKit()));
    $('#extras-step').disabled = paquete === 'medida';
    pintarPrecioCuidado();
}

function textoIncluido() {
    const aviso = document.createElement('span');
    aviso.textContent = texto('quote.extra.kitNfcIncluded');
    return aviso;
}

function precioKit() {
    const monto = document.createElement('span');
    monto.dataset.price = 'kitNfc';
    monto.textContent = precioConIva(PRECIOS.kitNfc);
    const nota = document.createElement('span');
    nota.className = 'choice-note';
    nota.textContent = ` ${texto('quote.once')}`;
    return [monto, nota];
}

function marcarRecomendado(paquete) {
    document.querySelectorAll('[data-tag]').forEach((tag) => {
        tag.hidden = tag.dataset.tag !== paquete;
    });
}

function elegirPaquete(paquete) {
    const radio = form.querySelector(`input[name="paquete"][value="${paquete}"]`);
    if (radio) radio.checked = true;
    ajustarExtras();
}

// ---------- Resultado ----------
function leerDatos() {
    return {
        negocio: new FormData(form).get('negocio') ?? 'otro',
        nombre: limpiarTexto($('#field-name').value, 60),
        empresa: limpiarTexto($('#field-business').value, 80),
        ciudad: limpiarTexto($('#field-city').value, 60),
        nota: limpiarTexto($('#field-note').value, 300),
    };
}

function lineaDelResultado(l) {
    const item = document.createElement('li');
    const nombre = document.createElement('span');
    nombre.textContent = texto(`quote.line.${l.id}`);
    const precio = document.createElement('span');
    precio.className = 'line-price';
    precio.textContent = l.incluido
        ? texto('quote.included')
        : `${formatoMoneda(l.total)}${l.periodo === 'mensual' ? ` ${texto('quote.perMonth')}` : ''}`;
    item.append(nombre, precio);
    return item;
}

function desglose({ base, iva }) {
    return `${texto('quote.result.subtotal')} ${formatoMoneda(base)} + ${texto('quote.result.vat', { iva: IVA_PORCENTAJE })} ${formatoMoneda(iva)}`;
}

// Textos con marcas ({dias}) que no pueden ir directo en data-i18n
function pintarTextosConMarcas() {
    $('#faq-validity').textContent = texto('quote.faq.a2', { dias: VIGENCIA_DIAS });
}

function pintarResultado() {
    if (!ultimo) return;
    const { seleccion, resultado } = ultimo;

    $('#result-package').textContent = `${texto('quote.result.package')}: ${texto(`quote.pkg.${seleccion.paquete}`)}`;
    $('#result-legend').textContent = texto('quote.legend', { dias: VIGENCIA_DIAS });

    $('#result-totals').hidden = resultado.aMedida;
    $('#result-detail').hidden = resultado.aMedida;
    $('#result-custom').hidden = !resultado.aMedida;

    if (resultado.aMedida) {
        $('#total-hour').textContent = formatoMoneda(resultado.hora.total);
        return;
    }

    $('#total-once').textContent = formatoMoneda(resultado.unico.total);
    $('#note-once').textContent = `${texto('quote.vatIncluded')} · ${desglose(resultado.unico)}`;
    const hayMensual = resultado.mensual.base > 0;
    $('#total-monthly').textContent = hayMensual ? formatoMoneda(resultado.mensual.total) : '—';
    $('#note-monthly').textContent = hayMensual
        ? `${texto('quote.vatIncluded')} · ${desglose(resultado.mensual)}`
        : texto('quote.result.none');
    $('#result-lines').replaceChildren(...resultado.lineas.map(lineaDelResultado));
    pulsarTotales();
}

// Un pulso corto en los totales cuando cambian (CSS lo apaga con prefers-reduced-motion)
function pulsarTotales() {
    document.querySelectorAll('.quote-total-value').forEach((el) => {
        el.classList.remove('is-updated');
        void el.offsetWidth; // reinicia la animación
        el.classList.add('is-updated');
    });
}

function mensajeActual() {
    ultimo.datos = leerDatos();
    return armarMensaje({ folio, ...ultimo, idioma: idioma() });
}

function prepararEnlaces() {
    const mensaje = mensajeActual();
    $('#action-whatsapp').href = enlaceWhatsApp(WHATSAPP, mensaje);
    $('#action-email').href = enlaceCorreo(CORREO, `${texto('quote.email.subject')} ${folio}`, mensaje);
}

function nuevoFolio() {
    const letras = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
    const azar = crypto.getRandomValues(new Uint8Array(4));
    return generarFolio(new Date(), Array.from(azar, (n) => letras[n % letras.length]).join(''));
}

function mostrarResultado() {
    const seleccion = leerSeleccion();
    const resultado = calcular(seleccion);
    folio = nuevoFolio();
    ultimo = { seleccion, resultado, datos: leerDatos() };
    pintarResultado();
    prepararEnlaces();
    form.hidden = true;
    panelResultado.hidden = false;
    panelResultado.focus();
    panelResultado.scrollIntoView({ behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth' });
}

function volverAlFormulario() {
    panelResultado.hidden = true;
    form.hidden = false;
    form.scrollIntoView();
    form.querySelector('input:checked')?.focus();
}

function empezarDeCero() {
    form.reset();
    paqueteElegidoAMano = false;
    marcarRecomendado('');
    ['#field-name', '#field-business', '#field-city', '#field-note'].forEach((id) => { $(id).value = ''; });
    ultimo = null;
    ajustarExtras();
    volverAlFormulario();
}

async function copiarResumen() {
    const mensaje = mensajeActual();
    const etiqueta = $('#action-copy-label');
    try {
        await navigator.clipboard.writeText(mensaje);
    } catch {
        window.prompt('', mensaje); // navegadores sin acceso al portapapeles
        return;
    }
    const boton = etiqueta.closest('button');
    etiqueta.textContent = texto('quote.next.copied');
    boton.classList.add('is-copied');
    clearTimeout(etiqueta.timer);
    etiqueta.timer = setTimeout(() => {
        etiqueta.textContent = texto('quote.next.copy');
        boton.classList.remove('is-copied');
    }, 2000);
}

// ---------- Datos estructurados: las ofertas salen de precios.js ----------
function agregarOfertasSeo() {
    const oferta = (nombre, centavos) => ({
        '@type': 'Offer',
        name: nombre,
        priceCurrency: 'MXN',
        priceSpecification: {
            '@type': 'UnitPriceSpecification',
            price: (aplicarIva(centavos).total / 100).toFixed(2),
            priceCurrency: 'MXN',
            valueAddedTaxIncluded: true,
        },
    });
    const datos = {
        '@context': 'https://schema.org',
        '@type': 'OfferCatalog',
        name: 'Paquetes de páginas web',
        url: `${SITIO}/cotizar.html`,
        itemListElement: ['esencial', 'profesional', 'especializado'].map((p) =>
            oferta(`Paquete ${p.charAt(0).toUpperCase()}${p.slice(1)}`, PRECIOS.paquetes[p])),
    };
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.textContent = JSON.stringify(datos);
    document.head.append(script);
}

// ---------- Arranque ----------
function iniciar() {
    pintarPrecios();
    ajustarExtras();
    pintarTextosConMarcas();
    agregarOfertasSeo();

    form.addEventListener('change', (evento) => {
        const { name } = evento.target;
        if (name === 'negocio') {
            const sugerido = recomendar(evento.target.value);
            marcarRecomendado(sugerido);
            if (!paqueteElegidoAMano) elegirPaquete(sugerido);
        } else if (name === 'paquete') {
            paqueteElegidoAMano = true;
            ajustarExtras();
        }
    });

    form.addEventListener('submit', (evento) => {
        evento.preventDefault();
        mostrarResultado();
    });

    // Los datos opcionales actualizan el mensaje al momento de enviarlo
    ['#action-whatsapp', '#action-email'].forEach((id) => {
        $(id).addEventListener('click', prepararEnlaces);
        $(id).addEventListener('focus', prepararEnlaces);
        $(id).addEventListener('pointerenter', prepararEnlaces);
    });
    $('#action-copy').addEventListener('click', copiarResumen);
    $('#action-edit').addEventListener('click', volverAlFormulario);
    $('#action-reset').addEventListener('click', empezarDeCero);

    document.addEventListener('languageChanged', () => {
        ajustarExtras();
        pintarTextosConMarcas();
        pintarResultado();
    });
}

document.addEventListener('DOMContentLoaded', iniciar);
