// Rutas absolutas para que también funcionen desde la página 404 en cualquier URL
const layouts = {
    header: "/partials/header",
    footer: "/partials/footer"
};

const translations = {
    en: {
        "nav.home": "Home",
        "nav.cv": "CV",
        "cv.documentTitle": "CV — Rogelio Ceja",
        "cv.intro": "Choose the format you prefer and download it as PDF. The language follows the site toggle.",
        "cv.format": "Format",
        "cv.visual": "Visual",
        "cv.harvard": "Harvard (ATS)",
        "cv.download": "Download PDF",
        "cv.note": "Harvard is plain text, ideal for applicant tracking systems.",
        "cv.credentials.title": "Certifications, diplomas & participations",
        "cv.credentials.certification": "Certification",
        "cv.credentials.diploma": "Diploma",
        "cv.credentials.participation": "Participation",
        "cv.credentials.zoom": "Enlarge image:",
        "cv.credentials.close": "Close image",
        "about.cv": "View my CV",
        "ui.skip": "Skip to content",
        "quote.fab": "Price your site",
        "contact.quoteTitle": "Quote calculator",
        "contact.quoteValue": "Price your website",
        "contact.quoteDescription": "Own a business in Morelia? Build your quote in a couple of minutes, VAT included.",
        "contact.quoteAction": "Get a quote",
        "ui.copied": "Copied!",
        "ui.copyEmail": "Copy email",
        "ui.copyPhone": "Copy number",
        "ui.whatsapp": "Message on WhatsApp",
        "ui.waLink": "https://wa.me/524523412556?text=Hi%20Rogelio%2C%20I%20saw%20your%20portfolio",
        "ui.mediaError": "Image unavailable",
        "ui.playVideo": "Play the SIN GUARDAR gameplay video",
        "ui.gallery": "SIN GUARDAR gallery",
        "availability": "Open to internships & collaborations",
        "hero.role": "Systems Engineering student · Web & narrative game developer",
        "hero.text": "I build websites that are clear and fast, and stories you can play.",
        "hero.photoAlt": "Portrait of Rogelio Emmanuel Ceja",
        "projects.intro": "Things I've built, from idea to working version.",
        "projects.status": "In development",
        "projects.caseStudy": "Read the case study",
        "projects.erosion": "Erosion",
        "projects.next": "Next project in progress",
        "projects.nextText": "New projects are on the way. Check back soon.",
        "sg.documentTitle": "SIN GUARDAR — Case study · Rogelio Ceja",
        "sg.back": "All projects",
        "case.nextProject": "Next project",
        "sg.tagline": "A cosmic horror visual novel where your choices change the story and how the game looks.",
        "sg.factsTitle": "At a glance",
        "sg.statNodes": "decision nodes",
        "sg.statEndings": "endings, one secret",
        "sg.statRes": "custom art resolution",
        "sg.statJava": "Swing → JavaFX · Maven",
        "sg.detailsTitle": "Behind the game",
        "sg.erosionHint": "Rises as you read",
        "sg.erosionEnd": "Progress not saved…",
        "sg.investTitle": "Help bring it to stores",
        "sg.invest": "SIN GUARDAR is being polished for a store release. If you'd like to support or invest in its development, I'd love to talk.",
        "sg.investCta": "Let's talk",
        "pm.documentTitle": "Project Miralta — Cozy survival game in Phaser · Rogelio Ceja",
        "pm.tagline": "A cozy survival game where you tend a rooftop garden while the city runs out of water.",
        "pm.status": "Preview demo",
        "pm.gallery": "Project Miralta gallery",
        "pm.playVideo": "Play the Project Miralta demo video",
        "pm.videoPending": "Demo video coming soon",
        "pm.shotPending": "Screenshot coming soon",
        "pm.shot1": "Rooftop by day",
        "pm.shot2": "Acid rain",
        "pm.shot3": "Power load panel",
        "pm.shot4": "Forum photo",
        "pm.shot5": "Night map",
        "pm.lead": "Project Miralta is a hand-drawn 2D game. You are stuck on the rooftop of a collapsing megacity and must collect water, generate power, grow plants and trade with the city's districts. Nothing explains the problem to you: you learn it when contaminated water makes your crops sick.",
        "pm.idea": "The plants are the mechanism; the real subject is keeping a small ecosystem alive when the resource that sustains it is disappearing.",
        "pm.statDays": "full in-game days",
        "pm.statMinutes": "demo video",
        "pm.statSystems": "systems on the power panel",
        "pm.statKey": "key press per step",
        "pm.concept": "Concept",
        "pm.conceptContent": "A cozy survival and arcade botanical management game with a hand-drawn, comic-book look. I designed the concept, the systems and the scripted demo shown in the video, built on a custom scene engine with Phaser. The thread of the demo fits in one sentence: the player uses contaminated water out of necessity, a plant mutates, and that mutation changes a neighborhood.",
        "pm.demo": "What the demo shows",
        "pm.demoWaterTitle": "Water and its quality",
        "pm.demoWater": "Day 1: state water delivery, then acid rain leaves the tank contaminated.",
        "pm.demoCropsTitle": "Crops",
        "pm.demoCrops": "Day 1: watering and harvesting bougainvillea and pitaya.",
        "pm.demoChoiceTitle": "A choice with consequences",
        "pm.demoChoice": "Day 1 afternoon: cover the plants or open the gutter.",
        "pm.demoEconomyTitle": "Economy",
        "pm.demoEconomy": "Day 1 night: a parody store on the computer and bartering in the Lower Districts.",
        "pm.demoPowerTitle": "Power and priorities",
        "pm.demoPower": "Day 2: a blackout and a load panel with 5 systems on a limited budget.",
        "pm.demoMutationTitle": "Mutation",
        "pm.demoMutation": "Day 2: the water lily mutates and filters the water.",
        "pm.demoCityTitle": "A changing city",
        "pm.demoCity": "Day 2 night: a night map with smog, lit windows and a green patch in the Lower Districts.",
        "pm.demoWorldTitle": "World and humor",
        "pm.demoWorld": "Radio Miralta, the Dunk Wall forum, Air Off parcel service and Sergio the neighbor.",
        "pm.tech": "Technical Development",
        "pm.techEngine": "Built with Phaser, using Vite as the development server. A director runs a system of beats that reads a script and executes actions such as changing state, switching the time of day, showing dialogue, zooming into a plant or opening a page. A single list of beats serves both a short and a long version of the demo.",
        "pm.techState": "The game state is real, not pasted-on animation: water, power, mood and credits actually change; the script only decides who performs the action. The store, the parcel service and the forum are HTML pages mounted over the canvas, opened by a scripted cursor.",
        "pm.techTests": "The demo used to get stuck on double and triple clicks. I wrote automated Playwright runs to measure how many key presses each beat needed, found three causes and brought it down to one press per step.",
        "pm.art": "Art and Presentation",
        "pm.artContent": "2D hand-drawn art in a comic and graphic novel style, with Patrick Hand as the typeface. The night map uses Phaser tweens and particles for smog, windows, smoke and the green patch; the forum photo is made with CSS blur, grain and vignette. A reduced-motion mode shows everything at once.",
        "pm.statusTitle": "Project Status",
        "pm.statusContent": "Version preview.0.0.1, prepared as part of a research and presentation project for the XXIV Congreso Nacional de Divulgación de la Ciencia y la Técnica (“Rompamos Paradigmas”), held in Morelia, Michoacán, Mexico, from October 27 to 30, 2026, where I presented it. The video shows a scripted demo: the presenter advances with a single key and the engine performs the actions. Project Miralta is a codename; the final name is still to be decided.",
        "pm.water": "Water",
        "pm.investTitle": "Help it grow into a full game",
        "pm.invest": "Project Miralta is a preview built for a conference. If you'd like to support, fund or collaborate on its full development, I'd love to talk.",
        "pm.radioNext": "Next Radio Miralta bulletin",
        "pm.radioTune": "Tune in",
        "pm.radioWhen1": "Day 1 · 6:40 a.m.",
        "pm.radioWhen2": "Day 2 · 7:10 a.m.",
        "pm.radioWhen3": "Day 2 · night",
        "pm.radio1": "Radio Miralta, ninety-eight point three. It's six forty, and the sky, like city hall, promises a lot and commits to nothing.",
        "pm.radio2": "Forecast: clear until four. After that, rain is likely. Likely not the good kind.",
        "pm.radio3": "State water delivery: your area is up today. It'll get there when it gets there.",
        "pm.radio4": "Radio Miralta, ninety-eight point three. Today, heat. A lot. The heat island sends its regards, and so does evaporation.",
        "pm.radio5": "Power outages are expected in parts of the city. No areas, times or reasons are given. Thank you for your understanding.",
        "pm.radio6": "Radio Miralta, ninety-eight point three. That's all for today. Tomorrow, cloudy skies and water to be confirmed. Good night.",
        "pm.panelSection": "Try the Day 2 blackout",
        "pm.panelIntro": "The power is out. Sergio, the neighbor from 4B, hooks his batteries up to yours: you decide what stays on.",
        "pm.panelTitle": "Blackout load",
        "pm.available": "Available",
        "pm.panelNarrator": "Five systems ask for 26 Sparks, and there are only 14. You have to choose.",
        "pm.sysFridge": "Refrigerator",
        "pm.sysPurifier": "Purifier",
        "pm.sysPump": "Pump",
        "pm.sysUv": "UV",
        "pm.sysComputer": "Computer",
        "pm.on": "✓ On",
        "pm.off": "✕ Off",
        "pm.requested": "Requested",
        "pm.confirm": "Confirm",
        "pm.confirmed": "✓ Done",
        "pm.retry": "Try again",
        "pm.resMutAlert": "Water lily: mutation",
        "pm.resMut": "Something in the tub changed color. A scientist would call it phytoremediation. For now, you just see the water a little clearer.",
        "pm.resMutNote": "This plant filters the water",
        "pm.resCleanAlert": "Purifier on",
        "pm.resClean": "The water comes out clean and the lily stays as it is. This time nothing mutates.",
        "pm.offRefri": "Refrigerator off: food won't last long in this heat.",
        "pm.offPurificador": "Purifier off: the tank stays cloudy.",
        "pm.offBomba": "Pump off: water doesn't make it from the tank to the pots.",
        "pm.offUv": "UV off: the water isn't disinfected.",
        "pm.offComputadora": "Computer off: no RS Viewer this afternoon, so nobody in the Lower Districts asks you for anything.",
        "pm.hijuelo": "That afternoon, the Lower Districts ask for a plant for their cistern. You send them a cutting of the lily.",
        "pm.panelDemo": "In the demo: refrigerator, pump and computer stay on; purifier and UV go off.",
        "pm.sameAsDemo": "You chose the same as the demo.",
        "nf.documentTitle": "Page not found — Rogelio Ceja",
        "nf.title": "This page wasn't saved",
        "nf.text": "The link may be broken or the page has moved.",
        "nf.home": "Back to home",
        "contact.phoneTitle": "Phone · WhatsApp",
        "contact.phoneDescription": "For quick questions or to set up a call.",
        "footer.phone": "WhatsApp:",
        "ui.menu": "Menu",
        "ui.prev": "Previous",
        "ui.next": "Next",
        "projects.shot1": "SIN GUARDAR screenshot 1",
        "projects.shot2": "SIN GUARDAR screenshot 2",
        "projects.shot3": "SIN GUARDAR screenshot 3",
        "education.photoAlt": "Rogelio at Universidad Vasco de Quiroga",
        "nav.profile": "Profile",
        "nav.projects": "Projects",
        "nav.contact": "Contact",
        "language.switch": "Español",
        "footer.copyright": "Rogelio Emmanuel Ceja",
        "footer.rights": "&copy; 2026 Rogelio Emmanuel Ceja. All rights reserved.",
        "privacy.documentTitle": "Privacy — Rogelio Ceja",
        "privacy.title": "Privacy",
        "privacy.intro": "Short version: I don't collect your data. Here is exactly what happens when you use this site.",
        "privacy.updated": "Last updated: October 2026",
        "privacy.factsLabel": "Summary",
        "privacy.detailsLabel": "Details",
        "privacy.fact1": "cookies",
        "privacy.fact2": "accounts",
        "privacy.fact3": "analytics tools",
        "privacy.fact4": "forms that send your data",
        "privacy.c1.title": "What is saved",
        "privacy.c1.body": "Only your language choice (English or Spanish), in your own browser. It never leaves your device and you can erase it by clearing the site data.",
        "privacy.c2.title": "Quote calculator",
        "privacy.c2.body": "The numbers are calculated on your device. Nothing you pick is sent to me or stored: it only becomes a message if you decide to open it in WhatsApp.",
        "privacy.c3.title": "Email and WhatsApp",
        "privacy.c3.body": "If you write to me, the message goes through your email provider or WhatsApp and reaches me with whatever you decide to include. Their own privacy policies apply.",
        "privacy.c4.title": "Gameplay video",
        "privacy.c4.body": "The SIN GUARDAR video loads from YouTube only when you press play, using its privacy-enhanced mode. Until then, YouTube receives nothing from you.",
        "privacy.c5.title": "Hosting",
        "privacy.c5.body": "Like any host, Cloudflare processes technical data of each visit, such as the IP address, to deliver and protect the site. I don't use that data to track you.",
        "privacy.c6.title": "Questions",
        "privacy.c6.body": "Want to know more, or ask me to delete a message you sent me? Write to me.",
        "privacy.contact": "Get in touch",
        "footer.privacy": "Privacy",
        "footer.contact": "Contact Information",
        "footer.email": "Email:",
        "footer.github": "GitHub:",
        "footer.linkedin": "LinkedIn:",
        "contact.documentTitle": "Contact — Rogelio Ceja",
        "contact.title": "Get in touch",
        "contact.intro": "Have a project in mind, an opportunity, or just want to say hello? Reach out through any of these channels.",
        "contact.emailTitle": "Email",
        "contact.emailDescription": "The best way to reach me directly.",
        "contact.githubDescription": "Explore my code and projects.",
        "contact.linkedinDescription": "Let's connect professionally.",
        "contact.emailAction": "Send me an email",
        "contact.profileAction": "View profile",
        "index.documentTitle": "Rogelio Emmanuel Ceja — Web Developer Portfolio",
        "profile.documentTitle": "Profile — Rogelio Ceja",
        "projects.documentTitle": "Projects — Rogelio Ceja",
        "welcome.ctaProjects": "See my projects",
        "welcome.ctaContact": "Get in touch",
        "about.title": "About Me",
        "about.intro": "I'm Rogelio, a 5th-semester Systems Engineering student at UVAQ. I care about the details that make a site feel clear, fast and easy to use.",
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
        "education.degree": "B.S. in Computer Systems Engineering and Information Security",
        "education.school": "Universidad Vasco de Quiroga (UVAQ)",
        "education.status": "In progress · 5th semester",
        "projects.title": "My Projects",
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
    },
    es: {
        "nav.home": "Inicio",
        "nav.cv": "CV",
        "cv.documentTitle": "CV — Rogelio Ceja",
        "cv.intro": "Elige el formato que prefieras y descárgalo en PDF. El idioma sigue al selector del sitio.",
        "cv.format": "Formato",
        "cv.visual": "Visual",
        "cv.harvard": "Harvard (ATS)",
        "cv.download": "Descargar PDF",
        "cv.note": "Harvard es texto plano, ideal para los sistemas de reclutamiento (ATS).",
        "cv.credentials.title": "Certificaciones, diplomas y participaciones",
        "cv.credentials.certification": "Certificación",
        "cv.credentials.diploma": "Diploma",
        "cv.credentials.participation": "Participación",
        "cv.credentials.zoom": "Ampliar imagen:",
        "cv.credentials.close": "Cerrar imagen",
        "about.cv": "Ver mi CV",
        "ui.skip": "Saltar al contenido",
        "quote.fab": "Cotiza tu sitio",
        "contact.quoteTitle": "Cotizador",
        "contact.quoteValue": "Cotiza tu sitio web",
        "contact.quoteDescription": "¿Tienes un negocio en Morelia? Arma tu cotización en un par de minutos, con IVA incluido.",
        "contact.quoteAction": "Cotizar mi sitio",
        "ui.copied": "¡Copiado!",
        "ui.copyEmail": "Copiar correo",
        "ui.copyPhone": "Copiar número",
        "ui.whatsapp": "Escribir por WhatsApp",
        "ui.waLink": "https://wa.me/524523412556?text=Hola%20Rogelio%2C%20vi%20tu%20portafolio",
        "ui.mediaError": "Imagen no disponible",
        "ui.playVideo": "Reproducir el video de gameplay de SIN GUARDAR",
        "ui.gallery": "Galería de SIN GUARDAR",
        "availability": "Disponible para prácticas y colaboraciones",
        "hero.role": "Estudiante de Ingeniería en Sistemas · Desarrollo web y videojuegos narrativos",
        "hero.text": "Construyo sitios web claros y rápidos, e historias que se juegan.",
        "hero.photoAlt": "Retrato de Rogelio Emmanuel Ceja",
        "projects.intro": "Lo que he construido, de la idea a la versión funcional.",
        "projects.status": "En desarrollo",
        "projects.caseStudy": "Ver el caso completo",
        "projects.erosion": "Erosión",
        "projects.next": "Siguiente proyecto en camino",
        "projects.nextText": "Pronto subiré nuevos proyectos.",
        "sg.documentTitle": "SIN GUARDAR — Caso de estudio · Rogelio Ceja",
        "sg.back": "Todos los proyectos",
        "case.nextProject": "Siguiente proyecto",
        "sg.tagline": "Una novela visual de horror cósmico donde tus decisiones cambian la historia y cómo se ve el juego.",
        "sg.factsTitle": "En resumen",
        "sg.statNodes": "nodos de decisión",
        "sg.statEndings": "finales, uno secreto",
        "sg.statRes": "resolución del arte propio",
        "sg.statJava": "Swing → JavaFX · Maven",
        "sg.detailsTitle": "Detrás del juego",
        "sg.erosionHint": "Aumenta mientras lees",
        "sg.erosionEnd": "Progreso sin guardar…",
        "sg.investTitle": "Ayúdame a llevarlo a tiendas",
        "sg.invest": "SIN GUARDAR se está puliendo para publicarse en tiendas. Si te interesa apoyar o invertir en su desarrollo, me encantaría platicarlo.",
        "sg.investCta": "Hablemos",
        "pm.documentTitle": "Project Miralta — Videojuego cozy survival en Phaser · Rogelio Ceja",
        "pm.tagline": "Videojuego cozy survival donde mantienes un huerto en una azotea mientras la ciudad se queda sin agua.",
        "pm.status": "Demo preview",
        "pm.gallery": "Galería de Project Miralta",
        "pm.playVideo": "Reproducir el video de la demo de Project Miralta",
        "pm.videoPending": "Video de la demo en camino",
        "pm.shotPending": "Captura en camino",
        "pm.shot1": "Azotea de día",
        "pm.shot2": "Lluvia ácida",
        "pm.shot3": "Panel de carga",
        "pm.shot4": "Foto del foro",
        "pm.shot5": "Mapa nocturno",
        "pm.lead": "Project Miralta es un videojuego 2D dibujado a mano. Estás atrapado en la azotea de una megalópolis en colapso y debes recolectar agua, producir electricidad, cultivar y comerciar con los distritos de la ciudad. Nada te explica el problema: lo descubres cuando usas agua contaminada y tu cultivo se enferma.",
        "pm.idea": "Las plantas son el mecanismo; el tema real es mantener vivo un pequeño ecosistema cuando el recurso que lo hace posible desaparece.",
        "pm.statDays": "días completos de juego",
        "pm.statMinutes": "de video de la demo",
        "pm.statSystems": "sistemas en el panel de carga",
        "pm.statKey": "pulsación por paso",
        "pm.concept": "Concepto",
        "pm.conceptContent": "Un cozy survival de gestión botánica arcade con estilo dibujado a mano, tipo cómic. Diseñé el concepto, los sistemas y la demo guionada que se ve en el video, construida sobre un motor propio de escenas con Phaser. El hilo de la demo cabe en una frase: el jugador usa agua contaminada por necesidad, una planta muta, y esa mutación cambia un barrio.",
        "pm.demo": "Qué muestra la demo",
        "pm.demoWaterTitle": "Agua y su calidad",
        "pm.demoWater": "Día 1: reparto estatal y luego lluvia ácida que deja el tanque contaminado.",
        "pm.demoCropsTitle": "Cultivo",
        "pm.demoCrops": "Día 1: regar y cosechar bugambilia y pitayita.",
        "pm.demoChoiceTitle": "Decisión con consecuencia",
        "pm.demoChoice": "Día 1 por la tarde: cubrir las plantas o abrir la canaleta.",
        "pm.demoEconomyTitle": "Economía",
        "pm.demoEconomy": "Día 1 por la noche: tienda parodia en la computadora y trueque en Barrios Bajos.",
        "pm.demoPowerTitle": "Electricidad y prioridades",
        "pm.demoPower": "Día 2: apagón y panel de carga de 5 sistemas con presupuesto limitado.",
        "pm.demoMutationTitle": "Mutación",
        "pm.demoMutation": "Día 2: el lirio acuático muta y filtra el agua.",
        "pm.demoCityTitle": "Una ciudad que cambia",
        "pm.demoCity": "Día 2 por la noche: mapa nocturno con smog, ventanas encendidas y un parche verde en Barrios Bajos.",
        "pm.demoWorldTitle": "Mundo y humor",
        "pm.demoWorld": "Radio Miralta, el foro Dunk Wall, la paquetería Air Off y el vecino Sergio.",
        "pm.tech": "Desarrollo técnico",
        "pm.techEngine": "Construido con Phaser, con Vite como servidor de desarrollo. Un director ejecuta un sistema de beats que lee un guion y lanza acciones como cambiar el estado, cambiar el momento del día, mostrar diálogos, hacer zoom a una planta o abrir una página. Una sola lista de beats sirve para una versión corta y una larga de la demo.",
        "pm.techState": "El estado del juego es real, no una animación pegada: el agua, la electricidad, el ánimo y los créditos cambian de verdad; el guion solo decide quién ejecuta la acción. La tienda, la paquetería y el foro son páginas HTML montadas sobre el canvas, que abre un cursor guionado.",
        "pm.techTests": "La demo se atascaba con dobles y triples clics. Escribí recorridos automáticos con Playwright para medir cuántas pulsaciones pedía cada beat, encontré tres causas y lo reduje a una pulsación por paso.",
        "pm.art": "Arte y presentación",
        "pm.artContent": "Arte 2D dibujado a mano con estilo de cómic y novela gráfica, con Patrick Hand como tipografía. El mapa nocturno usa tweens y partículas de Phaser para el smog, las ventanas, el humo y el parche verde; la foto del foro se hace con CSS (desenfoque, grano y viñeta). Un modo de reducir movimiento muestra todo de golpe.",
        "pm.statusTitle": "Estado del proyecto",
        "pm.statusContent": "Versión preview.0.0.1, preparada como parte de un trabajo de investigación y presentación para el XXIV Congreso Nacional de Divulgación de la Ciencia y la Técnica («Rompamos Paradigmas»), celebrado en Morelia, Michoacán, del 27 al 30 de octubre de 2026, donde la presenté. El video muestra una demo guionada: el presentador avanza con una sola tecla y el motor ejecuta las acciones. Project Miralta es un nombre en clave; el nombre definitivo sigue pendiente.",
        "pm.water": "Agua",
        "pm.investTitle": "Ayúdame a convertirlo en un juego completo",
        "pm.invest": "Project Miralta es una preview creada para un congreso. Si te interesa apoyar, financiar o colaborar en su desarrollo completo, me encantaría platicarlo.",
        "pm.radioNext": "Siguiente boletín de Radio Miralta",
        "pm.radioTune": "Sintonizar",
        "pm.radioWhen1": "Día 1 · 6:40 a. m.",
        "pm.radioWhen2": "Día 2 · 7:10 a. m.",
        "pm.radioWhen3": "Día 2 · noche",
        "pm.radio1": "Radio Miralta, noventa y ocho punto tres. Son las seis cuarenta y el cielo, como el ayuntamiento, promete mucho y no se compromete a nada.",
        "pm.radio2": "Pronóstico: despejado hasta las cuatro. Después, probable lluvia. Probable que no sea de la buena.",
        "pm.radio3": "Reparto estatal de agua: hoy toca en su zona. Llegará cuando llegue.",
        "pm.radio4": "Radio Miralta, noventa y ocho punto tres. Hoy calor. Mucho. La isla de calor manda saludos, y la evaporación también.",
        "pm.radio5": "Se prevé interrupción del suministro eléctrico en zonas de la ciudad. No se especifican zonas, ni horarios, ni motivos. Gracias por su comprensión.",
        "pm.radio6": "Radio Miralta, noventa y ocho punto tres. Cerramos por hoy. Mañana, cielo nublado y agua por confirmar. Buenas noches.",
        "pm.panelSection": "Prueba el apagón del Día 2",
        "pm.panelIntro": "Se fue la luz. Sergio, el vecino del 4B, conecta sus baterías a las tuyas: tú decides qué se queda encendido.",
        "pm.panelTitle": "Carga del apagón",
        "pm.available": "Disponible",
        "pm.panelNarrator": "Cinco sistemas piden 26 Chispas, y solo hay 14. Hay que elegir.",
        "pm.sysFridge": "Refrigerador",
        "pm.sysPurifier": "Purificador",
        "pm.sysPump": "Bomba",
        "pm.sysUv": "UV",
        "pm.sysComputer": "Computadora",
        "pm.on": "✓ Encendido",
        "pm.off": "✕ Apagado",
        "pm.requested": "Pedido",
        "pm.confirm": "Confirmar",
        "pm.confirmed": "✓ Listo",
        "pm.retry": "Volver a intentar",
        "pm.resMutAlert": "Lirio acuático: mutación",
        "pm.resMut": "Algo en la tina cambió de color. Un científico lo llamaría fitorremediación. Tú, por ahora, solo ves el agua un poco más clara.",
        "pm.resMutNote": "Esta planta filtra el agua",
        "pm.resCleanAlert": "Purificador encendido",
        "pm.resClean": "El agua sale limpia y el lirio sigue igual. Esta vez no muta nada.",
        "pm.offRefri": "Refrigerador apagado: la comida aguanta poco con este calor.",
        "pm.offPurificador": "Purificador apagado: la barra del tanque sigue turbia.",
        "pm.offBomba": "Bomba apagada: el agua no sube del tanque a las macetas.",
        "pm.offUv": "UV apagada: el agua no se desinfecta.",
        "pm.offComputadora": "Computadora apagada: esta tarde no abres RS Viewer y nadie de Barrios Bajos te pide nada.",
        "pm.hijuelo": "Por la tarde, Barrios Bajos te pide una planta para su cisterna. Le mandas un hijuelo del lirio.",
        "pm.panelDemo": "En la demo: refrigerador, bomba y computadora encendidos; purificador y UV apagados.",
        "pm.sameAsDemo": "Elegiste lo mismo que la demo.",
        "nf.documentTitle": "Página no encontrada — Rogelio Ceja",
        "nf.title": "Esta página no se guardó",
        "nf.text": "Puede que el enlace esté roto o que la página se haya movido.",
        "nf.home": "Volver al inicio",
        "contact.phoneTitle": "Teléfono · WhatsApp",
        "contact.phoneDescription": "Para dudas rápidas o para agendar una llamada.",
        "footer.phone": "WhatsApp:",
        "ui.menu": "Menú",
        "ui.prev": "Anterior",
        "ui.next": "Siguiente",
        "projects.shot1": "Captura de SIN GUARDAR 1",
        "projects.shot2": "Captura de SIN GUARDAR 2",
        "projects.shot3": "Captura de SIN GUARDAR 3",
        "education.photoAlt": "Rogelio en la Universidad Vasco de Quiroga",
        "nav.profile": "Perfil",
        "nav.projects": "Proyectos",
        "nav.contact": "Contacto",
        "language.switch": "English",
        "footer.copyright": "Rogelio Emmanuel Ceja",
        "footer.rights": "&copy; 2026 Rogelio Emmanuel Ceja. Todos los derechos reservados.",
        "privacy.documentTitle": "Privacidad — Rogelio Ceja",
        "privacy.title": "Privacidad",
        "privacy.intro": "Versión corta: no recojo tus datos. Aquí está exactamente qué pasa cuando usas este sitio.",
        "privacy.updated": "Última actualización: octubre de 2026",
        "privacy.factsLabel": "Resumen",
        "privacy.detailsLabel": "Detalles",
        "privacy.fact1": "cookies",
        "privacy.fact2": "cuentas",
        "privacy.fact3": "herramientas de analítica",
        "privacy.fact4": "formularios que envíen tus datos",
        "privacy.c1.title": "Qué se guarda",
        "privacy.c1.body": "Solo tu elección de idioma (español o inglés), en tu propio navegador. No sale de tu dispositivo y la puedes borrar limpiando los datos del sitio.",
        "privacy.c2.title": "Cotizador",
        "privacy.c2.body": "Los números se calculan en tu dispositivo. Nada de lo que eliges se me envía ni se guarda: solo se vuelve un mensaje si decides abrirlo en WhatsApp.",
        "privacy.c3.title": "Correo y WhatsApp",
        "privacy.c3.body": "Si me escribes, el mensaje pasa por tu proveedor de correo o por WhatsApp y me llega con lo que tú decidas incluir. Aplican las políticas de privacidad de cada uno.",
        "privacy.c4.title": "Video del juego",
        "privacy.c4.body": "El video de SIN GUARDAR se carga desde YouTube solo cuando le das reproducir, en su modo de privacidad mejorada. Hasta entonces, YouTube no recibe nada tuyo.",
        "privacy.c5.title": "Hosting",
        "privacy.c5.body": "Como cualquier hosting, Cloudflare procesa datos técnicos de cada visita, como la dirección IP, para entregar y proteger el sitio. Yo no uso esos datos para rastrearte.",
        "privacy.c6.title": "Dudas",
        "privacy.c6.body": "¿Quieres saber más o pedirme que borre un mensaje que me enviaste? Escríbeme.",
        "privacy.contact": "Escríbeme",
        "footer.privacy": "Privacidad",
        "footer.contact": "Información de contacto",
        "footer.email": "Correo:",
        "footer.github": "GitHub:",
        "footer.linkedin": "LinkedIn:",
        "contact.documentTitle": "Contacto — Rogelio Ceja",
        "contact.title": "Hablemos",
        "contact.intro": "¿Tienes un proyecto en mente, una oportunidad o simplemente quieres saludar? Puedes escribirme por cualquiera de estos medios.",
        "contact.emailTitle": "Correo electrónico",
        "contact.emailDescription": "La forma más directa de contactarme.",
        "contact.githubDescription": "Explora mi código y mis proyectos.",
        "contact.linkedinDescription": "Conectemos profesionalmente.",
        "contact.emailAction": "Enviarme un correo",
        "contact.profileAction": "Ver perfil",
        "index.documentTitle": "Rogelio Emmanuel Ceja — Portafolio de desarrollo web",
        "profile.documentTitle": "Perfil — Rogelio Ceja",
        "projects.documentTitle": "Proyectos — Rogelio Ceja",
        "welcome.ctaProjects": "Ver mis proyectos",
        "welcome.ctaContact": "Contáctame",
        "about.title": "Sobre mí",
        "about.intro": "Soy Rogelio, estudiante de quinto semestre de Ingeniería en Sistemas en la UVAQ. Me importan los detalles que hacen que un sitio se sienta claro, rápido y fácil de usar.",
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
        "education.degree": "Ingeniería en Sistemas Computacionales y Seguridad Informática",
        "education.school": "Universidad Vasco de Quiroga (UVAQ)",
        "education.status": "En curso · 5.º semestre",
        "projects.title": "Mis Proyectos",
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
    }
};

