const layouts = {
    header: "header.html",
    footer: "footer.html"
};

const translations = {
    en: {
        "nav.home": "Home",
        "nav.projects": "Projects",
        "nav.contact": "Contact",
        "language.switch": "Español",
        "footer.copyright": "Copyright",
        "footer.rights": "&copy; 2026 Rogelio Emmanuel Ceja. All rights reserved.",
        "footer.contact": "Contact Information",
        "footer.email": "Contact:",
        "footer.github": "GitHub:",
        "footer.linkedin": "LinkedIn:",
        "welcome.title": "Welcome to my",
        "welcome.message": "Feel free to explore my work and get in touch if you have any questions or opportunities 😊",
        "about.title": "About Me",
        "about.intro": "I'm Rogelio Emmanuel Ceja Acosta. I'm currently in my 5th semester of Systems Engineering. This portfolio offers a brief glimpse into my personality and interests.",
        "about.developer": "I am a passionate web developer with a strong focus on creating engaging and user-friendly websites. With a background in HTML, CSS, and JavaScript, I enjoy turning ideas into functional and visually appealing digital experiences.",
        "about.gaming": "Gaming is a big part of my life, and I particularly enjoy immersive experiences. I'm a huge fan of the Resident Evil series for its tension and story, as well as the adventurous world of Pokémon.",
        "education.title": "Education",
        "education.description": "Currently pursuing a Bachelor's degree in Systems Engineering at the University Vasco de Quiroga (UVAQ).",
        "skills.title": "My Skills",
        "skills.abilities": "Abilities",
        "skills.software-development": "<strong>Software Development:</strong> Java, Python, C#, JavaScript (React, Node.js).",
        "skills.software": "<strong>Software:</strong> Microsoft Office Suite.",
        "skills.databases": "<strong>Databases:</strong> PostgreSQL, MySQL, MongoDB, SQL query optimization.",
        "skills.infrastructure": "<strong>Infrastructure and Cloud:</strong> AWS (EC2, S3), Docker, Kubernetes, CI/CD (Jenkins).",
        "skills.methodologies": "<strong>Methodologies and Tools:</strong> Scrum, Kanban, Git, GitHub.",
        "skills.networks": "<strong>Networks and Security:</strong> TCP/IP network configuration, SSL/TLS security protocols.",
        "skills.soft": "Soft Skills",
        "skills.problem-solving": "<strong>Problem Solving:</strong> Analytical ability to debug complex code and diagnose system issues.",
        "skills.leadership": "<strong>Leadership:</strong> Ability to lead and mentor junior developers in a team environment.",
        "skills.teamwork": "<strong>Teamwork:</strong> Effective collaboration in agile development teams with designers and Product Owners.",
        "skills.communication": "<strong>Technical Communication:</strong> Ability to explain software architecture to clients or non-technical departments.",
        "skills.adaptability": "<strong>Adaptability:</strong> Rapid self-learning to master new languages, frameworks, and technological tools."
    },
    es: {
        "nav.home": "Inicio",
        "nav.projects": "Proyectos",
        "nav.contact": "Contacto",
        "language.switch": "English",
        "footer.copyright": "Derechos de autor",
        "footer.rights": "&copy; 2026 Rogelio Emmanuel Ceja. Todos los derechos reservados.",
        "footer.contact": "Información de contacto",
        "footer.email": "Correo:",
        "footer.github": "GitHub:",
        "footer.linkedin": "LinkedIn:",
        "welcome.title": "Bienvenido a mi",
        "welcome.message": "Explora mi trabajo y ponte en contacto si tienes alguna pregunta u oportunidad 😊",
        "about.title": "Sobre mí",
        "about.intro": "Soy Rogelio Emmanuel Ceja Acosta. Actualmente curso el quinto semestre de Ingeniería en Sistemas. Este portfolio ofrece una breve mirada a mi personalidad e intereses.",
        "about.developer": "Soy un desarrollador web apasionado, enfocado en crear sitios atractivos y fáciles de usar. Gracias a mi experiencia con HTML, CSS y JavaScript, disfruto convertir ideas en experiencias digitales funcionales y visualmente atractivas.",
        "about.gaming": "Los videojuegos son una parte importante de mi vida y disfruto especialmente las experiencias inmersivas. Soy un gran fan de la serie Resident Evil por su tensión e historia, así como del aventurero mundo de Pokémon.",
        "education.title": "Educación",
        "education.description": "Actualmente curso la Licenciatura en Ingeniería en Sistemas en la Universidad Vasco de Quiroga (UVAQ).",
        "skills.title": "Mis habilidades",
        "skills.abilities": "Habilidades técnicas",
        "skills.software-development": "<strong>Desarrollo de software:</strong> Java, Python, C#, JavaScript (React, Node.js).",
        "skills.software": "<strong>Software:</strong> Microsoft Office Suite.",
        "skills.databases": "<strong>Bases de datos:</strong> PostgreSQL, MySQL, MongoDB, optimización de consultas SQL.",
        "skills.infrastructure": "<strong>Infraestructura y nube:</strong> AWS (EC2, S3), Docker, Kubernetes, CI/CD (Jenkins).",
        "skills.methodologies": "<strong>Metodologías y herramientas:</strong> Scrum, Kanban, Git, GitHub.",
        "skills.networks": "<strong>Redes y seguridad:</strong> Configuración de redes TCP/IP, protocolos de seguridad SSL/TLS.",
        "skills.soft": "Habilidades blandas",
        "skills.problem-solving": "<strong>Resolución de problemas:</strong> Capacidad analítica para depurar código complejo y diagnosticar problemas de sistemas.",
        "skills.leadership": "<strong>Liderazgo:</strong> Capacidad para dirigir y orientar a desarrolladores junior en un entorno de equipo.",
        "skills.teamwork": "<strong>Trabajo en equipo:</strong> Colaboración eficaz en equipos ágiles de desarrollo con diseñadores y Product Owners.",
        "skills.communication": "<strong>Comunicación técnica:</strong> Capacidad para explicar la arquitectura de software a clientes o departamentos no técnicos.",
        "skills.adaptability": "<strong>Adaptabilidad:</strong> Aprendizaje autónomo rápido para dominar nuevos lenguajes, frameworks y herramientas tecnológicas."
    }
};

