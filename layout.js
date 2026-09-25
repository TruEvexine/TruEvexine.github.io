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
        "welcome.portfolio": "Portfolio",
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
        "skills.adaptability": "<strong>Adaptability:</strong> Rapid self-learning to master new languages, frameworks, and technological tools.",
        "projects.title": "My Projects",
        "projects.project1": "SIN GUARDAR Videogame",
        "projects.project1Description": "A first version of a cosmic horror visual novel with decision-making, developed in JavaFX as an individual university project. Explore the gameplay and discover how player decisions, the Erosion system, and narrative interact to transform the experience.",
        "projects.project1Button": "View more",
        "projects.sin-guardar-intro": "SIN GUARDAR is a cosmic horror narrative and meta-narrative game developed as an individual university project for the Data Structures course at Universidad Vasco de Quiroga.",
        "projects.sin-guardar-version": "This version corresponds to the first functional version of the project, whose objective was to develop an interactive narrative experience where player decisions have consequences on the story development and on the game's own presentation.",
        "sin-guardar-concept": "Concept",
        "sin-guardar-concept-content": "The story follows Víctor Corona, an illustrator who receives a manuscript titled 'Chronicle of the Man Who Never Occurred'. The book's content begins to describe events from his own life, leading him to Curucutarán, Michoacán, where he begins to discover that the reality around him doesn't work as it should. The concept uses horror not only through supernatural creatures or situations, but through narrative and visual elements that progressively break the player's perception of what is happening. The title itself, SIN GUARDAR (Unsaved), has a narrative function within the project: it refers both to game progress and to the protagonist's inability to keep intact his identity, his reality, and his own history.",
        "sin-guardar-jugability": "Gameplay and Systems",
        "sin-guardar-jugability-content": "The project is built around decision-making. The story is divided into different scenes and narrative nodes, where the player can choose between different actions that modify the course of the game. One of the main systems is Erosion, a value that increases or decreases depending on the decisions made. Besides functioning as a progress variable, Erosion modifies the narrative and visual presentation of the game. As it increases, the narrative voice changes, visual alterations appear, and some dialogues begin to behave differently. In this way, the game state not only determines what happens in the story, but also how that story is presented to the player. The design includes 22 decision nodes and three active endings, including different routes and a secret ending directly related to the interaction between player and game. A save and load system was also implemented, allowing to preserve the story state, Erosion, and decisions made.",
        "sin-guardar-development": "Technical Development",
        "sin-guardar-development-content": "The video game was developed using Java 17 and Java Swing, with Maven as the project build system. The architecture was organized through different components to separate game responsibilities. Among them are scene management, global game state, narrative data, decisions, save system, interface, and audio playback. The project uses a structure based on a state machine, where each scene functions as a state and a manager controls transitions between them. To preserve game information, a global state is used that stores variables like Erosion, current node, and different narrative indicators. Dialogues, scenes, and decisions are stored as structured data, allowing the system to determine what content to show and which scene to advance after each choice. The interface also includes specific elements for the narrative experience, such as the dialogue box, decision panels, pause menu, and a visible Erosion bar during the game.",
        "sin-guardar-art": "Art and Presentation",
        "sin-guardar-art-content": "The visual aspect was designed specifically to work with a resolution of 1920 x 1080 pixels, using separate backgrounds, characters, objects, and interface elements. The artistic direction seeks to combine a graphic novel aesthetic with cosmic horror elements and liminal spaces. The intention is not to constantly show explicit creatures, but to use incorrect details, absence of information, strange proportions, impossible lighting, and progressive alterations of the environment to generate discomfort. The visual system also contemplates different variants of scenes depending on the Erosion level. In this way, the same scenario can present color, lighting, and composition changes when the player's state reaches certain levels.",
        "sin-guardar-audio": "Audio",
        "sin-guardar-audio-content": "The game incorporates ambient music and sound effects in WAV format through the audio system included in Java. The music changes according to the story context and is mainly used to reinforce the atmosphere of each scenario. Sound effects accompany specific events, transitions, and important narrative moments.",
        "sin-guardar-objective": "Project Objective",
        "sin-guardar-objective-content": "The main objective of this first version was to integrate programming, narrative, interface, art, and audio within a single interactive experience, using Java as the main technology. More than just developing a story with choices, the project seeks to experiment with the possibility that player decisions affect both narrative content and the way the game itself presents itself. This version represents the functional base of the project and serves as a starting point for future iterations, content improvements, visual polish, and expansion of its systems.",
        "projects.readMore": "Read more"
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
        "welcome.portfolio": "Portafolio",
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
        "skills.adaptability": "<strong>Adaptabilidad:</strong> Aprendizaje autónomo rápido para dominar nuevos lenguajes, frameworks y herramientas tecnológicas.",
        "projects.title": "Mis Proyectos",
        "projects.project1": "Videojuego  SIN GUARDAR",
        "projects.project1Description": "Una primera versión de una visual novel de horror cósmico y toma de decisiones, desarrollada en Java Fx como proyecto universitario individual. Explora el gameplay y descubre cómo las decisiones del jugador, el sistema de Erosión y la narrativa interactúan para transformar la experiencia.",
        "projects.project1Button": "Ver más",
        "projects.sin-guardar-intro": "SIN GUARDAR es un videojuego narrativo de horror cósmico y metanarrativa desarrollado como proyecto universitario individual para la materia de Estructura de Datos en la Universidad Vasco de Quiroga.",
        "projects.sin-guardar-version": "Esta versión corresponde a la primera versión funcional del proyecto, cuyo objetivo fue desarrollar una experiencia narrativa interactiva en la que las decisiones del jugador tuvieran consecuencias sobre el desarrollo de la historia y sobre la propia presentación del juego.",
        "sin-guardar-concept": "Concepto",
        "sin-guardar-concept-content": "La historia sigue a Víctor Corona, un ilustrador que recibe un manuscrito titulado 'Crónica del Hombre Que Nunca Ocurrió'. El contenido del libro comienza a describir acontecimientos de su propia vida, llevándolo hasta Curucutarán, Michoacán, donde comienza a descubrir que la realidad que lo rodea no funciona como debería. El concepto utiliza el horror no solamente a través de criaturas o situaciones sobrenaturales, sino mediante elementos narrativos y visuales que progresivamente rompen la percepción del jugador sobre lo que está ocurriendo. El propio título, SIN GUARDAR, tiene una función narrativa dentro del proyecto: hace referencia tanto al progreso de una partida como a la imposibilidad del protagonista de conservar intactas su identidad, su realidad y su propia historia.",
        "sin-guardar-jugability": "Jugabilidad y sistemas",
        "sin-guardar-jugability-content": "El proyecto está construido alrededor de la toma de decisiones. La historia se divide en diferentes escenas y nodos narrativos, donde el jugador puede elegir entre distintas acciones que modifican el recorrido de la partida. Uno de los sistemas principales es la Erosión, un valor que aumenta o disminuye dependiendo de las decisiones tomadas. Además de funcionar como una variable de progreso, la Erosión modifica la presentación narrativa y visual del juego. A medida que aumenta, cambia la voz narrativa, aparecen alteraciones visuales y algunos diálogos comienzan a comportarse de manera diferente. De esta forma, el estado de la partida no solamente determina qué ocurre en la historia, sino también cómo se presenta esa historia al jugador. El diseño contempla 22 nodos de decisión y tres finales activos, incluyendo rutas diferentes y un final secreto relacionado directamente con la interacción entre el jugador y el juego. También se implementó un sistema de guardado y carga de partidas, permitiendo conservar el estado de la historia, la Erosión y las decisiones realizadas.",
        "sin-guardar-development": "Desarrollo técnico",
        "sin-guardar-development-content": "El videojuego fue desarrollado utilizando Java 17 y Java Swing, con Maven como sistema de construcción del proyecto. La arquitectura se organizó mediante diferentes componentes para separar las responsabilidades del juego. Entre ellos se encuentran el manejo de escenas, el estado global de la partida, los datos narrativos, las decisiones, el sistema de guardado, la interfaz y la reproducción de audio. El proyecto utiliza una estructura basada en una máquina de estados, donde cada escena funciona como un estado y un administrador controla las transiciones entre ellas. Para conservar la información de la partida se utiliza un estado global que almacena variables como la Erosión, el nodo actual y los diferentes indicadores narrativos. Los diálogos, escenas y decisiones se almacenan como datos estructurados, permitiendo que el sistema determine qué contenido mostrar y a qué escena avanzar después de cada elección. La interfaz también cuenta con elementos específicos para la experiencia narrativa, como el cuadro de diálogo, paneles de decisiones, menú de pausa y una barra de Erosión visible durante el juego.",
        "sin-guardar-art": "Arte y presentación",
        "sin-guardar-art-content": "El apartado visual fue diseñado específicamente para funcionar con una resolución de 1920 x 1080 píxeles, utilizando fondos, personajes, objetos y elementos de interfaz separados. La dirección artística busca combinar una estética de novela gráfica con elementos de horror cósmico y espacios liminales. La intención no es mostrar constantemente criaturas explícitas, sino utilizar detalles incorrectos, ausencia de información, proporciones extrañas, iluminación imposible y alteraciones progresivas del entorno para generar incomodidad. El sistema visual también contempla diferentes variantes de las escenas dependiendo del nivel de Erosión. De esta manera, un mismo escenario puede presentar cambios de color, iluminación y composición cuando el estado del jugador alcanza determinados niveles.",
        "sin-guardar-audio": "Audio",
        "sin-guardar-audio-content": "El juego incorpora música ambiental y efectos de sonido en formato WAV mediante el sistema de audio incluido en Java. La música cambia según el contexto de la historia y se utiliza principalmente para reforzar la atmósfera de cada escenario. Los efectos de sonido acompañan eventos específicos, transiciones y momentos narrativos importantes.",
        "sin-guardar-objective": "Objetivo del proyecto",
        "sin-guardar-objective-content": "El objetivo principal de esta primera versión fue integrar programación, narrativa, interfaz, arte y audio dentro de una misma experiencia interactiva, utilizando Java como tecnología principal. Más que desarrollar únicamente una historia con elecciones, el proyecto busca experimentar con la posibilidad de que las decisiones del jugador afecten tanto al contenido narrativo como a la forma en que el propio juego se presenta. Esta versión representa la base funcional del proyecto y sirve como punto de partida para futuras iteraciones, mejoras de contenido, pulido visual y expansión de sus sistemas.",
        "projects.readMore": "Leer más"
    }
};

window.translations = translations;

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
            threshold: 0.2,
            rootMargin: "-10% 0px"
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
            document.dispatchEvent(new Event('languageChanged'));
        });
    });
}

document.addEventListener("DOMContentLoaded", () => {
    window.addEventListener("scroll", () => {
        scrollDirection = window.scrollY >= previousScrollY ? "down" : "up";
        previousScrollY = window.scrollY;
    }, { passive: true });
    initScrollReveal();
    document.documentElement.classList.add("reveal-ready");
    loadLayouts()
        .then(() => {
            initLanguageToggle();
            applyTranslations();
        })
        .catch((error) => {
            console.error("No se pudieron cargar los elementos compartidos:", error);
            console.error("No se pudieron cargar los elementos compartidos:", error);
        });
});
