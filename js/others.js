/*-------------------------------addToCart-------------------------------*/
getCartTotal();
function getCartTotal(){
  let desktop = document.getElementById("desktopCartQuantity");
  let mobile = document.getElementById("mobileCartQuantity");
  let storage = localStorage.getItem('list');
  let shoppingCart = localStorage.getItem('list');
        if (!shoppingCart) {
            localStorage["list"] = JSON.stringify([]);
        }
  shoppingCart = JSON.parse(localStorage["list"]);
  let cartTotal = 0; //購物車總數
  if ( shoppingCart.length === 0){
    mobile.innerHTML = cartTotal;
    desktop.innerHTML = cartTotal;
  } else {
    for (let j = 0; j<shoppingCart.length; j++ ){
      cartTotal += parseInt(shoppingCart[j]['qty']) ;
      mobile.innerHTML = cartTotal;
      desktop.innerHTML = cartTotal;
      // console.log("cart");
    }
  }
}


/*----------------------------get param----------------------------*/

function getParam(name, url) { //取得某一個paramer的值
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, " "));
}

/*-----------------------------search-----------------------------*/

const searchImgDesktop = document.getElementById("searchImgDesktop");
searchImgDesktop.addEventListener("click", function () {
    if (document.getElementById("searchInputDesktop").value != "") {
        window.location.href = "./index.html?tag=search&keyword=" + document.getElementById("searchInputDesktop").value;
        //        console.log(document.getElementById("searchInputDesktop").value);
    } else {
        alert("Please Input!");
    }
});

const searchImgMobile = document.getElementById("searchImgMobile");
searchImgMobile.addEventListener("click", function () {
    searchInputForMobile = document.getElementById("searchInputMobile");
    if (window.innerWidth < 768 && window.getComputedStyle(searchInputForMobile, null).getPropertyValue("display") == "none") {
        document.getElementById("searchInputMobile").style.display = "block";
        document.getElementById("searchInputMobile").style.position = "absolute";
        document.getElementById("searchInputMobile").style.top = "2px";
        document.getElementById("searchInputMobile").style.right = "5px";
        document.getElementById("searchInputMobile").style.height = "44px";
        document.getElementById("searchInputMobile").style.borderRadius = "30px";
        document.getElementById("searchInputMobile").style.width = "30%";
    } else if(document.getElementById("searchInputMobile").value != ""){
      window.location.href = "./index.html?tag=search&keyword="+ document.getElementById("searchInputMobile").value;
    } else {
        alert("Please type in words!");
    }
});

// const searchImgMobile = document.getElementById("searchImgMobile");
// searchImgMobile.addEventListener("click",function(){
//   searchMobileProductData(document.getElementById("searchInputMobile").value, productDataRender, nextPage)
// });

document.getElementById("searchImgDesktop").onkeydown = function (e){
  if (e.keyCode == 13){
    if (document.getElementById("searchInputDesktop").value != ""){
      window.location.href = "./index.html?tag=search&keyword=" + document.getElementById("searchInputDesktop").value;
    } else {
      alert("Please type in words!");
    }
  }
};

document.getElementById("searchInputMobile").onkeydown = function (e){
  if (e.keyCode == 13){
    if (document.getElementById("searchInputMobile").value != ""){
      window.location.href = "./index.html?tag=search&keyword=" + document.getElementById("searchInputMobile").value;
    } else {
      alert("Please type in words!");
    }
  }
};//按下enter

/*----------------------------category----------------------------*/

const womenProduct = document.getElementById("womenProduct");
womenProduct.addEventListener("click",function(){
  window.location.href = "./index.html?tag=category&keyword=women";
});

const menProduct = document.getElementById("menProduct");
menProduct.addEventListener("click",function(){
  window.location.href = "./index.html?tag=category&keyword=men";
});

const accProduct = document.getElementById("accProduct");
accProduct.addEventListener("click",function(){
  window.location.href = "./index.html?tag=category&keyword=accessories";
});
