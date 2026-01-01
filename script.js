// Dark Mode Toggle Functionality
const themeToggle = document.getElementById('theme-toggle');
const body = document.body;

// Check for saved theme preference or default to light mode
const currentTheme = localStorage.getItem('theme') || 'light';
if (currentTheme === 'dark') {
    body.classList.add('dark-mode');
    themeToggle.textContent = '☀️';
}

themeToggle.addEventListener('click', () => {
    body.classList.toggle('dark-mode');

    // Update button icon and save preference
    if (body.classList.contains('dark-mode')) {
        themeToggle.textContent = '☀️';
        localStorage.setItem('theme', 'dark');
    } else {
        themeToggle.textContent = '🌙';
        localStorage.setItem('theme', 'light');
    }
});

// Scroll Reveal Animation
const revealElements = document.querySelectorAll('.about, .projects, .skills, .contact, .experience, .certifications');

const revealOnScroll = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
        }
    });
}, {
    threshold: 0.1
});

revealElements.forEach(el => revealOnScroll.observe(el));

// Timeline Animation
const timelineItems = document.querySelectorAll('.timeline-item');

const animateTimeline = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
            setTimeout(() => {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }, index * 300); // Stagger animation
        }
    });
}, {
    threshold: 0.1
});

timelineItems.forEach(item => {
    item.style.opacity = '0';
    item.style.transform = 'translateY(50px)';
    item.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
    animateTimeline.observe(item);
});

// Scroll animations for skill cards
const skillCards = document.querySelectorAll('.skill-card');

const animateSkillCards = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
            setTimeout(() => {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }, index * 200); // Stagger animation
        }
    });
}, {
    threshold: 0.1
});

skillCards.forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(30px)';
    card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    animateSkillCards.observe(card);
});

// Smooth Scroll for Navigation Links
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

// Navigation Shadow on Scroll
const header = document.querySelector('header');

window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});

// Contact Form Validation and Submission Handler
const contactForm = document.getElementById('contact-form');
const successMessage = document.getElementById('success-message');

if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();

        // Get form values
        const name = document.getElementById('name').value.trim();
        const email = document.getElementById('email').value.trim();
        const message = document.getElementById('message').value.trim();

        // Validation
        let isValid = true;
        let errors = [];

        if (!name) {
            errors.push('Name is required');
            isValid = false;
        }

        if (!email) {
            errors.push('Email is required');
            isValid = false;
        } else if (!isValidEmail(email)) {
            errors.push('Please enter a valid email address');
            isValid = false;
        }

        if (!message) {
            errors.push('Message is required');
            isValid = false;
        }

        if (!isValid) {
            alert('Please fix the following errors:\n' + errors.join('\n'));
            return;
        }

        // For demo purposes, just log the data
        console.log('Form submitted:', { name, email, message });

        // Show success message with animation
        successMessage.style.display = 'block';
        successMessage.style.animation = 'slideIn 0.5s ease-out';

        // Hide success message after 5 seconds
        setTimeout(() => {
            successMessage.style.animation = 'slideOut 0.5s ease-out';
            setTimeout(() => {
                successMessage.style.display = 'none';
            }, 500);
        }, 5000);

        // Reset the form
        this.reset();
    });
}

// Email validation helper
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Progress Bar Animation on Scroll
const progressBars = document.querySelectorAll('.progress');

const animateProgressBars = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const progress = entry.target;
            const width = progress.getAttribute('data-width');
            progress.style.width = width;
        }
    });
}, {
    threshold: 0.5
});

progressBars.forEach(bar => animateProgressBars.observe(bar));

// Modal functionality for certificate
function initModal() {
    const modal = document.getElementById('cert-modal');
    const closeBtn = document.querySelector('.close-modal');

    if (closeBtn) {
        // Close modal when clicking the close button
        closeBtn.addEventListener('click', () => {
            modal.style.display = 'none';
        });
    }

    // Close modal when clicking outside the modal content
    window.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.style.display = 'none';
        }
    });

    // Close modal on Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.style.display === 'block') {
            modal.style.display = 'none';
        }
    });
}

// Function to open modal (called from HTML onclick)
function openModal() {
    const modal = document.getElementById('cert-modal');
    if (modal) {
        modal.style.display = 'block';
    }
}

// Function to close modal (called from HTML onclick)
function closeModal() {
    const modal = document.getElementById('cert-modal');
    if (modal) {
        modal.style.display = 'none';
    }
}

// Initialize modal when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    initModal();
});
