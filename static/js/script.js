document.addEventListener('DOMContentLoaded', () => {
    // Mobile Navigation
    const burger = document.querySelector('.burger');
    const nav = document.querySelector('.nav-links');
    const navLinks = document.querySelectorAll('.nav-links li');

    burger.addEventListener('click', () => {
        // Toggle Nav
        nav.classList.toggle('nav-active');

        // Animate Links with a more elegant timing
        navLinks.forEach((link, index) => {
            if (link.style.animation) {
                link.style.animation = '';
            } else {
                link.style.animation = `navLinkFade 0.8s ease forwards ${index / 7 + 0.5}s`;
            }
        });

        // Burger Animation
        burger.classList.toggle('toggle');
    });

    // Smooth scrolling with elegant easing
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            const headerOffset = 100;
            const elementPosition = target.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });

            // Close mobile menu if open
            if (nav.classList.contains('nav-active')) {
                nav.classList.remove('nav-active');
                burger.classList.remove('toggle');
            }
        });
    });

    // Elegant Scroll Reveal Animation
    const observerOptions = {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px"
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
                observer.unobserve(entry.target); // Only animate once
            }
        });
    }, observerOptions);

    // Observe all sections and cards
    document.querySelectorAll('section, .skill-card, .cert-card, .project-card').forEach(element => {
        element.classList.add('reveal-element');
        observer.observe(element);
    });

    // Vintage Hover Effect for Cards
    const cards = document.querySelectorAll('.skill-card, .cert-card, .project-card');
    cards.forEach(card => {
        card.addEventListener('mouseenter', (e) => {
            const bounds = card.getBoundingClientRect();
            const mouseX = e.clientX - bounds.left;
            const mouseY = e.clientY - bounds.top;
            
            card.style.transform = 'scale(1.02) rotate(0.5deg)';
            card.style.transition = 'transform 0.3s ease';
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = 'scale(1) rotate(0deg)';
        });
    });


    // Form Enhancement
    const form = document.getElementById('contact-form');
    if (form) {
        const formGroups = form.querySelectorAll('.form-group');
        
        formGroups.forEach(group => {
            const input = group.querySelector('input, textarea');
            const label = group.querySelector('label');

            input.addEventListener('focus', () => {
                group.classList.add('focused');
            });

            input.addEventListener('blur', () => {
                if (!input.value) {
                    group.classList.remove('focused');
                }
            });
        });

        form.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // Elegant form submission animation
            form.classList.add('submitted');
            setTimeout(() => {
                alert('Thank you for your message. I will respond with utmost promptness.');
                form.reset();
                form.classList.remove('submitted');
                formGroups.forEach(group => group.classList.remove('focused'));
            }, 1000);
        });
    }

    // Scroll-triggered Header Style
    const header = document.querySelector('header');
    let lastScroll = 0;

    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        
        if (currentScroll > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }

        lastScroll = currentScroll;
    });

    // Add vintage texture effect on mouse move
    document.addEventListener('mousemove', (e) => {
        const x = e.clientX / window.innerWidth;
        const y = e.clientY / window.innerHeight;
        
        document.documentElement.style.setProperty('--mouse-x', x);
        document.documentElement.style.setProperty('--mouse-y', y);
    });
});

// Page Load Animation
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
    
    // Animate hero content
    const heroContent = document.querySelector('.hero-content');
    if (heroContent) {
        heroContent.style.opacity = '0';
        heroContent.style.transform = 'translateY(20px)';
        
        setTimeout(() => {
            heroContent.style.opacity = '1';
            heroContent.style.transform = 'translateY(0)';
            heroContent.style.transition = 'all 1.5s ease';
        }, 300);
    }
});

// Your existing code stays at the top
document.addEventListener('DOMContentLoaded', () => {
    // Mobile Navigation
    const burger = document.querySelector('.burger');
    const nav = document.querySelector('.nav-links');
    const navLinks = document.querySelectorAll('.nav-links li');
    
    // ... other existing code ...
});

// Add the new certificate modal code at the end

// Certificate Modal Functionality
document.addEventListener('DOMContentLoaded', function() {
    const modal = document.getElementById('certModal');
    const modalImg = document.getElementById('modalImage');
    const closeBtn = document.querySelector('.close-modal');
    const viewButtons = document.querySelectorAll('.view-cert');

    // Open modal
    viewButtons.forEach(button => {
        button.addEventListener('click', function() {
            const certImg = this.closest('.cert-card').querySelector('img').src;
            modalImg.src = certImg;
            modal.classList.add('show');
            document.body.style.overflow = 'hidden';
            
            // Reset zoom state
            modalImg.classList.remove('zoomed');
            modalImg.style.transform = '';
        });
    });

    // Close modal
    function closeModal() {
        modal.classList.remove('show');
        document.body.style.overflow = '';
        modalImg.classList.remove('zoomed');
        modalImg.style.transform = '';
    }

    closeBtn.addEventListener('click', closeModal);
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            closeModal();
        }
    });

    // Close with escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && modal.classList.contains('show')) {
            closeModal();
        }
    });

    // Zoom functionality
    let isZoomed = false;
    let lastScrollPosition = { x: 0, y: 0 };

    modalImg.addEventListener('click', function(e) {
        if (!isZoomed) {
            // Zoom in
            this.classList.add('zoomed');
            isZoomed = true;
            
            // Calculate zoom level to show full image
            const scale = Math.max(
                this.naturalWidth / modal.clientWidth,
                this.naturalHeight / modal.clientHeight
            ) * 1.2; // 1.2 for slight extra zoom

            this.style.transform = `scale(${scale})`;
            
            // Enable scrolling of modal
            modal.style.overflow = 'auto';
            
            // Center the image
            modal.scrollTo(
                (this.width * scale - modal.clientWidth) / 2,
                (this.height * scale - modal.clientHeight) / 2
            );
        } else {
            // Zoom out
            this.classList.remove('zoomed');
            this.style.transform = '';
            isZoomed = false;
            modal.style.overflow = 'hidden';
        }
    });

    // Pan functionality when zoomed
    let isDragging = false;
    let startX, startY, scrollLeft, scrollTop;

    modalImg.addEventListener('mousedown', function(e) {
        if (!isZoomed) return;
        
        isDragging = true;
        startX = e.pageX - modal.offsetLeft;
        startY = e.pageY - modal.offsetTop;
        scrollLeft = modal.scrollLeft;
        scrollTop = modal.scrollTop;
        
        modalImg.style.cursor = 'grabbing';
    });

    modal.addEventListener('mousemove', function(e) {
        if (!isDragging) return;
        
        e.preventDefault();
        const x = e.pageX - modal.offsetLeft;
        const y = e.pageY - modal.offsetTop;
        const walkX = (x - startX) * 2;
        const walkY = (y - startY) * 2;
        
        modal.scrollLeft = scrollLeft - walkX;
        modal.scrollTop = scrollTop - walkY;
    });

    modal.addEventListener('mouseup', function() {
        isDragging = false;
        modalImg.style.cursor = 'zoom-out';
    });

    modal.addEventListener('mouseleave', function() {
        isDragging = false;
        modalImg.style.cursor = 'zoom-out';
    });
});