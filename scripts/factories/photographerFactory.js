function photographerFactory(data) {
  const { name, id, city, country, tagline, price, portrait } = data;

  const picture = `assets/media/photographers/${portrait}`;

  function getUserCardDOM() {
    const article = createElementWithClass("a", "photographer");
    article.setAttribute("href", "photographer.html?id=" + id + "");
    //img
    const img = createElementWithClass("img", "photographer__thumbnail");
    img.setAttribute("src", picture);
    img.setAttribute("alt", name);
    //name
    const artistName = createElementWithClass("h2", "photographer__name");
    artistName.textContent = name;
    //location
    const location = createElementWithClass("p", "photographer__location");
    location.textContent = `${city}, ${country}`;
    //tag
    const tag = createElementWithClass("p", "photographer__tagline");
    tag.textContent = tagline;
    //price
    const dailyPrice = createElementWithClass("p", "photographer__price");
    dailyPrice.textContent = `${price}€/jour`;
    //append
    article.appendChild(img);
    article.appendChild(artistName);
    article.appendChild(location);
    article.appendChild(tag);
    article.appendChild(dailyPrice);
    return article;
  }
  function getUserInfoDOM() {
    const container = createElementWithClass("div", "photographer");
    //name
    const artistName = createElementWithClass("h1", "photographer__name");
    artistName.textContent = name;
    //bio container
    const bio = createElementWithClass("div", "photographer__bio");
    //location
    const location = createElementWithClass("p", "photographer__location");
    location.textContent = `${city}, ${country}`;
    //tag
    const tag = createElementWithClass("p", "photographer__tagline");
    tag.textContent = tagline;
    //append
    container.appendChild(artistName);
    container.appendChild(bio);
    bio.appendChild(location);
    bio.appendChild(tag);
    return container;
  }
  function getUserThumbnailDOM() {
    //img
    const img = createElementWithClass("img", "photographer__thumbnail");
    img.setAttribute("src", picture);
    img.setAttribute("alt", name);
    return img;
  }

  return {
    name,
    id,
    city,
    country,
    tagline,
    price,
    picture,
    getUserCardDOM,
    getUserInfoDOM,
    getUserThumbnailDOM,
  };
}
