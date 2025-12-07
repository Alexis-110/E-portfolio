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
  
  // Contenu personnalisé selon le projet
  const projectDetails = {
    'Portfolio': 'Site web personnel moderne développé avec HTML, CSS et JavaScript. Utilise des animations fluides et un design responsive.',
    'Site de location': 'Plateforme de location de voiture en ligne. Système de réservation complet avec gestion des véhicules, calendrier de disponibilité et interface utilisateur intuitive. Développé avec HTML, CSS, JavaScript, PHP et SQL.',
    'Serveur de jeu': 'Mise en place d\'un serveur de jeu multi-joueurs sur Ubuntu Server. Configuration réseau et gestion des connexions.',
    'Infrastructure réseau': 'Conception complète d\'une infrastructure réseau avec Cisco PacketTracer. Includes VLANs, routage et sécurité.',
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