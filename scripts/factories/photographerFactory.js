import { createElementWithClass } from "../utils/functions.js";

export function photographerFactory(data) {
  const { name, id, city, country, tagline, price, portrait } = data;

  const picture = `assets/media/photographers/${portrait}`;

  function getUserCardDOM() {
    const container = createElementWithClass("div", "photographer");
    //navlink
    const anchor = document.createElement("a");
    anchor.setAttribute("href", "photographer.html?id=" + id + "");
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
    container.appendChild(anchor);
    anchor.appendChild(img);
    container.appendChild(artistName);
    container.appendChild(location);
    container.appendChild(tag);
    container.appendChild(dailyPrice);
    return container;
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
  function getUserNumeralsDOM(likes) {
    const container = createElementWithClass("div", "photograph-footer");
    //likes container
    const likesContainer = createElementWithClass(
      "div",
      "photograph-footer__likes"
    );
    //likes
    const likesSum = document.createElement("p");
    likesSum.textContent = likes;
    //heart
    const heart = createElementWithClass("i", "fas fa-heart");
    //price
    const dailyPrice = createElementWithClass("p", "photograph-footer__price");
    dailyPrice.textContent = `${price}€ / jour`;
    //append
    container.appendChild(likesContainer);
    container.appendChild(dailyPrice);
    likesContainer.appendChild(likesSum);
    likesContainer.appendChild(heart);
    return container;
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
    getUserNumeralsDOM,
  };
}
