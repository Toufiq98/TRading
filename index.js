// Initialize Lucide Icons
lucide.createIcons();

// --- JavaScript for Interactivity ---

document.addEventListener("DOMContentLoaded", function () {
  // Set current year in footer
  document.getElementById("year").textContent = new Date().getFullYear();

  // --- Navbar Scroll Effect ---
  const navbar = document.getElementById("navbar");
  window.addEventListener("scroll", () => {
    if (window.scrollY > 50) {
      navbar.classList.add("bg-white", "shadow-md");
    } else {
      navbar.classList.remove("bg-white", "shadow-md");
    }
  });

  // --- Mobile Menu Toggle ---
  const mobileMenuButton = document.getElementById("mobile-menu-button");
  const mobileMenu = document.getElementById("mobile-menu");
  mobileMenuButton.addEventListener("click", () => {
    mobileMenu.classList.toggle("hidden");
  });

  // Close mobile menu when a link is clicked
  mobileMenu.addEventListener("click", (e) => {
    if (e.target.tagName === "A") {
      mobileMenu.classList.add("hidden");
    }
  });

  // --- Scroll Reveal & Animation ---
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");

          // FIX: Find the counter element INSIDE the revealed element
          const counter = entry.target.querySelector("[data-target]");
          if (counter) {
            animateCounter(counter);
          }

          // Animate chart bars within the revealed section
          const sectionBars = entry.target.querySelectorAll(
            ".chart-bar[data-width]"
          );
          sectionBars.forEach((bar) => {
            bar.style.width = bar.dataset.width;
          });

          // We only want to trigger these animations once.
          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.15,
      rootMargin: "0px 0px -50px 0px",
    }
  );

  document.querySelectorAll(".reveal").forEach((el) => {
    observer.observe(el);
  });

  
  

  function animateCounter(el) {
    const target = +el.getAttribute("data-target");
    // Prevent re-animation
    if (el.dataset.animated) {
      return;
    }
    el.dataset.animated = "true";

    let current = 0;
    // Calculate increment to last approx. 1.5 seconds
    const duration = 1500;
    const stepTime = 1000 / 60; // 60fps
    const totalSteps = duration / stepTime;
    const increment = target / totalSteps;

    const updateCounter = () => {
      if (current < target) {
        current += increment;
        el.innerText = Math.ceil(current).toLocaleString();
        requestAnimationFrame(updateCounter);
      } else {
        el.innerText = target.toLocaleString();
      }
    };
    requestAnimationFrame(updateCounter);
  }
});
