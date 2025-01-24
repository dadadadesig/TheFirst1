// index.js

// Initialize GSAP
gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

// Cyberpunk trail effect animation - optimized with throttling
document.addEventListener('mousemove', throttle((e) => {
    const cyberpunkTrail = document.createElement('div');
    cyberpunkTrail.className = 'cyberpunk-trail';
    document.body.appendChild(cyberpunkTrail);
    cyberpunkTrail.style.left = e.clientX + 'px';
    cyberpunkTrail.style.top = e.clientY + 'px';
    gsap.to(cyberpunkTrail, {
        opacity: 0,
        scale: 2,
        duration: 1.2,
        ease: 'power1.out',
        onComplete: () => {
            cyberpunkTrail.remove();
        }
    });
}, 50));

// Click effect animation - optimized
document.addEventListener('click', (e) => {
    const clickEffect = document.createElement('div');
    clickEffect.className = 'click-effect';
    document.body.appendChild(clickEffect);
    clickEffect.style.left = e.clientX + 'px';
    clickEffect.style.top = e.clientY + 'px';
    gsap.to(clickEffect, {
        width: 100,
        height: 100,
        opacity: 0,
        duration: 0.4,
        ease: 'power1.out',
        onComplete: () => {
            clickEffect.remove();
        }
    });
});

// Loading animation
window.addEventListener('load', () => {
    const loader = document.querySelector('.loader');
    gsap.to(loader, {
        opacity: 0,
        duration: 0.8,
        ease: 'power2.out',
        onComplete: () => {
            loader.style.display = 'none';
            // Animate hero section
            gsap.to('.hero h1', {
                opacity: 1,
                y: 0,
                duration: 0.8,
                delay: 0.3,
                ease: 'power2.out'
            });
            gsap.to('.hero p', {
                opacity: 1,
                y: 0,
                duration: 0.8,
                delay: 0.5,
                ease: 'power2.out'
            });
        }
    });
});

// Sticky Navigation Hide/Show on Scroll
let lastScrollTop = 0;
window.addEventListener('scroll', debounce(() => {
    let scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    if (scrollTop > lastScrollTop) {
        gsap.to('nav', {
            top: '-100px',
            duration: 0.3,
            ease: 'power2.out'
        });
    } else {
        gsap.to('nav', {
            top: '0',
            duration: 0.3,
            ease: 'power2.out'
        });
    }
    lastScrollTop = scrollTop;
}, 100));

// Project card animations
const projectCards = gsap.utils.toArray('.project-card');
gsap.from(projectCards, {
    opacity: 0,
    y: 100,
    duration: 1,
    stagger: 0.2,
    scrollTrigger: {
        trigger: '.projects-section',
        start: 'top center+=100',
        toggleActions: 'play none none reverse'
    }
});

// Section headers animation
gsap.from('.section-header', {
    opacity: 0,
    y: 50,
    duration: 0.8,
    scrollTrigger: {
        trigger: '.section-header',
        start: 'top center+=100'
    }
});

// About section animation
gsap.from('.about-image', {
    opacity: 0,
    x: -50,
    duration: 1,
    scrollTrigger: {
        trigger: '.about-section',
        start: 'top center+=100'
    }
});
gsap.from('.about-content', {
    opacity: 0,
    x: 50,
    duration: 1,
    scrollTrigger: {
        trigger: '.about-section',
        start: 'top center+=100'
    }
});

// Skills cards animation
gsap.from('.skill-card', {
    opacity: 0,
    y: 50,
    duration: 0.8,
    stagger: 0.2,
    scrollTrigger: {
        trigger: '.skills-grid',
        start: 'top center+=100'
    }
});

// Testimonials animation
gsap.from('.testimonial-card', {
    opacity: 0,
    y: 50,
    duration: 0.8,
    stagger: 0.2,
    scrollTrigger: {
        trigger: '.testimonials-grid',
        start: 'top center+=100'
    }
});

// Button hover effects
const buttons = document.querySelectorAll('.view-project-btn');
buttons.forEach(button => {
    button.addEventListener('mouseenter', () => {
        gsap.to(button, {
            scale: 1.05,
            duration: 0.3,
            ease: 'power2.out'
        });
    });
    button.addEventListener('mouseleave', () => {
        gsap.to(button, {
            scale: 1,
            duration: 0.3,
            ease: 'power2.out'
        });
    });
});

// Scroll to project function
function scrollToProject(projectId) {
    const projectElement = document.getElementById(projectId);
    if (projectElement) {
        gsap.to(window, {
            scrollTo: { y: projectElement, offsetY: 70 },
            duration: 1,
            ease: 'power2.out'
        });
    }
}

// Hamburger Menu Toggle
const menuToggle = document.querySelector('.menu-toggle');
const menuItems = document.querySelector('.menu-items');

menuToggle.addEventListener('click', () => {
    // Toggle class to show/hide menu
    menuItems.classList.toggle('menu-active');
});

// Close menu when clicking outside (optional)
document.addEventListener('click', (e) => {
    if (!menuItems.contains(e.target) && !menuToggle.contains(e.target)) {
        menuItems.classList.remove('menu-active');
    }
});

// Utility: Throttle
function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// Utility: Debounce
function debounce(func, delay) {
    let debounceTimer;
    return function() {
        const context = this;
        const args = arguments;
        clearTimeout(debounceTimer);
        debounceTimer = setTimeout(() => func.apply(context, args), delay);
    };
}