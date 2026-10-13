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

if (!header || !menuToggle || !searchToggle) {
  throw new Error("The header is missing a required mobile toggle button.");
}

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

const testimonialsList = document.querySelector(".testimonials-list");

if (testimonialsList) {
  const testimonialCards = testimonialsList.querySelectorAll(":scope > li");
  const testimonialStep =
    testimonialCards.length > 1
      ? testimonialCards[1].offsetLeft - testimonialCards[0].offsetLeft
      : testimonialCards[0]?.getBoundingClientRect().width ?? 0;

  document
    .querySelectorAll("[data-testimonial-scroll]")
    .forEach((button) => {
      button.addEventListener("click", () => {
        const direction = button.getAttribute("data-testimonial-scroll");
        testimonialsList.scrollBy({
          left: direction === "next" ? testimonialStep : -testimonialStep,
          behavior: "smooth",
        });
      });
    });
}
