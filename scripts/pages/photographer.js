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
  //photos
  const photographerContent = document.querySelector(".photograph-content");
  photos.forEach((photo) => {
    const photoCardModel = mediaFactory(photo);
    const photoCardDOM = photoCardModel.getPhotoCardDOM();
    photographerContent.appendChild(photoCardDOM);
  })
}

async function init() {
  const userID = new URLSearchParams(window.location.search).get("id");
  const photographer = await getPhotographerContent(userID);
  const photos = await getPhotos(userID);
  displayData(photographer, photos);
}

init();
