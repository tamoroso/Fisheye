function photographerFactory(data) {
  const { name, portrait, country, city, tagline, id, price } = data;
  const picture = `assets/photographers/${portrait}`;

  const getUserCardDOM = () => {
    const article = document.createElement("article");
    article.id = id;
    const articleContent = `
      <a href=/photographer.html?id=${id} aria-label="${name}">
        <img src = "${picture}" alt="${name}"/>
        <h2>${name}</h2>
      </a>
      <p class="location">${city}, ${country}</p>
      <p class="tagline">${tagline}</p>
      <p class="price">${price}€/jour</p>
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
      <button class="contact_button" aria-label="Contactez moi">
      Contactez-moi
      </button>
      <img src="${picture}" alt="${name}"/>
    `;

    header.innerHTML = headerContent;
    const openContactForm = header.querySelector("button");
    openContactForm.addEventListener("click", () => displayModal());
    openContactForm.addEventListener("keypress", (e) => {
      e.key === "Enter" ? displayModal() : null;
    });
    return header;
  };

  const getUserPriceCardDOM = (totalLike) => {
    const priceCard = document.createElement("div");
    priceCard.className = "like-price";

    const priceCardContent = `
        <span>
            <p>${totalLike}</p>
            <a class="fa-solid fa-heart"></a>
        </span>
        <span>
            <p>${price}€ / jour</p>
        </span>
      `;

    priceCard.innerHTML = priceCardContent;
    return priceCard;
  };

  return { name, picture, getUserCardDOM, getUserPageDOM, getUserPriceCardDOM };
}
