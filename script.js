/**
 * Portfolio JavaScript - Aniket Maurya
 * DevOps Engineer Portfolio Website
 */

// DOM Content Loaded Event
document.addEventListener('DOMContentLoaded', function() {
    initializePortfolio();
});

// Main initialization function
function initializePortfolio() {
    setupSmoothScrolling();
    setupNavbarEffects();
    setupContactForm();
    setupAnimationObservers();
    setupSkillCardEffects();
    setupProjectCardAnimations();
    setupMobileMenu();
    setupTypingEffect();
    setupParallaxEffect();
    setupScrollIndicator();
    setupLoadingEffect();
}

// Smooth scrolling for navigation links
function setupSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const navHeight = document.querySelector('nav').offsetHeight;
                const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - navHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
                
                // Close mobile menu if open
                closeMobileMenu();
            }
        });
    });
}

// Navbar background change and scroll indicator
function setupNavbarEffects() {
    const navbar = document.getElementById('navbar');
    let scrollIndicator = document.querySelector('.scroll-indicator');
    
    // Create scroll indicator if it doesn't exist
    if (!scrollIndicator) {
        scrollIndicator = document.createElement('div');
        scrollIndicator.className = 'scroll-indicator';
        document.body.appendChild(scrollIndicator);
    }
    
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
        const scrollPercent = (scrolled / maxScroll) * 100;
        
        // Update navbar background
        if (scrolled > 100) {
            navbar.style.background = 'rgba(255, 255, 255, 0.98)';
            navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.15)';
        } else {
            navbar.style.background = 'rgba(255, 255, 255, 0.95)';
            navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
        }
        
        // Update scroll indicator
        scrollIndicator.style.width = scrollPercent + '%';
    });
}

// Contact form submission
function setupContactForm() {
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(this);
            const data = Object.fromEntries(formData);
            
            // Add loading state
            const submitBtn = this.querySelector('button[type="submit"]');
            const originalText = submitBtn.textContent;
            submitBtn.textContent = 'Sending...';
            submitBtn.disabled = true;
            
            // Simulate form submission with timeout
            setTimeout(() => {
                // Show success message
                showNotification(`Thank you ${data.name}! Your message has been sent. I'll get back to you soon.`, 'success');
                
                // Reset form and button
                this.reset();
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
                
                // Add success animation
                submitBtn.style.background = '#4CAF50';
                setTimeout(() => {
                    submitBtn.style.background = '';
                }, 2000);
            }, 1500);
        });
    }
}

// Intersection Observer for animations
function setupAnimationObservers() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                entry.target.classList.add('animate');
            }
        });
    }, observerOptions);

    // Observe all sections and titles for animations
    document.querySelectorAll('.section, .section-title').forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        element.style.transition = 'all 0.6s ease';
        observer.observe(element);
    });
}

// Enhanced skill cards hover effects
function setupSkillCardEffects() {
    document.querySelectorAll('.skill-category').forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
            
            // Animate skill tags
            const skillTags = this.querySelectorAll('.skill-tag');
            skillTags.forEach((tag, index) => {
                setTimeout(() => {
                    tag.style.transform = 'scale(1.1)';
                }, index * 50);
            });
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
            
            // Reset skill tags
            const skillTags = this.querySelectorAll('.skill-tag');
            skillTags.forEach(tag => {
                tag.style.transform = 'scale(1)';
            });
        });
    });
}

// Project cards stagger animation
function setupProjectCardAnimations() {
    const projectCards = document.querySelectorAll('.project-card');
    
    projectCards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = `all 0.6s ease ${index * 0.2}s`;
    });

    const projectObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                
                // Add pulse animation to project header
                const header = entry.target.querySelector('.project-header');
                if (header) {
                    header.style.animation = 'pulse 2s ease-in-out';
                }
            }
        });
    }, { threshold: 0.2 });

    projectCards.forEach(card => {
        projectObserver.observe(card);
        
        // Add click effect
        card.addEventListener('click', function() {
            this.style.transform = 'scale(0.98)';
            setTimeout(() => {
                this.style.transform = '';
            }, 150);
        });
    });
}

