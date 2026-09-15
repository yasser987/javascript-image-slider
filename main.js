const slider = document.querySelector(".slider");
const slides = [...document.querySelectorAll(".slide")];
const counter = document.querySelector(".slide-counter");
const indicators = document.querySelector(".indicators");
const previousButton = document.querySelector(".previous");
const nextButton = document.querySelector(".next");

let currentSlide = 0;

function createIndicators() {
  indicators.replaceChildren(
    ...slides.map((_, index) => {
      const button = document.createElement("button");
      button.type = "button";
      button.className = "indicator";
      button.dataset.index = index;
      button.textContent = index + 1;
      button.setAttribute("aria-label", `Go to slide ${index + 1}`);
      return button;
    })
  );
}

function render() {
  slides.forEach((slide, index) => {
    const active = index === currentSlide;
    slide.classList.toggle("slide--active", active);
    slide.setAttribute("aria-hidden", String(!active));
  });
  [...indicators.children].forEach((indicator, index) => {
    const active = index === currentSlide;
    indicator.classList.toggle("indicator--active", active);
    indicator.setAttribute("aria-current", active ? "true" : "false");
  });
  counter.textContent = `${currentSlide + 1} / ${slides.length}`;
  previousButton.disabled = currentSlide === 0;
  nextButton.disabled = currentSlide === slides.length - 1;
}

function showSlide(index) {
  if (index < 0 || index >= slides.length) return;
  currentSlide = index;
  render();
}

previousButton.addEventListener("click", () => showSlide(currentSlide - 1));
nextButton.addEventListener("click", () => showSlide(currentSlide + 1));
indicators.addEventListener("click", (event) => {
  const indicator = event.target.closest(".indicator");
  if (indicator) showSlide(Number(indicator.dataset.index));
});
slider.addEventListener("keydown", (event) => {
  if (event.key === "ArrowLeft") showSlide(currentSlide - 1);
  if (event.key === "ArrowRight") showSlide(currentSlide + 1);
  if (event.key === "Home") showSlide(0);
  if (event.key === "End") showSlide(slides.length - 1);
});

createIndicators();
render();