const modal = document.getElementById("contact_modal");
const closeButton = modal.querySelector("img");
const feedbackElement = modal.getElementsByClassName("invalid-feedback");
const form = document.forms["contact-form"];

closeButton.addEventListener("click", () => closeModal());

const FORM_ERROR = {
  required: "Ce champ est requis",
  firstName: "Vous devez saisir un prénom valide.",
  lastName: "Vous devez saisir un nom valide.",
  email: "Vous devez saisir un email valide.",
  message: "Vous devez saisir un message contenant plus de 10 caractères.",
};

const displayModal = () => {
  const modal = document.getElementById("contact_modal");
  const body = document.body;
  const main = document.querySelector("main");
  const closeButton = modal.querySelector("img");
  let top = Math.round(window.pageYOffset * 10) / 10;
  main.ariaHidden = true;
  modal.ariaHidden = false;
  modal.style.cssText = `display: block; top: ${top}px;`;
  body.style.overflow = "hidden";
  closeButton.focus();
};

const closeModal = () => {
  form.reset();
  clearErrors();
  const modal = document.getElementById("contact_modal");
  const header = document.querySelector(".photograph-header");
  const body = document.body;
  const main = document.querySelector("main");
  const openModalButton = header.querySelector("button");
  main.ariaHidden = false;
  modal.ariaHidden = true;
  body.style.overflow = "auto";
  modal.style.display = "none";
  openModalButton.focus();
};

const toggleError = (index, error) => {
  const input = [...form][index];
  const feedback = [...feedbackElement][index];
  if (error) {
    input.setAttribute("aria-invalid", "true");
    feedback.setAttribute("aria-hidden", "false");
    feedback.textContent = error;
    feedback.style.display = "block";
  } else {
    input.setAttribute("aria-invalid", "false");
    feedback.setAttribute("aria-hidden", "true");
    feedback.removeAttribute("style");
  }
};

const clearErrors = (index) => {
  if (index) {
    [...form][index].setAttribute("aria-invalid", "false");
    [...feedbackElement][index].setAttribute("aria-hidden", "true");
    [...feedbackElement][index].removeAttribute("style");
  } else {
    [...feedbackElement].forEach(
      (el) => (
        el.removeAttribute("style"), el.setAttribute("aria-hidden", "false")
      )
    );
    [...form].forEach((el) => el.setAttribute("aria-invalid", "false"));
  }
};

form.addEventListener("submit", (e) => validateForm(e));

modal.addEventListener("keydown", (e) => {
  e.code === "Escape" ? closeModal() : null;
});

modal.addEventListener("keydown", (e) => {
  e.code === "Enter" ? validateForm(e) : null;
});

const validateForm = (event) => {
  event.preventDefault();
  let firstName, lastName, email, message;
  let req = {};
  [...form].map((input, index) => {
    if (input.name) {
      let value = input.value;
      switch (input.name) {
        case "firstName":
          firstName = validateName(index, value);
          req = { ...req, firstName: input.value };
          break;
        case "lastName":
          lastName = validateName(index, value);
          req = { ...req, lastName: input.value };
          break;
        case "email":
          email = validateEmail(index, value);
          req = { ...req, email: input.value };
          break;
        case "message":
          message = validateMessage(index, value);
          req = { ...req, message: input.value };
          break;
        default:
          return false;
      }
    }
  });
  const isValid = firstName && lastName && email && message;
  if (isValid) {
    console.log(req);
    closeModal();
  }
};

const validateName = (index, value) => {
  clearErrors(index);
  if (value.trim().length > 2) {
    const nameRegex = /^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$/;
    const isValid = nameRegex.test(value.trim());
    !isValid &&
      toggleError(
        index,
        index === 1 ? FORM_ERROR.firstName : FORM_ERROR.lastName
      );
    return isValid;
  } else {
    toggleError(index, FORM_ERROR.required);
    return false;
  }
};

const validateEmail = (index, value) => {
  clearErrors(index);
  if (value.trim().length) {
    const emailRegex =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    const isValid = emailRegex.test(value);
    !isValid && toggleError(index, FORM_ERROR.email);
    return isValid;
  } else {
    toggleError(index, FORM_ERROR.required);
    return false;
  }
};

const validateMessage = (index, value) => {
  clearErrors(index);
  if (value.length > 10) {
    return true;
  } else {
    toggleError(index, FORM_ERROR.message);
    return false;
  }
};
