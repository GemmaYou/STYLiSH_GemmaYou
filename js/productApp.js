let nowSelectCount = 0;
let maxSeleceted = 0;
let nowSelectedColor = "";
let nowSelectedSize = 0;
let productVariants = {};

/*-------------------------show product-------------------------*/
function jsonProduct (productId, product){
  let getDataURL = "https://api.appworks-school.tw/api/1.0/products/details?id="+ productId;

  if (getDataURL != ""){
    let xhr = new XMLHttpRequest();
    xhr.open("GET", getDataURL, true);
    xhr.onreadystatechange = function(){
      if(xhr.readyState === 4 && xhr.status === 200){
        // console.log(xhr.response);
        let json=JSON.parse(xhr.response);
        getProductVariants(json.data);
        product(json);
      }
    };
    xhr.send();
  }
}

function getProductVariants(jsonData) {
  variants = jsonData.variants;
  for(i=0; i < variants.length; i++){
    if(!productVariants[variants[i].color_code]){
      productVariants[variants[i].color_code] ={};
    }
    productVariants[variants[i].color_code][variants[i].size] = variants[i].stock;
  }
}

function product(jsonProduct){
  let productInfo = jsonProduct.data;

  let product = document.getElementById("product");

  let introOverall = document.createElement("div");
  introOverall.className = "productIntroOverall";

  let photoDiv = document.createElement("div");
  let photo = document.createElement("img");
  photoDiv.className = "productPhotoDiv";
  photo.className = "productPhoto";
  photo.src = productInfo.main_image;
  photoDiv.appendChild(photo);

  let introBase = document.createElement("div");
  introBase.className = "productIntroBase";

  let name = document.createElement("p");
  let id = document.createElement("p");
  let price = document.createElement("p");
  let hr = document.createElement("hr");
  let colors = document.createElement("div");
  let sizes = document.createElement("div");
  let counterGroup = document.createElement("div");
  let counterP = document.createElement("p");
  let counter = document.createElement("div");
  let minus = document.createElement("button");
  let quantity = document.createElement("p");
  let plus = document.createElement("button");
  let sizeChoice = document.createElement("button");
  name.className = "productName";
  id.className = "productId";
  price.className = "productPrice";
  colors.className = "productColors";
  colors.id = "productColors";
  sizes.className = "productSizes";
  minus.className = "minus";
  minus.id = "minus";
  quantity.className = "productQuantity";
  quantity.id = "productQuantity";
  plus.className = "plus";
  plus.id = "plus";
  counterGroup.className = "productCounterGroup";
  counterP.className = "productCounterP";
  counter.className = "productCounter";
  sizeChoice.className = "sizeChoice";
  sizeChoice.id = "sizeChoice";
  name.innerHTML = productInfo.title;
  id.innerHTML = productInfo.id;
  price.innerHTML = "TWD. " +productInfo.price;
  colors.innerHTML = "顏色 |";
  sizes.innerHTML = "尺寸 |";
  counterP.innerHTML = "數量 |";
  minus.innerHTML = "-";
  plus.innerHTML = "+";
  sizeChoice.innerHTML = "加入購物車";

  counter.appendChild(minus);
  counter.appendChild(quantity);
  counter.appendChild(plus);
  counterGroup.appendChild(counterP);
  counterGroup.appendChild(counter);

  for (let i=0; i< productInfo.colors.length; i++){
    let color = document.createElement("button");
    color.className = "color";
    color.style = "background-color:#"+productInfo.colors[i].code;
    color.name = productInfo.colors[i].code;
    colors.appendChild(color);
  }


  for (let j=0; j< productInfo.sizes.length; j++){
    let size = document.createElement("button");
    size.className = "productSize";
    size.innerHTML = productInfo.sizes[j];
    size.name = productInfo.sizes[j];
    sizes.appendChild(size);
  }


  let intro = document.createElement("div");
  let introNote = document.createElement("p");
  let introTexture = document.createElement("p");
  let introWash = document.createElement("p");
  let introPlace = document.createElement("p");
  let introDes = document.createElement("p");
  intro.className = "productIntro";
  introNote.innerHTML = productInfo.note;
  introTexture.innerHTML = productInfo.texture;
  introDes.innerHTML = productInfo.description.replace(/\r\n/g, "<br/>");;
  introWash.innerHTML = "清洗/"+productInfo.wash;
  introPlace.innerHTML = "素材產地/"+productInfo.place;
  intro.appendChild(introNote);
  intro.appendChild(introTexture);
  intro.appendChild(introDes);
  intro.appendChild(introWash);
  intro.appendChild(introPlace);

  introBase.appendChild(name);
  introBase.appendChild(id);
  introBase.append(price);
  introBase.appendChild(hr);
  introBase.appendChild(colors);
  introBase.appendChild(sizes);
  introBase.appendChild(counterGroup);
  introBase.appendChild(sizeChoice);
  introBase.appendChild(intro);


  introOverall.appendChild(photoDiv);
  introOverall.appendChild(introBase);

  let detail = document.createElement("div");
  let detailHead = document.createElement("div");
  let detailHeadP = document.createElement("div");
  let p = document.createElement("p");
  let detailLine = document.createElement("div");
  let detailParagraph = document.createElement("p");
  let photoBelow = document.createElement("div");
  detail.className = "productDetail";
  detailHead.className = "productDetailHead";
  detailHeadP.className = "productDetailHeadP";
  detailLine.className = "productDetailLine";
  detailParagraph.className = "productDetailParagraph";
  photoBelow.className = "productPhotoBelow";

  for(let i=0; i<productInfo.images.length; i++){
    let img = document.createElement("img");
    img.src=productInfo.images[i];
    photoBelow.appendChild(img);
  }

  p.innerHTML = "細節說明";
  detailParagraph.innerHTML = productInfo.story;

  detailHeadP.appendChild(p);
  detailHead.appendChild(detailHeadP);
  detailHead.appendChild(detailLine);
  detail.appendChild(detailHead);
  detail.appendChild(detailParagraph);
  detail.appendChild(photoBelow);

  product.appendChild(introOverall);
  product.appendChild(detail);

  //觸發的事件們-----------------------------------------------
  colorButton();
  sizeButton();
  clickOnMinus();
  clickOnPlus();
  clickOnAddToCart(productInfo);
  // getCartTotal(); //抓取資料
  //ajax非同步，必須將要執行的func置於之後

}

