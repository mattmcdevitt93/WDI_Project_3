'use strict';
var Cookie = {};

Cookie.checkCookie = function() {
  if ((Cookie.getCookie('User') === 'null') || (Cookie.getCookie('User') === undefined) || (Cookie.getCookie('User') === null)) {
    Cookie.generateName(); // change this once i get the ability to pull the next name from the back end
  } else {
    console.log('ID already set at = ' + Cookie.getCookie('User'));
  }
};

Cookie.generateName = function() {
  // console.log(User.authData)
  if (!!User.authData) {
    console.log('if');
    var login = User.authData.password.email;
    login = login.replace(/([.*+?^${}()|\[\]\/\\])/g, '');
    login = login.replace(/(@)/g, '_');
    login = login.replace(/(com)/g, '');
    var user_id = 'User=' + login;
  } else {
    console.log('else');
    var user_id = (Math.floor((Math.random() * 1000) + 1));
    user_id = 'User=' + user_id;
  }
  document.cookie = user_id;
};

Cookie.getCookie = function(key){
  var keyValue = document.cookie.match('(^|;) ?' + key + '=([^;]*)(;|$)');
  return keyValue ? keyValue[2] : null;
};

Cookie.gameToken = function(game_id) {
  console.log('generate ID cookie' + game_id);
  if ((Cookie.getCookie('Game_id') === 'null') || (Cookie.getCookie('Game_id') === undefined) || (Cookie.getCookie('Game_id') === null)) {
    // var game_token = 'Game_ID=' + game_id;
    // document.cookie = game_token;
    Cookie.makeCookie('Game_ID', game_id);
  } else {
    console.log('ID already set at = ' + Cookie.getCookie('User'));
  }
};

Cookie.deleteCookie = function(name) {
    document.cookie = name + '=;expires=Thu, 01 Jan 1970 00:00:01 GMT;';
};

Cookie.makeCookie = function(key, token) {
  var temp = key + '=' + token;
  document.cookie = temp;
};
