let fbToken ="";
let accSignin = {};

function statusChangeCallback(response) {  // Called with the results from FB.getLoginStatus().
    console.log('statusChangeCallback');
    if (response.status === 'connected') {   // Logged in
      // fbToken = response.authResponse.accessToken;
      // accSignin = {
      //   "provider": "facebook",
      //   "access_token": fbToken
      // };
      // console.log(fbToken);
      // console.log(accSignin);
      window.location = "profile.html";
      // testAPI();
    } else {  // Not logged or unable to tell
      FB.login(function(response) {
        statusChangeCallback(response); //登入再執行
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
    appId: '563517850969951',
    cookie: true,
    xfbml: true,
    version: 'v7.0'
  });
  //記錄用戶行為資料 可在後台查看用戶資訊
  FB.AppEvents.logPageView();
  FB.getLoginStatus(function(response) {
    if (response.status === 'connected') { // Logged in
      console.log("already login");
      // fbToken = response.authResponse.accessToken;
      // accSignin = {
      //   "provider": "facebook",
      //   "access_token": fbToken
      // };
      // console.log(fbToken);
      // console.log(accSignin);
      // sendSignin(accSignin);
    }
  });
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
