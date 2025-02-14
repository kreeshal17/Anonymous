// Chatbot Toggle
const chatbotToggle = document.querySelector('.chatbot-toggle');
const chatbotFrame = document.querySelector('.chatbot-frame');

// Theme Toggle with animation
const themeToggle = document.getElementById('theme-toggle');
const htmlElement = document.documentElement;
const themeIcon = themeToggle.querySelector('i');


// Mobile Navigation
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth'
            });
            // Close mobile menu if open
            navLinks.classList.remove('active');
            hamburger.classList.remove('active');
        }
    });
});


// Intersection Observer for section animations
const sections = document.querySelectorAll('section');
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, { threshold: 0.1 });

sections.forEach(section => {
    observer.observe(section);
});

// Parallax effect for hero background
const hero = document.querySelector('.hero');
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    hero.style.backgroundPositionY = scrolled * 0.5 + 'px';
});

// Interactive hover effects for profile image
const profileImage = document.querySelector('.profile-image');
profileImage.addEventListener('mousemove', (e) => {
    const { left, top, width, height } = profileImage.getBoundingClientRect();
    const x = (e.clientX - left) / width - 0.5;
    const y = (e.clientY - top) / height - 0.5;

    profileImage.style.transform = `
        scale(1.1)
        rotateX(${y * 20}deg)
        rotateY(${x * 20}deg)
    `;
});

profileImage.addEventListener('mouseleave', () => {
    profileImage.style.transform = '';
});

// Form submission with animation
const contactForm = document.getElementById('contact-form');
contactForm.addEventListener('submit', (e) => {
    e.preventDefault();

    // Animate form submission
    contactForm.classList.add('submitted');

    // Get form values
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const message = document.getElementById('message').value;

    // Show success message with animation
    const successMessage = document.createElement('div');
    successMessage.className = 'success-message';
    successMessage.textContent = 'Thanks for your message! I\'ll get back to you soon.';
    contactForm.appendChild(successMessage);

    // Reset form after animation
    setTimeout(() => {
        contactForm.reset();
        contactForm.classList.remove('submitted');
        successMessage.remove();
    }, 3000);
});

// Add CSS class for animations
const styles = `
    .fade-in {
        animation: fadeIn 1s forwards;
    }

    @keyframes fadeIn {
        from {
            opacity: 0;
            transform: translateY(20px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
`;

const styleSheet = document.createElement('style');
styleSheet.textContent = styles;
document.head.appendChild(styleSheet);


// Add error handling and logging
document.addEventListener('DOMContentLoaded', () => {
    // Check if required elements exist
    const requiredElements = {
        heroTitle: document.querySelector('.hero h1'),
        chatbotToggle: document.querySelector('.chatbot-toggle'),
        chatbotFrame: document.querySelector('.chatbot-frame'),
        themeToggle: document.getElementById('theme-toggle'),
        profileImage: document.querySelector('.profile-image'),
        contactForm: document.getElementById('contact-form')
    };

    // Log missing elements
    Object.entries(requiredElements).forEach(([name, element]) => {
        if (!element) {
            console.warn(`Missing required element: ${name}`);
        }
    });

    // Initialize features only if elements exist
    if (requiredElements.heroTitle) {
        // Typing effect
        const text = requiredElements.heroTitle.textContent;
        requiredElements.heroTitle.textContent = '';
        let charIndex = 0;

        function typeText() {
            if (charIndex < text.length) {
                requiredElements.heroTitle.textContent += text.charAt(charIndex);
                charIndex++;
                setTimeout(typeText, 100);
            }
        }

        setTimeout(typeText, 500);
    }

    if (requiredElements.chatbotToggle && requiredElements.chatbotFrame) {
        chatbotToggle.addEventListener('click', () => {
            chatbotFrame.classList.toggle('active');
        });
    }

    if (requiredElements.themeToggle) {
        const savedTheme = localStorage.getItem('theme') || 'light';
        document.documentElement.setAttribute('data-theme', savedTheme);
        updateThemeIcon(savedTheme);

        requiredElements.themeToggle.addEventListener('click', () => {
            const currentTheme = document.documentElement.getAttribute('data-theme');
            const newTheme = currentTheme === 'light' ? 'dark' : 'light';
            document.documentElement.setAttribute('data-theme', newTheme);
            localStorage.setItem('theme', newTheme);
            updateThemeIcon(newTheme);
        });
    }

});


// Helper functions
function updateThemeIcon(theme) {
    const themeIcon = document.querySelector('#theme-toggle i');
    if (themeIcon) {
        themeIcon.className = theme === 'light' ? 'fas fa-moon' : 'fas fa-sun';
    }
}

// Error handling for image loading
document.querySelectorAll('img').forEach(img => {
    img.onerror = function() {
        console.error(`Failed to load image: ${img.src}`);
        this.src = 'https://via.placeholder.com/300x200?text=Image+Not+Found';
    };
});
document.getElementById("menu-toggle").addEventListener("click", function () {
    var menu = document.getElementById("menu");
    if (menu.style.display === "block") {
        menu.style.display = "none";
    } else {
        menu.style.display = "block";
    }
});
