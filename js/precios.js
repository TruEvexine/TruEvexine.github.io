// Precios del cotizador: ÚNICO lugar donde se cambian.
// Todo en centavos enteros, SIN IVA. El cotizador suma el IVA y lo muestra incluido.
// Precios de lista iniciales (docs/PLAN-COTIZADOR.md); se ajustan con las primeras visitas.

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
        profesional: 85000,
        especializado: 150000,
    },
    seoArranque: 250000,        // único
    seoContinuo: 150000,        // mensual
    whatsappInstalacion: 350000, // único
    whatsappCuota: 60000,       // mensual; los mensajes los paga el cliente a Meta
    kitNfc: 140000,             // único; el Básico va incluido en Especializado
    horaDesarrollo: 40000,      // proyectos a la medida: se cotiza por hora
};

export const VIGENCIA_DIAS = 15;