window.translations = translations;

// Idioma: lo decide la URL en las páginas que tienen versión /es/ (js-flag.js ya mandó a /es/ a quien prefiere
// español). En el resto (cotizador, 404): el que eligió el visitante o, en su primera visita, el de su navegador.
const isSpanishUrl = /^\/es(\/|$)/.test(location.pathname);
let currentLanguage = isSpanishUrl ? "es"
    : isLocalizedPage() ? "en"
    : localStorage.getItem("portfolio-language")
        || ((navigator.language || "").toLowerCase().startsWith("es") ? "es" : "en");
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

    // Cada sección aparece una sola vez (10% dentro de la pantalla) y se queda: al volver a subir, el
    // contenido sigue ahí, y la impresión, el buscador de la página y los scrolls rápidos no ven huecos.
    const showObserver = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (!entry.isIntersecting) return;
                entry.target.dataset.revealDirection = scrollDirection;
                entry.target.classList.add("is-visible");
                showObserver.unobserve(entry.target);
            });
        },
        { rootMargin: "-10% 0px" }
    );

    elements.forEach((element) => showObserver.observe(element));
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
            const next = currentLanguage === "en" ? "es" : "en";
            localStorage.setItem("portfolio-language", next);
            // Con versión en cada idioma se cambia de URL; si no, se traduce en el lugar
            if (isLocalizedPage()) {
                location.href = localizedUrl(currentPage(), next) + location.search + location.hash;
                return;
            }
            currentLanguage = next;
            applyTranslations();
            document.dispatchEvent(new Event('languageChanged'));
        });
    });
}

