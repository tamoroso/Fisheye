const mediaFactory = (data, photographerName) => {
  const { id, likes, date, video, image, price, title } = data;
  const getMediaCardDOM = () => {
    const article = document.createElement("article");
    article.id = id;
    let articleContent;
    if ("video" in data) {
      const videoPath = `/assets/media/${photographerName}/${video}`;
      const posterPath = `/assets/media/${photographerName}/${
        video.split(".")[0]
      }_poster.jpg  `;
      articleContent = `
      <video muted poster="${posterPath}" tabindex="0"> 
        <source src="${videoPath}" type="video/mp4"/>
      </video>
      <div>
        <p>${title}</p>
        <div>
            <p>${likes}</p>
            <i class="fa-solid fa-heart" aria-label="likes"></i>
        </div>
      </div>
      `;
      article.innerHTML = articleContent;
      const videoElement = article.querySelector("video");

      videoElement.addEventListener(
        "click",
        (e) => (e.preventDefault(), openLightBox(id))
      );
      videoElement.addEventListener("keypress", (e) => {
        e.key === "Enter" ? (e.preventDefault(), openLightBox(id)) : null;
      });
    } else {
      const imagePath = `assets/media/${photographerName}/${image}`;
      articleContent = `
      <img src="${imagePath}" alt="${title}, closeup view" tabindex="0"/>
      <div>
        <p>${title}</p>
        <div>
            <p>${likes}</p>
            <i class="fa-solid fa-heart" aria-label="likes"></i>
        </div>
      </div>
      `;
      article.innerHTML = articleContent;

      const imageElement = article.querySelector("img");

      imageElement.addEventListener("click", () => openLightBox(id));
      imageElement.addEventListener("keypress", (e) => {
        e.key === "Enter" ? (e.preventDefault(), openLightBox(id)) : null;
      });
    }
    return article;
  };

  const getLightboxSlideDOM = () => {
    const div = document.createElement("div");
    div.className = "lightbox-slides";
    div.id = id;

    if ("video" in data) {
      const videoPath = `assets/media/${photographerName}/${video}`;
      divContent = `
            <video muted controls>
                <source src="${videoPath}" type="video/mp4"/>
            </video>
            <p>${title}</p>
        `;
    } else {
      const imagePath = `assets/media/${photographerName}/${image}`;
      divContent = `
        <img src="${imagePath}" alt="${title}"/>
        <p>${title}</p>
      `;
    }
    div.innerHTML = divContent;
    return div;
  };

  return { getMediaCardDOM, getLightboxSlideDOM };
};
