/* eslint-disable eqeqeq */
/* eslint-disable no-use-before-define */
/* eslint-disable new-cap */
/* eslint-disable no-new */
/* eslint-disable no-undef */
function pathDrawingInPercents(path, percent = 0) {
  const pathToEffect = path;
  const length = path.getTotalLength();
  pathToEffect.style.strokeDasharray = `${length / 100 * percent} ${length}`;
  pathToEffect.closest('svg').style.transform = `rotate(${(360 / 100 * percent) * -1}deg)`;
}

function dqs(selector) {
  return document.querySelector(selector);
}

function dqsA(selector) {
  return document.querySelectorAll(selector);
}

function filterBuildGalleries(objectWithValidFieldsArg, filterSelector, galleriesToFilter) {
  const objectWithValidFields = objectWithValidFieldsArg;
  objectWithValidFields[filterSelector.dataset.buildFilterName] = filterSelector.currentValue;
  /* Проверка совпадения по полям */
  Object.keys(objectWithValidFields).forEach((filterValue) => {
    galleries.forEach((sngGalArg) => {
      const sngGal = sngGalArg;
      if (objectWithValidFields[filterValue] == 'null'
          || sngGal.dataset[filterValue] == objectWithValidFields[filterValue]
      ) {
        sngGal.validCount += 1;
      }
    });
  });
  /* Отрисовка после оопределения параметров */
  galleriesToFilter.forEach((snglGallery, index) => {
    const gallery = snglGallery;
    if (gallery.validCount === Object.keys(objectWithValidFields).length) {
      gallery.style.display = 'flex';
      if (gallery.dataset.isViewed === 'false') {
        const entranceSpeed = 50 * (1 + (index * 0.5));
        // const heightWithMargin = (
        //   gallery.getBoundingClientRect().height
        //   + parseInt(getComputedStyle(gallery).marginBottom, 10));
        const tl = gsap.timeline({ timeScale: 10 });
        tl.set(gallery, { autoAlpha: 0, x: entranceSpeed });
        tl.fromTo(gallery,
          { autoAlpha: 0, x: entranceSpeed },
          { autoAlpha: 1, x: 0, ease: Expo.easeOut });
      }
      gallery.dataset.isViewed = 'true';
    } else {
      const heightWithMargin = (
        gallery.getBoundingClientRect().height
        + parseInt(getComputedStyle(gallery).marginBottom, 10));
      const tl = gsap.timeline({ timeScale: 10 });
      tl.to(gallery, { autoAlpha: 0, x: 50, ease: Expo.easeOut });
      tl.to(gallery, { marginTop: heightWithMargin * -1, ease: Expo.easeOut });
      tl.set(gallery, { display: 'none' }, '+=0.1');
      tl.set(gallery, { marginTop: 0 });

      gallery.dataset.isViewed = 'false';
    }
    gallery.validCount = 0;
  });
}
// function changeImgSrc(img, src, direction = 1) {
//   const image = img;
//   const tl = gsap.timeline();
//   tl.fromTo(image, { autoAlpha: 1, x: 0 },
//     { autoAlpha: 0.3, x: 50 * direction, duration: 0.25 });
//   tl.add(() => { image.src = src; });
//   tl.fromTo(image, { autoAlpha: 0.3, x: -50 * direction, duration: 0.5 },
//     { autoAlpha: 1, x: 0 }, '<');
// }

function clearAndAddImagesForRefreshSlider(links, container) {
  const containerToEdit = container;
  const imagesToRender = links.split('~');
  containerToEdit.innerHTML = '';
  imagesToRender.forEach((imageLink) => {
    const newImage = document.createElement('img');
    newImage.setAttribute('src', imageLink);
    newImage.classList.add('swiper-slide');
    container.append(newImage);
  });
}

