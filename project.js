// Página de caso de estudio: galería (flechas, puntos, teclado, deslizar),
// imagen ampliada y medidor de "Erosión" ligado a la lectura.
(() => {
    const slider = document.querySelector('.slider');
    if (!slider) return;

    const slides = [...slider.querySelectorAll('.slide')];
    const counter = slider.querySelector('.current-slide');
    const dots = document.querySelector('.slider-dots');
    slider.querySelector('.total-slides').textContent = slides.length;
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

    let touchX = null;
    slider.addEventListener('touchstart', (e) => { touchX = e.touches[0].clientX; }, { passive: true });
    slider.addEventListener('touchend', (e) => {
        if (touchX === null) return;
        const dx = e.changedTouches[0].clientX - touchX;
        if (Math.abs(dx) > 40) show(index + (dx < 0 ? 1 : -1));
        touchX = null;
    });
    show(0);

    // Imagen ampliada con <dialog>: Esc y foco los resuelve el navegador
    const lightbox = document.createElement('dialog');
    lightbox.className = 'lightbox';
    lightbox.addEventListener('click', () => lightbox.close());
    document.body.appendChild(lightbox);
    slides.slice(1).forEach((slide) => {
        const img = slide.querySelector('img');
        img.addEventListener('click', () => {
            lightbox.replaceChildren(img.cloneNode());
            lightbox.showModal();
        });
    });

    // Erosión: sube de 0 a 100 % conforme se lee la información
    const page = document.querySelector('.case');
    const body = document.querySelector('.case-body');
    const value = document.querySelector('.case-erosion-value');
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
