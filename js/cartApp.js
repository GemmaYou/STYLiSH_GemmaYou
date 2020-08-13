let cartP = document.getElementById("cartP");
let productBorder = document.getElementById("productBorder");
let itemCost = document.getElementById("itemCostP");
let totalCost = document.getElementById("totalCostP");
let checkout = document.getElementById("checkout");
let delName = document.getElementById("deliveryName");
let delPhone = document.getElementById("deliveryPhone");
let delEmail = document.getElementById("deliveryEmail");
let delAddress = document.getElementById("deliveryAddress");
let deliveryTime = "";
let shoppingCart = localStorage.getItem('list');
    if (!shoppingCart) {
      localStorage["list"] = JSON.stringify([]);
    }
let fbToken = "";
let accSignin = {};
let member1 = document.getElementById("member1");
let member2 = document.getElementById("member2");


/*---------------------------FB login---------------------------*/

function statusChangeCallback(response) { // Called with the results from FB.getLoginStatus().
  console.log('statusChangeCallback');
  if (response.status === 'connected') { // Logged in
    fbToken = response.authResponse.accessToken;
    accSignin = {
      "provider": "facebook",
      "access_token": fbToken
    };
    // console.log(fbToken);
    // console.log(accSignin);
    sendSignin(accSignin);
    // member1.addEventListener("click", function(){
    //   window.location = "profile.html";
    // })
    // member2.addEventListener("click", function(){
    //   window.location = "profile.html";
    // })
    window.location = "profile.html";
    // testAPI();
  } else { // Not logged or unable to tell
    FB.login(function(response) {
      statusChangeCallback(response); //登入再執行
    }, {
      scope: 'public_profile,email'
    });
  }
}

function checkLoginState() {
  FB.getLoginStatus(function(response) {
    statusChangeCallback(response);
  });
}

window.fbAsyncInit = function() {
  FB.init({
    appId: '563517850969951',
    cookie: true,
    xfbml: true,
    version: 'v7.0'
  });
  //記錄用戶行為資料 可在後台查看用戶資訊
  FB.AppEvents.logPageView();
  FB.getLoginStatus(function(response) {
    if (response.status === 'connected') { // Logged in
      fbToken = response.authResponse.accessToken;
      accSignin = {
        "provider": "facebook",
        "access_token": fbToken
      };
      // console.log(fbToken);
      // console.log(accSignin);
      sendSignin(accSignin);
    }
  });
};

(function(d, s, id) {
  var js, fjs = d.getElementsByTagName(s)[0];
  if (d.getElementById(id)) {
    return;
  }
  js = d.createElement(s);
  js.id = id;
  js.src = "https://connect.facebook.net/en_US/sdk.js";
  fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));

function testAPI() { // Testing Graph API after login.  See statusChangeCallback() for when this call is made.
  console.log('Welcome!  Fetching your information.... ');
  FB.api('/me', function(response) {
    console.log('Successful login for: ' + response.name);
    document.getElementById('member').innerHTML =
      'Thanks for logging in, ' + response.name + '!';
  });
}


/*------------------------get Cart Data------------------------*/

