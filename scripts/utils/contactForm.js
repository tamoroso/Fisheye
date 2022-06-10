function displayModal() {
  const modal = document.getElementById("contact_modal");
  const body = document.body;
  body.style.overflow = "hidden";
  modal.style.display = "block";
}

function closeModal() {
  const modal = document.getElementById("contact_modal");
  const body = document.body;
  body.style.overflow = "auto";
  modal.style.display = "none";
}

const form = document.forms["contact-form"];

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
