// Precios del cotizador: ÚNICO lugar donde se cambian.
// Todo en centavos enteros, SIN IVA. El cotizador muestra el precio sin IVA y, aparte, el total si piden factura (+IVA).
// Precios de lista (docs/PLAN-COTIZADOR.md y guía de prospección de nov 2026); se ajustan con las primeras visitas.

export const IVA_PORCENTAJE = 16;

export const PRECIOS = {
    // Pago único por paquete
    paquetes: {
        esencial: 550000,
        profesional: 950000,
        especializado: 2200000,
    },
    // Cuidado mensual (hosting, cambios menores, soporte) según el paquete
    cuidadoMensual: {
        esencial: 45000,
        profesional: 45000,
        especializado: 150000,
    },
    cuidadoPlus: 85000,         // mensual; 2 cambios al mes y reporte de visitas. Reemplaza al cuidado; no aplica a Premium
    // Módulos sueltos (pago único). Calendario, formulario y SEO básico ya vienen en Profesional y Premium.
    modulos: {
        calendario: 200000,
        formulario: 150000,
        seoBasico: 80000,
        animacionLogo: 120000,
        menuHtml: 180000,
        menuAnimado: 170000,
        interactivo: 200000,     // desde: quiz, generador o combo propio de la marca
        pedidoWhatsapp: 280000,  // carrito: arma el pedido y abre WhatsApp con el texto listo
        catalogo: 240000,        // desde: filtros por talla, look o categoría; depende del número de productos
        sucursales: 80000,       // varias sucursales con horario y "abierto ahora"
    },
    seoArranque: 250000,        // único
    seoContinuo: 150000,        // mensual
    whatsappInstalacion: 350000, // único
    whatsappCuota: 60000,       // mensual; los mensajes los paga el cliente a Meta
    kitNfc: 140000,             // único; el Básico va incluido en Especializado
    horaDesarrollo: 40000,      // proyectos a la medida: se cotiza por hora
};

export const VIGENCIA_DIAS = 15;
