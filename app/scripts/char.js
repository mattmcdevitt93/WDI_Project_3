'use strict';
var Game = Game || {};

Game.load_player = function(user) {
  var players_parent = Game.data.child('users');
  Game.updateObject = {};
  Game.updateObject['user_' + user] = Game.starting_position();
  players_parent.update(Game.updateObject); // Tells Firebase starting position of user
};

Game.starting_position = function() {
  return {current_pos: Game.map[0]};
};

Game.draw_local_character = function(user) {
  Game.collision = true;

  Crafty.sprite('./images/Char_1.38f3cfb6.png', {player:[0,0,Game.scale,Game.scale]});
  Game.character = Crafty.e('Collision, Canvas, Color, player')
  .attr({x: user.current_pos[0] * Game.scale, y: user.current_pos[1] * Game.scale, w: Game.scale, h: Game.scale})
  .checkHits('wall')
  .bind('EnterFrame', Game.enter_frame)
  .bind('ExitFrame', Game.exit_frame)
  .bind('HitOn', Game.hit_wall)
  .bind('KeyDown', Game.key_bindings);
};

Game.enter_frame = function () {
  // Game.move = 0;
  // Game.move_test();
};

Game.exit_frame = function () {
  // Game.move = 0;
  Game.update_firebase(); // This updates Firebase
};

Game.hit_wall = function(hitData) {
  Game.collision = false;
  console.log('Collision chk = false');
  Game.move_resolve();
};

Game.update_firebase = function () {
  var players_parent = Game.data.child('users');
  Game.updateObject['user_' + Game.user_token] = {current_pos: [Game.character.x / Game.scale, Game.character.y / Game.scale, Game.stats.health]};
  players_parent.update(Game.updateObject);
};

Game.move_test = function () {
  if(Game.move === 1) {
    Game.character.x = Game.character.x - Game.scale;
  } else if (Game.move === 2) {
    Game.character.x = Game.character.x + Game.scale;
  } else if (Game.move === 3) {
    Game.character.y = Game.character.y - Game.scale;
  } else if (Game.move === 4) {
    Game.character.y = Game.character.y + Game.scale;
  }
};

Game.move_resolve = function() {
  if(Game.move === 1 && Game.collision === false) {
    Game.character.x = Game.character.x + Game.scale;
    Game.collision = true;
  }
  if(Game.move === 2 && Game.collision === false) {
    Game.character.x = Game.character.x - Game.scale;
    Game.collision = true;
  }
  if(Game.move === 3 && Game.collision === false) {
    Game.character.y = Game.character.y + Game.scale;
    Game.collision = true;
  }
  if(Game.move === 4 && Game.collision === false) {
    Game.character.y = Game.character.y - Game.scale;
    Game.collision = true;
  }

};

Game.key_bindings = function(e) {
  if(e.key == Crafty.keys.LEFT_ARROW) {
    Game.move = 1;
  } else if (e.key == Crafty.keys.RIGHT_ARROW) {
    Game.move = 2;
  } else if (e.key == Crafty.keys.UP_ARROW) {
    Game.move = 3;
  } else if (e.key == Crafty.keys.DOWN_ARROW) {
    Game.move = 4;
  } else if (e.key == Crafty.keys.SPACE) {
    Game.move = 5;
    Game.stats.health = Game.stats.health - 5;
    console.log(Game.stats.health);
    Game.refresh_stats();
  }
  Game.move_test();
};


Game.load_firebase_char = function(snapshot) {
  // console.log('Length ' + Object.keys(snapshot).length);
  var keys = [];
  var l = Object.keys(snapshot).length;
  var current_user = 'user_' + Game.user_token;

  for (var key in snapshot) {
    keys.push(key);
  }
  Game.firebase_char = [];
  for (var i = 0; i < l; i++) {
    if (keys[i] != current_user) {
      if (keys[i] != 'map') {
        Game.firebase_char.push(keys[i]);
      }
    }
  }
  Game.draw_firebase_char(snapshot);
};

Game.draw_firebase_char = function(snapshot) {
  for (var r = 0; r < Game.firebase_char.length; r++) {
    console.log('creating other player ' + r+1);
    var player = snapshot[Game.firebase_char[r]];
    var firebase = Game.firebase_char;
    console.log (player);

    firebase[player] = Crafty.e('Canvas, Color, player')
    .attr({x: player.current_pos[0] * Game.scale, y: player.current_pos[1] * Game.scale, w: Game.scale, h: Game.scale})
    .color('blue');
  }

};

Game.refresh = function(user){
  Crafty('player').each(function(player) {
    this.destroy();
  });
  Game.draw_local_character(user);
};
