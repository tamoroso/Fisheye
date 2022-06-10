const mediaFactory = (data, photographerName) => {
  const { id, likes, date, video, image, price, title } = data;
  const getMediaCardDOM = () => {
    const article = document.createElement("article");
    article.id = id;
    let articleContent;

    if ("video" in data) {
      const videoPath = `/assets/media/${photographerName}/${video}`;
      articleContent = `
      <video autoplay muted loop onclick="openLightBox(event, ${id});"> 
        <source src="${videoPath}" type="video/mp4"/>
      </video>
      <div>
        <p>${title}</p>
        <div>
            <p>${likes}</p>
            <i class="fa-solid fa-heart"></i>
        </div>
      </div>
      `;
    } else {
      const imagePath = `assets/media/${photographerName}/${image}`;
      articleContent = `
      <img src="${imagePath}" onclick="openLightBox(event, ${id});"/>
      <div>
        <p>${title}</p>
        <div>
            <p>${likes}</p>
            <i class="fa-solid fa-heart"></i>
        </div>
      </div>
      `;
    }
    article.innerHTML = articleContent;
    return article;
  };

  const getLightboxSlideDOM = () => {
    const div = document.createElement("div");
    div.className = "lightbox-slides";
    div.id = id;

    if ("video" in data) {
      const videoPath = `assets/media/${photographerName}/${video}`;
      divContent = `
            <video autoplay muted loop>
                <source src="${videoPath}" type="video/mp4"/>
            </video>
            <p>${title}</p>
        `;
    } else {
      const imagePath = `assets/media/${photographerName}/${image}`;
      divContent = `
        <img src="${imagePath}"/>
        <p>${title}</p>
      `;
    }
    div.innerHTML = divContent;
    return div;
  };

  return { getMediaCardDOM, getLightboxSlideDOM };
};
