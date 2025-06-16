// OPTIMIZACIÓN: Throttle del scroll para mejor rendimiento
let ticking = false;

function updateScrollElements() {
  const sIcon = document.querySelector('.s-icon');
  const scrollY = window.scrollY;

  // OPTIMIZACIÓN: Usar transform3d y calcular opacity más eficiente
  const translateY = scrollY * 0.8;
  const opacity = Math.max(0, 1 - scrollY / 1000);

  sIcon.style.transform = `translate3d(0, ${translateY}px, 0)`;
  sIcon.style.opacity = opacity;

  if (opacity <= 0) {
    sIcon.style.pointerEvents = 'none';
  } else {
    sIcon.style.pointerEvents = 'auto';
  }

  ticking = false;
}

window.addEventListener('scroll', function () {
  if (!ticking) {
    requestAnimationFrame(updateScrollElements);
    ticking = true;
  }
});

// OPTIMIZACIÓN: Intersection Observer más eficiente
const observerOptions = {
  threshold: [0.1],
  rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function (entries) {
  entries.forEach(entry => {
    if (entry.isIntersecting && entry.intersectionRatio >= 0.1) {
      entry.target.classList.add('animate');
    } else if (!entry.isIntersecting) {
      entry.target.classList.remove('animate');
    }
  });
}, observerOptions);

// OPTIMIZACIÓN: Usar DOMContentLoaded más eficiente
document.addEventListener('DOMContentLoaded', function () {
  const elementsToObserve = [
    '.text-contents',
    '.work',
    '.ideas',
    '.experience',
    '.services',
    '.footer',
    '.light'
  ];

  elementsToObserve.forEach(selector => {
    const element = document.querySelector(selector);
    if (element) observer.observe(element);
  });
});