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
    'Portfolio': 'Site web personnel moderne développé avec HTML, CSS et JavaScript. Utilise des animations fluides et un design responsive avec gradients dégradés et effets de réseau animés.',
    'Site de location': 'Plateforme de location de voiture en ligne. Système de réservation complet avec gestion des véhicules, calendrier de disponibilité et interface utilisateur intuitive. Développé avec HTML, CSS, JavaScript, PHP et SQL.',
    'Serveur de jeu': 'Mise en place d\'un serveur de jeu multi-joueurs (Minecraft) sur Ubuntu Server. Configuration réseau, allocation de ressources (RAM, CPU), gestion des connexions et optimisation des performances.',
    'Infrastructure réseau': 'Conception complète d\'une infrastructure réseau avec Cisco PacketTracer incluant VLANs, routage multi-protocoles (OSPF, BGP), ACLs de sécurité et hiérarchie réseau.',
    'WordPress Ubuntu': 'Installation et configuration complète de WordPress sur un serveur Ubuntu. Mise en place de la stack LAMP (Linux, Apache, MySQL, PHP), configuration des droits d\'accès, sécurisation via SSL/TLS et personnalisation du thème.',
    'GLPI': 'Déploiement de GLPI (Gestionnaire Libre de Parc Informatique) sur Ubuntu Server. Installation du serveur GLPI, configuration MySQL, déploiement des agents sur les postes clients pour l\'inventaire automatique du parc informatique.',
    'Fail2ban': 'Mise en place d\'un protocole de sécurité avec Fail2ban sur Ubuntu. Configuration des filtres pour protéger SSH, Apache et autres services, définition des règles de bannissement automatique et tests de validation du dispositif de défense.',
    'Proxmox': 'Configuration physique de deux serveurs Proxmox VE et mise en cluster haute disponibilité. Câblage réseau dédié, configuration du cluster Proxmox, gestion du stockage partagé (Ceph/NFS) et bascule automatique des VMs.',
    'OCS Inventory': 'Déploiement d\'OCS Inventory NG sur Ubuntu pour la gestion de parc informatique. Installation du serveur OCS avec stack LAMP, configuration web d\'administration, import d\'une base de données complète simulant une infrastructure réelle avec clients, logiciels, périphériques et matériels.',
    'Contact': 'N\'hésitez pas à me contacter par email à alexismessager93@gmail.com pour discuter de projets, opportunités de stage ou collaborations ! 📧'
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