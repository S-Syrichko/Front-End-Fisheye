let photos = [];
let filterOption =
  document.getElementById("filter").options[
    document.getElementById("filter").selectedIndex
  ].value;

async function getPhotographerContent(userID) {
  return fetch("/data/photographers.json")
    .then((res) => res.json())
    .then((res) => {
      const photographer = res.photographers.filter(
        (photographer) => photographer.id == userID
      );
      return photographer[0];
    })
    .catch((err) => console.log("Fetch error occurs", err));
}

async function getPhotos(userID) {
  return fetch("/data/photographers.json")
    .then((res) => res.json())
    .then((res) => {
      const photos = res.media.filter(
        (media) => media.photographerId == userID
      );
      return photos;
    })
    .catch((err) => console.log("Fetch error occurs", err));
}

async function displayData(photographer, photos) {
  //header
  const photographerHeader = document.querySelector(".photograph-header");
  const photographerModel = photographerFactory(photographer);
  const userInfoDOM = photographerModel.getUserInfoDOM();
  const userThumbnailDOM = photographerModel.getUserThumbnailDOM();
  photographerHeader.prepend(userInfoDOM);
  photographerHeader.append(userThumbnailDOM);
  //filter

  //media
  displayMedia(photos);
}

async function init() {
  const userID = new URLSearchParams(window.location.search).get("id");
  const photographer = await getPhotographerContent(userID);
  photos = await getPhotos(userID);
  displayData(photographer, photos);
}

function toggleFilter(elem) {
  filterOption = elem.options[elem.selectedIndex].value;
  displayMedia(photos);
}

function sortMedia(filter, media) {
  switch (filter) {
    case "likes":
      return media.sort((a, b) => b.likes - a.likes);
    case "date":
      return media.sort((a, b) => new Date(b.date) - new Date(a.date));
    case "title":
      return media.sort((a, b) => a.title.localeCompare(b.title));
    default:
      console.log("Invalid filter type");
  }
}

function displayMedia(photos) {
  const photographerContent = document.querySelector(".photograph-content");
  removeAllChildNodes(photographerContent);
  photos = sortMedia(filterOption, photos);
  document.querySelector(".carousel")?.remove();
  window.carouselDOM = new Carousel(photos);
  photos.forEach((photo, index) => {
    const photoCardModel = mediaFactory(photo);
    const photoCardDOM = photoCardModel.getPhotoCardDOM(index);
    photographerContent.appendChild(photoCardDOM);
  });
}

init();
