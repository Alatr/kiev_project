/* eslint-disable no-unused-expressions */
/* eslint-disable no-undef */

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

locoScroll.stop();
document.querySelector('.page__content').removeAttribute('data-scroll-section');
document.querySelectorAll('.page-part').forEach((el) => { el.setAttribute('data-scroll-section', ''); });
locoScroll.start();
locoScroll.update();
locoScroll.on('scroll', () => {
  ScrollTrigger.update;
});

ScrollTrigger.scrollerProxy(document.body, {
  scrollTop(value) {
    return (arguments.length
      ? locoScroll.scrollTo(value, 0, 0)
      : locoScroll.scroll.instance.scroll.y);
  }, // we don't have to define a scrollLeft because we're only scrolling vertically.
  getBoundingClientRect() {
    return {
      top: 0,
      left: 0,
      width: window.innerWidth,
      height: window.innerHeight,
    };
  },
  pinType: document.body.style.transform ? 'transform' : 'fixed',
});
ScrollTrigger.addEventListener('fixed', () => locoScroll.update());

ScrollTrigger.refresh();
gsap.registerPlugin(ScrollTrigger);


const $verticalDecorsBlocks = document.querySelectorAll('.subtitle-with-vertical-decor');
$verticalDecorsBlocks.forEach((block) => {
  ScrollTrigger.create({
    triggerHook: 'center',
    trigger: block,
    end: 'bottom',
    onEnter: () => {},
    onUpdate: (self) => {
      gsap.to(block, { backgroundPositionY: self.progress * 30 * self.direction * -1 });
    },
  });
});
const $blockRenovationBG = document.querySelectorAll('.about-block-renovations__bg');
$blockRenovationBG.forEach((block) => {
  const thisBlock = block;
  thisBlock.style.overflow = 'hidden';
  const img = thisBlock.querySelector('img');
  gsap.set(img, { scale: 1.15 });
  ScrollTrigger.create({
    triggerHook: 'center',
    trigger: thisBlock,
    end: 'bottom',
    onEnter: () => {},
    onUpdate: (self) => {
      if (self.progress < 0.5) gsap.to(img, { scale: 1.15 + ((self.progress * 0.25) * -1) });
    },
  });
});


const quote = document.querySelectorAll('[data-cubes-anim]');
const cubesEasing = new BezierEasing(0.47, 0.01, 0.82, 0.34);
quote.forEach((block) => {
  // block.style.overflow = 'hidden';
  // const bg = block.querySelector('[data-cubes-anim]');
  gsap.set('[data-from-right-bottom]', { x: '100%', y: '100%' });
  gsap.set('[data-from-left-bottom]', { x: '-100%', y: '100%' });
  gsap.set('[data-from-left-top]', { x: '-100%', y: '-100%' });
  gsap.set('[data-from-right-top]', { x: '100%', y: '-100%' });
  const tl = gsap.timeline({
    paused: true,
    timeScale: 0.5,
    scrollTrigger: {
      triggerHook: 0.5,
      trigger: block,
      end: '+=50%',
    },
  });
  tl.to('[data-cubes]', {
    x: 0,
    y: 0,
    ease: cubesEasing,
    duration: 1,
  });
});


const quoteImage = document.querySelectorAll('[data-quote-image]');
quoteImage.forEach((block) => {
  gsap.from(block, {
    scrollTrigger: block, // start the animation when ".box" enters the viewport (once)
    scale: 0.8,
    duration: 1.6,
  });
});

const blockImg = document.querySelectorAll('[data-block-img]');

blockImg.forEach((block) => {
  gsap.from(block, {
    scrollTrigger: block, // start the animation when ".box" enters the viewport (once)
    scale: 1.1,
    duration: 1.6,
  });
});
