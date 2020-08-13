function statusChangeCallback(response) {  // Called with the results from FB.getLoginStatus().
    console.log('statusChangeCallback');
    if (response.status === 'connected') {   // Logged in
      FB.api('/me','GET',{"fields": "id, name, email, picture"},function(response) {
        console.log(response);
        document.getElementById("profileName").innerHTML = response.name;
        document.getElementById("profileEmail").innerHTML = response.email;
        document.getElementById("profileImg").src = `https://graph.facebook.com/${response.id}/picture?width=500&height=500`;
        // getUser(user);
        }
      );
      // testAPI();
    } else {  // Not logged or unable to tell
      FB.login(function(response) {
        statusChangeCallback(response);
        }, {scope: 'public_profile,email'});
    }
  }

function checkLoginState() {
  FB.getLoginStatus(function(response) {
    statusChangeCallback(response);
  });
}

window.fbAsyncInit = function() {
  FB.init({
    appId      : '563517850969951',
    cookie     : true,
    xfbml      : true,
    version    : 'v7.0'
  });
  //記錄用戶行為資料 可在後台查看用戶資訊
  FB.AppEvents.logPageView();
  checkLoginState(); //先讓套件仔入後，才能執行func
};

(function(d, s, id){
  var js, fjs = d.getElementsByTagName(s)[0];
  if (d.getElementById(id)) {return;}
  js = d.createElement(s); js.id = id;
  js.src = "https://connect.facebook.net/en_US/sdk.js";
  fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));

function testAPI() {   // Testing Graph API after login.  See statusChangeCallback() for when this call is made.
  console.log('Welcome!  Fetching your information.... ');
  FB.api('/me', function(response) {
    console.log('Successful login for: ' + response.name);
    document.getElementById('member').innerHTML =
      'Thanks for logging in, ' + response.name + '!';
  });
}

/*------------------------------------------------------------*/
// let user = localStorage.getItem('user');
//       if (!user) {
//           localStorage["user"] = JSON.stringify([]);
//       }
//
// function getUser(user){
//   let userProfile = JSON.parse(user);
//   console.log(userProfile);
//
//   let main = document.getElementById("main");
//
//   let flex = document.createElement("div");
//   let mainP = document.createElement("p");
//   let img = document.createElement("img");
//   let imgDiv = document.createElement("div");
//   let infoDiv =document.createElement("div");
//   let name = document.createElement("p");
//   let email = document.createElement("p");
//   mainP.className = "mainP";
//   flex.className = "flex";
//   img.className = "profileImg";
//   img.id = "profileImg";
//   name.id = "profileName";
//   email.id = "profileEmail";
//
//   mainP.innerHTML = "個人資料";
//   // img.src = userProfile.userphoto;
//   // name.innerHTML = userProfile.username;
//   // email.innerHTML = userProfile.useremail;
//
//   imgDiv.appendChild(img);
//   infoDiv.appendChild(name);
//   infoDiv.appendChild(email);
//   flex.appendChild(imgDiv);
//   flex.appendChild(infoDiv);
//
//   main.appendChild(mainP);
//   main.appendChild(flex);
//
// }

// getUser(user);
