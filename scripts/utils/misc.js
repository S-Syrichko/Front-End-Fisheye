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
