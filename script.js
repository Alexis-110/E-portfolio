(function () {
  "use strict";

  const root = document.documentElement;
  const reduceMotion = window.matchMedia
    ? window.matchMedia("(prefers-reduced-motion: reduce)")
    : { matches: false };

  /* ==========================================================
     1. Mode "lite" : machines sans accélération GPU ou très modestes
        -> la classe .lite (voir style.css) retire flous et mélanges coûteux.
        Forçage pour tester : ?lite=1 (activer) / ?lite=0 (désactiver)
     ========================================================== */
  const LOW_CPU_CORES = 2;

  function hasSoftwareRendering() {
    try {
      const canvas = document.createElement("canvas");
      // failIfMajorPerformanceCaveat : le contexte échoue si le navigateur
      // retomberait sur un rendu logiciel (SwiftShader, llvmpipe...)
      const gl = canvas.getContext("webgl", { failIfMajorPerformanceCaveat: true });
      if (!gl) return true;

      const info = gl.getExtension("WEBGL_debug_renderer_info");
      const renderer = info ? String(gl.getParameter(info.UNMASKED_RENDERER_WEBGL)) : "";
      const lose = gl.getExtension("WEBGL_lose_context");
      if (lose) lose.loseContext();

      return /swiftshader|llvmpipe|softpipe|software|basic render/i.test(renderer);
    } catch (e) {
      return false;
    }
  }

  function shouldUseLiteMode() {
    const forced = /[?&]lite=([01])(?:&|$)/.exec(window.location.search);
    if (forced) return forced[1] === "1";

    const cores = navigator.hardwareConcurrency;
    if (cores && cores <= LOW_CPU_CORES) return true;

    return hasSoftwareRendering();
  }

  if (shouldUseLiteMode()) root.classList.add("lite");

  /* ==========================================================
     2. Révélation au scroll (unobserve dès qu'une section est affichée)
     ========================================================== */
  const revealItems = document.querySelectorAll(".reveal");

  if (!("IntersectionObserver" in window) || reduceMotion.matches) {
    // Navigateur trop ancien ou animations réduites : tout afficher d'un coup
    revealItems.forEach((el) => el.classList.add("show"));
  } else {
    let remaining = revealItems.length;

    const revealObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting || entry.target.classList.contains("show")) return;

        entry.target.classList.add("show");
        observer.unobserve(entry.target);

        if (--remaining === 0) observer.disconnect();
      });
    });

    revealItems.forEach((el) => revealObserver.observe(el));
  }

  /* ==========================================================
     3. Animations du hero en pause quand il n'est plus visible
     ========================================================== */
  const heroVisual = document.querySelector(".hero-visual");

  if (heroVisual && "IntersectionObserver" in window) {
    new IntersectionObserver((entries) => {
      const latest = entries[entries.length - 1];
      heroVisual.classList.toggle("is-paused", !latest.isIntersecting);
    }).observe(heroVisual);
  }

  /* ==========================================================
     4. Bouton "retour en haut" (écouteur passif + 1 calcul par image)
     ========================================================== */
  const scrollBtn = document.querySelector(".scroll-top");
  let scrollTicking = false;
  let scrollBtnVisible = false;

  function updateScrollButton() {
    scrollTicking = false;
    const shouldShow = (window.pageYOffset || root.scrollTop) > 400;

    if (shouldShow !== scrollBtnVisible) {
      scrollBtnVisible = shouldShow;
      scrollBtn.classList.toggle("visible", shouldShow);
    }
  }

  window.addEventListener(
    "scroll",
    () => {
      if (!scrollTicking) {
        scrollTicking = true;
        window.requestAnimationFrame(updateScrollButton);
      }
    },
    { passive: true }
  );

  updateScrollButton();

  function scrollBehavior() {
    return reduceMotion.matches ? "auto" : "smooth";
  }

  function scrollToTop() {
    window.scrollTo({ top: 0, behavior: scrollBehavior() });
  }

  function scrollToSection(id) {
    const section = document.getElementById(id);
    if (section) section.scrollIntoView({ behavior: scrollBehavior() });
  }

  /* ==========================================================
     5. Modale
     ========================================================== */
  const modal = document.getElementById("modal");
  const modalTitle = document.getElementById("modalTitle");
  const modalBody = document.getElementById("modalBody");

  const PROJECT_DETAILS = {
    "Active Directory & GPO": "Déploiement complet d'un domaine Active Directory sous Windows Server, organisation des Unités Organisationnelles (OU), gestion des utilisateurs et des groupes, et mise en place de stratégies de groupe (GPO) avancées pour le durcissement de la sécurité du réseau.",
    "Portfolio": "Site web personnel moderne développé avec HTML, CSS et JavaScript. Utilise des animations fluides et un design responsive avec gradients dégradés et effets de réseau animés.",
    "Site de location": "Plateforme de location de voiture en ligne. Système de réservation complet avec gestion des véhicules, calendrier de disponibilité et interface utilisateur intuitive. Développé avec HTML, CSS, JavaScript, PHP et SQL.",
    "Serveur de jeu": "Mise en place d'un serveur de jeu multi-joueurs (Minecraft) sur Ubuntu Server. Configuration réseau, allocation de ressources (RAM, CPU), gestion des connexions et optimisation des performances.",
    "Infrastructure réseau": "Conception complète d'une infrastructure réseau avec Cisco PacketTracer incluant VLANs, routage multi-protocoles (OSPF, BGP), ACLs de sécurité et hiérarchie réseau.",
    "WordPress Ubuntu": "Installation et configuration complète de WordPress sur un serveur Ubuntu. Mise en place de la stack LAMP (Linux, Apache, MySQL, PHP), configuration des droits d'accès, sécurisation via SSL/TLS et personnalisation du thème.",
    "GLPI": "Déploiement de GLPI (Gestionnaire Libre de Parc Informatique) sur Ubuntu Server. Installation du serveur GLPI, configuration MySQL, déploiement des agents sur les postes clients pour l'inventaire automatique du parc informatique.",
    "Fail2ban": "Mise en place d'un protocole de sécurité avec Fail2ban sur Ubuntu. Configuration des filtres pour protéger SSH, Apache et autres services, définition des règles de bannissement automatique et tests de validation du dispositif de défense.",
    "Proxmox": "Configuration physique de deux serveurs Proxmox VE et mise en cluster haute disponibilité. Câblage réseau dédié, configuration du cluster Proxmox, gestion du stockage partagé (Ceph/NFS) et bascule automatique des VMs.",
    "OCS Inventory": "Déploiement d'OCS Inventory NG sur Ubuntu pour la gestion de parc informatique. Installation du serveur OCS avec stack LAMP, configuration web d'administration, import d'une base de données complète simulant une infrastructure réelle avec clients, logiciels, périphériques et matériels.",
    "Contact": "N'hésitez pas à me contacter par email à alexismessager123@gmail.com pour discuter de projets, opportunités de stage ou collaborations ! 📧"
  };

  function openModal(type) {
    modalTitle.textContent = type;
    modalBody.textContent = PROJECT_DETAILS[type] || "Détails du projet : " + type;
    modal.classList.add("open");
  }

  function closeModal() {
    modal.classList.remove("open");
  }

  /* ==========================================================
     6. Clics : un seul écouteur délégué (data-modal, data-scroll,
        data-scroll-top, data-close-modal) au lieu de onclick="..." partout
     ========================================================== */
  document.addEventListener("click", (event) => {
    const target = event.target;

    // Fermeture : croix ou clic sur le fond de la modale
    if (target === modal || target.closest("[data-close-modal]")) {
      closeModal();
      return;
    }

    // Liens (PDF, ancres, mailto...) : comportement normal, sans ouvrir la modale
    if (target.closest("a")) return;

    const modalTrigger = target.closest("[data-modal]");
    if (modalTrigger) {
      openModal(modalTrigger.getAttribute("data-modal"));
      return;
    }

    const scrollTrigger = target.closest("[data-scroll]");
    if (scrollTrigger) {
      scrollToSection(scrollTrigger.getAttribute("data-scroll"));
      return;
    }

    if (target.closest("[data-scroll-top]")) scrollToTop();
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && modal.classList.contains("open")) closeModal();
  });

  /* ==========================================================
     7. Année du footer
     ========================================================== */
  document.getElementById("year").textContent = new Date().getFullYear();
})();
