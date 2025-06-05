// Mobile Menu Toggle
const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
const nav = document.querySelector('nav');

mobileMenuBtn.addEventListener('click', () => {
  nav.classList.toggle('active');
  mobileMenuBtn.setAttribute('aria-expanded', 
    mobileMenuBtn.getAttribute('aria-expanded') === 'true' ? 'false' : 'true'
  );
});

// Close mobile menu when clicking outside
document.addEventListener('click', (e) => {
  if (!nav.contains(e.target) && !mobileMenuBtn.contains(e.target)) {
    nav.classList.remove('active');
    mobileMenuBtn.setAttribute('aria-expanded', 'false');
  }
});

// Modal Functionality
const helpButton = document.querySelector('.help-button');
const helpModal = document.getElementById('help-modal');
const closeModal = document.querySelector('.close-modal');

helpButton.addEventListener('click', () => {
  helpModal.classList.add('active');
  document.body.style.overflow = 'hidden';
});

closeModal.addEventListener('click', () => {
  helpModal.classList.remove('active');
  document.body.style.overflow = '';
});

helpModal.addEventListener('click', (e) => {
  if (e.target === helpModal) {
    helpModal.classList.remove('active');
    document.body.style.overflow = '';
  }
});

// Form Validation and Submission
const contactForm = document.getElementById('contact-form');
const helpForm = document.getElementById('help-form');

function validateForm(form) {
  let isValid = true;
  const inputs = form.querySelectorAll('input, textarea');
  
  inputs.forEach(input => {
    const formGroup = input.parentElement;
    if (!input.value.trim()) {
      formGroup.classList.add('error');
      isValid = false;
    } else {
      formGroup.classList.remove('error');
    }
  });

  return isValid;
}

async function handleSubmit(form, e) {
  e.preventDefault();
  
  if (!validateForm(form)) return;

  const submitBtn = form.querySelector('button[type="submit"]');
  submitBtn.classList.add('loading');
  submitBtn.disabled = true;

  const formData = new FormData(form);
  
  try {
    const response = await fetch(window.location.href, {
      method: 'POST',
      body: formData
    });
    
    const result = await response.json();
    
    if (result.success) {
      const successMessage = form.querySelector('.success-message');
      if (successMessage) {
        successMessage.textContent = result.message;
        successMessage.style.display = 'block';
      }
      
      form.reset();
      
      // Close modal if it's a modal form
      const modal = form.closest('.modal');
      if (modal) {
        setTimeout(() => {
          modal.classList.remove('active');
          document.body.style.overflow = '';
        }, 1500);
      }
    } else {
      throw new Error(result.message);
    }
  } catch (error) {
    console.error('Error:', error);
    const errorMessage = form.querySelector('.error-message') || document.createElement('div');
    errorMessage.className = 'error-message';
    errorMessage.textContent = error.message || 'An error occurred. Please try again.';
    form.insertBefore(errorMessage, form.firstChild);
    
    setTimeout(() => {
      errorMessage.remove();
    }, 5000);
  } finally {
    submitBtn.classList.remove('loading');
    submitBtn.disabled = false;
  }
}

document.querySelectorAll('form').forEach(form => {
  form.addEventListener('submit', (e) => handleSubmit(form, e));
});

// Back to Top Button
const backToTop = document.querySelector('.back-to-top');

window.addEventListener('scroll', () => {
  if (window.pageYOffset > 300) {
    backToTop.classList.add('visible');
  } else {
    backToTop.classList.remove('visible');
  }
});

// Enhanced Scroll Animations
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, observerOptions);

document.querySelectorAll('.fade-in, .scale-in').forEach((el) => observer.observe(el));

// Smooth Scroll
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
      // Close mobile menu after clicking a link
      nav.classList.remove('active');
      mobileMenuBtn.setAttribute('aria-expanded', 'false');
    }
  });
});

// Donate and Join Modal Functionality
const donateBtn = document.getElementById('donate-btn');
const joinBtn = document.getElementById('join-btn');
const donateModal = document.getElementById('donate-modal');
const joinModal = document.getElementById('join-modal');

donateBtn.addEventListener('click', () => {
  donateModal.classList.add('active');
  document.body.style.overflow = 'hidden';
});

joinBtn.addEventListener('click', () => {
  joinModal.classList.add('active');
  document.body.style.overflow = 'hidden';
});

// Donation Amount Selection
const donationAmounts = document.querySelectorAll('.donation-amount');
const customAmount = document.getElementById('custom-amount');

donationAmounts.forEach(amount => {
  amount.addEventListener('click', () => {
    donationAmounts.forEach(a => a.classList.remove('selected'));
    amount.classList.add('selected');
    customAmount.value = '';
  });
});

customAmount.addEventListener('input', () => {
  donationAmounts.forEach(a => a.classList.remove('selected'));
});

// Payment Method Selection
const paymentMethods = document.querySelectorAll('.payment-method');
paymentMethods.forEach(method => {
  method.addEventListener('click', () => {
    paymentMethods.forEach(m => m.classList.remove('selected'));
    method.classList.add('selected');
  });
});

// Volunteer Interest Selection
const interestCheckboxes = document.querySelectorAll('.interest-checkbox');
interestCheckboxes.forEach(checkbox => {
  checkbox.addEventListener('click', () => {
    const input = checkbox.querySelector('input');
    input.checked = !input.checked;
    checkbox.classList.toggle('selected');
  });
});

// Form Submissions
const donateForm = document.getElementById('donate-form');
const joinForm = document.getElementById('join-form');

