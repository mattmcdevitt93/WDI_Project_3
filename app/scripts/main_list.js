'use strict';
var data = {};

$('#pw_recover').popover({ trigger: 'hover' });
$('#createUser').popover({ trigger: 'hover' });

$(document).ready(function() {
  console.log('loaded page');
  Cookie.checkCookie();
  displayUser();
  pageCheck();
});

$(window).bind('hashchange', function() {
  pageCheck();
});

function pageCheck () {
  var hash = window.location.hash;
  console.log('page check');
  if (hash === '#/lobby') {
    refreshList();
  }
  if (hash === '#/game') {
    Game.initialize();
  }
  if (hash === '#/contact') {
    console.log('Contact Page');
  }
}

function refreshList () {
  console.log('refresh list')
  $('#Game_List').empty();
  loadList();
}

function loadList() {
  console.log('Load List of Games');
  var firebase_ref = 'https://resplendent-inferno-1504.firebaseio.com';
  data.data = new Firebase(firebase_ref);

  data.data.once('value', function(snapshot) {
   snapshot = snapshot.val();
   data.snapshot = toArray(snapshot);
   displayList(data.snapshot);
 });
}

function toArray(obj) {
  var keys = [];
  for (var key in obj) {
    keys.push(key);
  }
  return keys;
}

function displayList (snapshot) {
  console.log('display list ' + snapshot.length);
  for (var i = 0; i < snapshot.length; i++) {
    var div = document.getElementById('Game_List');
    var game_id = snapshot[i].toString();
    var text = '<div class="gameEntry">Name: ' + snapshot[i] + ' - <a ng-href="#/game" href="#/game" onclick="Cookie.gameToken(\'' + game_id + '\'), Game.pw_check()" class="btn btn-primary">Join Game</a></div>';
    div.innerHTML = div.innerHTML + text;
  }
}

function createRoom () {
  var verified = User.verifiedUser();
  var name = document.getElementById('New_room_name').value;
  var password = document.getElementById('New_room_pw').value;
  if (verified === false) {
    if (name === '') {
      var notNull = true;
    } else {
      var notNull = false;
    }
    console.log('New Room - ' + name + ' - ' + notNull);
    if (-1 === data.snapshot.indexOf(name) && notNull === false) {
      var ref = 'https://resplendent-inferno-1504.firebaseio.com/' + name;
      data.data = new Firebase(ref);
      data.data.set({Password: password, Host: Cookie.getCookie('User')});
      document.getElementById('New_room_name').value = '';
      document.getElementById('New_room_pw').value = '';
      refreshList();
    } else {
      console.log('Room already exists / Blank Input');
    }
  } else {
    var div = document.getElementById('create_button');
    var text = '<button type="button" class="btn btn-warning" onclick="createRoom()" id="create_room">Login Required</button>';
    div.innerHTML = text;
  }
}

function displayUser () {
  var user = Cookie.getCookie('User');
  var div = document.getElementById('user_cookie');
  var text = 'User: ' + user;
  div.innerHTML = '';
  div.innerHTML = div.innerHTML + text;
}

