document.addEventListener('DOMContentLoaded', function() {
    const modal = document.getElementById('projectModal');
    const modalClose = document.getElementById('modalClose');
    const modalMedia = modal.querySelector('.modal-media');
    const modalText = modal.querySelector('.modal-text');
    const projectCards = document.querySelectorAll('.project-card');

    projectCards.forEach(card => {
        card.addEventListener('click', function(e) {
            if (e.target.classList.contains('card-expand-btn')) {
                e.preventDefault();
                openModal(card);
                return;
            }
            openModal(card);
        });
    });

    modalClose.addEventListener('click', closeModal);

    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            closeModal();
        }
    });

    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && modal.classList.contains('active')) {
            closeModal();
        }
    });

    function openModal(card) {
        const fullContent = card.querySelector('.card-full-content');
        const fullTitle = fullContent.querySelector('.full-title').cloneNode(true);
        const fullMedia = fullContent.querySelector('.full-media').cloneNode(true);
        const fullDescription = fullContent.querySelector('.full-description').cloneNode(true);

        modalMedia.innerHTML = '';
        modalText.innerHTML = '';

        modalMedia.appendChild(fullMedia);
        modalText.appendChild(fullTitle);
        modalText.appendChild(fullDescription);

        applyTranslationsToModal();

        modal.classList.add('active');
        document.body.style.overflow = 'hidden';

        initGallery();
    }

    function closeModal() {
        modal.classList.remove('active');
        document.body.style.overflow = '';
        
        setTimeout(() => {
            modalMedia.innerHTML = '';
            modalText.innerHTML = '';
        }, 300);
    }

    function applyTranslationsToModal() {
        const currentLanguage = localStorage.getItem("portfolio-language") || "en";
        
        const translations = window.translations || {};
        const dictionary = translations[currentLanguage] || translations['en'] || {};

        modalText.querySelectorAll('[data-i18n]').forEach(element => {
            const key = element.dataset.i18n;
            if (dictionary[key]) element.textContent = dictionary[key];
        });

        modalText.querySelectorAll('[data-i18n-html]').forEach(element => {
            const key = element.dataset.i18nHtml;
            if (dictionary[key]) element.innerHTML = dictionary[key];
        });
    }

    function initGallery() {
        const slider = modalMedia.querySelector('.media-slider');
        if (slider) {
            const slides = slider.querySelectorAll('.slide');
            const prevBtn = slider.querySelector('.slider-arrow.prev');
            const nextBtn = slider.querySelector('.slider-arrow.next');
            const currentCounter = slider.querySelector('.current-slide');
            const totalCounter = slider.querySelector('.total-slides');

            if (slides.length <= 1) {
                if (prevBtn) prevBtn.style.display = 'none';
                if (nextBtn) nextBtn.style.display = 'none';
                if (slider.querySelector('.slider-counter')) {
                    slider.querySelector('.slider-counter').style.display = 'none';
                }
            } else {
                let currentIndex = 0;
                if (totalCounter) totalCounter.textContent = slides.length;

                function showSlide(index) {
                    if (index < 0) {
                        currentIndex = slides.length - 1;
                    } else if (index >= slides.length) {
                        currentIndex = 0;
                    } else {
                        currentIndex = index;
                    }

                    slides.forEach((slide, i) => {
                        slide.classList.toggle('active', i === currentIndex);
                    });

                    if (currentCounter) {
                        currentCounter.textContent = currentIndex + 1;
                    }
                }

                if (prevBtn) {
                    prevBtn.addEventListener('click', function(e) {
                        e.stopPropagation();
                        showSlide(currentIndex - 1);
                    });
                }

                if (nextBtn) {
                    nextBtn.addEventListener('click', function(e) {
                        e.stopPropagation();
                        showSlide(currentIndex + 1);
                    });
                }
            }
        }

        const galleryImages = modalMedia.querySelectorAll('.gallery img, .media-slider .slide img');
        
        galleryImages.forEach(img => {
            img.addEventListener('click', function() {
                const lightbox = document.createElement('div');
                lightbox.className = 'lightbox';
                lightbox.style.cssText = `
                    position: fixed;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    background: rgba(0, 0, 0, 0.95);
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    z-index: 2000;
                    cursor: pointer;
                    animation: fadeIn 0.3s ease;
                `;

                const enlargedImg = img.cloneNode();
                enlargedImg.style.cssText = `
                    max-width: 90%;
                    max-height: 90%;
                    object-fit: contain;
                    border-radius: 12px;
                `;

                lightbox.appendChild(enlargedImg);
                document.body.appendChild(lightbox);

                lightbox.addEventListener('click', function() {
                    lightbox.style.animation = 'fadeOut 0.3s ease';
                    setTimeout(() => {
                        document.body.removeChild(lightbox);
                    }, 300);
                });
            });
        });
    }

    const style = document.createElement('style');
    style.textContent = `
        @keyframes fadeOut {
            from { opacity: 1; }
            to { opacity: 0; }
        }
    `;
    document.head.appendChild(style);

    document.addEventListener('languageChanged', applyTranslationsToCards);
});

function applyTranslationsToCards() {
    const currentLanguage = localStorage.getItem("portfolio-language") || "en";
    const translations = window.translations || {};
    const dictionary = translations[currentLanguage] || translations['en'] || {};

    document.querySelectorAll('[data-i18n]').forEach(element => {
        const key = element.dataset.i18n;
        if (dictionary[key]) element.textContent = dictionary[key];
    });

    document.querySelectorAll('[data-i18n-html]').forEach(element => {
        const key = element.dataset.i18nHtml;
        if (dictionary[key]) element.innerHTML = dictionary[key];
    });
}
