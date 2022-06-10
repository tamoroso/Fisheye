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

const openLightBox = (event, id) => {
  const lightBox = document.getElementById("lightbox");
  const body = document.body;
  let top = Math.round(window.pageYOffset * 10) / 10;
  lightBox.style.cssText = `display: flex; top: ${top}px;`;
  body.style.overflow = "hidden";

  //init lightBox on clicked slide
  slides = [...document.getElementsByClassName("lightbox-slides")];
  console.log(slides);
  index = getCurrentIndex(id);
  console.log(index);
  showSlide(slides[index]);
};

const closeLightBox = () => {
  const lightBox = document.getElementById("lightbox");
  const body = document.body;
  lightBox.removeAttribute("style");
  body.removeAttribute("style");
};
