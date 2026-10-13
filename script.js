const yearEl = document.querySelector(".year");
if (yearEl) yearEl.textContent = String(new Date().getFullYear());

const header = document.querySelector(".header");
const menuToggle = document.querySelector(".btn-mobile-nav");
const searchToggle = document.querySelector(".search-toggle");
const searchInput = document.querySelector("#site-search .search-input");
const promoBar = document.querySelector(".promo-bar");
const promoClose = document.querySelector(".promo-close");

if (promoBar && promoClose) {
  promoClose.addEventListener("click", () => {
    promoBar.hidden = true;
    document.body.classList.add("promo-dismissed");
  });
}

if (header && menuToggle && searchToggle) {
  function closeMenuAndSearch() {
    header.classList.remove("nav-open", "search-open");
    menuToggle.setAttribute("aria-expanded", "false");
    searchToggle.setAttribute("aria-expanded", "false");
  }

  menuToggle.addEventListener("click", () => {
    const opening = !header.classList.contains("nav-open");

    header.classList.toggle("nav-open", opening);
    header.classList.remove("search-open");
    menuToggle.setAttribute("aria-expanded", String(opening));
    searchToggle.setAttribute("aria-expanded", "false");
  });

  searchToggle.addEventListener("click", () => {
    const opening = !header.classList.contains("search-open");

    header.classList.toggle("search-open", opening);
    header.classList.remove("nav-open");
    searchToggle.setAttribute("aria-expanded", String(opening));
    menuToggle.setAttribute("aria-expanded", "false");

    if (opening) searchInput?.focus();
  });

  header.querySelector(".main-nav-list")?.addEventListener("click", (event) => {
    if (event.target instanceof Element && event.target.closest("a")) {
      closeMenuAndSearch();
    }
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") closeMenuAndSearch();
  });

  window
    .matchMedia("(min-width: 59.01em)")
    .addEventListener("change", closeMenuAndSearch);
}

const productsMobileLayout = window.matchMedia("(max-width: 48em)");

document.querySelectorAll(".btn-products").forEach((button) => {
  const section = button.closest(".arrivals-section, .selling-section");

  if (!section) {
    throw new Error(
      "A product button is missing its arrivals or selling section.",
    );
  }

  button.addEventListener("click", () => {
    if (!productsMobileLayout.matches) return;

    const expanded = section.classList.toggle("products-expanded");
    button.setAttribute("aria-expanded", String(expanded));
    button.textContent = expanded ? "View less" : "View all";
  });
});

const testimonialsList = document.querySelector(".testimonials-list");

if (testimonialsList) {
  const testimonialCards = testimonialsList.querySelectorAll(":scope > li");
  const testimonialStep =
    testimonialCards.length > 1
      ? testimonialCards[1].offsetLeft - testimonialCards[0].offsetLeft
      : (testimonialCards[0]?.getBoundingClientRect().width ?? 0);

  document.querySelectorAll("[data-testimonial-scroll]").forEach((button) => {
    button.addEventListener("click", () => {
      const direction = button.getAttribute("data-testimonial-scroll");
      testimonialsList.scrollBy({
        left: direction === "next" ? testimonialStep : -testimonialStep,
        behavior: "smooth",
      });
    });
  });
}

// //////////Sign-up ////////////////////

const form = document.getElementById("signup-form");
const signup = document.getElementById("signup");
const success = document.getElementById("success");
const nameInput = document.getElementById("name");
const welcomeName = document.getElementById("welcome-name");
const againButton = document.getElementById("again");

if (form || signup || success || nameInput || welcomeName || againButton) {
  if (
    !(form instanceof HTMLFormElement) ||
    !(signup instanceof HTMLElement) ||
    !(success instanceof HTMLElement) ||
    !(nameInput instanceof HTMLInputElement) ||
    !(welcomeName instanceof HTMLElement) ||
    !(againButton instanceof HTMLButtonElement)
  ) {
    throw new Error("The sign-up page is missing a required form element.");
  }

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    if (!form.reportValidity()) return;
    welcomeName.textContent =
      nameInput.value.trim().split(/\s+/)[0] || "friend";
    signup.hidden = true;
    success.hidden = false;
    success.classList.add("visible");
  });

  againButton.addEventListener("click", () => {
    success.classList.remove("visible");
    success.hidden = true;
    signup.hidden = false;
    form.reset();
    nameInput.focus();
  });
}
