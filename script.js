// Milestones Slides

window.addEventListener('load', () => {
  const slides = document.querySelector('.milestones__slides--script');
  const slidesWrapper = document.querySelector(
    '.milestones__slides-wrapper--script',
  );
  const prevButton = document.querySelector(
    '.milestones__navigation-button-prev--script',
  );
  const nextButton = document.querySelector(
    '.milestones__navigation-button-next--script',
  );
  const paginationElements = document.querySelectorAll(
    '.milestones__pagination-element--script',
  );
  const lastSlide = paginationElements.length - 1;
  let currentSlide = 0;
  let width = 0;
  let startX = 0;
  let endX = 0;

  const updateSlidePosition = () => {
    slides.style.transform = `translateX(-${width * currentSlide}px)`;
  };

  const updateSlidesWidth = () => {
    width = slidesWrapper.offsetWidth;
    updateSlidePosition();
  };

  const togglePaginationActiveClass = (index) => {
    paginationElements[index].classList.toggle(
      'milestones__pagination-element--active',
    );
  };

  const updateNavigationButtons = () => {
    prevButton.classList.toggle(
      'milestones__navigation-button--disabled',
      currentSlide === 0,
    );
    nextButton.classList.toggle(
      'milestones__navigation-button--disabled',
      currentSlide === lastSlide,
    );
  };

  const moveToSlide = (newSlide) => {
    togglePaginationActiveClass(currentSlide);
    currentSlide = newSlide;
    slides.style.transition = '0.6s';
    updateSlidePosition();
    setTimeout(() => {
      slides.style.transition = '0s';
    }, 1000);
    togglePaginationActiveClass(currentSlide);
    updateNavigationButtons();
  };

  const goToNextSlide = () => {
    if (currentSlide < lastSlide) {
      moveToSlide(currentSlide + 1);
    }
  };

  const goToPrevSlide = () => {
    if (currentSlide > 0) {
      moveToSlide(currentSlide - 1);
    }
  };

  slidesWrapper.addEventListener(
    'touchstart',
    (e) => {
      startX = e.touches[0].clientX;
    },
    { passive: true },
  );

  slidesWrapper.addEventListener(
    'touchmove',
    (e) => {
      endX = e.touches[0].clientX;
    },
    { passive: true },
  );

  slidesWrapper.addEventListener('touchend', () => {
    const swipeDistance = endX - startX;
    const minSwipeDistance = 50;

    if (Math.abs(swipeDistance) > minSwipeDistance) {
      if (swipeDistance < 0) {
        goToNextSlide();
      } else {
        goToPrevSlide();
      }
    }
  });

  const initSlides = () => {
    updateSlidesWidth();
    window.addEventListener('resize', updateSlidesWidth);
    nextButton.addEventListener('click', goToNextSlide);
    prevButton.addEventListener('click', goToPrevSlide);
  };

  initSlides();
});

//
