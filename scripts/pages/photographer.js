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
    const likeComponent = mediaCardDOM.querySelector("div div i");
    likeComponent.addEventListener("click", (e) => handleUserLike(e));
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
  const filteredMedia = media
    .filter((el) => el.photographerId === id)
    .map((el) => {
      return { ...el, isLiked: false };
    });
  const filteredPhotographers = photographers.filter((el) => el.id === id)[0];

  window.localStorage.setItem(
    "photographerData",
    JSON.stringify({
      photographer: filteredPhotographers,
      media: filteredMedia,
    })
  );

  displayData(filteredPhotographers, filteredMedia);
  console.log(document.body.innerHTML);
}

init();

const handleUserLike = (e) => {
  const { media, photographer } = JSON.parse(
    window.localStorage.getItem("photographerData")
  );
  const targetElement = e.target;
  const mediaSection = document.querySelector(".media-section");
  const priceCard = document.querySelector(".like-price");
  let rootElement = targetElement;
  while (rootElement.id === "") {
    rootElement = rootElement.parentElement;
  }
  let targetMedia = media.filter((el) => el.id === parseInt(rootElement.id))[0];
  let { likes, isLiked } = targetMedia;
  targetMedia = {
    ...targetMedia,
    isLiked: !isLiked,
    likes: isLiked ? likes - 1 : likes + 1,
  };
  const newMediaArray = media.map((el) => {
    return el.id !== targetMedia.id ? el : targetMedia;
  });

  window.localStorage.setItem(
    "photographerData",
    JSON.stringify({
      photographer: photographer,
      media: newMediaArray,
    })
  );

  const indexInChildNode = [...mediaSection.childNodes].indexOf(rootElement);
  const elementToUpdate = mediaSection.childNodes.item(indexInChildNode);
  const likeCount = elementToUpdate.querySelector("div div p");
  const totalLikeCount = priceCard.querySelector("span p");
  const likeArray = newMediaArray.map((el) => el.likes);
  const totalLikes = likeArray.reduce((prev, next) => prev + next);

  likeCount.innerHTML = `${targetMedia.likes}`;
  totalLikeCount.innerHTML = `${totalLikes}`;
};
