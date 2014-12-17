var Router = Backbone.Router.extend({
  routes: {
    '': 'home',
    'login': 'login',
    'checkout': 'checkout'
  },

  home: function(){
alert('Home Page');
  },

  checkout: function() {
alert('checkout');
  }
});


var router = new Router();
Backbone.history.start();

$(document).ready(function() {

var source   = $("#entry-template").html();
var template = Handlebars.compile(source);
  // Runs the main game loop
  // Game._intervalId = setInterval(Game.run, 1000 / Game.fps);
});
