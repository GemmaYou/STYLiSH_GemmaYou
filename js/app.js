let nextPage = 0;
let scrollLock = false;
let lastFunction;
let lastSearch;


function getParam(name, url) { //取得某一個paramer的值
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, " "));
}


function resetVariable(func, search){
  nextPage = 0;
  scrollLock = false;
  lastFunction = func;
  lastSearch = search;
  return 0;
}

function initialProductDataRender (){
  if (!getParam("tag")){
    lastFunction = "category";
    lastSearch = "all";
    getProductsData(lastFunction, lastSearch, productDataRender, nextPage);
  } else {
    lastFunction = getParam("tag");
    lastSearch = getParam("keyword");
    getProductsData(lastFunction, lastSearch, productDataRender, nextPage);
  }
}

function searchInvalid(){
  document.getElementById("products").innerHTML = "Nothing!";
}

function getProductsData(tag, keyword, productDataRender, page){
  scrollLock = true;
  let getDataURL;
  if (tag == "category"){
    if(lastFunction != "category" || lastSearch != keyword){
      page = resetVariable("category", keyword);
    }
    getDataURL = "https://api.appworks-school.tw/api/1.0/products/" + keyword + "?paging=" + page;
  } else if (tag == "search") {
    if (keyword === ""){
      alert("Please type in!");
      getDataURL = "";
    } else {
      if (lastFunction != "search" || lastSearch != keyword){
        page = resetVariable("search", keyword);
      }
      getDataURL = "https://api.appworks-school.tw/api/1.0/products/search?keyword=" + keyword + "&paging=" + page;
    }
  }

  if (getDataURL != "") {
      let xhr = new XMLHttpRequest();
      xhr.open("GET", getDataURL, true);
      xhr.onreadystatechange = function () {
          if (xhr.readyState === 4 && xhr.status === 200) {
              //      console.log(xhr.response);
              let jsonProduct = JSON.parse(xhr.response)
              if (jsonProduct.data.length > 0) {
                  productDataRender(jsonProduct);
              } else {
                  searchInvalid();
              }

              if (jsonProduct.next_paging) {
                  nextPage = jsonProduct.next_paging;
                  lastFunction = tag;
                  lastSearch = keyword;
                  scrollLock = false;
              } else {
                  scrollLock = true;
              }
          }
      };
      xhr.send();
  }
}

function productDataRender(response){
  if (nextPage === 0) {   //頁面重整
    document.getElementById("products").innerHTML = "";
  }

  for (let i=0; i<response.data.length; i++){
    let productDiv = document.createElement("div");
    // let productImgA = document.createElement("a");
    let productImg = document.createElement("img");
    let productIntro = document.createElement("div");
    let productColors = document.createElement("div");
    let productTitle = document.createElement("a");
    let productPrice = document.createElement("p");

    productDiv.className = "product";
    productIntro.className = "productIntro";
    productColors.className = "colors";

    productTitle.innerHTML = response.data[i].title;
    productTitle.href = "./product.html?id="+response.data[i].id;
    productPrice.innerHTML = "NTD. "+response.data[i].price;
    productImg.src = response.data[i].main_image;

    for(let j=0; j<response.data[i].colors.length; j++){
      let color = document.createElement("div");
      color.className = "color";
      color.style = "background-color:#" + response.data[i].colors[j].code;
      productColors.appendChild(color);
    }
    // productImgA.appendChild(productImg);
    productDiv.appendChild(productImg);
    productIntro.appendChild(productColors);
    productIntro.appendChild(productTitle);
    productIntro.appendChild(productPrice);
    productDiv.appendChild(productIntro);
    document.getElementById("products").append(productDiv);
  };
}


/*-----------------------------事件-----------------------------*/

initialProductDataRender(); //首頁


window.onload =function(){
  let windowHeight = document.documentElement.clientHeight;
  let preloadHeight = 50;

  window.addEventListener("scroll", function(){
    let buttomTopLocation = document.getElementsByClassName("buttom")[0].getBoundingClientRect().top; //buttom在頁面中的位置

    if(!scrollLock){
      if (buttomTopLocation < windowHeight + preloadHeight){
        if(lastFunction === "category"){
          getProductsData("category", lastSearch, productDataRender, nextPage);
        } else if(lastFunction === "search"){
          getProductsData("category", lastSearch, productDataRender, nextPage);
        }
      }
    }
  })
};
