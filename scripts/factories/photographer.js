function photographerFactory(data) {
  const { name, portrait, country, city, tagline, id, price } = data;

  const picture = `assets/photographers/${portrait}`;

  const handleCardClick = (id) => {
    let currentUrl = new URL(window.location.href);
    currentUrl.searchParams.append("id", id);
    currentUrl.pathname = "/photographer.html";
    window.location.href = currentUrl.href;
  };

  function getUserCardDOM() {
    const article = document.createElement("article");
    article.id = id;
    const articleContent = `
    <img src = "${picture}"/>
    <h2>${name}</h2>
    <p class="location">${city}, ${country}</p>
    <p class="tagline">${tagline}</p>
    <p class="price">${price}€/jour</p>
    `;
    article.innerHTML = articleContent;
    article.addEventListener("click", () => handleCardClick(id));
    return article;
  }
  return { name, picture, getUserCardDOM };
}
