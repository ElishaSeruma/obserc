
        const dynamicImage = document.querySelector('.dynamic-image');
        const imageContainer = document.querySelector('.image-content');
        const images = [
            'people1.jpg',
            'people2.jpg',
            'people3.jpg',
            'people4.jpg'
        ];
        const colors = ['#07D6A0', '#2ED1B0', '#0ABF91', '#5CDB95'];
        let currentImageIndex = 0;
        let currentColorIndex = 0;

        function changeImageAndBorder() {
            currentImageIndex = (currentImageIndex + 1) % images.length;
            currentColorIndex = (currentColorIndex + 1) % colors.length;

            dynamicImage.style.opacity = '0';

            setTimeout(() => {
                dynamicImage.style.backgroundImage = `url('${images[currentImageIndex]}')`;
                imageContainer.style.borderColor = colors[currentColorIndex];
                dynamicImage.style.opacity = '1';
            }, 1000);
        }
        setInterval(changeImageAndBorder, 3000);

        const accordionHeaders = document.querySelectorAll('.accordion-header');

        accordionHeaders.forEach(header => {
            header.addEventListener('click', () => {
                const accordionItem = header.parentElement;
                const accordionContent = header.nextElementSibling;
                const accordionIcon = header.querySelector('.accordion-icon');

                const isOpen = accordionItem.classList.contains('open');

                if (!isOpen) {
                    accordionItem.classList.add('open');
                    accordionContent.style.maxHeight = 'none';
                    let contentHeight = accordionContent.scrollHeight;
                    if (contentHeight === 0 || contentHeight < 20) {
                        contentHeight = 1000;
                    }
                    accordionContent.style.maxHeight = '0px';
                    void accordionContent.offsetWidth;
                    accordionContent.style.maxHeight = contentHeight + 'px';
                    accordionIcon.src = 'chevron-up.png';
                } else {
                    accordionItem.classList.remove('open');
                    accordionContent.style.maxHeight = '0px';
                    accordionIcon.src = 'chevron-down.png';
                }
            });
        });

        document.addEventListener('DOMContentLoaded', function() {
            const betaCard = document.querySelector('.closed-beta-card');
            betaCard.addEventListener('click', function(e) {
                if (!e.target.classList.contains('close-icon')) {
                    this.classList.toggle('expanded');
                }
            });
            setTimeout(() => betaCard.classList.add('animated'), 100);

            const firstAccordionItem = document.querySelector('.accordion-item');
            if (firstAccordionItem) {
                const firstAccordionContent = firstAccordionItem.querySelector('.accordion-content');
                const firstAccordionIcon = firstAccordionItem.querySelector('.accordion-icon');
                firstAccordionItem.classList.add('open');
                firstAccordionContent.style.maxHeight = 'none';
                let initialHeight = firstAccordionContent.scrollHeight;
                if (initialHeight === 0 || initialHeight < 20) {
                    initialHeight = 1000;
                }
                firstAccordionContent.style.maxHeight = initialHeight + 'px';
                firstAccordionIcon.src = 'chevron-up.png';
            }

            const animateOnScroll = (entries, observer) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.remove('initial-hidden');
                        if (entry.target.classList.contains('pop-up')) {
                            const delay = parseInt(entry.target.dataset.animationDelay || '0');
                            setTimeout(() => {
                                entry.target.classList.add('animated');
                            }, delay);
                        } else {
                            entry.target.classList.add('animated');
                        }
                        observer.unobserve(entry.target);
                    }
                });
            };

            const observer = new IntersectionObserver(animateOnScroll, {
                root: null,
                rootMargin: '0px',
                threshold: 0.1
            });

            document.querySelectorAll('.animated-element').forEach(element => {
                observer.observe(element);
            });

            const heroElements = document.querySelectorAll('.hero-section .initial-hidden');
            heroElements.forEach(el => {
                const delay = parseInt(el.classList.contains('delay-100') ? 100 :
                                       el.classList.contains('delay-200') ? 200 :
                                       el.classList.contains('delay-300') ? 300 :
                                       el.classList.contains('delay-400') ? 400 : 0);
                setTimeout(() => {
                    el.classList.remove('initial-hidden');
                    el.classList.add('animated');
                }, delay);
            });
        });

        function handleResize() {
    const imageContent = document.querySelector('.text-image-section .image-content');
    if (window.innerWidth <= 768) {
        imageContent.classList.add('mobile-show');
    } else {
        imageContent.classList.remove('mobile-show');
    }
}

window.addEventListener('resize', handleResize);
window.addEventListener('load', handleResize);

        function toggleDrawer() {
            const drawer = document.getElementById('mobileDrawer');
            drawer.classList.toggle('open');
            if (drawer.classList.contains('open')) {
                document.body.style.overflow = 'hidden'; // Prevent background scroll
            } else {
                document.body.style.overflow = ''; // Restore scroll
            }
        }
