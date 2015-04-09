'use strict';

/**
 * @ngdoc overview
 * @name architechApp
 * @description
 * # architechApp
 *
 * Main module of the application.
 */
angular
  .module('architechApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch',
    'ui.select',
    'chart.js',
    'highcharts-ng',
    'selectize'
  
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/weather.html',
        controller: 'weatherCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
