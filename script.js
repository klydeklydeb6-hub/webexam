// ===================================
// SECTION DISPLAY CONTROL SCRIPT
// ===================================
document.addEventListener("DOMContentLoaded", () => {
  const navLinks = document.querySelectorAll("nav a, .hero-buttons a");
  const sections = document.querySelectorAll(".section");
  const yearEl = document.getElementById("year");

  // Function to show target section
  function showSection(id) {
    sections.forEach(sec => sec.classList.remove("active"));
    const targetSection = document.querySelector(id);
    if (targetSection) {
      targetSection.classList.add("active");
      window.scrollTo({ top: 0, behavior: "smooth" });
    }

    // Update nav highlight
    navLinks.forEach(l => l.classList.remove("active"));
    const headerLink = document.querySelector(`nav a[href="${id}"]`);
    if (headerLink) headerLink.classList.add("active");
  }

  // Event listeners for nav & buttons
  navLinks.forEach(link => {
    link.addEventListener("click", (e) => {
      const href = link.getAttribute("href");
      if (href && href.startsWith("#")) {
        e.preventDefault();
        showSection(href);
      }
    });
  });

  // Initialize footer year
  if (yearEl) yearEl.textContent = new Date().getFullYear();
});

// ===================================
// THEME TOGGLE (Dark / Light Mode)
// ===================================
const toggle = document.getElementById("theme-toggle");
if (toggle) {
  toggle.addEventListener("click", () => {
    document.documentElement.classList.toggle("light");
  });
}
