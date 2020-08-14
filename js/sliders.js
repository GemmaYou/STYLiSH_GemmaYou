let slideIndex = 0;
const timerSecs = 10;

function header(){
  let headHolder = document.getElementById("headHolder");
  let sliderBar = document.getElementById("sliderBar");

  let xhr = new XMLHttpRequest();
  xhr.open("GET", "https://api.appworks-school.tw/api/1.0/marketing/campaigns", true);
  xhr.onreadystatechange = function(){
    if(xhr.readyState === 4 && xhr.status === 200){
      // console.log(xhr.response);
      let jsonHeader = JSON.parse(xhr.response);
      let jsonHeaderLength = jsonHeader.data.length;

      if(jsonHeaderLength > 0) {
        // headHolder.style.width = window.innerWidth * jsonHeaderLength + "px";

        for (i=0; i< jsonHeaderLength; i++){
          tempSlider = document.createElement("div");
          tempSlider.className = "headerSliders";
          if (i>=1){
          tempSlider.style.display="none";}

          tempWords = document.createElement("div");
          tempWords.className = "headWords";

          story = jsonHeader.data[i].story.replace(/\r\n/g, "<br/>");
          tempWords.innerHTML = story;

          tempImg = document.createElement("a");
          tempImg.className = "headPhoto";
          imgSrc = document.createElement("img");
          imgSrc.src = "https://api.appworks-school.tw/" + jsonHeader.data[i].picture;
          tempImg.href = "https://gemmayou.github.io/STYLiSH_GemmaYou/product.html?id=" + jsonHeader.data[i].product_id;
          tempImg.appendChild(imgSrc);
          tempSlider.appendChild(tempWords);
          tempSlider.appendChild(tempImg);
          headHolder.appendChild(tempSlider);

          tempSliderNav = document.createElement("a"); //dot
          tempSliderNav.className = "sliderDot";
          sliderBar.appendChild(tempSliderNav);
        }
        document.getElementById("headerDefault").style.display = "none"; //預設不顯示圖片
        showSlides(); //使用輪播
      }
    }
  };
  xhr.send();
}

function showSlides(){
  let sliderBar = document.getElementsByClassName("sliderDot");
  for (let i = 0; i < sliderBar.length; i++){
    sliderBar[i].setAttribute("id", "dot" + i); //為每個dot設定id
    sliderBar[i].addEventListener("mouseenter", enterDot); //滑鼠事件監聽
    sliderBar[i].addEventListener("mouseout", overDot);
  }
  sliderBar[slideIndex].style.background = "#8b572a";
  headerTimer = setInterval(changeImgTimer, timerSecs * 1000); //啟動
}

function enterDot(){
  document.getElementById(this.id).style.background = "#8b572a";
  slideIndex = parseInt(this.id.slice(-1));
  changeImage(slideIndex); //換圖
  clearInterval(headerTimer); //暫停計時
}

function overDot(){
  headerTimer = setInterval(changeImgTimer, timerSecs * 1000); //再次計時
}

function changeImgTimer(){
  if(slideIndex == document.getElementsByClassName("headerSliders").length) {
    slideIndex = 0;
  }
  changeImage(slideIndex);
  slideIndex += 1;
}

function changeImage(slideIndex){
  for(let i =0; i < document.getElementsByClassName("headerSliders").length; i++){
    document.getElementsByClassName("headerSliders")[i].style.display = "none";
    document.getElementsByClassName("sliderDot")[i].style.background = "#BEBEBE";
  }
  document.getElementsByClassName("headerSliders")[slideIndex].style.display = "block";
  document.getElementsByClassName("sliderDot")[slideIndex].style.background = "#8b572a";
}

/*-----------------------------事件-----------------------------*/
header(); //首圖輪播
