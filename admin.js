// Panel privado para editar cv/cv.json directamente en GitHub.
// El acceso es un token fine-grained de GitHub (solo este repo, Contents: Read and write):
// sin él no se puede guardar nada, aunque cualquiera pueda abrir esta página.
(() => {
    const REPO = 'TruEvexine/TruEvexine.github.io';
    const FILE = 'cv/cv.json';
    const BRANCH = 'main';
    const API = `https://api.github.com/repos/${REPO}`;
    const AUTHOR = { name: 'Rogelio Emmanuel Ceja Acosta', email: 'rceja711@uvaq.edu.mx' };
    const STORE = 'cv-admin-token';

    const $ = (sel) => document.querySelector(sel);
    let token = sessionStorage.getItem(STORE) || localStorage.getItem(STORE) || '';
    let data = null;
    let sha = '';
    let saved = '';
    let previewTemplate = 'visual';
    let previewLang = 'es';
    let previewTimer = null;

    // ---------- GitHub ----------
    async function gh(path, options = {}) {
        const res = await fetch(`${API}${path}`, {
            ...options,
            headers: {
                Accept: 'application/vnd.github+json',
                Authorization: `Bearer ${token}`,
                'X-GitHub-Api-Version': '2022-11-28',
                ...(options.body ? { 'Content-Type': 'application/json' } : {})
            }
        });
        if (!res.ok) {
            const err = new Error(`GitHub ${res.status}`);
            err.status = res.status;
            throw err;
        }
        return res.json();
    }

    const decode = (b64) => new TextDecoder().decode(Uint8Array.from(atob(b64.replace(/\n/g, '')), (c) => c.charCodeAt(0)));
    const encode = (text) => {
        let bin = '';
        new TextEncoder().encode(text).forEach((b) => { bin += String.fromCharCode(b); });
        return btoa(bin);
    };
    const serialize = () => `${JSON.stringify(data, null, 2)}\n`;

    async function login(event) {
        event?.preventDefault();
        const error = $('#login-error');
        error.textContent = '';
        token = token || $('#token').value.trim();
        $('#login-btn').disabled = true;
        try {
            const repo = await gh('');
            if (!repo.permissions?.push) throw Object.assign(new Error(), { status: 403 });
            const remember = $('#remember').checked;
            (remember ? localStorage : sessionStorage).setItem(STORE, token);
            await load();
            $('#login').hidden = true;
            $('#app').hidden = false;
        } catch (err) {
            sessionStorage.removeItem(STORE);
            localStorage.removeItem(STORE);
            token = '';
            error.textContent = err.status === 401 ? 'Token inválido o vencido.'
                : err.status === 403 || err.status === 404 ? 'Este token no tiene permiso de escritura sobre TruEvexine.github.io.'
                : 'No se pudo conectar con GitHub. Revisa tu conexión.';
        } finally {
            $('#login-btn').disabled = false;
        }
    }

    async function load() {
        const file = await gh(`/contents/${FILE}?ref=${BRANCH}`);
        sha = file.sha;
        data = JSON.parse(decode(file.content));
        saved = serialize();
        renderEditor();
        setStatus('Sin cambios');
        sendPreview();
    }

    async function save() {
        if (!isDirty()) return;
        $('#save').disabled = true;
        setStatus('Guardando…');
        data.updated = new Date().toISOString().slice(0, 10);
        try {
            const result = await gh(`/contents/${FILE}`, {
                method: 'PUT',
                body: JSON.stringify({
                    message: 'Update CV',
                    content: encode(serialize()),
                    sha,
                    branch: BRANCH,
                    committer: AUTHOR,
                    author: AUTHOR
                })
            });
            sha = result.content.sha;
            saved = serialize();
            setStatus('Guardado. Los PDF se actualizan solos en unos 2 minutos.', 'ok');
        } catch (err) {
            setStatus(err.status === 409 || err.status === 422
                ? 'El CV cambió en GitHub desde que lo abriste. Descarta y vuelve a intentarlo.'
                : 'No se pudo guardar. Intenta de nuevo.', 'error');
        } finally {
            $('#save').disabled = false;
        }
    }

    // ---------- Editor ----------
    const bi = (es = '', en = '') => ({ es, en });
    const SECTIONS = [
        { key: 'person', title: 'Datos personales', fields: [
            ['name', 'Nombre completo', 'text'], ['title', 'Título', 'bi'], ['location', 'Ubicación', 'bi'],
            ['email', 'Correo', 'text'], ['phone', 'Teléfono', 'text'], ['website', 'Sitio web', 'text'],
            ['linkedin', 'LinkedIn', 'text'], ['github', 'GitHub', 'text'], ['photo', 'Foto (ruta dentro del repo)', 'text']
        ] },
        { key: 'summary', title: 'Perfil', single: ['summary', 'Resumen', 'biarea'] },
        { key: 'projects', title: 'Proyectos', list: true, label: (it) => it.name?.es,
          blank: () => ({ name: bi(), date: '', stack: [], link: '', bullets: { es: [], en: [] } }),
          fields: [['name', 'Nombre', 'bi'], ['date', 'Fecha', 'month'], ['stack', 'Tecnologías (separadas por coma)', 'tags'],
                   ['link', 'Enlace (opcional)', 'text'], ['bullets', 'Logros (uno por línea)', 'bilines']] },
        { key: 'education', title: 'Educación', list: true, label: (it) => it.school,
          blank: () => ({ school: '', place: bi(), degree: bi(), start: '', end: '', details: { es: [], en: [] } }),
          fields: [['school', 'Escuela', 'text'], ['place', 'Lugar', 'bi'], ['degree', 'Carrera / título', 'bi'],
                   ['start', 'Inicio', 'month'], ['end', 'Fin (vacío = Presente)', 'month'], ['details', 'Detalles (uno por línea)', 'bilines']] },
        { key: 'skills', title: 'Habilidades', list: true, label: (it) => it.group?.es,
          blank: () => ({ group: bi(), items: [] }),
          fields: [['group', 'Grupo', 'bi'], ['items', 'Elementos (separados por coma)', 'tags']] },
        { key: 'languages', title: 'Idiomas', list: true, label: (it) => it.name?.es,
          blank: () => ({ name: bi(), level: bi() }),
          fields: [['name', 'Idioma', 'bi'], ['level', 'Nivel', 'bi']] },
        { key: 'certifications', title: 'Certificaciones', list: true, label: (it) => it.name?.es,
          blank: () => ({ name: bi(), issuer: '', year: '' }),
          fields: [['name', 'Nombre', 'bi'], ['issuer', 'Institución (opcional)', 'text'], ['year', 'Año', 'text']] },
        { key: 'interests', title: 'Intereses', single: ['interests', 'Intereses (uno por línea)', 'bilines'] }
    ];

    function el(tag, attrs = {}, ...children) {
        const node = document.createElement(tag);
        Object.entries(attrs).forEach(([k, v]) => {
            if (k === 'on') Object.entries(v).forEach(([ev, fn]) => node.addEventListener(ev, fn));
            else if (v !== undefined && v !== false) node.setAttribute(k, v === true ? '' : v);
        });
        children.flat().forEach((c) => node.append(c));
        return node;
    }

    // Cada tipo de campo lee y escribe directo en el objeto de datos
    function field(obj, key, label, type) {
        const changed = () => { markDirty(); schedulePreview(); };
        if (type === 'text' || type === 'month') {
            const input = el('input', { type, value: obj[key] ?? '', on: { input: (e) => { obj[key] = e.target.value; changed(); } } });
            return el('label', { class: 'field' }, el('span', {}, label), input);
        }
        if (type === 'tags') {
            const input = el('input', { type: 'text', value: (obj[key] || []).join(', '),
                on: { input: (e) => { obj[key] = e.target.value.split(',').map((s) => s.trim()).filter(Boolean); changed(); } } });
            return el('label', { class: 'field' }, el('span', {}, label), input);
        }
        // Bilingües: columnas ES | EN
        obj[key] = obj[key] && typeof obj[key] === 'object' ? obj[key] : bi();
        const pair = ['es', 'en'].map((lang) => {
            const value = obj[key][lang];
            const isLines = type === 'bilines';
            const tag = type === 'bi' ? 'input' : 'textarea';
            const control = el(tag, {
                ...(tag === 'input' ? { type: 'text', value: value ?? '' } : { rows: isLines ? 4 : 3 }),
                on: { input: (e) => {
                    obj[key][lang] = isLines ? e.target.value.split('\n').map((s) => s.trim()).filter(Boolean) : e.target.value;
                    changed();
                } }
            });
            if (tag === 'textarea') control.value = isLines ? (value || []).join('\n') : value ?? '';
            return el('label', { class: 'field' }, el('span', { class: 'lang' }, lang.toUpperCase()), control);
        });
        return el('fieldset', { class: 'bi' }, el('legend', {}, label), el('div', { class: 'bi-grid' }, pair));
    }

    function renderEditor() {
        const form = $('#editor');
        form.replaceChildren(...SECTIONS.map(renderSection));
    }

    function renderSection(section) {
        const body = el('div', { class: 'section-body' });
        if (section.single) {
            const [key, label, type] = section.single;
            body.append(field(data, key, label, type));
        } else if (!section.list) {
            const obj = data[section.key];
            section.fields.forEach(([k, label, type]) => body.append(field(obj, k, label, type)));
        } else {
            const items = data[section.key];
            items.forEach((item, i) => {
                const move = (to) => { items.splice(to, 0, items.splice(i, 1)[0]); markDirty(); rerender(section); };
                const card = el('details', { class: 'item', open: items.length <= 1 || undefined },
                    el('summary', {}, el('span', {}, section.label(item) || 'Nuevo elemento'),
                        el('span', { class: 'item-actions' },
                            el('button', { type: 'button', title: 'Subir', 'aria-label': 'Subir', disabled: i === 0 || undefined, on: { click: (e) => { e.preventDefault(); move(i - 1); } } }, '↑'),
                            el('button', { type: 'button', title: 'Bajar', 'aria-label': 'Bajar', disabled: i === items.length - 1 || undefined, on: { click: (e) => { e.preventDefault(); move(i + 1); } } }, '↓'),
                            el('button', { type: 'button', class: 'danger', title: 'Eliminar', 'aria-label': 'Eliminar', on: { click: (e) => {
                                e.preventDefault();
                                if (confirm('¿Eliminar este elemento?')) { items.splice(i, 1); markDirty(); rerender(section); }
                            } } }, '✕'))),
                    el('div', { class: 'item-body' }, section.fields.map(([k, label, type]) => field(item, k, label, type))));
                body.append(card);
            });
            body.append(el('button', { type: 'button', class: 'btn add', on: { click: () => {
                items.push(section.blank()); markDirty(); rerender(section);
                const cards = document.querySelectorAll(`[data-section="${section.key}"] .item`);
                cards[cards.length - 1].open = true;
            } } }, `+ Agregar a ${section.title.toLowerCase()}`));
        }
        return el('section', { class: 'section', 'data-section': section.key }, el('h2', {}, section.title), body);
    }

    function rerender(section) {
        document.querySelector(`[data-section="${section.key}"]`).replaceWith(renderSection(section));
        schedulePreview();
    }

    // ---------- Estado y vista previa ----------
    const isDirty = () => data && serialize() !== saved;

    function markDirty() {
        setStatus(isDirty() ? 'Cambios sin guardar' : 'Sin cambios', isDirty() ? 'dirty' : '');
    }

    function setStatus(text, kind = '') {
        const status = $('#status');
        status.textContent = text;
        status.dataset.kind = kind;
    }

    function sendPreview() {
        const frame = $('#preview');
        if (!data || !frame.contentWindow) return;
        frame.contentWindow.postMessage({ type: 'cv-preview', data: JSON.parse(serialize()), template: previewTemplate, lang: previewLang }, location.origin);
    }

    function schedulePreview() {
        clearTimeout(previewTimer);
        previewTimer = setTimeout(sendPreview, 250);
    }

    window.addEventListener('message', (e) => {
        if (e.origin === location.origin && e.data?.type === 'cv-ready') sendPreview();
    });

    document.querySelectorAll('[data-preview-template]').forEach((b) => b.addEventListener('click', () => {
        previewTemplate = b.dataset.previewTemplate;
        document.querySelectorAll('[data-preview-template]').forEach((x) => x.setAttribute('aria-pressed', String(x === b)));
        sendPreview();
    }));
    document.querySelectorAll('[data-preview-lang]').forEach((b) => b.addEventListener('click', () => {
        previewLang = b.dataset.previewLang;
        document.querySelectorAll('[data-preview-lang]').forEach((x) => x.setAttribute('aria-pressed', String(x === b)));
        sendPreview();
    }));

    // Pestañas en móvil: Editar / Vista previa
    document.querySelectorAll('[data-tab]').forEach((tab) => tab.addEventListener('click', () => {
        document.querySelectorAll('[data-tab]').forEach((t) => t.setAttribute('aria-selected', String(t === tab)));
        document.querySelector('.app-body').dataset.show = tab.dataset.tab;
        if (tab.dataset.tab === 'preview') sendPreview();
    }));

    $('#login-form').addEventListener('submit', login);
    $('#save').addEventListener('click', save);
    $('#discard').addEventListener('click', async () => {
        if (!isDirty() || confirm('¿Descartar los cambios sin guardar?')) await load();
    });
    $('#logout').addEventListener('click', () => {
        if (isDirty() && !confirm('Tienes cambios sin guardar. ¿Salir de todos modos?')) return;
        sessionStorage.removeItem(STORE);
        localStorage.removeItem(STORE);
        location.reload();
    });
    window.addEventListener('beforeunload', (e) => {
        if (isDirty()) e.preventDefault();
    });
    // Ctrl/Cmd + S para guardar
    document.addEventListener('keydown', (e) => {
        if ((e.ctrlKey || e.metaKey) && e.key === 's' && !$('#app').hidden) {
            e.preventDefault();
            save();
        }
    });

    if (token) login();
})();
