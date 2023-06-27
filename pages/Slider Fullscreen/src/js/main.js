const slides = document.querySelectorAll('.slide');
const prevBtn = document.querySelector('#prev-slide');
const nextBtn = document.querySelector('#next-slide');
let slideIndex = 0;
let intervalId;

// Set initial slide position
slides[slideIndex].classList.add('active');

// Autoplay function
function autoplay() {
  slides[slideIndex].classList.remove('active');
  slideIndex++;
  if (slideIndex >= slides.length) {
    slideIndex = 0;
  }
  slides[slideIndex].classList.add('active');
}

// Set autoplay interval
intervalId = setInterval(autoplay, 5000);

// Stop autoplay on prev/next button click
prevBtn.addEventListener('click', () => {
  clearInterval(intervalId);
  slides[slideIndex].classList.remove('active');
  slideIndex--;
  if (slideIndex < 0) {
    slideIndex = slides.length - 1;
  }
  slides[slideIndex].classList.add('active');
  intervalId = setInterval(autoplay, 5000);
});

nextBtn.addEventListener('click', () => {
  clearInterval(intervalId);
  slides[slideIndex].classList.remove('active');
  slideIndex++;
  if (slideIndex >= slides.length) {
    slideIndex = 0;
  }
  slides[slideIndex].classList.add('active');
  intervalId = setInterval(autoplay, 5000);
});
