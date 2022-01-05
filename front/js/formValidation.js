//Limitation des caractères
let emailRegExp = new RegExp(
  /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
);
let charRegExp = new RegExp("^[A-Za-zÀ-ÖØ-öø-ÿ-]+");
let addressRegExp = new RegExp(
  "^[0-9]{1,3}(?:(?:[,. ]){1}[-a-zA-Zàâäéèêëïîôöùûüç]+)+"
);

/* Validation prénom */
function validFirstName(inputFirstName) {
  let firstNameErrorMsg = inputFirstName.nextElementSibling;
  // si la valeur de "inputFirstName" passe le test des expressions régulières configurés la valeur InnerHTML reste vide et ne renvoie donc pas d'erreur
  if (!charRegExp.test(inputFirstName.value)) {
    firstNameErrorMsg.innerHTML = "Veuillez renseigner ce champ.";
    error = true;
  }
}

/* Validation du nom */

function validLastName(inputLastName) {
  let lastNameErrorMsg = inputLastName.nextElementSibling;

  if (!charRegExp.test(inputLastName.value)) {
    lastNameErrorMsg.innerHTML = "Veuillez renseigner ce champ.";
    error = true;
  }
}

/* Validation adresse */
function validAddress(inputAddress) {
  let addressErrorMsg = inputAddress.nextElementSibling;

  if (!addressRegExp.test(inputAddress.value)) {
    addressErrorMsg.innerHTML = "Veuillez renseigner ce champ.";
  }
  error = true;
}

/* Validation ville */
function validCity(inputCity) {
  let cityErrorMsg = inputCity.nextElementSibling;

  if (!charRegExp.test(inputCity.value)) {
    cityErrorMsg.innerHTML = "Veuillez renseigner ce champ.";
    error = true;
  }
}

/* Validation Email */
function validEmail(inputEmail) {
  let emailErrorMsg = inputEmail.nextElementSibling;

  if (!emailRegExp.test(inputEmail.value)) {
    emailErrorMsg.innerHTML = "Veuillez renseigner votre email.";
    error = true;
  }
}
