const modal = document.getElementById("contact_modal");
const closeButton = modal.querySelector("img");

closeButton.addEventListener("click", () => closeModal());

function displayModal() {
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
}

function closeModal() {
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
}

const form = document.forms["contact-form"];

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
  [...form].map((input) => {
    if (input.name) {
      let value = input.value;
      switch (input.name) {
        case "firstName":
          firstName = validateName(value);
          req = { ...req, firstName: input.value };
          break;
        case "lastName":
          lastName = validateName(value);
          req = { ...req, lastName: input.value };
          break;
        case "email":
          email = validateEmail(value);
          req = { ...req, email: input.value };
          break;
        case "message":
          message = validateMessage(value);
          req = { ...req, message: input.value };
          break;
        default:
          return false;
      }
    }
    const isValid = firstName && lastName && email && message;
    if (isValid) {
      console.log(req);
      closeModal();
    }
  });
};

const validateName = (value) => {
  if (value.trim().length > 2) {
    const nameRegex = /^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$/;
    return nameRegex.test(value.trim());
  } else {
    return false;
  }
};

const validateEmail = (value) => {
  if (value.trim().length) {
    const emailRegex =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return emailRegex.test(value);
  } else {
    return false;
  }
};

const validateMessage = (value) => {
  if (value.length > 10) {
    return true;
  } else {
    return false;
  }
};
