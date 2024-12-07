// scripts/navigation.js

document.addEventListener('DOMContentLoaded', () => {
    // Handle navigation buttons
    const navButtons = document.querySelectorAll('.nav-button');
    
    navButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            e.preventDefault();
            const target = button.getAttribute('href');
            
            // Add exit animation to current page
            document.body.classList.add('page-exit');
            
            // Navigate to new page after animation
            setTimeout(() => {
                window.location.href = target;
            }, 500);
        });
    });

    // Handle floating button animations on homepage
    const floatingButtons = document.querySelectorAll('.entry-button');
    
    floatingButtons.forEach((button, index) => {
        // Add random float animation delays
        const delay = Math.random() * -2;
        const duration = 3 + Math.random() * 2;
        
        button.style.animationDelay = `${delay}s`;
        button.style.animationDuration = `${duration}s`;
        
        // Add hover effect
        button.addEventListener('mouseenter', () => {
            button.style.transform = 'scale(1.1)';
        });
        
        button.addEventListener('mouseleave', () => {
            button.style.transform = 'scale(1)';
        });
    });

    // Handle page load animations
    document.body.classList.add('page-enter');
});

// Create floating animation for images
function initFloatingImages() {
    const images = document.querySelectorAll('.floating-image');
    
    images.forEach((image, index) => {
        const delay = index * 0.2;
        image.style.animationDelay = `${delay}s`;
    });
}

// Initialize floating images when page loads
initFloatingImages();