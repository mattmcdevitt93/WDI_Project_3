var Game = Game || {};

$(document).ready(function() {
  Game.initialize();

  // Runs the main game loop
  // Game._intervalId = setInterval(Game.run, 1000 / Game.fps);
});

Game.load_map_data = function() {
  // Doing this async
  var map_ref = Game.data.child("map");
  map_ref.set({map_data: Game.map});
};

Game.initialize = function (user) {
  Game.height = 15;
  Game.height = 15;
  Game.width = 20;
  Game.scale = 20;
  Game.fps = 10;
  Game.token = 655; // Fixed thing to be changed later
  Game.user_token = (Math.floor((Math.random() * 1000) + 1));
  Game.token = 'Test_game_' + Game.token;
  var ref = 'https://resplendent-inferno-1504.firebaseio.com/' + Game.token;

  Game.data = new Firebase(ref);
  Game.load_map_data();

  // Sets up what happens when an update comes from Firebase

  Game.data.once("value", function(snapshot) {
    Game.snapshot = snapshot.val();
    Game.draw_map(Game.snapshot.map.map_data);
  });

  Game.data.on("value", function(snapshot) {
    Game.snapshot = snapshot.val();
    var user = Game.snapshot["users"]['user_' + Game.user_token];
    Game.draw_local_character(user);
    Game.refresh(user);
    Game.load_firebase_char(Game.snapshot['users']);
  });

  Game.load_player(Game.user_token);


  // Game.updateObject = {};
  // Game.updateObject["user_" + user] = {current_pos: Game.map[0]};
  // console.log(Game.updateObject);
  // Game.data.update(Game.updateObject);
};
