/* main.js — i18n toggle, Calendly tabs, footer year. Shared by the landing
   and all five category pages; every section it drives is guarded, so a page
   without a booking well or without disclosures costs nothing.

   No browser storage APIs or cookies used anywhere in this file. Language
   state lives in memory and in the URL's query string only. */

(function () {
  'use strict';

  /* --------------------------------------------------------------------
     1. i18n dictionary — covers every data-i18n / data-i18n-aria /
        data-i18n-content key in index.html, in both directions.
     -------------------------------------------------------------------- */
  var i18n = {
    es: {
      'meta.title': 'Luis Xavier García Pimentel Ascencio — Ingeniería en Robótica',
      'meta.ogImageAlt': 'Trazo de señal que pasa de ruido a una decisión discreta, sobre fondo azul-carbón, junto al nombre Luis Xavier García Pimentel Ascencio.',
      'a11y.skip': 'Saltar al contenido',
      'nav.ariaLabel': 'Navegación principal',
      'nav.subtitle': 'Ingeniería en Robótica · Tec GDL',
      'nav.projects': 'Proyectos',
      'nav.about': 'Sobre mí',
      'nav.bookCta': 'Agendar',
      /* WCAG 2.5.3: the accessible name has to contain the visible label,
         which is the code of the language you can switch TO. */
      'langToggle.ariaLabel': 'EN — cambiar a inglés',

      'hero.heading': 'Convierto sensores en decisiones.',
      'hero.subline': 'Estudiante de Ingeniería en Robótica · ROS2 · Edge AI · ESP32 · EEG · robótica de competencia.',
      'hero.scope.in': 'IN · CRUDO',
      'hero.scope.out': 'OUT · DECISIÓN',
      'hero.cta.primary': 'Agendar una reunión',
      'hero.cta.secondary': 'Ver proyectos',

      'social.github': 'GitHub',
      'social.linkedin': 'LinkedIn',
      'social.email': 'Email',

      'projects.eyebrow': 'Tablero de lecturas',
      'projects.more': 'Ver todo en GitHub',
      'channel.readingLabel': 'LECTURA',

      /* Sub-page titles. Each category page owns its own <title> key, so the
         browser tab, the history entry and the share preview all say which
         bank you are on. */
      'meta.title.robotica': 'Robótica — Luis Xavier García Pimentel Ascencio',
      'meta.title.senales': 'Señales e IA — Luis Xavier García Pimentel Ascencio',
      'meta.title.telemetria': 'Telemetría y potencia — Luis Xavier García Pimentel Ascencio',
      'meta.title.software': 'Software y herramientas — Luis Xavier García Pimentel Ascencio',
      'meta.title.ia': 'LLM / Orquestación — Luis Xavier García Pimentel Ascencio',
      'meta.title.formacion': 'Formación — Luis Xavier García Pimentel Ascencio',

      /* Vehicle pages sit a level below the Telemetría bank; each owns its
         browser-tab / share title the same way a bank page does. */
      'meta.title.vehiculo.madrams': 'Coche MadRams — Luis Xavier García Pimentel Ascencio',
      'meta.title.vehiculo.quantum': 'Quantum Speed Racing — Luis Xavier García Pimentel Ascencio',
      'meta.title.vehiculo.elyos': 'Silca Elyos Racing — Luis Xavier García Pimentel Ascencio',

      'nav.back': 'Volver al tablero',
      'nav.siblings': 'Otros bancos',

      /* Vehicle-page furniture — labels the data-rendered build sheets share. */
      'vehicle.back': 'Volver a Telemetría y potencia',
      'vehicle.siblings': 'Otros vehículos',
      'vehicle.modulesWord': 'módulos',
      'vehicle.modulesHeading': 'Módulos',
      'vehicle.state': 'Estado honesto',
      'vehicle.base': 'Base',
      'vehicle.cta': 'Ver el vehículo',

      /* Maturity ladder shown on each module, dim → hot. */
      'status.explore': 'exploratorio',
      'status.design': 'en diseño',
      'status.integration': 'en integración',
      'status.bench': 'validado en banco',
      'status.track': 'validado en pista',

      /* Documentation button. Elyos points at the team's workspace, so it is
         labelled as such rather than as the author's own docs. */
      'doc.default': 'Documentación técnica',
      'doc.team': 'Documentación del equipo',

      /* Channels are addressed bank-first (CH.1.1, CH.1.2 …), so the flagship
         of every bank is always its .1 and the landing reads 1·2·3·4·5 instead
         of a shuffled global sequence. This label names the bank above it. */
      'bank.label': 'Banco',
      'bank.rest': 'También en este banco',

      /* Sub-group labels. A bank large enough to split its board names the
         groups (LLM/Orquestación), and the same keys caption the landing
         teaser and the sub-page board headings. */
      'group.orquestacion': 'Orquestación propia',
      'group.capacidades': 'Capacidades / skills para Claude Code',

      /* One category per sub-page: the name, the one-line framing under it,
         how many channels it holds, and the landing card's handoff link. */
      'cat.robotica.name': 'Robótica',
      'cat.robotica.line': 'Percibir: visión, brazos y navegación — máquinas que leen el mundo antes de moverse.',
      'cat.robotica.count': '3 canales',
      'cat.robotica.more': 'Ver los 3 · Robótica',

      'cat.senales.name': 'Señales e IA',
      'cat.senales.line': 'Procesar: señales crudas convertidas en decisiones — EEG, física aplicada y aprendizaje automático.',
      'cat.senales.count': '2 canales',
      'cat.senales.more': 'Ver los 2 · Señales',

      'cat.telemetria.name': 'Telemetría y potencia',
      'cat.telemetria.line': 'Coches de competencia que se explican solos: telemetría en pista y los sistemas de potencia que la alimentan.',
      'cat.telemetria.count': '3 canales',
      'cat.telemetria.more': 'Ver los 3 · Telemetría',

      'cat.software.name': 'Software y herramientas',
      'cat.software.line': 'Las herramientas: plataformas, mapas y utilidades que uso —o entrego— para que otros trabajen más rápido.',
      'cat.software.count': '4 canales',
      'cat.software.more': 'Ver los 4 · Software',

      'cat.ia.name': 'LLM / Orquestación',
      'cat.ia.line': 'Orquestar el modelo, no reemplazarlo: agentes con fallback por rol y skills que le dan manos y ojos a Claude Code.',
      'cat.ia.count': '5 canales',
      'cat.ia.more': 'Ver los 5 · LLM / Orquestación',

      'cat.formacion.name': 'Formación',
      'cat.formacion.line': 'Enseñar lo que me enseñó el coche: cursos abiertos para que un equipo nuevo arranque sin esperar a nadie.',
      'cat.formacion.count': 'programa de 3 bloques',
      'cat.formacion.more': 'Ver el programa completo',

      'proj.jtcs.unit': 'conteo por carril',
      'proj.jtcs.tagline': 'Semáforos que se adaptan al tráfico en tiempo real.',
      'proj.jtcs.blurb': 'Control de intersecciones con visión en el borde: un detector YOLOv11 cuenta vehículos por carril y reparte el verde con una fórmula derivada de Webster (HCM/MUTCD). Dashboard en React con simulación de red y ondas verdes; corre en Raspberry Pi. Guadalahacks 2026.',
      'proj.jtcs.panel.body': 'Demo interactivo en el navegador — sin backend. Fase 1: ajusta el tráfico con +/− y ve cómo cambia el tiempo de verde (fórmula derivada de Webster). Fase 2: dibuja una red de intersecciones y simula autos con onda verde.',
      'proj.jtcs.panel.tech1': 'Detección en el borde con YOLOv11 sobre Raspberry Pi.',
      'proj.jtcs.panel.tech2': 'Tiempos de verde según MUTCD/HCM.',
      'proj.jtcs.panel.tech3': 'Onda verde sincronizada entre intersecciones.',

      'proj.agrobot.unit': 'brazo + visión de madurez',
      'proj.agrobot.tagline': 'Robot que cosecha berries maduras por visión.',
      'proj.agrobot.blurb': 'Prototipo de prepa (equipo Silmarils, ITESO): una cinta transportadora guía frambuesas y una garra de brazo de 6 GDL las recolecta. Un detector YOLOv8n (TensorFlow, Pi Camera V2) identifica el fruto por madurez y su posición se pasa al brazo por cinemática inversa vía Arduino. Las piezas —visión, brazo, cinemática— se probaron por separado; la integración total quedó a nivel prototipo.',

      'proj.neurobeat.unit': 'EEG · 8 canales',
      'proj.neurobeat.tagline': 'Un juego que controlas con la mente.',
      'proj.neurobeat.blurb': 'Traduce señales EEG del headset Unicorn Black (8 canales) en acciones de juego: filtrado notch/bandpass/ICA, un modelo EEGNet detecta parpadeos deliberados y el giroscopio mueve el cursor, todo por UDP hacia un juego en Unity. Hackathon Brain.io.',

      'proj.telemetry.unit': 'telemetría en vivo',
      'proj.telemetry.tagline': 'Telemetría en vivo para coches de competencia SAE.',
      'proj.telemetry.note': 'Ignitia y Elyos quedan fuera a propósito: o ya tienen sistema propio, o usan uno lo bastante distinto como para que acoplarlo no valga la pena.',
      'proj.telemetry.blurb': 'Stack de telemetría en tiempo real: sensores en un ESP32 (RPM, temperatura, GPS, suspensión) enviados por LoRa 915 MHz o WiFi hacia InfluxDB + Grafana. Firmware FreeRTOS (dual-core, dual-SPI). Base reutilizable propia: hoy en 2 equipos y planeada para 4 —Quantum, MadRams, Cefiro y Axolotl—; cualquiera lo adopta editando un .env.',

      'proj.malaria.unit': 'simulación + ML',
      'proj.malaria.tagline': 'Simula separar células infectadas con campos eléctricos.',
      'proj.malaria.blurb': 'Modela el principio de dielectroforesis: glóbulos rojos sanos vs. infectados con malaria responden distinto en un campo no uniforme. Simula las trayectorias (integración numérica) y clasifica sanas/infectadas con PCA + 4 algoritmos de ML. Física aplicada + ML — es una simulación, no detección clínica real.',

      'proj.robot.unit': 'navegación autónoma',
      'proj.robot.tagline': 'Robot autónomo con ROS2 y navegación.',
      'proj.robot.blurb': 'Robot diferencial sobre ROS2: navegación con Nav2, LiDAR LDROBOT, interfaz de hardware por Arduino y teleoperación por joystick. Robótica de competencia con el stack estándar de la industria.',
      'proj.robot.note': 'El día de la competencia no funcionó: no logré integrar la ruta planificada al abrir SLAM, por inexperiencia y falta de documentación. Tenía la ruta y tenía el robot moviéndose; no los uní a tiempo.',

      'proj.mapatec.unit': 'ruta peatonal',
      'proj.mapatec.tagline': 'Rutas peatonales dentro del campus.',
      'proj.mapatec.blurb': 'Mapa interactivo del campus GDL con cálculo de rutas peatonales entre edificios usando datos públicos de OpenStreetMap. La ubicación se procesa solo en tu dispositivo, con aviso de privacidad conforme a la LFPDPPP. Proyecto independiente, no oficial.',
      'proj.mapatec.panel.body': 'Mapa interactivo del campus con rutas peatonales entre edificios (datos de OpenStreetMap). Tu ubicación se procesa solo en tu dispositivo, con aviso de privacidad conforme a la LFPDPPP.',
      'proj.mapatec.panel.privacy': 'Tu ubicación nunca sale de tu dispositivo: no se envía ni se guarda en ningún servidor.',

      'proj.madrams.unit': 'formación de equipo',
      'proj.madrams.tagline': 'Portal de formación del equipo Baja SAE.',
      'proj.madrams.blurb': 'Biblioteca de cursos de nuevo ingreso para MadRams (Minibaja SAE, Tec GDL): cursos por categoría y nivel, con un render 3D del coche por secuencia de imágenes. HTML/CSS/JS estático.',

      'proj.loopzels.unit': 'carga cognitiva',
      'proj.loopzels.tagline': 'Rompecabezas animados para entrenar la mente.',
      'proj.loopzels.blurb': 'Juego de escritorio en Python que fragmenta patrones GIF animados en grillas de 2×2 a 6×6 para reordenar de memoria. La dificultad escala según la Teoría de Carga Cognitiva (Sweller, 1988); motor de animación por hilos, records por tiempo en JSON. Expo Ingenierías.',

      'proj.coche.unit': 'Endurance · Baja SAE Oregon',
      'proj.coche.tagline': 'El coche Baja real, hablando por radio en pista.',
      'proj.coche.blurb': 'Sistema de telemetría del Minibaja SAE de MadRams: un ESP32 transmite por radio LoRa/SX1262 a pits, donde un convertidor serial escribe directo en InfluxDB —sin broker MQTT— y Grafana lo grafica: todo el stack corre en local. GPS u-blox a bordo. Dashboard con gauges por umbral, geomapa GPS coloreado por velocidad y correlación viento-temperatura. 4° lugar en Endurance, Baja SAE Oregon.',

      'proj.quantum.unit': 'sistema de potencia EV',
      'proj.quantum.tagline': 'Potencia eléctrica de un auto de carreras, domada.',
      'proj.quantum.blurb': 'Sistema de potencia para el auto eléctrico de Electrathon (48 V, 6 kWh): configuración y prueba del motor Motenergy ME0909 con controlador Alltrax SR48300, packs LiFePO4 16S4P en paralelo con ecualización de voltaje, y seguridad (kill-switch, fusibles 250 A). Reverticé el protocolo BLE de un BMS Daly clon para leerlo con Python (bleak) en una Raspberry Pi 4 a ~5.4 Hz. Display de piloto TFT SSD1963. La telemetría del coche corre sobre mi TelemetryStack, por WiFi en pits y enlace celular LTE/4G en pista.',

      'proj.elyos.unit': 'optimización de consumo',
      'proj.elyos.award': 'Data & Telemetry Award · Schmid Elektronik',
      'proj.elyos.tagline': 'Menos energía por vuelta, en un auto de eficiencia premiado.',
      'proj.elyos.blurb': 'Contribución de optimización sobre el sistema (ya existente) del equipo Silca Elyos, ganador del Data & Telemetry Award (patrocinado por Schmid Elektronik). Mi trabajo: control de consumo del motor con estrategia pulse-and-coast por segmentos, un modelo de coast-down derivado de telemetría para predecir el deslizamiento, ajuste de ganancias FOC del driver BLDC y métricas de eficiencia (kWh/km, % coasting). Bosch como patrocinador del equipo.',
      'proj.elyos.note': 'Optimicé un sistema que ya existía: el resto de la plataforma del equipo —enlace, estimación de estado, electrónica y tablero— no es trabajo mío.',

      'proj.latex.unit': 'reportes APA-7',
      'proj.latex.tagline': 'Convierte PDFs en reportes LaTeX con formato APA-7.',
      'proj.latex.blurb': 'IDE local (FastAPI + editor web) que convierte PDFs en reportes LaTeX estilo APA 7ª. Extrae texto e imágenes con PyMuPDF (con heurísticos: quita logos de header, recorta bordes, filtra por tamaño), orquesta el CLI de Claude Code para generar y modificar el .tex, y compila con pdflatex. La generación de LaTeX la hace el modelo; mi trabajo es el pipeline de extracción, la orquestación y el IDE.',
      'proj.latex.note': 'Sin demo en vivo: necesita el CLI de Claude Code con sesión iniciada en tu propia máquina.',

      'proj.claudeunlimited.unit': 'multi-agente · fallback por rol',
      'proj.claudeunlimited.tagline': 'Orquestador multi-agente resiliente sobre un gateway LLM propio.',
      'proj.claudeunlimited.blurb': 'Orquestador multi-agente resiliente: reparte el trabajo por roles y, cuando un modelo falla o cae por debajo del piso de calidad de su rol, hace fallback a otro sin perder la tarea. Corre sobre OmniRoute —un gateway LLM self-hosted— con política de quality-floor por rol. Es el trabajo de orquestación propio más sustancial del banco.',
      'proj.claudeunlimited.note': 'Sin demo en vivo: es infraestructura de orquestación que corre contra tu propio gateway y tus modelos.',

      'proj.websight.unit': 'screenshot para el agente',
      'proj.websight.tagline': 'Le da ojos a Claude Code: renderiza y captura su propio frontend.',
      'proj.websight.blurb': 'Skill + CLI + microservicio HTTP (Playwright/Chromium headless) que renderiza una URL o ruta local y devuelve un screenshot optimizado como image_url (máx 1080 px, JPEG q80), para que el agente pueda «ver» el frontend que acaba de escribir. Se instala como plugin de Claude Code (/plugin install websight@websight).',

      'proj.explodedview.unit': 'presentación 3D web',
      'proj.explodedview.tagline': 'Visores 3D orbitables, vistas explosionadas y turntables, para la web.',
      'proj.explodedview.blurb': 'Skill de conocimiento (SKILL.md + references + examples) para presentación 3D web-nativa: visores orbitables con HDR (<model-viewer>), vistas explosionadas y shaders custom con Three.js, turntables por secuencia de render y trayectorias en SVG. Trae dos tracks —Vanilla + CDN y React Three Fiber— para que el agente elija según el proyecto.',

      'proj.watermarks.unit': 'fork · plugin de Claude Code',
      'proj.watermarks.tagline': 'Fork: le añadí la integración como plugin de Claude Code.',
      'proj.watermarks.blurb': 'Fork de guillaumemeyer/watermarks-remover. La contribución propia es la integración como plugin/marketplace de Claude Code (carpeta .claude-plugin, /plugin install remove-ai-marks@watermarks-remover). El motor de limpieza es del proyecto original.',
      'proj.watermarks.note': 'El motor de limpieza —capa Unicode, reescritura y strip de C2PA y metadatos en PNG/JPEG/SVG/PDF/DOCX/HTML/MD— es trabajo del upstream. Lo propio aquí es solo el empaquetado como plugin de Claude Code.',

      'proj.frenado.unit': 'velocidad terminal',
      'proj.frenado.tagline': 'Un imán que cae y se frena solo, en simulación.',
      'proj.frenado.blurb': 'App de MATLAB (App Designer) que simula el frenado magnético de un imán que cae por un tubo conductor: integra la ecuación de movimiento con ode45 aplicando un arrastre −k_b·v solo mientras el imán está dentro del tubo, y reporta la velocidad terminal (m·g/k_b), la de entrada y la de salida. Escena 3D animada con estela, gráficas de z, v y a marcando entrada y salida, y el campo B calculado por Biot-Savart sobre una espira discretizada, visualizado con flechas coloreadas por magnitud y cortes de |B|. Masa, k_b, campo, longitud del tubo y altura inicial se ajustan en vivo. La interfaz está escrita a mano: App Designer no deja editar el código que crea los componentes, así que descomprimí el .mlapp —es un paquete zip— y edité su document.xml directamente.',
      'proj.frenado.note': 'k_b es un coeficiente empírico de amortiguamiento (rango típico 0.01–2 N·s/m, ref. Levin et al., AJP 74(9), 2006), no derivado de la conductividad ni de la geometría; y el campo B que se dibuja es ilustrativo — no alimenta la fuerza de frenado. Es una app de escritorio: sin demo en vivo.',

      'proj.btn.demo': 'Demo en vivo',
      'proj.btn.code': 'Código',
      'proj.btn.site': 'Ver proyecto',
      'proj.btn.itch': 'itch.io',

      /* Disclosure labels. Both live in the DOM at once (CSS shows the one the
         current aria-expanded state calls for), so state and language never
         race to own the same text node. */
      'disclosure.more': 'Ver más',
      'disclosure.less': 'Ver menos',
      'panel.eyebrow': 'Qué puedes probar',

      'about.heading': 'Sobre mí',
      'about.n1': 'Convierto sensores en decisiones. Es la línea de arriba, y también es, más o menos, toda mi vida.',
      'about.n2': 'Soy hijo de un ingeniero electromecánico que nunca se quedó en su área: hacía sistemas por gusto, y llegó a correr uno de los primeros servidores grandes de Counter-Strike en México. Crecí dentro de eso. Jugué Wii con él desde los tres años; a los siete me sentó frente a una PC con Minecraft, y unos primos mayores me enseñaron a moddearlo. Aprendí a construir jugando — antes de saber que eso tenía un nombre.',
      'about.n3': 'En primaria competí en RoboMatrix Jalisco. En sexto quedé en tercer lugar y clasifiqué a Nacional; la pandemia lo canceló. En secundaria hice mis primeros mods y jueguitos — un Tron para dos jugadores en Java, entre otros. En la prepa tocaba un proyecto de ingeniería por semestre, y ahí empecé a construir cosas que medían el mundo y respondían: un baño que recircula el agua hasta alcanzar la temperatura que pides; un sistema de aeroponía apilable con riego automático y telemetría; una propuesta de generador eléctrico con CO₂ como combustible, a partir de un paper coreano; una boya autopropulsada con cámara y autocentrado por PID para buscar fugas en las tuberías viejas de la ciudad.',
      'about.n4': 'Los últimos dos años de prepa hice un robot con ROS y AgroBot, un brazo que recolecta frambuesas por visión. Aquí soy honesto sobre el alcance: a nivel prepa construí las piezas, no siempre la integración. En AgroBot armé el brazo, probé la cinemática inversa a una posición y entrené el modelo de detección — pero el sistema completo, todo junto, no llegó a integrarse. En el robot de interprepas, el día de la competencia no funcionó: no logré integrar una ruta planificada al abrir SLAM, por inexperiencia y falta de documentación. Tenía la ruta. Tenía el robot moviéndose. No los uní a tiempo. Ayudé a un segundo equipo que preprogramó todo en un EV3 — y ganamos.',
      'about.n5': 'Cuento esos tropiezos a propósito. El SLAM que no pude integrar en prepa es exactamente la razón por la que hoy me obsesiona la estimación de estado y el control. Los huecos marcan hacia dónde voy.',
      'about.n6': 'Ahora estudio Ingeniería en Robótica en el Tec de Monterrey, Campus Guadalajara. Formo parte del equipo Baja SAE MadRams y trabajo en telemetría y sistemas de potencia de varios equipos de competencia. Me interesa el camino completo del sensor a la decisión — visión en el borde, embebidos, señales — y tengo una manía útil: cuando una herramienta me limita, bajo un nivel y la controlo por debajo. He revertido protocolos, tratado formatos cerrados como lo que son, y hecho que las herramientas hagan lo que necesito, no lo que traen de fábrica.',
      'about.n7': 'Sigo en lo mismo que a los siete: construir cosas que perciben, deciden y actúan. Solo que ahora los sensores son mejores.',
      'about.teams': 'Equipos de competencia',
      'about.teams.soon': 'Equipos por venir',
      'team.elyos': 'Silca Elyos · eficiencia energética',
      'team.ignitia': 'Ignitia Rocketlab · cohetería',
      'about.skills.edgeai': 'Edge AI / Visión',
      'about.skills.robotics': 'Robótica',
      'about.skills.embedded': 'Embebidos',
      'about.skills.fullstack': 'Full-stack / Datos',
      'about.skills.languages': 'Lenguajes',
      'about.skills.simulation': 'Simulación',
      'about.skills.heading': 'Habilidades',
      'about.skills.glowSample': 'así',
      'about.teams.note': 'Los que brillan son donde pongo más horas.',
      'about.skills.control': 'Control',
      'about.skills.teaching': 'Docencia y documentación',
      'about.skills.glow': 'Las habilidades que brillan son en las que tengo más profundidad.',
      'skill.telemetry': 'telemetría',
      'skill.sensors': 'sensores/I²C',
      'skill.reverseEng': 'ingeniería inversa',
      'skill.gainTuning': 'sintonía de ganancias',
      'skill.docs': 'documentación técnica',
      'skill.teachingTag': 'docencia',
      'skill.llmOrchestration': 'orquestación de LLMs por CLI',
      'about.skills.modelling': 'Modelado 3D',
      'about.skills.genai': 'GenAI / IA generativa',
      'about.skills.aero': 'Aeroespacial',
      'about.skills.aeroStatus': 'en diseño',

      /* Most pills are proper nouns and stay put in both languages; these few
         are descriptions, so they get keys like any other sentence. */
      'skill.parts': 'modelado de piezas',
      'skill.animation': 'animaciones',
      'skill.assembly': 'ensamblado',
      'skill.renders': 'renders',
      'skill.localLlms': 'LLMs locales / self-host',
      'skill.ohm': 'Ley de Ohm',
      'skill.divider': 'Divisor de voltaje',
      'skill.multiplexers': 'Multiplexores',
      'skill.sdlogging': 'Logging en SD',
      'skill.linkbudget': 'Presupuesto de enlace RF',
      'skill.logicAnalyzer': 'analizador lógico',
      'skill.tsSchema': 'esquema de series de tiempo',
      'skill.kalman': 'filtro de Kalman',
      'skill.curriculum': 'diseño curricular',
      'skill.rubrics': 'rúbricas de evaluación',
      'skill.sketch2d': 'Sketch 2D',
      'skill.extrude': 'Extrusión',
      'skill.revolve': 'Revolución',
      'skill.drawings': 'Planos técnicos',
      'skill.aarm': 'A-arm/suspensión',
      'skill.chassis': 'Chasis tubular',

      'courses.eyebrow': 'Programa de formación',
      'course.telemetria.name': 'Telemetría (Arduino)',
      'course.telemetria.extra': '18 sesiones de 90 min · prácticas en Wokwi · un entregable evaluado por sesión. Con simuladores interactivos y modelos 3D.',
      'course.cad.name': 'CAD (SolidWorks)',
      'course.cad.extra': 'Con chasis tubular 3D interactivo.',
      'course.electronica.name': 'Electrónica',
      'course.electronica.extra': 'Reserva el tercer bloque del programa; contenido en preparación.',
      'course.level.basico': 'Básico',
      'course.level.intermedio': 'Intermedio',
      'course.level.avanzado': 'Avanzado',
      'course.state.live': 'En línea',
      'course.state.soon': 'Próximamente',
      'bridge.eyebrow': 'Del salón al coche',
      'bridge.text': 'El curso termina con un nodo de adquisición completo y el análisis de una corrida real del Minibaja. De ahí, quien se queda al equipo pasa a trabajo asignado sobre el coche: los mismos sensores, ya montados y transmitiendo desde la pista.',
      'bridge.cta': 'Ver el coche en pista',

      'book.heading': 'Agenda',
      'book.intro': '¿Quieres platicar de un proyecto? Aparta 30 minutos: presencial en campus o por Zoom.',
      'book.tabsAriaLabel': 'Tipo de reunión',
      'book.tab.inperson': 'Presencial',
      'book.tab.zoom': 'Zoom',
      'book.footnote': 'La reservación se gestiona a través de Calendly.',
      'book.loading': 'CARGANDO CALENDARIO…',

      'footer.tagline': 'sitio estático en GitHub Pages'
    },
    en: {
      'meta.title': 'Luis Xavier García Pimentel Ascencio — Robotics Engineering',
      'meta.ogImageAlt': 'A signal trace resolving from noise into a discrete decision on a blue-charcoal field, beside the name Luis Xavier García Pimentel Ascencio.',
      'a11y.skip': 'Skip to content',
      'nav.ariaLabel': 'Main navigation',
      'nav.subtitle': 'Robotics Engineering · Tec GDL',
      'nav.projects': 'Projects',
      'nav.about': 'About',
      'nav.bookCta': 'Book',
      'langToggle.ariaLabel': 'ES — switch to Spanish',

      'hero.heading': 'I turn sensors into decisions.',
      'hero.subline': 'Robotics Engineering student · ROS2 · Edge AI · ESP32 · EEG · competition robotics.',
      'hero.scope.in': 'IN · RAW',
      'hero.scope.out': 'OUT · DECISION',
      'hero.cta.primary': 'Book a meeting',
      'hero.cta.secondary': 'View projects',

      'social.github': 'GitHub',
      'social.linkedin': 'LinkedIn',
      'social.email': 'Email',

      'projects.eyebrow': 'Reading board',
      'projects.more': 'More on GitHub',
      'channel.readingLabel': 'READING',

      'meta.title.robotica': 'Robotics — Luis Xavier García Pimentel Ascencio',
      'meta.title.senales': 'Signals & AI — Luis Xavier García Pimentel Ascencio',
      'meta.title.telemetria': 'Telemetry & power — Luis Xavier García Pimentel Ascencio',
      'meta.title.software': 'Software & tooling — Luis Xavier García Pimentel Ascencio',
      'meta.title.ia': 'LLM / Orchestration — Luis Xavier García Pimentel Ascencio',
      'meta.title.formacion': 'Training — Luis Xavier García Pimentel Ascencio',

      'meta.title.vehiculo.madrams': 'Coche MadRams — Luis Xavier García Pimentel Ascencio',
      'meta.title.vehiculo.quantum': 'Quantum Speed Racing — Luis Xavier García Pimentel Ascencio',
      'meta.title.vehiculo.elyos': 'Silca Elyos Racing — Luis Xavier García Pimentel Ascencio',

      'nav.back': 'Back to the board',
      'nav.siblings': 'Other banks',

      'vehicle.back': 'Back to Telemetry & power',
      'vehicle.siblings': 'Other vehicles',
      'vehicle.modulesWord': 'modules',
      'vehicle.modulesHeading': 'Modules',
      'vehicle.state': 'Honest status',
      'vehicle.base': 'Basis',
      'vehicle.cta': 'View the vehicle',

      'status.explore': 'exploratory',
      'status.design': 'in design',
      'status.integration': 'in integration',
      'status.bench': 'bench-validated',
      'status.track': 'track-validated',

      'doc.default': 'Technical documentation',
      'doc.team': 'Team documentation',

      'bank.label': 'Bank',
      'bank.rest': 'Also in this bank',

      'group.orquestacion': 'In-house orchestration',
      'group.capacidades': 'Capabilities / skills for Claude Code',

      'cat.robotica.name': 'Robotics',
      'cat.robotica.line': 'Perceive: vision, arms and navigation — machines that read the world before they move.',
      'cat.robotica.count': '3 channels',
      'cat.robotica.more': 'See all 3 · Robotics',

      'cat.senales.name': 'Signals & AI',
      'cat.senales.line': 'Process: raw signals turned into decisions — EEG, applied physics and machine learning.',
      'cat.senales.count': '2 channels',
      'cat.senales.more': 'See both · Signals',

      'cat.telemetria.name': 'Telemetry & power',
      'cat.telemetria.line': 'Competition cars that explain themselves: trackside telemetry and the power systems feeding it.',
      'cat.telemetria.count': '3 channels',
      'cat.telemetria.more': 'See all 3 · Telemetry',

      'cat.software.name': 'Software & tooling',
      'cat.software.line': 'The tooling: platforms, maps and utilities I use — or hand over — so other people move faster.',
      'cat.software.count': '4 channels',
      'cat.software.more': 'See all 4 · Software',

      'cat.ia.name': 'LLM / Orchestration',
      'cat.ia.line': 'Orchestrate the model, don’t replace it: agents with per-role fallback, and skills that give Claude Code hands and eyes.',
      'cat.ia.count': '5 channels',
      'cat.ia.more': 'See all 5 · LLM / Orchestration',

      'cat.formacion.name': 'Training',
      'cat.formacion.line': 'Teaching what the car taught me: open courses so a new team can start without waiting on anyone.',
      'cat.formacion.count': '3-block program',
      'cat.formacion.more': 'See the full program',

      'proj.jtcs.unit': 'count per lane',
      'proj.jtcs.tagline': 'Traffic signals that adapt to demand in real time.',
      'proj.jtcs.blurb': 'Edge-AI intersection control: a YOLOv11 detector counts vehicles per lane and allocates green time with a Webster-derived formula (HCM/MUTCD). React dashboard with network simulation and green waves; runs on Raspberry Pi. Guadalahacks 2026.',
      'proj.jtcs.panel.body': 'Interactive in-browser demo — no backend. Phase 1: adjust traffic with +/− and watch green time adapt (Webster-derived formula). Phase 2: draw an intersection network and simulate cars with green-wave sync.',
      'proj.jtcs.panel.tech1': 'Edge detection with YOLOv11 on a Raspberry Pi.',
      'proj.jtcs.panel.tech2': 'Green-time allocation per MUTCD/HCM.',
      'proj.jtcs.panel.tech3': 'Green-wave sync across intersections.',

      'proj.agrobot.unit': 'arm + ripeness vision',
      'proj.agrobot.tagline': 'A robot that harvests ripe berries by vision.',
      'proj.agrobot.blurb': 'High-school prototype (team Silmarils, ITESO): a conveyor guides raspberries and a 6-DOF arm gripper picks them. A YOLOv8n detector (TensorFlow, Pi Camera V2) identifies ripeness and its position is passed to the arm via inverse kinematics over Arduino. The pieces —vision, arm, kinematics— were tested separately; full integration stayed at prototype level.',

      'proj.neurobeat.unit': 'EEG · 8 channels',
      'proj.neurobeat.tagline': 'A game you control with your mind.',
      'proj.neurobeat.blurb': 'Turns EEG from the Unicorn Black headset (8 channels) into game input: notch/bandpass/ICA filtering, an EEGNet model detects deliberate blinks, and the gyroscope drives the cursor — over UDP into a Unity game. Brain.io hackathon.',

      'proj.telemetry.unit': 'live telemetry',
      'proj.telemetry.tagline': 'Live telemetry for SAE competition cars.',
      'proj.telemetry.note': 'Ignitia and Elyos are deliberately out of scope: they either already have their own system, or run one different enough that adapting it would not pay off.',
      'proj.telemetry.blurb': 'Real-time telemetry stack: ESP32 sensors (RPM, temp, GPS, suspension) over LoRa 915 MHz or WiFi into InfluxDB + Grafana. FreeRTOS firmware (dual-core, dual-SPI). My reusable base: on 2 teams today and planned for 4 —Quantum, MadRams, Cefiro and Axolotl—; any of them adopts it by editing one .env.',

      'proj.malaria.unit': 'simulation + ML',
      'proj.malaria.tagline': 'Simulating cell separation with electric fields.',
      'proj.malaria.blurb': 'Models the dielectrophoresis principle: healthy vs. malaria-infected red cells respond differently in a non-uniform field. Simulates trajectories (numerical integration) and classifies healthy/infected with PCA + 4 ML algorithms. Applied physics + ML — a simulation, not real clinical detection.',

      'proj.robot.unit': 'autonomous navigation',
      'proj.robot.tagline': 'Autonomous robot with ROS2 and navigation.',
      'proj.robot.blurb': 'Differential-drive robot on ROS2: Nav2 navigation, LDROBOT LiDAR, an Arduino hardware interface, and joystick teleop. Competition robotics on the industry-standard stack.',
      'proj.robot.note': "It didn't work on competition day: I couldn't integrate the planned route once I opened SLAM, out of inexperience and a lack of documentation. I had the route and I had the robot moving; I didn't join them in time.",

      'proj.mapatec.unit': 'pedestrian route',
      'proj.mapatec.tagline': 'Pedestrian routing across campus.',
      'proj.mapatec.blurb': 'Interactive GDL campus map with pedestrian routing between buildings from public OpenStreetMap data. Location is processed on-device only, with an LFPDPPP-compliant privacy notice. Independent, unofficial project.',
      'proj.mapatec.panel.body': 'Interactive campus map with pedestrian routing between buildings (OpenStreetMap data). Your location is processed on-device only, with an LFPDPPP privacy notice.',
      'proj.mapatec.panel.privacy': 'Your location never leaves your device: nothing is sent to or stored on a server.',

      'proj.madrams.unit': 'team onboarding',
      'proj.madrams.tagline': 'Baja SAE team onboarding portal.',
      'proj.madrams.blurb': 'Onboarding course library for MadRams (Minibaja SAE, Tec GDL): courses by category and level, with a 3D image-sequence render of the car. Static HTML/CSS/JS.',

      'proj.loopzels.unit': 'cognitive load',
      'proj.loopzels.tagline': 'Animated puzzles for cognitive training.',
      'proj.loopzels.blurb': 'Python desktop game that fragments animated GIF patterns into 2×2–6×6 grids to reorder from memory. Difficulty scales per Cognitive Load Theory (Sweller, 1988); threaded animation engine, JSON time records. Expo Ingenierías.',

      'proj.coche.unit': 'Endurance · Baja SAE Oregon',
      'proj.coche.tagline': 'The real Baja car, talking over radio on track.',
      'proj.coche.blurb': "Telemetry system for MadRams' Baja SAE Minibaja: an ESP32 transmits over a LoRa/SX1262 radio link to the pits, where a serial converter writes straight into InfluxDB —no MQTT broker— and Grafana plots it: the whole stack runs locally. u-blox GPS on board. Dashboard with threshold gauges, a GPS geomap colored by speed, and wind-vs-temperature correlation. 4th place in Endurance, Baja SAE Oregon.",

      'proj.quantum.unit': 'EV power system',
      'proj.quantum.tagline': "A racing EV's electric powertrain, tamed.",
      'proj.quantum.blurb': 'Power system for the Electrathon electric car (48 V, 6 kWh): configured and bench-tested the Motenergy ME0909 motor with an Alltrax SR48300 controller, LiFePO4 16S4P packs in parallel with voltage equalization, and safety (kill-switch, 250 A fuses). I reverse-engineered a clone Daly BMS\'s BLE protocol to read it in Python (bleak) on a Raspberry Pi 4 at ~5.4 Hz. TFT SSD1963 pilot display. The car\'s telemetry runs on my TelemetryStack, over WiFi in the pits and an LTE/4G cellular link on track.',

      'proj.elyos.unit': 'consumption optimization',
      'proj.elyos.award': 'Data & Telemetry Award · Schmid Elektronik',
      'proj.elyos.tagline': 'Less energy per lap, on an award-winning efficiency car.',
      'proj.elyos.blurb': "Optimization work on team Silca Elyos's (existing) system, winner of the Data & Telemetry Award (sponsored by Schmid Elektronik). My part: motor energy-consumption control with a segment-based pulse-and-coast strategy, a coast-down model derived from telemetry to predict glide, FOC gain tuning on the BLDC driver, and efficiency metrics (kWh/km, coasting %). Bosch as team sponsor.",
      'proj.elyos.note': "I optimized a system that already existed: the rest of the team's platform —link, state estimation, electronics and dashboard— is not my work.",

      'proj.latex.unit': 'APA-7 reports',
      'proj.latex.tagline': 'Turns PDFs into APA-7 LaTeX reports.',
      'proj.latex.blurb': 'Local IDE (FastAPI + web editor) that turns PDFs into APA-7 LaTeX reports. Extracts text and images with PyMuPDF (heuristics: drop header logos, trim borders, size filters), orchestrates the Claude Code CLI to generate and modify the .tex, and compiles with pdflatex. The LaTeX generation is done by the model; my work is the extraction pipeline, the orchestration, and the IDE.',
      'proj.latex.note': 'No live demo: it needs the Claude Code CLI, signed in, on your own machine.',

      'proj.claudeunlimited.unit': 'multi-agent · per-role fallback',
      'proj.claudeunlimited.tagline': 'A resilient multi-agent orchestrator over a self-hosted LLM gateway.',
      'proj.claudeunlimited.blurb': 'A resilient multi-agent orchestrator: it splits work across roles and, when a model fails or falls below its role’s quality floor, fails over to another without dropping the task. It runs on OmniRoute —a self-hosted LLM gateway— with a per-role quality-floor policy. It’s the most substantial in-house orchestration work in this bank.',
      'proj.claudeunlimited.note': 'No live demo: it’s orchestration infrastructure that runs against your own gateway and models.',

      'proj.websight.unit': 'a screenshot for the agent',
      'proj.websight.tagline': 'Gives Claude Code eyes: renders and captures its own frontend.',
      'proj.websight.blurb': 'A skill + CLI + HTTP microservice (Playwright/Chromium headless) that renders a URL or local path and returns an optimized screenshot as an image_url (max 1080 px, JPEG q80), so the agent can “see” the frontend it just wrote. It installs as a Claude Code plugin (/plugin install websight@websight).',

      'proj.explodedview.unit': 'web 3D presentation',
      'proj.explodedview.tagline': 'Orbitable 3D viewers, exploded views and turntables, for the web.',
      'proj.explodedview.blurb': 'A knowledge skill (SKILL.md + references + examples) for web-native 3D presentation: orbitable HDR viewers (<model-viewer>), exploded views and custom Three.js shaders, render-sequence turntables and SVG trajectories. It ships two tracks —Vanilla + CDN and React Three Fiber— so the agent can pick one to fit the project.',

      'proj.watermarks.unit': 'fork · Claude Code plugin',
      'proj.watermarks.tagline': 'A fork: I added the Claude Code plugin integration.',
      'proj.watermarks.blurb': 'A fork of guillaumemeyer/watermarks-remover. My own contribution is the Claude Code plugin/marketplace integration (a .claude-plugin folder, /plugin install remove-ai-marks@watermarks-remover). The cleaning engine belongs to the original project.',
      'proj.watermarks.note': 'The cleaning engine —Unicode layer, rewrite, and C2PA/metadata stripping across PNG/JPEG/SVG/PDF/DOCX/HTML/MD— is upstream work. What’s mine here is only the packaging as a Claude Code plugin.',

      'proj.frenado.unit': 'terminal velocity',
      'proj.frenado.tagline': 'A falling magnet that brakes itself, simulated.',
      'proj.frenado.blurb': 'MATLAB (App Designer) app simulating the magnetic braking of a magnet falling through a conductive tube: it integrates the equation of motion with ode45, applying a −k_b·v drag only while the magnet is inside the tube, and reports terminal velocity (m·g/k_b) along with entry and exit speeds. Animated 3D scene with a trail, z/v/a plots marking entry and exit, and the B field computed by Biot-Savart over a discretized current loop, drawn as arrows coloured by magnitude plus |B| slices. Mass, k_b, field, tube length and drop height are all adjustable live. The interface is hand-written: App Designer will not let you edit the code that creates the components, so I unzipped the .mlapp —it is a zip package— and edited its document.xml directly.',
      'proj.frenado.note': 'k_b is an empirical damping coefficient (typical range 0.01–2 N·s/m, ref. Levin et al., AJP 74(9), 2006), not derived from conductivity or geometry; and the B field drawn is illustrative — it does not feed the braking force. This is a desktop app: no live demo.',

      'proj.btn.demo': 'Live demo',
      'proj.btn.code': 'Code',
      'proj.btn.site': 'Team site',
      'proj.btn.itch': 'itch.io',

      'disclosure.more': 'Show more',
      'disclosure.less': 'Show less',
      'panel.eyebrow': 'What you can try',

      'about.heading': 'About',
      'about.n1': "I turn sensors into decisions. That's the line up top — and it's also, more or less, my whole life.",
      'about.n2': 'I\'m the son of an electromechanical engineer who never stayed in his lane: he built systems for fun, and once ran one of the first large Counter-Strike servers in Mexico. I grew up inside that. I played Wii with him from age three; at seven he sat me in front of a PC with Minecraft, and older cousins taught me to mod it. I learned to build by playing — before I knew it had a name.',
      'about.n3': "In primary school I competed in RoboMatrix Jalisco. In sixth grade I placed third and qualified for Nationals; the pandemic cancelled it. In secondary school I made my first mods and small games — a two-player Tron in Java, among others. In prepa (high school) there was one engineering project per semester, and that's where I started building things that measured the world and responded: a bathroom that recirculates water until it reaches the temperature you ask for; a stackable smart aeroponics system with automatic irrigation and telemetry; a proposed electric generator using CO₂ as fuel, based on a Korean paper; a self-propelled buoy with a camera and PID self-centering to hunt for leaks in the city's aging water pipes.",
      'about.n4': "My last two years of prepa I built a ROS robot and AgroBot, an arm that harvests raspberries by vision. Here I'll be honest about scope: at a high-school level I built the pieces, not always the integration. On AgroBot I built the arm, tested inverse kinematics to a single position, and trained the detection model — but the full system, all together, never got integrated. On the inter-school competition robot, it didn't work on the day: I couldn't integrate a planned route once I opened SLAM, out of inexperience and a lack of documentation. I had the route. I had the robot moving. I didn't join them in time. I helped a second team that pre-programmed everything on an EV3 — and we won.",
      'about.n5': "I tell those stumbles on purpose. The SLAM I couldn't integrate in prepa is exactly why state estimation and control are what I'm chasing now. The gaps point where I'm headed.",
      'about.n6': "Today I study Robotics Engineering at Tec de Monterrey, Guadalajara. I'm on the Baja SAE MadRams team and work on telemetry and power systems across several competition teams. I care about the full path from sensor to decision — edge vision, embedded, signals — and I have one useful habit: when a tool limits me, I drop a level and control it from underneath. I've reverse-engineered protocols, treated closed formats as what they actually are, and made tools do what I need instead of what they ship with.",
      'about.n7': "I'm still doing what I did at seven: building things that sense, decide, and act. The sensors are just better now.",
      'about.teams': 'Competition teams',
      'about.teams.soon': 'Teams coming up',
      'team.elyos': 'Silca Elyos · energy efficiency',
      'team.ignitia': 'Ignitia Rocketlab · rocketry',
      'about.skills.edgeai': 'Edge AI / Vision',
      'about.skills.robotics': 'Robotics',
      'about.skills.embedded': 'Embedded',
      'about.skills.fullstack': 'Full-stack / Data',
      'about.skills.languages': 'Languages',
      'about.skills.simulation': 'Simulation',
      'about.skills.heading': 'Skills',
      'about.skills.glowSample': 'like this',
      'about.teams.note': 'The glowing ones are where I put the most hours.',
      'about.skills.control': 'Control',
      'about.skills.teaching': 'Teaching & documentation',
      'about.skills.glow': 'The glowing skills are the ones I go deepest in.',
      'skill.telemetry': 'telemetry',
      'skill.sensors': 'sensors/I²C',
      'skill.reverseEng': 'reverse engineering',
      'skill.gainTuning': 'gain tuning',
      'skill.docs': 'technical documentation',
      'skill.teachingTag': 'teaching',
      'skill.llmOrchestration': 'CLI LLM orchestration',
      'about.skills.modelling': '3D Modelling',
      'about.skills.genai': 'GenAI',
      'about.skills.aero': 'Aerospace',
      'about.skills.aeroStatus': 'planned',

      'skill.parts': 'part modelling',
      'skill.animation': 'animation',
      'skill.assembly': 'assemblies',
      'skill.renders': 'renders',
      'skill.localLlms': 'local LLMs / self-host',
      'skill.ohm': "Ohm's law",
      'skill.divider': 'Voltage divider',
      'skill.multiplexers': 'Multiplexers',
      'skill.sdlogging': 'SD logging',
      'skill.linkbudget': 'RF link budget',
      'skill.logicAnalyzer': 'logic analyzer',
      'skill.tsSchema': 'time-series schema design',
      'skill.kalman': 'Kalman filter',
      'skill.curriculum': 'curriculum design',
      'skill.rubrics': 'assessment rubrics',
      'skill.sketch2d': '2D sketch',
      'skill.extrude': 'Extrude',
      'skill.revolve': 'Revolve',
      'skill.drawings': 'Technical drawings',
      'skill.aarm': 'A-arm/suspension',
      'skill.chassis': 'Tubular chassis',

      'courses.eyebrow': 'Training program',
      'course.telemetria.name': 'Telemetry (Arduino)',
      'course.telemetria.extra': '18 sessions of 90 min · hands-on labs in Wokwi · one graded deliverable per session. With interactive simulators and 3D models.',
      'course.cad.name': 'CAD (SolidWorks)',
      'course.cad.extra': 'With an interactive 3D tubular chassis.',
      'course.electronica.name': 'Electronics',
      'course.electronica.extra': 'Reserves the third block of the program; content in preparation.',
      'course.level.basico': 'Basic',
      'course.level.intermedio': 'Intermediate',
      'course.level.avanzado': 'Advanced',
      'course.state.live': 'Live',
      'course.state.soon': 'Coming soon',
      'bridge.eyebrow': 'From the classroom to the car',
      'bridge.text': 'The course ends with a complete data-acquisition node and the analysis of a real Minibaja run. From there, whoever joins the team moves on to assigned work on the car itself: the same sensors, already mounted and transmitting from the track.',
      'bridge.cta': 'See the car on track',

      'book.heading': 'Book',
      'book.intro': 'Want to talk about a project? Grab 30 minutes — in person on campus or over Zoom.',
      'book.tabsAriaLabel': 'Meeting type',
      'book.tab.inperson': 'In-person',
      'book.tab.zoom': 'Zoom',
      'book.footnote': 'Booking is handled by Calendly.',
      'book.loading': 'LOADING CALENDAR…',

      'footer.tagline': 'static site on GitHub Pages'
    }
  };

  /* --------------------------------------------------------------------
     2. Language init + toggle. No storage APIs — state lives in memory
        and in the URL only.

        The choice used to live in the fragment (#es / #en). It moved to
        ?lang= when the site grew sub-pages, for two reasons: a fragment
        cannot carry a language *and* an in-page target (index.html#book),
        and it does not survive a link to another document at all. A query
        string does both, and GitHub Pages serves the same static file
        regardless of it. Old #es / #en links are still honoured on the way
        in so nothing already shared goes stale.
     -------------------------------------------------------------------- */
  function isLang(value) {
    return value === 'en' || value === 'es';
  }

  function langFromQuery() {
    var match = /[?&]lang=([^&]*)/.exec(location.search);
    var value = match ? decodeURIComponent(match[1]).toLowerCase() : null;
    return isLang(value) ? value : null;
  }

  /* Legacy: the pre-sub-page URL shape. Read, never written. */
  function langFromHash() {
    var h = location.hash.replace('#', '').toLowerCase();
    return isLang(h) ? h : null;
  }

  function langFromUrl() {
    return langFromQuery() || langFromHash();
  }

  function initialLang() {
    var fromUrl = langFromUrl();
    if (fromUrl) return fromUrl;
    if (navigator.language && navigator.language.toLowerCase().indexOf('en') === 0) {
      return 'en';
    }
    return 'es';
  }

  var hadLangInUrl = langFromUrl() !== null;
  var currentLang = initialLang();

  /* Rewrite ?lang= in place, leaving every other parameter and the fragment
     exactly as they were. */
  function urlWithLang(lang) {
    var search = location.search.replace(/([?&])lang=[^&]*/, '$1lang=' + lang);
    if (search.indexOf('lang=') === -1) {
      search = (search ? search + '&' : '?') + 'lang=' + lang;
    }
    /* A legacy #es / #en fragment has been consumed by now; dropping it keeps
       one language marker in the URL instead of two that can disagree. */
    var hash = isLang(location.hash.replace('#', '').toLowerCase()) ? '' : location.hash;
    return location.pathname + search + hash;
  }

  /* The language is in the query string, which no <a href> to another page
     inherits. Every in-site page link is tagged data-page-link, and gets the
     live language stamped on it here — so the choice follows the visitor from
     the landing into a category page and back. Any fragment the author wrote
     (index.html#book) is preserved. */
  function decoratePageLinks(lang) {
    var links = document.querySelectorAll('a[data-page-link]');
    for (var i = 0; i < links.length; i++) {
      var link = links[i];
      var href = link.getAttribute('href') || '';
      var hashAt = href.indexOf('#');
      var fragment = hashAt === -1 ? '' : href.slice(hashAt);
      var path = (hashAt === -1 ? href : href.slice(0, hashAt)).split('?')[0];
      link.setAttribute('href', path + '?lang=' + lang + fragment);
    }
  }

  function applyLanguage(lang, writeUrl) {
    if (!i18n[lang]) lang = 'es';
    currentLang = lang;
    var dict = i18n[lang];

    document.documentElement.lang = lang;

    var textNodes = document.querySelectorAll('[data-i18n]');
    for (var i = 0; i < textNodes.length; i++) {
      var node = textNodes[i];
      var key = node.getAttribute('data-i18n');
      if (Object.prototype.hasOwnProperty.call(dict, key)) {
        node.textContent = dict[key];
      }
    }

    var ariaNodes = document.querySelectorAll('[data-i18n-aria]');
    for (var j = 0; j < ariaNodes.length; j++) {
      var ariaNode = ariaNodes[j];
      var ariaKey = ariaNode.getAttribute('data-i18n-aria');
      if (Object.prototype.hasOwnProperty.call(dict, ariaKey)) {
        ariaNode.setAttribute('aria-label', dict[ariaKey]);
      }
    }

    /* Page metadata (title, description, OG tags) is read by search engines
       and link-preview crawlers, not just visitors, so it has to track the
       toggle too — same dictionary, written to `content` instead of
       textContent. */
    var contentNodes = document.querySelectorAll('[data-i18n-content]');
    for (var k = 0; k < contentNodes.length; k++) {
      var contentNode = contentNodes[k];
      var contentKey = contentNode.getAttribute('data-i18n-content');
      if (Object.prototype.hasOwnProperty.call(dict, contentKey)) {
        contentNode.setAttribute('content', dict[contentKey]);
      }
    }

    var toggle = document.getElementById('lang-toggle');
    if (toggle) {
      /* the toggle's label shows the language you can switch TO */
      toggle.textContent = lang === 'es' ? 'EN' : 'ES';
    }

    /* Vehicle pages render their whole main from data in the active language;
       do it before decoratePageLinks so the links this build emits (backlink,
       sibling vehicles) get the ?lang stamp along with the static ones. */
    renderVehiclePage(lang);

    decoratePageLinks(lang);

    /* Only touch the URL when the language is the result of a choice —
       a toggle click, or a language already present on load — not on a
       plain default-language first visit. */
    if (writeUrl) {
      history.replaceState(null, '', urlWithLang(lang));
    }
  }

  function initLangToggle() {
    var toggle = document.getElementById('lang-toggle');
    if (!toggle) return;
    toggle.addEventListener('click', function () {
      applyLanguage(currentLang === 'es' ? 'en' : 'es', true);
    });

    /* A hand-edited or bookmarked legacy #es / #en fragment is a same-document
       transition: nothing reloads, so re-apply the language here.
       history.replaceState (used by the toggle) does not fire this, so there
       is no feedback loop. A real in-page fragment (#book) is ignored — it
       must not reset the visitor's choice. */
    window.addEventListener('hashchange', function () {
      var fromHash = langFromHash();
      if (fromHash && fromHash !== currentLang) {
        applyLanguage(fromHash, true);
      }
    });
  }

  /* --------------------------------------------------------------------
     3. Calendly — loads the inline widget and resolves the booking URL
        for whichever tab is selected.
     -------------------------------------------------------------------- */
  function loadCalendly(url) {
    var el = document.getElementById('calendly-inline');
    if (!el) return;
    if (!calendlyReady()) {
      /* widget.js never became ready — blocked request, offline, whatever.
         Leave the "loading" placeholder in the panel rather than clearing it
         into a blank well the visitor can't make sense of. */
      return;
    }
    el.innerHTML = '';
    /* Calendly's own class is added only now — carrying it from page load
       would have let widget.js auto-init the embed (see index.html). */
    el.classList.add('calendly-inline-widget');
    Calendly.initInlineWidget({ url: url, parentElement: el });
  }

  var DEFAULT_BOOKING_URL = 'https://calendly.com/luisxaviergpa-proton/30min';
  var calendlyPending = false; // a load is queued and will read the live tab

  /* Always resolve the URL from whichever tab is actually selected right now,
     never from a value captured earlier — a queued load must not overwrite a
     tab the visitor picked while it was waiting. */
  function currentBookingUrl() {
    var selectedTab = document.querySelector('.tabs[role="tablist"] [role="tab"][aria-selected="true"]');
    var tab = selectedTab || document.getElementById('tab-inperson');
    return (tab && tab.getAttribute('data-url')) || DEFAULT_BOOKING_URL;
  }

  function calendlyReady() {
    return !!(window.Calendly && window.Calendly.initInlineWidget);
  }

  /* widget.js is async, so its globals may not exist yet. Wait on the script
     element's own load event rather than polling; if it already loaded, or is
     missing/blocked, fall through immediately — loadCalendly() checks
     calendlyReady() itself and leaves the loading placeholder in place if
     the widget still isn't available. */
  function whenCalendlyReady(callback) {
    if (calendlyReady()) {
      callback();
      return;
    }
    var script = document.querySelector('script[src*="assets.calendly.com"]');
    if (!script) {
      callback();
      return;
    }
    var done = false;
    var fire = function () {
      if (done) return;
      done = true;
      callback();
    };
    script.addEventListener('load', fire);
    script.addEventListener('error', fire);
  }

  /* The Google Fonts stylesheet ships with media="print" so it does not block
     first paint; the matching rel="preload" has it in flight already. Flipping
     media to "all" applies it as soon as this script has parsed. */
  function enableWebFonts() {
    var link = document.getElementById('fonts-css');
    if (link) link.media = 'all';
  }

  /* Calendly's widget.css ships with the deferred widget instead of blocking
     first paint from <head>. Injected once, before the widget renders. */
  var calendlyCssHref = 'https://assets.calendly.com/assets/external/widget.css';

  function ensureCalendlyStylesheet() {
    if (document.querySelector('link[href="' + calendlyCssHref + '"]')) return;
    var link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = calendlyCssHref;
    document.head.appendChild(link);
  }

  /* Ask for the widget. Idempotent while a load is queued. */
  function requestCalendly() {
    ensureCalendlyStylesheet();
    if (calendlyReady()) {
      loadCalendly(currentBookingUrl());
      return;
    }
    if (calendlyPending) return; // the queued load reads the live tab itself
    calendlyPending = true;
    whenCalendlyReady(function () {
      calendlyPending = false;
      loadCalendly(currentBookingUrl());
    });
  }

  /* The booking embed is ~2.9 MB of third-party payload (booking JS/CSS,
     Stripe, a pixel script). Loading it on window `load` cost every visitor
     that weight before they showed any interest in booking. Hold it until the
     booking section is about to enter the viewport — the generous rootMargin
     means it is ready by the time the visitor actually arrives — and the
     container keeps its reserved height either way, so CLS stays 0. */
  function initCalendlyDefer() {
    var section = document.getElementById('book');
    if (!section) return;

    if (typeof window.IntersectionObserver !== 'function') {
      /* No IntersectionObserver: fall back to the previous behaviour rather
         than leaving the section empty. */
      window.addEventListener('load', requestCalendly);
      return;
    }

    var observer = new IntersectionObserver(function (entries) {
      for (var i = 0; i < entries.length; i++) {
        if (entries[i].isIntersecting) {
          observer.disconnect();
          requestCalendly();
          return;
        }
      }
    }, { rootMargin: '800px 0px' });

    observer.observe(section);
  }

  function initBookingTabs() {
    var tablist = document.querySelector('.tabs[role="tablist"]');
    if (!tablist) return;
    var tabs = tablist.querySelectorAll('[role="tab"]');
    if (!tabs.length) return;
    var panel = document.getElementById('calendly-inline');

    function selectTab(tab) {
      for (var i = 0; i < tabs.length; i++) {
        var t = tabs[i];
        var selected = t === tab;
        t.setAttribute('aria-selected', selected ? 'true' : 'false');
        t.tabIndex = selected ? 0 : -1;
        t.classList.toggle('is-active', selected);
      }
      /* WAI-ARIA: the panel names the tab that owns it. */
      if (panel) panel.setAttribute('aria-labelledby', tab.id);
      /* Clicking a tab is booking intent, so it also brings the widget
         forward if the observer hasn't fired yet. requestCalendly() always
         resolves the URL from the tab that is selected at that moment. */
      requestCalendly();
    }

    for (var i = 0; i < tabs.length; i++) {
      (function (tab, index) {
        tab.addEventListener('click', function () {
          selectTab(tab);
          tab.focus();
        });

        tab.addEventListener('keydown', function (event) {
          var newIndex = null;
          if (event.key === 'ArrowRight' || event.key === 'ArrowDown') {
            newIndex = (index + 1) % tabs.length;
          } else if (event.key === 'ArrowLeft' || event.key === 'ArrowUp') {
            newIndex = (index - 1 + tabs.length) % tabs.length;
          } else if (event.key === 'Home') {
            newIndex = 0;
          } else if (event.key === 'End') {
            newIndex = tabs.length - 1;
          }
          if (newIndex !== null) {
            event.preventDefault();
            var target = tabs[newIndex];
            selectTab(target);
            target.focus();
          }
        });
      })(tabs[i], i);
    }
  }

  /* --------------------------------------------------------------------
     4. Expanding demo modules (JTCS, Mapa TEC, MadRams).

     One <button> per module owns aria-expanded and aria-controls. The
     visible label is not touched here at all: both "Ver más" and "Ver menos"
     are in the DOM and CSS reveals the one matching aria-expanded, so the
     language pass (which writes textContent per data-i18n key) and the state
     change are fully independent — neither can clobber the other, in either
     order.

     The height animation is CSS (grid-template-rows 0fr -> 1fr). This code
     owns only the `hidden` attribute, which is what actually takes the panel
     out of the accessibility tree and the tab order: set before the grow so
     the row can animate, cleared only after the shrink has finished.
     -------------------------------------------------------------------- */
  var COLLAPSE_MS = 320; /* keep in step with the .panel transition in styles.css */

  function motionReduced() {
    return !!(window.matchMedia &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches);
  }

  function initDisclosures() {
    var buttons = document.querySelectorAll('.disclosure[aria-controls]');

    for (var i = 0; i < buttons.length; i++) {
      (function (button) {
        var panel = document.getElementById(button.getAttribute('aria-controls'));
        if (!panel) return;
        var collapseTimer = null;

        function expand() {
          if (collapseTimer !== null) {
            clearTimeout(collapseTimer);
            collapseTimer = null;
          }
          panel.hidden = false;
          if (motionReduced()) {
            panel.classList.add('is-open');
            return;
          }
          /* Read a layout property so the 0fr start frame is committed before
             the class flips it to 1fr — otherwise the two style changes are
             coalesced and the panel snaps open. */
          void panel.offsetHeight;
          panel.classList.add('is-open');
        }

        function collapse() {
          /* If the visitor tabbed into the panel and then activated the
             button (e.g. via the keyboard shortcut of a screen reader), do
             not let focus fall off the document when the panel disappears. */
          if (panel.contains(document.activeElement)) button.focus();
          panel.classList.remove('is-open');
          if (motionReduced()) {
            panel.hidden = true;
            return;
          }
          if (collapseTimer !== null) clearTimeout(collapseTimer);
          collapseTimer = setTimeout(function () {
            collapseTimer = null;
            /* Guard against a re-open that landed inside the window. */
            if (button.getAttribute('aria-expanded') !== 'true') panel.hidden = true;
          }, COLLAPSE_MS + 40);
        }

        /* `click` alone covers mouse, touch, Enter and Space: a <button> fires
           a click for all four. No keydown handler, so there is exactly one
           code path and no chance of double-toggling on Enter. */
        button.addEventListener('click', function () {
          var open = button.getAttribute('aria-expanded') !== 'true';
          button.setAttribute('aria-expanded', open ? 'true' : 'false');
          if (open) expand(); else collapse();
        });
      })(buttons[i]);
    }
  }

  /* --------------------------------------------------------------------
     4b. Landing bank rows — draw each bank's channel list when it arrives.

     The strips live far below the fold, so the load-time draw the card traces
     use would be finished before anyone scrolled to them. CSS owns the
     animation; this only decides when, by adding .is-onscreen once per row and
     then forgetting about it — the draw is a one-shot, not a scroll effect.
     -------------------------------------------------------------------- */
  function initBankReveal() {
    var banks = document.querySelectorAll('.bank');
    if (!banks.length) return;

    /* No IntersectionObserver: show every row drawn rather than leave the
       strips blank forever. */
    if (typeof window.IntersectionObserver !== 'function') {
      for (var i = 0; i < banks.length; i++) banks[i].classList.add('is-onscreen');
      return;
    }

    var observer = new IntersectionObserver(function (entries) {
      for (var j = 0; j < entries.length; j++) {
        if (entries[j].isIntersecting) {
          entries[j].target.classList.add('is-onscreen');
          observer.unobserve(entries[j].target);
        }
      }
    }, { rootMargin: '0px 0px -12% 0px' });

    for (var k = 0; k < banks.length; k++) observer.observe(banks[k]);
  }

  /* --------------------------------------------------------------------
     4c. The lap — one car around the Nordschleife behind the narrative.

     getPointAtLength on a single closed subpath is the whole trick: no
     library, no keyframes to author, and the car sits exactly on the line at
     any viewport size because it is placed in SVG user units, not CSS pixels.

     The loop only runs while the circuit is actually on screen. A rAF that
     never stops is a battery drain on a page people leave open, and nobody is
     watching a lap they have scrolled past.
     -------------------------------------------------------------------- */
  var LAP_MS = 80000; /* 20.8 km at an ambient pace — slow enough to read past */

  function initCircuit() {
    var circuit = document.querySelector('.about__circuit');
    if (!circuit) return;

    var track = circuit.querySelector('.circuit__track');
    var car = circuit.querySelector('.circuit__car');
    if (!track || !car || typeof track.getPointAtLength !== 'function') return;

    var total = track.getTotalLength();
    if (!total) return;

    function place(frac) {
      var p = track.getPointAtLength(frac * total);
      car.setAttribute('cx', p.x);
      car.setAttribute('cy', p.y);
    }

    place(0);

    /* Reduced motion: the track is already drawn by the media query, and the
       car stays parked on the start line rather than circulating. */
    if (motionReduced()) {
      circuit.classList.add('is-onscreen');
      return;
    }

    var running = false;
    var startedAt = 0;
    var elapsed = 0; /* lap progress kept across pauses, so it resumes in place */

    function frame(now) {
      if (!running) return;
      place((((now - startedAt) + elapsed) % LAP_MS) / LAP_MS);
      requestAnimationFrame(frame);
    }

    function start(now) {
      if (running) return;
      running = true;
      startedAt = now;
      requestAnimationFrame(frame);
    }

    function stop(now) {
      if (!running) return;
      running = false;
      elapsed = (elapsed + (now - startedAt)) % LAP_MS;
    }

    if (typeof window.IntersectionObserver !== 'function') {
      circuit.classList.add('is-onscreen');
      start(performance.now());
      return;
    }

    var observer = new IntersectionObserver(function (entries) {
      for (var i = 0; i < entries.length; i++) {
        if (entries[i].isIntersecting) {
          circuit.classList.add('is-onscreen');
          start(performance.now());
        } else {
          stop(performance.now());
        }
      }
    }, { rootMargin: '80px 0px' });

    observer.observe(circuit);
  }

  /* --------------------------------------------------------------------
     5. Footer year.
     -------------------------------------------------------------------- */
  function setFooterYear() {
    var yearEl = document.getElementById('year');
    if (yearEl) {
      yearEl.textContent = new Date().getFullYear();
    }
  }

  /* --------------------------------------------------------------------
     5b. Vehicle pages — data-driven build sheets

     A vehicle page (coche-madrams.html, quantum.html, elyos.html) is a thin
     shell: <div id="vehicle-root" data-vehicle="…"> and nothing else in the
     main. Everything visible is rendered here from the table below, in the
     current language, and re-rendered on every toggle. The rule the spec
     asks for holds by construction: adding a subsystem is one entry in a
     `modules` array — no HTML is ever touched to add one.

     Content lives in {es, en} pairs so a string is added in both languages
     in one place, next to the module it belongs to.
     -------------------------------------------------------------------- */
  var VEHICLES = {
    madrams: {
      ch: 'coche',
      name: 'Coche MadRams',
      category: { es: 'Baja SAE · Minibaja', en: 'Baja SAE · Minibaja' },
      tagline: {
        es: 'El coche Baja real, hablando por radio en pista.',
        en: 'The real Baja car, talking over radio on track.'
      },
      hero: {
        title: { es: 'GPS y ruta óptima', en: 'GPS and the optimal line' },
        lede: {
          es: 'De la traza GPS sale la vuelta ideal: la vuelta 1 se graba como spline de referencia, cada punto posterior se proyecta al marco de Frenet (s, d), y de todas las vueltas se extrae el tiempo mínimo por bin de 2 m. La vuelta ideal es una que nadie corrió completa. Delta en vivo contra la mejor vuelta en Grafana, para darle al piloto la línea a seguir desde pits.',
          en: 'The ideal lap comes out of the GPS trace: lap 1 is recorded as a reference spline, every later point is projected into the Frenet frame (s, d), and the minimum time per 2 m bin is pulled from every lap. The ideal lap is one nobody drove in full. Live delta against the best lap in Grafana, to hand the driver a line to follow from the pits.'
        },
        cite: {
          es: 'Werling et al., Optimal Trajectory Generation in a Frenet Frame, IEEE ICRA 2010.',
          en: 'Werling et al., Optimal Trajectory Generation in a Frenet Frame, IEEE ICRA 2010.'
        },
        detail: {
          es: 'measRate=100ms + navRate=2 — el chip mide a 10 Hz y entrega a 5 Hz, y el carrier smoothing sobre dos épocas baja el CEP de ~1.5 m a ~1.0 m sin tocar el protocolo LoRa ni los structs.',
          en: 'measRate=100ms + navRate=2 — the chip samples at 10 Hz and delivers at 5 Hz, and carrier smoothing over two epochs drops the CEP from ~1.5 m to ~1.0 m without touching the LoRa protocol or the structs.'
        }
      },
      result: { es: '4.º · Endurance · Baja SAE Oregon', en: '4th · Endurance · Baja SAE Oregon' },
      modules: [
        {
          name: { es: 'Radio y protocolo', en: 'Radio & protocol' },
          solves: { es: 'El enlace de datos del coche a pits.', en: 'The data link from car to pits.' },
          decision: {
            es: 'Binario TDM: Route 0x55 @5 Hz (19 B) + Status 0xAA @1 Hz (39 B). ToA extrapolado y validado contra el slot; cumplimiento IFT-008-2015 y FCC §15.247. El pico de ~1 A en TX se diagnosticó como riesgo de sag y se mitigó con un capacitor, no con un buck más grande.',
            en: 'Binary TDM: Route 0x55 @5 Hz (19 B) + Status 0xAA @1 Hz (39 B). ToA extrapolated and validated against the slot; IFT-008-2015 and FCC §15.247 compliant. The ~1 A TX spike was diagnosed as a sag risk and mitigated with a capacitor, not a bigger buck.'
          },
          chips: ['TDM', 'LoRa/SX1262', 'IFT-008-2015', 'FCC §15.247'],
          status: 'design'
        },
        {
          name: { es: 'Suspensión', en: 'Suspension' },
          solves: { es: 'Recorrido de suspensión para data logging.', en: 'Suspension travel for data logging.' },
          decision: {
            es: 'Se difirió el AS5600 y se tomaron potenciómetros OEM GM, aceptando ±2–3 % de linealidad (~±3–4 mm en 150 mm) porque la necesidad de hoy es data logging, no control cerrado.',
            en: 'The AS5600 was deferred for OEM GM potentiometers, accepting ±2–3 % linearity (~±3–4 mm over 150 mm) because today’s need is data logging, not closed-loop control.'
          },
          chips: ['potenciómetro OEM', 'data logging'],
          status: 'design'
        },
        {
          name: { es: 'RPM y CVT', en: 'RPM & CVT' },
          solves: { es: 'Relación de CVT en tiempo real.', en: 'CVT ratio in real time.' },
          decision: {
            es: 'Dos AS5600 con la misma dirección fija (0x36), aislados por un mux TCA9548A, para calcular cvt_ratio en vivo — una métrica derivada que ningún sensor mide.',
            en: 'Two AS5600s sharing the same fixed address (0x36), isolated by a TCA9548A mux, to compute cvt_ratio live — a derived metric no single sensor measures.'
          },
          chips: ['AS5600', 'TCA9548A', 'I²C'],
          status: 'design'
        },
        {
          name: { es: 'Frenos', en: 'Brakes' },
          solves: { es: 'Evento y presión de frenado, sin falsos datos.', en: 'Brake events and pressure, without false data.' },
          decision: {
            es: 'Nivel: switch sellado de motorsport en vez de una modificación casera, porque una falla ahí no es sólo un mal dato. Presión: transductor analógico en vez de switch, para ver la rampa del frenado y detectar caída gradual.',
            en: 'Level: a sealed motorsport switch instead of a home-made mod, because a failure there isn’t just bad data. Pressure: an analog transducer instead of a switch, to see the braking ramp and catch gradual fade.'
          },
          chips: ['motorsport switch', 'transductor analógico'],
          status: 'design'
        }
      ],
      state: {
        es: 'Casi todo está diseñado y documentado, con hardware pendiente de comprar y validar. Lo único citable como resultado es el 4.º lugar en Endurance, Baja SAE Oregon.',
        en: 'Almost everything is designed and documented, with hardware still to buy and validate. The only citable result is 4th place in Endurance, Baja SAE Oregon.'
      },
      doc: { url: 'https://balsam-ringer-081.notion.site/797b2fdbb6b982669b6981bc59cf0b23', label: 'default' }
    },

    quantum: {
      ch: 'quantum',
      name: 'Quantum Speed Racing',
      category: { es: 'Electrathon MX · RACER (48 V, máx 6 kWh)', en: 'Electrathon MX · RACER (48 V, max 6 kWh)' },
      tagline: {
        es: 'Potencia eléctrica de un auto de carreras, domada.',
        en: 'A race car’s electric power, tamed.'
      },
      hero: {
        title: { es: 'Cadena de tracción de 48 V', en: '48 V traction chain' },
        chain: { es: 'pack → BMS → controlador → motor', en: 'pack → BMS → controller → motor' },
        lede: {
          es: '2× Tronix 16S4P LiFePO4 en paralelo (6 kWh) → fusible 250 A → Alltrax SR48300 → Motenergy ME0909 PM DC. La decisión que define el sistema: Max Motor Amps a 98 A, que es el límite del motor, no del controlador — el SR48300 entregaría 300 A sin quejarse y quemaría el ME0909. Peak Amp Mode desactivado por lo mismo. Y Under Voltage a 40 V, deliberadamente bajo: el sag de arranque de un 16S bajo carga hunde el voltaje un instante, y un umbral más alto cortaría en cada acelerada.',
          en: '2× Tronix 16S4P LiFePO4 in parallel (6 kWh) → 250 A fuse → Alltrax SR48300 → Motenergy ME0909 PM DC. The decision that defines the system: Max Motor Amps at 98 A, which is the motor’s limit, not the controller’s — the SR48300 would hand over 300 A without complaint and burn the ME0909. Peak Amp Mode disabled for the same reason. And Under Voltage at 40 V, deliberately low: a 16S pack’s startup sag under load dips the voltage for an instant, and a higher threshold would cut on every throttle stab.'
        }
      },
      modules: [
        {
          name: { es: 'Energía y BMS', en: 'Energy & BMS' },
          solves: { es: 'Estado de los packs, leído en vivo.', en: 'Pack state, read live.' },
          decision: {
            es: 'Lectura del Daly por BLE con bleak desde una Raspberry Pi 4 a ~5.4 Hz — el camino UART se descartó porque el clon usa un protocolo propietario no decodificable. Regla de paralelo: ΔV < 0.1 V antes de conectar, o los packs se ecualizan solos a través del cable sin nada que limite la corriente.',
            en: 'Reading the Daly over BLE with bleak from a Raspberry Pi 4 at ~5.4 Hz — the UART path was dropped because the clone speaks an undecodable proprietary protocol. Parallel rule: ΔV < 0.1 V before connecting, or the packs equalize themselves through the cable with nothing to limit the current.'
          },
          chips: ['Daly BMS', 'BLE', 'bleak', 'Raspberry Pi 4'],
          status: 'bench'
        },
        {
          name: { es: 'Telemetría', en: 'Telemetry' },
          solves: { es: 'Tres nodos, un solo punto de subida.', en: 'Three nodes, one uplink.' },
          decision: {
            es: 'Tres nodos y un solo punto de subida: la Pi 4. Los ESP32 no hablan con la nube — uno adquiere, otro presenta. Concentrar la salida evita credenciales repartidas, relojes divergentes y tres caminos que depurar.',
            en: 'Three nodes and a single uplink: the Pi 4. The ESP32s don’t talk to the cloud — one acquires, one displays. Concentrating the output avoids scattered credentials, diverging clocks and three paths to debug.'
          },
          chips: ['ESP32', 'Raspberry Pi 4', 'InfluxDB', 'Grafana'],
          status: 'bench'
        },
        {
          name: { es: 'Respaldo de datos', en: 'Data backup' },
          solves: { es: 'Una fuente de verdad que no depende del WiFi.', en: 'A source of truth that doesn’t depend on WiFi.' },
          decision: {
            es: 'El nodo de display graba a SD a 10 Hz en paralelo. El WiFi es conveniencia; la SD es la fuente de verdad.',
            en: 'The display node logs to SD at 10 Hz in parallel. WiFi is convenience; the SD card is the source of truth.'
          },
          chips: ['microSD', '10 Hz'],
          status: 'bench'
        },
        {
          name: { es: 'Display del piloto', en: 'Driver display' },
          solves: { es: 'Lo que el piloto ve.', en: 'What the driver sees.' },
          decision: {
            es: 'TFT SSD1963 con gauges.',
            en: 'TFT SSD1963 with gauges.'
          },
          chips: ['TFT SSD1963'],
          status: 'bench'
        }
      ],
      state: {
        es: 'La cadena de telemetría está validada en banco (InfluxDB + SD 10 Hz + Grafana). Pendiente en vehículo: fusible de 250 A, kill-switches interior y exterior, baterías aseguradas al chasis, sensor de temperatura de motor. El coche no se presenta como operativo.',
        en: 'The telemetry chain is bench-validated (InfluxDB + SD 10 Hz + Grafana). Pending in the vehicle: 250 A fuse, interior and exterior kill-switches, batteries secured to the chassis, motor temperature sensor. The car is not presented as operational.'
      },
      doc: { url: 'https://balsam-ringer-081.notion.site/1aab2fdbb6b982959ef201dbf93ec2cf', label: 'default' }
    },

    elyos: {
      ch: 'elyos',
      name: 'Silca Elyos Racing',
      category: { es: 'Shell Eco-marathon US 2026 · Indianapolis · Prototype Battery Electric', en: 'Shell Eco-marathon US 2026 · Indianapolis · Prototype Battery Electric' },
      tagline: {
        es: 'Menos energía por vuelta, escrita en el firmware.',
        en: 'Less energy per lap, written into the firmware.'
      },
      hero: {
        title: { es: 'Eficiencia energética escrita en el firmware', en: 'Energy efficiency written into the firmware' },
        lede: {
          es: 'Dos ECUs: un Teensy 4.1 que convierte pedal en corriente con FOC, y un ESP32 que adquiere, fusiona y transmite. La optimización de consumo vive en el pipeline del pedal: limitación de slew asimétrica — la subida de corriente se limita al doble de lento que la bajada (100 vs 200 A/s), porque en Eco-marathon los picos de corriente son pérdida pura por I²R, mientras que la bajada rápida se conserva por seguridad. Más un techo de corriente dependiente de la velocidad: bajo 5 rad/s el motor está casi en corto y la corriente no produce trabajo útil, así que se capa el arranque.',
          en: 'Two ECUs: a Teensy 4.1 that turns pedal into current with FOC, and an ESP32 that acquires, fuses and transmits. The consumption optimization lives in the pedal pipeline: asymmetric slew limiting — current rise is limited twice as slowly as its fall (100 vs 200 A/s), because in Eco-marathon current spikes are pure I²R loss, while a fast fall is kept for safety. Plus a speed-dependent current ceiling: below 5 rad/s the motor is nearly shorted and current does no useful work, so the launch is capped.'
        }
      },
      result: { es: '6.º · ~310 km/kWh', en: '6th · ~310 km/kWh' },
      modules: [
        {
          name: { es: 'Fusión de sensores', en: 'Sensor fusion' },
          solves: { es: 'Estado del vehículo desde tres sensores dispares.', en: 'Vehicle state from three mismatched sensors.' },
          decision: {
            es: 'Kalman 2D de 6 estados que fusiona acelerómetro, GPS y velocidad. Las mediciones llegan por cola con tipo etiquetado, lo que permite que cada sensor corra a su propia frecuencia sin sincronizar tres tareas contra el filtro. Filtro fijado al core 0, adquisición al core 1.',
            en: 'A 6-state 2D Kalman filter fusing accelerometer, GPS and speed. Measurements arrive on a queue with a tagged type, letting each sensor run at its own rate without synchronizing three tasks against the filter. Filter pinned to core 0, acquisition to core 1.'
          },
          chips: ['Kalman 2D', 'ESP32', 'dual-core'],
          status: 'track'
        },
        {
          name: { es: 'Protocolo entre ECUs', en: 'Inter-ECU protocol' },
          solves: { es: 'El enlace entre las dos ECUs.', en: 'The link between the two ECUs.' },
          decision: {
            es: 'Binario propio sobre UART: SOF 0xAA, CRC-8 ATM, máquina de estados de 4 estados. Un comando agregado (GET_ALL_FAST, 14 B) en vez de cinco round-trips; struct packed en ambos lados porque ARM y Xtensa alinean distinto.',
            en: 'A custom binary over UART: SOF 0xAA, CRC-8 ATM, a 4-state machine. One aggregated command (GET_ALL_FAST, 14 B) instead of five round-trips; a packed struct on both sides because ARM and Xtensa align differently.'
          },
          chips: ['UART', 'CRC-8 ATM', 'Teensy 4.1', 'ESP32'],
          status: 'track'
        },
        {
          name: { es: 'Adquisición', en: 'Acquisition' },
          solves: { es: 'Sensores de a bordo a 5–10 Hz sin saturar el UART.', en: 'Onboard sensors at 5–10 Hz without saturating the UART.' },
          decision: {
            es: 'GPS MT3333 multiconstelación con control PMTK por sentencia — apagar sentencias NMEA individuales es lo que hace viable subir a 5–10 Hz sin saturar el UART. Pitot MS4525DO con calibración de cero en reposo.',
            en: 'A multi-constellation MT3333 GPS with per-sentence PMTK control — turning off individual NMEA sentences is what makes 5–10 Hz viable without saturating the UART. An MS4525DO pitot with a zero calibration at rest.'
          },
          chips: ['MT3333', 'PMTK', 'MS4525DO pitot'],
          status: 'track'
        },
        {
          name: { es: 'Arquitectura RTOS', en: 'RTOS architecture' },
          solves: { es: 'Ocho tareas priorizadas por lo que cuesta perder el dato.', en: 'Eight tasks prioritized by the cost of losing the data.' },
          decision: {
            es: '8 tareas con prioridad y núcleo explícitos, asignadas por la consecuencia de perder el dato: display del piloto (15) sobre parseo de GPS (5), consola de depuración al fondo (1).',
            en: '8 tasks with explicit priority and core, assigned by the consequence of losing the data: driver display (15) over GPS parsing (5), debug console at the bottom (1).'
          },
          chips: ['FreeRTOS', '8 tasks', 'dual-core'],
          status: 'track'
        },
        {
          name: { es: 'Autónomo', en: 'Autonomous' },
          solves: { es: 'Dirección exploratoria, nada implementado.', en: 'An exploratory direction, nothing implemented.' },
          decision: {
            es: 'Exploratorio. Nada implementado todavía; si la categoría entra, la página crece de 4 a más módulos sin reescribirse — sólo se agregan entradas.',
            en: 'Exploratory. Nothing implemented yet; if the category lands, the page grows from 4 modules to more without a rewrite — entries are just added.'
          },
          chips: [],
          status: 'explore'
        }
      ],
      state: {
        es: 'Firmware implementado y documentado. La sección autónoma es exploración. La contribución fue de optimización sobre un sistema existente, no autoría del sistema — el repositorio del driver es un fork.',
        en: 'Firmware implemented and documented. The autonomous section is exploration. The contribution was optimization over an existing system, not authorship of it — the driver repository is a fork.'
      },
      doc: { url: 'https://balsam-ringer-081.notion.site/d1fb2fdbb6b98201b694810bf2f59373', label: 'team' }
    }
  };

  var VEHICLE_ORDER = ['madrams', 'quantum', 'elyos'];
  var VEHICLE_PAGE = { madrams: 'coche-madrams', quantum: 'quantum', elyos: 'elyos' };

  /* Pick the current-language string from an {es, en} pair, falling back to ES
     (the authored language) if a translation is ever missing. */
  function vt(pair, lang) {
    if (!pair) return '';
    return pair[lang] || pair.es || '';
  }

  function make(tag, cls, text) {
    var node = document.createElement(tag);
    if (cls) node.className = cls;
    if (text != null) node.textContent = text;
    return node;
  }

  function setMetaContent(selector, value) {
    var node = document.querySelector(selector);
    if (node) node.setAttribute('content', value);
  }

  /* Rendered on load and on every language toggle. Guarded: on any page that
     is not a vehicle page there is no #vehicle-root, so this returns at once. */
  function renderVehiclePage(lang) {
    var root = document.getElementById('vehicle-root');
    if (!root) return;
    var v = VEHICLES[root.getAttribute('data-vehicle')];
    if (!v) return;

    var dict = i18n[lang] || i18n.es;
    root.textContent = '';
    root.style.setProperty('--ch', 'var(--ch-' + v.ch + ')');

    /* Meta description tracks the toggle too, from the same tagline the page
       shows — the shell ships an ES default for no-JS crawlers, this keeps the
       description in sync once the language is chosen. (og:title is handled by
       the standard data-i18n-content pass.) */
    var desc = vt(v.tagline, lang);
    setMetaContent('meta[name="description"]', desc);
    setMetaContent('meta[property="og:description"]', desc);

    /* ---- Subhead: backlink to the parent bank, name, framing, count ---- */
    var head = make('section', 'section section--sub');
    var back = make('a', 'backlink', dict['vehicle.back'] || 'Volver a Telemetría y potencia');
    back.setAttribute('href', 'telemetria');
    back.setAttribute('data-page-link', '');
    head.appendChild(back);
    head.appendChild(make('h1', 'subhead__title', v.name));
    head.appendChild(make('p', 'subhead__line', vt(v.category, lang)));
    var count = v.modules.length + ' ' + (dict['vehicle.modulesWord'] || 'módulos');
    head.appendChild(make('p', 'subhead__count', count));
    root.appendChild(head);

    /* ---- Hero: the one idea the build is organised around ---- */
    var hero = make('section', 'section vhero');
    hero.appendChild(make('h2', 'vhero__title', vt(v.hero.title, lang)));
    if (v.hero.chain) hero.appendChild(make('p', 'vhero__chain', vt(v.hero.chain, lang)));
    hero.appendChild(make('p', 'vhero__lede', vt(v.hero.lede, lang)));
    if (v.hero.cite) {
      hero.appendChild(make('p', 'vhero__cite', (dict['vehicle.base'] || 'Base') + ' · ' + vt(v.hero.cite, lang)));
    }
    if (v.hero.detail) hero.appendChild(make('p', 'vhero__detail', vt(v.hero.detail, lang)));

    var actions = make('div', 'vhero__actions');
    if (v.result) actions.appendChild(make('span', 'vresult', vt(v.result, lang)));
    var docLabelKey = v.doc.label === 'team' ? 'doc.team' : 'doc.default';
    var docBtn = make('a', 'btn btn--demo', dict[docLabelKey] || 'Documentación técnica');
    docBtn.setAttribute('href', v.doc.url);
    docBtn.setAttribute('target', '_blank');
    docBtn.setAttribute('rel', 'noopener noreferrer');
    actions.appendChild(docBtn);
    hero.appendChild(actions);
    root.appendChild(hero);

    /* ---- Board: one module per subsystem ---- */
    var board = make('section', 'section');
    board.setAttribute('aria-label', dict['vehicle.modulesHeading'] || 'Módulos');
    var grid = make('div', 'board');
    for (var i = 0; i < v.modules.length; i++) {
      grid.appendChild(buildModule(v.modules[i], lang, dict));
    }
    board.appendChild(grid);

    /* ---- Honest-status callout ---- */
    var state = make('div', 'vstate');
    state.appendChild(make('p', 'vstate__label', dict['vehicle.state'] || 'Estado honesto'));
    state.appendChild(make('p', 'vstate__body', vt(v.state, lang)));
    board.appendChild(state);
    root.appendChild(board);

    /* ---- Foot: the other vehicles in this bank ---- */
    root.appendChild(buildSiblings(root.getAttribute('data-vehicle'), lang, dict));
  }

  function buildModule(m, lang, dict) {
    var card = make('article', 'module');

    var headRow = make('div', 'module__head');
    headRow.appendChild(make('h3', 'module__name', vt(m.name, lang)));
    var statusKey = 'status.' + m.status;
    var status = make('span', 'status status--' + m.status);
    status.appendChild(make('span', 'status__dot'));
    status.appendChild(document.createTextNode(dict[statusKey] || m.status));
    headRow.appendChild(status);
    card.appendChild(headRow);

    if (m.solves) card.appendChild(make('p', 'module__solves', vt(m.solves, lang)));
    card.appendChild(make('p', 'module__decision', vt(m.decision, lang)));

    if (m.chips && m.chips.length) {
      var badges = make('ul', 'badges');
      for (var i = 0; i < m.chips.length; i++) {
        badges.appendChild(make('li', 'badge', m.chips[i]));
      }
      card.appendChild(badges);
    }
    return card;
  }

  function buildSiblings(currentId, lang, dict) {
    var nav = make('nav', 'section siblings');
    nav.setAttribute('aria-label', dict['vehicle.siblings'] || 'Otros vehículos');
    nav.appendChild(make('span', 'siblings__label', dict['vehicle.siblings'] || 'Otros vehículos'));
    for (var i = 0; i < VEHICLE_ORDER.length; i++) {
      var id = VEHICLE_ORDER[i];
      if (id === currentId) continue;
      var link = make('a', 'link', VEHICLES[id].name);
      link.setAttribute('style', '--ch: var(--ch-' + VEHICLES[id].ch + ')');
      link.setAttribute('href', VEHICLE_PAGE[id]);
      link.setAttribute('data-page-link', '');
      nav.appendChild(link);
    }
    return nav;
  }

  /* --------------------------------------------------------------------
     6. Init. Script is loaded with `defer`, so the DOM is already parsed
        by the time this runs.
     -------------------------------------------------------------------- */
  /* Stamped before anything else: CSS keys the undrawn state of the bank
     strips off it, so with scripting off they render finished. */
  document.documentElement.classList.add('js');

  enableWebFonts();
  applyLanguage(currentLang, hadLangInUrl);
  initLangToggle();
  initDisclosures();
  initBankReveal();
  initCircuit();
  initBookingTabs();
  initCalendlyDefer();
  setFooterYear();
})();
