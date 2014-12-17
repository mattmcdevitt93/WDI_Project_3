Cookie = {};

Cookie.checkCookie = function() {
  if ((Cookie.getCookie("User") === "null") || (Cookie.getCookie("User") === undefined) || (Cookie.getCookie("User") === null)) {
    Cookie.generateName(); // change this once i get the ability to pull the next name from the back end
  } else {
    console.log('ID already set at = ' + Cookie.getCookie('User'))
  }
}

Cookie.generateName = function() {
  console.log('generate cookie')
  var user_id = (Math.floor((Math.random() * 1000) + 1))
  document.cookie = "User=" + user_id;
};

Cookie.getCookie = function(key){
  var keyValue = document.cookie.match('(^|;) ?' + key + '=([^;]*)(;|$)');
  return keyValue ? keyValue[2] : null;
};

Cookie.gameToken = function(game_id) {
  if ((Cookie.getCookie("Game_id") === "null") || (Cookie.getCookie("Game_id") === undefined) || (Cookie.getCookie("Game_id") === null)) {
    console.log('generate ID cookie')
    document.cookie = "Game_ID=" + game_id;
  } else {
    console.log('ID already set at = ' + Cookie.getCookie('User'))
  }
};
