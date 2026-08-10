/* main.js — i18n toggle, Calendly tabs, footer year.
   No browser storage APIs or cookies used anywhere in this file. Language
   state lives in memory and in location.hash only. */

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

      'proj.jtcs.unit': 'conteo por carril',
      'proj.jtcs.tagline': 'Semáforos que se adaptan al tráfico en tiempo real.',
      'proj.jtcs.blurb': 'Control de intersecciones con visión en el borde: un detector YOLOv11 cuenta vehículos por carril y reparte el verde con una fórmula derivada de Webster (HCM/MUTCD). Dashboard en React con simulación de red y ondas verdes; corre en Raspberry Pi. Guadalahacks 2026.',

      'proj.neurobeat.unit': 'EEG · 8 canales',
      'proj.neurobeat.tagline': 'Un juego que controlas con la mente.',
      'proj.neurobeat.blurb': 'Traduce señales EEG del headset Unicorn Black (8 canales) en acciones de juego: filtrado notch/bandpass/ICA, un modelo EEGNet detecta parpadeos deliberados y el giroscopio mueve el cursor, todo por UDP hacia un juego en Unity. Hackathon Brain.io.',

      'proj.telemetry.unit': 'telemetría en vivo',
      'proj.telemetry.tagline': 'Telemetría en vivo para coches de competencia SAE.',
      'proj.telemetry.blurb': 'Stack de telemetría en tiempo real: sensores en un ESP32 (RPM, temperatura, GPS, suspensión) enviados por LoRa 915 MHz o WiFi hacia InfluxDB + Grafana. Firmware FreeRTOS (dual-core, dual-SPI). Cualquier equipo lo adopta editando solo un .env.',

      'proj.robot.unit': 'navegación autónoma',
      'proj.robot.tagline': 'Robot autónomo con ROS2 y navegación.',
      'proj.robot.blurb': 'Robot diferencial sobre ROS2: navegación con Nav2, LiDAR LDROBOT, interfaz de hardware por Arduino y teleoperación por joystick. Robótica de competencia con el stack estándar de la industria.',

      'proj.mapatec.unit': 'ruta peatonal',
      'proj.mapatec.tagline': 'Rutas peatonales dentro del campus.',
      'proj.mapatec.blurb': 'Mapa interactivo del campus GDL con cálculo de rutas peatonales entre edificios usando datos públicos de OpenStreetMap. La ubicación se procesa solo en tu dispositivo, con aviso de privacidad conforme a la LFPDPPP. Proyecto independiente, no oficial.',

      'proj.madrams.unit': 'formación de equipo',
      'proj.madrams.tagline': 'Portal de formación del equipo Baja SAE.',
      'proj.madrams.blurb': 'Biblioteca de cursos de nuevo ingreso para MadRams (Minibaja SAE, Tec GDL): cursos por categoría y nivel, con un render 3D del coche por secuencia de imágenes. HTML/CSS/JS estático.',

      'proj.btn.demo': 'Demo en vivo',
      'proj.btn.code': 'Código',

      'about.heading': 'Sobre mí',
      'about.bio': 'Soy estudiante de Ingeniería en Robótica en el Tec de Monterrey, Campus Guadalajara. Me interesa el camino completo del sensor a la decisión: adquirir señales, procesarlas y convertirlas en acciones — en visión en el borde, sistemas embebidos y robótica de competencia. Formo parte del equipo Baja SAE MadRams.',
      'about.skills.edgeai': 'Edge AI / Visión',
      'about.skills.robotics': 'Robótica',
      'about.skills.embedded': 'Embebidos',
      'about.skills.fullstack': 'Full-stack / Datos',
      'about.skills.languages': 'Lenguajes',
      'about.skills.simulation': 'Simulación',

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

      'proj.jtcs.unit': 'count per lane',
      'proj.jtcs.tagline': 'Traffic signals that adapt to demand in real time.',
      'proj.jtcs.blurb': 'Edge-AI intersection control: a YOLOv11 detector counts vehicles per lane and allocates green time with a Webster-derived formula (HCM/MUTCD). React dashboard with network simulation and green waves; runs on Raspberry Pi. Guadalahacks 2026.',

      'proj.neurobeat.unit': 'EEG · 8 channels',
      'proj.neurobeat.tagline': 'A game you control with your mind.',
      'proj.neurobeat.blurb': 'Turns EEG from the Unicorn Black headset (8 channels) into game input: notch/bandpass/ICA filtering, an EEGNet model detects deliberate blinks, and the gyroscope drives the cursor — over UDP into a Unity game. Brain.io hackathon.',

      'proj.telemetry.unit': 'live telemetry',
      'proj.telemetry.tagline': 'Live telemetry for SAE competition cars.',
      'proj.telemetry.blurb': 'Real-time telemetry stack: ESP32 sensors (RPM, temp, GPS, suspension) over LoRa 915 MHz or WiFi into InfluxDB + Grafana. FreeRTOS firmware (dual-core, dual-SPI). Any team adopts it by editing a single .env.',

      'proj.robot.unit': 'autonomous navigation',
      'proj.robot.tagline': 'Autonomous robot with ROS2 and navigation.',
      'proj.robot.blurb': 'Differential-drive robot on ROS2: Nav2 navigation, LDROBOT LiDAR, an Arduino hardware interface, and joystick teleop. Competition robotics on the industry-standard stack.',

      'proj.mapatec.unit': 'pedestrian route',
      'proj.mapatec.tagline': 'Pedestrian routing across campus.',
      'proj.mapatec.blurb': 'Interactive GDL campus map with pedestrian routing between buildings from public OpenStreetMap data. Location is processed on-device only, with an LFPDPPP-compliant privacy notice. Independent, unofficial project.',

      'proj.madrams.unit': 'team onboarding',
      'proj.madrams.tagline': 'Baja SAE team onboarding portal.',
      'proj.madrams.blurb': 'Onboarding course library for MadRams (Minibaja SAE, Tec GDL): courses by category and level, with a 3D image-sequence render of the car. Static HTML/CSS/JS.',

      'proj.btn.demo': 'Live demo',
      'proj.btn.code': 'Code',

      'about.heading': 'About',
      'about.bio': "I'm a Robotics Engineering student at Tec de Monterrey, Guadalajara. I care about the whole path from sensor to decision — acquiring signals, processing them, turning them into action — across edge vision, embedded systems, and competition robotics. I'm on the MadRams Baja SAE team.",
      'about.skills.edgeai': 'Edge AI / Vision',
      'about.skills.robotics': 'Robotics',
      'about.skills.embedded': 'Embedded',
      'about.skills.fullstack': 'Full-stack / Data',
      'about.skills.languages': 'Languages',
      'about.skills.simulation': 'Simulation',

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
        and in location.hash only.
     -------------------------------------------------------------------- */
  function langFromHash() {
    var h = location.hash.replace('#', '').toLowerCase();
    return h === 'en' || h === 'es' ? h : null;
  }

  function initialLang() {
    var fromHash = langFromHash();
    if (fromHash) return fromHash;
    if (navigator.language && navigator.language.toLowerCase().indexOf('en') === 0) {
      return 'en';
    }
    return 'es';
  }

  var hadHashOnInit = langFromHash() !== null;
  var currentLang = initialLang();

  function applyLanguage(lang, writeHash) {
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

    /* Only touch the URL when the language is the result of a choice —
       a toggle click, or a hash that was already present on load — not
       on a plain default-language first visit. */
    if (writeHash) {
      history.replaceState(null, '', '#' + lang);
    }
  }

  function initLangToggle() {
    var toggle = document.getElementById('lang-toggle');
    if (!toggle) return;
    toggle.addEventListener('click', function () {
      applyLanguage(currentLang === 'es' ? 'en' : 'es', true);
    });

    /* Browser back/forward across #es/#en, or a hand-edited fragment, is a
       same-document transition: nothing reloads, so re-apply the language
       here. history.replaceState (used by the toggle) does not fire this,
       so there is no feedback loop. A non-language fragment (#book) is
       ignored — it must not reset the visitor's choice. */
    window.addEventListener('hashchange', function () {
      var fromHash = langFromHash();
      if (fromHash && fromHash !== currentLang) {
        applyLanguage(fromHash, false);
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
     4. Footer year.
     -------------------------------------------------------------------- */
  function setFooterYear() {
    var yearEl = document.getElementById('year');
    if (yearEl) {
      yearEl.textContent = new Date().getFullYear();
    }
  }

  /* --------------------------------------------------------------------
     5. Init. Script is loaded with `defer`, so the DOM is already parsed
        by the time this runs.
     -------------------------------------------------------------------- */
  enableWebFonts();
  applyLanguage(currentLang, hadHashOnInit);
  initLangToggle();
  initBookingTabs();
  initCalendlyDefer();
  setFooterYear();
})();
