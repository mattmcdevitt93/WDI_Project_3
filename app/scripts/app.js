'use strict';

/**
 * @ngdoc overview
 * @name gameAngularAppApp
 * @description
 * # gameAngularAppApp
 *
 * Main module of the application.
 */
angular
  .module('gameAngularAppApp', [
    'ngAnimate',
    'ngCookies',
    'ngMessages',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/home.html',
        controller: 'HomeCtrl'
      })
      .when('/media', {
        templateUrl: 'views/media.html',
        controller: 'MediaCtrl'
      })
      .when('/contact', {
        templateUrl: 'views/contact.html',
        controller: 'ContactCtrl'
      })
      .when('/lobby', {
        templateUrl: 'views/lobby.html',
        controller: 'LobbyCtrl'
      })
      .when('/game', {
        templateUrl: 'views/game.html',
        controller: 'GameCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
