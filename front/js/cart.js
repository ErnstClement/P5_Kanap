function getPanier() {
  // Fonction pour recuperer le LOCAL STORAGE //
  let cartPanier = localStorage.getItem("panier"); // creation Variable getItem //
  cartPanier = JSON.parse(cartPanier); // conversion JSON => JS //
  let productContainer = document.getElementById("cart__items"); // creation variable selection Id "cart__items" //

  if (cartPanier && productContainer) {
    // creation condition cartPanier & productContainer EXISTE //
    var total = 0;
    Object.values(cartPanier).map((item) => {
      // //
      fetch("http://localhost:3000/api/products/" + item.id) // demande API //
        .then((Res) => Res.json()) // réponse de la requete + transformation en .json //
        .then((data) => {
          // récuperation des données de l'api //

          article = document.createElement("article");
          article.className = "cart__item";
          article.id = "{product-ID}";
          div1 = document.createElement("div");
          div1.className = "cart__item__img";
          article.appendChild(div1);
          img = document.createElement("img");
          img.src = data.imageUrl;
          img.alt = data.altTxt;
          div1.appendChild(img);
          div2 = document.createElement("div");
          div2.className = "cart__item__content";
          article.appendChild(div2);
          div3 = document.createElement("div");
          div3.className = "cart__item__content__titlePrice";
          div2.appendChild(div3);
          h2 = document.createElement("h2");
          h2.innerHTML = `${data.name} ${item.colors}`;
          div3.appendChild(h2);
          p = document.createElement("p");
          p.innerHTML = data.price + `€`;
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
          input.setAttribute("type", "number");
          input.setAttribute("class", "itemQuantity");
          input.setAttribute("name", "itemQuantity");
          input.setAttribute("min", "1");
          input.setAttribute("max", "100");
          input.setAttribute("value", item.qty);
          div5.appendChild(input);
          div6 = document.createElement("div");
          div6.className = "cart__item__content__settings__delete";
          div4.appendChild(div6);
          p3 = document.createElement("p");
          p3.className = "deleteItem";
          p3.innerHTML = "Supprimer";
          div6.appendChild(p3);

          document.getElementById("cart__items").appendChild(article);

          var qtyChange = document.getElementsByClassName("itemQuantity").value;

          console.log(qtyChange);
        });
    });
  }
}

getPanier();

// Création variable pour la séléction de la quantitée

/* qtyChange.addEventListener("change", function (element) {
  preventDefault;
  localStorage.setItem(element.value);
  document.location.reload();
});
 */
let emptyCart = document.getElementsByClassName("deleteItem"); // Création variable pour la suppression article/panier

for (var i = 0; i < emptyCart.length; i++) {
  console.log(emptyCart[i]);
  emptyCart[i].addEventListener("click", function (event) {
    alert("L'article a bien été retiré du panier");
    event.preventDefault;
    localStorage.removeItem();
    document.location.reload();
  });
}
