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

// Form Submission with Google Forms integration
const contactForm = document.getElementById('contactForm');
const successPopup = document.getElementById('successPopup');

if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const submitBtn = contactForm.querySelector('button[type="submit"]');
        const originalBtnText = submitBtn.textContent;
        submitBtn.disabled = true;
        submitBtn.textContent = 'Sending...';

        const formData = new FormData(contactForm);
        
        fetch('https://docs.google.com/forms/u/0/d/e/1FAIpQLSf-3soKzQXst7myd76gVEH9ck8-sH1hwQfGw4UYfVmD0_rvKA/formResponse', {
            method: 'POST',
            body: formData,
            mode: 'no-cors'
        })
        .then(() => {
            // Show custom success popup
            if (successPopup) {
                successPopup.classList.add('active');
                
                // Auto close after 4 seconds
                setTimeout(() => {
                    successPopup.classList.remove('active');
                }, 4000);
            }
            contactForm.reset();
        })
        .catch((error) => {
            console.error('Error submitting form:', error);
            alert('Oops! Something went wrong. Please try again.');
        })
        .finally(() => {
            submitBtn.disabled = false;
            submitBtn.textContent = originalBtnText;
        });
    });
}

// Close success popup on close button click
const closePopupBtn = document.getElementById('closePopupBtn');
if (closePopupBtn) {
    closePopupBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        successPopup.classList.remove('active');
    });
}

// Close popup when clicking outside the box
if (successPopup) {
    successPopup.addEventListener('click', (e) => {
        if (e.target === successPopup) {
            successPopup.classList.remove('active');
        }
    });
}
