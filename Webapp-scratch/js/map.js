var Game = Game || {};

Game.refresh_all = function(){
  Crafty('obj').each(function() { this.destroy(); });
// FIX THIS
};

Game.draw_map = function(map) {
  Crafty.init((Game.width * Game.scale),(Game.height * Game.scale), document.getElementById('game'));
  Game.map_check(map);
  Game.draw_sel_col(map);
};

Game.draw_sel_col = function (map) {
  for (var l = 0; l < Game.height; l++) {
   var row = map[l+1];
   Game.draw_row(row, l);
 }

};

Game.map_check = function(map) {
  var blank = Game.height - map.length;
  console.log("map height " + map.length + " - " + blank);
  for (var b = 0; b < blank; b++) {
    map.push([]);
  }
};

Game.draw_row = function(row, l) {
  for (var w = 0; w < Game.width; w++) {
    tile = row[w];
    // console.log("w "+ w + ", l " + l + " - tile " + tile);

     if (tile === 1) {
      Game.draw_map_wall(w * Game.scale , l * Game.scale );
     } else if (tile === 2) {
      Game.draw_map_floor(w * Game.scale , l * Game.scale );
     } else {
      Game.draw_map_void(w * Game.scale , l * Game.scale );
     }
   }
};

Game.draw_map_void = function(draw_x, draw_y) {
  Crafty.e("2D, Canvas, Color")
  .color("black")
  .attr({x: draw_x, y: draw_y, w: Game.scale , h: Game.scale });
};

Game.draw_map_floor = function(draw_x, draw_y) {
  // var r_tile = Math.floor(Math.random() * 3);
  var r_tile = 2;
  // console.log(r_tile);
  Crafty.sprite("img/Floor_1.png", {floor:[(r_tile * Game.scale),0,Game.scale,Game.scale]});
  Crafty.e("2D, Canvas, Color, floor")
  .color("grey")
  .attr({x: draw_x, y: draw_y, w: Game.scale , h: Game.scale });
};

Game.draw_map_wall = function(draw_x, draw_y) {

  Crafty.sprite("img/Wall_1.png", {wall:[0,0,Game.scale,Game.scale]});
  Crafty.e("2D, Canvas, Color, wall")
  .color("brown")
  .attr({x: draw_x, y: draw_y, w: Game.scale , h: Game.scale });
};
