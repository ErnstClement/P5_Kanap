// récupération du LOCAL STORAGE //
let cartPanier = JSON.parse(localStorage.getItem("panier")); // creation Variable getItem / récupération du LocalStorage
let productContainer = document.getElementById("cart__items"); // creation variable selection Id "cart__items"
var totalQty = 0; // création variable à 0 pour récupération hors boucle
var totalPrice = 0; // création variable à 0 pour récupération hors boucle
var articlePrice = 0; // création variable à 0 pour récupération hors boucle
var p = 0; // création variable à 0 pour récupération hors boucle

/* récupération des données de l'API */

fetch("http://localhost:3000/api/products")
  .then((Res) => Res.json())
  .then((data) => {
    console.table(data);
    /* Fonction pour création du HTML en lien avec le contenu du localStorage */

    if (cartPanier == null || cartPanier == 0) {
      var hidden = document.querySelector(".cart__order");
      hidden.style.display = "none";
      var titre = document.querySelector("h1");
      titre.textContent = "Votre panier est vide.";
      // Condition si Panier vide => Alerte "Votre panier est vide"
    } else cartPanier & productContainer; // creation condition cartPanier & productContainer EXISTE //

    {
      function getPanier() {
        var index = 1;
        var priceRecup = 0;
        {
          Object.values(cartPanier).map((item) => {
            // Fetch de l'API pour recuperer les "prices" de chaque item par leur ID
            fetch("http://localhost:3000/api/products/" + item.id) //Requete de récupération d'API
              .then((Res) => Res.json())
              .then((data) => {
                (error) => {
                  console.log("Server éteint");
                };

                //Création automatique du HTML en fonction des objets dans "cartPanier"
                totalQty += parseInt(item.qty);
                console.log(totalQty);
                totalPrice += data.price * parseInt(item.qty);
                articlePrice = data.price;
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
                p.innerHTML = data.price * parseInt(item.qty) + `€`;
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
                inputPriceUnit.value = data.price;
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

                index++; // ici, on utilise index afin de nommer chaque objet (exemple => le premier item aura dans son code l'index 1, le deuxieme item l'index 2, etc...), ce qui servira plus tard pour certaines fonctions de calcul.

                // Calcul du nombre d'article
                var articleQty =
                  document.getElementsByClassName("itemQuantity");

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
                    var totalChange = document.getElementById(
                      "totalPrice-" + idElement
                    );
                    var articlePrice = document.getElementById(
                      "priceUnit-" + idElement
                    ).value;
                    var calcul = articleQty[j].value * parseInt(articlePrice);
                    totalChange.innerHTML = calcul + `€`;

                    /* code permettant la mise à jour du local Storage en cas de modification */
                    var newQty = cartPanier[j].qty; // récupération valeur d'origine de la quantité
                    var newQtyValue = document.getElementById(idElement).value; // récupération valeur modifié de la quantité
                    cartPanier[j].qty = newQtyValue; // remplacement de la quantité de l'élément ciblé
                    localStorage.setItem("panier", JSON.stringify(cartPanier)); // envoi des nouvelles données vers le Localstorage

                    location.reload();
                    event.preventDefault();
                  });
                }

                // Suppression Article

                let btnSupprimer =
                  document.getElementsByClassName("deleteItem");

                for (let k = 0; k < btnSupprimer.length; k++) {
                  // Boucle For lié à deleteItem
                  btnSupprimer[k].addEventListener("click", (event) => {
                    // la boucle réagira au clic
                    event.preventDefault();

                    let idProduit = cartPanier[k].id;
                    let couleurProduit = cartPanier[k].colors;

                    // fonction permettant de filter les suppressions en tenant compte des ID et des couleurs, afin d'eviter de supprimer tout objet du meme ID mais de couleur differentes
                    cartPanier = cartPanier.filter(
                      (el) =>
                        el.id !== idProduit || el.colors !== couleurProduit
                    );

                    console.log(cartPanier);
                    //Alerte produit supprimé et réécriture du Local storage

                    localStorage.setItem("panier", JSON.stringify(cartPanier));
                    location.reload();
                    alert("Ce produit a bien été supprimé du panier");
                  });
                }
              }); /* fetch id*/
            console.log(totalQty);
          });
        }
      }

      getPanier(); // appel de la fonction getPanier
    }
  });

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
