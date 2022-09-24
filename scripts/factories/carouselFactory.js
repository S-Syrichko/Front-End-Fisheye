import { createElementWithClass } from "../utils/functions.js";
import { mediaFactory } from "../factories/mediaFactory.js";

export function carouselFactory(data) {
  const photos = data;
  let currentSlide = 0;
  //carousel element
  const carousel = createElementWithClass("div", "carousel");
  //media container
  const container = createElementWithClass("div", "carousel__container");
  container.style.width = 85 * photos.length + "vw";
  //prev
  const prev = createElementWithClass("i", "fas fa-chevron-left");
  prev.setAttribute("id", "prev");
  prev.addEventListener("click", () => {
    document.dispatchEvent(new Event("swapCarouselPrev"));
  });
  //next
  const next = createElementWithClass("i", "fas fa-chevron-right");
  next.setAttribute("id", "next");
  next.addEventListener("click", () => {
    document.dispatchEvent(new Event("swapCarouselNext"));
  });
  //close
  const close = createElementWithClass("i", "fas fa-xmark");
  close.setAttribute("id", "close");
  close.addEventListener("click", () => {
    document.dispatchEvent(new Event("closeCarousel"));
  });
  //append
  carousel.appendChild(container);
  carousel.appendChild(prev);
  carousel.appendChild(next);
  carousel.appendChild(close);
  photos.forEach((photo) => {
    const photoCardModel = mediaFactory(photo);
    const photoCarouselDOM = photoCardModel.getCarouselItemDOM();
    container.appendChild(photoCarouselDOM);
  });

  function showCarousel() {
    this.carousel.style.display = "block";
    this.carousel.style.opacity = "1";
    this.container.style.transition = "opacity 0.5s ease";
  }
  function hideCarousel() {
    this.carousel.style.display = "none";
    this.carousel.style.opacity = "0";
    this.container.style.transition = "opacity 0.5s ease";
  }
  function translateCarousel() {
    this.container.style.transform =
      "translate(-" + this.currentSlide * 85 + "vw)";
    this.container.style.transition = "all 0.5s ease";
    if (this.currentSlide <= 0) {
      this.prev.style.display = "none";
    } else if (this.currentSlide >= this.length - 1) {
      this.next.style.display = "none";
    } else {
      this.prev.style.display = this.next.style.display = "";
    }
  }

  return {
    photos,
    currentSlide,
    carousel,
    container,
    prev,
    next,
    close,
    showCarousel,
    hideCarousel,
    translateCarousel,
  };
}
