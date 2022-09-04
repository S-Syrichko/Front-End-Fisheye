function mediaFactory(data) {
  const { id, photographerId, title, image, video, likes, date, price } = data;

  const mediaURL = image
    ? `assets/media/photos/${photographerId}/${image}`
    : `assets/media/photos/${photographerId}/${video}`;
  const mediaType = image ? "img" : video ? "video" : null;

  function getPhotoCardDOM() {
    const card = document.createElement("div");
    card.classList.add("card");
    //media
    const media = document.createElement(mediaType);
    if (mediaType == "img") {
      media.classList.add("card__img");
    } else if (mediaType == "video") {
      media.classList.add("card__video");
      media.setAttribute("type", "video/mp4");
      media.setAttribute("controls", "controls");
    } else {
      throw "Type error";
    }
    media.setAttribute("src", mediaURL);
    media.setAttribute("alt", title);
    //card description
    const cardDesc = document.createElement("div");
    cardDesc.classList.add("card__description");
    //name
    const h2 = document.createElement("h2");
    h2.textContent = title;
    //likes container
    const likesContainer = document.createElement("div");
    likesContainer.classList.add("card__description__likes");
    //likes number
    const likesNumber = document.createElement("p");
    likesNumber.textContent = likes;
    //heart
    const heart = document.createElement("i");
    heart.classList.add("fas");
    heart.classList.add("fa-heart");
    //append
    card.appendChild(media);
    card.appendChild(cardDesc);
    cardDesc.appendChild(h2);
    cardDesc.appendChild(likesContainer);
    likesContainer.appendChild(likesNumber);
    likesContainer.appendChild(heart);
    return card;
  }
  return {
    id,
    photographerId,
    title,
    likes,
    date,
    price,
    mediaURL,
    mediaType,
    getPhotoCardDOM,
  };
}
