// Smooth reveal on scroll
const revealElements = document.querySelectorAll(
  ".program-card, .project-card, .phase, .skill-box, .training-card, .video-section, figure, .about-card, .dashboard-section, .lux-break"
);

const revealOnScroll = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("show");
      }
    });
  },
  { threshold: 0.15 }
);

revealElements.forEach((element) => {
  element.classList.add("hidden");
  revealOnScroll.observe(element);
});

// Update footer year
const year = document.querySelector("#year");

if (year) {
  year.textContent = new Date().getFullYear();
}

// Premium image modal
const imgModal = document.getElementById("imgModal");
const modalImg = document.getElementById("modalImg");
const closeImgBtn = document.querySelector("#imgModal .close-modal");

document.querySelectorAll(".clickable-img").forEach((img) => {
  img.addEventListener("click", () => {
    imgModal.style.display = "flex";
    modalImg.src = img.src;
    modalImg.alt = img.alt || "Expanded portfolio image";
    document.body.style.overflow = "hidden";
  });
});

function closeImageModal() {
  imgModal.style.display = "none";
  modalImg.src = "";
  document.body.style.overflow = "";
}

if (closeImgBtn) {
  closeImgBtn.addEventListener("click", closeImageModal);
}

if (imgModal) {
  imgModal.addEventListener("click", (e) => {
    if (e.target === imgModal) {
      closeImageModal();
    }
  });
}

document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && imgModal.style.display === "flex") {
    closeImageModal();
  }
});

// Video modal
function openVideo(videoId) {
  const modal = document.getElementById("videoModal");
  const frame = document.getElementById("videoFrame");

  frame.src = `https://www.youtube.com/embed/${videoId}?autoplay=1`;
  modal.style.display = "flex";
  document.body.style.overflow = "hidden";
}

function closeVideo() {
  const modal = document.getElementById("videoModal");
  const frame = document.getElementById("videoFrame");

  frame.src = "";
  modal.style.display = "none";
  document.body.style.overflow = "";
}

// Close video modal when clicking outside
const videoModal = document.getElementById("videoModal");

if (videoModal) {
  videoModal.addEventListener("click", (e) => {
    if (e.target === videoModal) {
      closeVideo();
    }
  });
}

document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && videoModal && videoModal.style.display === "flex") {
    closeVideo();
  }
});

// Active nav highlighting
const sections = document.querySelectorAll("section[id], footer[id]");
const navLinks = document.querySelectorAll(".nav-links a");

function updateActiveNav() {
  let currentSection = "";

  sections.forEach((section) => {
    const sectionTop = section.offsetTop - 140;
    const sectionHeight = section.offsetHeight;

    if (
      window.scrollY >= sectionTop &&
      window.scrollY < sectionTop + sectionHeight
    ) {
      currentSection = section.getAttribute("id");
    }
  });

  navLinks.forEach((link) => {
    link.classList.remove("active");

    if (link.getAttribute("href") === `#${currentSection}`) {
      link.classList.add("active");
    }
  });
}

window.addEventListener("scroll", updateActiveNav);
window.addEventListener("load", updateActiveNav);
