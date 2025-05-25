// Navbar JS for controoling visibility on scroll

let lastScrollTop = 0;
let navbar = document.querySelector('.navbar');
let scrollTimeout;

window.addEventListener('scroll', () => {
  clearTimeout(scrollTimeout);

  let scrollTop = window.pageYOffset || document.documentElement.scrollTop;

  if (scrollTop > lastScrollTop) {
    // Scrolling down
    navbar.style.top = '-70px'; // Adjust to match your navbar's height
  } else {
    // Scrolling up
    navbar.style.top = '0';
  }

  lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;

  // Reappear after scrolling stops
  scrollTimeout = setTimeout(() => {
    navbar.style.top = '0';
  }, 150);
});



// Image-Slider text

const slides = document.querySelectorAll('.slide');
const dots = document.querySelectorAll('.dot');
const textOverlay = document.querySelector('.slide-two .video-text');
const sliderContainer = document.querySelector('.image-slider');
let currentSlide = 0;

function showSlide(index) {
  slides.forEach((slide, i) => {
    slide.classList.toggle('active', i === index);
    dots[i].classList.toggle('active', i === index);
  });

  if (index === 1) {
    textOverlay.style.display = 'block';
    sliderContainer.classList.add('second-slide');
    sliderContainer.classList.remove('first-slide');
  } else {
    textOverlay.style.display = 'none';
    sliderContainer.classList.add('first-slide');
    sliderContainer.classList.remove('second-slide');
  }

  currentSlide = index;
}

// Manual controls
document.getElementById('prevBtn').addEventListener('click', () => {
  showSlide((currentSlide - 1 + slides.length) % slides.length);
  resetAutoSlide();
});

document.getElementById('nextBtn').addEventListener('click', () => {
  showSlide((currentSlide + 1) % slides.length);
  resetAutoSlide();
});

dots.forEach((dot, index) => {
  dot.addEventListener('click', () => {
    showSlide(index);
    resetAutoSlide();
  });
});

// Initial setup: Add class for first slide at start
sliderContainer.classList.add('first-slide');
showSlide(currentSlide);

// Auto-slide every 10 seconds
let autoSlideInterval = setInterval(() => {
  showSlide((currentSlide + 1) % slides.length);
}, 10000);

function resetAutoSlide() {
  clearInterval(autoSlideInterval);
  autoSlideInterval = setInterval(() => {
    showSlide((currentSlide + 1) % slides.length);
  }, 10000);
}
