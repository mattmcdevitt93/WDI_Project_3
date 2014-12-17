var Game = Game || {};

Game.refresh_map = function(){
  Crafty('tile').each(function() { this.destroy(); });
  Game.draw_map(Game.snapshot.map.map_data);
};

Game.refresh_stats = function(){
  Crafty('stats').each(function() { this.destroy(); });
  Game.draw_stats();
};

Game.draw_map = function(map) {
  Crafty.init((Game.width * Game.scale),(Game.height * Game.scale), document.getElementById('game'));
  Game.map_check(map);
  Game.draw_sel_col(map);
  Game.draw_sidebar();
};

Game.draw_sidebar = function() {
  for (var j = 0; j < Game.height * Game.scale; j++) {
    for (var i = 0; i < (Game.sidebar / Game.scale); i++ ) {
      var r_tile = 0;
      if (i === 9 || i === 0) {
        r_tile = 1;
      } else if (j === 0 || j === 19) {
        r_tile = 2;
      } else {
        r_tile = 3;
      }
      if (i === 0 && j === 0 || i === 9 && j === 19 || i === 0 && j === 19 || i === 9 && j === 0) {
        r_tile = 0;
      }
      Game.draw_sidebar_corner(i * Game.scale, j * Game.scale, r_tile);
    }
  }
// Game.draw_stats();
};

Game.draw_stats = function() {
  Crafty.e("2D, Canvas, Color, stats")
  .color("red")
  .attr({x: 50, y: 200, w: Game.stats.health , h: Game.scale });

  Crafty.e("2D, Canvas, Color, stats")
  .color("grey")
  .attr({x: 150, y: 200, w: (-1 * Game.stats.health) , h: Game.scale });
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
      Game.draw_map_wall(w * Game.scale + Game.sidebar, l * Game.scale );
    } else if (tile === 2) {
      Game.draw_map_floor(w * Game.scale + Game.sidebar, l * Game.scale );
    } else if (tile === 3) {
      Game.draw_map_door(w * Game.scale + Game.sidebar, l * Game.scale );
    } else {
      Game.draw_map_void(w * Game.scale + Game.sidebar, l * Game.scale );
    }
  }
};

Game.draw_map_void = function(draw_x, draw_y) {
  Crafty.e("2D, Canvas, Color, tile")
  .color("black")
  .attr({x: draw_x, y: draw_y, w: Game.scale , h: Game.scale });
};

Game.draw_map_floor = function(draw_x, draw_y) {
  var r_tile = Math.floor(Math.random() * 3);
  // var r_tile = 2;
  // console.log(r_tile);
  Crafty.sprite("../images/Floor_1.png", {floor:[(r_tile * Game.scale),0,Game.scale,Game.scale]});
  Crafty.e("2D, Canvas, Color, floor, tile")
  .color("grey")
  .attr({x: draw_x, y: draw_y, w: Game.scale , h: Game.scale });
};

Game.draw_sidebar_corner = function(draw_x, draw_y, r_tile) {
  Crafty.sprite("../images/Sidebar_1.png", {sidebar:[(r_tile * Game.scale),0,Game.scale,Game.scale]});
  Crafty.e("2D, Canvas, Color, sidebar")
  .color("brown")
  .attr({x: draw_x, y: draw_y, w: Game.scale , h: Game.scale });
};

Game.draw_map_wall = function(draw_x, draw_y) {

  Crafty.sprite("../images/Wall_1.png", {wall:[0,0,Game.scale,Game.scale]});
  Crafty.e("2D, Canvas, Color, wall, tile")
  .color("brown")
  .attr({x: draw_x, y: draw_y, w: Game.scale , h: Game.scale });
};

Game.draw_map_door = function(draw_x, draw_y) {

  Crafty.sprite("../images/Door.png", {wall:[0,0,Game.scale,Game.scale]});
  Crafty.e("2D, Canvas, Color, wall, tile")
  .color("brown")
  .attr({x: draw_x, y: draw_y, w: Game.scale , h: Game.scale });
};