function changeTextOnPopup() {
  POPUP_CONFIG.title.textContent = POPUP_CONFIG.title.innerHTML;
  // POPUP_CONFIG.subtitle.textContent = data.dataset.year;
}
function initPopupSlider(param) {
  if (POPUP_CONFIG.swiper !== undefined) {
    // eslint-disable-next-line no-use-before-define
    POPUP_CONFIG.swiper.destroy(false, true);
    // eslint-disable-next-line no-use-before-define
    clearAndAddImagesForRefreshSlider(param.dataset.images, POPUP_CONFIG.navImages.children[0]);
    POPUP_CONFIG.swiper = undefined;
  }
  // eslint-disable-next-line no-use-before-define
  POPUP_CONFIG.swiper = new Swiper(POPUP_CONFIG.navImages, {
    slidesPerView: 1,
    // freeMode: true,
    spaceBetween: 30,
    centeredSlides: true,
    slideToClickedSlide: true,
    navigation: {
      nextEl: dqs('.arrow-next'),
      prevEl: dqs('.arrow-prev'),
    },
    on: {
      init(selfArg) {
        const self = selfArg;
        self.bigView = dqs('[data-swiper-current-img-view]');
        document.querySelector('[data-total]').innerHTML = document.querySelectorAll('.swiper-slide').length;
      },
      activeIndexChange(obj) {
        document.querySelector('[data-current]').innerHTML = obj.activeIndex + 1;
      },
    },
  });
  POPUP_CONFIG.swiper.on('init', () => {});
  POPUP_CONFIG.swiper.on('slideChange', (event) => {
    const evt = event;
    // const direction = (evt.prevIndex < evt.activeIndex) ? 1 : -1;
    // changeImgSrc(evt.bigView, evt.slides[evt.activeIndex].getAttribute('src'), direction);
    evt.prevIndex = evt.activeIndex;
  });
}

/* Перемещение попапа из контейнера с планвным скроллом */
document.body.append(document.querySelector('[data-build-gallery-popup]'));

/* Галереи с фотографиями строительства  */
const galleries = document.querySelectorAll('[data-progress-gallery]');
const $percentBlocks = document.querySelectorAll('[data-percent-block]');
const POPUP_CONFIG = {
  navImages: dqs('[data-swiper-slider]'),
  bigImage: dqs('[data-swiper-big-image]'),
  title: dqs('[data-popup-title]'),
  subtitle: dqs('[data-popup-subtitle]'),
  swiper: undefined,
  currentPopup: undefined,
  filteredPopups: Array.from(galleries),
};

document.querySelectorAll('[data-build-filter-name]').forEach((el) => {
  /* Первичная фильттрация(добавление первой галереи в попап) */
  filterBuildGalleries(buildProgressConfig, el, galleries);
  el.addEventListener('change', () => {
    filterBuildGalleries(buildProgressConfig, el, galleries);
    POPUP_CONFIG.filteredPopups = dqsA('[data-is-viewed*="true"]');
  });
});
initPopupSlider(galleries[0]);

galleries.forEach((galleryWithData) => {
  /* const buildPopup = */
  new showModal({
    $popup: document.querySelector('[data-build-gallery-popup]'),
    $openBtn: galleryWithData,
    $closeBtn: document.querySelector('[data-build-popup-close]'),
    animationIn: animationPopapIn,
    animationOut: animationPopapOut,
    // attrParrentNode: '[data-build-popup="' + galleryWithData.dataset.buildPopup + '"]',
    attrParrentNode: `[data-build-popup="${galleryWithData.dataset.buildPopup}"]`,
    onOpenCompleteCallback() {
      initPopupSlider(galleryWithData);
      changeTextOnPopup(galleryWithData);
      POPUP_CONFIG.currentPopup = galleryWithData;
      document.querySelector('[data-build-gallery-popup] [data-build-popup-close]').setAttribute('data-build-popup', galleryWithData.dataset.buildPopup);
    },
  });
});

$percentBlocks.forEach((block) => {
  const svg = block.querySelector('circle');
  pathDrawingInPercents(svg, +block.dataset.value);
});
