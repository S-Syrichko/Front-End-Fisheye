import { photographerModel } from "../pages/photographer.js";
import { hidePageBody, showPageBody } from "../utils/functions.js";

//DOM Elements
const modal = document.querySelector(".contact_modal");
const form = document.querySelector("form");
const openBtn = document.querySelector(".button--contact");
const closeBtn = document.querySelector(".close-modal");
const submitBtn = document.querySelector(".button--submit");

//Events
openBtn.addEventListener("click", displayModal);
closeBtn.addEventListener("click", closeModal);
submitBtn.addEventListener("click", submitForm);

export function displayModal() {
  modal.style.display = "block";
  modal.setAttribute("aria-hidden", "false");
  hidePageBody();
  const header = modal.getElementsByTagName("h2");
  header[0].innerHTML = `Contactez-moi<br/>${photographerModel.name}`;
  //Focus handling
  closeBtn.focus();
  document.addEventListener("keydown", handleKeyboardAndTrapFocus);
}

export function closeModal() {
  modal.style.display = "none";
  modal.setAttribute("aria-hidden", "true");
  showPageBody();
  //Focus handling
  openBtn.focus();
  document.removeEventListener("keydown", handleKeyboardAndTrapFocus);
}

export function submitForm(e) {
  e.preventDefault();
  const firstName = "Prénom: " + form.elements.firstname.value;
  const lastName = "Nom: " + form.elements.lastname.value;
  const email = "Email: " + form.elements.email.value;
  const message = "Message: " + form.elements.message.value;
  console.log(firstName);
  console.log(lastName);
  console.log(email);
  console.log(message);
}



function handleKeyboardAndTrapFocus(e) {
    const focusableElements =
      'button, input, textarea, [tabindex]:not([tabindex="-1"])';
  
    
    const firstFocusableElement = modal.querySelectorAll(focusableElements)[0];
    const focusableContent = modal.querySelectorAll(focusableElements);
    const lastFocusableElement = focusableContent[focusableContent.length - 1];
  
    if (e.defaultPrevented) {
      return;
    }
  
    switch (e.key) {
      case "Tab":
        if (e.shiftKey) {
          //if shift+tab and fist element is active
          if (document.activeElement === firstFocusableElement) {
            lastFocusableElement.focus();
            e.preventDefault();
          }
        } else {
          // if tab and last element is active
          if (document.activeElement === lastFocusableElement) {
            firstFocusableElement.focus();
            e.preventDefault();
          }
        }
        break;
      case "Escape":
        closeModal();
        e.preventDefault();
        break;
      case "Enter":
        switch (document.activeElement) {
          case closeBtn:
            closeModal();
            e.preventDefault();
            break;
          default:
            return;
        }
        break;
      default:
        return;
    }
  }