let orderNumber = localStorage.getItem('order');
      if (!orderNumber) {
          localStorage["order"] = JSON.stringify([]);
      }

function getOrderNumber(orderNumber){
  let orderData = JSON.parse(orderNumber);
  console.log(orderData);

  let main = document.getElementById("main");
  let mainP = document.createElement("p");
  let order = document.createElement("div");
  let orderP = document.createElement("p");
  let numberP = document.createElement("p");
  let message = document.createElement("div");
  let backToIndex = document.createElement("p");
  mainP.className = "mainP";
  order.className = "order";

  if (order.length === 0) {
    message.innerHTML = "尚未訂購唷，趕緊去購物吧！";
    main.appendChild(message);
  } else {
    mainP.innerHTML = "感謝購買！";
    orderP.innerHTML = "您的訂單編號：";
    message.innerHTML = "若有任何訂單問題，請於<聯絡我們>留下您的訊息！";
    numberP.innerHTML = orderData;
    // backToIndex.innerHTML = "繼續購物";
    // backToIndex.setAttribute("href", "index.html");
    order.appendChild(orderP);
    order.appendChild(numberP);
    main.appendChild(mainP);
    main.appendChild(order);
    main.appendChild(message);
    main.appendChild(backToIndex);
  }
}

getOrderNumber(orderNumber);
