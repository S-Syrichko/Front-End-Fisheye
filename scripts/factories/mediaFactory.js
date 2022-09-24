import { createElementWithClass } from "../utils/functions.js";

export function mediaFactory(data) {
  const { id, photographerId, title, image, video, likes, date, price } = data;
  let liked = false;
  const mediaURL = image
    ? `assets/media/photos/${photographerId}/${image}`
    : `assets/media/photos/${photographerId}/${video}`;
  const mediaType = image ? "img" : video ? "video" : null;

  function getPhotoCardDOM(index) {
    const card = createElementWithClass("div", "card");
    //media
    const media = document.createElement(mediaType);
    if (mediaType == "img") {
      media.classList.add("card__img");
    } else if (mediaType == "video") {
      media.classList.add("card__video");
      media.setAttribute("type", "video/mp4");
    } else {
      throw "Type error";
    }
    media.setAttribute("src", mediaURL);
    media.setAttribute("alt", title);
    media.addEventListener("click", () => {
      document.dispatchEvent(
        new CustomEvent("openCarousel", { detail: { index: index } })
      );
    });
    //card description
    const cardDesc = createElementWithClass("div", "card__description");
    //name
    const h2 = document.createElement("h2");
    h2.textContent = title;
    //likes container
    const likesContainer = createElementWithClass(
      "div",
      "card__description__likes"
    );
    //likes number
    this.likesNumber = document.createElement("p");
    this.likesNumber.textContent = this.likes;
    //heart
    const heart = createElementWithClass("i", "fas fa-heart");
    heart.addEventListener("click", () => {
      if (this.liked == false) {
        this.likes++;
        this.likesNumber.textContent = this.likes;
        this.liked = true;
        document.dispatchEvent(new Event("liked"));
      }
    });
    //append
    card.appendChild(media);
    card.appendChild(cardDesc);
    cardDesc.appendChild(h2);
    cardDesc.appendChild(likesContainer);
    likesContainer.appendChild(this.likesNumber);
    likesContainer.appendChild(heart);
    return card;
  }
  function getCarouselItemDOM() {
    const item = createElementWithClass("div", "item");
    //media
    const media = document.createElement(mediaType);
    if (mediaType == "img") {
      media.classList.add("item__img");
    } else if (mediaType == "video") {
      media.classList.add("item__video");
      media.setAttribute("type", "video/mp4");
      media.setAttribute("controls", "controls");
    } else {
      throw "Type error";
    }
    media.setAttribute("src", mediaURL);
    media.setAttribute("alt", title);
    //title
    const h2 = document.createElement("h2");
    h2.textContent = title;
    //append
    item.appendChild(media);
    item.appendChild(h2);
    return item;
  }
  return {
    id,
    photographerId,
    title,
    likes,
    liked,
    date,
    price,
    mediaURL,
    mediaType,
    getPhotoCardDOM,
    getCarouselItemDOM,
  };
}
