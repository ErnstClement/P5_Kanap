/*--- récupération du LOCAL STORAGE-----------------------------------*/

let cartPanier = JSON.parse(localStorage.getItem("panier")); // creation Variable getItem / récupération du LocalStorage
const productContainer = document.getElementById("cart__items"); // creation variable selection Id "cart__items"
let productTotalQuantity = document.getElementById("totalQuantity");
let productTotalPrice = document.getElementById("totalPrice");
totalQuantity = 0;
totalPrice = 0;
let panierFiltred = []; // Création variable vide pour insertion

/*--------------------------------------------------------------------*/

/*--- récupération des données de l'API via Fetch---------------------*/

// Si le panier est vide
if (cartPanier == null || cartPanier == 0) {
  const panierVide = "<p>Votre panier est vide</p>";
  productContainer.innerHTML = panierVide; // message P votre panier est vide
  productTotalQuantity.innerHTML = totalQuantity; // ajout du 0 dans les quantitées
  productTotalPrice.innerHTML = totalPrice; // ajout du 0 dans le prix total
} else {
  getProducts();
}

function getProducts() {
  fetch("http://localhost:3000/api/products/") //Requete de récupération d'API
    .then((Res) => Res.json())
    .then((listProduct) => {
      let list = listProduct;
      if (cartPanier && cartPanier.length) {
        // Si le panier(LocalStorage) contient des éléments
        let recupProduit = cartPanier.map((panier) => panier.id); // Mapping des éléments présent via leur ID
        panierFiltred = list.filter((el) => recupProduit.includes(el._id));
        // Appel des fonctions
        getPanier(panierFiltred);
        modifyQuantity();
        getTotals(panierFiltred);
        deleteArticle();

        // Création Mention panier vide si LocalStorage vide
      }
    });
}
/*--------------------------------------------------------------------*/

/*--- Création automatique du panier--------------------------------*/

function getPanier(listProduct) {
  //creation de l'article
  for (let panier in cartPanier) {
    let article = document.createElement("article");
    document.querySelector("#cart__items").appendChild(article);
    article.className = "cart__item";
    article.setAttribute("data-id", cartPanier[panier].id);

    // Ajout de la div "cart__item__img"
    let productDiv = document.createElement("div");
    article.appendChild(productDiv);
    productDiv.className = "cart__item__img";

    // ajout de l'image
    let productImg = document.createElement("img");
    productDiv.appendChild(productImg);
    productImg.src = cartPanier[panier].img;
    productImg.alt = cartPanier[panier].altimg;

    // Ajout de la div "cart__item__content"
    let itemContent = document.createElement("div");
    article.appendChild(itemContent);
    itemContent.className = "cart__item__content";

    // Ajout de la div "cart__item__content__titlePrice"
    let itemContentTitlePrice = document.createElement("div");
    itemContent.appendChild(itemContentTitlePrice);
    itemContentTitlePrice.className = "cart__item__content__titlePrice";

    // Ajout du titre h2
    let productTitle = document.createElement("h2");
    itemContentTitlePrice.appendChild(productTitle);
    productTitle.innerHTML = cartPanier[panier].name;

    // Ajout de la couleur
    let productColor = document.createElement("p");
    productTitle.appendChild(productColor);
    productColor.innerHTML = cartPanier[panier].colors;

    // Ajout du prix
    let productPrice = document.createElement("p");
    itemContentTitlePrice.appendChild(productPrice);
    // Utilisation de find pour récuperer les données du produit a partir de la liste des produits API
    const currentProduct = panierFiltred.find(
      (p) => p._id === cartPanier[panier].id
    );
    productPrice.innerHTML = currentProduct.price + " €";

    // Ajout de la div "cart__item__content__settings"
    let itemContentSettings = document.createElement("div");
    itemContent.appendChild(itemContentSettings);
    itemContentSettings.className = "cart__item__content__settings";

    // Ajout de la div "cart__item__content__settings__quantity"
    let itemContentSettingsQuantity = document.createElement("div");
    itemContentSettings.appendChild(itemContentSettingsQuantity);
    itemContentSettingsQuantity.className =
      "cart__item__content__settings__quantity";

    // Ajout de "Qté : "
    let productQte = document.createElement("p");
    itemContentSettingsQuantity.appendChild(productQte);
    productQte.innerHTML = "Qté : ";
    // Ajout de la quantité
    let productQuantity = document.createElement("input");
    itemContentSettingsQuantity.appendChild(productQuantity);
    productQuantity.value = cartPanier[panier].qty;
    productQuantity.className = "itemQuantity";
    productQuantity.setAttribute("type", "number");
    productQuantity.setAttribute("min", "1");
    productQuantity.setAttribute("max", "100");
    productQuantity.setAttribute("name", "itemQuantity");
    // Ajout de la "div" "cart__item__content__settings__delete"
    let itemContentSettingsDelete = document.createElement("div");
    itemContentSettings.appendChild(itemContentSettingsDelete);
    itemContentSettingsDelete.className =
      "cart__item__content__settings__delete";

    // Ajout de "p" suppression
    let productDelete = document.createElement("p");
    itemContentSettingsDelete.appendChild(productDelete);
    productDelete.className = "deleteItem";
    productDelete.innerHTML = "Supprimer";
  }
}
// -----------------------------------------------------------

