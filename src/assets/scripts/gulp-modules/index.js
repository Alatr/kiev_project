
/*
 *  start in
 */
// eslint-disable-next-line no-unused-vars
function animationPopapIn(settings) {
  // gsap.set([], {autoAlpha:0});
  const obj = { ...settings, paused: true };
  // eslint-disable-next-line no-undef
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
// eslint-disable-next-line no-unused-vars
function animationPopapOut(settings) {
  // gsap.set([], {autoAlpha:0});
  const obj = { ...settings, paused: true };
  // eslint-disable-next-line no-undef
  const tl = gsap.timeline(obj);
  tl.fromTo(this.$popup, 1, { autoAlpha: 1 }, { autoAlpha: 0, clearProps: 'all', immediateRender: false });
  return tl;
}
/*
 *  end Out
 */
// eslint-disable-next-line no-unused-vars
class showModal {
  constructor(obj) {
    this.$popup = obj.$popup;
    this.$openBtn = obj.$openBtn;
    this.$closeBtn = obj.$closeBtn;
    this.attrParrentNode = obj.attrParrentNode;
    this.status = false;
    this.animationIn = obj.animationIn;
    this.animationOut = obj.animationOut;
    this.onOpenCompleteCallback = obj.onOpenCompleteCallback || function some() {};
    this.onCloseCompleteCallback = obj.onCloseCompleteCallback || function some() {};
    this.$body = document.querySelector('body');
    this.init();
  }


  get isOpen() {
    return this.status;
  }

  enableButton(butArg) {
    const btn = butArg;
    btn.disabled = false;
  }

  disableButton(butArg) {
    const btn = butArg;
    btn.disabled = true;
  }

  open() {
    this.onOpenCompleteCallback();
    const onComplete = () => {
      this.enableButton(this.$openBtn);
      this.status = true;
    };
    const onStart = () => this.disableButton(this.$openBtn);
    this.animationIn({ onComplete, onStart }).play();
  }

  close() {
    this.onCloseCompleteCallback();
    const onComplete = () => {
      this.enableButton(this.$openBtn);
      this.status = false;
    };
    const onStart = () => this.disableButton(this.$openBtn);
    this.animationOut({ onComplete, onStart }).play();
  }

  toggle() {
    if (this.status) {
      this.$body.classList.remove('modal-active');
      this.close();
    } else {
      this.$body.classList.add('modal-active');
      this.open();
    }
  }

  listeners() {
    const self = this;
    this.$body.addEventListener('click', (evt) => {
      if (evt.target.closest(self.attrParrentNode) != null && !self.$openBtn.disabled) {
        evt.stopImmediatePropagation();
        self.toggle();
      }
    });
  }

  init() {
    this.listeners();
  }
}
