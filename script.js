// Update Footer Year
document.getElementById('year').textContent = new Date().getFullYear();

// Hamburger Menu Toggle
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');
const navLinksLi = document.querySelectorAll('.nav-links li');

hamburger.addEventListener('click', () => {
    // Toggle Nav
    navLinks.classList.toggle('nav-active');

    // Burger Animation
    hamburger.classList.toggle('toggle');
});

// Close menu when a link is clicked
navLinksLi.forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('nav-active');
        hamburger.classList.remove('toggle');
    });
});

// Intersection Observer for Scroll Animations
const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.15
};

const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('section-visible');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

const hiddenSections = document.querySelectorAll('.section-hidden');
hiddenSections.forEach(section => {
    observer.observe(section);
});

// Form Submission (Prevent Default)
const contactForm = document.getElementById('contactForm');
const successMsg = document.getElementById('successMsg');
const closeFormBtn = document.getElementById('closeFormBtn');

if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        contactForm.reset();
        successMsg.classList.remove('hidden');
    });
}

if (closeFormBtn) {
    closeFormBtn.addEventListener('click', () => {
        contactForm.reset();
        successMsg.classList.add('hidden');
    });
}