function cartProduct(shoppingCart) {
  let cart = JSON.parse(shoppingCart);
  // console.log(cart);

  let cartNumber = 0;
  let itemTotal = 0;
  if (cart.length === 0) {
    let productBorderP = document.createElement("p");
    productBorderP.className = "productBorderP";
    productBorderP.innerHTML = "購物車沒有東西唷！";
    productBorder.appendChild(productBorderP);
    cartP.innerHTML = "購物車（0）";
  } else {
    for (let k = 0; k < cart.length; k++) {
      cartNumber += parseInt(cart[k]['qty']);
    }
    cartP.innerHTML = "購物車（" + cartNumber + "）";

    for (let i = 0; i < cart.length; i++) {

      let product = document.createElement("div");
      product.className = "product";

      let photo = document.createElement("img");
      photo.className = "photo";
      photo.src = cart[i]['main_image'];
      product.appendChild(photo);

      let productIntro = document.createElement("div");
      let name = document.createElement("p");
      let id = document.createElement("p");
      let colorBox = document.createElement("div");
      let boxTitleColor = document.createElement("div");
      let color = document.createElement("div");
      let sizeBox = document.createElement("div");
      let boxTitleSize = document.createElement("div");
      let size = document.createElement("div");
      productIntro.className = "productIntro";
      name.id = "name";
      name.innerHTML = cart[i]['name'];
      id.id = "id";
      id.innerHTML = cart[i]['id'];

      colorBox.className = "colorBox";
      boxTitleColor.className = "boxTitle";
      color.id = "color";
      boxTitleColor.innerHTML = "顏色";
      color.innerHTML = cart[i]['color']['name'];
      colorBox.appendChild(boxTitleColor);
      colorBox.appendChild(color);

      sizeBox.className = "sizeBox";
      boxTitleSize.className = "boxTitle";
      size.id = "size";
      boxTitleSize.innerHTML = "尺寸";
      size.innerHTML = cart[i]['size'];
      sizeBox.appendChild(boxTitleSize);
      sizeBox.appendChild(size);

      productIntro.appendChild(name);
      productIntro.appendChild(id);
      productIntro.appendChild(colorBox);
      productIntro.appendChild(sizeBox);
      product.appendChild(productIntro);

      let qtyBox = document.createElement("div");
      let desktopItemQty = document.createElement("p");
      let qtyForm = document.createElement("form");
      let qtySelect = document.createElement("select");
      qtyBox.className = "qtyBox";
      desktopItemQty.className = "desktopItem";
      qtySelect.className = "qtyOption";
      // qtySelect.id = "qty";
      qtySelect.name = "productQty";
      desktopItemQty.innerHTML = "數量";

      for (let j = 1; j <= parseInt(cart[i]['stock']); j++) {
        let option = document.createElement("option");
        if (j === parseInt(cart[i]['qty'])) {
          option.selected = true;
        }
        option.value = j;
        option.innerHTML = j;
        qtySelect.appendChild(option);
      }

      qtyForm.appendChild(qtySelect);
      qtyBox.appendChild(desktopItemQty);
      qtyBox.appendChild(qtyForm);
      product.appendChild(qtyBox);

      let priceOneItem = document.createElement("div");
      let desktopItemPrice = document.createElement("p");
      let price = document.createElement("p");
      priceOneItem.className = "priceOneItem";
      desktopItemPrice.className = "desktopItem";
      desktopItemPrice.innerHTML = "單價";
      price.innerHTML = "NT." + cart[i]['price'];
      priceOneItem.appendChild(desktopItemPrice);
      priceOneItem.appendChild(price);
      product.appendChild(priceOneItem);

      let priceItemAll = document.createElement("div");
      let desktopItemPriceAll = document.createElement("p");
      let priceAll = document.createElement("p");
      priceItemAll.className = "priceItemAll";
      desktopItemPriceAll.className = "desktopItem";
      priceAll.className = "priceAll";
      desktopItemPriceAll.innerHTML = "小計";
      priceAll.innerHTML = "NT." + parseInt(cart[i]['price']) * parseInt(cart[i]['qty']);
      priceItemAll.appendChild(desktopItemPriceAll);
      priceItemAll.appendChild(priceAll);
      product.appendChild(priceItemAll);
      itemTotal += parseInt(cart[i]['price']) * parseInt(cart[i]['qty']);

      let remove = document.createElement("img");
      remove.className = "removeImg";
      remove.src = "images/cart-remove.png";
      product.appendChild(remove);
      productBorder.appendChild(product);

    }
  }
  let itemCost = document.getElementById("totalItemCost");
  let itemCostP = document.createElement("p");
  let totalCost = document.getElementById("totalCost");
  let totalCostP = document.createElement("p");
  let costLast = 30;
  costLast += itemTotal;
  itemCostP.id = "itemCostP";
  totalCostP.id = "totalCostP";
  itemCostP.innerHTML = /*"總金額 NT. "+*/ itemTotal;
  totalCostP.innerHTML = /*"應付金額 NT. " +*/ costLast;
  itemCost.appendChild(itemCostP);
  totalCost.appendChild(totalCostP);


  clickOnRemove(cart);
  clickOnSelected(cart);
}