// Mobile menu functionality
function setupMobileMenu() {
    const mobileMenuBtn = document.querySelector('.mobile-menu');
    const navLinks = document.querySelector('.nav-links');
    
    if (mobileMenuBtn && navLinks) {
        mobileMenuBtn.addEventListener('click', function() {
            navLinks.classList.toggle('active');
            
            // Animate hamburger icon
            const icon = this.querySelector('i');
            if (navLinks.classList.contains('active')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-times');
            } else {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });

        // Close mobile menu when clicking on a link
        document.querySelectorAll('.nav-links a').forEach(link => {
            link.addEventListener('click', closeMobileMenu);
        });
        
        // Close mobile menu when clicking outside
        document.addEventListener('click', function(e) {
            if (!e.target.closest('nav') && navLinks.classList.contains('active')) {
                closeMobileMenu();
            }
        });
    }
}

// Close mobile menu helper function
function closeMobileMenu() {
    const navLinks = document.querySelector('.nav-links');
    const mobileMenuBtn = document.querySelector('.mobile-menu');
    
    if (navLinks && navLinks.classList.contains('active')) {
        navLinks.classList.remove('active');
        
        const icon = mobileMenuBtn.querySelector('i');
        icon.classList.remove('fa-times');
        icon.classList.add('fa-bars');
    }
}

// Dynamic typing effect for hero subtitle
function setupTypingEffect() {
    const subtitles = [
        'DevOps Engineer',
        'Cloud Architect',
        'Automation Specialist',
        'Infrastructure Expert',
        'CI/CD Specialist',
        'Kubernetes Expert'
    ];
    
    let currentSubtitle = 0;
    const subtitleElement = document.querySelector('.hero .subtitle');
    
    if (subtitleElement) {
        // Start the typing effect after page load
        setTimeout(() => {
            typeWriter(subtitles[currentSubtitle], subtitleElement);
        }, 2000);
    }
    
    function typeWriter(text, element, speed = 100) {
        element.textContent = '';
        let i = 0;
        const timer = setInterval(() => {
            if (i < text.length) {
                element.textContent += text.charAt(i);
                i++;
            } else {
                clearInterval(timer);
                setTimeout(() => {
                    eraseText(element);
                }, 2000);
            }
        }, speed);
    }
    
    function eraseText(element, speed = 50) {
        const text = element.textContent;
        let i = text.length;
        const timer = setInterval(() => {
            if (i > 0) {
                element.textContent = text.substring(0, i - 1);
                i--;
            } else {
                clearInterval(timer);
                currentSubtitle = (currentSubtitle + 1) % subtitles.length;
                setTimeout(() => {
                    typeWriter(subtitles[currentSubtitle], element);
                }, 500);
            }
        }, speed);
    }
}

// Parallax effect for floating elements
function setupParallaxEffect() {
    const floatingElements = document.querySelectorAll('.floating-element');
    
    window.addEventListener('scroll', throttle(() => {
        const scrolled = window.pageYOffset;
        const rate = scrolled * -0.5;
        
        floatingElements.forEach((element, index) => {
            const speed = 0.3 * (index + 1);
            element.style.transform = `translateY(${rate * speed}px)`;
        });
    }, 16)); // ~60fps
}

// Scroll indicator
function setupScrollIndicator() {
    // This is handled in setupNavbarEffects()
    // but we can add additional scroll-based effects here
    
    window.addEventListener('scroll', throttle(() => {
        const sections = document.querySelectorAll('.section');
        const scrollPosition = window.pageYOffset + 200;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                // Update active nav link
                document.querySelectorAll('.nav-links a').forEach(link => {
                    link.classList.remove('active');
                });
                
                const activeLink = document.querySelector(`.nav-links a[href="#${sectionId}"]`);
                if (activeLink) {
                    activeLink.classList.add('active');
                }
            }
        });
    }, 16));
}

