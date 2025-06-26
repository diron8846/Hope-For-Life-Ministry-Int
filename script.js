// Hope for Life Ministry JavaScript

// Initialize Lucide icons
document.addEventListener('DOMContentLoaded', function() {
    lucide.createIcons();
    
    // Initialize theme
    initializeTheme();
    
    // Initialize scroll effects
    initializeScrollEffects();
    
    // Initialize forms
    initializeForms();
    
    // Initialize mobile menu
    initializeMobileMenu();
});

// Theme Management
function initializeTheme() {
    const savedTheme = localStorage.getItem('theme') || 'light';
    document.documentElement.classList.toggle('dark', savedTheme === 'dark');
    updateThemeIcon(savedTheme);
}

function toggleTheme() {
    const isDark = document.documentElement.classList.contains('dark');
    const newTheme = isDark ? 'light' : 'dark';
    
    document.documentElement.classList.toggle('dark', newTheme === 'dark');
    localStorage.setItem('theme', newTheme);
    updateThemeIcon(newTheme);
}

function updateThemeIcon(theme) {
    const themeIcon = document.querySelector('.theme-icon');
    if (themeIcon) {
        themeIcon.setAttribute('data-lucide', theme === 'dark' ? 'sun' : 'moon');
        lucide.createIcons();
    }
}

// Smooth Scrolling
function scrollToSection(sectionId) {
    const element = document.getElementById(sectionId);
    if (element) {
        const navHeight = document.querySelector('.navbar').offsetHeight;
        const elementPosition = element.offsetTop - navHeight;
        
        window.scrollTo({
            top: elementPosition,
            behavior: 'smooth'
        });
    }
}

// Scroll Effects
function initializeScrollEffects() {
    // Navbar scroll effect
    window.addEventListener('scroll', function() {
        const navbar = document.querySelector('.navbar');
        if (window.scrollY > 100) {
            navbar.style.background = document.documentElement.classList.contains('dark') 
                ? 'rgba(31, 41, 55, 0.98)' 
                : 'rgba(255, 255, 255, 0.98)';
        } else {
            navbar.style.background = document.documentElement.classList.contains('dark') 
                ? 'rgba(31, 41, 55, 0.95)' 
                : 'rgba(255, 255, 255, 0.95)';
        }
    });

    // Reveal animations
    const revealElements = document.querySelectorAll('.reveal');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, { threshold: 0.1 });

    revealElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
}

// Mobile Menu
function initializeMobileMenu() {
    // Mobile menu will be implemented if needed
}

function toggleMobileMenu() {
    const navMenu = document.getElementById('nav-menu');
    const mobileIcon = document.querySelector('.mobile-icon');
    
    if (navMenu.style.display === 'flex') {
        navMenu.style.display = 'none';
        mobileIcon.setAttribute('data-lucide', 'menu');
    } else {
        navMenu.style.display = 'flex';
        navMenu.style.flexDirection = 'column';
        navMenu.style.position = 'absolute';
        navMenu.style.top = '100%';
        navMenu.style.left = '0';
        navMenu.style.right = '0';
        navMenu.style.background = document.documentElement.classList.contains('dark') 
            ? 'rgba(31, 41, 55, 0.98)' 
            : 'rgba(255, 255, 255, 0.98)';
        navMenu.style.padding = '1rem';
        navMenu.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.1)';
        mobileIcon.setAttribute('data-lucide', 'x');
    }
    
    lucide.createIcons();
}

// Form Handling
function initializeForms() {
    // Prayer Request Form
    const prayerForm = document.getElementById('prayer-form');
    if (prayerForm) {
        prayerForm.addEventListener('submit', handlePrayerRequest);
    }
    
    // Contact Form
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', handleContactForm);
    }
}

function handlePrayerRequest(e) {
    e.preventDefault();
    
    const formData = new FormData(e.target);
    const name = formData.get('name');
    const email = formData.get('email');
    const request = formData.get('request');
    
    // Create email content for pastor
    const emailSubject = `Prayer Request from ${name}`;
    const emailBody = `Dear Pastor Dismus,

A new prayer request has been submitted through the Hope for Life Ministry website:

Name: ${name}
Email: ${email}

Prayer Request:
${request}

Please keep this person in your prayers.

Blessings,
Hope for Life Ministry Website`;

    // Open email client with pre-filled content
    const mailtoLink = `mailto:dismusmutuku@gmail.com?subject=${encodeURIComponent(emailSubject)}&body=${encodeURIComponent(emailBody)}`;
    window.open(mailtoLink, '_blank');
    
    // Show success message
    showMessage('Prayer request submitted successfully! Your email client should open to send the request.', 'success');
    
    // Reset form
    e.target.reset();
}

function handleContactForm(e) {
    e.preventDefault();
    
    const formData = new FormData(e.target);
    const name = formData.get('name');
    const email = formData.get('email');
    const subject = formData.get('subject') || 'Contact from Website';
    const message = formData.get('message');
    
    // Create email content
    const emailSubject = `${subject} - from ${name}`;
    const emailBody = `Dear Hope for Life Ministry,

You have received a new message through your website:

Name: ${name}
Email: ${email}
Subject: ${subject}

Message:
${message}

Best regards,
${name}`;

    // Open email client with pre-filled content
    const mailtoLink = `mailto:dismusmutuku@gmail.com?subject=${encodeURIComponent(emailSubject)}&body=${encodeURIComponent(emailBody)}`;
    window.open(mailtoLink, '_blank');
    
    // Show success message
    showMessage('Message sent successfully! Your email client should open to send the message.', 'success');
    
    // Reset form
    e.target.reset();
}

// Gallery Modal
function openModal(imageSrc) {
    const modal = document.getElementById('image-modal');
    const modalImage = document.getElementById('modal-image');
    
    if (modal && modalImage) {
        modalImage.src = imageSrc;
        modal.style.display = 'block';
        
        // Close modal when clicking outside
        modal.addEventListener('click', function(e) {
            if (e.target === modal) {
                closeModal();
            }
        });
    }
}

function closeModal() {
    const modal = document.getElementById('image-modal');
    if (modal) {
        modal.style.display = 'none';
    }
}

// Message Display
function showMessage(message, type = 'info') {
    // Create message element
    const messageEl = document.createElement('div');
    messageEl.className = `message message-${type}`;
    messageEl.textContent = message;
    
    // Style the message
    messageEl.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: ${type === 'success' ? '#10b981' : '#3b82f6'};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 8px;
        box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
        z-index: 1000;
        max-width: 400px;
        font-weight: 500;
        transform: translateX(100%);
        transition: transform 0.3s ease;
    `;
    
    document.body.appendChild(messageEl);
    
    // Animate in
    setTimeout(() => {
        messageEl.style.transform = 'translateX(0)';
    }, 100);
    
    // Remove after 5 seconds
    setTimeout(() => {
        messageEl.style.transform = 'translateX(100%)';
        setTimeout(() => {
            if (messageEl.parentNode) {
                messageEl.parentNode.removeChild(messageEl);
            }
        }, 300);
    }, 5000);
}

// Keyboard shortcuts
document.addEventListener('keydown', function(e) {
    // Close modal with Escape key
    if (e.key === 'Escape') {
        closeModal();
    }
    
    // Toggle theme with Ctrl+Shift+T
    if (e.ctrlKey && e.shiftKey && e.key === 'T') {
        e.preventDefault();
        toggleTheme();
    }
});

// Utility Functions
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}