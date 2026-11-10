// Cálculo del cotizador: funciones puras, sin DOM, para poder probarlas con node:test.
import { PRECIOS, IVA_PORCENTAJE, VIGENCIA_DIAS } from './precios.js';
import { SITIO } from './contacto.js';

export const PAQUETES = ['esencial', 'profesional', 'especializado', 'medida'];

// Paquete que se recomienda según el tipo de negocio
const RECOMENDADO = {
    barberia: 'especializado',
    consultorio: 'especializado',
    restaurante: 'profesional',
    comercio: 'profesional',
    servicios: 'esencial',
    otro: 'profesional',
};

// Nombres que lee Rogelio en el mensaje (siempre en español, sin importar el idioma del visitante)
const NOMBRES = {
    negocio: {
        barberia: 'Barbería o salón',
        consultorio: 'Consultorio o salud',
        restaurante: 'Restaurante o cafetería',
        comercio: 'Tienda o comercio',
        servicios: 'Servicios u oficios',
        otro: 'Otro tipo de negocio',
    },
    concepto: {
        paquete: { esencial: 'Paquete Esencial', profesional: 'Paquete Profesional', especializado: 'Paquete Especializado' },
        cuidado: { esencial: 'Cuidado mensual Esencial', profesional: 'Cuidado mensual Profesional', especializado: 'Cuidado mensual Agenda' },
        seoArranque: 'SEO local, arranque',
        seoContinuo: 'SEO continuo',
        whatsappInstalacion: 'WhatsApp automático: instalación',
        whatsappCuota: 'WhatsApp automático: cuota mensual',
        kitNfc: 'Kit NFC y QR Local',
        kitNfcIncluido: 'Kit NFC y QR Local básico (incluido)',
    },
};

export function recomendar(negocio) {
    return RECOMENDADO[negocio] ?? 'profesional';
}

// Suma el IVA a un monto en centavos
export function aplicarIva(base) {
    const iva = Math.round((base * IVA_PORCENTAJE) / 100);
    return { base, iva, total: base + iva };
}

function linea(id, periodo, base, extra = {}) {
    return { id, periodo, base, total: aplicarIva(base).total, ...extra };
}

// seleccion: { paquete, cuidado, seoArranque, seoContinuo, whatsapp, kitNfc }
export function calcular(seleccion) {
    const { paquete } = seleccion;
    if (!PAQUETES.includes(paquete)) throw new Error(`Paquete desconocido: ${paquete}`);

    // Fuera de los paquetes no se calcula: se cotiza por hora
    if (paquete === 'medida') {
        return { aMedida: true, hora: aplicarIva(PRECIOS.horaDesarrollo), lineas: [], unico: null, mensual: null };
    }

    const lineas = [linea(`paquete.${paquete}`, 'unico', PRECIOS.paquetes[paquete])];
    if (seleccion.seoArranque) lineas.push(linea('seoArranque', 'unico', PRECIOS.seoArranque));
    if (seleccion.whatsapp) lineas.push(linea('whatsappInstalacion', 'unico', PRECIOS.whatsappInstalacion));
    if (paquete === 'especializado') {
        lineas.push(linea('kitNfcIncluido', 'unico', 0, { incluido: true }));
    } else if (seleccion.kitNfc) {
        lineas.push(linea('kitNfc', 'unico', PRECIOS.kitNfc));
    }

    if (seleccion.cuidado) lineas.push(linea(`cuidado.${paquete}`, 'mensual', PRECIOS.cuidadoMensual[paquete]));
    if (seleccion.seoContinuo) lineas.push(linea('seoContinuo', 'mensual', PRECIOS.seoContinuo));
    if (seleccion.whatsapp) lineas.push(linea('whatsappCuota', 'mensual', PRECIOS.whatsappCuota));

    const suma = (periodo) => lineas.filter((l) => l.periodo === periodo).reduce((acc, l) => acc + l.base, 0);
    return {
        aMedida: false,
        lineas,
        unico: aplicarIva(suma('unico')),
        mensual: aplicarIva(suma('mensual')),
    };
}

// Monto en pesos mexicanos, sin decimales si es redondo
export function formatoMoneda(centavos) {
    const entero = centavos % 100 === 0;
    return new Intl.NumberFormat('es-MX', {
        style: 'currency',
        currency: 'MXN',
        minimumFractionDigits: entero ? 0 : 2,
        maximumFractionDigits: 2,
    }).format(centavos / 100);
}

// Quita caracteres de control, junta espacios y limita el largo de lo que escribe el visitante
export function limpiarTexto(texto, max) {
    return String(texto ?? '')
        .replace(/[\u0000-\u001F\u007F]/g, ' ')
        .replace(/\s+/g, ' ')
        .trim()
        .slice(0, max);
}

// COT-261019-K7QF: fecha + 4 caracteres para que Rogelio ubique cada mensaje
export function generarFolio(fecha, aleatorio) {
    const yy = String(fecha.getFullYear()).slice(-2);
    const mm = String(fecha.getMonth() + 1).padStart(2, '0');
    const dd = String(fecha.getDate()).padStart(2, '0');
    return `COT-${yy}${mm}${dd}-${aleatorio}`;
}

export function nombreConcepto(id) {
    const [grupo, clave] = id.split('.');
    return clave ? NOMBRES.concepto[grupo][clave] : NOMBRES.concepto[id];
}

// datos: { negocio, nombre, empresa, ciudad, nota }  (todo opcional salvo negocio)
export function armarMensaje({ folio, seleccion, resultado, datos, idioma }) {
    const filas = [`Hola Rogelio, quiero una cotización formal. (Folio ${folio})`, ''];
    filas.push(`Tipo de negocio: ${NOMBRES.negocio[datos.negocio] ?? NOMBRES.negocio.otro}`);

    if (resultado.aMedida) {
        filas.push('Proyecto: a la medida (se cotiza por hora).');
        filas.push(`Tarifa de referencia: ${formatoMoneda(resultado.hora.total)} por hora, IVA incluido.`);
    } else {
        filas.push('', 'Lo que elegí:');
        for (const l of resultado.lineas) {
            const precio = l.incluido ? 'incluido' : `${formatoMoneda(l.total)}${l.periodo === 'mensual' ? ' al mes' : ''}`;
            filas.push(`- ${nombreConcepto(l.id)}: ${precio}`);
        }
        filas.push('', `Pago único: ${formatoMoneda(resultado.unico.total)} (IVA incluido)`);
        if (resultado.mensual.base > 0) filas.push(`Mensualidad: ${formatoMoneda(resultado.mensual.total)} (IVA incluido)`);
    }

    const contacto = [];
    if (datos.nombre) contacto.push(`Nombre: ${datos.nombre}`);
    if (datos.empresa) contacto.push(`Negocio: ${datos.empresa}`);
    if (datos.ciudad) contacto.push(`Ciudad: ${datos.ciudad}`);
    if (datos.nota) contacto.push(`Comentarios: ${datos.nota}`);
    if (contacto.length) filas.push('', ...contacto);

    filas.push('', `Estimado informativo de ${SITIO.replace('https://', '')}/cotizar, vigencia ${VIGENCIA_DIAS} días. Idioma del visitante: ${idioma === 'en' ? 'inglés' : 'español'}.`);
    return filas.join('\n');
}

export function enlaceWhatsApp(numero, mensaje) {
    return `https://wa.me/${numero}?text=${encodeURIComponent(mensaje)}`;
}

export function enlaceCorreo(correo, asunto, mensaje) {
    return `mailto:${correo}?subject=${encodeURIComponent(asunto)}&body=${encodeURIComponent(mensaje)}`;
}
