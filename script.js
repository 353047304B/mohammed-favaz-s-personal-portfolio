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

// Form Submission
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const formData = new FormData(contactForm);
        
        // Submit the form data asynchronously
        fetch(contactForm.action, {
            method: 'POST',
            body: formData,
            mode: 'no-cors'
        }).then(() => {
            alert('Thank you for reaching out! Your message has been received.');
            contactForm.reset();
        }).catch((error) => {
            alert('There was an error sending your message. Please try again.');
            console.error('Error!', error.message);
        });
    });
}
