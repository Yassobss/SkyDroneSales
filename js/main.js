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

    // Top link functionality
    const topLink = document.getElementById('top-link');
    if (topLink) {
        topLink.addEventListener('click', function(e) {
            e.preventDefault();
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    // Slideshow functionality
    const slideshowContainer = document.querySelector('.slideshow-container');
    if (slideshowContainer) {
        // Create 15 slideshow images
        for (let i = 1; i <= 15; i++) {
            const img = document.createElement('img');
            img.src = `images/Slideshow Pic ${i}.jpg`;
            img.alt = `Slideshow Image ${i}`;
            img.className = 'slideshow-image';
            img.loading = 'lazy'; // Add lazy loading
            
            // Make the first image active
            if (i === 1) {
                img.classList.add('active');
            }
            
            slideshowContainer.appendChild(img);
        }

        // Slideshow rotation
        const slideshowImages = document.querySelectorAll('.slideshow-image');
        let currentSlide = 0;
        
        function rotateSlideshow() {
            // Hide current slide
            slideshowImages[currentSlide].classList.remove('active');
            
            // Move to next slide
            currentSlide = (currentSlide + 1) % slideshowImages.length;
            
            // Show new slide
            slideshowImages[currentSlide].classList.add('active');
        }
        
        // Change slide every 5 seconds
        setInterval(rotateSlideshow, 5000);
    }

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

    // Contact form validation and submission with Formspree
    const contactForm = document.getElementById('contactForm');
    const formStatus = document.getElementById('form-status');
    
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
                formStatus.textContent = 'Please fill in all required fields.';
                formStatus.className = 'form-status error';
                return;
            }

            // Email validation
            if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
                formStatus.textContent = 'Please enter a valid email address.';
                formStatus.className = 'form-status error';
                return;
            }

            // Phone validation (simple check for numbers)
            if (!/^[0-9+\-\s()]+$/.test(phone)) {
                formStatus.textContent = 'Please enter a valid phone number.';
                formStatus.className = 'form-status error';
                return;
            }

            // Submit form to Formspree
            const formData = new FormData(contactForm);
            
            fetch(contactForm.action, {
                method: contactForm.method,
                body: formData,
                headers: {
                    'Accept': 'application/json'
                }
            })
            .then(response => {
                if (response.ok) {
                    return response.json();
                }
                throw new Error('Network response was not ok.');
            })
            .then(data => {
                // Show success message
                formStatus.textContent = 'Thank you for your message! We will contact you shortly.';
                formStatus.className = 'form-status success';
                contactForm.reset();
            })
            .catch(error => {
                // Show error message
                formStatus.textContent = 'Oops! There was a problem submitting your form. Please try again.';
                formStatus.className = 'form-status error';
            });
        });
    }

    // **Interactive Slider Functionality**
    let sliderIndex = 0;

    // Make these functions global so they can be called from HTML
    window.updateSlider = function() {
        const slider = document.querySelector('.slider');
        const slides = document.querySelectorAll('.slide');
        if (slider && slides.length > 0) {
            slider.style.transform = `translateX(-${sliderIndex * 100}%)`;
        }
    }

    // Move to the next slide
    window.nextSlide = function() {
        const slides = document.querySelectorAll('.slide');
        if (slides.length > 0) {
            sliderIndex = (sliderIndex + 1) % slides.length; // Loop forward
            window.updateSlider();
        }
    };

    // Move to the previous slide
    window.prevSlide = function() {
        const slides = document.querySelectorAll('.slide');
        if (slides.length > 0) {
            sliderIndex = (sliderIndex - 1 + slides.length) % slides.length; // Loop backward
            window.updateSlider();
        }
    };

    // Attach event listeners to the slider buttons
    const prevButton = document.querySelector('.slider-control.prev');
    const nextButtonSlider = document.querySelector('.slider-control.next');

    if (prevButton && nextButton) {
        prevButton.addEventListener('click', window.prevSlide);
        nextButtonSlider.addEventListener('click', window.nextSlide);
    }

        // Initialize the slider
    updateSlider();
});
    // Adjust 360 viewer for mobile
    function adjust360Viewer() {
        const sliderContainer = document.querySelector('.slider-container');
        const sliderFrames = document.querySelectorAll('.slider-frame');
        
        if (window.matchMedia("(max-aspect-ratio: 9/16)").matches) {
            // Mobile portrait mode (9:16)
            sliderFrames.forEach(frame => {
                frame.style.height = '100%';
                frame.style.width = '100%';
            });
        } else {
            // Desktop or landscape mode
            sliderFrames.forEach(frame => {
                frame.style.height = '100%';
                frame.style.width = '100%';
            });
        }
    }

    // Run on load and resize
    adjust360Viewer();
    window.addEventListener('resize', adjust360Viewer);
});