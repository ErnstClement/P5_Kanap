// récupération du LOCAL STORAGE // tt
let cartPanier = JSON.parse(localStorage.getItem("panier")); // creation Variable getItem //
let productContainer = document.getElementById("cart__items"); // creation variable selection Id "cart__items" //
console.table(cartPanier);
var totalQty = 0;
var totalPrice = 0;
var articlePrice = 0;
var p = 0;

fetch("http://localhost:3000/api/products")
  .then((Res) => Res.json())
  .then((data) => {
    console.log(data);
    (error) => {
      console.log("Server éteint");
    };
  });

function getPanier() {
  if (cartPanier == null || cartPanier == 0) {
    alert("Votre panier est vide.");
  } else cartPanier && productContainer; // creation condition cartPanier & productContainer EXISTE //
  {
    Object.values(cartPanier).map((item) => {
      //Création automatique du HTML en fonction des objets dans "cartPanier"
      totalQty += parseInt(item.qty);
      totalPrice += parseInt(item.price) * parseInt(item.qty);
      articlePrice = parseInt(item.price);
      console.log(articlePrice);
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
      input.value = item.qty;
      input.setAttribute("type", "number");
      input.setAttribute("class", "itemQuantity");
      input.setAttribute("name", "itemQuantity");
      input.setAttribute("min", "1");
      input.setAttribute("max", "100");
      div5.appendChild(input);
      div6 = document.createElement("div");
      div6.className = "cart__item__content__settings__delete";
      div4.appendChild(div6);
      p3 = document.createElement("p");
      p3.className = "deleteItem";
      p3.innerHTML = "Supprimer";
      div6.appendChild(p3);

      document.getElementById("cart__items").appendChild(article);

      //Création formulaire
      function getForm() {
        let form = document.querySelector(".cart__order__form");

        //Limitation des caractères
        let emailRegExp = new RegExp(
          "^[a-zA-Z0-9.-_]+[@]{1}[a-zA-Z0-9.-_]+[.]{1}[a-z]{2,10}$"
        );
        let charRegExp = new RegExp("^[a-zA-Z ,.'-]+$");
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
    });
  }
}

getPanier();

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
  btnModif[j].addEventListener("change", (event) => {
    var totalChange = document.getElementsByClassName(
      "cart__item__content__titlePrice"
    );
    //var el = document.getElementsByClassName("cart__item__content__titlePrice");
    //var el1 = el.closest("p, div");
    totalChange = articleQty[0].value * articlePrice;

    p.innerHTML = totalChange + `€`;

    event.preventDefault();
  });
}

// Suppression Article

let btnSupprimer = document.getElementsByClassName("deleteItem");

for (let k = 0; k < btnSupprimer.length; k++) {
  btnSupprimer[k].addEventListener("click", (event) => {
    console.log("hello");
    event.preventDefault();

    let idProduit = cartPanier[k].id;
    let couleurProduit = cartPanier[k].colors;

    console.log(cartPanier);

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
