'use strict';

/**
 * @ngdoc function
 * @name gameAngularAppApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the gameAngularAppApp
 */
angular.module('gameAngularAppApp')
  .controller('MainCtrl', function ($scope) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  });
