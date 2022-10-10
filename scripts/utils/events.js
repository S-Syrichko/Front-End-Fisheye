import {
  carouselModel,
  incrementLikesSum,
  decrementLikesSum,
  displayUserFooter,
} from "../pages/photographer.js";

//Events dispatched from mediaFactory.js
document.addEventListener("openCarousel", (e) => {
  carouselModel.setCurrentSlide(e.detail.index);
  carouselModel.showCarousel();
});
document.addEventListener("liked", (e) => {
  if (e.detail.liked) {
    incrementLikesSum();
  } else {
    decrementLikesSum();
  }
  displayUserFooter();
});
