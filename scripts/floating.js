// scripts/floating.js

class FloatingButton {
    constructor(element) {
        this.element = element;
        this.originalPosition = {
            x: parseFloat(element.style.left) || 0,
            y: parseFloat(element.style.top) || 0
        };
        this.animationOffset = {
            x: (Math.random() - 0.5) * 40,
            y: (Math.random() - 0.5) * 40
        };
        this.animationDuration = 3 + Math.random() * 2;
        this.animationDelay = Math.random() * -2;
        this.init();
    }

    init() {
        // Set initial properties
        this.element.style.position = 'absolute';
        this.setRandomPosition();
        this.applyAnimation();
        this.addHoverEffect();
    }

    setRandomPosition() {
        // Ensure buttons don't start too close to edges
        const left = 10 + Math.random() * 80;
        const top = 10 + Math.random() * 80;
        this.element.style.left = `${left}%`;
        this.element.style.top = `${top}%`;
    }

    applyAnimation() {
        this.element.style.animation = `
            fadeIn 0.5s ease-out forwards,
            float ${this.animationDuration}s ease-in-out ${this.animationDelay}s infinite
        `;
        this.element.style.setProperty('--translate-x', `${this.animationOffset.x}px`);
        this.element.style.setProperty('--translate-y', `${this.animationOffset.y}px`);
    }

    addHoverEffect() {
        this.element.addEventListener('mouseenter', () => {
            this.element.style.transform = 'scale(1.1)';
            this.element.style.zIndex = '10';
        });

        this.element.addEventListener('mouseleave', () => {
            this.element.style.transform = 'scale(1)';
            this.element.style.zIndex = '1';
        });
    }

    // Check collision with other buttons
    checkCollision(otherButton) {
        const rect1 = this.element.getBoundingClientRect();
        const rect2 = otherButton.element.getBoundingClientRect();
        
        return !(rect1.right < rect2.left || 
                rect1.left > rect2.right || 
                rect1.bottom < rect2.top || 
                rect1.top > rect2.bottom);
    }
}

class FloatingButtonManager {
    constructor() {
        this.buttons = [];
        this.init();
    }

    init() {
        // Initialize all floating buttons
        const buttonElements = document.querySelectorAll('.entry-button');
        buttonElements.forEach(element => {
            const floatingButton = new FloatingButton(element);
            this.buttons.push(floatingButton);
        });

        // Resolve initial collisions
        this.resolveCollisions();

        // Add window resize handler
        window.addEventListener('resize', () => this.resolveCollisions());
    }

    resolveCollisions() {
        let hasCollision;
        do {
            hasCollision = false;
            for (let i = 0; i < this.buttons.length; i++) {
                for (let j = i + 1; j < this.buttons.length; j++) {
                    if (this.buttons[i].checkCollision(this.buttons[j])) {
                        hasCollision = true;
                        this.buttons[j].setRandomPosition();
                    }
                }
            }
        } while (hasCollision);
    }
}

// Initialize when document is loaded
document.addEventListener('DOMContentLoaded', () => {
    const manager = new FloatingButtonManager();

    // Add scroll parallax effect to buttons
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        document.querySelectorAll('.entry-button').forEach(button => {
            const speed = parseFloat(button.dataset.speed || 0.5);
            button.style.transform = `translateY(${scrolled * speed}px)`;
        });
    });
});