function photographerFactory(data) {
  const { name, portrait, country, city, tagline, id, price } = data;

  const picture = `assets/photographers/${portrait}`;

  function getUserCardDOM() {
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
  }
  return { name, picture, getUserCardDOM };
}
