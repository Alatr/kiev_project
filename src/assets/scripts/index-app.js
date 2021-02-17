import LocomotiveScroll from 'locomotive-scroll';
import i18next from 'i18next';

import gsap from 'gsap';

import * as yup from 'yup';
import FormMonster from '../../pug/components/form/form';
import ShowModal from '../../pug/components/popup/popup';
import SexyInput from '../../pug/components/input/input';

global.gsap = gsap;

console.log(123, global);

/** ******************************* */
/*
 * smooth scroll start
 */

/* eslint-disable-next-line */
const locoScroll = new LocomotiveScroll({
  el: document.querySelector('[data-scroll-container]'),
  smooth: true,
  smoothMobile: false,
  inertia: 1.1,
});

/*
 * smooth scroll end
 */
/** ******************************* */
/** ******************************* */
/*
 * form handlers start
 */
const $form = document.querySelector('[data-home-contact]');

/* eslint-disable-next-line */
const formHome = new FormMonster({
  elements: {
    $form,
    $btnSubmit: $form.querySelector('[data-btn-submit]'),
    fields: {
      name: {
        inputWrapper: new SexyInput({ $field: $form.querySelector('[data-field-name]') }),
        rule: yup
          .string()
          .required(i18next.t('required'))
          .trim(),
        defaultMessage: i18next.t('name'),
        valid: false,
        error: [],
      },

      phone: {
        inputWrapper: new SexyInput({ $field: $form.querySelector('[data-field-phone]') }),
        rule: yup
          .string()
          .matches(/(^[0-9]+$)/, i18next.t('only_number'))
          .required(i18next.t('required'))
          .min(6, i18next.t('field_too_short', { cnt: 6 }))
          .max(15, i18next.t('field_too_long', { cnt: 15 })),

        defaultMessage: i18next.t('phone'),
        valid: false,
        error: [],
      },
    },
  },
});
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
  tl.fromTo(this.$popup, 1, { autoAlpha: 0 }, { autoAlpha: 1, immediateRender: false });

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
    1,
    { autoAlpha: 1 },
    { autoAlpha: 0, clearProps: 'all', immediateRender: false },
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
});
/*  */
/*  */
/*  */
const menuBlockBtnOpen = document.querySelector('[data-menu-btn]');
const menuBlockBtnClose = document.querySelector('[data-menu-popup-close]');
const menuBlock = document.querySelector('[data-menu-popup-block]');
/*  */
/* eslint-disable-next-line */
const menuPopap = new ShowModal({
  $popup: menuBlock,
  $openBtn: menuBlockBtnOpen,
  $closeBtn: menuBlockBtnClose,
  animationIn: animationPopapIn,
  animationOut: animationPopapOut,
  attrParrentNode: '[data-parrent-node-menu]',
});
