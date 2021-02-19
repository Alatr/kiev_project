
// eslint-disable-next-line no-undef
const swiper = new Swiper('.swiper-container', {
  navigation: {
    nextEl: document.querySelector('[data-next]'),
    prevEl: document.querySelector('[data-prev]'),
  },
  effect: 'cube',
  speed: 1500,
  preloadImages: false,
  watchSlidesVisibility: true,
  // Enable lazy loading
  lazy: {
    loadPrevNext: true,
  },
  grabCursor: true,
  cubeEffect: {
    shadow: false,
    slideShadows: true,
    shadowOffset: 20,
    shadowScale: 0.94,
  },
  on: {
    init: () => {
      document.querySelector('[data-total]').innerHTML = document.querySelectorAll('.swiper-slide').length;
    },
  },
});
swiper.on('activeIndexChange', (obj) => {
  document.querySelector('[data-current]').innerHTML = obj.activeIndex + 1;
});
