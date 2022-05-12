// creation Variable getItem / récupération du LocalStorage
let orderId = localStorage.getItem("orderId");
console.log(orderId);

// récupération du numéro de commande pour l'injecter dans le HTML
var validId = document.getElementById("orderId");
validId.innerText = orderId;

// vidage complet du local Storage
localStorage.clear();
