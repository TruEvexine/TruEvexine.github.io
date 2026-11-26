// Interfaz del cotizador. No guarda nada ni envía datos a ningún servidor:
// arma el mensaje en el dispositivo del visitante y él decide si lo envía.
// Todo texto o dato se inserta con textContent, nunca como HTML.
import { PRECIOS, IVA_PORCENTAJE, VIGENCIA_DIAS } from './precios.js';
import { CORREO, WHATSAPP, SITIO } from './contacto.js';
import {
    calcular, recomendar, formatoMoneda, limpiarTexto, generarFolio,
    armarMensaje, enlaceWhatsApp, enlaceCorreo, nombreConcepto, MODULOS,
    enlaceCotizacion, leerEnlaceCotizacion, EXTRAS_ENLACE,
} from './cotizador-calc.js';

const $ = (selector) => document.querySelector(selector);
const form = $('#quote-form');
const panelResultado = $('#quote-result');

let ultimo = null;          // { seleccion, resultado, datos } de la última cotización
let paqueteElegidoAMano = false;
let folio = null;
let recuperada = null;      // { folio, fecha } si se abrió desde un enlace de cotización

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

// ---------- Precios en la página (siempre vienen de precios.js) ----------
function pintarPrecios() {
    document.querySelectorAll('[data-price]').forEach((el) => {
        el.textContent = formatoMoneda(precioDe(el.dataset.price));
    });
    pintarPrecioCuidado();
}

