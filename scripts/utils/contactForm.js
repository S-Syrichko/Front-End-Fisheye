function displayModal() {
    const modal = document.getElementById("contact_modal");
	modal.style.display = "block";
    const header = modal.getElementsByTagName("h2");
    header[0].innerHTML = `Contactez-moi<br/>${photographerModel.name}`
}

function closeModal() {
    const modal = document.getElementById("contact_modal");
    modal.style.display = "none";
}

function submitForm(e) {
    e.preventDefault();
    let form = document.querySelector("form");
    const firstName = "Prénom: " + form.elements.firstname.value;
    const lastName = "Nom: " + form.elements.lastname.value;
    const email = "Email: " + form.elements.email.value;
    const message = "Message: " + form.elements.message.value;
    console.log(firstName);
    console.log(lastName);
    console.log(email);
    console.log(message);
}