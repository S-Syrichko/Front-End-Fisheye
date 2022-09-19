
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

async function getMedia(userID) {
  return fetch("/data/photographers.json")
    .then((res) => res.json())
    .then((res) => {
      const mediaList = res.media.filter(
        (media) => media.photographerId == userID
      );
      return mediaList;
    })
    .catch((err) => console.log("Fetch error occurs", err));
}

async function init() {
  const userID = new URLSearchParams(window.location.search).get("id");
  //fetch user
  const photographer = await getPhotographerContent(userID);
  //fetch media
  window.media = await getMedia(userID);
  window.likesSum = getSumOfLikes(media);
  window.photographerModel = photographerFactory(photographer);
  displayUserBanner(photographerModel);
  displayMedia(media);
  displayUserFooter();
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

async function displayUserBanner(photographerModel) {
  const photographerHeader = document.querySelector(".photograph-header"); 
  const userInfoDOM = photographerModel.getUserInfoDOM();
  const userThumbnailDOM = photographerModel.getUserThumbnailDOM();
  photographerHeader.prepend(userInfoDOM);
  photographerHeader.append(userThumbnailDOM);
}

async function displayMedia(media) {
  const photographerContent = document.querySelector(".photograph-content");
  //sort
  media = sortMedia(filterOption, media);
  //carousel
  document.querySelector(".carousel")?.remove();
  window.carouselDOM = new Carousel(media);
  //media list
  removeAllChildNodes(photographerContent);
  media.forEach((photo, index) => {
    const photoCardModel = mediaFactory(photo);
    const photoCardDOM = photoCardModel.getPhotoCardDOM(index);
    photographerContent.appendChild(photoCardDOM);
  });
}
async function displayUserFooter() {
  const main = document.querySelector("#main");
  const userFooterDOM = photographerModel.getUserNumeralsDOM(likesSum);
  main.append(userFooterDOM);
}

init();
