// Révélation au scroll
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("show");
    }
  });
});

document.querySelectorAll(".reveal").forEach((el) => observer.observe(el));

// Scroll-to-top
const scrollBtn = document.querySelector(".scroll-top");
window.addEventListener("scroll", () => {
  scrollBtn.style.display = window.scrollY > 400 ? "block" : "none";
});

function scrollToTop() {
  window.scrollTo({ top: 0, behavior: "smooth" });
}

// Modal gestion
function openModal(type) {
  const modal = document.getElementById("modal");
  const title = document.getElementById("modalTitle");
  const body = document.getElementById("modalBody");

  modal.style.display = "flex";
  title.textContent = type;
  
  const projectDetails = {
    'Portfolio': 'Site web personnel moderne développé avec HTML, CSS et JavaScript. Utilise des animations fluides et un design responsive.',
    'Site de location': 'Plateforme de location de voiture en ligne. Système de réservation complet avec gestion des véhicules, calendrier de disponibilité et interface utilisateur intuitive. Développé avec HTML, CSS, JavaScript, PHP et SQL.',
    'Serveur de jeu': 'Mise en place d\'un serveur de jeu multi-joueurs sur Ubuntu Server. Configuration réseau et gestion des connexions.',
    'Infrastructure réseau': 'Conception complète d\'une infrastructure réseau avec Cisco PacketTracer. Includes VLANs, routage et sécurité.',
    'WordPress Ubuntu': 'Installation et configuration complète de WordPress sur un serveur Ubuntu. Mise en place de la stack LAMP (Linux, Apache, MySQL, PHP), configuration des droits, sécurisation de l\'installation et personnalisation du site.',
    'GLPI': 'Déploiement de GLPI (Gestionnaire Libre de Parc Informatique) sur Ubuntu Server. Installation du serveur GLPI, configuration de la base de données MySQL, puis déploiement et configuration des agents GLPI sur les postes clients pour l\'inventaire automatique du parc informatique.',
    'Fail2ban': 'Mise en place d\'un protocole de sécurité avec Fail2ban sur Ubuntu. Configuration des filtres pour protéger les services exposés (SSH, Apache…), définition des règles de bannissement automatique des adresses IP suspectes, et tests de validation du dispositif.',
    'Proxmox': 'Configuration physique de deux serveurs Proxmox VE et mise en cluster. Câblage réseau dédié entre les deux nœuds, configuration du cluster Proxmox, gestion du stockage partagé et tests de haute disponibilité (HA) pour la bascule automatique des VMs.',
    'OCS Inventory': 'Déploiement d\'OCS Inventory NG sur Ubuntu Server pour la gestion de parc informatique. Installation du serveur OCS avec sa stack LAMP, configuration de l\'interface web d\'administration, puis import d\'une base de données complète simulant une infrastructure réelle : postes clients, logiciels installés, périphériques, systèmes d\'exploitation et matériels. Permet de visualiser et gérer l\'inventaire complet du parc depuis un tableau de bord centralisé.',
    'Contact': 'N\'hésitez pas à me contacter par email à alexismessager93@gmail.com ou via mes réseaux sociaux !'
  };
  
  body.textContent = projectDetails[type] || `Détails du projet : ${type}`;
}

function closeModal() {
  document.getElementById("modal").style.display = "none";
}

function closeModalOnBackground(event) {
  if (event.target.id === "modal") {
    closeModal();
  }
}

function scrollToSection(id) {
  document.getElementById(id).scrollIntoView({ behavior: "smooth" });
}

// Année footer
document.getElementById("year").textContent = new Date().getFullYear();