/*------------------------delete Item------------------------*/

function clickOnRemove(cart) {
  let removeImg = document.getElementsByClassName("removeImg");
  for (let i = 0; i < removeImg.length; i++) {
    removeImg[i].addEventListener("click", function() {
      cart.splice(i, 1);
      alert("已移除商品！");
      //console.log(cart);
      cartJson = JSON.stringify(cart);
      localStorage.setItem('list', cartJson);
      cartP.innerHTML = "";
      productBorder.innerHTML = "";
      itemCostP.innerHTML = "";
      totalCostP.innerHTML = "";
      shoppingCart = localStorage.getItem('list');
      if (!shoppingCart) {
        localStorage["list"] = JSON.stringify([]);
      }
      cartProduct(shoppingCart);
      getCartTotal();
    })
  }
}


/*------------------------changeQTY------------------------*/

function clickOnSelected(cart) {
  let product = document.getElementsByClassName("product");
  let qtyOption = document.getElementsByClassName("qtyOption");
  let priceItemAll = document.getElementsByClassName("priceItemAll");
  let itemCostP = document.getElementById("itemCostP");
  let totalCostP = document.getElementById("totalCostP");
  let priceAllP = document.getElementsByClassName("priceAll");

  for (let i = 0; i < qtyOption.length; i++) {
    qtyOption[i].addEventListener("change", function() {
      // console.log("selected works");
      let index = qtyOption[i].selectedIndex;
      // console.log(index);
      cart[i]['qty'] = parseInt(index) + 1;
      // console.log(cart[i]);
      localStorage["list"] = JSON.stringify(cart);
      priceAllP[i].innerHTML = "NT." + parseInt(cart[i]['price']) * parseInt(cart[i]['qty']);
      for (let j = 0; j < cart.length; j++) {
        let costLast = 30;
        let itemTotal = 0;
        for (let k = 0; k < cart.length; k++) {
          itemTotal += parseInt(cart[k]['price']) * parseInt(cart[k]['qty']);
        }
        // console.log(itemTotal);
        costLast += itemTotal;
        itemCostP.innerHTML = /*"總金額 NT. "+ */ itemTotal;
        totalCostP.innerHTML = /*"應付金額 NT. "+*/ costLast;
      }
      getCartTotal();
    })
  }
}


/*--------------------------Tap Pay--------------------------*/

TPDirect.setupSDK(12348, 'app_pa1pQcKoY22IlnSXq5m5WP5jFKzoRG58VEXpT7wU62ud7mMbDOGzCYIlzzLF', 'sandbox')
TPDirect.card.setup({
  fields: {
    number: { // css selector
      element: '#card-number',
      placeholder: '**** **** **** ****'
    },
    expirationDate: { // DOM object
      element: document.getElementById('card-expiration-date'),
      placeholder: 'MM / YY'
    },
    ccv: {
      element: '#card-ccv',
      placeholder: '後三碼'
    }
  },
  styles: {
    'input': { // Style all elements
      'color': 'black'
    },
    '.valid': { // style valid state
      'color': 'green'
    },
    '.invalid': { // style invalid state
      'color': 'red'
    },
    // Note that these apply to the iframe, not the root window.
    '@media screen and (max-width: 400px)': {
      'input': {
        'color': 'orange'
      }
    }
  }
})

TPDirect.card.onUpdate(function(update) {
  // update.canGetPrime === true
  // --> you can call TPDirect.card.getPrime()
  if (update.canGetPrime) {
    // Enable submit Button to get prime.
    // submitButton.removeAttribute('disabled')
  } else {
    // Disable submit Button to get prime.
    // submitButton.setAttribute('disabled', true)
  }

  // cardTypes = ['mastercard', 'visa', 'jcb', 'amex', 'unknown']
  if (update.cardType === 'visa') {
    // Handle card type visa.
  }

  // number 欄位是錯誤的
  if (update.status.number === 2) {
    // setNumberFormGroupToError()
  } else if (update.status.number === 0) {
    // setNumberFormGroupToSuccess()
  } else {
    // setNumberFormGroupToNormal()
  }

  if (update.status.expiry === 2) {
    // setNumberFormGroupToError()
  } else if (update.status.expiry === 0) {
    // setNumberFormGroupToSuccess()
  } else {
    // setNumberFormGroupToNormal()
  }

  if (update.status.cvc === 2) {
    // setNumberFormGroupToError()
  } else if (update.status.cvc === 0) {
    // setNumberFormGroupToSuccess()
  } else {
    // setNumberFormGroupToNormal()
  }
})


