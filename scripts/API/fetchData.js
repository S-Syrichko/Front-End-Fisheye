import { sortMedia } from "../utils/functions.js";

export async function getAllPhotographers() {
  return fetch("/data/photographers.json")
    .then((res) => res.json())
    .then((res) => res.photographers)
    .catch((err) => console.log("Fetch error occurs", err, res.json()));
}

export async function getPhotographerByUserID(userID) {
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

export async function getMediaByUserID(userID) {
  return fetch("/data/photographers.json")
    .then((res) => res.json())
    .then((res) => {
      const mediaList = res.media.filter(
        (media) => media.photographerId == userID
      );
      return sortMedia(mediaList, "likes");
    })
    .catch((err) => console.log("Fetch error occurs", err));
}
