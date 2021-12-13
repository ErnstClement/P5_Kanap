/* Récupération de l'ID du produit selectionné */
const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const id = urlParams.get("id");

/* récupération de l'API et génération automatique du contenu */
fetch("http://localhost:3000/api/products/" + id) //Requete de récupération d'API
  .then((Res) => Res.json())
  .then((data) => {
    console.log(data);

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

    for (let index = 0; index < data.colors.length; index++) {
      var option = document.createElement("option");
      option.setAttribute("value", data.colors[index]);
      option.innerHTML = data.colors[index] + "</option>";
      document.getElementById("colors").appendChild(option);
    }

    /* Création de la fonction sensible au click" pour ajout au panier */
    var order = document.getElementById("addToCart");
    order.addEventListener("click", function (event) {
      alert("Article ajouté à votre panier");
      event.preventDefault;

      var colorsChoice = document.getElementById("colors").value;
      var qty = document.getElementById("quantity").value;

      /* création array avec les infos du produit */
      var kanapOrder = {
        id: data._id,
        name: data.name,
        qty: qty,
        colors: colorsChoice,
        price: data.price,
        img: data.imageUrl,
        alt: data.altTxt,
      };

      /* gestion de la commande LocalStorage */
      var panier =
        localStorage.getItem(
          "panier"
        ); /* var pour récuperer la totalité du "panier" */
      if (panier == null) {
        var array = Array();
        array.push(kanapOrder);
        localStorage.setItem("panier", JSON.stringify(array));
        /* si le panier est vide/inexistant, création d'un tableau dans lequel sera envoyé la commande kanapOrder, ensuite la commande sera envoyée vers le storageLocal */
        /* sinon */
      } else {
        var array = JSON.parse(panier);
        var checkElement = false;
        var indexElement = null;
        for (let index = 0; index < array.length; index++) {
          console.log(array[index].id);
          if (
            array[index].id == kanapOrder.id &&
            array[index].colors == kanapOrder.colors
          ) {
            checkElement = true;
            indexElement = index;
          }
        }
        /* Récupération et Parsing du panier existant, analyse et comparaison du panier avec l'article choisi en fonction de sa couleur et son ID*/
        if (checkElement == true) {
          array[indexElement].qty =
            parseInt(array[indexElement].qty) + parseInt(qty);
          localStorage.setItem("panier", JSON.stringify(array));
        } else {
          array.push(kanapOrder);
          localStorage.setItem("panier", JSON.stringify(array));
          /* si le produit est déja présent dans le panier, addition de la quantité indiquée dans le localStorage, sinon ajout de la quantité indiquée*/
        }
      }
    });
  });
