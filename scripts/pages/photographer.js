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

  const photographerModel = photographerFactory(photographer);
  media.forEach((el) => {
    const mediaModel = mediaFactory(el, photographer.name);
    const mediaCardDOM = mediaModel.getMediaCardDOM();
    mediaSection.appendChild(mediaCardDOM);
  });

  /**
   * Calculate total likes to be displayed at the bottom of the page
   */
  const likes = media.map((el) => el.likes);
  const totalLikes = likes.reduce((prev, next) => prev + next);

  main.prepend(photographerModel.getUserPageDOM());
  main.appendChild(photographerModel.getUserPriceCardDOM(totalLikes));
}

async function init() {
  const { media, photographers } = await getPhotographers();
  const param = new URLSearchParams(new URL(window.location).searchParams);
  const id = parseInt(param.get("id"));
  const filteredMedia = media.filter((el) => el.photographerId === id);
  const filteredPhotographers = photographers.filter((el) => el.id === id)[0];
  console.log(filteredMedia);
  console.log(filteredPhotographers);
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
