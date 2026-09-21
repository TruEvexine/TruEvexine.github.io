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

document.addEventListener("DOMContentLoaded", () => {
    loadLayouts().catch((error) => {
        console.error("No se pudieron cargar los elementos compartidos:", error);
    });
});
