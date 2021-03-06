/* Récupération de l'ID du produit selectionné et création de la variable ID qui reprendra la valeur de l'ID */
const queryString = window.location.search; // récupération de l'id du produit
console.log(queryString);
const urlParams = new URLSearchParams(queryString); // Création constante permettant de travailler avec l'id récuperer
const id = urlParams.get("id");

/* récupération de l'API et génération automatique du contenu via l'api */
fetch("http://localhost:3000/api/products/" + id) //Requete de récupération d'API
  .then((Res) => Res.json())
  .then((data) => {
    (error) => {
      console.log("Server éteint");
    };

    var img = document.createElement("img");
    img.src = data.imageUrl;
    img.alt = data.altTxt;

    document.getElementById("item__img").appendChild(img);

    var name = document.querySelector("H1");
    name.innerHTML = data.name;

    var price = document.getElementById("price");
    price.innerHTML = data.price;

    var description = document.getElementById("description");
    description.innerHTML = data.description;

    // Boucle pour injecter les differentes couleurs pour le menu de selection
    for (let index = 0; index < data.colors.length; index++) {
      var option = document.createElement("option");
      option.setAttribute("value", data.colors[index]);
      option.innerHTML = data.colors[index] + "</option>";
      document.getElementById("colors").appendChild(option);
    }

    /* Création de la fonction sensible au click" pour ajout au panier */
    var order = document.getElementById("addToCart");
    order.addEventListener("click", function (event) {
      var colorsChoice = document.getElementById("colors").value;
      console.log(colorsChoice);
      var qty = document.getElementById("quantity").value;
      var error = false;
      // condition si pas de couleur choisi => alert
      if (colorsChoice == "") {
        alert("Merci de choisir un colori.");
        error = true;
      }
      // condition si pas de quantité choisi => alert
      if (qty <= 0) {
        alert("Merci de choisir une quantitée positive.");
        error = true;
      }
      // condition empechant un choix de quantité supérieur à 100
      if (qty >= 101) {
        alert("Merci de choisir une quantitée inférieur à 100.");
        error = true;
      }
      // si aucune erreur détecté => création de l'array contenant les informations du produit
      if (error === false) {
        /* création array avec les infos du produit */
        var kanapOrder = {
          id: data._id,
          name: data.name,
          qty: qty,
          colors: colorsChoice,
          img: data.imageUrl,
          alt: data.altTxt,
        };

        /* gestion de la commande LocalStorage */

        // var pour récuperer la totalité du "panier"
        var panier = localStorage.getItem("panier");

        // si le panier est vide/inexistant, création d'un tableau dans lequel sera envoyé la commande kanapOrder, ensuite la commande sera envoyée vers le storageLocal
        if (panier == null) {
          var array = Array();
          array.push(kanapOrder);
          localStorage.setItem("panier", JSON.stringify(array));
          alert("Article ajouté à votre panier");

          // si la variable panier existe, ajout des éléments avec des conditions pour filtrer les ID et les couleurs/
        } else {
          var array = JSON.parse(panier);
          var checkElement = false;
          var indexElement = null;
          for (let index = 0; index < array.length; index++) {
            if (
              array[index].id == kanapOrder.id &&
              array[index].colors == kanapOrder.colors
            ) {
              checkElement = true;
              indexElement = index;
            }
          }
          /* Récupération et Parsing du panier existant, analyse et comparaison du panier avec l'article choisi en fonction de sa couleur et son ID*/
          // si l'élément est déja présent dans le panier, addition des quantités choisis et celle déja présente dans le localStorage
          if (checkElement == true) {
            array[indexElement].qty =
              parseInt(array[indexElement].qty) + parseInt(qty);
            localStorage.setItem("panier", JSON.stringify(array));
            alert("Article ajouté à votre panier");
            event.preventDefault;
          }
          // si l'élément n'existe pas, simple ajout au localStorage
          else {
            array.push(kanapOrder);
            localStorage.setItem("panier", JSON.stringify(array));
            alert("Article ajouté à votre panier");
            event.preventDefault;
          }
        }
      }
    });
  });
