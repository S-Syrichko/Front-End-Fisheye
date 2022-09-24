import { displaySortedMedia, mediaList } from "../pages/photographer.js";
import { sortMedia } from "../utils/functions.js";

//DOM Elements
const dropDownMenu = document.querySelector(".dropdown__menu");
const sortingButton = document.querySelector(".button--sorting");
const sortingOptions = Array.from(
  document.getElementsByClassName("sorting-option")
);

sortingButton.addEventListener("click", () => {
  sortingButton.setAttribute("aria-expanded", "true");
  sortingButton.setAttribute("tabindex", "-1");
  sortingOptions.forEach((option) => {
    option.setAttribute("tabindex", "0");
    option.addEventListener("click", toggleSortType);
    option.addEventListener("keydown", toggleSortType);
  });
  dropDownMenu.classList.add("display");
  dropDownMenu.querySelector("li").focus();
});

function toggleSortType(e) {
  if (e.type === "click" || (e.type === "keydown" && e.key === "Enter")) {
    const optionIndex = sortingOptions.findIndex((x) => x === e.currentTarget);
    displaySortedMedia(sortMedia(mediaList, optionIndex));
    dropDownMenu.classList.remove("display");
  }
}


