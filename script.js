const header = document.getElementById("siteHeader");
const progress = document.getElementById("scrollProgress");
const menuToggle = document.getElementById("menuToggle");
const navigation = document.getElementById("siteNav");
const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
const revealItems = document.querySelectorAll(".reveal");
const curvePanel = document.querySelector(".curve-panel");
const toast = document.getElementById("toast");
let toastTimer;

function updateScrollUI() {
  const availableScroll = document.documentElement.scrollHeight - window.innerHeight;
  const scrolled = availableScroll > 0 ? (window.scrollY / availableScroll) * 100 : 0;

  progress.style.setProperty("--scroll-progress", scrolled + "%");
  header.classList.toggle("is-scrolled", window.scrollY > 16);
}

function setMenu(open) {
  menuToggle.setAttribute("aria-expanded", String(open));
  navigation.classList.toggle("is-open", open);
  document.body.classList.toggle("menu-open", open);
}

function showToast(message) {
  window.clearTimeout(toastTimer);
  toast.textContent = message;
  toast.classList.add("is-visible");
  toastTimer = window.setTimeout(function () {
    toast.classList.remove("is-visible");
  }, 4200);
}

window.addEventListener("scroll", updateScrollUI, { passive: true });
window.addEventListener("resize", updateScrollUI);
updateScrollUI();

menuToggle.addEventListener("click", function () {
  const isOpen = menuToggle.getAttribute("aria-expanded") === "true";
  setMenu(!isOpen);
});

navigation.querySelectorAll("a").forEach(function (link) {
  link.addEventListener("click", function () {
    setMenu(false);
  });
});

document.addEventListener("keydown", function (event) {
  if (event.key === "Escape") setMenu(false);
});

if (prefersReducedMotion.matches) {
  revealItems.forEach(function (item) {
    item.classList.add("is-visible");
  });
  if (curvePanel) curvePanel.classList.add("is-visible");
} else {
  const revealObserver = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;

        const delay = entry.target.dataset.delay;
        if (delay) entry.target.style.transitionDelay = delay + "ms";
        entry.target.classList.add("is-visible");
        revealObserver.unobserve(entry.target);
      });
    },
    { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
  );

  revealItems.forEach(function (item) {
    revealObserver.observe(item);
  });

  if (curvePanel) {
    const curveObserver = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            curvePanel.classList.add("is-visible");
            curveObserver.disconnect();
          }
        });
      },
      { threshold: 0.25 }
    );
    curveObserver.observe(curvePanel);
  }
}

const heroVisual = document.querySelector(".hero-visual");
if (heroVisual && !prefersReducedMotion.matches) {
  heroVisual.addEventListener("pointermove", function (event) {
    const box = heroVisual.getBoundingClientRect();
    const x = (event.clientX - box.left) / box.width - 0.5;
    const y = (event.clientY - box.top) / box.height - 0.5;
    heroVisual.style.setProperty("transform", "translate(" + x * 5 + "px, " + y * 4 + "px)");
  });

  heroVisual.addEventListener("pointerleave", function () {
    heroVisual.style.removeProperty("transform");
  });
}

document.querySelectorAll(".faq-list details").forEach(function (detail) {
  detail.addEventListener("toggle", function () {
    if (!detail.open) return;
    document.querySelectorAll(".faq-list details").forEach(function (other) {
      if (other !== detail) other.open = false;
    });
  });
});

document.getElementById("kickstarterForm").addEventListener("submit", function (event) {
  event.preventDefault();
  const email = document.getElementById("launchEmail");
  if (!email.checkValidity()) {
    email.reportValidity();
    return;
  }
  showToast("Thanks — this is a front-end demo. Connect this form to your email provider before launch.");
  email.value = "";
});

