'use strict';
(function () {
  angular
    .module('clientApp')
    .config(['$routeProvider', function ($routeProvider) {
      $routeProvider
        .when("/client/add", {
          templateUrl: 'app/modules/client/view/add-client.html',
          controller: 'addClientController',
          controllerAs: 'vm'

        })




    }]);



})();