// --- Récupération des totaux ------------------------------------
function getTotals(panierProducts) {
  // On récupère la quantité totale
  let elementsQuantity = document.getElementsByClassName("itemQuantity");
  let myLength = elementsQuantity.length;
  totalQuantity = 0;
  //boucle For pour récupération des quantités pour chaque article
  for (let i = 0; i < myLength; i++) {
    totalQuantity += elementsQuantity[i].valueAsNumber;
  }

  let productTotalQuantity = document.getElementById("totalQuantity");
  productTotalQuantity.innerHTML = totalQuantity;

  // On récupère le prix total
  totalPrice = 0;
  // Boucle For pour récupération des quantitées totales de chaque article pour le multiplier avec son prix unitaire
  for (let i = 0; i < cartPanier.length; i++) {
    const currentProduct = panierProducts.find(
      (p) => p._id === cartPanier[i].id
    );
    totalPrice += cartPanier[i].qty * currentProduct.price;
  }
  let productTotalPrice = document.getElementById("totalPrice");
  productTotalPrice.innerHTML = totalPrice;
}
//------------------------------------------------------------------

//--- Modification des quantitées-----------------------------------
function modifyQuantity() {
  let itemModif = document.querySelectorAll(".itemQuantity");

  // Boucle For avec un event au changement de .itemQuantity
  for (let j = 0; j < itemModif.length; j++) {
    itemModif[j].addEventListener("change", (event) => {
      event.preventDefault();
      //Je selectionne l'élément à modifier selon son Id et sa couleur
      let itemNew = cartPanier[j].qty;
      let itemModifValue = itemModif[j].valueAsNumber;

      const result = cartPanier.find(
        (element) => element.itemModifValue !== itemNew
      );

      result.quantity = itemModifValue;
      cartPanier[j].qty = result.quantity;

      localStorage.setItem("panier", JSON.stringify(cartPanier)); // Ré-écriture du local Storage

      location.reload(); // rafraichir la  page
      alert("votre panier est à jour.");
    });
  }
}
//-----------------------------------------------------------------

//--- Suppression article------------------------------------------

function deleteArticle() {
  let deleteItem = document.querySelectorAll(".deleteItem");
  // Boucle For sensible au clic de .deleteItem
  for (let k = 0; k < deleteItem.length; k++) {
    deleteItem[k].addEventListener("click", (event) => {
      event.preventDefault();

      //Je selectionne l'élément à modifier selon son Id et sa couleur
      let deleteId = cartPanier[k].id; // Target ID
      let deleteColor = cartPanier[k].colors; // Target Couleur

      cartPanier = cartPanier.filter(
        // Filtre pour verifier les inégalités de l'ID et de la Couleur
        (element) => element.id !== deleteId || element.colors !== deleteColor
      );
      localStorage.setItem("panier", JSON.stringify(cartPanier)); // Ré-écriture du local Storage

      location.reload();
      alert("Votre article a bien été supprimé.");
    });
  }
}
//-----------------------------------------------------------------

//--- Validation formulaire----------------------------------------

