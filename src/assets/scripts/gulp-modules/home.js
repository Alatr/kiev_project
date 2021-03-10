
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
      gsap.to(section, { backgroundPositionY: `${(self.progress * 100) - 50}px` });
    },
  });
});

const accordeons = document.querySelectorAll('[data-accordeon]');
accordeons.forEach((accordeon) => {
  const openButton = accordeon.querySelector('svg');
  const innerContent = accordeon.querySelector('[class*="inner"]');
  const hiddenWhileOpened = accordeon.querySelector('[data-hidden-while-opened]');
  gsap.set(hiddenWhileOpened, { transformOrigin: 'center' });
  openButton.addEventListener('click', () => {
    accordeon.classList.toggle('opened');
    if (accordeon.classList.contains('opened')) {
      gsap.to(hiddenWhileOpened, { scaleY: 0 });
      gsap.fromTo(innerContent, { height: 0 }, { height: innerContent.scrollHeight });
    } else {
      gsap.to(hiddenWhileOpened, { scaleY: 1 });
      gsap.fromTo(innerContent, { height: innerContent.scrollHeight }, { height: 0 });
    }
    setTimeout(() => {
      locoScroll.update();
    }, 1000);
  });
});

function homePageValuesSlider() {
/* eslint-disable no-unused-expressions */
/* eslint-disable no-undef */

  const slider = document.querySelector('[data-slider]');
  const unactiveWidth = getComputedStyle(slider.querySelectorAll('.slide')[1]).width;
  console.log(slider.querySelectorAll('.slide')[1].getBoundingClientRect());
  const unactiveHeight = getComputedStyle(slider.querySelectorAll('.slide')[1]).height;
  const transitionEasing = new BezierEasing(0.79, 0.01, 0.32, 0.99);
  const transitionDuration = document.documentElement.clientWidth > 575 ? 1.25 : 0.75;
  slider.style.setProperty('--js-transition', `${transitionDuration}s`);
  slider.style.setProperty('--slides-count', slider.querySelectorAll('.slide').length);
  function animateSlideTransfer(slide) {
    const activeSlide = slide.parentElement.querySelector('.active');
    const activeWidth = getComputedStyle(activeSlide).width;
    const tl = gsap.timeline();
    tl.set(slider, { pointerEvents: 'none' });
    tl.add(() => {
      slide.classList.add('active');
    });
    tl.fromTo(activeSlide,
      { width: activeWidth },
      { width: unactiveWidth, ease: transitionEasing, duration: transitionDuration });
    tl.fromTo(activeSlide.querySelectorAll('.slide__content>*'),
      { autoAlpha: 1, y: 0 },
      { autoAlpha: 0, y: -20, stagger: 0.1 }, '<');
    tl.fromTo(activeSlide.querySelector('img'),
      { scale: 1 },
      { scale: 1.1, ease: transitionEasing, duration: transitionDuration }, '<');
    tl.fromTo(slide.querySelector('img'),
      { scale: 1.1 },
      { scale: 1, ease: transitionEasing, duration: transitionDuration }, '<');
    tl.fromTo(slide,
      { width: unactiveWidth },
      { width: activeWidth, ease: transitionEasing, duration: transitionDuration },
      '<');
    tl.add(() => {
      activeSlide.classList.remove('active');
    }, '<');
    tl.fromTo(slide.querySelectorAll('.slide__content>*'),
      { autoAlpha: 0, y: -20 },
      { autoAlpha: 1, y: 0, stagger: 0.1 },
      '-=0.5');
    tl.set(slider, { pointerEvents: 'all' });
  }

  function animateSlideTransferHeight(block) {
    const activeSlide = block.parentElement.querySelector('.active');
    const activeHeight = getComputedStyle(activeSlide).height;
    const tl = gsap.timeline();
    tl.set(slider, { pointerEvents: 'none' });
    tl.add(() => {
      block.classList.add('active');
    });
    tl.fromTo(activeSlide,
      { height: activeHeight },
      { height: unactiveHeight, ease: transitionEasing, duration: transitionDuration });
    tl.fromTo(activeSlide.querySelectorAll('.slide__content>*'),
      { autoAlpha: 1, y: 0 },
      { autoAlpha: 0, y: -20, stagger: 0.1 }, '<');
    tl.fromTo(activeSlide.querySelector('img'),
      { scale: 1 },
      { scale: 1.1, ease: transitionEasing, duration: transitionDuration }, '<');
    tl.fromTo(block.querySelector('img'),
      { scale: 1.1 },
      { scale: 1, ease: transitionEasing, duration: transitionDuration }, '<');
    tl.fromTo(block,
      { height: unactiveHeight },
      { height: activeHeight, ease: transitionEasing, duration: transitionDuration },
      '<');
    tl.add(() => {
      activeSlide.classList.remove('active');
    }, '<');
    tl.fromTo(block.querySelectorAll('.slide__content>*'),
      { autoAlpha: 0, y: -20 },
      { autoAlpha: 1, y: 0, stagger: 0.1 },
      '-=0.5');
    tl.set(slider, { pointerEvents: 'all' });
  }
  function configSlideBehavior(slide) {
    slide.addEventListener('click', () => {
      (document.documentElement.clientWidth > 768)
        ? animateSlideTransfer(slide)
        : animateSlideTransferHeight(slide);

      clearInterval(slider.slideAutoPlay);
    });
  }

  slider.querySelectorAll('.slide').forEach(configSlideBehavior);

  let indexSl = 1;
  slider.slideAutoPlay = setInterval(() => {
    (document.documentElement.clientWidth > 768)
      ? animateSlideTransfer(slider.querySelectorAll('.slide')[indexSl])
      : animateSlideTransferHeight(slider.querySelectorAll('.slide')[indexSl]);
    // console.log(indexSl);
    indexSl === slider.querySelectorAll('.slide').length - 1 ? indexSl = 0 : indexSl += 1;
  }, 5000);


  /* ПОдмена картинок на мобильной версии если такие есть */
  if (document.documentElement.clientWidth < 768) {
    document.querySelectorAll('[data-mob]').forEach((mobImg) => {
      const img = mobImg;
      img.src = img.dataset.mob;
    });
  }
}
window.addEventListener('load', () => { homePageValuesSlider(); });
