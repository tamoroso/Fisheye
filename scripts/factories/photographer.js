function photographerFactory(data) {
  const { name, portrait, country, city, tagline, id, price } = data;
  const picture = `assets/photographers/${portrait}`;

  const getUserCardDOM = () => {
    const article = document.createElement("article");
    article.id = id;
    const articleContent = `
      <a href=/photographer.html?id=${id}>
        <img src = "${picture}"/>
        <h2>${name}</h2>
        <p class="location">${city}, ${country}</p>
        <p class="tagline">${tagline}</p>
        <p class="price">${price}€/jour</p>
      </a>
      `;
    article.innerHTML = articleContent;
    return article;
  };

  const getUserPageDOM = () => {
    const header = document.createElement("div");
    header.className = "photograph-header";

    const headerContent = `
      <ul class="photograph-infos">
        <li>${name}</li>
        <li>${city}, ${country}</li>
        <li>${tagline}</li>
      </ul>
      <button class="contact_button" onclick="displayModal()">
      Contactez-moi
      </button>
      <img src="${picture}"/>
    `;

    header.innerHTML = headerContent;

    return header;
  };
  return { name, picture, getUserCardDOM, getUserPageDOM };
}
