document.addEventListener("DOMContentLoaded", () => {
  const slides = document.querySelectorAll(".slide");
  const dots = document.querySelectorAll(".dot");
  let currentSlide = 0;
  let slideInterval = setInterval(nextSlide, 5000);

  function showSlide(index) {
    slides.forEach((slide, i) => {
      slide.classList.remove("active");
      slide.pause();
      slide.currentTime = 0;
    });

    dots.forEach(dot => dot.classList.remove("active"));

    currentSlide = (index + slides.length) % slides.length;
    slides[currentSlide].classList.add("active");
    dots[currentSlide].classList.add("active");
    slides[currentSlide].play();
  }

  function nextSlide() {
    showSlide(currentSlide + 1);
  }

  function prevSlide() {
    showSlide(currentSlide - 1);
  }

  const slider = document.getElementById("imageSlider");
  slider.addEventListener("mouseenter", () => clearInterval(slideInterval));
  slider.addEventListener("mouseleave", () => {
    slideInterval = setInterval(nextSlide, 10000);
  });

  document.getElementById("nextBtn").addEventListener("click", () => {
    clearInterval(slideInterval);
    nextSlide();
    slideInterval = setInterval(nextSlide, 10000);
  });

  document.getElementById("prevBtn").addEventListener("click", () => {
    clearInterval(slideInterval);
    prevSlide();
    slideInterval = setInterval(nextSlide, 10000);
  });

  // Add click events to dots
  dots.forEach((dot, index) => {
    dot.addEventListener("click", () => {
      clearInterval(slideInterval);
      showSlide(index);
      slideInterval = setInterval(nextSlide, 10000);
    });
  });

  // Start the first video manually
  slides[currentSlide].play();
});
