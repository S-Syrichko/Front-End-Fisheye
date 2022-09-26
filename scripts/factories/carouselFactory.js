import {
  createElementWithClass,
  hidePageBody,
  showPageBody,
} from "../utils/functions.js";
import { mediaFactory } from "../factories/mediaFactory.js";

export function carouselFactory(data) {
  const photos = data;
  let currentSlide = 0;

  //Creating DOM
  const carousel = createElementWithClass("div", "carousel");
  //media container
  const container = createElementWithClass("div", "carousel__container");
  container.style.width = 85 * photos.length + "vw";
  //close
  const close = createElementWithClass("i", "fas fa-xmark");
  close.setAttribute("id", "close");
  close.setAttribute("tabindex", "0");
  //prev
  const prev = createElementWithClass("i", "fas fa-chevron-left");
  prev.setAttribute("id", "prev");
  prev.setAttribute("tabindex", "0");
  //next
  const next = createElementWithClass("i", "fas fa-chevron-right");
  next.setAttribute("id", "next");
  next.setAttribute("tabindex", "0");
  //append
  carousel.appendChild(close);
  carousel.appendChild(prev);
  carousel.appendChild(container);
  carousel.appendChild(next);
  photos.forEach((photo) => {
    const photoCardModel = mediaFactory(photo);
    const photoCarouselDOM = photoCardModel.getCarouselItemDOM();
    container.appendChild(photoCarouselDOM);
  });

  function setCurrentSlide(slideIndex) {
    currentSlide = slideIndex;
  }
  function showCarousel() {
    //Translate carousel to set display on wanted media
    translateCarousel();
    //Display
    carousel.style.display = "block";
    carousel.style.opacity = "1";
    hidePageBody();
    document.querySelector(".lightbox").setAttribute("aria-hidden", "false");
    close.focus();
    //Add events
    prev.addEventListener("click", previousSlide);
    next.addEventListener("click", nextSlide);
    close.addEventListener("click", hideCarousel);
    document.addEventListener("keydown", handleKeyboardAndTrapFocus);
  }
  function hideCarousel() {
    //Display
    carousel.style.display = "none";
    carousel.style.opacity = "0";
    showPageBody();
    document.querySelector(".lightbox").setAttribute("aria-hidden", "true");
    //Remove events
    prev.removeEventListener("click", previousSlide);
    next.removeEventListener("click", nextSlide);
    close.removeEventListener("click", hideCarousel);
    document.removeEventListener("keydown", handleKeyboardAndTrapFocus);
  }

  //Private functions
  function nextSlide() {
    if (currentSlide < photos.length - 1) {
      currentSlide++;
      translateCarousel();
    }
  }
  function previousSlide() {
    if (currentSlide > 0) {
      currentSlide--;
      translateCarousel();
    }
  }
  function translateCarousel() {
    container.style.transform = "translate(-" + currentSlide * 85 + "vw)";
    container.style.transition = "all 0.5s ease";
    setTabIndex();
    if (currentSlide <= 0) {
      prev.style.display = "none";
      prev.setAttribute("tabindex", "-1");
    } else if (currentSlide >= photos.length - 1) {
      next.style.display = "none";
      next.setAttribute("tabindex", "-1");
    } else {
      prev.style.display = next.style.display = "";
      prev.setAttribute("tabindex", "0");
      next.setAttribute("tabindex", "0");
    }
  }
  function setTabIndex() {
    const mediaList = container.querySelectorAll(".item");
    for (let i = 0; i < mediaList.length; i++) {
      i == currentSlide
        ? mediaList[i].childNodes[0].setAttribute("tabIndex", "0")
        : mediaList[i].childNodes[0].setAttribute("tabIndex", "-1");
    }
  }
  function handleKeyboardAndTrapFocus(e) {
    const focusableElements =
      'i:not([tabindex="-1"]), [tabindex]:not([tabindex="-1"])';

    const firstFocusableElement =
      carousel.querySelectorAll(focusableElements)[0];
    let focusableContent = carousel.querySelectorAll(focusableElements);
    const lastFocusableElement = focusableContent[focusableContent.length - 1];

    //Keeping focus inside carousel if right arrow is selected and desappears
    let activeFocusIsinList = false;
    for (let i = 0; i < focusableContent.length; i++) {
      if (document.activeElement == focusableContent[i]) {
        activeFocusIsinList = true;
      }
    }
    if (!activeFocusIsinList){
      focusableContent[focusableContent.length - 1].focus();
    }
    

    if (e.defaultPrevented) {
      return;
    }

    switch (e.key) {
      case "Tab":
        if (e.shiftKey) {
          //if shift+tab and fist element is active
          if (document.activeElement === firstFocusableElement) {
            lastFocusableElement.focus();
            e.preventDefault();
          }
        } else {
          // if tab and last element is active
          if (document.activeElement === lastFocusableElement) {
            firstFocusableElement.focus();
            e.preventDefault();
          }
        }
        break;
      case "Escape":
        hideCarousel();
        e.preventDefault();
        break;
      case "Enter":
        switch (document.activeElement) {
          case close:
            hideCarousel();
            e.preventDefault();
            break;
          case prev:
            previousSlide();
            e.preventDefault();
            break;
          case next:
            nextSlide();
            e.preventDefault();
          default:
            return;
        }
        break;
      case "ArrowRight":
        nextSlide();
        break;
      case "ArrowLeft":
        previousSlide();
        break;
      default:
        return;
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
    setCurrentSlide,
    showCarousel,
    hideCarousel,
  };
}
