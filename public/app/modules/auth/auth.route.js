'use strict';
(function () {
  angular
    .module('authApp')
    // .factory('httpInterceptor',httpInterceptor)
    .config(['$routeProvider', '$locationProvider', function ($routeProvider, $locationProvider) {
      $locationProvider.hashPrefix('');


      $routeProvider

        .when("/login", {
        templateUrl: 'app/modules/auth/view/login.html',
        controller: 'AuthController',
        controllerAs: 'vm'

      })

      .otherwise({
        redirectTo: '/login'
      });



    }]);











})();
