document.documentElement.classList.add("js");

// Páginas con versión en español en /es/ (las genera _dev/build-es.mjs)
window.localizedPages = ["index", "profile", "projects", "sin-guardar", "project-miralta", "cv", "contact", "privacidad"];

// Quien eligió español (o tiene el navegador en español y aún no elige) va directo a /es/, antes de pintar.
// Las URL /es/ nunca redirigen; tampoco la hoja del CV para PDF ni la vista previa del admin.
(() => {
    const path = location.pathname;
    if (path === "/es" || path.startsWith("/es/")) return;
    if (/[?&](print|embed)=/.test(location.search)) return;
    const page = path.replace(/^\/|\/$/g, "").replace(/\.html$/, "") || "index";
    if (!window.localizedPages.includes(page)) return;
    let saved = null;
    try { saved = localStorage.getItem("portfolio-language"); } catch { /* almacenamiento bloqueado */ }
    const prefersEs = saved ? saved === "es" : (navigator.language || "").toLowerCase().startsWith("es");
    if (prefersEs) location.replace(`/es/${page === "index" ? "" : page}${location.search}${location.hash}`);
})();