// Nombre de página sin barras, prefijo /es ni .html, para que "/cv", "/cv.html" y "/es/cv" cuenten igual (la portada es "index")
function pageName(path) {
    return path.split(/[?#]/)[0].replace(/^\/(es(?:\/|$))?/, '').replace(/\/$/, '').replace(/\.html$/, '') || 'index';
}

function isLocalizedPage() {
    return (window.localizedPages || []).includes(currentPage());
}

function localizedUrl(page, language) {
    return `${language === "es" ? "/es" : ""}/${page === "index" ? "" : page}`;
}

// En /es/, los enlaces del header y el footer llevan a la versión en español de cada página
function localizeLayoutLinks() {
    if (!isSpanishUrl) return;
    document.querySelectorAll('[data-layout] a[href^="/"]').forEach((link) => {
        const page = pageName(link.getAttribute('href'));
        if ((window.localizedPages || []).includes(page)) link.setAttribute('href', localizedUrl(page, "es"));
    });
}

function currentPage() {
    return pageName(location.pathname);
}

// Botón flotante al cotizador: aparece al pasar la portada y no estorba en Contacto ni en el propio cotizador
function initQuoteFab() {
    const fab = document.querySelector(".quote-fab");
    if (!fab) return;
    const page = currentPage();
    if (page === "contact" || page === "cotizar") {
        fab.hidden = true;
        return;
    }
    const update = () => fab.classList.toggle("is-visible", window.scrollY > window.innerHeight * 0.6);
    window.addEventListener("scroll", update, { passive: true });
    update();
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
    // Una página de proyecto puede marcar "Proyectos" con <body data-nav="projects">
    const page = document.body.dataset.nav || currentPage();
    document.querySelectorAll('.navbar a').forEach((link) => {
        if (pageName(link.getAttribute('href')) === page) link.setAttribute('aria-current', 'page');
    });
}

// Skeletons: cada .skel brilla hasta que su imagen o iframe termina de cargar
function watchSkeleton(container) {
    const media = container.querySelector('iframe') || container.querySelector('img');
    if (!media) return;
    container.classList.remove('is-loaded', 'is-error');

    const done = () => container.classList.add('is-loaded');
    const fail = () => {
        // Miniatura de YouTube en alta: si no existe, usa la estándar
        if (media.dataset.fallback && media.src !== media.dataset.fallback) {
            media.src = media.dataset.fallback;
            return;
        }
        container.classList.add('is-error');
    };

    if (media.tagName === 'IMG' && media.complete) {
        media.naturalWidth > 0 ? done() : fail();
    }
    media.addEventListener('load', done);
    media.addEventListener('error', fail);
}

function initSkeletons() {
    document.querySelectorAll('.skel').forEach(watchSkeleton);
}

// Video: se muestra la miniatura y el reproductor de YouTube solo se carga al tocarla
function initYouTubeFacades() {
    document.querySelectorAll('.yt-facade[data-yt]').forEach((button) => {
        button.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            const iframe = document.createElement('iframe');
            iframe.src = `https://www.youtube-nocookie.com/embed/${button.dataset.yt}?autoplay=1&enablejsapi=1&start=${button.dataset.start || 0}`;
            iframe.title = button.getAttribute('aria-label');
            iframe.allow = 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share';
            iframe.allowFullscreen = true;
            iframe.className = 'yt-frame';
            const container = button.parentElement;
            button.replaceWith(iframe);
            watchSkeleton(container);
            iframe.focus();
        });
    });
}

