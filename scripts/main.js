// OPTIMIZACIÓN: Throttle del scroll para mejor rendimiento
let ticking = false;
let isScrolling = false;

// Función para actualizar elementos con scroll
function updateScrollElements() {
  const sIcon = document.querySelector('.s-icon');
  const scrollY = window.scrollY;

  // OPTIMIZACIÓN: Usar transform3d y calcular opacity más eficiente
  const translateY = scrollY * 0.8;
  const opacity = Math.max(0, 1 - scrollY / 1000);

  if (sIcon) {
    sIcon.style.transform = `translate3d(0, ${translateY}px, 0)`;
    sIcon.style.opacity = opacity;

    if (opacity <= 0) {
      sIcon.style.pointerEvents = 'none';
    } else {
      sIcon.style.pointerEvents = 'auto';
    }
  }

  // Efecto parallax para el header
  const header = document.querySelector('.header');
  if (header) {
    const headerTranslate = scrollY * 0.5;
    header.style.transform = `translate3d(0, ${headerTranslate}px, 0)`;
  }

  ticking = false;
}

// Función para manejar el scroll con throttling
function handleScroll() {
  isScrolling = true;
  
  if (!ticking) {
    requestAnimationFrame(updateScrollElements);
    ticking = true;
  }

  // Clear scrolling flag después de un tiempo
  clearTimeout(window.scrollTimer);
  window.scrollTimer = setTimeout(() => {
    isScrolling = false;
  }, 150);
}

// Event listener para scroll optimizado
window.addEventListener('scroll', handleScroll, { passive: true });

// ANIMACIONES CON INTERSECTION OBSERVER - REPETIBLES
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
};

// Observer principal - FUNCIONA CADA VEZ
const mainObserver = new IntersectionObserver(function (entries) {
  entries.forEach(entry => {
    const target = entry.target;
    
    if (entry.isIntersecting) {
      // Elemento entra - animar
      target.classList.add('animate');
      
      // Animaciones específicas por sección
      if (target.classList.contains('services')) {
        animateServiceBoxes(target);
      }
      
      if (target.classList.contains('experience')) {
        animateExperienceCards(target);
      }
      
      if (target.classList.contains('work')) {
        animateWorkItems(target);
      }
      
      if (target.classList.contains('contact-section')) {
        animateContactSection(target);
      }
      
    } else {
      // Elemento sale - quitar animación
      target.classList.remove('animate');
    }
  });
}, observerOptions);

// FUNCIONES DE ANIMACIÓN ESPECÍFICAS
function animateServiceBoxes(servicesSection) {
  const serviceBoxes = servicesSection.querySelectorAll('.service-box');
  
  serviceBoxes.forEach((box, index) => {
    setTimeout(() => {
      box.style.opacity = '1';
      box.style.transform = 'translate3d(0, 0, 0)';
      box.classList.add('animate-in');
    }, index * 150);
  });
}

function animateExperienceCards(experienceSection) {
  const cards = experienceSection.querySelectorAll('.experience-card');
  
  cards.forEach((card, index) => {
    setTimeout(() => {
      card.style.opacity = '1';
      card.style.transform = 'translate3d(0, 0, 0)';
      card.classList.add('pulse-animation');
    }, index * 200);
  });
}

function animateWorkItems(workSection) {
  const workItems = workSection.querySelectorAll('.work-item');
  
  workItems.forEach((item, index) => {
    setTimeout(() => {
      item.style.opacity = '1';
      item.style.transform = 'translate3d(0, 0, 0) scale(1)';
      item.classList.add('work-animate');
    }, index * 100);
  });
}

function animateContactSection(contactSection) {
  const contactBox = contactSection.querySelector('.contact-box');
  const contactInfo = contactSection.querySelector('.contact-info');
  
  if (contactBox) {
    setTimeout(() => {
      contactBox.style.opacity = '1';
      contactBox.style.transform = 'translate3d(0, 0, 0)';
    }, 200);
  }
  
  if (contactInfo) {
    setTimeout(() => {
      contactInfo.style.opacity = '1';
      contactInfo.style.transform = 'translate3d(0, 0, 0)';
    }, 400);
  }
}

