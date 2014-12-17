'use strict';

/**
 * @ngdoc function
 * @name gameAngularAppApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the gameAngularAppApp
 */
angular.module('gameAngularAppApp')
  .controller('HomeCtrl', function ($scope) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  });