// Botones "Copiar": copian data-copy y confirman durante 2 s
function initCopyButtons() {
    document.querySelectorAll('[data-copy]').forEach((button) => {
        button.addEventListener('click', async () => {
            const label = button.querySelector('[data-i18n]');
            try {
                await navigator.clipboard.writeText(button.dataset.copy);
            } catch {
                window.prompt('', button.dataset.copy); // navegadores sin acceso al portapapeles
                return;
            }
            label.textContent = translations[currentLanguage]['ui.copied'];
            button.classList.add('is-copied');
            clearTimeout(button.copyTimer);
            button.copyTimer = setTimeout(() => {
                label.textContent = translations[currentLanguage][label.dataset.i18n];
                button.classList.remove('is-copied');
            }, 2000);
        });
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

// iOS Safari solo activa :active (respuesta al toque) si la página escucha algún evento táctil
document.addEventListener("touchstart", () => {}, { passive: true });

document.addEventListener("DOMContentLoaded", () => {
    window.addEventListener("scroll", onScroll, { passive: true });
    applyTranslations(); // traduce el contenido antes de que llegue el header, evita el parpadeo de idioma
    initSkeletons();
    initYouTubeFacades();
    initCopyButtons();
    initScrollReveal();
    document.documentElement.classList.add("reveal-ready");
    loadLayouts()
        .then(() => {
            localizeLayoutLinks();
            initLanguageToggle();
            initHamburgerMenu();
            initQuoteFab();
            markCurrentPage();
            applyTranslations();
        })
        .catch((error) => {
            console.error("No se pudieron cargar los elementos compartidos:", error);
        });
});
