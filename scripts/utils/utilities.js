const getDomElement = () => {
  const lightBox = document.getElementById("lightbox");
  const leftButton = lightBox.querySelector("#left-button");
  const rightButton = lightBox.querySelector("#right-button");
  const closeButtonLightBox = lightBox.querySelector("svg");
  const body = document.body;
  const main = document.querySelector("main");
  const mediaSection = document.querySelectorAll("article");

  return {
    lightBox,
    leftButton,
    rightButton,
    closeButtonLightBox,
    body,
    main,
    mediaSection,
  };
};

const setEventListener = (element, eventType, callback) => {
  element.addEventListener(eventType, callback);
};
