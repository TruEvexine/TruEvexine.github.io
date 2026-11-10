// Project Miralta: Radio Miralta y panel de carga del apagón, con los textos y números del juego.
// Los textos viven en layout.js (claves pm.*); aquí solo se eligen según el idioma activo.
(() => {
    const radio = document.querySelector('.mr-radio');
    const panel = document.querySelector('.mr-panel');
    if (!radio || !panel) return;

    const t = (key) => window.translations[document.documentElement.lang === 'es' ? 'es' : 'en'][key];
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

    // ---------- Radio: 6 boletines en orden; el texto aparece letra por letra (24 ms, como en el juego) ----------
    const BOLETINES = [
        { texto: 'pm.radio1', cuando: 'pm.radioWhen1' },
        { texto: 'pm.radio2', cuando: 'pm.radioWhen1' },
        { texto: 'pm.radio3', cuando: 'pm.radioWhen1' },
        { texto: 'pm.radio4', cuando: 'pm.radioWhen2' },
        { texto: 'pm.radio5', cuando: 'pm.radioWhen2' },
        { texto: 'pm.radio6', cuando: 'pm.radioWhen3' },
    ];
    const MS_LETRA = 24;
    const texto = radio.querySelector('.mr-radio-text');
    const cuando = radio.querySelector('.mr-radio-when');
    const cuenta = radio.querySelector('.mr-radio-count');
    let actual = 0;
    let escribiendo = null;

    function completar() {
        if (!escribiendo) return;
        clearInterval(escribiendo.timer);
        texto.textContent = escribiendo.frase;
        escribiendo = null;
        radio.classList.remove('is-talking');
    }

    function sintonizar(i, animar) {
        completar();
        actual = (i + BOLETINES.length) % BOLETINES.length;
        const { texto: clave, cuando: hora } = BOLETINES[actual];
        cuando.textContent = t(hora);
        cuenta.textContent = `${actual + 1} / ${BOLETINES.length}`;
        const frase = t(clave);
        if (!animar || reduceMotion.matches) {
            texto.textContent = frase;
            return;
        }
        let n = 0;
        texto.textContent = '';
        radio.classList.add('is-talking');
        escribiendo = {
            frase,
            timer: setInterval(() => {
                n += 1;
                texto.textContent = frase.slice(0, n);
                if (n >= frase.length) completar();
            }, MS_LETRA),
        };
    }

    // Un clic mientras escribe completa la frase (como en el juego); si ya terminó, pasa al siguiente boletín
    const siguiente = () => (escribiendo ? completar() : sintonizar(actual + 1, true));
    radio.querySelector('.mr-radio-set').addEventListener('click', siguiente);
    radio.querySelector('.mr-radio-next').addEventListener('click', siguiente);
    texto.addEventListener('click', completar);

    // ---------- Panel de carga: 14 Chispas para 5 sistemas que piden 26 ----------
    const DISPONIBLE = 14;
    const DEMO_APAGA = ['purificador', 'uv'];
    const filas = [...panel.querySelectorAll('[data-sistema]')];
    const pedido = panel.querySelector('.mr-pedido');
    const confirmar = panel.querySelector('.mr-confirmar');
    const resultado = document.querySelector('.mr-resultado');
    const lirio = resultado.querySelector('.mr-lirio');
    const OFF = {
        refri: 'pm.offRefri',
        purificador: 'pm.offPurificador',
        bomba: 'pm.offBomba',
        uv: 'pm.offUv',
        computadora: 'pm.offComputadora',
    };

    const encendido = (fila) => fila.querySelector('.mr-switch').getAttribute('aria-pressed') === 'true';
    const apagados = () => filas.filter((fila) => !encendido(fila)).map((fila) => fila.dataset.sistema);

    function pintarPanel() {
        let suma = 0;
        filas.forEach((fila) => {
            const on = encendido(fila);
            if (on) suma += Number(fila.dataset.chispas);
            fila.classList.toggle('is-off', !on);
            fila.querySelector('.mr-switch').textContent = t(on ? 'pm.on' : 'pm.off');
        });
        const alcanza = suma <= DISPONIBLE;
        pedido.textContent = `${t('pm.requested')}: ${suma} / ${DISPONIBLE} ${alcanza ? '✓' : '⚠'}`;
        pedido.classList.toggle('is-over', !alcanza);
        const listo = panel.classList.contains('is-done');
        confirmar.textContent = t(listo ? 'pm.confirmed' : 'pm.confirm');
        if (!listo) confirmar.disabled = !alcanza;
    }

    function pintarResultado() {
        const off = apagados();
        const muta = off.includes('purificador'); // purificador apagado: el agua sigue turbia y el lirio muta (GUION 6.10-6.13)
        lirio.src = `/assets/project-miralta/${muta ? 'lirio-mutado' : 'lirio-sano'}.png`;
        resultado.classList.toggle('is-mutated', muta);
        resultado.querySelector('.mr-alerta').textContent = t(muta ? 'pm.resMutAlert' : 'pm.resCleanAlert');
        resultado.querySelector('.mr-res-texto').textContent = muta ? `${t('pm.resMut')} ${t('pm.resMutNote')}.` : t('pm.resClean');

        const lista = resultado.querySelector('.mr-consecuencias');
        const items = off.map((sistema) => t(OFF[sistema]));
        if (muta && !off.includes('computadora')) items.push(t('pm.hijuelo'));
        lista.replaceChildren(...items.map((frase) => {
            const li = document.createElement('li');
            li.textContent = frase;
            return li;
        }));

        const igual = off.length === DEMO_APAGA.length && DEMO_APAGA.every((s) => off.includes(s));
        resultado.querySelector('.mr-demo').textContent = igual ? `${t('pm.sameAsDemo')} ${t('pm.panelDemo')}` : t('pm.panelDemo');
    }

    filas.forEach((fila) => {
        fila.querySelector('.mr-switch').addEventListener('click', (e) => {
            if (panel.classList.contains('is-done')) return;
            e.currentTarget.setAttribute('aria-pressed', String(!encendido(fila)));
            pintarPanel();
        });
    });

    confirmar.addEventListener('click', () => {
        panel.classList.add('is-done');
        filas.forEach((fila) => { fila.querySelector('.mr-switch').disabled = true; });
        confirmar.disabled = true;
        pintarPanel();
        pintarResultado();
        resultado.hidden = false;
        // Al cerrar el día, la radio da su último boletín (GUION 7.10)
        sintonizar(BOLETINES.length - 1, true);
    });

    resultado.querySelector('.mr-reintentar').addEventListener('click', () => {
        panel.classList.remove('is-done');
        filas.forEach((fila) => {
            const boton = fila.querySelector('.mr-switch');
            boton.disabled = false;
            boton.setAttribute('aria-pressed', 'true');
        });
        resultado.hidden = true;
        pintarPanel();
        filas[0].querySelector('.mr-switch').focus();
    });

    function pintarTodo() {
        sintonizar(actual, false);
        pintarPanel();
        if (!resultado.hidden) pintarResultado();
    }

    // layout.js traduce la página en DOMContentLoaded; esto corre después
    document.addEventListener('DOMContentLoaded', pintarTodo);
    document.addEventListener('languageChanged', pintarTodo);
})();
