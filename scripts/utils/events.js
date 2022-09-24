import {
  carouselModel,
  incrementLikesSum,
  displayUserFooter,
} from "../pages/photographer.js";

//Events dispatched from carouselFactory.js
document.addEventListener("swapCarouselNext", () => {
  if (carouselModel.currentSlide < carouselModel.photos.length - 1) {
    carouselModel.currentSlide++;
    carouselModel.translateCarousel();
  }
});
document.addEventListener("swapCarouselPrev", () => {
  if (carouselModel.currentSlide > 0) {
    carouselModel.currentSlide--;
    carouselModel.translateCarousel();
  }
});
document.addEventListener("closeCarousel", () => {
  carouselModel.carousel.style.display = "none";
});

//Events dispatched from mediaFactory.js
document.addEventListener("openCarousel", (e) => {
  carouselModel.currentSlide = e.detail.index;
  carouselModel.translateCarousel();
  carouselModel.showCarousel();
});
document.addEventListener("liked", () => {
  incrementLikesSum();
  displayUserFooter();
});
