// récupération du LOCAL STORAGE //
let cartPanier = JSON.parse(localStorage.getItem("panier")); // creation Variable getItem / récupération du LocalStorage
let productContainer = document.getElementById("cart__items"); // creation variable selection Id "cart__items"
var totalQty = 0; // création variable à 0 pour récupération hors boucle
var totalPrice = 0; // création variable à 0 pour récupération hors boucle
var articlePrice = 0; // création variable à 0 pour récupération hors boucle
var p = 0; // création variable à 0 pour récupération hors boucle

console.log(cartPanier);

/* récupération des données de l'API */

fetch("http://localhost:3000/api/products")
  .then((Res) => Res.json())
  .then((data) => {});

/* Fonction pour création du HTML en lien avec le contenu du localStorage */

function getPanier() {
  var index = 1;
  if (cartPanier == null || cartPanier == 0) {
    // Condition si Panier vide => Alerte "Votre panier est vide"
    alert("Votre panier est vide.");
    var hidde = document.getElementsByClassName("cart__order");
    document.getElementsByClassName("cart__order").hidden = true;
  } else cartPanier && productContainer; // creation condition cartPanier & productContainer EXISTE //
  {
    Object.values(cartPanier).map((item) => {
      //Création automatique du HTML en fonction des objets dans "cartPanier"
      totalQty += parseInt(item.qty);
      totalPrice += parseInt(item.price) * parseInt(item.qty);
      articlePrice = parseInt(item.price);
      article = document.createElement("article");
      article.className = "cart__item";
      article.id = "{product-ID}";
      div1 = document.createElement("div");
      div1.className = "cart__item__img";
      article.appendChild(div1);
      img = document.createElement("img");
      img.src = item.img;
      img.alt = item.altTxt;
      div1.appendChild(img);
      div2 = document.createElement("div");
      div2.className = "cart__item__content";
      article.appendChild(div2);
      div3 = document.createElement("div");
      div3.className = "cart__item__content__titlePrice";
      div2.appendChild(div3);
      h2 = document.createElement("h2");
      h2.innerHTML = `${item.name} ${item.colors}`;
      div3.appendChild(h2);
      p = document.createElement("p");
      p.id = "totalPrice-" + index;
      p.innerHTML = parseInt(item.price) * parseInt(item.qty) + `€`;
      div3.appendChild(p);
      div4 = document.createElement("div");
      div4.className = "cart__item__content__settings";
      div2.appendChild(div4);
      div5 = document.createElement("div");
      div5.className = "cart__item__content__settings__quantity";
      div4.appendChild(div5);
      p2 = document.createElement("p");
      p2.innerHTML = `Qté :`;
      div5.appendChild(p2);
      input = document.createElement("input");
      input.id = index;
      input.value = item.qty;
      input.setAttribute("type", "number");
      input.setAttribute("class", "itemQuantity");
      input.setAttribute("name", "itemQuantity");
      input.setAttribute("min", "1");
      input.setAttribute("max", "100");
      div5.appendChild(input);
      inputPriceUnit = document.createElement("input");
      inputPriceUnit.setAttribute("type", "hidden");
      inputPriceUnit.setAttribute("id", "priceUnit-" + index);
      inputPriceUnit.value = item.price;
      inputQtyUnit = document.createElement("input");
      inputQtyUnit.setAttribute("type", "hidden");
      inputQtyUnit.value = item.qty;
      div5.appendChild(inputPriceUnit);
      div5.appendChild(inputQtyUnit);

      div6 = document.createElement("div");
      div6.className = "cart__item__content__settings__delete";
      div4.appendChild(div6);
      p3 = document.createElement("p");
      p3.className = "deleteItem";
      p3.innerHTML = "Supprimer";
      div6.appendChild(p3);

      document.getElementById("cart__items").appendChild(article);

      index++;
    });
  }
}
getPanier(); // appel de la fonction getPanier

// Calcul du nombre d'article
var articleQty = document.getElementsByClassName("itemQuantity");

let productTotalQty = document.getElementById("totalQuantity");
productTotalQty.innerHTML = totalQty;

// calcul du prix total
let productTotalPrice = document.getElementById("totalPrice");
productTotalPrice.innerHTML = totalPrice;

// Modification des quantitées

let btnModif = document.getElementsByClassName("itemQuantity");

for (let j = 0; j < btnModif.length; j++) {
  // Boucle For lié à ItemQuantity
  btnModif[j].addEventListener("change", (event) => {
    // la boucle réagira à un event de type Change

    /* code permettant la modification en temps réel des totaux par article en cas de modification */
    var idElement = btnModif[j].id;
    var totalChange = document.getElementById("totalPrice-" + idElement);
    var articlePrice = document.getElementById("priceUnit-" + idElement).value;
    var calcul = articleQty[j].value * parseInt(articlePrice);
    totalChange.innerHTML = calcul + `€`;

    /* code permettant la mise à jour du local Storage en cas de modification */
    var newQty = cartPanier[j].qty; // récupération valeur d'origine de la quantité
    var newQtyValue = btnModif[j].value; // récupération valeur modifié de la quantité
    const difference = cartPanier.find((el) => el.newQtyValue !== newQty); // détection différence entre newQty et newQtyValue
    difference.qty = newQtyValue; // remplacement des valeurs
    cartPanier[j].qty = difference.qty; // remplacement de la quantité de l'élément ciblé
    localStorage.setItem("panier", JSON.stringify(cartPanier)); // envoi des nouvelles données vers le Localstorage

    console.log(newQtyValue);

    event.preventDefault();
    location.reload();
  });
}

