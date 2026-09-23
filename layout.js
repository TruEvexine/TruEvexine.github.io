const layouts = {
    header: "header.html",
    footer: "footer.html"
};

async function loadLayout(element, file) {
    const response = await fetch(file);

    if (!response.ok) {
        throw new Error(`No se pudo cargar ${file}: ${response.status}`);
    }

    element.innerHTML = await response.text();
}

async function loadLayouts() {
    const elements = document.querySelectorAll("[data-layout]");

    await Promise.all(Array.from(elements).map((element) => {
        const file = layouts[element.dataset.layout];

        if (!file) {
            throw new Error(`Layout desconocido: ${element.dataset.layout}`);
        }

        return loadLayout(element, file);
    }));
}

function initScrollReveal() {
    const elements = document.querySelectorAll(".scroll-reveal");
    if (!elements.length) return;

    if (!("IntersectionObserver" in window)) {
        elements.forEach((el) => el.classList.add("is-visible"));
        return;
    }

    const observer = new IntersectionObserver(
        (entries, obs) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("is-visible");
                    obs.unobserve(entry.target);
                }
            });
        },
        {
            threshold: 0.1,
            rootMargin: "0px 0px -40px 0px"
        }
    );

    elements.forEach((el) => observer.observe(el));
}

document.addEventListener("DOMContentLoaded", () => {
    initScrollReveal();
    loadLayouts().catch((error) => {
        console.error("No se pudieron cargar los elementos compartidos:", error);
    });
});
