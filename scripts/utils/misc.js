function removeAllChildNodes(parent) {
  while (parent.firstChild) {
    parent.removeChild(parent.firstChild);
  }
}
function createElementWithClass(element, className) {
  let newElement = document.createElement(`${element}`);
  newElement.setAttribute("class", className);
  return newElement;
}
function getSumOfLikes(medias) {
  let sum = medias.reduce((a, b) => a + b.likes, 0);
  return sum;
}
