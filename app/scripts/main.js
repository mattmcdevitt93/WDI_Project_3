'use strict';
var Game = Game || {};


// $(document).ready(function() {

//   Game.initialize();


//   // Runs the main game loop
//   // Game._intervalId = setInterval(Game.run, 1000 / Game.fps);
// });

Game.initialize = function() {
  Game.height = 20;
  Game.width = 45;
  Game.scale = 20;
  Game.sidebar = 200;
  Game.fps = 10;
  Game.token = Cookie.getCookie('Game_ID'); // Fixed thing to be changed later
  // Game.user_token = (Math.floor((Math.random() * 1000) + 1));
  Game.user_token = Cookie.getCookie('User');
  console.log('Game Id - ' + Game.token + ' - ' + Game.user_token);
  var ref = 'https://resplendent-inferno-1504.firebaseio.com/' + Game.token;
  Game.load_map_tiles('test_1');
  Game.data = new Firebase(ref);

  // Sets up what happens when an update comes from Firebase

  Game.firebase_push();

  // Game.updateObject = {};
  // Game.updateObject["user_" + user] = {current_pos: Game.map[0]};
  // console.log(Game.updateObject);
  // Game.data.update(Game.updateObject);
};

Game.firebase_push = function() {
  Game.data.once('value', function(snapshot) {
    Game.snapshot = snapshot.val();
    var map_ref = Game.data.child("map");
    map_ref.set({map_data: Game.map});

  Game.stats = {};
  Game.stats.health = 100;
  Game.stats.mana = 100;

    Game.draw_map(Game.snapshot.map.map_data);
    Game.load_player(Game.user_token);
  });

  Game.data.on('value', function(snapshot) {
    Game.snapshot = snapshot.val();
    var user = Game.snapshot["users"]['user_' + Game.user_token];
    Game.draw_local_character(user);
    Game.refresh(user);
    Game.load_firebase_char(Game.snapshot['users']);
  });
};
