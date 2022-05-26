/* récupération de l'API */
fetch("http://localhost:3000/api/products") // appel de l'api
  .then((Res) => Res.json()) // en cas de réponse, on passe cette réponse au format .Json
  .then((data) => {
    console.log(data);

    (error) => {
      alert("Serveur non disponible");
      console.log("Server éteint");
    };

    /* Boucle for pour génération automatique de HTML*/
    for (let index = 0; index < data.length; index++) {
      var a = document.createElement("a");
      a.href = "product.html?id=" + data[index]._id;
      var article = document.createElement("article");
      a.appendChild(article);
      var img = document.createElement("img");
      img.src = data[index].imageUrl;
      img.alt = data[index].altTxt;
      article.appendChild(img);
      var h3 = document.createElement("H3");
      h3.className = "productName";
      h3.innerHTML = data[index].name;
      article.appendChild(h3);
      var p = document.createElement("p");
      p.className = "produitDescription";
      p.innerHTML = data[index].description;
      article.appendChild(p);

      document.getElementById("items").appendChild(a);
    }
  });