donateForm.addEventListener('submit', (e) => {
  e.preventDefault();
  if (validateForm(donateForm)) {
    const submitBtn = donateForm.querySelector('button[type="submit"]');
    submitBtn.classList.add('loading');
    
    setTimeout(() => {
      submitBtn.classList.remove('loading');
      donateForm.classList.add('success-animation');
      donateForm.reset();
      setTimeout(() => {
        donateModal.classList.remove('active');
        document.body.style.overflow = '';
        donateForm.classList.remove('success-animation');
      }, 1500);
    }, 1500);
  }
});

joinForm.addEventListener('submit', (e) => {
  e.preventDefault();
  if (validateForm(joinForm)) {
    const submitBtn = joinForm.querySelector('button[type="submit"]');
    submitBtn.classList.add('loading');
    
    setTimeout(() => {
      submitBtn.classList.remove('loading');
      joinForm.classList.add('success-animation');
      joinForm.reset();
      setTimeout(() => {
        joinModal.classList.remove('active');
        document.body.style.overflow = '';
        joinForm.classList.remove('success-animation');
      }, 1500);
    }, 1500);
  }
});

// Add CSRF token to all forms
document.querySelectorAll('form').forEach(form => {
    const csrfInput = document.createElement('input');
    csrfInput.type = 'hidden';
    csrfInput.name = 'csrf_token';
    csrfInput.value = document.querySelector('meta[name="csrf-token"]').content;
    form.appendChild(csrfInput);
});

// Add action field to all forms
document.querySelectorAll('form').forEach(form => {
    const actionInput = document.createElement('input');
    actionInput.type = 'hidden';
    actionInput.name = 'action';
    actionInput.value = form.id.replace('-form', '');
    form.appendChild(actionInput);
});

// Countdown Timer for Events
function updateCountdowns() {
    const events = document.querySelectorAll('.event-date');
    events.forEach(event => {
        const dateText = event.textContent;
        const eventDate = new Date(dateText.split(': ')[1]);
        const now = new Date();
        const diff = eventDate - now;

        if (diff > 0) {
            const days = Math.floor(diff / (1000 * 60 * 60 * 24));
            const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
            
            const countdownElement = event.nextElementSibling || document.createElement('p');
            countdownElement.className = 'countdown';
            countdownElement.textContent = `${days} days, ${hours} hours, ${minutes} minutes until event`;
            
            if (!event.nextElementSibling) {
                event.parentNode.appendChild(countdownElement);
            }
        }
    });
}

// Update countdowns every minute
setInterval(updateCountdowns, 60000);
updateCountdowns(); // Initial update

// Testimonial Slider
const testimonialSlider = document.querySelector('.testimonial-slider');
const slides = testimonialSlider.querySelectorAll('.testimonial-slide');
const prevBtn = testimonialSlider.querySelector('.prev-slide');
const nextBtn = testimonialSlider.querySelector('.next-slide');
const dotsContainer = testimonialSlider.querySelector('.slider-dots');
let currentSlide = 0;

// Create dots
slides.forEach((_, index) => {
    const dot = document.createElement('button');
    dot.className = 'slider-dot';
    dot.setAttribute('aria-label', `Go to testimonial ${index + 1}`);
    if (index === 0) dot.classList.add('active');
    dot.addEventListener('click', () => goToSlide(index));
    dotsContainer.appendChild(dot);
});

const dots = dotsContainer.querySelectorAll('.slider-dot');

function updateSlider() {
    slides.forEach((slide, index) => {
        slide.classList.toggle('active', index === currentSlide);
        dots[index].classList.toggle('active', index === currentSlide);
    });
}

function goToSlide(index) {
    currentSlide = index;
    updateSlider();
}

function nextSlide() {
    currentSlide = (currentSlide + 1) % slides.length;
    updateSlider();
}

function prevSlide() {
    currentSlide = (currentSlide - 1 + slides.length) % slides.length;
    updateSlider();
}

prevBtn.addEventListener('click', prevSlide);
nextBtn.addEventListener('click', nextSlide);

// Auto-advance slides every 5 seconds
let slideInterval = setInterval(nextSlide, 5000);

// Pause auto-advance when hovering over slider
testimonialSlider.addEventListener('mouseenter', () => {
    clearInterval(slideInterval);
});

testimonialSlider.addEventListener('mouseleave', () => {
    slideInterval = setInterval(nextSlide, 5000);
});

document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contact-form');
    const successMessage = document.querySelector('.success-message');

    if (contactForm) {
        contactForm.addEventListener('submit', async function(e) {
            e.preventDefault();

            const formData = {
                name: this.name.value,
                email: this.email.value,
                message: this.message.value
            };

            try {
                const response = await fetch('/.netlify/functions/contact', {
                    method: 'POST',
                    body: JSON.stringify(formData),
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });

                const data = await response.json();

                if (response.ok) {
                    successMessage.textContent = 'Message sent successfully!';
                    successMessage.style.color = 'green';
                    contactForm.reset();
                } else {
                    throw new Error(data.error || 'Something went wrong');
                }
            } catch (error) {
                successMessage.textContent = error.message;
                successMessage.style.color = 'red';
            }
        });
    }

    // Mobile menu toggle
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const nav = document.querySelector('nav');

    if (mobileMenuBtn && nav) {
        mobileMenuBtn.addEventListener('click', function() {
            nav.classList.toggle('active');
            this.setAttribute('aria-expanded', 
                this.getAttribute('aria-expanded') === 'false' ? 'true' : 'false'
            );
        });
    }

    // Smooth scroll for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });
}); 