checkout.addEventListener("click", onSubmit);
// call submit

function onSubmit() {
  event.preventDefault()
  const tappayStatus = TPDirect.card.getTappayFieldsStatus() // 取得 TapPay Fields 的 status，確認是否可以 getPrime

  if (tappayStatus.canGetPrime === false) {
    alert('請輸入付款資料！')
    return
  }

  TPDirect.card.getPrime((result) => { // Get prime
    timeChecked();
    let product = document.getElementsByClassName("product");
    if (product.length === 0) {
      alert("購物車內沒有商品唷！")
    } else if (!delName.value) {
      alert("請輸入姓名！");
    } else if (!delPhone.value) {
      alert("請輸入電話！");
    } else if (!delEmail.value) {
      alert("請輸入Email！")
    } else if (!delAddress.value) {
      alert("請輸入地址！");
    } else if (result.status !== 0) {
      alert("付款失敗，請再次嘗試！") //'get prime error ' + result.msg)
      return
    } else {
      //'get prime 成功，prime: ' + result.card.prime)
      document.getElementById("loading").style.display = "block";
      primeKey = result.card.prime;
    }

    shoppingCart = localStorage.getItem('list');
    if (!shoppingCart) {
      localStorage["list"] = JSON.stringify([]);
    }

    let postData = {
      "prime": primeKey,
      "order": {
        "shipping": "delivery",
        "payment": "credit_card",
        "subtotal": document.getElementById("itemCostP").textContent,
        "freight": 30, //[Freight Fee]
        "total": document.getElementById("totalCostP").textContent,
        "recipient": {
          "name": document.getElementById("deliveryName").value,
          "phone": document.getElementById("deliveryPhone").value,
          "email": document.getElementById("deliveryEmail").value,
          "address": document.getElementById("deliveryAddress").value,
          "time": deliveryTime
        },
        "list": JSON.parse(shoppingCart)
      }
    };
    //console.log(postData);
    sendPrime(postData);
  })
}


/*-------------------------Check Time-------------------------*/
function timeChecked() {
  if (document.getElementById("delMorning").checked === true) {
    deliveryTime = "morning";
  } else if (document.getElementById("delAfternoon").checked === true) {
    deliveryTime = "afternoon";
  } else if (document.getElementById("delUndefine").checked === true) {
    deliveryTime = "anytime";
  }
}


/*-------------------------send Prime-------------------------*/

function sendPrime(postData) {
  // console.log(postData);
  let xhr = new XMLHttpRequest();
  xhr.open("POST", "https://api.appworks-school.tw/api/1.0/order/checkout", true);
  xhr.setRequestHeader('Content-type', 'application/json');
  xhr.setRequestHeader('Authorization', 'Bearer' + fbToken);
  xhr.onreadystatechange = function() {
    if (xhr.readyState === 4 && xhr.status === 200) {
      // console.log(xhr.response);
      let responseData = JSON.parse(xhr.response);
      orderNumber = responseData.data.number;
      localStorage.setItem('order', orderNumber);
      document.getElementById("loading").style.display = "none";
      alert("付款成功！")
      localStorage.removeItem('list');
      window.location = "./thankyou.html";
    }
  };
  xhr.send(JSON.stringify(postData));
}


/*-------------------------Sign In-------------------------*/

function sendSignin(accSignin) {
  let xhr = new XMLHttpRequest();
  xhr.open('POST', "https://api.appworks-school.tw/api/1.0/user/signin");
  xhr.setRequestHeader("Content-type", "application/json");
  xhr.onreadystatechange = function() {
    console.log('accSignin');
  };
  xhr.send(JSON.stringify(accSignin));
}

/*---------------------------事件---------------------------*/
cartProduct(shoppingCart);
