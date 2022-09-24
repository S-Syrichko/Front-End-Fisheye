import { getAllPhotographers } from "../API/fetchData.js";
import { photographerFactory } from "../factories/photographerFactory.js";

async function displayData(photographers) {
  const photographersSection = document.querySelector(".photographer_section");

  photographers.forEach((photographer) => {
    const photographerModel = photographerFactory(photographer);
    const userCardDOM = photographerModel.getUserCardDOM();
    photographersSection.appendChild(userCardDOM);
  });
}

async function init() {
  // Récupère les datas des photographes
  const photographers = await getAllPhotographers();
  displayData(photographers);
}

init();
