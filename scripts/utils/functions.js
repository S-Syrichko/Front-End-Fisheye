export function removeAllChildNodes(parent) {
  while (parent.firstChild) {
    parent.removeChild(parent.firstChild);
  }
}
export function createElementWithClass(element, className) {
  let newElement = document.createElement(`${element}`);
  newElement.setAttribute("class", className);
  return newElement;
}
export function getSumOfLikes(medias) {
  let sum = medias.reduce((a, b) => a + b.likes, 0);
  return sum;
}
export function sortMedia(mediaList, sortOption) {
  switch (sortOption) {
    case "likes":
      return mediaList.sort((a, b) => b.likes - a.likes);
    case "date":
      return mediaList.sort((a, b) => new Date(b.date) - new Date(a.date));
    case "title":
      return mediaList.sort((a, b) => a.title.localeCompare(b.title));
    default:
      throw "Sort option index error";
  }
}

export function hidePageBody() {
  document.querySelector("body > header").setAttribute("aria-hidden", "true");
  document.getElementById("main").setAttribute("aria-hidden", "true");
  document.querySelector("body > header").classList.add("background");
  document.getElementById("main").classList.add("background");
}
export function showPageBody() {
  document.querySelector("body > header").setAttribute("aria-hidden", "false");
  document.getElementById("main").setAttribute("aria-hidden", "false");
  document.querySelector("body > header").classList.remove("background");
  document.getElementById("main").classList.remove("background");
}