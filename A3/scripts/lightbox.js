document.addEventListener('DOMContentLoaded', function() {
    // Find all images inside portfolio items
    const portfolioImages = document.querySelectorAll('.portfolio__item a');

    portfolioImages.forEach(function(item) {
        item.addEventListener('click', function(e) {
            e.preventDefault(); // Prevent default link behavior

            const lightboxId = this.getAttribute('href'); // Get the href attribute value
            const lightbox = document.querySelector(lightboxId); // Find the lightbox container

            if (lightbox) {
                lightbox.style.transform = 'scale(1,1)'; // Apply scale to show the lightbox
                lightbox.style.transformOrigin = 'left'; // Ensure the origin is left for the animation

                // Close lightbox when clicking the close button
                const closeButton = lightbox.querySelector('.close');
                if (closeButton) {
                    closeButton.addEventListener('click', function() {
                        lightbox.style.transform = 'scale(0,1)'; // Hide the lightbox
                    });
                }
            }
        });
    });
});
