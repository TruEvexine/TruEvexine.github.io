const layouts = {
    header: "header.html",
    footer: "footer.html"
};

const translations = {
    en: {
        "nav.home": "Home",
        "ui.menu": "Menu",
        "ui.close": "Close",
        "ui.prev": "Previous",
        "ui.next": "Next",
        "projects.shot1": "SIN GUARDAR screenshot 1",
        "projects.shot2": "SIN GUARDAR screenshot 2",
        "projects.shot3": "SIN GUARDAR screenshot 3",
        "projects.videoTitle": "SIN GUARDAR gameplay video",
        "education.photoAlt": "Rogelio at Universidad Vasco de Quiroga",
        "nav.profile": "Profile",
        "nav.projects": "Projects",
        "nav.contact": "Contact",
        "language.switch": "Español",
        "footer.copyright": "Rogelio Emmanuel Ceja",
        "footer.rights": "&copy; 2026 Rogelio Emmanuel Ceja. All rights reserved.",
        "footer.contact": "Contact Information",
        "footer.email": "Email:",
        "footer.github": "GitHub:",
        "footer.linkedin": "LinkedIn:",
        "contact.documentTitle": "Contact — Rogelio Ceja",
        "contact.eyebrow": "LET'S CONNECT",
        "contact.title": "Get in touch",
        "contact.intro": "Have a project in mind, an opportunity, or just want to say hello? Reach out through any of these channels.",
        "contact.emailTitle": "Email",
        "contact.emailDescription": "The best way to reach me directly.",
        "contact.githubDescription": "Explore my code and projects.",
        "contact.linkedinDescription": "Let's connect professionally.",
        "contact.emailAction": "Send me an email",
        "contact.profileAction": "View profile",
        "index.documentTitle": "Rogelio Ceja — Portfolio",
        "profile.documentTitle": "Profile — Rogelio Ceja",
        "projects.documentTitle": "Projects — Rogelio Ceja",
        "welcome.title": "Welcome to my",
        "welcome.portfolio": "Portfolio",
        "welcome.message": "Systems Engineering student building websites and narrative games.",
        "welcome.ctaProjects": "See my projects",
        "welcome.ctaContact": "Get in touch",
        "about.title": "About Me",
        "about.intro": "I'm Rogelio, a 5th-semester Systems Engineering student at UVAQ. I turn ideas into websites that are clear, fast and pleasant to use.",
        "about.gaming": "I'm a gamer at heart: Resident Evil taught me tension, Pokémon taught me adventure. That's why I also build stories you can play.",
        "about.cta": "My skills & education",
        "profile.title": "Profile",
        "profile.intro": "The tools I build with and where I'm learning to master them.",
        "profile.stackTitle": "Tech stack",
        "profile.groupLanguages": "Languages",
        "profile.groupWeb": "Web",
        "profile.groupData": "Databases",
        "profile.groupTools": "Tools",
        "profile.also": "Also: Java Swing · JavaFX · Scrum · Kanban · TCP/IP networking · Microsoft Office",
        "profile.howTitle": "How I work",
        "profile.problemTitle": "Problem solving",
        "profile.problem": "I debug until I find the real cause, not just the symptom.",
        "profile.teamTitle": "Teamwork",
        "profile.team": "Agile teams, side by side with designers and product owners.",
        "profile.commTitle": "Clear communication",
        "profile.comm": "I explain technical decisions in plain language.",
        "profile.learnTitle": "Fast learner",
        "profile.learn": "New language or framework? I pick it up quickly.",
        "profile.leadTitle": "Leadership",
        "profile.lead": "I like helping my teammates get unstuck and keep moving.",
        "education.title": "Education",
        "education.degree": "B.S. in Systems Engineering",
        "education.school": "Universidad Vasco de Quiroga (UVAQ)",
        "education.status": "In progress · 5th semester",
        "projects.title": "My Projects",
        "projects.project1": "SIN GUARDAR — Narrative game in Java",
        "projects.project1Description": "A cosmic horror visual novel where your choices reshape both the story and how the game looks. A solo university project in Java: started in Swing, finished in JavaFX.",
        "projects.project1Button": "View more",
        "projects.sin-guardar-intro": "SIN GUARDAR is a cosmic horror narrative and meta-narrative game developed as an individual university project for the Data Structures course at Universidad Vasco de Quiroga.",
        "projects.sin-guardar-version": "This version corresponds to the first functional version of the project, whose objective was to develop an interactive narrative experience where player decisions have consequences on the story development and on the game's own presentation.",
        "sin-guardar-concept": "Concept",
        "sin-guardar-concept-content": "The story follows Víctor Corona, an illustrator who receives a manuscript titled 'Chronicle of the Man Who Never Occurred'. The book's content begins to describe events from his own life, leading him to Curucutarán, Michoacán, where he begins to discover that the reality around him doesn't work as it should. The concept uses horror not only through supernatural creatures or situations, but through narrative and visual elements that progressively break the player's perception of what is happening. The title itself, SIN GUARDAR (Unsaved), has a narrative function within the project: it refers both to game progress and to the protagonist's inability to keep intact his identity, his reality, and his own history.",
        "sin-guardar-jugability": "Gameplay and Systems",
        "sin-guardar-jugability-content": "The project is built around decision-making. The story is divided into different scenes and narrative nodes, where the player can choose between different actions that modify the course of the game. One of the main systems is Erosion, a value that increases or decreases depending on the decisions made. Besides functioning as a progress variable, Erosion modifies the narrative and visual presentation of the game. As it increases, the narrative voice changes, visual alterations appear, and some dialogues begin to behave differently. In this way, the game state not only determines what happens in the story, but also how that story is presented to the player. The design includes 22 decision nodes and three active endings, including different routes and a secret ending directly related to the interaction between player and game. A save and load system was also implemented, allowing to preserve the story state, Erosion, and decisions made.",
        "sin-guardar-development": "Technical Development",
        "sin-guardar-development-content": "The video game was developed in Java 17: it started with Java Swing and was later migrated to JavaFX, with Maven as the project build system. The architecture was organized through different components to separate game responsibilities. Among them are scene management, global game state, narrative data, decisions, save system, interface, and audio playback. The project uses a structure based on a state machine, where each scene functions as a state and a manager controls transitions between them. To preserve game information, a global state is used that stores variables like Erosion, current node, and different narrative indicators. Dialogues, scenes, and decisions are stored as structured data, allowing the system to determine what content to show and which scene to advance after each choice. The interface also includes specific elements for the narrative experience, such as the dialogue box, decision panels, pause menu, and a visible Erosion bar during the game.",
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
        "ui.menu": "Menú",
        "ui.close": "Cerrar",
        "ui.prev": "Anterior",
        "ui.next": "Siguiente",
        "projects.shot1": "Captura de SIN GUARDAR 1",
        "projects.shot2": "Captura de SIN GUARDAR 2",
        "projects.shot3": "Captura de SIN GUARDAR 3",
        "projects.videoTitle": "Video de gameplay de SIN GUARDAR",
        "education.photoAlt": "Rogelio en la Universidad Vasco de Quiroga",
        "nav.profile": "Perfil",
        "nav.projects": "Proyectos",
        "nav.contact": "Contacto",
        "language.switch": "English",
        "footer.copyright": "Rogelio Emmanuel Ceja",
        "footer.rights": "&copy; 2026 Rogelio Emmanuel Ceja. Todos los derechos reservados.",
        "footer.contact": "Información de contacto",
        "footer.email": "Correo:",
        "footer.github": "GitHub:",
        "footer.linkedin": "LinkedIn:",
        "contact.documentTitle": "Contacto — Rogelio Ceja",
        "contact.eyebrow": "PONGÁMONOS EN CONTACTO",
        "contact.title": "Hablemos",
        "contact.intro": "¿Tienes un proyecto en mente, una oportunidad o simplemente quieres saludar? Puedes escribirme por cualquiera de estos medios.",
        "contact.emailTitle": "Correo electrónico",
        "contact.emailDescription": "La forma más directa de contactarme.",
        "contact.githubDescription": "Explora mi código y mis proyectos.",
        "contact.linkedinDescription": "Conectemos profesionalmente.",
        "contact.emailAction": "Enviarme un correo",
        "contact.profileAction": "Ver perfil",
        "index.documentTitle": "Rogelio Ceja — Portafolio",
        "profile.documentTitle": "Perfil — Rogelio Ceja",
        "projects.documentTitle": "Proyectos — Rogelio Ceja",
        "welcome.title": "Bienvenido a mi",
        "welcome.portfolio": "Portafolio",
        "welcome.message": "Estudiante de Ingeniería en Sistemas que crea sitios web y videojuegos narrativos.",
        "welcome.ctaProjects": "Ver mis proyectos",
        "welcome.ctaContact": "Contáctame",
        "about.title": "Sobre mí",
        "about.intro": "Soy Rogelio, estudiante de quinto semestre de Ingeniería en Sistemas en la UVAQ. Convierto ideas en sitios web claros, rápidos y agradables de usar.",
        "about.gaming": "Soy gamer de corazón: Resident Evil me enseñó la tensión y Pokémon, la aventura. Por eso también creo historias que se juegan.",
        "about.cta": "Mis habilidades y formación",
        "profile.title": "Perfil",
        "profile.intro": "Las herramientas con las que construyo y dónde estoy aprendiendo a dominarlas.",
        "profile.stackTitle": "Stack técnico",
        "profile.groupLanguages": "Lenguajes",
        "profile.groupWeb": "Web",
        "profile.groupData": "Bases de datos",
        "profile.groupTools": "Herramientas",
        "profile.also": "También: Java Swing · JavaFX · Scrum · Kanban · Redes TCP/IP · Microsoft Office",
        "profile.howTitle": "Cómo trabajo",
        "profile.problemTitle": "Resolución de problemas",
        "profile.problem": "Depuro hasta encontrar la causa real, no solo el síntoma.",
        "profile.teamTitle": "Trabajo en equipo",
        "profile.team": "Equipos ágiles, codo a codo con diseño y producto.",
        "profile.commTitle": "Comunicación clara",
        "profile.comm": "Explico decisiones técnicas en lenguaje sencillo.",
        "profile.learnTitle": "Aprendo rápido",
        "profile.learn": "¿Un lenguaje o framework nuevo? Lo domino en poco tiempo.",
        "profile.leadTitle": "Liderazgo",
        "profile.lead": "Me gusta ayudar a mi equipo a destrabarse y seguir avanzando.",
        "education.title": "Formación",
        "education.degree": "Ingeniería en Sistemas",
        "education.school": "Universidad Vasco de Quiroga (UVAQ)",
        "education.status": "En curso · 5.º semestre",
        "projects.title": "Mis Proyectos",
        "projects.project1": "SIN GUARDAR — Videojuego narrativo en Java",
        "projects.project1Description": "Una novela visual de horror cósmico donde tus decisiones cambian la historia y hasta la forma en que se ve el juego. Proyecto universitario individual en Java: empezó en Swing y se terminó en JavaFX.",
        "projects.project1Button": "Ver más",
        "projects.sin-guardar-intro": "SIN GUARDAR es un videojuego narrativo de horror cósmico y metanarrativa desarrollado como proyecto universitario individual para la materia de Estructura de Datos en la Universidad Vasco de Quiroga.",
        "projects.sin-guardar-version": "Esta versión corresponde a la primera versión funcional del proyecto, cuyo objetivo fue desarrollar una experiencia narrativa interactiva en la que las decisiones del jugador tuvieran consecuencias sobre el desarrollo de la historia y sobre la propia presentación del juego.",
        "sin-guardar-concept": "Concepto",
        "sin-guardar-concept-content": "La historia sigue a Víctor Corona, un ilustrador que recibe un manuscrito titulado 'Crónica del Hombre Que Nunca Ocurrió'. El contenido del libro comienza a describir acontecimientos de su propia vida, llevándolo hasta Curucutarán, Michoacán, donde comienza a descubrir que la realidad que lo rodea no funciona como debería. El concepto utiliza el horror no solamente a través de criaturas o situaciones sobrenaturales, sino mediante elementos narrativos y visuales que progresivamente rompen la percepción del jugador sobre lo que está ocurriendo. El propio título, SIN GUARDAR, tiene una función narrativa dentro del proyecto: hace referencia tanto al progreso de una partida como a la imposibilidad del protagonista de conservar intactas su identidad, su realidad y su propia historia.",
        "sin-guardar-jugability": "Jugabilidad y sistemas",
        "sin-guardar-jugability-content": "El proyecto está construido alrededor de la toma de decisiones. La historia se divide en diferentes escenas y nodos narrativos, donde el jugador puede elegir entre distintas acciones que modifican el recorrido de la partida. Uno de los sistemas principales es la Erosión, un valor que aumenta o disminuye dependiendo de las decisiones tomadas. Además de funcionar como una variable de progreso, la Erosión modifica la presentación narrativa y visual del juego. A medida que aumenta, cambia la voz narrativa, aparecen alteraciones visuales y algunos diálogos comienzan a comportarse de manera diferente. De esta forma, el estado de la partida no solamente determina qué ocurre en la historia, sino también cómo se presenta esa historia al jugador. El diseño contempla 22 nodos de decisión y tres finales activos, incluyendo rutas diferentes y un final secreto relacionado directamente con la interacción entre el jugador y el juego. También se implementó un sistema de guardado y carga de partidas, permitiendo conservar el estado de la historia, la Erosión y las decisiones realizadas.",
        "sin-guardar-development": "Desarrollo técnico",
        "sin-guardar-development-content": "El videojuego fue desarrollado en Java 17: comenzó con Java Swing y después se migró a JavaFX, con Maven como sistema de construcción del proyecto. La arquitectura se organizó mediante diferentes componentes para separar las responsabilidades del juego. Entre ellos se encuentran el manejo de escenas, el estado global de la partida, los datos narrativos, las decisiones, el sistema de guardado, la interfaz y la reproducción de audio. El proyecto utiliza una estructura basada en una máquina de estados, donde cada escena funciona como un estado y un administrador controla las transiciones entre ellas. Para conservar la información de la partida se utiliza un estado global que almacena variables como la Erosión, el nodo actual y los diferentes indicadores narrativos. Los diálogos, escenas y decisiones se almacenan como datos estructurados, permitiendo que el sistema determine qué contenido mostrar y a qué escena avanzar después de cada elección. La interfaz también cuenta con elementos específicos para la experiencia narrativa, como el cuadro de diálogo, paneles de decisiones, menú de pausa y una barra de Erosión visible durante el juego.",
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

    // Atributos traducibles, formato: data-i18n-attr="aria-label:ui.close; alt:clave"
    document.querySelectorAll("[data-i18n-attr]").forEach((element) => {
        element.dataset.i18nAttr.split(";").forEach((pair) => {
            const [attr, key] = pair.split(":").map((part) => part.trim());
            if (dictionary[key]) element.setAttribute(attr, dictionary[key]);
        });
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

function initHamburgerMenu() {
    const hamburger = document.querySelector('.hamburger-menu');
    const navbar = document.querySelector('.navbar');
    if (!hamburger || !navbar) return;

    const setOpen = (open) => {
        navbar.classList.toggle('active', open);
        hamburger.classList.toggle('active', open);
        hamburger.setAttribute('aria-expanded', String(open));
    };

    hamburger.addEventListener('click', (e) => {
        e.stopPropagation();
        setOpen(!navbar.classList.contains('active'));
    });
    navbar.querySelectorAll('a').forEach((link) => link.addEventListener('click', () => setOpen(false)));
    document.addEventListener('click', (e) => {
        if (!navbar.contains(e.target)) setOpen(false);
    });
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') setOpen(false);
    });
}

function markCurrentPage() {
    const page = location.pathname.split('/').pop() || 'index.html';
    document.querySelectorAll('.navbar a').forEach((link) => {
        if (link.getAttribute('href') === page) link.setAttribute('aria-current', 'page');
    });
}

// Header: fondo difuminado al hacer scroll; en móvil (CSS) se oculta al bajar y vuelve al subir
function onScroll() {
    const y = window.scrollY;
    if (Math.abs(y - previousScrollY) < 4) return; // ignora el rebote del scroll en móviles
    scrollDirection = y > previousScrollY ? "down" : "up";
    previousScrollY = y;

    const header = document.querySelector('header[data-layout="header"]');
    const menuOpen = document.querySelector('.navbar.active');
    header.classList.toggle('is-scrolled', y > 8);
    header.classList.toggle('is-hidden', scrollDirection === "down" && y > 120 && !menuOpen);
}

document.addEventListener("DOMContentLoaded", () => {
    window.addEventListener("scroll", onScroll, { passive: true });
    applyTranslations(); // traduce el contenido antes de que llegue el header, evita el parpadeo de idioma
    initScrollReveal();
    document.documentElement.classList.add("reveal-ready");
    loadLayouts()
        .then(() => {
            initLanguageToggle();
            initHamburgerMenu();
            markCurrentPage();
            applyTranslations();
        })
        .catch((error) => {
            console.error("No se pudieron cargar los elementos compartidos:", error);
        });
});
