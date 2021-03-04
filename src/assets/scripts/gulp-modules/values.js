
/* eslint-disable no-unused-expressions */
/* eslint-disable no-undef */
const slider = document.querySelector('[data-slider]');
const unactiveWidth = getComputedStyle(slider.querySelectorAll('.slide')[1]).width;
const changeEasing = new BezierEasing(0.79, 0.01, 0.32, 0.99);
// const changeEasing = new BezierEasing(.66,0,.39,.99);
const changeDuration = 1.25;
slider.style.setProperty('--js-transition', `${changeDuration}s`);

function animateSlideTransfer(block) {
  const activeSlide = block.parentElement.querySelector('.active');
  const activeWidth = getComputedStyle(activeSlide).width;
  const tl = gsap.timeline();
  tl.set(slider, { pointerEvents: 'none' });
  tl.add(() => {
    block.classList.add('active');
  });
  tl.fromTo(activeSlide,
    { width: activeWidth },
    { width: unactiveWidth, ease: changeEasing, duration: changeDuration });
  tl.fromTo(activeSlide.querySelectorAll('.slide__content>*'),
    { autoAlpha: 1, y: 0 },
    { autoAlpha: 0, y: -20, stagger: 0.1 }, '<');
  tl.fromTo(activeSlide.querySelector('img'),
    { scale: 1 },
    { scale: 1.1, ease: changeEasing, duration: changeDuration }, '<');
  tl.fromTo(block.querySelector('img'),
    { scale: 1.1 },
    { scale: 1, ease: changeEasing, duration: changeDuration }, '<');
  tl.fromTo(block,
    { width: unactiveWidth },
    { width: activeWidth, ease: changeEasing, duration: changeDuration },
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
function configSlideBehavior(block) {
  block.addEventListener('click', () => {
    animateSlideTransfer(block);
    clearInterval(slider.slideAutoPlay);
  });
}

slider.querySelectorAll('.slide').forEach(configSlideBehavior);

let indexSl = 1;
slider.slideAutoPlay = setInterval(() => {
  animateSlideTransfer(slider.querySelectorAll('.slide')[indexSl]);
  // console.log(indexSl);
  indexSl === slider.querySelectorAll('.slide').length - 1 ? indexSl = 0 : indexSl += 1;
}, 5000);