// Suppression Article

let btnSupprimer = document.getElementsByClassName("deleteItem");

for (let k = 0; k < btnSupprimer.length; k++) {
  // Boucle For lié à deleteItem
  btnSupprimer[k].addEventListener("click", (event) => {
    // la boucle réagira au clic
    event.preventDefault();

    let idProduit = cartPanier[k].id;
    let couleurProduit = cartPanier[k].colors;

    cartPanier = cartPanier.filter(
      (el) => el.id !== idProduit || el.colors !== couleurProduit
    );

    console.log(cartPanier);
    //Alerte produit supprimé et refresh

    localStorage.setItem("panier", JSON.stringify(cartPanier));
    location.reload();
    alert("Ce produit a bien été supprimé du panier");
  });
}

// Envoi du formulaire vers le localStorage

const orderBtn = document.getElementById("order");

order.addEventListener("click", (event) => {
  // création constante au click du bouton commander
  const inputName = document.getElementById("firstName"); // récupération firstName
  const inputLastName = document.getElementById("lastName"); // récupération lastName
  const inputAdress = document.getElementById("address"); // récupération address
  const inputCity = document.getElementById("city"); // récupération city
  const inputMail = document.getElementById("email"); // récupération email
  console.log(inputAdress);

  /* récupération des id des produits dans le panier */

  var idPanier = []; // création variable vide
  for (let p = 0; p < cartPanier.length; p++) {
    // boucle For pour récupérer les ID de chaque produit
    idPanier.push(cartPanier[p].id);
  }

  /* Création array avec les coordonnées et les ID des produits dans le panier */
  const globalOrder = {
    contact: {
      firstName: inputName.value,
      lastName: inputLastName.value,
      address: inputAdress.value,
      city: inputCity.value,
      mail: inputMail.value,
    },
    idProduit: idPanier,
  };

  console.log(globalOrder);

  function send(e) {
    e.preventDefault();
    fetch(": http://localhost:3000/api/products", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        value: document.getElementsByClassName("order").value,
      }),
    }).then(function (res) {
      if (res.ok) {
        return res.json();
      }
    });
  }

  event.preventDefault();
});

//Création formulaire
function getForm() {
  let form = document.querySelector(".cart__order__form");

  //Limitation des caractères
  let emailRegExp = new RegExp(
    "^[a-zA-Z0-9.-_]+[@]{1}[a-zA-Z0-9.-_]+[.]{1}[a-z]{2,10}$"
  );
  let charRegExp = new RegExp("^[A-Za-zÀ-ÖØ-öø-ÿ-]+");
  let addressRegExp = new RegExp(
    "^[0-9]{1,3}(?:(?:[,. ]){1}[-a-zA-Zàâäéèêëïîôöùûüç]+)+"
  );

  // Ecoute de la modification du prénom
  form.firstName.addEventListener("change", function () {
    validFirstName(this);
  });

  // Ecoute de la modification du prénom
  form.lastName.addEventListener("change", function () {
    validLastName(this);
  });

  // Ecoute de la modification du prénom
  form.address.addEventListener("change", function () {
    validAddress(this);
  });

  // Ecoute de la modification du prénom
  form.city.addEventListener("change", function () {
    validCity(this);
  });

  // Ecoute de la modification du prénom
  form.email.addEventListener("change", function () {
    validEmail(this);
  });

  //validation du prénom
  const validFirstName = function (inputFirstName) {
    let firstNameErrorMsg = inputFirstName.nextElementSibling;

    if (charRegExp.test(inputFirstName.value)) {
      firstNameErrorMsg.innerHTML = "";
    } else {
      firstNameErrorMsg.innerHTML = "Veuillez renseigner ce champ.";
    }
  };

  //validation du nom
  const validLastName = function (inputLastName) {
    let lastNameErrorMsg = inputLastName.nextElementSibling;

    if (charRegExp.test(inputLastName.value)) {
      lastNameErrorMsg.innerHTML = "";
    } else {
      lastNameErrorMsg.innerHTML = "Veuillez renseigner ce champ.";
    }
  };

  //validation de l'adresse
  const validAddress = function (inputAddress) {
    let addressErrorMsg = inputAddress.nextElementSibling;

    if (addressRegExp.test(inputAddress.value)) {
      addressErrorMsg.innerHTML = "";
    } else {
      addressErrorMsg.innerHTML = "Veuillez renseigner ce champ.";
    }
  };

  //validation de la ville
  const validCity = function (inputCity) {
    let cityErrorMsg = inputCity.nextElementSibling;

    if (charRegExp.test(inputCity.value)) {
      cityErrorMsg.innerHTML = "";
    } else {
      cityErrorMsg.innerHTML = "Veuillez renseigner ce champ.";
    }
  };

  //validation de l'email
  const validEmail = function (inputEmail) {
    let emailErrorMsg = inputEmail.nextElementSibling;

    if (emailRegExp.test(inputEmail.value)) {
      emailErrorMsg.innerHTML = "";
    } else {
      emailErrorMsg.innerHTML = "Veuillez renseigner votre email.";
    }
  };
}
getForm();
