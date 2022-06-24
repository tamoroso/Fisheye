const { lightBox, closeButtonLightBox, rightButton, leftButton } =
  getDomElement();

//TODO: Pack event doing the same thing but using different eventType in the same string
const LIGHTBOX_CONTROLS = [
  {
    name: "keyboardPrevNext",
    eventType: "keydown",
    on: lightBox,
    callback: (e) => {
      e.code === "ArrowLeft"
        ? (prevNextSlide(-1), leftButton.focus())
        : e.code === "ArrowRight"
        ? (prevNextSlide(1), rightButton.focus())
        : null;
    },
  },
  {
    name: "keyboardCloseEscape",
    eventType: "keydown",
    on: lightBox,
    callback: (e) => {
      e.code === "Escape" ? closeLightBox() : null;
    },
  },
  {
    name: "keyboardCloseEnter",
    eventType: "keydown",
    on: closeButtonLightBox,
    callback: (e) => {
      e.preventDefault();
      e.code === "Enter" ? closeLightBox() : null;
    },
  },
  {
    name: "keyboardLeftEnter",
    eventType: "keydown",
    on: leftButton,
    callback: (e) => {
      e.code === "Enter" ? prevNextSlide(-1) : null;
    },
  },
  {
    name: "keyboardRightEnter",
    eventType: "keydown",
    on: rightButton,
    callback: (e) => {
      e.code === "Enter" ? prevNextSlide(1) : null;
    },
  },
  {
    name: "clickLeft",
    eventType: "click",
    on: leftButton,
    callback: () => prevNextSlide(-1),
  },
  {
    name: "clickRight",
    eventType: "click",
    on: rightButton,
    callback: () => prevNextSlide(1),
  },
  {
    name: "clickClose",
    eventType: "click",
    on: closeButtonLightBox,
    callback: () => closeLightBox(),
  },
];
