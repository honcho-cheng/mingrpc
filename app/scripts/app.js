'use strict';

/**
 * @ngdoc overview
 * @name mingrpcApp
 * @description
 * # mingrpcApp
 *
 * Main module of the application.
 */
angular
  .module('mingrpcApp', [
    // 'ngAnimate',
    // 'ngCookies',
    // 'ngResource',
    // 'ngRoute',
    // 'ngSanitize',
    // 'ngTouch'
    'ui.router',
    'frapontillo.bootstrap-switch'
  ])
    .constant('AppConfig',{
    WEB_ROOT:'http://10.5.8.59:8080/mingr_Jewelry/',
  })
  .config(function ($routeProvider) {
    $routeProvider
      .when('/test', {
        templateUrl: 'views/main.html',
        controller: 'testCtrl',
      })

  });
