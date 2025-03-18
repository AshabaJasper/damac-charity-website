/**
 * DaMaC Charity Website JavaScript
 * This file handles all interactive functionality of the website
 * including:
 * - Mobile navigation with dropdowns
 * - Header scroll effects
 * - Testimonial slider
 * - Scroll animations
 * - Stat counting animations
 * - Form validations and submissions
 */

// Wait for DOM to be fully loaded before executing JavaScript
document.addEventListener('DOMContentLoaded', function() {
    // Variables for commonly accessed elements
    const header = document.getElementById('header');
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const navMenu = document.querySelector('.nav-menu');
    const dropdowns = document.querySelectorAll('.dropdown');
    const testimonialItems = document.querySelectorAll('.testimonial-item');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    const dots = document.querySelectorAll('.dot');
    const statElements = document.querySelectorAll('.stat-number[data-count]');
    const forms = document.querySelectorAll('form');
    
    // Store reference to dropdown click handlers for cleanup
    const dropdownHandlers = new Map();
    
    // ===== Header Scroll Effect =====
    function handleHeaderScroll() {
        if (window.scrollY > 50) {
            header.style.padding = '10px 0';
            header.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
            header.style.backgroundColor = 'rgba(255, 255, 255, 0.98)';
        } else {
            header.style.padding = '15px 0';
            header.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.1)';
            header.style.backgroundColor = 'rgba(255, 255, 255, 0.95)';
        }
    }
    
    window.addEventListener('scroll', handleHeaderScroll);
    // Run once on initial load
    handleHeaderScroll();
    
    // ===== Mobile Menu Toggle =====
    mobileMenuToggle.addEventListener('click', function() {
        this.classList.toggle('active');
        navMenu.classList.toggle('active');
        
        // Transform hamburger icon to X when active
        const spans = this.querySelectorAll('span');
        if (this.classList.contains('active')) {
            spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
            spans[1].style.opacity = '0';
            spans[2].style.transform = 'rotate(-45deg) translate(7px, -6px)';
        } else {
            spans[0].style.transform = 'none';
            spans[1].style.opacity = '1';
            spans[2].style.transform = 'none';
        }
    });
    
    // ===== Mobile Dropdown Toggles =====
    // Fixed function to properly clean up event listeners
    function setupMobileDropdowns() {
        // First, clean up any existing handlers
        dropdownHandlers.forEach((handler, element) => {
            element.removeEventListener('click', handler);
        });
        dropdownHandlers.clear();
        
        // Set up new handlers based on current viewport width
        dropdowns.forEach(dropdown => {
            const dropdownLink = dropdown.querySelector('a');
            
            if (window.innerWidth <= 768) {
                // Mobile behavior - toggle dropdown on click
                const clickHandler = function(e) {
                    e.preventDefault();
                    dropdown.classList.toggle('active');
                };
                
                dropdownLink.addEventListener('click', clickHandler);
                dropdownHandlers.set(dropdownLink, clickHandler);
            }
        });
    }
    
    // Setup dropdown behavior initially and when resizing
    setupMobileDropdowns();
    window.addEventListener('resize', setupMobileDropdowns);
    
    // Close mobile menu when clicking outside
    document.addEventListener('click', function(event) {
        if (!navMenu.contains(event.target) && !mobileMenuToggle.contains(event.target) && navMenu.classList.contains('active')) {
            navMenu.classList.remove('active');
            mobileMenuToggle.classList.remove('active');
            
            const spans = mobileMenuToggle.querySelectorAll('span');
            spans[0].style.transform = 'none';
            spans[1].style.opacity = '1';
            spans[2].style.transform = 'none';
            
            // Close all dropdowns
            dropdowns.forEach(dropdown => {
                dropdown.classList.remove('active');
            });
        }
    });

    //  IntersectionObserver callback function
if (entry.target.id === 'impact-metrics' && entry.isIntersecting) {
    // Get the metric elements
    const metricNumbers = entry.target.querySelectorAll('.metric-number[data-count]');
    // Animate them
    animateStats(metricNumbers);
}
    
    // Close mobile menu when clicking on a menu link (except dropdown toggles in mobile view)
    navMenu.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', function(event) {
            // Skip if it's a dropdown toggle in mobile view
            if (window.innerWidth <= 768 && link.parentElement.classList.contains('dropdown') && !link.closest('.dropdown-menu')) {
                return;
            }
            
            if (navMenu.classList.contains('active')) {
                navMenu.classList.remove('active');
                mobileMenuToggle.classList.remove('active');
                
                const spans = mobileMenuToggle.querySelectorAll('span');
                spans[0].style.transform = 'none';
                spans[1].style.opacity = '1';
                spans[2].style.transform = 'none';
                
                // Close all dropdowns
                dropdowns.forEach(dropdown => {
                    dropdown.classList.remove('active');
                });
            }
        });
    });
    
    // ===== Testimonial Slider =====
    let currentTestimonial = 0;
    
    // Hide all testimonials except the first one
    if (testimonialItems.length > 0) {
        testimonialItems.forEach((item, index) => {
            if (index !== 0) {
                item.classList.remove('active');
            } else {
                item.classList.add('active');
            }
        });
        
        // Add active class to the first dot
        if (dots.length > 0) {
            dots[0].classList.add('active');
        }
    }
    
    // Function to show a specific testimonial (improved animation)
    function showTestimonial(index) {
        // Update the testimonials
        testimonialItems.forEach(item => {
            item.classList.remove('active');
        });
        
        testimonialItems[index].classList.add('active');
        
        // Update the dots
        if (dots.length > 0) {
            dots.forEach(dot => {
                dot.classList.remove('active');
            });
            
            dots[index].classList.add('active');
        }
        
        // Use CSS transitions instead of JS animation for better performance
        testimonialItems[index].style.opacity = 0;
        
        // Force reflow to ensure the opacity change is registered before transition starts
        void testimonialItems[index].offsetWidth;
        
        testimonialItems[index].style.transition = 'opacity 0.3s ease';
        testimonialItems[index].style.opacity = 1;
    }
    
    // Event listeners for testimonial navigation
    if (prevBtn && nextBtn) {
        nextBtn.addEventListener('click', function() {
            currentTestimonial = (currentTestimonial + 1) % testimonialItems.length;
            showTestimonial(currentTestimonial);
        });
        
        prevBtn.addEventListener('click', function() {
            currentTestimonial = (currentTestimonial - 1 + testimonialItems.length) % testimonialItems.length;
            showTestimonial(currentTestimonial);
        });
    }
    
    // Event listeners for testimonial dots
    if (dots.length > 0) {
        dots.forEach((dot, index) => {
            dot.addEventListener('click', function() {
                currentTestimonial = index;
                showTestimonial(currentTestimonial);
            });
        });
    }
    
    // Auto slide testimonials every 5 seconds (if visible)
    let testimonialInterval;
    
    function startTestimonialInterval() {
        // Clear any existing interval first
        if (testimonialInterval) {
            clearInterval(testimonialInterval);
        }
        
        // Only set up interval if we have testimonials
        if (testimonialItems.length > 0) {
            testimonialInterval = setInterval(() => {
                if (document.visibilityState === 'visible') {
                    currentTestimonial = (currentTestimonial + 1) % testimonialItems.length;
                    showTestimonial(currentTestimonial);
                }
            }, 5000);
        }
    }
    
    startTestimonialInterval();
    
    // Reset interval when tab becomes visible
    document.addEventListener('visibilitychange', function() {
        if (document.visibilityState === 'visible') {
            startTestimonialInterval();
        }
    });
    
    // ===== Form Submissions =====
    forms.forEach(form => {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Validate the form
            let isValid = true;
            
            // Check required fields
            form.querySelectorAll('[required]').forEach(field => {
                if (!field.value.trim()) {
                    isValid = false;
                    field.classList.add('error');
                    
                    // Add error message if not already present
                    let errorMessage = field.nextElementSibling;
                    if (!errorMessage || !errorMessage.classList.contains('error-message')) {
                        errorMessage = document.createElement('div');
                        errorMessage.className = 'error-message';
                        errorMessage.textContent = 'This field is required.';
                        field.parentNode.insertBefore(errorMessage, field.nextSibling);
                    }
                } else {
                    field.classList.remove('error');
                    
                    // Remove error message if exists
                    const errorMessage = field.nextElementSibling;
                    if (errorMessage && errorMessage.classList.contains('error-message')) {
                        errorMessage.remove();
                    }
                }
            });
            
            // Check email format
            form.querySelectorAll('input[type="email"]').forEach(email => {
                if (email.value.trim() && !isValidEmail(email.value)) {
                    isValid = false;
                    email.classList.add('error');
                    
                    // Add error message if not already present
                    let errorMessage = email.nextElementSibling;
                    if (!errorMessage || !errorMessage.classList.contains('error-message')) {
                        errorMessage = document.createElement('div');
                        errorMessage.className = 'error-message';
                        errorMessage.textContent = 'Please enter a valid email address.';
                        email.parentNode.insertBefore(errorMessage, email.nextSibling);
                    }
                }
            });
            
            if (!isValid) {
                return;
            }
            
            // Get the form data
            const formData = new FormData(form);
            const formObject = {};
            formData.forEach((value, key) => {
                formObject[key] = value;
            });
            
            // In a real implementation, you would send this data to a server
            console.log('Form submitted with data:', formObject);
            
            // Show a success message
            const successMessage = document.createElement('div');
            successMessage.className = 'form-success';
            successMessage.textContent = 'Thank you for your submission! We will get back to you soon.';
            successMessage.style.color = '#28a745';
            successMessage.style.padding = '15px';
            successMessage.style.marginTop = '20px';
            successMessage.style.backgroundColor = '#f8f9fa';
            successMessage.style.borderRadius = '4px';
            successMessage.style.border = '1px solid #28a745';
            
            // Replace any existing message and add the new one
            const existingMessage = form.querySelector('.form-success');
            if (existingMessage) {
                form.removeChild(existingMessage);
            }
            form.appendChild(successMessage);
            
            // Reset the form
            form.reset();
            
            // Remove success message after 5 seconds
            setTimeout(() => {
                if (form.contains(successMessage)) {
                    successMessage.remove();
                }
            }, 5000);
        });
    });
    
    // Helper function to validate email format - fixed regex
    function isValidEmail(email) {
        // Fixed regex with properly escaped parentheses
        const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    }
    
    // ===== Scroll Animation for Sections =====
    // Add animation when sections come into view
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('in-view');
                
                // Animate stat counting if this is a stat section
                const statElements = entry.target.querySelectorAll('.stat-number[data-count]');
                if (statElements.length > 0) {
                    animateStats(statElements);
                }
                
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.15,
        rootMargin: '0px 0px -100px 0px'
    });
    
    // Observe all sections and elements that should animate in
    document.querySelectorAll('.section, .program-card, .stat-box, .team-member, .gallery-item, .timeline-item, .principle-item').forEach(element => {
        observer.observe(element);
        
        // Add initial state for animation
        element.classList.add('fade-in-section');
    });
    
    // ===== Animate Stats Counting =====
    function animateStats(elements) {
        elements.forEach(stat => {
            // Safely parse the target value
            const targetValue = parseInt(stat.getAttribute('data-count'), 10);
            
            // Skip animation if data-count is not a valid number
            if (isNaN(targetValue)) {
                console.warn('Invalid data-count value:', stat.getAttribute('data-count'));
                return;
            }
            
            let currentValue = 0;
            const increment = targetValue > 100 ? Math.ceil(targetValue / 60) : 1;
            const duration = 2000; // 2 seconds
            const interval = Math.floor(duration / (targetValue / increment));
            
            stat.classList.add('animated-stat');
            
            const counter = setInterval(() => {
                currentValue += increment;
                
                if (currentValue >= targetValue) {
                    stat.textContent = targetValue;
                    clearInterval(counter);
                } else {
                    stat.textContent = currentValue;
                }
            }, interval);
        });
    }
    
    // Animate the stats in hero section immediately if they exist
    const heroStats = document.querySelectorAll('.hero-stats .stat-number');
    if (heroStats.length > 0) {
        setTimeout(() => {
            heroStats.forEach(stat => {
                stat.classList.add('animated-stat');
            });
        }, 500);
    }
    
    // ===== Smooth Scrolling for Anchor Links =====
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            // Skip for mobile dropdown toggles
            if (window.innerWidth <= 768 && 
                this.parentElement.classList.contains('dropdown') && 
                !this.closest('.dropdown-menu')) {
                return;
            }
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                e.preventDefault();
                
                // Calculate header height for offset
                const headerHeight = header.offsetHeight;
                
                // Scroll to the element with offset for fixed header
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerHeight;
                
                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // ===== Add active class to current nav item =====
    function setActiveNavItem() {
        const scrollPosition = window.scrollY;
        
        // Get all section positions
        document.querySelectorAll('section[id]').forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                document.querySelectorAll('.nav-menu a').forEach(link => {
                    link.parentElement.classList.remove('active');
                    
                    if (link.getAttribute('href') === `#${sectionId}` || 
                        link.getAttribute('href') === `index.html#${sectionId}` ||
                        link.getAttribute('href') === `about.html#${sectionId}` ||
                        link.getAttribute('href') === `programs.html#${sectionId}`) {
                        link.parentElement.classList.add('active');
                    }
                });
            }
        });
    }
    
    window.addEventListener('scroll', setActiveNavItem);
    window.addEventListener('load', setActiveNavItem);
});