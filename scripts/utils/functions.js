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
export function sortMedia(mediaList, optionIndex) {
  switch (optionIndex) {
    case 0:
      return mediaList.sort((a, b) => b.likes - a.likes);
    case 1:
      return mediaList.sort((a, b) => new Date(b.date) - new Date(a.date));
    case 2:
      return mediaList.sort((a, b) => a.title.localeCompare(b.title));
    default:
      throw "Sort option index error";
  }
}