function getForm() {
  //Création des expressions régulières
  let emailRegExp = new RegExp(
    "^[a-zA-Z0-9.-_]+[@]{1}[a-zA-Z0-9.-_]+[.]{1}[a-z]{2,10}$"
  );
  let letterRegExp = new RegExp("^[a-zA-Zéèàê,.'-]+$");
  let addressRegExp = new RegExp(
    "^[0-9]{1,3}(?:(?:[,. ]){1}[-a-zA-Zàâäéèêëïîôöùûüç]+)+"
  );

  // Création racine pour les écoutes au changement de chaque champ du formulaire
  let form = document.querySelector(".cart__order__form");

  //validation du prénom
  // création de la fonction permettant l'écoute au change du champ "firstName"
  form.firstName.addEventListener("change", function () {
    validFirstName(this);
  });

  //validation du nom
  // création de la fonction permettant l'écoute au change du champ lastName
  form.lastName.addEventListener("change", function () {
    validLastName(this);
  });

  //validation de l'adresse
  // création de la fonction permettant l'écoute au change du champ "address"
  form.address.addEventListener("change", function () {
    validAddress(this);
  });

  //validation de la ville
  // création de la fonction permettant l'écoute au change du champ "city"
  form.city.addEventListener("change", function () {
    validCity(this);
  });

  //validation de l'email
  // création de la fonction permettant l'écoute au change du champ "email"

  form.email.addEventListener("change", function () {
    validEmail(this);
  });

  //validation du prénom
  let validFirstName = function (inputFirstName) {
    let firstNameErrorMsg = inputFirstName.nextElementSibling;

    if (letterRegExp.test(inputFirstName.value)) {
      firstNameErrorMsg.innerHTML = "";
    } else {
      firstNameErrorMsg.innerHTML =
        "Veuillez renseigner ce champ. ex : Charles";
    }
  };

  //validation du nom
  let validLastName = function (inputLastName) {
    let lastNameErrorMsg = inputLastName.nextElementSibling;

    if (letterRegExp.test(inputLastName.value)) {
      lastNameErrorMsg.innerHTML = "";
    } else {
      lastNameErrorMsg.innerHTML = "Veuillez renseigner ce champ. ex : Durand";
    }
  };

  //validation de l'adresse
  let validAddress = function (inputAddress) {
    let addressErrorMsg = inputAddress.nextElementSibling;

    if (addressRegExp.test(inputAddress.value)) {
      addressErrorMsg.innerHTML = "";
    } else {
      addressErrorMsg.innerHTML =
        "Veuillez renseigner ce champ. ex : 25 chemin de la resistance";
    }
  };

  //validation de la ville
  let validCity = function (inputCity) {
    let cityErrorMsg = inputCity.nextElementSibling;

    if (letterRegExp.test(inputCity.value)) {
      cityErrorMsg.innerHTML = "";
    } else {
      cityErrorMsg.innerHTML = "Veuillez renseigner ce champ. ex : Toulouse";
    }
  };

  //validation de l'email
  let validEmail = function (inputEmail) {
    let emailErrorMsg = inputEmail.nextElementSibling;

    if (emailRegExp.test(inputEmail.value)) {
      emailErrorMsg.innerHTML = "";
    } else {
      emailErrorMsg.innerHTML =
        "Email non valide. ex : charles.durand@gmail.com";
    }
  };
}

getForm(); // Appel Fonction getForm
//---------------------------------------------------

//--- Envoi du formulaire vers le localStorage--------
const orderBtn = document.getElementById("order");
function sendForm() {
  // création constante au click du bouton commander
  let firstName = document.getElementById("firstName").value; // récupération firstName
  let lastName = document.getElementById("lastName").value; // récupération lastName
  let address = document.getElementById("address").value; // récupération address
  let city = document.getElementById("city").value; // récupération city
  let email = document.getElementById("email").value; // récupération email
  const contact = {
    // Partie Contact
    firstName,
    lastName,
    address,
    city,
    email,
  };

  // Création de l'array pour les éléments du panier
  let products = [];

  if (
    contact.firstName &&
    contact.lastName &&
    contact.address &&
    contact.city &&
    contact.email &&
    cartPanier &&
    cartPanier.length
  ) {
    for (let l = 0; l < cartPanier.length; l++) {
      products.push(cartPanier[l].id);
    }
    globalOrder(contact, products);
    console.log(products);
  } else {
    alert(
      "Veuillez remplir le formulaire de contact ou ajouter un article dans votre panier."
    );
  }
}
orderBtn.addEventListener("click", sendForm);

function globalOrder(contact, products) {
  if (products && products.length && contact) {
    fetch("http://localhost:3000/api/products/order", {
      method: "POST",
      body: JSON.stringify({ contact, products }),
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      mode: "cors",
    })
      .then(function (res) {
        if (res.ok) {
          return res.json();
        }
      })
      .then(function (data) {
        localStorage.clear();
        localStorage.setItem("orderId", data.orderId);
        // redirection vers la page de confirmation incluant l'ID de la commande//
        document.location.href = "confirmation.html?id=" + data.orderId;
      })
      .catch(function (err) {
        alert("Impossible de passer la commande");
        console.log(err);
      });
  }
}

//---------------------------------------------------------
