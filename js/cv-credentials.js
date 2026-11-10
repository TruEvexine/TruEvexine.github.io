// CV (solo web): tarjetas de certificaciones, diplomas y participaciones, con imágenes ampliables.
// Los datos salen de "certifications" en data/cv.json; cv.js los reparte con el evento "cv:data".
// No forma parte de la hoja del CV ni del PDF. Todo se arma con el DOM, sin insertar HTML.
(() => {
    const section = document.querySelector('.cv-credentials');
    const grid = section?.querySelector('.cv-credentials-list');
    if (!grid) return;

    const TYPES = ['certification', 'diploma', 'participation'];
    let items = [];

    const t = (key) => translations[currentLanguage][key] ?? key;
    const tr = (v) => (v && typeof v === 'object' ? (v[currentLanguage] ?? v.es ?? '') : v ?? '');

    function el(tag, className, text) {
        const node = document.createElement(tag);
        if (className) node.className = className;
        if (text) node.textContent = text;
        return node;
    }

    // Solo imágenes del propio sitio (la CSP no permite otras); siempre desde la raíz, también en /es/
    function localSrc(src) {
        if (typeof src !== 'string' || /^([a-z][a-z0-9+.-]*:|\/\/)/i.test(src)) return null;
        return src.startsWith('/') ? src : `/${src}`;
    }

    // ---------- Imagen ampliada: <dialog> (Esc, foco atrapado y foco de vuelta los resuelve el navegador) ----------
    const dialog = el('dialog', 'cred-lightbox');
    const closeButton = el('button', 'cred-close');
    closeButton.type = 'button';
    closeButton.textContent = '×';
    const figure = el('figure', 'cred-figure');
    const bigImage = el('img');
    const caption = el('figcaption');
    const failure = el('p', 'cred-lightbox-error');
    failure.hidden = true;
    figure.append(bigImage, failure, caption);
    dialog.append(closeButton, figure);
    document.body.appendChild(dialog);

    bigImage.addEventListener('error', () => {
        if (!bigImage.getAttribute('src')) return; // se vació al cerrar
        bigImage.hidden = true;
        failure.hidden = false;
    });
    closeButton.addEventListener('click', () => dialog.close());
    // Un toque o clic fuera de la imagen cierra (en móvil no hay Esc)
    dialog.addEventListener('click', (e) => {
        if (e.target !== bigImage) dialog.close();
    });
    // Al cerrar se suelta la imagen para no seguir descargándola
    dialog.addEventListener('close', () => bigImage.removeAttribute('src'));

    function openImage(src, alt, title) {
        closeButton.setAttribute('aria-label', t('cv.credentials.close'));
        failure.textContent = t('ui.mediaError');
        failure.hidden = true;
        bigImage.hidden = false;
        bigImage.alt = alt;
        bigImage.src = src;
        caption.textContent = title;
        dialog.setAttribute('aria-label', title);
        dialog.showModal();
        closeButton.focus();
    }

    // ---------- Tarjetas ----------
    function thumb(image, title) {
        const src = localSrc(image.src);
        if (!src) return null;
        const alt = tr(image.alt) || title; // nunca sin texto alternativo
        const frame = el('div', 'cred-thumb skel');
        frame.dataset.error = t('ui.mediaError');
        const button = el('button', 'cred-zoom');
        button.type = 'button';
        button.setAttribute('aria-haspopup', 'dialog');
        button.setAttribute('aria-label', `${t('cv.credentials.zoom')} ${alt}`);
        const img = el('img');
        img.src = src;
        img.alt = alt;
        img.loading = 'lazy';
        img.decoding = 'async';
        if (image.width && image.height) {
            img.width = image.width;
            img.height = image.height;
        }
        button.appendChild(img);
        frame.appendChild(button);
        button.addEventListener('click', () => {
            if (!frame.classList.contains('is-error')) openImage(src, alt, title);
        });
        img.addEventListener('error', () => { button.disabled = true; });
        watchSkeleton(frame); // brillo mientras carga y aviso si falla (layout.js)
        return frame;
    }

    function card(item) {
        const title = tr(item.name);
        const li = el('li', 'cred-card');
        const thumbs = (item.images || []).map((image) => thumb(image, title)).filter(Boolean);
        if (thumbs.length) {
            const media = el('div', `cred-media${thumbs.length > 1 ? ' is-multiple' : ''}`);
            media.append(...thumbs);
            li.appendChild(media);
        }
        const body = el('div', 'cred-body');
        const type = TYPES.includes(item.type) ? item.type : 'certification';
        body.appendChild(el('p', 'cred-type', t(`cv.credentials.${type}`)));
        body.appendChild(el('h3', 'cred-title', title));
        const meta = [item.issuer, item.year].filter(Boolean).join(' · ');
        if (meta) body.appendChild(el('p', 'cred-meta', meta));
        const description = tr(item.description);
        if (description) body.appendChild(el('p', 'cred-description', description));
        li.appendChild(body);
        return li;
    }

    function render() {
        grid.replaceChildren(...items.map(card));
        section.hidden = items.length === 0;
    }

    document.addEventListener('cv:data', (e) => {
        items = e.detail.certifications || [];
        render();
    });
    document.addEventListener('languageChanged', () => {
        if (dialog.open) dialog.close();
        render();
    });
})();
