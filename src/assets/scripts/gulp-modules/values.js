
/* eslint-disable no-unused-expressions */
/* eslint-disable no-undef */
const slider = document.querySelector('[data-slider]');
const unactiveWidth = getComputedStyle(slider.querySelectorAll('.slide')[1]).width;
const changeEasing = new BezierEasing(0.59, 0, 0.39, 1);
// const changeEasing = new BezierEasing(.66,0,.39,.99);
const changeDuration = 1.5;
slider.style.setProperty('--js-transition', `${changeDuration}s`);
slider.querySelectorAll('.slide').forEach((block) => {
  block.addEventListener('click', () => {
    const activeSlide = document.querySelector('.active');
    const activeWidth = getComputedStyle(activeSlide).width;
    const tl = gsap.timeline();
    tl.set(slider, { pointerEvents: 'none' });
    tl.add(() => {
      block.classList.add('active');
    });
    tl.fromTo(activeSlide,
      { width: activeWidth },
      { width: unactiveWidth, ease: changeEasing, duration: changeDuration });
    tl.fromTo(activeSlide.querySelector('img'), { scale: 1 }, { scale: 1.1, ease: changeEasing, duration: changeDuration }, '<');
    tl.fromTo(block.querySelector('img'), { scale: 1.1 }, { scale: 1, ease: changeEasing, duration: changeDuration }, '<');
    tl.fromTo(block,
      { width: unactiveWidth },
      { width: activeWidth, ease: changeEasing, duration: changeDuration },
      '<');
    tl.add(() => {
      activeSlide.classList.remove('active');
    }, '<');
    tl.set(slider, { pointerEvents: 'all' });
  });
});
