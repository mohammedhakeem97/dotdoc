/* ==========================================================================
   DotDoc Agency - Main JavaScript
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
    
    // --- 1. Custom Cursor ---
    const cursorDot = document.querySelector('.cursor-dot');
    const cursorOutline = document.querySelector('.cursor-outline');
    
    if (cursorDot && cursorOutline && window.matchMedia("(pointer: fine)").matches) {
        window.addEventListener('mousemove', (e) => {
            const posX = e.clientX;
            const posY = e.clientY;
            
            cursorDot.style.left = `${posX}px`;
            cursorDot.style.top = `${posY}px`;
            
            // Add a small delay/spring to the outline for smooth effect
            cursorOutline.animate({
                left: `${posX}px`,
                top: `${posY}px`
            }, { duration: 500, fill: "forwards" });
        });
        
        // Add hover effect for links and buttons
        const interactables = document.querySelectorAll('a, button, .service-card');
        interactables.forEach(el => {
            el.addEventListener('mouseenter', () => {
                cursorOutline.style.width = '60px';
                cursorOutline.style.height = '60px';
                cursorOutline.style.backgroundColor = 'rgba(37, 99, 235, 0.1)';
            });
            el.addEventListener('mouseleave', () => {
                cursorOutline.style.width = '40px';
                cursorOutline.style.height = '40px';
                cursorOutline.style.backgroundColor = 'transparent';
            });
        });
    }

    // --- 2. Header Scroll Effect ---
    const header = document.getElementById('header');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // --- 3. Mobile Navigation Toggle ---
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');
    
    if (navToggle) {
        navToggle.addEventListener('click', () => {
            navMenu.classList.toggle('show-menu');
        });
    }
    
    // Close menu when a link is clicked
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('show-menu');
        });
    });

    // --- 4. Scroll Reveal Animations (Intersection Observer) ---
    const revealElements = document.querySelectorAll('.reveal-up, .reveal-down, .reveal-left, .reveal-right, .reveal-scale');
    
    const revealOptions = {
        threshold: 0.15,
        rootMargin: "0px 0px -50px 0px"
    };
    
    const revealOnScroll = new IntersectionObserver(function(entries, observer) {
        entries.forEach(entry => {
            if (!entry.isIntersecting) {
                return;
            } else {
                entry.target.classList.add('active');
                
                // If it's a number counter, start the animation
                if (entry.target.querySelector('.stat-number')) {
                    startCounters(entry.target);
                }
                
                observer.unobserve(entry.target);
            }
        });
    }, revealOptions);
    
    revealElements.forEach(el => {
        revealOnScroll.observe(el);
    });

    // Add specific observer for stats section if it doesn't have reveal class directly
    const statsSection = document.querySelector('.hero-stats');
    if (statsSection) {
        const statsObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    startCounters(entry.target);
                    statsObserver.unobserve(entry.target);
                }
            });
        }, revealOptions);
        statsObserver.observe(statsSection);
    }

    // --- 5. Number Counter Animation ---
    function startCounters(parentElement) {
        const counters = parentElement.querySelectorAll('.stat-number');
        const speed = 200; // The lower the slower
        
        counters.forEach(counter => {
            const updateCount = () => {
                const target = +counter.getAttribute('data-target');
                const count = +counter.innerText.replace('+', '');
                
                const inc = target / speed;
                
                if (count < target) {
                    counter.innerText = '+' + Math.ceil(count + inc);
                    setTimeout(updateCount, 15);
                } else {
                    counter.innerText = '+' + target;
                }
            };
            
            // Only run if not already running
            if (counter.innerText === '0' || counter.innerText === '+0') {
                 counter.innerText = '0';
                 updateCount();
            } else if (!counter.innerText.includes('+')) {
                 counter.innerText = '0';
                 updateCount();
            }
        });
    }

});
