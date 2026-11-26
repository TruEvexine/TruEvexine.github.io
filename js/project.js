// Página de caso de estudio: galería (flechas, puntos, teclado, deslizar),
// imagen ampliada y medidor de "Erosión" ligado a la lectura.
(() => {
    const slider = document.querySelector('.slider');
    if (!slider) return;

    const slides = [...slider.querySelectorAll('.slide')];
    const counter = slider.querySelector('.current-slide');
    const dots = document.querySelector('.slider-dots');
    slider.querySelector('.total-slides').textContent = slides.length;
    // Con un solo slide no hay nada que recorrer: se ocultan flechas, contador y puntos
    const single = slides.length < 2;
    slider.classList.toggle('is-single', single);
    dots.hidden = single;
    let index = 0;

    const dotButtons = slides.map((_, i) => {
        const dot = document.createElement('button');
        dot.type = 'button';
        dot.tabIndex = -1; // las flechas y el teclado ya cubren la navegación
        dot.addEventListener('click', () => show(i));
        dots.appendChild(dot);
        return dot;
    });

    function show(i) {
        // Si el video estaba sonando, se pausa al cambiar de slide
        const playing = slides[index].querySelector('iframe');
        if (playing) playing.contentWindow.postMessage('{"event":"command","func":"pauseVideo","args":""}', '*');

        index = (i + slides.length) % slides.length;
        slides.forEach((slide, n) => slide.classList.toggle('is-active', n === index));
        dotButtons.forEach((dot, n) => dot.setAttribute('aria-current', String(n === index)));
        counter.textContent = index + 1;
    }

    slider.querySelector('.prev').addEventListener('click', () => show(index - 1));
    slider.querySelector('.next').addEventListener('click', () => show(index + 1));
    slider.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowLeft') show(index - 1);
        if (e.key === 'ArrowRight') show(index + 1);
    });

    let touchStart = null;
    slider.addEventListener('touchstart', (e) => {
        const touch = e.touches[0];
        touchStart = { x: touch.clientX, y: touch.clientY };
    }, { passive: true });
    slider.addEventListener('touchend', (e) => {
        if (touchStart === null) return;
        const touch = e.changedTouches[0];
        const dx = touch.clientX - touchStart.x;
        const dy = touch.clientY - touchStart.y;
        if (Math.abs(dx) > 40 && Math.abs(dx) > Math.abs(dy)) show(index + (dx < 0 ? 1 : -1));
        touchStart = null;
    });
    slider.addEventListener('touchcancel', () => { touchStart = null; }, { passive: true });
    show(0);

    // Imagen ampliada con <dialog>: Esc y foco los resuelve el navegador
    const lightbox = document.createElement('dialog');
    lightbox.className = 'lightbox';
    lightbox.setAttribute('aria-label', document.documentElement.lang === 'es' ? 'Captura ampliada' : 'Image preview');
    lightbox.addEventListener('click', () => lightbox.close());
    // Botón visible para cerrar: tocar la imagen funciona, pero nadie lo adivina
    const closeBtn = document.createElement('button');
    closeBtn.type = 'button';
    closeBtn.className = 'lightbox-close';
    closeBtn.setAttribute('aria-label', document.documentElement.lang === 'es' ? 'Cerrar' : 'Close');
    closeBtn.innerHTML = '&times;';
    document.body.appendChild(lightbox);
    slides.forEach((slide) => {
        const img = slide.querySelector('img');
        if (!img || img.closest('.yt-facade')) return; // No ampliar miniaturas de video.
        const openImage = () => {
            const big = img.cloneNode();
            big.loading = 'eager'; // la copia hereda loading="lazy" y podría no cargar dentro del diálogo
            lightbox.replaceChildren(big, closeBtn);
            lightbox.showModal();
        };
        img.setAttribute('role', 'button');
        img.tabIndex = 0;
        img.addEventListener('click', openImage);
        img.addEventListener('keydown', (event) => {
            if (event.key !== 'Enter' && event.key !== ' ') return;
            event.preventDefault();
            openImage();
        });
    });

    // Erosión: sube de 0 a 100 % conforme se lee la información (solo SIN GUARDAR)
    const page = document.querySelector('.case');
    const body = document.querySelector('.case-body');
    const value = document.querySelector('.case-erosion-value');
    if (!value) return;
    let ticking = false;

    function updateErosion() {
        ticking = false;
        const rect = body.getBoundingClientRect();
        const start = window.innerHeight * 0.6;
        const progress = Math.min(1, Math.max(0, (start - rect.top) / Math.max(rect.height - start * 0.5, 1)));
        page.style.setProperty('--erosion', progress.toFixed(3));
        value.textContent = `${Math.round(progress * 100)}%`;
        page.classList.toggle('is-eroded', progress >= 0.98);
    }

    const requestUpdate = () => {
        if (!ticking) {
            ticking = true;
            requestAnimationFrame(updateErosion);
        }
    };
    window.addEventListener('scroll', requestUpdate, { passive: true });
    window.addEventListener('resize', requestUpdate);
    body.querySelectorAll('details').forEach((d) => d.addEventListener('toggle', requestUpdate));
    updateErosion();
})();
