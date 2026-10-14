// CV: se dibuja desde cv/cv.json en dos plantillas (Harvard y visual) y dos idiomas.
// Modos por URL:
//   cv.html                         → página normal del sitio
//   cv.html?print=1&t=harvard&lang=es → solo la hoja, para generar el PDF
//   cv.html?embed=1                 → vista previa del panel admin (recibe datos por postMessage)
(() => {
    const params = new URLSearchParams(location.search);
    const mode = params.has('print') ? 'print' : params.has('embed') ? 'embed' : 'page';
    let template = params.get('t') === 'harvard' ? 'harvard' : 'visual';
    let data = null;

    const LABELS = {
        es: {
            profile: 'Perfil', education: 'Educación', projects: 'Proyectos', skills: 'Habilidades técnicas',
            skillsShort: 'Habilidades', extra: 'Habilidades e información adicional', languages: 'Idiomas',
            certifications: 'Certificaciones', interests: 'Intereses', present: 'Presente', contact: 'Contacto'
        },
        en: {
            profile: 'Profile', education: 'Education', projects: 'Projects', skills: 'Technical skills',
            skillsShort: 'Skills', extra: 'Skills & additional information', languages: 'Languages',
            certifications: 'Certifications', interests: 'Interests', present: 'Present', contact: 'Contact'
        }
    };

    // En modo página el idioma lo decide el sitio (layout.js); en print/embed, la URL o el admin
    const lang = () => (mode === 'page' ? currentLanguage : (params.get('lang') === 'en' ? 'en' : 'es'));
    let embedLang = lang();

    function esc(value) {
        return String(value ?? '').replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
    }

    function render() {
        if (!data) return;
        const L = mode === 'embed' ? embedLang : lang();
        const T = LABELS[L];
        const tr = (v) => (v && typeof v === 'object' && !Array.isArray(v) ? (v[L] ?? v.es ?? '') : v ?? '');
        const list = (v) => (Array.isArray(v) ? v : (v && v[L]) || []);
        const month = (ym, empty = '') => {
            if (!ym) return empty;
            const [y, m] = ym.split('-').map(Number);
            if (!m) return String(y);
            const name = new Intl.DateTimeFormat(L === 'es' ? 'es-MX' : 'en-US', { month: 'short' }).format(new Date(y, m - 1, 1));
            return `${name.replace('.', '')} ${y}`;
        };
        const range = (a, b) => `${month(a)} – ${month(b, T.present)}`;
        const p = data.person;
        const href = (url) => (/^https?:|^mailto:|^tel:/.test(url) ? url : `https://${url}`);

        const html = template === 'harvard' ? harvard() : visual();
        const paper = document.getElementById('cv-paper');
        paper.innerHTML = html;
        paper.className = `paper paper-${template}`;
        document.documentElement.lang = L;
        fitPaper();
        updateDownloads(L);

        function harvard() {
            // Dos líneas para que ninguna dirección se corte (los ATS leen mal los enlaces partidos)
            const line = (items) => items.filter(Boolean).map(esc).join(' · ');
            const contact = `${line([tr(p.location), p.phone, p.email])}<br>${line([p.website, p.linkedin, p.github])}`;
            const edu = data.education.map((e) => `
                <div class="h-entry">
                    <div class="h-row"><strong>${esc(e.school)}</strong><span>${esc(tr(e.place))}</span></div>
                    <div class="h-row"><em>${esc(tr(e.degree))}</em><span>${esc(range(e.start, e.end))}</span></div>
                    ${list(e.details).length ? `<ul>${list(e.details).map((d) => `<li>${esc(d)}</li>`).join('')}</ul>` : ''}
                </div>`).join('');
            const projects = data.projects.map((pr) => `
                <div class="h-entry">
                    <div class="h-row"><strong>${esc(tr(pr.name))}</strong><span>${esc(month(pr.date))}</span></div>
                    <div class="h-row"><em>${esc((pr.stack || []).join(', '))}</em><span>${esc(pr.link || '')}</span></div>
                    <ul>${list(pr.bullets).map((b) => `<li>${esc(b)}</li>`).join('')}</ul>
                </div>`).join('');
            const skills = data.skills.map((s) => `<p><strong>${esc(tr(s.group))}:</strong> ${esc(s.items.join(', '))}</p>`).join('');
            const langs = data.languages.map((l) => `${esc(tr(l.name))} (${esc(tr(l.level))})`).join(', ');
            const certs = data.certifications.map((c) => [tr(c.name), c.issuer, c.year].filter(Boolean).map(esc).join(', ')).join('; ');
            return `
                <article class="cv cv-harvard">
                    <header class="h-head">
                        <h1>${esc(p.name)}</h1>
                        <p>${contact}</p>
                    </header>
                    <section><h2>${T.profile}</h2><p>${esc(tr(data.summary))}</p></section>
                    <section><h2>${T.education}</h2>${edu}</section>
                    <section><h2>${T.projects}</h2>${projects}</section>
                    <section><h2>${T.extra}</h2>
                        ${skills}
                        <p><strong>${T.languages}:</strong> ${langs}</p>
                        ${certs ? `<p><strong>${T.certifications}:</strong> ${certs}</p>` : ''}
                        <p><strong>${T.interests}:</strong> ${esc(list(data.interests).join(', '))}</p>
                    </section>
                </article>`;
        }

        function visual() {
            const contact = [
                ['mail', p.email, `mailto:${p.email}`],
                ['phone', p.phone, `https://wa.me/${(p.phone || '').replace(/\D/g, '')}`],
                ['web', p.website, href(p.website || '')],
                ['linkedin', 'LinkedIn', href(p.linkedin || '')],
                ['github', (p.github || '').replace(/^.*\//, '@'), href(p.github || '')]
            ].filter(([, v]) => v).map(([icon, text, url]) => `<li><span class="icon icon-${icon}"></span><a href="${esc(url)}">${esc(text)}</a></li>`).join('');
            const skills = data.skills.map((s) => `
                <h3>${esc(tr(s.group))}</h3>
                <ul class="v-chips">${s.items.map((i) => `<li>${esc(i)}</li>`).join('')}</ul>`).join('');
            const langs = data.languages.map((l) => `<li><span>${esc(tr(l.name))}</span><span>${esc(tr(l.level))}</span></li>`).join('');
            const projects = data.projects.map((pr) => `
                <div class="v-entry">
                    <div class="v-row"><h3>${esc(tr(pr.name))}</h3><span class="v-date">${esc(month(pr.date))}</span></div>
                    <p class="v-stack">${esc((pr.stack || []).join(' · '))}</p>
                    <ul>${list(pr.bullets).map((b) => `<li>${esc(b)}</li>`).join('')}</ul>
                </div>`).join('');
            const edu = data.education.map((e) => `
                <div class="v-entry">
                    <div class="v-row"><h3>${esc(tr(e.degree))}</h3><span class="v-date">${esc(range(e.start, e.end))}</span></div>
                    <p class="v-stack">${esc(e.school)} · ${esc(tr(e.place))}</p>
                    ${list(e.details).length ? `<ul>${list(e.details).map((d) => `<li>${esc(d)}</li>`).join('')}</ul>` : ''}
                </div>`).join('');
            const certs = data.certifications.map((c) => `
                <li><span>${esc([tr(c.name), c.issuer].filter(Boolean).join(' · '))}</span><span class="v-date">${esc(c.year)}</span></li>`).join('');
            return `
                <article class="cv cv-visual">
                    <aside class="v-side">
                        ${p.photo ? `<img class="v-photo" src="${esc(p.photo)}" alt="">` : ''}
                        <h1>${esc(p.name)}</h1>
                        <p class="v-title">${esc(tr(p.title))}</p>
                        <p class="v-location">${esc(tr(p.location))}</p>
                        <section><h2>${T.contact}</h2><ul class="v-contact">${contact}</ul></section>
                        <section><h2>${T.skillsShort}</h2>${skills}</section>
                        <section><h2>${T.languages}</h2><ul class="v-langs">${langs}</ul></section>
                        <section><h2>${T.interests}</h2><ul class="v-interests">${list(data.interests).map((i) => `<li>${esc(i)}</li>`).join('')}</ul></section>
                    </aside>
                    <div class="v-main">
                        <section class="v-summary"><h2>${T.profile}</h2><p>${esc(tr(data.summary))}</p></section>
                        <section><h2>${T.projects}</h2>${projects}</section>
                        <section><h2>${T.education}</h2>${edu}</section>
                        ${certs ? `<section><h2>${T.certifications}</h2><ul class="v-certs">${certs}</ul></section>` : ''}
                    </div>
                </article>`;
        }
    }

    // Escala la hoja (8.5 × 11 in) para que quepa en pantallas angostas
    function fitPaper() {
        const scaler = document.querySelector('.cv-scale');
        if (!scaler || mode === 'print') return;
        const paper = document.getElementById('cv-paper');
        const scale = Math.min(1, scaler.parentElement.clientWidth / paper.offsetWidth);
        paper.style.transform = scale < 1 ? `scale(${scale})` : '';
        scaler.style.height = `${paper.offsetHeight * scale}px`;
    }

    function updateDownloads(L) {
        const file = `assets/cv/Rogelio-Ceja-CV-${template === 'harvard' ? 'Harvard' : 'Visual'}-${L.toUpperCase()}.pdf`;
        document.querySelectorAll('[data-cv-download]').forEach((a) => {
            a.href = file;
            a.setAttribute('download', file.split('/').pop());
        });
        document.querySelectorAll('[data-cv-template]').forEach((b) => {
            b.setAttribute('aria-pressed', String(b.dataset.cvTemplate === template));
        });
    }

    if (mode !== 'page') {
        // Solo la hoja: sin header, footer ni controles
        document.documentElement.classList.add(`cv-${mode}`);
        document.querySelectorAll('[data-layout], .skip-link, .cv-hero').forEach((el) => el.remove());
    }

    document.querySelectorAll('[data-cv-template]').forEach((button) => {
        button.addEventListener('click', () => {
            template = button.dataset.cvTemplate;
            const url = new URL(location.href);
            url.searchParams.set('t', template);
            history.replaceState(null, '', url);
            render();
        });
    });

    document.addEventListener('languageChanged', render);
    window.addEventListener('resize', fitPaper);

    // Vista previa del admin: recibe datos, plantilla e idioma sin guardar nada
    window.addEventListener('message', (e) => {
        if (e.origin !== location.origin || e.data?.type !== 'cv-preview') return;
        data = e.data.data;
        template = e.data.template;
        embedLang = e.data.lang;
        render();
    });

    if (mode === 'embed') {
        parent.postMessage({ type: 'cv-ready' }, location.origin);
    } else {
        fetch('cv/cv.json', { cache: 'no-cache' })
            .then((r) => r.json())
            .then((json) => {
                data = json;
                render();
                // Señal para el generador de PDF: fuentes e imágenes listas
                const images = [...document.querySelectorAll('#cv-paper img')].map((img) => img.decode().catch(() => {}));
                Promise.all([document.fonts.ready, ...images]).then(() => {
                    fitPaper();
                    document.documentElement.classList.add('cv-rendered');
                });
            });
    }
})();
