import LocomotiveScroll from 'locomotive-scroll';
import i18next from 'i18next';

import gsap from 'gsap';

import * as yup from 'yup';
import FormMonster from '../../pug/components/form/form';
import ShowModal from '../../pug/components/popup/popup';
import SexyInput from '../../pug/components/input/input';
import handleSeoBlock from '../../pug/components/seo-block/seo-block';

global.gsap = gsap;

/** ******************************* */
/*
 * smooth scroll start
 */

/* eslint-disable-next-line */
window.locoScroll = new LocomotiveScroll({
  el: document.querySelector('[data-scroll-container]'),
  smooth: true,
  smoothMobile: false,
  inertia: 1.1,
});

/*
 * smooth scroll end
 */
/** ******************************* */

/* Seo block */

const seoBlocks = document.querySelectorAll('[data-seo-text]');
seoBlocks.forEach(handleSeoBlock);

/* Seo block END */

/** ******************************* */
/*
 * form handlers start
 */


const forms = [
  '[data-home-contact]',
];

forms.forEach((form) => {
  const $form = document.querySelector(form);


  if ($form) {
    /* eslint-disable */
    new FormMonster({
      /* eslint-enable */
      elements: {
        $form,
        showSuccessMessage: false,
        successAction: 'toster',
        $btnSubmit: $form.querySelector('[data-btn-submit]'),
        fields: {
          name: {
            inputWrapper: new SexyInput({ animation: 'none', $field: $form.querySelector('[data-field-name]') }),
            rule: yup.string().required(i18next.t('required')).trim(),
            defaultMessage: i18next.t('name'),
            valid: false,
            error: [],
          },

          phone: {
            inputWrapper: new SexyInput({ animation: 'none', $field: $form.querySelector('[data-field-phone]'), typeInput: 'phone' }),
            rule: yup
              .string()
              .required(i18next.t('required'))
              .min(19, i18next.t('field_too_short', { cnt: 19 - 7 })),

            defaultMessage: i18next.t('phone'),
            valid: false,
            error: [],
          },
        },

      },
    });

    $form.querySelector('.js-mask-absolute').addEventListener('click', () => {
      console.log($form);
      $form.querySelector('[name="phone"]').focus();
    }, false);
  }
});


// console.log(document.querySelector('[name="phone"]'));
/*
 * form handlers end
 */
/** ******************************* */
/*
 * popup menu start
 */

/*
 *  start in
 */
function animationPopapIn(settings) {
  // gsap.set([], {autoAlpha:0});
  const obj = { ...settings, paused: true };
  const tl = gsap.timeline(obj);
  tl.fromTo(this.$popup, 0.5, { autoAlpha: 0 },
    {
      autoAlpha: 1,
      immediateRender: false,
      duration: 0.5,
    });

  return tl;
}
/*
 *  end in
 */
/*
 *  start Out
 */
function animationPopapOut(settings) {
  // gsap.set([], {autoAlpha:0});
  const obj = { ...settings, paused: true };
  const tl = gsap.timeline(obj);
  tl.fromTo(
    this.$popup,
    0.25,
    { autoAlpha: 1 },
    {
      autoAlpha: 0,
      clearProps: 'all',
      immediateRender: false,
      duration: 0.1,
    },
  );
  /*  */

  return tl;
}
/*
 *  end Out
 */
/** ******************************* */

/*  */
/*  */

/*  */
/*  */
/*  */
const popupBlockBtnOpen = document.querySelector('[data-call-popup-btn]');
const popupBlockBtnClose = document.querySelector('[data-call-popup-close]');
const popupBlock = document.querySelector('[data-call-popup-block]');
/*  */
/* eslint-disable-next-line */
const callPopap = new ShowModal({
  $popup: popupBlock,
  $openBtn: popupBlockBtnOpen,
  $closeBtn: popupBlockBtnClose,
  animationIn: animationPopapIn,
  animationOut: animationPopapOut,
  attrParrentNode: '[data-parrent-node-popup]',
  onOpenCompleteCallback: () => {
    console.log(this.$popup);
    // this.$popup.dataset.opened = true;
  },
  onCloseCompleteCallback: () => {
    // this.$popup.dataset.opened = false;
    // console.log('rgrg');
  },
});
/*  */
/*  */
/*  */
const menuBlockBtnOpen = document.querySelector('[data-menu-btn]');
const menuBlockBtnClose = document.querySelector('[data-menu-popup-close]');
const menuBlock = document.querySelector('[data-menu-popup-block]');
/*  */
const changeTextNicely = (elArg, text) => {
  const element = elArg;
  const tl = gsap.timeline();
  tl.fromTo(element, { y: 0, autoAlpha: 1 }, { y: 10, autoAlpha: 0 });
  tl.add(() => { element.innerHTML = text; });
  tl.fromTo(element, { y: -10, autoAlpha: 0 }, { y: 0, autoAlpha: 1 });
  tl.duration(0.5).play();
};

const handleMenuOpenButton = (argInstance) => {
  const instance = argInstance;
  console.log(instance);
  const tl = gsap.timeline({ duration: 0.5, paused: true });
  const reverseTl = gsap.timeline({ duration: 0.5, paused: true });
  tl.to('.line__3', { scaleX: 0 });
  tl.to('.line__1', { rotate: -45, y: 6, width: 24 });
  tl.to('.line__2', { rotate: 45, width: 24 }, '<');
  reverseTl.to('.line__1', { rotate: 0, y: 0, width: 17 });
  reverseTl.to('.line__2', { rotate: 0, width: 17 }, '<');
  reverseTl.to('.line__3', { scaleX: 1 });
  if (instance.$popup.dataset.opened === 'true') {
    changeTextNicely(instance.$openBtn.querySelector('.header-menu__text'), 'Закрити');
    tl.duration(0.5).play();
  } else {
    changeTextNicely(instance.$openBtn.querySelector('.header-menu__text'), 'Меню');
    reverseTl.duration(0.5).play();
  }
};

/* eslint-disable-next-line */
const menuPopap = new ShowModal({
  $popup: menuBlock,
  $openBtn: menuBlockBtnOpen,
  $closeBtn: menuBlockBtnClose,
  animationIn: animationPopapIn,
  animationOut: animationPopapOut,
  attrParrentNode: '[data-parrent-node-menu]',
  onOpenCompleteCallback: () => {
    const self = menuPopap;
    self.$popup.dataset.opened = true;
    handleMenuOpenButton(self);
    // this.$popup.dataset.opened = true;
  },
  onCloseCompleteCallback: () => {
    const self = menuPopap;
    self.$popup.dataset.opened = false;
    handleMenuOpenButton(self);
    // this.$popup.dataset.opened = false;
    // console.log('rgrg');
  },
});
document.querySelector('[data-menu-btn]').click();