// ANIMACIÓN ESPECIAL PARA IDEAS SECTION
function animateIdeasSection() {
  const ideasSection = document.querySelector('.ideas');
  const h2 = ideasSection?.querySelector('h2');
  const lightSpan = ideasSection?.querySelector('.light');
  
  if (ideasSection && h2 && lightSpan) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            h2.style.opacity = '1';
            h2.style.transform = 'translate3d(0, 0, 0)';
            h2.classList.add('animate');
          }, 100);
          
          setTimeout(() => {
            lightSpan.style.opacity = '1';
            lightSpan.style.transform = 'translate3d(0, 0, 0)';
            lightSpan.classList.add('animate');
          }, 300);
        } else {
          // Resetear cuando sale
          h2.classList.remove('animate');
          lightSpan.classList.remove('animate');
        }
      });
    }, {
      threshold: 0.3
    });
    
    observer.observe(ideasSection);
  }
}

// EFECTOS HOVER MEJORADOS
function addHoverEffects() {
  // Hover para service boxes
  const serviceBoxes = document.querySelectorAll('.service-box');
  serviceBoxes.forEach(box => {
    box.addEventListener('mouseenter', function() {
      this.style.transform = 'translate3d(0, -5px, 0) scale(1.02)';
      this.style.boxShadow = '0 20px 40px rgba(255, 81, 47, 0.01)';
    });
    
    box.addEventListener('mouseleave', function() {
      this.style.transform = 'translate3d(0, 0, 0) scale(1)';
      this.style.boxShadow = '0 8px 24px rgba(0, 0, 0, 0.25)';
    });
  });

  // Hover para work items
  const workItems = document.querySelectorAll('.work-item');
  workItems.forEach(item => {
    item.addEventListener('mouseenter', function() {
      this.style.transform = 'translate3d(0, 0, 0) scale(1.08)';
      this.style.boxShadow = '0 15px 30px rgba(0, 0, 0, 0.4)';
    });
    
    item.addEventListener('mouseleave', function() {
      this.style.transform = 'translate3d(0, 0, 0) scale(1)';
      this.style.boxShadow = '0 4px 10px rgba(0, 0, 0, 0.2)';
    });
  });

  // Hover para experience cards
  const experienceCards = document.querySelectorAll('.experience-card');
  experienceCards.forEach(card => {
    card.addEventListener('mouseenter', function() {
      this.style.transform = 'translate3d(0, -15px, 0) scale(1.05)';
      this.style.boxShadow = '0 20px 40px rgba(123, 15, 213, 0.3)';
    });
    
    card.addEventListener('mouseleave', function() {
      this.style.transform = 'translate3d(0, 0, 0) scale(1)';
      this.style.boxShadow = 'none';
    });
  });
}

// ANIMACIÓN DE NÚMEROS CONTADOR - REPETIBLE
function animateCounters() {
  const counters = document.querySelectorAll('.experience-number');
  
  counters.forEach(counter => {
    const target = parseInt(counter.textContent.replace(/\D/g, ''));
    const suffix = counter.textContent.replace(/\d/g, '');
    
    const counterObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          let current = 0;
          const increment = target / 50;
          
          const updateCounter = () => {
            if (current < target) {
              current += increment;
              counter.textContent = Math.ceil(current) + suffix;
              requestAnimationFrame(updateCounter);
            } else {
              counter.textContent = target + suffix;
            }
          };
          
          updateCounter();
        } else {
          // Resetear cuando sale
          counter.textContent = '0' + suffix;
        }
      });
    }, { threshold: 0.7 });
    
    counterObserver.observe(counter);
  });
}

// INICIALIZACIÓN CUANDO EL DOM ESTÁ LISTO
document.addEventListener('DOMContentLoaded', function () {
  // Elementos principales para observar
  const elementsToObserve = [
    '.text-contents',
    '.work',
    '.ideas',
    '.experience',
    '.services',
    '.footer',
    '.contact-section'
  ];

  // Observar elementos principales
  elementsToObserve.forEach(selector => {
    const element = document.querySelector(selector);
    if (element) {
      mainObserver.observe(element);
    }
  });

  // Inicializar animaciones especiales
  animateIdeasSection();
  addHoverEffects();
  animateCounters();

  // Smooth scroll para enlaces internos
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });
});

// PERFORMANCE: Limpiar observers cuando no se necesiten
window.addEventListener('beforeunload', function() {
  mainObserver.disconnect();
});

// UTILIDAD: Función para reiniciar animaciones
function resetAnimations() {
  const animatedElements = document.querySelectorAll('.animate, .animate-in, .pulse-animation, .work-animate');
  animatedElements.forEach(element => {
    element.classList.remove('animate', 'animate-in', 'pulse-animation', 'work-animate');
  });
}