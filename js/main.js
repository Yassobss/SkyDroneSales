// Netflix-inspired JavaScript for Drone Business Website

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Navbar background change on scroll
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // FAQ Accordion functionality
    const faqItems = document.querySelectorAll('.faq-item');
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        question.addEventListener('click', () => {
            // Close all other items
            faqItems.forEach(otherItem => {
                if (otherItem !== item && otherItem.classList.contains('active')) {
                    otherItem.classList.remove('active');
                }
            });
            // Toggle current item
            item.classList.toggle('active');
        });
    });

    // Carousel functionality
    const carousel = document.querySelector('.carousel');
    const carouselItems = document.querySelectorAll('.carousel-item');
    const nextButton = document.querySelector('.carousel-control.next');

    let currentIndex = 0;
    let itemsPerView = getItemsPerView();
    const totalItems = carouselItems.length;

    // Update items per view on window resize
    window.addEventListener('resize', function() {
        itemsPerView = getItemsPerView();
    });

    // Function to determine items per view based on screen width
    function getItemsPerView() {
        if (window.innerWidth <= 550) return 1;
        if (window.innerWidth <= 768) return 2;
        return 3; // Default for larger screens
    }

    // Next button click handler
    nextButton.addEventListener('click', function() {
        if (currentIndex < totalItems - itemsPerView) {
            currentIndex++;
        } else {
            currentIndex = 0; // Loop back to beginning
        }
        updateCarouselPosition();
    });

    // Update carousel position
    function updateCarouselPosition() {
        const itemWidth = carouselItems[0].offsetWidth;
        carousel.style.transform = `translateX(-${currentIndex * itemWidth}px)`;
    }

    // Auto-play carousel (optional)
    let autoPlayInterval = setInterval(function() {
        if (currentIndex < totalItems - itemsPerView) {
            currentIndex++;
        } else {
            currentIndex = 0;
        }
        updateCarouselPosition();
    }, 5000);

    // Pause auto-play on hover
    carousel.addEventListener('mouseenter', function() {
        clearInterval(autoPlayInterval);
    });

    // Resume auto-play on mouse leave
    carousel.addEventListener('mouseleave', function() {
        autoPlayInterval = setInterval(function() {
            if (currentIndex < totalItems - itemsPerView) {
                currentIndex++;
            } else {
                currentIndex = 0;
            }
            updateCarouselPosition();
        }, 5000);
    });

    // Smooth scroll for Contact Us button
    const contactBtn = document.querySelector('.contact-btn');
    if (contactBtn) {
        contactBtn.addEventListener('click', function(e) {
            e.preventDefault();
            const contactFormSection = document.getElementById('contact-form');
            if (contactFormSection) {
                contactFormSection.scrollIntoView({ behavior: 'smooth' });
            }
        });
    }

    // Contact form validation and submission
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();

            // Get form values
            const firstName = document.getElementById('firstName').value.trim();
            const lastName = document.getElementById('lastName').value.trim();
            const email = document.getElementById('email').value.trim();
            const phone = document.getElementById('phone').value.trim();
            const company = document.getElementById('company').value.trim();
            const message = document.getElementById('message').value.trim();

            // Simple validation
            if (!firstName || !lastName || !email || !phone || !message) {
                alert('Please fill in all required fields.');
                return;
            }

            // Email validation
            if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
                alert('Please enter a valid email address.');
                return;
            }

            // Phone validation (simple check for numbers)
            if (!/^[0-9+\-\s()]+$/.test(phone)) {
                alert('Please enter a valid phone number.');
                return;
            }

            // If validation passes, show success message
            alert('Thank you for your message! We will contact you shortly.');
            contactForm.reset();
        });
    }

    // **Interactive Slider Functionality**
    let sliderIndex = 0;

    function updateSlider() {
        const slider = document.querySelector('.slider');
        slider.style.transform = `translateX(-${sliderIndex * 100}%)`;
    }

    function nextSlide() {
        const slides = document.querySelectorAll('.slide');
        sliderIndex = (sliderIndex + 1) % slides.length; // Loop forward
        updateSlider();
    }

    function prevSlide() {
        const slides = document.querySelectorAll('.slide');
        sliderIndex = (sliderIndex - 1 + slides.length) % slides.length; // Loop backward
        updateSlider();
    }

    // Attach event listeners to the slider buttons
    const prevButton = document.querySelector('.slider-control.prev');
    const nextButtonSlider = document.querySelector('.slider-control.next');

    if (prevButton && nextButtonSlider) {
        prevButton.addEventListener('click', prevSlide);
        nextButtonSlider.addEventListener('click', nextSlide);
    }
});