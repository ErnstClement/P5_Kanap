let orderId = localStorage.getItem("orderId"); // creation Variable getItem / récupération du LocalStorage
console.log(orderId);

var validId = document.getElementById("orderId");
validId.innerText = orderId;

localStorage.clear();
