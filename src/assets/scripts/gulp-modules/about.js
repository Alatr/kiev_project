
// eslint-disable-next-line no-undef
const aboutSlider = new Swiper('.swiper-container', {
  speed: 1000,
  navigation: {
    nextEl: '[data-next]',
    prevEl: '[data-prev]',
  },
  effect: 'fade',
  fadeEffect: {
    crossFade: true,
  },
});
aboutSlider.init();
aboutSlider.on('beforeTransitionStart', () => {
  // eslint-disable-next-line no-undef
  gsap.fromTo('.swiper-container__bg', { x: '-120%' }, { x: '120%', duration: 1.5 });
});
