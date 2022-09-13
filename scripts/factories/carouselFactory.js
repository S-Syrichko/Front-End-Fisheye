class Carousel {
  constructor(photos) {
    this.currentSlide = 0;
    this.length = photos.length;
    const main = document.querySelector("#main");
    this.carousel = createElementWithClass("div", "carousel");
    //container
    this.container = createElementWithClass("div", "carousel__container");
    this.container.style.width = 85 * this.length + "vw";
    //prev
    this.prev = createElementWithClass("i", "fas fa-chevron-left");
    this.prev.setAttribute("id", "prev");
    this.prev.addEventListener("click", () => {
      if (this.currentSlide > 0) {
        this.currentSlide--;
        this.translateCarousel();
      }
    });
    //next
    this.next = createElementWithClass("i", "fas fa-chevron-right");
    this.next.setAttribute("id", "next");
    this.next.addEventListener("click", () => {
      if (this.currentSlide < this.length - 1) {
        this.currentSlide++;
        this.translateCarousel();
      }
    });
    //close
    this.close = createElementWithClass("i", "fas fa-xmark");
    this.close.setAttribute("id", "close");
    this.close.addEventListener("click", () => {
      this.carousel.style.display = "none";
    });
    //append
    main.appendChild(this.carousel);
    this.carousel.appendChild(this.container);
    this.carousel.appendChild(this.prev);
    this.carousel.appendChild(this.next);
    this.carousel.appendChild(this.close);
    photos.forEach((photo) => {
      const photoCardModel = mediaFactory(photo);
      const photoCarouselDOM = photoCardModel.getCarouselItemDOM();
      this.container.appendChild(photoCarouselDOM);
    });
  }

  showCarousel() {
    this.carousel.style.display = "block";
    this.carousel.style.opacity = "1";
    this.container.style.transition = "opacity 0.5s ease";
  }
  hideCarousel() {
    this.carousel.style.display = "none";
    this.carousel.style.opacity = "0";
    this.container.style.transition = "opacity 0.5s ease";
  }
  translateCarousel() {
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
  setCurrentSlide(slideIndex) {
    this.currentSlide = slideIndex;
    this.translateCarousel();
  }
}
