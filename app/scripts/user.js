'use strict';
var User = {}

User.createUser = function () {
  console.log('create account');
  var ref = new Firebase('https://resplendent-inferno-1504.firebaseio.com');
  var username = document.getElementById('user_email').value;
  var password = document.getElementById('user_pw').value;
ref.createUser({
  email    : username,
  password : password
}, function(error) {
  if (error === null) {
    console.log("User created successfully");
  } else {
    console.log("Error creating user:", error);
  }
});
}

User.loginUser = function () {
  var ref = new Firebase('https://resplendent-inferno-1504.firebaseio.com');
  var username = document.getElementById('user_email').value;
  var password = document.getElementById('user_pw').value;
ref.authWithPassword({
  email    : username,
  password : password
}, function(error, authData) {
  if (error) {
    console.log("Login Failed!", error);
  } else {
    console.log("Authenticated successfully with payload:", authData);
    User.authData = authData;
    Cookie.deleteCookie('User');
    Cookie.generateName();
    displayUser();
    document.getElementById("user_email").value = '';
  }
  document.getElementById("user_pw").value = '';
});
};

User.recoverEmail = function () {
  console.log('Recovery Email')
  var ref = new Firebase('https://resplendent-inferno-1504.firebaseio.com');
  var username = document.getElementById('user_email').value;
  ref.resetPassword({
    email : username
  }, function(error) {
  if (error === null) {
    console.log("Password reset email sent successfully");
  } else {
    console.log("Error sending password reset email:", error);
  }
});
}

User.verifiedUser = function () {
  var isnum = /^\d+$/.test(Cookie.getCookie('User'));
  // console.log(isnum);
  return isnum;
}
