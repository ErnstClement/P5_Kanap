/*--- récupération du LOCAL STORAGE-----------------------------------*/

let cartPanier = JSON.parse(localStorage.getItem("panier")); // creation Variable getItem / récupération du LocalStorage
const productContainer = document.getElementById("cart__items"); // creation variable selection Id "cart__items"
let panierFiltred = []; // Création variable vide pour insertion

var totalQty = 0; // création variable à 0 pour récupération hors boucle
var totalPrice = 0; // création variable à 0 pour récupération hors boucle
var articlePrice = 0; // création variable à 0 pour récupération hors boucle
var p = 0; // création variable à 0 pour récupération hors boucle*/

/*--------------------------------------------------------------------*/

/*--- récupération des données de l'API via Fetch---------------------*/

/* */
function getProducts() {
  fetch("http://localhost:3000/api/products/") //Requete de récupération d'API
    .then((Res) => Res.json())
    .then((listProduct) => {
      let list = listProduct;
      if (cartPanier && cartPanier.length) {
        let recupProduit = cartPanier.map((panier) => panier.idPanier);
        panierFiltred = list.filter((el) => recupProduit.includes(el.id));
        console.log(listProduct);

        getPanier(panierFiltred);
        modifyQuantity();
        getTotals();
        deleteArticle();

        // Création Mention panier vide si LocalStorage vide
      } else {
        if (cartPanier == null || cartPanier == 0) {
          const panierVide = "<p>Votre panier est vide</p>";
          productContainer.innerHTML = panierVide;
        }
      }
    });
}
getProducts();
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

    /*
    // Ajout du prix
    let productPrice = document.createElement("p");
    itemContentTitlePrice.appendChild(productPrice);
    const currentProduct = panierFiltred.find(
      (p) => p._id === cartPanier[panier].idPanier
    );
    productPrice.innerHTML = currentProduct.price + " €";
*/
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

function getTotals() {
  // On récupère la quantité totale
  let elementsQuantity = document.getElementsByClassName("itemQuantity");
  let myLength = elementsQuantity.length;
  totalQuantity = 0;
  //(expression initiale, condition, incrémentation)
  for (let i = 0; i < myLength; i++) {
    totalQuantity += elementsQuantity[i].valueAsNumber;
  }

  let productTotalQuantity = document.getElementById("totalQuantity");
  productTotalQuantity.innerHTML = totalQuantity;

  // On récupère le prix total
  totalPrice = 0;
  for (let i = 0; i < myLength; i++) {
    totalPrice += elementsQuantity[i].valueAsNumber * panierFiltred[i].price;
  }

  let productTotalPrice = document.getElementById("totalPrice");
  productTotalPrice.innerHTML = totalPrice;
}

// Modification des quantitées
function modifyQuantity() {
  let itemModif = document.querySelectorAll(".itemQuantity");
  console.log(itemModif);

  for (let j = 0; j < itemModif.length; j++) {
    itemModif[j].addEventListener("change", (event) => {
      event.preventDefault();
      //Je selectionne l'élément à modifier selon son Id et sa couleur
      let itemNew = cartPanier[j].qty;
      let itemModifValue = itemModif[j].valueAsNumber;

      const result = cartPanier.find(
        (element) => element.itemModifValue !== itemNew
      );

      result.qty = itemModifValue;
      cartPanier[j].qty = result.qty;

      localStorage.setItem("panier", JSON.stringify(cartPanier));

      location.reload(); // rafraichir la  page
      //alert("votre panier est à jour.")
    }); //fin addeventlistener
  }
}

// Suppression article

function deleteArticle() {
  let deleteItem = document.querySelectorAll(".deleteItem");
  console.log(deleteItem);

  for (let k = 0; k < deleteItem.length; k++) {
    deleteItem[k].addEventListener("click", (event) => {
      event.preventDefault();

      //Je selectionne l'élément à modifier selon son Id et sa couleur
      let deleteId = cartPanier[k].id;
      let deleteColor = cartPanier[k].colors;

      cartPanier = cartPanier.filter(
        (element) => element.id !== deleteId || element.colors !== deleteColor
      );
      localStorage.setItem("panier", JSON.stringify(cartPanier));

      location.reload();
      alert("Votre article a bien été supprimé.");
    }); //fin addEventListener
  }
}

// Validation formulaire
function getForm() {
  let error = false;

  // Création racine pour les écoutes au change de chaque champ du formulaire
  let form = document.querySelector(".cart__order__form");

  //validation du prénom

  form.firstName.addEventListener("change", function () {
    // création de la fonction permettant l'écoute au change du champ "firstName"

    validFirstName(this);
  });

  //validation du nom

  form.lastName.addEventListener("change", function () {
    validLastName(this);
  });

  //validation de l'adresse

  form.address.addEventListener("change", function () {
    validAddress(this);
  });

  //validation de la ville

  form.city.addEventListener("change", function () {
    validCity(this);
  });

  //validation de l'email

  form.email.addEventListener("change", function () {
    validEmail(this);
  });
}

getForm();

// Envoi du formulaire vers le localStorage

const orderBtn = document.getElementById("order");

order.addEventListener("click", (event) => {
  // création constante au click du bouton commander
  const inputName = document.getElementById("firstName"); // récupération firstName
  const inputLastName = document.getElementById("lastName"); // récupération lastName
  const inputAdress = document.getElementById("address"); // récupération address
  const inputCity = document.getElementById("city"); // récupération city
  const inputMail = document.getElementById("email"); // récupération email

  /* récupération des id des produits dans le panier */

  var idPanier = []; // création variable vide
  for (let p = 0; p < cartPanier.length; p++) {
    // boucle For pour récupérer les ID de chaque produit
    idPanier.push(cartPanier[p].id);
  }

  /* Création array avec les coordonnées et les ID des produits dans le panier */
  const globalOrder = {
    //Création tableau
    contact: {
      // Partie Contact
      firstName: inputName.value,
      lastName: inputLastName.value,
      address: inputAdress.value,
      city: inputCity.value,
      email: inputMail.value,
    },
    products: idPanier, // Partie ID
  };

  console.log(firstName.value);

  /* création méthode POST pour l'envoi des données globalOrder*/
  const method = {
    method: "POST",
    body: JSON.stringify(globalOrder), // Données à envoyer
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    mode: "cors", // autorisation requete
  };

  /*envoi formulaire vers API */

  // récupération de la Const method et suppression du local storage des données de la commande
  if (error == true) {
    fetch("http://localhost:3000/api/products/order", method)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        localStorage.clear();
        localStorage.setItem("orderId", data.orderId);

        // redirection vers la page de confirmation incluant l'ID de la commande//
        document.location.href = "confirmation.html?id=" + data.orderId;
      });

    event.preventDefault();
  }
});
