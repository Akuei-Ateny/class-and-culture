// scripts/utils.js

// Utility functions for animations
const utils = {
    // Add animation delay to elements
    addStaggeredAnimation: (elements, baseDelay = 0.2) => {
        elements.forEach((el, index) => {
            el.style.animationDelay = `${baseDelay * index}s`;
        });
    },

    // Check if element is in viewport
    isInViewport: (element) => {
        const rect = element.getBoundingClientRect();
        return (
            rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.right <= (window.innerWidth || document.documentElement.clientWidth)
        );
    },

    // Smooth scroll to element
    scrollToElement: (element, offset = 0) => {
        const elementPosition = element.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - offset;

        window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
        });
    },

    // Create floating particles
    createParticles: (container, count = 20) => {
        for (let i = 0; i < count; i++) {
            const particle = document.createElement('div');
            particle.className = 'particle';
            
            // Random size between 5 and 20 pixels
            const size = 5 + Math.random() * 15;
            particle.style.width = `${size}px`;
            particle.style.height = `${size}px`;
            
            // Random position
            particle.style.left = `${Math.random() * 100}%`;
            particle.style.top = `${Math.random() * 100}%`;
            
            // Random animation duration
            particle.style.animationDuration = `${10 + Math.random() * 20}s`;
            
            container.appendChild(particle);
        }
    },

    // Handle image loading
    handleImageLoad: (image) => {
        return new Promise((resolve, reject) => {
            if (image.complete) {
                resolve(image);
            } else {
                image.onload = () => resolve(image);
                image.onerror = reject;
            }
        });
    },

    // Debounce function for performance
    debounce: (func, wait) => {
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
};

// Initialize when document is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Add animation to paragraphs
    const paragraphs = document.querySelectorAll('p');
    utils.addStaggeredAnimation(paragraphs);

    // Handle floating images
    const images = document.querySelectorAll('.floating-image');
    images.forEach(image => {
        utils.handleImageLoad(image)
            .then(() => image.classList.add('loaded'))
            .catch(console.error);
    });

    // Create background particles on homepage
    const particlesContainer = document.querySelector('.particles');
    if (particlesContainer) {
        utils.createParticles(particlesContainer);
    }
});

export default utils;