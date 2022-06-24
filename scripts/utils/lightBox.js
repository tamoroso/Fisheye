let slides = [];
let index = 0;

const getCurrentIndex = (id) => {
  const slide = slides.filter((slide) => parseInt(slide.id) === id)[0];
  return slides.indexOf(slide);
};

const showSlide = (element) => {
  slides.forEach((slide) => (slide.style.display = "none"));
  element.style.display = "flex";
};

const prevNextSlide = (n) => {
  const lastIndex = slides.length - 1;
  const prevNextIndex = index + n;
  index =
    prevNextIndex > lastIndex
      ? 0
      : prevNextIndex < 0
      ? lastIndex
      : prevNextIndex;
  showSlide(slides[index]);
};

const openLightBox = (id) => {
  const { main, lightBox, body, closeButtonLightBox } = getDomElement();
  main.ariaHidden = true;
  lightBox.ariaHidden = false;
  let top = Math.round(window.pageYOffset * 10) / 10;
  lightBox.style.cssText = `display: flex; top: ${top}px;`;
  body.style.overflow = "hidden";

  //init lightBox on clicked slide
  slides = [...document.getElementsByClassName("lightbox-slides")];
  index = getCurrentIndex(id);
  showSlide(slides[index]);
  closeButtonLightBox.focus();
};

const closeLightBox = () => {
  const { main, lightBox, body, mediaSection } = getDomElement();
  const currentSlide = slides[index].id;
  const currentMedia = [...mediaSection]
    .filter((el) => el.id === currentSlide)[0]
    .querySelector("img, video");
  currentMedia.focus();

  main.ariaHidden = false;
  lightBox.ariaHidden = true;
  lightBox.removeAttribute("style");
  body.removeAttribute("style");
};

LIGHTBOX_CONTROLS.forEach((event) =>
  setEventListener(event.on, event.eventType, event.callback)
);