let currentLanguage = localStorage.getItem("portfolio-language") || "en";
let scrollDirection = "down";
let previousScrollY = window.scrollY;

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
        elements.forEach((element) => element.classList.add("is-visible"));
        return;
    }

    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.dataset.revealDirection = scrollDirection;
                    entry.target.classList.add("is-visible");
                } else {
                    entry.target.classList.remove("is-visible");
                }
            });
        },
        {
            threshold: 0.12,
            rootMargin: "-4% 0px"
        }
    );

    elements.forEach((element) => observer.observe(element));
}

function applyTranslations() {
    const dictionary = translations[currentLanguage];
    document.documentElement.lang = currentLanguage;

    document.querySelectorAll("[data-i18n]").forEach((element) => {
        const key = element.dataset.i18n;
        if (dictionary[key]) element.textContent = dictionary[key];
    });

    document.querySelectorAll("[data-i18n-html]").forEach((element) => {
        const key = element.dataset.i18nHtml;
        if (dictionary[key]) element.innerHTML = dictionary[key];
    });

    document.querySelectorAll("[data-language-toggle]").forEach((button) => {
        button.textContent = dictionary["language.switch"];
        button.setAttribute("aria-label", dictionary["language.switch"]);
    });
}

function initLanguageToggle() {
    document.querySelectorAll("[data-language-toggle]").forEach((button) => {
        button.addEventListener("click", () => {
            currentLanguage = currentLanguage === "en" ? "es" : "en";
            localStorage.setItem("portfolio-language", currentLanguage);
            applyTranslations();
        });
    });
}

document.addEventListener("DOMContentLoaded", () => {
    window.addEventListener("scroll", () => {
        scrollDirection = window.scrollY >= previousScrollY ? "down" : "up";
        previousScrollY = window.scrollY;
    }, { passive: true });
    initScrollReveal();
    initScrollReveal();
    document.documentElement.classList.add("reveal-ready");
    loadLayouts()
        .then(() => {
            initLanguageToggle();
        })
        .catch((error) => {
            console.error("No se pudieron cargar los elementos compartidos:", error);
            console.error("No se pudieron cargar los elementos compartidos:", error);
        });
});
