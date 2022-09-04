function photographerFactory(data) {
  const { name, id, city, country, tagline, price, portrait } = data;

  const picture = `assets/media/photographers/${portrait}`;

  function getUserCardDOM() {
    const article = document.createElement("a");
    article.classList.add("photographer");
    article.setAttribute("href", "photographer.html?id=" + id + "");
    //img
    const img = document.createElement("img");
    img.setAttribute("src", picture);
    img.setAttribute("alt", name);
    img.classList.add("photographer__thumbnail");
    //name
    const artistName = document.createElement("h2");
    artistName.classList.add("photographer__name");
    artistName.textContent = name;
    //location
    const location = document.createElement("p");
    location.classList.add("photographer__location");
    location.textContent = `${city}, ${country}`;
    //tag
    const tag = document.createElement("p");
    tag.classList.add("photographer__tagline");
    tag.textContent = tagline;
    //price
    const dailyPrice = document.createElement("p");
    dailyPrice.classList.add("photographer__price");
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
    const container = document.createElement("div");
    container.classList.add("photographer");
    //name
    const artistName = document.createElement("h1");
    artistName.classList.add("photographer__name");
    artistName.textContent = name;
    //bio container
    const bio = document.createElement("div");
    bio.classList.add("photographer__bio");
    //location
    const location = document.createElement("p");
    location.classList.add("photographer__location");
    location.textContent = `${city}, ${country}`;
    //tag
    const tag = document.createElement("p");
    tag.classList.add("photographer__tagline");
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
    const img = document.createElement("img");
    img.setAttribute("src", picture);
    img.setAttribute("alt", name);
    img.classList.add("photographer__thumbnail");
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