// jsonProduct("201807201824" ,product);

jsonProduct (getParam("id"), product);


/*-------------------------------addToCart-------------------------------*/
function clickOnAddToCart(productInfo){
  const addToCart = document.getElementById("sizeChoice");
  addToCart.addEventListener("click", function(){
    let productQuantity = document.getElementById("productQuantity");
    let desktop = document.getElementById("desktopCartQuantity");
    let mobile = document.getElementById("mobileCartQuantity");

    let name;
    for(let j = 0; j < productInfo.colors.length; j++){
      if( nowSelectedColor === productInfo.colors[j].code){
      name = productInfo.colors[j].name;
      }
    }

    let orderProduct = {
            'id': productInfo.id,
            'name': productInfo.title,
            'price': productInfo.price,
            'color': {
                'name': name,
                'code': nowSelectedColor
            },
            'size': nowSelectedSize,
            'qty': parseInt(productQuantity.textContent),
            'main_image': productInfo.main_image,
            'stock': productVariants[nowSelectedColor][nowSelectedSize]
        };

        let shoppingCart = localStorage.getItem('list');
        if (!shoppingCart) {
            localStorage["list"] = JSON.stringify([]);
        }

        if (parseInt(productQuantity.textContent) > 0) {

            // mobile.innerHTML = parseInt(mobile.textContent) + parseInt(productQuantity.textContent);
            // desktop.innerHTML = parseInt(desktop.textContent) + parseInt(productQuantity.textContent);

            shoppingCart = JSON.parse(localStorage["list"]);
            // console.log(shoppingCart[i]);
            for (let i = 0; i < shoppingCart.length; i++) {
                if (productInfo.id === shoppingCart[i]['id'] && nowSelectedColor === shoppingCart[i]['color']['code'] && nowSelectedSize === shoppingCart[i]['size']) {
                    shoppingCart.splice(i, 1);
                }
            }
            // console.log(shoppingCart);
            shoppingCart.push(orderProduct);
            localStorage["list"] = JSON.stringify(shoppingCart);
            alert("商品已加入購物車");
            getCartTotal();

        } else {
            alert("請再次確認商品數量！");
        }

        // console.log(localStorage.getItem('list'));
  });
}


/*----------------------------color/size button----------------------------*/

function colorButton(){
  let allColorButton = document.getElementsByClassName("color");
  let productQuantity = document.getElementsByClassName("productQuantity");
  // for (let i = 0; i < allColorButton.length; i++){
  //   allColorButton[i].setAttribute("id", "color" + i);
  for (let i = 0; i < allColorButton.length; i++){
    allColorButton[i].addEventListener("click", function (){
      for(let j = 0; j < allColorButton.length; j++){
        allColorButton[j].style.outline = "none";
      }
      nowSelectedColor = allColorButton[i].name;
      nowSelectCount = 0;
      maxSeleceted = checkQuantity(nowSelectedColor, nowSelectedSize);
      allColorButton[i].style.outline = "1px solid #000000";
      productQuantity.innerHTML = nowSelectCount;
      // console.log("最大數"+maxSeleceted);
    });
  }
  allColorButton[0].click();
}


function sizeButton() {
    let allSizeButton = document.getElementsByClassName("productSize");
    let productQuantity = document.getElementsByClassName("productQuantity").item(0);
    for (let i = 0; i < allSizeButton.length; i++) {
        allSizeButton[i].addEventListener("click", function () {
            for (let j = 0; j < allSizeButton.length; j++) {
                allSizeButton[j].style.cssText = "background-color:#e6e6e6;color: #333333;";
            }
            nowSelectedSize = allSizeButton[i].name;
            nowSelectCount = 0;
            maxSeleceted = checkQuantity(nowSelectedColor, nowSelectedSize);
            allSizeButton[i].style.cssText = "background-color:#000000; color:#FFFFFF;";
            productQuantity.innerHTML = nowSelectCount;
            // console.log("最大數量：" + maxSeleceted);
        });
    }
    allSizeButton[0].click();
}

function checkQuantity(color, size) {
    return productVariants[color][size];
}

/*---------------------------------Counter---------------------------------*/

function clickOnPlus() {
  let plus = document.getElementsByClassName("plus").item(0);
  let productQuantity = document.getElementsByClassName("productQuantity").item(0);
  plus.addEventListener("click", function(){
    if ( nowSelectCount < maxSeleceted ){
      nowSelectCount += 1;
      productQuantity.innerHTML = nowSelectCount;
    }
  });
  // console.log("clickOnMinus");
  // addToCart(productQuantity);
}

function clickOnMinus() {
  let minus = document.getElementsByClassName("minus").item(0);
  let productQuantity = document.getElementsByClassName("productQuantity").item(0);
  minus.addEventListener("click", function(){
    if ( nowSelectCount > 0 ){
      nowSelectCount -= 1;
      productQuantity.innerHTML = nowSelectCount;
    }
  });
  // console.log("clickOnMinus");
  // addToCart(productQuantity);
}
