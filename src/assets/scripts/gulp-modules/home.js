/* eslint-disable no-undef */
locoScroll.on('scroll', () => {
  // eslint-disable-next-line no-unused-expressions
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

/* eslint-disable no-undef */
const mainScreenTransition = new BezierEasing(0.75, 0.01, 0.31, 1);
const swiper = new Swiper('.swiper-container', {
  slidesPerView: 1,
  centeredSlides: true,
  speed: 2000,
  navigation: {
    nextEl: document.querySelector('[data-next]'),
    prevEl: document.querySelector('[data-prev]'),
  },
  effect: 'fade',
  on: {
    init(some) {
      const config = some;
      config.transitionDuration = 2;
    },
  },
});


swiper.on('beforeTransitionStart', (some) => {
  const tl = gsap.timeline();
  tl.fromTo(some.imagesToLoad[some.activeIndex], { scale: 1.1 }, {
    scale: 1, duration: some.transitionDuration, ease: mainScreenTransition,
  });
  tl.fromTo(some.imagesToLoad[some.previousIndex], { scale: 1 }, {
    scale: 1.1, duration: some.transitionDuration, ease: mainScreenTransition,
  }, '<');
  // console.log(some.activeIndex);
  // console.log(some.previousIndex);
});
document.querySelector('.ms__slider-wrap').addEventListener('click', () => {
  // document.querySelector('')
});

const quoteCubes = document.querySelectorAll('[data-cubes-anim]');
// const cubesEasing = new BezierEasing(0.42,0,0.58,1);
const cubesEasing = new BezierEasing(0.48, 1, 0.5, 1);
quoteCubes.forEach((block) => {
  gsap.set(block.querySelectorAll('[data-from-right]'), { x: '100%', scale: 0.95 });
  gsap.set(block.querySelectorAll('[data-from-top]'), { y: '-100%', scale: 0.95 });
  gsap.set(block.querySelectorAll('[data-from-left]'), { x: '-100%', scale: 0.95 });
  gsap.set(block.querySelectorAll('[data-from-bottom]'), { y: '100%', scale: 0.95 });
  const tl = gsap.timeline({
    paused: true,
    timeScale: 0.5,
    scrollTrigger: {
      triggerHook: 0.5,
      trigger: block,
      end: '+=50%',
    },
  });
  tl.to(block.querySelectorAll('[data-cubes]'), {
    x: 0,
    y: 0,
    // ease: cubesEasing,
    duration: 0.95,
    scale: 1,
    stagger: block.dataset.stagger !== undefined ? 0.02 : 0,
    ease: cubesEasing,
  });
});


const paralaxSections = document.querySelectorAll('[data-home-paralax]');

paralaxSections.forEach((section) => {
  gsap.set(section, { backgroundPositionY: -50 });
  ScrollTrigger.create({
    triggerHook: 'center',
    trigger: section,
    end: 'bottom',
    onEnter: () => {},
    onUpdate: (self) => {
      console.log('efefef');
      gsap.to(section, { backgroundPositionY: `${(self.progress * 100) - 50}px` });
    },
  });
});
