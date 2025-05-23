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
let currentSlide = 0;

function showSlide(index) {
  slides.forEach((slide, i) => {
    slide.classList.toggle('active', i === index);
    dots[i].classList.toggle('active', i === index);
  });

  // Show text only on second slide (index 1)
  if (index === 1) {
    textOverlay.style.display = 'block';
  } else {
    textOverlay.style.display = 'none';
  }

  currentSlide = index;
}

document.getElementById('prevBtn').addEventListener('click', () => {
  showSlide((currentSlide - 1 + slides.length) % slides.length);
});

document.getElementById('nextBtn').addEventListener('click', () => {
  showSlide((currentSlide + 1) % slides.length);
});

dots.forEach((dot, index) => {
  dot.addEventListener('click', () => {
    showSlide(index);
  });
});

// Initial setup
showSlide(currentSlide);