function leerSeleccion() {
    const dato = new FormData(form);
    return {
        paquete: dato.get('paquete') ?? 'profesional',
        negocio: dato.get('negocio') ?? '',
        cuidado: dato.has('cuidado'),
        cuidadoPlus: dato.has('cuidadoPlus'),
        modulos: Object.fromEntries(Object.keys(MODULOS).map((clave) => [clave, dato.has(`modulo-${clave}`)])),
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
    el.textContent = paquete === 'medida' ? '' : formatoMoneda(PRECIOS.cuidadoMensual[paquete]);
}

// Según el paquete, algunos extras ya vienen incluidos (data-included-in) o no aplican (data-not-in)
function ajustarExtras() {
    const { paquete } = leerSeleccion();
    const aMedida = paquete === 'medida';
    const extrasStep = $('#extras-step');
    document.querySelectorAll('[data-included-in], [data-not-in]').forEach((extra) => {
        const incluido = extra.dataset.includedIn?.split(' ').includes(paquete) ?? false;
        const noAplica = extra.dataset.notIn?.split(' ').includes(paquete) ?? false;
        const input = extra.querySelector('input');
        extra.hidden = noAplica;
        extra.classList.toggle('is-included', incluido);
        input.disabled = incluido || noAplica;
        if (incluido || noAplica) input.checked = false;
        extra.querySelector('.extra-price').hidden = incluido;
        const aviso = extra.querySelector('.extra-included');
        if (aviso) aviso.hidden = !incluido;
    });
    extrasStep.disabled = aMedida;
    extrasStep.querySelector('.quote-extras-disabled').hidden = !aMedida;
    extrasStep.querySelector('[name="cuidado"]').closest('.extra').querySelector('.extra-price').hidden = aMedida;
    pintarPrecioCuidado();
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

// ---------- Total en vivo ----------
function pintarTotalEnVivo() {
    const resultado = calcular(leerSeleccion());
    const parte = (etiqueta, centavos, sufijo = '') => {
        const caja = document.createElement('span');
        const monto = document.createElement('strong');
        monto.textContent = formatoMoneda(centavos);
        caja.append(`${etiqueta} `, monto, sufijo && ` ${sufijo}`);
        return caja;
    };
    const partes = resultado.aMedida
        ? [parte(texto('quote.custom.from'), resultado.desdeMonto.base)]
        : [parte(texto('quote.result.once'), resultado.unico.base)];
    if (!resultado.aMedida && resultado.mensual.base > 0) partes.push(parte(texto('quote.result.monthly'), resultado.mensual.base));
    const nota = document.createElement('small');
    nota.textContent = texto('quote.vatExtra');
    $('.quote-running').replaceChildren(...partes, nota);
}

// ---------- Resultado ----------
function leerDatos() {
    return {
        negocio: new FormData(form).get('negocio') ?? '',
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
        : `${formatoMoneda(l.base)}${l.periodo === 'mensual' ? ` ${texto('quote.perMonth')}` : ''}`;
    item.append(nombre, precio);
    return item;
}

// Los precios van sin IVA; esta nota dice cuánto sería si piden factura
function notaFactura({ total }) {
    return `${texto('quote.result.withInvoice', { iva: IVA_PORCENTAJE })} ${formatoMoneda(total)}`;
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
    $('#result-folio').textContent = `${texto('quote.result.folio')}: ${folio}`;
    $('#result-restored').hidden = !recuperada;
    if (recuperada) $('#result-restored').textContent = texto('quote.result.restored', { fecha: recuperada.fecha });

    $('#result-totals').hidden = resultado.aMedida;
    $('#result-detail').hidden = resultado.aMedida;
    $('#result-custom').hidden = !resultado.aMedida;

    if (resultado.aMedida) {
        $('#total-from').textContent = formatoMoneda(resultado.desdeMonto.base);
        $('#note-from').textContent = `${texto('quote.custom.basePackage')} ${texto(`quote.pkg.${resultado.desde}`)} · ${notaFactura(resultado.desdeMonto)}`;
        $('#total-hour').textContent = formatoMoneda(resultado.hora.base);
        return;
    }

    $('#total-once').textContent = formatoMoneda(resultado.unico.base);
    $('#note-once').textContent = `${texto('quote.vatExtra')} · ${notaFactura(resultado.unico)}`;
    const hayMensual = resultado.mensual.base > 0;
    $('#total-monthly').textContent = hayMensual ? formatoMoneda(resultado.mensual.base) : '—';
    $('#note-monthly').textContent = hayMensual
        ? `${texto('quote.vatExtra')} · ${notaFactura(resultado.mensual)}`
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

function mostrarResultado(desdeEnlace = null) {
    const seleccion = leerSeleccion();
    const resultado = calcular(seleccion);
    recuperada = desdeEnlace;
    folio = desdeEnlace?.folio ?? nuevoFolio();
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
    recuperada = null;
    // Si se llegó desde un enlace, se quita de la dirección para que recargar no lo vuelva a aplicar
    if (leerEnlaceCotizacion(location.hash)) history.replaceState(history.state, '', location.pathname + location.search);
    ajustarExtras();
    pintarTotalEnVivo();
    volverAlFormulario();
}

async function copiar(contenido, selectorEtiqueta, claveNormal) {
    const etiqueta = $(selectorEtiqueta);
    try {
        await navigator.clipboard.writeText(contenido);
    } catch {
        window.prompt('', contenido); // navegadores sin acceso al portapapeles
        return;
    }
    const boton = etiqueta.closest('button');
    etiqueta.textContent = texto('quote.next.copied');
    boton.classList.add('is-copied');
    clearTimeout(etiqueta.timer);
    etiqueta.timer = setTimeout(() => {
        etiqueta.textContent = texto(claveNormal);
        boton.classList.remove('is-copied');
    }, 2000);
}

const copiarResumen = () => copiar(mensajeActual(), '#action-copy-label', 'quote.next.copy');
const copiarEnlace = () => copiar(enlaceCotizacion(ultimo.seleccion, folio), '#action-link-label', 'quote.next.link');

// ---------- Cotización recibida por enlace ----------
// Se marcan las opciones y se calcula con los precios actuales
function abrirDesdeEnlace() {
    const guardada = leerEnlaceCotizacion(location.hash);
    if (!guardada) return;
    form.reset();
    const radio = (nombre, valor) => form.querySelector(`input[name="${nombre}"][value="${valor}"]`);
    if (guardada.negocio) radio('negocio', guardada.negocio).checked = true;
    radio('paquete', guardada.paquete).checked = true;
    paqueteElegidoAMano = true;
    marcarRecomendado(guardada.negocio ? recomendar(guardada.negocio) : '');
    ajustarExtras();
    for (const extra of EXTRAS_ENLACE) {
        const control = form.elements[extra];
        if (!control.disabled) control.checked = guardada.extras.includes(extra);
    }
    pintarTotalEnVivo();
    mostrarResultado(guardada);
}

// ---------- Datos estructurados: las ofertas salen de precios.js ----------
function agregarOfertasSeo() {
    const oferta = (nombre, centavos) => ({
        '@type': 'Offer',
        name: nombre,
        priceCurrency: 'MXN',
        priceSpecification: {
            '@type': 'UnitPriceSpecification',
            price: (centavos / 100).toFixed(2),
            priceCurrency: 'MXN',
            valueAddedTaxIncluded: false,
        },
    });
    const datos = {
        '@context': 'https://schema.org',
        '@type': 'OfferCatalog',
        name: 'Paquetes de páginas web',
        url: `${SITIO}/cotizar`,
        itemListElement: ['esencial', 'profesional', 'especializado'].map((p) =>
            oferta(nombreConcepto(`paquete.${p}`), PRECIOS.paquetes[p])),
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
        } else if ((name === 'cuidado' || name === 'cuidadoPlus') && evento.target.checked) {
            form.elements[name === 'cuidado' ? 'cuidadoPlus' : 'cuidado'].checked = false; // uno u otro
        }
        pintarTotalEnVivo();
    });
    pintarTotalEnVivo();

    form.addEventListener('submit', (evento) => {
        evento.preventDefault();
        mostrarResultado();
    });
    $('#action-link').addEventListener('click', copiarEnlace);
    $('#action-print').addEventListener('click', () => window.print()); // el navegador ofrece «Guardar como PDF»

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
        pintarTotalEnVivo();
        pintarResultado();
    });
}

document.addEventListener('DOMContentLoaded', () => {
    iniciar();
    abrirDesdeEnlace();
    window.addEventListener('hashchange', abrirDesdeEnlace); // pegar otro enlace en la misma pestaña
});
