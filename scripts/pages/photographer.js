import { getPhotographerByUserID, getMediaByUserID } from "../API/fetchData.js";
import { photographerFactory } from "../factories/photographerFactory.js";
import { mediaFactory } from "../factories/mediaFactory.js";
import { carouselFactory } from "../factories/carouselFactory.js";
import { getSumOfLikes, removeAllChildNodes } from "../utils/functions.js";
import {
  displayModal,
  closeModal,
  submitForm,
} from "../components/contactForm.js";
import "../utils/events.js";
import "../components/sortingMenu.js";

//HTML used functions
window.displayModal = displayModal;
window.closeModal = closeModal;
window.submitForm = submitForm;

//DOM Elements
const main = document.querySelector("#main");
const photographerHeader = document.querySelector(".photograph-header");
const photographerContent = document.querySelector(".photograph-content");
const lightbox = document.querySelector(".lightbox");

//Global vars
export let photographerModel, carouselModel, mediaList, likesSum;

export function incrementLikesSum() {
  likesSum++;
}
export function displaySortedMedia(newMediaList) {
  mediaList = newMediaList;
  displayMedia();
}

async function init() {
  const userID = new URLSearchParams(window.location.search).get("id");
  //fetch user
  const photographer = await getPhotographerByUserID(userID);
  //fetch media (sorted by likes number)
  mediaList = await getMediaByUserID(userID);
  likesSum = getSumOfLikes(mediaList);
  photographerModel = photographerFactory(photographer);
  displayUserBanner();
  displayMedia();
  displayUserFooter();
}

async function displayUserBanner() {
  const userInfoDOM = photographerModel.getUserInfoDOM();
  const userThumbnailDOM = photographerModel.getUserThumbnailDOM();
  photographerHeader.prepend(userInfoDOM);
  photographerHeader.append(userThumbnailDOM);
}

async function displayMedia() {
  //carousel
  removeAllChildNodes(lightbox);
  carouselModel = carouselFactory(mediaList);
  lightbox.appendChild(carouselModel.carousel);
  //media list
  removeAllChildNodes(photographerContent);
  mediaList.forEach((photo, index) => {
    const photoCardModel = mediaFactory(photo);
    const photoCardDOM = photoCardModel.getPhotoCardDOM(index);
    photographerContent.appendChild(photoCardDOM);
  });
}
export async function displayUserFooter() {
  document.querySelector(".photograph-footer")?.remove();
  const userFooterDOM = photographerModel.getUserNumeralsDOM(likesSum);
  main.append(userFooterDOM);
}

init();
