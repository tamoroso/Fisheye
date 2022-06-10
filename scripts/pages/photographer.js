//Mettre le code JavaScript lié à la page photographer.html
async function getPhotographers() {
  let headers = new Headers();
  let init = {
    method: "GET",
    headers: headers,
    mode: "cors",
    cache: "default",
  };
  let request = new Request(
    "http://localhost:5500/data/photographers.json",
    init
  );

  try {
    let res = await fetch(request, init);
    return await res.json();
  } catch (error) {
    console.log(error);
  }
}

async function displayData(photographer, media) {
  const main = document.querySelector("#main");
  const mediaSection = document.querySelector(".media-section");
  const modalInfos = document.querySelector(".modal-photographer-name");
  const lightBoxContent = document.querySelector(".lightbox-content");

  const photographerModel = photographerFactory(photographer);
  media.forEach((el) => {
    const mediaModel = mediaFactory(el, photographer.name);
    const mediaCardDOM = mediaModel.getMediaCardDOM();
    mediaSection.appendChild(mediaCardDOM);

    const mediaLightBoxSlideDOM = mediaModel.getLightboxSlideDOM();
    lightBoxContent.appendChild(mediaLightBoxSlideDOM);
  });

  /**
   * Calculate total likes to be displayed at the bottom of the page
   */
  const likes = media.map((el) => el.likes);
  const totalLikes = likes.reduce((prev, next) => prev + next);

  modalInfos.textContent = photographer.name;
  main.prepend(photographerModel.getUserPageDOM());
  main.appendChild(photographerModel.getUserPriceCardDOM(totalLikes));
}

async function init() {
  const { media, photographers } = await getPhotographers();
  const param = new URLSearchParams(new URL(window.location).searchParams);
  const id = parseInt(param.get("id"));
  const filteredMedia = media.filter((el) => el.photographerId === id);
  const filteredPhotographers = photographers.filter((el) => el.id === id)[0];

  window.localStorage.setItem(
    "photographerData",
    JSON.stringify({
      photographer: filteredPhotographers,
      media: filteredMedia,
    })
  );

  displayData(filteredPhotographers, filteredMedia);
}

init();
