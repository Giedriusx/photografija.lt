document.addEventListener('DOMContentLoaded', () => {

    // --- Fixed Navigation on Scroll ---
    const header = document.querySelector('.main-header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) { // Add .scrolled class after 50px of scrolling
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // --- Mobile Navigation ---
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    const navLinksList = document.querySelectorAll('.nav-links li');

    hamburger.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        const icon = hamburger.querySelector('i');
        if (icon.classList.contains('fa-bars')) {
            icon.classList.remove('fa-bars');
            icon.classList.add('fa-times');
            hamburger.classList.add('is-active');
        } else {
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
            hamburger.classList.remove('is-active');
        }
    });

    navLinksList.forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
            const icon = hamburger.querySelector('i');
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
            hamburger.classList.remove('is-active');
        });
    });

    // --- Gallery Image Loading and Lightbox Functionality ---
    const galleryGrid = document.querySelector('.gallery-grid');
    const loadMoreBtn = document.getElementById('loadMoreBtn');
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const lightboxCaption = document.getElementById('lightbox-caption');
    const closeBtn = document.querySelector('.close-btn');
    const lightboxPrevBtn = document.querySelector('.prev-btn');
    const lightboxNextBtn = document.querySelector('.next-btn');

    const allImages = [
        "galerija/g.g.photograpphhyy_1736444960_3541879499345078034_71482134619.jpg",
        "galerija/g.g.photograpphhyy_1736445205_3541881550737210045_71482134619.jpg",
        "galerija/g.g.photograpphhyy_1736445503_3541884052781928425_71482134619.jpg",
        "galerija/g.g.photograpphhyy_1736445805_3541886589606724528_71482134619.jpg",
        "galerija/g.g.photograpphhyy_1736446210_3541889981833843792_71482134619.jpg",
        "galerija/g.g.photograpphhyy_1736446279_3541890560924606181_71482134619.jpg",
        "galerija/g.g.photograpphhyy_1736446509_3541892489616671321_71482134619.jpg",
        "galerija/g.g.photograpphhyy_1736448553_3541909635344204359_71482134619.jpg",
        "galerija/g.g.photograpphhyy_1736448644_3541910404839760409_71482134619.jpg",
        "galerija/g.g.photograpphhyy_1736448644_3541910404906700298_71482134619.jpg",
        "galerija/g.g.photograpphhyy_1736448644_3541910404906758783_71482134619.jpg",
        "galerija/g.g.photograpphhyy_1736448644_3541910404990623092_71482134619.jpg",
        "galerija/g.g.photograpphhyy_1736448764_3541911411103511256_71482134619.jpg",
        "galerija/g.g.photograpphhyy_1736448820_3541911876528603087_71482134619.jpg",
        "galerija/g.g.photograpphhyy_1736448896_3541912518777157027_71482134619.jpg",
        "galerija/g.g.photograpphhyy_1736448990_3541913304387071117_71482134619.jpg",
        "galerija/g.g.photograpphhyy_1736603234_3543207198793528937_71482134619.jpg",
        "galerija/g.g.photograpphhyy_1737369584_3549635807703797167_71482134619.jpg",
        "galerija/g.g.photograpphhyy_1737369584_3549635807821242472_71482134619.jpg",
        "galerija/g.g.photograpphhyy_1737369584_3549635807821243928_71482134619.jpg",
        "galerija/g.g.photograpphhyy_1744702183_3611146104851341266_71482134619.jpg",
        "galerija/g.g.photograpphhyy_1744747046_3611522445773753893_71482134619.jpg",
        "galerija/liveta.gecaite_1738011455_3555020209166389333_1212295272.jpg",
        "galerija/liveta.gecaite_1738011455_3555020209317411366_1212295272.jpg"
    ];
    const imagesPerPage = 8;
    let loadedImagesCount = 0;

    function loadImages() {
        const startIndex = loadedImagesCount;
        const endIndex = Math.min(loadedImagesCount + imagesPerPage, allImages.length);

        for (let i = startIndex; i < endIndex; i++) {
            const img = document.createElement('img');
            img.src = allImages[i];
            img.alt = `Galerijos nuotrauka ${i + 1}`;
            galleryGrid.appendChild(img);
        }

        loadedImagesCount = endIndex;

        if (loadedImagesCount >= allImages.length) {
            loadMoreBtn.style.display = 'none'; // Hide button if all images are loaded
        }

        // Re-attach click listeners for lightbox to all current images
        attachLightboxListeners();
    }

    function attachLightboxListeners() {
        const galleryImages = document.querySelectorAll('.gallery-grid img'); // Get updated NodeList
        galleryImages.forEach((image, index) => {
            // Remove existing listener to prevent duplicates
            image.removeEventListener('click', imageClickListener);
            // Add new listener
            image.addEventListener('click', imageClickListener);
        });
    }

    function imageClickListener() {
        const galleryImages = Array.from(document.querySelectorAll('.gallery-grid img')); // Convert NodeList to Array
        const clickedImageSrc = this.src;
        const index = galleryImages.findIndex(img => img.src === clickedImageSrc);
        openLightbox(index);
    }

    let currentImageIndex = 0; // This will now refer to the index within the currently displayed images

    function openLightbox(index) {
        currentImageIndex = index;
        lightbox.classList.add('active');
        updateLightboxImage();
    }

    function closeLightbox() {
        lightbox.classList.remove('active');
    }

    function updateLightboxImage() {
        const galleryImages = document.querySelectorAll('.gallery-grid img'); // Get updated NodeList
        const image = galleryImages[currentImageIndex];
        lightboxImg.src = image.src;
        lightboxCaption.textContent = image.alt;
    }

    function navigateLightbox(direction) {
        const galleryImages = document.querySelectorAll('.gallery-grid img'); // Get updated NodeList
        currentImageIndex += direction;
        if (currentImageIndex < 0) {
            currentImageIndex = galleryImages.length - 1;
        } else if (currentImageIndex >= galleryImages.length) {
            currentImageIndex = 0;
        }
        updateLightboxImage();
    }

    // Initial load
    loadImages();

    // Load more button event listener
    loadMoreBtn.addEventListener('click', (e) => {
        e.preventDefault(); // Prevent default link behavior
        loadImages();
    });

    closeBtn.addEventListener('click', closeLightbox);
    lightboxPrevBtn.addEventListener('click', () => navigateLightbox(-1));
    lightboxNextBtn.addEventListener('click', () => navigateLightbox(1));

    // Close lightbox when clicking outside the image
    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) {
            closeLightbox();
        }
    });

    // Close lightbox with ESC key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && lightbox.classList.contains('active')) {
            closeLightbox();
        }
    });

    // --- Hero Slider ---
    const slides = document.querySelectorAll('.hero-slide');
    const prevBtn = document.querySelector('.prev-slide');
    const nextBtn = document.querySelector('.next-slide');
    const paginationContainer = document.querySelector('.slider-pagination');
    
    let currentSlide = 0;
    let slideInterval;
    
    if (slides.length > 0) { // Only run slider code if slides exist
        slides.forEach((slide, index) => {
            const dot = document.createElement('div');
            dot.classList.add('dot');
            if (index === 0) dot.classList.add('active');
            dot.addEventListener('click', () => {
                goToSlide(index);
            });
            paginationContainer.appendChild(dot);
        });

        const dots = document.querySelectorAll('.slider-pagination .dot');

        function goToSlide(slideIndex) {
            slides[currentSlide].classList.remove('active');
            dots[currentSlide].classList.remove('active');
            currentSlide = slideIndex;
            slides[currentSlide].classList.add('active');
            dots[currentSlide].classList.add('active');
            resetInterval();
        }

        function nextSlide() {
            let nextSlideIndex = (currentSlide + 1) % slides.length;
            goToSlide(nextSlideIndex);
        }

        function prevSlide() {
            let prevSlideIndex = (currentSlide - 1 + slides.length) % slides.length;
            goToSlide(prevSlideIndex);
        }

        function startInterval() {
            slideInterval = setInterval(nextSlide, 5000);
        }

        function resetInterval() {
            clearInterval(slideInterval);
            startInterval();
        }

        nextBtn.addEventListener('click', nextSlide);
        prevBtn.addEventListener('click', prevSlide);

        startInterval();
    }

    // --- FAQ Accordion ---
    const faqQuestions = document.querySelectorAll('.faq-question');

    faqQuestions.forEach(question => {
        question.addEventListener('click', () => {
            const faqAnswer = question.nextElementSibling; // Get the next sibling, which is faq-answer
            
            // Toggle active class on the question
            question.classList.toggle('active');

            // Toggle active class on the answer for max-height transition
            if (faqAnswer.classList.contains('active')) {
                faqAnswer.classList.remove('active');
                faqAnswer.style.maxHeight = null; // Reset max-height
            } else {
                faqAnswer.classList.add('active');
                faqAnswer.style.maxHeight = faqAnswer.scrollHeight + "px"; // Set max-height to content height
            }
        });
    });
});