// Loading effect
function setupLoadingEffect() {
    window.addEventListener('load', () => {
        document.body.classList.add('loaded');
        
        // Animate elements on load
        const elementsToAnimate = document.querySelectorAll('.loading');
        elementsToAnimate.forEach((element, index) => {
            setTimeout(() => {
                element.classList.add('animate');
            }, index * 100);
        });
    });
}

// Utility function for throttling
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
    }
}

// Notification system
function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <i class="fas fa-${type === 'success' ? 'check-circle' : 'info-circle'}"></i>
            <span>${message}</span>
            <button class="notification-close">
                <i class="fas fa-times"></i>
            </button>
        </div>
    `;
    
    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: ${type === 'success' ? '#4CAF50' : '#2196F3'};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        z-index: 10000;
        transform: translateX(400px);
        transition: transform 0.3s ease;
        max-width: 400px;
    `;
    
    const notificationContent = notification.querySelector('.notification-content');
    notificationContent.style.cssText = `
        display: flex;
        align-items: center;
        gap: 0.5rem;
    `;
    
    const closeBtn = notification.querySelector('.notification-close');
    closeBtn.style.cssText = `
        background: none;
        border: none;
        color: white;
        cursor: pointer;
        padding: 0;
        margin-left: auto;
    `;
    
    // Add to DOM
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Close button functionality
    closeBtn.addEventListener('click', () => {
        notification.style.transform = 'translateX(400px)';
        setTimeout(() => {
            notification.remove();
        }, 300);
    });
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        if (notification.parentNode) {
            notification.style.transform = 'translateX(400px)';
            setTimeout(() => {
                notification.remove();
            }, 300);
        }
    }, 5000);
}

// Keyboard navigation support
document.addEventListener('keydown', function(e) {
    // ESC key closes mobile menu
    if (e.key === 'Escape') {
        closeMobileMenu();
    }
    
    // Arrow keys for section navigation
    if (e.key === 'ArrowDown' && e.ctrlKey) {
        e.preventDefault();
        scrollToNextSection();
    } else if (e.key === 'ArrowUp' && e.ctrlKey) {
        e.preventDefault();
        scrollToPrevSection();
    }
});

// Section navigation helpers
function scrollToNextSection() {
    const sections = Array.from(document.querySelectorAll('.section'));
    const currentScroll = window.pageYOffset + 200;
    
    const nextSection = sections.find(section => 
        section.offsetTop > currentScroll
    );
    
    if (nextSection) {
        nextSection.scrollIntoView({ behavior: 'smooth' });
    }
}

function scrollToPrevSection() {
    const sections = Array.from(document.querySelectorAll('.section')).reverse();
    const currentScroll = window.pageYOffset - 200;
    
    const prevSection = sections.find(section => 
        section.offsetTop < currentScroll
    );
    
    if (prevSection) {
        prevSection.scrollIntoView({ behavior: 'smooth' });
    }
}

// Performance optimization: Intersection Observer for heavy animations
const performanceObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            // Enable expensive animations only when element is visible
            entry.target.classList.add('animate-heavy');
        } else {
            // Disable expensive animations when element is not visible
            entry.target.classList.remove('animate-heavy');
        }
    });
}, { rootMargin: '100px' });

// Apply performance observer to elements with heavy animations
document.querySelectorAll('.floating-element, .skill-category, .project-card').forEach(element => {
    performanceObserver.observe(element);
});

// Console welcome message
console.log(`
🚀 Welcome to Aniket Maurya's Portfolio
👨‍💻 DevOps Engineer & Cloud Enthusiast
🔧 Built with HTML5, CSS3, and JavaScript
📧 Contact: aniket.maurya@email.com
🌟 Thanks for visiting!
`);

// Export functions for potential external use
window.PortfolioJS = {
    showNotification,
    scrollToNextSection,
    scrollToPrevSection,
    closeMobileMenu
};